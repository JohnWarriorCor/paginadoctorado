import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesAdminComponent } from './docentes-admin.component';

describe('DocentesAdminComponent', () => {
  let component: DocentesAdminComponent;
  let fixture: ComponentFixture<DocentesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocentesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
