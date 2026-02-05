import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import ConditionalRender from "./ConditionalRender";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        label = "",
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean;
        label?: string;
    },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div>
            <ConditionalRender condition={!!label.length}>
                <label
                    htmlFor={props?.name}
                    className="block font-medium text-base/6 md:text-lg/6"
                >
                    {label}
                </label>
            </ConditionalRender>
            <input
                {...props}
                type={type}
                className={[
                    "rounded-md bg-primary text-onPrimary border-tertiary",
                    "focus:outline-none focus:ring-2 focus:ring-tertiary",
                    className,
                ].join(" ")}
                ref={localRef}
            />
        </div>
    );
});
