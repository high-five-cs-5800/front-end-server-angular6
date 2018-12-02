import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddWorkloadComponent } from './client-add-workload.component';

describe('ClientAddWorkloadComponent', () => {
  let component: ClientAddWorkloadComponent;
  let fixture: ComponentFixture<ClientAddWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAddWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
