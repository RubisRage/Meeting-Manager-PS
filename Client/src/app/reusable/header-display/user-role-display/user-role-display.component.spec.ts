import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleDisplayComponent } from './user-role-display.component';

describe('UserRoleDisplayComponent', () => {
  let component: UserRoleDisplayComponent;
  let fixture: ComponentFixture<UserRoleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
