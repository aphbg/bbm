'use client'
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const BRONZE = "#A0825C";
const BRONZE_LIGHT = "#C4A875";
const DEEP_CHARCOAL = "#131211";
const CHARCOAL = "#1A1A1A";
const WARM_IVORY = "#F2EDE4";
const OFF_WHITE = "#EDE8E0";
const WARM_GREY = "#6B6360";
const BODY_TEXT = "#2A2826";
const GREEN = "#4CAF50";
const RED = "#C62828";

const chapters = [
  { id:"abuja", name:"Abuja", country:"Nigeria", code:"NG", currency:"NGN", tz:"WAT", status:"active", lead:"Adamu Yusuf", members:24, cohorts:3, facilitators:3, compliance:"NDPR", payment:"Paystack" },
  { id:"london", name:"London", country:"United Kingdom", code:"GB", currency:"GBP", tz:"BST", status:"forming", lead:"TBD", members:0, cohorts:0, facilitators:1, compliance:"GDPR", payment:"Stripe" },
  { id:"toronto", name:"Toronto", country:"Canada", code:"CA", currency:"CAD", tz:"EDT", status:"planned", lead:"TBD", members:0, cohorts:0, facilitators:0, compliance:"PIPEDA", payment:"Stripe" },
];

const dimMovement = [
  { dim:"Spiritual", delta:0.8 }, { dim:"Financial", delta:1.9 }, { dim:"Relational", delta:0.7 },
  { dim:"Physical", delta:0.5 }, { dim:"Emotional", delta:0.6 }, { dim:"Professional", delta:1.1 }, { dim:"Leadership", delta:0.9 },
];

const recentActivity = [
  { time:"2 hours ago", text:"Solomon Bello missed second consecutive check-in", type:"alert" },
  { time:"4 hours ago", text:"Bayo Adebayo completed Week 8 assignment", type:"success" },
  { time:"6 hours ago", text:"Kenneth Nwosu completed intake form", type:"intake" },
  { time:"Yesterday", text:"Provider Cohort B — Week 8 session completed", type:"session" },
  { time:"Yesterday", text:"Joseph Amadi completed intake form", type:"intake" },
  { time:"2 days ago", text:"Emmanuel Ojo flagged for disengagement protocol", type:"alert" },
  { time:"3 days ago", text:"Dr. Sarah Thompson added to London referral network", type:"info" },
];

const pipeline = [
  { stage:"New Intakes", count:3, color:BRONZE },
  { stage:"Waitlist", count:3, color:WARM_GREY },
  { stage:"Assigned", count:0, color:"#2196F3" },
  { stage:"Active", count:24, color:GREEN },
  { stage:"Alumni", count:0, color:BRONZE_LIGHT },
];

const cohortData = [
  { name:"Cohort A", facilitator:"Samuel Adekunle", members:10, score:5.3, delta:1.0, engagement:76 },
  { name:"Cohort B", facilitator:"Tochukwu Obi", members:8, score:5.3, delta:1.1, engagement:85 },
  { name:"Cohort C", facilitator:"Adamu Yusuf", members:9, score:5.1, delta:0.9, engagement:78 },
];

const memberData = [
  { id:1,name:"David Okonkwo",cohort:"A",status:"active",score:6.1,delta:1.7,engagement:92 },
  { id:2,name:"Michael Eze",cohort:"A",status:"active",score:5.4,delta:1.2,engagement:88 },
  { id:3,name:"Emmanuel Ojo",cohort:"A",status:"active",score:4.1,delta:0.3,engagement:42 },
  { id:4,name:"Solomon Bello",cohort:"A",status:"active",score:3.9,delta:-0.1,engagement:25 },
  { id:5,name:"Peter Adewale",cohort:"A",status:"active",score:6.8,delta:2.1,engagement:96 },
  { id:6,name:"Femi Adesanya",cohort:"B",status:"active",score:5.2,delta:1.0,engagement:88 },
  { id:7,name:"Bayo Adebayo",cohort:"C",status:"active",score:6.5,delta:2.0,engagement:100 },
  { id:8,name:"Uche Onyekachi",cohort:"C",status:"withdrawn",score:3.2,delta:-0.3,engagement:17 },
];

const referralData = [
  { chapter:"Abuja",name:"Dr. Ada Nwosu",type:"Therapist",status:"Active" },
  { chapter:"Abuja",name:"Pastor Emeka",type:"Pastoral",status:"Active" },
  { chapter:"London",name:"Dr. Sarah Thompson",type:"Therapist",status:"Pending" },
];

const flags = {NG:"\ud83c\uddf3\ud83c\uddec",GB:"\ud83c\uddec\ud83c\udde7",CA:"\ud83c\udde8\ud83c\udde6"};
const Flag = ({code}) => <span style={{fontSize:18}}>{flags[code]||"\ud83c\udf0d"}</span>;

const Card = ({children,style={}}) => <div style={{background:"white",borderRadius:8,padding:24,border:"1px solid #E8E3DA",...style}}>{children}</div>;
const Label = ({children}) => <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:BRONZE,marginBottom:14}}>{children}</div>;
const Badge = ({status}) => {
  const c={active:{bg:"#E8F5E9",t:"#2E7D32"},forming:{bg:"#FFF8E1",t:"#F57F17"},planned:{bg:"#F5F0E8",t:WARM_GREY},withdrawn:{bg:"#FFEBEE",t:RED}};
  const s=c[status]||c.planned;
  return <span style={{fontSize:10,padding:"3px 10px",borderRadius:3,fontWeight:700,background:s.bg,color:s.t,textTransform:"uppercase"}}>{status}</span>;
};
const Bar2 = ({value}) => (
  <div style={{display:"flex",alignItems:"center",gap:6}}>
    <div style={{width:48,background:"#E8E3DA",borderRadius:3,height:6,overflow:"hidden"}}>
      <div style={{background:value>70?GREEN:value>40?BRONZE:"#E57373",height:"100%",width:`${value}%`,borderRadius:3}}/>
    </div>
    <span style={{fontSize:12,fontWeight:600,color:value<50?RED:BODY_TEXT}}>{value}%</span>
  </div>
);

const KPI = ({label,value,sub,color=BRONZE,size="normal"}) => (
  <Card style={{padding:size==="compact"?"14px 18px":"18px 22px"}}>
    <div style={{fontSize:10,color:WARM_GREY,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>{label}</div>
    <div style={{fontSize:size==="compact"?22:30,fontWeight:700,color:color,lineHeight:1}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:WARM_GREY,marginTop:4}}>{sub}</div>}
  </Card>
);

const tabs = ["Global","Chapter","Members","Financials","Referrals","Compliance","Reports"];

export default function AdminV3() {
  const [tab,setTab] = useState("Global");
  const [chapterId,setChapterId] = useState("abuja");
  const ch = chapters.find(c=>c.id===chapterId);
  const totalMembers = chapters.reduce((a,c)=>a+c.members,0);
  const atRisk = memberData.filter(m=>m.engagement<50);

  return (
    <div style={{minHeight:"100vh",background:WARM_IVORY,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>
      {/* Header */}
      <div style={{background:DEEP_CHARCOAL,padding:"14px 0",borderBottom:`2px solid ${BRONZE}`}}>
        <div style={{maxWidth:1240,margin:"0 auto",padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div><div style={{fontWeight:700,fontSize:16,color:BRONZE,letterSpacing:1}}>BBM</div><div style={{fontSize:7,letterSpacing:2,color:WARM_GREY}}>BECOMING BETTER MEN</div></div>
            <div style={{width:1,height:28,background:"#2A2826"}}/>
            <div style={{fontSize:13,color:OFF_WHITE,fontWeight:600}}>Global Administration</div>
          </div>
          <select value={chapterId} onChange={e=>setChapterId(e.target.value)} style={{background:"#2A2826",color:OFF_WHITE,border:"1px solid #3A3836",borderRadius:4,padding:"8px 12px",fontSize:13,fontFamily:"inherit",cursor:"pointer"}}>
            {chapters.map(c=><option key={c.id} value={c.id}>{c.name}, {c.country}</option>)}
          </select>
        </div>
      </div>
      {/* Tabs */}
      <div style={{background:"white",borderBottom:"1px solid #E8E3DA",overflowX:"auto"}}>
        <div style={{maxWidth:1240,margin:"0 auto",padding:"0 24px",display:"flex"}}>
          {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"12px 20px",fontSize:13,fontWeight:tab===t?700:500,whiteSpace:"nowrap",color:tab===t?BRONZE:WARM_GREY,background:"none",border:"none",borderBottom:tab===t?`2px solid ${BRONZE}`:"2px solid transparent",cursor:"pointer"}}>{t}</button>)}
        </div>
      </div>

      <div style={{maxWidth:1240,margin:"0 auto",padding:"28px 24px"}}>

        {/* ═══ GLOBAL DASHBOARD ═══ */}
        {tab==="Global"&&<>
          {/* Cycle banner */}
          <Card style={{background:DEEP_CHARCOAL,border:"none",marginBottom:20,padding:"20px 28px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:10,color:BRONZE,fontWeight:700,letterSpacing:2,marginBottom:6}}>ACTIVE CYCLE</div>
                <div style={{fontSize:22,fontWeight:700,color:OFF_WHITE}}>The Provider</div>
                <div style={{fontSize:12,color:WARM_GREY,marginTop:4}}>Week 8 of 12 · Immersion Phase · Abuja Chapter</div>
              </div>
              <div style={{display:"flex",gap:24}}>
                <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:BRONZE}}>24</div><div style={{fontSize:10,color:WARM_GREY}}>Active</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:OFF_WHITE}}>3</div><div style={{fontSize:10,color:WARM_GREY}}>Cohorts</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:OFF_WHITE}}>67%</div><div style={{fontSize:10,color:WARM_GREY}}>Complete</div></div>
              </div>
            </div>
            <div style={{marginTop:14,background:"#2A2826",borderRadius:4,height:6,overflow:"hidden"}}>
              <div style={{background:BRONZE,height:"100%",width:"67%",borderRadius:4}}/>
            </div>
          </Card>

          {/* KPI Row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:14,marginBottom:20}}>
            <KPI label="Chapters" value={chapters.length} sub={`${chapters.filter(c=>c.status==="active").length} active`} size="compact"/>
            <KPI label="Members" value={totalMembers} sub="all chapters" size="compact"/>
            <KPI label="Avg Movement" value="+1.0" sub="across dimensions" color={GREEN} size="compact"/>
            <KPI label="Engagement" value="79%" sub="programme avg" size="compact"/>
            <KPI label="At Risk" value={atRisk.length} sub={atRisk.length>0?"needs attention":"all clear"} color={atRisk.length>0?RED:GREEN} size="compact"/>
            <KPI label="New Intakes" value="3" sub="awaiting assignment" size="compact"/>
          </div>

          {/* Main grid: 3 columns */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:20}}>
            {/* Dimension movement chart */}
            <Card style={{gridColumn:"1 / 3"}}>
              <Label>Dimension Movement — Programme Average</Label>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dimMovement} layout="vertical" margin={{left:10,right:20,top:0,bottom:0}}>
                  <XAxis type="number" domain={[0,2.5]} tick={{fontSize:11,fill:WARM_GREY}} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="dim" tick={{fontSize:12,fill:BODY_TEXT,fontWeight:600}} axisLine={false} tickLine={false} width={90}/>
                  <Tooltip formatter={(v)=>[`+${v}`,"Movement"]} contentStyle={{fontSize:12,borderRadius:6,border:`1px solid #E8E3DA`}}/>
                  <Bar dataKey="delta" radius={[0,4,4,0]} barSize={18}>
                    {dimMovement.map((d,i)=><Cell key={i} fill={d.dim==="Financial"?BRONZE:d.delta>1?"#66BB6A":"#A5D6A7"}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{fontSize:11,color:BRONZE,fontWeight:600,marginTop:4}}>Financial dimension leads at +1.9 — aligned with The Provider focus</div>
            </Card>

            {/* Activity feed */}
            <Card>
              <Label>Recent Activity</Label>
              <div style={{display:"flex",flexDirection:"column",gap:0,maxHeight:240,overflowY:"auto"}}>
                {recentActivity.map((a,i)=>(
                  <div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${WARM_IVORY}`,display:"flex",gap:10,alignItems:"flex-start"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",marginTop:5,flexShrink:0,
                      background:a.type==="alert"?RED:a.type==="success"?GREEN:a.type==="intake"?BRONZE:"#2196F3"}}/>
                    <div>
                      <div style={{fontSize:13,color:BODY_TEXT,lineHeight:1.4}}>{a.text}</div>
                      <div style={{fontSize:11,color:WARM_GREY}}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Second row: Pipeline + Chapters + Quick actions */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 2fr 1fr",gap:20,marginBottom:20}}>
            {/* Pipeline */}
            <Card>
              <Label>Member Pipeline</Label>
              {pipeline.map((p,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${WARM_IVORY}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:10,height:10,borderRadius:2,background:p.color}}/>
                    <span style={{fontSize:13,color:BODY_TEXT}}>{p.stage}</span>
                  </div>
                  <span style={{fontSize:18,fontWeight:700,color:p.count>0?CHARCOAL:WARM_GREY}}>{p.count}</span>
                </div>
              ))}
              <div style={{marginTop:12,padding:"10px 0",borderTop:`1px solid ${WARM_IVORY}`,display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:13,fontWeight:700,color:CHARCOAL}}>Total Pipeline</span>
                <span style={{fontSize:18,fontWeight:700,color:BRONZE}}>{pipeline.reduce((a,p)=>a+p.count,0)}</span>
              </div>
            </Card>

            {/* Chapter overview */}
            <Card>
              <Label>Chapters</Label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                {chapters.map(c=>(
                  <div key={c.id} onClick={()=>{setChapterId(c.id);setTab("Chapter")}}
                    style={{padding:16,background:WARM_IVORY,borderRadius:6,cursor:"pointer",border:`1px solid transparent`,transition:"border-color 0.2s"}}
                    onMouseOver={e=>e.currentTarget.style.borderColor=BRONZE}
                    onMouseOut={e=>e.currentTarget.style.borderColor="transparent"}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <Flag code={c.code}/>
                      <div><div style={{fontSize:15,fontWeight:700,color:CHARCOAL}}>{c.name}</div><div style={{fontSize:11,color:WARM_GREY}}>{c.country}</div></div>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <Badge status={c.status}/>
                      <span style={{fontSize:11,color:WARM_GREY}}>{c.currency}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,textAlign:"center"}}>
                      {[{v:c.members,l:"Men"},{v:c.cohorts,l:"Cohorts"},{v:c.facilitators,l:"Guides"}].map((s,i)=>(
                        <div key={i}><div style={{fontSize:16,fontWeight:700,color:c.status==="active"?CHARCOAL:WARM_GREY}}>{s.v}</div><div style={{fontSize:9,color:WARM_GREY}}>{s.l}</div></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick actions */}
            <Card>
              <Label>Quick Actions</Label>
              {[
                {label:"Assign New Intakes",desc:"3 men awaiting cohort placement",icon:"+",bg:"#F5F0E8"},
                {label:"View At-Risk",desc:`${atRisk.length} members below 50%`,icon:"⚠️",bg:"#FFF8E1"},
                {label:"Generate Report",desc:"Quarterly impact summary",icon:"\ud83d\udcca",bg:"#E8F5E9"},
                {label:"Facilitator Check-in",desc:"3 summaries due this week",icon:"\ud83d\udcdd",bg:"#F5F0E8"},
                {label:"Open Intake Window",desc:"Next cycle preparation",icon:"\ud83d\udce5",bg:"#F5F0E8"},
              ].map((a,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",marginBottom:6,background:a.bg,borderRadius:6,cursor:"pointer",transition:"transform 0.15s"}}
                  onMouseOver={e=>e.currentTarget.style.transform="translateX(4px)"}
                  onMouseOut={e=>e.currentTarget.style.transform="translateX(0)"}>
                  <span style={{fontSize:18}}>{a.icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:CHARCOAL}}>{a.label}</div>
                    <div style={{fontSize:11,color:WARM_GREY}}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Cohort comparison */}
          <Card>
            <Label>Cohort Performance — {ch?.name}</Label>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{borderBottom:`2px solid ${BRONZE}`}}>
                {["Cohort","Facilitator","Members","Avg Score","Movement","Engagement"].map(h=>
                  <th key={h} style={{textAlign:"left",padding:8,fontSize:11,fontWeight:700,color:BRONZE,letterSpacing:0.5,textTransform:"uppercase"}}>{h}</th>)}
              </tr></thead>
              <tbody>{cohortData.map(c=><tr key={c.name} style={{borderBottom:`1px solid ${WARM_IVORY}`}}>
                <td style={{padding:10,fontWeight:700,color:CHARCOAL}}>{c.name}</td>
                <td style={{padding:10,color:BODY_TEXT}}>{c.facilitator}</td>
                <td style={{padding:10}}>{c.members}</td>
                <td style={{padding:10,fontWeight:700}}>{c.score}</td>
                <td style={{padding:10,fontWeight:700,color:GREEN}}>+{c.delta}</td>
                <td style={{padding:10}}><Bar2 value={c.engagement}/></td>
              </tr>)}</tbody>
            </table>
          </Card>
        </>}

        {/* ═══ CHAPTER ═══ */}
        {tab==="Chapter"&&ch&&<>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <Flag code={ch.code}/><div><h2 style={{fontSize:24,fontWeight:700,color:CHARCOAL,margin:0}}>{ch.name}</h2><div style={{fontSize:13,color:WARM_GREY}}>{ch.country} · {ch.tz} · {ch.currency} · {ch.compliance}</div></div><Badge status={ch.status}/>
          </div>
          {ch.status==="active"?<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
              <KPI label="Members" value={ch.members} size="compact"/>
              <KPI label="Cohorts" value={ch.cohorts} size="compact"/>
              <KPI label="Facilitators" value={ch.facilitators} size="compact"/>
              <KPI label="Chapter Lead" value={ch.lead} size="compact"/>
            </div>
            <Card style={{marginBottom:20}}><Label>{ch.name} Cohorts</Label>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{borderBottom:`2px solid ${BRONZE}`}}>{["Cohort","Facilitator","Members","Score","Movement","Engagement"].map(h=><th key={h} style={{textAlign:"left",padding:8,fontSize:11,fontWeight:700,color:BRONZE,textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>)}</tr></thead>
                <tbody>{cohortData.map(c=><tr key={c.name} style={{borderBottom:`1px solid ${WARM_IVORY}`}}><td style={{padding:8,fontWeight:700,color:CHARCOAL}}>{c.name}</td><td style={{padding:8}}>{c.facilitator}</td><td style={{padding:8}}>{c.members}</td><td style={{padding:8,fontWeight:700}}>{c.score}</td><td style={{padding:8,fontWeight:700,color:GREEN}}>+{c.delta}</td><td style={{padding:8}}><Bar2 value={c.engagement}/></td></tr>)}</tbody>
              </table>
            </Card>
            {atRisk.length>0&&<Card style={{borderLeft:`3px solid ${RED}`}}><Label>Attention Required</Label>
              {atRisk.map(m=><div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${WARM_IVORY}`}}>
                <div><span style={{fontWeight:600,color:CHARCOAL}}>{m.name}</span><span style={{fontSize:12,color:WARM_GREY,marginLeft:8}}>Cohort {m.cohort} · {m.engagement}%</span></div>
                <span style={{fontSize:10,padding:"3px 10px",borderRadius:3,fontWeight:700,background:m.engagement<30?"#FFEBEE":"#FFF8E1",color:m.engagement<30?RED:"#E65100",textTransform:"uppercase"}}>{m.engagement<30?"Critical":"Watch"}</span>
              </div>)}
            </Card>}
          </>:<Card><div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:48,marginBottom:16}}><Flag code={ch.code}/></div><h3 style={{fontSize:20,fontWeight:700,color:CHARCOAL,marginBottom:8}}>{ch.name} — {ch.status==="forming"?"Now Forming":"Planned"}</h3><p style={{fontSize:14,color:WARM_GREY,maxWidth:480,margin:"0 auto 24px"}}>{ch.status==="forming"?"Chapter lead identification in progress. One facilitator candidate identified. Target: first cohort within three months.":"Market research phase. Diaspora community engagement planned."}</p><div style={{display:"inline-flex",gap:16,fontSize:13}}>{[{l:"Currency",v:ch.currency},{l:"Payment",v:ch.payment},{l:"Compliance",v:ch.compliance}].map((x,i)=><div key={i} style={{padding:"8px 16px",background:WARM_IVORY,borderRadius:4}}><span style={{color:WARM_GREY}}>{x.l}:</span> <strong>{x.v}</strong></div>)}</div></div></Card>}
        </>}

        {/* ═══ MEMBERS ═══ */}
        {tab==="Members"&&<Card><Label>Members — {ch?.name}</Label>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${BRONZE}`}}>{["Name","Cohort","Status","Score","Movement","Engagement"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 10px",fontSize:11,fontWeight:700,color:BRONZE,textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>)}</tr></thead>
            <tbody>{memberData.map(m=><tr key={m.id} style={{borderBottom:`1px solid ${WARM_IVORY}`}}>
              <td style={{padding:10,fontWeight:600,color:CHARCOAL}}>{m.name}</td><td style={{padding:10}}>Cohort {m.cohort}</td>
              <td style={{padding:10}}><Badge status={m.status}/></td><td style={{padding:10,fontWeight:700}}>{m.score}</td>
              <td style={{padding:10,fontWeight:700,color:m.delta>0?GREEN:RED}}>{m.delta>0?"+":""}{m.delta}</td><td style={{padding:10}}><Bar2 value={m.engagement}/></td>
            </tr>)}</tbody>
          </table>
        </Card>}

        {/* ═══ FINANCIALS ═══ */}
        {tab==="Financials"&&<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:20}}>
          {chapters.map(c=><Card key={c.id} style={{textAlign:"center"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:14}}><Flag code={c.code}/><span style={{fontSize:16,fontWeight:700,color:CHARCOAL}}>{c.name}</span></div>
            {c.status==="active"?<><div style={{fontSize:26,fontWeight:700,color:CHARCOAL}}>₦4.2M</div><div style={{fontSize:12,color:WARM_GREY}}>Revenue</div><div style={{fontSize:20,fontWeight:700,color:GREEN,marginTop:8}}>₦2.35M</div><div style={{fontSize:12,color:WARM_GREY}}>Net (56%)</div></>:<><div style={{fontSize:16,color:WARM_GREY,marginTop:8}}>—</div><div style={{fontSize:12,color:WARM_GREY}}>{c.status}</div></>}
            <div style={{fontSize:12,color:BRONZE,marginTop:12,fontWeight:600}}>{c.currency} · {c.payment}</div>
          </Card>)}
        </div>
        <Card><Label>Revenue by Stream</Label>
          {[{s:"Programme Fees",a:"₦3,600,000",p:86},{s:"Event Tickets",a:"₦350,000",p:8},{s:"Sponsorship",a:"₦250,000",p:6}].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${WARM_IVORY}`}}>
              <span style={{fontSize:13,fontWeight:600,color:BODY_TEXT}}>{r.s}</span>
              <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:80,background:"#E8E3DA",borderRadius:3,height:6,overflow:"hidden"}}><div style={{background:BRONZE,height:"100%",width:`${r.p}%`,borderRadius:3}}/></div><span style={{fontSize:13,fontWeight:700,color:CHARCOAL,minWidth:100,textAlign:"right"}}>{r.a}</span></div>
            </div>))}
        </Card></>}

        {/* ═══ REFERRALS ═══ */}
        {tab==="Referrals"&&<Card><Label>Referral Network</Label>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${BRONZE}`}}>{["Chapter","Professional","Speciality","Status"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 10px",fontSize:11,fontWeight:700,color:BRONZE,textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>)}</tr></thead>
            <tbody>{referralData.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${WARM_IVORY}`}}>
              <td style={{padding:10}}>{r.chapter}</td><td style={{padding:10,fontWeight:600,color:CHARCOAL}}>{r.name}</td><td style={{padding:10}}>{r.type}</td>
              <td style={{padding:10}}><span style={{fontSize:11,padding:"3px 10px",borderRadius:3,fontWeight:600,background:r.status==="Active"?"#E8F5E9":"#FFF8E1",color:r.status==="Active"?"#2E7D32":"#F57F17"}}>{r.status}</span></td>
            </tr>)}</tbody>
          </table>
        </Card>}

        {/* ═══ COMPLIANCE ═══ */}
        {tab==="Compliance"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          {chapters.map(c=><Card key={c.id}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><Flag code={c.code}/><div style={{fontSize:18,fontWeight:700,color:CHARCOAL}}>{c.name}</div></div>
            {[{l:"Data Protection",v:c.compliance},{l:"Payment",v:c.payment},{l:"Facilitator Certs",v:c.code==="GB"?"DBS Check":c.code==="CA"?"Vulnerable Sector":"-"},{l:"Referrals",v:`${referralData.filter(r=>r.chapter===c.name).length} professionals`}].map((x,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${WARM_IVORY}`}}>
                <div><div style={{fontSize:11,color:WARM_GREY}}>{x.l}</div><div style={{fontSize:13,fontWeight:600,color:CHARCOAL}}>{x.v}</div></div>
                <span style={{fontSize:10,padding:"2px 8px",borderRadius:3,fontWeight:700,textTransform:"uppercase",background:c.status==="active"?"#E8F5E9":"#FFF8E1",color:c.status==="active"?"#2E7D32":"#F57F17"}}>{c.status==="active"?"ok":"pending"}</span>
              </div>))}
          </Card>)}
        </div>}

        {/* ═══ REPORTS ═══ */}
        {tab==="Reports"&&<Card><Label>Generate Reports</Label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            {[{t:"Global Impact",i:"\ud83c\udf0d"},{t:"Chapter Report",i:"\ud83d\udcca"},{t:"Financial",i:"\ud83d\udcb0"},{t:"Facilitators",i:"\ud83c\udfaf"},{t:"Compliance",i:"\ud83d\udd12"},{t:"Sponsor",i:"\ud83c\udfe2"},{t:"NPS",i:"\u2b50"},{t:"Transfers",i:"\u2708\ufe0f"},{t:"Referrals",i:"\ud83c\udfe5"}].map((r,i)=>(
              <button key={i} style={{padding:18,background:WARM_IVORY,border:"1px solid #E8E3DA",borderRadius:6,cursor:"pointer",textAlign:"left",transition:"border-color 0.2s"}} onMouseOver={e=>e.currentTarget.style.borderColor=BRONZE} onMouseOut={e=>e.currentTarget.style.borderColor="#E8E3DA"}>
                <div style={{fontSize:22,marginBottom:6}}>{r.i}</div><div style={{fontSize:14,fontWeight:700,color:CHARCOAL}}>{r.t}</div>
              </button>))}
          </div>
        </Card>}

      </div>
      <div style={{borderTop:"1px solid #E8E3DA",padding:"16px 24px",textAlign:"center",fontSize:11,color:WARM_GREY,marginTop:32}}>Becoming Better Men · Built by <a href="https://jovilex.com" target="_blank" rel="noopener" style={{color:BRONZE,textDecoration:"none"}}>Jovilex</a></div>
    </div>
  );
}
