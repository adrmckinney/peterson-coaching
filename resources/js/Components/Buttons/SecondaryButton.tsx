import { ComponentProps } from "react";
import BaseButton from "./BaseButton";

type Props = ComponentProps<typeof BaseButton>;

export default function SecondaryButton({ className = "", ...props }: Props) {
    return (
        <BaseButton
            {...props}
            className={[
                "border border-gray-300",
                "bg-white",
                "text-gray-700",
                "uppercase tracking-widest text-xs font-semibold",
                "shadow-sm",
                "hover:bg-gray-50",
                "focus:ring-indigo-500",
                className,
            ].join(" ")}
        />
    );
}
