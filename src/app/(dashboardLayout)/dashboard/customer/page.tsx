"use client";

import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth-client";
import { baseURL } from "@/lib/api/baseUrl";

import { Card, Spinner } from "@heroui/react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import {
    FaCalendarCheck,
    FaCheckCircle,
    FaMoneyBillWave,
} from "react-icons/fa";

interface Booking {
    _id: string;
    venueName: string;
    bookingDate: string;
    totalPrice: number;
    status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

interface ChartData {
    month: string;
    bookings: number;
}

interface DashboardData {
    upcomingBookings: number;
    completedEvents: number;
    totalSpent: number;
    chartData: ChartData[];
    recentBookings: Booking[];
}

const CustomerPage = () => {
    const { data: session } = useSession();

    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchDashboard = async () => {
            try {
                const res = await fetch(
                    `${baseURL}/api/customer-stats/${session.user.email}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch dashboard");
                }

                const data: DashboardData = await res.json();

                setDashboard(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [session]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F0F7F4]">
                <Spinner
                    size="lg"
                    color="success"
                />
            </div>
        );
    }

    const stats = [
        {
            title: "Upcoming Bookings",
            value: dashboard?.upcomingBookings ?? 0,
            icon: <FaCalendarCheck size={24} />,
        },
        {
            title: "Completed Events",
            value: dashboard?.completedEvents ?? 0,
            icon: <FaCheckCircle size={24} />,
        },
        {
            title: "Total Spent",
            value: `৳${dashboard?.totalSpent ?? 0}`,
            icon: <FaMoneyBillWave size={24} />,
        },
    ];
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#F0F7F4_0%,#FFFFFF_100%)] p-4 md:p-8">
            <div className="container mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#0A2F1D]">
                            Welcome Back,
                        </h1>
                        <h2 className="mt-2 text-2xl font-semibold text-[#1E6B4F]">
                            {session?.user?.name}
                        </h2>
                        <p className="mt-3 max-w-xl text-gray-600">
                            Here's a quick overview of your venue bookings,
                            upcoming events, and spending history.
                        </p>
                    </div>
                    <Card className="rounded-3xl border border-[#D4AF37]/30 bg-white shadow-lg">
                        <div className="px-8 py-6">
                            <p className="text-sm text-gray-500">
                                Account Type
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-[#0A2F1D] capitalize">
                                {session?.user?.role}
                            </h2>
                        </div>
                    </Card>
                </div>

                {/* Statistics */}
                <div className="grid gap-6 md:grid-cols-3">
                    {stats.map((item, index) => (
                        <Card
                            key={index}
                            className="rounded-3xl border border-[#D4AF37]/20 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-7">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {item.title}
                                    </p>
                                    <h2 className="mt-3 text-4xl font-bold text-[#0A2F1D]">
                                        {item.value}
                                    </h2>
                                </div>
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#0A2F1D]">
                                    {item.icon}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Booking Activity & Recent Bookings */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Booking Activity */}
                    <Card className="lg:col-span-2 rounded-3xl border border-[#D4AF37]/20 bg-white shadow-lg">
                        <div className="p-6">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0A2F1D]">
                                        Booking Activity
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Monthly booking overview
                                    </p>
                                </div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <BarChart
                                        data={dashboard?.chartData ?? []}
                                    >
                                        <XAxis
                                            dataKey="month"
                                            tick={{
                                                fill: "#0A2F1D",
                                            }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            tick={{
                                                fill: "#0A2F1D",
                                            }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            cursor={{
                                                fill: "#F0F7F4",
                                            }}
                                        />
                                        <Bar
                                            dataKey="bookings"
                                            fill="#0A2F1D"
                                            radius={[10, 10, 0, 0]}
                                        />

                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>
                    {/* Recent Bookings */}

                    <Card className="rounded-3xl border border-[#D4AF37]/20 bg-white shadow-lg">

                        <div className="p-6">

                            <div className="mb-6">

                                <h2 className="text-2xl font-bold text-[#0A2F1D]">
                                    Recent Bookings
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your latest venue reservations
                                </p>

                            </div>

                            {dashboard?.recentBookings?.length === 0 ? (

                                <div className="flex h-64 flex-col items-center justify-center">

                                    <div className="mb-4 rounded-full bg-[#F0F7F4] p-5">

                                        <FaCalendarCheck
                                            size={36}
                                            className="text-[#D4AF37]"
                                        />

                                    </div>

                                    <h3 className="text-lg font-semibold text-[#0A2F1D]">
                                        No Bookings Yet
                                    </h3>

                                    <p className="mt-2 text-center text-sm text-gray-500">
                                        Your recent venue bookings will appear here.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-5">

                                    {dashboard.recentBookings.map((booking) => (
                                        <div
                                            key={booking._id}
                                            className="rounded-2xl border border-[#D4AF37]/20 p-4 transition-all duration-300 hover:bg-[#F0F7F4]"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-[#0A2F1D]">
                                                        {booking.venueName}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {new Date(
                                                            booking.bookingDate
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold
                                                ${booking.status === "Confirmed"
                                                            ? "bg-green-100 text-green-700"
                                                            : booking.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : booking.status === "Completed"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="mt-5 flex items-center justify-between">

                                                <span className="text-sm text-gray-500">
                                                    Total Cost
                                                </span>
                                                <span className="text-lg font-bold text-[#0A2F1D]">
                                                    ৳{booking.totalPrice}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;