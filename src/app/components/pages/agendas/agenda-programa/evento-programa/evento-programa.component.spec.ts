import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoProgramaComponent } from './evento-programa.component';

describe('EventoProgramaComponent', () => {
  let component: EventoProgramaComponent;
  let fixture: ComponentFixture<EventoProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
