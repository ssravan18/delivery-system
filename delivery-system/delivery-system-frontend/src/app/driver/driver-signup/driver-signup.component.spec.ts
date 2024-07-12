import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSignupComponent } from './driver-signup.component';

describe('DriverSignupComponent', () => {
  let component: DriverSignupComponent;
  let fixture: ComponentFixture<DriverSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
