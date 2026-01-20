import {
    forwardRef,
    TextareaHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

type TextStyle = {
    bold?: boolean;
    size?: string;
    color?: string;
};

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isFocused?: boolean;
    styleSettings?: TextStyle;
    onStyleChange?: (style: TextStyle) => void;
};

export default forwardRef(function TextareaEditor(
    {
        className = "",
        isFocused = false,
        rows = 1,
        value,
        onChange,
        styleSettings = {},
        onStyleChange,
        ...props
    }: Props,
    ref,
) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showToolbar, setShowToolbar] = useState(false);

    useImperativeHandle(ref, () => ({
        focus: () => textareaRef.current?.focus(),
    }));

    /* ---------- Auto resize ---------- */
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [value]);

    useEffect(() => {
        if (isFocused) textareaRef.current?.focus();
    }, [isFocused]);

    return (
        <div className="relative group">
            {/* Toolbar */}
            {showToolbar && (
                <div className="absolute -top-10 left-0 z-20 flex gap-2 rounded-md bg-secondary p-2 shadow-md">
                    <button
                        type="button"
                        className={`px-2 py-1 rounded ${
                            styleSettings.bold
                                ? "bg-primaryAccent text-onPrimary"
                                : "bg-background"
                        }`}
                        onClick={() =>
                            onStyleChange?.({
                                ...styleSettings,
                                bold: !styleSettings.bold,
                            })
                        }
                    >
                        B
                    </button>

                    <select
                        value={styleSettings.size ?? ""}
                        onChange={(e) =>
                            onStyleChange?.({
                                ...styleSettings,
                                size: e.target.value,
                            })
                        }
                        className="rounded bg-background px-1"
                    >
                        <option value="">Default</option>
                        <option value="text-sm">Small</option>
                        <option value="text-base">Base</option>
                        <option value="text-lg">Large</option>
                        <option value="text-xl">XL</option>
                    </select>

                    <input
                        type="color"
                        value={styleSettings.color ?? "#000000"}
                        onChange={(e) =>
                            onStyleChange?.({
                                ...styleSettings,
                                color: e.target.value,
                            })
                        }
                        className="h-8 w-8 rounded"
                    />
                </div>
            )}

            {/* Textarea */}
            <textarea
                {...props}
                ref={textareaRef}
                rows={rows}
                value={value}
                onChange={onChange}
                onFocus={() => setShowToolbar(true)}
                onBlur={() => setShowToolbar(false)}
                style={{
                    color: styleSettings.color,
                }}
                className={[
                    "w-full resize-none overflow-hidden",
                    "rounded-md border border-onPrimary",
                    "bg-primary text-onPrimary",
                    "focus:outline-none focus:ring-2 focus:ring-primaryAccent",
                    styleSettings.bold ? "font-bold" : "",
                    styleSettings.size ?? "",
                    className,
                ].join(" ")}
            />
        </div>
    );
});
