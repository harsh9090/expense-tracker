import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inner-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  imports: [CommonModule]
})
export class expensesInnerComponent implements OnInit {
  categorySpending: any[] = [];
  totalExpenses: number = 0;
  chart: any;
  expenseSeleted = false;
  selectedCategory: string = '';
  selectedCategoryBreakdown: any[] = [];
  selectedCategoryTotal: number = 0;
  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.fetchCategorySpending();
  }

  fetchCategorySpending(): void {
    this.expenseService.getCategoryWiseSummary().subscribe({
      next: (data) => {
        this.categorySpending = data;
        this.totalExpenses = data.reduce((sum: number, item: { total_spent: number }) => sum + item.total_spent, 0);
        this.createChart();
      },
      error: (err) => {
        console.error('Error fetching category spending:', err);
      }
    });
  }
  fetchCategoryDetails(category: string): void {
    this.expenseSeleted = true
    this.selectedCategory = category;
    this.expenseService.getExpensesByCategory(category).subscribe({
      next: (data) => {
        this.selectedCategoryBreakdown = data;
        this.selectedCategoryTotal = data.reduce((sum: any, item: { amount: any; }) => sum + item.amount, 0);
      },
      error: (err) => console.error('Error fetching expenses by category:', err)
    });
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('spendingChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.categorySpending.map(item => item.category),
        datasets: [{
          data: this.categorySpending.map(item => item.total_spent),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0'],
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        },
        onClick: (event: any, elements: any) => {
          if (elements.length > 0) {
            const clickedElementIndex = elements[0].index;
            const clickedElement = this.categorySpending[clickedElementIndex];
            this.fetchCategoryDetails(clickedElement.category);
          }
        }
      }
    });
  }
}
