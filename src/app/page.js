'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.08 })

    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      el.style.transition = 'opacity .6s ease, transform .6s ease'
      obs.observe(el)
    })

    return () => { window.removeEventListener('scroll', handleScroll); obs.disconnect() }
  }, [])

  const faqs = [
    { q: "What does it cost?", a: "Programme fees vary by cycle and location. The investment reflects the depth of what you receive — twelve weeks of structured transformation with facilitator access, accountability infrastructure, founder sessions, and a personal Baseline Report. Exact pricing is shared during the intake process." },
    { q: "What is the time commitment each week?", a: "One cohort session per week (ninety minutes), two accountability check-ins with your partner (fifteen minutes each), and one weekly assignment that requires real-world action. Roughly three hours per week. Twelve weeks. That is the price of change." },
    { q: "Is this a church programme?", a: "Becoming Better Men is faith-aligned but not church-operated. The programme is rooted in biblical principles and serves men of faith, but it is not a ministry, a Bible study, or a substitute for church. Men from any denomination — or none — are welcome." },
    { q: "Do I have to share personal things in front of other men?", a: "You share what you are ready to share. The cohort environment is built on trust that is earned over weeks, not forced on day one. Your self-assessment data is private — visible only to you and your facilitator. What you disclose in sessions is your choice." },
    { q: "What if I cannot finish the twelve weeks?", a: "Life happens. If you need to step away, your progress and data are preserved. You can re-enter a future cycle without starting over. The programme is designed for completion, and your facilitator will support you — but it is never a cage." },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--dc:#131211;--ch:#1A1A1A;--br:#A0825C;--bl:#C4A875;--iv:#F2EDE4;--ow:#EDE8E0;--wg:#6B6360;--bt:#2A2826;--lr:#D6CFC3;--mg:#4A4845}
        .wrap{max-width:1100px;margin:0 auto;padding:0 40px}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 0;background:rgba(19,18,17,0.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(160,130,92,0.06);transition:padding .3s}
        nav.scrolled{padding:14px 0}
        .n-inner{display:flex;justify-content:space-between;align-items:center}
        .n-mark{font-family:'Clash Display',sans-serif;font-weight:700;font-size:18px;color:var(--br);text-decoration:none;letter-spacing:1px}
        .n-links{display:flex;gap:24px;align-items:center}
        .n-links a{font-size:13px;font-weight:500;color:var(--wg);text-decoration:none;letter-spacing:.3px;transition:color .3s}
        .n-links a:hover{color:var(--ow)}
        .n-login{color:var(--br)!important;font-weight:600!important}
        .n-cta{color:var(--dc)!important;background:var(--br);padding:10px 24px;border-radius:4px;font-weight:700!important;transition:background .3s}
        .n-cta:hover{background:var(--bl)!important}
        .mob-tog{display:none;background:none;border:none;cursor:pointer;padding:8px}
        .mob-tog span{display:block;width:20px;height:1.5px;background:var(--br);margin:5px 0}
        .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:100px 0;position:relative;overflow:hidden;background:var(--dc)}
        .hero::before{content:'';position:absolute;top:-20%;right:-10%;width:600px;height:600px;background:radial-gradient(circle,rgba(160,130,92,.04) 0%,transparent 70%);border-radius:50%}
        .hero::after{content:'';position:absolute;bottom:-20%;left:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(160,130,92,.03) 0%,transparent 70%);border-radius:50%}
        .hero-inner{text-align:center;position:relative;z-index:1;max-width:960px;padding:0 24px}
        .h-tag{font-family:'Clash Display',sans-serif;font-weight:600;font-size:12px;letter-spacing:5px;text-transform:uppercase;color:var(--br);margin-bottom:32px}
        .h-head{font-family:'Clash Display',sans-serif;font-weight:700;font-size:clamp(36px,5.8vw,62px);color:var(--ow);margin-bottom:24px;letter-spacing:-1.5px;line-height:1.08}
        .h-head em{font-style:normal;color:var(--br)}
        .h-rule2{width:48px;height:1.5px;background:var(--br);margin:0 auto 24px}
        .h-sub{font-size:clamp(15px,1.8vw,17px);color:var(--wg);line-height:1.7;margin-bottom:44px;font-weight:400;max-width:500px;margin-left:auto;margin-right:auto}
        .cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
        .cta-pri{display:inline-block;padding:16px 36px;background:var(--br);color:var(--dc);font-family:'Satoshi',sans-serif;font-weight:700;font-size:14px;letter-spacing:.5px;text-transform:uppercase;text-decoration:none;border-radius:4px;transition:background .3s,transform .2s}
        .cta-pri:hover{background:var(--bl);transform:translateY(-2px)}
        .cta-sec{display:inline-block;padding:16px 36px;background:transparent;color:var(--ow);font-family:'Satoshi',sans-serif;font-weight:600;font-size:14px;letter-spacing:.5px;text-transform:uppercase;text-decoration:none;border-radius:4px;border:1px solid rgba(160,130,92,.3);transition:border-color .3s,color .3s}
        .cta-sec:hover{border-color:var(--br);color:var(--br)}
        .scroll-ind{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--wg);font-size:10px;letter-spacing:3px;text-transform:uppercase;z-index:2}
        .scroll-ind::after{content:'';width:1px;height:28px;background:var(--wg);opacity:.3;animation:pulse 2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:.15}50%{opacity:.5}}
        .sec{padding:120px 0}
        .sec-dark{background:var(--dc)}
        .sec-light{background:var(--iv);color:var(--bt)}
        .sec-deep{background:var(--ch)}
        .reality{padding:100px 0;border-top:1px solid rgba(160,130,92,.06);background:var(--dc)}
        .reality-text{max-width:680px;margin:0 auto;text-align:center}
        .reality-text p{font-size:clamp(17px,2.2vw,22px);line-height:1.7;color:var(--ow);margin-bottom:24px}
        .reality-text em{font-style:normal;color:var(--br);font-weight:600}
        .what-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
        .what-label{font-family:'Clash Display',sans-serif;font-weight:600;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--br);margin-bottom:16px}
        .what-title{font-family:'Clash Display',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:700;color:var(--ow);margin-bottom:20px;letter-spacing:-.5px;line-height:1.1}
        .what-body{font-size:16px;line-height:1.8;color:var(--ow);opacity:.8;margin-bottom:16px}
        .what-body strong{color:var(--br);font-weight:600;opacity:1}
        .what-stat{margin-bottom:28px}
        .what-stat-num{font-family:'Clash Display',sans-serif;font-size:48px;font-weight:700;color:var(--br);line-height:1}
        .what-stat-lab{font-size:14px;color:var(--wg);margin-top:4px}
        .quote-sec{padding:80px 0;border-top:1px solid rgba(160,130,92,.06);border-bottom:1px solid rgba(160,130,92,.06);background:var(--dc)}
        .quote{font-family:'Clash Display',sans-serif;font-weight:600;font-size:clamp(20px,3.2vw,34px);line-height:1.35;color:var(--ow);text-align:center;max-width:800px;margin:0 auto}
        .quote em{font-style:normal;color:var(--br)}
        .dim-intro{max-width:560px;margin-bottom:56px}
        .dim-title{font-family:'Clash Display',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:700;margin-bottom:16px;line-height:1.1}
        .dim-sub{font-size:16px;line-height:1.7}
        .dim-list{display:flex;flex-direction:column}
        .dim-item{display:flex;align-items:baseline;gap:20px;padding:20px 0;border-bottom:1px solid var(--lr)}
        .dim-item:first-child{border-top:1px solid var(--lr)}
        .dim-num{font-family:'Clash Display',sans-serif;font-weight:700;font-size:14px;color:var(--br);min-width:28px}
        .dim-name{font-family:'Clash Display',sans-serif;font-weight:700;font-size:20px;min-width:160px}
        .dim-desc{font-size:14px;line-height:1.6;flex:1}
        .cycle-head{max-width:600px;margin-bottom:56px}
        .cycle-title{font-family:'Clash Display',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:700;color:var(--ow);margin-bottom:16px;line-height:1.1}
        .cycle-sub{font-size:16px;color:var(--wg);line-height:1.7}
        .phases{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .phase{padding:28px 24px;border:1px solid rgba(160,130,92,.12);border-radius:6px;transition:border-color .3s}
        .phase:hover{border-color:var(--br)}
        .phase-wk{font-family:'Clash Display',sans-serif;font-weight:600;font-size:11px;color:var(--br);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
        .phase-name{font-family:'Clash Display',sans-serif;font-weight:700;font-size:20px;color:var(--ow);margin-bottom:10px}
        .phase-desc{font-size:14px;line-height:1.6;color:var(--wg)}
        .founder-sec{padding:120px 0;background:var(--dc);border-top:1px solid rgba(160,130,92,.06)}
        .founder-grid{display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:center;max-width:800px;margin:0 auto}
        .founder-avatar{width:120px;height:120px;border-radius:50%;background:var(--ch);border:2px solid rgba(160,130,92,.2);display:flex;align-items:center;justify-content:center;font-family:'Clash Display',sans-serif;font-weight:700;font-size:36px;color:var(--br)}
        .founder-name{font-family:'Clash Display',sans-serif;font-weight:700;font-size:24px;color:var(--ow);margin-bottom:4px}
        .founder-role{font-size:13px;color:var(--br);font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px}
        .founder-bio{font-size:15px;line-height:1.7;color:var(--wg)}
        .comm-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px 64px}
        .comm-item h4{font-family:'Clash Display',sans-serif;font-weight:600;font-size:18px;margin-bottom:6px}
        .comm-item p{font-size:15px;line-height:1.7}
        .events-sec{padding:120px 0;background:var(--ch)}
        .events-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:800px}
        .event-card{padding:32px;border:1px solid rgba(160,130,92,.12);border-radius:8px;transition:border-color .3s}
        .event-card:hover{border-color:var(--br)}
        .event-badge{font-family:'Clash Display',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--dc);background:var(--br);padding:4px 12px;border-radius:3px;display:inline-block;margin-bottom:16px}
        .event-name{font-family:'Clash Display',sans-serif;font-weight:700;font-size:20px;color:var(--ow);margin-bottom:8px}
        .event-detail{font-size:14px;color:var(--wg);margin-bottom:4px}
        .event-cta{display:inline-block;margin-top:16px;font-size:13px;font-weight:700;color:var(--br);text-decoration:none;letter-spacing:.5px;text-transform:uppercase;transition:color .3s}
        .event-cta:hover{color:var(--bl)}
        .faq-sec{padding:120px 0;background:var(--iv);color:var(--bt)}
        .faq-list{max-width:720px}
        .faq-item{border-bottom:1px solid var(--lr);cursor:pointer}
        .faq-q{display:flex;justify-content:space-between;align-items:center;padding:20px 0;font-family:'Clash Display',sans-serif;font-weight:600;font-size:16px;color:var(--ch)}
        .faq-q span{font-size:20px;color:var(--br);transition:transform .3s}
        .faq-a{font-size:15px;line-height:1.7;color:var(--mg);padding:0 0 20px;max-width:640px}
        .intake-sec{text-align:center;padding:140px 0;background:var(--dc)}
        .intake-label{font-family:'Clash Display',sans-serif;font-weight:600;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--br);margin-bottom:16px}
        .intake-title{font-family:'Clash Display',sans-serif;font-size:clamp(28px,4.5vw,44px);font-weight:700;color:var(--ow);margin-bottom:20px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.1}
        .intake-body{font-size:clamp(15px,1.8vw,17px);color:var(--wg);line-height:1.7;max-width:520px;margin:0 auto 40px}
        .intake-note{font-size:13px;color:var(--wg);margin-top:20px}
        footer{padding:48px 0 32px;border-top:1px solid rgba(160,130,92,.06);background:var(--dc)}
        .f-inner{display:flex;justify-content:space-between;align-items:flex-start}
        .f-mark{font-family:'Clash Display',sans-serif;font-weight:700;font-size:16px;color:var(--br);letter-spacing:1px}
        .f-tag{font-size:12px;color:var(--wg);margin-top:6px}
        .f-contact{font-size:12px;color:var(--wg);margin-top:8px}
        .f-contact a{color:var(--br);text-decoration:none}
        .f-links{display:flex;gap:20px}
        .f-links a{font-size:12px;color:var(--wg);text-decoration:none;transition:color .3s}
        .f-links a:hover{color:var(--ow)}
        .f-credit{font-size:11px;color:var(--wg);opacity:.5;margin-top:8px;text-align:right}
        .f-credit a{color:var(--br);text-decoration:none}
        .f-rule{width:100%;height:1px;background:rgba(160,130,92,.06);margin:28px 0}
        .f-bottom{text-align:center;font-size:10px;color:var(--wg);opacity:.4}
        @media(max-width:900px){.what-grid,.events-grid,.comm-grid{grid-template-columns:1fr}.phases{grid-template-columns:1fr 1fr}.dim-item{flex-direction:column;gap:4px}.dim-name{min-width:auto}.founder-grid{grid-template-columns:1fr;text-align:center;justify-items:center}}
        @media(max-width:600px){.wrap{padding:0 20px}.sec,.founder-sec,.events-sec,.faq-sec{padding:80px 0}.n-links{display:none}.n-links.open{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--dc);padding:20px;gap:14px;border-bottom:1px solid rgba(160,130,92,.06)}.mob-tog{display:block}.phases{grid-template-columns:1fr}.hero{min-height:85vh}.f-inner{flex-direction:column;gap:24px}.founder-avatar{width:100px;height:100px;font-size:28px}}
      `}} />

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <div className="n-inner">
            <a href="#" className="n-mark">BBM</a>
            <div className={`n-links${menuOpen ? ' open' : ''}`}>
              <a href="#about" onClick={() => setMenuOpen(false)}>The Movement</a>
              <a href="#dimensions" onClick={() => setMenuOpen(false)}>Dimensions</a>
              <a href="#programme" onClick={() => setMenuOpen(false)}>Programme</a>
              <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
              <a href="/login" className="n-login" onClick={() => setMenuOpen(false)}>Login</a>
              <a href="/intake" className="n-cta" onClick={() => setMenuOpen(false)}>Begin</a>
            </div>
            <button className="mob-tog" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="h-tag">Becoming Better Men</div>
          <h1 className="h-head">Where men stop performing<br/>and start <em>becoming</em></h1>
          <div className="h-rule2"></div>
          <p className="h-sub">A structured transformation ecosystem for men ready to be honest about where they are — and intentional about where they{"'"}re going.</p>
          <div className="cta-row">
            <a href="#events" className="cta-pri">Join the Next Event</a>
            <a href="/intake" className="cta-sec">Start Here</a>
          </div>
        </div>
        <div className="scroll-ind">Scroll</div>
      </section>

      <section className="reality">
        <div className="wrap">
          <div className="reality-text">
            <p data-reveal>Most men know something is off. The marriage that looks fine but feels hollow. The career that pays but doesn{"'"}t fulfil. The faith that shows up on Sunday but disappears by Tuesday. The body that{"'"}s slowing down while the mind pretends it isn{"'"}t.</p>
            <p data-reveal>They carry it quietly. Because that{"'"}s what men do. <em>Until they don{"'"}t have to.</em></p>
          </div>
        </div>
      </section>

      <section className="sec sec-dark" id="about">
        <div className="wrap">
          <div className="what-grid">
            <div>
              <div className="what-label" data-reveal>The Movement</div>
              <h2 className="what-title" data-reveal>Not an event.<br/>An ecosystem.</h2>
              <p className="what-body" data-reveal>Becoming Better Men is a <strong>structured, measurable, technology-enabled movement</strong> that takes a man from wherever he is and moves him — over twelve weeks — toward a defined standard across every dimension of manhood.</p>
              <p className="what-body" data-reveal>Every man who enters is <strong>assessed, not judged</strong>. The system meets him where he is, assigns him to a cohort of eight to twelve men, and builds a pathway forward — with accountability, facilitator guidance, and data that proves the transformation is real.</p>
              <p className="what-body" data-reveal>This is not motivation. This is infrastructure.</p>
            </div>
            <div>
              <div className="what-stat" data-reveal><div className="what-stat-num">7</div><div className="what-stat-lab">Dimensions of manhood assessed and developed</div></div>
              <div className="what-stat" data-reveal><div className="what-stat-num">12</div><div className="what-stat-lab">Weeks per transformation cycle — deep enough for real rewiring</div></div>
              <div className="what-stat" data-reveal><div className="what-stat-num">8–12</div><div className="what-stat-lab">Men per cohort — small enough that no one hides</div></div>
              <div className="what-stat" data-reveal><div className="what-stat-num">100%</div><div className="what-stat-lab">Progress measured — every dimension, every cycle</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-sec">
        <div className="wrap">
          <p className="quote" data-reveal>A man can hide from a crowd.<br/>He cannot hide from <em>eight men who know his name, his goals, and his gaps.</em></p>
        </div>
      </section>

      <section className="sec sec-light" id="dimensions">
        <div className="wrap">
          <div className="dim-intro" data-reveal>
            <h2 className="dim-title" style={{color:'var(--ch)'}}>Seven dimensions.<br/>One man.</h2>
            <p className="dim-sub" style={{color:'var(--mg)'}}>Every man is assessed across seven dimensions — not to judge, but to diagnose. The baseline becomes the starting line. Every step forward is measured from there.</p>
          </div>
          <div className="dim-list">
            {[
              {n:"01",name:"Spiritual",desc:"Faith, prayer, purpose, relationship with God. The foundation from which all others draw strength."},
              {n:"02",name:"Financial",desc:"Earning, stewardship, investing, debt, generosity. Not just making money — managing it with intention."},
              {n:"03",name:"Relational",desc:"Marriage, family, conflict, intimacy, communication. The dimension most men avoid and most relationships need."},
              {n:"04",name:"Physical",desc:"Health, fitness, nutrition, energy, sleep. The vehicle for everything else. If it breaks, everything breaks."},
              {n:"05",name:"Emotional",desc:"Self-awareness, resilience, vulnerability, processing what has been buried. The dimension that silently destroys the most."},
              {n:"06",name:"Professional",desc:"Career, entrepreneurship, skill, leadership at work. How a man shows up in the marketplace."},
              {n:"07",name:"Leadership",desc:"Vision, influence, decision-making, mentorship, legacy. The ability to lead yourself before you lead anyone else."},
            ].map(d => (
              <div key={d.n} className="dim-item" data-reveal>
                <span className="dim-num">{d.n}</span>
                <span className="dim-name" style={{color:'var(--ch)'}}>{d.name}</span>
                <span className="dim-desc" style={{color:'var(--mg)'}}>{d.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-deep" id="programme">
        <div className="wrap">
          <div className="cycle-head" data-reveal>
            <h2 className="cycle-title">Twelve weeks.<br/>One cycle.<br/>Real transformation.</h2>
            <p className="cycle-sub">Each cycle follows a deliberate arc — from foundation through immersion to reckoning. Two cycles per year. Twenty-four weeks of structured transformation with measurable checkpoints.</p>
          </div>
          <div className="phases">
            {[
              {wk:"Weeks 1–2",name:"Foundation",desc:"Assessment. Goal setting. Cohort formation. Building the trust that the next ten weeks require."},
              {wk:"Weeks 3–8",name:"Immersion",desc:"Core teaching. Weekly assignments that require action, not just consumption. Accountability that doesn't let you drift."},
              {wk:"Weeks 9–10",name:"Integration",desc:"Reflection. What shifted. What you're still resisting. Consolidating change before the final assessment."},
              {wk:"Weeks 11–12",name:"Reckoning",desc:"Assessment retake. The data shows what happened. You stand and declare what you've become. The cohort witnesses."},
            ].map(p => (
              <div key={p.name} className="phase" data-reveal>
                <div className="phase-wk">{p.wk}</div>
                <div className="phase-name">{p.name}</div>
                <div className="phase-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-sec">
        <div className="wrap">
          <div className="founder-grid">
            <div className="founder-avatar" data-reveal>EA</div>
            <div>
              <div className="what-label" data-reveal>The Founder</div>
              <div className="founder-name" data-reveal>Ejimi Adegbeye</div>
              <div className="founder-role" data-reveal>Chartered Wealth Manager · Trader · Pastor · Author</div>
              <p className="founder-bio" data-reveal>Ex-institutional trader turned wealth strategist, pastor, and the man behind Becoming Better Men. With a career spanning banking floors and pulpits, Ejimi brings a rare combination of financial precision and spiritual depth to the question every man eventually faces: am I becoming who I was built to be?</p>
              <p className="founder-bio" data-reveal>BBM was born from a conviction that Nigerian men deserve more than motivational events — they deserve infrastructure for transformation. Three live sessions per cycle. Direct access. The vision holder in the room.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-sec">
        <div className="wrap">
          <p className="quote" data-reveal>The system meets you where you are.<br/><em>Not where you pretend to be.</em></p>
        </div>
      </section>

      <section className="sec sec-light">
        <div className="wrap">
          <div className="dim-intro" data-reveal>
            <h2 className="dim-title" style={{color:'var(--ch)'}}>Brotherhood,<br/>not a broadcast.</h2>
            <p className="dim-sub" style={{color:'var(--mg)'}}>This is not a WhatsApp group with three thousand silent members. It is a structured community where connection is intentional and accountability is real.</p>
          </div>
          <div className="comm-grid">
            {[
              {t:"Cohorts",d:"Eight to twelve men journeying through a cycle together. The primary unit of community. Where the deepest relationships form and the hardest truths are spoken."},
              {t:"Accountability Partners",d:"Paired with one man from your cohort. Structured check-ins twice per week. Four questions. Fifteen minutes. No hiding behind \"I'm fine, praise God.\""},
              {t:"Facilitators",d:"Not pastors. Not therapists. Trained guides who have walked the path and can help you navigate it. Men who earned the right to hold the space."},
              {t:"The Founder",d:"Three live sessions per cycle. High-impact, high-access moments with the man whose vision built the movement. Not a weekly obligation — a monthly event the cohort builds toward."},
            ].map(c => (
              <div key={c.t} className="comm-item" data-reveal>
                <h4 style={{color:'var(--ch)'}}>{c.t}</h4>
                <p style={{color:'var(--mg)'}}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="events-sec" id="events">
        <div className="wrap">
          <div className="dim-intro" data-reveal>
            <h2 className="dim-title" style={{color:'var(--ow)'}}>Events</h2>
            <p className="dim-sub" style={{color:'var(--wg)'}}>Where the movement meets in person. Open to all men — members, alumni, and men encountering BBM for the first time.</p>
          </div>
          <div className="events-grid">
            <div className="event-card" data-reveal>
              <div className="event-badge">Upcoming</div>
              <div className="event-name">BBM Community Gathering</div>
              <div className="event-detail">Date to be announced</div>
              <div className="event-detail">Abuja, Nigeria</div>
              <div className="event-detail">Open to all men</div>
              <a href="/intake" className="event-cta">Register Interest →</a>
            </div>
            <div className="event-card" data-reveal>
              <div className="event-badge" style={{background:'transparent',color:'var(--br)',border:'1px solid var(--br)'}}>Past</div>
              <div className="event-name">BBM 2.0</div>
              <div className="event-detail">January 2026</div>
              <div className="event-detail">Transcorp Hilton, Abuja</div>
              <div className="event-detail">Community event</div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-sec" id="faq">
        <div className="wrap">
          <div className="dim-intro" data-reveal>
            <h2 className="dim-title" style={{color:'var(--ch)'}}>Questions men ask<br/>before they begin.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item" data-reveal onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  {f.q}
                  <span style={{transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)'}}> + </span>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="intake-sec">
        <div className="wrap">
          <div className="intake-label" data-reveal>Begin</div>
          <h2 className="intake-title" data-reveal>The first step is<br/>honest assessment</h2>
          <p className="intake-body" data-reveal>Where are you — really? Not where you tell people. Not where your CV suggests. Where you actually stand, across every dimension, when no one is watching. That{"'"}s the starting line. Everything forward is measured from there.</p>
          <a href="/intake" className="cta-pri">Start Here</a>
          <p className="intake-note" data-reveal>Eight minutes. Private. The beginning of something different.</p>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="f-inner">
            <div>
              <div className="f-mark">BBM</div>
              <div className="f-tag">To Love, Lead, and Live.</div>
              <div className="f-contact">Contact: <a href="mailto:hello@jovilex.com">hello@jovilex.com</a></div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="f-links">
                <a href="#about">The Movement</a>
                <a href="#dimensions">Dimensions</a>
                <a href="#programme">Programme</a>
                <a href="#events">Events</a>
                <a href="/login">Login</a>
              </div>
              <div className="f-credit">Built by <a href="https://jovilex.com" target="_blank" rel="noopener">Jovilex</a></div>
            </div>
          </div>
          <div className="f-rule"></div>
          <div className="f-bottom">© 2026 Becoming Better Men. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}
