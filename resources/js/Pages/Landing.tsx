import ingaOnSidewalk from "@/Assets/Images/ingaOnSidewalk.jpg";
import { BrandIcon } from "@/Assets/SVG/BrandIcon";
import ConditionalRender from "@/Components/ConditionalRender";
import FeatureSection from "@/Components/Sections/FeatureSection";
import TextAreaEditor from "@/Components/TextAreaEditor";
import TextInput from "@/Components/TextInput";
import useGetWindowWidth from "@/Hooks/useGetWindowWidth";
import AppLayout from "@/Layouts/AppLayout";
import { PageProps } from "@/types";
import { LandingIntroSettings, PageSection } from "@/types/PageSections";
import { TextBlock } from "@/types/Text";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
const navigation = [{ name: "Product", href: "#" }];

const Landing = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { currentTailwindBreakpoint } = useGetWindowWidth();
    const { sections, isEditable } =
        usePage<PageProps<{ sections: PageSection[]; isEditable: boolean }>>()
            .props;
    const [editMode, setEditMode] = useState(isEditable || false);
    const [landingDraft, setLandingDraft] =
        useState<LandingIntroSettings | null>(null);
    const landingIntroSection = sections.find(
        (s) => s.type === "landing_intro",
    );

    if (!landingIntroSection) {
        throw new Error("Landing intro section not found");
    }

    useEffect(() => {
        if (editMode) {
            setLandingDraft(structuredClone(landingIntroSection.settings));
        }
    }, [editMode]);
    console.log("editMode", editMode);
    console.log("landingDraft", landingDraft);
    console.log("landingIntroSection", landingIntroSection);

    const headlineSettings: LandingIntroSettings = landingIntroSection.settings;

    const handleSave = () => {
        //
    };

    const handleCancel = () => {
        setLandingDraft(null);
        setEditMode(false);
    };

    const updateTextBlock = (key: "headline", patch: Partial<TextBlock>) => {
        if (!landingIntroSection) return;

        setLandingDraft((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    ...patch,
                },
            };
        });
    };

    const updateParagraph = (id: string, patch: Partial<TextBlock>) => {
        setLandingDraft((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                paragraphs: prev.paragraphs.map((p) =>
                    p.id === id ? { ...p, ...patch } : p,
                ),
            };
        });
    };

    //     router.put(
    //     route('admin.sections.update', landingIntroSection.id),
    //     {
    //         settings: draftSettings,
    //     }
    // );

    return (
        <AppLayout>
            <ConditionalRender condition={editMode}>
                <div className="fixed top-4 right-4 z-50 flex gap-2">
                    {!editMode ? (
                        <button onClick={() => setEditMode(true)}>Edit</button>
                    ) : (
                        <>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                    )}
                </div>
            </ConditionalRender>
            <div className={["bg-background"].join(" ")}>
                <header className="absolute inset-x-0 top-0 z-50">
                    <div className="mx-auto max-w-7xl">
                        <div className="px-6 pt-6 lg:max-w-2xl lg:pr-0 lg:pl-8">
                            <nav
                                aria-label="Global"
                                className="flex items-center justify-between lg:justify-start"
                            >
                                <a
                                    href="#"
                                    className="m-1.5 p-1.5 -ml-1.5 pl-0"
                                >
                                    <span className="sr-only">
                                        Peterson Coaching and Consulting
                                    </span>
                                    <BrandIcon
                                        size={currentTailwindBreakpoint}
                                    />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(true)}
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden dark:text-gray-200"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    <Bars3Icon
                                        aria-hidden="true"
                                        className="size-6"
                                    />
                                </button>
                                {/* <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div> */}
                            </nav>
                        </div>
                    </div>
                    <Dialog
                        open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}
                        className="lg:hidden"
                    >
                        <div className="fixed inset-0 z-50" />
                        <DialogPanel
                            className={[
                                "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10",
                                "bg-secondary",
                            ].join(" ")}
                        >
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">
                                        Peterson Coaching and Consulting
                                    </span>
                                    <BrandIcon size="sm" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={[
                                        "-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200",
                                    ].join(" ")}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="size-6"
                                    />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                </header>

                <div className="relative">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                            <svg
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                                className={[
                                    "absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform lg:block ",
                                    "fill-background",
                                ].join(" ")}
                            >
                                <polygon points="0,0 90,0 50,100 0,100" />
                            </svg>

                            <div
                                className={[
                                    "relative px-6 lg:px-8 lg:pr-0",
                                    "py-32",
                                    "sm:py-40",
                                    "lg:py-56",
                                ].join(" ")}
                            >
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl z-20">
                                    <div className="hidden sm:mb-10 sm:flex"></div>
                                    <ConditionalRender
                                        condition={editMode}
                                        falseRender={
                                            <h1
                                                className={[
                                                    "text-5xl font-semibold tracking-tight text-pretty",
                                                    "sm:text-4xl",
                                                ].join(" ")}
                                                style={{
                                                    color:
                                                        headlineSettings
                                                            ?.headline?.color ??
                                                        "var(--color-onPrimary)",
                                                }}
                                            >
                                                {
                                                    headlineSettings?.headline
                                                        ?.text
                                                }
                                            </h1>
                                        }
                                    >
                                        <TextInput
                                            value={
                                                landingDraft?.headline?.text ??
                                                ""
                                            }
                                            onChange={(e) =>
                                                updateTextBlock("headline", {
                                                    text: e.target.value,
                                                })
                                            }
                                            className="text-5xl font-semibold tracking-tight text-pretty"
                                            style={{
                                                color:
                                                    headlineSettings?.headline
                                                        ?.color ??
                                                    "var(--color-onPrimary)",
                                            }}
                                        />
                                    </ConditionalRender>

                                    {(landingDraft
                                        ? landingDraft?.paragraphs
                                        : headlineSettings?.paragraphs
                                    )?.map((paragraph) => (
                                        <ConditionalRender
                                            key={paragraph?.id}
                                            condition={editMode}
                                            falseRender={
                                                <p
                                                    key={paragraph?.id}
                                                    className="mt-8 text-lg font-medium text-pretty sm:text-xl/8"
                                                    style={{
                                                        color:
                                                            headlineSettings
                                                                ?.headline
                                                                ?.color ??
                                                            "var(--color-onPrimary)",
                                                    }}
                                                >
                                                    paragraph?.text
                                                </p>
                                            }
                                        >
                                            <TextAreaEditor
                                                key={paragraph?.id}
                                                value={paragraph?.text ?? ""}
                                                className="mt-8 text-lg font-medium text-pretty sm:text-xl/8"
                                                style={{
                                                    color:
                                                        headlineSettings
                                                            ?.headline?.color ??
                                                        "var(--color-onPrimary)",
                                                }}
                                                onChange={(e) =>
                                                    updateParagraph(
                                                        paragraph?.id,
                                                        {
                                                            text: e.target
                                                                .value,
                                                        },
                                                    )
                                                }
                                            />
                                        </ConditionalRender>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img
                            alt="Inga's Profile"
                            src={ingaOnSidewalk}
                            className="aspect-3/2 object-cover object-top lg:aspect-auto lg:size-full"
                        />
                    </div>
                </div>
            </div>
            <FeatureSection />
        </AppLayout>
    );
};

export default Landing;
