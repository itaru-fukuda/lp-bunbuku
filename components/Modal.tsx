"use client";

import { useEffect, useRef, type ReactNode, type KeyboardEventHandler } from "react";

/** Native modal supplies focus containment, inert background and Escape handling. */
export default function Modal({ children, label, onClose, onKeyDown, className = "" }: {
  children: ReactNode; label: string; onClose: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>; className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} aria-label={label} onCancel={(event) => { event.preventDefault(); onClose(); }} onKeyDown={(event) => {
      if (event.key === "Tab") {
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) { event.preventDefault(); event.currentTarget.focus(); }
        else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      onKeyDown?.(event);
    }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    className={`site-dialog ${className}`}>{children}</dialog>;
}
