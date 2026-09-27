// import { MoreHorizontal, Plus } from "lucide-react";
// import { useMemo, useState } from "react";
// import Button from "../../components/Button";
// import DataTable, { type DataTableColumn } from "../../components/DataTable/DataTable";
// import Dropdown, { type DropdownOption } from "../../components/Dropdown";
// import Pagination from "../../components/Pagination";
// import SearchInput from "../../components/SearchInput";
// import StatusBadge from "../../components/StatusBadge";

// interface Leave {
//   id: string;
//   employee: string;
//   type: string;
//   startDate: string;
//   endDate: string;
//   duration: string;
//   status: string;
//   approver: string;
// }

// const leaves: Leave[] = [
//   {
//     id: "LV-001",
//     employee: "Andi Pratama",
//     type: "Annual Leave",
//     startDate: "Sep 29, 2026",
//     endDate: "Sep 30, 2026",
//     duration: "2 days",
//     status: "Approved",
//     approver: "Rami Peler",
//   },
//   {
//     id: "LV-002",
//     employee: "Budi Santoso",
//     type: "Sick Leave",
//     startDate: "Sep 26, 2026",
//     endDate: "Sep 26, 2026",
//     duration: "1 day",
//     status: "Pending",
//     approver: "Sarah Wijaya",
//   },
//   {
//     id: "LV-003",
//     employee: "Citra Lestari",
//     type: "Annual Leave",
//     startDate: "Oct 2, 2026",
//     endDate: "Oct 4, 2026",
//     duration: "3 days",
//     status: "Approved",
//     approver: "Rami Peler",
//   },
//   {
//     id: "LV-004",
//     employee: "Dimas Saputra",
//     type: "Personal Leave",
//     startDate: "Sep 28, 2026",
//     endDate: "Sep 28, 2026",
//     duration: "1 day",
//     status: "Pending",
//     approver: "Sarah Wijaya",
//   },
//   {
//     id: "LV-005",
//     employee: "Eka Putri",
//     type: "Maternity Leave",
//     startDate: "Oct 5, 2026",
//     endDate: "Nov 15, 2026",
//     duration: "42 days",
//     status: "Approved",
//     approver: "Rami Peler",
//   },
//   {
//     id: "LV-006",
//     employee: "Fajar Nugraha",
//     type: "Annual Leave",
//     startDate: "Sep 30, 2026",
//     endDate: "Oct 1, 2026",
//     duration: "2 days",
//     status: "Rejected",
//     approver: "Sarah Wijaya",
//   },
//   {
//     id: "LV-007",
//     employee: "Gina Maharani",
//     type: "Sick Leave",
//     startDate: "Sep 25, 2026",
//     endDate: "Sep 26, 2026",
//     duration: "2 days",
//     status: "Approved",
//     approver: "Rami Peler",
//   },
//   {
//     id: "LV-008",
//     employee: "Hendra Wijaya",
//     type: "Personal Leave",
//     startDate: "Oct 8, 2026",
//     endDate: "Oct 8, 2026",
//     duration: "1 day",
//     status: "Pending",
//     approver: "Sarah Wijaya",
//   },
//   {
//     id: "LV-009",
//     employee: "Intan Permata",
//     type: "Annual Leave",
//     startDate: "Oct 12, 2026",
//     endDate: "Oct 14, 2026",
//     duration: "3 days",
//     status: "Approved",
//     approver: "Rami Peler",
//   },
//   {
//     id: "LV-010",
//     employee: "Joko Susanto",
//     type: "Personal Leave",
//     startDate: "Sep 29, 2026",
//     endDate: "Sep 29, 2026",
//     duration: "1 day",
//     status: "Rejected",
//     approver: "Sarah Wijaya",
//   },
//   {
//     id: "LV-011",
//     employee: "Kevin Hartono",
//     type: "Annual Leave",
//     startDate: "Oct 19, 2026",
//     endDate: "Oct 23, 2026",
//     duration: "5 days",
//     status: "Pending",
//     approver: "Rami Peler",
//   },
// ];

// const statusOptions: DropdownOption[] = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Pending",
//     value: "pending",
//   },
//   {
//     label: "Approved",
//     value: "approved",
//   },
//   {
//     label: "Rejected",
//     value: "rejected",
//   },
// ];

// const PAGE_SIZE = 5;

// const statusColor = {
//   Pending: "amber",
//   Approved: "emerald",
//   Rejected: "red",
// } as const;

// const leaveColumns: DataTableColumn<Leave>[] = [
//   {
//     key: "employee",
//     label: "Employee",
//     render: (item) => (
//       <div>
//         <p className="text-xs font-semibold text-slate-900">{item.employee}</p>

//         <p className="mt-1 text-[11px] text-slate-400">{item.id}</p>
//       </div>
//     ),
//   },
//   {
//     key: "type",
//     label: "Leave Type",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "startDate",
//     label: "Start Date",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "endDate",
//     label: "End Date",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "duration",
//     label: "Duration",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "status",
//     label: "Status",
//     render: (item) => <StatusBadge label={item.status} color={statusColor[item.status as keyof typeof statusColor] ?? "slate"} />,
//   },
//   {
//     key: "approver",
//     label: "Approver",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "actions",
//     label: "",
//     headerClassName: "w-12",
//     className: "w-12",
//     render: (item) => (
//       <Button type="button" variant="ghost" size="sm" iconOnly aria-label={`Actions for ${item.id}`}>
//         <MoreHorizontal size={16} />
//       </Button>
//     ),
//   },
// ];

// export default function LeavePage() {
//   const [search, setSearch] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredLeaves = useMemo(() => {
//     const searchValue = search.toLowerCase().trim();

//     return leaves.filter((item) => {
//       const matchesSearch =
//         !searchValue ||
//         item.id.toLowerCase().includes(searchValue) ||
//         item.employee.toLowerCase().includes(searchValue) ||
//         item.type.toLowerCase().includes(searchValue) ||
//         item.approver.toLowerCase().includes(searchValue);

//       const matchesStatus = selectedStatus === "all" || item.status.toLowerCase() === selectedStatus;

//       return matchesSearch && matchesStatus;
//     });
//   }, [search, selectedStatus]);

//   const totalPages = Math.max(1, Math.ceil(filteredLeaves.length / PAGE_SIZE));

//   const paginatedLeaves = filteredLeaves.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

//   const handleSearch = (value: string) => {
//     setSearch(value);
//     setCurrentPage(1);
//   };

//   const handleStatusChange = (value: string) => {
//     setSelectedStatus(value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-xl font-semibold tracking-tight text-slate-900">Leave</h1>

//           <p className="mt-1 text-sm text-slate-500">Manage and monitor employee leave requests.</p>
//         </div>

//         <Button type="button" leftIcon={<Plus size={15} strokeWidth={2} />}>
//           Create New
//         </Button>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
//         <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
//           <SearchInput value={search} onChange={handleSearch} placeholder="Search leave..." className="sm:max-w-xs" />

//           <Dropdown value={selectedStatus} options={statusOptions} onChange={handleStatusChange} placeholder="Status" />
//         </div>

//         <DataTable
//           data={paginatedLeaves}
//           columns={leaveColumns}
//           rowKey={(item) => item.id}
//           emptyTitle="No leave requests found"
//           emptyDescription="Try changing your search or status filter."
//         />

//         <Pagination
//           currentPage={currentPage}
//           totalItems={filteredLeaves.length}
//           pageSize={PAGE_SIZE}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }
