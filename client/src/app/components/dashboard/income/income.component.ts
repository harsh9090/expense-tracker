import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { IncomeDetail, IncomeService, IncomeSource } from '../../../services/income.service';

enum IncomeCategory {
  Salary = 'Salary & Wages',
  Business = 'Business Income',
  Investments = 'Investments',
  Rental = 'Rental Income',
  Freelance = 'Freelance',
  Pension = 'Pension & Benefits',
  Dividends = 'Dividends',
  Other = 'Other'
}

@Component({
  selector: 'app-inner-income',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeInnerComponent implements OnInit, AfterViewInit {
  readonly categories = Object.values(IncomeCategory);
  incomeBySource: IncomeSource[] = [];
  totalincome: number = 0;
  chart: Chart | null = null;
  selectedsource: string | null = null;
  selectedsourceBreakdown: IncomeDetail[] = [];
  selectedsourceTotal: number = 0;
  allIncome: IncomeDetail[] = [];

  readonly sourceColors = {
    [IncomeCategory.Salary]: '#2563EB',    // Blue
    [IncomeCategory.Business]: '#16A34A',   // Green
    [IncomeCategory.Investments]: '#9333EA', // Purple
    [IncomeCategory.Rental]: '#E11D48',     // Red
    [IncomeCategory.Freelance]: '#F59E0B',  // Amber
    [IncomeCategory.Pension]: '#0891B2',    // Cyan
    [IncomeCategory.Dividends]: '#EA580C',  // Orange
    [IncomeCategory.Other]: '#64748B'       // Slate
  };

  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.fetchIncomeData();
  }

  ngAfterViewInit(): void {
    // Ensure chart is created after view is initialized
    setTimeout(() => {
      this.fetchIncomeData();
    }, 100);
  }

  fetchIncomeData(): void {
    this.incomeService.getIncome().subscribe({
      next: (data: IncomeDetail[]) => {
        this.allIncome = data;
        this.processIncomeData();
      },
      error: (error: Error) => {
        console.error('Error fetching income data:', error);
      }
    });
  }

  processIncomeData(): void {
    // Initialize sources with all categories set to 0
    const sourceTotals = new Map<string, number>();
    this.categories.forEach(category => sourceTotals.set(category, 0));

    // Calculate totals for each category
    this.allIncome.forEach(income => {
      const category = this.categorizeIncome(income.source);
      const currentTotal = sourceTotals.get(category) || 0;
      sourceTotals.set(category, currentTotal + income.amount);
    });

    // Convert to IncomeSource array and filter out empty categories
    this.incomeBySource = Array.from(sourceTotals.entries())
      .map(([source, total]) => ({ source, total }))
      .filter(item => item.total > 0)
      .sort((a, b) => b.total - a.total); // Sort by total in descending order

    this.totalincome = this.incomeBySource.reduce((sum, item) => sum + item.total, 0);
    this.createChart();
  }

  categorizeIncome(source: string): string {
    // Convert source to lowercase for case-insensitive matching
    const sourceLower = source.toLowerCase();
    
    if (sourceLower.includes('salary') || sourceLower.includes('wage')) {
      return IncomeCategory.Salary;
    } else if (sourceLower.includes('business')) {
      return IncomeCategory.Business;
    } else if (sourceLower.includes('investment') || sourceLower.includes('stock')) {
      return IncomeCategory.Investments;
    } else if (sourceLower.includes('rent') || sourceLower.includes('lease')) {
      return IncomeCategory.Rental;
    } else if (sourceLower.includes('freelance') || sourceLower.includes('contract')) {
      return IncomeCategory.Freelance;
    } else if (sourceLower.includes('pension') || sourceLower.includes('benefit')) {
      return IncomeCategory.Pension;
    } else if (sourceLower.includes('dividend')) {
      return IncomeCategory.Dividends;
    } else {
      return IncomeCategory.Other;
    }
  }

  fetchSourceDetails(source: string): void {
    this.selectedsource = source;
    // Filter income items for the selected category
    this.selectedsourceBreakdown = this.allIncome
      .filter(income => this.categorizeIncome(income.source) === source)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); 

    // Print dates for all income entries in this source
    this.selectedsourceBreakdown.forEach(income => {
      console.log('Income date:', new Date(income.date).toLocaleDateString());
    });

    this.selectedsourceTotal = this.selectedsourceBreakdown.reduce((sum, item) => sum + item.amount, 0);
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('spendingChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Chart canvas element not found!');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.incomeBySource.map(item => item.source),
        datasets: [{
          data: this.incomeBySource.map(item => item.total),
          backgroundColor: this.incomeBySource.map(item => this.sourceColors[item.source as IncomeCategory]),
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
              color: '#111827',
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
            const clickedSource = this.incomeBySource[clickedElementIndex].source;
            this.fetchSourceDetails(clickedSource);
          }
        }
      }
    });
  }

  getCategoryTotal(category: string): number {
    const source = this.incomeBySource.find(item => item.source === category);
    return source ? source.total : 0;
  }
}
