import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

interface ExpenseData {
  category: string;
  description: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-expense-edit-dialog',
  standalone: true,
  templateUrl: './expense-edit-dialog.component.html',
  styleUrls: ['./expense-edit-dialog.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ExpenseEditDialogComponent implements OnInit {
  ExpenseCategory = ExpenseCategory;

  constructor(
    public dialogRef: MatDialogRef<ExpenseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseData
  ) { }

  ngOnInit(): void {
    // Format the date to YYYY-MM-DD for the date input
    if (this.data.date) {
      try {
        // Handle timestamp (number), Date object, or date string
        const dateValue = typeof this.data.date === 'number'
          ? new Date(this.data.date)
          : typeof this.data.date === 'object'
            ? this.data.date as Date
            : new Date(this.data.date);

        if (!isNaN(dateValue.getTime())) {
          const year = dateValue.getFullYear();
          const month = String(dateValue.getMonth() + 1).padStart(2, '0');
          const day = String(dateValue.getDate()).padStart(2, '0');
          this.data.date = `${year}-${month}-${day}`;
        }
      } catch (error) {
        console.error('Error formatting date:', error);
      }
    }
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
