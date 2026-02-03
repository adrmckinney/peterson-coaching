type Props = {
    size?: "xs" | "sm" | "md" | "lg";
    type?: "solid" | "dashed" | "dotted" | "doubled";
    color?: "primary" | "secondary";
};

const spinnerSize = {
    xs: "w-5 h-5",
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-40 h-40",
};

const spinnerType = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
    doubled: "border-double",
};

const spinnerColor = {
    primary: "text-blue-500",
    secondary: "text-red-900",
};

const LoadingCircle = ({
    size = "xs",
    type = "solid",
    color = "secondary",
}: Props) => {
    return (
        <>
            <div>
                <div
                    style={{ borderTopColor: "transparent" }}
                    className={[
                        spinnerSize[size],
                        spinnerType[type],
                        spinnerColor[color],
                        "border-4 rounded-full animate-spin",
                    ].join(" ")}
                ></div>
            </div>
        </>
    );
};

export default LoadingCircle;
