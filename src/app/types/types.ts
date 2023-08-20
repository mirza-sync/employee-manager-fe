export interface Employee {
  id?: number;
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  imageUrl: string;
  employeeCode?: string;
}

export type Department = {
  id?: number;
  name: string;
  employees: Employee[];
};
