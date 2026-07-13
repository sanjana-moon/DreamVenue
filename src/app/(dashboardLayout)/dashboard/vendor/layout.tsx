import { ReactNode } from "react";
import { roleValidator } from "@/lib/api/session";

interface VendorLayoutProps {
  children: ReactNode;
}

const VendorLayout = async ({ children }: VendorLayoutProps) => {
  await roleValidator("vendor");

  return <>{children}</>;
};

export default VendorLayout;