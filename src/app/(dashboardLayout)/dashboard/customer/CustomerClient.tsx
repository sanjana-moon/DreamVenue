"use client";

import { motion } from "motion/react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import type { CustomerDashboard } from "@/lib/api/venues/data";

interface CustomerClientProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
    dashboardData: CustomerDashboard;
}

export default function CustomerClient({
    user,
    dashboardData,
}: CustomerClientProps) {
    const bookingPieData = [
        {
            name: "Upcoming Events",
            value: dashboardData.upcomingBookings,
        },
        {
            name: "Completed Events",
            value: dashboardData.completedEvents,
        },
    ];

    const COLORS = ["#D4AF37", "#0A2F1D"];

    return (
        <section className="min-h-screen bg-[#F0F7F4] p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-8 shadow-lg border border-[#D4AF37]/20"
            >
                <h1 className="text-3xl font-semibold text-[#0A2F1D]">
                    Welcome, {user.name}
                </h1>
                <p className="mt-2 text-gray-600">
                    Manage your DreamVenue activities from here.
                </p>

                {/* Stats Cards */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <DashboardCard
                        title="Upcoming Bookings"
                        value={dashboardData.upcomingBookings}
                    />
                    <DashboardCard
                        title="Completed Events"
                        value={dashboardData.completedEvents}
                    />
                    <DashboardCard
                        title="Total Spent"
                        value={`৳ ${dashboardData.totalSpent}`}
                    />
                </div>

                {/* Chart Section */}
                <div className="mt-10 rounded-2xl border border-[#D4AF37]/20 p-6">
                    <h2 className="text-xl font-semibold text-[#0A2F1D] mb-5">
                        Booking Overview
                    </h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={bookingPieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label
                                >
                                    {bookingPieData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function DashboardCard({
    title,
    value,
}: {
    title: string;
    value: number | string;
}) {
    return (
        <div className="rounded-xl bg-[#0A2F1D] p-6 text-white">
            <h2 className="text-sm opacity-80">
                {title}
            </h2>
            <p className="mt-3 text-4xl font-bold text-[#D4AF37]">
                {value}
            </p>
        </div>
    );
}