import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { ExpenseEditDialogComponent } from '../expense-edit-dialog/expense-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '../../interface/expanse.interface';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ Required for [(ngModel)]
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule, // ✅ Required for <mat-form-field>
    MatInputModule // ✅ Required for matInput inside <mat-form-field>
  ],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
  
export class ExpensesComponent implements OnInit {
  expenses: any[] = [];
  newExpense = { category: '', description: '', amount: null, date: '' }; // ✅ Added description
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['date', 'category', 'description', 'amount', 'actions'];
  constructor(private expenseService: ExpenseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
      }
    });
  }

  addExpense(): void {
    if (!this.newExpense.category || !this.newExpense.amount || !this.newExpense.date) return;

    this.expenseService.addExpense(this.newExpense).subscribe({
      next: (response) => {
        this.expenses.push({ ...this.newExpense, id: response.expenseId });
        this.newExpense = { category: '', description: '', amount: null, date: '' };

        if (response.message.includes("Warning")) {
          this.snackBar.open(response.message, 'Close', { duration: 5000, panelClass: 'warning-snackbar' });
        }
      },
      error: (err) => {
        console.error('Error adding expense:', err);
      }
    });
  }
  openEditDialog(expense: any): void {
    const dialogRef = this.dialog.open(ExpenseEditDialogComponent, {
      width: '400px',
      data: { ...expense }
    });

    dialogRef.afterClosed().subscribe(updatedExpense => {
      if (updatedExpense) {
        this.updateExpense(updatedExpense.id, updatedExpense);
      }
    });
  }

  updateExpense(id: string, updatedExpense: Expense): void {
    console.log('Updating expense:', updatedExpense);
    this.expenseService.updateExpense(id, updatedExpense).subscribe({
      next: (response) => {
        this.expenses = this.expenses.map(expense =>
          expense.id === id ? updatedExpense : expense
        );
        this.fetchExpenses(); // ✅ Fetch expenses again
      },
      error: (err) => {
        console.error('Error updating expense:', err);
      }
    });
  }
  deleteExpense(id: string): void {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        this.expenses = this.expenses.filter((expense) => expense._id !== id);
      },
      error: (err) => {
        console.error('Error deleting expense:', err);
      }
    });
  }
}
