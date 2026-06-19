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

const facilitator = { name: "Samuel Adekunle", tier: "Active Facilitator", cohort: "Provider Cohort A", cycle: "The Provider", week: 8 };

const members = [
  { id: 1, name: "David Okonkwo", age: 34, partner: "Michael Eze", partnerCheckin: true, sessionAttended: true, assignment: "completed", avgScore: 6.1, delta: +1.7, alert: null },
  { id: 2, name: "Michael Eze", age: 41, partner: "David Okonkwo", partnerCheckin: true, sessionAttended: true, assignment: "completed", avgScore: 5.4, delta: +1.2, alert: null },
  { id: 3, name: "Chidi Nnamdi", age: 29, partner: "Tunde Bakare", partnerCheckin: true, sessionAttended: true, assignment: "partial", avgScore: 4.9, delta: +0.8, alert: null },
  { id: 4, name: "Tunde Bakare", age: 38, partner: "Chidi Nnamdi", partnerCheckin: false, sessionAttended: true, assignment: "completed", avgScore: 5.7, delta: +1.4, alert: null },
  { id: 5, name: "Emmanuel Ojo", age: 45, partner: "Peter Adewale", partnerCheckin: true, sessionAttended: false, assignment: "not_done", avgScore: 4.1, delta: +0.3, alert: "disengaging" },
  { id: 6, name: "Peter Adewale", age: 33, partner: "Emmanuel Ojo", partnerCheckin: true, sessionAttended: true, assignment: "completed", avgScore: 6.8, delta: +2.1, alert: null },
  { id: 7, name: "Femi Adesanya", age: 37, partner: "James Okoro", partnerCheckin: true, sessionAttended: true, assignment: "completed", avgScore: 5.2, delta: +1.0, alert: null },
  { id: 8, name: "James Okoro", age: 50, partner: "Femi Adesanya", partnerCheckin: true, sessionAttended: true, assignment: "partial", avgScore: 5.0, delta: +0.6, alert: null },
  { id: 9, name: "Solomon Bello", age: 31, partner: "Yusuf Ibrahim", partnerCheckin: false, sessionAttended: false, assignment: "not_done", avgScore: 3.9, delta: -0.1, alert: "critical" },
  { id: 10, name: "Yusuf Ibrahim", age: 43, partner: "Solomon Bello", partnerCheckin: true, sessionAttended: true, assignment: "completed", avgScore: 5.5, delta: +1.3, alert: null },
];

const Card = ({ children, style = {} }) => (
  <div style={{ background: "white", borderRadius: 8, padding: 24, border: "1px solid #E8E3DA", ...style }}>{children}</div>
);
const CardTitle = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: BRONZE, marginBottom: 16 }}>{children}</div>
);

const StatusPill = ({ status }) => {
  const colors = {
    completed: { bg: "#E8F5E9", text: "#2E7D32" },
    partial: { bg: "#FFF8E1", text: "#F57F17" },
    not_done: { bg: "#FFEBEE", text: "#C62828" },
    pending: { bg: "#F5F0E8", text: WARM_GREY },
  };
  const c = colors[status] || colors.pending;
  const labels = { completed: "Done", partial: "Partial", not_done: "Not Done", pending: "Pending" };
  return (
    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 3, background: c.bg, color: c.text, fontWeight: 600 }}>
      {labels[status] || status}
    </span>
  );
};

const AlertBadge = ({ type }) => {
  if (!type) return null;
  const isC = type === "critical";
  return (
    <span style={{
      fontSize: 10, padding: "2px 8px", borderRadius: 3, fontWeight: 700, letterSpacing: 0.5,
      background: isC ? "#FFEBEE" : "#FFF8E1",
      color: isC ? "#C62828" : "#E65100",
      textTransform: "uppercase",
    }}>
      {isC ? "CRITICAL" : "WATCH"}
    </span>
  );
};

export default function FacilitatorDashboard() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [noteText, setNoteText] = useState("");

  const attended = members.filter(m => m.sessionAttended).length;
  const partnerDone = members.filter(m => m.partnerCheckin).length;
  const assignmentsDone = members.filter(m => m.assignment === "completed").length;
  const alerts = members.filter(m => m.alert);
  const avgDelta = (members.reduce((a, m) => a + m.delta, 0) / members.length).toFixed(1);

  return (
    <div style={{ minHeight: "100vh", background: WARM_IVORY, fontFamily: "'Satoshi', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ background: DEEP_CHARCOAL, padding: "16px 0", borderBottom: `2px solid ${BRONZE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: BRONZE, letterSpacing: 1 }}>BBM</div>
              <div style={{ fontSize: 7, letterSpacing: 2, color: WARM_GREY }}>BECOMING BETTER MEN</div>
            </div>
            <div style={{ width: 1, height: 28, background: "#2A2826" }} />
            <div style={{ fontSize: 13, color: OFF_WHITE }}>Facilitator Dashboard</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: OFF_WHITE, textAlign: "right" }}>{facilitator.name}</div>
              <div style={{ fontSize: 11, color: WARM_GREY, textAlign: "right" }}>{facilitator.tier}</div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: BRONZE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: DEEP_CHARCOAL }}>SA</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, marginBottom: 4 }}>{facilitator.cohort}</h1>
          <p style={{ fontSize: 14, color: WARM_GREY }}>{facilitator.cycle} · Week {facilitator.week} of 12 · {members.length} men</p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Session Attendance", value: `${attended}/${members.length}`, sub: `${Math.round(attended/members.length*100)}%` },
            { label: "Partner Check-ins", value: `${partnerDone}/${members.length}`, sub: `${Math.round(partnerDone/members.length*100)}%` },
            { label: "Assignments Done", value: `${assignmentsDone}/${members.length}`, sub: `${Math.round(assignmentsDone/members.length*100)}%` },
            { label: "Avg Score Movement", value: `+${avgDelta}`, sub: "vs baseline" },
            { label: "Alerts", value: alerts.length, sub: alerts.length > 0 ? "Needs attention" : "All clear" },
          ].map((stat, i) => (
            <Card key={i} style={{ padding: "16px 20px" }}>
              <div style={{ fontSize: 11, color: WARM_GREY, marginBottom: 8, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{stat.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: i === 4 && alerts.length > 0 ? "#C62828" : BRONZE }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: WARM_GREY, marginTop: 2 }}>{stat.sub}</div>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card style={{ marginBottom: 24, borderLeft: `3px solid #C62828` }}>
            <CardTitle>Engagement Alerts</CardTitle>
            {alerts.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${WARM_IVORY}` }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL }}>{m.name}</span>
                  <span style={{ fontSize: 12, color: WARM_GREY, marginLeft: 8 }}>
                    {m.alert === "critical" ? "Missed session + check-in + assignment. Two consecutive weeks of decline." : "Missed session this week. Assignment not submitted."}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <AlertBadge type={m.alert} />
                  <button style={{ fontSize: 12, padding: "6px 14px", background: DEEP_CHARCOAL, color: OFF_WHITE, border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}>
                    Call
                  </button>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Member roster */}
        <Card>
          <CardTitle>Cohort Roster — Week {facilitator.week}</CardTitle>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${BRONZE}` }}>
                  {["Name", "Age", "Partner", "Check-in", "Session", "Assignment", "Avg Score", "Movement", "Alert"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: BRONZE, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m.id}
                    style={{ borderBottom: `1px solid ${WARM_IVORY}`, cursor: "pointer", background: selectedMember === m.id ? "#F9F6F0" : "transparent" }}
                    onClick={() => setSelectedMember(selectedMember === m.id ? null : m.id)}
                  >
                    <td style={{ padding: "10px", fontWeight: 600, color: CHARCOAL }}>{m.name}</td>
                    <td style={{ padding: "10px", color: WARM_GREY }}>{m.age}</td>
                    <td style={{ padding: "10px", color: BODY_TEXT, fontSize: 12 }}>{m.partner}</td>
                    <td style={{ padding: "10px" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.partnerCheckin ? "#4CAF50" : "#E57373" }} />
                    </td>
                    <td style={{ padding: "10px" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.sessionAttended ? "#4CAF50" : "#E57373" }} />
                    </td>
                    <td style={{ padding: "10px" }}><StatusPill status={m.assignment} /></td>
                    <td style={{ padding: "10px", fontWeight: 700, color: CHARCOAL }}>{m.avgScore}</td>
                    <td style={{ padding: "10px" }}>
                      <span style={{ fontWeight: 700, color: m.delta > 0 ? "#4CAF50" : m.delta < 0 ? "#C62828" : WARM_GREY }}>
                        {m.delta > 0 ? "+" : ""}{m.delta}
                      </span>
                    </td>
                    <td style={{ padding: "10px" }}><AlertBadge type={m.alert} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Selected member detail + notes */}
        {selectedMember && (
          <Card style={{ marginTop: 24 }}>
            <CardTitle>Facilitator Notes — {members.find(m => m.id === selectedMember)?.name}</CardTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <div style={{ fontSize: 13, color: WARM_GREY, marginBottom: 12 }}>Previous notes would appear here from the database.</div>
                <div style={{ padding: 16, background: WARM_IVORY, borderRadius: 6, fontSize: 13, color: BODY_TEXT, lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 600, color: CHARCOAL, marginBottom: 4 }}>Week 7 Note:</div>
                  Engaged well in the generosity module. Shared openly about his struggle with tithing consistency. 
                  Completed the giving assignment and reported it was meaningful. Watch for follow-through in week 8 — 
                  he tends to peak mid-module and drift toward the end.
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: CHARCOAL, marginBottom: 8 }}>Add Note for Week {facilitator.week}</div>
                <textarea
                  value={noteText} onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Your private observation for this member this week..."
                  rows={5}
                  style={{ width: "100%", padding: 12, fontSize: 14, border: `1px solid #D6CFC3`, borderRadius: 4, fontFamily: "inherit", resize: "vertical", lineHeight: 1.6 }}
                />
                <button style={{
                  marginTop: 8, padding: "10px 24px", background: BRONZE, color: DEEP_CHARCOAL,
                  border: "none", borderRadius: 4, fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>
                  Save Note
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Session planning */}
        <Card style={{ marginTop: 24 }}>
          <CardTitle>Next Session</CardTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: WARM_GREY, marginBottom: 4 }}>Date & Time</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL }}>Wednesday, 6:00 PM</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: WARM_GREY, marginBottom: 4 }}>Module</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL }}>Module 6: Providing Beyond Money</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: WARM_GREY, marginBottom: 4 }}>Format</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL }}>Module Session (90 min)</div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: "12px 16px", background: WARM_IVORY, borderRadius: 6, fontSize: 13, color: BODY_TEXT }}>
            <strong>Reminder:</strong> This is the final immersion module. Next week begins Integration. Prepare the cohort for the shift from new content to reflection.
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #E8E3DA", padding: "16px 24px", textAlign: "center", fontSize: 11, color: WARM_GREY, marginTop: 32 }}>
        Becoming Better Men · Built by <a href="https://jovilex.com" target="_blank" rel="noopener" style={{ color: BRONZE, textDecoration: "none" }}>Jovilex</a>
      </div>
    </div>
  );
}
