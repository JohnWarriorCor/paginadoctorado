import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosEstudiantesComponent } from './articulos-estudiantes.component';

describe('ArticulosEstudiantesComponent', () => {
  let component: ArticulosEstudiantesComponent;
  let fixture: ComponentFixture<ArticulosEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
