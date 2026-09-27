import type { EmployeeModel } from "./Employee.model";
import type { RoleModel } from "./Role.model";

export interface UserModel {
  id: number;
  role_id: number;
  name: string;
  email: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
  role: RoleModel;
  employee: EmployeeModel | null;
}
