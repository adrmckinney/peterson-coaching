import ingaOnSidewalk from "@/Assets/Images/ingaOnSidewalk.jpg";
import { BrandIcon, IconSize } from "@/Assets/SVG/BrandIcon";
import FeatureSection from "@/Components/Sections/FeatureSection";
import useGetWindowWidth from "@/Hooks/useGetWindowWidth";
import useLogWindowBreakpoint from "@/Hooks/useLogWindowBreakpoint";
import AppLayout from "@/Layouts/AppLayout";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
const navigation = [{ name: "Product", href: "#" }];

const Landing = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { currentTailwindBreakpoint } = useGetWindowWidth();
    useLogWindowBreakpoint();

    let iconSize: IconSize = "5xl";
    switch (currentTailwindBreakpoint) {
        case "sm":
            iconSize = "sm";
    }

    return (
        <AppLayout>
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
                                    // "lg:py-32",
                                    "lg:py-56",
                                ].join(" ")}
                            >
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl z-20">
                                    <div className="hidden sm:mb-10 sm:flex"></div>
                                    <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl dark:text-white">
                                        Hi, I'm Inga.
                                    </h1>
                                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                                        I’m a post-grad transition coach with
                                        25+ years of experience working with
                                        college seniors and recent grads.
                                    </p>
                                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                                        I help you stay connected to yourself in
                                        a threshold season where everything is
                                        changing — so you can think clearly,
                                        choose deliberately, and move forward in
                                        a way that feels true to who you’re
                                        becoming.
                                    </p>
                                    {/* <div className="mt-10 flex items-center gap-x-6">
                                        <a
                                            href="#"
                                            className={[
                                                "rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs ",
                                                "bg-primaryAccent hover:bg-accentHover/70",
                                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900",
                                            ].join(" ")}
                                        >
                                            Learn More
                                        </a>
                                        <a
                                            href="#"
                                            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
                                        >
                                            Learn more{" "}
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 dark:bg-gray-800">
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
