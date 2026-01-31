import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Form, useForm, usePage } from "@inertiajs/react";
import TextAreaInput from "../TextAreaInput";
import SectionHeadline from "./SectionHeadline";

export default function ContactSection() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
    });

    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };

    return (
        <div className="bg-background py-24 sm:py-32 flex flex-col justify-center items-center w-full">
            <SectionHeadline title="Contact" />
            <Form
                method="post"
                action={route("contact.store")}
                onSuccess={() => reset()}
                options={{
                    preserveScroll: true,
                    preserveState: true,
                    preserveUrl: true,
                }}
                className="space-y-4"
            >
                <div className="">
                    <InputLabel htmlFor="first_name" value="First Name" />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("last_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="mt-4 col-span-2">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 col-span-2">
                    <InputLabel htmlFor="message" value="Message" />

                    <TextAreaInput
                        id="message"
                        name="message"
                        value={data.message}
                        className="mt-1 block w-full"
                        autoComplete="new-message"
                        onChange={(e) => setData("message", e.target.value)}
                        required
                    />

                    <InputError message={errors.message} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end w-full">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Contact
                    </PrimaryButton>
                </div>
            </Form>
        </div>
    );
}
