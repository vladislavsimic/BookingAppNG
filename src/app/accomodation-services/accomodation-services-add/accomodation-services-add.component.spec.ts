import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationServicesAddComponent } from './accomodation-services-add.component';

describe('AccomodationServicesAddComponent', () => {
  let component: AccomodationServicesAddComponent;
  let fixture: ComponentFixture<AccomodationServicesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationServicesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationServicesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
