import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkloadComponent } from './edit-workload.component';

describe('EditWorkloadComponent', () => {
  let component: EditWorkloadComponent;
  let fixture: ComponentFixture<EditWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
