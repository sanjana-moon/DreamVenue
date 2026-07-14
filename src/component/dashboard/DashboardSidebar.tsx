"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
    FaHome,
    FaCalendarCheck,
    FaBuilding,
    FaUsers,
    FaClipboardList,
    FaPlusCircle,
    FaSignOutAlt,
    FaTachometerAlt,
    FaUserShield,
} from "react-icons/fa";

import { toast } from "react-toastify";

import logo from "@/component/assets/images/Logo.png";
import logoSmall from "@/component/assets/images/logo-sm.png";

import { authClient, useSession } from "@/lib/auth-client";
import type { IconType } from "react-icons";

const customerMenu = [
    {
        key: "overview",
        label: "Overview",
        icon: FaTachometerAlt,
        href: "/dashboard/customer",
    },
    {
        key: "bookings",
        label: "My Bookings",
        icon: FaCalendarCheck,
        href: "/dashboard/customer/bookings",
    },
    {
        key: "profile",
        label: "Profile",
        icon: FaUsers,
        href: "/dashboard/customer/profile",
    },
];
const vendorMenu = [
    {
        key: "overview",
        label: "Overview",
        icon: FaTachometerAlt,
        href: "/dashboard/vendor",
    },
    {
        key: "add-venue",
        label: "Add Venue",
        icon: FaPlusCircle,
        href: "/dashboard/vendor/add-venue",
    },
    {
        key: "venues",
        label: "My Venues",
        icon: FaBuilding,
        href: "/dashboard/vendor/my-venue",
    },
    {
        key: "bookings",
        label: "Venue Bookings",
        icon: FaCalendarCheck,
        href: "/dashboard/vendor/bookings",
    },
];
const adminMenu = [
    {
        key: "overview",
        label: "Overview",
        icon: FaTachometerAlt,
        href: "/dashboard/admin",
    },
    {
        key: "users",
        label: "Manage Users",
        icon: FaUsers,
        href: "/dashboard/admin/users",
    },
    {
        key: "venues",
        label: "Manage Venues",
        icon: FaBuilding,
        href: "/dashboard/admin/manage-venues",
    },
    {
        key: "bookings",
        label: "Manage Bookings",
        icon: FaClipboardList,
        href: "/dashboard/admin/bookings",
    },
];
type MenuItem = {
    key: string;
    label: string;
    href: string;
    icon: IconType;
};

type CompactSidebarProps = {
    session: ReturnType<typeof useSession>["data"];
    role?: string;
    menuItems: MenuItem[];
    expanded: boolean;
    handleLogout: () => void;
    isActiveRoute: (item: MenuItem) => boolean;
};

const CompactSidebarContent = ({
    session,
    role,
    menuItems,
    expanded,
    handleLogout,
    isActiveRoute,
}: CompactSidebarProps) => {
    return (
        <div className="flex h-full flex-col">

            {/* LOGO */}
            <div className="border-b border-[#D4AF37]/20 px-4 py-6 flex justify-center">

                <Link href="/">
                    <Image
                        src={expanded ? logo : logoSmall}
                        alt="DreamVenue"
                        width={expanded ? 170 : 50}
                        height={expanded ? 70 : 50}
                        className="object-contain transition-all duration-300"
                    />
                </Link>

            </div>

            {/* PROFILE CARD */}

            <div className="px-3 py-5">

                <div className={`rounded-3xl bg-white shadow-lg border border-[#D4AF37]/20 transition-all duration-300
                    ${expanded ? "p-4" : "p-2"}`}>

                    <div className={`flex items-center ${expanded ? "gap-3" : "justify-center"}`}>

                        <Image
                            src={
                                session?.user?.image ??
                                "/default-avatar.png"
                            }
                            alt="User"
                            width={54}
                            height={54}
                            className="rounded-full border-2 border-[#D4AF37] object-cover"
                        />

                        {expanded && (

                            <div className="overflow-hidden">

                                <h3 className="truncate text-base font-bold text-[#0A2F1D]">
                                    {session?.user?.name}
                                </h3>

                                <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                                    {role}
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* MENU */}

            <div className="flex-1 overflow-y-auto px-3">

                {expanded && (

                    <p className="mb-4 px-2 text-xs uppercase tracking-[0.25em] text-[#1E6B4F] font-semibold">
                        Dashboard
                    </p>

                )}

                <div className="space-y-2">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        const active = isActiveRoute(item);

                        return (

                            <Link
                                key={item.key}
                                href={item.href}
                                title={item.label}
                                className={`group flex items-center rounded-2xl transition-all duration-300
                                ${expanded ? "gap-3 px-3 py-3" : "justify-center p-3"}

                                ${active
                                        ? "bg-[#0A2F1D] text-white shadow-lg"
                                        : "text-[#0A2F1D] hover:bg-white hover:shadow-md"
                                    }`}
                            >

                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl
                                    ${active
                                            ? "bg-[#D4AF37] text-[#0A2F1D]"
                                            : "bg-[#F0F7F4] group-hover:bg-[#D4AF37] group-hover:text-[#0A2F1D]"
                                        }`}
                                >

                                    <Icon size={18} />

                                </div>

                                {expanded && (
                                    <span className="font-medium whitespace-nowrap">
                                        {item.label}
                                    </span>
                                )}

                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-[#D4AF37]/20 p-3">
                <Link
                    href="/"
                    className={`flex items-center rounded-2xl transition-all
                    ${expanded ? "gap-3 px-3 py-3" : "justify-center p-3"}
                    hover:bg-white`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F7F4]">
                        <FaHome />
                    </div>
                    {expanded && "Back to Website"}
                </Link>
                <button
                    onClick={handleLogout}
                    className={`mt-2 flex w-full items-center rounded-2xl transition-all
                    ${expanded ? "gap-3 px-3 py-3" : "justify-center p-3"}
                    hover:bg-red-50 hover:text-red-500`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F7F4]">
                        <FaSignOutAlt />
                    </div>
                    {expanded && "Logout"}
                </button>
                {expanded && (
                    <div className="mt-5 rounded-3xl bg-gradient-to-br from-[#0A2F1D] to-[#1E6B4F] p-5 text-center text-white">
                        <h3 className="font-bold text-lg">
                            DreamVenue
                        </h3>
                        <p className="mt-1 text-sm text-[#D4AF37]">
                            Book • Celebrate • Create Memories
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
const DashboardSideBar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [compactExpanded, setCompactExpanded] = useState(false);
    const role = session?.user?.role;
    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully.");
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Logout failed.");
        }
    };

    const menuItems =
        role === "customer"
            ? customerMenu
            : role === "vendor"
                ? vendorMenu
                : role === "admin"
                    ? adminMenu
                    : [];

    const isActiveRoute = (item: typeof menuItems[number]) => {
        const dashboardRoots = [
            "/dashboard/customer",
            "/dashboard/vendor",
            "/dashboard/admin",
        ];

        if (dashboardRoots.includes(item.href)) {
            return pathname === item.href;
        }
        return pathname === item.href || pathname.startsWith(item.href + "/");
    };

    return (
        <>
            {/* MOBILE SPACER */}
            <div className="lg:hidden w-20 shrink-0" />
            {/* MOBILE SIDEBAR */}
            <aside
                onMouseEnter={() => setCompactExpanded(true)}
                onMouseLeave={() => setCompactExpanded(false)}
                onClick={() => setCompactExpanded((prev) => !prev)}
                className={`fixed left-0 top-0 z-40 h-screen overflow-hidden border-r border-[#D4AF37]/20 bg-gradient-to-b from-[#F0F7F4] to-white transition-all duration-300 lg:hidden
                ${compactExpanded ? "w-72 shadow-2xl" : "w-20"}`}
            >
                <CompactSidebarContent
                    session={session}
                    role={role}
                    menuItems={menuItems}
                    expanded={compactExpanded}
                    handleLogout={handleLogout}
                    isActiveRoute={isActiveRoute}
                />
            </aside>

            {/* DESKTOP SIDEBAR */}

            <aside className="sticky top-0 hidden h-screen w-72 border-r border-[#D4AF37]/20 bg-gradient-to-b from-[#F0F7F4] to-white lg:block">

                <CompactSidebarContent
                    session={session}
                    role={role}
                    menuItems={menuItems}
                    expanded={true}
                    handleLogout={handleLogout}
                    isActiveRoute={isActiveRoute}
                />

            </aside>
        </>
    );
};
export default DashboardSideBar;