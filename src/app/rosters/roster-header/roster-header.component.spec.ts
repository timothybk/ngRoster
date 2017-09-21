import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterHeaderComponent } from './roster-header.component';

describe('RosterHeaderComponent', () => {
  let component: RosterHeaderComponent;
  let fixture: ComponentFixture<RosterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
