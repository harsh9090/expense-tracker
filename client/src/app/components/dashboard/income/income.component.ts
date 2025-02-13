import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { IncomeService } from '../../../services/income.service';

@Component({
  selector: 'app-inner-income',
  standalone: true,
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  imports: [CommonModule]
})
export class IncomeInnerComponent implements OnInit {
  sourceSpending: any[] = [];
  totalincome: number = 0;
  chart: any;
  incomeeleted = false;
  selectedsource: string = '';
  selectedsourceBreakdown: any[] = [];
  selectedsourceTotal: number = 0;
  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.fetchsourceSpending();
  }

  fetchsourceSpending(): void {
    this.incomeService.getCategoryWiseIncome().subscribe({
      next: (data) => {
        this.sourceSpending = data;
        this.totalincome = data.reduce((sum: number, item: { total_spent: number }) => sum + item.total_spent, 0);
        this.createChart();
      },
      error: (err) => {
        console.error('Error fetching source spending:', err);
      }
    });
  }
  fetchsourceDetails(source: string): void {
    this.incomeeleted = true
    this.selectedsource = source;
    this.incomeService.getIncomeByCategory(source).subscribe({
      next: (data) => {
        this.selectedsourceBreakdown = data;
        this.selectedsourceTotal = data.reduce((sum: any, item: { amount: any; }) => sum + item.amount, 0);
      },
      error: (err) => console.error('Error fetching income by source:', err)
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
        labels: this.sourceSpending.map(item => item.source),
        datasets: [{
          data: this.sourceSpending.map(item => item.total_spent),
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
            const clickedElement = this.sourceSpending[clickedElementIndex];
            this.fetchsourceDetails(clickedElement.source);
          }
        }
      }
    });
  }
}
