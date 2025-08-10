import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
// Import your local images
import heroImage from './assets/images/hero-image.png';
import {
  Aperture,
  AudioLines,
  BadgeCheck,
  Camera,
  ChevronRight,
  MapPin,
  MonitorCog,
  PanelTop,
  Settings,
  Video,
  Workflow,
  Mail,
  Linkedin,
  Building2,
  CalendarClock,
  BookOpen,
  Cpu,
  Layers,
  Presentation,
} from "lucide-react";

// ---------- Data (edit here to update content) ----------
const profile = {
  name: "Kithnuwan Silva",
  title: "Head of System Integrations · Anscom Limited",
  location: "Horana, Sri Lanka",
  summary:
    "Broadcast, AV, and ELV integrator specializing in the design, integration, and support of high-performance systems for corporate, government, and broadcast environments — from boardrooms to broadcast studios.",
  highlights: [
    "20+ years in AV & Broadcast",
    "300+ meeting rooms delivered",
    "Government & enterprise tender experience",
    "Design → Integration → Training → Support",
  ],
  socials: [
    { label: "Email", href: "mailto:Kithnuwan@gmail.com", Icon: Mail },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kithnuwan-silva-70310310/", Icon: Linkedin },
  ],
  heroImage: heroImage, // Using a placeholder URL
};

const services = [
  {
    title: "Meeting Rooms / Teams Rooms",
    desc: "Design, deploy, and support Microsoft Teams Rooms and multi‑platform setups with BYOD, auto‑framing cameras, ceiling mics, and room scheduling.",
    Icon: Presentation,
    tags: ["Teams Rooms", "BYOD", "AI Cameras", "Ceiling Mics"],
  },
  {
    title: "Video Walls & Digital Signage",
    desc: "LED/LCD video walls, processors, and content workflows. CMS, scheduling, and remote monitoring for enterprise signage.",
    Icon: PanelTop,
    tags: ["LED", "LCD", "Processors", "CMS"],
  },
  {
    title: "Broadcast & Studio Systems",
    desc: "End‑to‑end studio builds: cameras, vision mixing, intercom, tally, NDI/SDI routing, lighting, and training.",
    Icon: Camera,
    tags: ["NDI", "SDI", "ATEM", "Intercom"],
  },
  {
    title: "Command & Control",
    desc: "Operator‑friendly control rooms with multi‑source visualization, redundancy, and low‑latency KVM/AV‑over‑IP.",
    Icon: MonitorCog,
    tags: ["KVM", "AVoIP", "Failover", "24/7"],
  },
  {
    title: "Smart Building & ELV",
    desc: "Integrated ELV solutions: networks, nurse call, surveillance, access control—engineered with AV for a seamless experience.",
    Icon: Workflow,
    tags: ["ELV", "Surveillance", "Nurse Call", "Networking"],
  },
  {
    title: "Training & Documentation",
    desc: "Commissioning, playbooks, and hands‑on training for operators and facility teams to own the system day‑to‑day.",
    Icon: BookOpen,
    tags: ["Handover", "SOPs", "Workflows", "Upskilling"],
  },
];

const projects = [
  {
    title: "MAS Intimate – Digital Product Center",
    client: "MAS Holdings",
    year: "2025",
    summary:
      "IP‑based AV for lobby and experience zones with Samsung signage, vertical displays, HDMI wall plates, and BeingHD IPX‑925D transceivers. Scheduled content via four media players.",
    outcomes: ["Flexible AVoIP", "Central scheduling", "Visitor impact"],
    tags: ["AV over IP", "Digital Signage", "Retail/Experience"],
  },
  {
    title: "Air Secretariat Board Room (Block 04, 6F)",
    client: "Sri Lanka Air Force",
    year: "2025",
    summary:
      "Digital discussion, sound reinforcement, and P1.53 LED video wall with full AV control & switching. Engineered for executive‑grade hybrid meetings.",
    outcomes: ["LED clarity", "Seamless control", "Executive UX"],
    tags: ["Boardroom", "LED", "Control"],
  },
  {
    title: "UNICEF Sri Lanka – New HQ Meeting Rooms",
    client: "UNICEF Sri Lanka",
    year: "2025",
    summary:
      "Teams Rooms with ceiling tile microphones, presenter/participant tracking cameras, hearing loop system, and signage displays integrated with facility AV.",
    outcomes: ["Inclusive audio", "Auto‑tracking", "Standards‑aligned"],
    tags: ["Teams Rooms", "Accessibility", "Enterprise"],
  },
  {
    title: "IWMI Auditorium – Voice Lift & Tracking",
    client: "IWMI",
    year: "2025",
    summary:
      "Voice‑lifting design with camera tracking across multiple seat layouts, optimized for lectures and hybrid conferences.",
    outcomes: ["Clear speech", "Auto camera cues", "Hybrid ready"],
    tags: ["Auditorium", "AI Tracking", "Education"],
  },
  {
    title: "Nelum Pokuna – Lighting Control Upgrade",
    client: "Nelum Pokuna Theatre",
    year: "2024",
    summary:
      "Upgrade of the lighting control system to modern, maintainable infrastructure while preserving show workflows.",
    outcomes: ["Reliability", "Operator familiar", "Serviceable"],
    tags: ["Theatre", "Lighting Control", "Upgrade"],
  },
  {
    title: "Defence HQ Complex – Multimedia System",
    client: "Sri Lanka (Government)",
    year: "2024",
    summary:
      "Detailed technical proposal for Block 1 & 2 multimedia, integrating displays, switching, and documentation for execution.",
    outcomes: ["Comprehensive spec", "Scalable design", "Compliance"],
    tags: ["Proposal", "Government", "Multimedia"],
  },
  // --- From CV: Meeting Room Solutions ---
  {
    title: "Lion Brewery — Boardroom",
    client: "Lion Brewery Sri Lanka",
    year: "—",
    summary:
      "State‑of‑the‑art boardroom with fully wireless BYOD connectivity, ceiling microphones, speakers, and network audio DSP.",
    outcomes: ["Cable‑free workflow", "Ceiling mic clarity", "DSP‑tuned"],
    tags: ["Boardroom", "BYOD", "DSP", "VC"],
    image: "https://i.ibb.co/Wc63tDx/meeting-room-slide-1.jpg",
  },
  {
    title: "Carson Cumberbatch PLC — Boardroom",
    client: "Carson Cumberbatch PLC",
    year: "—",
    summary:
      "Complete boardroom solution with audio DSP, ceiling microphones, and video conferencing integration.",
    outcomes: ["Integrated VC", "DSP control", "Executive UX"],
    tags: ["Boardroom", "DSP", "VC"],
    image: "https://i.ibb.co/3YY7v1B/meeting-room-slide-2.jpg",
  },
  {
    title: "Hilton Colombo (Jiac) — Ballrooms",
    client: "Hilton Colombo",
    year: "—",
    summary:
      "Centralized touch control for ballrooms; iPad‑based LED and general lighting control system.",
    outcomes: ["Unified control", "Mobile UI", "Lighting scenes"],
    tags: ["Ballroom", "Control", "Lighting"],
    image: "https://i.ibb.co/D81Ff6C/meeting-room-slide-3.jpg",
  },
  {
    title: "Sampath Bank — Meeting Rooms",
    client: "Sampath Bank PLC",
    year: "—",
    summary:
      "Touch control and automation across meeting rooms for consistent user experience.",
    outcomes: ["Fast start", "Unified UX", "Reduced support"],
    tags: ["Meeting Rooms", "Control", "Automation"],
    image: "https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg",
  },
];

const milestones = [
  { when: "Aug 2025", what: "Preparing technical proposals and upgrades for large boardrooms, auditoriums, and multi‑platform conferencing.", Icon: CalendarClock },
  { when: "Jan 2025", what: "Training scheduled for Panasonic AV‑HS6000 at SLRC; UNICEF office meeting room design finalization.", Icon: BadgeCheck },
  { when: "2019 → Present", what: "150+ Microsoft Teams Rooms and hybrid meeting spaces delivered with Yealink, Crestron, Q‑SYS, and Shure ecosystems.", Icon: Layers },
];

const platforms = [
  "Microsoft Teams Rooms",
  "Q‑SYS",
  "Crestron",
  "Dante",
  "NDI / SDI",
  "Yealink",
  "Shure / Sennheiser",
  "Blackmagic Design",
  "LED Processors",
  "Digital Signage CMS",
];

const experience = [
  {
    role: "Head of System Integrations / Special Project Manager",
    org: "Anscom Limited",
    period: "2022 – Present",
    bullets: [
      "Design & delivery of AV/Broadcast solutions for boardrooms, studios, auditoriums, and control rooms",
      "Formulate complex technology solutions across AVoIP, UC, and control systems",
      "Oversee installations, logistics, change orders, commissioning, and training",
      "Troubleshoot and resolve complex AV issues; lead teams and vendor coordination",
    ],
  },
  {
    role: "Senior Manager – IT & Broadcast",
    org: "Swedish Trading Audio Visual (Pvt) Ltd",
    period: "Jul 2019 – 2022",
    bullets: [
      "Architected AV & Broadcast systems meeting enterprise/government specs",
      "Led deployments for video conferencing, control, routing, and signage",
      "Managed project execution, shipments, and documentation",
    ],
  },
  {
    role: "Technical Executive",
    org: "Swedish Trading Audio Visual (Pvt) Ltd",
    period: "Jun 2003 – Jul 2009",
    bullets: [
      "Installation, programming, and maintenance for broadcast and enterprise AV",
      "Coordinated bid/design‑build projects across broadcast, corporate, education, and government",
    ],
  },
];

const education = [
  { degree: "BSc (Hons) – Computer Networks & Security", school: "Glyndwr University, Wrexham" },
  { degree: "GCE A/L (Physics B, Chemistry C, Biology C)", school: "Taxila Central College, Horana" },
];

const certifications = [
  "Cisco CCNA (Routing & Switching)",
  "Audinate Dante Level 1 & 2",
  "Biamp Tesira Certification",
  "Barco ClickShare – Certified Technical Expert",
  "Kramer Control – Certified Programmer",
  "Yealink Microsoft Solution Pre‑Sales Expert",
];

// FIX: Removed the duplicated and malformed legacyProjects object.
const legacyProjects = {
  broadcast: [
    {
      name: "Parliament of Sri Lanka – Full HD Multilingual Broadcast System",
      year: "2017",
      detail: "Sony HXC‑100RF, Vinten FHR‑35, Grass Valley Karrera, GV 64×64 SDI & AES routers (Project value ≈ LKR 237M)",
    },
    {
      name: "MBC Stein Studio – HD Upgrade",
      year: "—",
      detail: "12× Grass Valley Focus 70, Karrera switcher, T2 recorders (US$153,567 + US$141,710 stages)",
    },
    {
      name: "ITN – Full HD OB Bus",
      year: "2012",
      detail: "Grass Valley Karrera, EVS XT Nao Replay, Ross routing/glue, Harris multiviewers (> US$300k)",
    },
    { name: "Sri Dalada Maligawa – OB & MCR playout", year: "—", detail: "Outside broadcast and master control system" },
    { name: "SLRC – MCR Graphics & 24‑ch Vision Mixer for OB Bus", year: "—", detail: "Including Tektronix T&M" },
    { name: "Dept. of Ayurveda – Broadcast Studio", year: "—", detail: "Turnkey studio (≈ LKR 20M)" },
  ],
  uc: [
    {
      name: "Distance Education Modernization Project",
      year: "—",
      detail: "20 distance learning centers with Polycom RMX1000 bridge & ViewStation EX (≈ LKR 15M)",
    },
    { name: "People’s Bank – Unified Conference System", year: "—", detail: "Enterprise video collaboration (≈ LKR 30M)" },
    { name: "People’s Leasing & Finance – Video Collaboration", year: "—", detail: "End‑to‑end rollout across sites" },
  ],
  special: [
    { name: "Presidential Secretariat – Dual Executive Teleprompter", year: "—", detail: "Executive teleprompter system (≈ LKR 24M)" },
    { name: "Parliament – Wireless Master Clock", year: "—", detail: "2.4 GHz frequency‑hopping master clock" },
    { name: "ITN – IP Master Clock", year: "—", detail: "High‑precision multi‑function with 24 digital slave clocks" },
    { name: "USAID – Automated Courtroom Recording", year: "—", detail: "Recording + remote conferencing (≈ LKR 35M)" },
  ],
  meetings: [
    { name: "Lion Brewery – Boardroom", detail: "Wireless BYOD, ceiling mics, network audio DSP" },
    { name: "Carson Cumberbatch PLE – Boardroom", detail: "Audio DSP, ceiling mics, VC" },
    { name: "Hilton Colombo (Jiac) – Ballrooms", detail: "Centralized touch control; iPad‑based LED & lighting" },
    { name: "Sampath Bank – Meeting Rooms", detail: "Touch control and automation" },
  ],
};

const tags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

const solutions = [
  {
    title: "20‑Seat Teams Room (Dual Display)",
    summary: "Ceiling array mics, tracking camera, scheduler, and BYOD wireless sharing.",
    image: "https://i.ibb.co/Wc63tDx/meeting-room-slide-1.jpg",
  },
  {
    title: "BYOD Wireless Conferencing",
    summary: "AirPlay/Miracast casting with USB device access to in‑room camera and audio for Zoom/Meet/Teams.",
    image: "https://i.ibb.co/3YY7v1B/meeting-room-slide-2.jpg",
  },
  {
    title: "Hybrid Boardroom — Presenter/Participant Tracking",
    summary: "Auto‑framing cameras with DSP echo cancellation and table/ceiling mic mix for natural conversation.",
    image: "https://i.ibb.co/D81Ff6C/meeting-room-slide-3.jpg",
  },
  {
    title: "Auditorium — Voice Lift & Recording",
    summary: "Distributed speakers, assistive listening, and lecture capture with streaming.",
    image: "https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg",
  },
];

// ---------- Utilities ----------
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

// ---------- Components ----------
function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
      {children}
    </span>
  );
}

function Section({ id, title, eyebrow, children, actions }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          {eyebrow && (
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">{eyebrow}</div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-white/5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-6 h-full">
      {children}
    </div>
  );
}

function Nav() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#solutions", label: "Solutions" },
    { href: "#expertise", label: "Expertise" },
    { href: "#milestones", label: "Milestones" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/5 dark:border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-cyan-400" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{profile.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{profile.title}</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-300">
              {i.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {profile.socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10" aria-label={label}>
              <Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

// FIX: Corrected the component structure, removing duplicated and malformed code.
function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br from-indigo-500/40 to-cyan-400/40" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-sky-400/40 to-fuchsia-400/40" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div {...fadeUp} className="grid md:grid-cols-12 items-center gap-10">
          <div className="md:col-span-7">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              AV & Broadcast Systems that <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">perform</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              I design, integrate, and support professional audio‑visual environments—from boardrooms to broadcast studios—so your teams can present, collaborate, and scale with confidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {profile.highlights.map((h) => (
                <Chip key={h}>{h}</Chip>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                Request a proposal <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-black/10 dark:ring-white/20 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10">
                View projects
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="relative mx-auto w-full max-w-[280px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 blur-2xl opacity-40 -z-10" />
                  <div className="rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 to-cyan-400">
                    <img
                      src={profile.heroImage}
                      alt={`${profile.name} portrait`}
                      className="rounded-full w-full h-full object-cover bg-white"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{profile.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{profile.title}</div>
                  <div className="mt-2 inline-flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4" /> {profile.location}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function Services() {
  return (
    <Section id="services" title="Services" eyebrow="What I do">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <motion.div key={s.title} {...fadeUp}>
            <Card>
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-2xl bg-black/5 dark:bg-white/10">
                  <s.Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{s.title}</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// FIX: Corrected filter button to show active state.
function Projects() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => (p.tags || []).includes(active))),
    [active]
  );
  return (
    <Section
      id="projects"
      title="Featured Projects"
      eyebrow="Proof of work"
      actions={
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          <button
            onClick={() => setActive("All")}
            className={classNames(
              "px-3 py-1.5 rounded-xl text-sm font-medium ring-1 ring-black/10 dark:ring-white/20 whitespace-nowrap",
              active === "All"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
            )}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={classNames(
                "px-3 py-1.5 rounded-xl text-sm font-medium ring-1 ring-black/10 dark:ring-white/20 whitespace-nowrap",
                active === t
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <motion.div key={p.title} {...fadeUp}>
            <Card>
              <div className="flex items-start gap-4">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/5 dark:ring-white/10" />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Building2 className="h-4 w-4" /> {p.client} <span>•</span> {p.year}
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
                    <span className="font-medium">Outcomes:</span> {p.outcomes.join(", ")}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Expertise() {
  return (
    <Section id="expertise" title="Platforms & Expertise" eyebrow="Tools I use">
      <Card>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <Chip key={p}>{p}</Chip>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function Solutions() {
  return (
    <Section id="solutions" title="Meeting Room Solutions" eyebrow="From the deck">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {solutions.map((s) => (
          <motion.div key={s.title} {...fadeUp}>
            <Card>
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 flex items-center justify-center">
                  {s.image ? (
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-xs text-gray-500 dark:text-gray-400 p-4 text-center">Image will appear here</div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.title}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{s.summary}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Milestones() {
  return (
    <Section id="milestones" title="Selected Milestones" eyebrow="Track record">
      <div className="grid md:grid-cols-3 gap-6">
        {milestones.map((m) => (
          <motion.div key={m.when} {...fadeUp}>
            <Card>
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-xl bg-black/5 dark:bg-white/10">
                  <m.Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{m.when}</div>
                  <div className="mt-1 text-sm text-gray-800 dark:text-gray-200">{m.what}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="What I've led">
      <div className="grid md:grid-cols-2 gap-6">
        {experience.map((e) => (
          <motion.div key={e.role + e.org} {...fadeUp}>
            <Card>
              <div className="text-sm text-gray-700 dark:text-gray-200">
                <div className="text-base font-semibold text-gray-900 dark:text-white">{e.role}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{e.org} • {e.period}</div>
                <ul className="mt-3 space-y-1 list-disc ml-4">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Qualifications() {
  return (
    <Section id="qualifications" title="Qualifications" eyebrow="Education & Certifications">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm text-gray-700 dark:text-gray-200">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Education</div>
              <ul className="space-y-1 list-disc ml-4">
                {education.map((ed) => (
                  <li key={ed.degree}>
                    <span className="font-medium">{ed.degree}</span> — {ed.school}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm text-gray-700 dark:text-gray-200">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Professional Certifications</div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

function LegacyProjects() {
  return (
    <Section id="legacy-projects" title="Selected Projects (CV)" eyebrow="Additional portfolio">
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Broadcast</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.broadcast.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>{p.year !== "—" ? ` (${p.year})` : ""}: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Unified Communication</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.uc.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>{p.year !== "—" ? ` (${p.year})` : ""}: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Special Projects</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.special.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>{p.year !== "—" ? ` (${p.year})` : ""}: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Meeting Room Solutions</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.meetings.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Let’s talk" eyebrow="Get in touch">
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div {...fadeUp} className="md:col-span-2">
          <Card>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const subject = encodeURIComponent(`Project inquiry — ${data.get("company") || "Unknown"}`);
                const body = encodeURIComponent(
                  `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nBudget: ${data.get("budget")}\nType: ${data.get("type")}\n\n${data.get("message")}`
                );
                window.location.href = `mailto:Kithnuwan@gmail.com?subject=${subject}&body=${body}`;
              }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input id="name" name="name" required className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" />
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium">Company</label>
                <input id="company" name="company" className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" type="email" name="email" required className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" />
              </div>
              <div>
                <label htmlFor="budget" className="text-sm font-medium">Budget (USD)</label>
                <input id="budget" name="budget" className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" placeholder="e.g., 25,000–80,000" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="type" className="text-sm font-medium">Project type</label>
                <select id="type" name="type" className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2">
                  <option>Microsoft Teams Room</option>
                  <option>Boardroom / Conference</option>
                  <option>Auditorium</option>
                  <option>Broadcast Studio</option>
                  <option>Digital Signage / Video Wall</option>
                  <option>Command & Control</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" placeholder="Tell me about your use‑case, location, and timeline…" />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between gap-4">
                <button type="submit" className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                  Send inquiry <ChevronRight className="h-4 w-4" />
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400">You’ll get a reply within 1–2 business days.</div>
              </div>
            </form>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm text-gray-700 dark:text-gray-200 space-y-3">
              <div className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 flex-shrink-0" /> <a className="hover:underline break-all" href="mailto:Kithnuwan@gmail.com">Kithnuwan@gmail.com</a></div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /> {profile.location}</div>
              <div className="flex items-start gap-2"><Aperture className="h-4 w-4 mt-0.5 flex-shrink-0" /> Available for Sri Lanka & remote consulting</div>
            </div>
            <div className="mt-6">
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold rounded-xl ring-1 ring-black/10 dark:ring-white/20 px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">
                Download Solutions (PDF) <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}


function DevDiagnostics() {
  useEffect(() => {
    try {
      console.assert(Array.isArray(projects) && projects.length > 0, "[Diag] projects should be a non-empty array");
      console.assert(Array.isArray(services) && services.length > 0, "[Diag] services should be a non-empty array");
      console.assert(Array.isArray(solutions) && solutions.length > 0, "[Diag] solutions should be a non-empty array");
      console.assert(typeof profile.name === "string" && profile.name.length > 0, "[Diag] profile.name missing");
    } catch (e) {
      // noop
    }
  }, []);
  return null;
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
      <DevDiagnostics />
      <Nav />
      <main>
        <Hero />
        <Section id="about" title="About" eyebrow="Who I am">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div {...fadeUp} className="md:col-span-2">
              <Card>
                <p className="text-sm leading-7 text-gray-700 dark:text-gray-200">
                  I’m a systems integrator specializing in <strong>enterprise AV</strong> and <strong>broadcast</strong>. My focus is delivering
                  <em> reliable, maintainable, and operator‑friendly</em> solutions. From discovery and design to commissioning, documentation, and training, I work hands‑on with clients and vendors to meet technical requirements while protecting budgets and timelines.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip>Head of System Integrations — Anscom Limited</Chip>
                  <Chip>Government & Enterprise Tenders</Chip>
                  <Chip>Hands‑on Commissioning</Chip>
                </div>
              </Card>
            </motion.div>
            <motion.div {...fadeUp}>
              <Card>
                <div className="text-sm text-gray-700 dark:text-gray-200 space-y-3">
                  <div className="flex items-start gap-2"><Cpu className="h-4 w-4 mt-0.5 flex-shrink-0" /> Q‑SYS programming & automation</div>
                  <div className="flex items-start gap-2"><Settings className="h-4 w-4 mt-0.5 flex-shrink-0" /> Lifecycle & EOL planning</div>
                  <div className="flex items-start gap-2"><AudioLines className="h-4 w-4 mt-0.5 flex-shrink-0" /> Dante‑first audio routing</div>
                  <div className="flex items-start gap-2"><Video className="h-4 w-4 mt-0.5 flex-shrink-0" /> SDI/NDI hybrid workflows</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Section>
        <Services />
        <Projects />
        <Solutions />
        <LegacyProjects />
        <Expertise />
        <Experience />
        <Qualifications />
        <Milestones />
        <Contact />
      </main>
    </div>
  );
}