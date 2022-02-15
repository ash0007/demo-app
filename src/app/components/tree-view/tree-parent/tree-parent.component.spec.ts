import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeParentComponent } from './tree-parent.component';

describe('TreeParentComponent', () => {
  let component: TreeParentComponent;
  let fixture: ComponentFixture<TreeParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
