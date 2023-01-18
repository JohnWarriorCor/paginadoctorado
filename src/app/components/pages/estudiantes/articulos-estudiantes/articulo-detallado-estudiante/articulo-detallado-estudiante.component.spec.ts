import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDetalladoEstudianteComponent } from './articulo-detallado-estudiante.component';

describe('ArticuloDetalladoEstudianteComponent', () => {
  let component: ArticuloDetalladoEstudianteComponent;
  let fixture: ComponentFixture<ArticuloDetalladoEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloDetalladoEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloDetalladoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
