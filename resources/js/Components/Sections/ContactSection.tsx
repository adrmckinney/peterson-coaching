import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import useGetWindowWidth from "@/Hooks/useGetWindowWidth";
import { Form, useForm, usePage } from "@inertiajs/react";
import { ButtonSize } from "../Buttons/BaseButton";
import TertiaryButton from "../Buttons/TertiaryButton";
import TextAreaInput from "../TextAreaInput";
import SectionHeadline from "./SectionHeadline";

export default function ContactSection() {
    const { data, setData, processing, errors, reset } = useForm({
        first_name: "Dan",
        last_name: "McKinney",
        email: "adrmckinney@gmail.com",
        message: "This is my message",
    });
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };
    const { isBreakpointGreaterThan } = useGetWindowWidth();

    let buttonSize: ButtonSize = "md";
    if (isBreakpointGreaterThan("md")) {
        buttonSize = "lg";
    }

    return (
        <div className="bg-background py-24 sm:py-32 flex flex-col justify-center items-center w-full">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <SectionHeadline title="Let's Talk About Your Future" />
                <Form
                    method="post"
                    action={route("contact.store")}
                    onSuccess={() => reset()}
                    options={{
                        preserveScroll: true,
                        preserveState: true,
                        preserveUrl: true,
                    }}
                    className="gap-y-6 md:gap-x-6 mt-16 grid grid-cols-1 md:grid-cols-2"
                >
                    <div className="">
                        <InputLabel
                            htmlFor="first_name"
                            value="First Name"
                            className="text-onBackground"
                        />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full bg-white/5 text-onPrimary"
                            autoComplete="name"
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="last_name"
                            value="Last Name"
                            className="text-onBackground"
                        />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full bg-white/5 text-onPrimary"
                            autoComplete="name"
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-onBackground"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-white/5 text-onPrimary"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="md:col-span-2">
                        <InputLabel
                            htmlFor="message"
                            value="Message"
                            className="text-onBackground"
                        />

                        <TextAreaInput
                            id="message"
                            name="message"
                            value={data.message}
                            className="mt-1 block w-full bg-white/5"
                            autoComplete="new-message"
                            onChange={(e) => setData("message", e.target.value)}
                            required
                        />

                        <InputError message={errors.message} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-end w-full md:col-start-2">
                        <TertiaryButton
                            // className="ms-4"
                            disabled={processing}
                            size={buttonSize}
                        >
                            Contact
                        </TertiaryButton>
                    </div>
                </Form>
            </div>
        </div>
    );
}
