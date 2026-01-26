type StyleSettings = {
    bold?: boolean;
    size?: string;
    color?: string;
};

type Props = {
    id: string;
    value: StyleSettings;
    onChange: (styles: StyleSettings) => void;
};

export default function TextStylePopover({ id, value, onChange }: Props) {
    return (
        <div
            // id={`id-${id}`}
            // popover="auto"
            // anchor={`target-${id}`}
            className={[
                "z-50 w-56 rounded-lg border bg-background p-3 shadow-lg",
                "[--anchor-gap:8px]",
            ].join(" ")}
        >
            <div className="mb-2 text-sm font-medium">Text style</div>

            {/* Weight */}
            <label className="mb-2 block text-sm">
                Weight
                <select
                    value={value.bold ? "bold" : "normal"}
                    onChange={(e) =>
                        onChange({ ...value, bold: e.target.value === "bold" })
                    }
                    className="mt-1 w-full rounded border px-2 py-1"
                >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                </select>
            </label>

            {/* Size */}
            <label className="mb-2 block text-sm">
                Size
                <select
                    value={value.size ?? ""}
                    onChange={(e) =>
                        onChange({ ...value, size: e.target.value })
                    }
                    className="mt-1 w-full rounded border px-2 py-1"
                >
                    <option value="">Default</option>
                    <option value="text-sm">Small</option>
                    <option value="text-base">Base</option>
                    <option value="text-lg">Large</option>
                    <option value="text-xl">XL</option>
                </select>
            </label>

            {/* Color */}
            <label className="block text-sm">
                Color
                <input
                    type="color"
                    value={value.color ?? "#000000"}
                    onChange={(e) =>
                        onChange({ ...value, color: e.target.value })
                    }
                    className="mt-1 h-8 w-full cursor-pointer"
                />
            </label>
        </div>
    );
}
