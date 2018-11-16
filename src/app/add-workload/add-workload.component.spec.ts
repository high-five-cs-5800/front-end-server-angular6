import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkloadComponent } from './add-workload.component';

describe('AddWorkloadComponent', () => {
  let component: AddWorkloadComponent;
  let fixture: ComponentFixture<AddWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
