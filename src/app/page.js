'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const nav = document.getElementById('nav');
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    document.getElementById('mobTog')?.addEventListener('click', () => {
      document.getElementById('navLinks')?.classList.toggle('open');
    });
    
    document.querySelectorAll('.n-links a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navLinks')?.classList.remove('open'));
    });
    
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.08 });
    
    document.querySelectorAll('.what-label,.what-title,.what-body,.dim-intro,.dim-item,.phase,.comm-item,.reality-text p,.what-stat,.quote,.intake-label,.intake-title,.intake-body').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      obs.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --dc:#131211;--ch:#1A1A1A;--br:#A0825C;--bl:#C4A875;--iv:#F2EDE4;
  --ow:#EDE8E0;--wg:#6B6360;--bt:#2A2826;--lr:#D6CFC3;--mg:#4A4845;
}
html{scroll-behavior:smooth}
body{font-family:'Satoshi',sans-serif;background:var(--dc);color:var(--ow);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
h1,h2,h3,h4{font-family:'Clash Display','Satoshi',sans-serif;line-height:1.1}
.wrap{max-width:1100px;margin:0 auto;padding:0 40px}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 0;background:rgba(19,18,17,0.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(160,130,92,0.06);transition:padding .3s}
nav.scrolled{padding:14px 0}
nav .wrap{display:flex;justify-content:space-between;align-items:center}
.n-mark{font-family:'Clash Display',sans-serif;font-weight:700;font-size:18px;color:var(--br);text-decoration:none;letter-spacing:1px}
.n-links{display:flex;gap:28px;align-items:center}
.n-links a{font-size:13px;font-weight:500;color:var(--wg);text-decoration:none;letter-spacing:.3px;transition:color .3s}
.n-links a:hover{color:var(--ow)}
.n-cta{color:var(--dc)!important;background:var(--br);padding:10px 24px;border-radius:4px;font-weight:700!important;transition:background .3s,transform .2s}
.n-cta:hover{background:var(--bl)!important;transform:translateY(-1px)}
.mob-tog{display:none;background:none;border:none;cursor:pointer;padding:8px}
.mob-tog span{display:block;width:20px;height:1.5px;background:var(--br);margin:5px 0}

/* ── HERO ── */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:100px 0;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-20%;right:-10%;width:600px;height:600px;background:radial-gradient(circle,rgba(160,130,92,.04) 0%,transparent 70%);border-radius:50%}
.hero::after{content:'';position:absolute;bottom:-20%;left:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(160,130,92,.03) 0%,transparent 70%);border-radius:50%}
.hero-inner{text-align:center;position:relative;z-index:1;max-width:960px;padding:0 24px}
.h-line{width:40px;height:1.5px;background:var(--br);margin:0 auto 28px}
.h-tag{font-family:'Clash Display',sans-serif;font-weight:600;font-size:12px;letter-spacing:5px;text-transform:uppercase;color:var(--br);margin-bottom:32px}
.h-head{font-family:'Clash Display',sans-serif;font-weight:700;font-size:clamp(36px,5.8vw,62px);color:var(--ow);margin-bottom:24px;letter-spacing:-1.5px;line-height:1.08}
.h-head em{font-style:normal;color:var(--br)}
.h-rule2{width:48px;height:1.5px;background:var(--br);margin:0 auto 24px}
.h-sub{font-size:clamp(15px,1.8vw,17px);color:var(--wg);line-height:1.7;margin-bottom:44px;font-weight:400;max-width:500px;margin-left:auto;margin-right:auto}
.cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.cta-sec{display:inline-block;padding:16px 36px;background:transparent;color:var(--ow);font-family:'Satoshi',sans-serif;font-weight:600;font-size:14px;letter-spacing:.5px;text-transform:uppercase;text-decoration:none;border-radius:4px;border:1px solid rgba(160,130,92,.3);transition:border-color .3s,color .3s}
.cta-sec:hover{border-color:var(--br);color:var(--br)}
.h-btn{display:inline-block;padding:16px 40px;background:var(--br);color:var(--dc);font-family:'Satoshi',sans-serif;font-weight:700;font-size:14px;letter-spacing:.5px;text-transform:uppercase;text-decoration:none;border-radius:4px;transition:background .3s,transform .2s}
.h-btn:hover{background:var(--bl);transform:translateY(-2px)}
.scroll-ind{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--wg);font-size:10px;letter-spacing:3px;text-transform:uppercase;z-index:2}
.scroll-ind::after{content:'';width:1px;height:28px;background:var(--wg);opacity:.3;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.15}50%{opacity:.5}}

/* ── SECTIONS ── */
.sec{padding:120px 0}
.sec-dark{background:var(--dc)}
.sec-light{background:var(--iv);color:var(--bt)}
.sec-deep{background:var(--ch)}

/* ── REALITY ── */
.reality{padding:100px 0;border-top:1px solid rgba(160,130,92,.06)}
.reality-text{max-width:680px;margin:0 auto;text-align:center}
.reality-text p{font-size:clamp(17px,2.2vw,22px);line-height:1.7;color:var(--ow);margin-bottom:24px;font-weight:400}
.reality-text p em{font-style:normal;color:var(--br);font-weight:600}

/* ── WHAT ── */
.what-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
.what-label{font-family:'Clash Display',sans-serif;font-weight:600;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--br);margin-bottom:16px}
.what-title{font-size:clamp(28px,4vw,40px);font-weight:700;color:var(--ow);margin-bottom:20px;letter-spacing:-.5px}
.what-body{font-size:16px;line-height:1.8;color:var(--ow);opacity:.8;margin-bottom:16px}
.what-body strong{color:var(--br);font-weight:600;opacity:1}
.what-right{padding-top:12px}
.what-stat{margin-bottom:28px}
.what-stat-num{font-family:'Clash Display',sans-serif;font-size:48px;font-weight:700;color:var(--br);line-height:1}
.what-stat-lab{font-size:14px;color:var(--wg);margin-top:4px}

/* ── DIMENSIONS ── */
.dim-intro{max-width:560px;margin-bottom:56px}
.dim-title{font-size:clamp(28px,4vw,40px);font-weight:700;color:var(--ch);margin-bottom:16px}
.dim-sub{font-size:16px;color:var(--mg);line-height:1.7}
.dim-list{display:flex;flex-direction:column;gap:0}
.dim-item{display:flex;align-items:baseline;gap:20px;padding:20px 0;border-bottom:1px solid var(--lr)}
.dim-item:first-child{border-top:1px solid var(--lr)}
.dim-num{font-family:'Clash Display',sans-serif;font-weight:700;font-size:14px;color:var(--br);min-width:28px}
.dim-name{font-family:'Clash Display',sans-serif;font-weight:700;font-size:20px;color:var(--ch);min-width:160px}
.dim-desc{font-size:14px;color:var(--mg);line-height:1.6;flex:1}

/* ── CYCLE ── */
.cycle-head{max-width:600px;margin-bottom:56px}
.cycle-title{font-size:clamp(28px,4vw,40px);font-weight:700;color:var(--ow);margin-bottom:16px}
.cycle-sub{font-size:16px;color:var(--wg);line-height:1.7}
.phases{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.phase{padding:28px 24px;border:1px solid rgba(160,130,92,.12);border-radius:6px;transition:border-color .3s}
.phase:hover{border-color:var(--br)}
.phase-wk{font-family:'Clash Display',sans-serif;font-weight:600;font-size:11px;color:var(--br);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
.phase-name{font-family:'Clash Display',sans-serif;font-weight:700;font-size:20px;color:var(--ow);margin-bottom:10px}
.phase-desc{font-size:14px;line-height:1.6;color:var(--wg)}

/* ── QUOTE ── */
.quote-sec{padding:80px 0;border-top:1px solid rgba(160,130,92,.06);border-bottom:1px solid rgba(160,130,92,.06)}
.quote{font-family:'Clash Display',sans-serif;font-weight:600;font-size:clamp(20px,3.2vw,34px);line-height:1.35;color:var(--ow);text-align:center;max-width:800px;margin:0 auto}
.quote em{font-style:normal;color:var(--br)}

/* ── COMMUNITY ── */
.comm-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px 64px}
.comm-item h4{font-family:'Clash Display',sans-serif;font-weight:600;font-size:18px;color:var(--ch);margin-bottom:6px}
.comm-item p{font-size:15px;line-height:1.7;color:var(--mg)}

/* ── INTAKE ── */
.intake-sec{text-align:center;padding:140px 0}
.intake-label{font-family:'Clash Display',sans-serif;font-weight:600;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--br);margin-bottom:16px}
.intake-title{font-size:clamp(28px,4.5vw,44px);font-weight:700;color:var(--ow);margin-bottom:20px;max-width:600px;margin-left:auto;margin-right:auto}
.intake-body{font-size:clamp(15px,1.8vw,17px);color:var(--wg);line-height:1.7;max-width:520px;margin:0 auto 40px}
.intake-note{font-size:13px;color:var(--wg);margin-top:20px}

/* ── FOOTER ── */
footer{padding:48px 0 32px;border-top:1px solid rgba(160,130,92,.06)}
.f-inner{display:flex;justify-content:space-between;align-items:flex-start}
.f-mark{font-family:'Clash Display',sans-serif;font-weight:700;font-size:16px;color:var(--br);letter-spacing:1px}
.f-tag{font-size:12px;color:var(--wg);margin-top:6px}
.f-links{display:flex;gap:20px}
.f-links a{font-size:12px;color:var(--wg);text-decoration:none;transition:color .3s}
.f-links a:hover{color:var(--ow)}
.f-credit{font-size:11px;color:var(--wg);opacity:.5;margin-top:8px;text-align:right}
.f-credit a{color:var(--br);text-decoration:none}
.f-rule{width:100%;height:1px;background:rgba(160,130,92,.06);margin:28px 0}
.f-bottom{text-align:center;font-size:10px;color:var(--wg);opacity:.4}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .what-grid{grid-template-columns:1fr;gap:48px}
  .phases{grid-template-columns:1fr 1fr}
  .dim-item{flex-direction:column;gap:4px}
  .dim-name{min-width:auto}
  .comm-grid{grid-template-columns:1fr;gap:32px}
}
@media(max-width:600px){
  .wrap{padding:0 20px}
  .sec{padding:80px 0}
  .n-links{display:none}
  .n-links.open{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--dc);padding:20px;gap:14px;border-bottom:1px solid rgba(160,130,92,.06)}
  .mob-tog{display:block}
  .phases{grid-template-columns:1fr}
  .hero{min-height:85vh}
  .f-inner{flex-direction:column;gap:24px}
}
` }} />
      

<nav id="nav">
  <div className="wrap">
    <a href="#" className="n-mark">BBM</a>
    <div className="n-links" id="navLinks">
      <a href="#about">The Movement</a>
      <a href="#dimensions">Dimensions</a>
      <a href="#programme">Programme</a>
      <a href="#intake" className="n-cta">Begin</a>
    </div>
    <button className="mob-tog" id="mobTog" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>

<!-- HERO -->
<section className="hero">
  <div className="hero-inner">
    <div className="h-tag">Becoming Better Men</div>
    <h1 className="h-head">Where men stop performing<br/>and start <em>becoming</em></h1>
    <div className="h-rule2"></div>
    <p className="h-sub">A structured transformation ecosystem for men ready to be honest about where they are — and intentional about where they're going.</p>
    <div className="cta-row">
      <a href="#intake" className="h-btn">Join the Next Event</a>
      <a href="#" className="cta-sec">Take the Assessment</a>
    </div>
  </div>
  <div className="scroll-ind">Scroll</div>
</section>

<!-- REALITY -->
<section className="reality">
  <div className="wrap">
    <div className="reality-text">
      <p>Most men know something is off. The marriage that looks fine but feels hollow. The career that pays but doesn't fulfil. The faith that shows up on Sunday but disappears by Tuesday. The body that's slowing down while the mind pretends it isn't.</p>
      <p>They carry it quietly. Because that's what men do. <em>Until they don't have to.</em></p>
    </div>
  </div>
</section>

<!-- WHAT -->
<section className="sec sec-dark" id="about">
  <div className="wrap">
    <div className="what-grid">
      <div>
        <div className="what-label">The Movement</div>
        <h2 className="what-title">Not an event.<br/>An ecosystem.</h2>
        <p className="what-body">Becoming Better Men is a <strong>structured, measurable, technology-enabled movement</strong> that takes a man from wherever he is and moves him — over twelve weeks — toward a defined standard across every dimension of manhood.</p>
        <p className="what-body">Every man who enters is <strong>assessed, not judged</strong>. The system meets him where he is, assigns him to a cohort of eight to twelve men, and builds a pathway forward — with accountability, facilitator guidance, and data that proves the transformation is real.</p>
        <p className="what-body">This is not motivation. This is infrastructure.</p>
      </div>
      <div className="what-right">
        <div className="what-stat">
          <div className="what-stat-num">7</div>
          <div className="what-stat-lab">Dimensions of manhood assessed and developed</div>
        </div>
        <div className="what-stat">
          <div className="what-stat-num">12</div>
          <div className="what-stat-lab">Weeks per transformation cycle — deep enough for real rewiring</div>
        </div>
        <div className="what-stat">
          <div className="what-stat-num">8–12</div>
          <div className="what-stat-lab">Men per cohort — small enough that no one hides</div>
        </div>
        <div className="what-stat">
          <div className="what-stat-num">100%</div>
          <div className="what-stat-lab">Progress measured — every dimension, every cycle</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- QUOTE -->
<section className="quote-sec">
  <div className="wrap">
    <p className="quote">A man can hide from a crowd.<br/>He cannot hide from <em>eight men who know his name, his goals, and his gaps.</em></p>
  </div>
</section>

<!-- DIMENSIONS -->
<section className="sec sec-light" id="dimensions">
  <div className="wrap">
    <div className="dim-intro">
      <h2 className="dim-title">Seven dimensions.<br/>One man.</h2>
      <p className="dim-sub">Every man is assessed across seven dimensions — not to judge, but to diagnose. The baseline becomes the starting line. Every step forward is measured from there.</p>
    </div>
    <div className="dim-list">
      <div className="dim-item"><span className="dim-num">01</span><span className="dim-name">Spiritual</span><span className="dim-desc">Faith, prayer, purpose, relationship with God. The foundation from which all others draw strength.</span></div>
      <div className="dim-item"><span className="dim-num">02</span><span className="dim-name">Financial</span><span className="dim-desc">Earning, stewardship, investing, debt, generosity. Not just making money — managing it with intention.</span></div>
      <div className="dim-item"><span className="dim-num">03</span><span className="dim-name">Relational</span><span className="dim-desc">Marriage, family, conflict, intimacy, communication. The dimension most men avoid and most relationships need.</span></div>
      <div className="dim-item"><span className="dim-num">04</span><span className="dim-name">Physical</span><span className="dim-desc">Health, fitness, nutrition, energy, sleep. The vehicle for everything else. If it breaks, everything breaks.</span></div>
      <div className="dim-item"><span className="dim-num">05</span><span className="dim-name">Emotional</span><span className="dim-desc">Self-awareness, resilience, vulnerability, processing what has been buried. The dimension that silently destroys the most.</span></div>
      <div className="dim-item"><span className="dim-num">06</span><span className="dim-name">Professional</span><span className="dim-desc">Career, entrepreneurship, skill, leadership at work. How a man shows up in the marketplace.</span></div>
      <div className="dim-item"><span className="dim-num">07</span><span className="dim-name">Leadership</span><span className="dim-desc">Vision, influence, decision-making, mentorship, legacy. The ability to lead yourself before you lead anyone else.</span></div>
    </div>
  </div>
</section>

<!-- PROGRAMME -->
<section className="sec sec-deep" id="programme">
  <div className="wrap">
    <div className="cycle-head">
      <h2 className="cycle-title">Twelve weeks.<br/>One cycle.<br/>Real transformation.</h2>
      <p className="cycle-sub">Each cycle follows a deliberate arc — from foundation through immersion to reckoning. Two cycles per year. Twenty-four weeks of structured transformation with measurable checkpoints.</p>
    </div>
    <div className="phases">
      <div className="phase">
        <div className="phase-wk">Weeks 1–2</div>
        <div className="phase-name">Foundation</div>
        <div className="phase-desc">Assessment. Goal setting. Cohort formation. Building the trust that the next ten weeks require.</div>
      </div>
      <div className="phase">
        <div className="phase-wk">Weeks 3–8</div>
        <div className="phase-name">Immersion</div>
        <div className="phase-desc">Core teaching. Weekly assignments that require action, not just consumption. Accountability that doesn't let you drift.</div>
      </div>
      <div className="phase">
        <div className="phase-wk">Weeks 9–10</div>
        <div className="phase-name">Integration</div>
        <div className="phase-desc">Reflection. What shifted. What you're still resisting. Consolidating change before the final assessment.</div>
      </div>
      <div className="phase">
        <div className="phase-wk">Weeks 11–12</div>
        <div className="phase-name">Reckoning</div>
        <div className="phase-desc">Assessment retake. The data shows what happened. You stand and declare what you've become. The cohort witnesses.</div>
      </div>
    </div>
  </div>
</section>

<!-- QUOTE 2 -->
<section className="quote-sec">
  <div className="wrap">
    <p className="quote">The system meets you where you are.<br/><em>Not where you pretend to be.</em></p>
  </div>
</section>

<!-- COMMUNITY -->
<section className="sec sec-light">
  <div className="wrap">
    <div className="dim-intro">
      <h2 className="dim-title">Brotherhood,<br/>not a broadcast.</h2>
      <p className="dim-sub">This is not a WhatsApp group with three thousand silent members. It is a structured community where connection is intentional and accountability is real.</p>
    </div>
    <div className="comm-grid">
      <div className="comm-item"><h4>Cohorts</h4><p>Eight to twelve men journeying through a cycle together. The primary unit of community. Where the deepest relationships form and the hardest truths are spoken.</p></div>
      <div className="comm-item"><h4>Accountability Partners</h4><p>Paired with one man from your cohort. Structured check-ins twice per week. Four questions. Fifteen minutes. No hiding behind "I'm fine, praise God."</p></div>
      <div className="comm-item"><h4>Facilitators</h4><p>Not pastors. Not therapists. Trained guides who have walked the path and can help you navigate it. Men who earned the right to hold the space.</p></div>
      <div className="comm-item"><h4>The Founder</h4><p>Three live sessions per cycle. High-impact, high-access moments with the man whose vision built the movement. Not a weekly obligation — a monthly event the cohort builds toward.</p></div>
    </div>
  </div>
</section>

<!-- INTAKE -->
<section className="sec sec-dark intake-sec" id="intake">
  <div className="wrap">
    <div className="intake-label">Begin</div>
    <h2 className="intake-title">The first step is<br/>honest assessment</h2>
    <p className="intake-body">Where are you — really? Not where you tell people. Not where your CV suggests. Where you actually stand, across every dimension, when no one is watching. That's the starting line. Everything forward is measured from there.</p>
    <a href="#" className="h-btn">Take the Assessment</a>
    <p className="intake-note">Eight minutes. Private. The beginning of something different.</p>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div className="wrap">
    <div className="f-inner">
      <div>
        <div className="f-mark">BBM</div>
        <div className="f-tag">To Love, Lead, and Live.</div>
      </div>
      <div style="text-align:right">
        <div className="f-links">
          <a href="#about">The Movement</a>
          <a href="#dimensions">Dimensions</a>
          <a href="#programme">Programme</a>
          <a href="#intake">Begin</a>
        </div>
        <div className="f-credit">Built by <a href="https://jovilex.com" target="_blank">Jovilex</a></div>
      </div>
    </div>
    <div className="f-rule"></div>
    <div className="f-bottom">© 2026 Becoming Better Men. All rights reserved.</div>
  </div>
</footer>



    </>
  )
}
