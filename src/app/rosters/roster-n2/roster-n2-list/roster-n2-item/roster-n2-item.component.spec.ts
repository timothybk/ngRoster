import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterN2ItemComponent } from './roster-n2-item.component';

describe('RosterN2ItemComponent', () => {
  let component: RosterN2ItemComponent;
  let fixture: ComponentFixture<RosterN2ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterN2ItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterN2ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
