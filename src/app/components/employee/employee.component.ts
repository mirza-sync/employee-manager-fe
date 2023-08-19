import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/types/types';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  modalRef?: BsModalRef;
  public employees: Employee[] = [];
  isEdit: boolean = false;
  name: string = '';
  email: string = '';
  jobTitle: string = '';
  phone: string = '';
  imgUrl: string = '';
  employeeCode: string | null = null;
  employee: Employee = {} as Employee;

  constructor(
    private employeeService: EmployeeService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }

  openModal(
    template: TemplateRef<any>,
    mode: 'add' | 'edit',
    employee?: Employee
  ) {
    if (mode === 'edit' && employee) {
      this.isEdit = true;
      this.employee = employee;

      this.name = employee.name;
      this.email = employee.email;
      this.jobTitle = employee.jobTitle;
      this.phone = employee.phone;
      // this.imgUrl = employee.imageUrl;
    }
    this.modalRef = this.modalService.show(template);
  }

  addEmployee() {
    const payload: Employee = {
      name: this.name,
      email: this.email,
      jobTitle: this.jobTitle,
      phone: this.phone,
      imageUrl: this.imgUrl,
    };

    this.employeeService.addEmployee(payload).subscribe({
      next: (employee) => {
        console.log(`${employee.name} added`);
        this.modalRef?.hide();
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }

  editEmployee() {
    const payload: Employee = {
      id: this.employee.id,
      name: this.name,
      email: this.email,
      jobTitle: this.jobTitle,
      phone: this.phone,
      imageUrl: this.imgUrl,
      employeeCode: this.employee.employeeCode,
    };

    this.employeeService.updateEmployee(payload).subscribe({
      next: (employee) => {
        console.log(`${employee.name} updated`);
        this.modalRef?.hide();
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id!).subscribe({
      next: () => {
        console.log(`${employee.name} deleted`);
        this.modalRef?.hide();
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
