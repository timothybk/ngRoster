import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterPumpsComponent } from './roster-pumps.component';

describe('RosterPumpsComponent', () => {
  let component: RosterPumpsComponent;
  let fixture: ComponentFixture<RosterPumpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterPumpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterPumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
