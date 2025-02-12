import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BudgetService } from '../../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [MatCardModule, MatButtonModule, MatIconModule,CommonModule]
})
export class DashboardComponent {
  title = 'Dashboard';
  warnings: string[] = [];
  constructor(private budgetService: BudgetService) {}
  ngOnInit(): void {
    console.log("🟡 Calling fetchWarnings() on Init...");
    this.fetchWarnings();
  }
  fetchWarnings(): void {
    this.budgetService.getBudgetWarnings().subscribe({
      next: (data) => {
        console.log(data)
        this.warnings = data;
      },
      error: (err) => {
        console.error('Error fetching budget warnings:', err);
      }
    });
  }

}
