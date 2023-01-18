import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoProgramaAdminComponent } from './evento-programa-admin.component';

describe('EventoProgramaAdminComponent', () => {
  let component: EventoProgramaAdminComponent;
  let fixture: ComponentFixture<EventoProgramaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoProgramaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoProgramaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
