import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesAdminComponent } from './estudiantes-admin.component';

describe('EstudiantesAdminComponent', () => {
  let component: EstudiantesAdminComponent;
  let fixture: ComponentFixture<EstudiantesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
