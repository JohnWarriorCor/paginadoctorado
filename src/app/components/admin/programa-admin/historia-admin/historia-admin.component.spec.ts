import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaAdminComponent } from './historia-admin.component';

describe('HistoriaAdminComponent', () => {
  let component: HistoriaAdminComponent;
  let fixture: ComponentFixture<HistoriaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
