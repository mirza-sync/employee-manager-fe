import { Component, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/types/types';

@Component({
  selector: 'app-create-department-modal',
  templateUrl: './create-department-modal.component.html',
  styleUrls: ['./create-department-modal.component.css'],
})
export class CreateDepartmentModalComponent {
  @Input('department') department: Department | undefined;
  name: string = '';
  deptEmployeeSelection = [];

  constructor(
    private modalService: BsModalService,
    private departmentService: DepartmentService
  ) {}

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
