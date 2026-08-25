"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-center relative py-12 px-4 md:px-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-tertiary-container opacity-[0.03] rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-headline text-[32px] font-bold text-primary mb-2">Reset Password</h1>
          <p className="text-[18px] text-on-surface-variant">Enter your email to receive a reset link.</p>
        </div>

        <div className="card rounded-xl overflow-hidden">
          <div className="p-8 md:p-10 space-y-6">
            {success ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#0d7a5f]/10 text-[#0d7a5f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h2 className="text-[20px] font-bold text-on-surface">Check your email</h2>
                <p className="text-[15px] text-on-surface-variant">
                  We've sent a password reset link to <strong>{email}</strong>.
                </p>
                <Link 
                  href="/login" 
                  className="mt-6 inline-block w-full py-3 px-4 border border-primary text-primary hover:bg-primary/5 rounded-md font-medium transition-colors"
                >
                  Return to log in
                </Link>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleReset}>
                {error && (
                  <div className="p-3 bg-error-container text-on-error-container text-[14px] rounded-md font-medium">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-[14px] font-medium text-on-surface mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@university.edu"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-surface-variant rounded-md bg-surface text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-[16px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-white bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {!success && (
          <div className="mt-8 text-center">
             <Link href="/login" className="text-[14px] text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to log in
             </Link>
          </div>
        )}
      </div>
    </main>
  );
}
