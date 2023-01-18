import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaAdminComponent } from './biblioteca-admin.component';

describe('BibliotecaAdminComponent', () => {
  let component: BibliotecaAdminComponent;
  let fixture: ComponentFixture<BibliotecaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
