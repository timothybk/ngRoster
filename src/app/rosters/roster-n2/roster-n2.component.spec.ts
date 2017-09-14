import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterN2Component } from './roster-n2.component';

describe('RosterN2Component', () => {
  let component: RosterN2Component;
  let fixture: ComponentFixture<RosterN2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterN2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterN2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
