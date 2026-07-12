"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/component/utils/uploadImage";

import {
    Button,
    Card,
    Form,
    Input,
    Label,
    TextField,
    Description,
} from "@heroui/react";

import { FaGoogle } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    role: "customer" | "vendor";
    image: FileList;
};

const Register = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        try {
            setLoading(true);

            if (!data.image?.length) {
                toast.error("Please upload a profile picture.");
                return;
            }

            const imageFile = data.image[0];

            const imageUrl = await uploadImage(imageFile);

            const { error } = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                image: imageUrl,
                role: data.role,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Welcome to DreamVenue!");

            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            });

            toast.success("Logged in successfully.");
        } catch {
            toast.error("Google Sign In failed.");
        }
    };

    return (
        <div className="min-h-80vh bg-[#F0F7F4] flex items-center justify-center px-4 py-10">

            <Card className="w-full container md:max-w-4xl rounded-3xl shadow-xl p-8 border border-[#D4AF37]/30 bg-white">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#0A2F1D]">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-[#12201B]/70">
                        Discover the perfect venue for every special
                        occasion.
                    </p>
                </div>

                {/* Form */}
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Full Name */}
                    <TextField>
                        <Label className="text-[#12201B] font-medium">
                            Full Name
                        </Label>

                        <Input
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                            className="mt-2"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </TextField>

                    {/* Profile Image */}
                    <TextField>
                        <Label className="text-[#12201B] font-medium">
                            Profile Photo
                        </Label>

                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Please upload a profile image",
                            })}
                            className="mt-2 w-full rounded-xl border-2 border-dashed border-[#D4AF37] bg-[#F0F7F4] p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0A2F1D] file:px-4 file:py-2 file:text-white hover:file:bg-[#1E6B4F]"
                        />

                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image.message}
                            </p>
                        )}
                    </TextField>

                    {/* Email */}
                    <TextField>
                        <Label className="text-[#12201B] font-medium">
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

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </TextField>

                    {/* Password */}
                    <TextField>
                        <Label className="text-[#12201B] font-medium">
                            Password
                        </Label>

                        <Input
                            type="password"
                            placeholder="Create a password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                            className="mt-2"
                        />

                        <Description className="text-[#12201B]/60">
                            Password must contain at least 8 characters.
                        </Description>

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </TextField>
                    {/* Role Selection */}
                    <TextField>
                        <Label className="text-[#12201B] font-medium">
                            Select Your Role
                        </Label>

                        <div className="mt-3 grid grid-cols-2 gap-4">
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D4AF37] p-4 transition hover:border-[#1E6B4F] hover:bg-[#F0F7F4]">
                                <input
                                    type="radio"
                                    value="customer"
                                    defaultChecked
                                    {...register("role", {
                                        required: "Please select a role",
                                    })}
                                    className="accent-[#0A2F1D]"
                                />

                                <div>
                                    <p className="font-semibold text-[#12201B]">
                                        Customer
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Book venues for your events.
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D4AF37] p-4 transition hover:border-[#1E6B4F] hover:bg-[#F0F7F4]">
                                <input
                                    type="radio"
                                    value="vendor"
                                    {...register("role", {
                                        required: "Please select a role",
                                    })}
                                    className="accent-[#0A2F1D]"
                                />

                                <div>
                                    <p className="font-semibold text-[#12201B]">
                                        Venue Owner
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        List and manage your venues.
                                    </p>
                                </div>
                            </label>
                        </div>

                        {errors.role && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.role.message}
                            </p>
                        )}
                    </TextField>

                    {/* Create Account Button */}
                    <Button
                        type="submit"
                        isLoading={loading}
                        className="mt-4 w-full rounded-xl bg-[#0A2F1D] py-6 text-base font-semibold text-white transition hover:bg-[#1E6B4F]"
                    >
                        <IoMdCheckmarkCircleOutline className="mr-2 text-xl" />
                        Create Account
                    </Button>
                </Form>

                {/* Divider */}
                <div className="my-4 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Google Sign In */}
                <Button
                    onClick={handleGoogleSignin}
                    className="w-full rounded-xl border-[#D4AF37] py-6 text-[#12201B] hover:bg-[#F0F7F4]"
                >
                    <FaGoogle className="mr-2 text-lg" />
                    Continue with Google
                </Button>

                {/* Login Link */}
                <p className="mt-1 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-[#0A2F1D] hover:text-[#1E6B4F]"
                    >
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default Register;