import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRecordsComponent } from './total-records.component';

describe('TotalRecordsComponent', () => {
  let component: TotalRecordsComponent;
  let fixture: ComponentFixture<TotalRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalRecordsComponent]
    });
    fixture = TestBed.createComponent(TotalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
