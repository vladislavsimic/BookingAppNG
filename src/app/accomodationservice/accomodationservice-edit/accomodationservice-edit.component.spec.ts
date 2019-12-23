import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationserviceEditComponent } from './accomodationservice-edit.component';

describe('AccomodationserviceEditComponent', () => {
  let component: AccomodationserviceEditComponent;
  let fixture: ComponentFixture<AccomodationserviceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationserviceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationserviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
