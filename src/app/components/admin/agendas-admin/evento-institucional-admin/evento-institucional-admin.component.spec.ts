import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoInstitucionalAdminComponent } from './evento-institucional-admin.component';

describe('EventoInstitucionalAdminComponent', () => {
  let component: EventoInstitucionalAdminComponent;
  let fixture: ComponentFixture<EventoInstitucionalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoInstitucionalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoInstitucionalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
