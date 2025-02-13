import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-income-edit-dialog',
  standalone: true,
  templateUrl: './income-edit-dialog.component.html',
  styleUrls: ['./income-edit-dialog.component.css'],
  imports: [FormsModule, CommonModule]
})
export class IncomeEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<IncomeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  save(): void {
    this.dialogRef.close(this.data); // ✅ Closes the dialog and returns updated data
  }
}
