import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDocenteComponent } from './articulo-docente.component';

describe('ArticuloDocenteComponent', () => {
  let component: ArticuloDocenteComponent;
  let fixture: ComponentFixture<ArticuloDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
