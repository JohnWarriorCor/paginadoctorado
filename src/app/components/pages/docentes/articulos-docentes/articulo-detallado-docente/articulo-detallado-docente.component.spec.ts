import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDetalladoDocenteComponent } from './articulo-detallado-docente.component';

describe('ArticuloDetalladoDocenteComponent', () => {
  let component: ArticuloDetalladoDocenteComponent;
  let fixture: ComponentFixture<ArticuloDetalladoDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloDetalladoDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloDetalladoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
