import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Department, Employee } from 'src/app/types/types';

@Component({
  selector: 'app-create-department-modal',
  templateUrl: './create-department-modal.component.html',
  styleUrls: ['./create-department-modal.component.css'],
})
export class CreateDepartmentModalComponent implements OnInit {
  @Input('department') department: Department = {} as Department;
  name: string = '';
  deptEmployeeSelection = [];
  employees: Employee[] = [];
  employeeNotThisDeparment: Employee[] = [];

  constructor(
    private modalService: BsModalService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  addDepartment() {
    const payload = {
      name: this.name,
      employees: this.deptEmployeeSelection,
    } as Department;

    this.departmentService.addDepartment(payload).subscribe((res) => {
      console.log(res);
    });
    this.modalService.hide();
  }

  closeModal() {
    this.modalService.hide();
  }
}
