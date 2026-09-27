import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({ value, options, onChange, placeholder = "Select", disabled = false, className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          "inline-flex h-9 min-w-32 cursor-pointer items-center justify-between gap-2 rounded-md border px-3 text-xs font-medium transition-colors",
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
            : open
              ? "border-slate-300 bg-slate-50 text-slate-900"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900",
        ].join(" ")}>
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>

        <ChevronDown size={14} strokeWidth={1.8} className={["shrink-0 transition-transform", open ? "rotate-180" : ""].join(" ")} />
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          className="absolute right-0 top-11 z-20 w-full min-w-44 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg shadow-slate-950/5">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={[
                  "flex h-9 w-full cursor-pointer items-center justify-between rounded-md px-2.5 text-xs font-medium transition-colors",
                  selected ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}>
                <span>{option.label}</span>

                {selected && <Check size={14} strokeWidth={2} className="text-slate-900" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
