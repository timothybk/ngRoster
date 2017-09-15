import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirefighterDetailComponent } from './firefighter-detail.component';

describe('FirefighterDetailComponent', () => {
  let component: FirefighterDetailComponent;
  let fixture: ComponentFixture<FirefighterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirefighterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirefighterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
