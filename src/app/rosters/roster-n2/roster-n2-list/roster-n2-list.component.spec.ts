import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterN2ListComponent } from './roster-n2-list.component';

describe('RosterN2ListComponent', () => {
  let component: RosterN2ListComponent;
  let fixture: ComponentFixture<RosterN2ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterN2ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterN2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
