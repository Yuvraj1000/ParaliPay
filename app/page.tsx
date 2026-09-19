"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, Bot, Building2, Check, ChevronDown, CircleDollarSign, FileText, Languages, Leaf, MapPin, Moon, Navigation, Route, Satellite, Search, Sparkles, Sun, Tractor, TrendingUp, Wheat, X } from "lucide-react";

type Role = "farmer" | "plant" | "operations";
type View = "overview" | "contracts" | "collections" | "impact";
const farms = [
  { id: 1, name: "Field A", owner: "Gurpreet Singh", x: 24, y: 34, tonnes: 8.7, acres: 4.2 },
  { id: 2, name: "Field B", owner: "Manpreet Kaur", x: 40, y: 56, tonnes: 12.4, acres: 5.8 },
  { id: 3, name: "Field C", owner: "Harjit Singh", x: 63, y: 29, tonnes: 6.2, acres: 3.1 },
  { id: 4, name: "Field D", owner: "Simran Kaur", x: 71, y: 69, tonnes: 9.8, acres: 4.7 },
];

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: React.ElementType }) {
  return <div className="metric-card"><div className="metric-top"><span>{label}</span><Icon size={17}/></div><strong>{value}</strong><small>{note}</small></div>;
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [role, setRole] = useState<Role>("farmer");
  const [view, setView] = useState<View>("overview");
  const [selected, setSelected] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [contracted, setContracted] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [assistant, setAssistant] = useState(false);
  const field = farms.find(f => f.id === selected)!;
  const payout = useMemo(() => Math.round(field.tonnes * 1100), [field]);
  function analyze() { setAnalyzing(true); window.setTimeout(() => setAnalyzing(false), 1100); }

  return <main className={dark ? "app dark" : "app"}>
    <header className="topbar">
      <div className="brand"><div className="brandmark"><Leaf size={19}/></div><span>AgniCycle</span><em>β</em></div>
      <div className="role-switch" aria-label="Choose workspace">{(["farmer","plant","operations"] as Role[]).map(r => <button key={r} className={role===r?"active":""} onClick={()=>setRole(r)}>{r==="farmer"?<Wheat/>:r==="plant"?<Building2/>:<Tractor/>}{r}</button>)}</div>
      <div className="header-actions"><button className="icon-btn"><Languages size={18}/><span>EN</span></button><button className="icon-btn" aria-label="Toggle color theme" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><div className="avatar">GS</div></div>
    </header>

    <div className="shell">
      <aside className="sidebar">
        <nav>{([["overview","Overview",BarChart3],["contracts","Contracts",FileText],["collections","Collections",Route],["impact","Impact",TrendingUp]] as [View,string,React.ElementType][]).map(([id,label,Icon])=><button key={id} className={view===id?"active":""} onClick={()=>setView(id)}><Icon size={19}/><span>{label}</span>{id==="contracts"&&<b>3</b>}</button>)}</nav>
        <div className="season-card"><span>ACTIVE SEASON</span><strong>Paddy · Kharif</strong><small>Collection ends in 18 days</small><div><i style={{width:"68%"}}/></div></div>
        <div className="sidebar-foot"><button onClick={()=>setAssistant(true)}><Bot size={18}/><span>AI field assistant</span></button><div className="user"><div className="avatar">GS</div><p><strong>Gurpreet Singh</strong><small>Ludhiana, Punjab</small></p><ChevronDown size={16}/></div></div>
      </aside>

      <section className="workspace">
        <div className="page-head"><div><span className="eyebrow">{role} workspace</span><h1>{view==="overview"?"Residue command center":view==="contracts"?"Biomass contracts":view==="collections"?"Collection planning":"Season impact"}</h1><p>{role==="farmer"?"Turn crop residue into verified income before the burn window.":role==="plant"?"Secure reliable feedstock from verified nearby fields.":"Cluster farms, assign machines and reduce every empty kilometre."}</p></div><div className="head-actions"><button className="secondary"><Search size={17}/>Search field</button><button className="primary" onClick={analyze}><Satellite size={17}/>{analyzing?"Analyzing…":"Analyze new field"}</button></div></div>
        <div className="metrics"><Metric label="Available biomass" value="284 t" note="↑ 12% this week" icon={Wheat}/><Metric label="Farmer value" value="₹3.12L" note="Across 126 farmers" icon={CircleDollarSign}/><Metric label="Contracted" value="78%" note="221.5 tonnes secured" icon={FileText}/><Metric label="Burning avoided" value="284 t" note="Season estimate" icon={Leaf}/></div>

        <div className="main-grid">
          <div className="map-card">
            <div className="map-toolbar"><div><span className="live-dot"/>Live supply map</div><div className="map-filters"><button className="active">Fields</button><button>Buyers</button><button>Routes</button></div></div>
            <div className="map" role="img" aria-label="Map showing farms around a biomass plant">
              <div className="map-label road-one">Ferozepur Rd</div><div className="map-label road-two">Canal Road</div>
              <svg className="route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d={optimized?"M24 34 C31 40 34 51 40 56 S58 55 71 69 S81 57 84 45":"M24 34 C46 43 67 48 84 45"}/></svg>
              {farms.map(f=><button key={f.id} aria-label={`${f.name}, ${f.tonnes} tonnes`} onClick={()=>setSelected(f.id)} className={`farm-pin ${selected===f.id?"selected":""}`} style={{left:`${f.x}%`,top:`${f.y}%`}}><span><Wheat size={16}/></span><b>{f.tonnes}t</b></button>)}
              <div className="plant-pin" style={{left:"84%",top:"45%"}}><Building2 size={18}/><b>Plant</b></div>
              <div className="map-legend"><span><i className="ready"/>Ready to collect</span><span><i className="pending"/>Needs review</span></div><div className="zoom"><button>+</button><button>−</button></div>
            </div>
            <div className="map-footer"><span><Navigation size={15}/>Ludhiana collection zone · 32 km radius</span><button onClick={()=>setOptimized(!optimized)}><Route size={16}/>{optimized?"Route optimized — 35% saved":"Optimize collection route"}</button></div>
          </div>

          <aside className="detail-panel">
            <div className="detail-head"><div><span className="status"><i/>READY TO SELL</span><h2>{field.name}</h2><p><MapPin size={14}/>{field.owner} · Ludhiana</p></div><button><X size={18}/></button></div>
            <div className={`scan-card ${analyzing?"scanning":""}`}><div className="scan-icon"><Satellite size={21}/></div><div><span>AI RESIDUE ESTIMATE</span><strong>{analyzing?"Reading field data…":`${field.tonnes} tonnes`}</strong><small>{analyzing?"Combining field and crop signals":`Expected range ${(field.tonnes*.88).toFixed(1)}–${(field.tonnes*1.12).toFixed(1)} t`}</small></div><Sparkles size={17}/></div>
            <div className="field-stats"><div><span>Area</span><strong>{field.acres} acres</strong></div><div><span>Crop</span><strong>Paddy</strong></div><div><span>Vegetation</span><strong>0.71 NDVI</strong></div><div><span>Recovery</span><strong>72% est.</strong></div></div>
            <div className="divider"/><div className="offer-title"><div><span>BEST VIABLE OFFER</span><h3>Punjab BioEnergy</h3></div><span className="match">94% match</span></div>
            <div className="price"><strong>₹{payout.toLocaleString("en-IN")}</strong><span>estimated payout</span></div>
            <div className="costs"><div><span>Plant price</span><b>₹2,200/t</b></div><div><span>Baling & loading</span><b>− ₹650/t</b></div><div><span>Transport · 14 km</span><b>− ₹330/t</b></div><div><span>Platform</span><b>− ₹120/t</b></div><div className="net"><span>Net farmer rate</span><b>₹1,100/t</b></div></div>
            {contracted?<button className="accepted"><Check size={18}/>Contract accepted · Pickup 21 Oct</button>:<button className="accept" onClick={()=>setContracted(true)}>Accept offer <ArrowRight size={18}/></button>}<button className="compare">Compare 3 nearby buyers</button><p className="estimate-note">Estimate uses field area, crop information and satellite-derived vegetation features. Final payment follows weighbridge quantity.</p>
          </aside>
        </div>

        <section className="queue"><div className="section-title"><div><h2>Collection queue</h2><p>Priority fields inside today’s viable route</p></div><button onClick={()=>setOptimized(true)}>View plan <ArrowRight size={16}/></button></div><div className="table-wrap"><table><thead><tr><th>Farmer / field</th><th>Biomass</th><th>Buyer</th><th>Pickup</th><th>Value</th><th>Status</th></tr></thead><tbody>{farms.slice(0,3).map((f,i)=><tr key={f.id}><td><span className="table-icon"><Wheat size={15}/></span><div><strong>{f.owner}</strong><small>{f.name} · Paddy</small></div></td><td>{f.tonnes} t</td><td>{i===1?"GreenFuel Works":"Punjab BioEnergy"}</td><td>{20+i} Oct · {9+i}:00</td><td>₹{Math.round(f.tonnes*1100).toLocaleString("en-IN")}</td><td><span className={`pill ${i===2?"review":"confirmed"}`}>{i===2?"Needs review":"Confirmed"}</span></td></tr>)}</tbody></table></div></section>
      </section>
    </div>
    <button className="assistant-fab" onClick={()=>setAssistant(!assistant)}><Bot size={21}/><span>Ask Agni</span></button>
    {assistant&&<div className="assistant-panel"><div><span><Bot size={18}/>Agni Assistant</span><button onClick={()=>setAssistant(false)}><X size={17}/></button></div><p>नमस्ते Gurpreet! आपके चुने हुए खेत में लगभग <strong>{field.tonnes} टन</strong> पराली है। सबसे अच्छा अनुमानित भुगतान <strong>₹{payout.toLocaleString("en-IN")}</strong> है।</p><div className="suggestions"><button onClick={()=>setContracted(true)}>Offer accept करें</button><button onClick={()=>setOptimized(true)}>Pickup route देखें</button></div><label><input placeholder="Ask in Hindi, Punjabi or English…"/><button><ArrowRight size={17}/></button></label></div>}
  </main>;
}
