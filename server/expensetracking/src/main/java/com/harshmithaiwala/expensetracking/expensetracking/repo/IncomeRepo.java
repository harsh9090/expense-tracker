package com.harshmithaiwala.expensetracking.expensetracking.repo;

import com.harshmithaiwala.expensetracking.expensetracking.model.Income;
import com.harshmithaiwala.expensetracking.expensetracking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IncomeRepo extends JpaRepository<Income, UUID> {

    // ✅ Fetch all income records for a specific user
    List<Income> findByUser(User user);
}
