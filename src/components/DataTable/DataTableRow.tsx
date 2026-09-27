import type { ReactNode } from "react";

interface DataTableRowProps {
  children: ReactNode;
  className?: string;
}

export default function DataTableRow({ children, className = "" }: DataTableRowProps) {
  return <tr className={["group transition-colors hover:bg-slate-50/70", className].join(" ")}>{children}</tr>;
}
