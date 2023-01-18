import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosDocentesComponent } from './articulos-docentes.component';

describe('ArticulosDocentesComponent', () => {
  let component: ArticulosDocentesComponent;
  let fixture: ComponentFixture<ArticulosDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
