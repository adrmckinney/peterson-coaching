import { ComponentProps } from "react";
import BaseButton from "./BaseButton";

type Props = ComponentProps<typeof BaseButton>;

export default function PrimaryButton({ className = "", ...props }: Props) {
    return (
        <BaseButton
            {...props}
            className={[
                "bg-primary",
                "text-onPrimary",
                "border border-primary",
                "hover:bg-primaryAccent",
                "focus:ring-primaryAccent",
                className,
            ].join(" ")}
        />
    );
}
