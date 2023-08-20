import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/department/all`);
  }

  public addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(
      `${this.apiServerUrl}/department/add`,
      department
    );
  }
}
