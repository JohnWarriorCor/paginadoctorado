import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresadosAdminComponent } from './egresados-admin.component';

describe('EgresadosAdminComponent', () => {
  let component: EgresadosAdminComponent;
  let fixture: ComponentFixture<EgresadosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgresadosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
