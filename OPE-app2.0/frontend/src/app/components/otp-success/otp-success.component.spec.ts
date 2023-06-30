import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSuccessComponent } from './otp-success.component';

describe('OtpSuccessComponent', () => {
  let component: OtpSuccessComponent;
  let fixture: ComponentFixture<OtpSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
