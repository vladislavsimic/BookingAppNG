import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationserviceComponent } from './accomodationservice.component';

describe('AccomodationserviceComponent', () => {
  let component: AccomodationserviceComponent;
  let fixture: ComponentFixture<AccomodationserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
