import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirefighterListComponent } from './firefighter-list.component';

describe('FirefighterListComponent', () => {
  let component: FirefighterListComponent;
  let fixture: ComponentFixture<FirefighterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirefighterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirefighterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
