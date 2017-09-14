import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirefighterItemComponent } from './firefighter-item.component';

describe('FirefighterItemComponent', () => {
  let component: FirefighterItemComponent;
  let fixture: ComponentFixture<FirefighterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirefighterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirefighterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
