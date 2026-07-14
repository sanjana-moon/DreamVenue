"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button, Avatar } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { TfiAlignLeft } from "react-icons/tfi";
import { RxCross2, RxAvatar } from "react-icons/rx";
import { MdLogin, MdLogout } from "react-icons/md";
import { LuUserRoundPlus } from "react-icons/lu";

import Image from "next/image";
import Link from "next/link";

import logo from "@/component/assets/images/Logo.png";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const MotionButton = motion.create(Button);

    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;    

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    const navLinkClass = (href: string) =>
        pathname === href
            ? "text-primary border-b-2 border-primary font-semibold pb-1"
            : "text-gray-600 hover:text-primary transition-colors";

    const navLinks = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/venues",
            label: "Venues",
        },
        {
            href: "/about",
            label: "About",
        },
        {
            href: "/contact",
            label: "Contact",
        },
    ];

    const role = user?.role;

    let dashboardLinks: {
        key: string;
        label: string;
        href: string;
    }[] = [];

    if (role === "admin") {
        dashboardLinks = [
            {
                key: "overview",
                label: "Overview",
                href: "/dashboard/admin",
            },
            {
                key: "users",
                label: "Manage Users",
                href: "/dashboard/manage-users",
            },
            {
                key: "venues",
                label: "Manage Venues",
                href: "/dashboard/manage-venues",
            },
            {
                key: "bookings",
                label: "Manage Bookings",
                href: "/dashboard/manage-bookings",
            },
        ];
    } else if (role === "vendor") {
        dashboardLinks = [
            {
                key: "overview",
                label: "Overview",
                href: "/dashboard/vendor",
            },
            {
                key: "addVenue",
                label: "Add Venue",
                href: "/dashboard/vendor/add-venue",
            },
            {
                key: "myVenues",
                label: "My Venues",
                href: "/dashboard/vendor/my-venues",
            },
            {
                key: "bookings",
                label: "Venue Bookings",
                href: "/dashboard/vendor/vendor-bookings",
            },
        ];
    } else {
        dashboardLinks = [
            {
                key: "overview",
                label: "Overview",
                href: "/dashboard/customer",
            },
            {
                key: "bookings",
                label: "My Bookings",
                href: "/dashboard/bookings",
            },
            {
                key: "profile",
                label: "Profile",
                href: "/dashboard/profile",
            },
        ];
    }

    return (
        <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex container items-center justify-between px-4 py-1">
                {/* LOGO */}
                <Link href="/" className="no-underline">
                    <Image
                        src={logo}
                        alt="DreamVenue"
                        width={140}
                        height={45}
                        className="h-15 md:h-20 w-auto"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <ul className="hidden lg:flex items-center gap-8 font-medium">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={navLinkClass(link.href)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {user && (
                        <li className="relative group">
                            <button className="text-gray-600 hover:text-primary transition-colors">
                                Dashboard
                            </button>

                            <div className="absolute left-0 top-full hidden min-w-[220px] rounded-xl border bg-white shadow-xl group-hover:block overflow-hidden">
                                {dashboardLinks.map((item) => (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className="block px-5 py-3 text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </li>
                    )}
                </ul>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-3">

                    {/* DESKTOP AUTH */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isMounted && user ? (
                            <>
                                <span className="font-medium text-gray-700">
                                    Hi, {user.name}
                                </span>

                                <Image
                                    src={user.image ?? "/default-avatar.png"}
                                    alt={user.name ?? "User"}
                                    width={42}
                                    height={42}
                                    className="rounded-full border object-cover"
                                />

                                <MotionButton
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15,
                                    }}
                                    onClick={handleSignOut}
                                    className="bg-primary text-white rounded-md"
                                >
                                    <MdLogout />
                                    Logout
                                </MotionButton>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <MotionButton
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                        }}
                                        className="bg-primary text-white"
                                    >
                                        <MdLogin />
                                        Login
                                    </MotionButton>
                                </Link>

                                <Link href="/register">
                                    <MotionButton
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                        }}
                                        className="border-primary text-primary"
                                    >
                                        <LuUserRoundPlus />
                                        Register
                                    </MotionButton>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <RxCross2 className="text-2xl text-primary" />
                        ) : (
                            <TfiAlignLeft className="text-2xl text-primary" />
                        )}
                    </motion.button>

                    {/* MOBILE USER BUTTON */}
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        className="lg:hidden"
                        onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    >
                        {user ? (
                            <Image
                                src={user.image ?? "/default-avatar.png"}
                                alt={user.name ?? "User"}
                                width={40}
                                height={40}
                                className="rounded-full border object-cover"
                            />
                        ) : (
                            <RxAvatar className="text-3xl text-primary" />
                        )}
                    </motion.button>
                </div>
            </div>
            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="overflow-hidden border-t bg-white lg:hidden"
                    >
                        <ul className="flex flex-col gap-4 p-5">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={navLinkClass(link.href)}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}

                            {user && (
                                <>
                                    <li className="border-t pt-4">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                                            Dashboard
                                        </p>
                                    </li>

                                    {dashboardLinks.map((item) => (
                                        <li key={item.key}>
                                            <Link
                                                href={item.href}
                                                className={navLinkClass(item.href)}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MOBILE AUTH MENU */}
            <AnimatePresence>
                {isAuthMenuOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -10,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="absolute right-4 top-20 z-50 lg:hidden"
                    >
                        <div className="min-w-[240px] rounded-2xl border bg-white p-5 shadow-xl">
                            {user ? (
                                <>
                                    <div className="mb-5 flex flex-col items-center border-b pb-4">
                                        <Image
                                            src={user.image}
                                            alt={user.name}
                                            height={60}
                                            width={60}
                                            className="mb-3"
                                        />

                                        <h2 className="text-lg font-semibold">
                                            {user.name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>

                                    <MotionButton
                                        whileHover={{
                                            scale: 1.03,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        onClick={handleSignOut}
                                        className="w-full bg-primary text-white"
                                    >
                                        <MdLogout />
                                        Logout
                                    </MotionButton>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link href="/login">
                                        <Button
                                            className="w-full bg-primary text-white"
                                        >
                                            <MdLogin />
                                            Login
                                        </Button>
                                    </Link>

                                    <Link href="/register">
                                        <Button
                                            className="w-full border-primary text-primary"
                                        >
                                            <LuUserRoundPlus />
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;