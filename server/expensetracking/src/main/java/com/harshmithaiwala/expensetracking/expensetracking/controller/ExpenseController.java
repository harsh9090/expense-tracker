package com.harshmithaiwala.expensetracking.expensetracking.controller;


import com.harshmithaiwala.expensetracking.expensetracking.model.Expense;
import com.harshmithaiwala.expensetracking.expensetracking.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // ✅ Add Expense
    @PostMapping
    public ResponseEntity<Map<String, String>> createExpense(@RequestBody Expense expense, Authentication authentication) {
        Map<String, String> response = expenseService.addExpense(expense, authentication.getName());
        return ResponseEntity.ok(response);
    }


    // ✅ Get All Expenses for Logged-in User
    @GetMapping
    public ResponseEntity<List<Expense>> getExpenses(Authentication authentication) {
        return ResponseEntity.ok(expenseService.getExpenses(authentication.getName()));
    }

    // ✅ Update Expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable UUID id, @RequestBody Expense expense, Authentication authentication) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense, authentication.getName()));
    }

    // ✅ Delete Expense
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable UUID id, Authentication authentication) {
        expenseService.deleteExpense(id, authentication.getName());
        return ResponseEntity.ok("Expense deleted successfully");
    }
}