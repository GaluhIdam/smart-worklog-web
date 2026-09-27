import type { EmployeeModel } from "../../model/Employee.model";

export type EmployeeCreateRequest = Omit<EmployeeModel, "id" | "created_at" | "updated_at">;
