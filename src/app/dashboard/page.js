'use client'
import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";

const BRONZE = "#A0825C";
const BRONZE_LIGHT = "#C4A875";
const DEEP_CHARCOAL = "#131211";
const CHARCOAL = "#1A1A1A";
const WARM_IVORY = "#F2EDE4";
const OFF_WHITE = "#EDE8E0";
const WARM_GREY = "#6B6360";
const BODY_TEXT = "#2A2826";

// Mock member data
const member = {
  name: "David Okonkwo",
  cohort: "Provider Cohort A",
  facilitator: "Samuel Adekunle",
  partner: "Michael Eze",
  cycle: "The Provider",
  week: 8,
  status: "active",
  joinDate: "April 2026",
};

const baseline = { spiritual: 6, financial: 3, relational: 5, physical: 4, emotional: 3, professional: 7, leadership: 5 };
const current = { spiritual: 7, financial: 6, relational: 6, physical: 5, emotional: 5, professional: 8, leadership: 6 };

const radarData = [
  { dimension: "Spiritual", baseline: baseline.spiritual, current: current.spiritual },
  { dimension: "Financial", baseline: baseline.financial, current: current.financial },
  { dimension: "Relational", baseline: baseline.relational, current: current.relational },
  { dimension: "Physical", baseline: baseline.physical, current: current.physical },
  { dimension: "Emotional", baseline: baseline.emotional, current: current.emotional },
  { dimension: "Professional", baseline: baseline.professional, current: current.professional },
  { dimension: "Leadership", baseline: baseline.leadership, current: current.leadership },
];

const checkins = [
  { week: 1, partner: true, session: true, assignment: "completed" },
  { week: 2, partner: true, session: true, assignment: "completed" },
  { week: 3, partner: true, session: true, assignment: "completed" },
  { week: 4, partner: true, session: true, assignment: "completed" },
  { week: 5, partner: false, session: true, assignment: "partial" },
  { week: 6, partner: true, session: true, assignment: "completed" },
  { week: 7, partner: true, session: true, assignment: "completed" },
  { week: 8, partner: true, session: false, assignment: "pending" },
];

const badges = [
  { name: "First Assessment", icon: "📋", date: "Week 1" },
  { name: "4-Week Streak", icon: "🔥", date: "Week 4" },
  { name: "Financial Snapshot", icon: "📊", date: "Week 3" },
  { name: "Debt Plan Created", icon: "📝", date: "Week 4" },
];

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "white", borderRadius: 8, padding: 24,
    border: "1px solid #E8E3DA", ...style,
  }}>{children}</div>
);

const CardTitle = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: BRONZE, marginBottom: 16 }}>
    {children}
  </div>
);

const StatusDot = ({ active }) => (
  <div style={{
    width: 8, height: 8, borderRadius: "50%",
    background: active ? "#4CAF50" : "#E0DBD2",
  }} />
);

export default function MemberDashboard() {
  const [view, setView] = useState("overview");
  const totalScore = Object.values(current).reduce((a, b) => a + b, 0);
  const baselineTotal = Object.values(baseline).reduce((a, b) => a + b, 0);
  const avgScore = (totalScore / 7).toFixed(1);

  return (
    <div style={{
      minHeight: "100vh", background: WARM_IVORY,
      fontFamily: "'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Header */}
      <div style={{ background: DEEP_CHARCOAL, padding: "16px 0", borderBottom: `2px solid ${BRONZE}` }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: BRONZE, letterSpacing: 1 }}>BBM</div>
              <div style={{ fontSize: 7, letterSpacing: 2, color: WARM_GREY }}>BECOMING BETTER MEN</div>
            </div>
            <div style={{ width: 1, height: 28, background: "#2A2826" }} />
            <div style={{ fontSize: 13, color: OFF_WHITE }}>Member Dashboard</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: BRONZE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: DEEP_CHARCOAL }}>
              {member.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div style={{ fontSize: 13, color: OFF_WHITE }}>{member.name}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>
        {/* Welcome bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: CHARCOAL, marginBottom: 4 }}>
              Welcome back, {member.name.split(" ")[0]}
            </h1>
            <p style={{ fontSize: 14, color: WARM_GREY }}>
              {member.cycle} · Week {member.week} of 12 · {member.cohort}
            </p>
          </div>
          <div style={{
            background: DEEP_CHARCOAL, borderRadius: 6, padding: "10px 20px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: BRONZE }}>{avgScore}</div>
            <div style={{ fontSize: 11, color: WARM_GREY, lineHeight: 1.3 }}>Average<br/>Score</div>
          </div>
        </div>

        {/* Progress bar */}
        <Card style={{ marginBottom: 24, padding: "16px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: CHARCOAL }}>Cycle Progress</span>
            <span style={{ fontSize: 13, color: BRONZE, fontWeight: 700 }}>Week {member.week}/12</span>
          </div>
          <div style={{ background: "#E8E3DA", borderRadius: 4, height: 8, overflow: "hidden" }}>
            <div style={{ background: BRONZE, height: "100%", width: `${(member.week/12)*100}%`, borderRadius: 4, transition: "width 0.5s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: WARM_GREY, marginTop: 4 }}>
            <span>Foundation</span><span>Immersion</span><span>Integration</span><span>Reckoning</span>
          </div>
        </Card>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Radar chart */}
          <Card style={{ gridColumn: "1 / -1" }}>
            <CardTitle>Your Seven Dimensions</CardTitle>
            <p style={{ fontSize: 13, color: WARM_GREY, marginBottom: 16 }}>Baseline (Week 1) vs Current (Week {member.week})</p>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#E8E3DA" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: BODY_TEXT }} />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10, fill: WARM_GREY }} />
                <Radar name="Baseline" dataKey="baseline" stroke="#D6CFC3" fill="#D6CFC3" fillOpacity={0.2} strokeWidth={1.5} />
                <Radar name="Current" dataKey="current" stroke={BRONZE} fill={BRONZE} fillOpacity={0.15} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 12, color: WARM_GREY }} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Dimension scores */}
          <Card>
            <CardTitle>Dimension Scores</CardTitle>
            {radarData.map(d => (
              <div key={d.dimension} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${WARM_IVORY}` }}>
                <span style={{ fontSize: 14, color: BODY_TEXT }}>{d.dimension}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#D6CFC3" }}>{d.baseline}</span>
                  <span style={{ fontSize: 12, color: WARM_GREY }}>→</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: d.current > d.baseline ? "#4CAF50" : d.current < d.baseline ? "#E57373" : BRONZE }}>
                    {d.current}
                  </span>
                  {d.current > d.baseline && (
                    <span style={{ fontSize: 11, color: "#4CAF50", fontWeight: 600 }}>+{d.current - d.baseline}</span>
                  )}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", borderTop: `2px solid ${WARM_IVORY}`, marginTop: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: CHARCOAL }}>Total</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#D6CFC3" }}>{baselineTotal}</span>
                <span style={{ fontSize: 12, color: WARM_GREY }}>→</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: BRONZE }}>{totalScore}</span>
                <span style={{ fontSize: 12, color: "#4CAF50", fontWeight: 600 }}>+{totalScore - baselineTotal}</span>
              </div>
            </div>
          </Card>

          {/* Accountability */}
          <Card>
            <CardTitle>Accountability Record</CardTitle>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: "6px 12px", fontSize: 12 }}>
              <div style={{ fontWeight: 700, color: WARM_GREY }}>Wk</div>
              <div style={{ fontWeight: 700, color: WARM_GREY }}>Partner</div>
              <div style={{ fontWeight: 700, color: WARM_GREY }}>Session</div>
              <div style={{ fontWeight: 700, color: WARM_GREY }}>Assignment</div>
              {checkins.map(c => (
                <>
                  <div key={`w${c.week}`} style={{ fontWeight: 600, color: BRONZE }}>{c.week}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <StatusDot active={c.partner} />
                    <span style={{ color: c.partner ? "#4CAF50" : WARM_GREY }}>{c.partner ? "Done" : "Missed"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <StatusDot active={c.session} />
                    <span style={{ color: c.session ? "#4CAF50" : WARM_GREY }}>{c.session ? "Attended" : "Missed"}</span>
                  </div>
                  <div>
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 3,
                      background: c.assignment === "completed" ? "#E8F5E9" : c.assignment === "partial" ? "#FFF8E1" : "#F5F0E8",
                      color: c.assignment === "completed" ? "#2E7D32" : c.assignment === "partial" ? "#F57F17" : WARM_GREY,
                      fontWeight: 600,
                    }}>
                      {c.assignment === "completed" ? "Done" : c.assignment === "partial" ? "Partial" : "Pending"}
                    </span>
                  </div>
                </>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "12px 0 0", borderTop: `1px solid ${WARM_IVORY}`, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: WARM_GREY }}>Completion Rate</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: BRONZE }}>
                {Math.round((checkins.filter(c => c.partner && c.session).length / checkins.length) * 100)}%
              </span>
            </div>
          </Card>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* My cohort */}
          <Card>
            <CardTitle>My Cohort</CardTitle>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: CHARCOAL }}>{member.cohort}</div>
              <div style={{ fontSize: 13, color: WARM_GREY }}>{member.cycle} · Week {member.week}</div>
            </div>
            <div style={{ padding: "12px 0", borderTop: `1px solid ${WARM_IVORY}` }}>
              <div style={{ fontSize: 12, color: WARM_GREY, marginBottom: 4 }}>Facilitator</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL }}>{member.facilitator}</div>
            </div>
            <div style={{ padding: "12px 0", borderTop: `1px solid ${WARM_IVORY}` }}>
              <div style={{ fontSize: 12, color: WARM_GREY, marginBottom: 4 }}>Accountability Partner</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL }}>{member.partner}</div>
            </div>
            <div style={{ padding: "12px 0", borderTop: `1px solid ${WARM_IVORY}` }}>
              <div style={{ fontSize: 12, color: WARM_GREY, marginBottom: 4 }}>Next Session</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL }}>Wednesday, 6:00 PM</div>
              <div style={{ fontSize: 12, color: WARM_GREY }}>Module 6: Providing Beyond Money</div>
            </div>
          </Card>

          {/* Badges */}
          <Card>
            <CardTitle>Milestones Earned</CardTitle>
            {badges.map((b, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0", borderBottom: i < badges.length - 1 ? `1px solid ${WARM_IVORY}` : "none",
              }}>
                <div style={{ fontSize: 24, width: 40, textAlign: "center" }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: WARM_GREY }}>{b.date}</div>
                </div>
              </div>
            ))}
            <div style={{
              marginTop: 16, padding: "12px 16px", background: WARM_IVORY, borderRadius: 6,
              fontSize: 13, color: WARM_GREY, textAlign: "center",
            }}>
              Complete this cycle to earn the <strong style={{ color: BRONZE }}>Provider Badge</strong>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #E8E3DA", padding: "16px 24px", textAlign: "center", fontSize: 11, color: WARM_GREY }}>
        Becoming Better Men · Built by <a href="https://jovilex.com" target="_blank" rel="noopener" style={{ color: BRONZE, textDecoration: "none" }}>Jovilex</a>
      </div>
    </div>
  );
}
