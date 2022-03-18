import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanTruthTableComponent } from './boolean-truth-table.component';

describe('BooleanTruthTableComponent', () => {
  let component: BooleanTruthTableComponent;
  let fixture: ComponentFixture<BooleanTruthTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanTruthTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanTruthTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
