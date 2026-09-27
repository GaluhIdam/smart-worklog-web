import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  debounce?: number;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className = "",
  debounce = 400,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (debounce <= 0) {
      return;
    }
    const timer = window.setTimeout(() => {
      onChangeRef.current(inputValue);
    }, debounce);
    return () => {
      window.clearTimeout(timer);
    };
  }, [inputValue, debounce]);

  const handleChange = (value: string) => {
    setInputValue(value);
    if (debounce <= 0) {
      onChangeRef.current(value);
    }
  };

  const handleClear = () => {
    setInputValue("");
    onChangeRef.current("");
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search size={15} strokeWidth={1.8} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={inputValue}
        disabled={disabled}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        className={[
          "h-9 w-full rounded-md border bg-white pl-9 pr-9 text-xs text-slate-900 outline-none transition-colors placeholder:text-slate-400",
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
            : "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100",
        ].join(" ")}
      />

      {inputValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <X size={13} strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}
