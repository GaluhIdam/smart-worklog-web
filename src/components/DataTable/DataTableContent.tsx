import type { ReactNode } from "react";

interface DataTableContentProps {
  children: ReactNode;
  className?: string;
}

export default function DataTableContent({ children, className = "" }: DataTableContentProps) {
  return <tbody className={["divide-y divide-slate-100", className].join(" ")}>{children}</tbody>;
}
