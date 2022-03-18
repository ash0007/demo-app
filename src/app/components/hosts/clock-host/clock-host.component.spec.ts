import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHostComponent } from './clock-host.component';

describe('ClockHostComponent', () => {
  let component: ClockHostComponent;
  let fixture: ComponentFixture<ClockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
