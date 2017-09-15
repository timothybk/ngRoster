import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterStartComponent } from './roster-start.component';

describe('RosterStartComponent', () => {
  let component: RosterStartComponent;
  let fixture: ComponentFixture<RosterStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
