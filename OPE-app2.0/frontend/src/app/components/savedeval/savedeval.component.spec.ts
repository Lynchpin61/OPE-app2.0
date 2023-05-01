import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedevalComponent } from './savedeval.component';

describe('SavedevalComponent', () => {
  let component: SavedevalComponent;
  let fixture: ComponentFixture<SavedevalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedevalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedevalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
