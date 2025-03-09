import { Component, OnInit, inject } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { MatDialog } from '@angular/material/dialog';
import { IncomeEditDialogComponent } from '../income-edit-dialog/income-edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

enum IncomeSource {
  // Employment Income
  Salary = 'Salary',
  Bonus = 'Bonus',
  Commission = 'Commission',
  Overtime = 'Overtime',

  // Business Income
  Business = 'Business',
  Freelance = 'Freelance',
  Consulting = 'Consulting',
  ECommerce = 'E-Commerce',

  // Investment Income
  Dividends = 'Dividends',
  Interest = 'Interest',
  Crypto = 'Crypto',
  StockTrading = 'Stock Trading',

  // Rental Income
  Residential = 'Residential',
  Commercial = 'Commercial',
  Parking = 'Parking',
  Storage = 'Storage',

  // Passive Income
  Royalties = 'Royalties',
  Licensing = 'Licensing',
  Affiliate = 'Affiliate',
  AdRevenue = 'Ad Revenue',

  // Other Income
  Pension = 'Pension',
  Gifts = 'Gifts',
  Insurance = 'Insurance',
  Other = 'Other'
}

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomes: any[] = [];
  dialog = inject(MatDialog);
  IncomeSource = IncomeSource;

  newIncome = {
    source: '' as IncomeSource | '',
    category: '',
    amount: null,
    date: ''
  };

  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.fetchIncome();
  }

  fetchIncome(): void {
    this.incomeService.getIncome().subscribe({
      next: (data) => {
        this.incomes = data.map((income:any) => ({
          ...income,
          date: new Date(income.date)
        }));
        this.incomes.sort((a, b) => b.date.getTime() - a.date.getTime());
      },
      error: (err) => {
        console.error('Error fetching income:', err);
      }
    });
  }

  addIncome(): void {
    if (!this.newIncome.source || !this.newIncome.amount || !this.newIncome.date) return;

    this.incomeService.addIncome(this.newIncome).subscribe({
      next: (data) => {
        this.incomes.push(data);
        this.newIncome = { source: '', category: '', amount: null, date: '' };
      },
      error: (err) => {
        console.error('Error adding income:', err);
      }
    });
  }

  openEditDialog(income: any): void {
    // Format the date to YYYY-MM-DD before opening dialog
    const formattedIncome = {
      ...income,
      date: typeof income.date === 'number' 
        ? new Date(income.date).toISOString().split('T')[0]
        : income.date instanceof Date 
          ? income.date.toISOString().split('T')[0]
          : new Date(income.date).toISOString().split('T')[0]
    };

    console.log('Original date:', income.date);
    console.log('Formatted date:', formattedIncome.date);

    const dialogRef = this.dialog.open(IncomeEditDialogComponent, {
      width: '400px',
      data: formattedIncome
    });

    dialogRef.afterClosed().subscribe(updatedIncome => {
      if (updatedIncome) {
        this.updateIncome(updatedIncome.id, updatedIncome);
      }
    });
  }

  updateIncome(id: string, updatedIncome: any): void {
    this.incomeService.updateIncome(id, updatedIncome).subscribe({
      next: () => {
        this.incomes = this.incomes.map(income =>
          income.id === id ? updatedIncome : income
        );
        this.fetchIncome();
      },
      error: (err) => {
        console.error('Error updating income:', err);
      }
    });
  }

  deleteIncome(id: string): void {
    this.incomeService.deleteIncome(id).subscribe((date) => {
      console.log('Income deleted:', date);
      this.incomes = this.incomes.filter(income => income.id !== id);
    });
  }

  getTotalIncome(): number {
    return this.incomes.reduce((total, income) => total + Number(income.amount), 0);
  }

  getCurrentMonthIncome(): number {
    const now = new Date();
    return this.incomes
      .filter(income => new Date(income.date).getMonth() === now.getMonth())
      .reduce((total, income) => total + Number(income.amount), 0);
  }

  getAverageIncome(): number {
    return this.incomes.length ? this.getTotalIncome() / this.incomes.length : 0;
  }
}
