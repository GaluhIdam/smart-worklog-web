import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "text";

type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300",
  outline: "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  text: "text-slate-600 hover:text-slate-900 hover:underline",
};

const sizeClass: Record<ButtonSize, string> = {
  xs: "h-7 rounded-md px-2.5 text-[11px]",
  sm: "h-8 rounded-md px-3 text-xs",
  md: "h-9 rounded-md px-3.5 text-xs",
  lg: "h-10 rounded-md px-4 text-sm",
};

const iconSizeClass: Record<ButtonSize, string> = {
  xs: "h-7 w-7 rounded-md",
  sm: "h-8 w-8 rounded-md",
  md: "h-9 w-9 rounded-md",
  lg: "h-10 w-10 rounded-md",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        "inline-flex cursor-pointer items-center justify-center gap-2 font-medium outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-slate-300",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClass[variant],
        iconOnly ? iconSizeClass[size] : sizeClass[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}>
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {leftIcon}
          {!iconOnly && children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
