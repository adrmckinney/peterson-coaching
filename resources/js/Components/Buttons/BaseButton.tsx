import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeClasses: Record<ButtonSize, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-base",
    "2xl": "px-8 py-4 text-lg",
};

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize;
    iconLeft?: ReactNode;
};

export default function BaseButton({
    size = "md",
    iconLeft,
    className = "",
    disabled,
    children,
    ...props
}: BaseButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={[
                "inline-flex items-center justify-center gap-2",
                "rounded-md font-medium transition",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                disabled ? "opacity-50 cursor-not-allowed" : "",
                sizeClasses[size],
                className,
            ].join(" ")}
        >
            {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
            {children}
        </button>
    );
}
