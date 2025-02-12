import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeEditDialogComponent } from './income-edit-dialog.component';

describe('IncomeEditDialogComponent', () => {
  let component: IncomeEditDialogComponent;
  let fixture: ComponentFixture<IncomeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
