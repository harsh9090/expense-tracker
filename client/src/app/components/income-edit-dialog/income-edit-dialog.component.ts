import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-income-edit-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Edit Income</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Source</mat-label>
        <input matInput [(ngModel)]="data.source" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Amount</mat-label>
        <input type="number" matInput [(ngModel)]="data.amount" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Date</mat-label>
        <input type="date" matInput [(ngModel)]="data.date" />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-button color="primary" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule,MatDialogActions,MatDialogContent]
})
export class IncomeEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<IncomeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  save(): void {
    this.dialogRef.close(this.data); // ✅ Returns updated income data
  }
}
