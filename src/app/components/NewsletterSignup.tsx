import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const GOLD = "#E8A838";
const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a`;

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch(`${SERVER}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("done");
    } catch (err) {
      console.error("Newsletter signup error:", err);
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="max-w-md mx-auto text-center py-4">
        <p style={{ color: GOLD, fontWeight: 600, fontSize: "1.1rem" }}>✓ You're subscribed!</p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: 6 }}>
          Watch your inbox for new posts from Brian.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded text-sm outline-none"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded text-sm transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${GOLD}, #c8821a)`,
          color: "white",
          fontWeight: 500,
          opacity: status === "loading" ? 0.7 : 1,
        }}
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="w-full text-center text-xs" style={{ color: "#fca5a5" }}>
          Something went wrong — try again or email brian@endlesspassport.com
        </p>
      )}
    </form>
  );
}
