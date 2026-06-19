'use client'
import { useState, useRef, useEffect } from "react";

const BRONZE = "#A0825C";
const BRONZE_LIGHT = "#C4A875";
const DEEP_CHARCOAL = "#131211";
const CHARCOAL = "#1A1A1A";
const WARM_IVORY = "#F2EDE4";
const OFF_WHITE = "#EDE8E0";
const WARM_GREY = "#6B6360";
const BODY_TEXT = "#2A2826";

const dimensions = [
  { key: "spiritual", name: "Spiritual", anchors: ["How would you describe your prayer life?", "Do you engage with Scripture regularly?", "Do you feel connected to your purpose?"] },
  { key: "financial", name: "Financial", anchors: ["Do you know your total debt?", "Do you have a written budget?", "Do you save or invest regularly?"] },
  { key: "relational", name: "Relational", anchors: ["How would you rate communication with your spouse or partner?", "Do you resolve conflict or avoid it?"] },
  { key: "physical", name: "Physical", anchors: ["How often do you exercise?", "Do you know your key health numbers?", "How would you rate your energy levels?"] },
  { key: "emotional", name: "Emotional", anchors: ["Can you name what you are feeling in a given moment?", "Do you process difficult emotions or suppress them?"] },
  { key: "professional", name: "Professional", anchors: ["Are you growing in your career or stagnant?", "Do you have a clear professional direction?"] },
  { key: "leadership", name: "Leadership", anchors: ["Do people follow your direction willingly?", "Can you articulate a vision for your family and life?"] },
];

const steps = [
  { id: "welcome", label: "Welcome" },
  { id: "identity", label: "About You" },
  { id: "assessment", label: "Assessment" },
  { id: "intent", label: "Your Why" },
  { id: "complete", label: "Complete" },
];

function SliderInput({ value, onChange, dimension }) {
  const labels = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: CHARCOAL }}>{dimension.name}</span>
        <span style={{ fontSize: 28, fontWeight: 700, color: BRONZE, minWidth: 36, textAlign: "right" }}>{value}</span>
      </div>
      <div style={{ fontSize: 13, color: WARM_GREY, marginBottom: 12, lineHeight: 1.6 }}>
        {dimension.anchors.join(" · ")}
      </div>
      <input
        type="range" min="1" max="10" value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        style={{ width: "100%", accentColor: BRONZE, height: 6, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: WARM_GREY, marginTop: 4 }}>
        <span>Struggling</span><span>Thriving</span>
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: CHARCOAL, marginBottom: 6 }}>
        {label}{required && <span style={{ color: BRONZE }}> *</span>}
      </label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        required={required}
        style={{
          width: "100%", padding: "12px 16px", fontSize: 15, border: `1px solid #D6CFC3`,
          borderRadius: 4, background: "white", color: CHARCOAL, outline: "none",
          fontFamily: "inherit", transition: "border-color 0.2s",
        }}
        onFocus={(e) => e.target.style.borderColor = BRONZE}
        onBlur={(e) => e.target.style.borderColor = "#D6CFC3"}
      />
    </div>
  );
}

function SelectInput({ label, value, onChange, options, required = false }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: CHARCOAL, marginBottom: 6 }}>
        {label}{required && <span style={{ color: BRONZE }}> *</span>}
      </label>
      <select
        value={value} onChange={(e) => onChange(e.target.value)} required={required}
        style={{
          width: "100%", padding: "12px 16px", fontSize: 15, border: `1px solid #D6CFC3`,
          borderRadius: 4, background: "white", color: value ? CHARCOAL : WARM_GREY,
          outline: "none", fontFamily: "inherit", cursor: "pointer",
        }}
      >
        <option value="" disabled>Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder = "", rows = 4 }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: CHARCOAL, marginBottom: 6 }}>{label}</label>
      <textarea
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{
          width: "100%", padding: "12px 16px", fontSize: 15, border: `1px solid #D6CFC3`,
          borderRadius: 4, background: "white", color: CHARCOAL, outline: "none",
          fontFamily: "inherit", resize: "vertical", lineHeight: 1.6,
        }}
        onFocus={(e) => e.target.style.borderColor = BRONZE}
        onBlur={(e) => e.target.style.borderColor = "#D6CFC3"}
      />
    </div>
  );
}

export default function BBMIntake() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const containerRef = useRef(null);

  // Identity fields
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [marital, setMarital] = useState("");
  const [children, setChildren] = useState("");
  const [profession, setProfession] = useState("");
  const [church, setChurch] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Assessment
  const [scores, setScores] = useState({
    spiritual: 5, financial: 5, relational: 5, physical: 5,
    emotional: 5, professional: 5, leadership: 5,
  });

  // Intent
  const [whatBrought, setWhatBrought] = useState("");
  const [areaOfChange, setAreaOfChange] = useState("");
  const [triedBefore, setTriedBefore] = useState("");
  const [facilitatorNote, setFacilitatorNote] = useState("");

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const canProceed = () => {
    if (step === 1) return fullName && email && phone;
    if (step === 2) return true;
    if (step === 3) return whatBrought && areaOfChange;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Supabase submission would go here
    // For now, simulate
    await new Promise(r => setTimeout(r, 1500));
    setStep(4);
    setSubmitting(false);
  };

  const progress = (step / (steps.length - 1)) * 100;

  return (
    <div style={{
      minHeight: "100vh", background: WARM_IVORY,
      fontFamily: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: DEEP_CHARCOAL, padding: "20px 0",
        borderBottom: `2px solid ${BRONZE}`,
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: BRONZE, letterSpacing: 1 }}>BBM</div>
            <div style={{ fontSize: 7, letterSpacing: 3, color: WARM_GREY, marginTop: 1 }}>BECOMING BETTER MEN</div>
          </div>
          {step < 4 && (
            <div style={{ fontSize: 12, color: WARM_GREY }}>
              Step {step + 1} of {steps.length - 1}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {step < 4 && (
        <div style={{ background: "#E8E3DA", height: 3 }}>
          <div style={{ background: BRONZE, height: 3, width: `${progress}%`, transition: "width 0.4s ease" }} />
        </div>
      )}

      {/* Content */}
      <div ref={containerRef} style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div>
            <div style={{ width: 48, height: 2, background: BRONZE, marginBottom: 24 }} />
            <h1 style={{ fontSize: 32, fontWeight: 700, color: CHARCOAL, lineHeight: 1.2, marginBottom: 16 }}>
              Begin Your Journey
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: BODY_TEXT, marginBottom: 24 }}>
              This intake takes about eight minutes. It is not a test. There are no wrong answers.
              It is your honest view of where you stand — the starting line from which every step
              forward is measured.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: WARM_GREY, marginBottom: 8 }}>
              <strong style={{ color: CHARCOAL }}>What happens next:</strong> Your information is received
              and your Baseline Report is generated. Within 48 hours, you will be assigned to a cohort
              and introduced to your facilitator and accountability partner.
            </p>
            <p style={{ fontSize: 14, color: WARM_GREY, marginBottom: 40 }}>
              Your self-assessment data is private — visible only to you and your assigned facilitator.
            </p>
            <button onClick={() => setStep(1)} style={{
              background: BRONZE, color: DEEP_CHARCOAL, border: "none", padding: "14px 36px",
              fontSize: 15, fontWeight: 700, borderRadius: 4, cursor: "pointer", letterSpacing: 0.5,
              transition: "background 0.2s", width: "100%",
            }}
              onMouseOver={(e) => e.target.style.background = BRONZE_LIGHT}
              onMouseOut={(e) => e.target.style.background = BRONZE}
            >
              Let's Begin
            </button>
          </div>
        )}

        {/* Step 1: Identity */}
        {step === 1 && (
          <div>
            <div style={{ width: 48, height: 2, background: BRONZE, marginBottom: 24 }} />
            <h2 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, marginBottom: 8 }}>About You</h2>
            <p style={{ fontSize: 15, color: WARM_GREY, marginBottom: 32 }}>
              Basic information that helps us know who you are.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <TextInput label="Full Name" value={fullName} onChange={setFullName} required placeholder="Your full name" />
              </div>
              <TextInput label="Age" value={age} onChange={setAge} type="number" placeholder="e.g. 35" />
              <SelectInput label="Marital Status" value={marital} onChange={setMarital}
                options={["Single", "Married", "Divorced", "Widowed"]} />
              <TextInput label="City" value={city} onChange={setCity} placeholder="e.g. Abuja" />
              <TextInput label="State" value={state} onChange={setState} placeholder="e.g. FCT" />
              <div style={{ gridColumn: "1 / -1" }}>
                <TextInput label="Profession" value={profession} onChange={setProfession} placeholder="What do you do?" />
              </div>
              <TextInput label="Children" value={children} onChange={setChildren} type="number" placeholder="0" />
              <TextInput label="Church (optional)" value={church} onChange={setChurch} placeholder="Church name" />
              <TextInput label="Phone" value={phone} onChange={setPhone} type="tel" required placeholder="+234..." />
              <TextInput label="Email" value={email} onChange={setEmail} type="email" required placeholder="your@email.com" />
            </div>
          </div>
        )}

        {/* Step 2: Assessment */}
        {step === 2 && (
          <div>
            <div style={{ width: 48, height: 2, background: BRONZE, marginBottom: 24 }} />
            <h2 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, marginBottom: 8 }}>Self-Assessment</h2>
            <p style={{ fontSize: 15, color: WARM_GREY, marginBottom: 12 }}>
              Rate yourself honestly across seven dimensions. Use the anchor questions to ground
              your score in reality, not feeling.
            </p>
            <p style={{ fontSize: 13, color: BRONZE, marginBottom: 32, fontWeight: 600 }}>
              1 = Struggling significantly · 10 = Thriving consistently
            </p>
            {dimensions.map(dim => (
              <SliderInput
                key={dim.key}
                dimension={dim}
                value={scores[dim.key]}
                onChange={(val) => setScores({ ...scores, [dim.key]: val })}
              />
            ))}
          </div>
        )}

        {/* Step 3: Intent */}
        {step === 3 && (
          <div>
            <div style={{ width: 48, height: 2, background: BRONZE, marginBottom: 24 }} />
            <h2 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, marginBottom: 8 }}>Your Why</h2>
            <p style={{ fontSize: 15, color: WARM_GREY, marginBottom: 32 }}>
              In your own words. There is no right answer — only your honest one.
            </p>
            <TextArea
              label="What brought you to Becoming Better Men?"
              value={whatBrought} onChange={setWhatBrought}
              placeholder="How did you hear about us, and what made you decide to take this step?"
              rows={4}
            />
            <TextArea
              label="What is the one area of your life you most want to see change?"
              value={areaOfChange} onChange={setAreaOfChange}
              placeholder="Be as specific as you can."
              rows={3}
            />
            <TextArea
              label="Have you tried to address this before? What happened?"
              value={triedBefore} onChange={setTriedBefore}
              placeholder="Optional — but helpful for your facilitator."
              rows={3}
            />
            <TextArea
              label="Is there anything you want your facilitator to know before the programme begins?"
              value={facilitatorNote} onChange={setFacilitatorNote}
              placeholder="Optional. This is shared only with your facilitator."
              rows={3}
            />
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 4 && (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: DEEP_CHARCOAL,
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BRONZE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: CHARCOAL, marginBottom: 12 }}>
              Your intake is complete.
            </h2>
            <div style={{ width: 48, height: 2, background: BRONZE, margin: "0 auto 24px" }} />
            <p style={{ fontSize: 16, lineHeight: 1.7, color: BODY_TEXT, maxWidth: 480, margin: "0 auto 20px" }}>
              Thank you for taking this step. Your Baseline Report has been generated.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: WARM_GREY, maxWidth: 480, margin: "0 auto 24px" }}>
              Within the next 48 hours, you will be assigned to a cohort and introduced to your
              facilitator and accountability partner. You will receive an onboarding message with
              everything you need to know before the first session.
            </p>
            <p style={{ fontSize: 14, color: WARM_GREY }}>
              Your self-assessment data is private — visible only to you and your facilitator.
            </p>
            {/* Radar chart preview */}
            <div style={{ marginTop: 40, padding: 32, background: "white", borderRadius: 8, border: `1px solid #E8E3DA` }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: CHARCOAL, marginBottom: 4 }}>Your Baseline</h3>
              <p style={{ fontSize: 12, color: WARM_GREY, marginBottom: 20 }}>Seven dimensions · Scores out of 10</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", textAlign: "left" }}>
                {dimensions.map(dim => (
                  <div key={dim.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 0", borderBottom: `1px solid ${WARM_IVORY}` }}>
                    <span style={{ fontSize: 14, color: BODY_TEXT }}>{dim.name}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: BRONZE }}>{scores[dim.key]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step > 0 && step < 4 && (
          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            <button onClick={() => setStep(step - 1)} style={{
              background: "transparent", color: WARM_GREY, border: `1px solid #D6CFC3`,
              padding: "14px 24px", fontSize: 14, fontWeight: 600, borderRadius: 4,
              cursor: "pointer", flex: "0 0 auto",
            }}>
              Back
            </button>
            <button
              onClick={() => step === 3 ? handleSubmit() : setStep(step + 1)}
              disabled={!canProceed() || submitting}
              style={{
                background: canProceed() ? BRONZE : "#D6CFC3",
                color: canProceed() ? DEEP_CHARCOAL : WARM_GREY,
                border: "none", padding: "14px 36px", fontSize: 15, fontWeight: 700,
                borderRadius: 4, cursor: canProceed() ? "pointer" : "not-allowed",
                flex: 1, letterSpacing: 0.5, transition: "background 0.2s",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Submitting..." : step === 3 ? "Complete Intake" : "Continue"}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid #E8E3DA`, padding: "16px 24px", textAlign: "center",
        fontSize: 11, color: WARM_GREY,
      }}>
        Becoming Better Men · Built by <a href="https://jovilex.com" target="_blank" rel="noopener"
          style={{ color: BRONZE, textDecoration: "none" }}>Jovilex</a>
      </div>
    </div>
  );
}
