import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprodComponent } from './addprod.component';

describe('AddprodComponent', () => {
  let component: AddprodComponent;
  let fixture: ComponentFixture<AddprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
