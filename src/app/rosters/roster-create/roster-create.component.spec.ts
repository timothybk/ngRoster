import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCreateComponent } from './roster-create.component';

describe('RosterCreateComponent', () => {
  let component: RosterCreateComponent;
  let fixture: ComponentFixture<RosterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
