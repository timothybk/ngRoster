import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterItemComponent } from './roster-item.component';

describe('RosterItemComponent', () => {
  let component: RosterItemComponent;
  let fixture: ComponentFixture<RosterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
