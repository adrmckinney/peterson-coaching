import { PageSection } from "@/types/PageSections";

export const groupSectionsByPage = (
    sections: PageSection[],
): Record<number, PageSection[]> => {
    return sections.reduce<Record<number, PageSection[]>>((acc, section) => {
        if (!acc[section.page_id]) {
            acc[section.page_id] = [];
        }
        acc[section.page_id].push(section);
        return acc;
    }, {});
};

export const getPathValue = (obj: any, path: (string | number)[]) =>
    path.reduce((acc, key) => acc?.[key], obj);

export const setPathValue = (
    obj: any,
    path: (string | number)[],
    value: any,
): any => {
    if (path.length === 0) return value;

    const [key, ...rest] = path;

    return {
        ...obj,
        [key]: setPathValue(obj?.[key] ?? {}, rest, value),
    };
};

export const removePath = (obj: any, path: (string | number)[]): any => {
    const [key, ...rest] = path;

    if (!obj || !(key in obj)) return obj;

    if (rest.length === 0) {
        const { [key]: _, ...restObj } = obj;
        return restObj;
    }

    return {
        ...obj,
        [key]: removePath(obj[key], rest),
    };
};
