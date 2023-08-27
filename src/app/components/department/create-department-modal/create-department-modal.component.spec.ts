import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentModalComponent } from './create-department-modal.component';

describe('CreateDepartmentModalComponent', () => {
  let component: CreateDepartmentModalComponent;
  let fixture: ComponentFixture<CreateDepartmentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepartmentModalComponent]
    });
    fixture = TestBed.createComponent(CreateDepartmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
