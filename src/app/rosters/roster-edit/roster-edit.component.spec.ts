import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterEditComponent } from './roster-edit.component';

describe('RosterEditComponent', () => {
  let component: RosterEditComponent;
  let fixture: ComponentFixture<RosterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
