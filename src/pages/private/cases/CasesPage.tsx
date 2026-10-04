import { Plus } from "lucide-react";
import Button from "../../../components/Button";
import Pagination from "../../../components/Pagination";
import SearchInput from "../../../components/SearchInput";
import useCaseAction from "./CasesAction";
import { DataTable, DataTableContent, DataTableHeader, DataTableRow } from "../../../components/DataTable";
import Dropdown from "../../../components/Dropdown";
import type { CaseStatusType } from "../../../data/model/Cases/types/CaseStatusType";
import CaseModal from "./CaseModal";

export default function CasesPage() {
  const {
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

    isOpen,
    setIsOpen,
    toggleCreateCase,
  } = useCaseAction();

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Cases</h1>
            <p className="mt-1 text-sm text-slate-500">Manage and track employee cases.</p>
          </div>
          <Button type="button" leftIcon={<Plus size={15} strokeWidth={2} />} onClick={() => setIsOpen(true)}>
            Create New
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput value={search} onChange={(event) => {
              setSearch(event);
              setCurrentPage(1);
            }} placeholder="Search cases..." debounce={400} className="sm:max-w-xs" />
            <Dropdown
              value={selectedStatus}
              options={optionStatus}
              onChange={(event) => {
                setSelectedStatus(event as CaseStatusType | "all");
              }}
              placeholder="Status"
            />
          </div>

          <DataTable>
            <DataTableHeader>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide">Case Number</th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide">Title</th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide">Priority</th>
              <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide">Created</th>
            </DataTableHeader>

            <DataTableContent>
              {dataCases.length > 0 ? (
                dataCases.map((item) => (
                  <DataTableRow key={item.id}>
                    <td className="px-4 py-3.5 text-sm text-slate-700">{item.case_number}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-700">{item.title}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-700">{item.status}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-700">{item.priority}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-500">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </DataTableRow>
                ))
              ) : (
                <DataTableRow>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <p className="text-sm font-medium text-slate-600">No cases found</p>
                      <p className="text-xs text-slate-400">There are no cases matching your current filters.</p>
                    </div>
                  </td>
                </DataTableRow>
              )}
            </DataTableContent>
          </DataTable>
          <Pagination
            currentPage={currentPage}
            totalItems={total}
            pageSize={currentLimit}
            onPageChange={setCurrentPage}
            onPageSizeChange={setCurrentLimit}
          />
        </div>
      </div>

      <CaseModal open={isOpen} onClose={() => setIsOpen(false)} employees={[]} caseData={null} onSubmit={toggleCreateCase} />
    </>
  );
}
