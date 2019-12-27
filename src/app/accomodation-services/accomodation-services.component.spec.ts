import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationServicesComponent } from './accomodation-services.component';

describe('AccomodationServicesComponent', () => {
  let component: AccomodationServicesComponent;
  let fixture: ComponentFixture<AccomodationServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
