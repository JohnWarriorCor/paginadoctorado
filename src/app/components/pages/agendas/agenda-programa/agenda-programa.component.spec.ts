import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaProgramaComponent } from './agenda-programa.component';

describe('AgendaProgramaComponent', () => {
  let component: AgendaProgramaComponent;
  let fixture: ComponentFixture<AgendaProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
