import ConditionalRender from "../ConditionalRender";
import SectionHeadline from "./SectionHeadline";

const testimonials = [
    {
        id: 1,
        body: "Life transitions can be complex, unsettling, and confusing at any age. As a recent non-traditional-age college graduate, I face some unique challenges as I embark upon a leveling up in my career choices. Before working with Inga, the biggest issue I faced was that voice in my head that continually undermined my innate potential. Inga’s insightful coaching helped me to examine these thoughts to determine their actual validity. As a result, I now instinctively find myself stopping to ask that voice if it is true or not. The answer is no. Utilizing the principles of Energy Leadership, I am able to raise my awareness and interpret my opinions, assumptions, and beliefs from a broader perspective. I now have the tools to make conscious choices and to show up authentically.",
        author: {
            name: "Mary - Smith College",
            imageUrl: "",
        },
    },
    {
        id: 3,
        body: "Working with Inga in her senior strategy sessions was an incredible experience—her generosity, industry expertise, and calming presence made navigating career decisions so much easier. She genuinely wants to see others succeed, and I came away feeling not only more prepared but also supported by someone I can trust and talk to about anything.",
        author: {
            name: "Athan - Duke University ",
            imageUrl: "",
        },
    },
    {
        id: 2,
        body: "If you feel like you are struggling during a transition like graduating from college, being coached by Inga is a really valuable process to help you become more self-aware, provide you with the tools to shift your energy and take formative steps towards your goals. These sessions allowed me to re-evaluate how I am doing mentally and emotionally at this stage of my life and I was able to find out new things about myself. I always felt listened to and supported without feeling judged or criticized. I gained valuable insight about my mindset and when my energy is fruitful or destructive and also new ways to articulate how I am feeling. I cannot recommend Inga’s coaching enough. It was exactly what I needed to motivate myself to take charge of my future.",
        author: {
            name: "Yara - Smith College",
            imageUrl: "",
        },
    },
];

export default function TestimonialSection() {
    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionHeadline title="Testimonials" />
                </div>
                <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                    {/* <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3"> */}
                    <div className="-mt-8 sm:-mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="pt-8 sm:inline-block sm:w-full sm:px-4"
                            >
                                <figure className="rounded-2xl bg-secondary p-8 text-sm/6">
                                    <blockquote className="text-onSecondary">
                                        <p>{`“${testimonial.body}”`}</p>
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
