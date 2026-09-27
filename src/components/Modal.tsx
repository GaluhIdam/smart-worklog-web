import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;

  title?: string;
  description?: string;

  children: ReactNode;
  footer?: ReactNode;

  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";

  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;

  showClose?: boolean;
  scrollable?: boolean;

  loading?: boolean;
  className?: string;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-[calc(100vw-2rem)]",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  closeOnEscape = true,
  showClose = true,
  scrollable = false,
  loading = false,
  className = "",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descriptionId = useId();

  /*
   * Handle body scroll and focus.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = originalOverflow;

      previousActiveElement.current?.focus();
    };
  }, [open]);

  /*
   * Handle ESC key.
   */
  useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();

        if (!loading) {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEscape, loading, onClose]);

  if (!open) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlay && !loading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={[
          "relative flex w-full flex-col overflow-hidden",
          "rounded-xl border border-gray-200 bg-white",
          "shadow-2xl outline-none",
          "animate-in fade-in zoom-in-95 duration-150",
          sizes[size],
          scrollable ? "max-h-[calc(100vh-2rem)]" : "",
          className,
        ].join(" ")}
        onClick={(event) => event.stopPropagation()}>
        {/* Header */}
        {(title || description || showClose) && (
          <div className="flex shrink-0 items-start justify-between border-b border-gray-200 px-5 py-4">
            <div className="min-w-0 pr-4">
              {title && (
                <h2 id={titleId} className="text-base font-semibold leading-6 text-gray-900">
                  {title}
                </h2>
              )}

              {description && (
                <p id={descriptionId} className="text-sm leading-5 text-gray-500">
                  {description}
                </p>
              )}
            </div>

            {showClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className={[
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center",
                  "rounded-lg text-gray-400",
                  "transition-colors",
                  "hover:bg-gray-100 hover:text-gray-600",
                  "focus:outline-none focus:ring-2 focus:ring-gray-300",
                  "disabled:pointer-events-none disabled:opacity-50",
                ].join(" ")}
                aria-label="Close modal">
                <X size={18} strokeWidth={1.8} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={["px-5 py-5", scrollable ? "min-h-0 flex-1 overflow-y-auto overscroll-contain" : ""].join(" ")}>{children}</div>

        {/* Footer */}
        {footer && <div className="flex shrink-0 items-center justify-end gap-2 border-t border-gray-200 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}
