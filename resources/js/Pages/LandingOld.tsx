import ingaInGray from "@/Assets/Images/ingaInGrayCircle.png";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head } from "@inertiajs/react";

const LandingOld = () => {
    return (
        <LandingLayout>
            <Head title="Landing" />
            <div className="grid grid-cols-2 bg-background text-onPrimary h-screen w-full p-10">
                <div className="text-onPrimary self-start text-2xl space-y-10">
                    <h1 className="justify-self-end text-3xl">Hi, I'm Inga</h1>
                    <p>
                        I’m a post-grad transition coach with 25+ years of
                        experience working with college seniors and recent
                        grads.
                    </p>
                    <p>
                        I help you stay connected to yourself in a threshold
                        season where everything is changing — so you can think
                        clearly, choose deliberately, and move forward in a way
                        that feels true to who you’re becoming.
                    </p>
                </div>
                <div className={["flex justify-end pr-10 pt-4"].join(" ")}>
                    <img
                        src={ingaInGray}
                        alt="portrait"
                        className={[
                            "size-max rounded-full self-start",
                            "bg-transparent",
                            "shadow-2xl",
                            "ring-0",
                            "ring-white/10",
                        ].join(" ")}
                    />
                </div>
            </div>
        </LandingLayout>
    );
};

export default LandingOld;
