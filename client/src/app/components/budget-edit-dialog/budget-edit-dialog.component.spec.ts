import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEditDialogComponent } from './budget-edit-dialog.component';

describe('BudgetEditDialogComponent', () => {
  let component: BudgetEditDialogComponent;
  let fixture: ComponentFixture<BudgetEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
