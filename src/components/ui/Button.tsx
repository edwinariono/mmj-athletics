"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-wa-green hover:bg-wa-green-hover text-white",
  secondary: "bg-ice-blue hover:bg-ice-blue-hover text-black",
  outline: "border border-white/30 hover:border-white hover:bg-white/5 text-white",
  danger: "bg-mmj-red hover:bg-mmj-red-hover text-white",
  ghost: "hover:bg-white/10 text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-label font-semibold uppercase tracking-wider transition-all duration-200 clip-corner-sm cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
