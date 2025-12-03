import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
  secondary: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20",
  success: "bg-green-500/10 text-green-600 border-green-500/20",
  warning: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  danger: "bg-red-500/10 text-red-600 border-red-500/20",
  info: "bg-blue-500/10 text-blue-600 border-blue-500/20"
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base"
};

export const Badge = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-1 rounded-full border font-semibold transition-all",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
