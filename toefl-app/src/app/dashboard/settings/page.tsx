"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [targetScore, setTargetScore] = useState("110");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          setFullName(data.full_name || "");
          setTargetScore(data.target_score || "110");
          setEmail(data.email || "");
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          target_score: targetScore,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update settings");
      }

      setMessage({ type: 'success', text: 'Settings updated successfully!' });
      router.refresh(); // Refresh to update the dashboard server components
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-on-surface-variant text-[16px] font-medium">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="mb-8">
        <h2 className="font-headline text-[32px] font-bold text-on-surface mb-2">Account Settings</h2>
        <p className="text-[16px] text-on-surface-variant">Update your personal information and study goals.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
          <span className="material-symbols-outlined">
            {message.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="font-medium text-[14px]">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-8 rounded-xl space-y-6">
        <div>
          <label className="text-[14px] font-semibold text-on-surface block mb-2" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full p-3 bg-surface-variant border border-outline-variant rounded-lg text-[16px] text-on-surface-variant opacity-70 cursor-not-allowed"
          />
          <p className="text-[12px] text-on-surface-variant mt-1">Your email address cannot be changed currently.</p>
        </div>

        <div>
          <label className="text-[14px] font-semibold text-on-surface block mb-2" htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg text-[16px] text-on-surface focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="text-[14px] font-semibold text-on-surface block mb-2" htmlFor="targetScore">Target TOEFL Score</label>
          <select
            id="targetScore"
            value={targetScore}
            onChange={(e) => setTargetScore(e.target.value)}
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg text-[16px] text-on-surface focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {[80, 85, 90, 95, 100, 105, 110, 115, 120].map(score => (
              <option key={score} value={score}>{score}</option>
            ))}
          </select>
          <p className="text-[12px] text-on-surface-variant mt-1">This will be used to track your progress on the dashboard.</p>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white font-medium text-[14px] px-6 py-3 rounded hover:bg-primary-container transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>Saving... <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span></>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
