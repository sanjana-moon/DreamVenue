"use client";

import { Card } from "@heroui/react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import type { AdminDashboard } from "@/lib/api/venues/data";

interface AdminDashboardClientProps {
    dashboard: AdminDashboard;
}

const COLORS = [
    "#0A1F5C",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
];

const AdminDashboardClient = ({
    dashboard,
}: AdminDashboardClientProps) => {
    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)] p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <h1 className="text-3xl font-bold text-[#0A1F5C]">
                    Admin Dashboard
                </h1>

                <p className="text-slate-600 mt-2 mb-8">
                    Overview of the DreamVenue platform.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Total Users
                        </h3>

                        <h1 className="text-4xl font-bold mt-2 text-blue-700">
                            {dashboard.totalUsers}
                        </h1>
                    </Card>

                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Total Venues
                        </h3>

                        <h1 className="text-4xl font-bold mt-2 text-green-700">
                            {dashboard.totalVenues}
                        </h1>
                    </Card>

                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Total Bookings
                        </h3>

                        <h1 className="text-4xl font-bold mt-2 text-yellow-600">
                            {dashboard.totalBookings}
                        </h1>
                    </Card>

                    <Card className="p-6 rounded-3xl">
                        <h3 className="text-slate-500">
                            Revenue
                        </h3>

                        <h1 className="text-4xl font-bold mt-2 text-red-600">
                            ৳{dashboard.totalRevenue.toLocaleString()}
                        </h1>
                    </Card>

                </div>

                {/* Chart */}

                <Card className="mt-8 rounded-3xl p-6">

                    <h2 className="text-2xl font-bold mb-6 text-[#0A1F5C]">
                        Venues by Category
                    </h2>

                    <div className="w-full h-[420px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={dashboard.venuesByCategory}
                                    dataKey="value"
                                    nameKey="category"
                                    outerRadius={140}
                                    label
                                >
                                    {dashboard.venuesByCategory.map(
                                        (_, index) => (
                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[
                                                        index %
                                                            COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </Card>

            </div>
        </div>
    );
};

export default AdminDashboardClient;