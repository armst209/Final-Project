import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phasergame2Component } from './phasergame2.component';

describe('Phasergame2Component', () => {
  let component: Phasergame2Component;
  let fixture: ComponentFixture<Phasergame2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phasergame2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phasergame2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
