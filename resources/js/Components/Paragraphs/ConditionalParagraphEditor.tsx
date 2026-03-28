import { ChangeEvent } from "react";
import ConditionalRender from "../ConditionalRender";
import TextAreaEditor from "../TextAreaEditor";
import Paragraph from "./Paragraph";

type Props = {
    content: {
        id: string;
        text: string;
        color: string;
    };
    handleColorChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    handleTextChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    condition: boolean;
};

const ConditionalParagraphEditor = ({
    content,
    handleColorChange,
    handleTextChange,
    condition = false,
}: Props) => {
    return (
        <ConditionalRender
            key={content?.id}
            condition={condition}
            falseRender={<Paragraph content={content} />}
        >
            <TextAreaEditor
                key={content?.id}
                id={content?.id}
                // reset={reset}
                value={content?.text || ""}
                colorValue={content?.color || ""}
                className="mt-8 text-lg font-medium text-pretty sm:text-xl/8 border-none"
                style={{
                    color: content?.color || "var(--color-onPrimary)",
                }}
                onColorChange={handleColorChange}
                onChange={handleTextChange}
            />
        </ConditionalRender>
    );
};

export default ConditionalParagraphEditor;
