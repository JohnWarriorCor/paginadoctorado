import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloEstudianteComponent } from './articulo-estudiante.component';

describe('ArticuloEstudianteComponent', () => {
  let component: ArticuloEstudianteComponent;
  let fixture: ComponentFixture<ArticuloEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
