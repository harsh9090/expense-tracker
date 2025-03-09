import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { expensesInnerComponent } from './expenses/expenses.component';
import { Income } from '../../models/income.model';
import { IncomeInnerComponent } from './income/income.component';
import { IncomeService } from '../../services/income.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    IncomeInnerComponent,
    expensesInnerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalBalance: number = 0;
  totalExpenses: number = 0;
  totalIncome: number = 0;
  expenseChange: number = 0;
  incomeChange: number = 0;
  balanceChange: number = 0;
  activeTab: 'expenses' | 'income' = 'expenses';

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  ngOnInit(): void {
    this.calculateTotals();
  }

  calculateTotals(): void {
    // Get current month's expenses
    this.expenseService.getExpenses().subscribe({
      next: (expenses: Expense[]) => {
        const now = new Date();
        const currentPeriodEnd = new Date(now);
        const currentPeriodStart = new Date(now);
        currentPeriodStart.setDate(currentPeriodStart.getDate() - 30);
        
        const previousPeriodEnd = new Date(currentPeriodStart);
        const previousPeriodStart = new Date(currentPeriodStart);
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);

        // Calculate current period's expenses
        const currentExpenses = expenses
          .filter((expense: Expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= currentPeriodStart && expenseDate <= currentPeriodEnd;
          })
          .reduce((sum: number, expense: Expense) => sum + expense.amount, 0);

        // Calculate previous period's expenses
        const previousExpenses = expenses
          .filter((expense: Expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= previousPeriodStart && expenseDate < previousPeriodEnd;
          })
          .reduce((sum: number, expense: Expense) => sum + expense.amount, 0);

        this.totalExpenses = currentExpenses;
        this.expenseChange = previousExpenses ? ((currentExpenses - previousExpenses) / previousExpenses) * 100 : 0;

        // Get current month's income
        this.incomeService.getIncome().subscribe({
          next: (incomes: Income[]) => {
            // Calculate current period's income
            const currentIncome = incomes
              .filter((income: Income) => {
                const incomeDate = new Date(income.date);
                return incomeDate >= currentPeriodStart && incomeDate <= currentPeriodEnd;
              })
              .reduce((sum: number, income: Income) => sum + income.amount, 0);

            // Calculate previous period's income
            const previousIncome = incomes
              .filter((income: Income) => {
                const incomeDate = new Date(income.date);
                return incomeDate >= previousPeriodStart && incomeDate < previousPeriodEnd;
              })
              .reduce((sum: number, income: Income) => sum + income.amount, 0);

            this.totalIncome = currentIncome;
            this.incomeChange = previousIncome ? ((currentIncome - previousIncome) / previousIncome) * 100 : 0;
            
            // Calculate total balance and its change
            this.totalBalance = this.totalIncome - this.totalExpenses;
            const previousBalance = previousIncome - previousExpenses;
            this.balanceChange = previousBalance ? ((this.totalBalance - previousBalance) / previousBalance) * 100 : 0;
          },
          error: (error: Error) => console.error('Error fetching income:', error)
        });
      },
      error: (error: Error) => console.error('Error fetching expenses:', error)
    });
  }
}
