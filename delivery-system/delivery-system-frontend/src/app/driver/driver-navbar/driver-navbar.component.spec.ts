import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverNavbarComponent } from './driver-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('DriverNavbarComponent', () => {
  let component: DriverNavbarComponent;
  let fixture: ComponentFixture<DriverNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverNavbarComponent ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
