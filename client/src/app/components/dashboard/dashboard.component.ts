import { Component } from '@angular/core';
import { IncomeComponent } from '../income/income.component';
import { expensesInnerComponent } from './expenses/expenses.component';
import { CommonModule } from '@angular/common';
import { IncomeInnerComponent } from './income/income.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[IncomeInnerComponent,expensesInnerComponent,CommonModule]
})
export class DashboardComponent {
  activeTab: 'expenses' | 'income' = 'expenses';  // Default to expenses
}
