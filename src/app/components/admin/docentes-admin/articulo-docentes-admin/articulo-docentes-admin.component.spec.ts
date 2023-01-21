import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDocentesAdminComponent } from './articulo-docentes-admin.component';

describe('ArticuloDocentesAdminComponent', () => {
  let component: ArticuloDocentesAdminComponent;
  let fixture: ComponentFixture<ArticuloDocentesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloDocentesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloDocentesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
