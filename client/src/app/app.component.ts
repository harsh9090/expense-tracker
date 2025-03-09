import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BudgetService } from './services/budget.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  title = 'Expense Tracker';
  warnings: string[] = [];
  showNotifications = false;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.fetchWarnings();
  }

  fetchWarnings(): void {
    this.budgetService.getBudgetWarnings().subscribe({
      next: (data) => {
        this.warnings = data;
      },
      error: (err) => {
        console.error('Error fetching budget warnings:', err);
      }
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
}
