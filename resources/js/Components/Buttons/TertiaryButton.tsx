import { ComponentProps } from "react";
import BaseButton from "./BaseButton";

type Props = ComponentProps<typeof BaseButton>;

export default function TertiaryButton({ className = "", ...props }: Props) {
    return (
        <BaseButton
            {...props}
            className={[
                "border border-primary",
                "bg-tertiary",
                "text-onTertiary",
                "uppercase tracking-widest font-semibold",
                "shadow-sm",
                "hover:bg-tertiaryHover",
                "focus:ring-primary",
                className,
            ].join(" ")}
        />
    );
}
