import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-budget-edit-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Edit Budget</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Category</mat-label>
        <mat-select [(ngModel)]="data.category">
          <mat-option *ngFor="let category of categories" [value]="category">{{ category }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Amount</mat-label>
        <input type="number" matInput [(ngModel)]="data.amount" />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-button color="primary" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule,MatDialogActions,MatDialogContent]
})
export class BudgetEditDialogComponent {
  categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Rent', 'Education', 'Savings'];

  constructor(
    public dialogRef: MatDialogRef<BudgetEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
