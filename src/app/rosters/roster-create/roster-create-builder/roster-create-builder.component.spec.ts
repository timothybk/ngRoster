import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCreateBuilderComponent } from './roster-create-builder.component';

describe('RosterCreateBuilderComponent', () => {
  let component: RosterCreateBuilderComponent;
  let fixture: ComponentFixture<RosterCreateBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterCreateBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterCreateBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
