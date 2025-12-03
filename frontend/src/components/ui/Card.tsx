import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "premium" | "glass" | "gradient" | "outlined";
  hover?: boolean;
  children: ReactNode;
}

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  premium:
    "bg-white/80 backdrop-blur-sm border border-surface-border rounded-3xl shadow-soft-md",
  glass:
    "bg-white/60 backdrop-blur-md border border-white/20 rounded-3xl shadow-soft-lg",
  gradient:
    "bg-white rounded-3xl shadow-soft-lg border border-white/20",
  outlined:
    "bg-white border-2 border-slate-200 rounded-3xl shadow-soft"
};

export const Card = ({
  variant = "premium",
  hover = true,
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={twMerge(
        "transition-all duration-300",
        variantClasses[variant],
        hover && "hover:shadow-soft-lg hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
