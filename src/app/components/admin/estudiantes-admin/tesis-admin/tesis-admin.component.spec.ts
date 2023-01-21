import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisAdminComponent } from './tesis-admin.component';

describe('TesisAdminComponent', () => {
  let component: TesisAdminComponent;
  let fixture: ComponentFixture<TesisAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesisAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
