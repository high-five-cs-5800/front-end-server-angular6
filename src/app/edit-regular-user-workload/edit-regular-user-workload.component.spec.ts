import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegularUserWorkloadComponent } from './edit-regular-user-workload.component';

describe('EditRegularUserWorkloadComponent', () => {
  let component: EditRegularUserWorkloadComponent;
  let fixture: ComponentFixture<EditRegularUserWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegularUserWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegularUserWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
