import { forwardRef, type RefObject } from "react";

/**
 * Hidden honeypot for bot detection. Uses an uncontrolled field (no React state) so
 * password managers are less likely to fill it than with autoComplete="new-password".
 * Real users should never see or focus this field.
 */
export const HoneypotField = forwardRef<HTMLInputElement>(function HoneypotField(_props, ref) {
  return (
    <input
      ref={ref}
      type="text"
      name="fax_number"
      tabIndex={-1}
      autoComplete="off"
      defaultValue=""
      aria-hidden="true"
      readOnly
      onFocus={(e) => e.currentTarget.blur()}
      className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
    />
  );
});

export function readHoneypotValue(ref: RefObject<HTMLInputElement | null>): string {
  return ref.current?.value?.trim() ?? "";
}
