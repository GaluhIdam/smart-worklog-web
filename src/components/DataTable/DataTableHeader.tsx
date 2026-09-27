import type { ReactNode } from "react";

interface DataTableHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function DataTableHeader({ children, className = "" }: DataTableHeaderProps) {
  return (
    <thead>
      <tr className={["border-b border-slate-200 bg-slate-50/70", className].join(" ")}>{children}</tr>
    </thead>
  );
}
