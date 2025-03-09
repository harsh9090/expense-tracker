import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

enum IncomeSource {
  // Primary Employment
  Salary = 'Regular Salary & Wages',
  
  // Business & Self-Employment
  Business = 'Business Income',
  
  // Freelance Work
  Freelancing = 'Freelance & Contract Work',
  
  // Property Income
  RentalIncome = 'Rental Property Income',
  
  // Investment Returns
  Investment = 'Investment Income',
  
  // Digital & Online
  OnlineIncome = 'Online Business & Content',
  
  // Intellectual Property
  Royalties = 'Royalties & Licensing',
  
  // Miscellaneous
  Other = 'Other Income Sources'
}

interface IncomeCategory {
  label: string;
  value: IncomeSource;
}

interface IncomeData {
  source: string;
  category: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-income-edit-dialog',
  standalone: true,
  templateUrl: './income-edit-dialog.component.html',
  styleUrls: ['./income-edit-dialog.component.css'],
  imports: [FormsModule, CommonModule]
})
export class IncomeEditDialogComponent implements OnInit {
  IncomeSource = IncomeSource;

  readonly incomeCategories: IncomeCategory[] = [
    { label: 'Primary Employment', value: IncomeSource.Salary },
    { label: 'Business & Self-Employment', value: IncomeSource.Business },
    { label: 'Freelance Work', value: IncomeSource.Freelancing },
    { label: 'Property Income', value: IncomeSource.RentalIncome },
    { label: 'Investment Returns', value: IncomeSource.Investment },
    { label: 'Digital & Online', value: IncomeSource.OnlineIncome },
    { label: 'Intellectual Property', value: IncomeSource.Royalties },
    { label: 'Miscellaneous', value: IncomeSource.Other }
  ];

  constructor(
    public dialogRef: MatDialogRef<IncomeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncomeData
  ) {
    console.log('Initial date value:', this.data.date);
  }

  ngOnInit(): void {
    console.log('Initial data:', this.data);
    
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
          console.log('Formatted date in dialog:', this.data.date);
        } else {
          console.error('Invalid date:', this.data.date);
        }
      } catch (error) {
        console.error('Error formatting date:', error);
      }
    }

    // Ensure source is set to one of the valid enum values
    if (this.data.source) {
      const matchingCategory = this.incomeCategories.find(
        category => category.value === this.data.source || 
                   category.label === this.data.source
      );
      if (matchingCategory) {
        this.data.source = matchingCategory.value;
      }
    }
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
