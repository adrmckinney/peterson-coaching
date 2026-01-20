import { Padding } from "./Layout";

export type TextBlock = {
    id: string; // UUID
    text: string;
    color: string;
    size: string;
    weight: string;
    lineHeight: string;
    maxWidth: string;
    padding: Padding;
};
