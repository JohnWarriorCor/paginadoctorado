import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloEstudiantesAdminComponent } from './articulo-estudiantes-admin.component';

describe('ArticuloEstudiantesAdminComponent', () => {
  let component: ArticuloEstudiantesAdminComponent;
  let fixture: ComponentFixture<ArticuloEstudiantesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloEstudiantesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloEstudiantesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
