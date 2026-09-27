interface StatusBadgeProps {
  label: string;
  color?: "blue" | "amber" | "emerald" | "red" | "slate" | "purple";
}

const colorClass = {
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  emerald: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-700",
  slate: "bg-slate-50 text-slate-600",
  purple: "bg-purple-50 text-purple-700",
};

export default function StatusBadge({ label, color = "slate" }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${colorClass[color]}`}>{label}</span>;
}
