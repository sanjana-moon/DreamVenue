"use client";

import { useState } from "react";
import Image from "next/image";
import {
    FaSpinner,
    FaUser,
    FaEnvelope,
    FaUserTag,
    FaRemoveFormat,
    FaEdit,
    FaSave,
    FaTimes,
    FaCamera
} from "react-icons/fa";
import { updateProfile } from "@/lib/api/venues/actions";

interface Profile {
    name: string;
    email: string;
    role: string;
    profileImage?: string | null;
}

interface ProfilePageProps {
    initialProfile: Profile | null;
    error?: string | null;
}

export default function ProfilePage({ initialProfile, error: initialError }: ProfilePageProps) {
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(initialError || null);
    const [imageError, setImageError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [editData, setEditData] = useState({
        name: "",
        profileImage: "",
    });

    const startEditing = () => {
        if (profile) {
            setEditData({
                name: profile.name,
                profileImage: profile.profileImage || "",
            });
            setIsEditing(true);
            setError(null);
            setSuccessMessage(null);
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditData({
            name: "",
            profileImage: "",
        });
        setError(null);
        setSuccessMessage(null);
    };

    async function refreshProfile() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('/api/profile', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to load profile: ${res.status}`);
            }

            const data = await res.json();
            setProfile(data);
            setImageError(false);
        } catch (err) {
            console.error("Error refreshing profile:", err);
            setError("Failed to refresh profile. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            const updatedProfile = await updateProfile({
                name: editData.name,
                email: profile?.email || "",
                profileImage: editData.profileImage || undefined,
            });

            setProfile(updatedProfile);
            setImageError(false);
            setIsEditing(false);
            setSuccessMessage("Profile updated successfully!");

            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <FaSpinner className="text-4xl text-[#D4AF37] animate-spin" />
                <p className="mt-4 text-[#12201B]/60">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-red-700 mb-2">
                        Unable to Load Profile
                    </h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={refreshProfile}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-[#0A2F1D] text-white rounded-lg hover:bg-[#1E6B4F] transition-colors"
                    >
                        <FaRemoveFormat />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-4">👤</div>
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">
                        Profile Not Found
                    </h3>
                    <p className="text-yellow-600 mb-4">
                        We couldn't find your profile information.
                    </p>
                    <button
                        onClick={refreshProfile}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-[#0A2F1D] text-white rounded-lg hover:bg-[#1E6B4F] transition-colors"
                    >
                        <FaRemoveFormat />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const initials = profile.name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-[#0A2F1D] text-white p-10 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />

                    <div className="relative inline-">
                        <div className="w-28 h-28 rounded-full mx-auto shadow-lg relative overflow-hidden bg-[#D4AF37] border-4 border-[#D4AF37]">
                            {profile.profileImage && !imageError ? (
                                <Image
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                    onError={() => setImageError(true)}
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#0A2F1D] bg-[#D4AF37]">
                                    {initials}
                                </div>
                            )}
                        </div>

                        <button
                            className="absolute bottom-0 right-0 bg-[#D4AF37] p-2 rounded-full shadow-lg hover:bg-[#C5A234] transition-colors"
                            onClick={() => {}}
                            title="Change profile picture"
                        >
                            <FaCamera className="text-[#0A2F1D] text-sm" />
                        </button>
                    </div>

                    {!isEditing ? (
                        <>
                            <h1 className="text-3xl font-bold mt-5">
                                {profile.name}
                            </h1>
                            <p className="text-white/80 mt-2 flex items-center justify-center gap-2 capitalize">
                                <FaUserTag className="text-[#D4AF37]" />
                                DreamVenue {profile.role}
                            </p>

                            <button
                                onClick={startEditing}
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#0A2F1D] rounded-lg hover:bg-[#C5A234] transition-colors font-semibold"
                            >
                                <FaEdit />
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <div className="mt-4">
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-[#0A2F1D] rounded-lg hover:bg-[#C5A234] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={cancelEditing}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaTimes />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mx-8 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center">
                        {successMessage}
                    </div>
                )}

                {/* Profile Details */}
                <div className="p-8 space-y-6">
                    {!isEditing ? (
                        // View Mode
                        <>
                            <div>
                                <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                    <FaUser className="text-[#D4AF37]" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-[#12201B] cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                    <FaEnvelope className="text-[#D4AF37]" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-[#12201B] cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                    <FaUserTag className="text-[#D4AF37]" />
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={profile.role}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-[#12201B] capitalize cursor-not-allowed"
                                />
                            </div>

                            {profile.profileImage && (
                                <div>
                                    <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                        <FaCamera className="text-[#D4AF37]" />
                                        Profile Image
                                    </label>
                                    <div className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-[#12201B] break-all">
                                        {profile.profileImage}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // Edit Mode
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div>
                                <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                    <FaUser className="text-[#D4AF37]" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    required
                                    className="w-full border border-[#D4AF37] rounded-xl px-4 py-3 bg-white text-[#12201B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                    <FaEnvelope className="text-[#D4AF37]" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 cursor-not-allowed"
                                />
                                <p className="text-xs text-[#12201B]/50 mt-1">
                                    Email cannot be changed.
                                </p>
                            </div>

                            <div>
                                <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                    <FaUserTag className="text-[#D4AF37]" />
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={profile.role}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-[#12201B] capitalize cursor-not-allowed"
                                />
                                <p className="text-xs text-[#12201B]/50 mt-1">Role cannot be changed</p>
                            </div>

                            <div>
                                <label className=" font-semibold text-[#0A2F1D] mb-2 flex items-center gap-2">
                                    <FaCamera className="text-[#D4AF37]" />
                                    Profile Image URL
                                </label>
                                <input
                                    type="url"
                                    value={editData.profileImage}
                                    onChange={(e) => setEditData({ ...editData, profileImage: e.target.value })}
                                    className="w-full border border-[#D4AF37] rounded-xl px-4 py-3 bg-white text-[#12201B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                    placeholder="https://example.com/your-image.jpg"
                                />
                                <p className="text-xs text-[#12201B]/50 mt-1">
                                    Enter a URL for your profile picture
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}