import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawAnimComponent } from './draw-anim.component';

describe('DrawAnimComponent', () => {
  let component: DrawAnimComponent;
  let fixture: ComponentFixture<DrawAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawAnimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
