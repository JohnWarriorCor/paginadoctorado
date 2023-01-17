import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaInstitucionalComponent } from './agenda-institucional.component';

describe('AgendaInstitucionalComponent', () => {
  let component: AgendaInstitucionalComponent;
  let fixture: ComponentFixture<AgendaInstitucionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaInstitucionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
