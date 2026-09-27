// import { MoreHorizontal, Plus } from "lucide-react";
// import { useMemo, useState } from "react";
// import Button from "../../components/Button";
// import DataTable, { type DataTableColumn } from "../../components/DataTable/DataTable";
// import Dropdown, { type DropdownOption } from "../../components/Dropdown";
// import Pagination from "../../components/Pagination";
// import SearchInput from "../../components/SearchInput";
// import StatusBadge from "../../components/StatusBadge";

// interface Attendance {
//   id: string;
//   employee: string;
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   status: string;
//   workHours: string;
// }

// const attendances: Attendance[] = [
//   {
//     id: "ATT-001",
//     employee: "Andi Pratama",
//     date: "Sep 26, 2026",
//     checkIn: "08:02",
//     checkOut: "17:04",
//     status: "Present",
//     workHours: "8h 02m",
//   },
//   {
//     id: "ATT-002",
//     employee: "Budi Santoso",
//     date: "Sep 26, 2026",
//     checkIn: "08:15",
//     checkOut: "17:10",
//     status: "Late",
//     workHours: "7h 55m",
//   },
//   {
//     id: "ATT-003",
//     employee: "Citra Lestari",
//     date: "Sep 26, 2026",
//     checkIn: "07:58",
//     checkOut: "17:01",
//     status: "Present",
//     workHours: "8h 03m",
//   },
//   {
//     id: "ATT-004",
//     employee: "Dimas Saputra",
//     date: "Sep 26, 2026",
//     checkIn: "-",
//     checkOut: "-",
//     status: "Absent",
//     workHours: "-",
//   },
//   {
//     id: "ATT-005",
//     employee: "Eka Putri",
//     date: "Sep 26, 2026",
//     checkIn: "08:01",
//     checkOut: "17:00",
//     status: "Present",
//     workHours: "8h 59m",
//   },
//   {
//     id: "ATT-006",
//     employee: "Fajar Nugraha",
//     date: "Sep 26, 2026",
//     checkIn: "09:12",
//     checkOut: "17:05",
//     status: "Late",
//     workHours: "7h 53m",
//   },
//   {
//     id: "ATT-007",
//     employee: "Gina Maharani",
//     date: "Sep 26, 2026",
//     checkIn: "08:05",
//     checkOut: "17:02",
//     status: "Present",
//     workHours: "8h 57m",
//   },
//   {
//     id: "ATT-008",
//     employee: "Hendra Wijaya",
//     date: "Sep 26, 2026",
//     checkIn: "-",
//     checkOut: "-",
//     status: "On Leave",
//     workHours: "-",
//   },
//   {
//     id: "ATT-009",
//     employee: "Intan Permata",
//     date: "Sep 26, 2026",
//     checkIn: "08:00",
//     checkOut: "16:58",
//     status: "Present",
//     workHours: "8h 58m",
//   },
//   {
//     id: "ATT-010",
//     employee: "Joko Susanto",
//     date: "Sep 26, 2026",
//     checkIn: "08:32",
//     checkOut: "17:03",
//     status: "Late",
//     workHours: "8h 31m",
//   },
//   {
//     id: "ATT-011",
//     employee: "Kevin Hartono",
//     date: "Sep 26, 2026",
//     checkIn: "07:55",
//     checkOut: "17:00",
//     status: "Present",
//     workHours: "9h 05m",
//   },
// ];

// const statusOptions: DropdownOption[] = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Present",
//     value: "present",
//   },
//   {
//     label: "Late",
//     value: "late",
//   },
//   {
//     label: "Absent",
//     value: "absent",
//   },
//   {
//     label: "On Leave",
//     value: "on_leave",
//   },
// ];

// const PAGE_SIZE = 5;

// const statusColor = {
//   Present: "emerald",
//   Late: "amber",
//   Absent: "red",
//   "On Leave": "purple",
// } as const;

// const attendanceColumns: DataTableColumn<Attendance>[] = [
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
//     key: "date",
//     label: "Date",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "checkIn",
//     label: "Check In",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "checkOut",
//     label: "Check Out",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "workHours",
//     label: "Work Hours",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "status",
//     label: "Status",
//     render: (item) => <StatusBadge label={item.status} color={statusColor[item.status as keyof typeof statusColor] ?? "slate"} />,
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

// export default function AttendancePage() {
//   const [search, setSearch] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredAttendances = useMemo(() => {
//     const searchValue = search.toLowerCase().trim();

//     return attendances.filter((item) => {
//       const matchesSearch =
//         !searchValue ||
//         item.id.toLowerCase().includes(searchValue) ||
//         item.employee.toLowerCase().includes(searchValue) ||
//         item.date.toLowerCase().includes(searchValue) ||
//         item.status.toLowerCase().includes(searchValue);

//       const matchesStatus = selectedStatus === "all" || item.status.toLowerCase().replace(" ", "_") === selectedStatus;

//       return matchesSearch && matchesStatus;
//     });
//   }, [search, selectedStatus]);

//   const totalPages = Math.max(1, Math.ceil(filteredAttendances.length / PAGE_SIZE));

//   const paginatedAttendances = filteredAttendances.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
//           <h1 className="text-xl font-semibold tracking-tight text-slate-900">Attendance</h1>

//           <p className="mt-1 text-sm text-slate-500">Manage and monitor employee attendance.</p>
//         </div>

//         <Button type="button" leftIcon={<Plus size={15} strokeWidth={2} />}>
//           Create New
//         </Button>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
//         <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
//           <SearchInput value={search} onChange={handleSearch} placeholder="Search attendance..." className="sm:max-w-xs" />

//           <Dropdown value={selectedStatus} options={statusOptions} onChange={handleStatusChange} placeholder="Status" />
//         </div>

//         <DataTable
//           data={paginatedAttendances}
//           columns={attendanceColumns}
//           rowKey={(item) => item.id}
//           emptyTitle="No attendance found"
//           emptyDescription="Try changing your search or status filter."
//         />

//         <Pagination
//           currentPage={currentPage}
//           totalItems={filteredAttendances.length}
//           pageSize={PAGE_SIZE}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }
