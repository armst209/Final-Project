import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phasergame3Component } from './phasergame3.component';

describe('Phasergame3Component', () => {
  let component: Phasergame3Component;
  let fixture: ComponentFixture<Phasergame3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phasergame3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phasergame3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
