import { ReactNode } from "react";
import { roleValidator } from "@/lib/api/session";

interface UserLayoutProps {
    children: ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
    await roleValidator("customer");

    return <>{children}</>;
};

export default UserLayout;