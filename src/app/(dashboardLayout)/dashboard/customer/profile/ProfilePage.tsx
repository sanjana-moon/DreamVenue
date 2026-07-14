"use client";

import { useEffect, useState } from "react";

import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Spinner,
} from "@heroui/react";

import { FaEnvelope, FaUser, FaSave } from "react-icons/fa";

import { getSession } from "@/lib/auth-client";
import { baseURL } from "@/lib/api/baseUrl";

interface UserProfile {
    _id?: string;
    name: string;
    email: string;
    role: "customer" | "vendor" | "admin";
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const session = await getSession();

            const email = session?.data?.user?.email;

            if (!email) return;

            const res = await fetch(
                `${baseURL}/api/profile/${email}`
            );

            const data = await res.json();

            setProfile(data);

            setName(data.name);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            setSaving(true);

            await fetch(
                `${baseURL}/api/profile/${profile?.email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name,
                    }),
                }
            );

            loadProfile();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-6">

            <Card className="border border-default-200 shadow-lg">

                <CardHeader className="flex flex-col items-center gap-4 py-10">

                    <Avatar
                        name={profile?.name}
                        size="lg"
                        className="h-24 w-24 text-2xl"
                    />

                    <div className="text-center">
                        <h1 className="text-3xl font-bold">
                            My Profile
                        </h1>

                        <p className="text-default-500">
                            Manage your account
                            information
                        </p>
                    </div>

                </CardHeader>

                <Divider />

                <CardBody className="space-y-6 p-8">

                    <Input
                        label="Full Name"
                        startContent={<FaUser />}
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <Input
                        isReadOnly
                        label="Email"
                        startContent={<FaEnvelope />}
                        value={profile?.email}
                    />

                    <Input
                        isReadOnly
                        label="Role"
                        value={profile?.role}
                    />

                    <Button
                        color="primary"
                        startContent={<FaSave />}
                        isLoading={saving}
                        onPress={updateProfile}
                    >
                        Save Changes
                    </Button>

                </CardBody>

            </Card>

        </div>
    );
}