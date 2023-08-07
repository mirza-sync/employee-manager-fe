import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './types/types';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  modalRef?: BsModalRef;
  public employees: Employee[] = [];
  isEdit: boolean = false;
  name: string = '';
  email: string = '';
  jobTitle: string = '';
  phone: string = '';
  imgUrl: string = '';

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
      id: undefined,
      name: this.name,
      email: this.email,
      jobTitle: this.jobTitle,
      phone: this.phone,
      imageUrl: this.imgUrl,
      employeeCode: undefined,
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
      id: undefined,
      name: this.name,
      email: this.email,
      jobTitle: this.jobTitle,
      phone: this.phone,
      imageUrl: this.imgUrl,
      employeeCode: undefined,
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
}
