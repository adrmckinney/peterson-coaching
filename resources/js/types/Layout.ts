export type Padding = {
    top: string;
    right: string;
    bottom: string;
    left: string;
};

export type Alignment = {
    horizontal: "left" | "center" | "right";
    vertical: "top" | "center" | "bottom";
};

export type Layout = {
    alignment: Alignment;
    padding: Padding;
    maxWidth: string;
};
