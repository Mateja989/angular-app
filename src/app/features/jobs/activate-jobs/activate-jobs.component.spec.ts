import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateJobsComponent } from './activate-jobs.component';

describe('ActivateJobsComponent', () => {
  let component: ActivateJobsComponent;
  let fixture: ComponentFixture<ActivateJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateJobsComponent]
    });
    fixture = TestBed.createComponent(ActivateJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
