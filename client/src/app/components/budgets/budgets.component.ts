import { Component, OnInit, inject } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { MatDialog } from '@angular/material/dialog';
import { BudgetEditDialogComponent } from '../budget-edit-dialog/budget-edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetComponent implements OnInit {
  budgets: any[] = [];
  categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Rent', 'Education', 'Savings'];
  newBudget = { category: '', amount: null, month: null, year: null };
  dialog = inject(MatDialog);

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.fetchBudgets();
  }

  fetchBudgets(): void {
    this.budgetService.getBudgets().subscribe({
      next: (data) => {
        this.budgets = data;
      },
      error: (err) => {
        console.error('Error fetching budgets:', err);
      }
    });
  }

  addBudget(): void {
    if (!this.newBudget.category || !this.newBudget.amount || !this.newBudget.month || !this.newBudget.year) return;

    this.budgetService.addBudget(this.newBudget).subscribe({
      next: (data) => {
        this.budgets.push(data);
        this.newBudget = { category: '', amount: null, month: null, year: null };
      },
      error: (err) => {
        console.error('Error adding budget:', err);
      }
    });
  }

  openEditDialog(budget: any): void {
    const dialogRef = this.dialog.open(BudgetEditDialogComponent, {
      width: '400px',
      data: { ...budget }
    });

    dialogRef.afterClosed().subscribe(updatedBudget => {
      if (updatedBudget) {
        this.updateBudget(updatedBudget.id, updatedBudget);
      }
    });
  }

  updateBudget(id: string, updatedBudget: any): void {
    this.budgetService.updateBudget(id, updatedBudget).subscribe({
      next: () => {
        this.budgets = this.budgets.map(budget =>
          budget.id === id ? updatedBudget : budget
        );
      },
      error: (err) => {
        console.error('Error updating budget:', err);
      }
    });
  }

  deleteBudget(id: string): void {
    this.budgetService.deleteBudget(id).subscribe(() => {
      this.budgets = this.budgets.filter(budget => budget.id !== id);
    });
  }
}
