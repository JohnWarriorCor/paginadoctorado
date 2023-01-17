import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoInstitucionalComponent } from './evento-institucional.component';

describe('EventoInstitucionalComponent', () => {
  let component: EventoInstitucionalComponent;
  let fixture: ComponentFixture<EventoInstitucionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoInstitucionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
