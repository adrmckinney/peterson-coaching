import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from "@headlessui/react";
import { PlusIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import {
    ChangeEvent,
    forwardRef,
    TextareaHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import TextInput from "./TextInput";

type TextStyle = {
    bold?: boolean;
    size?: string;
    color?: string;
};

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isFocused?: boolean;
    styleSettings?: TextStyle;
    onStyleChange?: (style: TextStyle) => void;
    onColorChange?: (color: ChangeEvent<HTMLInputElement>) => void;
    reset?: (id: string, key: string) => void;
    colorValue?: string;
    onAddBelow?: () => void;
};

export default forwardRef(function TextareaEditor(
    {
        className = "",
        rows = 1,
        value,
        onChange,
        onColorChange,
        colorValue,
        reset = () => {},
        styleSettings = {},
        onStyleChange,
        onAddBelow,
        ...props
    }: Props,
    ref,
) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    return (
        <div className="relative group focus-within:z-10">
            {/* Left controls */}
            <div
                className={[
                    "absolute -left-5 top-10 flex flex-col gap-2",
                    "opacity-0 pointer-events-none",
                    "group-hover:opacity-100 group-hover:pointer-events-auto",
                    "group-focus-within:opacity-100 group-focus-within:pointer-events-auto",
                ].join(" ")}
            >
                <button
                    type="button"
                    onClick={onAddBelow}
                    className="rounded bg-secondary p-1 shadow hover:bg-secondaryAccent"
                >
                    <PlusIcon className="h-4 w-4" />
                </button>

                {/* 🎯 Popover trigger */}
                <Popover>
                    <PopoverGroup>
                        <PopoverButton className="rounded bg-secondary p-1 shadow hover:bg-secondaryAccent">
                            <SquaresPlusIcon className="h-4 w-4" />
                        </PopoverButton>
                        <PopoverPanel anchor="left">
                            <div className="bg-secondary w-56 h-32 border rounded z-50 p-4 text-onSecondary">
                                <TextInput
                                    label="Text Color"
                                    type="color"
                                    name="color"
                                    className="bg-secondary border-onSecondary"
                                    onChange={onColorChange}
                                    value={colorValue}
                                />
                            </div>
                            <div className="bg-secondary w-56 h-32 border rounded z-50 p-4 text-onSecondary">
                                <PrimaryButton
                                    onChange={() => reset(props?.id, "color")}
                                >
                                    Undo Color Change
                                </PrimaryButton>
                            </div>
                        </PopoverPanel>
                    </PopoverGroup>
                </Popover>
            </div>

            {/* Textarea */}
            <textarea
                {...props}
                ref={textareaRef}
                rows={rows}
                value={value}
                onChange={onChange}
                // style={{ color: styleSettings.color }}
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
