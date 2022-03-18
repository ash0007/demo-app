import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanBoxHostComponent } from './boolean-box-host.component';

describe('BooleanBoxHostComponent', () => {
  let component: BooleanBoxHostComponent;
  let fixture: ComponentFixture<BooleanBoxHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanBoxHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanBoxHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
