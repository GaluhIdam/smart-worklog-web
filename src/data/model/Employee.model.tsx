export interface EmployeeModel {
  id: number;
  user_id: number;
  employee_code: string;
  phone: string;
  position: string;
  department: string;
  join_date: Date;
  birth_date: Date;
  gender: string;
  address: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
