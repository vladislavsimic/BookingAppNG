import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationserviceAddComponent } from './accomodationservice-add.component';

describe('AccomodationserviceAddComponent', () => {
  let component: AccomodationserviceAddComponent;
  let fixture: ComponentFixture<AccomodationserviceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationserviceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationserviceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
