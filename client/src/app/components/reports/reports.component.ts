import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Chart } from 'chart.js/auto';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  imports: [MatCardModule, MatTableModule] // ✅ Remove MatTable (not needed)
})
export class ReportsComponent implements OnInit, AfterViewInit {
  summary: any[] = [];
  chart: any;
  displayedColumns: string[] = ['month', 'income', 'expense', 'balance'];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchSummary();
  }

  ngAfterViewInit(): void {
    // Ensure the chart is created after the view is fully loaded
    setTimeout(() => {
      this.createChart();
    }, 500);
  }

  fixDateFormat(dateStr: string): string {
    const year = parseInt(dateStr.split('-')[0]);
    const month = parseInt(dateStr.split('-')[1]);

   
    return `${month.toString().padStart(2, '0')}-${year}`;
  }

  fetchSummary(): void {
    this.reportService.getMonthlySummary().subscribe({
      next: (data) => {
        this.summary = data.map(entry => ({
          ...entry,
          month: this.fixDateFormat(entry.month) // ✅ Fix incorrect date format
        }));

        console.log(this.summary);
        this.createChart(); // ✅ Create the chart after data is set
      },
      error: (err) => {
        console.error('Error fetching summary:', err);
      }
    });
  }

  createChart(): void {
    if (!document.getElementById('summaryChart')) {
      console.error('Chart element not found!');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('summaryChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.summary.map(item => item.month),
        datasets: [
          { label: 'Income', data: this.summary.map(item => item.total_income), backgroundColor: 'green' },
          { label: 'Expense', data: this.summary.map(item => item.total_expense), backgroundColor: 'red' }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }
}
