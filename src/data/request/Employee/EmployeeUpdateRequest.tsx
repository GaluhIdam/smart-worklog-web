import type { EmployeeModel } from "../../model/Employee.model";

export type EmployeeUpdateRequest = Omit<EmployeeModel, "created_at" | "updated_at">;
