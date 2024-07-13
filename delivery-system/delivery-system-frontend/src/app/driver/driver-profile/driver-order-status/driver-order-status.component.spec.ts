import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOrderStatusComponent } from './driver-order-status.component';

describe('DriverOrderStatusComponent', () => {
  let component: DriverOrderStatusComponent;
  let fixture: ComponentFixture<DriverOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverOrderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
