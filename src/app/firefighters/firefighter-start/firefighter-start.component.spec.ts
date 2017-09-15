import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirefighterStartComponent } from './firefighter-start.component';

describe('FirefighterStartComponent', () => {
  let component: FirefighterStartComponent;
  let fixture: ComponentFixture<FirefighterStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirefighterStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirefighterStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
