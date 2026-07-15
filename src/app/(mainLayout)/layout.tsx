import { ReactNode } from "react";

import Footer from "@/component/shared/Footer";
import Navbar from "@/component/shared/Navbar";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <div>
            <Navbar />
            <div className="grow flex flex-col">
                {children}
            </div>
            <Footer />
        </div>
    );
}