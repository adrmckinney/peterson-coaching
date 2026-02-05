import { CheckIcon } from "@heroicons/react/20/solid";
import TertiaryButton from "../Buttons/TertiaryButton";
import SectionHeadline from "./SectionHeadline";

const frequencies = [
    { value: "monthly", label: "Monthly", priceSuffix: "/month" },
    { value: "annually", label: "Annually", priceSuffix: "/year" },
];
const tiers = [
    {
        name: "Post-Grad Reset",
        id: "post-grad-reset",
        href: "https://stan.store/IngaPeterson",
        price: { monthly: "$149", annually: "" },
        image: "/images/post-grad-reset-static.png",
        description:
            "A focused 60-minute coaching session designed to help you reset your energy, regain perspective, and get clear on what actually matters right now — during senior year or the months after graduation.",
        features: [
            "This is a pause in the noise.",
            "A chance to slow things down, get out of your head, and sort through what’s feeling heavy — without pressure, judgment, or anyone telling you what you should be doing.",
            "The goal isn’t to solve your whole future in an hour.",
            "It’s to help you feel steadier, clearer, and more capable of moving forward from where you actually are.",
        ],
        featured: false,
        cta: "Buy Package",
    },
    {
        name: "Startup",
        id: "tier-startup",
        href: "#",
        price: { monthly: "$29", annually: "$299" },
        description: "A plan that scales with your rapidly growing business.",
        features: [
            "25 products",
            "Up to 10,000 subscribers",
            "Advanced analytics",
            "24-hour support response time",
            "Marketing automations",
        ],
        featured: false,
        cta: "Buy Package",
    },
    {
        name: "Enterprise",
        id: "tier-enterprise",
        href: "#",
        price: "Custom",
        description: "Dedicated support and infrastructure for your company.",
        features: [
            "Unlimited products",
            "Unlimited subscribers",
            "Advanced analytics",
            "1-hour, dedicated support response time",
            "Marketing automations",
            "Custom reporting tools",
        ],
        featured: true,
        cta: "Contact sales",
    },
];

export default function PackageSection() {
    return (
        <form className="group/tiers bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <SectionHeadline title="Packages" />
                </div>

                <div className="mt-16 flex justify-center">
                    <fieldset aria-label="Payment frequency">
                        <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold inset-ring inset-ring-gray-200 dark:inset-ring-white/10">
                            <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                                <input
                                    defaultValue="monthly"
                                    defaultChecked
                                    name="frequency"
                                    type="radio"
                                    className="absolute inset-0 appearance-none rounded-full"
                                />
                                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">
                                    Monthly
                                </span>
                            </label>
                            <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                                <input
                                    defaultValue="annually"
                                    name="frequency"
                                    type="radio"
                                    className="absolute inset-0 appearance-none rounded-full"
                                />
                                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">
                                    Annually
                                </span>
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            data-featured={tier.featured ? "true" : undefined}
                            className="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-featured:bg-gray-900 data-featured:ring-gray-900 xl:p-10 dark:bg-gray-800/50 dark:ring-white/10 dark:data-featured:bg-gray-800/50 dark:data-featured:ring-2 dark:data-featured:ring-indigo-500"
                        >
                            <div className="inline-block">
                                <img
                                    src={tier.image}
                                    className="rounded-lg opacity-70 block w-full h-auto object-cover"
                                />
                                <h3
                                    id={`tier-${tier.id}`}
                                    className={[
                                        "text-2xl/8 font-semibold text-onPrimary mt-4",
                                        "",
                                        // 'group-data-featured/tier:text-white dark:text-white dark:group-data-featured/tier:text-indigo-400'
                                    ].join(" ")}
                                >
                                    {tier.name}
                                </h3>
                            </div>

                            <p
                                className={[
                                    "mt-4 text-lg/6",
                                    "text-onPrimary",
                                    //   'group-data-featured/tier:text-gray-300'
                                ].join(" ")}
                            >
                                {tier.description}
                            </p>
                            {typeof tier.price === "string" ? (
                                <p
                                    className={[
                                        "mt-6 text-4xl font-semibold tracking-tight",
                                        "text-onPrimary",
                                        //   'group-data-featured/tier:text-white'
                                    ].join(" ")}
                                >
                                    {tier.price}
                                </p>
                            ) : (
                                <>
                                    <p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=monthly]:checked]/tiers:hidden">
                                        <span className="text-4xl font-semibold tracking-tight text-gray-900 group-data-featured/tier:text-white dark:text-white">
                                            {tier.price.monthly}
                                        </span>
                                        <span className="text-sm/6 font-semibold text-gray-600 group-data-featured/tier:text-gray-300 dark:text-gray-400">
                                            /session
                                        </span>
                                    </p>
                                    <p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=annually]:checked]/tiers:hidden">
                                        <span className="text-4xl font-semibold tracking-tight text-gray-900 group-data-featured/tier:text-white dark:text-white">
                                            {tier.price.annually}
                                        </span>
                                    </p>
                                </>
                            )}

                            <TertiaryButton
                                value={tier.id}
                                name="tier"
                                size="xl"
                                type="submit"
                                aria-describedby={`tier-${tier.id}`}
                                className="w-full"
                            >
                                {tier.cta}
                            </TertiaryButton>
                            <ul
                                role="list"
                                className={[
                                    "mt-8 space-y-3 text-sm/6 xl:mt-10",
                                    "text-onBackground",
                                    //   'group-data-featured/tier:text-gray-300'
                                ].join(" ")}
                            >
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon
                                            aria-hidden="true"
                                            className={[
                                                // tier.featured
                                                //     ? "text-white dark:text-indigo-400"
                                                //     : "text-indigo-600 dark:text-indigo-400",
                                                "h-6 w-5 flex-none",
                                                "text-secondaryAccent",
                                            ].join(" ")}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
}
