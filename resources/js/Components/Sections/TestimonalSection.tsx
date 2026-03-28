import { useFallbackContent } from "@/Hooks/useFallbackContent";
import ConditionalRender from "../ConditionalRender";
import SectionHeadline from "./SectionHeadline";

export default function TestimonialSection() {
    const content = useFallbackContent();

    const { headline, testimonials } = content.testimonials_section;

    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionHeadline title={headline} />
                </div>
                <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                    <div className="-mt-8 sm:-mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="pt-8 sm:inline-block sm:w-full sm:px-4"
                            >
                                <figure className="rounded-2xl bg-secondary p-8 text-sm/6">
                                    <blockquote className="text-onSecondary">
                                        <p>{`"${testimonial.body}"`}</p>
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-x-4">
                                        <ConditionalRender
                                            condition={
                                                !!testimonial.author.imageUrl
                                                    .length
                                            }
                                        >
                                            <img
                                                alt=""
                                                src={
                                                    testimonial.author.imageUrl
                                                }
                                                className="size-10 rounded-full bg-gray-50 dark:bg-gray-800"
                                            />
                                        </ConditionalRender>

                                        <div>
                                            <div className="font-semibold text-onSecondary">
                                                {testimonial.author.name}
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
