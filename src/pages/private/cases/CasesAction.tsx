import { useCallback, useEffect, useState } from "react";
import type { DropdownOption } from "../../../components/Dropdown";
import type { CaseStatusType } from "../../../data/model/Cases/types/CaseStatusType";
import type { CasesResponse } from "../../../data/response/Cases/CasesResponse";
import { casesService } from "../../../services/Cases.service";
import type { CasesCreateRequest } from "../../../data/request/Cases/CasesCreateRequest";
import type { CreateCaseFormData } from "./CaseModal";
import type { PaginationRequest } from "../../../common/request/PaginationRequest";
import type { EmployeeSearchRequest } from "../../../data/request/Employee/EmployeeSearchRequest";
import { employeeService } from "../../../services/Employee.service";
import type { EmployeeResponse } from "../../../data/response/Employee/EmployeeResponse";

const optionStatus: DropdownOption[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Resolved",
    value: "resolved",
  },
  {
    label: "Closed",
    value: "closed",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];

export default function useCaseAction() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<CaseStatusType | "all">("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataCases, setDataCases] = useState<CasesResponse[]>([]);

  const [loadingEmployee, setLoadingEmployee] = useState(false);
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [employeeError, setEmployeeError] = useState<string | null>(null);

  const fetchCases = useCallback(async () => {
    try {
      const response = await casesService.get({
        page: currentPage,
        limit: currentLimit,
        request: {
          search,
          status: selectedStatus === "all" ? null : selectedStatus,
        },
      });

      setDataCases(response.data ?? []);
      setTotal(response.pagination?.total ?? 0);
    } catch (error) {
      console.error(error);
      setError("Failed to load cases.");
      setDataCases([]);
      setTotal(0);
    }
  }, [search, selectedStatus, currentPage, currentLimit]);

  const createCases = useCallback(async (request: CasesCreateRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await casesService.create(request);
      return response;
    } catch (error) {
      console.error(error);
      setError("Failed to create case.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmployee = useCallback(async (request: PaginationRequest<EmployeeSearchRequest>) => {
    try {
      setLoadingEmployee(true);
      const response = await employeeService.get(request);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      setLoadingEmployee(false);
      setError("Failed to get employee.");
    } finally {
      setLoadingEmployee(false);
    }
  }, []);

  async function toggleCreateCase(param: CreateCaseFormData) {
    try {
      await createCases({
        case_number: param.case_number,
        title: param.title,
        description: param.description,
        status: param.status,
        priority: param.priority,
        pics: [],
        members: [],
      });

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  return {
    optionStatus,

    search,
    setSearch,

    selectedStatus,
    setSelectedStatus,

    currentPage,
    setCurrentPage,

    currentLimit,
    setCurrentLimit,

    total,
    dataCases,

    loading,
    error,
    fetchCases,

    isOpen,
    setIsOpen,

    toggleCreateCase,
    
    getEmployee,
    employees,
  };
}
