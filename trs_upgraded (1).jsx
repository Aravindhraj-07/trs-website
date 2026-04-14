
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ──────────────────────────────────────────────────── */
const TEAMS = [
  { id:"tc3",icon:"💻",color:"green",name:"Technical",lead:"Aravindhraj S",desc:"The builders and hackers. Three specialized domains pushing the frontier of what's possible with technology — from web applications to machine intelligence to digital security.",domains:[{label:"Web Dev",cls:"dc"},{label:"AI / ML",cls:"dp"},{label:"Cybersecurity",cls:"dg"}],li:"Aravindhraj" },
  { id:"tc1",icon:"🎨",color:"cyan",name:"Design",lead:"Nithya Prabhu",desc:"Visual architects and experience designers who shape how TRS looks and feels — from brand identity to interface design, every pixel crafted with intention.",domains:[{label:"UI/UX Design",cls:"dc"},{label:"Branding",cls:"dc"},{label:"Motion Graphics",cls:"dc"},{label:"Illustration",cls:"dc"}],li:"Nithya" },
  { id:"tc2",icon:"📋",color:"purple",name:"Management",lead:"Vikram Subramanian",desc:"The strategic core of TRS — planning projects, coordinating teams, managing resources and timelines to ensure every initiative launches on time and on target.",domains:[{label:"Project Planning",cls:"dp"},{label:"HR & Recruitment",cls:"dp"},{label:"Strategy",cls:"dp"},{label:"Governance",cls:"dp"}],li:"Vikram" },
  { id:"tc4",icon:"📦",color:"orange",name:"Logistics",lead:"Divya Raghunath",desc:"The backbone of every TRS event and competition — handling procurement, venue setup, hardware inventory, scheduling, and ensuring nothing ever runs out or falls apart.",domains:[{label:"Event Logistics",cls:"do"},{label:"Procurement",cls:"do"},{label:"Inventory",cls:"do"},{label:"Scheduling",cls:"do"}],li:"Divya" },
  { id:"tc5",icon:"📸",color:"blue",name:"Media",lead:"Preethi Lakshmi",desc:"Storytellers, journalists, and content creators who document the TRS journey — social media, written content, video production, and building the narrative the world sees.",domains:[{label:"Social Media",cls:"db"},{label:"Content Writing",cls:"db"},{label:"Videography",cls:"db"},{label:"Graphic Design",cls:"db"}],li:"Preethi" },
  { id:"tc6",icon:"📣",color:"green2",name:"Marketing",lead:"Karan Balaji",desc:"Growth hackers and brand ambassadors — managing digital campaigns, sponsorship outreach, community growth, and making sure TRS's reach extends far beyond campus walls.",domains:[{label:"Digital Marketing",cls:"dg"},{label:"Sponsorships",cls:"dg"},{label:"Campaigns",cls:"dg"},{label:"Analytics",cls:"dg"}],li:"Karan" },
  { id:"tc7",icon:"📷",color:"red",name:"Photography",lead:"Aditi Chandran",desc:"Visual memory keepers of TRS. From high-speed robot action shots to beautifully edited event coverage, this team captures the moments that define our story.",domains:[{label:"Event Shoots",cls:"dr"},{label:"Product Photography",cls:"dr"},{label:"Editing",cls:"dr"},{label:"Drone",cls:"dr"}],li:"Aditi" }
];

const FUTURE_EVENTS = [
  { month:"JUN",date:"06",year:"2025",icon:"🤖",type:"competition",tag:"Competition",title:"RoboWars 2025 — National Robotics Battle",desc:"TRS's flagship robot combat competition returns. 32 teams. Custom bots. Maximum chaos. Register your bot before May 20.",status:"Registrations Open",venue:"College Auditorium, Main Hall",seats:80 },
  { month:"JUL",date:"12",year:"2025",icon:"🧠",type:"workshop",tag:"Workshop",title:"Deep Learning Intensive Bootcamp",desc:"10-day deep dive into neural networks, transformers, and computer vision. Build a production-grade image classifier by day 3.",status:"Applications Open",venue:"Lab 301 & 302",seats:45 },
  { month:"AUG",date:"03",year:"2025",icon:"🔐",type:"competition",tag:"CTF",title:"CyberBlitz Inter-College CTF",desc:"TRS hosts its first inter-college Capture The Flag. 200+ participants expected. Prizes worth ₹75,000. Registration ends July 25.",status:"Early Bird",venue:"Online + Campus",seats:200 },
  { month:"SEP",date:"20",year:"2025",icon:"🚀",type:"summit",tag:"Summit",title:"TRS National Robotics Summit 2025",desc:"The biggest event in TRS history. 20+ colleges. Live demos. Startup pitch track. Industry speakers. 1000+ attendees.",status:"Save the Date",venue:"College Campus + Auditorium",seats:1000 },
  { month:"OCT",date:"11",year:"2025",icon:"⚡",type:"hackathon",tag:"Hackathon",title:"HackTRS 4.0 — 36-Hour Edition",desc:"Our annual mega hackathon, now 36 hours. ₹1.5 Lakh prize pool. Tracks in AI, Robotics, Web, and Cybersecurity.",status:"Coming Soon",venue:"Campus Innovation Hub",seats:300 },
  { month:"NOV",date:"28",year:"2025",icon:"🎓",type:"workshop",tag:"Workshop",title:"AI for Everyone — Zero to Hero",desc:"No-code AI workshop for non-engineers. Teach your friends, juniors, or parents. Certificate included.",status:"Coming Soon",venue:"Seminar Hall A",seats:120 }
];

const EVENTS = [
  { type:"workshop",icon:"🤖",gradient:"135deg,#004D40,#00695C",tag:"Workshop",title:"Intro to Robotics & Arduino",meta:"// FEB 08, 2025 · 2:00 PM · LAB 301" },
  { type:"competition",icon:"⚡",gradient:"135deg,#1A0050,#3D0099",tag:"Competition",title:"TRS Hackathon 3.0",meta:"// MAR 14–15, 2025 · 24HRS · CAMPUS HALL" },
  { type:"workshop",icon:"🧠",gradient:"135deg,#003366,#004499",tag:"Workshop",title:"Machine Learning Bootcamp",meta:"// APR 02–05, 2025 · 4-DAY INTENSIVE" },
  { type:"competition",icon:"🏆",gradient:"135deg,#4A1500,#7A2000",tag:"Competition",title:"National CTF — CyberBlitz",meta:"// APR 20, 2025 · ONLINE + ONSITE" },
  { type:"project",icon:"🚀",gradient:"135deg,#002200,#004400",tag:"Project",title:"Campus AI Navigator",meta:"// ONGOING · 3 TEAMS · 1200+ BETA USERS" },
  { type:"meeting",icon:"💡",gradient:"135deg,#1A0040,#2D0070",tag:"Meetup",title:"Monthly Demo Day",meta:"// EVERY 1ST FRIDAY · 5:00 PM · LAB 201" },
  { type:"workshop",icon:"🔐",gradient:"135deg,#003333,#005555",tag:"Workshop",title:"Ethical Hacking Fundamentals",meta:"// MAY 10, 2025 · 3:00 PM · LAB 305" },
  { type:"project",icon:"🦾",gradient:"135deg,#330022,#660044",tag:"Project",title:"Autonomous Rover — Phase 2",meta:"// ONGOING · TECHNICAL TEAM · ROBOCON 2025" }
];

const MEMBERS = [
  { initials:"AR",name:"Aravindhraj S",role:"Technical Lead",team:"Web Dev · AI/ML · Cyber",quote:'"Code is the closest thing to magic."',bio:"Oversees all 3 technical domains and shipped TRS's first production app used by 2000+ students.",skills:["React","Python","CTF"],color:"green" },
  { initials:"NP",name:"Nithya Prabhu",role:"Design Lead",team:"UI/UX · Branding",quote:'"Design is problem-solving in disguise."',bio:"Crafted TRS's entire visual identity. 3x national design award winner. Figma wizard.",skills:["Figma","Branding"],color:"purple" },
  { initials:"VS",name:"Vikram S",role:"Management Lead",team:"Strategy · Ops",quote:'"Good systems outlast great people."',bio:"Built TRS's project management framework from scratch. Runs the club like a Series A startup.",skills:["Strategy","Ops"],color:"orange" },
  { initials:"DR",name:"Divya R",role:"Logistics Lead",team:"Events · Procurement",quote:'"If it isn\'t planned, it isn\'t happening."',bio:"Managed logistics for 47+ events without a single delay. The person who makes everything actually work.",skills:["Planning","Logistics"],color:"green" },
  { initials:"PL",name:"Preethi L",role:"Media Lead",team:"Content · Social Media",quote:'"Every post tells a story."',bio:"Grew TRS's Instagram from 200 to 8000 followers in 18 months. Content strategist extraordinaire.",skills:["Content","Reels"],color:"blue" },
  { initials:"KB",name:"Karan Balaji",role:"Marketing Lead",team:"Growth · Sponsorships",quote:'"Reach is nothing without resonance."',bio:"Landed TRS's first ₹1L sponsorship and grew our community to 5000+ across platforms.",skills:["SEO","Ads"],color:"cyan" },
  { initials:"AC",name:"Aditi C",role:"Photography Lead",team:"Events · Drone",quote:'"A great photo makes you feel like you were there."',bio:"Certified drone pilot, shot 40+ events for TRS and published in 2 national tech magazines.",skills:["Drone","Lightroom"],color:"orange" },
  { initials:"RN",name:"Rohan Nair",role:"CyberSec Domain",team:"Technical · Cybersecurity",quote:'"Hack it before they do."',bio:"Top-10 nationally in CTF rankings. Leads TRS's ethical hacking workshops and mentors 20+ juniors.",skills:["CTF","Pentest"],color:"purple" }
];

const ACHIEVEMENTS = [
  { icon:"🏆",value:22,label:"Awards Won" },
  { icon:"👥",value:150,label:"Active Members" },
  { icon:"🤖",value:42,label:"Projects Shipped" },
  { icon:"📅",value:57,label:"Events Hosted" },
  { icon:"🌐",value:15,label:"Colleges Reached" },
  { icon:"📜",value:320,label:"Certificates Issued" },
  { icon:"🧠",value:7,label:"Research Papers" },
  { icon:"💼",value:28,label:"Internships Secured" }
];

const TIMELINE = [
  { side:"left",dot:"cyan",year:"// 2022 · BOOT SEQUENCE",title:"System Initialized",desc:"The Robotic Society was founded by 5 ECE and CSE students who shared a vision: a club where you actually build things. First meeting had 18 students. The lab was booked, the whiteboard was full, and the energy was electric." },
  { side:"right",dot:"green",year:"// 2022 · FIRST OUTPUT",title:"First Robot Deployed",desc:"4 months after founding, TRS built and deployed its first autonomous line-following robot. It won 1st place at the intra-college tech fest. The club went from 18 to 60 members in two weeks." },
  { side:"left",dot:"purple",year:"// 2023 · SCALING",title:"7 Teams Formed",desc:"Restructured into 7 specialized teams — Technical, Design, Management, Logistics, Media, Marketing, and Photography. This was the architecture that changed everything. 100+ members. 3 industry partnerships." },
  { side:"right",dot:"cyan",year:"// 2023 · RECOGNITION",title:"National Recognition",desc:"TRS's AI/ML domain published its first research paper. Our cybersecurity team ranked top 10 nationally in a CTF competition. Best Technical Club award from the college." },
  { side:"left",dot:"green",year:"// 2024 · PEAK PERFORMANCE",title:"150+ Strong",desc:"150+ active members across 7 teams. Hosted our first inter-college robotics showcase with 500+ attendees. 22 awards. Products built by TRS members are used by real users." },
  { side:"right",dot:"purple",year:"// 2025 · NEXT MISSION",title:"The Summit Is Coming",desc:"Planning TRS National Robotics Summit — 1000+ students, 20+ colleges, live demos, competitions, and a startup pitch track. The biggest event in our history." }
];

const DOMAIN_MAP = {
  Design:["Visual Design","UI/UX","Branding","Motion Graphics","Illustration"],
  Management:["Project Planning","Operations","HR & Recruitment","Strategy","Club Governance"],
  Logistics:["Event Logistics","Procurement","Venue Management","Inventory","Scheduling"],
  Media:["Photography","Videography","Content Writing","Social Media","Graphic Design"],
  Technical:["Web Development","AI / ML","Cybersecurity"],
  Marketing:["Digital Marketing","Sponsorship Outreach","Campaigns","Analytics","Community Growth"],
  Photography:["Event Photography","Product Shoots","Editing & Post-Production","Drone Photography","Documentary"]
};

const QUIZ_QUESTIONS = [
  { q:"What year was The Robotic Society founded?",opts:["2020","2021","2022","2023"],ans:2 },
  { q:"How many specialized teams does TRS have?",opts:["5","6","7","8"],ans:2 },
  { q:"Who is the Technical Team Lead?",opts:["Vikram S","Aravindhraj S","Rohan Nair","Karan Balaji"],ans:1 },
  { q:"Who is the President of TRS?",opts:["Rithvik Krishnan","Shriya Menon","Aravindhraj S","Karan Balaji"],ans:0 },
  { q:"How many active members does TRS have?",opts:["50+","100+","150+","200+"],ans:2 }
];

const CHATBOT_RESPONSES = {
  greet: ["Hey there! I'm TRS-BOT 🤖 — your guide to The Robotic Society. Ask me anything about our teams, events, how to join, or what we build!", "Hello! TRS-BOT online. What would you like to know about The Robotic Society?"],
  join: ["To join TRS, click the 'Join TRS' button in the nav bar or scroll to the bottom! We accept members every semester. Fill out the form, choose your team and domain, and we'll reach out within 24 hours 🚀"],
  teams: ["TRS has 7 teams: 💻 Technical (Web Dev, AI/ML, Cybersecurity), 🎨 Design, 📋 Management, 📦 Logistics, 📸 Media, 📣 Marketing, and 📷 Photography. Each team has a lead and specialized domains!"],
  technical: ["The Technical Team is led by Aravindhraj S and covers 3 domains: 🌐 Web Development (React, Node, full-stack), 🧠 AI/ML (PyTorch, NLP, computer vision), and 🔐 Cybersecurity (CTF, ethical hacking, pentesting)."],
  president: ["The President of TRS is Alvinsudhan 🤖 — 4th year ECE student, robotics researcher, and the architect behind TRS's national-level expansion. Built the club's first autonomous bot that won Robocon 2024!"],
  events: ["TRS hosts tons of events! 🤖 Robotics workshops, 🧠 ML bootcamps, ⚡ hackathons, 🔐 CTF competitions, and 📸 monthly demo days. Check the Events section for the full schedule!"],
  achievements: ["TRS has won 22+ awards, shipped 42+ projects, hosted 57+ events, reached 15 colleges, and issued 320+ certificates. Our members have secured 28 internships! 🏆"],
  aiml: ["Our AI/ML domain works on NLP, computer vision, and real-world ML deployments. We've published 7 research papers. Led by talented members under the Technical team — see the Teams section!"],
  cyber: ["CyberSec domain ranks top-10 nationally in CTFs. Led by Rohan Nair. We do ethical hacking workshops, pentesting labs, and compete in national competitions like CyberBlitz 2025!"],
  webdev: ["Web Dev domain builds full-stack apps — from our Campus AI Navigator (1200+ beta users) to club management systems. Stack includes React, Node.js, Python, AWS."],
  selection: ["Our selection process has 4 steps: 1️⃣ Fill the application form, 2️⃣ Shortlisting & skill check (48hrs), 3️⃣ Interview/task round with team lead, 4️⃣ Onboarding! Check the Selection Process section for details."],
  default: ["Great question! I'm still learning 🤖 Try asking about: joining TRS, our teams, events, achievements, Technical/AI/ML/Cyber domains, or the selection process!", "Hmm, I'm not sure about that one! Try asking: 'How do I join?', 'Tell me about technical team', or 'What events are coming up?'"]
};

function getChatResponse(msg) {
  const m = msg.toLowerCase();
  if (m.match(/hi|hello|hey|greet/)) return CHATBOT_RESPONSES.greet[Math.floor(Math.random()*2)];
  if (m.match(/join|apply|membership|how to/)) return CHATBOT_RESPONSES.join;
  if (m.match(/teams?|divisions?/)) return CHATBOT_RESPONSES.teams;
  if (m.match(/technical|tech team/)) return CHATBOT_RESPONSES.technical;
  if (m.match(/president|alvinsudhan|leadership/)) return CHATBOT_RESPONSES.president;
  if (m.match(/events?|upcoming|schedule/)) return CHATBOT_RESPONSES.events;
  if (m.match(/achievement|award|win|stats/)) return CHATBOT_RESPONSES.achievements;
  if (m.match(/ai|ml|machine learning|artificial/)) return CHATBOT_RESPONSES.aiml;
  if (m.match(/cyber|security|hacking|ctf/)) return CHATBOT_RESPONSES.cyber;
  if (m.match(/web|frontend|backend|fullstack/)) return CHATBOT_RESPONSES.webdev;
  if (m.match(/select|process|interview|apply|how/)) return CHATBOT_RESPONSES.selection;
  return CHATBOT_RESPONSES.default[Math.floor(Math.random()*2)];
}

/* ─── CSS ───────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
:root{--cyan:#00D4FF;--cyan2:#0099CC;--green:#00FF88;--purple:#8B5CF6;--orange:#FF6B35;--red:#FF2D55;--bg:#020408;--bg2:#040810;--bg3:#080D18;--bg4:#0C1220;--surface:rgba(0,212,255,.04);--surface2:rgba(0,212,255,.08);--border:rgba(0,212,255,.1);--border2:rgba(0,212,255,.2);--border3:rgba(0,212,255,.4);--text:#E8F4FF;--text2:#7A9AB5;--text3:#3A5A75;--glow-cyan:0 0 30px rgba(0,212,255,.3);--glow-green:0 0 30px rgba(0,255,136,.3);--glow-purple:0 0 30px rgba(139,92,246,.3);--font-display:'Orbitron',monospace;--font-body:'Inter',sans-serif;--font-mono:'JetBrains Mono',monospace;}
[data-theme="light"]{--bg:#F0F6FF;--bg2:#E4EEF9;--bg3:#D8E8F4;--bg4:#CCDFF0;--surface:rgba(0,100,180,.04);--surface2:rgba(0,100,180,.08);--border:rgba(0,100,180,.12);--border2:rgba(0,100,180,.22);--border3:rgba(0,100,180,.4);--text:#061830;--text2:#3A6080;--text3:#7AAABB;--glow-cyan:0 0 20px rgba(0,150,200,.12);}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:var(--font-body);background:var(--bg);color:var(--text);overflow-x:hidden;transition:background .5s,color .5s;}
::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-track{background:var(--bg);} ::-webkit-scrollbar-thumb{background:var(--cyan);}
::selection{background:rgba(0,212,255,.25);}
body::after{content:'';position:fixed;inset:0;z-index:9998;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 4px);pointer-events:none;}
[data-theme="light"] body::after{opacity:.3;}

#loader{position:fixed;inset:0;z-index:9999;background:#020408;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;transition:opacity .8s ease;}
.loader-hex{width:80px;height:80px;animation:hex-spin 2s linear infinite;}
.loader-hex svg{width:100%;height:100%;}
@keyframes hex-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.loader-logo-text{font-family:var(--font-display);font-size:clamp(20px,4vw,32px);font-weight:900;letter-spacing:8px;color:var(--cyan);text-shadow:0 0 30px rgba(0,212,255,.6);}
.loader-bar{width:260px;height:2px;background:rgba(0,212,255,.1);border-radius:2px;overflow:hidden;}
.loader-fill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--green));border-radius:2px;animation:lload 2.8s cubic-bezier(.4,0,.2,1) forwards;box-shadow:0 0 10px var(--cyan);}
@keyframes lload{from{width:0}to{width:100%}}
.loader-text{font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:4px;animation:blink 1s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:16px 5%;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(24px) saturate(1.8);background:rgba(2,4,8,.85);border-bottom:1px solid var(--border);transition:all .4s;}
[data-theme="light"] nav{background:rgba(240,246,255,.92);}
nav.scrolled{padding:12px 5%;box-shadow:0 4px 40px rgba(0,0,0,.4);}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer;}
.logo-mark{width:36px;height:36px;border:1.5px solid var(--cyan);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--cyan);box-shadow:0 0 12px rgba(0,212,255,.2);}
.logo-text{font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:3px;color:var(--text);line-height:1.1;}
.logo-sub{font-family:var(--font-mono);font-size:8px;letter-spacing:2px;color:var(--cyan);display:block;}
.nav-links{display:flex;align-items:center;gap:24px;list-style:none;}
.nav-links a{font-family:var(--font-mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;color:var(--text2);transition:color .3s;position:relative;cursor:pointer;}
.nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:var(--cyan);transform:scaleX(0);transition:transform .3s;}
.nav-links a:hover{color:var(--cyan);}
.nav-links a:hover::after{transform:scaleX(1);}
.nav-right{display:flex;align-items:center;gap:10px;}
.theme-toggle{width:50px;height:26px;background:var(--bg4);border:1px solid var(--border2);border-radius:13px;cursor:pointer;position:relative;transition:all .3s;}
.theme-toggle::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:var(--cyan);transition:transform .3s;box-shadow:0 0 8px rgba(0,212,255,.5);}
[data-theme="light"] .theme-toggle::after{transform:translateX(24px);}
.nav-cta{padding:8px 18px;background:transparent;border:1px solid var(--cyan);border-radius:6px;color:var(--cyan);font-family:var(--font-mono);font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;position:relative;overflow:hidden;}
.nav-cta::before{content:'';position:absolute;inset:0;background:var(--cyan);transform:scaleX(0);transform-origin:left;transition:transform .3s;z-index:-1;}
.nav-cta:hover{color:#020408;box-shadow:var(--glow-cyan);}
.nav-cta:hover::before{transform:scaleX(1);}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;}
.hamburger span{width:22px;height:1.5px;background:var(--text);border-radius:2px;}
.mobile-nav{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(2,4,8,.97);border-bottom:1px solid var(--border);padding:20px 5%;flex-direction:column;gap:0;z-index:499;backdrop-filter:blur(20px);}
.mobile-nav.open{display:flex;}
.mobile-nav a{padding:14px 0;font-family:var(--font-mono);font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--text2);text-decoration:none;border-bottom:1px solid var(--border);transition:color .2s;cursor:pointer;}
.mobile-nav a:hover{color:var(--cyan);}

#hero{min-height:100vh;display:flex;align-items:center;padding:120px 5% 80px;position:relative;overflow:hidden;}
.circuit-bg{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(var(--cyan) 1px,transparent 1px),linear-gradient(90deg,var(--cyan) 1px,transparent 1px);background-size:80px 80px;animation:circuit-drift 20s linear infinite;}
@keyframes circuit-drift{from{background-position:0 0}to{background-position:80px 80px}}
.hero-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;}
.orb-1{width:700px;height:700px;right:-200px;top:-100px;background:radial-gradient(circle,rgba(0,212,255,.18) 0%,transparent 70%);animation:orb-float 10s ease-in-out infinite;}
.orb-2{width:400px;height:400px;left:-100px;bottom:0;background:radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 70%);animation:orb-float 14s ease-in-out infinite reverse;}
.orb-3{width:300px;height:300px;left:40%;top:20%;background:radial-gradient(circle,rgba(0,255,136,.08) 0%,transparent 70%);animation:orb-float 8s ease-in-out infinite 3s;}
@keyframes orb-float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-40px) scale(1.05)}}
.robot-silhouette{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:clamp(280px,35vw,480px);opacity:.12;pointer-events:none;animation:robot-glow 4s ease-in-out infinite;}
@keyframes robot-glow{0%,100%{opacity:.12;filter:drop-shadow(0 0 20px var(--cyan))}50%{opacity:.2;filter:drop-shadow(0 0 40px var(--cyan))}}
.hero-content{position:relative;z-index:2;max-width:680px;}
.hero-badge{display:inline-flex;align-items:center;gap:10px;padding:7px 18px;background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.25);border-radius:4px;font-family:var(--font-mono);font-size:11px;color:var(--cyan);letter-spacing:3px;text-transform:uppercase;margin-bottom:32px;animation:fadeUp .8s ease both;}
.badge-dot{width:6px;height:6px;background:var(--green);border-radius:50%;box-shadow:0 0 8px var(--green);animation:pulse-dot 1.5s ease-in-out infinite;}
@keyframes pulse-dot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.6}}
.hero-eyebrow{font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:4px;text-transform:uppercase;margin-bottom:16px;animation:fadeUp .8s .1s ease both;}
.hero-title{font-family:var(--font-display);font-size:clamp(36px,6.5vw,90px);font-weight:900;line-height:1;letter-spacing:-1px;margin-bottom:8px;animation:fadeUp .8s .2s ease both;}
.t-cyan{color:var(--cyan);text-shadow:0 0 40px rgba(0,212,255,.5);}
.t-outline{-webkit-text-stroke:1px var(--cyan);color:transparent;}
.hero-sub{font-size:clamp(15px,1.8vw,18px);color:var(--text2);line-height:1.7;max-width:520px;margin-bottom:40px;animation:fadeUp .8s .35s ease both;}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp .8s .5s ease both;}
.btn-primary{padding:13px 30px;background:var(--cyan);color:#020408;border:none;border-radius:6px;font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,212,255,.4);}
.btn-secondary{padding:13px 30px;background:transparent;color:var(--text);border:1px solid var(--border2);border-radius:6px;font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.btn-secondary:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(0,212,255,.05);}
.hero-stats{position:absolute;right:5%;bottom:10%;display:flex;flex-direction:column;gap:12px;animation:fadeUp .8s .7s ease both;}
.hstat{padding:14px 20px;background:rgba(0,212,255,.04);border:1px solid var(--border);border-radius:8px;text-align:right;backdrop-filter:blur(10px);transition:all .3s;}
.hstat:hover{border-color:var(--border2);box-shadow:var(--glow-cyan);}
.hstat-num{font-family:var(--font-display);font-size:32px;font-weight:900;color:var(--cyan);line-height:1;text-shadow:0 0 20px rgba(0,212,255,.4);}
.hstat-label{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:3px;text-transform:uppercase;margin-top:3px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

.identity-strip{padding:18px 0;background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;position:relative;}
.identity-strip::before,.identity-strip::after{content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none;}
.identity-strip::before{left:0;background:linear-gradient(90deg,var(--bg2),transparent);}
.identity-strip::after{right:0;background:linear-gradient(-90deg,var(--bg2),transparent);}
.strip-track{display:flex;width:max-content;animation:marquee 25s linear infinite;}
.strip-track:hover{animation-play-state:paused;}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.strip-item{display:flex;align-items:center;gap:12px;padding:0 40px;font-family:var(--font-mono);font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--text3);white-space:nowrap;border-right:1px solid var(--border);}
.sdot{width:4px;height:4px;border-radius:50%;background:var(--cyan);box-shadow:0 0 6px var(--cyan);flex-shrink:0;}
.sdot.g{background:var(--green);box-shadow:0 0 6px var(--green);}
.sdot.p{background:var(--purple);box-shadow:0 0 6px var(--purple);}

section{padding:100px 5%;}
.stag{font-family:var(--font-mono);font-size:10px;letter-spacing:6px;text-transform:uppercase;color:var(--cyan);opacity:.7;margin-bottom:14px;display:flex;align-items:center;gap:10px;}
.stag::before{content:'';display:inline-block;width:30px;height:1px;background:var(--cyan);}
.stitle{font-family:var(--font-display);font-size:clamp(28px,5vw,60px);font-weight:900;letter-spacing:-1px;line-height:1.05;margin-bottom:20px;}
.sdesc{font-size:15px;color:var(--text2);line-height:1.8;max-width:600px;margin-bottom:60px;}

.leadership-wrap{display:flex;gap:24px;flex-wrap:wrap;}
.leader-card{flex:1;min-width:260px;padding:36px;background:var(--surface);border:1px solid var(--border);border-radius:16px;transition:all .4s;position:relative;overflow:hidden;}
.leader-card:hover{transform:translateY(-6px);border-color:var(--border2);box-shadow:0 20px 60px rgba(0,0,0,.5);}
.leader-card.pres{border-color:rgba(0,212,255,.2);}
.leader-card.vp{border-color:rgba(139,92,246,.2);}
.leader-avatar{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:22px;font-weight:900;margin-bottom:20px;}
.la-cyan{background:rgba(0,212,255,.1);border:2px solid rgba(0,212,255,.4);color:var(--cyan);box-shadow:0 0 30px rgba(0,212,255,.15);}
.la-purple{background:rgba(139,92,246,.1);border:2px solid rgba(139,92,246,.4);color:var(--purple);box-shadow:0 0 30px rgba(139,92,246,.15);}
.leader-name{font-family:var(--font-display);font-size:18px;font-weight:700;letter-spacing:2px;margin-bottom:4px;}
.leader-title{font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;}
.leader-bio{font-size:13px;color:var(--text2);line-height:1.75;margin-bottom:20px;}
.leader-li{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;background:rgba(10,102,194,.1);border:1px solid rgba(10,102,194,.25);border-radius:5px;color:#38BDF8;font-family:var(--font-mono);font-size:10px;letter-spacing:1px;text-decoration:none;text-transform:uppercase;transition:all .3s;}
.leader-li:hover{background:rgba(10,102,194,.25);transform:translateY(-2px);}

.about-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;}
.about-card{padding:32px;background:var(--surface);border:1px solid var(--border);border-radius:14px;transition:all .4s;position:relative;overflow:hidden;cursor:default;}
.about-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);transform:scaleX(0);transition:transform .5s;}
.about-card:hover{transform:translateY(-6px);border-color:var(--border2);box-shadow:0 20px 60px rgba(0,0,0,.5);}
.about-card:hover::before{transform:scaleX(1);}
.ci{font-size:32px;margin-bottom:16px;}
.ct{font-family:var(--font-display);font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;color:var(--cyan);}
.cd{font-size:13px;color:var(--text2);line-height:1.75;}

.tl-line{position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--cyan),var(--purple),transparent);transform:translateX(-50%);}
.tl-grid{display:flex;flex-direction:column;gap:56px;position:relative;}
.tl-item{display:grid;grid-template-columns:1fr 60px 1fr;align-items:center;}
.tl-content{padding:28px 32px;background:var(--surface);border:1px solid var(--border);border-radius:12px;transition:all .4s;position:relative;}
.tl-content:hover{border-color:var(--border2);transform:scale(1.02);box-shadow:0 16px 50px rgba(0,0,0,.4);}
.tl-content::before{content:'';position:absolute;top:0;left:0;bottom:0;width:2px;background:var(--cyan);border-radius:2px 0 0 2px;opacity:0;transition:opacity .3s;}
.tl-content:hover::before{opacity:1;}
.tl-yr{font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:4px;text-transform:uppercase;margin-bottom:8px;}
.tl-tt{font-family:var(--font-display);font-size:16px;font-weight:700;letter-spacing:1px;margin-bottom:8px;}
.tl-dd{font-size:13px;color:var(--text2);line-height:1.7;}
.tl-dot{width:14px;height:14px;background:var(--cyan);border-radius:50%;border:3px solid var(--bg2);box-shadow:0 0 0 2px var(--cyan),0 0 15px var(--cyan);margin:auto;z-index:1;}
.tl-dot.p{background:var(--purple);box-shadow:0 0 0 2px var(--purple),0 0 15px var(--purple);}
.tl-dot.g{background:var(--green);box-shadow:0 0 0 2px var(--green),0 0 15px var(--green);}

.teams-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;}
.team-card{padding:32px;background:var(--surface);border:1px solid var(--border);border-radius:16px;transition:all .4s;position:relative;overflow:hidden;}
.team-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;transition:opacity .4s;opacity:0;}
.team-card:hover{transform:translateY(-7px);box-shadow:0 24px 60px rgba(0,0,0,.5);border-color:var(--border2);}
.team-card:hover::before{opacity:1;}
.tc1::before{background:linear-gradient(90deg,var(--cyan),#0066AA);}
.tc2::before{background:linear-gradient(90deg,var(--purple),var(--orange));}
.tc3::before{background:linear-gradient(90deg,var(--green),var(--cyan));}
.tc4::before{background:linear-gradient(90deg,var(--orange),var(--red));}
.tc5::before{background:linear-gradient(90deg,#38BDF8,var(--purple));}
.tc6::before{background:linear-gradient(90deg,var(--green),#00AAAA);}
.tc7::before{background:linear-gradient(90deg,var(--red),var(--orange));}
.team-icon-wrap{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:20px;border:1px solid var(--border);}
.ti-cyan{background:rgba(0,212,255,.08);border-color:rgba(0,212,255,.2);}
.ti-purple{background:rgba(139,92,246,.08);border-color:rgba(139,92,246,.2);}
.ti-green{background:rgba(0,255,136,.08);border-color:rgba(0,255,136,.2);}
.ti-orange{background:rgba(255,107,53,.08);border-color:rgba(255,107,53,.2);}
.ti-blue{background:rgba(56,189,248,.08);border-color:rgba(56,189,248,.2);}
.ti-red{background:rgba(255,45,85,.08);border-color:rgba(255,45,85,.2);}
.tn{font-family:var(--font-display);font-size:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;}
.tc1 .tn{color:var(--cyan);} .tc2 .tn{color:var(--purple);} .tc3 .tn{color:var(--green);}
.tc4 .tn{color:var(--orange);} .tc5 .tn{color:#38BDF8;} .tc6 .tn{color:var(--green);} .tc7 .tn{color:var(--red);}
.team-lead-info{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;}
.team-lead-name{color:var(--text2);font-size:12px;margin-top:3px;}
.td{font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:18px;}
.tdoms{display:flex;gap:8px;flex-wrap:wrap;}
.dbadge{padding:4px 10px;border-radius:4px;font-family:var(--font-mono);font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;}
.dc{background:rgba(0,212,255,.1);color:var(--cyan);border:1px solid rgba(0,212,255,.2);}
.dp{background:rgba(139,92,246,.1);color:var(--purple);border:1px solid rgba(139,92,246,.2);}
.dg{background:rgba(0,255,136,.1);color:var(--green);border:1px solid rgba(0,255,136,.2);}
.do{background:rgba(255,107,53,.1);color:var(--orange);border:1px solid rgba(255,107,53,.2);}
.db{background:rgba(56,189,248,.1);color:#38BDF8;border:1px solid rgba(56,189,248,.2);}
.dr{background:rgba(255,45,85,.1);color:var(--red);border:1px solid rgba(255,45,85,.2);}
.team-li{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:5px 14px;background:rgba(10,102,194,.1);border:1px solid rgba(10,102,194,.25);border-radius:5px;color:#38BDF8;font-family:var(--font-mono);font-size:10px;letter-spacing:1px;text-decoration:none;text-transform:uppercase;transition:all .3s;}
.team-li:hover{background:rgba(10,102,194,.22);transform:translateY(-2px);}

.ef{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:40px;}
.fb{padding:7px 18px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--text3);font-family:var(--font-mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.fb:hover,.fb.active{background:rgba(0,212,255,.1);color:var(--cyan);border-color:rgba(0,212,255,.4);}
.events-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;}
.event-card{border-radius:14px;overflow:hidden;background:var(--surface);border:1px solid var(--border);transition:all .4s;cursor:pointer;}
.event-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,0,0,.5);border-color:var(--border2);}
.eimg{height:140px;display:flex;align-items:center;justify-content:center;font-size:44px;}
.ebody{padding:22px;}
.etag{display:inline-block;padding:3px 10px;border-radius:4px;font-family:var(--font-mono);font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;}
.tw{background:rgba(0,212,255,.1);color:var(--cyan);border:1px solid rgba(0,212,255,.2);}
.tc{background:rgba(255,107,53,.1);color:var(--orange);border:1px solid rgba(255,107,53,.2);}
.tm2{background:rgba(139,92,246,.1);color:var(--purple);border:1px solid rgba(139,92,246,.2);}
.tp2{background:rgba(0,255,136,.1);color:var(--green);border:1px solid rgba(0,255,136,.2);}
.etitle{font-family:var(--font-display);font-size:14px;font-weight:700;letter-spacing:1px;margin-bottom:8px;}
.emeta{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px;}

.search-wrap{display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px 16px;margin-bottom:30px;max-width:400px;transition:border-color .3s;}
.search-wrap:focus-within{border-color:var(--border2);}
.search-icon{font-size:14px;}
.search-input{background:transparent;border:none;outline:none;color:var(--text);font-family:var(--font-mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;width:100%;}
.search-input::placeholder{color:var(--text3);}
.members-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;}
.mc{height:280px;perspective:1200px;cursor:pointer;}
.mi{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.4,0,.2,1);}
.mc:hover .mi{transform:rotateY(180deg);}
.mf,.mb{position:absolute;inset:0;backface-visibility:hidden;border-radius:14px;border:1px solid var(--border);overflow:hidden;}
.mf{background:var(--surface);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;}
.mb{background:var(--bg3);transform:rotateY(180deg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:22px;text-align:center;border-color:var(--border2);}
.mav{width:68px;height:68px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:20px;font-weight:900;border:1.5px solid;}
.avg{background:rgba(0,212,255,.1);color:var(--cyan);border-color:rgba(0,212,255,.3);}
.avp{background:rgba(139,92,246,.1);color:var(--purple);border-color:rgba(139,92,246,.3);}
.ava{background:rgba(255,107,53,.1);color:var(--orange);border-color:rgba(255,107,53,.3);}
.avb{background:rgba(56,189,248,.1);color:#38BDF8;border-color:rgba(56,189,248,.3);}
.mn{font-family:var(--font-display);font-size:14px;font-weight:700;letter-spacing:1px;text-align:center;}
.mr{font-family:var(--font-mono);font-size:9px;color:var(--cyan);letter-spacing:2px;text-transform:uppercase;text-align:center;}
.mt{font-family:var(--font-mono);font-size:9px;color:var(--text3);text-align:center;letter-spacing:1px;}
.mbn{font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:1px;}
.mbb{font-size:11px;color:var(--text2);line-height:1.6;}
.mskills{display:flex;gap:5px;flex-wrap:wrap;justify-content:center;}
.sk{padding:2px 8px;border-radius:3px;font-family:var(--font-mono);font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;}
.mli{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(10,102,194,.15);border:1px solid rgba(10,102,194,.3);border-radius:5px;color:#38BDF8;font-family:var(--font-mono);font-size:9px;letter-spacing:1px;text-decoration:none;transition:all .3s;text-transform:uppercase;margin-top:4px;}
.mli:hover{background:rgba(10,102,194,.3);}

.ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:20px;margin-bottom:60px;}
.ach-card{padding:30px 22px;text-align:center;background:var(--surface);border:1px solid var(--border);border-radius:14px;transition:all .4s;position:relative;overflow:hidden;}
.ach-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--green));}
.ach-card:hover{transform:translateY(-5px);border-color:var(--border2);box-shadow:0 0 40px rgba(0,212,255,.15);}
.ai{font-size:32px;margin-bottom:12px;}
.an{font-family:var(--font-display);font-size:48px;font-weight:900;color:var(--cyan);line-height:1;margin-bottom:6px;text-shadow:0 0 20px rgba(0,212,255,.4);}
.al{font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:3px;text-transform:uppercase;}

.idea-wrap{max-width:680px;margin:0 auto;padding:48px;background:var(--surface);border:1px solid var(--border);border-radius:20px;position:relative;overflow:hidden;}
.idea-wrap::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--purple),var(--green));}
.ifrm{display:flex;flex-direction:column;gap:14px;}
.ifrm input,.ifrm textarea,.ifrm select,.fi{width:100%;padding:13px 16px;background:rgba(0,212,255,.03);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-body);font-size:14px;transition:border-color .3s;resize:none;}
.ifrm input:focus,.ifrm textarea:focus,.ifrm select:focus,.fi:focus{outline:none;border-color:var(--cyan);box-shadow:0 0 0 2px rgba(0,212,255,.1);}
.ifrm input::placeholder,.ifrm textarea::placeholder{color:var(--text3);}
.ifrm select option,.fi option{background:var(--bg3);}
[data-theme="light"] .ifrm input,[data-theme="light"] .ifrm textarea,[data-theme="light"] .ifrm select,[data-theme="light"] .fi{background:rgba(0,100,180,.03);}
.fl{font-family:var(--font-mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:5px;display:block;}
.ifr,.fr{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.isub,.fsub{padding:14px;background:var(--cyan);border:none;border-radius:8px;color:#020408;font-family:var(--font-mono);font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .3s;width:100%;}
.isub:hover,.fsub:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,212,255,.4);}
.isuccess{text-align:center;padding:20px;}
.isuccess .big{font-size:52px;margin-bottom:12px;display:block;}
.isuccess p{font-family:var(--font-display);font-size:20px;color:var(--cyan);margin-bottom:8px;letter-spacing:2px;}
.isuccess span{font-size:13px;color:var(--text2);}

/* QUIZ */
.quiz-card{max-width:600px;margin:0 auto;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:40px;}
.quiz-q{font-family:var(--font-display);font-size:clamp(14px,2vw,18px);font-weight:700;letter-spacing:1px;line-height:1.4;margin-bottom:28px;}
.quiz-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.quiz-opt{padding:14px 18px;background:rgba(0,212,255,.04);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-family:var(--font-mono);font-size:12px;letter-spacing:1px;cursor:pointer;transition:all .3s;text-align:left;}
.quiz-opt:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(0,212,255,.08);}
.quiz-opt.correct{border-color:var(--green);background:rgba(0,255,136,.1);color:var(--green);}
.quiz-opt.wrong{border-color:var(--red);background:rgba(255,45,85,.1);color:var(--red);}
.quiz-result{text-align:center;padding:20px 0;}
.quiz-score{font-family:var(--font-display);font-size:42px;font-weight:900;color:var(--cyan);text-shadow:0 0 30px rgba(0,212,255,.4);}
.pulse-bar{height:3px;background:linear-gradient(90deg,var(--cyan),var(--green),var(--purple));border-radius:3px;margin-bottom:20px;animation:pulse-bar 3s ease-in-out infinite alternate;}
@keyframes pulse-bar{from{box-shadow:0 0 10px rgba(0,212,255,.4)}to{box-shadow:0 0 30px rgba(0,212,255,.8)}}

/* NEWSLETTER */
.newsletter-wrap{background:var(--surface);border:1px solid var(--border2);border-radius:14px;padding:36px;max-width:560px;margin:0 auto;text-align:center;}
.nl-title{font-family:var(--font-display);font-size:18px;font-weight:700;letter-spacing:3px;color:var(--cyan);margin-bottom:8px;}
.nl-sub{font-size:13px;color:var(--text2);margin-bottom:20px;}
.nl-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
.nl-input{flex:1;min-width:220px;padding:11px 16px;background:var(--bg4);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-mono);font-size:12px;outline:none;transition:border-color .3s;}
.nl-input:focus{border-color:var(--cyan);}
.nl-btn{padding:11px 24px;background:var(--cyan);color:#020408;border:none;border-radius:8px;font-family:var(--font-mono);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.nl-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,212,255,.4);}

/* LIVE TICKER */
.live-ticker{display:flex;align-items:center;gap:14px;overflow:hidden;}
.ticker-label{font-family:var(--font-mono);font-size:10px;font-weight:700;color:var(--green);letter-spacing:3px;background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.3);padding:3px 10px;border-radius:4px;white-space:nowrap;}
.ticker-content{font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:1px;white-space:nowrap;overflow:hidden;animation:ticker-scroll 30s linear infinite;}
@keyframes ticker-scroll{from{transform:translateX(100%)}to{transform:translateX(-100%)}}

/* CHATBOT */
.chatbot-fab{position:fixed;bottom:28px;right:28px;z-index:600;width:58px;height:58px;background:var(--cyan);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 8px 30px rgba(0,212,255,.5);transition:all .3s;animation:fab-pulse 3s ease-in-out infinite;}
@keyframes fab-pulse{0%,100%{box-shadow:0 8px 30px rgba(0,212,255,.5)}50%{box-shadow:0 8px 50px rgba(0,212,255,.8)}}
.chatbot-fab:hover{transform:scale(1.1);}
.chatbot-badge{position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:var(--red);border-radius:50%;border:2px solid var(--bg);font-family:var(--font-mono);font-size:9px;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;}
.chatbot-window{position:fixed;bottom:100px;right:28px;z-index:600;width:360px;max-height:520px;background:var(--bg2);border:1px solid var(--border2);border-radius:16px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.6);animation:chatbot-slide .3s cubic-bezier(.4,0,.2,1);}
@keyframes chatbot-slide{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.chatbot-header{padding:16px 20px;background:rgba(0,212,255,.06);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.chatbot-header-info{display:flex;align-items:center;gap:10px;}
.chatbot-avatar{width:36px;height:36px;background:rgba(0,212,255,.15);border:1.5px solid var(--cyan);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;}
.chatbot-name{font-family:var(--font-display);font-size:12px;font-weight:700;letter-spacing:2px;color:var(--cyan);}
.chatbot-status{font-family:var(--font-mono);font-size:9px;color:var(--green);letter-spacing:2px;display:flex;align-items:center;gap:5px;}
.chatbot-status::before{content:'';width:5px;height:5px;background:var(--green);border-radius:50%;box-shadow:0 0 6px var(--green);}
.chatbot-close{background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:4px;transition:color .2s;}
.chatbot-close:hover{color:var(--red);}
.chatbot-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
.chatbot-msgs::-webkit-scrollbar{width:3px;}
.chatbot-msgs::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px;}
.chat-msg{max-width:85%;padding:10px 14px;border-radius:10px;font-size:13px;line-height:1.6;animation:msg-in .25s ease;}
@keyframes msg-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.chat-msg.bot{background:rgba(0,212,255,.06);border:1px solid var(--border);color:var(--text2);align-self:flex-start;border-radius:10px 10px 10px 2px;}
.chat-msg.user{background:rgba(0,212,255,.15);border:1px solid rgba(0,212,255,.3);color:var(--text);align-self:flex-end;text-align:right;border-radius:10px 10px 2px 10px;}
.chat-msg.typing{font-family:var(--font-mono);font-size:11px;color:var(--text3);letter-spacing:2px;}
.chatbot-suggestions{padding:8px 16px;display:flex;gap:6px;flex-wrap:wrap;border-top:1px solid var(--border);}
.chat-suggest{padding:4px 10px;background:rgba(0,212,255,.06);border:1px solid var(--border);border-radius:4px;font-family:var(--font-mono);font-size:9px;letter-spacing:1px;color:var(--text3);cursor:pointer;transition:all .2s;white-space:nowrap;}
.chat-suggest:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(0,212,255,.1);}
.chatbot-input-row{padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:8px;align-items:center;}
.chatbot-input{flex:1;padding:10px 14px;background:rgba(0,212,255,.03);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-mono);font-size:11px;letter-spacing:1px;outline:none;transition:border-color .3s;}
.chatbot-input:focus{border-color:var(--cyan);}
.chatbot-send{width:36px;height:36px;background:var(--cyan);border:none;border-radius:8px;color:#020408;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .2s;flex-shrink:0;}
.chatbot-send:hover{transform:scale(1.05);box-shadow:0 4px 15px rgba(0,212,255,.4);}

/* FUTURE EVENTS */
.future-events-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:24px;}
.future-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:all .4s;cursor:pointer;}
.future-card:hover{transform:translateY(-7px);box-shadow:0 24px 60px rgba(0,0,0,.5);border-color:var(--border2);}
.future-card-top{padding:20px 24px;display:flex;align-items:flex-start;gap:16px;}
.future-date-box{text-align:center;background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.2);border-radius:10px;padding:10px 14px;min-width:60px;}
.future-date-month{font-family:var(--font-mono);font-size:9px;color:var(--cyan);letter-spacing:3px;text-transform:uppercase;}
.future-date-num{font-family:var(--font-display);font-size:28px;font-weight:900;color:var(--text);line-height:1;}
.future-date-year{font-family:var(--font-mono);font-size:8px;color:var(--text3);letter-spacing:2px;}
.future-card-info{flex:1;}
.future-status{font-family:var(--font-mono);font-size:9px;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;}
.future-status.open{color:var(--green);}
.future-status.early{color:var(--cyan);}
.future-status.soon{color:var(--orange);}
.future-status.save{color:var(--purple);}
.future-title{font-family:var(--font-display);font-size:14px;font-weight:700;letter-spacing:1px;margin-bottom:8px;line-height:1.3;}
.future-card-body{padding:0 24px 20px;}
.future-desc{font-size:13px;color:var(--text2);line-height:1.65;margin-bottom:12px;}
.future-meta{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
.future-meta-item{font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:flex;align-items:center;gap:4px;}
.future-seats{margin-left:auto;font-family:var(--font-mono);font-size:10px;color:var(--cyan);background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.2);padding:3px 10px;border-radius:4px;}

/* SELECTION PROCESS */
.selection-steps{display:flex;flex-direction:column;gap:0;max-width:760px;margin:0 auto;position:relative;}
.selection-steps::before{content:'';position:absolute;left:28px;top:40px;bottom:40px;width:2px;background:linear-gradient(to bottom,var(--cyan),var(--purple),var(--green),transparent);z-index:0;}
.sel-step{display:flex;gap:24px;align-items:flex-start;padding:0 0 36px;position:relative;z-index:1;}
.sel-step:last-child{padding-bottom:0;}
.sel-num{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:20px;font-weight:900;flex-shrink:0;position:relative;border:2px solid;transition:all .4s;}
.sel-num.c{background:rgba(0,212,255,.1);border-color:var(--cyan);color:var(--cyan);box-shadow:0 0 20px rgba(0,212,255,.2);}
.sel-num.g{background:rgba(0,255,136,.1);border-color:var(--green);color:var(--green);box-shadow:0 0 20px rgba(0,255,136,.2);}
.sel-num.p{background:rgba(139,92,246,.1);border-color:var(--purple);color:var(--purple);box-shadow:0 0 20px rgba(139,92,246,.2);}
.sel-num.o{background:rgba(255,107,53,.1);border-color:var(--orange);color:var(--orange);box-shadow:0 0 20px rgba(255,107,53,.2);}
.sel-body{flex:1;padding-top:10px;}
.sel-label{font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;}
.sel-title{font-family:var(--font-display);font-size:16px;font-weight:700;letter-spacing:1px;margin-bottom:8px;}
.sel-desc{font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:12px;}
.sel-tags{display:flex;gap:8px;flex-wrap:wrap;}
.sel-tag{font-family:var(--font-mono);font-size:10px;padding:4px 10px;border-radius:4px;letter-spacing:1px;}
.sel-duration{font-family:var(--font-mono);font-size:10px;color:var(--text3);display:flex;align-items:center;gap:5px;margin-top:8px;}
.sel-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;transition:all .4s;}
.sel-card:hover{border-color:var(--border2);transform:translateX(4px);}

/* JOIN OVERLAY */
#join-overlay{display:none;position:fixed;inset:0;z-index:1000;background:var(--bg);overflow-y:auto;animation:jfade .4s ease;}
#join-overlay.open{display:block;}
@keyframes jfade{from{opacity:0}to{opacity:1}}
.jbg{position:fixed;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 30%,rgba(0,212,255,.06) 0%,transparent 70%);pointer-events:none;}
.jclose{position:fixed;top:24px;right:24px;width:40px;height:40px;background:var(--surface);border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;color:var(--text2);transition:all .3s;z-index:10;font-family:var(--font-mono);}
.jclose:hover{background:rgba(255,45,85,.1);border-color:var(--red);color:var(--red);}
.jcontent{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:80px 20px;position:relative;z-index:1;}
.jcard{width:100%;max-width:560px;background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:48px;animation:jslide .6s ease;position:relative;}
.jcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:20px 20px 0 0;background:linear-gradient(90deg,var(--cyan),var(--purple));}
@keyframes jslide{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.jgreet{text-align:center;margin-bottom:36px;}
.jemoji{font-size:48px;display:block;margin-bottom:14px;}
.jgreet h2{font-family:var(--font-display);font-size:26px;font-weight:900;letter-spacing:4px;color:var(--cyan);margin-bottom:8px;text-shadow:0 0 20px rgba(0,212,255,.4);}
.jgreet p{font-size:13px;color:var(--text2);line-height:1.7;}
.jform{display:flex;flex-direction:column;gap:16px;}
.fg{display:flex;flex-direction:column;gap:5px;}
.jsuccess{text-align:center;animation:jfade .5s ease;}
.jsbig{font-size:60px;margin-bottom:14px;display:block;}
.jsuccess h2{font-family:var(--font-display);font-size:32px;letter-spacing:3px;color:var(--cyan);margin-bottom:12px;text-shadow:0 0 20px rgba(0,212,255,.4);}
.jsuccess p{font-size:14px;color:var(--text2);line-height:1.8;}
.jstars{color:var(--cyan);font-size:22px;letter-spacing:4px;margin-bottom:14px;text-shadow:0 0 10px rgba(0,212,255,.5);}

/* FOOTER */
footer{background:var(--bg2);border-top:1px solid var(--border);padding:80px 5% 40px;}
.ft{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;margin-bottom:60px;}
.flogo-wrap{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
.flogo-mark{width:40px;height:40px;border:1.5px solid var(--cyan);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--cyan);font-size:20px;box-shadow:0 0 15px rgba(0,212,255,.15);}
.flogo-text{font-family:var(--font-display);font-size:14px;font-weight:700;letter-spacing:3px;color:var(--text);line-height:1;}
.fbrand p{font-size:13px;color:var(--text2);line-height:1.8;max-width:280px;margin-bottom:24px;}
.fsocial{display:flex;gap:10px;}
.soc{width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:var(--surface);border:1px solid var(--border);font-size:14px;text-decoration:none;color:var(--text2);transition:all .3s;}
.soc:hover{border-color:var(--cyan);color:var(--cyan);transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,212,255,.2);}
.fcol h4{font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--cyan);margin-bottom:20px;}
.fcol a{display:block;font-size:11px;color:var(--text3);text-decoration:none;margin-bottom:10px;transition:color .3s;font-family:var(--font-mono);letter-spacing:1px;cursor:pointer;}
.fcol a:hover{color:var(--cyan);}
.fb2{padding-top:32px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;font-family:var(--font-mono);font-size:11px;color:var(--text3);flex-wrap:wrap;gap:12px;letter-spacing:2px;}
.fb2 span{color:var(--cyan);}

.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
.reveal.visible{opacity:1;transform:translateY(0);}

@media(max-width:900px){
  .nav-links,.nav-cta{display:none;}
  .hamburger{display:flex;}
  .hero-stats{display:none;}
  .ft{grid-template-columns:1fr 1fr;}
  .tl-item{grid-template-columns:1fr 40px 1fr;}
  .ifr,.fr{grid-template-columns:1fr;}
  .chatbot-window{width:calc(100vw - 40px);right:20px;}
}
@media(max-width:600px){
  section{padding:70px 5%;}
  .ft{grid-template-columns:1fr;}
  .tl-line{left:20px;}
  .tl-item{grid-template-columns:40px 1fr;}
  .tl-item .tl-empty{display:none;}
  .tl-dot{grid-column:1 !important;grid-row:1;}
  .tl-content{grid-column:2 !important;}
  .leader-card{min-width:100%;}
  .quiz-opts{grid-template-columns:1fr;}
  .future-events-grid{grid-template-columns:1fr;}
}
`;

/* ─── HOOKS ──────────────────────────────────────────────────── */
function useCounter(target, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / 2200, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(update);
      else setVal(target);
    };
    requestAnimationFrame(update);
  }, [started, target]);
  return val;
}

function Counter({ target, started }) {
  const val = useCounter(target, started);
  return <>{val}{target >= 100 ? "+" : ""}</>;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 80); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useParticles() {
  useEffect(() => {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.4 + 0.1
    }));
    const isDark = () => document.documentElement.getAttribute("data-theme") !== "light";
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isDark() ? "0,212,255" : "0,100,180";
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color},${0.06 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
}

/* ─── CHATBOT COMPONENT ──────────────────────────────────────── */
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "bot", text: "Hey! I'm TRS-BOT 🤖 Ask me about teams, events, how to join, the selection process, or anything about The Robotic Society!" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const msgsRef = useRef(null);

  const suggestions = ["How do I join?", "Tell me about teams", "Selection process", "Upcoming events", "Who is the President?"];

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = useCallback((text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setMsgs(prev => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, { role: "bot", text: getChatResponse(msg) }]);
    }, 900 + Math.random() * 600);
  }, [input]);

  const handleOpen = () => { setOpen(true); setUnread(0); };

  return (
    <>
      {/* FAB */}
      <button className="chatbot-fab" onClick={() => open ? setOpen(false) : handleOpen()} title="Chat with TRS-BOT">
        {open ? "✕" : "🤖"}
        {!open && unread > 0 && <span className="chatbot-badge">{unread}</span>}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <div className="chatbot-name">TRS-BOT</div>
                <div className="chatbot-status">Online — Always Ready</div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-msgs" ref={msgsRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            {typing && <div className="chat-msg bot typing">// TRS-BOT IS THINKING...</div>}
          </div>

          <div className="chatbot-suggestions">
            {suggestions.map(s => (
              <button key={s} className="chat-suggest" onClick={() => send(s)}>{s}</button>
            ))}
          </div>

          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              type="text"
              placeholder="ASK ANYTHING..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
            />
            <button className="chatbot-send" onClick={() => send()}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── FUTURE EVENTS COMPONENT ────────────────────────────────── */
function FutureEvents() {
  const [filter, setFilter] = useState("all");
  const types = ["all", "competition", "workshop", "summit", "hackathon"];
  const filtered = filter === "all" ? FUTURE_EVENTS : FUTURE_EVENTS.filter(e => e.type === filter);

  const statusClass = { "Registrations Open": "open", "Applications Open": "open", "Early Bird": "early", "Coming Soon": "soon", "Save the Date": "save" };
  const tagStyle = { competition: "tc", workshop: "tw", summit: "tm2", hackathon: "tp2" };

  return (
    <section id="future-events" style={{ position: "relative", zIndex: 1, background: "var(--bg2)" }}>
      <div className="stag">upcoming missions</div>
      <h2 className="stitle">FUTURE <span className="t-cyan">EVENTS</span></h2>
      <p className="sdesc">"The best events are the ones you helped build." Here's what's coming up — register early, get the best seats, and come ready to compete.</p>

      <div className="ef" style={{ marginBottom: "32px" }}>
        {types.map(t => (
          <button key={t} className={`fb${filter === t ? " active" : ""}`} onClick={() => setFilter(t)}>
            {t === "all" ? "All Events" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="future-events-grid">
        {filtered.map((ev, i) => (
          <div key={i} className="future-card reveal">
            <div className="future-card-top">
              <div className="future-date-box">
                <div className="future-date-month">{ev.month}</div>
                <div className="future-date-num">{ev.date}</div>
                <div className="future-date-year">{ev.year}</div>
              </div>
              <div className="future-card-info">
                <div className={`future-status ${statusClass[ev.status] || "soon"}`}>⬤ {ev.status}</div>
                <div className="future-title">{ev.title}</div>
                <span className={`etag ${tagStyle[ev.type] || "tw"}`}>{ev.tag}</span>
              </div>
            </div>
            <div className="future-card-body">
              <div className="future-desc">{ev.desc}</div>
              <div className="future-meta">
                <span className="future-meta-item">📍 {ev.venue}</span>
                <span className="future-seats">👥 {ev.seats} seats</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── SELECTION PROCESS COMPONENT ───────────────────────────── */
const SEL_STEPS = [
  {
    n: "01", color: "c", label: "Step 1", title: "Application Form", icon: "📝",
    desc: "Fill out the TRS membership form online. Tell us your name, college, preferred team, domain, and experience level. Takes less than 3 minutes. No GPA requirements — we care about your drive.",
    tags: [{ t: "Online Form", bg: "rgba(0,212,255,.1)", c: "var(--cyan)" }, { t: "3 mins", bg: "rgba(0,212,255,.08)", c: "var(--cyan)" }],
    duration: "Response within 48 hrs"
  },
  {
    n: "02", color: "g", label: "Step 2", title: "Portfolio / Skill Check", icon: "🔍",
    desc: "Our team reviews your application and any portfolio links or projects you've shared. For technical domains, a short take-home task may be given. For non-technical teams (Design, Media, etc.), we review your past work.",
    tags: [{ t: "Portfolio Review", bg: "rgba(0,255,136,.1)", c: "var(--green)" }, { t: "Optional Task", bg: "rgba(0,255,136,.08)", c: "var(--green)" }],
    duration: "Review takes 24–48 hrs"
  },
  {
    n: "03", color: "p", label: "Step 3", title: "Team Lead Interview", icon: "🎙️",
    desc: "Shortlisted candidates meet their respective team leads for a 15-minute conversation. Not a quiz — just a chat. We want to understand your goals, what you'd bring to TRS, and what you'd like to learn.",
    tags: [{ t: "15 min Chat", bg: "rgba(139,92,246,.1)", c: "var(--purple)" }, { t: "Virtual or In-Person", bg: "rgba(139,92,246,.08)", c: "var(--purple)" }],
    duration: "Scheduled within 3 days"
  },
  {
    n: "04", color: "o", label: "Step 4", title: "Welcome to TRS 🎉", icon: "🚀",
    desc: "Selected members receive an official onboarding email with their team assignment, domain, first meeting details, and access to TRS resources, tools, and project repositories. Your journey starts here.",
    tags: [{ t: "Onboarding Email", bg: "rgba(255,107,53,.1)", c: "var(--orange)" }, { t: "Immediate Access", bg: "rgba(255,107,53,.08)", c: "var(--orange)" }],
    duration: "Within 24 hrs of acceptance"
  }
];

function SelectionProcess() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="selection" style={{ position: "relative", zIndex: 1 }}>
      <div className="stag">how to get in</div>
      <h2 className="stitle">SELECTION<br/><span className="t-cyan">PROCESS</span></h2>
      <p className="sdesc">"We don't look for perfect resumes. We look for genuine curiosity and the will to build." Here's exactly how to become a TRS member.</p>

      <div className="selection-steps">
        {SEL_STEPS.map((step, i) => (
          <div key={i} className="sel-step" onClick={() => setActiveStep(activeStep === i ? null : i)} style={{ cursor: "pointer" }}>
            <div className={`sel-num ${step.color}`}>{step.icon}</div>
            <div className="sel-card" style={{ flex: 1, borderColor: activeStep === i ? "var(--border2)" : "var(--border)" }}>
              <div className="sel-label">// {step.label}</div>
              <div className="sel-title">{step.n}. {step.title}</div>
              <div className="sel-desc">{step.desc}</div>
              <div className="sel-tags">
                {step.tags.map((tag, j) => (
                  <span key={j} className="sel-tag" style={{ background: tag.bg, color: tag.c, border: `1px solid ${tag.c}33` }}>{tag.t}</span>
                ))}
              </div>
              <div className="sel-duration">⏱ {step.duration}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div style={{ maxWidth: "760px", margin: "48px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px" }}>
        {[
          { icon: "💡", tip: "Pro Tip", text: "Apply early — each team has a limited intake per semester." },
          { icon: "🤝", tip: "Be Yourself", text: "We value authentic enthusiasm over polished applications." },
          { icon: "🔁", tip: "Reapply", text: "Not selected? Ask for feedback and reapply next cycle." }
        ].map((t, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }} className="reveal">
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{t.icon}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "6px" }}>{t.tip}</div>
            <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: "1.6" }}>{t.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── QUIZ COMPONENT ─────────────────────────────────────────── */
function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === QUIZ_QUESTIONS[current].ans) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 < QUIZ_QUESTIONS.length) { setCurrent(c => c + 1); setSelected(null); }
      else setDone(true);
    }, 900);
  };
  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setDone(false); };

  return (
    <section id="quiz" style={{ background: "var(--bg2)", position: "relative", zIndex: 1 }}>
      <div className="stag">test your knowledge</div>
      <h2 className="stitle">TRS TRIVIA<br/><span className="t-cyan">CHALLENGE</span></h2>
      <p className="sdesc">"How well do you know The Robotic Society?" Answer these 5 questions to find out.</p>
      <div className="quiz-card reveal">
        {!done ? (
          <>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text3)", letterSpacing: "3px", marginBottom: "12px" }}>QUESTION {current + 1} / {QUIZ_QUESTIONS.length}</div>
            <div className="pulse-bar"/>
            <div className="quiz-q">{QUIZ_QUESTIONS[current].q}</div>
            <div className="quiz-opts">
              {QUIZ_QUESTIONS[current].opts.map((opt, i) => (
                <button key={i} className={`quiz-opt${selected !== null ? i === QUIZ_QUESTIONS[current].ans ? " correct" : i === selected ? " wrong" : "" : ""}`} onClick={() => choose(i)}>{opt}</button>
              ))}
            </div>
          </>
        ) : (
          <div className="quiz-result">
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤖</div>
            <div className="quiz-score">{score} / {QUIZ_QUESTIONS.length}</div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text2)", marginTop: "12px", marginBottom: "24px" }}>
              {score === QUIZ_QUESTIONS.length ? "PERFECT SCORE — YOU'RE BORN FOR TRS!" : score >= 3 ? "IMPRESSIVE — YOU KNOW YOUR TRS LORE." : "KEEP EXPLORING THE CLUB!"}
            </p>
            <button className="btn-primary" onClick={restart}>↩ RETRY QUIZ</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── NEWSLETTER ─────────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="newsletter" style={{ position: "relative", zIndex: 1 }}>
      <div className="stag" style={{ justifyContent: "center" }}>stay connected</div>
      <h2 className="stitle" style={{ textAlign: "center" }}>NEVER MISS<br/><span className="t-cyan">AN UPDATE</span></h2>
      <p className="sdesc" style={{ margin: "0 auto 40px", textAlign: "center" }}>Get the latest from TRS — events, achievements, and open project calls — delivered to your inbox weekly.</p>
      <div className="newsletter-wrap reveal">
        {!sent ? (
          <>
            <div className="nl-title">📡 TRS DISPATCH</div>
            <div className="nl-sub">Weekly updates on events, projects, and how to get involved.</div>
            <div className="nl-form">
              <input className="nl-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
              <button className="nl-btn" onClick={() => { if (email.includes("@")) setSent(true); }}>Subscribe →</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", color: "var(--green)", letterSpacing: "3px", marginBottom: "8px" }}>SUBSCRIBED!</div>
            <div style={{ fontSize: "13px", color: "var(--text2)" }}>You're on the list. Watch your inbox for TRS dispatches.</div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── JOIN OVERLAY ───────────────────────────────────────────── */
function JoinOverlay({ open, onClose }) {
  const [formData, setFormData] = useState({ name: "", college: "", team: "", domain: "", exp: "", why: "" });
  const [submitted, setSubmitted] = useState(false);
  const domains = DOMAIN_MAP[formData.team] || [];
  const set = (k, v) => setFormData(p => ({ ...p, [k]: v, ...(k === "team" ? { domain: "" } : {}) }));
  const submit = () => {
    if (!formData.name || !formData.college || !formData.team || !formData.domain || !formData.exp) { alert("Please fill all required fields!"); return; }
    setSubmitted(true);
  };
  const close = () => { onClose(); setSubmitted(false); setFormData({ name: "", college: "", team: "", domain: "", exp: "", why: "" }); };
  if (!open) return null;

  return (
    <div id="join-overlay" className="open">
      <div className="jbg" onClick={close}/>
      <div className="jclose" onClick={close}>✕</div>
      <div className="jcontent">
        <div className="jcard">
          {!submitted ? (
            <>
              <div className="jgreet">
                <span className="jemoji">🤖</span>
                <h2>ACCESSING SYSTEM</h2>
                <p>Welcome to The Robotic Society. You're about to join something extraordinary. Tell us about yourself and we'll find you the perfect team.</p>
              </div>
              <div className="jform">
                <div className="fg"><label className="fl">Full Name</label><input className="fi" type="text" placeholder="e.g. Priya Sharma" value={formData.name} onChange={e => set("name", e.target.value)}/></div>
                <div className="fg"><label className="fl">College / University</label><input className="fi" type="text" placeholder="e.g. Anna University" value={formData.college} onChange={e => set("college", e.target.value)}/></div>
                <div className="fr">
                  <div className="fg">
                    <label className="fl">Team</label>
                    <select className="fi" value={formData.team} onChange={e => set("team", e.target.value)}>
                      <option value="">Select Team</option>
                      {Object.keys(DOMAIN_MAP).map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="fg">
                    <label className="fl">Domain</label>
                    <select className="fi" value={formData.domain} onChange={e => set("domain", e.target.value)}>
                      <option value="">Select Domain</option>
                      {domains.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="fg">
                  <label className="fl">Experience Level</label>
                  <select className="fi" value={formData.exp} onChange={e => set("exp", e.target.value)}>
                    <option value="">Select Level</option>
                    <option>Complete Beginner 🌱</option>
                    <option>Some Basics 📚</option>
                    <option>Intermediate 💪</option>
                    <option>Advanced / Expert 🔥</option>
                  </select>
                </div>
                <div className="fg"><label className="fl">Why TRS? (optional)</label><input className="fi" type="text" placeholder="What excites you about joining?" value={formData.why} onChange={e => set("why", e.target.value)}/></div>
                <button className="fsub" onClick={submit}>⚡ INITIALIZE MEMBERSHIP</button>
              </div>
            </>
          ) : (
            <div className="jsuccess">
              <span className="jsbig">🤖</span>
              <div className="jstars">◆ ◆ ◆ ◆ ◆</div>
              <h2>SYSTEM ACCESS GRANTED</h2>
              <p>{formData.name}, welcome to The Robotic Society — {formData.team} team, {formData.domain} domain. We'll reach out within 24 hours. Get ready to build! 🤖</p>
              <button className="btn-secondary" style={{ marginTop: "20px" }} onClick={close}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav({ theme, toggleTheme, openJoin, mobileOpen, toggleMobile }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); if (mobileOpen) toggleMobile(); };

  const navSections = ["about","leadership","teams","timeline","events","members","achievements","selection","ideas"];

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <a className="nav-logo" onClick={() => scrollTo("hero")}>
          <div className="logo-mark">⬡</div>
          <div><div className="logo-text">THE ROBOTIC<br/>SOCIETY</div><span className="logo-sub">// engineering tomorrow</span></div>
        </a>
        <ul className="nav-links">
          {navSections.map(s => (
            <li key={s}><a onClick={() => scrollTo(s)}>{s === "selection" ? "Join Process" : s.charAt(0).toUpperCase() + s.slice(1)}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme"/>
          <button className="nav-cta" onClick={openJoin}>Join TRS</button>
          <button className="hamburger" onClick={toggleMobile}><span/><span/><span/></button>
        </div>
      </nav>
      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        {navSections.map(s => (
          <a key={s} onClick={() => scrollTo(s)}>{s === "selection" ? "Join Process" : s.charAt(0).toUpperCase() + s.slice(1)}</a>
        ))}
      </div>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero({ openJoin }) {
  return (
    <section id="hero" style={{ position: "relative", zIndex: 1 }}>
      <canvas id="particle-canvas" style={{ position: "absolute", inset: 0, zIndex: 0 }}/>
      <div className="circuit-bg"/>
      <div className="hero-orb orb-1"/><div className="hero-orb orb-2"/><div className="hero-orb orb-3"/>
      <div className="robot-silhouette">
        <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="90" y="30" width="120" height="90" rx="12"/>
          <rect x="108" y="48" width="28" height="20" rx="4"/><rect x="164" y="48" width="28" height="20" rx="4"/>
          <line x1="120" y1="94" x2="180" y2="94"/>
          <circle cx="94" cy="74" r="8"/><circle cx="206" cy="74" r="8"/>
          <line x1="150" y1="30" x2="150" y2="10"/><circle cx="150" cy="8" r="5" fill="#00D4FF"/>
          <rect x="132" y="120" width="36" height="20" rx="4"/>
          <rect x="60" y="140" width="180" height="140" rx="14"/>
          <rect x="80" y="158" width="60" height="44" rx="8"/><rect x="162" y="158" width="60" height="44" rx="8"/>
          <circle cx="102" cy="244" r="14"/><circle cx="198" cy="244" r="14"/>
          <rect x="20" y="148" width="40" height="90" rx="10"/><rect x="14" y="238" width="52" height="36" rx="8"/>
          <rect x="240" y="148" width="40" height="90" rx="10"/><rect x="234" y="238" width="52" height="36" rx="8"/>
          <rect x="76" y="280" width="50" height="100" rx="10"/><rect x="70" y="374" width="62" height="32" rx="8"/>
          <rect x="174" y="280" width="50" height="100" rx="10"/><rect x="168" y="374" width="62" height="32" rx="8"/>
          <line x1="86" y1="220" x2="150" y2="220" opacity="0.4"/><line x1="150" y1="220" x2="214" y2="220" opacity="0.4"/>
          <line x1="150" y1="204" x2="150" y2="220" opacity="0.4"/>
        </svg>
      </div>
      <div className="hero-content">
        <div className="hero-badge"><div className="badge-dot"/>Est. 2022 · Student Innovation Club</div>
        <div className="hero-eyebrow">// initializing_society.exe</div>
        <h1 className="hero-title">THE<br/><span className="t-cyan">ROBOTIC</span><br/><span className="t-outline">SOCIETY</span></h1>
        <p className="hero-sub">Where circuits meet creativity. We build robots, train AI models, secure systems, and engineer the future — one semester at a time.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={openJoin}>Initialize Membership →</button>
          <button className="btn-secondary" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>Explore Club</button>
        </div>
      </div>
      <div className="hero-stats">
        {[{ t: 150, l: "Members" }, { t: 42, l: "Projects" }, { t: 22, l: "Awards" }, { t: 7, l: "Teams" }].map(s => (
          <div className="hstat" key={s.l}>
            <div className="hstat-num"><Counter target={s.t} started={true}/></div>
            <div className="hstat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── TEAM CARD ──────────────────────────────────────────────── */
function TeamCard({ team }) {
  const iconMap = { cyan: "ti-cyan", purple: "ti-purple", green: "ti-green", orange: "ti-orange", blue: "ti-blue", red: "ti-red", green2: "ti-green" };
  return (
    <div className={`team-card ${team.id} reveal`}>
      <div className={`team-icon-wrap ${iconMap[team.color]}`}>{team.icon}</div>
      <div className="tn">{team.name}</div>
      <div className="team-lead-info">Team Lead<div className="team-lead-name">{team.lead}</div></div>
      <div className="td">{team.desc}</div>
      <div className="tdoms">{team.domains.map(d => <span key={d.label} className={`dbadge ${d.cls}`}>{d.label}</span>)}</div>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="team-li">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        {team.li} on LinkedIn
      </a>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [joinOpen, setJoinOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventFilter, setEventFilter] = useState("all");
  const [achStarted, setAchStarted] = useState(false);
  const [ideaForm, setIdeaForm] = useState({ name: "", dept: "", title: "", team: "", desc: "" });
  const [ideaSent, setIdeaSent] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

  useReveal();
  useParticles();

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAchStarted(true); }, { threshold: 0.2 });
    const el = document.getElementById("achievements");
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [loaded]);

  const submitIdea = () => { if (!ideaForm.name || !ideaForm.title) return; setIdeaSent(true); };

  const filteredMembers = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.team.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const loaderStyle = loaded ? { opacity: 0, pointerEvents: "none" } : {};

  return (
    <>
      <style>{CSS}</style>

      {/* LOADER */}
      <div id="loader" style={loaderStyle}>
        <div className="loader-hex">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#00D4FF" strokeWidth="2"/>
            <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.4"/>
            <circle cx="50" cy="50" r="5" fill="#00D4FF">
              <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.5s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <div className="loader-logo-text">TRS</div>
        <div className="loader-bar"><div className="loader-fill"/></div>
        <div className="loader-text">// BOOTING ROBOTIC SOCIETY OS...</div>
      </div>
      {!loaded && (
        <div id="loader" style={loaderStyle}>
          {setTimeout(() => setLoaded(true), 3000) && null}
        </div>
      )}
      {!loaded && <div style={{ display: "none" }}>{setTimeout(() => setLoaded(true), 3000)}</div>}

      {/* CHATBOT */}
      <Chatbot/>

      {/* NAV */}
      <Nav theme={theme} toggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")} openJoin={() => setJoinOpen(true)} mobileOpen={mobileOpen} toggleMobile={() => setMobileOpen(o => !o)}/>

      {/* HERO */}
      <Hero openJoin={() => setJoinOpen(true)}/>

      {/* MARQUEE */}
      <div className="identity-strip" style={{ position: "relative", zIndex: 1 }}>
        <div className="strip-track">
          {["Build Robots","Train AI Models","Secure Systems","Engineer Tomorrow","Ship Real Projects","Win Competitions","Create Impact","Web Dev · AI/ML · CyberSec","Design · Media · Marketing","Logistics · Management",
            "Build Robots","Train AI Models","Secure Systems","Engineer Tomorrow","Ship Real Projects","Win Competitions","Create Impact","Web Dev · AI/ML · CyberSec","Design · Media · Marketing","Logistics · Management"
          ].map((t, i) => (
            <div className="strip-item" key={i}><div className={`sdot${i % 3 === 1 ? " g" : i % 3 === 2 ? " p" : ""}`}/>{t}</div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ position: "relative", zIndex: 1 }}>
        <div className="stag">who we are</div>
        <h2 className="stitle">MISSION,<br/><span className="t-cyan">VIBE &amp; VALUES</span></h2>
        <p className="sdesc">"We don't wait for the future — we engineer it." TRS is where hardware meets software, and ambition meets action.</p>
        <div className="about-grid">
          {[
            { i: "🤖", t: "Our Mission", d: "To cultivate a generation of engineers, designers, and innovators who build intelligent machines and software systems that solve real problems for real people." },
            { i: "⚡", t: "Our Vibe", d: "Late nights, live demos, and legendary teamwork. We move at the speed of a startup — powered by curiosity, coffee, and an obsession with building things that work." },
            { i: "🎯", t: "Our Values", d: "Hardware first. Code second. Community always. We believe the best engineers are the ones who can collaborate, communicate, and ship — not just compile." },
            { i: "🌐", t: "Our Reach", d: "From campus labs to national stages — TRS members compete at the highest levels of robotics, AI, and cybersecurity. We represent our college and win." }
          ].map(c => (
            <div className="about-card reveal" key={c.t}>
              <div className="ci">{c.i}</div><div className="ct">{c.t}</div><div className="cd">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE TICKER */}
      <div style={{ padding: "0 5%", position: "relative", zIndex: 1, background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="live-ticker" style={{ padding: "12px 0" }}>
          <span className="ticker-label">📡 LIVE</span>
          <div className="ticker-content">
            🏆 TRS Hackathon 3.0 registrations now open &nbsp;·&nbsp; 🤖 Autonomous Rover Phase 2 — 78% complete &nbsp;·&nbsp; 🧠 ML Bootcamp seats filling fast &nbsp;·&nbsp; 🔐 CyberBlitz 2025 qualification round this April &nbsp;·&nbsp; 📸 Demo Day this Friday 5 PM Lab 201 &nbsp;·&nbsp; 💡 New project pitches accepted until March 30
          </div>
        </div>
      </div>

      {/* LEADERSHIP */}
      <section id="leadership" style={{ position: "relative", zIndex: 1 }}>
        <div className="stag">command unit</div>
        <h2 className="stitle">CLUB<br/><span className="t-cyan">LEADERSHIP</span></h2>
        <p className="sdesc">"Great clubs don't run themselves — they're led by people who care deeply and act decisively."</p>
        <div className="leadership-wrap">
          <div className="leader-card pres reveal">
            <div className="leader-avatar la-cyan">AS</div>
            <div className="leader-name">Alvinsudhan</div>
            <div className="leader-title">Club President</div>
            <div className="leader-bio">"Our robots don't just function — they inspire." 4th year ECE student, robotics researcher, and the architect behind TRS's national-level expansion. Built the club's first autonomous bot that won Robocon 2024.</div>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="leader-li">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn Profile
            </a>
          </div>
          <div className="leader-card vp reveal">
            <div className="leader-avatar la-purple">SM</div>
            <div className="leader-name">Shriya Menon</div>
            <div className="leader-title">Vice President</div>
            <div className="leader-bio">"The best systems are built by the best teams." 3rd year CSE student, AI/ML researcher, and the person who turned TRS's technical team into a competition powerhouse. SIH 2024 finalist.</div>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="leader-li">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section id="teams" style={{ position: "relative", zIndex: 1, background: "var(--bg2)" }}>
        <div className="stag">divisions</div>
        <h2 className="stitle">SEVEN TEAMS.<br/><span className="t-cyan">ONE VISION.</span></h2>
        <p className="sdesc">"Specialization is the engine of excellence." TRS is organized into 7 elite teams, each with their own domain expertise, culture, and track record of wins.</p>
        <div className="teams-grid">{TEAMS.map(t => <TeamCard key={t.id} team={t}/>)}</div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" style={{ position: "relative", zIndex: 1 }}>
        <div className="stag">mission log</div>
        <h2 className="stitle">THE TRS<br/><span className="t-cyan">STORY</span></h2>
        <p className="sdesc">"Every great machine starts as an idea on a napkin. Ours started in a robotics lab with five students and a broken servo motor."</p>
        <div style={{ position: "relative" }}>
          <div className="tl-line"/>
          <div className="tl-grid">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`tl-item ${item.side} reveal`}>
                {item.side === "left" ? (
                  <><div className="tl-content"><div className="tl-yr" style={item.dot === "green" ? { color: "var(--green)" } : {}}>{item.year}</div><div className="tl-tt">{item.title}</div><div className="tl-dd">{item.desc}</div></div><div className={`tl-dot${item.dot === "purple" ? " p" : item.dot === "green" ? " g" : ""}`}/><div/></>
                ) : (
                  <><div/><div className={`tl-dot${item.dot === "purple" ? " p" : item.dot === "green" ? " g" : ""}`}/><div className="tl-content"><div className="tl-yr">{item.year}</div><div className="tl-tt">{item.title}</div><div className="tl-dd">{item.desc}</div></div></>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST EVENTS */}
      <section id="events" style={{ position: "relative", zIndex: 1, background: "var(--bg2)" }}>
        <div className="stag">mission archive</div>
        <h2 className="stitle">PAST EVENTS &amp;<br/><span className="t-cyan">PROJECTS</span></h2>
        <p className="sdesc">"The best learning happens when you're too excited to stop." Our track record of workshops, competitions, and live projects.</p>
        <div className="ef">
          {["all", "workshop", "competition", "project", "meeting"].map(f => (
            <button key={f} className={`fb${eventFilter === f ? " active" : ""}`} onClick={() => setEventFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
        <div className="events-grid">
          {EVENTS.filter(e => eventFilter === "all" || e.type === eventFilter).map((e, i) => (
            <div key={i} className="event-card reveal">
              <div className="eimg" style={{ background: `linear-gradient(${e.gradient})` }}>{e.icon}</div>
              <div className="ebody">
                <span className={`etag ${e.type === "workshop" ? "tw" : e.type === "competition" ? "tc" : e.type === "project" ? "tp2" : "tm2"}`}>{e.tag}</span>
                <div className="etitle">{e.title}</div>
                <div className="emeta">{e.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FUTURE EVENTS */}
      <FutureEvents/>

      {/* MEMBERS */}
      <section id="members" style={{ position: "relative", zIndex: 1 }}>
        <div className="stag">the people</div>
        <h2 className="stitle">TEAM<br/><span className="t-cyan">SPOTLIGHT</span></h2>
        <p className="sdesc">"Robots don't build themselves. People do." Hover the cards to meet the humans behind The Robotic Society.</p>
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" type="text" placeholder="SEARCH MEMBERS, ROLES, SKILLS..." value={memberSearch} onChange={e => setMemberSearch(e.target.value)}/>
        </div>
        <div className="members-grid">
          {filteredMembers.map((m, i) => {
            const avMap = { green: "avg", purple: "avp", orange: "ava", blue: "avb", cyan: "avg", red: "avg" };
            const skBg = { green: "rgba(0,212,255,.1)", purple: "rgba(139,92,246,.1)", orange: "rgba(255,107,53,.1)", blue: "rgba(56,189,248,.1)", cyan: "rgba(0,212,255,.1)", red: "rgba(255,45,85,.1)" };
            const skCol = { green: "var(--cyan)", purple: "var(--purple)", orange: "var(--orange)", blue: "#38BDF8", cyan: "var(--cyan)", red: "var(--red)" };
            return (
              <div className="mc reveal" key={i}>
                <div className="mi">
                  <div className="mf">
                    <div className={`mav ${avMap[m.color]}`}>{m.initials}</div>
                    <div className="mn">{m.name}</div>
                    <div className="mr">{m.role}</div>
                    <div className="mt">{m.team}</div>
                  </div>
                  <div className="mb">
                    <div className="mbn">{m.name}</div>
                    <div className="mbb">{m.quote} {m.bio}</div>
                    <div className="mskills">{m.skills.map(s => <span key={s} className="sk" style={{ background: skBg[m.color], color: skCol[m.color] }}>{s}</span>)}</div>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="mli">🔗 LinkedIn</a>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredMembers.length === 0 && <div style={{ color: "var(--text3)", fontFamily: "var(--font-mono)", fontSize: "12px", gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>// NO MEMBERS FOUND MATCHING QUERY</div>}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ position: "relative", zIndex: 1, background: "var(--bg2)" }}>
        <div className="stag">scoreboard</div>
        <h2 className="stitle">ACHIEVEMENT<br/><span className="t-cyan">WALL</span></h2>
        <p className="sdesc">"We don't just compete — we come to win." Every number here is earned through late nights, broken code, and a refusal to accept second place.</p>
        <div className="ach-grid">
          {ACHIEVEMENTS.map(a => (
            <div className="ach-card reveal" key={a.label}>
              <div className="ai">{a.icon}</div>
              <div className="an"><Counter target={a.value} started={achStarted}/></div>
              <div className="al">{a.label}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: "500px", margin: "0 auto" }} className="reveal">
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px", borderLeft: "3px solid var(--cyan)" }}>
            <p style={{ fontStyle: "italic", color: "var(--text2)", fontSize: "14px", lineHeight: "1.8", marginBottom: "10px" }}>"When TRS walked onto the national robotics stage for the first time, nobody expected us to win. We didn't just win — we lapped the field."</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)", letterSpacing: "2px" }}>— ARAVINDHRAJ S, TECHNICAL LEAD</span>
          </div>
        </div>
      </section>

      {/* SELECTION PROCESS */}
      <SelectionProcess/>

      {/* QUIZ */}
      <QuizSection/>

      {/* IDEAS */}
      <section id="ideas" style={{ position: "relative", zIndex: 1, background: "var(--bg)" }}>
        <div className="stag" style={{ justifyContent: "center" }}>upload your idea</div>
        <h2 className="stitle" style={{ textAlign: "center" }}>GOT AN IDEA?<br/><span className="t-cyan">WE WANT IT.</span></h2>
        <p className="sdesc" style={{ margin: "0 auto 48px", textAlign: "center" }}>"The idea you're afraid to share is probably the one most worth building."</p>
        <div className="idea-wrap reveal">
          {!ideaSent ? (
            <div className="ifrm">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "3px", color: "var(--cyan)", marginBottom: "6px" }}>SUBMIT YOUR IDEA</h3>
              <p style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "20px" }}>Every TRS project started as an idea someone was afraid to say out loud. We review every single submission.</p>
              <div className="ifr">
                <div><label className="fl">Your Name</label><input className="fi" type="text" placeholder="e.g. Priya Sharma" value={ideaForm.name} onChange={e => setIdeaForm(p => ({ ...p, name: e.target.value }))}/></div>
                <div><label className="fl">Department</label><input className="fi" type="text" placeholder="e.g. ECE, CSE..." value={ideaForm.dept} onChange={e => setIdeaForm(p => ({ ...p, dept: e.target.value }))}/></div>
              </div>
              <div><label className="fl">Idea Title</label><input className="fi" type="text" placeholder="Give it a catchy name" value={ideaForm.title} onChange={e => setIdeaForm(p => ({ ...p, title: e.target.value }))}/></div>
              <div>
                <label className="fl">Relevant Team</label>
                <select className="fi" value={ideaForm.team} onChange={e => setIdeaForm(p => ({ ...p, team: e.target.value }))}>
                  <option value="">Select Team</option>
                  {["Technical — Web Development","Technical — AI / ML","Technical — Cybersecurity","Design","Media & Communications","Marketing","Photography","Cross-Team / All"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div><label className="fl">Describe Your Idea</label><textarea className="fi" rows="4" placeholder="What problem does it solve? How might it work? Who does it help?" value={ideaForm.desc} onChange={e => setIdeaForm(p => ({ ...p, desc: e.target.value }))}/></div>
              <button className="isub" onClick={submitIdea}>⚡ TRANSMIT IDEA</button>
            </div>
          ) : (
            <div className="isuccess">
              <span className="big">🤖</span>
              <p>IDEA RECEIVED</p>
              <span>Our team reviews every submission. We'll get back to you within 48 hours. Keep building.</span>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterSection/>

      {/* CTA */}
      <section id="cta" style={{ position: "relative", zIndex: 1, background: "var(--bg2)", textAlign: "center" }}>
        <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,.08) 0%,transparent 70%)", left: "50%", top: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}/>
        <div className="stag" style={{ justifyContent: "center" }}>ready to build?</div>
        <p style={{ fontStyle: "italic", color: "var(--text2)", fontSize: "17px", marginBottom: "16px" }}>"You don't find your tribe. You build it."</p>
        <h2 className="stitle">JOIN<br/><span className="t-cyan">THE ROBOTIC SOCIETY</span></h2>
        <p style={{ color: "var(--text2)", marginBottom: "48px", fontSize: "15px" }}>150+ builders. 7 teams. Infinite possibilities. Your seat is waiting.</p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => setJoinOpen(true)}>Initialize Membership →</button>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><button className="btn-secondary">💬 WhatsApp Community</button></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1 }}>
        <div className="ft">
          <div className="fbrand">
            <div className="flogo-wrap">
              <div className="flogo-mark">⬡</div>
              <div><div className="flogo-text">THE ROBOTIC<br/>SOCIETY</div></div>
            </div>
            <p>A student innovation club at the frontier of robotics, AI, and engineering. 7 teams. One mission. Zero excuses.</p>
            <div className="fsocial">
              {[
                { title: "LinkedIn", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { title: "Instagram", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
                { title: "WhatsApp", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> }
              ].map(s => <a key={s.title} className="soc" href="#" title={s.title}>{s.svg}</a>)}
            </div>
          </div>
          {[
            { h: "Navigate", links: ["About Us","Leadership","Our Journey","Events","Team","Selection Process"] },
            { h: "Teams", links: ["Technical","Design","Management","Logistics","Media","Marketing","Photography"] },
            { h: "Domains", links: ["Web Development","AI / ML","Cybersecurity","UI/UX Design","Submit Idea","Apply Now"] }
          ].map(col => (
            <div className="fcol" key={col.h}>
              <h4>{col.h}</h4>
              {col.links.map(l => <a key={l}>{l}</a>)}
            </div>
          ))}
        </div>
        <div className="fb2">
          <div>© 2025 <span>The Robotic Society</span> · Built with React.js by members, for the future</div>
          <div>// SYSTEM VERSION 5.0 · REACT EDITION · ALL RIGHTS RESERVED</div>
        </div>
      </footer>

      {/* JOIN OVERLAY */}
      <JoinOverlay open={joinOpen} onClose={() => setJoinOpen(false)}/>
    </>
  );
}
