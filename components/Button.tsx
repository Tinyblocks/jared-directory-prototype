"use client";

import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      fullWidth = false,
      className = "",
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-[var(--radius-button)] font-bold text-sm tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-50";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "btn-primary text-white px-6 py-4 min-h-[51px]",
      secondary:
        "bg-[var(--color-primary)] text-white px-6 py-4 shadow-[var(--shadow-button)] hover:brightness-110",
      outline:
        "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-muted)] px-6 py-3",
      ghost:
        "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
