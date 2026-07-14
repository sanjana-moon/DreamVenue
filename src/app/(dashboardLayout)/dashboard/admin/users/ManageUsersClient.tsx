"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    changeUserRole,
    deleteUser,
    UserRole,
} from "@/lib/api/venues/actions";

import { AppUser } from "@/lib/api/venues/data";

interface ManageUsersClientProps {
    users: AppUser[];
}

export default function ManageUsersClient({
    users: initialUsers,
}: ManageUsersClientProps) {
    const [users, setUsers] = useState<AppUser[]>(initialUsers);

    const handleRoleChange = async (
        user: AppUser,
        role: UserRole
    ) => {
        try {
            await changeUserRole(user._id, role);

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id
                        ? { ...u, role }
                        : u
                )
            );

            toast.success("User role updated.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role.");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);

            setUsers((prev) =>
                prev.filter((user) => user._id !== id)
            );

            toast.success("User deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F7F4] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0A2F1D]">
                    Manage Users
                </h1>

                <p className="text-gray-600 mt-2 mb-8">
                    Manage customer and vendor accounts, update roles, or remove users.
                </p>

                <Card className="rounded-3xl overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#E7F2EC]">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-t hover:bg-[#F7FBF8]"
                                    >
                                        <td className="px-6 py-5 font-medium">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-5">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-5">
                                            <select
                                                className="border rounded-lg px-3 py-2 outline-none focus:border-[#1E6B4F]"
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user,
                                                        e.target.value as UserRole
                                                    )
                                                }
                                            >
                                                <option value="customer">
                                                    Customer
                                                </option>

                                                <option value="vendor">
                                                    Vendor
                                                </option>

                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </select>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <Button
                                                    color="danger"
                                                    isIconOnly
                                                    onPress={() =>
                                                        handleDelete(user._id)
                                                    }
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}