import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDisplayComponent } from './header-display.component';

describe('HeaderDisplayComponent', () => {
  let component: HeaderDisplayComponent;
  let fixture: ComponentFixture<HeaderDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
