import { useState, useEffect, useRef } from "react";

const NAVY="#0B1D3A",TEAL="#0E7A6B",EMERALD="#059669",LT="#E6F5F2",LN="#EEF1F7";

function useInView(t=0.1){
  const ref=useRef(null);const[v,sv]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true)},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return[ref,v];
}
function FI({children,d=0,style={}}){
  const[r,v]=useInView();
  return<div ref={r} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(22px)",transition:`opacity .6s ease ${d}ms,transform .6s ease ${d}ms`,...style}}>{children}</div>;
}
function Chip({children,color=TEAL}){
  return<span style={{display:"inline-block",background:`${color}18`,color,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,padding:"4px 12px",borderRadius:100,letterSpacing:1,textTransform:"uppercase"}}>{children}</span>;
}
function SectionTitle({children,light=false,sub}){
  return<div style={{textAlign:"center",marginBottom:sub?20:48}}>
    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,2.8vw,40px)",color:light?"white":NAVY,fontWeight:700,margin:"0 0 10px",lineHeight:1.2}}>{children}</h2>
    {sub&&<p style={{color:light?"rgba(255,255,255,.5)":"#6B7280",fontFamily:"'DM Sans',sans-serif",fontSize:15,maxWidth:540,margin:"0 auto",lineHeight:1.7}}>{sub}</p>}
  </div>;
}

function ExpandSection({id,label,title,sub,dark=false,defaultOpen=false,cta,children}){
  const[open,setOpen]=useState(defaultOpen);
  const bg=dark?NAVY:"#F8FAFB";
  const tc=dark?"white":NAVY;
  return(
    <section id={id} style={{background:bg,padding:"60px 2rem",borderBottom:`1px solid ${dark?"rgba(255,255,255,.06)":"#E5E7EB"}`}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:open?36:0}}>
            {label&&<div style={{marginBottom:10}}><Chip color={dark?"#34D399":TEAL}>{label}</Chip></div>}
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,2.6vw,38px)",color:tc,fontWeight:700,margin:"0 0 8px"}}>{title}</h2>
            {sub&&<p style={{color:dark?"rgba(255,255,255,.45)":"#6B7280",fontFamily:"'DM Sans',sans-serif",fontSize:14,maxWidth:520,margin:"0 auto 18px",lineHeight:1.7}}>{sub}</p>}
            <button onClick={()=>setOpen(o=>!o)} style={{display:"inline-flex",alignItems:"center",gap:8,background:open?(dark?"rgba(255,255,255,.08)":NAVY):(dark?TEAL:TEAL),color:"white",border:"none",borderRadius:10,padding:"10px 22px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",transition:"all .2s"}}>
              {open?"Collapse ↑":`Explore ${title.split(" ").slice(0,2).join(" ")} →`}
            </button>
          </div>
        </FI>
        {open&&<FI d={80}><div style={{marginTop:28}}>{children}</div></FI>}
        {open&&cta&&<div style={{marginTop:36,textAlign:"center"}}><a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:8,background:TEAL,color:"white",padding:"12px 26px",borderRadius:10,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14}}>{cta} →</a></div>}
      </div>
    </section>
  );
}

function Navbar(){
  const[s,ss]=useState(false);
  useEffect(()=>{const f=()=>ss(window.scrollY>40);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f);},[]);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:s?"rgba(11,29,58,.97)":"transparent",backdropFilter:s?"blur(12px)":"none",borderBottom:s?"1px solid rgba(255,255,255,.07)":"none",transition:"all .3s",padding:"0 2rem"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:8,background:TEAL,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M10 8v4M8 10h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{color:"white",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17}}>ResearchMD</span>
        </div>
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          {[["Dashboard","#dashboard"],["Scenarios","#scenarios"],["Capability","#capability"],["Specialties","#specialties"],["Packages","#packages"],["FAQ","#faq"]].map(([l,h])=>(
            <a key={l} href={h} style={{color:"rgba(255,255,255,.65)",textDecoration:"none",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="white"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.65)"}>{l}</a>
          ))}
          <a href="#contact" style={{background:TEAL,color:"white",padding:"9px 20px",borderRadius:9,textDecoration:"none",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Book Consultation</a>
        </div>
      </div>
    </nav>
  );
}

function Hero(){
  const[a,sa]=useState(0);
  useEffect(()=>{const t=setInterval(()=>sa(x=>(x+1)%4),2000);return()=>clearInterval(t);},[]);
  const steps=["Research Idea","Data Analysis","Manuscript","Publication"];
  const sublabels=["Raw data & hypothesis","SPSS/R/STATA analysis","IMRAD manuscript","Indexed journal"];
  return(
    <section style={{minHeight:"100vh",background:NAVY,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",padding:"100px 2rem 60px"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fff}@keyframes p2{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}`}</style>
      <div style={{position:"absolute",top:-150,right:-100,width:550,height:550,borderRadius:"50%",background:"rgba(14,122,107,.07)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
        <div>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(14,122,107,.2)",border:"1px solid rgba(14,122,107,.4)",borderRadius:100,padding:"6px 16px",marginBottom:26}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:EMERALD,animation:"p2 2s ease-in-out infinite"}}/>
            <span style={{color:"#6EE7B7",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Medical Research & Publication Consultant</span>
          </div>
          <h1 style={{color:"white",fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3.4vw,50px)",fontWeight:700,lineHeight:1.13,margin:"0 0 20px",letterSpacing:"-.5px"}}>
            Turn Your Clinical Data, Thesis, or Research Idea Into a{" "}
            <span style={{color:"#34D399"}}>Publication-Ready Scientific Manuscript</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:16,fontFamily:"'DM Sans',sans-serif",lineHeight:1.75,margin:"0 0 18px"}}>Thesis development · Statistical analysis · Manuscript writing · Journal submission — every step guided by evidence-based methodology.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:32}}>
            {["Thesis Support ✓","Statistical Analysis ✓","Manuscript Writing ✓","Publication Support ✓","Reviewer Responses ✓"].map(b=><span key={b} style={{background:"rgba(52,211,153,.12)",border:"1px solid rgba(52,211,153,.3)",color:"#6EE7B7",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600,padding:"5px 12px",borderRadius:100}}>{b}</span>)}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a href="#contact" style={{background:TEAL,color:"white",padding:"13px 28px",borderRadius:10,textDecoration:"none",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:700,display:"inline-flex",alignItems:"center",gap:8}}>Book Free Consultation <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg></a>
            <a href="#dashboard" style={{background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.2)",color:"white",padding:"13px 28px",borderRadius:10,textDecoration:"none",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Explore Services →</a>
          </div>
          <div style={{display:"flex",gap:0,marginTop:40,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.1)",flexWrap:"wrap"}}>
            {[{i:"📐",l:"Research Methodology"},{i:"📊",l:"Statistical Analysis"},{i:"✍️",l:"Scientific Writing"},{i:"📬",l:"Publication Support"}].map((c,i,arr)=>(
              <div key={c.l} style={{paddingRight:22,marginRight:22,borderRight:i<arr.length-1?"1px solid rgba(255,255,255,.1)":"none"}}>
                <div style={{fontSize:15,marginBottom:3}}>{c.i}</div>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:11,fontFamily:"'DM Sans',sans-serif",lineHeight:1.4,maxWidth:86}}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:18,padding:28}}>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{color:"rgba(255,255,255,.35)",fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>Publication Journey</div>
            <div style={{color:"white",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Your path from data to publication</div>
          </div>
          {steps.map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:14,padding:"11px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.05)":"none"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:i<a?EMERALD:i===a?TEAL:"rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .4s",boxShadow:i===a?"0 0 0 6px rgba(14,122,107,.2)":"none"}}>
                {i<a?<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>:<span style={{color:i===a?"white":"rgba(255,255,255,.25)",fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{i+1}</span>}
              </div>
              <div style={{flex:1}}>
                <div style={{color:i<=a?"white":"rgba(255,255,255,.3)",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"color .4s"}}>{s}</div>
                <div style={{color:"rgba(255,255,255,.25)",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{sublabels[i]}</div>
              </div>
              {i===a&&<div style={{width:7,height:7,borderRadius:"50%",background:TEAL,animation:"p2 1.5s ease-in-out infinite"}}/>}
            </div>
          ))}
          <div style={{marginTop:18,background:"rgba(14,122,107,.12)",border:"1px solid rgba(14,122,107,.25)",borderRadius:9,padding:"9px 14px"}}>
            <div style={{color:"#6EE7B7",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>✦ Typical timeline: 6–12 weeks to submission-ready manuscript</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dashboard(){
  const services=[
    {id:"spss-workflow",icon:"📊",title:"Statistical Analysis",sub:"SPSS · R · STATA",color:"#3B82F6"},
    {id:"tlf",icon:"📋",title:"TLF Development",sub:"Tables · Listings · Figures",color:TEAL},
    {id:"capability",icon:"✍️",title:"Manuscript Writing",sub:"IMRAD · Abstract · Cover Letter",color:"#7C3AED"},
    {id:"prisma",icon:"🔍",title:"Literature Reviews",sub:"Narrative · Systematic · PRISMA",color:"#F59E0B"},
    {id:"prisma",icon:"🧩",title:"Systematic Reviews",sub:"PRISMA 2020 · Meta-Analysis",color:"#EF4444"},
    {id:"methodology",icon:"📝",title:"Protocol Development",sub:"IRB · Synopsis · SAP",color:"#16A34A"},
    {id:"packages",icon:"📬",title:"Publication Support",sub:"Journal Selection · Submission",color:"#DB2777"},
    {id:"quality",icon:"✅",title:"Scientific Review",sub:"QC · Consistency · Accuracy",color:"#0891B2"},
    {id:"deliverables",icon:"🎯",title:"Research Consulting",sub:"Strategy · Design · Guidance",color:"#D97706"},
  ];
  const scrollTo=(id)=>{
    const el=document.getElementById(id);
    if(el){el.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>{const btn=el.querySelector("button");if(btn&&btn.textContent.includes("Explore"))btn.click();},700);}
  };
  return(
    <section id="dashboard" style={{padding:"72px 2rem",background:"white",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:40}}>
            <Chip>Research Support Dashboard</Chip>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,2.8vw,38px)",color:NAVY,fontWeight:700,margin:"12px 0 8px"}}>What Can I Help You With?</h2>
            <p style={{color:"#6B7280",fontFamily:"'DM Sans',sans-serif",fontSize:14,maxWidth:480,margin:"0 auto"}}>Click any service to explore detailed capabilities, examples, and deliverables.</p>
          </div>
        </FI>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {services.map((s,i)=>(
            <FI key={s.title+i} d={i*35}>
              <button onClick={()=>scrollTo(s.id)} style={{width:"100%",background:"#F8FAFB",border:"1.5px solid #E5E7EB",borderRadius:14,padding:"20px 18px",cursor:"pointer",textAlign:"left",transition:"all .25s",display:"flex",alignItems:"center",gap:14}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${s.color}0D`;e.currentTarget.style.borderColor=s.color;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.background="#F8FAFB";e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{width:42,height:42,borderRadius:11,background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY,marginBottom:2}}>{s.title}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280"}}>{s.sub}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,opacity:.35}}><path d="M5 12h14M12 5l7 7-7 7" stroke={NAVY} strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection(){
  const haves=["Clinical Data","Patient Records","Study Results","Research Ideas","Thesis Requirements","Completed Trials"];
  const lacks=["Statistical Analysis","Data Interpretation","Manuscript Writing","Journal Selection","Reviewer Responses","Publication Strategy"];
  return(
    <section style={{padding:"72px 2rem",background:"#F8FAFB",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:44}}>
            <div style={{marginBottom:10}}><Chip>The Gap</Chip></div>
            <SectionTitle sub="Most doctors complete their research but never publish it. The bottleneck isn't the data — it's the expertise to transform it.">You Have the Data. The Gap Is What Happens Next.</SectionTitle>
          </div>
        </FI>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:20,alignItems:"center"}}>
          <FI d={100}>
            <div style={{background:"white",borderRadius:14,padding:24,border:"2px solid #E5E7EB"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{width:30,height:30,borderRadius:7,background:LN,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={NAVY} strokeWidth="2"/></svg></div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY}}>Researchers Have</span>
              </div>
              {haves.map(x=><div key={x} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/></svg>
                </div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#374151",fontWeight:500}}>{x}</span>
              </div>)}
            </div>
          </FI>
          <FI d={200}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <div style={{width:46,height:46,borderRadius:"50%",background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 8px rgba(14,122,107,.12)"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div style={{background:NAVY,color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:10,padding:"5px 12px",borderRadius:7,textAlign:"center"}}>I bridge<br/>this gap</div>
            </div>
          </FI>
          <FI d={300}>
            <div style={{background:"white",borderRadius:14,padding:24,border:"2px solid #FEE2E2"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{width:30,height:30,borderRadius:7,background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg></div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:"#991B1B"}}>They Struggle With</span>
              </div>
              {lacks.map(x=><div key={x} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></svg>
                </div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#374151",fontWeight:500}}>{x}</span>
              </div>)}
            </div>
          </FI>
        </div>
      </div>
    </section>
  );
}

function ClientScenarios(){
  const[open,setOpen]=useState(null);
  const sc=[
    {icon:"📊",q:"I have collected data but don't know which statistical test to use.",how:"I review your data type, study design, and research question, then select appropriate tests (t-test, ANOVA, chi-square, regression, survival), run the analysis in SPSS/R, and deliver fully interpreted results with publication-ready tables and figures.",d:["Statistical analysis report","Publication-ready tables","Figures (charts, graphs)","Written interpretation"],color:"#3B82F6"},
    {icon:"🎓",q:"My MD thesis deadline is approaching and I need structured help immediately.",how:"End-to-end thesis support: synopsis, protocol, data analysis, and all chapters formatted to your institution's requirements.",d:["Synopsis & protocol","Formatted thesis chapters","Statistical analysis section","References & bibliography"],color:"#16A34A"},
    {icon:"📬",q:"I have written a manuscript but journals keep rejecting it.",how:"Structured manuscript audit evaluating research question clarity, methodology, statistical presentation, discussion quality, and journal fit — then rewrite and reformat for a higher-probability target journal.",d:["Manuscript critique report","Revised manuscript","Optimised journal selection","Submission package"],color:"#D97706"},
    {icon:"🏆",q:"I need a publication for my academic promotion or appraisal.",how:"Identify publishable data from existing clinical practice or retrospective records, design a study, handle full analysis, and produce a manuscript targeted at indexed journals.",d:["Study design consultation","Data analysis","Full IMRAD manuscript","Journal submission support"],color:"#7C3AED"},
    {icon:"🏥",q:"I have retrospective hospital data and want to publish it.",how:"Data cleaning, variable coding, statistical modelling, ethical considerations, and methodology reporting to STROBE standards.",d:["Data cleaning & validation","Retrospective analysis","STROBE-compliant methods","Full manuscript"],color:TEAL},
    {icon:"🔁",q:"I need help responding to reviewer comments without losing the acceptance.",how:"Point-by-point response letter that professionally addresses every reviewer comment, with targeted manuscript revisions to maximise acceptance probability.",d:["Reviewer response letter","Revised manuscript","Track-changes document","Cover letter for resubmission"],color:"#DC2626"},
  ];
  return(
    <ExpandSection id="scenarios" label="Recognise Your Situation?" title="Typical Client Scenarios" sub="Select the scenario that matches your situation — see exactly how I can help." cta="Discuss Your Scenario">
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {sc.map((s,i)=>(
          <div key={i} style={{border:`1.5px solid ${open===i?s.color:"#E5E7EB"}`,borderRadius:13,overflow:"hidden",transition:"border-color .3s"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${s.color}08`:"white",border:"none",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:20}}>{s.icon}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY}}>"{s.q}"</span>
              </div>
              <div style={{width:24,height:24,borderRadius:"50%",background:open===i?s.color:LT,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s"}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{transform:open===i?"rotate(45deg)":"none",transition:"transform .3s"}}><path d="M12 5v14M5 12h14" stroke={open===i?"white":TEAL} strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
            </button>
            {open===i&&(
              <div style={{padding:"0 20px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                <div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:s.color,letterSpacing:1,textTransform:"uppercase",marginBottom:7}}>How I Help</div>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#4B5563",lineHeight:1.75,margin:0}}>{s.how}</p>
                </div>
                <div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:s.color,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Expected Deliverables</div>
                  {s.d.map(d=><div key={d} style={{display:"flex",alignItems:"center",gap:7,background:"white",borderRadius:7,padding:"8px 11px",marginBottom:5,border:"1px solid #F3F4F6"}}>
                    <div style={{width:15,height:15,borderRadius:"50%",background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={s.color} strokeWidth="3" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",fontWeight:600}}>{d}</span>
                  </div>)}
                  <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,background:s.color,color:"white",padding:"9px 16px",borderRadius:8,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12}}>Discuss This Scenario →</a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function SPSSWorkflow(){
  const[active,setActive]=useState(null);
  const steps=[
    {icon:"🗂️",label:"Raw Dataset",sub:"Excel / SPSS / CSV",detail:"Patient IDs, variables, dates, clinical measurements — unprocessed. Accepted in any format.",color:"#3B82F6"},
    {icon:"🧹",label:"Data Cleaning",sub:"Validation & Coding",detail:"Missing value handling, outlier detection, variable recoding, normality checks, duplicate removal.",color:"#F59E0B"},
    {icon:"📐",label:"SPSS Analysis",sub:"Statistical Tests",detail:"Descriptive stats, t-tests, chi-square, ANOVA, regression, survival — test selection guided by study design.",color:"#7C3AED"},
    {icon:"📋",label:"Statistical Output",sub:"Raw SPSS Tables",detail:"Raw output: means, SDs, p-values, ORs, CIs — unformatted and not yet manuscript-ready.",color:"#EF4444"},
    {icon:"📊",label:"Publication Table",sub:"Journal-Formatted",detail:"Clean tables with appropriate decimal places, footnotes, and statistical notation per CONSORT/STROBE.",color:TEAL},
    {icon:"🔬",label:"Interpretation",sub:"Clinical Meaning",detail:"Translation of numbers into clinical meaning — effect sizes, significance, confidence intervals, limitations.",color:"#16A34A"},
    {icon:"✍️",label:"Results Section",sub:"Manuscript Writing",detail:"Structured Results narrative following IMRAD — scientific language, referenced to tables and figures.",color:"#DB2777"},
    {icon:"📄",label:"Full Manuscript",sub:"Submission Ready",detail:"Complete IMRAD manuscript — Abstract, Introduction, Methods, Results, Discussion — formatted for target journal.",color:EMERALD},
  ];
  return(
    <ExpandSection id="spss-workflow" dark label="Methodology" title="SPSS to Publication Workflow" sub="Click any step to understand exactly what happens at each stage of the data-to-publication pipeline." cta="Discuss Your Dataset">
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {steps.map((s,i)=>(
          <div key={s.label} onClick={()=>setActive(active===i?null:i)} style={{background:active===i?"white":"rgba(255,255,255,.04)",border:`1.5px solid ${active===i?s.color:"rgba(255,255,255,.1)"}`,borderRadius:13,padding:18,cursor:"pointer",transition:"all .3s",transform:active===i?"translateY(-4px)":"none",boxShadow:active===i?"0 12px 32px rgba(0,0,0,.2)":"none",position:"relative"}}>
            <div style={{position:"absolute",top:12,right:12,width:19,height:19,borderRadius:"50%",background:active===i?s.color:"rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:active===i?"white":"rgba(255,255,255,.4)",fontSize:9,fontWeight:800,fontFamily:"'DM Sans',sans-serif"}}>{i+1}</span>
            </div>
            <div style={{fontSize:28,marginBottom:11}}>{s.icon}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:active===i?NAVY:"white",marginBottom:3,transition:"color .3s"}}>{s.label}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:active===i?s.color:"rgba(255,255,255,.35)",fontWeight:600,marginBottom:active===i?8:0,transition:"color .3s"}}>{s.sub}</div>
            {active===i&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4B5563",lineHeight:1.6}}>{s.detail}</div>}
          </div>
        ))}
      </div>
      <div style={{marginTop:20,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {[{icon:"⚡",label:"3–5 Weeks",desc:"Dataset-to-manuscript timeline"},{icon:"🎯",label:"Journal-Ready",desc:"Tables & figures formatted to spec"},{icon:"📖",label:"IMRAD Structure",desc:"Standard scientific manuscript format"}].map(b=>(
          <div key={b.label} style={{background:"rgba(14,122,107,.12)",border:"1px solid rgba(14,122,107,.25)",borderRadius:12,padding:"15px 18px",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:20}}>{b.icon}</span>
            <div><div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13}}>{b.label}</div>
              <div style={{color:"rgba(255,255,255,.4)",fontFamily:"'DM Sans',sans-serif",fontSize:11}}>{b.desc}</div></div>
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function TLFGallery(){
  const[tab,setTab]=useState(0);
  const baseRows=[
    {v:"Age (years)",a:"48.2 ± 11.4",b:"51.6 ± 12.8",p:"0.048",s:true},
    {v:"Male Sex, n (%)",a:"62 (62.0%)",b:"58 (58.0%)",p:"0.512",s:false},
    {v:"BMI (kg/m²)",a:"26.4 ± 3.8",b:"28.9 ± 4.2",p:"0.001",s:true},
    {v:"Hypertension, n (%)",a:"38 (38.0%)",b:"54 (54.0%)",p:"0.018",s:true},
    {v:"Diabetes Mellitus, n (%)",a:"22 (22.0%)",b:"31 (31.0%)",p:"0.131",s:false},
    {v:"Dyslipidaemia, n (%)",a:"29 (29.0%)",b:"44 (44.0%)",p:"0.023",s:true},
    {v:"eGFR (mL/min/1.73m²)",a:"88.4 ± 14.2",b:"74.6 ± 18.9",p:"<0.001",s:true},
  ];
  const regRows=[
    {v:"Age (per 10 years)",or:"1.42",ci:"1.18–1.71",p:"0.001",s:true},
    {v:"Male Sex",or:"0.88",ci:"0.54–1.44",p:"0.612",s:false},
    {v:"BMI (per kg/m²)",or:"1.18",ci:"1.09–1.28",p:"<0.001",s:true},
    {v:"Hypertension",or:"1.94",ci:"1.22–3.08",p:"0.005",s:true},
    {v:"Diabetes Mellitus",or:"1.31",ci:"0.74–2.32",p:"0.358",s:false},
    {v:"eGFR (per 10 units)",or:"0.71",ci:"0.62–0.81",p:"<0.001",s:true},
  ];
  const tabs=["Baseline (Table 1)","Regression Output","Before & After"];
  return(
    <ExpandSection id="tlf" label="Evidence of Capability" title="Statistical Tables & TLF Interpretation" sub="Publication-ready tables produced from raw SPSS output — with scientific narrative included." cta="Request Sample Output">
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24,flexWrap:"wrap"}}>
        {tabs.map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?NAVY:"white",color:tab===i?"white":"#374151",border:`1.5px solid ${tab===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"8px 18px",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s"}}>{t}</button>)}
      </div>
      {tab===0&&<div>
        <div style={{background:"white",borderRadius:14,border:"1.5px solid #E5E7EB",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.05)"}}>
          <div style={{background:NAVY,padding:"13px 22px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13}}>Table 1. Baseline Characteristics of Study Participants</span>
            <span style={{color:"rgba(255,255,255,.3)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>Illustrative Example</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#F8FAFB"}}>{["Variable","Group A (n=100)","Group B (n=100)","p-value"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:h==="Variable"?"left":"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,color:NAVY,borderBottom:"2px solid #E5E7EB"}}>{h}</th>)}</tr></thead>
            <tbody>{baseRows.map((r,i)=><tr key={r.v} style={{background:i%2===0?"white":"#F8FAFB",borderBottom:"1px solid #F3F4F6"}}>
              <td style={{padding:"9px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",fontWeight:500}}>{r.v}</td>
              <td style={{padding:"9px 16px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r.a}</td>
              <td style={{padding:"9px 16px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r.b}</td>
              <td style={{padding:"9px 16px",textAlign:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:r.s?700:400,color:r.s?TEAL:"#6B7280"}}>{r.p}{r.s?"*":""}</span></td>
            </tr>)}</tbody>
          </table>
          <div style={{padding:"9px 16px",background:"#F8FAFB",borderTop:"1px solid #E5E7EB"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>Mean ± SD for continuous; n (%) for categorical. *p &lt; 0.05.</span></div>
        </div>
        <div style={{marginTop:18,background:LT,border:`1.5px solid ${TEAL}40`,borderRadius:13,padding:"18px 22px"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:8}}>✦ How this becomes manuscript text:</div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#1F4E42",lineHeight:1.8,margin:0,fontStyle:"italic",background:"white",padding:"13px 16px",borderRadius:9,border:"1px solid rgba(14,122,107,.2)"}}>
            "The two groups were comparable in terms of sex distribution, prevalence of diabetes mellitus, and smoking status (p &gt; 0.05 for all). However, Group B participants were significantly older (51.6 ± 12.8 vs. 48.2 ± 11.4 years; p = 0.048), had higher BMI (28.9 ± 4.2 vs. 26.4 ± 3.8 kg/m²; p = 0.001), greater prevalence of hypertension (54.0% vs. 38.0%; p = 0.018) and dyslipidaemia (44.0% vs. 29.0%; p = 0.023), and lower eGFR values (74.6 ± 18.9 vs. 88.4 ± 14.2 mL/min/1.73m²; p &lt; 0.001)."
          </p>
        </div>
      </div>}
      {tab===1&&<div>
        <div style={{background:"white",borderRadius:14,border:"1.5px solid #E5E7EB",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.05)"}}>
          <div style={{background:NAVY,padding:"13px 22px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13}}>Table 2. Multivariable Logistic Regression — Predictors of Primary Outcome</span>
            <span style={{color:"rgba(255,255,255,.3)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>Illustrative Example</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#F8FAFB"}}>{["Variable","Adjusted OR","95% CI","p-value","Effect"].map(h=><th key={h} style={{padding:"10px 16px",textAlign:h==="Variable"?"left":"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,color:NAVY,borderBottom:"2px solid #E5E7EB"}}>{h}</th>)}</tr></thead>
            <tbody>{regRows.map((r,i)=><tr key={r.v} style={{background:i%2===0?"white":"#F8FAFB",borderBottom:"1px solid #F3F4F6"}}>
              <td style={{padding:"10px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",fontWeight:500}}>{r.v}</td>
              <td style={{padding:"10px 16px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:r.s?700:400,color:r.s?NAVY:"#6B7280"}}>{r.or}</td>
              <td style={{padding:"10px 16px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r.ci}</td>
              <td style={{padding:"10px 16px",textAlign:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:r.s?700:400,color:r.s?TEAL:"#6B7280"}}>{r.p}</span></td>
              <td style={{padding:"10px 16px",textAlign:"center",fontSize:14}}>{r.s?(parseFloat(r.or)>1?"⬆️":"⬇️"):"➡️"}</td>
            </tr>)}</tbody>
          </table>
          <div style={{padding:"9px 16px",background:"#F8FAFB",borderTop:"1px solid #E5E7EB"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>OR = Odds Ratio; CI = Confidence Interval. Adjusted for all variables in the model.</span></div>
        </div>
      </div>}
      {tab===2&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div style={{background:"white",borderRadius:13,padding:22,border:"1.5px solid #E5E7EB"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{width:30,height:30,borderRadius:7,background:"#FEF3C7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>📊</div>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY}}>Raw SPSS Output</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>What the software produces</div></div>
          </div>
          <div style={{background:"#1E1E2E",borderRadius:9,padding:"13px 15px",fontFamily:"monospace",fontSize:11,color:"#A6E3A1",lineHeight:1.85}}>
            <div style={{color:"#89B4FA"}}>Binary Logistic Regression</div>
            <div style={{color:"#CDD6F4"}}>-2 Log likelihood: 248.432</div>
            <div style={{color:"#A6E3A1",marginTop:5}}>Variables in Equation:</div>
            <div style={{color:"#F38BA8"}}>Age: B=0.352 SE=0.092</div>
            <div style={{color:"#F38BA8"}}>Wald=14.63 Sig=.001</div>
            <div style={{color:"#F38BA8"}}>Exp(B)=1.42 (1.18–1.71)</div>
            <div style={{color:"#94E2D5",marginTop:3}}>BMI: B=0.165 SE=0.041</div>
            <div style={{color:"#94E2D5"}}>Exp(B)=1.18 (1.09–1.28)</div>
          </div>
        </div>
        <div style={{background:"white",borderRadius:13,padding:22,border:"1.5px solid #E5E7EB"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{width:30,height:30,borderRadius:7,background:LT,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>✍️</div>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY}}>Manuscript Results Text</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>How it reads in the paper</div></div>
          </div>
          <div style={{background:LT,borderRadius:9,padding:"13px 15px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42",lineHeight:1.85,fontStyle:"italic"}}>
            "On multivariable logistic regression analysis, increasing age (aOR 1.42 per 10 years; 95% CI 1.18–1.71; p = 0.001), higher BMI (aOR 1.18 per kg/m²; 95% CI 1.09–1.28; p &lt; 0.001), and the presence of hypertension (aOR 1.94; 95% CI 1.22–3.08; p = 0.005) were independently associated with the primary outcome."
          </div>
          <div style={{marginTop:11,background:"#FEF3C7",borderRadius:8,padding:"9px 13px"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#92400E",fontWeight:600}}>✦ This goes directly into your Results section.</span>
          </div>
        </div>
      </div>}
    </ExpandSection>
  );
}

function PublicationFigures(){
  const[fig,setFig]=useState(0);
  const figs=[{l:"Bar Chart",i:"📊"},{l:"Kaplan-Meier",i:"📈"},{l:"Forest Plot",i:"🌲"},{l:"Scatter Plot",i:"⚡"}];
  const captions=["Figure 1. Mean outcome scores (± SEM) by group at Weeks 4, 8, 12. *p < 0.05.","Figure 2. Kaplan-Meier survival curves. Log-rank p < 0.001.","Figure 3. Forest plot — adjusted ORs with 95% CI for subgroup analysis.","Figure 4. Correlation: BMI vs outcome score (r = −0.89, p < 0.001)."];
  return(
    <ExpandSection id="pub-figures" dark label="Publication Figures" title="Journal-Ready Publication Figures" sub="Click a figure type to view a realistic example with caption and interpretation." cta="Request Custom Figures">
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:22,flexWrap:"wrap"}}>
        {figs.map((f,i)=><button key={f.l} onClick={()=>setFig(i)} style={{background:fig===i?TEAL:"rgba(255,255,255,.06)",color:fig===i?"white":"rgba(255,255,255,.7)",border:`1.5px solid ${fig===i?TEAL:"rgba(255,255,255,.12)"}`,borderRadius:100,padding:"8px 18px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:7}}><span>{f.i}</span>{f.l}</button>)}
      </div>
      <div style={{background:"white",borderRadius:14,overflow:"hidden",border:"1px solid #E5E7EB"}}>
        <div style={{background:NAVY,padding:"11px 20px",display:"flex",justifyContent:"space-between"}}>
          <span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12}}>{["Figure 1. Mean Outcome Scores by Treatment Group","Figure 2. Kaplan-Meier Survival Curves","Figure 3. Forest Plot — Subgroup Analysis","Figure 4. Correlation: BMI vs Outcome Score"][fig]}</span>
          <span style={{color:"rgba(255,255,255,.25)",fontFamily:"'DM Sans',sans-serif",fontSize:10}}>Illustrative</span>
        </div>
        <div style={{padding:"24px",background:"white"}}>
          {fig===0&&<svg viewBox="0 0 560 240" style={{width:"100%",maxHeight:240}}>
            {[0,1,2,3,4].map(i=><line key={i} x1="55" y1={195-i*37} x2="530" y2={195-i*37} stroke="#F3F4F6" strokeWidth="1"/>)}
            {[0,25,50,75,100].map((v,i)=><text key={v} x="48" y={199-i*37} textAnchor="end" fontSize="10" fill="#9CA3AF" fontFamily="DM Sans">{v}</text>)}
            {[[100,115,"#94A3B8"],[148,148,TEAL],[258,75,"#94A3B8"],[306,138,"#3B82F6"],[416,95,"#94A3B8"],[464,182,"#7C3AED"]].map(([x,h,c],i)=>(
              <g key={i}><rect x={x} y={195-h} width={36} height={h} fill={c} rx="3" opacity=".85"/>
                <text x={x+18} y={189-h} textAnchor="middle" fontSize="9" fill={c} fontFamily="DM Sans" fontWeight="700">{Math.round(h/1.48)}</text></g>
            ))}
            {["Week 4","Week 8","Week 12"].map((l,i)=><text key={l} x={142+i*174} y="214" textAnchor="middle" fontSize="11" fill="#6B7280" fontFamily="DM Sans">{l}</text>)}
            <line x1="55" y1="20" x2="55" y2="195" stroke="#D1D5DB" strokeWidth="1.5"/>
            <line x1="55" y1="195" x2="530" y2="195" stroke="#D1D5DB" strokeWidth="1.5"/>
          </svg>}
          {fig===1&&<svg viewBox="0 0 560 260" style={{width:"100%",maxHeight:260}}>
            <line x1="55" y1="20" x2="55" y2="240" stroke="#D1D5DB" strokeWidth="1.5"/>
            <line x1="55" y1="240" x2="530" y2="240" stroke="#D1D5DB" strokeWidth="1.5"/>
            {[0,25,50,75,100].map((v,i)=><text key={v} x="48" y={244-i*44} textAnchor="end" fontSize="10" fill="#9CA3AF" fontFamily="DM Sans">{v}%</text>)}
            {[0,12,24,36,48].map((v,i)=><text key={v} x={55+i*116} y="254" textAnchor="middle" fontSize="10" fill="#9CA3AF" fontFamily="DM Sans">{v}mo</text>)}
            <polyline points="55,58 115,66 175,80 235,92 295,110 355,126 415,140 475,154 530,160" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round"/>
            <polyline points="55,58 115,87 175,116 235,147 295,172 355,192 415,209 475,220 530,230" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="6,3"/>
            <rect x="355" y="70" width="158" height="52" rx="5" fill="white" stroke="#E5E7EB"/>
            <line x1="365" y1="88" x2="392" y2="88" stroke={TEAL} strokeWidth="2.5"/>
            <text x="400" y="92" fontSize="11" fill="#374151" fontFamily="DM Sans">Group A (n=100)</text>
            <line x1="365" y1="106" x2="392" y2="106" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6,3"/>
            <text x="400" y="110" fontSize="11" fill="#374151" fontFamily="DM Sans">Group B (n=100)</text>
            <text x="200" y="40" fontSize="11" fill="#374151" fontFamily="DM Sans" fontWeight="700">Log-rank p &lt; 0.001</text>
          </svg>}
          {fig===2&&<svg viewBox="0 0 600 300" style={{width:"100%",maxHeight:300}}>
            <line x1="280" y1="20" x2="280" y2="280" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4,4"/>
            <text x="280" y="296" textAnchor="middle" fontSize="10" fill="#9CA3AF" fontFamily="DM Sans">OR=1.0</text>
            {[{l:"Overall",or:1.42,lo:1.18,hi:1.71,y:48},{l:"Age < 50",or:1.28,lo:0.94,hi:1.74,y:86},{l:"Age ≥ 50",or:1.61,lo:1.22,hi:2.12,y:124},{l:"Male",or:1.38,lo:1.02,hi:1.86,y:162},{l:"Female",or:1.49,lo:1.06,hi:2.09,y:200},{l:"BMI < 25",or:1.18,lo:0.82,hi:1.70,y:238},{l:"BMI ≥ 25",or:1.64,lo:1.28,hi:2.10,y:276}].map(r=>{
              const sc=v=>110+(Math.log(v)/Math.log(4))*190;const sig=r.lo>1.0;
              return<g key={r.l}><text x="120" y={r.y+4} textAnchor="end" fontSize="11" fill="#374151" fontFamily="DM Sans">{r.l}</text>
                <line x1={sc(r.lo)} y1={r.y} x2={sc(r.hi)} y2={r.y} stroke={sig?TEAL:"#94A3B8"} strokeWidth="1.5"/>
                <rect x={sc(r.or)-5} y={r.y-5} width={10} height={10} fill={sig?TEAL:"#94A3B8"} rx="2"/>
                <text x="470" y={r.y+4} fontSize="10" fill="#374151" fontFamily="DM Sans">{r.or.toFixed(2)} ({r.lo.toFixed(2)}–{r.hi.toFixed(2)})</text>
              </g>;
            })}
          </svg>}
          {fig===3&&<svg viewBox="0 0 560 260" style={{width:"100%",maxHeight:260}}>
            <line x1="55" y1="20" x2="55" y2="240" stroke="#D1D5DB" strokeWidth="1.5"/>
            <line x1="55" y1="240" x2="530" y2="240" stroke="#D1D5DB" strokeWidth="1.5"/>
            {[[80,175],[100,162],[125,150],[150,140],[175,129],[200,118],[230,106],[260,94],[290,82],[320,71],[355,60],[390,50],[425,42],[460,35],[495,29]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill={TEAL} opacity=".6"/>)}
            <line x1="68" y1="182" x2="510" y2="22" stroke="#EF4444" strokeWidth="2" strokeDasharray="6,3"/>
            <text x="290" y="14" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="DM Sans" fontWeight="700">r = −0.89, p &lt; 0.001</text>
          </svg>}
        </div>
        <div style={{padding:"14px 22px",borderTop:"1px solid #E5E7EB",background:"#F8FAFB"}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4B5563",fontStyle:"italic",margin:"0 0 7px"}}>{captions[fig]}</p>
          <span style={{background:LT,color:TEAL,fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:100}}>✦ Delivered at 300 DPI · TIFF/EPS/PDF · Journal specifications applied</span>
        </div>
      </div>
    </ExpandSection>
  );
}

function CapabilitySection(){
  const[tab,setTab]=useState(0);
  const caps=[
    {label:"Statistical Analysis",icon:"📊"},
    {label:"Manuscript Writing",icon:"✍️"},
    {label:"Literature Reviews",icon:"🔍"},
    {label:"Protocol Development",icon:"📝"},
  ];
  const statContent=(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:10}}>Statistical Tests Supported</div>
        {[["Descriptive Statistics","Mean, SD, IQR, Frequencies, Percentages"],["T-tests / ANOVA","Independent, Paired, One-way, Two-way"],["Chi-square Tests","Association & goodness-of-fit"],["Logistic Regression","Binary, ordinal, multinomial"],["Linear Regression","Simple, multiple, hierarchical"],["Survival Analysis","Kaplan-Meier, Cox regression, log-rank"],["Diagnostic Accuracy","Sensitivity, Specificity, ROC, AUC"],["Non-parametric Tests","Mann-Whitney, Kruskal-Wallis, Spearman"]].map(([n,d])=>(
          <div key={n} style={{display:"flex",alignItems:"flex-start",gap:9,padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:TEAL,flexShrink:0,marginTop:7}}/>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,color:NAVY}}>{n}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>{d}</div></div>
          </div>
        ))}
      </div>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:10}}>Software Proficiency</div>
        {[["SPSS",95],["R / RStudio",88],["GraphPad Prism",90],["STATA",80],["Microsoft Excel",98]].map(([n,p])=>(
          <div key={n} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,color:NAVY}}>{n}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:TEAL,fontWeight:600}}>Advanced</span></div>
            <div style={{height:5,background:"#E5E7EB",borderRadius:100,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(to right,${TEAL},${EMERALD})`,borderRadius:100}}/></div>
          </div>
        ))}
        <div style={{marginTop:18,background:LT,border:`1px solid ${TEAL}40`,borderRadius:11,padding:"13px 15px"}}>
          <div style={{color:TEAL,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,marginBottom:7}}>Reporting Standards Applied</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["PRISMA 2020","CONSORT","STROBE","CARE","ICMJE","EQUATOR"].map(s=><span key={s} style={{background:"white",color:NAVY,border:"1px solid #E5E7EB",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:100}}>{s}</span>)}</div>
        </div>
      </div>
    </div>
  );
  const msContent=(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {[["Abstract","Structured or unstructured; word-limited; journal-specific format"],["Introduction","Background, research gap, objectives — referenced to current literature"],["Materials & Methods","Complete methodology: design, population, variables, SAP — CONSORT/STROBE"],["Results","Narrative linked to tables and figures — pure reporting, no interpretation"],["Discussion","Clinical significance, comparison to literature, limitations, future directions"],["Conclusion","Concise, aligned to objectives, free of overclaims"]].map(([s,d])=>(
        <div key={s} style={{background:"#F8FAFB",borderRadius:11,padding:"15px 16px",border:"1.5px solid #E5E7EB"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:5}}>{s}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",lineHeight:1.6}}>{d}</div>
        </div>
      ))}
    </div>
  );
  const litContent=(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
        {[{t:"Narrative Review",d:"Broad topic summary, expert synthesis, clinical background"},{t:"Systematic Review",d:"PRISMA 2020, structured search, dual screening, GRADE"},{t:"Meta-Analysis",d:"Forest plots, pooled effects, I² heterogeneity, publication bias"}].map(r=>(
          <div key={r.t} style={{background:"#F8FAFB",borderRadius:11,padding:16,border:"1.5px solid #E5E7EB",textAlign:"center"}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:5}}>{r.t}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",lineHeight:1.6}}>{r.d}</div>
          </div>
        ))}
      </div>
      <div style={{background:LT,border:`1px solid ${TEAL}40`,borderRadius:11,padding:"15px 18px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:8}}>Review Workflow</div>
        <div style={{display:"flex",gap:0,alignItems:"center",flexWrap:"wrap",gap:4}}>
          {["PICO","PubMed Search","Screening","Data Extraction","Critical Appraisal","Evidence Synthesis","PRISMA Manuscript"].map((s,i,a)=>(
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{background:"white",border:`1px solid ${TEAL}40`,borderRadius:7,padding:"5px 11px"}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:NAVY}}>{s}</div>
              </div>
              {i<a.length-1&&<span style={{margin:"0 4px",color:TEAL,fontSize:12}}>→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const protoContent=(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:10}}>Protocol Components</div>
        {[["Title & Background","Research rationale, clinical gap, current evidence"],["PICO Framework","Population, Intervention, Comparison, Outcome"],["Study Design","Design selection with rationale — RCT, cohort, cross-sectional"],["Sample Size Calculation","Power analysis, effect size, alpha, beta — documented formula"],["Statistical Analysis Plan","Pre-specified analysis, primary & secondary outcomes"],["IRB / Ethics Section","Risk-benefit, consent procedures, data protection"]].map(([n,d])=>(
          <div key={n} style={{display:"flex",gap:9,padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:TEAL,flexShrink:0,marginTop:7}}/>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,color:NAVY}}>{n}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>{d}</div></div>
          </div>
        ))}
      </div>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:10}}>Protocol Deliverables</div>
        {["Full study protocol document","IRB/ethics application support","Sample size calculation with rationale","Statistical Analysis Plan (SAP)","Data collection forms / CRFs","Informed consent template","Timeline & milestone chart"].map(d=>(
          <div key={d} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
            <div style={{width:16,height:16,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
  const contents=[statContent,msContent,litContent,protoContent];
  return(
    <ExpandSection id="capability" label="Proof of Capability" title="Research Capabilities in Detail" sub="Click a capability to see detailed expertise, examples, and outputs." cta="Discuss Your Project">
      <div style={{display:"flex",gap:8,marginBottom:22,flexWrap:"wrap",justifyContent:"center"}}>
        {caps.map((c,i)=><button key={c.label} onClick={()=>setTab(i)} style={{background:tab===i?NAVY:"white",color:tab===i?"white":"#374151",border:`1.5px solid ${tab===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"8px 18px",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:7}}><span>{c.icon}</span>{c.label}</button>)}
      </div>
      <div style={{background:"white",borderRadius:14,padding:24,border:"1.5px solid #E5E7EB"}}>{contents[tab]}</div>
    </ExpandSection>
  );
}

function ResearchDashboard(){
  const[hov,setHov]=useState(null);
  const stages=[
    {icon:"💡",label:"Research Question",detail:"PICO framework, hypothesis, study objectives, research rationale clearly defined."},
    {icon:"📋",label:"Protocol",detail:"IRB-ready protocol, methodology selection, sample size, timeline and CRF design."},
    {icon:"🗂️",label:"Data Collection",detail:"Data tools, CRF review, standardisation, quality checks during collection."},
    {icon:"📊",label:"Statistical Analysis",detail:"Full SPSS/R/STATA analysis with test selection rationale — descriptive, inferential, regression."},
    {icon:"📋",label:"TLFs",detail:"Publication-ready Tables, Listings, Figures formatted per journal or CSR requirements."},
    {icon:"🔬",label:"Interpretation",detail:"Clinical significance, effect sizes, confidence intervals, comparison to existing literature."},
    {icon:"✍️",label:"Manuscript",detail:"Complete IMRAD manuscript — all sections written, cross-referenced, formatted."},
    {icon:"📬",label:"Submission",detail:"Target journal selection, cover letter, declarations, submission portal assistance."},
    {icon:"🔁",label:"Reviewer Response",detail:"Point-by-point rebuttal, manuscript revisions, track-changes, resubmission package."},
    {icon:"🏆",label:"Publication",detail:"Post-acceptance support, proofing review, final publication confirmation."},
  ];
  return(
    <ExpandSection id="research-dashboard" dark label="End-to-End Support" title="Research to Publication Dashboard" sub="Every stage of the research journey fully supported. Hover each milestone." cta="Start Your Journey">
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
        {stages.map((s,i)=>(
          <FI key={s.label} d={i*40}>
            <div onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{background:hov===i?"white":"rgba(255,255,255,.05)",border:`1.5px solid ${hov===i?TEAL:"rgba(255,255,255,.1)"}`,borderRadius:13,padding:16,cursor:"default",transition:"all .3s",transform:hov===i?"translateY(-3px)":"none",boxShadow:hov===i?"0 10px 28px rgba(0,0,0,.2)":"none",minHeight:120}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
                <span style={{fontSize:20}}>{s.icon}</span>
                <div style={{width:18,height:18,borderRadius:"50%",background:hov===i?TEAL:EMERALD,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
                </div>
              </div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:hov===i?NAVY:"white",marginBottom:5,transition:"color .3s"}}>{s.label}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:hov===i?"#4B5563":"rgba(255,255,255,.3)",lineHeight:1.5,transition:"color .3s"}}>{hov===i?s.detail:"Fully supported ✓"}</div>
            </div>
          </FI>
        ))}
      </div>
    </ExpandSection>
  );
}

function ProfessionalDeliverables(){
  const[open,setOpen]=useState(null);
  const items=[
    {icon:"📝",title:"Clinical Study Protocol",when:"Before any study begins — IRB, grants, institutional approval.",deliverables:["Full protocol document","PICO framework","Sample size calculation","SAP","CRF design","IRB support"],how:"Complete protocol from your research idea — study design, objectives, methodology, statistical plan, ethics documentation.",color:"#3B82F6"},
    {icon:"📐",title:"Statistical Analysis Plan (SAP)",when:"Required for RCTs, prospective studies, pre-registered research.",deliverables:["SAP document","Primary & secondary endpoints","Analysis populations","Methods justification","Sensitivity analysis","Missing data plan"],how:"Pre-specified SAP document defining all statistical analyses before data lock — protecting against post-hoc bias.",color:TEAL},
    {icon:"📋",title:"TLF Development",when:"Clinical study reports, academic publications, regulatory submissions.",deliverables:["Table shells & final tables","Patient listings","Publication figures (300 DPI)","TLF specifications","Statistical annotation","Journal-formatted outputs"],how:"Complete TLF package from raw SPSS/R output — annotated, formatted, and interpreted for each table and figure.",color:"#7C3AED"},
    {icon:"📄",title:"Clinical Study Report Support",when:"Regulatory submissions, academic and institutional reports.",deliverables:["CSR section writing","Results narrative","Methods section","TLF integration","Reference management","Regulatory formatting"],how:"Section-level or full CSR — results narrative, methods documentation, and TLF integration to ICH E3 or journal standards.",color:"#F59E0B"},
    {icon:"🔍",title:"Literature Review",when:"Protocol development, thesis background, evidence summaries.",deliverables:["Search strategy","PRISMA flow diagram","Evidence tables","Critical appraisal","Narrative synthesis","Reference library"],how:"Structured review using PubMed, Embase, Cochrane — search strategy design to evidence synthesis and write-up.",color:"#16A34A"},
    {icon:"✍️",title:"Manuscript Development",when:"Any original research intended for journal publication.",deliverables:["Complete IMRAD manuscript","Abstract","Author declarations","Cover letter","Supplementary materials","Journal formatting"],how:"Full manuscript Introduction to References — IMRAD standards, referenced to current literature, formatted for target journal.",color:"#DB2777"},
    {icon:"📬",title:"Publication Package",when:"Submission to indexed journals — PubMed, Scopus, Web of Science.",deliverables:["Formatted manuscript","Cover letter","Reviewer response letter","Resubmission package","Journal selection report","Submission checklist"],how:"Complete submission package — manuscript, declarations, portal guidance, and post-review support.",color:"#EA580C"},
    {icon:"✅",title:"Scientific Review & QC",when:"Before any manuscript or report is submitted — essential quality gate.",deliverables:["Scientific accuracy report","Data consistency check","Reference verification","Terminology review","Table/figure audit","Publication readiness score"],how:"Multi-layer scientific review: data-to-text consistency, reference accuracy, medical terminology, notation, readiness assessment.",color:"#0891B2"},
  ];
  return(
    <ExpandSection id="deliverables" label="Professional Outputs" title="Professional Research Deliverables" sub="Expand any deliverable type to see exactly what is included, when it is needed, and how I support it." cta="Request a Deliverable">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {items.map((item,i)=>(
          <div key={item.title} style={{border:`1.5px solid ${open===i?item.color:"#E5E7EB"}`,borderRadius:13,overflow:"hidden",transition:"border-color .3s",background:"white"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${item.color}08`:"white",border:"none",padding:"15px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left",gap:10}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:36,height:36,borderRadius:9,background:`${item.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{item.icon}</div>
                <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY}}>{item.title}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",marginTop:1,maxWidth:260}}>{item.when}</div></div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,transform:open===i?"rotate(180deg)":"none",transition:"transform .3s"}}><path d="M6 9l6 6 6-6" stroke={open===i?item.color:"#9CA3AF"} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {open===i&&<div style={{padding:"0 18px 18px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:item.color,letterSpacing:1,textTransform:"uppercase",marginBottom:7}}>Deliverables</div>
                {item.deliverables.map(d=><div key={d} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 0",borderBottom:"1px solid #F9FAFB"}}>
                  <div style={{width:13,height:13,borderRadius:"50%",background:`${item.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={item.color} strokeWidth="3" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#374151"}}>{d}</span>
                </div>)}
              </div>
              <div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:item.color,letterSpacing:1,textTransform:"uppercase",marginBottom:7}}>How I Support It</div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#4B5563",lineHeight:1.7,margin:"0 0 12px"}}>{item.how}</p>
                <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:5,background:item.color,color:"white",padding:"8px 14px",borderRadius:7,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11}}>Request This →</a>
              </div>
            </div>}
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function PRISMASection(){
  const[hov,setHov]=useState(null);
  const boxes=[{n:"4,821",l:"Records Identified",s:"PubMed, Embase, Cochrane, Scopus",c:"#3B82F6"},{n:"−1,204",l:"Duplicates Removed",s:"Automated + manual deduplication",c:"#F59E0B"},{n:"3,617",l:"Titles & Abstracts Screened",s:"Two independent reviewers",c:"#7C3AED"},{n:"−3,201",l:"Excluded (Title/Abstract)",s:"Irrelevant, non-clinical, non-English",c:"#EF4444"},{n:"416",l:"Full Texts Reviewed",s:"Full-text retrieval & assessment",c:TEAL},{n:"−378",l:"Excluded (Full Text)",s:"Insufficient data, wrong outcome",c:"#F59E0B"},{n:"38",l:"Studies Included",s:"Final synthesis & meta-analysis",c:"#16A34A"}];
  return(
    <ExpandSection id="prisma" dark label="Evidence Synthesis" title="Systematic Reviews & PRISMA Methodology" sub="PRISMA 2020-compliant systematic reviews with full search strategy, dual screening, and evidence synthesis." cta="Discuss Systematic Review">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:36,alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
          {boxes.map((b,i)=>(
            <div key={b.l} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{width:"100%",background:hov===i?"white":"rgba(255,255,255,.05)",border:`2px solid ${hov===i?b.c:"rgba(255,255,255,.1)"}`,borderRadius:11,padding:"11px 16px",cursor:"default",transition:"all .3s",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:9,background:`${b.c}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:800,color:b.c}}>{b.n}</span>
                </div>
                <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:hov===i?NAVY:"white",transition:"color .3s"}}>{b.l}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:hov===i?"#6B7280":"rgba(255,255,255,.3)",transition:"color .3s"}}>{b.s}</div></div>
              </div>
              {i<boxes.length-1&&<div style={{width:2,height:14,background:"rgba(255,255,255,.1)"}}/>}
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{color:"rgba(255,255,255,.35)",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>Systematic Review Deliverables</div>
          {[{i:"🔍",t:"Search Strategy",d:"MeSH terms, Boolean operators, database-specific syntax for PubMed/Embase/Cochrane."},{i:"📋",t:"PRISMA Flow Diagram",d:"Publication-ready 2020 flow diagram with exact study counts at each stage."},{i:"📑",t:"Data Extraction Forms",d:"Standardised templates for study characteristics, outcomes, and risk of bias."},{i:"⚖️",t:"Risk of Bias Assessment",d:"GRADE, Cochrane RoB 2.0, or NOS applied consistently across all studies."},{i:"📊",t:"Meta-Analysis Outputs",d:"Pooled effects, forest plots, heterogeneity (I², Q), sensitivity analysis."},{i:"📄",t:"PRISMA Manuscript",d:"Full manuscript following PRISMA 2020 checklist — submission-ready."}].map(d=>(
            <div key={d.t} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"12px 14px",display:"flex",gap:11,transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(14,122,107,.14)";e.currentTarget.style.borderColor="rgba(14,122,107,.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}>
              <span style={{fontSize:17,flexShrink:0}}>{d.i}</span>
              <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:"white",marginBottom:3}}>{d.t}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"rgba(255,255,255,.38)",lineHeight:1.5}}>{d.d}</div></div>
          </div>
          ))}
        </div>
      </div>
    </ExpandSection>
  );
}

function ReportingStandards(){
  const[open,setOpen]=useState(null);
  const stds=[
    {n:"PRISMA",full:"Preferred Reporting Items for Systematic Reviews and Meta-Analyses",when:"Systematic reviews and meta-analyses",how:"PRISMA 2020 flow diagram, checklist, and search strategy included in every systematic review.",c:"#3B82F6"},
    {n:"CONSORT",full:"Consolidated Standards of Reporting Trials",when:"Randomized controlled trials",how:"CONSORT checklist and participant flow diagram — ensuring complete, transparent RCT reporting.",c:TEAL},
    {n:"STROBE",full:"Strengthening Reporting of Observational Studies in Epidemiology",when:"Cohort, case-control, cross-sectional studies",how:"STROBE checklist applied to all observational study manuscripts.",c:"#7C3AED"},
    {n:"CARE",full:"Case Report Guidelines",when:"Case reports and case series",how:"CARE checklist for structured, peer-reviewable case report writing and publication.",c:"#F59E0B"},
    {n:"TREND",full:"Transparent Reporting of Non-randomized Designs",when:"Non-randomized intervention studies",how:"TREND checklist for non-randomized clinical and public health intervention reporting.",c:"#EF4444"},
    {n:"ARRIVE",full:"Animal Research: Reporting of In Vivo Experiments",when:"Animal research studies",how:"ARRIVE 2.0 guidelines for animal study reporting standards.",c:"#16A34A"},
    {n:"ICMJE",full:"International Committee of Medical Journal Editors",when:"All journal submissions",how:"ICMJE authorship criteria, disclosure requirements, and submission standards applied to all manuscripts.",c:"#DB2777"},
    {n:"EQUATOR",full:"Enhancing QUAlity and Transparency Of health Research",when:"All study types",how:"Full EQUATOR network guidance — selecting the correct reporting guideline for every study design.",c:"#0891B2"},
  ];
  return(
    <ExpandSection id="standards" label="Publication Standards" title="Reporting Guidelines & Standards" sub="Every manuscript follows the appropriate guideline. Expand each standard to see how it is applied." cta="Discuss Your Study Design">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {stds.map((s,i)=>(
          <div key={s.n} style={{border:`1.5px solid ${open===i?s.c:"#E5E7EB"}`,borderRadius:11,overflow:"hidden",transition:"border-color .3s"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${s.c}08`:"white",border:"none",padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:32,height:32,borderRadius:7,background:`${s.c}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:11,color:s.c}}>{s.n}</span></div>
                <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY}}>{s.n} — {s.full.split(" ").slice(0,3).join(" ")}…</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>{s.when}</div></div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,transform:open===i?"rotate(180deg)":"none",transition:"transform .3s"}}><path d="M6 9l6 6 6-6" stroke={open===i?s.c:"#9CA3AF"} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {open===i&&<div style={{padding:"0 16px 14px"}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#4B5563",lineHeight:1.7,borderTop:"1px solid #F3F4F6",paddingTop:10}}><strong style={{color:NAVY}}>Full name:</strong> {s.full}<br/><strong style={{color:NAVY}}>How I apply it:</strong> {s.how}</div>
            </div>}
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function MethodologyMatrix(){
  const[sel,setSel]=useState(0);
  const designs=[
    {name:"Cross-Sectional",icon:"🔲",desc:"Prevalence & survey research",d:["Study design & PICO","Survey tool design","Descriptive statistics","Prevalence calculations","STROBE reporting","Manuscript writing"],ms:"STROBE"},
    {name:"Case-Control",icon:"⚖️",desc:"Risk factor analysis",d:["Protocol development","OR calculation","Chi-square/regression","Matched analysis","STROBE checklist","Full manuscript"],ms:"STROBE"},
    {name:"Retrospective Cohort",icon:"🗃️",desc:"Historical record analysis",d:["Data extraction support","Survival analysis","Cox regression","Kaplan-Meier curves","STROBE reporting","Full manuscript"],ms:"STROBE"},
    {name:"Prospective Cohort",icon:"🔭",desc:"Longitudinal follow-up",d:["Protocol & SAP","IRB support","Data management","Power calculation","Interim analysis","Publication strategy"],ms:"STROBE"},
    {name:"RCT",icon:"🎲",desc:"Intervention trials",d:["Protocol writing","Randomisation plan","Sample size calculation","CONSORT reporting","ITT & PP analysis","Full manuscript"],ms:"CONSORT"},
    {name:"Case Report",icon:"📋",desc:"Unusual clinical cases",d:["CARE guideline compliance","Timeline creation","Clinical narrative","Discussion & lessons","Journal targeting","Submission support"],ms:"CARE"},
    {name:"Case Series",icon:"📚",desc:"Multiple case analysis",d:["Series design","Data extraction","Descriptive analysis","Pattern identification","Discussion synthesis","Manuscript writing"],ms:"CARE"},
    {name:"Systematic Review",icon:"🔍",desc:"Evidence synthesis",d:["PICO & search strategy","PRISMA 2020 flow","Dual screening","Data extraction forms","Risk of bias (RoB 2.0)","Narrative/meta-synthesis"],ms:"PRISMA"},
    {name:"Meta-Analysis",icon:"📊",desc:"Quantitative pooling",d:["Effect size calculation","Forest plot generation","Heterogeneity (I²)","Sensitivity analysis","Publication bias","PRISMA manuscript"],ms:"PRISMA"},
    {name:"Protocol Dev.",icon:"📝",desc:"Research planning & IRB",d:["PICO framework","Study design rationale","Sample size formula","SAP development","IRB formatting","CRF design"],ms:"EQUATOR"},
  ];
  return(
    <ExpandSection id="methodology" label="Research Capability" title="Research Methodology Matrix" sub="Click any study design to see supported methodology, deliverables, and reporting standard." cta="Discuss Your Study Design">
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:9,marginBottom:22}}>
        {designs.map((d,i)=>(
          <button key={d.name} onClick={()=>setSel(i)} style={{background:sel===i?NAVY:"white",border:`1.5px solid ${sel===i?NAVY:"#E5E7EB"}`,borderRadius:11,padding:"13px 10px",cursor:"pointer",transition:"all .2s",textAlign:"center"}}>
            <div style={{fontSize:18,marginBottom:5}}>{d.icon}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:sel===i?"white":NAVY,lineHeight:1.3}}>{d.name}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:sel===i?"rgba(255,255,255,.4)":"#9CA3AF",marginTop:2}}>{d.desc}</div>
          </button>
        ))}
      </div>
      <FI>
        <div style={{background:"white",borderRadius:14,padding:24,border:"1.5px solid #E5E7EB",display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:22}}>{designs[sel].icon}</span>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:NAVY}}>{designs[sel].name}</div>
              <span style={{background:LT,color:TEAL,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:100}}>{designs[sel].ms}</span>
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#4B5563",lineHeight:1.7,margin:"0 0 14px"}}>{designs[sel].desc} — full methodology and publication support provided.</p>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {designs[sel].d.map(d=>(
                <div key={d} style={{display:"flex",alignItems:"center",gap:8,background:"#F8FAFB",borderRadius:7,padding:"8px 11px"}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:NAVY,borderRadius:12,padding:22,display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{color:"rgba(255,255,255,.35)",fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Reporting Standard</div>
            <div style={{color:"#34D399",fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:8}}>{designs[sel].ms}</div>
            <div style={{color:"rgba(255,255,255,.45)",fontFamily:"'DM Sans',sans-serif",fontSize:12,lineHeight:1.7,marginBottom:18}}>Every {designs[sel].name.toLowerCase()} follows {designs[sel].ms} reporting guidelines — checklist included in final deliverable.</div>
            <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:7,background:TEAL,color:"white",padding:"10px 18px",borderRadius:9,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12}}>Discuss This Design →</a>
          </div>
        </div>
      </FI>
    </ExpandSection>
  );
}

function WhoIHelp(){
  const clients=[
    {e:"🎓",t:"MBBS Students",tag:"Thesis & Research",d:"Final-year research support — study design, data analysis, thesis writing.",c:"#3B82F6"},
    {e:"🩺",t:"MD/MS Residents",tag:"Thesis Completion",d:"Residency thesis — synopsis to final submission without compromising clinical duties.",c:TEAL},
    {e:"🔬",t:"DM/MCh Fellows",tag:"Subspecialty Research",d:"Superspecialty research with nuanced methodology for complex clinical datasets.",c:"#7C3AED"},
    {e:"👨‍🏫",t:"Medical Faculty",tag:"Publications & Profile",d:"Build your academic profile with indexed publications and strong research methodology.",c:"#F59E0B"},
    {e:"🏥",t:"Hospital Researchers",tag:"Retrospective Studies",d:"Transform years of retrospective institutional data into publication-ready research.",c:"#16A34A"},
    {e:"💼",t:"Practicing Physicians",tag:"Case Reports & Series",d:"Interesting clinical cases deserve publication — structured case report support.",c:"#DB2777"},
  ];
  return(
    <ExpandSection id="who" label="Ideal Clients" title="Who I Work With" sub="From final-year MBBS students to senior consultants — every stage of medical career." cta="Book a Free Consultation">
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {clients.map((c,i)=>(
          <FI key={c.t} d={i*50}>
            <div style={{background:"#F8FAFB",borderRadius:13,padding:22,border:"1.5px solid #E5E7EB",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="white";e.currentTarget.style.borderColor=c.c;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 20px ${c.c}14`;}}
              onMouseLeave={e=>{e.currentTarget.style.background="#F8FAFB";e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontSize:30,marginBottom:10}}>{c.e}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,color:NAVY}}>{c.t}</div>
              </div>
              <div style={{background:`${c.c}18`,color:c.c,fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif",padding:"2px 9px",borderRadius:100,display:"inline-block",marginBottom:9}}>{c.tag}</div>
              <p style={{color:"#6B7280",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.7,margin:0}}>{c.d}</p>
            </div>
          </FI>
        ))}
      </div>
    </ExpandSection>
  );
}

function SpecialtiesSection(){
  const[open,setOpen]=useState(null);
  const specs=[
    {n:"Internal Medicine",i:"🫀",d:"Hypertension, DM, CKD, metabolic syndrome — prospective and retrospective study support."},
    {n:"Cardiology",i:"❤️",d:"CV outcomes research, RCT support, ECG/echo data, cardiovascular risk stratification."},
    {n:"Endocrinology",i:"⚗️",d:"Glycaemic control studies, hormonal assay interpretation, thyroid and adrenal research."},
    {n:"Pulmonology",i:"🫁",d:"Spirometry data, COPD outcomes, lung function analysis, respiratory trial support."},
    {n:"Nephrology",i:"🩺",d:"eGFR analysis, CKD staging, dialysis outcomes, renal replacement therapy research."},
    {n:"Neurology",i:"🧠",d:"Stroke outcomes, cognitive scores, neurological rating scales, MRI data integration."},
    {n:"Psychiatry",i:"🧩",d:"Validated psychiatric scales (PHQ-9, GAF, PANSS), mental health outcomes research."},
    {n:"Oncology",i:"🎗️",d:"Survival analysis, response rates, RECIST criteria, oncology RCT support."},
    {n:"Pediatrics",i:"👶",d:"Growth chart analysis, paediatric scoring systems, developmental outcome studies."},
    {n:"Orthopedics",i:"🦴",d:"Functional scores (VAS, KOOS, SF-36), implant registry, surgical outcomes."},
    {n:"General Surgery",i:"🏥",d:"Post-operative outcomes, complication analysis, surgical technique comparison."},
    {n:"Obstetrics & Gynecology",i:"🌸",d:"Maternal outcomes, fertility analysis, hormonal data, obstetric complication studies."},
    {n:"Ophthalmology",i:"👁️",d:"Visual acuity, IOP data, retinal imaging outcomes, ophthalmic trial support."},
    {n:"ENT",i:"👂",d:"Audiological data, surgical outcome studies, nasal/sinus scoring systems."},
    {n:"Critical Care",i:"⚡",d:"ICU outcome data, APACHE/SOFA scores, ventilator parameters, sepsis research."},
    {n:"Infectious Disease",i:"🦠",d:"Antimicrobial resistance, outbreak data, infection control research."},
    {n:"Dermatology",i:"🔬",d:"PASI/DLQI scores, dermatological outcome research."},
    {n:"Community Medicine",i:"🏘️",d:"Epidemiological studies, public health surveys, community intervention research."},
  ];
  return(
    <ExpandSection id="specialties" dark label="Clinical Scope" title="Specialties Supported" sub="Research methodology and manuscript support across all major medical specialties." cta="Discuss Your Specialty">
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:9,marginBottom:14}}>
        {specs.map((s,i)=>(
          <FI key={s.n} d={i*18}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?TEAL:"rgba(255,255,255,.04)",border:`1px solid ${open===i?TEAL:"rgba(255,255,255,.09)"}`,borderRadius:11,padding:"13px 8px",cursor:"pointer",textAlign:"center",transition:"all .3s",transform:open===i?"translateY(-2px)":"none"}}>
              <div style={{fontSize:20,marginBottom:5}}>{s.i}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:600,color:open===i?"white":"rgba(255,255,255,.6)",lineHeight:1.3}}>{s.n}</div>
            </button>
          </FI>
        ))}
      </div>
      {open!==null&&<FI>
        <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.14)",borderRadius:12,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:26}}>{specs[open].i}</span>
          <div>
            <div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,marginBottom:3}}>{specs[open].n}</div>
            <div style={{color:"rgba(255,255,255,.55)",fontFamily:"'DM Sans',sans-serif",fontSize:12,lineHeight:1.6}}>{specs[open].d}</div>
          </div>
          <a href="#contact" style={{marginLeft:"auto",flexShrink:0,background:TEAL,color:"white",padding:"8px 14px",borderRadius:7,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,whiteSpace:"nowrap"}}>Discuss →</a>
        </div>
      </FI>}
      <div style={{marginTop:12,background:"rgba(14,122,107,.11)",border:"1px solid rgba(14,122,107,.22)",borderRadius:10,padding:"11px 16px",textAlign:"center"}}>
        <span style={{color:"rgba(255,255,255,.45)",fontFamily:"'DM Sans',sans-serif",fontSize:12}}>Additional specialties supported based on study design. <a href="#contact" style={{color:"#34D399",textDecoration:"none",fontWeight:600}}>Contact to discuss →</a></span>
      </div>
    </ExpandSection>
  );
}

function AIQualitySection(){
  const[tab,setTab]=useState(0);
  const aiFeats=[
    {i:"🤖",t:"AI-Assisted Manuscript Review",d:"AI tools flag inconsistencies, passive voice overuse, logical gaps, and structural weaknesses before manuscripts reach reviewers."},
    {i:"📚",t:"AI-Assisted Literature Screening",d:"Accelerated abstract screening — AI identifies relevant studies faster, with human expert validation of every included study."},
    {i:"🔍",t:"Scientific Consistency Review",d:"Automated cross-checking of data reported in text, tables, and figures for complete consistency throughout."},
    {i:"📎",t:"Reference Verification",d:"AI-assisted citation checking — journal names, volumes, pages, and DOI validity verified systematically."},
    {i:"✅",t:"Quality Control Review",d:"Multi-layer QC: methodology reporting, statistical notation, terminology, and journal guideline compliance."},
    {i:"🛡️",t:"Hallucination Detection",d:"Human-expert review of all AI-assisted content — ensuring every statement is evidence-based and correctly referenced."},
    {i:"📊",t:"Publication Readiness Assessment",d:"Structured scoring against journal criteria before submission — identifying issues before reviewers do."},
    {i:"✏️",t:"Scientific Editing",d:"Precision editing for clarity, conciseness, and scientific tone — maintaining your voice while meeting journal standards."},
  ];
  const qcItems=[
    {i:"🔬",t:"Scientific Accuracy Review",d:"Every factual claim verified against cited sources. No unsupported statements in the final manuscript."},
    {i:"📊",t:"Data-to-Text Verification",d:"All numbers in text, tables, and figures cross-checked against original analysis output for 100% consistency."},
    {i:"📎",t:"Reference Verification",d:"Every citation checked: journal name, volume, pages, DOI, year — no phantom references or incorrect attributions."},
    {i:"🔄",t:"Consistency Review",d:"Terminology, abbreviations, units, and statistical notation verified for consistency throughout."},
    {i:"⚕️",t:"Medical Accuracy Review",d:"Drug names, dosages, anatomical terms, and clinical definitions reviewed for accuracy and current standards."},
    {i:"📋",t:"Table & Figure Review",d:"Tables and figures cross-checked against text narrative for alignment, labeling, and journal format compliance."},
    {i:"✅",t:"Publication Readiness",d:"Final checklist against target journal's author guidelines — word count, format, required sections, declarations."},
    {i:"🤖",t:"AI Content Review",d:"Where AI tools assist drafting, all output verified by human expert review for scientific accuracy."},
  ];
  return(
    <ExpandSection id="quality" label="Quality Assurance" title="Human Expertise + AI-Assisted Quality Review" sub="Expert methodology combined with AI efficiency — delivering higher-quality output in less time." cta="Request a Quality Review">
      <div style={{background:NAVY,borderRadius:14,padding:"20px 26px",marginBottom:20,display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:18,alignItems:"center"}}>
        {[{e:"👨‍🔬",t:"Human Expert",d:"Research methodology, clinical understanding, scientific judgement"},{e:"",t:"",d:""},{e:"🤖",t:"AI-Assisted Efficiency",d:"Faster screening, consistency checks, quality control, error detection"}].map((c,i)=>{
          if(i===1)return<div key="plus" style={{textAlign:"center"}}><div style={{width:40,height:40,borderRadius:"50%",background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 5px"}}><span style={{color:"white",fontSize:16,fontWeight:800}}>+</span></div><div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700}}>= Better Output</div></div>;
          return<div key={c.t} style={{textAlign:"center"}}><div style={{fontSize:26,marginBottom:5}}>{c.e}</div><div style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,marginBottom:3}}>{c.t}</div><div style={{color:"rgba(255,255,255,.38)",fontFamily:"'DM Sans',sans-serif",fontSize:11}}>{c.d}</div></div>;
        })}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:18,justifyContent:"center"}}>
        {["AI-Enhanced Features","Quality Control Process"].map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?NAVY:"white",color:tab===i?"white":"#374151",border:`1.5px solid ${tab===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"8px 18px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s"}}>{t}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
        {(tab===0?aiFeats:qcItems).map(f=>(
          <div key={f.t} style={{background:"#F8FAFB",borderRadius:12,padding:16,border:"1.5px solid #E5E7EB",transition:"all .3s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=LT;e.currentTarget.style.borderColor=TEAL;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#F8FAFB";e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.transform="none";}}>
            <div style={{fontSize:20,marginBottom:9}}>{f.i}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:5}}>{f.t}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",lineHeight:1.6}}>{f.d}</div>
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function ClientPsychology(){
  const without=["Thesis deadline missed or extended","Wrong statistical test applied","Journal rejection due to methodology","Tables formatted incorrectly","Unable to respond to reviewer comments","Data collected but never published","Months wasted on failed submissions","Missed career promotion opportunity"];
  const with_=["Clear methodology from day one","Appropriate statistical analysis selected","Manuscript formatted to journal standards","Thesis completed on time","Reviewer responses handled professionally","Data transformed into indexed publication","Fast, structured submission process","Academic profile strengthened"];
  return(
    <ExpandSection id="why-support" dark label="The Reality" title="Why Researchers Seek Professional Support" sub="The difference between struggling alone and publishing successfully is structured expert support." cta="Book a Free Consultation">
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:22,alignItems:"stretch"}}>
        <div style={{background:"rgba(239,68,68,.08)",border:"2px solid rgba(239,68,68,.2)",borderRadius:16,padding:26}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
            <div style={{width:38,height:38,borderRadius:9,background:"rgba(239,68,68,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg></div>
            <div><div style={{color:"#FCA5A5",fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:14}}>Without Structured Support</div><div style={{color:"rgba(255,255,255,.3)",fontFamily:"'DM Sans',sans-serif",fontSize:10}}>Common outcomes</div></div>
          </div>
          {without.map(x=><div key={x} style={{display:"flex",gap:9,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(239,68,68,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></svg></div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,.45)",lineHeight:1.5}}>{x}</span>
          </div>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 9px rgba(14,122,107,.14)"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg></div>
          <div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,textAlign:"center"}}>Expert<br/>Support</div>
        </div>
        <div style={{background:"rgba(14,122,107,.1)",border:"2px solid rgba(14,122,107,.28)",borderRadius:16,padding:26}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
            <div style={{width:38,height:38,borderRadius:9,background:"rgba(14,122,107,.28)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#34D399" strokeWidth="2"/></svg></div>
            <div><div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:14}}>With Structured Support</div><div style={{color:"rgba(255,255,255,.3)",fontFamily:"'DM Sans',sans-serif",fontSize:10}}>What becomes possible</div></div>
          </div>
          {with_.map(x=><div key={x} style={{display:"flex",gap:9,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(14,122,107,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#34D399" strokeWidth="3" strokeLinecap="round"/></svg></div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,.72)",lineHeight:1.5}}>{x}</span>
          </div>)}
        </div>
      </div>
    </ExpandSection>
  );
}

function Packages(){
  const pkgs=[
    {icon:"📘",title:"Thesis Support",tag:"Students & Residents",desc:"Complete thesis journey from synopsis to final submission.",features:["Synopsis & protocol writing","Literature review","Statistical analysis plan","Data analysis & interpretation","Thesis writing (all chapters)","Formatting & submission"],cta:"Discuss Thesis",hi:false},
    {icon:"📊",title:"Data Analysis + Manuscript",tag:"Most Popular",desc:"Transform your data into a publication-ready manuscript.",features:["Data cleaning & validation","Full statistical analysis","Publication-ready tables & figures","Complete IMRAD manuscript","Journal formatting","Submission-ready package"],cta:"Start Manuscript",hi:true},
    {icon:"📬",title:"Publication Support",tag:"Submitted Authors",desc:"Navigate post-submission with expert guidance.",features:["Journal selection strategy","Cover letter writing","Submission assistance","Reviewer response drafting","Manuscript revision","Resubmission support"],cta:"Get Support",hi:false},
    {icon:"🏆",title:"End-to-End Research",tag:"Premium Package",desc:"From research question to indexed publication — fully supported.",features:["All Thesis Support services","All Analysis + Manuscript services","All Publication Support services","Unlimited revisions","Priority turnaround","1-year post-publication support"],cta:"Enquire Now",hi:false},
  ];
  return(
    <section id="packages" style={{padding:"72px 2rem",background:"#F8FAFB",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:44}}>
            <div style={{marginBottom:10}}><Chip>Packages</Chip></div>
            <SectionTitle sub="All packages include a personalised consultation call and dedicated project management.">Choose Your Research Journey</SectionTitle>
          </div>
        </FI>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {pkgs.map((p,i)=>(
            <FI key={p.title} d={i*60}>
              <div style={{background:p.hi?NAVY:"white",borderRadius:16,padding:24,border:p.hi?"none":"1.5px solid #E5E7EB",position:"relative",overflow:"hidden",boxShadow:p.hi?"0 18px 56px rgba(11,29,58,.25)":"none",transform:p.hi?"scale(1.02)":"none",height:"100%",display:"flex",flexDirection:"column"}}>
                {p.hi&&<div style={{position:"absolute",top:0,left:0,right:0,height:4,background:`linear-gradient(to right,${TEAL},${EMERALD})`}}/>}
                <div style={{fontSize:28,marginBottom:9}}>{p.icon}</div>
                <div style={{background:p.hi?"rgba(14,122,107,.3)":LT,color:p.hi?"#34D399":TEAL,fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif",padding:"2px 9px",borderRadius:100,display:"inline-block",marginBottom:7}}>{p.tag}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,color:p.hi?"white":NAVY,margin:"0 0 7px"}}>{p.title}</h3>
                <p style={{color:p.hi?"rgba(255,255,255,.45)":"#6B7280",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,margin:"0 0 14px"}}>{p.desc}</p>
                <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:18,flex:1}}>
                  {p.features.map(f=><div key={f} style={{display:"flex",alignItems:"flex-start",gap:7}}>
                    <div style={{width:13,height:13,borderRadius:"50%",background:p.hi?"rgba(14,122,107,.3)":"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={p.hi?"#34D399":"#16A34A"} strokeWidth="3" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:p.hi?"rgba(255,255,255,.65)":"#374151"}}>{f}</span>
                  </div>)}
                </div>
                <a href="#contact" style={{display:"block",textAlign:"center",padding:"10px",borderRadius:9,background:p.hi?TEAL:"transparent",border:p.hi?"none":`1.5px solid ${NAVY}`,color:p.hi?"white":NAVY,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,textDecoration:"none"}}>{p.cta}</a>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ(){
  const[open,setOpen]=useState(null);
  const faqs=[
    {q:"What information do I need to share to get started?",a:"Share your dataset (any format), study objectives, existing drafts, target journal (if decided), and your timeline. A free 30-minute consultation call covers anything unclear — no preparation required."},
    {q:"Can you help if my data is already collected but not analysed?",a:"This is the most common scenario. You share your dataset (Excel, SPSS, CSV), I clean and validate it, run the appropriate statistical analysis, and produce publication-ready tables and figures with a full interpretation report."},
    {q:"How long does it take to write a full manuscript?",a:"A standard IMRAD manuscript takes 3–5 weeks from receiving your data and analysis. Thesis support takes 8–14 weeks. Systematic reviews typically take 8–12 weeks. Rush timelines available."},
    {q:"Can you help with MD thesis specific to my university format?",a:"Yes — I have experience with NMC guidelines and various institutional formats. Your thesis will be formatted to comply with your institution's submission standards."},
    {q:"Do you handle reviewer responses?",a:"Yes. I prepare a point-by-point response letter addressing every reviewer comment, along with a revised manuscript. Included in publication support and end-to-end packages."},
    {q:"Is confidentiality maintained?",a:"All your data, clinical records, and research materials are handled with strict confidentiality. I do not share, publish, or use your data for any purpose other than your project."},
    {q:"What if I have no idea which journal to target?",a:"Journal selection is part of my publication support. I assess your manuscript's scope, methodology, novelty, and sample size, then recommend indexed journals (PubMed/Scopus) matching your study."},
    {q:"What types of studies can you support?",a:"Retrospective and prospective clinical studies, case reports and series, cross-sectional and cohort studies, RCTs, systematic reviews and meta-analyses, MD/MS/DM theses."},
  ];
  return(
    <section id="faq" style={{padding:"72px 2rem",background:"white",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{marginBottom:10}}><Chip>FAQ</Chip></div>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
          </div>
        </FI>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {faqs.map((f,i)=>(
            <FI key={f.q} d={i*35}>
              <div style={{border:`1.5px solid ${open===i?TEAL:"#E5E7EB"}`,borderRadius:11,overflow:"hidden",transition:"border-color .3s"}}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left"}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY,paddingRight:12}}>{f.q}</span>
                  <div style={{width:24,height:24,borderRadius:"50%",background:open===i?TEAL:LT,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s"}}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{transform:open===i?"rotate(45deg)":"none",transition:"transform .3s"}}><path d="M12 5v14M5 12h14" stroke={open===i?"white":TEAL} strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </div>
                </button>
                {open===i&&<div style={{padding:"0 20px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#4B5563",lineHeight:1.75}}>{f.a}</div>}
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection(){
  return(
    <section id="contact" style={{padding:"90px 2rem",background:NAVY,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,right:-80,width:420,height:420,borderRadius:"50%",background:"rgba(14,122,107,.07)",pointerEvents:"none"}}/>
      <div style={{maxWidth:860,margin:"0 auto",position:"relative"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:44}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3.8vw,48px)",color:"white",fontWeight:700,margin:"0 0 14px",lineHeight:1.2}}>Ready to Transform Your Research?</h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:17,fontFamily:"'DM Sans',sans-serif",margin:"0 0 6px"}}>Share your data or project — I'll take it from there.</p>
            <p style={{color:"rgba(255,255,255,.3)",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Free 30-minute consultation. No commitment required.</p>
          </div>
        </FI>
        <FI d={80}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:40}}>
            {[{i:"📧",l:"Email",v:"consult@researchmd.in",h:"mailto:consult@researchmd.in"},{i:"💬",l:"WhatsApp",v:"Message directly",h:"#"},{i:"🔗",l:"LinkedIn",v:"Connect & Message",h:"#"},{i:"📅",l:"Book a Call",v:"30-min Consultation",h:"#"}].map(c=>(
              <a key={c.l} href={c.h} style={{display:"block",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:13,padding:"18px 14px",textDecoration:"none",textAlign:"center",transition:"all .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(14,122,107,.2)";e.currentTarget.style.borderColor="rgba(14,122,107,.4)";e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor="rgba(255,255,255,.09)";e.currentTarget.style.transform="none";}}>
                <div style={{fontSize:24,marginBottom:5}}>{c.i}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:"#34D399",marginBottom:2}}>{c.l}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"rgba(255,255,255,.35)"}}>{c.v}</div>
              </a>
            ))}
          </div>
        </FI>
        <FI d={160}>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:"32px 40px"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{color:"rgba(255,255,255,.7)",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:16,marginBottom:3}}>Send a Message</div>
              <div style={{color:"rgba(255,255,255,.3)",fontFamily:"'DM Sans',sans-serif",fontSize:12}}>I'll respond within 24 hours with a personalised plan.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              {[["Full Name","Dr. Priya Sharma"],["Specialty / Degree","MD Internal Medicine"],["Email Address","drpriya@email.com"],["WhatsApp Number","+91 98XXX XXXXX"]].map(([l,ph])=>(
                <div key={l}>
                  <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:"rgba(255,255,255,.4)",display:"block",marginBottom:5}}>{l}</label>
                  <input type="text" placeholder={ph} style={{width:"100%",padding:"10px 13px",borderRadius:8,border:"1px solid rgba(255,255,255,.11)",background:"rgba(255,255,255,.06)",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none"}}/>
                </div>
              ))}
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:"rgba(255,255,255,.4)",display:"block",marginBottom:5}}>Describe your research project or question</label>
              <textarea rows={4} placeholder="I have data from a retrospective study on hypertension outcomes. I need statistical analysis and a manuscript for an indexed journal..." style={{width:"100%",padding:"10px 13px",borderRadius:8,border:"1px solid rgba(255,255,255,.11)",background:"rgba(255,255,255,.06)",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none",resize:"vertical"}}/>
            </div>
            <button style={{width:"100%",background:TEAL,color:"white",border:"none",padding:"14px",borderRadius:10,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,transition:"background .2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#0a6659"}
              onMouseLeave={e=>e.currentTarget.style.background=TEAL}>
              Send Message & Book Consultation
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </FI>
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer style={{background:"#060E1E",padding:"24px 2rem",borderTop:"1px solid rgba(255,255,255,.05)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:24,height:24,borderRadius:6,background:TEAL,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M10 8v4M8 10h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{color:"rgba(255,255,255,.4)",fontFamily:"'DM Sans',sans-serif",fontSize:12}}>ResearchMD — Medical Research & Publication Consultant</span>
        </div>
        <div style={{display:"flex",gap:18}}>
          {["Dashboard","Scenarios","Specialties","Packages","Contact"].map(l=><a key={l} href={`#${l.toLowerCase()}`} style={{color:"rgba(255,255,255,.25)",fontFamily:"'DM Sans',sans-serif",fontSize:11,textDecoration:"none"}}>{l}</a>)}
        </div>
        <div style={{color:"rgba(255,255,255,.2)",fontFamily:"'DM Sans',sans-serif",fontSize:10}}>© 2025 ResearchMD. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function App(){
  return(
    <div>
      <Navbar/>
      <Hero/>
      <Dashboard/>
      <ProblemSection/>
      <ClientScenarios/>
      <SPSSWorkflow/>
      <TLFGallery/>
      <PublicationFigures/>
      <CapabilitySection/>
      <ResearchDashboard/>
      <ProfessionalDeliverables/>
      <PRISMASection/>
      <ReportingStandards/>
      <MethodologyMatrix/>
      <WhoIHelp/>
      <SpecialtiesSection/>
      <AIQualitySection/>
      <ClientPsychology/>
      <Packages/>
      <FAQ/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
