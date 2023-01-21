import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudiosAdminComponent } from './plan-estudios-admin.component';

describe('PlanEstudiosAdminComponent', () => {
  let component: PlanEstudiosAdminComponent;
  let fixture: ComponentFixture<PlanEstudiosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanEstudiosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEstudiosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
