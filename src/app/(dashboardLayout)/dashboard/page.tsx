"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const DashboardPage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (isPending) return;
        const role = session?.user?.role;

        switch (role) {
            case "admin":
                router.replace("/dashboard/admin");
                break;

            case "vendor":
                router.replace("/dashboard/vendor");
                break;

            case "customer":
                router.replace("/dashboard/customer");
                break;

            default:
                router.replace("/");
        }
    }, [session, isPending, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F0F7F4] via-white to-[#F8F5EC]">
            <div className="rounded-3xl border border-[#D4AF37]/20 bg-white px-10 py-8 shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                    {/* Loading Spinner */}
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37]/30 border-t-[#0A2F1D]" />
                    <h2 className="text-2xl font-bold text-[#0A2F1D]">
                        Welcome to DreamVenue
                    </h2>
                    <p className="text-sm text-gray-600">
                        Preparing your dashboard...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;