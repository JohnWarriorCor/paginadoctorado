import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominacionAdminComponent } from './denominacion-admin.component';

describe('DenominacionAdminComponent', () => {
  let component: DenominacionAdminComponent;
  let fixture: ComponentFixture<DenominacionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenominacionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenominacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
