import { useState, useEffect, useRef } from "react";

const NAVY="#0B1D3A",TEAL="#0E7A6B",EMERALD="#059669",LT="#E6F5F2",LN="#EEF1F7";
const EMAIL="scientificwriter05@gmail.com";
const PHONE="+91 76088 47619";
const WA_LINK="https://wa.me/917608847619";
const LINKEDIN_URL="https://www.linkedin.com/in/binay-naik-medicalwriter-statistician";

/* ── Responsive breakpoint hook ─────────────────────────── */
function useW(){
  const[w,sw]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{
    const f=()=>sw(window.innerWidth);
    window.addEventListener("resize",f);
    return()=>window.removeEventListener("resize",f);
  },[]);
  return w;
}
/* Grid helper: returns CSS gridTemplateColumns based on width */
function cols(w,desktop,tablet=2,mobile=1){
  if(w>=1024)return`repeat(${desktop},1fr)`;
  if(w>=640)return`repeat(${tablet},1fr)`;
  return`repeat(${mobile},1fr)`;
}

function useInView(t=0.1){
  const ref=useRef(null);const[v,sv]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true)},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return[ref,v];
}
function FI({children,d=0,style={}}){
  const[r,v]=useInView();
  return<div ref={r} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:`opacity .6s ease ${d}ms,transform .6s ease ${d}ms`,...style}}>{children}</div>;
}
function Chip({children,color=TEAL}){
  return<span style={{display:"inline-block",background:`${color}18`,color,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,padding:"4px 12px",borderRadius:100,letterSpacing:1,textTransform:"uppercase"}}>{children}</span>;
}
function SectionTitle({children,light=false,sub}){
  return<div style={{textAlign:"center",marginBottom:sub?20:44}}>
    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,40px)",color:light?"white":NAVY,fontWeight:700,margin:"0 0 10px",lineHeight:1.2}}>{children}</h2>
    {sub&&<p style={{color:light?"rgba(255,255,255,.5)":"#6B7280",fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(13px,1.8vw,15px)",maxWidth:540,margin:"0 auto",lineHeight:1.7}}>{sub}</p>}
  </div>;
}

function ExpandSection({id,label,title,sub,dark=false,cta,children}){
  const[open,setOpen]=useState(false);
  const w=useW();
  const bg=dark?NAVY:"#F8FAFB";
  const tc=dark?"white":NAVY;
  const px=w<640?"1.2rem":"2rem";
  return(
    <section id={id} style={{background:bg,padding:`48px ${px}`,borderBottom:`1px solid ${dark?"rgba(255,255,255,.06)":"#E5E7EB"}`}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:open?32:0}}>
            {label&&<div style={{marginBottom:10}}><Chip color={dark?"#34D399":TEAL}>{label}</Chip></div>}
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,2.6vw,36px)",color:tc,fontWeight:700,margin:"0 0 8px"}}>{title}</h2>
            {sub&&<p style={{color:dark?"rgba(255,255,255,.45)":"#6B7280",fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(12px,1.6vw,14px)",maxWidth:520,margin:"0 auto 16px",lineHeight:1.7}}>{sub}</p>}
            <button onClick={()=>setOpen(o=>!o)} style={{display:"inline-flex",alignItems:"center",gap:8,background:open?(dark?"rgba(255,255,255,.08)":NAVY):(dark?TEAL:TEAL),color:"white",border:"none",borderRadius:10,padding:"10px 22px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",minHeight:44,WebkitTapHighlightColor:"transparent"}}>
              {open?"Collapse ↑":`Explore ${title.split(" ").slice(0,2).join(" ")} →`}
            </button>
          </div>
        </FI>
        {open&&<FI d={80}><div style={{marginTop:24}}>{children}</div></FI>}
        {open&&cta&&<div style={{marginTop:32,textAlign:"center"}}><a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:8,background:TEAL,color:"white",padding:"12px 26px",borderRadius:10,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14}}>{cta} →</a></div>}
      </div>
    </section>
  );
}

/* ── Floating WhatsApp Button ─────────────────────────────── */
function FloatingWA(){
  const[hov,setHov]=useState(false);
  return(
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        position:"fixed",bottom:24,right:24,zIndex:999,
        width:56,height:56,borderRadius:"50%",
        background:hov?"#1ebe57":"#25D366",
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 4px 20px rgba(37,211,102,.45)",
        transition:"all .3s",
        transform:hov?"scale(1.12)":"scale(1)",
        WebkitTapHighlightColor:"transparent",textDecoration:"none"
      }}
      title="Chat on WhatsApp"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.333a.5.5 0 00.613.613l5.475-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.52-5.16-1.425l-.37-.22-3.25.877.877-3.25-.22-.37A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </a>
  );
}

function Navbar(){
  const[s,ss]=useState(false);
  const[mob,setMob]=useState(false);
  const w=useW();
  useEffect(()=>{const f=()=>ss(window.scrollY>40);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f);},[]);
  const links=[["Dashboard","#dashboard"],["Scenarios","#scenarios"],["Capability","#capability"],["Specialties","#specialties"],["Packages","#packages"],["FAQ","#faq"]];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:s||mob?"rgba(11,29,58,.97)":"transparent",backdropFilter:"blur(12px)",borderBottom:s||mob?"1px solid rgba(255,255,255,.07)":"none",transition:"all .3s",padding:"0 1.2rem"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:30,height:30,borderRadius:7,background:TEAL,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M10 8v4M8 10h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{color:"white",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16}}>ResearchMD</span>
        </div>
        {w>=900?(
          <div style={{display:"flex",gap:18,alignItems:"center"}}>
            {links.map(([l,h])=><a key={l} href={h} style={{color:"rgba(255,255,255,.65)",textDecoration:"none",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500}} onMouseEnter={e=>e.target.style.color="white"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.65)"}>{l}</a>)}
            <a href="#contact" style={{background:TEAL,color:"white",padding:"8px 18px",borderRadius:8,textDecoration:"none",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>Book Consultation</a>
          </div>
        ):(
          <button onClick={()=>setMob(m=>!m)} style={{background:"none",border:"none",cursor:"pointer",padding:8,display:"flex",flexDirection:"column",gap:5,WebkitTapHighlightColor:"transparent"}}>
            {[0,1,2].map(i=><div key={i} style={{width:22,height:2,background:"white",borderRadius:2,transition:"all .3s",transform:mob&&i===0?"rotate(45deg) translateY(7px)":mob&&i===2?"rotate(-45deg) translateY(-7px)":"none",opacity:mob&&i===1?0:1}}/>)}
          </button>
        )}
      </div>
      {mob&&w<900&&(
        <div style={{background:"rgba(11,29,58,.97)",padding:"12px 1.2rem 20px",borderTop:"1px solid rgba(255,255,255,.07)"}}>
          {links.map(([l,h])=><a key={l} href={h} onClick={()=>setMob(false)} style={{display:"block",color:"rgba(255,255,255,.75)",textDecoration:"none",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:500,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>{l}</a>)}
          <a href="#contact" onClick={()=>setMob(false)} style={{display:"block",marginTop:14,background:TEAL,color:"white",padding:"12px",borderRadius:9,textDecoration:"none",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:700,textAlign:"center"}}>Book Free Consultation</a>
        </div>
      )}
    </nav>
  );
}

function Hero(){
  const[a,sa]=useState(0);
  const w=useW();
  useEffect(()=>{const t=setInterval(()=>sa(x=>(x+1)%4),2000);return()=>clearInterval(t);},[]);
  const steps=["Research Idea","Data Analysis","Manuscript","Publication"];
  const sublabels=["Raw data & hypothesis","SPSS/R/STATA analysis","IMRAD manuscript","Indexed journal"];
  const isMob=w<768;
  return(
    <section style={{minHeight:"100vh",background:NAVY,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",padding:isMob?"80px 1.2rem 48px":"100px 2rem 60px"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fff}@keyframes p2{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}`}</style>
      <div style={{position:"absolute",top:-100,right:-80,width:400,height:400,borderRadius:"50%",background:"rgba(14,122,107,.07)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:isMob?"1fr":w<1024?"1fr":"1fr 1fr",gap:isMob?32:48,alignItems:"center"}}>
        <div>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(14,122,107,.2)",border:"1px solid rgba(14,122,107,.4)",borderRadius:100,padding:"5px 14px",marginBottom:22}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:EMERALD,animation:"p2 2s ease-in-out infinite"}}/>
            <span style={{color:"#6EE7B7",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Medical Research & Publication Consultant</span>
          </div>
          <h1 style={{color:"white",fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,50px)",fontWeight:700,lineHeight:1.13,margin:"0 0 18px"}}>
            Turn Your Clinical Data, Thesis, or Research Idea Into a{" "}
            <span style={{color:"#34D399"}}>Publication-Ready Scientific Manuscript</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:"clamp(14px,1.8vw,16px)",fontFamily:"'DM Sans',sans-serif",lineHeight:1.75,margin:"0 0 16px"}}>Thesis development · Statistical analysis · Manuscript writing · Journal submission — every step guided by evidence-based methodology.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:28}}>
            {["Thesis Support ✓","Statistical Analysis ✓","Manuscript Writing ✓","Publication Support ✓","Reviewer Responses ✓"].map(b=><span key={b} style={{background:"rgba(52,211,153,.12)",border:"1px solid rgba(52,211,153,.3)",color:"#6EE7B7",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600,padding:"4px 10px",borderRadius:100}}>{b}</span>)}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <a href="#contact" style={{background:TEAL,color:"white",padding:"13px 24px",borderRadius:10,textDecoration:"none",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:700,display:"inline-flex",alignItems:"center",gap:7,minHeight:44}}>Book Free Consultation →</a>
            <a href="#dashboard" style={{background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.2)",color:"white",padding:"13px 24px",borderRadius:10,textDecoration:"none",fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:600,minHeight:44,display:"inline-flex",alignItems:"center"}}>Explore Services →</a>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:0,marginTop:32,paddingTop:22,borderTop:"1px solid rgba(255,255,255,.1)"}}>
            {[{i:"📐",l:"Research Methodology"},{i:"📊",l:"Statistical Analysis"},{i:"✍️",l:"Scientific Writing"},{i:"📬",l:"Publication Support"}].map((c,i,arr)=>(
              <div key={c.l} style={{paddingRight:18,marginRight:18,marginBottom:8,borderRight:i<arr.length-1&&w>=500?"1px solid rgba(255,255,255,.1)":"none"}}>
                <div style={{fontSize:14,marginBottom:2}}>{c.i}</div>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:11,fontFamily:"'DM Sans',sans-serif",lineHeight:1.4}}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>
        {!isMob&&(
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:16,padding:24}}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{color:"rgba(255,255,255,.35)",fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Publication Journey</div>
              <div style={{color:"white",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Your path from data to publication</div>
            </div>
            {steps.map((s,i)=>(
              <div key={s} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.05)":"none"}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:i<a?EMERALD:i===a?TEAL:"rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .4s",boxShadow:i===a?"0 0 0 5px rgba(14,122,107,.2)":"none"}}>
                  {i<a?<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>:<span style={{color:i===a?"white":"rgba(255,255,255,.25)",fontSize:11,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{i+1}</span>}
                </div>
                <div style={{flex:1}}>
                  <div style={{color:i<=a?"white":"rgba(255,255,255,.3)",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"color .4s"}}>{s}</div>
                  <div style={{color:"rgba(255,255,255,.25)",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{sublabels[i]}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:16,background:"rgba(14,122,107,.12)",border:"1px solid rgba(14,122,107,.25)",borderRadius:8,padding:"8px 12px"}}>
              <div style={{color:"#6EE7B7",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>✦ Typical: 6–12 weeks to submission-ready manuscript</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Dashboard(){
  const w=useW();
  const services=[
    {id:"spss-workflow",icon:"📊",title:"Statistical Analysis",sub:"SPSS · R · STATA",color:"#3B82F6"},
    {id:"gallery",icon:"🗂️",title:"Sample Deliverables",sub:"Real worked examples",color:"#0891B2"},
    {id:"tlf",icon:"📋",title:"TLF Development",sub:"Tables · Listings · Figures",color:TEAL},
    {id:"capability",icon:"✍️",title:"Manuscript Writing",sub:"IMRAD · Abstract · Cover Letter",color:"#7C3AED"},
    {id:"roadmap",icon:"🗺️",title:"Publication Roadmap",sub:"Idea → Indexed Publication",color:"#EA580C"},
    {id:"prisma",icon:"🧩",title:"Systematic Reviews",sub:"PRISMA 2020 · Meta-Analysis",color:"#EF4444"},
    {id:"methodology",icon:"📝",title:"Protocol Development",sub:"IRB · Synopsis · SAP",color:"#16A34A"},
    {id:"reviewer",icon:"🔁",title:"Reviewer Responses",sub:"Point-by-point rebuttals",color:"#DB2777"},
    {id:"quality",icon:"✅",title:"Scientific Review",sub:"QC · Consistency · Accuracy",color:"#0E7A6B"},
  ];
  const scrollTo=(id)=>{
    const el=document.getElementById(id);
    if(el){el.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>{const btn=el.querySelector("button");if(btn&&btn.textContent.includes("Explore"))btn.click();},700);}
  };
  return(
    <section id="dashboard" style={{padding:`64px ${w<640?"1.2rem":"2rem"}`,background:"white",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:36}}>
            <Chip>Research Support Dashboard</Chip>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,2.8vw,36px)",color:NAVY,fontWeight:700,margin:"12px 0 8px"}}>What Can I Help You With?</h2>
            <p style={{color:"#6B7280",fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(12px,1.6vw,14px)",maxWidth:460,margin:"0 auto"}}>Click any service to explore detailed capabilities, examples, and deliverables.</p>
          </div>
        </FI>
        <div style={{display:"grid",gridTemplateColumns:cols(w,3,2,1),gap:10}}>
          {services.map((s,i)=>(
            <FI key={s.title+i} d={i*30}>
              <button onClick={()=>scrollTo(s.id)} style={{width:"100%",background:"#F8FAFB",border:"1.5px solid #E5E7EB",borderRadius:13,padding:"18px 16px",cursor:"pointer",textAlign:"left",transition:"all .25s",display:"flex",alignItems:"center",gap:13,minHeight:70,WebkitTapHighlightColor:"transparent"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${s.color}0D`;e.currentTarget.style.borderColor=s.color;}}
                onMouseLeave={e=>{e.currentTarget.style.background="#F8FAFB";e.currentTarget.style.borderColor="#E5E7EB";}}>
                <div style={{width:40,height:40,borderRadius:10,background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{s.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:2}}>{s.title}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>{s.sub}</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,opacity:.3}}><path d="M5 12h14M12 5l7 7-7 7" stroke={NAVY} strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection(){
  const w=useW();
  const haves=["Clinical Data","Patient Records","Study Results","Research Ideas","Thesis Requirements","Completed Trials"];
  const lacks=["Statistical Analysis","Data Interpretation","Manuscript Writing","Journal Selection","Reviewer Responses","Publication Strategy"];
  return(
    <section style={{padding:`64px ${w<640?"1.2rem":"2rem"}`,background:"#F8FAFB",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{marginBottom:10}}><Chip>The Gap</Chip></div>
            <SectionTitle sub="Most doctors complete their research but never publish it. The bottleneck isn't the data — it's the expertise to transform it.">You Have the Data. The Gap Is What Happens Next.</SectionTitle>
          </div>
        </FI>
        <div style={{display:"grid",gridTemplateColumns:w>=768?"1fr auto 1fr":"1fr",gap:16,alignItems:"center"}}>
          <FI d={80}>
            <div style={{background:"white",borderRadius:13,padding:22,border:"2px solid #E5E7EB"}}>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
                <div style={{width:28,height:28,borderRadius:7,background:LN,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={NAVY} strokeWidth="2"/></svg></div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY}}>Researchers Have</span>
              </div>
              {haves.map(x=><div key={x} style={{display:"flex",alignItems:"center",gap:9,padding:"7px 0",borderBottom:"1px solid #F3F4F6"}}>
                <div style={{width:17,height:17,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/></svg>
                </div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#374151",fontWeight:500}}>{x}</span>
              </div>)}
            </div>
          </FI>
          {w>=768&&<FI d={180}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 7px rgba(14,122,107,.12)"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div style={{background:NAVY,color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:10,padding:"5px 11px",borderRadius:7,textAlign:"center"}}>I bridge<br/>this gap</div>
            </div>
          </FI>}
          <FI d={280}>
            <div style={{background:"white",borderRadius:13,padding:22,border:"2px solid #FEE2E2"}}>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
                <div style={{width:28,height:28,borderRadius:7,background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg></div>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:"#991B1B"}}>They Struggle With</span>
              </div>
              {lacks.map(x=><div key={x} style={{display:"flex",alignItems:"center",gap:9,padding:"7px 0",borderBottom:"1px solid #F3F4F6"}}>
                <div style={{width:17,height:17,borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></svg>
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
  const w=useW();
  const sc=[
    {icon:"📊",q:"I have collected data but don't know which statistical test to use.",how:"I review your data type, study design, and research question, then select appropriate tests, run the analysis in SPSS/R, and deliver interpreted results with publication-ready tables and figures.",d:["Statistical analysis report","Publication-ready tables","Figures (charts, graphs)","Written interpretation"],color:"#3B82F6"},
    {icon:"🎓",q:"My MD thesis deadline is approaching and I need structured help immediately.",how:"End-to-end thesis support: synopsis, protocol, data analysis, and all chapters formatted to your institution's requirements.",d:["Synopsis & protocol","Formatted thesis chapters","Statistical analysis section","References & bibliography"],color:"#16A34A"},
    {icon:"📬",q:"I have written a manuscript but journals keep rejecting it.",how:"Structured manuscript audit evaluating methodology, statistical presentation, discussion quality, and journal fit — then rewrite and reformat for a higher-probability target journal.",d:["Manuscript critique report","Revised manuscript","Optimised journal selection","Submission package"],color:"#D97706"},
    {icon:"🏆",q:"I need a publication for my academic promotion or appraisal.",how:"Identify publishable data from existing clinical practice or retrospective records, design a study, handle full analysis, and produce a manuscript targeted at indexed journals.",d:["Study design consultation","Data analysis","Full IMRAD manuscript","Journal submission support"],color:"#7C3AED"},
    {icon:"🏥",q:"I have retrospective hospital data and want to publish it.",how:"Data cleaning, variable coding, statistical modelling, and methodology reporting to STROBE standards.",d:["Data cleaning & validation","Retrospective analysis","STROBE-compliant methods","Full manuscript"],color:TEAL},
    {icon:"🔁",q:"I need help responding to reviewer comments without losing the acceptance.",how:"Point-by-point response letter that addresses every reviewer comment, with targeted manuscript revisions to maximise acceptance probability.",d:["Reviewer response letter","Revised manuscript","Track-changes document","Cover letter for resubmission"],color:"#DC2626"},
  ];
  return(
    <ExpandSection id="scenarios" label="Recognise Your Situation?" title="Typical Client Scenarios" sub="Select the scenario that matches your situation — see exactly how I can help." cta="Discuss Your Scenario">
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {sc.map((s,i)=>(
          <div key={i} style={{border:`1.5px solid ${open===i?s.color:"#E5E7EB"}`,borderRadius:12,overflow:"hidden",transition:"border-color .3s"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${s.color}08`:"white",border:"none",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10,minHeight:52,WebkitTapHighlightColor:"transparent"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:18,flexShrink:0,marginTop:2}}>{s.icon}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"clamp(12px,1.6vw,14px)",color:NAVY,lineHeight:1.4}}>"{s.q}"</span>
              </div>
              <div style={{width:24,height:24,borderRadius:"50%",background:open===i?s.color:LT,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s",marginTop:2}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{transform:open===i?"rotate(45deg)":"none",transition:"transform .3s"}}><path d="M12 5v14M5 12h14" stroke={open===i?"white":TEAL} strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
            </button>
            {open===i&&(
              <div style={{padding:"0 18px 18px",display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:16}}>
                <div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:s.color,letterSpacing:1,textTransform:"uppercase",marginBottom:7}}>How I Help</div>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#4B5563",lineHeight:1.75,margin:0}}>{s.how}</p>
                </div>
                <div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:s.color,letterSpacing:1,textTransform:"uppercase",marginBottom:7}}>Expected Deliverables</div>
                  {s.d.map(d=><div key={d} style={{display:"flex",alignItems:"center",gap:7,background:"white",borderRadius:7,padding:"7px 10px",marginBottom:5,border:"1px solid #F3F4F6"}}>
                    <div style={{width:14,height:14,borderRadius:"50%",background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={s.color} strokeWidth="3" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",fontWeight:600}}>{d}</span>
                  </div>)}
                  <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:10,background:s.color,color:"white",padding:"9px 16px",borderRadius:8,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,minHeight:40}}>Discuss This Scenario →</a>
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
  const w=useW();
  const steps=[
    {icon:"🗂️",label:"Raw Dataset",sub:"Excel / SPSS / CSV",detail:"Patient IDs, variables, dates, clinical measurements — unprocessed. Accepted in any format.",color:"#3B82F6"},
    {icon:"🧹",label:"Data Cleaning",sub:"Validation & Coding",detail:"Missing value handling, outlier detection, variable recoding, normality checks, duplicate removal.",color:"#F59E0B"},
    {icon:"📐",label:"SPSS Analysis",sub:"Statistical Tests",detail:"Descriptive stats, t-tests, chi-square, ANOVA, regression, survival — test selection guided by study design.",color:"#7C3AED"},
    {icon:"📋",label:"Statistical Output",sub:"Raw SPSS Tables",detail:"Raw output: means, SDs, p-values, ORs, CIs — unformatted and not yet manuscript-ready.",color:"#EF4444"},
    {icon:"📊",label:"Publication Table",sub:"Journal-Formatted",detail:"Clean tables with appropriate decimal places, footnotes, and CONSORT/STROBE notation.",color:TEAL},
    {icon:"🔬",label:"Interpretation",sub:"Clinical Meaning",detail:"Translation of numbers into clinical meaning — effect sizes, significance, confidence intervals.",color:"#16A34A"},
    {icon:"✍️",label:"Results Section",sub:"Manuscript Writing",detail:"Structured Results narrative following IMRAD — scientific language, referenced to tables and figures.",color:"#DB2777"},
    {icon:"📄",label:"Full Manuscript",sub:"Submission Ready",detail:"Complete IMRAD manuscript — Abstract, Introduction, Methods, Results, Discussion — formatted for target journal.",color:EMERALD},
  ];
  return(
    <ExpandSection id="spss-workflow" dark label="Methodology" title="SPSS to Publication Workflow" sub="Click any step to understand exactly what happens at each stage of the data-to-publication pipeline." cta="Discuss Your Dataset">
      <div style={{display:"grid",gridTemplateColumns:cols(w,4,2,1),gap:11}}>
        {steps.map((s,i)=>(
          <div key={s.label} onClick={()=>setActive(active===i?null:i)} style={{background:active===i?"white":"rgba(255,255,255,.04)",border:`1.5px solid ${active===i?s.color:"rgba(255,255,255,.1)"}`,borderRadius:12,padding:16,cursor:"pointer",transition:"all .3s",transform:active===i?"translateY(-3px)":"none",position:"relative",WebkitTapHighlightColor:"transparent"}}>
            <div style={{position:"absolute",top:10,right:10,width:18,height:18,borderRadius:"50%",background:active===i?s.color:"rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:active===i?"white":"rgba(255,255,255,.4)",fontSize:9,fontWeight:800,fontFamily:"'DM Sans',sans-serif"}}>{i+1}</span>
            </div>
            <div style={{fontSize:26,marginBottom:10}}>{s.icon}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:active===i?NAVY:"white",marginBottom:2,transition:"color .3s"}}>{s.label}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:active===i?s.color:"rgba(255,255,255,.35)",fontWeight:600,marginBottom:active===i?7:0,transition:"color .3s"}}>{s.sub}</div>
            {active===i&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4B5563",lineHeight:1.6}}>{s.detail}</div>}
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function TLFGallery(){
  const[tab,setTab]=useState(0);
  const w=useW();
  const baseRows=[
    {v:"Age (years)",a:"48.2 ± 11.4",b:"51.6 ± 12.8",p:"0.048",s:true},
    {v:"Male Sex, n (%)",a:"62 (62.0%)",b:"58 (58.0%)",p:"0.512",s:false},
    {v:"BMI (kg/m²)",a:"26.4 ± 3.8",b:"28.9 ± 4.2",p:"0.001",s:true},
    {v:"Hypertension, n (%)",a:"38 (38.0%)",b:"54 (54.0%)",p:"0.018",s:true},
    {v:"Diabetes, n (%)",a:"22 (22.0%)",b:"31 (31.0%)",p:"0.131",s:false},
    {v:"eGFR (mL/min/1.73m²)",a:"88.4 ± 14.2",b:"74.6 ± 18.9",p:"<0.001",s:true},
  ];
  const regRows=[
    {v:"Age (per 10 yrs)",or:"1.42",ci:"1.18–1.71",p:"0.001",s:true},
    {v:"Male Sex",or:"0.88",ci:"0.54–1.44",p:"0.612",s:false},
    {v:"BMI (per kg/m²)",or:"1.18",ci:"1.09–1.28",p:"<0.001",s:true},
    {v:"Hypertension",or:"1.94",ci:"1.22–3.08",p:"0.005",s:true},
    {v:"eGFR (per 10 u)",or:"0.71",ci:"0.62–0.81",p:"<0.001",s:true},
  ];
  const tabs=["Baseline (Table 1)","Regression","Before & After"];
  return(
    <ExpandSection id="tlf" label="Evidence of Capability" title="Statistical Tables & TLF Interpretation" sub="Publication-ready tables produced from raw SPSS output — with scientific narrative included." cta="Request Sample Output">
      <div style={{display:"flex",gap:7,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?NAVY:"white",color:tab===i?"white":"#374151",border:`1.5px solid ${tab===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"8px 16px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s",minHeight:38,WebkitTapHighlightColor:"transparent"}}>{t}</button>)}
      </div>
      {tab===0&&<div>
        <div style={{background:"white",borderRadius:12,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
          <div style={{background:NAVY,padding:"11px 16px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
            <span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12}}>Table 1. Baseline Characteristics</span>
            <span style={{color:"rgba(255,255,255,.3)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>Illustrative Example</span>
          </div>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:360}}>
              <thead><tr style={{background:"#F8FAFB"}}>{["Variable","Group A","Group B","p-value"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:h==="Variable"?"left":"center",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:NAVY,borderBottom:"2px solid #E5E7EB",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{baseRows.map((r,i)=><tr key={r.v} style={{background:i%2===0?"white":"#F8FAFB",borderBottom:"1px solid #F3F4F6"}}>
                <td style={{padding:"8px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",fontWeight:500}}>{r.v}</td>
                <td style={{padding:"8px 12px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r.a}</td>
                <td style={{padding:"8px 12px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r.b}</td>
                <td style={{padding:"8px 12px",textAlign:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:r.s?700:400,color:r.s?TEAL:"#6B7280"}}>{r.p}{r.s?"*":""}</span></td>
              </tr>)}</tbody>
            </table>
          </div>
          <div style={{padding:"8px 14px",background:"#F8FAFB",borderTop:"1px solid #E5E7EB"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>Mean ± SD for continuous; n (%) for categorical. *p &lt; 0.05.</span></div>
        </div>
        <div style={{marginTop:16,background:LT,border:`1.5px solid ${TEAL}40`,borderRadius:12,padding:"16px 18px"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:7}}>✦ How this becomes manuscript text:</div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42",lineHeight:1.8,margin:0,fontStyle:"italic",background:"white",padding:"12px 14px",borderRadius:8,border:"1px solid rgba(14,122,107,.2)"}}>
            "Group B participants were significantly older (51.6 ± 12.8 vs. 48.2 ± 11.4 years; p = 0.048), had higher BMI (28.9 ± 4.2 vs. 26.4 ± 3.8 kg/m²; p = 0.001), greater prevalence of hypertension (54.0% vs. 38.0%; p = 0.018), and lower eGFR values (74.6 ± 18.9 vs. 88.4 ± 14.2 mL/min/1.73m²; p &lt; 0.001)."
          </p>
        </div>
      </div>}
      {tab===1&&<div>
        <div style={{background:"white",borderRadius:12,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
          <div style={{background:NAVY,padding:"11px 16px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
            <span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12}}>Table 2. Multivariable Logistic Regression</span>
            <span style={{color:"rgba(255,255,255,.3)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>Illustrative Example</span>
          </div>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:320}}>
              <thead><tr style={{background:"#F8FAFB"}}>{["Variable","Adj. OR","95% CI","p-value"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:h==="Variable"?"left":"center",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:NAVY,borderBottom:"2px solid #E5E7EB",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{regRows.map((r,i)=><tr key={r.v} style={{background:i%2===0?"white":"#F8FAFB",borderBottom:"1px solid #F3F4F6"}}>
                <td style={{padding:"9px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",fontWeight:500}}>{r.v}</td>
                <td style={{padding:"9px 12px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:r.s?700:400,color:r.s?NAVY:"#6B7280"}}>{r.or}</td>
                <td style={{padding:"9px 12px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r.ci}</td>
                <td style={{padding:"9px 12px",textAlign:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:r.s?700:400,color:r.s?TEAL:"#6B7280"}}>{r.p}</span></td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>}
      {tab===2&&<div style={{display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:16}}>
        <div style={{background:"white",borderRadius:12,padding:18,border:"1.5px solid #E5E7EB"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:7,background:"#FEF3C7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>📊</div>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY}}>Raw SPSS Output</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>What the software produces</div></div>
          </div>
          <div style={{background:"#1E1E2E",borderRadius:8,padding:"11px 13px",fontFamily:"monospace",fontSize:10,color:"#A6E3A1",lineHeight:1.85,overflowX:"auto"}}>
            <div style={{color:"#89B4FA"}}>Binary Logistic Regression</div>
            <div style={{color:"#CDD6F4"}}>-2 Log likelihood: 248.432</div>
            <div style={{color:"#F38BA8",marginTop:4}}>Age: B=0.352 SE=0.092</div>
            <div style={{color:"#F38BA8"}}>Exp(B)=1.42 (1.18–1.71)</div>
            <div style={{color:"#94E2D5"}}>BMI: B=0.165 SE=0.041</div>
            <div style={{color:"#94E2D5"}}>Exp(B)=1.18 (1.09–1.28)</div>
          </div>
        </div>
        <div style={{background:"white",borderRadius:12,padding:18,border:"1.5px solid #E5E7EB"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:7,background:LT,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✍️</div>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY}}>Manuscript Results Text</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>How it reads in the paper</div></div>
          </div>
          <div style={{background:LT,borderRadius:8,padding:"11px 13px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42",lineHeight:1.85,fontStyle:"italic"}}>
            "On multivariable analysis, increasing age (aOR 1.42; 95% CI 1.18–1.71; p = 0.001) and higher BMI (aOR 1.18; 95% CI 1.09–1.28; p &lt; 0.001) were independently associated with the primary outcome."
          </div>
          <div style={{marginTop:10,background:"#FEF3C7",borderRadius:7,padding:"8px 12px"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#92400E",fontWeight:600}}>✦ Goes directly into your Results section.</span>
          </div>
        </div>
      </div>}
    </ExpandSection>
  );
}

function PublicationFigures(){
  const[fig,setFig]=useState(0);
  const figs=[{l:"Bar Chart",i:"📊"},{l:"Kaplan-Meier",i:"📈"},{l:"Forest Plot",i:"🌲"},{l:"Scatter Plot",i:"⚡"}];
  const captions=["Figure 1. Mean outcome scores (± SEM). *p < 0.05.","Figure 2. Kaplan-Meier survival curves. Log-rank p < 0.001.","Figure 3. Forest plot — adjusted ORs (95% CI).","Figure 4. Correlation: BMI vs outcome (r = −0.89, p < 0.001)."];
  return(
    <ExpandSection id="pub-figures" dark label="Publication Figures" title="Journal-Ready Publication Figures" sub="Click a figure type to view a realistic example with caption and interpretation." cta="Request Custom Figures">
      <div style={{display:"flex",gap:7,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
        {figs.map((f,i)=><button key={f.l} onClick={()=>setFig(i)} style={{background:fig===i?TEAL:"rgba(255,255,255,.06)",color:fig===i?"white":"rgba(255,255,255,.7)",border:`1.5px solid ${fig===i?TEAL:"rgba(255,255,255,.12)"}`,borderRadius:100,padding:"8px 16px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:6,minHeight:38,WebkitTapHighlightColor:"transparent"}}><span>{f.i}</span>{f.l}</button>)}
      </div>
      <div style={{background:"white",borderRadius:12,overflow:"hidden",border:"1px solid #E5E7EB"}}>
        <div style={{background:NAVY,padding:"10px 18px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
          <span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12}}>{["Fig 1. Mean Outcome Scores by Treatment Group","Fig 2. Kaplan-Meier Survival Curves","Fig 3. Forest Plot — Subgroup Analysis","Fig 4. Correlation: BMI vs Outcome Score"][fig]}</span>
          <span style={{color:"rgba(255,255,255,.25)",fontFamily:"'DM Sans',sans-serif",fontSize:10}}>Illustrative</span>
        </div>
        <div style={{padding:"20px",background:"white",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          {fig===0&&<svg viewBox="0 0 500 220" style={{width:"100%",maxHeight:220,minWidth:280}}>
            {[0,1,2,3,4].map(i=><line key={i} x1="45" y1={180-i*34} x2="480" y2={180-i*34} stroke="#F3F4F6" strokeWidth="1"/>)}
            {[0,25,50,75,100].map((v,i)=><text key={v} x="38" y={184-i*34} textAnchor="end" fontSize="9" fill="#9CA3AF" fontFamily="DM Sans">{v}</text>)}
            {[[80,110,"#94A3B8"],[122,142,TEAL],[220,70,"#94A3B8"],[262,132,"#3B82F6"],[360,90,"#94A3B8"],[402,176,"#7C3AED"]].map(([x,h,c],i)=>(
              <g key={i}><rect x={x} y={180-h} width={32} height={h} fill={c} rx="3" opacity=".85"/>
                <text x={x+16} y={174-h} textAnchor="middle" fontSize="8" fill={c} fontFamily="DM Sans" fontWeight="700">{Math.round(h/1.36)}</text></g>
            ))}
            {["Week 4","Week 8","Week 12"].map((l,i)=><text key={l} x={115+i*160} y="198" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="DM Sans">{l}</text>)}
            <line x1="45" y1="20" x2="45" y2="180" stroke="#D1D5DB" strokeWidth="1.5"/>
            <line x1="45" y1="180" x2="480" y2="180" stroke="#D1D5DB" strokeWidth="1.5"/>
          </svg>}
          {fig===1&&<svg viewBox="0 0 500 240" style={{width:"100%",maxHeight:240,minWidth:280}}>
            <line x1="45" y1="20" x2="45" y2="220" stroke="#D1D5DB" strokeWidth="1.5"/>
            <line x1="45" y1="220" x2="480" y2="220" stroke="#D1D5DB" strokeWidth="1.5"/>
            {[0,25,50,75,100].map((v,i)=><text key={v} x="38" y={224-i*40} textAnchor="end" fontSize="9" fill="#9CA3AF" fontFamily="DM Sans">{v}%</text>)}
            <polyline points="45,52 103,60 161,74 219,86 277,102 335,116 393,130 451,142 480,148" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round"/>
            <polyline points="45,52 103,80 161,108 219,136 277,158 335,176 393,192 451,202 480,212" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="6,3"/>
            <rect x="300" y="66" width="150" height="50" rx="5" fill="white" stroke="#E5E7EB"/>
            <line x1="310" y1="83" x2="336" y2="83" stroke={TEAL} strokeWidth="2.5"/>
            <text x="344" y="87" fontSize="10" fill="#374151" fontFamily="DM Sans">Group A</text>
            <line x1="310" y1="100" x2="336" y2="100" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="5,3"/>
            <text x="344" y="104" fontSize="10" fill="#374151" fontFamily="DM Sans">Group B</text>
            <text x="170" y="38" fontSize="11" fill="#374151" fontFamily="DM Sans" fontWeight="700">Log-rank p &lt; 0.001</text>
          </svg>}
          {fig===2&&<svg viewBox="0 0 520 280" style={{width:"100%",maxHeight:280,minWidth:300}}>
            <line x1="240" y1="18" x2="240" y2="266" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4,4"/>
            <text x="240" y="280" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="DM Sans">OR=1.0</text>
            {[{l:"Overall",or:1.42,lo:1.18,hi:1.71,y:44},{l:"Age < 50",or:1.28,lo:0.94,hi:1.74,y:80},{l:"Age ≥ 50",or:1.61,lo:1.22,hi:2.12,y:116},{l:"Male",or:1.38,lo:1.02,hi:1.86,y:152},{l:"Female",or:1.49,lo:1.06,hi:2.09,y:188},{l:"BMI < 25",or:1.18,lo:0.82,hi:1.70,y:224},{l:"BMI ≥ 25",or:1.64,lo:1.28,hi:2.10,y:260}].map(r=>{
              const sc=v=>100+(Math.log(v)/Math.log(4))*180; const sig=r.lo>1.0;
              return<g key={r.l}><text x="108" y={r.y+4} textAnchor="end" fontSize="10" fill="#374151" fontFamily="DM Sans">{r.l}</text>
                <line x1={sc(r.lo)} y1={r.y} x2={sc(r.hi)} y2={r.y} stroke={sig?TEAL:"#94A3B8"} strokeWidth="1.5"/>
                <rect x={sc(r.or)-5} y={r.y-5} width={10} height={10} fill={sig?TEAL:"#94A3B8"} rx="2"/>
                <text x="400" y={r.y+4} fontSize="9" fill="#374151" fontFamily="DM Sans">{r.or.toFixed(2)} ({r.lo.toFixed(2)}–{r.hi.toFixed(2)})</text>
              </g>;
            })}
          </svg>}
          {fig===3&&<svg viewBox="0 0 480 240" style={{width:"100%",maxHeight:240,minWidth:260}}>
            <line x1="40" y1="18" x2="40" y2="220" stroke="#D1D5DB" strokeWidth="1.5"/>
            <line x1="40" y1="220" x2="460" y2="220" stroke="#D1D5DB" strokeWidth="1.5"/>
            {[[60,168],[84,156],[110,144],[138,132],[166,120],[194,108],[224,96],[256,84],[288,73],[320,62],[354,52],[390,44],[426,37]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill={TEAL} opacity=".65"/>)}
            <line x1="50" y1="175" x2="450" y2="22" stroke="#EF4444" strokeWidth="2" strokeDasharray="6,3"/>
            <text x="250" y="12" textAnchor="middle" fontSize="11" fill="#374151" fontFamily="DM Sans" fontWeight="700">r = −0.89, p &lt; 0.001</text>
          </svg>}
        </div>
        <div style={{padding:"12px 18px",borderTop:"1px solid #E5E7EB",background:"#F8FAFB"}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4B5563",fontStyle:"italic",margin:"0 0 6px"}}>{captions[fig]}</p>
          <span style={{background:LT,color:TEAL,fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:600,padding:"2px 9px",borderRadius:100}}>✦ 300 DPI · TIFF/EPS/PDF · Journal spec</span>
        </div>
      </div>
    </ExpandSection>
  );
}

function CapabilitySection(){
  const[tab,setTab]=useState(0);
  const w=useW();
  const caps=[{label:"Statistical Analysis",icon:"📊"},{label:"Manuscript Writing",icon:"✍️"},{label:"Literature Reviews",icon:"🔍"},{label:"Protocol Development",icon:"📝"}];
  const statContent=(
    <div style={{display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:18}}>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:9}}>Statistical Tests Supported</div>
        {[["Descriptive Statistics","Mean, SD, IQR, Frequencies"],["T-tests / ANOVA","Independent, Paired, One-way"],["Chi-square Tests","Association & goodness-of-fit"],["Logistic Regression","Binary, ordinal, multinomial"],["Linear Regression","Simple, multiple, hierarchical"],["Survival Analysis","Kaplan-Meier, Cox regression"],["Diagnostic Accuracy","Sensitivity, Specificity, ROC, AUC"],["Non-parametric Tests","Mann-Whitney, Kruskal-Wallis"]].map(([n,d])=>(
          <div key={n} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:"1px solid #F3F4F6"}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:TEAL,flexShrink:0,marginTop:6}}/>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,color:NAVY}}>{n}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>{d}</div></div>
          </div>
        ))}
      </div>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:9}}>Software Proficiency</div>
        {[["SPSS",95],["R / RStudio",88],["GraphPad Prism",90],["STATA",80],["Excel",98]].map(([n,p])=>(
          <div key={n} style={{marginBottom:11}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,color:NAVY}}>{n}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:TEAL,fontWeight:600}}>Advanced</span></div>
            <div style={{height:5,background:"#E5E7EB",borderRadius:100,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(to right,${TEAL},${EMERALD})`,borderRadius:100}}/></div>
          </div>
        ))}
        <div style={{marginTop:16,background:LT,border:`1px solid ${TEAL}40`,borderRadius:10,padding:"12px 14px"}}>
          <div style={{color:TEAL,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,marginBottom:6}}>Reporting Standards</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{["PRISMA 2020","CONSORT","STROBE","CARE","ICMJE","EQUATOR"].map(s=><span key={s} style={{background:"white",color:NAVY,border:"1px solid #E5E7EB",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:100}}>{s}</span>)}</div>
        </div>
      </div>
    </div>
  );
  const msContent=(
    <div style={{display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:12}}>
      {[["Abstract","Structured or unstructured; word-limited; journal-specific format"],["Introduction","Background, research gap, objectives — referenced to current literature"],["Materials & Methods","Complete methodology: design, population, variables, SAP — CONSORT/STROBE"],["Results","Narrative linked to tables and figures — pure reporting, no interpretation"],["Discussion","Clinical significance, comparison to literature, limitations, future directions"],["Conclusion","Concise, aligned to objectives, free of overclaims"]].map(([s,d])=>(
        <div key={s} style={{background:"#F8FAFB",borderRadius:10,padding:"13px 14px",border:"1.5px solid #E5E7EB"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:4}}>{s}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",lineHeight:1.6}}>{d}</div>
        </div>
      ))}
    </div>
  );
  const litContent=(
    <div>
      <div style={{display:"grid",gridTemplateColumns:cols(w,3,2,1),gap:11,marginBottom:16}}>
        {[{t:"Narrative Review",d:"Broad topic summary, expert synthesis, clinical background"},{t:"Systematic Review",d:"PRISMA 2020, structured search, dual screening, GRADE"},{t:"Meta-Analysis",d:"Forest plots, pooled effects, I² heterogeneity, publication bias"}].map(r=>(
          <div key={r.t} style={{background:"#F8FAFB",borderRadius:10,padding:14,border:"1.5px solid #E5E7EB",textAlign:"center"}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:4}}>{r.t}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",lineHeight:1.6}}>{r.d}</div>
          </div>
        ))}
      </div>
      <div style={{background:LT,border:`1px solid ${TEAL}40`,borderRadius:10,padding:"13px 16px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:7}}>Review Workflow</div>
        <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
          {["PICO","PubMed Search","Screening","Data Extraction","Critical Appraisal","Synthesis","PRISMA Manuscript"].map((s,i,a)=>(
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{background:"white",border:`1px solid ${TEAL}40`,borderRadius:6,padding:"4px 9px"}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:NAVY}}>{s}</div>
              </div>
              {i<a.length-1&&<span style={{margin:"0 3px",color:TEAL,fontSize:11}}>→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const protoContent=(
    <div style={{display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:18}}>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:9}}>Protocol Components</div>
        {[["Title & Background","Research rationale, clinical gap, evidence"],["PICO Framework","Population, Intervention, Comparison, Outcome"],["Study Design","Design selection with rationale"],["Sample Size","Power analysis, effect size, alpha, beta"],["Statistical Analysis Plan","Pre-specified analysis, primary & secondary outcomes"],["IRB / Ethics","Risk-benefit, consent, data protection"]].map(([n,d])=>(
          <div key={n} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:"1px solid #F3F4F6"}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:TEAL,flexShrink:0,marginTop:7}}/>
            <div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,color:NAVY}}>{n}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>{d}</div></div>
          </div>
        ))}
      </div>
      <div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:9}}>Protocol Deliverables</div>
        {["Full study protocol document","IRB/ethics application support","Sample size calculation","Statistical Analysis Plan (SAP)","Data collection forms / CRFs","Informed consent template","Timeline & milestone chart"].map(d=>(
          <div key={d} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 0",borderBottom:"1px solid #F3F4F6"}}>
            <div style={{width:15,height:15,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
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
      <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap",justifyContent:"center"}}>
        {caps.map((c,i)=><button key={c.label} onClick={()=>setTab(i)} style={{background:tab===i?NAVY:"white",color:tab===i?"white":"#374151",border:`1.5px solid ${tab===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"8px 16px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:6,minHeight:38,WebkitTapHighlightColor:"transparent"}}><span>{c.icon}</span>{c.label}</button>)}
      </div>
      <div style={{background:"white",borderRadius:13,padding:w<640?16:22,border:"1.5px solid #E5E7EB"}}>{contents[tab]}</div>
    </ExpandSection>
  );
}

function ResearchDashboard(){
  const[hov,setHov]=useState(null);
  const w=useW();
  const stages=[
    {icon:"💡",label:"Research Question",detail:"PICO framework, hypothesis, objectives, study rationale clearly defined."},
    {icon:"📋",label:"Protocol",detail:"IRB-ready protocol, methodology selection, sample size, timeline."},
    {icon:"🗂️",label:"Data Collection",detail:"Data tools, CRF review, standardisation, quality checks."},
    {icon:"📊",label:"Statistical Analysis",detail:"Full SPSS/R/STATA analysis with test selection rationale."},
    {icon:"📋",label:"TLFs",detail:"Publication-ready Tables, Listings, Figures formatted per journal."},
    {icon:"🔬",label:"Interpretation",detail:"Clinical significance, effect sizes, confidence intervals."},
    {icon:"✍️",label:"Manuscript",detail:"Complete IMRAD manuscript — all sections written, cross-referenced."},
    {icon:"📬",label:"Submission",detail:"Target journal selection, cover letter, submission portal."},
    {icon:"🔁",label:"Reviewer Response",detail:"Point-by-point rebuttal, manuscript revisions, resubmission."},
    {icon:"🏆",label:"Publication",detail:"Post-acceptance support, proofing review, final confirmation."},
  ];
  return(
    <ExpandSection id="research-dashboard" dark label="End-to-End Support" title="Research to Publication Dashboard" sub="Every stage of the research journey fully supported. Tap each milestone to see what's included." cta="Start Your Journey">
      <div style={{display:"grid",gridTemplateColumns:cols(w,5,2,2),gap:10}}>
        {stages.map((s,i)=>(
          <FI key={s.label} d={i*35}>
            <div onClick={()=>setHov(hov===i?null:i)} style={{background:hov===i?"white":"rgba(255,255,255,.05)",border:`1.5px solid ${hov===i?TEAL:"rgba(255,255,255,.1)"}`,borderRadius:12,padding:14,cursor:"pointer",transition:"all .3s",WebkitTapHighlightColor:"transparent",minHeight:100}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:18}}>{s.icon}</span>
                <div style={{width:16,height:16,borderRadius:"50%",background:hov===i?TEAL:EMERALD,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
                </div>
              </div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:hov===i?NAVY:"white",marginBottom:4,transition:"color .3s"}}>{s.label}</div>
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
  const w=useW();
  const items=[
    {icon:"📝",title:"Clinical Study Protocol",when:"Before any study — IRB, grants, institutional approval.",deliverables:["Full protocol document","PICO framework","Sample size calculation","SAP","CRF design","IRB support"],how:"Complete protocol from your research idea — design, objectives, methodology, statistical plan, ethics.",color:"#3B82F6"},
    {icon:"📐",title:"Statistical Analysis Plan",when:"Required for RCTs, prospective studies, pre-registered research.",deliverables:["SAP document","Primary & secondary endpoints","Analysis populations","Methods justification","Sensitivity analysis","Missing data plan"],how:"Pre-specified SAP defining all statistical analyses before data lock — protecting against post-hoc bias.",color:TEAL},
    {icon:"📋",title:"TLF Development",when:"Clinical study reports, academic publications, regulatory submissions.",deliverables:["Table shells & final tables","Patient listings","Publication figures (300 DPI)","TLF specifications","Statistical annotation","Journal outputs"],how:"Complete TLF package from raw SPSS/R output — annotated, formatted, and interpreted.",color:"#7C3AED"},
    {icon:"📄",title:"CSR Support",when:"Regulatory submissions, academic and institutional reports.",deliverables:["CSR section writing","Results narrative","Methods section","TLF integration","Reference management","Regulatory formatting"],how:"Section-level or full CSR — results narrative, methods, and TLF integration to ICH E3 or journal standards.",color:"#F59E0B"},
    {icon:"🔍",title:"Literature Review",when:"Protocol development, thesis background, evidence summaries.",deliverables:["Search strategy","PRISMA flow diagram","Evidence tables","Critical appraisal","Narrative synthesis","Reference library"],how:"Structured review using PubMed, Embase, Cochrane — from search strategy to evidence synthesis.",color:"#16A34A"},
    {icon:"✍️",title:"Manuscript Development",when:"Any original research intended for journal publication.",deliverables:["Complete IMRAD manuscript","Abstract","Author declarations","Cover letter","Supplementary materials","Journal formatting"],how:"Full manuscript — IMRAD standards, referenced to current literature, formatted for target journal.",color:"#DB2777"},
    {icon:"📬",title:"Publication Package",when:"Submission to indexed journals — PubMed, Scopus, Web of Science.",deliverables:["Formatted manuscript","Cover letter","Reviewer response letter","Resubmission package","Journal selection report","Submission checklist"],how:"Complete submission package — manuscript, declarations, portal guidance, post-review support.",color:"#EA580C"},
    {icon:"✅",title:"Scientific Review & QC",when:"Before any manuscript or report is submitted.",deliverables:["Scientific accuracy report","Data consistency check","Reference verification","Terminology review","Table/figure audit","Readiness score"],how:"Multi-layer scientific review: data-to-text consistency, reference accuracy, medical terminology, readiness.",color:"#0891B2"},
  ];
  return(
    <ExpandSection id="deliverables" label="Professional Outputs" title="Professional Research Deliverables" sub="Expand any deliverable type to see what is included, when it is needed, and how I support it." cta="Request a Deliverable">
      <div style={{display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:9}}>
        {items.map((item,i)=>(
          <div key={item.title} style={{border:`1.5px solid ${open===i?item.color:"#E5E7EB"}`,borderRadius:12,overflow:"hidden",transition:"border-color .3s",background:"white"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${item.color}08`:"white",border:"none",padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left",gap:9,minHeight:52,WebkitTapHighlightColor:"transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:11}}>
                <div style={{width:34,height:34,borderRadius:9,background:`${item.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{item.icon}</div>
                <div style={{minWidth:0}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY}}>{item.title}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280",marginTop:1}}>{item.when}</div>
                </div>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,transform:open===i?"rotate(180deg)":"none",transition:"transform .3s"}}><path d="M6 9l6 6 6-6" stroke={open===i?item.color:"#9CA3AF"} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {open===i&&<div style={{padding:"0 16px 16px",display:"grid",gridTemplateColumns:w>=500?"1fr 1fr":"1fr",gap:12}}>
              <div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:item.color,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Deliverables</div>
                {item.deliverables.map(d=><div key={d} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 0",borderBottom:"1px solid #F9FAFB"}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:`${item.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={item.color} strokeWidth="3" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#374151"}}>{d}</span>
                </div>)}
              </div>
              <div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:item.color,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>How I Support It</div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#4B5563",lineHeight:1.7,margin:"0 0 11px"}}>{item.how}</p>
                <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:5,background:item.color,color:"white",padding:"8px 13px",borderRadius:7,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,minHeight:36}}>Request This →</a>
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
  const w=useW();
  const boxes=[{n:"4,821",l:"Records Identified",s:"PubMed, Embase, Cochrane, Scopus",c:"#3B82F6"},{n:"−1,204",l:"Duplicates Removed",s:"Automated + manual deduplication",c:"#F59E0B"},{n:"3,617",l:"Titles & Abstracts Screened",s:"Two independent reviewers",c:"#7C3AED"},{n:"−3,201",l:"Excluded (Title/Abstract)",s:"Irrelevant, non-clinical, non-English",c:"#EF4444"},{n:"416",l:"Full Texts Reviewed",s:"Full-text retrieval & assessment",c:TEAL},{n:"−378",l:"Excluded (Full Text)",s:"Insufficient data, wrong outcome",c:"#F59E0B"},{n:"38",l:"Studies Included",s:"Final synthesis & meta-analysis",c:"#16A34A"}];
  return(
    <ExpandSection id="prisma" dark label="Evidence Synthesis" title="Systematic Reviews & PRISMA Methodology" sub="PRISMA 2020-compliant systematic reviews with full search strategy, dual screening, and evidence synthesis." cta="Discuss Systematic Review">
      <div style={{display:"grid",gridTemplateColumns:w>=768?"1fr 1fr":"1fr",gap:32,alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
          {boxes.map((b,i)=>(
            <div key={b.l} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div onClick={()=>setHov(hov===i?null:i)} style={{width:"100%",background:hov===i?"white":"rgba(255,255,255,.05)",border:`2px solid ${hov===i?b.c:"rgba(255,255,255,.1)"}`,borderRadius:10,padding:"10px 14px",cursor:"pointer",transition:"all .3s",display:"flex",alignItems:"center",gap:11,WebkitTapHighlightColor:"transparent"}}>
                <div style={{width:38,height:38,borderRadius:8,background:`${b.c}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:800,color:b.c}}>{b.n}</span>
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:hov===i?NAVY:"white",transition:"color .3s"}}>{b.l}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:hov===i?"#6B7280":"rgba(255,255,255,.3)",transition:"color .3s"}}>{b.s}</div>
                </div>
              </div>
              {i<boxes.length-1&&<div style={{width:2,height:12,background:"rgba(255,255,255,.1)"}}/>}
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          <div style={{color:"rgba(255,255,255,.35)",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>Deliverables</div>
          {[{i:"🔍",t:"Search Strategy",d:"MeSH terms, Boolean operators, PubMed/Embase/Cochrane syntax."},{i:"📋",t:"PRISMA Flow Diagram",d:"2020-compliant flow diagram with exact study counts."},{i:"📑",t:"Data Extraction Forms",d:"Standardised templates for study characteristics and outcomes."},{i:"⚖️",t:"Risk of Bias Assessment",d:"GRADE, Cochrane RoB 2.0, or NOS applied consistently."},{i:"📊",t:"Meta-Analysis",d:"Forest plots, heterogeneity (I², Q), sensitivity analysis."},{i:"📄",t:"PRISMA Manuscript",d:"Full manuscript following PRISMA 2020 — submission-ready."}].map(d=>(
            <div key={d.t} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:"11px 13px",display:"flex",gap:10,transition:"all .3s",cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(14,122,107,.14)";e.currentTarget.style.borderColor="rgba(14,122,107,.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}>
              <span style={{fontSize:16,flexShrink:0}}>{d.i}</span>
              <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:"white",marginBottom:2}}>{d.t}</div>
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
  const w=useW();
  const stds=[
    {n:"PRISMA",full:"Preferred Reporting Items for Systematic Reviews and Meta-Analyses",when:"Systematic reviews and meta-analyses",how:"PRISMA 2020 flow diagram, checklist, and search strategy included in every systematic review.",c:"#3B82F6"},
    {n:"CONSORT",full:"Consolidated Standards of Reporting Trials",when:"Randomized controlled trials",how:"CONSORT checklist and participant flow diagram — complete, transparent RCT reporting.",c:TEAL},
    {n:"STROBE",full:"Strengthening Reporting of Observational Studies in Epidemiology",when:"Cohort, case-control, cross-sectional studies",how:"STROBE checklist applied to all observational study manuscripts.",c:"#7C3AED"},
    {n:"CARE",full:"Case Report Guidelines",when:"Case reports and case series",how:"CARE checklist for structured, peer-reviewable case report writing.",c:"#F59E0B"},
    {n:"TREND",full:"Transparent Reporting of Non-randomized Designs",when:"Non-randomized intervention studies",how:"TREND checklist for non-randomized clinical intervention reporting.",c:"#EF4444"},
    {n:"ARRIVE",full:"Animal Research: Reporting of In Vivo Experiments",when:"Animal research studies",how:"ARRIVE 2.0 guidelines for animal study reporting standards.",c:"#16A34A"},
    {n:"ICMJE",full:"International Committee of Medical Journal Editors",when:"All journal submissions",how:"ICMJE authorship criteria, disclosure requirements, and submission standards.",c:"#DB2777"},
    {n:"EQUATOR",full:"Enhancing QUAlity and Transparency Of health Research",when:"All study types",how:"Full EQUATOR network guidance — correct guideline for every study design.",c:"#0891B2"},
  ];
  return(
    <ExpandSection id="standards" label="Publication Standards" title="Reporting Guidelines & Standards" sub="Every manuscript follows the appropriate guideline. Expand each to see how it is applied." cta="Discuss Your Study Design">
      <div style={{display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:8}}>
        {stds.map((s,i)=>(
          <div key={s.n} style={{border:`1.5px solid ${open===i?s.c:"#E5E7EB"}`,borderRadius:11,overflow:"hidden",transition:"border-color .3s"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${s.c}08`:"white",border:"none",padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left",gap:8,minHeight:52,WebkitTapHighlightColor:"transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:30,height:30,borderRadius:7,background:`${s.c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:10,color:s.c}}>{s.n}</span></div>
                <div style={{minWidth:0}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY}}>{s.n} — {s.full.split(" ").slice(0,3).join(" ")}…</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>{s.when}</div>
                </div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,transform:open===i?"rotate(180deg)":"none",transition:"transform .3s"}}><path d="M6 9l6 6 6-6" stroke={open===i?s.c:"#9CA3AF"} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {open===i&&<div style={{padding:"0 14px 13px"}}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#4B5563",lineHeight:1.7,borderTop:"1px solid #F3F4F6",paddingTop:9}}><strong style={{color:NAVY}}>Full name:</strong> {s.full}<br/><strong style={{color:NAVY}}>How applied:</strong> {s.how}</div>
            </div>}
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function MethodologyMatrix(){
  const[sel,setSel]=useState(0);
  const w=useW();
  const designs=[
    {name:"Cross-Sectional",icon:"🔲",d:["Study design & PICO","Survey tool design","Descriptive statistics","STROBE reporting","Manuscript writing"],ms:"STROBE"},
    {name:"Case-Control",icon:"⚖️",d:["Protocol development","OR calculation","Chi-square/regression","STROBE checklist","Full manuscript"],ms:"STROBE"},
    {name:"Retrospective Cohort",icon:"🗃️",d:["Data extraction support","Survival analysis","Cox regression","STROBE reporting","Full manuscript"],ms:"STROBE"},
    {name:"Prospective Cohort",icon:"🔭",d:["Protocol & SAP","IRB support","Data management","Power calculation","Publication strategy"],ms:"STROBE"},
    {name:"RCT",icon:"🎲",d:["Protocol writing","Randomisation plan","Sample size","CONSORT reporting","Full manuscript"],ms:"CONSORT"},
    {name:"Case Report",icon:"📋",d:["CARE compliance","Timeline creation","Clinical narrative","Discussion & lessons","Submission"],ms:"CARE"},
    {name:"Case Series",icon:"📚",d:["Series design","Data extraction","Descriptive analysis","Pattern identification","Manuscript writing"],ms:"CARE"},
    {name:"Systematic Review",icon:"🔍",d:["PICO & search strategy","PRISMA 2020 flow","Dual screening","Risk of bias","Meta-synthesis"],ms:"PRISMA"},
    {name:"Meta-Analysis",icon:"📊",d:["Effect size calculation","Forest plots","Heterogeneity (I²)","Sensitivity analysis","PRISMA manuscript"],ms:"PRISMA"},
    {name:"Protocol Dev.",icon:"📝",d:["PICO framework","Study design rationale","Sample size formula","SAP development","IRB formatting"],ms:"EQUATOR"},
  ];
  return(
    <ExpandSection id="methodology" label="Research Capability" title="Research Methodology Matrix" sub="Click any study design to see supported methodology, deliverables, and reporting standard." cta="Discuss Your Study Design">
      <div style={{display:"grid",gridTemplateColumns:cols(w,5,3,2),gap:8,marginBottom:18}}>
        {designs.map((d,i)=>(
          <button key={d.name} onClick={()=>setSel(i)} style={{background:sel===i?NAVY:"white",border:`1.5px solid ${sel===i?NAVY:"#E5E7EB"}`,borderRadius:10,padding:"11px 8px",cursor:"pointer",transition:"all .2s",textAlign:"center",WebkitTapHighlightColor:"transparent"}}>
            <div style={{fontSize:17,marginBottom:4}}>{d.icon}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:10,color:sel===i?"white":NAVY,lineHeight:1.3}}>{d.name}</div>
          </button>
        ))}
      </div>
      <FI>
        <div style={{background:"white",borderRadius:13,padding:w<640?16:22,border:"1.5px solid #E5E7EB",display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:20}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
              <span style={{fontSize:20}}>{designs[sel].icon}</span>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY}}>{designs[sel].name}</div>
              <span style={{background:LT,color:TEAL,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:100}}>{designs[sel].ms}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {designs[sel].d.map(d=>(
                <div key={d} style={{display:"flex",alignItems:"center",gap:7,background:"#F8FAFB",borderRadius:7,padding:"8px 10px"}}>
                  <div style={{width:15,height:15,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:NAVY,borderRadius:11,padding:20,display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{color:"rgba(255,255,255,.35)",fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Reporting Standard</div>
            <div style={{color:"#34D399",fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:7}}>{designs[sel].ms}</div>
            <div style={{color:"rgba(255,255,255,.45)",fontFamily:"'DM Sans',sans-serif",fontSize:12,lineHeight:1.7,marginBottom:14}}>{designs[sel].name} manuscripts follow {designs[sel].ms} reporting guidelines — checklist included.</div>
            <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:6,background:TEAL,color:"white",padding:"10px 16px",borderRadius:8,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,minHeight:40}}>Discuss This Design →</a>
          </div>
        </div>
      </FI>
    </ExpandSection>
  );
}

function WhoIHelp(){
  const w=useW();
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
      <div style={{display:"grid",gridTemplateColumns:cols(w,3,2,1),gap:13}}>
        {clients.map((c,i)=>(
          <FI key={c.t} d={i*40}>
            <div style={{background:"#F8FAFB",borderRadius:12,padding:20,border:"1.5px solid #E5E7EB",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="white";e.currentTarget.style.borderColor=c.c;}}
              onMouseLeave={e=>{e.currentTarget.style.background="#F8FAFB";e.currentTarget.style.borderColor="#E5E7EB";}}>
              <div style={{fontSize:28,marginBottom:9}}>{c.e}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY,marginBottom:7}}>{c.t}</div>
              <div style={{background:`${c.c}18`,color:c.c,fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif",padding:"2px 9px",borderRadius:100,display:"inline-block",marginBottom:8}}>{c.tag}</div>
              <p style={{color:"#6B7280",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.7,margin:0}}>{c.d}</p>
            </div>
          </FI>
        ))}
      </div>
    </ExpandSection>
  );
}


/* ════════════════════════════════════════════════════════════════
   Medical Specialties Supported — expanded, requested set of 16
   (replaces SpecialtiesSection's grid content; keeps same shell)
   ════════════════════════════════════════════════════════════════ */
function SpecialtiesSection(){
  const[open,setOpen]=useState(null);
  const w=useW();
  const specs=[
    {n:"General Medicine",i:"🩺",d:"Hypertension, DM, CKD, metabolic syndrome — prospective and retrospective study support.",ex:"Predictors of 30-day mortality in hospitalised T2DM patients (n=184) — logistic regression, full IMRAD manuscript."},
    {n:"Cardiology",i:"❤️",d:"CV outcomes, RCT support, ECG/echo data, cardiovascular risk stratification.",ex:"SGLT-2 inhibitors and MACE — PRISMA systematic review and meta-analysis (35 RCTs, n=28,471)."},
    {n:"Oncology",i:"🎗️",d:"Survival analysis, response rates, RECIST criteria, oncology RCT support.",ex:"Kaplan-Meier overall survival by treatment arm with Cox regression and at-risk tables."},
    {n:"Pulmonology",i:"🫁",d:"Spirometry data, COPD outcomes, lung function analysis, respiratory trial support.",ex:"Cross-sectional analysis of spirometry parameters vs. symptom scores — STROBE reporting."},
    {n:"Critical Care",i:"⚡",d:"ICU outcome data, APACHE/SOFA scores, ventilator parameters, sepsis research.",ex:"ICU admission and mechanical ventilation as outcomes — chi-square and logistic regression."},
    {n:"Endocrinology",i:"⚗️",d:"Glycaemic control, hormonal assay interpretation, thyroid and adrenal research.",ex:"HbA1c subgroup forest plot showing effect modification on cardiovascular benefit (p-interaction=0.031)."},
    {n:"Nephrology",i:"🧪",d:"eGFR analysis, CKD staging, dialysis outcomes, renal replacement therapy research.",ex:"eGFR <60 ml/min as an independent mortality predictor (adjusted OR 2.11, 95% CI 1.08–4.13)."},
    {n:"Neurology",i:"🧠",d:"Stroke outcomes, cognitive scores, neurological rating scales, MRI data integration.",ex:"Survival and functional-outcome analysis using validated neurological scoring systems."},
    {n:"Psychiatry",i:"🧩",d:"Validated psychiatric scales (PHQ-9, GAF, PANSS), mental health outcomes research.",ex:"Cross-sectional survey analysis with descriptive statistics and STROBE-compliant reporting."},
    {n:"Pediatrics",i:"👶",d:"Growth chart analysis, paediatric scoring systems, developmental outcome studies.",ex:"Cohort analysis of growth parameters with age- and sex-adjusted regression models."},
    {n:"Orthopedics",i:"🦴",d:"Functional scores (VAS, KOOS, SF-36), implant registry, surgical outcomes.",ex:"Pre/post-operative functional score comparison using paired t-tests and effect sizes."},
    {n:"Obstetrics & Gynecology",i:"🌸",d:"Maternal outcomes, fertility analysis, hormonal data, obstetric complication studies.",ex:"Retrospective cohort of obstetric complications with multivariable logistic regression."},
    {n:"Dermatology",i:"🔬",d:"PASI/DLQI scores, dermatological outcome research.",ex:"Treatment-response analysis using validated severity indices with before/after comparison."},
    {n:"ENT",i:"👂",d:"Audiological data, surgical outcome studies, nasal/sinus scoring systems.",ex:"Pre/post-surgical audiometric outcome analysis with non-parametric testing."},
    {n:"Ophthalmology",i:"👁️",d:"Visual acuity, IOP data, retinal imaging outcomes, ophthalmic trial support.",ex:"Visual acuity change analysis with repeated-measures statistical models."},
    {n:"Surgery",i:"🏥",d:"Post-operative outcomes, complication analysis, surgical technique comparison.",ex:"Post-operative complication rates compared across techniques — chi-square / Fisher's exact."},
  ];
  return(
    <ExpandSection id="specialties" dark label="Clinical Scope" title="Medical Specialties Supported" sub="Research methodology and manuscript support across all major medical specialties. Expand any specialty for a worked example." cta="Discuss Your Specialty">
      <div style={{display:"grid",gridTemplateColumns:cols(w,4,3,2),gap:8,marginBottom:12}}>
        {specs.map((s,i)=>(
          <FI key={s.n} d={i*15}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?TEAL:"rgba(255,255,255,.04)",border:`1px solid ${open===i?TEAL:"rgba(255,255,255,.09)"}`,borderRadius:10,padding:"11px 7px",cursor:"pointer",textAlign:"center",transition:"all .3s",WebkitTapHighlightColor:"transparent"}}>
              <div style={{fontSize:18,marginBottom:4}}>{s.i}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:600,color:open===i?"white":"rgba(255,255,255,.6)",lineHeight:1.3}}>{s.n}</div>
            </button>
          </FI>
        ))}
      </div>
      {open!==null&&<FI>
        <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.14)",borderRadius:11,padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:10}}>
            <span style={{fontSize:26}}>{specs[open].i}</span>
            <div style={{flex:1,minWidth:200}}>
              <div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,marginBottom:3}}>{specs[open].n}</div>
              <div style={{color:"rgba(255,255,255,.55)",fontFamily:"'DM Sans',sans-serif",fontSize:12,lineHeight:1.6}}>{specs[open].d}</div>
            </div>
            <a href="#contact" style={{background:TEAL,color:"white",padding:"9px 14px",borderRadius:7,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,whiteSpace:"nowrap",minHeight:40,display:"flex",alignItems:"center"}}>Discuss →</a>
          </div>
          <div style={{background:"rgba(14,122,107,.12)",border:"1px solid rgba(14,122,107,.25)",borderRadius:8,padding:"10px 14px"}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:"#34D399",letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>Example Project</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>{specs[open].ex}</div>
          </div>
        </div>
      </FI>}
      <div style={{marginTop:10,background:"rgba(14,122,107,.11)",border:"1px solid rgba(14,122,107,.22)",borderRadius:9,padding:"10px 14px",textAlign:"center"}}>
        <span style={{color:"rgba(255,255,255,.45)",fontFamily:"'DM Sans',sans-serif",fontSize:12}}>Additional specialties supported based on study design. <a href="#contact" style={{color:"#34D399",textDecoration:"none",fontWeight:600}}>Contact to discuss →</a></span>
      </div>
    </ExpandSection>
  );
}

/* ════════════════════════════════════════════════════════════════
   NEW COMPONENTS — Sample Deliverables Gallery, What You Send/Receive,
   Publication Roadmap, Reviewer Response Showcase, Medical Specialties
   (expanded), AI-Assisted Scientific Review (already exists as
   AIQualitySection — enhanced separately)
   ════════════════════════════════════════════════════════════════ */

/* ── Sample Deliverables Gallery ─────────────────────────────────
   Expandable cards built from DOCX Sections 1–8.
   Reuses the diabetes mortality cohort dataset (n=184) throughout
   for narrative consistency. */
function DeliverablesGallery(){
  const[open,setOpen]=useState(null);
  const w=useW();

  const cards=[
    {
      id:"raw-to-manuscript",
      icon:"🔄",
      title:"Raw Data → Cleaning → SPSS → Table → Manuscript",
      sub:"The full analytical pipeline, one dataset, start to finish",
      color:"#3B82F6",
    },
    {
      id:"tlf-tables",
      icon:"📋",
      title:"Publication Tables (TLFs)",
      sub:"Baseline characteristics, outcomes, regression, subgroups",
      color:TEAL,
    },
    {
      id:"prisma",
      icon:"🔍",
      title:"PRISMA Systematic Review",
      sub:"PICO, search strategy, flow diagram, methods text",
      color:"#7C3AED",
    },
    {
      id:"forest",
      icon:"🌲",
      title:"Forest Plot Examples",
      sub:"Primary meta-analysis & subgroup effect-modification plots",
      color:"#16A34A",
    },
    {
      id:"km",
      icon:"📈",
      title:"Kaplan–Meier Survival Analysis",
      sub:"Survival curves, log-rank tests, Cox regression",
      color:"#DB2777",
    },
    {
      id:"thesis",
      icon:"🎓",
      title:"Thesis Development Workflow",
      sub:"MD thesis chapters → journal manuscript conversion",
      color:"#F59E0B",
    },
    {
      id:"manuscript",
      icon:"📄",
      title:"Manuscript Development Workflow",
      sub:"Abstract, Introduction, Methods, Results, Discussion",
      color:"#0891B2",
    },
  ];

  return(
    <ExpandSection id="gallery" label="Sample Work" title="Sample Deliverables Gallery" sub="Real examples of how raw clinical data becomes publication-ready science. Expand any card to view a worked example." cta="Request Samples for Your Project">
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {cards.map((c,i)=>(
          <div key={c.id} style={{border:`1.5px solid ${open===i?c.color:"#E5E7EB"}`,borderRadius:12,overflow:"hidden",transition:"border-color .3s",background:"white"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${c.color}08`:"white",border:"none",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left",gap:10,minHeight:56,WebkitTapHighlightColor:"transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${c.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{c.icon}</div>
                <div style={{minWidth:0}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,color:NAVY,lineHeight:1.3}}>{c.title}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",marginTop:2}}>{c.sub}</div>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,transform:open===i?"rotate(180deg)":"none",transition:"transform .3s"}}><path d="M6 9l6 6 6-6" stroke={open===i?c.color:"#9CA3AF"} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {open===i&&<div style={{padding:"0 16px 20px"}}>
              {c.id==="raw-to-manuscript"&&<RawToManuscriptCard w={w}/>}
              {c.id==="tlf-tables"&&<TLFTablesCard w={w}/>}
              {c.id==="prisma"&&<PRISMACard w={w}/>}
              {c.id==="forest"&&<ForestPlotCard w={w}/>}
              {c.id==="km"&&<KaplanMeierCard w={w}/>}
              {c.id==="thesis"&&<ThesisWorkflowCard w={w}/>}
              {c.id==="manuscript"&&<ManuscriptWorkflowCard w={w}/>}
            </div>}
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

/* ---------- Card 1: Raw → Cleaning → SPSS → Table → Manuscript ---------- */
function RawToManuscriptCard({w}){
  const[step,setStep]=useState(0);
  const steps=["Raw Data","Cleaning","SPSS Output","Pub. Table","Manuscript"];
  return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>
        Based on a real consulting workflow: a prospective cohort study of 184 hospitalised patients with type 2 diabetes, examining predictors of 30-day mortality.
      </p>
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {steps.map((s,i)=><button key={s} onClick={()=>setStep(i)} style={{background:step===i?NAVY:"white",color:step===i?"white":"#374151",border:`1.5px solid ${step===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"7px 14px",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",minHeight:36,WebkitTapHighlightColor:"transparent"}}>{i+1}. {s}</button>)}
      </div>

      {step===0&&<div>
        <div style={{background:"white",borderRadius:10,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
          <div style={{background:NAVY,padding:"9px 14px"}}><span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11}}>Raw Clinical Dataset (Excerpt, n = 184)</span></div>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:480}}>
              <thead><tr style={{background:"#F8FAFB"}}>{["Pt ID","Age","Sex","BMI","HTN","DM","Outcome"].map(h=><th key={h} style={{padding:"7px 10px",textAlign:"left",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:NAVY,borderBottom:"2px solid #E5E7EB",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{[
                ["PT-001","58","M","27.4","Yes","No","0 (Survived)"],
                ["PT-002","72","F","31.2","Yes","Yes","1 (Deceased)"],
                ["PT-003","45","M","23.8","No","No","0 (Survived)"],
                ["PT-005","81","M","35.7","Yes","Yes","1 (Deceased)"],
                ["…","…","…","…","…","…","…"],
                ["PT-184","62","M","25.9","No","No","0 (Survived)"],
              ].map((r,i)=><tr key={i} style={{background:i%2===0?"white":"#F8FAFB",borderBottom:"1px solid #F3F4F6"}}>{r.map((c,j)=><td key={j} style={{padding:"6px 10px",fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#374151",whiteSpace:"nowrap"}}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
        <div style={{marginTop:10,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",lineHeight:1.6}}>Full dataset: 184 consecutive admissions, General Medicine Ward, Jan–Dec 2022 — accepted in any format (Excel, SPSS, CSV).</div>
      </div>}

      {step===1&&<div style={{background:"#F8FAFB",borderRadius:10,border:"1.5px solid #E5E7EB",padding:"14px 16px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:10}}>Data Cleaning Checklist</div>
        {[
          "Missing data audit — 6 BMI values missing (3.3%); imputed using median of sex-matched subgroup",
          "Outlier detection — Grubbs test applied; one extreme BMI (61.4) retained after clinical verification",
          "Variable coding — Sex: Male=1, Female=0; Hypertension/Diabetes: Yes=1, No=0",
          "Outcome variable confirmed binary (0/1); no partial events",
          "Duplicate records checked — none identified",
          "Final analytic dataset: n = 184 (0 excluded after cleaning)",
        ].map((t,i)=><div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<5?"1px solid #F3F4F6":"none"}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/></svg>
          </div>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",lineHeight:1.6}}>{t}</span>
        </div>)}
      </div>}

      {step===2&&<div>
        <div style={{background:"white",borderRadius:10,border:"1.5px solid #E5E7EB",overflow:"hidden",marginBottom:10}}>
          <div style={{background:NAVY,padding:"9px 14px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}><span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11}}>Raw SPSS Output — Variables in the Equation</span><span style={{color:"rgba(255,255,255,.3)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>As received from software</span></div>
          <div style={{background:"#1E1E2E",padding:"12px 14px",fontFamily:"monospace",fontSize:10,color:"#A6E3A1",lineHeight:1.9,overflowX:"auto"}}>
            <div style={{color:"#89B4FA"}}>Variables in the Equation — Step 1a</div>
            <div>Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B=.074&nbsp; SE=.018&nbsp; Wald=16.890&nbsp; Sig.=.000&nbsp; Exp(B)=1.077</div>
            <div>Sex(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B=.412&nbsp; SE=.228&nbsp; Wald=3.270&nbsp;&nbsp; Sig.=.071&nbsp; Exp(B)=1.510</div>
            <div>BMI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B=.063&nbsp; SE=.029&nbsp; Wald=4.710&nbsp;&nbsp; Sig.=.030&nbsp; Exp(B)=1.065</div>
            <div>HTN(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B=.847&nbsp; SE=.291&nbsp; Wald=8.460&nbsp;&nbsp; Sig.=.004&nbsp; Exp(B)=2.333</div>
            <div>DM(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B=1.024 SE=.318&nbsp; Wald=10.370 Sig.=.001&nbsp; Exp(B)=2.784</div>
            <div style={{color:"#F38BA8"}}>Constant&nbsp;&nbsp;&nbsp;&nbsp; B=-6.312 SE=.981&nbsp; Wald=41.450 Sig.=.000&nbsp; Exp(B)=.002</div>
          </div>
          <div style={{padding:"8px 14px",background:"#F8FAFB",borderTop:"1px solid #E5E7EB"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>SPSS v27.0. Nagelkerke R² = 0.341. Hosmer–Lemeshow χ²(8)=6.24, p=.620. Model χ²(5)=47.82, p&lt;.001.</span></div>
        </div>
        <div style={{background:"#FEF3C7",borderRadius:8,padding:"10px 14px"}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#92400E",fontWeight:600}}>✦ This raw output is unusable for direct manuscript inclusion — no journal compliance, machine notation only.</span>
        </div>
      </div>}

      {step===3&&<div>
        <div style={{background:"white",borderRadius:10,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
          <div style={{background:NAVY,padding:"9px 14px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}><span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11}}>Table 3. Multivariable Logistic Regression — Predictors of 30-Day Mortality</span><span style={{color:"rgba(255,255,255,.3)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>Journal Format</span></div>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:380}}>
              <thead><tr style={{background:"#F8FAFB"}}>{["Predictor Variable","Adj. OR (95% CI)","P-value"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:h==="Predictor Variable"?"left":"center",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:NAVY,borderBottom:"2px solid #E5E7EB",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{[
                ["Age (per year)","1.08 (1.04–1.12)","<0.001",true],
                ["Male sex","1.46 (0.93–2.31)","0.099",false],
                ["BMI (per unit)","1.07 (1.01–1.13)","0.030",true],
                ["Hypertension","2.33 (1.32–4.13)","0.004",true],
                ["Diabetes mellitus","2.78 (1.49–5.20)","0.001",true],
                ["eGFR <60 ml/min","2.11 (1.08–4.13)","0.029",true],
              ].map((r,i)=><tr key={i} style={{background:i%2===0?"white":"#F8FAFB",borderBottom:"1px solid #F3F4F6"}}>
                <td style={{padding:"8px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151",fontWeight:500}}>{r[0]}</td>
                <td style={{padding:"8px 12px",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r[1]}</td>
                <td style={{padding:"8px 12px",textAlign:"center"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:r[3]?700:400,color:r[3]?TEAL:"#6B7280"}}>{r[2]}</span></td>
              </tr>)}</tbody>
            </table>
          </div>
          <div style={{padding:"8px 14px",background:"#F8FAFB",borderTop:"1px solid #E5E7EB"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>OR = Odds Ratio; CI = Confidence Interval. Nagelkerke R² = 0.341. Reference: Female sex; No hypertension; No diabetes; eGFR ≥60.</span></div>
        </div>
      </div>}

      {step===4&&<div style={{background:LT,border:`1.5px solid ${TEAL}40`,borderRadius:10,padding:"16px 18px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:8}}>✦ Manuscript Results Text</div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42",lineHeight:1.85,margin:0,fontStyle:"italic",background:"white",padding:"14px 16px",borderRadius:8,border:"1px solid rgba(14,122,107,.2)"}}>
          On multivariable binary logistic regression, five variables independently predicted 30-day mortality: increasing age (adjusted OR 1.08, 95% CI 1.04–1.12; p &lt; 0.001), hypertension (adjusted OR 2.33, 95% CI 1.32–4.13; p = 0.004), diabetes mellitus comorbidity (adjusted OR 2.78, 95% CI 1.49–5.20; p = 0.001), higher BMI (adjusted OR 1.07 per unit, 95% CI 1.01–1.13; p = 0.030), and eGFR &lt;60 ml/min (adjusted OR 2.11, 95% CI 1.08–4.13; p = 0.029). The model demonstrated good calibration (Hosmer–Lemeshow p = 0.620) and explained 34.1% of variance (Nagelkerke R² = 0.341).
        </p>
        <div style={{marginTop:10}}><span style={{background:"white",color:TEAL,fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:100,border:`1px solid ${TEAL}40`}}>Drops directly into your Results section</span></div>
      </div>}
    </div>
  );
}

/* ---------- Card 2: Publication Tables (TLFs) ---------- */
function TLFTablesCard({w}){
  const[tab,setTab]=useState(0);
  const tabs=["Table 1: Baseline","Table 2: Outcomes","Table 4: Subgroups","Table 5: Adverse Events"];
  return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>Every research manuscript or thesis is delivered with a standard suite of ICMJE/Vancouver-compliant tables, each with a written interpretation.</p>
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {tabs.map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?NAVY:"white",color:tab===i?"white":"#374151",border:`1.5px solid ${tab===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"7px 14px",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",minHeight:36,WebkitTapHighlightColor:"transparent"}}>{t}</button>)}
      </div>

      {tab===0&&<TableBlock title="Table 1. Baseline Characteristics" cols={["Characteristic","Survivors (n=146)","Non-Survivors (n=38)","P-value"]} rows={[
        ["Age, years — mean (SD)","60.9 (11.2)","73.2 (9.4)","<0.001",true],
        ["Male sex — n (%)","77 (52.7%)","23 (60.5%)","0.382",false],
        ["BMI, kg/m² — mean (SD)","26.8 (4.1)","30.2 (4.8)","<0.001",true],
        ["Hypertension — n (%)","71 (48.6%)","30 (78.9%)","<0.001",true],
        ["Diabetes mellitus — n (%)","42 (28.8%)","22 (57.9%)","0.001",true],
        ["eGFR <60 ml/min — n (%)","33 (22.6%)","19 (50.0%)","0.001",true],
        ["Haemoglobin, g/dL — mean (SD)","12.8 (2.1)","11.2 (2.4)","<0.001",true],
      ]} note="Data presented as mean (SD) or n (%). P-values from independent t-test or chi-square." interp="Patients who died within 30 days were significantly older, had higher BMI, and a substantially greater burden of comorbidity compared to survivors."/>}

      {tab===1&&<TableBlock title="Table 2. Primary Outcome Analysis" cols={["Outcome Measure","Survivors (n=146)","Non-Survivors (n=38)","P-value"]} rows={[
        ["ICU admission — n (%)","18 (12.3%)","29 (76.3%)","<0.001",true],
        ["Mechanical ventilation — n (%)","4 (2.7%)","21 (55.3%)","<0.001",true],
        ["Hospital LOS, days — median (IQR)","5 (3–8)","14 (8–22)","<0.001",true],
        ["Readmission at 30 days — n (%)","22 (15.1%)","N/A","—",false],
      ]} note="LOS = Length of Stay. Hospital LOS compared by Mann-Whitney U test." interp="Non-survivors had markedly worse outcomes: 76.3% required ICU admission vs. 12.3% of survivors, and hospital stay was nearly three times longer (median 14 vs. 5 days)."/>}

      {tab===2&&<TableBlock title="Table 4. Pre-Specified Subgroup Analysis" cols={["Subgroup","n","Adj. OR","95% CI","P-int."]} rows={[
        ["Age < 65 years","98","1.92","0.88–4.18","0.043",false],
        ["Age ≥ 65 years","86","3.84","1.72–8.56","—",true],
        ["Male sex","100","2.94","1.38–6.27","0.312",false],
        ["Female sex","84","2.51","0.98–6.44","—",false],
      ]} note="P-interaction tests for effect modification via likelihood ratio test. Pre-specified in the SAP." interp="A significant interaction was found between age group and mortality risk (p-interaction = 0.043) — older patients (≥65) had a much higher adjusted OR (3.84) than younger patients (1.92)."/>}

      {tab===3&&<TableBlock title="Table 5. Adverse Events Summary" cols={["Adverse Event","All Patients (n=184)","Grade ≥3 — n (%)"]} rows={[
        ["Any adverse event","102 (55.4%)","41 (22.3%)",false],
        ["Acute kidney injury","48 (26.1%)","14 (7.6%)",true],
        ["Hypotension","37 (20.1%)","9 (4.9%)",false],
        ["Nosocomial infection","29 (15.8%)","8 (4.3%)",false],
        ["Death (30-day)","38 (20.7%)","38 (20.7%)",true],
      ]} note="Classified per CTCAE v5.0. Grade ≥3 = severe, life-threatening, or fatal." interp="Adverse events occurred in over half of all patients. Acute kidney injury was the most frequent complication (26.1%), with 7.6% classified as severe."/>}
    </div>
  );
}
function TableBlock({title,cols,rows,note,interp}){
  return(
    <div>
      <div style={{background:"white",borderRadius:10,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
        <div style={{background:NAVY,padding:"9px 14px"}}><span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11}}>{title}</span></div>
        <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:380}}>
            <thead><tr style={{background:"#F8FAFB"}}>{cols.map((h,i)=><th key={h} style={{padding:"8px 12px",textAlign:i===0?"left":"center",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:NAVY,borderBottom:"2px solid #E5E7EB",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>{rows.map((r,i)=>{
              const sig=r[r.length-1];
              const vals=r.slice(0,-1);
              return<tr key={i} style={{background:i%2===0?"white":"#F8FAFB",borderBottom:"1px solid #F3F4F6"}}>
                {vals.map((c,j)=><td key={j} style={{padding:"7px 12px",textAlign:j===0?"left":"center",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:j===vals.length-1&&sig?TEAL:"#374151",fontWeight:j===0?500:(j===vals.length-1&&sig?700:400),whiteSpace:"nowrap"}}>{c}</td>)}
              </tr>;
            })}</tbody>
          </table>
        </div>
        <div style={{padding:"8px 14px",background:"#F8FAFB",borderTop:"1px solid #E5E7EB"}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>{note}</span></div>
      </div>
      <div style={{marginTop:10,background:LT,border:`1px solid ${TEAL}40`,borderRadius:8,padding:"10px 14px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:NAVY,marginBottom:4}}>Interpretation</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42",lineHeight:1.7}}>{interp}</div>
      </div>
    </div>
  );
}

/* ---------- Card 3: PRISMA Systematic Review ---------- */
function PRISMACard({w}){
  return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>Example: a PRISMA 2020-compliant systematic review and meta-analysis of SGLT-2 inhibitors and cardiovascular outcomes in type 2 diabetes.</p>
      <div style={{background:"#F8FAFB",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"14px 16px",marginBottom:12}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:8}}>PICO Framework</div>
        {[["P","Population","Adults (≥18) with type 2 diabetes mellitus"],["I","Intervention","SGLT-2 inhibitor therapy"],["C","Comparator","Placebo or active comparator (GLP-1 agonist)"],["O","Outcome","Major adverse cardiovascular events (MACE)"]].map(([l,t,d])=>(
          <div key={l} style={{display:"flex",gap:10,padding:"6px 0",borderBottom:"1px solid #F3F4F6"}}>
            <div style={{width:22,height:22,borderRadius:6,background:`${"#7C3AED"}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:11,color:"#7C3AED"}}>{l}</span></div>
            <div><span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY}}>{t}: </span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{d}</span></div>
          </div>
        ))}
      </div>

      {/* Flow funnel */}
      <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:8}}>PRISMA 2020 Flow Diagram</div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,marginBottom:12}}>
        {[
          {n:"1,806",l:"Records identified",s:"PubMed 847 · Embase 612 · CENTRAL 203 · CINAHL 144",c:"#3B82F6"},
          {n:"1,241",l:"After duplicates removed",s:"565 duplicates removed",c:"#F59E0B"},
          {n:"254",l:"Full texts assessed",s:"987 excluded at title/abstract",c:"#7C3AED"},
          {n:"35",l:"Studies in meta-analysis",s:"219 excluded after full-text (wrong population/intervention/outcome)",c:"#16A34A"},
        ].map((b,i,arr)=>(
          <div key={b.l} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:"100%",background:"white",border:`2px solid ${b.c}40`,borderRadius:10,padding:"9px 13px",display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:48,height:36,borderRadius:8,background:`${b.c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:800,color:b.c}}>{b.n}</span></div>
              <div><div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY}}>{b.l}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#6B7280"}}>{b.s}</div></div>
            </div>
            {i<arr.length-1&&<div style={{width:2,height:14,background:"#E5E7EB"}}/>}
          </div>
        ))}
      </div>

      <div style={{background:LT,border:`1px solid ${TEAL}40`,borderRadius:8,padding:"10px 14px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:NAVY,marginBottom:4}}>Methods Text Excerpt</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42",lineHeight:1.7,fontStyle:"italic"}}>Two independent reviewers screened all titles/abstracts using Covidence software (Cohen's kappa = 0.87 for full-text agreement). Disagreements were resolved by a third reviewer.</div>
      </div>
    </div>
  );
}

/* ---------- Card 4: Forest Plot Examples ---------- */
function ForestPlotCard({w}){
  const studies=[
    {l:"EMPA-REG OUTCOME (2015)",or:0.86,lo:0.74,hi:0.99,wt:18.4},
    {l:"CANVAS Program (2017)",or:0.86,lo:0.75,hi:0.97,wt:19.8},
    {l:"DECLARE–TIMI 58 (2019)",or:0.93,lo:0.84,hi:1.03,wt:22.1},
    {l:"CREDENCE (2019)",or:0.74,lo:0.60,hi:0.91,wt:12.6},
    {l:"SCORED (2020)",or:0.77,lo:0.65,hi:0.91,wt:13.2},
    {l:"SOLOIST-WHF (2020)",or:0.67,lo:0.52,hi:0.89,wt:8.6},
    {l:"EMPEROR-Reduced (2020)",or:0.75,lo:0.62,hi:0.90,wt:5.3},
  ];
  const sc=v=>40+(Math.log(v)-Math.log(0.4))/(Math.log(2.2)-Math.log(0.4))*380;
  return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>Forest plots produced in R (meta/metafor) or RevMan 5.4, delivered at 300 DPI (TIFF/EPS) — journal submission ready.</p>
      <div style={{background:"white",borderRadius:10,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
        <div style={{background:NAVY,padding:"9px 14px"}}><span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11}}>Figure 1. SGLT-2 Inhibitors vs. MACE — Primary Meta-Analysis</span></div>
        <div style={{padding:"16px",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <svg viewBox="0 0 480 260" style={{width:"100%",maxHeight:260,minWidth:340}}>
            <line x1={sc(1)} y1="10" x2={sc(1)} y2="240" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4,4"/>
            {studies.map((s,i)=>{
              const y=30+i*28;
              return<g key={s.l}>
                <text x="5" y={y+4} fontSize="9" fill="#374151" fontFamily="DM Sans">{s.l}</text>
                <line x1={sc(s.lo)} y1={y} x2={sc(s.hi)} y2={y} stroke={TEAL} strokeWidth="1.5"/>
                <rect x={sc(s.or)-4} y={y-4} width={8} height={8} fill={TEAL} rx="2"/>
                <text x="430" y={y+4} fontSize="8" fill="#6B7280" fontFamily="DM Sans">{s.or.toFixed(2)}</text>
              </g>;
            })}
            {/* pooled diamond */}
            <polygon points={`${sc(0.84)-14},236 ${sc(0.84)},230 ${sc(0.84)+14},236 ${sc(0.84)},242`} fill="#16A34A"/>
            <text x="5" y="240" fontSize="9" fontWeight="700" fill="#16A34A" fontFamily="DM Sans">Pooled (Random Effects)</text>
            <text x="430" y="240" fontSize="8" fontWeight="700" fill="#16A34A" fontFamily="DM Sans">0.84</text>
            <text x={sc(0.4)} y="255" fontSize="9" fill="#6B7280" fontFamily="DM Sans">Favours SGLT-2i</text>
            <text x={sc(1.6)} y="255" fontSize="9" fill="#6B7280" fontFamily="DM Sans" textAnchor="end">Favours Placebo</text>
          </svg>
        </div>
        <div style={{padding:"10px 14px",borderTop:"1px solid #E5E7EB",background:"#F8FAFB"}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4B5563"}}>Pooled OR = 0.84 (95% CI 0.79–0.90); I² = 24.3% (p-heterogeneity = 0.26); Egger's test p = 0.41 (no publication bias).</span>
        </div>
      </div>
      <div style={{marginTop:10,background:LT,border:`1px solid ${TEAL}40`,borderRadius:8,padding:"10px 14px"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:NAVY,marginBottom:4}}>Subgroup Analysis Available</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42",lineHeight:1.7}}>A second forest plot stratified by baseline HbA1c showed a significant interaction (p = 0.031): patients with HbA1c ≥8.0% had greater benefit (pooled OR 0.81) than those &lt;8.0% (pooled OR 0.94).</div>
      </div>
    </div>
  );
}

/* ---------- Card 5: Kaplan-Meier ---------- */
function KaplanMeierCard({w}){
  return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>Kaplan–Meier curves and Cox proportional hazards models produced in SPSS, R (survival/survminer) or Stata — fully customised colour, font, and at-risk tables.</p>
      <div style={{background:"white",borderRadius:10,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
        <div style={{background:NAVY,padding:"9px 14px"}}><span style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11}}>Figure 3. Overall Survival by Hypertension Status</span></div>
        <div style={{padding:"16px",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <svg viewBox="0 0 460 220" style={{width:"100%",maxHeight:220,minWidth:320}}>
            <line x1="45" y1="10" x2="45" y2="190" stroke="#D1D5DB" strokeWidth="1.5"/>
            <line x1="45" y1="190" x2="440" y2="190" stroke="#D1D5DB" strokeWidth="1.5"/>
            {[0,0.2,0.4,0.6,0.8,1.0].map((v,i)=><text key={v} x="38" y={193-i*36} textAnchor="end" fontSize="9" fill="#9CA3AF" fontFamily="DM Sans">{v.toFixed(1)}</text>)}
            <polyline points="45,10 120,28 180,52 230,72 290,92 360,112 440,128" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round"/>
            <polyline points="45,10 110,42 165,82 215,118 270,148 330,168 440,182" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6,3" strokeLinejoin="round"/>
            <rect x="280" y="20" width="155" height="48" rx="5" fill="white" stroke="#E5E7EB"/>
            <line x1="288" y1="36" x2="312" y2="36" stroke={TEAL} strokeWidth="2.5"/><text x="318" y="40" fontSize="10" fill="#374151" fontFamily="DM Sans">No Hypertension (n=100)</text>
            <line x1="288" y1="52" x2="312" y2="52" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="5,3"/><text x="318" y="56" fontSize="10" fill="#374151" fontFamily="DM Sans">Hypertension (n=84)</text>
            <text x="240" y="205" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="DM Sans">Time (months) — 0 to 36</text>
          </svg>
        </div>
        <div style={{padding:"10px 14px",borderTop:"1px solid #E5E7EB",background:"#F8FAFB"}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#4B5563"}}>Log-rank χ²(1) = 8.47, p = 0.004. Median survival: 34.8 months (no HTN) vs. 26.2 months (HTN).</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:w>=560?"1fr 1fr":"1fr",gap:8,marginTop:10}}>
        <div style={{background:"#F8FAFB",border:"1.5px solid #E5E7EB",borderRadius:8,padding:"10px 14px"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:NAVY,marginBottom:4}}>Cox Regression (Adjusted)</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>HR 1.62 (95% CI 1.05–2.50); p = 0.029 — adjusted for age, sex, BMI, diabetes.</div>
        </div>
        <div style={{background:LT,border:`1px solid ${TEAL}40`,borderRadius:8,padding:"10px 14px"}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:NAVY,marginBottom:4}}>Proportional Hazards</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1F4E42"}}>Confirmed by Schoenfeld residuals (global test p = 0.43).</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Card 6: Thesis Development Workflow ---------- */
function ThesisWorkflowCard({w}){
  const[step,setStep]=useState(0);
  const chapters=[
    {n:"Ch.1",t:"Background",d:"Knowledge gap framed against current literature — T2DM epidemiology, prior LMIC evidence gaps."},
    {n:"Ch.2",t:"Objectives",d:"Primary: identify independent predictors of 30-day mortality. 4 secondary objectives defined."},
    {n:"Ch.3",t:"Methodology",d:"Study design, setting, sample size (G*Power: n=230 with attrition), full Statistical Analysis Plan."},
    {n:"Ch.4",t:"SAP",d:"Primary analysis: binary logistic regression. Secondary: KM survival, Cox regression. Software specified."},
    {n:"Ch.5",t:"Results",d:"184/230 patients completed follow-up. Tables 1–5 with full statistical output."},
    {n:"Ch.6",t:"Discussion",d:"Five independent predictors discussed against mechanistic and registry evidence."},
    {n:"Ch.7",t:"Conclusion",d:"20.7% mortality; risk score AUROC 0.81 (95% CI 0.74–0.88); validation recommended."},
  ];
  return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>Example: an MD thesis — "Predictors of 30-Day Mortality in Hospitalised Patients with Type 2 Diabetes Mellitus" — built chapter by chapter, then converted into a journal manuscript.</p>
      <div style={{display:"grid",gridTemplateColumns:cols(w,4,3,2),gap:7,marginBottom:14}}>
        {chapters.map((c,i)=>(
          <button key={c.n} onClick={()=>setStep(i)} style={{background:step===i?NAVY:"white",border:`1.5px solid ${step===i?NAVY:"#E5E7EB"}`,borderRadius:9,padding:"9px 7px",cursor:"pointer",textAlign:"center",WebkitTapHighlightColor:"transparent"}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:10,color:step===i?"#34D399":TEAL}}>{c.n}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:10,color:step===i?"white":NAVY,marginTop:2}}>{c.t}</div>
          </button>
        ))}
      </div>
      <div style={{background:"#F8FAFB",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"14px 16px",marginBottom:14}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:6}}>{chapters[step].n} — {chapters[step].t}</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#4B5563",lineHeight:1.7}}>{chapters[step].d}</div>
      </div>

      <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:8}}>Thesis → Journal Manuscript Conversion</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {[["Chapter 1: Background","Introduction","Condensed to 3–4 paragraphs; focus on knowledge gap"],["Chapter 3: Methodology","Methods","Present tense; sufficient detail for replication"],["Chapter 5: Results","Results","Tables 1–5 retained; narrative condensed"],["Chapter 6: Discussion","Discussion","3–4 key findings + limitations paragraph"],["Chapter 7: Conclusion","Conclusion","2–3 sentences with clinical implications"]].map(([from,to,note])=>(
          <div key={from} style={{display:"flex",alignItems:"center",gap:8,background:"white",border:"1px solid #E5E7EB",borderRadius:8,padding:"8px 12px",flexWrap:"wrap"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:"#374151",minWidth:130}}>{from}</span>
            <span style={{color:TEAL,fontSize:13}}>→</span>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:NAVY,minWidth:80}}>{to}</span>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",flex:1}}>{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Card 7: Manuscript Development Workflow ---------- */
function ManuscriptWorkflowCard({w}){
  const[open,setOpen]=useState(null);
  const sections=[
    {t:"Abstract",icon:"📄",c:"#3B82F6",content:"BACKGROUND: Hospitalisation in T2DM patients is associated with elevated short-term mortality... METHODS: Prospective cohort, 184 patients... RESULTS: 38 (20.7%) died within 30 days; age, hypertension, and diabetes independently predicted mortality (all p<0.05). CONCLUSIONS: 30-day mortality was 20.7%. Early identification of high-risk patients may reduce preventable deaths."},
    {t:"Introduction",icon:"📖",c:TEAL,content:"T2DM affects 537 million adults worldwide with prevalence projected to reach 783 million by 2045. Patients with T2DM are hospitalised at 2–3-fold higher rates, yet data on independent predictors of short-term mortality from LMIC settings remain limited. This study aimed to identify independent predictors of 30-day mortality in hospitalised T2DM patients."},
    {t:"Methods",icon:"🔬",c:"#7C3AED",content:"A prospective cohort study was conducted at a 1,200-bed tertiary care institution (Jan–Dec 2022). Consecutive T2DM patients ≥18 years were enrolled. Data analysed using SPSS v27.0; binary logistic regression with forward stepwise selection identified independent predictors of 30-day mortality (p<0.05)."},
    {t:"Results",icon:"📊",c:"#F59E0B",content:"230 enrolled; 184 completed follow-up. Mean age 63.4±11.7 years; 54.3% male. 30-day mortality: 38 (20.7%, 95% CI 14.9–26.5%). Five variables independently predicted mortality: age (aOR 1.08), hypertension (aOR 2.33), diabetes (aOR 2.78), BMI (aOR 1.07), eGFR<60 (aOR 2.11)."},
    {t:"Discussion",icon:"💡",c:"#16A34A",content:"30-day mortality (20.7%) is consistent with published LMIC estimates. Hypertension's independent association (aOR 2.33) aligns with mechanistic evidence of end-organ damage and accelerated atherosclerosis — comparable to registry studies reporting OR 1.8–2.5."},
  ];
  return(
    <div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>A complete, ICMJE-formatted IMRAD manuscript — submission-ready for PubMed-indexed journals. Expand each section to see writing style and structure.</p>
      <div style={{background:NAVY,borderRadius:10,padding:"14px 16px",marginBottom:12}}>
        <div style={{color:"rgba(255,255,255,.4)",fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Sample Manuscript Title</div>
        <div style={{color:"white",fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,lineHeight:1.5}}>"Independent Predictors of 30-Day Mortality in Hospitalised Patients with Type 2 Diabetes Mellitus: A Prospective Cohort Study"</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {sections.map((s,i)=>(
          <div key={s.t} style={{border:`1.5px solid ${open===i?s.c:"#E5E7EB"}`,borderRadius:10,overflow:"hidden",transition:"border-color .3s"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?`${s.c}08`:"white",border:"none",padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left",gap:8,minHeight:48,WebkitTapHighlightColor:"transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:16}}>{s.icon}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY}}>{s.t}</span></div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{transform:open===i?"rotate(180deg)":"none",transition:"transform .3s"}}><path d="M6 9l6 6 6-6" stroke={open===i?s.c:"#9CA3AF"} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {open===i&&<div style={{padding:"0 14px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#4B5563",lineHeight:1.8}}>{s.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   What You Send → What You Receive
   ════════════════════════════════════════════════════════════════ */
function SendReceive(){
  const w=useW();
  const pairs=[
    {icon:"📁",send:"Raw Excel Dataset",sendSub:"Patient records, any format",arrow:"→",receive:["Cleaned & validated data","Full statistical analysis","Publication-ready tables & figures","Complete manuscript"],color:"#3B82F6"},
    {icon:"💡",send:"Research Idea",sendSub:"A clinical question or hypothesis",arrow:"→",receive:["Full study protocol","Methodology & study design","Statistical Analysis Plan","IRB-ready documentation"],color:TEAL},
    {icon:"🎓",send:"Thesis Topic",sendSub:"Title or area of interest",arrow:"→",receive:["Complete thesis (all chapters)","Statistical analysis & tables","Journal manuscript conversion","Formatted bibliography"],color:"#7C3AED"},
    {icon:"📨",send:"Reviewer Comments",sendSub:"Peer review feedback on submission",arrow:"→",receive:["Point-by-point response letter","Revised manuscript (tracked changes)","Updated tables/figures","Resubmission cover letter"],color:"#DB2777"},
  ];
  return(
    <ExpandSection id="send-receive" dark label="How It Works" title="What You Send → What You Receive" sub="Whatever stage you're at, here's exactly what comes back." cta="Send Your First File">
      <div style={{display:"grid",gridTemplateColumns:cols(w,2,1,1),gap:14}}>
        {pairs.map((p,i)=>(
          <FI key={p.send} d={i*60}>
            <div style={{background:"white",borderRadius:14,border:"1.5px solid #E5E7EB",overflow:"hidden"}}>
              <div style={{padding:"16px 18px",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:42,height:42,borderRadius:11,background:`${p.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{p.icon}</div>
                <div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:p.color,letterSpacing:1.5,textTransform:"uppercase",marginBottom:2}}>You Send</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY}}>{p.send}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280"}}>{p.sendSub}</div>
                </div>
              </div>
              <div style={{padding:"14px 18px"}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,color:"#16A34A",letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>You Receive</div>
                {p.receive.map(r=><div key={r} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0"}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#374151"}}>{r}</span>
                </div>)}
              </div>
            </div>
          </FI>
        ))}
      </div>
    </ExpandSection>
  );
}

/* ════════════════════════════════════════════════════════════════
   Publication Roadmap — interactive timeline
   ════════════════════════════════════════════════════════════════ */
function PublicationRoadmap(){
  const[active,setActive]=useState(0);
  const w=useW();
  const stages=[
    {icon:"💡",label:"Research Idea",detail:"Hypothesis, objectives, PICO framework defined."},
    {icon:"📋",label:"Protocol",detail:"Full protocol with methodology, sample size, SAP."},
    {icon:"✅",label:"Ethics / IRB",detail:"Ethics application, informed consent, approvals."},
    {icon:"🗂️",label:"Data Collection",detail:"CRF design, data tools, quality checks in the field."},
    {icon:"📊",label:"Statistical Analysis",detail:"SPSS/R/STATA analysis with test selection rationale."},
    {icon:"✍️",label:"Manuscript",detail:"Complete IMRAD manuscript, all sections written."},
    {icon:"🎯",label:"Journal Selection",detail:"Indexed journal shortlisted by scope, IF, acceptance rate."},
    {icon:"📬",label:"Submission",detail:"Cover letter, author declarations, portal submission."},
    {icon:"🔁",label:"Reviewer Response",detail:"Point-by-point rebuttal and manuscript revision."},
    {icon:"🏆",label:"Publication",detail:"Indexed in PubMed/Scopus — post-acceptance support."},
  ];
  const isMob=w<640;
  return(
    <ExpandSection id="roadmap" label="The Journey" title="Publication Roadmap" sub="From a research idea to an indexed publication — every milestone supported. Click a stage to see what happens." cta="Start Your Roadmap">
      <div style={{position:"relative"}}>
        {!isMob&&<div style={{position:"absolute",top:24,left:24,right:24,height:2,background:"#E5E7EB"}}/>}
        <div style={{display:isMob?"flex":"grid",flexDirection:isMob?"column":undefined,gridTemplateColumns:isMob?undefined:cols(w,5,5,2),gap:isMob?10:8,position:"relative"}}>
          {stages.map((s,i)=>(
            <div key={s.label} onClick={()=>setActive(i)} style={{display:"flex",flexDirection:isMob?"row":"column",alignItems:isMob?"center":"center",gap:isMob?12:0,cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:active===i?TEAL:i<active?"#DCFCE7":"white",border:`2px solid ${active===i?TEAL:i<active?"#16A34A":"#E5E7EB"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,transition:"all .3s",boxShadow:active===i?"0 0 0 6px rgba(14,122,107,.15)":"none",zIndex:1}}>
                {s.icon}
              </div>
              <div style={{textAlign:isMob?"left":"center",marginTop:isMob?0:8}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:isMob?13:11,color:active===i?TEAL:NAVY,lineHeight:1.3}}>{i+1}. {s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FI key={active}>
        <div style={{marginTop:24,background:"white",border:`1.5px solid ${TEAL}40`,borderRadius:12,padding:"18px 22px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{width:48,height:48,borderRadius:12,background:LT,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{stages[active].icon}</div>
          <div style={{flex:1,minWidth:200}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:NAVY,marginBottom:3}}>Stage {active+1}: {stages[active].label}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6B7280",lineHeight:1.6}}>{stages[active].detail}</div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>setActive(a=>Math.max(0,a-1))} style={{background:"white",border:"1.5px solid #E5E7EB",borderRadius:8,width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
            <button onClick={()=>setActive(a=>Math.min(stages.length-1,a+1))} style={{background:TEAL,border:"none",borderRadius:8,width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>→</button>
          </div>
        </div>
      </FI>
    </ExpandSection>
  );
}

/* ════════════════════════════════════════════════════════════════
   Reviewer Response Showcase
   ════════════════════════════════════════════════════════════════ */
function ReviewerResponseShowcase(){
  const[open,setOpen]=useState(0);
  const w=useW();
  const examples=[
    {
      reviewer:"\u201CThe authors did not adjust for renal function in the multivariable model. eGFR is a well-known confounder of mortality risk and should be included.\u201D",
      response:"We thank the reviewer for this important observation. We have re-run the multivariable logistic regression including eGFR (<60 vs. \u226560 ml/min) as an additional covariate (Table 3, revised). eGFR <60 ml/min was independently associated with 30-day mortality (adjusted OR 2.11, 95% CI 1.08\u20134.13; p = 0.029), and the associations for hypertension and diabetes remained statistically significant after this adjustment.",
      change:"Table 3 revised to include eGFR as a covariate; Results and Discussion updated accordingly (tracked changes, page 8).",
    },
    {
      reviewer:"\u201CThe sample size of 184 appears small for a logistic regression with five predictors. Please justify adequacy.\u201D",
      response:"We appreciate this concern. A sample size calculation was performed a priori using G*Power 3.1.9.7, based on an expected 30-day mortality of 18% and a desired precision of \u00b15% (95% CI width 10%), yielding a minimum required sample of 226 patients (230 enrolled, 184 completed follow-up). With 38 events and 5 predictors, the events-per-variable ratio (7.6) meets conventional thresholds for stable logistic regression estimates.",
      change:"Sample size justification added to Methods (new paragraph, page 5); G*Power citation added to references.",
    },
    {
      reviewer:"\u201CThe discussion does not adequately address the single-centre design as a limitation.\u201D",
      response:"We agree and have expanded the Limitations paragraph to explicitly address generalisability. We now state that the single-centre tertiary-care setting may limit external validity, and that case-mix at referral centres may differ from primary or secondary care settings. We have added a recommendation for multi-centre validation.",
      change:"Limitations paragraph expanded (page 11); one sentence added to Conclusion recommending external validation.",
    },
  ];
  return(
    <ExpandSection id="reviewer" label="Reviewer Responses" title="Reviewer Response Showcase" sub="Real examples of how reviewer comments are addressed — professionally, point-by-point, with manuscript changes tracked." cta="Get Help With Your Reviewer Comments">
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {examples.map((e,i)=><button key={i} onClick={()=>setOpen(i)} style={{background:open===i?NAVY:"white",color:open===i?"white":"#374151",border:`1.5px solid ${open===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"8px 16px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",minHeight:38,WebkitTapHighlightColor:"transparent"}}>Comment {i+1}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {/* Reviewer Comment */}
        <div style={{background:"#FEF2F2",border:"1.5px solid #FEE2E2",borderRadius:"12px 12px 0 0",padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>💬</div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:"#991B1B",letterSpacing:1,textTransform:"uppercase"}}>Reviewer Comment</span>
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#374151",lineHeight:1.7,margin:0,fontStyle:"italic"}}>{examples[open].reviewer}</p>
        </div>
        {/* Arrow */}
        <div style={{display:"flex",justifyContent:"center",background:"white",border:"1.5px solid #E5E7EB",borderTop:"none",borderBottom:"none"}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:LT,display:"flex",alignItems:"center",justifyContent:"center",margin:"-1px 0",transform:"translateY(-50%)",border:`2px solid ${TEAL}`}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        {/* Author Response */}
        <div style={{background:LT,border:`1.5px solid ${TEAL}40`,padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✍️</div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:NAVY,letterSpacing:1,textTransform:"uppercase"}}>Professional Author Response</span>
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#1F4E42",lineHeight:1.75,margin:0}}>{examples[open].response}</p>
        </div>
        {/* Arrow */}
        <div style={{display:"flex",justifyContent:"center",background:"white",border:"1.5px solid #E5E7EB",borderTop:"none",borderBottom:"none"}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",margin:"-1px 0",transform:"translateY(-50%)",border:"2px solid #16A34A"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        {/* Updated Manuscript */}
        <div style={{background:"#F0FDF4",border:"1.5px solid #DCFCE7",borderRadius:"0 0 12px 12px",padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>📄</div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:"#166534",letterSpacing:1,textTransform:"uppercase"}}>Updated Manuscript</span>
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#374151",lineHeight:1.7,margin:0}}>{examples[open].change}</p>
        </div>
      </div>
    </ExpandSection>
  );
}


function AIQualitySection(){
  const[tab,setTab]=useState(0);
  const w=useW();
  const aiFeats=[
    {i:"🤖",t:"AI-Assisted Manuscript Review",d:"AI flags inconsistencies, passive voice overuse, logical gaps before manuscripts reach reviewers."},
    {i:"📚",t:"Literature Screening",d:"Accelerated abstract screening — AI identifies relevant studies, human expert validates each."},
    {i:"🔍",t:"Scientific Consistency Review",d:"Automated cross-checking of data in text, tables, and figures for complete consistency."},
    {i:"📎",t:"Reference Verification",d:"Citation checking — journal names, volumes, pages, and DOI validity verified systematically."},
    {i:"✅",t:"Quality Control Review",d:"Multi-layer QC: methodology reporting, statistical notation, terminology, journal compliance."},
    {i:"🛡️",t:"Hallucination Detection",d:"Human-expert review of all AI-assisted content — every statement evidence-based."},
    {i:"📊",t:"Publication Readiness",d:"Structured scoring against journal criteria before submission — finds issues before reviewers do."},
    {i:"✏️",t:"Scientific Editing",d:"Precision editing for clarity, conciseness, and scientific tone — maintaining your voice."},
  ];
  const qcItems=[
    {i:"🔬",t:"Scientific Accuracy Review",d:"Every factual claim verified against cited sources. No unsupported statements."},
    {i:"📊",t:"Data-to-Text Verification",d:"All numbers in text, tables, and figures cross-checked against original analysis output."},
    {i:"📎",t:"Reference Verification",d:"Every citation checked: journal name, volume, pages, DOI — no phantom references."},
    {i:"🔄",t:"Consistency Review",d:"Terminology, abbreviations, units, and statistical notation verified throughout."},
    {i:"⚕️",t:"Medical Accuracy Review",d:"Drug names, dosages, anatomical terms reviewed for accuracy and current standards."},
    {i:"📋",t:"Table & Figure Review",d:"Tables and figures cross-checked against text for alignment, labeling, journal format."},
    {i:"✅",t:"Publication Readiness",d:"Final checklist against target journal's author guidelines — word count, format, sections."},
    {i:"🤖",t:"AI Content Review",d:"All AI-assisted content verified by human expert review for scientific accuracy."},
  ];
  return(
    <ExpandSection id="quality" label="Quality Assurance" title="Human Expertise + AI-Assisted Quality Review" sub="Expert methodology combined with AI efficiency — delivering higher-quality output in less time." cta="Request a Quality Review">
      <div style={{background:NAVY,borderRadius:12,padding:"18px 22px",marginBottom:18,display:"grid",gridTemplateColumns:w>=640?"1fr auto 1fr":"1fr",gap:16,alignItems:"center"}}>
        {[{e:"👨‍🔬",t:"Human Expert",d:"Research methodology, clinical understanding, scientific judgement"},{e:"",t:"",d:""},{e:"🤖",t:"AI-Assisted Efficiency",d:"Faster screening, consistency checks, quality control, error detection"}].map((c,i)=>{
          if(i===1)return<div key="plus" style={{textAlign:"center"}}><div style={{width:36,height:36,borderRadius:"50%",background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 4px"}}><span style={{color:"white",fontSize:16,fontWeight:800}}>+</span></div><div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700}}>= Better Output</div></div>;
          return<div key={c.t} style={{textAlign:"center"}}><div style={{fontSize:24,marginBottom:4}}>{c.e}</div><div style={{color:"white",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,marginBottom:2}}>{c.t}</div><div style={{color:"rgba(255,255,255,.38)",fontFamily:"'DM Sans',sans-serif",fontSize:11}}>{c.d}</div></div>;
        })}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:16,justifyContent:"center",flexWrap:"wrap"}}>
        {["AI-Enhanced Features","Quality Control Process"].map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?NAVY:"white",color:tab===i?"white":"#374151",border:`1.5px solid ${tab===i?NAVY:"#E5E7EB"}`,borderRadius:100,padding:"8px 16px",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",minHeight:38,WebkitTapHighlightColor:"transparent"}}>{t}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:cols(w,4,2,1),gap:10}}>
        {(tab===0?aiFeats:qcItems).map(f=>(
          <div key={f.t} style={{background:"#F8FAFB",borderRadius:11,padding:14,border:"1.5px solid #E5E7EB",transition:"all .3s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=LT;e.currentTarget.style.borderColor=TEAL;}}
            onMouseLeave={e=>{e.currentTarget.style.background="#F8FAFB";e.currentTarget.style.borderColor="#E5E7EB";}}>
            <div style={{fontSize:18,marginBottom:8}}>{f.i}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:NAVY,marginBottom:4}}>{f.t}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6B7280",lineHeight:1.6}}>{f.d}</div>
          </div>
        ))}
      </div>
    </ExpandSection>
  );
}

function ClientPsychology(){
  const w=useW();
  const without=["Thesis deadline missed or extended","Wrong statistical test applied","Journal rejection due to methodology","Tables formatted incorrectly","Unable to respond to reviewer comments","Data collected but never published","Months wasted on failed submissions","Missed career promotion opportunity"];
  const with_=["Clear methodology from day one","Appropriate statistical analysis selected","Manuscript formatted to journal standards","Thesis completed on time","Reviewer responses handled professionally","Data transformed into indexed publication","Fast, structured submission process","Academic profile strengthened"];
  return(
    <ExpandSection id="why-support" dark label="The Reality" title="Why Researchers Seek Professional Support" sub="The difference between struggling alone and publishing successfully is structured expert support." cta="Book a Free Consultation">
      <div style={{display:"grid",gridTemplateColumns:w>=768?"1fr auto 1fr":"1fr",gap:18,alignItems:"stretch"}}>
        <div style={{background:"rgba(239,68,68,.08)",border:"2px solid rgba(239,68,68,.2)",borderRadius:14,padding:22}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:16}}>
            <div style={{width:36,height:36,borderRadius:9,background:"rgba(239,68,68,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg></div>
            <div><div style={{color:"#FCA5A5",fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:13}}>Without Structured Support</div></div>
          </div>
          {without.map(x=><div key={x} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <div style={{width:15,height:15,borderRadius:"50%",background:"rgba(239,68,68,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></svg></div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,.45)",lineHeight:1.5}}>{x}</span>
          </div>)}
        </div>
        {w>=768&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 8px rgba(14,122,107,.14)"}}><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg></div>
          <div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,textAlign:"center"}}>Expert<br/>Support</div>
        </div>}
        <div style={{background:"rgba(14,122,107,.1)",border:"2px solid rgba(14,122,107,.28)",borderRadius:14,padding:22}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:16}}>
            <div style={{width:36,height:36,borderRadius:9,background:"rgba(14,122,107,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#34D399" strokeWidth="2"/></svg></div>
            <div><div style={{color:"#34D399",fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:13}}>With Structured Support</div></div>
          </div>
          {with_.map(x=><div key={x} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <div style={{width:15,height:15,borderRadius:"50%",background:"rgba(14,122,107,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#34D399" strokeWidth="3" strokeLinecap="round"/></svg></div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,.72)",lineHeight:1.5}}>{x}</span>
          </div>)}
        </div>
      </div>
    </ExpandSection>
  );
}

function Packages(){
  const w=useW();
  const pkgs=[
    {icon:"📘",title:"Thesis Support",tag:"Students & Residents",desc:"Complete thesis journey from synopsis to final submission.",features:["Synopsis & protocol writing","Literature review","Statistical analysis plan","Data analysis & interpretation","Thesis writing (all chapters)","Formatting & submission"],cta:"Discuss Thesis",hi:false},
    {icon:"📊",title:"Data Analysis + Manuscript",tag:"Most Popular",desc:"Transform your data into a publication-ready manuscript.",features:["Data cleaning & validation","Full statistical analysis","Publication-ready tables & figures","Complete IMRAD manuscript","Journal formatting","Submission-ready package"],cta:"Start Manuscript",hi:true},
    {icon:"📬",title:"Publication Support",tag:"Submitted Authors",desc:"Navigate post-submission with expert guidance.",features:["Journal selection strategy","Cover letter writing","Submission assistance","Reviewer response drafting","Manuscript revision","Resubmission support"],cta:"Get Support",hi:false},
    {icon:"🏆",title:"End-to-End Research",tag:"Premium Package",desc:"From research question to indexed publication — fully supported.",features:["All Thesis Support services","All Analysis + Manuscript","All Publication Support","Unlimited revisions","Priority turnaround","1-year post-publication support"],cta:"Enquire Now",hi:false},
  ];
  return(
    <section id="packages" style={{padding:`64px ${w<640?"1.2rem":"2rem"}`,background:"#F8FAFB",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{marginBottom:10}}><Chip>Packages</Chip></div>
            <SectionTitle sub="All packages include a personalised consultation call and dedicated project management.">Choose Your Research Journey</SectionTitle>
          </div>
        </FI>
        <div style={{display:"grid",gridTemplateColumns:cols(w,4,2,1),gap:13,alignItems:"start"}}>
          {pkgs.map((p,i)=>(
            <FI key={p.title} d={i*50}>
              <div style={{background:p.hi?NAVY:"white",borderRadius:14,padding:22,border:p.hi?"none":"1.5px solid #E5E7EB",position:"relative",overflow:"hidden",boxShadow:p.hi?"0 16px 48px rgba(11,29,58,.22)":"none"}}>
                {p.hi&&<div style={{position:"absolute",top:0,left:0,right:0,height:4,background:`linear-gradient(to right,${TEAL},${EMERALD})`}}/>}
                <div style={{fontSize:26,marginBottom:8}}>{p.icon}</div>
                <div style={{background:p.hi?"rgba(14,122,107,.3)":LT,color:p.hi?"#34D399":TEAL,fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif",padding:"2px 8px",borderRadius:100,display:"inline-block",marginBottom:7}}>{p.tag}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:p.hi?"white":NAVY,margin:"0 0 6px"}}>{p.title}</h3>
                <p style={{color:p.hi?"rgba(255,255,255,.45)":"#6B7280",fontSize:12,fontFamily:"'DM Sans',sans-serif",lineHeight:1.6,margin:"0 0 13px"}}>{p.desc}</p>
                <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
                  {p.features.map(f=><div key={f} style={{display:"flex",alignItems:"flex-start",gap:6}}>
                    <div style={{width:13,height:13,borderRadius:"50%",background:p.hi?"rgba(14,122,107,.3)":"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={p.hi?"#34D399":"#16A34A"} strokeWidth="3" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:p.hi?"rgba(255,255,255,.65)":"#374151"}}>{f}</span>
                  </div>)}
                </div>
                <a href="#contact" style={{display:"block",textAlign:"center",padding:"11px",borderRadius:9,background:p.hi?TEAL:"transparent",border:p.hi?"none":`1.5px solid ${NAVY}`,color:p.hi?"white":NAVY,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,textDecoration:"none",minHeight:42,lineHeight:"20px"}}>{p.cta}</a>
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
  const w=useW();
  const faqs=[
    {q:"What information do I need to share to get started?",a:"Share your dataset (any format), study objectives, existing drafts, target journal (if decided), and your timeline. A free 30-minute consultation call covers anything unclear — no preparation required."},
    {q:"Can you help if my data is already collected but not analysed?",a:"This is the most common scenario. You share your dataset (Excel, SPSS, CSV), I clean and validate it, run the appropriate statistical analysis, and produce publication-ready tables and figures with a full interpretation report."},
    {q:"How long does it take to write a full manuscript?",a:"A standard IMRAD manuscript takes 3–5 weeks. Thesis support takes 8–14 weeks. Systematic reviews typically take 8–12 weeks. Rush timelines available on request."},
    {q:"Can you help with MD thesis specific to my university format?",a:"Yes — I have experience with NMC guidelines and various institutional formats. Your thesis will be formatted to comply with your institution's submission standards."},
    {q:"Do you handle reviewer responses?",a:"Yes. I prepare a point-by-point response letter addressing every reviewer comment, along with a revised manuscript. Included in publication support and end-to-end packages."},
    {q:"Is confidentiality maintained?",a:"All your data, clinical records, and research materials are handled with strict confidentiality. I do not share, publish, or use your data for any purpose other than your project."},
    {q:"What if I have no idea which journal to target?",a:"Journal selection is part of my publication support. I assess your manuscript's scope, methodology, novelty, and sample size, then recommend indexed journals (PubMed/Scopus)."},
    {q:"What types of studies can you support?",a:"Retrospective and prospective clinical studies, case reports and series, cross-sectional and cohort studies, RCTs, systematic reviews and meta-analyses, MD/MS/DM theses."},
  ];
  return(
    <section id="faq" style={{padding:`64px ${w<640?"1.2rem":"2rem"}`,background:"white",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:740,margin:"0 auto"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{marginBottom:10}}><Chip>FAQ</Chip></div>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
          </div>
        </FI>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {faqs.map((f,i)=>(
            <FI key={f.q} d={i*30}>
              <div style={{border:`1.5px solid ${open===i?TEAL:"#E5E7EB"}`,borderRadius:10,overflow:"hidden",transition:"border-color .3s"}}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10,minHeight:50,WebkitTapHighlightColor:"transparent"}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"clamp(12px,1.6vw,14px)",color:NAVY,lineHeight:1.4}}>{f.q}</span>
                  <div style={{width:22,height:22,borderRadius:"50%",background:open===i?TEAL:LT,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s",marginTop:1}}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{transform:open===i?"rotate(45deg)":"none",transition:"transform .3s"}}><path d="M12 5v14M5 12h14" stroke={open===i?"white":TEAL} strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </div>
                </button>
                {open===i&&<div style={{padding:"0 18px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#4B5563",lineHeight:1.75}}>{f.a}</div>}
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection(){
  const w=useW();
  const px=w<640?"1.2rem":"2rem";
  return(
    <section id="contact" style={{padding:`72px ${px}`,background:NAVY,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-60,right:-60,width:360,height:360,borderRadius:"50%",background:"rgba(14,122,107,.07)",pointerEvents:"none"}}/>
      <div style={{maxWidth:820,margin:"0 auto",position:"relative"}}>
        <FI>
          <div style={{textAlign:"center",marginBottom:40}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,46px)",color:"white",fontWeight:700,margin:"0 0 12px",lineHeight:1.2}}>Ready to Transform Your Research?</h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:"clamp(14px,2vw,17px)",fontFamily:"'DM Sans',sans-serif",margin:"0 0 5px"}}>Share your data or project — I'll take it from there.</p>
            <p style={{color:"rgba(255,255,255,.3)",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Free 30-minute consultation. No commitment required.</p>
          </div>
        </FI>
        {/* Contact cards - updated with real info */}
        <FI d={80}>
          <div style={{display:"grid",gridTemplateColumns:cols(w,4,2,2),gap:10,marginBottom:36}}>
            {[
              {i:"📧",l:"Email",v:EMAIL,h:`mailto:${EMAIL}`},
              {i:"📞",l:"Phone",v:PHONE,h:"tel:+917608847619"},
              {i:"💬",l:"WhatsApp",v:PHONE,h:WA_LINK},
              {i:"🔗",l:"LinkedIn",v:"View Profile",h:LINKEDIN_URL},
            ].map(c=>(
              <a key={c.l} href={c.h} target={c.l==="Email"||c.l==="Phone"?"_self":"_blank"} rel="noopener noreferrer"
                style={{display:"block",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:12,padding:"16px 12px",textDecoration:"none",textAlign:"center",transition:"all .3s",WebkitTapHighlightColor:"transparent"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(14,122,107,.2)";e.currentTarget.style.borderColor="rgba(14,122,107,.4)";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor="rgba(255,255,255,.09)";e.currentTarget.style.transform="none";}}>
                <div style={{fontSize:22,marginBottom:5}}>{c.i}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:11,color:"#34D399",marginBottom:2}}>{c.l}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"rgba(255,255,255,.4)",wordBreak:"break-all",lineHeight:1.4}}>{c.v}</div>
              </a>
            ))}
          </div>
        </FI>
        <FI d={160}>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:w<640?"20px 18px":"28px 36px"}}>
            <div style={{textAlign:"center",marginBottom:18}}>
              <div style={{color:"rgba(255,255,255,.7)",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,marginBottom:2}}>Send a Message</div>
              <div style={{color:"rgba(255,255,255,.3)",fontFamily:"'DM Sans',sans-serif",fontSize:12}}>I'll respond within 24 hours with a personalised plan.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:w>=640?"1fr 1fr":"1fr",gap:13,marginBottom:13}}>
              {[["Full Name","Dr. Priya Sharma"],["Specialty / Degree","MD Internal Medicine"],["Email Address",EMAIL],["WhatsApp Number",PHONE]].map(([l,ph])=>(
                <div key={l}>
                  <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:"rgba(255,255,255,.4)",display:"block",marginBottom:5}}>{l}</label>
                  <input type="text" placeholder={ph} style={{width:"100%",padding:"10px 13px",borderRadius:8,border:"1px solid rgba(255,255,255,.11)",background:"rgba(255,255,255,.06)",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none",minHeight:44}}/>
                </div>
              ))}
            </div>
            <div style={{marginBottom:13}}>
              <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:"rgba(255,255,255,.4)",display:"block",marginBottom:5}}>Describe your research project or question</label>
              <textarea rows={4} placeholder="I have data from a retrospective study on hypertension outcomes..." style={{width:"100%",padding:"10px 13px",borderRadius:8,border:"1px solid rgba(255,255,255,.11)",background:"rgba(255,255,255,.06)",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none",resize:"vertical"}}/>
            </div>
            <button style={{width:"100%",background:TEAL,color:"white",border:"none",padding:"14px",borderRadius:10,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"background .2s",minHeight:48}}
              onMouseEnter={e=>e.currentTarget.style.background="#0a6659"}
              onMouseLeave={e=>e.currentTarget.style.background=TEAL}>
              Send Message & Book Consultation →
            </button>
            {/* Direct contact links below form */}
            <div style={{marginTop:18,paddingTop:16,borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",justifyContent:"center",gap:w<640?12:24,flexWrap:"wrap"}}>
              <a href={`mailto:${EMAIL}`} style={{color:"rgba(255,255,255,.45)",fontFamily:"'DM Sans',sans-serif",fontSize:11,textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>📧 {EMAIL}</a>
              <a href="tel:+917608847619" style={{color:"rgba(255,255,255,.45)",fontFamily:"'DM Sans',sans-serif",fontSize:11,textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>📞 {PHONE}</a>
            </div>
          </div>
        </FI>
      </div>
    </section>
  );
}

function Footer(){
  const w=useW();
  return(
    <footer style={{background:"#060E1E",padding:`20px ${w<640?"1.2rem":"2rem"}`,borderTop:"1px solid rgba(255,255,255,.05)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:22,height:22,borderRadius:5,background:TEAL,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M10 8v4M8 10h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{color:"rgba(255,255,255,.4)",fontFamily:"'DM Sans',sans-serif",fontSize:11}}>ResearchMD — Binay Naik · Medical Research & Publication Consultant</span>
        </div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          {["Dashboard","Scenarios","Specialties","Packages","Contact"].map(l=><a key={l} href={`#${l.toLowerCase()}`} style={{color:"rgba(255,255,255,.25)",fontFamily:"'DM Sans',sans-serif",fontSize:11,textDecoration:"none"}}>{l}</a>)}
        </div>
        <div style={{display:"flex",gap:14}}>
          <a href={`mailto:${EMAIL}`} style={{color:"rgba(255,255,255,.25)",fontFamily:"'DM Sans',sans-serif",fontSize:10,textDecoration:"none"}}>Email</a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,.25)",fontFamily:"'DM Sans',sans-serif",fontSize:10,textDecoration:"none"}}>WhatsApp</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,.25)",fontFamily:"'DM Sans',sans-serif",fontSize:10,textDecoration:"none"}}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default function App(){
  return(
    <div style={{overflowX:"hidden",maxWidth:"100vw"}}>
      <Navbar/>
      <FloatingWA/>
      <Hero/>
      <Dashboard/>
      <ProblemSection/>
      <SendReceive/>
      <ClientScenarios/>
      <PublicationRoadmap/>
      <SPSSWorkflow/>
      <DeliverablesGallery/>
      <TLFGallery/>
      <PublicationFigures/>
      <CapabilitySection/>
      <ResearchDashboard/>
      <ProfessionalDeliverables/>
      <ReviewerResponseShowcase/>
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
