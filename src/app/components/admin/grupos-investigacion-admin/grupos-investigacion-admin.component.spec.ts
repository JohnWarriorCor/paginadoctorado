import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposInvestigacionAdminComponent } from './grupos-investigacion-admin.component';

describe('GruposInvestigacionAdminComponent', () => {
  let component: GruposInvestigacionAdminComponent;
  let fixture: ComponentFixture<GruposInvestigacionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposInvestigacionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposInvestigacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
