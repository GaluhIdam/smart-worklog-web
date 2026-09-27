import type { ReactNode } from "react";

interface DataTableProps {
  children: ReactNode;
  className?: string;
}

export default function DataTable({ children, className = "" }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={["w-full min-w-[800px] text-left", className].join(" ")}>{children}</table>
    </div>
  );
}
