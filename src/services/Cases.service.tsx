import { httpService } from "../common/http/HttpService";
import type { PaginationRequest } from "../common/request/PaginationRequest";
import type { CommonResponse } from "../common/response/CommonResponse";
import type { PaginationResponse } from "../common/response/PaginationResponse";
import type { CasesCreateRequest } from "../data/request/Cases/CasesCreateRequest";
import type { CasesSearchRequest } from "../data/request/Cases/CasesSearchRequest";
import type { CasesUpdateRequest } from "../data/request/Cases/CasesUpdateRequest";
import type { CasesResponse } from "../data/response/Cases/CasesResponse";

export class CasesService {
  async get(request: PaginationRequest<CasesSearchRequest>): Promise<PaginationResponse<CasesResponse>> {
    return httpService.get<PaginationResponse<CasesResponse>>("/cases", {
      params: {
        search: request.request.search,
        status: request.request.status,
        page: request.page,
        limit: request.limit,
      },
    });
  }

  async create(request: CasesCreateRequest): Promise<CommonResponse<null>> {
    return httpService.post<CommonResponse<null>>("/cases", request);
  }

  async update(id: string, request: CasesUpdateRequest): Promise<void> {
    await httpService.put<void>(`/cases/${id}`, request);
  }

  async delete(id: string): Promise<void> {
    await httpService.delete<void>(`/cases/${id}`);
  }
}

export const casesService = new CasesService();
