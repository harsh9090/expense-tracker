import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common'; // ✅ Import NgIf to use *ngIf in the template
import { BudgetService } from './services/budget.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIcon,
    NgIf, // ✅ Required for *ngIf to work
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // ✅ Check if user is logged in
  }
  title = 'Expense Tracker';
  warnings: string[] = [];
  showNotifications = false;
  ngOnInit(): void {
    this.fetchWarnings();
  }
  constructor(private budgetService: BudgetService) {}

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
