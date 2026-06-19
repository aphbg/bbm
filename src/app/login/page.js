'use client'
import { useState } from "react";

const BRONZE = "#A0825C";
const BRONZE_LIGHT = "#C4A875";
const DEEP_CHARCOAL = "#131211";
const CHARCOAL = "#1A1A1A";
const WARM_IVORY = "#F2EDE4";
const OFF_WHITE = "#EDE8E0";
const WARM_GREY = "#6B6360";
const BODY_TEXT = "#2A2826";

// Demo accounts for presentation
const demoAccounts = [
  { email: "david@email.com", password: "bbm2026", role: "member", name: "David Okonkwo" },
  { email: "samuel@email.com", password: "bbm2026", role: "facilitator", name: "Samuel Adekunle" },
  { email: "admin@bbm.com", password: "bbm2026", role: "admin", name: "Programme Coordinator" },
];

export default function BBMLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    const account = demoAccounts.find(a => a.email === email.toLowerCase().trim() && a.password === password);
    if (account) {
      setLoggedIn(account);
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  // Logged in — show role-based routing confirmation
  if (loggedIn) {
    const roleLabels = { member: "Member Dashboard", facilitator: "Facilitator Dashboard", admin: "Programme Administration" };
    const roleDescriptions = {
      member: "Your personal transformation profile, dimension scores, accountability record, cohort information, and cycle progress.",
      facilitator: "Your assigned cohort roster, member engagement tracking, facilitator notes, session planning, and disengagement alerts.",
      admin: "Global operations — chapters, members, cohorts, facilitators, financials, compliance, referral networks, and reporting.",
    };
    const roleColors = { member: BRONZE, facilitator: "#4CAF50", admin: "#2196F3" };

    return (
      <div style={{ minHeight: "100vh", background: DEEP_CHARCOAL, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Satoshi', sans-serif" }}>
        <div style={{ width: "100%", maxWidth: 440, padding: "0 24px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: roleColors[loggedIn.role], display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={DEEP_CHARCOAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: OFF_WHITE, marginBottom: 8, fontFamily: "'Clash Display', sans-serif" }}>
            Welcome, {loggedIn.name.split(" ")[0]}
          </div>
          <div style={{ fontSize: 13, color: WARM_GREY, marginBottom: 32 }}>
            Authenticated as <span style={{ color: roleColors[loggedIn.role], fontWeight: 600 }}>{loggedIn.role}</span>
          </div>

          <div style={{
            background: CHARCOAL, borderRadius: 8, padding: 28,
            border: `1px solid rgba(160,130,92,0.1)`, textAlign: "left", marginBottom: 24,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: BRONZE, marginBottom: 12 }}>
              Redirecting to
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: OFF_WHITE, marginBottom: 8, fontFamily: "'Clash Display', sans-serif" }}>
              {roleLabels[loggedIn.role]}
            </div>
            <div style={{ fontSize: 14, color: WARM_GREY, lineHeight: 1.6 }}>
              {roleDescriptions[loggedIn.role]}
            </div>
          </div>

          <button onClick={() => setLoggedIn(null)} style={{
            background: "transparent", border: `1px solid rgba(160,130,92,0.2)`, color: WARM_GREY,
            padding: "10px 24px", borderRadius: 4, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          }}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: DEEP_CHARCOAL,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Satoshi', -apple-system, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Atmospheric gradients */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(160,130,92,0.03) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(160,130,92,0.02) 0%, transparent 70%)", borderRadius: "50%" }} />

      <div style={{ width: "100%", maxWidth: 400, padding: "0 24px", position: "relative", zIndex: 1 }}>
        {/* Logo area */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 28, color: BRONZE, letterSpacing: 2, marginBottom: 4 }}>
            BBM
          </div>
          <div style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: WARM_GREY }}>
            Becoming Better Men
          </div>
        </div>

        {/* Login card */}
        <div style={{
          background: CHARCOAL, borderRadius: 8, padding: 32,
          border: `1px solid rgba(160,130,92,0.08)`,
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: OFF_WHITE, marginBottom: 4, fontFamily: "'Clash Display', sans-serif" }}>
            Sign in
          </div>
          <div style={{ fontSize: 13, color: WARM_GREY, marginBottom: 28 }}>
            Access your dashboard
          </div>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: WARM_GREY, marginBottom: 6, letterSpacing: 0.3 }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
              placeholder="your@email.com"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%", padding: "12px 16px", fontSize: 15,
                background: "rgba(255,255,255,0.04)", border: `1px solid rgba(160,130,92,0.15)`,
                borderRadius: 4, color: OFF_WHITE, outline: "none", fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = BRONZE}
              onBlur={e => e.target.style.borderColor = "rgba(160,130,92,0.15)"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: WARM_GREY, marginBottom: 6, letterSpacing: 0.3 }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter your password"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%", padding: "12px 16px", fontSize: 15,
                background: "rgba(255,255,255,0.04)", border: `1px solid rgba(160,130,92,0.15)`,
                borderRadius: 4, color: OFF_WHITE, outline: "none", fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = BRONZE}
              onBlur={e => e.target.style.borderColor = "rgba(160,130,92,0.15)"}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{ fontSize: 13, color: "#E57373", marginBottom: 16, padding: "8px 12px", background: "rgba(229,115,115,0.08)", borderRadius: 4 }}>
              {error}
            </div>
          )}

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={!email || !password || loading}
            style={{
              width: "100%", padding: "14px", background: email && password ? BRONZE : "rgba(160,130,92,0.2)",
              color: email && password ? DEEP_CHARCOAL : WARM_GREY,
              border: "none", borderRadius: 4, fontSize: 15, fontWeight: 700, fontFamily: "inherit",
              cursor: email && password ? "pointer" : "not-allowed",
              letterSpacing: 0.5, textTransform: "uppercase",
              transition: "background 0.3s", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Forgot password */}
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href="#" style={{ fontSize: 13, color: WARM_GREY, textDecoration: "none", transition: "color 0.2s" }}
              onMouseOver={e => e.target.style.color = BRONZE}
              onMouseOut={e => e.target.style.color = WARM_GREY}>
              Forgot your password?
            </a>
          </div>
        </div>

        {/* New member note */}
        <div style={{
          textAlign: "center", marginTop: 24, padding: "16px 20px",
          background: "rgba(160,130,92,0.04)", borderRadius: 6,
          border: `1px solid rgba(160,130,92,0.06)`,
        }}>
          <div style={{ fontSize: 13, color: WARM_GREY }}>
            New to Becoming Better Men?
          </div>
          <a href="#" style={{ fontSize: 13, fontWeight: 700, color: BRONZE, textDecoration: "none", marginTop: 4, display: "inline-block" }}>
            Join the next event →
          </a>
        </div>

        {/* Demo accounts toggle */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button onClick={() => setShowDemo(!showDemo)} style={{
            background: "none", border: "none", fontSize: 11, color: "rgba(160,130,92,0.3)",
            cursor: "pointer", fontFamily: "inherit", letterSpacing: 1,
          }}>
            {showDemo ? "Hide demo accounts" : "Demo accounts"}
          </button>
          {showDemo && (
            <div style={{ marginTop: 12, textAlign: "left", background: CHARCOAL, borderRadius: 6, padding: 16, border: `1px solid rgba(160,130,92,0.06)` }}>
              {demoAccounts.map((a, i) => (
                <div key={i}
                  onClick={() => { setEmail(a.email); setPassword(a.password); }}
                  style={{
                    padding: "8px 12px", marginBottom: i < demoAccounts.length - 1 ? 6 : 0,
                    borderRadius: 4, cursor: "pointer", transition: "background 0.2s",
                    background: email === a.email ? "rgba(160,130,92,0.08)" : "transparent",
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(160,130,92,0.06)"}
                  onMouseOut={e => e.currentTarget.style.background = email === a.email ? "rgba(160,130,92,0.08)" : "transparent"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: OFF_WHITE }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: WARM_GREY }}>{a.email}</div>
                    </div>
                    <span style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
                      background: a.role === "admin" ? "rgba(33,150,243,0.1)" : a.role === "facilitator" ? "rgba(76,175,80,0.1)" : "rgba(160,130,92,0.1)",
                      color: a.role === "admin" ? "#2196F3" : a.role === "facilitator" ? "#4CAF50" : BRONZE,
                    }}>
                      {a.role}
                    </span>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: WARM_GREY, marginTop: 8, opacity: 0.6 }}>
                Password for all: bbm2026
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 40, fontSize: 11, color: WARM_GREY, opacity: 0.4 }}>
          Becoming Better Men · Built by <a href="https://jovilex.com" target="_blank" rel="noopener" style={{ color: BRONZE, textDecoration: "none" }}>Jovilex</a>
        </div>
      </div>
    </div>
  );
}
