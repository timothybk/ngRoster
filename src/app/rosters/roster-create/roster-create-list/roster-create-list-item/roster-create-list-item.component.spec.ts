import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCreateListItemComponent } from './roster-create-list-item.component';

describe('RosterCreateListItemComponent', () => {
  let component: RosterCreateListItemComponent;
  let fixture: ComponentFixture<RosterCreateListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterCreateListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterCreateListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
