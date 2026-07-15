"use client";

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";

import { toast } from "react-toastify";

type LoginForm = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            const { error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (error) {
                toast.error(
                    error.message ||
                    "Login failed."
                );
                return;
            }
            toast.success(
                "Welcome back to DreamVenue!"
            );

            router.push("/");
        } catch (error) {
            console.error(error);

            toast.error(
                "Something went wrong."
            );
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            toast.success(
                "Google Sign In successful."
            );
        } catch (error) {
            console.error(error);

            toast.error(
                "Google Sign In failed."
            );
        }
    };

    return (
        <div className="min-h-80vh flex items-center justify-center bg-[#F0F7F4] px-4 py-12">

            <Card className="w-full container md:max-w-3xl rounded-3xl border border-[#D4AF37]/30 bg-white p-8 shadow-xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#0A2F1D]">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-[#12201B]/70">
                        Sign in to your DreamVenue account and <br />
                         start planning your next
                        unforgettable event.
                    </p>
                </div>

                {/* Login Form */}
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    {/* Email */}
                    <TextField
                        isRequired
                        isInvalid={!!errors.email}
                    >
                        <Label className="font-medium text-[#12201B]">
                            Email Address
                        </Label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-2"
                        />

                        <FieldError>
                            {errors.email?.message}
                        </FieldError>
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        isInvalid={!!errors.password}
                    >
                        <Label className="font-medium text-[#12201B]">
                            Password
                        </Label>

                        <Input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters.",
                                },
                            })}
                            className="mt-2"
                        />

                        <Description className="text-[#12201B]/60">
                            Password must contain at least 8 characters.
                        </Description>

                        <FieldError>
                            {errors.password?.message}
                        </FieldError>
                    </TextField>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-[#0A2F1D] py-6 text-base font-semibold text-white transition hover:bg-[#1E6B4F]"
                    >
                        <IoLogInOutline className="mr-2 text-xl" />
                        Sign In
                    </Button>
                </Form>
                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-sm font-medium text-gray-500">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Google Sign In */}
                <Button
                    onClick={handleGoogleLogin}
                    className="w-full rounded-xl border-[#D4AF37] py-6 text-[#12201B] hover:bg-[#F0F7F4]"
                >
                    <FaGoogle className="mr-2 text-lg text-[#D4AF37]" />
                    Continue with Google
                </Button>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-[#0A2F1D] hover:text-[#1E6B4F] hover:underline"
                    >
                        Create an Account
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;