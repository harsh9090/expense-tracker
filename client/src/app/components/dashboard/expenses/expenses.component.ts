import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Expense {
  date: Date;
  amount: number;
  description: string;
  category: ExpenseCategory;
}

enum ExpenseCategory {
  Food = 'Food & Dining',
  Transportation = 'Transportation',
  Housing = 'Housing & Utilities',
  Healthcare = 'Healthcare',
  Entertainment = 'Entertainment',
  Shopping = 'Shopping',
  Education = 'Education',
  Travel = 'Travel',
  Other = 'Other'
}

@Component({
  selector: 'app-inner-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class expensesInnerComponent implements OnInit {
  readonly categories = Object.values(ExpenseCategory);
  readonly categoryIcons = {
    [ExpenseCategory.Food]: 'restaurant',
    [ExpenseCategory.Transportation]: 'directions_car',
    [ExpenseCategory.Housing]: 'home',
    [ExpenseCategory.Healthcare]: 'local_hospital',
    [ExpenseCategory.Entertainment]: 'movie',
    [ExpenseCategory.Shopping]: 'shopping_cart',
    [ExpenseCategory.Education]: 'school',
    [ExpenseCategory.Travel]: 'flight',
    [ExpenseCategory.Other]: 'more_horiz'
  };

  readonly categoryColors = {
    [ExpenseCategory.Food]: '#FF6384',
    [ExpenseCategory.Transportation]: '#36A2EB',
    [ExpenseCategory.Housing]: '#FFCE56',
    [ExpenseCategory.Healthcare]: '#4CAF50',
    [ExpenseCategory.Entertainment]: '#FF9800',
    [ExpenseCategory.Shopping]: '#9C27B0',
    [ExpenseCategory.Education]: '#2196F3',
    [ExpenseCategory.Travel]: '#E91E63',
    [ExpenseCategory.Other]: '#607D8B'
  };

  categorySpending: { category: ExpenseCategory; total_spent: number }[] = [];
  totalExpenses: number = 0;
  chart: any;
  selectedCategory: ExpenseCategory | null = null;
  selectedCategoryBreakdown: Expense[] = [];
  selectedCategoryTotal: number = 0;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.fetchCategorySpending();
    // Set up an interval to refresh data every 30 seconds
    setInterval(() => {
      this.fetchCategorySpending();
    }, 30000);
  }

  fetchCategorySpending(): void {
    this.expenseService.getCategoryWiseSummary().subscribe({
      next: (data) => {
        // Transform the data to use fixed categories
        this.categorySpending = this.categories.map(category => {
          const categoryData = data.find((d: any) => d.category === category) || { total_spent: 0 };
          return {
            category: category as ExpenseCategory,
            total_spent: categoryData.total_spent
          };
        });
        
        this.totalExpenses = this.categorySpending.reduce((sum, item) => sum + item.total_spent, 0);
        this.createChart();

        // If a category is selected, refresh its details too
        if (this.selectedCategory) {
          this.fetchCategoryDetails(this.selectedCategory);
        }
      },
      error: (err) => {
        console.error('Error fetching category spending:', err);
      }
    });
  }

  fetchCategoryDetails(category: ExpenseCategory): void {
    this.selectedCategory = category;
    this.expenseService.getExpensesByCategory(category).subscribe({
      next: (data) => {
        this.selectedCategoryBreakdown = data;
        this.selectedCategoryTotal = data.reduce((sum:any, item:any) => sum + item.amount, 0);
      },
      error: (err) => console.error('Error fetching expenses by category:', err)
    });
  }

  getCategoryIcon(category: ExpenseCategory): string {
    return this.categoryIcons[category] || 'more_horiz';
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
          backgroundColor: this.categorySpending.map(item => this.categoryColors[item.category]),
          borderWidth: 1,
          borderColor: '#f3f4f6',
          borderRadius: 15,
          hoverOffset: 15
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        cutout: '85%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#111827', // text-gray-900
              font: {
                size: 13,
                family: "'Inter', sans-serif",
                weight: 'normal'
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#111827',
            bodyColor: '#111827',
            bodyFont: {
              family: "'Inter', sans-serif",
              weight: 'normal'
            },
            padding: 12,
            borderColor: '#e5e7eb',
            borderWidth: 1,
            boxPadding: 8,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                const value = context.raw as number;
                return ` $${value.toLocaleString()}`;
              }
            }
          }
        },
        onClick: (event: any, elements: any) => {
          if (elements.length > 0) {
            const clickedElementIndex = elements[0].index;
            const clickedCategory = this.categorySpending[clickedElementIndex].category;
            this.fetchCategoryDetails(clickedCategory);
          }
        }
      }
    });
  }
}
