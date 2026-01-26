import "react";

declare module "react" {
    interface HTMLAttributes<T> {
        popover?: "auto" | "manual";
        anchor?: string;
    }

    interface ButtonHTMLAttributes<T> {
        popoverTarget?: string;
    }
}
