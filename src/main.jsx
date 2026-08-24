import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  Menu, Bell, UserCircle, Plus, ExternalLink, Home, WalletCards, DollarSign,
  TrendingDown, MoreHorizontal, BarChart3, List, ShieldCheck, FileText,
  Settings, HelpCircle, Search, ChevronRight, CheckCircle2, AlertTriangle,
  Clock3, XCircle, CircleDollarSign, Activity, CalendarDays
} from "lucide-react";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid} from "recharts";
import "./styles.css";

const trades = [
  ["EURUSD","Buy","2.00","+$1,820","Winner"],
  ["XAUUSD","Buy","5.00","+$2,460","Winner"],
  ["NAS100","Sell","8.00","+$1,735","Winner"],
  ["GBPUSD","Buy","1.50","-$620","Loss"],
  ["XAUUSD","Sell","7.50","+$3,180","Winner"],
  ["US30","Buy","10.00","+$2,940","Winner"],
  ["EURUSD","Sell","1.25","+$860","Winner"],
  ["NAS100","Buy","12.00","-$1,140","Loss"]
].map((x,i)=>({id:i+1,symbol:x[0],side:x[1],lots:x[2],pnl:x[3],result:x[4]}));

const pnl = [
  {day:"1", value:420},{day:"2",value:680},{day:"3",value:-210},{day:"4",value:910},
  {day:"5",value:350},{day:"6",value:1220},{day:"7",value:-380},{day:"8",value:740},
  {day:"9",value:1540},{day:"10",value:620},{day:"11",value:980},{day:"12",value:-190},
  {day:"13",value:1320},{day:"14",value:610},{day:"15",value:840},{day:"16",value:520},
  {day:"17",value:1110},{day:"18",value:760},{day:"19",value:430},{day:"20",value:910}
];

const nav = [
  ["Dashboard",Home],["Accounts",WalletCards],["Performance",BarChart3],["Trades",List],
  ["Drawdown",TrendingDown],["Payouts",DollarSign],["Compliance",ShieldCheck],
  ["Notifications",Bell],["Profile",UserCircle],["Settings",Settings]
];

function App(){
  const [page,setPage] = useState("Dashboard");
  const [menu,setMenu] = useState(false);
  const [notifications,setNotifications] = useState(3);

  const content = useMemo(()=>{
    if(page==="Dashboard") return <Dashboard setPage={setPage}/>;
    if(page==="Accounts") return <Accounts setPage={setPage}/>;
    if(page==="Performance") return <Performance/>;
    if(page==="Trades") return <Trades/>;
    if(page==="Drawdown") return <Drawdown/>;
    if(page==="Payouts") return <Payouts/>;
    if(page==="Compliance") return <Compliance/>;
    if(page==="Notifications") return <Notifications notifications={notifications} setNotifications={setNotifications}/>;
    if(page==="Profile") return <Profile/>;
    return <SettingsPage/>;
  },[page,notifications]);

  return <div className="app">
    <aside className={"sidebar "+(menu?"open":"")}>
      <div className="brand">
        <div className="brandMark">RT</div><span>Rohit<span className="blue">Trader</span></span>
      </div>
      <div className="sideLabel">WORKSPACE</div>
      {nav.map(([label,Icon])=><button key={label} className={"navItem "+(page===label?"active":"")} onClick={()=>{setPage(label);setMenu(false)}}><Icon size={19}/><span>{label}</span></button>)}
      <div className="sideBottom">
        <div className="demoNote">Funder<br/><span>Pro</span></div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="iconBtn mobileMenu" onClick={()=>setMenu(!menu)}><Menu/></button>
        <div className="brand mobileBrand"><div className="brandMark">RT</div><span>Rohit<span className="blue">Trader</span></span></div>
        <div className="topActions">
          <button className="iconBtn" onClick={()=>setPage("Notifications")}><Bell size={20}/>{notifications>0&&<b>{notifications}</b>}</button>
          <button className="profilePill" onClick={()=>setPage("Profile")}><span>R</span></button>
        </div>
      </header>
      <div className="content">{content}</div>
    </main>
  </div>
}

function Header({title,subtitle,action,onAction}){return <div className="pageHeader">
  <div><h1>{title}</h1><p>{subtitle}</p></div>
  {action&&<button className="primary" onClick={onAction}><Plus size={18}/>{action}</button>}
</div>}

function Dashboard({setPage}){
  return <><Header title="Dashboard" subtitle="Overview of your trading account and performance." action="New Challenge" onAction={()=>setPage("Accounts")}/>
  <section className="accountCard">
    <div className="accountTop"><div className="accountIdentity"><div className="accountIcon">RT</div><div><h2>200K Challenge</h2><span className="status">Passed</span></div></div><button className="outline" onClick={()=>setPage("Accounts")}>View Account <ExternalLink size={16}/></button></div>
    <div className="targetCard">
      <div className="targetTitle">Profit Target <span className="info">i</span></div>
      <div className="money">$20,184.00</div>
      <div className="target">Target: $20,000.00</div>
      <div className="progress"><span style={{width:"100%"}}/></div>
      <div className="percent">100.92%</div>
      <div className="remaining success">Target achieved</div>
    </div>
  </section>
  <div className="statsGrid">
    <Stat title="Starting Balance" value="$200,000.00"/>
    <Stat title="Current Balance" value="$220,184.00" good/>
    <Stat title="Trading Days" value="95 / 95" good/>
    <Stat title="Best Day" value="$4,160.00"/>
  </div>
  <div className="twoCol">
    <Card title="Challenge Status"><StatusRow icon={<CheckCircle2/>} title="Profit target" value="Completed" good/><StatusRow icon={<CheckCircle2/>} title="Trading days" value="Completed" good/><StatusRow icon={<CheckCircle2/>} title="Drawdown" value="Within limits" good/><StatusRow icon={<AlertTriangle/>} title="Compliance review" value="Required" warn/></Card>
    <Card title="Account Review"><div className="reviewBox"><Clock3/><div><strong>Review completed</strong><p>Your challenge reached the displayed objectives. A compliance review was subsequently recorded on the account.</p></div></div><button className="textBtn" onClick={()=>setPage("Compliance")}>Open compliance record <ChevronRight size={16}/></button></Card>
  </div>
  <div className="notice">@.</div>
  </>
}

function Stat({title,value,good}){return <div className="stat"><span>{title}</span><strong className={good?"green":""}>{value}</strong></div>}
function Card({title,children}){return <section className="card"><h3>{title}</h3>{children}</section>}
function StatusRow({icon,title,value,good,warn}){return <div className="statusRow"><span className={good?"iconGood":"iconWarn"}>{icon}</span><div><strong>{title}</strong><small>{value}</small></div><span className={good?"green":"yellow"}>{good?"✓":"Review"}</span></div>}

function Accounts({setPage}){return <><Header title="Accounts" subtitle="Your challenge accounts and account-level status." action="New Challenge"/><div className="accountList"><div className="accountRow"><div className="accountIdentity"><div className="accountIcon">RT</div><div><h2>200K Challenge</h2><small>One-Phase · Active record</small></div></div><div className="accountMetrics"><span><small>Balance</small><b>$220,184</b></span><span><small>Profit</small><b className="green">+$20,184</b></span><span><small>Days</small><b>95</b></span></div><button className="outline" onClick={()=>setPage("Performance")}>Details <ChevronRight size={16}/></button></div></div></>}

function Performance(){return <><Header title="Performance" subtitle="Detailed performance metrics for the challenge."/><div className="statsGrid"><Stat title="Total Profit" value="+$20,184" good/><Stat title="Return" value="+10.09%" good/><Stat title="Win Rate" value="68.4%"/><Stat title="Profit Factor" value="2.71"/></div><Card title="Daily P&L"><div className="chart"><ResponsiveContainer width="100%" height={310}><BarChart data={pnl}><CartesianGrid strokeDasharray="3 3" opacity=".12"/><XAxis dataKey="day"/><YAxis/><Tooltip contentStyle={{background:"#071425",border:"1px solid #20324b",borderRadius:12}}/><Bar dataKey="value" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></Card><div className="twoCol"><Card title="Risk profile"><Metric label="Average risk / idea" value="0.86%"/><Metric label="Largest position" value="12.00 lots"/><Metric label="Average holding time" value="3h 42m"/><Metric label="Max daily drawdown" value="2.14%"/></Card><Card title="Consistency"><Metric label="Best day contribution" value="20.61%"/><Metric label="Profitable days" value="71"/><Metric label="Losing days" value="24"/><Metric label="Breakeven days" value="0"/></Card></div></>}

function Metric({label,value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}

function Trades(){return <><Header title="Trades" subtitle="Recent executed positions in the challenge record."/><div className="toolbar"><div className="search"><Search size={17}/><input placeholder="Search instrument"/></div><button className="filter">All results</button></div><div className="tableCard"><table><thead><tr><th>Instrument</th><th>Side</th><th>Lots</th><th>P&L</th><th>Result</th></tr></thead><tbody>{trades.map(t=><tr key={t.id}><td><b>{t.symbol}</b></td><td>{t.side}</td><td>{t.lots}</td><td className={t.pnl.startsWith("+")?"green":"red"}>{t.pnl}</td><td><span className={t.result==="Winner"?"pillGood":"pillBad"}>{t.result}</span></td></tr>)}</tbody></table></div></>}

function Drawdown(){return <><Header title="Drawdown" subtitle="Risk limits and historical drawdown readings."/><div className="statsGrid"><Stat title="Daily Limit" value="4.00%"/><Stat title="Overall Limit" value="7.00%"/><Stat title="Worst Daily" value="2.14%"/><Stat title="Worst Overall" value="3.18%"/></div><Card title="Risk status"><div className="riskLine"><div><span>Daily drawdown</span><strong>2.14%</strong></div><div className="riskBar"><span style={{width:"53.5%"}}/></div><small>53.5% of allowed limit</small></div><div className="riskLine"><div><span>Overall drawdown</span><strong>3.18%</strong></div><div className="riskBar"><span style={{width:"45.4%"}}/></div><small>45.4% of allowed limit</small></div></Card><div className="notice">The displayed metrics are fictional and intended for a personal dashboard concept.</div></>}

function Payouts(){return <><Header title="Payouts" subtitle="Reward and payout history."/><div className="emptyState"><CircleDollarSign size={42}/><h2>No payout requested</h2><p>The challenge record did not progress to a payout stage.</p></div></>}

function Compliance(){return <><Header title="Compliance Review" subtitle="Review history and account eligibility record."/><div className="reviewHero"><div className="reviewIcon"><AlertTriangle/></div><div><span className="eyebrow">FINAL REVIEW</span><h2>Challenge objectives achieved</h2><p>Eligibility was not approved following a Terms & Conditions compliance review.</p></div><span className="pillBad big">Ineligible</span></div><div className="twoCol"><Card title="Review findings"><Finding title="Excessive position sizing" text="Multiple positions showed abrupt increases in lot size relative to the surrounding trading pattern."/><Finding title="Risk concentration" text="Several positions created unusually high exposure relative to the account balance and established trading pattern."/><Finding title="Multiple rule concerns" text="The review recorded more than one risk-management concern under the account's applicable trading conditions."/></Card><Card title="Decision"><div className="decision"><XCircle/><h3>Not eligible for progression</h3><p>The displayed profit and trading-day objectives were achieved, but the account was not approved following the compliance review.</p><button className="outline">View applicable terms <FileText size={16}/></button></div></Card></div><div className="notice">@.</div></>}

function Finding({title,text}){return <div className="finding"><AlertTriangle size={18}/><div><strong>{title}</strong><p>{text}</p></div></div>}
function Notifications({notifications,setNotifications}){return <><Header title="Notifications" subtitle="Account alerts and review updates."/><div className="notifications">{[["Challenge target achieved","Your displayed profit target has been reached.","Success"],["Compliance review completed","Your account review has been completed.","Review"],["Eligibility decision recorded","The account was marked ineligible for progression.","Action"]].map((n,i)=><div className="notification" key={i}><div className="notifIcon">{i===0?<CheckCircle2/>:<AlertTriangle/>}</div><div><strong>{n[0]}</strong><p>{n[1]}</p><small>{n[2]}</small></div><span>›</span></div>)}</div><button className="textBtn" onClick={()=>setNotifications(0)}>Mark all as read</button></>}

function Profile(){return <><Header title="Profile" subtitle="Personal account information."/><Card title="Trader profile"><div className="profileHead"><div className="avatarLarge">R</div><div><h2>Rohit</h2><p>Trader account</p></div></div><Metric label="Account status" value="Active record"/><Metric label="Challenge" value="200K One-Phase"/></Card></>}
function SettingsPage(){return <><Header title="Settings" subtitle="Dashboard preferences."/><Card title="Preferences"><Metric label="Theme" value="Dark"/><Metric label="Currency" value="USD"/><Metric label="Notifications" value="Enabled"/></Card></>}

createRoot(document.getElementById("root")).render(<App/>);
