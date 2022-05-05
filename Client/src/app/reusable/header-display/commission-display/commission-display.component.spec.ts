import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionDisplayComponent } from './commission-display.component';

describe('CommissionDisplayComponent', () => {
  let component: CommissionDisplayComponent;
  let fixture: ComponentFixture<CommissionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
