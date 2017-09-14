import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirefightersComponent } from './firefighters.component';

describe('FirefightersComponent', () => {
  let component: FirefightersComponent;
  let fixture: ComponentFixture<FirefightersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirefightersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirefightersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
