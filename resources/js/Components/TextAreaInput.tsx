import {
    forwardRef,
    TextareaHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

export default forwardRef(function TextAreaInput(
    {
        className = "",
        isFocused = false,
        rows = 5,
        value,
        onChange,
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & {
        isFocused?: boolean;
    },
    ref,
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            rows={rows}
            ref={localRef}
            value={value}
            onChange={onChange}
            className={[
                "rounded-md",
                "bg-primary",
                // "text-onPrimary",
                "border",
                "border-onPrimary",
                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-primaryAccent",
                "text-lg font-medium text-pretty",
                className,
            ].join(" ")}
        />
    );
});
