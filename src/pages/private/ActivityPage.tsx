// import { MoreHorizontal, Plus } from "lucide-react";
// import { useMemo, useState } from "react";
// import Button from "../../components/Button";
// import DataTable, { type DataTableColumn } from "../../components/DataTable/DataTable";
// import Dropdown, { type DropdownOption } from "../../components/Dropdown";
// import Pagination from "../../components/Pagination";
// import SearchInput from "../../components/SearchInput";
// import StatusBadge from "../../components/StatusBadge";

// interface Activity {
//   id: string;
//   employee: string;
//   activity: string;
//   type: string;
//   description: string;
//   createdAt: string;
// }

// const activities: Activity[] = [
//   {
//     id: "ACT-001",
//     employee: "Andi Pratama",
//     activity: "Attendance Check-in",
//     type: "Attendance",
//     description: "Checked in at the office",
//     createdAt: "Sep 26, 2026 08:02",
//   },
//   {
//     id: "ACT-002",
//     employee: "Budi Santoso",
//     activity: "Leave Request",
//     type: "Leave",
//     description: "Submitted annual leave request",
//     createdAt: "Sep 26, 2026 07:45",
//   },
//   {
//     id: "ACT-003",
//     employee: "Citra Lestari",
//     activity: "Profile Update",
//     type: "Employee",
//     description: "Updated employee profile information",
//     createdAt: "Sep 25, 2026 16:32",
//   },
//   {
//     id: "ACT-004",
//     employee: "Dimas Saputra",
//     activity: "Attendance Check-out",
//     type: "Attendance",
//     description: "Checked out from the office",
//     createdAt: "Sep 25, 2026 17:04",
//   },
//   {
//     id: "ACT-005",
//     employee: "Eka Putri",
//     activity: "Leave Approved",
//     type: "Leave",
//     description: "Leave request was approved",
//     createdAt: "Sep 25, 2026 15:20",
//   },
//   {
//     id: "ACT-006",
//     employee: "Fajar Nugraha",
//     activity: "Case Created",
//     type: "Case",
//     description: "Created a new employee case",
//     createdAt: "Sep 24, 2026 14:18",
//   },
//   {
//     id: "ACT-007",
//     employee: "Gina Maharani",
//     activity: "Employee Created",
//     type: "Employee",
//     description: "New employee record was created",
//     createdAt: "Sep 24, 2026 11:42",
//   },
//   {
//     id: "ACT-008",
//     employee: "Hendra Wijaya",
//     activity: "Attendance Correction",
//     type: "Attendance",
//     description: "Submitted attendance correction request",
//     createdAt: "Sep 23, 2026 10:15",
//   },
//   {
//     id: "ACT-009",
//     employee: "Intan Permata",
//     activity: "Case Updated",
//     type: "Case",
//     description: "Updated case status",
//     createdAt: "Sep 23, 2026 09:28",
//   },
//   {
//     id: "ACT-010",
//     employee: "Joko Susanto",
//     activity: "Leave Rejected",
//     type: "Leave",
//     description: "Leave request was rejected",
//     createdAt: "Sep 22, 2026 16:05",
//   },
//   {
//     id: "ACT-011",
//     employee: "Kevin Hartono",
//     activity: "Password Changed",
//     type: "Security",
//     description: "Changed account password",
//     createdAt: "Sep 22, 2026 13:47",
//   },
// ];

// const typeOptions: DropdownOption[] = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Attendance",
//     value: "attendance",
//   },
//   {
//     label: "Leave",
//     value: "leave",
//   },
//   {
//     label: "Employee",
//     value: "employee",
//   },
//   {
//     label: "Case",
//     value: "case",
//   },
//   {
//     label: "Security",
//     value: "security",
//   },
// ];

// const PAGE_SIZE = 5;

// const typeColor = {
//   Attendance: "blue",
//   Leave: "amber",
//   Employee: "emerald",
//   Case: "purple",
//   Security: "slate",
// } as const;

// const activityColumns: DataTableColumn<Activity>[] = [
//   {
//     key: "activity",
//     label: "Activity",
//     render: (item) => (
//       <div>
//         <p className="text-xs font-semibold text-slate-900">{item.activity}</p>

//         <p className="mt-1 text-[11px] text-slate-400">{item.id}</p>
//       </div>
//     ),
//   },
//   {
//     key: "employee",
//     label: "Employee",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "type",
//     label: "Type",
//     render: (item) => <StatusBadge label={item.type} color={typeColor[item.type as keyof typeof typeColor] ?? "slate"} />,
//   },
//   {
//     key: "description",
//     label: "Description",
//     className: "text-xs text-slate-600",
//   },
//   {
//     key: "createdAt",
//     label: "Created",
//     className: "text-xs text-slate-500",
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

// export default function ActivitiesPage() {
//   const [search, setSearch] = useState("");
//   const [selectedType, setSelectedType] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredActivities = useMemo(() => {
//     const searchValue = search.toLowerCase().trim();

//     return activities.filter((item) => {
//       const matchesSearch =
//         !searchValue ||
//         item.id.toLowerCase().includes(searchValue) ||
//         item.employee.toLowerCase().includes(searchValue) ||
//         item.activity.toLowerCase().includes(searchValue) ||
//         item.description.toLowerCase().includes(searchValue);

//       const matchesType = selectedType === "all" || item.type.toLowerCase() === selectedType;

//       return matchesSearch && matchesType;
//     });
//   }, [search, selectedType]);

//   const totalPages = Math.max(1, Math.ceil(filteredActivities.length / PAGE_SIZE));

//   const paginatedActivities = filteredActivities.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

//   const handleSearch = (value: string) => {
//     setSearch(value);
//     setCurrentPage(1);
//   };

//   const handleTypeChange = (value: string) => {
//     setSelectedType(value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-xl font-semibold tracking-tight text-slate-900">Activities</h1>
//           <p className="mt-1 text-sm text-slate-500">Monitor employee and system activities.</p>
//         </div>
//         <Button type="button" leftIcon={<Plus size={15} strokeWidth={2} />}>
//           Create New
//         </Button>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
//         <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
//           <SearchInput value={search} onChange={handleSearch} placeholder="Search activities..." className="sm:max-w-xs" />
//           <Dropdown value={selectedType} options={typeOptions} onChange={handleTypeChange} placeholder="Activity type" />
//         </div>

//         <DataTable
//           data={paginatedActivities}
//           columns={activityColumns}
//           rowKey={(item) => item.id}
//           emptyTitle="No activities found"
//           emptyDescription="Try changing your search or activity type filter."
//         />

//         <Pagination
//           currentPage={currentPage}
//           totalItems={filteredActivities.length}
//           pageSize={PAGE_SIZE}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }
