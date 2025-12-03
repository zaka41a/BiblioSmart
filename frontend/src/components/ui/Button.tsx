import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-primary text-white shadow-soft-md hover:bg-brand-primary/90 hover:shadow-soft-lg active:scale-95",
  secondary:
    "bg-slate-100 text-slate-700 shadow-soft hover:bg-slate-200 hover:shadow-soft-md active:scale-95",
  outline:
    "border-2 border-slate-200 bg-white/60 text-slate-700 backdrop-blur-sm hover:border-brand-primary hover:text-brand-primary hover:bg-white hover:shadow-soft-md active:scale-95",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-brand-primary active:scale-95",
  gradient:
    "bg-brand-primary text-white shadow-soft-md hover:shadow-glow active:scale-95"
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
        variantClasses[variant],
        sizeClasses[size],
        props.disabled && "opacity-50 cursor-not-allowed hover:shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
