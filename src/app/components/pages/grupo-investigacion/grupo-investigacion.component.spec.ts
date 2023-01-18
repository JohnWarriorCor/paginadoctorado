import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoInvestigacionComponent } from './grupo-investigacion.component';

describe('GrupoInvestigacionComponent', () => {
  let component: GrupoInvestigacionComponent;
  let fixture: ComponentFixture<GrupoInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoInvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
