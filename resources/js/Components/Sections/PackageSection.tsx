import { CheckIcon } from "@heroicons/react/20/solid";
import { useFallbackContent } from "@/Hooks/useFallbackContent";
import TertiaryButton from "../Buttons/TertiaryButton";
import SectionHeadline from "./SectionHeadline";

export default function PackageSection() {
    const content = useFallbackContent();

    const { headline, tiers } = content.packages_section;

    return (
        <form className="group/tiers bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <SectionHeadline title={headline} />
                </div>

                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className="group/tier rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 dark:bg-gray-800/50 dark:ring-white/10"
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
                                    ].join(" ")}
                                >
                                    {tier.name}
                                </h3>
                            </div>

                            <p
                                className={[
                                    "mt-4 text-base/6",
                                    "text-onPrimary",
                                ].join(" ")}
                            >
                                {tier.description}
                            </p>
                            <p
                                className={[
                                    "mt-6 flex items-baseline gap-x-1",
                                ].join(" ")}
                            >
                                <span className="text-4xl font-semibold tracking-tight text-onPrimary">
                                    {tier.price}
                                </span>
                                <span className="text-sm/6 font-semibold text-gray-600 dark:text-gray-400">
                                    {`/${tier.priceSubText}`}
                                </span>
                            </p>

                            <TertiaryButton size="xl" className="w-full">
                                <a
                                    href={tier.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-describedby={`tier-${tier.id}`}
                                >
                                    {tier.cta}
                                </a>
                            </TertiaryButton>
                            <ul
                                role="list"
                                className={[
                                    "mt-8 space-y-3 text-sm/6 xl:mt-10",
                                    "text-onBackground",
                                ].join(" ")}
                            >
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon
                                            aria-hidden="true"
                                            className={[
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
