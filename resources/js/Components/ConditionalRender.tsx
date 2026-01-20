import React, { JSX } from "react";

interface Props {
    as?: React.ElementType;
    children?: React.ReactNode;
    falseRender?: React.ReactNode;
    condition: boolean | (() => boolean);
    isNullRender?: boolean; // instead of just rendering one or other render both but set display to none inherit depending on flag. This is useful for not rendering portals that are created
}

const ConditionalRender = ({
    children,
    falseRender,
    condition,
    isNullRender = true,
    as: Component = "div",
}: Props): JSX.Element => {
    const renderHiddenContent = (content: React.ReactNode): JSX.Element => {
        return <Component style={{ display: "none" }}>{content}</Component>;
    };

    const renderShowContent = (content: React.ReactNode): JSX.Element => {
        return <>{content}</>;
    };

    let showChildren = false;
    if (typeof condition === "function") {
        showChildren = condition();
    } else {
        showChildren = condition;
    }

    if (isNullRender) {
        return <>{showChildren ? children : falseRender}</>;
    } else {
        if (showChildren) {
            return (
                <>
                    {renderShowContent(children)}{" "}
                    {renderHiddenContent(falseRender)}
                </>
            );
        } else {
            return (
                <>
                    {renderShowContent(falseRender)}{" "}
                    {renderHiddenContent(children)}
                </>
            );
        }
    }
};

export default ConditionalRender;
