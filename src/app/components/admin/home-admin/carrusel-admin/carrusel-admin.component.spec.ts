import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselAdminComponent } from './carrusel-admin.component';

describe('CarruselAdminComponent', () => {
  let component: CarruselAdminComponent;
  let fixture: ComponentFixture<CarruselAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarruselAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
