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

  newIncome = { source: '', amount: null, date: '' }; // ✅ New income object

  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.fetchIncome();
  }

  fetchIncome(): void {
    this.incomeService.getIncome().subscribe({
      next: (data) => {
        // Convert string dates to Date objects before sorting
        this.incomes = data.map((income:any) => ({
          ...income,
          date: new Date(income.date) // Ensure it's a Date object
        }));
        console.log(this.incomes);
        // Sort incomes by date (Newest First)
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
        this.newIncome = { source: '', amount: null, date: '' }; // ✅ Reset form after submission
      },
      error: (err) => {
        console.error('Error adding income:', err);
      }
    });
  }

  openEditDialog(income: any): void {
    const dialogRef = this.dialog.open(IncomeEditDialogComponent, {
      width: '400px',
      data: { ...income }
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
}
