import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpEnterComponent } from './otp-enter.component';

describe('OtpEnterComponent', () => {
  let component: OtpEnterComponent;
  let fixture: ComponentFixture<OtpEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpEnterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
