import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogComponentComponent } from './mat-confirm-dialog-component.component';

describe('MatConfirmDialogComponentComponent', () => {
  let component: MatConfirmDialogComponentComponent;
  let fixture: ComponentFixture<MatConfirmDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatConfirmDialogComponentComponent]
    });
    fixture = TestBed.createComponent(MatConfirmDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
