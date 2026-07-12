import Footer from "@/component/shared/Footer";
import Navbar from "@/component/shared/Navbar";

export default function RootLayout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="flex-grow flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}