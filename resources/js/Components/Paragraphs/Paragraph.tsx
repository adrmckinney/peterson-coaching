type Props = {
    content: {
        id: string;
        text: string;
        color: string;
    };
};

const Paragraph = ({ content }: Props) => {
    return (
        <p
            key={content?.id}
            className="mt-8 text-lg font-medium text-pretty sm:text-xl/8"
            style={{
                color: content?.color ?? "var(--color-onPrimary)",
            }}
        >
            {content?.text}
        </p>
    );
};

export default Paragraph;
