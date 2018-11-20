import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegularUserWorkloadComponent } from './manage-regular-user-workload.component';

describe('ManageRegularUserWorkloadComponent', () => {
  let component: ManageRegularUserWorkloadComponent;
  let fixture: ComponentFixture<ManageRegularUserWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRegularUserWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRegularUserWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
