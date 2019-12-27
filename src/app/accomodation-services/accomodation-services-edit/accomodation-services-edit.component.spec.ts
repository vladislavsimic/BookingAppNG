import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationServicesEditComponent } from './accomodation-services-edit.component';

describe('AccomodationServicesEditComponent', () => {
  let component: AccomodationServicesEditComponent;
  let fixture: ComponentFixture<AccomodationServicesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationServicesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationServicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
