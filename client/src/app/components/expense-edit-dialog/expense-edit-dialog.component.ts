import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-edit-dialog',
  standalone: true,
  templateUrl: './expense-edit-dialog.component.html',
  styleUrls: ['./expense-edit-dialog.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ExpenseEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExpenseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  save(): void {
    this.dialogRef.close(this.data); // ✅ Closes the dialog and returns updated data
  }
}
