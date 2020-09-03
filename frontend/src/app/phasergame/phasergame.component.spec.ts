import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasergameComponent } from './phasergame.component';

describe('PhasergameComponent', () => {
  let component: PhasergameComponent;
  let fixture: ComponentFixture<PhasergameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasergameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasergameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
