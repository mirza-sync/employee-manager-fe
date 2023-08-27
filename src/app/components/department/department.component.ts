import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/types/types';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  modalRef?: BsModalRef;

  constructor(
    private departmentService: DepartmentService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  openDepartmentModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate);
  }
}
