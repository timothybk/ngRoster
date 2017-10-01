import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterN2EditComponent } from './roster-n2-edit.component';

describe('RosterN2EditComponent', () => {
  let component: RosterN2EditComponent;
  let fixture: ComponentFixture<RosterN2EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterN2EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterN2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
