import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkloadComponent } from './list-workload.component';

describe('ListWorkloadComponent', () => {
  let component: ListWorkloadComponent;
  let fixture: ComponentFixture<ListWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
