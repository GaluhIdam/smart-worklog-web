import { httpService } from "../common/http/HttpService";
import type { PaginationRequest } from "../common/request/PaginationRequest";
import type { CommonResponse } from "../common/response/CommonResponse";
import type { PaginationResponse } from "../common/response/PaginationResponse";
import type { EmployeeCreateRequest } from "../data/request/Employee/EmployeeCreateRequest";
import type { EmployeeSearchRequest } from "../data/request/Employee/EmployeeSearchRequest";
import type { EmployeeUpdateRequest } from "../data/request/Employee/EmployeeUpdateRequest";
import type { EmployeeResponse } from "../data/response/Employee/EmployeeResponse";

export class EmployeeService {
  async get(request: PaginationRequest<EmployeeSearchRequest>): Promise<PaginationResponse<EmployeeResponse>> {
    return httpService.get<PaginationResponse<EmployeeResponse>>("/employees", {
      params: {
        search: request.request.search,
        page: request.page,
        limit: request.limit,
      },
    });
  }

  async create(request: EmployeeCreateRequest): Promise<CommonResponse<null>> {
    return httpService.post<CommonResponse<null>>("/employees", request);
  }

  async update(id: string, request: EmployeeUpdateRequest): Promise<void> {
    await httpService.put<void>(`/employees/${id}`, request);
  }

  async delete(id: string): Promise<void> {
    await httpService.delete<void>(`/employees/${id}`);
  }
}

export const employeeService = new EmployeeService();
