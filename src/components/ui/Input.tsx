"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-label font-semibold uppercase tracking-wider text-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full bg-surface border border-border rounded-sm px-3 py-2.5 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-ice-blue/50 focus:ring-1 focus:ring-ice-blue/20 transition-colors",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
