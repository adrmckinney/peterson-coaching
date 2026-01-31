import ConditionalRender from "../ConditionalRender";

type Props = {
    title: string;
    subTitle?: string;
};

const SectionHeadline = ({ title, subTitle }: Props) => {
    return (
        <div className="mx-auto max-w-2xl lg:text-center">
            <h2
                className={[
                    "mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance",
                    "text-primaryAccent",
                ].join(" ")}
            >
                {title}
            </h2>
            <ConditionalRender condition={!!subTitle?.length}>
                <p className="mt-6 text-lg/8 text-onPrimary">{subTitle}</p>
            </ConditionalRender>
        </div>
    );
};

export default SectionHeadline;
