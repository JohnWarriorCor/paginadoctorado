import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudiosComponent } from './plan-estudios.component';

describe('PlanEstudiosComponent', () => {
  let component: PlanEstudiosComponent;
  let fixture: ComponentFixture<PlanEstudiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanEstudiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
