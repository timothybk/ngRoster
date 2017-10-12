import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCreateListComponent } from './roster-create-list.component';

describe('RosterCreateListComponent', () => {
  let component: RosterCreateListComponent;
  let fixture: ComponentFixture<RosterCreateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterCreateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
