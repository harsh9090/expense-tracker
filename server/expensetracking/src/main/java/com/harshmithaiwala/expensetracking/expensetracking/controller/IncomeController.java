package com.harshmithaiwala.expensetracking.expensetracking.controller;

import com.harshmithaiwala.expensetracking.expensetracking.model.Income;
import com.harshmithaiwala.expensetracking.expensetracking.service.IncomeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/income")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    // ✅ Add Income
    @PostMapping
    public ResponseEntity<Income> addIncome(@RequestBody Income income, Authentication authentication) {
        System.out.println("✅ ADD INCOME API CALLED");
        return ResponseEntity.ok(incomeService.addIncome(income, authentication.getName()));
    }

    // ✅ Get All Income for Logged-in User
    @GetMapping
    public ResponseEntity<List<Income>> getIncome(Authentication authentication) {
        System.out.println("✅ FETCH INCOME API CALLED");
        return ResponseEntity.ok(incomeService.getIncome(authentication.getName()));
    }

    // ✅ Update Income
    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(@PathVariable UUID id, @RequestBody Income income, Authentication authentication) {
        System.out.println("✅ UPDATE INCOME API CALLED");
        return ResponseEntity.ok(incomeService.updateIncome(id, income, authentication.getName()));
    }

    // ✅ Delete Income
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIncome(@PathVariable UUID id, Authentication authentication) {
        System.out.println("✅ DELETE INCOME API CALLED");
        incomeService.deleteIncome(id, authentication.getName());
        return ResponseEntity.ok("Income deleted successfully");
    }
}
