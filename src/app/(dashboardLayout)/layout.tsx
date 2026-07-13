"use client";

import DashboardSideBar from "@/component/dashboard/DashboardSidebar";
import { ReactNode } from "react";

const DashboardLayout = ({
    children,
}: {
    children: ReactNode;
}) => {
    return (
        <div className="min-h-screen flex bg-linear-to-br from-[#F0F7F4] via-white to-[#F8F5EC]">
            <DashboardSideBar />
            <div className="container w-full px-6 py-10">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;