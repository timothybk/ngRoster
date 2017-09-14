import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirefighterEditComponent } from './firefighter-edit.component';

describe('FirefighterEditComponent', () => {
  let component: FirefighterEditComponent;
  let fixture: ComponentFixture<FirefighterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirefighterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirefighterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
