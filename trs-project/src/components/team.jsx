import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA LAYER
═══════════════════════════════════════════════════════════════ */
const TEAMS = [
  { id:"tc3", icon:"💻", color:"green",  name:"Technical",   lead:"Aravindhraj M", desc:"The builders and hackers. Three specialized domains pushing the frontier of what's possible with technology — from web apps to machine intelligence to digital security.", domains:[{label:"Web Dev",cls:"dc"},{label:"AI / ML",cls:"dp"},{label:"Cybersecurity",cls:"dg"}] },
  { id:"tc1", icon:"🎨", color:"cyan",   name:"Design",      lead:"Nithya Prabhu", desc:"Visual architects and experience designers who shape how TRS looks and feels — from brand identity to interface design, every pixel crafted with intention.", domains:[{label:"UI/UX",cls:"dc"},{label:"Branding",cls:"dc"},{label:"Motion",cls:"dc"}] },
  { id:"tc2", icon:"📋", color:"purple", name:"Management",  lead:"Vikram Subramanian", desc:"The strategic core of TRS — planning projects, coordinating teams, managing resources and timelines to ensure every initiative launches on time and on target.", domains:[{label:"Planning",cls:"dp"},{label:"HR",cls:"dp"},{label:"Strategy",cls:"dp"}] },
  { id:"tc4", icon:"📦", color:"orange", name:"Logistics",   lead:"Divya Raghunath", desc:"The backbone of every TRS event and competition — handling procurement, venue setup, hardware inventory, scheduling, and ensuring nothing ever runs out.", domains:[{label:"Events",cls:"do"},{label:"Procurement",cls:"do"},{label:"Inventory",cls:"do"}] },
  { id:"tc5", icon:"📸", color:"blue",   name:"Media",       lead:"Preethi Lakshmi", desc:"Storytellers and content creators who document the TRS journey — social media, written content, video production, and building the narrative the world sees.", domains:[{label:"Social Media",cls:"db"},{label:"Content",cls:"db"},{label:"Video",cls:"db"}] },
  { id:"tc6", icon:"📣", color:"green2", name:"Marketing",   lead:"Karan Balaji", desc:"Growth hackers and brand ambassadors — managing digital campaigns, sponsorship outreach, community growth, and making sure TRS's reach extends far beyond campus.", domains:[{label:"Campaigns",cls:"dg"},{label:"Sponsorships",cls:"dg"},{label:"Analytics",cls:"dg"}] },
  { id:"tc7", icon:"📷", color:"red",    name:"Photography", lead:"Aditi Chandran", desc:"Visual memory keepers of TRS. From high-speed robot action shots to beautifully edited event coverage, this team captures the moments that define our story.", domains:[{label:"Events",cls:"dr"},{label:"Drone",cls:"dr"},{label:"Editing",cls:"dr"}] },
];

const EVENTS_DATA = [
  { type:"workshop",    icon:"🤖", grad:"135deg,#004D40,#00695C", tag:"Workshop",    title:"Intro to Robotics & Arduino",    meta:"FEB 08, 2025 · 2:00 PM · LAB 301" },
  { type:"competition", icon:"⚡", grad:"135deg,#1A0050,#3D0099", tag:"Competition", title:"TRS Hackathon 3.0",               meta:"MAR 14–15, 2025 · 24HRS · CAMPUS HALL" },
  { type:"workshop",    icon:"🧠", grad:"135deg,#003366,#004499", tag:"Workshop",    title:"Machine Learning Bootcamp",       meta:"APR 02–05, 2025 · 4-DAY INTENSIVE" },
  { type:"competition", icon:"🏆", grad:"135deg,#4A1500,#7A2000", tag:"Competition", title:"National CTF — CyberBlitz",       meta:"APR 20, 2025 · ONLINE + ONSITE" },
  { type:"project",     icon:"🚀", grad:"135deg,#002200,#004400", tag:"Project",     title:"Campus AI Navigator",             meta:"ONGOING · 3 TEAMS · 1200+ BETA USERS" },
  { type:"meeting",     icon:"💡", grad:"135deg,#1A0040,#2D0070", tag:"Meetup",      title:"Monthly Demo Day",                meta:"EVERY 1ST FRIDAY · 5:00 PM · LAB 201" },
];

const FUTURE_EVENTS = [
  { icon:"🚀", date:"JUN 20–21, 2026", title:"TRS National Robotics Summit 2026", desc:"Our biggest event ever — 1000+ students, 20+ colleges, live robot demos, startup pitch track, and industry speakers from top robotics firms.", tag:"Flagship", color:"cyan", seats:"Registration Opens May 15, 2026" },
  { icon:"🧬", date:"JUL 18, 2026",    title:"AI & Biotech Innovation Sprint 2026",    desc:"48-hour hackathon focused on AI applications in healthcare, genomics and biotech. Partnered with 3 biotech startups as problem setters.", tag:"Hackathon", color:"green", seats:"200 Seats · Apply by Jul 5, 2026" },
  { icon:"🔐", date:"AUG 8–9, 2026",   title:"CipherStorm CTF 2026",              desc:"TRS's annual capture-the-flag competition — now open to colleges nationwide. Prizes worth ₹2L. Individual and team categories.", tag:"Competition", color:"purple", seats:"Teams of 4 · Open Registration" },
  { icon:"🤖", date:"SEP 5, 2026",    title:"RoboExpo 2026: Machines Meet People",    desc:"A public-facing exhibition where TRS members showcase their semester projects to industry professionals, investors, and prospective students.", tag:"Exhibition", color:"orange", seats:"Free Entry · All Welcome" },
  { icon:"💼", date:"OCT 10, 2026",     title:"TRS Industry Connect 2026",         desc:"Speed networking with 40+ engineers and founders from Google, ISRO, Ather Energy, and more. Resume reviews, mock interviews, referrals.", tag:"Networking", color:"blue", seats:"Limited to 150 Members" },
  { icon:"🌐", date:"NOV 14, 2026",    title:"Inter-College Robotics League S3 2026",  desc:"Season 2 of TRS's inter-college robotics league — 3 months, weekly challenges, and a grand finale with live arena battles and prize money.", tag:"League", color:"red", seats:"10 Colleges · Apply by Oct 1, 2026" },
];

const SELECTION_STAGES = [
  { step:"01", icon:"📝", title:"Application Form", dur:"Week 1", color:"cyan",   desc:"Fill out our online form with your background, skills, and the team you're interested in joining. No experience needed — just passion and drive.", tips:["Be honest about your skill level","Mention any projects you've done","Tell us why you want to join TRS"] },
  { step:"02", icon:"📋", title:"Shortlisting",      dur:"Week 2", color:"green",  desc:"Our team leads review all applications and shortlist candidates based on enthusiasm, potential, and domain fit. 60-70% of applicants get shortlisted.", tips:["Top shortlisting factors: clarity, passion, initiative","All applicants get a status email","Shortlisted candidates get interview slots"] },
  { step:"03", icon:"🎤", title:"Domain Interview",  dur:"Week 3", color:"purple", desc:"A casual 20-minute conversation with the team lead and 2 seniors. We want to understand how you think, not just what you know. No trick questions.", tips:["Prepare to talk about a project you've done","Research what TRS has built before","Come with questions for the team"] },
  { step:"04", icon:"🛠️", title:"Mini Task",          dur:"Week 3", color:"orange", desc:"A small hands-on task relevant to your domain — a design mockup, a script, a short write-up, or a small challenge. Given on interview day, 48h to complete.", tips:["Quality over quantity — do one thing really well","Show your thought process","Ask for help if genuinely stuck — it's allowed"] },
  { step:"05", icon:"🤝", title:"Onboarding Call",   dur:"Week 4", color:"blue",   desc:"Selected members get a welcome call with their team lead and a buddy from their domain. You'll get your first project briefing and team Slack invite.", tips:["Prepare to introduce yourself","Bring your GitHub / portfolio link","Attendance at first meeting is mandatory"] },
];

const MEMBERS = [
  { initials:"AR", name:"Aravindhraj M", role:"Technical Lead",    team:"Web Dev · AI/ML · Cyber",  bio:'"Code is the closest thing to magic." Oversees all 3 technical domains and shipped TRS\'s first production app used by 2000+ students.', skills:["React","Python","CTF"], color:"green" },
  { initials:"NP", name:"Nithya Prabhu",  role:"Design Lead",       team:"UI/UX · Branding",          bio:'"Design is problem-solving in disguise." Crafted TRS\'s entire visual identity. 3x national design award winner.', skills:["Figma","Branding"], color:"purple" },
  { initials:"VS", name:"Vikram S",        role:"Management Lead",   team:"Strategy · Ops",            bio:'"Good systems outlast great people." Built TRS\'s project management framework from scratch.', skills:["Strategy","Ops"], color:"orange" },
  { initials:"DR", name:"Divya R",         role:"Logistics Lead",    team:"Events · Procurement",      bio:'"If it isn\'t planned, it isn\'t happening." Managed logistics for 47+ events without a single delay.', skills:["Planning","Logistics"], color:"green" },
  { initials:"PL", name:"Preethi L",       role:"Media Lead",        team:"Content · Social Media",    bio:'"Every post tells a story." Grew TRS\'s Instagram from 200 to 8000 followers in 18 months.', skills:["Content","Reels"], color:"blue" },
  { initials:"KB", name:"Karan Balaji",    role:"Marketing Lead",    team:"Growth · Sponsorships",     bio:'"Reach is nothing without resonance." Landed TRS\'s first ₹1L sponsorship and grew our community to 5000+.', skills:["SEO","Ads"], color:"cyan" },
  { initials:"AC", name:"Aditi C",         role:"Photography Lead",  team:"Events · Drone",            bio:'"A great photo makes you feel like you were there." Certified drone pilot, shot 40+ events for TRS.', skills:["Drone","Lightroom"], color:"orange" },
  { initials:"RN", name:"Rohan Nair",      role:"CyberSec Domain",   team:"Technical · Cybersecurity", bio:'"Hack it before they do." Top-10 nationally in CTF rankings. Leads TRS\'s ethical hacking workshops.', skills:["CTF","Pentest"], color:"purple" },
];

const ACHIEVEMENTS = [
  { icon:"🏆", value:22,  label:"Awards Won" },
  { icon:"👥", value:150, label:"Active Members" },
  { icon:"🤖", value:42,  label:"Projects Shipped" },
  { icon:"📅", value:57,  label:"Events Hosted" },
  { icon:"🌐", value:15,  label:"Colleges Reached" },
  { icon:"📜", value:320, label:"Certificates Issued" },
  { icon:"🧠", value:7,   label:"Research Papers" },
  { icon:"💼", value:28,  label:"Internships Secured" },
];

const DOMAIN_MAP = {
  Design:      ["Visual Design","UI/UX","Branding","Motion Graphics","Illustration"],
  Management:  ["Project Planning","Operations","HR & Recruitment","Strategy","Club Governance"],
  Logistics:   ["Event Logistics","Procurement","Venue Management","Inventory","Scheduling"],
  Media:       ["Photography","Videography","Content Writing","Social Media","Graphic Design"],
  Technical:   ["Web Development","AI / ML","Cybersecurity"],
  Marketing:   ["Digital Marketing","Sponsorship Outreach","Campaigns","Analytics","Community Growth"],
  Photography: ["Event Photography","Product Shoots","Editing & Post-Production","Drone Photography","Documentary"]
};

const CHATBOT_KB = {
  greetings: ["hello","hi","hey","greetings","howdy"],
  join_q: ["join","apply","membership","how to join","how do i join","become a member","sign up","enroll"],
  teams_q: ["teams","which team","team list","divisions","departments"],
  events_q: ["events","upcoming","workshops","hackathon","competitions","what events"],
  selection_q: ["selection","process","interview","how selected","criteria","requirements","eligibility"],
  location_q: ["location","where","address","campus","lab","find you","directions"],
  lead_q: ["lead","president","leadership","who leads","who runs","head"],
  project_q: ["projects","what projects","built","created","products"],
  contact_q: ["contact","email","phone","reach","whatsapp","social"],
  future_q: ["future","upcoming events","next event","summit","2025 events","planned"],
  bye: ["bye","goodbye","thanks","thank you","exit","done"],
};

function getBotReply(msg) {
  const m = msg.toLowerCase().trim();
  if (CHATBOT_KB.greetings.some(w => m.includes(w)))
    return { text: "Hey there! 👋 I'm ARIA — Autonomous Robotic Intelligence Assistant. I'm here to help you learn about The Robotic Society.\n\nYou can ask me about:\n• How to join TRS\n• Our 7 teams\n• Upcoming events\n• Selection process\n• Our location", quick: ["How to join?","Tell me about teams","Upcoming events","Where are you located?"] };
  if (CHATBOT_KB.join_q.some(w => m.includes(w)))
    return { text: "Joining TRS is exciting! 🚀 Here's how it works:\n\n1️⃣ Click 'Initialize Membership' anywhere on the site\n2️⃣ Fill the form — pick your team & domain\n3️⃣ We shortlist in ~5 days\n4️⃣ Domain interview (20 mins, super casual)\n5️⃣ Mini task submission\n6️⃣ Welcome onboarding call!\n\nApplications are always open. No experience needed — just passion!", quick: ["Tell me about the interview","Which team should I pick?","Selection process details"] };
  if (CHATBOT_KB.teams_q.some(w => m.includes(w)))
    return { text: "TRS has 7 specialized teams 🏗️:\n\n💻 Technical — Web Dev, AI/ML, Cybersecurity\n🎨 Design — UI/UX, Branding, Motion\n📋 Management — Strategy, Planning, HR\n📦 Logistics — Events, Procurement\n📸 Media — Content, Social, Video\n📣 Marketing — Growth, Campaigns\n📷 Photography — Events, Drone, Editing\n\nEach team has a dedicated Lead and multiple domains!", quick: ["How to join Technical?","What does Design team do?","Tell me about selection"] };
  if (CHATBOT_KB.events_q.some(w => m.includes(w)))
    return { text: "TRS runs an incredible event calendar! 📅\n\n⚡ TRS Hackathon 3.0 — Mar 14-15, 2025\n🧠 ML Bootcamp — Apr 2-5, 2025\n🏆 National CTF CyberBlitz — Apr 20, 2025\n💡 Monthly Demo Days — Every 1st Friday\n\nFuture highlights:\n🚀 National Robotics Summit — Jun 20-21, 2026\n🔐 CipherStorm CTF — Aug 8-9, 2026, 2025\n\nScroll to 'Future Events' section for the full 2025 calendar!", quick: ["Tell me about the Summit","How to register for events?","What is Demo Day?"] };
  if (CHATBOT_KB.selection_q.some(w => m.includes(w)))
    return { text: "Our selection process is thorough but welcoming 🎯:\n\n📝 Step 1: Application Form (no experience needed)\n📋 Step 2: Shortlisting in ~1 week\n🎤 Step 3: 20-min domain interview\n🛠️ Step 4: 48-hour mini task\n🤝 Step 5: Onboarding call\n\nTotal timeline: ~4 weeks. We accept beginners — we look for enthusiasm and potential, not just existing skills!", quick: ["What happens in the interview?","What kind of mini task?","When are applications open?"] };
  if (CHATBOT_KB.location_q.some(w => m.includes(w)))
    return { text: "You can find us at 📍:\n\nSathyabama University Campus\nChenni, Tamil Nadu, India\n\nWe operate mainly from:\n🏛️ Engineering Block — Lab 301 (Technical)\n🎨 Design Studio — Block C\n📸 Media Room — Student Activity Centre\n\nScroll down to our 'Find Us' section on the site for the interactive map!", quick: ["How to reach the lab?","What are lab hours?","Can I visit before joining?"] };
  if (CHATBOT_KB.lead_q.some(w => m.includes(w)))
    return { text: "TRS is led by an incredible team 🌟:\n\n🏅 Club President: Alvinsudhan\n   4th year ECE, Robocon 2024 winner\n\n🥈 Vice President: Shriya Menon\n   3rd year CSE, SIH 2024 finalist\n\nTeam Leads:\n💻 Technical: Aravindhraj M\n🎨 Design: Nithya Prabhu\n📋 Management: Vikram Subramanian\n...and more! Scroll to 'Leadership' to see everyone.", quick: ["Tell me about the Technical team","How to contact leadership?","How to join?"] };
  if (CHATBOT_KB.project_q.some(w => m.includes(w)))
    return { text: "TRS has shipped some incredible things 🛠️:\n\n🤖 Autonomous Line-Following Robot — Won 1st at intra-college fest\n🧠 Campus AI Navigator — Used by 1200+ beta users\n🦾 Autonomous Rover Phase 2 — Competing at Robocon 2025\n🔐 CTF Infrastructure — Built by our CyberSec team\n📱 TRS Member Portal — React + Node.js\n\n7 research papers published. 42 projects shipped total!", quick: ["Can I contribute to projects?","What tech stack do you use?","How to join Technical?"] };
  if (CHATBOT_KB.future_q.some(w => m.includes(w)))
    return { text: "2025 is going to be huge for TRS! 🔥\n\n🚀 National Robotics Summit — June 20-21, 2026 (1000+ attendees!)\n🧬 AI & Biotech Sprint — July 18, 2026\n🔐 CipherStorm CTF — Aug 8-9, 2026\n🤖 RoboExpo — Sep 5, 2026\n💼 Industry Connect — Oct 10, 2026\n🌐 Robotics League S2 — Nov 14, 2026\n\nScroll to the 'Future Events' section for full details and registration links!", quick: ["How to register for Summit?","Tell me about the CTF","What is RoboExpo?"] };
  if (CHATBOT_KB.contact_q.some(w => m.includes(w)))
    return { text: "Reach TRS through these channels 📡:\n\n💬 WhatsApp Community — wa.me/91XXXXXXXXXX\n📸 Instagram — @therobotsociety\n💼 LinkedIn — /company/therobotsociety\n📧 Email — trs@sathyabama.ac.in\n\nFor specific teams, each Lead's LinkedIn is on the Teams section. We typically respond within 24 hours!", quick: ["How to join?","Upcoming events","Visit the campus"] };
  if (CHATBOT_KB.bye.some(w => m.includes(w)))
    return { text: "Thanks for chatting! 🤖 Go build something amazing with TRS. See you on the other side of the code! ⚡\n\nRemember — applications are always open. Click 'Initialize Membership' when you're ready!", quick: ["Start over","How to join?"] };
  return { text: "Interesting question! 🤔 I might not have a specific answer for that, but here are some things I can definitely help you with:", quick: ["How to join TRS?","Tell me about the teams","Upcoming events","Selection process","Find the location"] };
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --cyan:#00D4FF;--green:#00FF88;--purple:#8B5CF6;--orange:#FF6B35;--red:#FF2D55;--blue:#38BDF8;
  --bg:#020408;--bg2:#040810;--bg3:#080D18;--bg4:#0C1220;
  --surface:rgba(0,212,255,0.04);--surface2:rgba(0,212,255,0.08);
  --border:rgba(0,212,255,0.1);--border2:rgba(0,212,255,0.2);--border3:rgba(0,212,255,0.4);
  --text:#E8F4FF;--text2:#7A9AB5;--text3:#3A5A75;
  --font-display:'Orbitron',monospace;--font-body:'Inter',sans-serif;--font-mono:'JetBrains Mono',monospace;
}
[data-theme="light"]{
  --bg:#F0F6FF;--bg2:#E4EEF9;--bg3:#D8E8F4;--bg4:#CCDFF0;
  --surface:rgba(0,100,180,0.05);--surface2:rgba(0,100,180,0.09);
  --border:rgba(0,100,180,0.13);--border2:rgba(0,100,180,0.23);--border3:rgba(0,100,180,0.42);
  --text:#061830;--text2:#3A6080;--text3:#7AAABB;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:var(--font-body);background:var(--bg);color:var(--text);overflow-x:hidden;transition:background .5s,color .5s;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--bg);}::-webkit-scrollbar-thumb{background:var(--cyan);border-radius:2px;}
::selection{background:rgba(0,212,255,0.22);}
body::after{content:'';position:fixed;inset:0;z-index:9990;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px);pointer-events:none;}

/* LOADER */
#loader{position:fixed;inset:0;z-index:9999;background:#020408;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;transition:opacity .9s ease;overflow:hidden;}
#loader canvas{position:absolute;inset:0;z-index:0;pointer-events:none;}
.l-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:18px;}
.lhex{width:90px;height:90px;animation:hexspin 2s linear infinite;filter:drop-shadow(0 0 20px rgba(0,212,255,.5));}
.lhex svg{width:100%;height:100%;}
@keyframes hexspin{to{transform:rotate(360deg)}}
.ltxt{font-family:var(--font-display);font-size:clamp(22px,4vw,34px);font-weight:900;letter-spacing:10px;color:var(--cyan);text-shadow:0 0 40px rgba(0,212,255,.8);}
.lbar{width:300px;height:3px;background:rgba(0,212,255,.1);border-radius:3px;overflow:hidden;}
.lfill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--green),var(--purple));background-size:200% 100%;animation:lload 3.5s cubic-bezier(.4,0,.2,1) forwards,lshift 1.2s linear infinite;box-shadow:0 0 14px var(--cyan);}
@keyframes lload{from{width:0}to{width:100%}}
@keyframes lshift{0%{background-position:0% 50%}100%{background-position:200% 50%}}
.lsub{font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:4px;animation:blink 1s infinite;}
.l-pct{font-family:var(--font-display);font-size:28px;font-weight:900;color:var(--green);letter-spacing:2px;text-shadow:0 0 20px rgba(0,255,136,.5);}
.l-steps{display:flex;flex-direction:column;gap:5px;align-items:flex-start;width:300px;}
.l-step{font-family:var(--font-mono);font-size:10px;letter-spacing:2px;display:flex;align-items:center;gap:8px;transition:all .3s;}
.l-step.done{color:var(--green);}
.l-step.active{color:var(--cyan);}
.l-step.pending{color:var(--text3);}
.l-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.l-step.done .l-dot{background:var(--green);}
.l-step.active .l-dot{background:var(--cyan);animation:blink .5s infinite;}
.l-step.pending .l-dot{background:var(--text3);}
.l-univ{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:3px;text-align:center;margin-top:4px;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:16px 5%;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(24px) saturate(1.8);background:rgba(2,4,8,.88);border-bottom:1px solid var(--border);transition:all .4s;}
[data-theme="light"] nav{background:rgba(240,246,255,.93);}
nav.scrolled{padding:12px 5%;box-shadow:0 4px 40px rgba(0,0,0,.5);}
.nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none;}
.logo-mark{width:36px;height:36px;border:1.5px solid var(--cyan);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--cyan);box-shadow:0 0 12px rgba(0,212,255,.2);}
.logo-text{font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:3px;line-height:1.1;}
.logo-sub{font-family:var(--font-mono);font-size:8px;letter-spacing:2px;color:var(--cyan);display:block;}
.nav-links{display:flex;align-items:center;gap:22px;list-style:none;}
.nav-links a{font-family:var(--font-mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;color:var(--text2);transition:color .3s;position:relative;cursor:pointer;}
.nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:var(--cyan);transform:scaleX(0);transition:transform .3s;}
.nav-links a:hover{color:var(--cyan);}
.nav-links a:hover::after{transform:scaleX(1);}
.nav-right{display:flex;align-items:center;gap:10px;}
.theme-btn{width:50px;height:26px;background:var(--bg4);border:1px solid var(--border2);border-radius:13px;cursor:pointer;position:relative;transition:all .3s;flex-shrink:0;}
.theme-btn::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:var(--cyan);transition:transform .3s;box-shadow:0 0 8px rgba(0,212,255,.5);}
[data-theme="light"] .theme-btn::after{transform:translateX(24px);}
.nav-cta{padding:8px 18px;background:transparent;border:1px solid var(--cyan);border-radius:6px;color:var(--cyan);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;white-space:nowrap;}
.nav-cta:hover{background:var(--cyan);color:#020408;box-shadow:0 0 20px rgba(0,212,255,.4);}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;}
.hamburger span{width:22px;height:1.5px;background:var(--text);border-radius:2px;transition:all .3s;}
.mob-nav{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(2,4,8,.97);border-bottom:1px solid var(--border);padding:16px 5%;flex-direction:column;z-index:499;backdrop-filter:blur(20px);}
.mob-nav.open{display:flex;}
.mob-nav a{padding:12px 0;font-family:var(--font-mono);font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--text2);text-decoration:none;border-bottom:1px solid var(--border);cursor:pointer;transition:color .2s;}
.mob-nav a:hover{color:var(--cyan);}

/* SHARED */
section{padding:90px 5%;}
.stag{font-family:var(--font-mono);font-size:10px;letter-spacing:6px;text-transform:uppercase;color:var(--cyan);opacity:.7;margin-bottom:14px;display:flex;align-items:center;gap:10px;}
.stag::before{content:'';display:inline-block;width:30px;height:1px;background:var(--cyan);}
.stag.center{justify-content:center;}
.stag.center::before{display:none;}
.stitle{font-family:var(--font-display);font-size:clamp(26px,5vw,58px);font-weight:900;letter-spacing:-1px;line-height:1.05;margin-bottom:20px;}
.stitle.center{text-align:center;}
.sdesc{font-size:15px;color:var(--text2);line-height:1.8;max-width:600px;margin-bottom:56px;}
.sdesc.center{margin:0 auto 56px;text-align:center;}
.t-cyan{color:var(--cyan);text-shadow:0 0 40px rgba(0,212,255,.4);}
.t-outline{-webkit-text-stroke:1px var(--cyan);color:transparent;}
.btn-primary{padding:13px 28px;background:var(--cyan);color:#020408;border:none;border-radius:6px;font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,212,255,.4);}
.btn-secondary{padding:13px 28px;background:transparent;color:var(--text);border:1px solid var(--border2);border-radius:6px;font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.btn-secondary:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(0,212,255,.05);}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease;}
.reveal.visible{opacity:1;transform:translateY(0);}
.fi{width:100%;padding:11px 14px;background:var(--bg4);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-body);font-size:13px;margin-bottom:16px;transition:border-color .3s;outline:none;}
.fi:focus{border-color:var(--cyan);}
.fi option{background:var(--bg3);}
.fl{display:block;font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px;text-transform:uppercase;margin-bottom:7px;}

/* HERO */
#hero{min-height:100vh;display:flex;align-items:center;padding:120px 5% 80px;position:relative;overflow:hidden;}
#pcanvas{position:absolute;inset:0;z-index:0;pointer-events:none;}
.circuit-bg{position:absolute;inset:0;opacity:.06;background-image:linear-gradient(var(--cyan) 1px,transparent 1px),linear-gradient(90deg,var(--cyan) 1px,transparent 1px);background-size:80px 80px;animation:cdrift 20s linear infinite;}
@keyframes cdrift{from{background-position:0 0}to{background-position:80px 80px}}
.orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;}
.o1{width:700px;height:700px;right:-200px;top:-100px;background:radial-gradient(circle,rgba(0,212,255,.18),transparent 70%);animation:of 10s ease-in-out infinite;}
.o2{width:400px;height:400px;left:-100px;bottom:0;background:radial-gradient(circle,rgba(139,92,246,.15),transparent 70%);animation:of 14s ease-in-out infinite reverse;}
.o3{width:300px;height:300px;left:40%;top:20%;background:radial-gradient(circle,rgba(0,255,136,.08),transparent 70%);animation:of 8s ease-in-out infinite 3s;}
@keyframes of{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-40px) scale(1.05)}}
.rbot{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:clamp(250px,30vw,440px);opacity:.1;pointer-events:none;animation:rglow 4s ease-in-out infinite;}
@keyframes rglow{0%,100%{opacity:.1;filter:drop-shadow(0 0 20px var(--cyan))}50%{opacity:.18;filter:drop-shadow(0 0 40px var(--cyan))}}
.hero-content{position:relative;z-index:2;max-width:680px;}
.hbadge{display:inline-flex;align-items:center;gap:10px;padding:7px 18px;background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.25);border-radius:4px;font-family:var(--font-mono);font-size:11px;color:var(--cyan);letter-spacing:3px;text-transform:uppercase;margin-bottom:28px;animation:fu .8s ease both;}
.bdot{width:6px;height:6px;background:var(--green);border-radius:50%;box-shadow:0 0 8px var(--green);animation:pdot 1.5s ease-in-out infinite;}
@keyframes pdot{0%,100%{transform:scale(1)}50%{transform:scale(1.6);opacity:.6}}
.heyebrow{font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:4px;text-transform:uppercase;margin-bottom:16px;animation:fu .8s .1s ease both;}
.htitle{font-family:var(--font-display);font-size:clamp(34px,6.5vw,88px);font-weight:900;line-height:1;letter-spacing:-1px;margin-bottom:8px;animation:fu .8s .2s ease both;}
.hsub{font-size:clamp(14px,1.8vw,17px);color:var(--text2);line-height:1.7;max-width:520px;margin-bottom:40px;animation:fu .8s .35s ease both;}
.hbtns{display:flex;gap:14px;flex-wrap:wrap;animation:fu .8s .5s ease both;}
.hstats{position:absolute;right:5%;bottom:10%;display:flex;flex-direction:column;gap:12px;animation:fu .8s .7s ease both;}
.hs{padding:14px 20px;background:rgba(0,212,255,.04);border:1px solid var(--border);border-radius:8px;text-align:right;backdrop-filter:blur(10px);transition:all .3s;}
.hs:hover{border-color:var(--border2);box-shadow:0 0 30px rgba(0,212,255,.2);}
.hs-n{font-family:var(--font-display);font-size:30px;font-weight:900;color:var(--cyan);line-height:1;}
.hs-l{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:3px;text-transform:uppercase;margin-top:3px;}
@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* MARQUEE */
.strip{padding:16px 0;background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;position:relative;}
.strip::before,.strip::after{content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none;}
.strip::before{left:0;background:linear-gradient(90deg,var(--bg2),transparent);}
.strip::after{right:0;background:linear-gradient(-90deg,var(--bg2),transparent);}
.strip-track{display:flex;width:max-content;animation:mq 25s linear infinite;}
.strip-track:hover{animation-play-state:paused;}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.si{display:flex;align-items:center;gap:12px;padding:0 36px;font-family:var(--font-mono);font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--text3);white-space:nowrap;border-right:1px solid var(--border);}
.sd{width:4px;height:4px;border-radius:50%;flex-shrink:0;}
.sd.c{background:var(--cyan);box-shadow:0 0 6px var(--cyan);}
.sd.g{background:var(--green);box-shadow:0 0 6px var(--green);}
.sd.p{background:var(--purple);box-shadow:0 0 6px var(--purple);}

/* LIVE TICKER */
.ticker-bar{display:flex;align-items:center;gap:14px;background:rgba(0,212,255,.05);border:1px solid rgba(0,212,255,.12);border-radius:8px;padding:10px 20px;margin-bottom:20px;overflow:hidden;}
.ticker-lbl{font-family:var(--font-mono);font-size:9px;color:var(--cyan);letter-spacing:3px;white-space:nowrap;border-right:1px solid var(--border2);padding-right:14px;text-transform:uppercase;}
.ticker-scroll{font-family:var(--font-mono);font-size:11px;color:var(--text2);white-space:nowrap;animation:tickmove 20s linear infinite;}
@keyframes tickmove{0%{transform:translateX(60%)}100%{transform:translateX(-100%)}}

/* ABOUT */
.about-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;}
.acard{padding:30px;background:var(--surface);border:1px solid var(--border);border-radius:14px;transition:all .4s;position:relative;overflow:hidden;cursor:default;}
.acard::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);transform:scaleX(0);transition:transform .5s;}
.acard:hover{transform:translateY(-6px);border-color:var(--border2);box-shadow:0 20px 60px rgba(0,0,0,.5);}
.acard:hover::before{transform:scaleX(1);}
.ac-i{font-size:30px;margin-bottom:14px;}
.ac-t{font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;color:var(--cyan);}
.ac-d{font-size:13px;color:var(--text2);line-height:1.75;}

/* LEADERSHIP */
.lead-wrap{display:flex;gap:22px;flex-wrap:wrap;}
.lcard{flex:1;min-width:260px;padding:34px;background:var(--surface);border:1px solid var(--border);border-radius:16px;transition:all .4s;position:relative;overflow:hidden;}
.lcard:hover{transform:translateY(-6px);border-color:var(--border2);box-shadow:0 20px 60px rgba(0,0,0,.5);}
.lcard.pres{border-color:rgba(0,212,255,.18);}
.lcard.vp{border-color:rgba(139,92,246,.18);}
.lav{width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:20px;font-weight:900;margin-bottom:18px;}
.lac{background:rgba(0,212,255,.1);border:2px solid rgba(0,212,255,.4);color:var(--cyan);}
.lap{background:rgba(139,92,246,.1);border:2px solid rgba(139,92,246,.4);color:var(--purple);}
.ln{font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:2px;margin-bottom:4px;}
.lt{font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}
.lb{font-size:13px;color:var(--text2);line-height:1.75;margin-bottom:18px;}
.lli{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;background:rgba(10,102,194,.1);border:1px solid rgba(10,102,194,.25);border-radius:5px;color:#38BDF8;font-family:var(--font-mono);font-size:10px;letter-spacing:1px;text-decoration:none;text-transform:uppercase;transition:all .3s;cursor:pointer;}
.lli:hover{background:rgba(10,102,194,.25);transform:translateY(-2px);}

/* TEAMS */
.teams-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;}
.tcard{padding:30px;background:var(--surface);border:1px solid var(--border);border-radius:16px;transition:all .4s;position:relative;overflow:hidden;}
.tcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;opacity:0;transition:opacity .4s;}
.tcard:hover{transform:translateY(-7px);box-shadow:0 24px 60px rgba(0,0,0,.5);border-color:var(--border2);}
.tcard:hover::before{opacity:1;}
.tc1::before{background:linear-gradient(90deg,var(--cyan),#0066AA);}
.tc2::before{background:linear-gradient(90deg,var(--purple),var(--orange));}
.tc3::before{background:linear-gradient(90deg,var(--green),var(--cyan));}
.tc4::before{background:linear-gradient(90deg,var(--orange),var(--red));}
.tc5::before{background:linear-gradient(90deg,#38BDF8,var(--purple));}
.tc6::before{background:linear-gradient(90deg,var(--green),#00AAAA);}
.tc7::before{background:linear-gradient(90deg,var(--red),var(--orange));}
.tiw{width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px;border:1px solid var(--border);}
.tic{background:rgba(0,212,255,.08);border-color:rgba(0,212,255,.2);}
.tip{background:rgba(139,92,246,.08);border-color:rgba(139,92,246,.2);}
.tig{background:rgba(0,255,136,.08);border-color:rgba(0,255,136,.2);}
.tio{background:rgba(255,107,53,.08);border-color:rgba(255,107,53,.2);}
.tib{background:rgba(56,189,248,.08);border-color:rgba(56,189,248,.2);}
.tir{background:rgba(255,45,85,.08);border-color:rgba(255,45,85,.2);}
.tn{font-family:var(--font-display);font-size:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;}
.tc1 .tn{color:var(--cyan)}.tc2 .tn{color:var(--purple)}.tc3 .tn{color:var(--green)}.tc4 .tn{color:var(--orange)}.tc5 .tn{color:#38BDF8}.tc6 .tn{color:var(--green)}.tc7 .tn{color:var(--red)}
.tli{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
.tln{color:var(--text2);font-size:12px;margin-top:3px;}
.tdesc{font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:16px;}
.tdoms{display:flex;gap:6px;flex-wrap:wrap;}
.dbadge{padding:4px 10px;border-radius:4px;font-family:var(--font-mono);font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;}
.dc{background:rgba(0,212,255,.1);color:var(--cyan);border:1px solid rgba(0,212,255,.2);}
.dp{background:rgba(139,92,246,.1);color:var(--purple);border:1px solid rgba(139,92,246,.2);}
.dg{background:rgba(0,255,136,.1);color:var(--green);border:1px solid rgba(0,255,136,.2);}
.do{background:rgba(255,107,53,.1);color:var(--orange);border:1px solid rgba(255,107,53,.2);}
.db{background:rgba(56,189,248,.1);color:#38BDF8;border:1px solid rgba(56,189,248,.2);}
.dr{background:rgba(255,45,85,.1);color:var(--red);border:1px solid rgba(255,45,85,.2);}

/* EVENTS */
.ev-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px;}
.evf{padding:7px 16px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--text3);font-family:var(--font-mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.evf:hover,.evf.active{background:rgba(0,212,255,.1);color:var(--cyan);border-color:rgba(0,212,255,.4);}
.ev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:18px;}
.ecard{border-radius:14px;overflow:hidden;background:var(--surface);border:1px solid var(--border);transition:all .4s;cursor:pointer;}
.ecard:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,0,0,.5);border-color:var(--border2);}
.eimg{height:130px;display:flex;align-items:center;justify-content:center;font-size:42px;}
.ebody{padding:18px;}
.etag{display:inline-block;padding:3px 10px;border-radius:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:2px;text-transform:uppercase;margin-bottom:9px;}
.tw{background:rgba(0,255,136,.1);color:var(--green);border:1px solid rgba(0,255,136,.2);}
.tc-tag{background:rgba(139,92,246,.1);color:var(--purple);border:1px solid rgba(139,92,246,.2);}
.tp{background:rgba(0,212,255,.1);color:var(--cyan);border:1px solid rgba(0,212,255,.2);}
.tm{background:rgba(255,107,53,.1);color:var(--orange);border:1px solid rgba(255,107,53,.2);}
.etitle{font-family:var(--font-display);font-size:14px;font-weight:700;letter-spacing:1px;margin-bottom:7px;}
.emeta{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px;}

/* FUTURE EVENTS */
#future-events{background:var(--bg);}
.fe-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px;}
.fecard{padding:28px;background:var(--surface);border:1px solid var(--border);border-radius:16px;transition:all .4s;position:relative;overflow:hidden;}
.fecard::after{content:'';position:absolute;inset:0;opacity:0;transition:opacity .4s;pointer-events:none;}
.fecard:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.5);}
.fecard:hover::after{opacity:1;}
.fecard[data-color="cyan"]{border-color:rgba(0,212,255,.15);}
.fecard[data-color="cyan"]:hover{border-color:rgba(0,212,255,.35);}
.fecard[data-color="cyan"]::after{background:radial-gradient(circle at top right,rgba(0,212,255,.06),transparent 70%);}
.fecard[data-color="green"]{border-color:rgba(0,255,136,.15);}
.fecard[data-color="green"]:hover{border-color:rgba(0,255,136,.35);}
.fecard[data-color="green"]::after{background:radial-gradient(circle at top right,rgba(0,255,136,.06),transparent 70%);}
.fecard[data-color="purple"]{border-color:rgba(139,92,246,.15);}
.fecard[data-color="purple"]:hover{border-color:rgba(139,92,246,.35);}
.fecard[data-color="purple"]::after{background:radial-gradient(circle at top right,rgba(139,92,246,.06),transparent 70%);}
.fecard[data-color="orange"]{border-color:rgba(255,107,53,.15);}
.fecard[data-color="orange"]:hover{border-color:rgba(255,107,53,.35);}
.fecard[data-color="blue"]{border-color:rgba(56,189,248,.15);}
.fecard[data-color="blue"]:hover{border-color:rgba(56,189,248,.35);}
.fecard[data-color="red"]{border-color:rgba(255,45,85,.15);}
.fecard[data-color="red"]:hover{border-color:rgba(255,45,85,.35);}
.fe-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;}
.fe-icon{font-size:36px;}
.fe-tag{padding:4px 12px;border-radius:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:2px;text-transform:uppercase;}
.fe-tag[data-color="cyan"]{background:rgba(0,212,255,.1);color:var(--cyan);border:1px solid rgba(0,212,255,.2);}
.fe-tag[data-color="green"]{background:rgba(0,255,136,.1);color:var(--green);border:1px solid rgba(0,255,136,.2);}
.fe-tag[data-color="purple"]{background:rgba(139,92,246,.1);color:var(--purple);border:1px solid rgba(139,92,246,.2);}
.fe-tag[data-color="orange"]{background:rgba(255,107,53,.1);color:var(--orange);border:1px solid rgba(255,107,53,.2);}
.fe-tag[data-color="blue"]{background:rgba(56,189,248,.1);color:#38BDF8;border:1px solid rgba(56,189,248,.2);}
.fe-tag[data-color="red"]{background:rgba(255,45,85,.1);color:var(--red);border:1px solid rgba(255,45,85,.2);}
.fe-date{font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;}
.fe-title{font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:1px;margin-bottom:10px;}
.fe-desc{font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:16px;}
.fe-seats{display:inline-flex;align-items:center;gap:7px;padding:5px 12px;background:rgba(0,255,136,.06);border:1px solid rgba(0,255,136,.2);border-radius:5px;font-family:var(--font-mono);font-size:10px;color:var(--green);letter-spacing:1px;}
.fe-reg-btn{float:right;padding:7px 18px;background:transparent;border:1px solid var(--cyan);border-radius:5px;color:var(--cyan);font-family:var(--font-mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.fe-reg-btn:hover{background:var(--cyan);color:#020408;}

/* SELECTION PROCESS */
#selection{background:var(--bg2);}
.sel-steps{display:flex;flex-direction:column;gap:0;position:relative;}
.sel-steps::before{content:'';position:absolute;left:32px;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--cyan),var(--purple),transparent);z-index:0;}
.sel-step{display:grid;grid-template-columns:64px 1fr;gap:24px;align-items:start;padding:28px 0;position:relative;z-index:1;}
.sel-step:not(:last-child){border-bottom:1px solid var(--border);}
.sel-dot{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;position:relative;border:2px solid var(--border);}
.sel-dot[data-c="cyan"]{background:rgba(0,212,255,.1);border-color:rgba(0,212,255,.4);box-shadow:0 0 20px rgba(0,212,255,.15);}
.sel-dot[data-c="green"]{background:rgba(0,255,136,.1);border-color:rgba(0,255,136,.4);box-shadow:0 0 20px rgba(0,255,136,.15);}
.sel-dot[data-c="purple"]{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.4);box-shadow:0 0 20px rgba(139,92,246,.15);}
.sel-dot[data-c="orange"]{background:rgba(255,107,53,.1);border-color:rgba(255,107,53,.4);box-shadow:0 0 20px rgba(255,107,53,.15);}
.sel-dot[data-c="blue"]{background:rgba(56,189,248,.1);border-color:rgba(56,189,248,.4);box-shadow:0 0 20px rgba(56,189,248,.15);}
.sel-body{padding-top:8px;}
.sel-meta{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
.sel-num{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:3px;}
.sel-dur{font-family:var(--font-mono);font-size:9px;padding:3px 10px;background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.2);border-radius:4px;color:var(--cyan);letter-spacing:2px;text-transform:uppercase;}
.sel-title{font-family:var(--font-display);font-size:18px;font-weight:700;letter-spacing:2px;margin-bottom:10px;}
.sel-desc{font-size:13px;color:var(--text2);line-height:1.75;margin-bottom:14px;}
.sel-tips{display:flex;flex-direction:column;gap:6px;}
.sel-tip{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text3);}
.sel-tip::before{content:'//';font-family:var(--font-mono);color:var(--cyan);font-size:10px;flex-shrink:0;}

/* LOCATION */
#location{background:var(--bg3);}
.loc-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:start;}
.map-container{border-radius:16px;overflow:hidden;border:1px solid var(--border2);position:relative;background:var(--bg4);}
.map-placeholder{height:400px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;position:relative;overflow:hidden;}
.map-grid{position:absolute;inset:0;opacity:.15;background-image:linear-gradient(var(--cyan) 1px,transparent 1px),linear-gradient(90deg,var(--cyan) 1px,transparent 1px);background-size:40px 40px;}
.map-pin{font-size:40px;position:relative;z-index:2;animation:pinbounce 2s ease-in-out infinite;}
@keyframes pinbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.map-label{font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--cyan);letter-spacing:2px;position:relative;z-index:2;}
.map-sub{font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:2px;position:relative;z-index:2;}
.map-ring{position:absolute;width:200px;height:200px;border-radius:50%;border:1px solid rgba(0,212,255,.2);animation:ring-pulse 3s ease-in-out infinite;z-index:1;}
.map-ring:nth-child(2){animation-delay:.5s;width:300px;height:300px;}
.map-ring:nth-child(3){animation-delay:1s;width:400px;height:400px;}
@keyframes ring-pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.1;transform:scale(1.05)}}
.loc-info{display:flex;flex-direction:column;gap:16px;}
.loc-card{padding:22px;background:var(--surface);border:1px solid var(--border);border-radius:12px;transition:all .3s;}
.loc-card:hover{border-color:var(--border2);transform:translateX(4px);}
.loc-card-top{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
.loc-card-icon{font-size:22px;}
.loc-card-title{font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:2px;color:var(--cyan);}
.loc-card-desc{font-size:13px;color:var(--text2);line-height:1.7;}
.loc-card-meta{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px;margin-top:6px;}
.map-open-btn{width:100%;padding:12px;background:transparent;border:1px solid var(--cyan);border-radius:8px;color:var(--cyan);font-family:var(--font-mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;margin-top:8px;}
.map-open-btn:hover{background:var(--cyan);color:#020408;}

/* MEMBERS */
.mem-search-wrap{position:relative;max-width:460px;margin:0 auto 36px;}
.mem-search{width:100%;padding:11px 18px 11px 42px;background:var(--surface);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:var(--font-mono);font-size:12px;letter-spacing:1px;outline:none;transition:border-color .3s;}
.mem-search:focus{border-color:var(--cyan);}
.mem-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:14px;}
.mem-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:18px;}
.mcard{border-radius:14px;overflow:hidden;border:1px solid var(--border);background:var(--surface);transition:all .4s;cursor:pointer;}
.mcard:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,0,0,.5);border-color:var(--border2);}
.mcard-inner{position:relative;height:270px;}
.mfront{padding:26px 18px;text-align:center;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .4s;}
.mcard:hover .mfront{opacity:0;}
.mback{position:absolute;inset:0;padding:18px;background:var(--bg3);display:flex;flex-direction:column;justify-content:center;opacity:0;transition:opacity .4s;}
.mcard:hover .mback{opacity:1;}
.mav{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:17px;font-weight:900;margin-bottom:12px;}
.mac{background:rgba(0,212,255,.1);border:2px solid rgba(0,212,255,.35);color:var(--cyan);}
.map2{background:rgba(139,92,246,.1);border:2px solid rgba(139,92,246,.35);color:var(--purple);}
.mao{background:rgba(255,107,53,.1);border:2px solid rgba(255,107,53,.35);color:var(--orange);}
.mag{background:rgba(0,255,136,.1);border:2px solid rgba(0,255,136,.35);color:var(--green);}
.mab{background:rgba(56,189,248,.1);border:2px solid rgba(56,189,248,.35);color:#38BDF8;}
.mn{font-family:var(--font-display);font-size:12px;font-weight:700;letter-spacing:2px;margin-bottom:4px;}
.mr{font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;}
.mt2{font-size:11px;color:var(--text3);}
.mbn{font-family:var(--font-display);font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:8px;}
.mbb{font-size:11.5px;color:var(--text2);line-height:1.65;margin-bottom:12px;}
.mskills{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px;}
.msk{padding:3px 8px;border-radius:4px;font-family:var(--font-mono);font-size:9px;font-weight:600;}
.mlink{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;background:rgba(10,102,194,.15);border:1px solid rgba(10,102,194,.3);border-radius:4px;color:#38BDF8;font-family:var(--font-mono);font-size:10px;text-decoration:none;transition:all .3s;}
.mlink:hover{background:rgba(10,102,194,.3);}

/* ACHIEVEMENTS */
.ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:18px;margin-bottom:50px;}
.achcard{padding:32px 24px;background:var(--surface);border:1px solid var(--border);border-radius:14px;text-align:center;transition:all .4s;}
.achcard:hover{transform:translateY(-8px);border-color:var(--border2);box-shadow:0 20px 60px rgba(0,0,0,.5);}
.ach-i{font-size:34px;margin-bottom:12px;}
.ach-n{font-family:var(--font-display);font-size:44px;font-weight:900;color:var(--cyan);text-shadow:0 0 30px rgba(0,212,255,.4);line-height:1;}
.ach-l{font-family:var(--font-mono);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--text3);margin-top:7px;}

/* QUIZ */
#quiz{background:var(--bg2);}
.quiz-card{background:var(--surface);border:1px solid var(--border2);border-radius:16px;padding:34px;max-width:600px;margin:0 auto;}
.quiz-prog{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:3px;margin-bottom:10px;}
.pbar{height:3px;background:var(--border);border-radius:3px;margin-bottom:20px;overflow:hidden;}
.pbar-fill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--green));border-radius:3px;transition:width .4s ease;}
.quiz-q{font-family:var(--font-display);font-size:15px;font-weight:700;letter-spacing:1px;margin-bottom:22px;}
.quiz-opts{display:flex;flex-direction:column;gap:9px;}
.qopt{padding:12px 16px;background:var(--bg4);border:1px solid var(--border);border-radius:8px;color:var(--text2);font-family:var(--font-mono);font-size:12px;cursor:pointer;text-align:left;transition:all .3s;}
.qopt:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(0,212,255,.05);}
.qopt.correct{border-color:var(--green);color:var(--green);background:rgba(0,255,136,.08);}
.qopt.wrong{border-color:var(--red);color:var(--red);background:rgba(255,45,85,.08);}
.quiz-res{text-align:center;padding:16px 0;}
.qscore{font-family:var(--font-display);font-size:48px;font-weight:900;color:var(--cyan);text-shadow:0 0 30px rgba(0,212,255,.4);}

/* IDEAS */
.idea-wrap{max-width:660px;margin:0 auto;}
.idea-form{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:34px;}
.ifr{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.isub{width:100%;padding:13px;background:var(--cyan);color:#020408;border:none;border-radius:8px;font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .3s;margin-top:4px;}
.isub:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,212,255,.4);}
.isuccess{text-align:center;padding:50px 30px;background:var(--surface);border:1px solid var(--border);border-radius:16px;}

/* SCROLL PROGRESS BAR */
.scroll-progress{position:fixed;top:0;left:0;z-index:9998;height:3px;background:linear-gradient(90deg,var(--cyan),var(--green),var(--purple));transition:width .1s linear;box-shadow:0 0 8px var(--cyan);}

/* BACK TO TOP */
.btt{position:fixed;bottom:30px;left:30px;z-index:490;width:44px;height:44px;background:rgba(0,212,255,.1);border:1px solid rgba(0,212,255,.35);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:all .4s;backdrop-filter:blur(12px);}
.btt:hover{background:var(--cyan);color:#020408;transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,212,255,.4);}
.btt.hidden{opacity:0;pointer-events:none;transform:translateY(12px);}

/* COUNTDOWN BANNER */
.countdown-banner{background:linear-gradient(135deg,rgba(0,212,255,.06),rgba(0,255,136,.04));border:1px solid rgba(0,212,255,.15);border-radius:14px;padding:20px 28px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;}
.cd-label{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:3px;margin-bottom:6px;text-transform:uppercase;}
.cd-title{font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--cyan);letter-spacing:1px;}
.cd-units{display:flex;gap:12px;}
.cd-unit{display:flex;flex-direction:column;align-items:center;background:var(--bg4);border:1px solid var(--border);border-radius:8px;padding:8px 14px;}
.cd-num{font-family:var(--font-display);font-size:22px;font-weight:900;color:var(--green);line-height:1;}
.cd-uname{font-family:var(--font-mono);font-size:8px;color:var(--text3);letter-spacing:2px;margin-top:3px;}

/* NEWSLETTER */
#newsletter{background:var(--bg3);}

.nl-wrap{background:var(--surface);border:1px solid var(--border2);border-radius:14px;padding:34px;max-width:540px;margin:0 auto;text-align:center;}
.nl-title{font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:3px;color:var(--cyan);margin-bottom:8px;}
.nl-sub{font-size:13px;color:var(--text2);margin-bottom:20px;}
.nl-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
.nl-in{flex:1;min-width:200px;padding:11px 14px;background:var(--bg4);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-mono);font-size:12px;outline:none;transition:border-color .3s;}
.nl-in:focus{border-color:var(--cyan);}
.nl-btn{padding:11px 22px;background:var(--cyan);color:#020408;border:none;border-radius:8px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.nl-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,212,255,.4);}

/* CTA */
#cta{text-align:center;padding:110px 5%;position:relative;overflow:hidden;background:var(--bg2);}
.cta-orb{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,.07),transparent 70%);pointer-events:none;}

/* FOOTER */
footer{background:var(--bg2);border-top:1px solid var(--border);padding:56px 5% 0;}
.ft{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;margin-bottom:36px;}
.fbrand p{font-size:13px;color:var(--text2);line-height:1.8;margin-bottom:18px;max-width:290px;}
.fl-mark{width:38px;height:38px;border:1.5px solid var(--cyan);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:21px;color:var(--cyan);}
.fl-wrap{display:flex;align-items:center;gap:12px;margin-bottom:18px;}
.fl-text{font-family:var(--font-display);font-size:12px;font-weight:700;letter-spacing:2px;line-height:1.4;}
.fsoc{display:flex;gap:8px;}
.fslink{width:34px;height:34px;background:var(--surface);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--text2);text-decoration:none;transition:all .3s;}
.fslink:hover{background:rgba(0,212,255,.1);border-color:var(--border2);color:var(--cyan);}
.fcol h4{font-family:var(--font-mono);font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--text3);margin-bottom:18px;}
.fcol a{display:block;font-size:13px;color:var(--text2);text-decoration:none;margin-bottom:10px;transition:color .2s;cursor:pointer;}
.fcol a:hover{color:var(--cyan);}
.fbot{border-top:1px solid var(--border);padding:18px 0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px;}
.fbot span{color:var(--cyan);}

/* JOIN OVERLAY */
.joverlay{position:fixed;inset:0;z-index:800;display:none;}
.joverlay.open{display:block;}
.jbg{position:absolute;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(20px);}
.jclose{position:absolute;top:20px;right:24px;width:34px;height:34px;background:var(--surface);border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;color:var(--text2);transition:all .3s;z-index:2;}
.jclose:hover{background:rgba(255,45,85,.1);border-color:var(--red);color:var(--red);}
.jcontent{position:relative;z-index:1;height:100%;display:flex;align-items:center;justify-content:center;padding:20px;}
.jcard{width:100%;max-width:540px;background:var(--bg3);border:1px solid var(--border2);border-radius:20px;padding:38px;max-height:90vh;overflow-y:auto;}
.jgreet{text-align:center;margin-bottom:26px;}
.jemoji{font-size:42px;display:block;margin-bottom:12px;}
.jgreet h2{font-family:var(--font-display);font-size:18px;letter-spacing:4px;color:var(--cyan);margin-bottom:8px;}
.jgreet p{font-size:13px;color:var(--text2);line-height:1.7;}
.jfr{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.fsub{width:100%;padding:13px;background:var(--cyan);color:#020408;border:none;border-radius:8px;font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .3s;margin-top:6px;}
.fsub:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,212,255,.4);}
.jsuccess{text-align:center;padding:36px 16px;}
.jsbig{font-size:52px;display:block;margin-bottom:14px;}
.jstars{color:var(--cyan);font-size:14px;margin-bottom:14px;letter-spacing:6px;}
.jsuccess h2{font-family:var(--font-display);font-size:16px;letter-spacing:3px;color:var(--cyan);margin-bottom:10px;}
.jsuccess p{font-size:13px;color:var(--text2);line-height:1.7;}

/* ══════════════════════════════════════
   CHATBOT
══════════════════════════════════════ */
.chat-fab{position:fixed;bottom:28px;right:28px;z-index:700;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,var(--cyan),#0066AA);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 8px 30px rgba(0,212,255,.5);transition:all .3s;animation:fab-pulse 3s ease-in-out infinite;}
.chat-fab:hover{transform:scale(1.12);box-shadow:0 12px 40px rgba(0,212,255,.7);}
@keyframes fab-pulse{0%,100%{box-shadow:0 8px 30px rgba(0,212,255,.5)}50%{box-shadow:0 8px 40px rgba(0,212,255,.8),0 0 0 8px rgba(0,212,255,.08)}}
.chat-notif{position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:9px;color:#fff;font-weight:700;animation:notif-bounce .6s ease-in-out infinite alternate;}
@keyframes notif-bounce{from{transform:scale(1)}to{transform:scale(1.2)}}
.chatbox{position:fixed;bottom:100px;right:28px;z-index:700;width:360px;background:var(--bg3);border:1px solid var(--border2);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.8);overflow:hidden;display:flex;flex-direction:column;max-height:560px;transition:all .4s;transform-origin:bottom right;}
.chatbox.hidden{opacity:0;transform:scale(0.85) translateY(20px);pointer-events:none;}
.chat-header{padding:16px 20px;background:linear-gradient(135deg,rgba(0,212,255,.12),rgba(0,102,170,.08));border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;}
.chat-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--cyan),#0066AA);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;box-shadow:0 0 12px rgba(0,212,255,.4);}
.chat-header-info{flex:1;}
.chat-name{font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:2px;color:var(--cyan);}
.chat-status{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:9px;color:var(--green);letter-spacing:2px;margin-top:2px;}
.chat-online{width:5px;height:5px;background:var(--green);border-radius:50%;box-shadow:0 0 6px var(--green);animation:pdot 1.5s infinite;}
.chat-close{background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;transition:color .2s;padding:4px;}
.chat-close:hover{color:var(--red);}
.chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;min-height:240px;max-height:340px;}
.chat-messages::-webkit-scrollbar{width:2px;}
.chat-messages::-webkit-scrollbar-thumb{background:var(--border2);}
.msg{max-width:85%;animation:msgIn .3s ease;}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg.bot{align-self:flex-start;}
.msg.user{align-self:flex-end;}
.msg-bubble{padding:10px 14px;border-radius:14px;font-size:12.5px;line-height:1.6;white-space:pre-wrap;}
.msg.bot .msg-bubble{background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.15);color:var(--text);border-bottom-left-radius:4px;}
.msg.user .msg-bubble{background:linear-gradient(135deg,var(--cyan),#0066AA);color:#020408;font-weight:500;border-bottom-right-radius:4px;}
.msg-time{font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:4px;}
.msg.user .msg-time{text-align:right;}
.chat-quick{padding:8px 14px 0;display:flex;gap:6px;flex-wrap:wrap;}
.qbtn{padding:5px 12px;background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.2);border-radius:20px;color:var(--cyan);font-family:var(--font-mono);font-size:10px;cursor:pointer;transition:all .3s;white-space:nowrap;}
.qbtn:hover{background:rgba(0,212,255,.15);border-color:var(--cyan);}
.chat-typing{align-self:flex-start;padding:10px 14px;background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.15);border-radius:14px;border-bottom-left-radius:4px;display:flex;gap:4px;align-items:center;}
.typing-dot{width:6px;height:6px;background:var(--cyan);border-radius:50%;animation:tdot .8s infinite;}
.typing-dot:nth-child(2){animation-delay:.2s;}
.typing-dot:nth-child(3){animation-delay:.4s;}
@keyframes tdot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}
.chat-input-area{padding:12px 14px;border-top:1px solid var(--border);display:flex;gap:8px;}
.chat-input{flex:1;padding:10px 14px;background:var(--bg4);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-mono);font-size:12px;outline:none;transition:border-color .3s;}
.chat-input:focus{border-color:var(--cyan);}
.chat-send{width:36px;height:36px;background:var(--cyan);border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .3s;flex-shrink:0;}
.chat-send:hover{background:#0099CC;transform:translateY(-1px);}

/* RESPONSIVE */
@media(max-width:960px){
  .nav-links{display:none;}.nav-cta{display:none;}.hamburger{display:flex;}
  .hstats{display:none;}
  .ft{grid-template-columns:1fr 1fr;}
  .loc-grid{grid-template-columns:1fr;}
  .sel-steps::before{left:28px;}
  .chatbox{width:calc(100vw - 40px);right:20px;}
}
@media(max-width:600px){
  section{padding:60px 5%;}
  .ft{grid-template-columns:1fr;}
  .ifr,.jfr{grid-template-columns:1fr;}
  .sel-step{grid-template-columns:52px 1fr;gap:14px;}
}
`;

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 70); });
    }, { threshold: 0.07 });
    const timer = setInterval(() => {
      document.querySelectorAll(".reveal:not(.visible)").forEach(el => obs.observe(el));
    }, 400);
    return () => { obs.disconnect(); clearInterval(timer); };
  }, []);
}

function useCounter(target, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    const s = performance.now();
    const go = (now) => {
      const p = Math.min((now - s) / 2200, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(go); else setVal(target);
    };
    requestAnimationFrame(go);
  }, [started, target]);
  return val;
}

function useParticles(started) {
  useEffect(() => {
    if (!started) return;
    const canvas = document.getElementById("pcanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .5, op: Math.random() * .4 + .1
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const col = document.documentElement.getAttribute("data-theme") === "light" ? "0,100,180" : "0,212,255";
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${p.op})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(${col},${.05*(1-d/120)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, [started]);
}

/* ═══════════════════════════════════════════════════════════════
   CHATBOT COMPONENT
═══════════════════════════════════════════════════════════════ */
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(true);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState(["How to join?","Tell me about teams","Upcoming events","Find the location"]);
  const messagesEnd = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setMsgs([{ from: "bot", text: "Hey! 👋 I'm ARIA — TRS's AI assistant. Ask me anything about The Robotic Society!", time: now() }]);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  function now() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

  function send(text) {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setShowNotif(false);
    setQuickReplies([]);
    setMsgs(prev => [...prev, { from: "user", text: msg, time: now() }]);
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(msg);
      setTyping(false);
      setMsgs(prev => [...prev, { from: "bot", text: reply.text, time: now() }]);
      if (reply.quick) setQuickReplies(reply.quick);
    }, 900 + Math.random() * 600);
  }

  return (
    <>
      <button className="chat-fab" onClick={() => { setOpen(o => !o); setShowNotif(false); }}>
        {open ? "✕" : "🤖"}
        {showNotif && <div className="chat-notif">1</div>}
      </button>
      <div className={`chatbox${open ? "" : " hidden"}`}>
        <div className="chat-header">
          <div className="chat-avatar">🤖</div>
          <div className="chat-header-info">
            <div className="chat-name">ARIA</div>
            <div className="chat-status"><div className="chat-online"/>Online · TRS Assistant</div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="chat-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              <div className="msg-bubble">{m.text}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          ))}
          {typing && (
            <div className="msg bot">
              <div className="chat-typing">
                <div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/>
              </div>
            </div>
          )}
          <div ref={messagesEnd}/>
        </div>
        {quickReplies.length > 0 && (
          <div className="chat-quick">
            {quickReplies.map((q, i) => <button key={i} className="qbtn" onClick={() => send(q)}>{q}</button>)}
          </div>
        )}
        <div className="chat-input-area">
          <input className="chat-input" placeholder="Ask ARIA anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}/>
          <button className="chat-send" onClick={() => send()}>➤</button>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOCATION SECTION
═══════════════════════════════════════════════════════════════ */
function LocationSection() {
  const openMaps = () => window.open("https://maps.google.com/?q=Sathyabama+University+Chennai", "_blank");
  return (
    <section id="location">
      <div className="stag">find us</div>
      <h2 className="stitle">OUR<br/><span className="t-cyan">LOCATION</span></h2>
      <p className="sdesc">Visit us on campus — whether you're scoping out the lab before joining or dropping by for a demo day, you're always welcome.</p>
      <div className="loc-grid">
        <div className="map-container reveal">
          <div className="map-placeholder">
            <div className="map-grid"/>
            <div className="map-ring"/>
            <div className="map-ring"/>
            <div className="map-ring"/>
            <div className="map-pin">📍</div>
            <div className="map-label">SATHYABAMA UNIVERSITY</div>
            <div className="map-sub">Chennai, Tamil Nadu · India</div>
          </div>
          <div style={{ padding: "16px", borderTop: "1px solid var(--border)" }}>
            <button className="map-open-btn" onClick={openMaps}>🗺️ Open in Google Maps →</button>
          </div>
        </div>
        <div className="loc-info">
          {[
            { icon:"🏛️", title:"Technical Lab", desc:"Our primary workspace — where robots are built, AI models are trained, and caffeine is consumed at industrial quantities.", meta:"Engineering Block · Room 301 · Open Mon–Sat 9AM–9PM" },
            { icon:"🎨", title:"Design Studio", desc:"Where TRS's visual identity comes alive. Equipped with design workstations, a large display wall, and a surprisingly good espresso machine.", meta:"Block C · Level 2 · Open Mon–Fri 10AM–7PM" },
            { icon:"📸", title:"Media & Photography Room", desc:"High-end cameras, drone charging stations, editing suites, and a green screen. Where TRS's visual content is produced.", meta:"Student Activity Centre · Room 12 · By appointment" },
            { icon:"📋", title:"Club Office", desc:"Come here for memberships, event registrations, equipment borrowing, and general queries. The management team keeps it running like a clockwork.", meta:"Admin Block · Room 104 · Mon–Fri 11AM–5PM" },
          ].map(c => (
            <div className="loc-card reveal" key={c.title}>
              <div className="loc-card-top"><span className="loc-card-icon">{c.icon}</span><span className="loc-card-title">{c.title}</span></div>
              <div className="loc-card-desc">{c.desc}</div>
              <div className="loc-card-meta">// {c.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SELECTION PROCESS SECTION
═══════════════════════════════════════════════════════════════ */
function SelectionSection({ openJoin }) {
  return (
    <section id="selection">
      <div className="stag">recruitment</div>
      <h2 className="stitle">SELECTION<br/><span className="t-cyan">PROCESS</span></h2>
      <p className="sdesc">"We don't look for the most skilled — we look for the most hungry." Our selection is designed to find people who'll grow, ship, and lead. Here's exactly what to expect.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
        <div className="sel-steps">
          {SELECTION_STAGES.map((s, i) => (
            <div className="sel-step reveal" key={i}>
              <div className="sel-dot" data-c={s.color}>{s.icon}</div>
              <div className="sel-body">
                <div className="sel-meta">
                  <span className="sel-num">STEP {s.step}</span>
                  <span className="sel-dur">{s.dur}</span>
                </div>
                <div className="sel-title">{s.title}</div>
                <div className="sel-desc">{s.desc}</div>
                <div className="sel-tips">
                  {s.tips.map((t, j) => <div key={j} className="sel-tip">{t}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: "sticky", top: "100px" }}>
          <div className="reveal" style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "16px", padding: "28px", marginBottom: "18px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, letterSpacing: "2px", color: "var(--cyan)", marginBottom: "16px" }}>📊 SELECTION STATS</div>
            {[
              { label: "Applications per cycle", val: "200+", color: "var(--cyan)" },
              { label: "Shortlisting rate", val: "~65%", color: "var(--green)" },
              { label: "Interview pass rate", val: "~50%", color: "var(--purple)" },
              { label: "Avg response time", val: "5 days", color: "var(--orange)" },
              { label: "Beginners accepted", val: "40%", color: "var(--blue)" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text2)", letterSpacing: "1px" }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ background: "rgba(0,212,255,.04)", border: "1px solid rgba(0,212,255,.2)", borderRadius: "12px", padding: "22px", marginBottom: "18px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)", letterSpacing: "3px", marginBottom: "12px", textTransform: "uppercase" }}>// FAQ</div>
            {[
              ["Do I need experience?", "No! 40% of accepted members are complete beginners. We teach — you just need to show up ready to learn."],
              ["Can I apply to multiple teams?", "You can indicate your top 2 preferences. We'll place you where you're the best fit."],
              ["How long does it take?", "About 4 weeks from application to onboarding. We keep it efficient."],
            ].map(([q, a]) => (
              <div key={q} style={{ marginBottom: "14px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text)", letterSpacing: "1px", marginBottom: "4px" }}>Q: {q}</div>
                <div style={{ fontSize: "12px", color: "var(--text2)", lineHeight: "1.65" }}>→ {a}</div>
              </div>
            ))}
          </div>
          <button className="btn-primary reveal" style={{ width: "100%" }} onClick={openJoin}>⚡ Apply Now — It's Free</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FUTURE EVENTS SECTION
═══════════════════════════════════════════════════════════════ */
function FutureEventsSection({ openJoin }) {
  const [regEvent, setRegEvent] = useState(null);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  return (
    <section id="future-events">
      <div className="stag">2026 roadmap</div>
      <h2 className="stitle">FUTURE<br/><span className="t-cyan">EVENTS</span></h2>
      <p className="sdesc">"The future belongs to those who prepare for it today." Here's what TRS has lined up for 2026 — mark your calendars.</p>

      {/* LIVE COUNTDOWN TIMER */}
      <CountdownTimer targetDate="2026-06-20T09:00:00" title="TRS National Robotics Summit 2026"/>

      <div style={{ textAlign:"right", marginBottom:"24px" }}>
        <button className="btn-primary" onClick={openJoin} style={{ flexShrink: 0 }}>🚀 Register Interest →</button>
      </div>

      <div className="fe-grid">
        {FUTURE_EVENTS.map((ev, i) => (
          <div className="fecard reveal" key={i} data-color={ev.color}>
            <div className="fe-top">
              <div className="fe-icon">{ev.icon}</div>
              <div className="fe-tag" data-color={ev.color}>{ev.tag}</div>
            </div>
            <div className="fe-date">// {ev.date}</div>
            <div className="fe-title">{ev.title}</div>
            <div className="fe-desc">{ev.desc}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <div className="fe-seats">🎟️ {ev.seats}</div>
              <button className="fe-reg-btn" onClick={() => { setRegEvent(ev); setRegSuccess(false); setRegName(""); setRegEmail(""); }}>Register →</button>
            </div>
          </div>
        ))}
      </div>

      {/* REGISTRATION MINI MODAL */}
      {regEvent && (
        <div style={{ position: "fixed", inset: 0, z: 900, zIndex: 900, background: "rgba(0,0,0,.8)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setRegEvent(null)}>
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: "18px", padding: "36px", maxWidth: "420px", width: "100%" }} onClick={e => e.stopPropagation()}>
            {!regSuccess ? (
              <>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{regEvent.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, letterSpacing: "2px", color: "var(--cyan)", marginBottom: "6px" }}>Register Interest</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--text2)", marginBottom: "22px" }}>{regEvent.title}</div>
                <label className="fl">Your Name</label>
                <input className="fi" type="text" placeholder="e.g. Arun Kumar" value={regName} onChange={e => setRegName(e.target.value)}/>
                <label className="fl">Email Address</label>
                <input className="fi" type="email" placeholder="your@email.com" value={regEmail} onChange={e => setRegEmail(e.target.value)}/>
                <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setRegEvent(null)}>Cancel</button>
                  <button className="btn-primary" style={{ flex: 1 }} onClick={() => { if (regName && regEmail.includes("@")) setRegSuccess(true); }}>Register →</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "14px" }}>✅</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", letterSpacing: "3px", color: "var(--green)", marginBottom: "10px" }}>YOU'RE REGISTERED!</div>
                <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: "1.7", marginBottom: "20px" }}>{regName}, we've noted your interest for <strong style={{ color: "var(--cyan)" }}>{regEvent.title}</strong>. We'll send details to {regEmail} when registration officially opens.</div>
                <button className="btn-secondary" onClick={() => setRegEvent(null)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   QUIZ COMPONENT
═══════════════════════════════════════════════════════════════ */
const QUESTIONS = [
  { q: "What year was The Robotic Society founded?", opts: ["2020","2021","2022","2023"], ans: 2 },
  { q: "Who is the Technical Team Lead?", opts: ["Vikram S","Nithya Prabhu","Aravindhraj M","Karan Balaji"], ans: 2 },
  { q: "How many specialized teams does TRS have?", opts: ["5","6","7","8"], ans: 2 },
  { q: "Where is TRS's main Technical Lab located?", opts: ["Lab 101","Lab 201","Lab 301","Lab 401"], ans: 2 },
  { q: "What is the biggest upcoming event in 2025?", opts: ["CyberBlitz CTF","National Robotics Summit","RoboExpo","Industry Connect"], ans: 1 },
];

function QuizSection() {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const choose = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === QUESTIONS[cur].ans) setScore(s => s+1);
    setTimeout(() => { if (cur+1 < QUESTIONS.length) { setCur(c => c+1); setSel(null); } else setDone(true); }, 900);
  };
  const restart = () => { setCur(0); setSel(null); setScore(0); setDone(false); };
  return (
    <section id="quiz" style={{ background: "var(--bg2)" }}>
      <div className="stag center">test your knowledge</div>
      <h2 className="stitle center">TRS TRIVIA<br/><span className="t-cyan">CHALLENGE</span></h2>
      <p className="sdesc center">"How well do you know The Robotic Society?" Five quick questions to find out.</p>
      <div className="quiz-card reveal">
        {!done ? (
          <>
            <div className="quiz-prog">QUESTION {cur+1} / {QUESTIONS.length}</div>
            <div className="pbar"><div className="pbar-fill" style={{ width: `${((cur+1)/QUESTIONS.length)*100}%` }}/></div>
            <div className="quiz-q">{QUESTIONS[cur].q}</div>
            <div className="quiz-opts">
              {QUESTIONS[cur].opts.map((o, i) => (
                <button key={i} className={`qopt${sel!==null ? i===QUESTIONS[cur].ans ? " correct" : i===sel ? " wrong" : "" : ""}`} onClick={() => choose(i)}>{o}</button>
              ))}
            </div>
          </>
        ) : (
          <div className="quiz-res">
            <div style={{ fontSize: "52px", marginBottom: "14px" }}>🤖</div>
            <div className="qscore">{score} / {QUESTIONS.length}</div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text2)", marginTop: "12px", marginBottom: "22px" }}>
              {score===QUESTIONS.length ? "PERFECT — YOU KNOW TRS BETTER THAN MOST MEMBERS!" : score>=3 ? "IMPRESSIVE TRS KNOWLEDGE. APPLY NOW!" : "KEEP EXPLORING THE WEBSITE — THE ANSWERS ARE ALL HERE!"}
            </p>
            <button className="btn-primary" onClick={restart}>↩ Try Again</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   JOIN OVERLAY
═══════════════════════════════════════════════════════════════ */
function JoinOverlay({ open, onClose }) {
  const [fd, setFd] = useState({ name:"", college:"", team:"", domain:"", exp:"", why:"" });
  const [done, setDone] = useState(false);
  const doms = DOMAIN_MAP[fd.team] || [];
  const set = (k, v) => setFd(p => ({ ...p, [k]: v, ...(k==="team" ? { domain: "" } : {}) }));
  const submit = () => { if (!fd.name || !fd.college || !fd.team || !fd.domain || !fd.exp) { alert("Please fill all required fields!"); return; } setDone(true); };
  const close = () => { onClose(); setDone(false); setFd({ name:"", college:"", team:"", domain:"", exp:"", why:"" }); };
  if (!open) return null;
  return (
    <div className="joverlay open">
      <div className="jbg" onClick={close}/>
      <div className="jclose" onClick={close}>✕</div>
      <div className="jcontent">
        <div className="jcard">
          {!done ? (
            <>
              <div className="jgreet"><span className="jemoji">🤖</span><h2>ACCESSING SYSTEM</h2><p>Welcome to The Robotic Society. Tell us about yourself and we'll find your perfect team.</p></div>
              <div className="fg"><label className="fl">Full Name</label><input className="fi" type="text" placeholder="e.g. Priya Sharma" value={fd.name} onChange={e => set("name",e.target.value)}/></div>
              <div className="fg"><label className="fl">College / University</label><input className="fi" type="text" placeholder="e.g. Sathyabama University" value={fd.college} onChange={e => set("college",e.target.value)}/></div>
              <div className="jfr">
                <div className="fg">
                  <label className="fl">Team</label>
                  <select className="fi" value={fd.team} onChange={e => set("team",e.target.value)}>
                    <option value="">Select Team</option>
                    {Object.keys(DOMAIN_MAP).map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="fl">Domain</label>
                  <select className="fi" value={fd.domain} onChange={e => set("domain",e.target.value)}>
                    <option value="">Select Domain</option>
                    {doms.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg">
                <label className="fl">Experience Level</label>
                <select className="fi" value={fd.exp} onChange={e => set("exp",e.target.value)}>
                  <option value="">Select Level</option>
                  <option>Complete Beginner 🌱</option><option>Some Basics 📚</option><option>Intermediate 💪</option><option>Advanced 🔥</option>
                </select>
              </div>
              <div className="fg"><label className="fl">Why TRS? (optional)</label><input className="fi" type="text" placeholder="What excites you about joining?" value={fd.why} onChange={e => set("why",e.target.value)}/></div>
              <button className="fsub" onClick={submit}>⚡ INITIALIZE MEMBERSHIP</button>
            </>
          ) : (
            <div className="jsuccess">
              <span className="jsbig">🤖</span>
              <div className="jstars">◆ ◆ ◆ ◆ ◆</div>
              <h2>SYSTEM ACCESS GRANTED</h2>
              <p>{fd.name}, welcome to The Robotic Society — {fd.team} team, {fd.domain} domain. We'll reach out within 24 hours. Get ready to build! ⚡</p>
              <button className="btn-secondary" style={{ marginTop: "18px" }} onClick={close}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [joinOpen, setJoinOpen] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [evFilter, setEvFilter] = useState("all");
  const [achOn, setAchOn] = useState(false);
  const [memSearch, setMemSearch] = useState("");
  const [ideaFd, setIdeaFd] = useState({ name:"", dept:"", title:"", team:"", desc:"" });
  const [ideaDone, setIdeaDone] = useState(false);
  const [nlEmail, setNlEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);

  useScrollReveal();
  useParticles(loaded);

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAchOn(true); }, { threshold: .2 });
    setTimeout(() => { const el = document.getElementById("achievements"); if (el) obs.observe(el); }, 500);
    return () => obs.disconnect();
  }, [loaded]);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobOpen(false); };

  const filteredMembers = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(memSearch.toLowerCase()) ||
    m.role.toLowerCase().includes(memSearch.toLowerCase()) ||
    m.team.toLowerCase().includes(memSearch.toLowerCase()) ||
    m.skills.some(s => s.toLowerCase().includes(memSearch.toLowerCase()))
  );

  const NAV_ITEMS = ["about","leadership","teams","events","future-events","selection","location","members","achievements","ideas"];

  const AV_MAP = { green:"mac", purple:"map2", orange:"mao", blue:"mab", cyan:"mac" };
  const SK_BG = { green:"rgba(0,212,255,.1)", purple:"rgba(139,92,246,.1)", orange:"rgba(255,107,53,.1)", blue:"rgba(56,189,248,.1)", cyan:"rgba(0,212,255,.1)" };
  const SK_COL = { green:"var(--cyan)", purple:"var(--purple)", orange:"var(--orange)", blue:"#38BDF8", cyan:"var(--cyan)" };

  return (
    <>
      <style>{CSS}</style>
      <ScrollProgress/>

      {/* LOADER */}
      {!loaded && <InteractiveLoader onDone={() => setLoaded(true)}/>}

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => scrollTo("hero")}>
          <div className="logo-mark">⬡</div>
          <div><div className="logo-text">THE ROBOTIC<br/>SOCIETY</div><span className="logo-sub">// engineering tomorrow</span></div>
        </div>
        <ul className="nav-links">
          {NAV_ITEMS.slice(0,7).map(id => (
            <li key={id}><a onClick={() => scrollTo(id)}>{id.replace("-"," ").split(" ").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ")}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={() => setTheme(t => t==="dark"?"light":"dark")} title="Toggle theme"/>
          <button className="nav-cta" onClick={() => setJoinOpen(true)}>Join TRS</button>
          <button className="hamburger" onClick={() => setMobOpen(o => !o)}><span/><span/><span/></button>
        </div>
      </nav>
      <div className={`mob-nav${mobOpen?" open":""}`}>
        {NAV_ITEMS.map(id => <a key={id} onClick={() => scrollTo(id)}>{id.replace("-"," ").split(" ").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ")}</a>)}
        <a onClick={() => { setJoinOpen(true); setMobOpen(false); }} style={{ color: "var(--cyan)" }}>⚡ Join TRS</a>
      </div>

      {/* HERO */}
      <section id="hero" style={{ position:"relative", zIndex:1 }}>
        <canvas id="pcanvas" style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }}/>
        <div className="circuit-bg"/>
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="rbot">
          <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="90" y="30" width="120" height="90" rx="12"/><rect x="108" y="48" width="28" height="20" rx="4"/><rect x="164" y="48" width="28" height="20" rx="4"/>
            <line x1="120" y1="94" x2="180" y2="94"/><circle cx="94" cy="74" r="8"/><circle cx="206" cy="74" r="8"/>
            <line x1="150" y1="30" x2="150" y2="10"/><circle cx="150" cy="8" r="5" fill="#00D4FF"/>
            <rect x="132" y="120" width="36" height="20" rx="4"/><rect x="60" y="140" width="180" height="140" rx="14"/>
            <rect x="80" y="158" width="60" height="44" rx="8"/><rect x="162" y="158" width="60" height="44" rx="8"/>
            <circle cx="102" cy="244" r="14"/><circle cx="198" cy="244" r="14"/>
            <rect x="20" y="148" width="40" height="90" rx="10"/><rect x="14" y="238" width="52" height="36" rx="8"/>
            <rect x="240" y="148" width="40" height="90" rx="10"/><rect x="234" y="238" width="52" height="36" rx="8"/>
            <rect x="76" y="280" width="50" height="100" rx="10"/><rect x="70" y="374" width="62" height="32" rx="8"/>
            <rect x="174" y="280" width="50" height="100" rx="10"/><rect x="168" y="374" width="62" height="32" rx="8"/>
          </svg>
        </div>
        <div className="hero-content">
          <div className="hbadge"><div className="bdot"/>Est. 2022 · Student Innovation Club</div>
          <div className="heyebrow">// initializing_society.exe v4.0</div>
          <h1 className="htitle">THE<br/><span className="t-cyan">ROBOTIC</span><br/><span className="t-outline">SOCIETY</span></h1>
          <p className="hsub">Where circuits meet creativity. We build robots, train AI models, secure systems, and engineer the future — one semester at a time.</p>
          <div className="hbtns">
            <button className="btn-primary" onClick={() => setJoinOpen(true)}>Initialize Membership →</button>
            <button className="btn-secondary" onClick={() => scrollTo("about")}>Explore Club</button>
          </div>
        </div>
        <div className="hstats">
          {[{t:150,l:"Members"},{t:42,l:"Projects"},{t:22,l:"Awards"},{t:7,l:"Teams"}].map(s => (
            <div className="hs" key={s.l}><div className="hs-n"><CounterInline target={s.t} started/></div><div className="hs-l">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="strip" style={{ position:"relative", zIndex:1 }}>
        <div className="strip-track">
          {["Build Robots","Train AI Models","Secure Systems","Engineer Tomorrow","Ship Real Projects","Win Competitions","Create Impact","Web Dev · AI/ML · CyberSec","Design · Media · Marketing","Logistics · Management",
            "Build Robots","Train AI Models","Secure Systems","Engineer Tomorrow","Ship Real Projects","Win Competitions","Create Impact","Web Dev · AI/ML · CyberSec","Design · Media · Marketing","Logistics · Management"
          ].map((t,i) => <div className="si" key={i}><div className={`sd ${["c","g","p"][i%3]}`}/>{t}</div>)}
        </div>
      </div>

      {/* LIVE TICKER */}
      <div style={{ padding:"12px 5%", background:"var(--bg2)", borderBottom:"1px solid var(--border)", position:"relative", zIndex:1, overflow:"hidden" }}>
        <div className="ticker-bar">
          <span className="ticker-lbl">📡 LIVE</span>
          <div className="ticker-scroll">🏆 Summit 2026 registrations opening May 15 &nbsp;·&nbsp; 🤖 Rover Phase 2 — 78% complete &nbsp;·&nbsp; 🔐 CyberBlitz team qualifications — April 20 &nbsp;·&nbsp; 💡 Demo Day this Friday 5 PM Lab 201 &nbsp;·&nbsp; 🧬 AI Biotech Sprint — applications open &nbsp;·&nbsp; 📸 Photography Lead: Aditi C hosting drone workshop</div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ position:"relative", zIndex:1 }}>
        <div className="stag">who we are</div>
        <h2 className="stitle">MISSION,<br/><span className="t-cyan">VIBE &amp; VALUES</span></h2>
        <p className="sdesc">"We don't wait for the future — we engineer it." TRS is the only place on campus where hardware meets software, and ambition meets action.</p>
        <div className="about-grid">
          {[
            { i:"🤖", t:"Our Mission", d:"To cultivate engineers, designers, and innovators who build intelligent machines and software systems that solve real problems for real people." },
            { i:"⚡", t:"Our Vibe",    d:"Late nights, live demos, and legendary teamwork. We move at the speed of a startup — powered by curiosity, coffee, and an obsession with building things that work." },
            { i:"🎯", t:"Our Values", d:"Hardware first. Code second. Community always. The best engineers collaborate, communicate, and ship — not just compile." },
            { i:"🌐", t:"Our Reach",  d:"From campus labs to national stages — TRS members compete at the highest levels of robotics, AI, and cybersecurity. We represent and win." },
          ].map(c => <div className="acard reveal" key={c.t}><div className="ac-i">{c.i}</div><div className="ac-t">{c.t}</div><div className="ac-d">{c.d}</div></div>)}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" style={{ position:"relative", zIndex:1, background:"var(--bg2)" }}>
        <div className="stag">command unit</div>
        <h2 className="stitle">CLUB<br/><span className="t-cyan">LEADERSHIP</span></h2>
        <p className="sdesc">"Great clubs don't run themselves — they're led by people who care deeply and act decisively."</p>
        <div className="lead-wrap">
          <div className="lcard pres reveal">
            <div className="lav lac">AS</div>
            <div className="ln">Alvinsudhan</div>
            <div className="lt">Club President</div>
            <div className="lb">"Our robots don't just function — they inspire." 4th year ECE, robotics researcher, architect behind TRS's national expansion. Built the club's first autonomous bot that won Robocon 2024.</div>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="lli">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn Profile
            </a>
          </div>
          <div className="lcard vp reveal">
            <div className="lav lap">SM</div>
            <div className="ln">Shriya Menon</div>
            <div className="lt">Vice President</div>
            <div className="lb">"The best systems are built by the best teams." 3rd year CSE, AI/ML researcher, turned TRS's technical team into a competition powerhouse. SIH 2024 finalist.</div>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="lli">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section id="teams" style={{ position:"relative", zIndex:1 }}>
        <div className="stag">divisions</div>
        <h2 className="stitle">SEVEN TEAMS.<br/><span className="t-cyan">ONE VISION.</span></h2>
        <p className="sdesc">"Specialization is the engine of excellence." TRS is organized into 7 elite teams, each with their own domain expertise, culture, and track record of wins.</p>
        <div className="teams-grid">
          {TEAMS.map(t => {
            const iconCls = { green:"tig", cyan:"tic", purple:"tip", orange:"tio", blue:"tib", red:"tir", green2:"tig" };
            return (
              <div key={t.id} className={`tcard ${t.id} reveal`}>
                <div className={`tiw ${iconCls[t.color]}`}>{t.icon}</div>
                <div className="tn">{t.name}</div>
                <div className="tli">Team Lead<div className="tln">{t.lead}</div></div>
                <div className="tdesc">{t.desc}</div>
                <div className="tdoms">{t.domains.map(d => <span key={d.label} className={`dbadge ${d.cls}`}>{d.label}</span>)}</div>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"14px",padding:"5px 14px",background:"rgba(10,102,194,.1)",border:"1px solid rgba(10,102,194,.25)",borderRadius:"5px",color:"#38BDF8",fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"1px",textDecoration:"none",textTransform:"uppercase",transition:"all .3s" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  {t.lead.split(" ")[0]} on LinkedIn
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" style={{ position:"relative", zIndex:1, background:"var(--bg2)" }}>
        <div className="stag">mission schedule</div>
        <h2 className="stitle">CURRENT<br/><span className="t-cyan">EVENTS</span></h2>
        <p className="sdesc">"The best learning happens when you're too excited to stop." From robotics workshops to national hackathons, every event is designed to push your limits.</p>
        <div className="ev-filters">
          {["all","workshop","competition","project","meeting"].map(f => (
            <button key={f} className={`evf${evFilter===f?" active":""}`} onClick={() => setEvFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
          ))}
        </div>
        <div className="ev-grid">
          {EVENTS_DATA.filter(e => evFilter==="all" || e.type===evFilter).map((e, i) => (
            <div key={i} className="ecard reveal">
              <div className="eimg" style={{ background:`linear-gradient(${e.grad})` }}>{e.icon}</div>
              <div className="ebody">
                <span className={`etag ${e.type==="workshop"?"tw":e.type==="competition"?"tc-tag":e.type==="project"?"tp":"tm"}`}>{e.tag}</span>
                <div className="etitle">{e.title}</div>
                <div className="emeta">// {e.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FUTURE EVENTS */}
      <FutureEventsSection openJoin={() => setJoinOpen(true)}/>

      {/* SELECTION PROCESS */}
      <SelectionSection openJoin={() => setJoinOpen(true)}/>

      {/* LOCATION */}
      <LocationSection/>

      {/* MEMBERS */}
      <section id="members" style={{ position:"relative", zIndex:1 }}>
        <div className="stag">the people</div>
        <h2 className="stitle">TEAM<br/><span className="t-cyan">SPOTLIGHT</span></h2>
        <p className="sdesc">"Robots don't build themselves. People do." Hover the cards to meet the humans behind The Robotic Society.</p>
        <div className="mem-search-wrap">
          <span className="mem-search-icon">🔍</span>
          <input className="mem-search" type="text" placeholder="SEARCH BY NAME, ROLE, OR SKILL..." value={memSearch} onChange={e => setMemSearch(e.target.value)}/>
        </div>
        <div className="mem-grid">
          {filteredMembers.map((m, i) => (
            <div className="mcard reveal" key={i}>
              <div className="mcard-inner">
                <div className="mfront">
                  <div className={`mav ${AV_MAP[m.color]||"mac"}`}>{m.initials}</div>
                  <div className="mn">{m.name}</div>
                  <div className="mr">{m.role}</div>
                  <div className="mt2">{m.team}</div>
                </div>
                <div className="mback">
                  <div className="mbn">{m.name}</div>
                  <div className="mbb">{m.bio}</div>
                  <div className="mskills">{m.skills.map(s => <span key={s} className="msk" style={{ background:SK_BG[m.color]||SK_BG.cyan, color:SK_COL[m.color]||SK_COL.cyan }}>{s}</span>)}</div>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="mlink">🔗 LinkedIn</a>
                </div>
              </div>
            </div>
          ))}
          {filteredMembers.length===0 && <div style={{ color:"var(--text3)", fontFamily:"var(--font-mono)", fontSize:"12px", gridColumn:"1/-1", textAlign:"center", padding:"40px" }}>// NO MEMBERS FOUND MATCHING QUERY</div>}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ position:"relative", zIndex:1, background:"var(--bg2)" }}>
        <div className="stag">scoreboard</div>
        <h2 className="stitle">ACHIEVEMENT<br/><span className="t-cyan">WALL</span></h2>
        <p className="sdesc">"We don't just compete — we come to win." Every number here is earned through late nights, broken code, and a refusal to accept second place.</p>
        <div className="ach-grid">
          {ACHIEVEMENTS.map(a => (
            <div className="achcard reveal" key={a.label}>
              <div className="ach-i">{a.icon}</div>
              <div className="ach-n"><CounterInline target={a.value} started={achOn}/></div>
              <div className="ach-l">{a.label}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth:"500px", margin:"0 auto" }} className="reveal">
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"14px", padding:"26px", borderLeft:"3px solid var(--cyan)" }}>
            <p style={{ fontStyle:"italic", color:"var(--text2)", fontSize:"14px", lineHeight:"1.8", marginBottom:"10px" }}>"When TRS walked onto the national robotics stage for the first time, nobody expected us to win. We didn't just win — we lapped the field."</p>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--cyan)", letterSpacing:"2px" }}>— ARAVINDHRAJ M, TECHNICAL LEAD</span>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <QuizSection/>

      {/* IDEAS */}
      <section id="ideas" style={{ position:"relative", zIndex:1 }}>
        <div className="stag center">upload your idea</div>
        <h2 className="stitle center">GOT AN IDEA?<br/><span className="t-cyan">WE WANT IT.</span></h2>
        <p className="sdesc center">"The idea you're afraid to share is probably the one most worth building."</p>
        <div className="idea-wrap reveal">
          {!ideaDone ? (
            <div className="idea-form">
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"16px", letterSpacing:"3px", color:"var(--cyan)", marginBottom:"6px" }}>SUBMIT YOUR IDEA</h3>
              <p style={{ fontSize:"13px", color:"var(--text2)", marginBottom:"20px" }}>Every TRS project started as an idea someone was afraid to say out loud. We review every single submission.</p>
              <div className="ifr">
                <div><label className="fl">Your Name</label><input className="fi" type="text" placeholder="e.g. Priya Sharma" value={ideaFd.name} onChange={e => setIdeaFd(p=>({...p,name:e.target.value}))}/></div>
                <div><label className="fl">Department</label><input className="fi" type="text" placeholder="e.g. ECE, CSE..." value={ideaFd.dept} onChange={e => setIdeaFd(p=>({...p,dept:e.target.value}))}/></div>
              </div>
              <div><label className="fl">Idea Title</label><input className="fi" type="text" placeholder="Give it a catchy name" value={ideaFd.title} onChange={e => setIdeaFd(p=>({...p,title:e.target.value}))}/></div>
              <div>
                <label className="fl">Relevant Team</label>
                <select className="fi" value={ideaFd.team} onChange={e => setIdeaFd(p=>({...p,team:e.target.value}))}>
                  <option value="">Select Team</option>
                  {["Technical — Web Dev","Technical — AI / ML","Technical — Cybersecurity","Design","Media","Marketing","Photography","Cross-Team"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div><label className="fl">Describe Your Idea</label><textarea className="fi" rows="4" placeholder="What problem does it solve? How might it work?" value={ideaFd.desc} onChange={e => setIdeaFd(p=>({...p,desc:e.target.value}))}/></div>
              <button className="isub" onClick={() => { if (ideaFd.name && ideaFd.title) setIdeaDone(true); }}>⚡ TRANSMIT IDEA</button>
            </div>
          ) : (
            <div className="isuccess">
              <div style={{ fontSize:"52px", marginBottom:"16px" }}>🤖</div>
              <p style={{ fontFamily:"var(--font-display)", fontSize:"18px", color:"var(--cyan)", letterSpacing:"4px", marginBottom:"10px" }}>IDEA RECEIVED</p>
              <span style={{ fontSize:"13px", color:"var(--text2)" }}>Our team reviews every submission. We'll get back to you within 48 hours. Keep building.</span>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" style={{ position:"relative", zIndex:1, background:"var(--bg2)" }}>
        <div className="stag center">stay connected</div>
        <h2 className="stitle center">NEVER MISS<br/><span className="t-cyan">AN UPDATE</span></h2>
        <p className="sdesc center">Weekly dispatches from TRS — events, projects, and open calls for contributors.</p>
        <div className="nl-wrap reveal">
          {!nlDone ? (
            <>
              <div className="nl-title">📡 TRS DISPATCH</div>
              <div className="nl-sub">Get the latest from TRS delivered to your inbox every week.</div>
              <div className="nl-form">
                <input className="nl-in" type="email" placeholder="your@email.com" value={nlEmail} onChange={e => setNlEmail(e.target.value)}/>
                <button className="nl-btn" onClick={() => { if (nlEmail.includes("@")) setNlDone(true); }}>Subscribe →</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ fontSize:"38px", marginBottom:"10px" }}>✅</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"15px", color:"var(--green)", letterSpacing:"3px", marginBottom:"8px" }}>SUBSCRIBED!</div>
              <div style={{ fontSize:"13px", color:"var(--text2)" }}>You're on the list. Watch your inbox for TRS dispatches.</div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-orb"/>
        <div className="stag center">ready to build?</div>
        <p style={{ fontStyle:"italic", color:"var(--text2)", fontSize:"17px", marginBottom:"14px" }}>"You don't find your tribe. You build it."</p>
        <h2 className="stitle center">JOIN<br/><span className="t-cyan">THE ROBOTIC SOCIETY</span></h2>
        <p style={{ color:"var(--text2)", marginBottom:"44px", fontSize:"15px" }}>150+ builders. 7 teams. Infinite possibilities. Your seat is waiting.</p>
        <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-primary" onClick={() => setJoinOpen(true)}>Initialize Membership →</button>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}><button className="btn-secondary">💬 WhatsApp Community</button></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1 }}>
        <div className="ft">
          <div className="fbrand">
            <div className="fl-wrap">
              <div className="fl-mark">⬡</div>
              <div><div className="fl-text">THE ROBOTIC<br/>SOCIETY</div></div>
            </div>
            <p>A student innovation club at the frontier of robotics, AI, and engineering. 7 teams. One mission. Zero excuses.</p>
            <div className="fsoc">
              {[
                { t:"LinkedIn", s:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { t:"Instagram", s:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
              ].map(s => <a key={s.t} href="#" className="fslink" title={s.t}>{s.s}</a>)}
            </div>
          </div>
          {[
            { h:"Navigate", links:["About Us","Leadership","Teams","Events","Future Events","Selection Process","Find Us","Team Spotlight"] },
            { h:"Teams", links:["Technical","Design","Management","Logistics","Media","Marketing","Photography"] },
            { h:"Get Involved", links:["Apply Now","Submit Idea","Newsletter","Upcoming Events","WhatsApp Community","Contact Us"] },
          ].map(col => (
            <div className="fcol" key={col.h}><h4>{col.h}</h4>{col.links.map(l => <a key={l}>{l}</a>)}</div>
          ))}
        </div>
        <div className="fbot">
          <div>© 2026 <span>The Robotic Society</span> · Sathyabama University · Built & Maintained by <span style={{color:"var(--cyan)"}}>Technical Team TRS</span></div>
          <div>// Created &amp; Maintained by <span style={{color:"var(--cyan)",fontWeight:700}}>Technical Team TRS</span> · Sathyabama University</div>
        </div>
      </footer>

      {/* JOIN OVERLAY */}
      <JoinOverlay open={joinOpen} onClose={() => setJoinOpen(false)}/>

      {/* CHATBOT */}
      <Chatbot/>

      {/* BACK TO TOP */}
      <BackToTop/>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }}/>;
}

/* ═══════════════════════════════════════════════════════════════
   BACK TO TOP BUTTON
═══════════════════════════════════════════════════════════════ */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button className={`btt${visible ? "" : " hidden"}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to top">
      ↑
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COUNTDOWN TIMER
═══════════════════════════════════════════════════════════════ */
function CountdownTimer({ targetDate, title }) {
  const [time, setTime] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) { setTime({ d:0, h:0, m:0, s:0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return (
    <div className="countdown-banner reveal">
      <div>
        <div className="cd-label">⏳ Next Major Event</div>
        <div className="cd-title">🚀 {title}</div>
      </div>
      <div className="cd-units">
        {[["d","DAYS"],["h","HRS"],["m","MIN"],["s","SEC"]].map(([k,u]) => (
          <div className="cd-unit" key={k}>
            <div className="cd-num">{String(time[k]).padStart(2,"0")}</div>
            <div className="cd-uname">{u}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE LOADER
═══════════════════════════════════════════════════════════════ */
function InteractiveLoader({ onDone }) {
  const canvasRef = useRef(null);
  const [pct, setPct] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const BOOT_STEPS = [
    "BOOTING SYSTEM CORE...",
    "LOADING SATHYABAMA PROTOCOLS...",
    "CALIBRATING ROBOT MATRIX...",
    "CONNECTING AI MODULES...",
    "SYSTEM ONLINE ✓",
  ];

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const newPct = Math.min(100, Math.round(frame * 2.5));
      setPct(newPct);
      setStepIdx(Math.min(BOOT_STEPS.length - 1, Math.floor(newPct / 22)));
      if (newPct >= 100) { clearInterval(interval); setTimeout(onDone, 600); }
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      a: Math.random(),
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a * 0.6})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id="loader">
      <canvas ref={canvasRef}/>
      <div className="l-content">
        <div className="lhex">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#00D4FF" strokeWidth="2"/>
            <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="none" stroke="#00D4FF" strokeWidth="1" opacity=".4"/>
            <text x="50" y="56" textAnchor="middle" fontFamily="Orbitron,monospace" fontSize="14" fontWeight="900" fill="#00D4FF">TRS</text>
          </svg>
        </div>
        <div className="ltxt">ROBOTIC SOCIETY</div>
        <div className="l-univ">// SATHYABAMA UNIVERSITY · CHENNAI</div>
        <div className="l-pct">{pct}%</div>
        <div className="lbar"><div className="lfill"/></div>
        <div className="l-steps">
          {BOOT_STEPS.map((s, i) => (
            <div key={i} className={`l-step ${i < stepIdx ? "done" : i === stepIdx ? "active" : "pending"}`}>
              <div className="l-dot"/>
              {i < stepIdx ? `[✓] ${s}` : i === stepIdx ? `[>] ${s}` : `[ ] ${s}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* small counter inline helper */
function CounterInline({ target, started }) {
  const val = useCounter(target, started);
  return <>{val}{target >= 100 ? "+" : ""}</>;
}

/* loader timer helper */
function LoaderTimer({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return null;
}