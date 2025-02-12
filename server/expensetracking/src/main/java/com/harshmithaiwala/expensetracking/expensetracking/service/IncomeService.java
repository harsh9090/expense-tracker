package com.harshmithaiwala.expensetracking.expensetracking.service;

import com.harshmithaiwala.expensetracking.expensetracking.model.Income;
import com.harshmithaiwala.expensetracking.expensetracking.model.Transaction;
import com.harshmithaiwala.expensetracking.expensetracking.model.TransactionType;
import com.harshmithaiwala.expensetracking.expensetracking.model.User;
import com.harshmithaiwala.expensetracking.expensetracking.repo.IncomeRepo;
import com.harshmithaiwala.expensetracking.expensetracking.repo.UserRepo;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class IncomeService {

    private final IncomeRepo incomeRepo;
    private final UserRepo userRepo;
    private final TransactionService transactionService;

    public IncomeService(IncomeRepo incomeRepo, UserRepo userRepo, TransactionService transactionService) {
        this.incomeRepo = incomeRepo;
        this.userRepo = userRepo;
        this.transactionService = transactionService;
    }

    // ✅ Add Income
    public Income addIncome(Income income, String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        income.setUser(user);
        Income savedIncome = incomeRepo.save(income);

        return savedIncome;
    }


    // ✅ Get All Income for Logged-in User
    public List<Income> getIncome(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return incomeRepo.findByUser(user);
    }

    // ✅ Update Income
    public Income updateIncome(UUID id, Income updatedIncome, String email) {
        Income existingIncome = incomeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));

        if (!existingIncome.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to update this income");
        }

        existingIncome.setAmount(updatedIncome.getAmount());
        existingIncome.setSource(updatedIncome.getSource());
        existingIncome.setDate(updatedIncome.getDate());

        return incomeRepo.save(existingIncome);
    }

    // ✅ Delete Income
    public void deleteIncome(UUID id, String email) {
        Income income = incomeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found"));

        if (!income.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to delete this income");
        }

        incomeRepo.delete(income);
    }
}
