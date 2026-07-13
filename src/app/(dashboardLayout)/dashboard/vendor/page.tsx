"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { baseURL } from "@/lib/api/baseUrl";

import { Card, Spinner } from "@heroui/react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import {
    FaBuilding,
    FaMoneyBillWave,
    FaClock,
} from "react-icons/fa";

interface PopularVenue {
    name: string;
    bookings: number;
}

interface EarningsChartPoint {
    month: string;
    earnings: number;
}

interface VendorStats {
    totalVenues: number;
    totalEarnings: number;
    pendingRequests: number;
    popularVenues: PopularVenue[];
    earningsChart: EarningsChartPoint[];
}

const VendorPage = () => {
    const { data: session } = useSession();

    const [stats, setStats] = useState<VendorStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.email) return;

        const loadData = async () => {
            try {
                const res = await fetch(
                    `${baseURL}/api/vendor-stats/${session.user.email}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch vendor dashboard");
                }

                const data: VendorStats = await res.json();

                setStats(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [session?.user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-[#F0F7F4]">
                <Spinner size="lg" color="success" />
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Venues Listed",
            value: stats?.totalVenues ?? 0,
            icon: <FaBuilding size={24} />,
        },
        {
            title: "Total Earnings",
            value: `৳${stats?.totalEarnings ?? 0}`,
            icon: <FaMoneyBillWave size={24} />,
        },
        {
            title: "Pending Requests",
            value: stats?.pendingRequests ?? 0,
            icon: <FaClock size={24} />,
        },
    ];

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#F0F7F4_0%,#FFFFFF_100%)] p-3 md:p-15">
            <div className="container mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-[#0A2F1D]">
                        Dashboard Overview
                    </h1>
                    <p className="text-[#12201B]/70 mt-2">
                        Track your venues, earnings and booking requests.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    {statCards.map((item, index) => (
                        <Card
                            key={index}
                            className="bg-white border border-[#D4AF37]/20 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            {item.title}
                                        </p>
                                        <h2 className="text-3xl font-bold text-[#0A2F1D] mt-2">
                                            {item.value}
                                        </h2>
                                    </div>
                                    <div className="bg-[#D4AF37]/15 p-4 rounded-2xl text-[#0A2F1D]">
                                        {item.icon}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Chart + Popular Venues */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Chart */}
                    <Card className="lg:col-span-2 bg-white border border-[#D4AF37]/20 rounded-3xl shadow-lg">
                        <div className="p-1 md:p-6">
                            <h2 className="text-xl font-bold text-[#0A2F1D] mb-6">
                                Earnings Overview
                            </h2>
                            <div className="h-37 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stats?.earningsChart ?? []}>
                                        <XAxis
                                            dataKey="month"
                                            tick={{ fill: "#0A2F1D" }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            tick={{ fill: "#0A2F1D" }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip cursor={{ stroke: "#D4AF37" }} />
                                        <Line
                                            type="monotone"
                                            dataKey="earnings"
                                            stroke="#1E6B4F"
                                            strokeWidth={4}
                                            dot={{ fill: "#D4AF37", r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>

                    {/* Popular Venues */}
                    <Card className="bg-white border border-[#D4AF37]/20 rounded-3xl shadow-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-[#0A2F1D] mb-6">
                                Most Booked Venues
                            </h2>

                            {!stats?.popularVenues?.length ? (
                                <p className="text-gray-500 text-sm">
                                    No bookings yet.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {stats.popularVenues.map((venue, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-3"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-[#0A2F1D]">
                                                    {venue.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Booked frequently
                                                </p>
                                            </div>
                                            <div className="bg-[#F0F7F4] text-[#0A2F1D] font-bold px-3 py-1 rounded-xl">
                                                {venue.bookings}
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

export default VendorPage;