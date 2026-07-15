"use client";

import { useState } from "react";
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

interface NewsletterProps {
    className?: string;
}

const Newsletter = ({ className = "" }: NewsletterProps) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setIsSubscribed(true);
                setEmail("");
                toast.success("Successfully subscribed to our newsletter!");
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to subscribe. Please try again.");
            }
        } catch (error) {
            console.error("Newsletter subscription error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={`bg-[#F0F7F4] py-16 md:py-24 ${className}`}>
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                <div className="relative overflow-hidden rounded-3xl bg-[#0A2F1D] p-8 md:p-12 shadow-2xl">
                    {/* Decorative elements */}
                    <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
                    
                    <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
                        {/* Left side - Text Content */}
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <FaEnvelope className="text-sm" />
                                <span>Newsletter</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Subscribe to Our <span className="text-[#D4AF37]">Newsletter</span>
                            </h2>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                Get the latest updates on new venues, exclusive offers, and upcoming events delivered straight to your inbox.
                            </p>
                            
                            {isSubscribed ? (
                                <div className="mt-6 flex items-center gap-3 text-[#D4AF37] bg-white/10 rounded-xl px-6 py-4">
                                    <FaCheckCircle className="text-2xl" />
                                    <span className="font-semibold">You're subscribed! Thank you.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#D4AF37] text-[#0A2F1D] font-bold rounded-xl hover:bg-[#C5A234] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                <span>Subscribe</span>
                                                <FaPaperPlane />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                            
                            <p className="text-white/40 text-xs mt-4">
                                No spam, unsubscribe anytime. We respect your privacy.
                            </p>
                        </div>

                        {/* Right side - Illustration/Stats */}
                        <div className="hidden md:block">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                                    <div className="text-3xl font-bold text-[#D4AF37]">500+</div>
                                    <div className="text-white/60 text-sm mt-1">Active Venues</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                                    <div className="text-3xl font-bold text-[#D4AF37]">1K+</div>
                                    <div className="text-white/60 text-sm mt-1">Happy Clients</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                                    <div className="text-3xl font-bold text-[#D4AF37]">50+</div>
                                    <div className="text-white/60 text-sm mt-1">Venue Categories</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                                    <div className="text-3xl font-bold text-[#D4AF37]">98%</div>
                                    <div className="text-white/60 text-sm mt-1">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;