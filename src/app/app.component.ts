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

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template);
    //
  }
}
