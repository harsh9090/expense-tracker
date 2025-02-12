import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseEditDialogComponent } from './expense-edit-dialog.component';

describe('ExpenseEditDialogComponent', () => {
  let component: ExpenseEditDialogComponent;
  let fixture: ComponentFixture<ExpenseEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
