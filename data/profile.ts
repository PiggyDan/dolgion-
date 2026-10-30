// All portfolio content lives here. Keep every claim verifiable:
// no invented metrics, dates, certifications or endorsements.

export const profile = {
  name: "Dolgion Oldokh",
  shortName: "Dolgion",
  email: "odolgion222@gmail.com",
  phone: "+976 8909 0126",
  github: "https://github.com/PiggyDan",
  linkedin: "https://www.linkedin.com/in/dolgion-o/",
  site: "https://daniel70.netlify.app",
  location: "Ulaanbaatar, Mongolia",
  positioning: ["Systems Engineer", "Infrastructure & Automation", "Software Development"],
  availability: "Open to international remote work and relocation",
  cv: { href: "/Dolgion_Oldokh_Resume_2026.pdf", label: "CV (PDF, English)" },
  cvMn: { href: "/Dolgion_Oldokh_Resume_2026_MN.pdf", label: "CV (PDF, Mongolian)" },
};

export const employer = { name: "Govikhangai Khudulmur LLC", site: "https://www.gkllc.mn", host: "gkllc.mn" };

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  title: "Building reliable systems. Solving real problems.",
  lead: "I'm a systems engineer in Ulaanbaatar. I look after the servers, network, security and ERP for a group of about 11 related companies, and when we're missing a tool, I build it.",
};

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export type Tone = "done" | "progress" | "planned" | "live";

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  status: { label: string; tone: Tone };
  role: string;
  period: string;
  stack: string[];
  problem: string[];
  responsibilities: string[];
  architecture: { intro: string; layers: { name: string; items: string[] }[]; note?: string };
  decisions: { title: string; text: string }[];
  challenges: { title: string; text: string }[];
  progress: { label: string; tone: Tone; items: string[] }[];
  facts?: { value: string; label: string }[];
  outcomes: string[];
  outcomesNote?: string;
  links?: { href: string; label: string }[];
  // PNG files in /public. A file that doesn't exist yet is skipped at build time.
  screenshots: { file: string; alt: string; caption: string }[];
  screenshotsNote?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "odoo-13-to-19-migration",
    index: "01",
    title: "Migrating a customised ERP from Odoo 13 to Odoo 19 Community",
    kicker: "ERP migration · In progress",
    summary:
      "The company group runs accounting, inventory, HR, payroll, transport and maintenance on a heavily customised Odoo 13. I'm moving it to Odoo 19 Community. The audit is finished. Modules are now being ported and tested on a separate test server, and Odoo 13 is still the production system.",
    status: { label: "In progress: no production cutover yet", tone: "progress" },
    role: "Migration lead (System Engineer & IT Manager)",
    period: "Apr 2026 to present",
    stack: ["Odoo 13 / 19 Community", "Python", "XML views / QWeb", "OWL", "PostgreSQL 16", "Ubuntu 24.04", "nginx", "Git / GitLab"],
    problem: [
      "Odoo 13 has been out of Odoo's support window for years, and the group's business processes live inside it: accounting, stock, HR, payroll, transport, maintenance and a public jobs feed.",
      "Odoo stores a lot of logic in custom modules, and many APIs those modules use no longer exist in Odoo 19. A plain database upgrade isn't possible. Each custom module has to be audited, ported and tested before any real data moves.",
    ],
    responsibilities: [
      "Audited the module tree and mapped which third-party modules the custom code actually depends on.",
      "Wrote the migration report that records every Odoo 13 → 19 incompatibility found.",
      "Porting the custom modules myself (Python models, XML views, security rules, reports) against the real Odoo 19 source.",
      "Built and maintain the separate Ubuntu test server and PostgreSQL test database server.",
      "Reviewed the licensing of every module in the dependency chain before choosing the Community edition as the target.",
    ],
    architecture: {
      intro: "The migration happens entirely beside production. Odoo 13 keeps running, and nothing is installed on it.",
      layers: [
        { name: "Production (unchanged)", items: ["Odoo 13 Community", "Production PostgreSQL database", "Filestore"] },
        { name: "Code", items: ["Custom modules in Git / GitLab", "Ported module by module", "Installed into throw-away Odoo 19 databases first"] },
        { name: "Test application server", items: ["Ubuntu 24.04", "Odoo 19 Community", "nginx reverse proxy · TLS · UFW"] },
        { name: "Test database server", items: ["PostgreSQL 16", "Copied test databases only", "Never connected to production"] },
      ],
      note: "Simplified. Hostnames, addresses and credentials are intentionally left out.",
    },
    decisions: [
      {
        title: "Target Odoo 19 Community, not Enterprise",
        text: "The licensing review found six modules in the dependency chain that came from Odoo Enterprise source: accounting reports, assets, budgets, Gantt and grid views. Enterprise code can't be carried into a Community deployment, so those modules have to be replaced with Community/OCA alternatives or rewritten.",
      },
      {
        title: "Migrate only what is actually used",
        text: "The audit covered 375 module manifests. I traced the real dependency chain of the custom modules and found 46 third-party modules (about 225,000 lines of Python, XML and JavaScript). Everything outside that chain stays behind, which keeps the scope realistic.",
      },
      {
        title: "Test databases only",
        text: "Every module bundle is installed onto copied test databases on a separate PostgreSQL server. Production is never touched until data validation and a rollback plan are in place.",
      },
      {
        title: "Drop legacy JavaScript instead of shimming it",
        text: "Odoo 13 widgets use the odoo.define / Widget API that was removed in Odoo 17. I took them out of the asset bundles so views fall back to standard widgets. Anything users still need gets rewritten in OWL.",
      },
    ],
    challenges: [
      {
        title: "Enterprise code blocking Community modules",
        text: "Through the assets module, Enterprise code was a dependency of transport, technic, stock, timetable and salary. Unpicking that dependency comes before those modules can be ported.",
      },
      {
        title: "HR contracts became versions",
        text: "Odoo 19 merges hr.contract into hr.version. Every HR, timetable and payroll module that read contracts, including raw SQL reports, has to be re-pointed. Payroll is flagged for line-by-line comparison against Odoo 13.",
      },
      {
        title: "Failures that only happened on the server",
        text: "Some bugs only appeared on the test server, because modules installed there in a different order than on my machine. One of them blanked the whole web client. I traced and fixed each one and recorded it in the deployment log.",
      },
      {
        title: "Removed stock models and view API changes",
        text: "Several stock models used by the custom inventory code no longer exist, and view inheritance changed between versions. Each module is installed into a fresh Odoo 19 database and its main flows are tested at runtime, not just loaded.",
      },
    ],
    progress: [
      { label: "Done", tone: "done", items: ["Module audit and dependency mapping", "Written migration report", "Licensing review of the dependency chain"] },
      { label: "In progress", tone: "progress", items: ["Porting and runtime-testing custom modules", "Ubuntu 24.04 test server and PostgreSQL 16 test databases", "Replacing Enterprise-only dependencies"] },
      {
        label: "Planned",
        tone: "planned",
        items: [
          "Run a full payroll month on migrated data and compare every line with Odoo 13",
          "Configure stock valuation and reconcile a month of inventory",
          "Key-user acceptance testing",
          "Cutover with full PostgreSQL + filestore backup and a documented rollback path",
        ],
      },
    ],
    facts: [
      { value: "375", label: "module manifests audited" },
      { value: "46", label: "third-party modules in the real dependency chain" },
      { value: "~225k", label: "lines of Python, XML and JS in that chain" },
      { value: "6", label: "Enterprise-only modules to replace" },
      { value: "15", label: "custom modules in scope" },
    ],
    outcomes: [
      "A written migration report and dependency map. The scope went from \"everything installed\" to a defined set of modules.",
      "An Odoo 19 Community test environment running with migrated modules installed (screenshot below).",
      "Install-order bugs found and fixed on the test server before they could reach production.",
    ],
    outcomesNote:
      "Production cutover hasn't happened. I'm not claiming business or performance results until the migration is live and verified.",
    screenshots: [
      {
        file: "images/odoo13.png",
        alt: "The existing Odoo 13 Community home screen",
        caption: "Odoo 13: the current production system.",
      },
      {
        file: "images/odoo19.png",
        alt: "Odoo 19 Community test environment home screen with the Mongolian app menu",
        caption: "Odoo 19 Community test environment with migrated modules installed. The browser address bar is cropped out.",
      },
    ],
    screenshotsNote: "A new home screen isn't proof the migration works. The real evidence is the module installs and runtime tests on the test databases.",
  },
  {
    slug: "infrascope",
    index: "02",
    title: "InfraScope: open-source infrastructure monitoring and incident detection",
    kicker: "Open source · DevOps",
    summary:
      "InfraScope checks HTTP(S) endpoints on a schedule, stores every real measurement in PostgreSQL, and opens and resolves incidents automatically. It ships as a Docker Compose stack with a FastAPI backend, a React dashboard and CI that tests the whole stack end to end.",
    status: { label: "Public on GitHub · CI passing", tone: "live" },
    role: "Sole author: design, code, tests, CI, documentation",
    period: "Oct 2026 to present",
    stack: ["Python 3.12", "FastAPI", "PostgreSQL 16", "Alembic", "Docker Compose", "GitHub Actions", "React", "TypeScript", "nginx"],
    problem: [
      "Monitoring is usually the first thing that's missing in a small IT environment. People find out a service is down when users call. I wanted a monitor I fully understand, one that records real response times, raises incidents without false alarms, and can feed a ticketing system or internal portal.",
      "I also built it to show, in public, how I work: tested, documented, reproducible with one command, and safe by default.",
    ],
    responsibilities: [
      "Backend: FastAPI REST API, background monitor engine, incident rules, API-key authentication.",
      "Database: PostgreSQL 16 schema and Alembic migrations.",
      "Frontend: React + TypeScript dashboard with charts, light and dark mode, phone-width layout.",
      "Delivery: Docker Compose stack, GitHub Actions CI, Dependabot, PowerShell smoke test.",
      "Documentation: README, architecture, API and integration docs, daily progress logs.",
    ],
    architecture: {
      intro: "Everything runs with one command, `docker compose up`. The database and test target sit on an internal network with no internet or LAN access.",
      layers: [
        { name: "Edge network", items: ["web: nginx + React build", "api: FastAPI + monitor thread", "Bound to 127.0.0.1 by default"] },
        { name: "Monitor engine", items: ["Scheduler loop (1 s tick)", "Thread pool (8 workers)", "httpx checks: no redirects, 5 s timeout"] },
        { name: "Backend network (internal)", items: ["PostgreSQL 16 (pgdata volume)", "testtarget: /healthy /unhealthy /slow"] },
        { name: "Integrations", items: ["Signed incident webhooks", "Transactional outbox with retries", "VIEWER API keys for portals"] },
      ],
    },
    decisions: [
      {
        title: "Incidents need two failures, not one",
        text: "A target is marked DOWN after 2 consecutive failed checks and resolved after 2 consecutive successes. One dropped packet doesn't page anyone. A database index guarantees there's never more than one open incident per target.",
      },
      {
        title: "SSRF protection by default",
        text: "A monitor that fetches URLs is an easy way to probe internal networks. Only allowlisted hostnames are checked: no raw IPs, credentials or redirects. IP monitoring is opt-in per network range, and loopback, link-local, metadata and reserved addresses are always refused.",
      },
      {
        title: "API keys stored as hashes, shown once",
        text: "Keys are 32 random bytes; only their SHA-256 hash is stored, and the secret is printed once. VIEWER and ADMIN roles are enforced on every route, and a test checks that every non-public route requires a key.",
      },
      {
        title: "Webhooks that survive failures",
        text: "Incident notifications are written to a transactional outbox, signed with HMAC-SHA256 with a 5-minute replay window, and retried with exponential backoff. A receiver being down doesn't lose an incident.",
      },
    ],
    challenges: [
      {
        title: "Measuring real response times",
        text: "The checker streams the request and times only until response headers arrive, without downloading bodies. Timeouts and connection errors are recorded as results rather than dropped.",
      },
      {
        title: "Background work without blocking the API",
        text: "The monitor runs in its own thread, started and stopped by the FastAPI lifespan, so checks never block API requests. Allowlist changes take effect on the next check.",
      },
      {
        title: "Testing against a real stack",
        text: "CI runs lint and 141 pytest tests against a real PostgreSQL service, typechecks and builds the frontend, then brings up the full Docker Compose stack for an end-to-end check.",
      },
    ],
    progress: [
      {
        label: "Built",
        tone: "done",
        items: [
          "Target management REST API and background HTTP monitor",
          "Incident detection, history and summary API",
          "API-key auth with VIEWER / ADMIN roles",
          "React dashboard and Docker Compose stack",
          "Signed webhooks with outbox and retries",
          "CI: lint, tests, frontend build, Compose end-to-end",
        ],
      },
      {
        label: "Scope today",
        tone: "progress",
        items: ["HTTP(S) checks only", "Single API instance, designed to run on one host"],
      },
    ],
    facts: [
      { value: "141", label: "pytest tests, incl. integration tests" },
      { value: "3", label: "CI stages: backend, frontend, Compose end-to-end" },
      { value: "2 / 2", label: "failures to open, successes to resolve an incident" },
      { value: "MIT", label: "license" },
    ],
    outcomes: [
      "Public, documented repository with a passing CI pipeline.",
      "A recorded demo: a target fails, an incident opens after two failed checks and resolves after two successes, all on the real stack.",
      "Git history audited for secrets before the repository was made public.",
    ],
    links: [{ href: "https://github.com/PiggyDan/infrascope", label: "github.com/PiggyDan/infrascope" }],
    screenshots: [
      {
        file: "images/infrascope-dashboard-dark.png",
        alt: "InfraScope dashboard with summary tiles, targets, incidents and a response-time chart",
        caption: "InfraScope dashboard (dark mode) running against the bundled test targets.",
      },
      {
        file: "images/infrascope-dashboard-light.png",
        alt: "InfraScope dashboard in light mode",
        caption: "The same dashboard in light mode.",
      },
    ],
  },
  {
    slug: "itcore",
    index: "03",
    title: "ITCore: a multi-company help desk and device inventory",
    kicker: "SaaS product · Live, early stage",
    summary:
      "ITCore is a help desk and Windows device-inventory product that I designed, built and run myself. Staff raise requests from a Windows app, their phone or a browser. IT gets tickets, chat, announcements, PC health and reports in one place, separated per company.",
    status: { label: "Live at itcore.dev, early stage", tone: "live" },
    role: "Founder and sole engineer: design, code, infrastructure, releases",
    period: "2026 to present",
    stack: ["TypeScript", "React", "Vite", "Cloudflare Workers", "Neon PostgreSQL", "Cloudflare R2", "Electron", "Go", "Node.js"],
    problem: [
      "Supporting several companies at once, IT requests arrived through calls and messages with no shared record. There was no history of what was fixed, and no single view of the state of each PC.",
      "Off-the-shelf help desks didn't fit a group where each company's data has to stay separate and staff need the tool in Mongolian, English or Chinese.",
    ],
    responsibilities: [
      "Product and data model design, including company separation and roles.",
      "API, web app and marketing site.",
      "Windows desktop app (Electron) and the ITCore Sentinel monitoring agent (Go).",
      "Hosting, releases, security controls and their tests.",
    ],
    architecture: {
      intro: "A small-team architecture: managed, serverless pieces so one person can operate it.",
      layers: [
        { name: "Clients", items: ["Web app (sup.itcore.dev)", "Windows desktop app (Electron, self-updating)", "ITCore Sentinel agent on each PC (Go)"] },
        { name: "API", items: ["Cloudflare Workers", "Tenant-scoped auth, 4 roles", "Sessions · CSRF checks · login rate limits"] },
        { name: "Data", items: ["Neon PostgreSQL", "Cloudflare R2 for attachments", "Per-company separation enforced in the API"] },
        { name: "Public site", items: ["itcore.dev", "Pricing in USD, MNT and CNY", "Downloads and plan requests"] },
      ],
    },
    decisions: [
      {
        title: "The agent reports, it never executes",
        text: "Sentinel enrols with a token and sends health telemetry only. It accepts no remote commands. That limits the damage if the service or an account is ever compromised, and it makes the agent easier for a customer's IT team to approve.",
      },
      {
        title: "Company separation in the API, not the UI",
        text: "Every request is scoped to a company on the server, with four roles on top. Hiding things in the interface isn't treated as access control.",
      },
      {
        title: "Serverless API and managed Postgres",
        text: "Cloudflare Workers and Neon keep the operational load small enough for a single engineer, without running my own servers for the product.",
      },
      {
        title: "A Call-IT button that works offline",
        text: "People need IT most when the network is down, so the desktop app's Call-IT button works without a connection.",
      },
    ],
    challenges: [
      {
        title: "Shipping quickly without breaking tenants",
        text: "I shipped 90+ releases in the first four weeks. Integration tests cover the security-critical paths: password hashing (scrypt), HttpOnly sessions, CSRF checks, login rate limits and company isolation.",
      },
      {
        title: "Getting the app onto PCs",
        text: "The desktop app installs from a USB kit in about a minute and updates itself after that, so rollout doesn't depend on a software-distribution system the customer may not have.",
      },
      {
        title: "Three languages from day one",
        text: "The interface, notifications and invoices work in Mongolian, English and Chinese. Invoices are generated in USD, MNT or CNY at the current rate.",
      },
    ],
    progress: [
      {
        label: "Built and deployed",
        tone: "done",
        items: [
          "Tickets with status, priority, assignment, comments and attachments",
          "Chat, group chat and announcements with read receipts",
          "Company separation, 4 roles and tested security controls",
          "Windows desktop app with auto-update and offline Call-IT",
          "Sentinel agent: token enrolment and PC health check-ins every 15 minutes",
          "Technician reports and automatic invoices in three currencies",
        ],
      },
      {
        label: "Early stage",
        tone: "progress",
        items: [
          "Live with published plans (from $35/month); adoption is still early, so I don't publish customer or usage numbers",
          "Device inventory is built from agent check-ins rather than a separate asset register",
        ],
      },
      {
        label: "Not built yet",
        tone: "planned",
        items: ["Agents for macOS and Linux (Sentinel is Windows-only today)", "A documented public API for integrations"],
      },
    ],
    facts: [
      { value: "90+", label: "releases in the first 4 weeks" },
      { value: "3", label: "languages: MN · EN · 中文" },
      { value: "15 min", label: "agent check-in interval" },
      { value: "4", label: "roles, with company isolation" },
    ],
    outcomes: [
      "A working product in public: itcore.dev and the app at sup.itcore.dev.",
      "Security controls backed by integration tests, not just written in the code.",
      "A telemetry-only agent design that I can explain and defend to a customer's IT team.",
    ],
    links: [
      { href: "https://itcore.dev", label: "itcore.dev: product site" },
      { href: "https://sup.itcore.dev", label: "sup.itcore.dev: the app (sign-in required)" },
    ],
    screenshots: [
      { file: "images/itcore-tickets.png", alt: "ITCore ticket list", caption: "ITCore ticket list (sample data)." },
      { file: "images/itcore-devices.png", alt: "ITCore device inventory", caption: "Device inventory from Sentinel check-ins (sample data)." },
    ],
  },
  {
    slug: "enterprise-infrastructure",
    index: "04",
    title: "Running the infrastructure for a group of about 11 companies",
    kicker: "Infrastructure operations · Current role",
    summary:
      "Day-to-day responsibility for the servers, virtualisation, network, security, CCTV and end-user IT that a group of about 11 related companies runs on. This is ongoing operations work, not a single project.",
    status: { label: "Ongoing: current role", tone: "live" },
    role: "System Engineer & IT Manager",
    period: "Apr 2026 to present",
    stack: ["Dell PowerEdge R740 / R750", "VMware ESXi", "Windows Server", "Ubuntu Linux", "Check Point", "Remote Access VPN", "Grandstream GWN.Cloud", "NVR / CCTV"],
    problem: [
      "About 11 related companies share one set of infrastructure: servers, network, firewall, Wi-Fi, CCTV and the ERP. When something fails, the business stops, whether it's a disk, a VPN tunnel or a printer at the front desk.",
      "The work runs from the server room down to individual users, so the useful skill is following a problem across layers instead of handing it off.",
    ],
    responsibilities: [
      "Dell PowerEdge R740 / R750 servers: replacing and reinstalling SSDs and HDDs, reinstalling operating systems, running the VMware ESXi hosts and watching their health.",
      "Windows Server and Ubuntu Linux systems, including the ERP servers.",
      "Check Point firewall, Remote Access VPN, NAT and routing.",
      "Grandstream GWN Wi-Fi and switches managed through GWN.Cloud, plus printers and IP telephony.",
      "NVR camera systems across sites: recording, storage and remote viewing.",
      "End-user support: accounts, email, Office, PC rebuilds and hardware swaps.",
    ],
    architecture: {
      intro: "A simplified view of the layers I'm responsible for.",
      layers: [
        { name: "Users & sites", items: ["Office PCs and laptops", "Printers · IP phones", "CCTV cameras"] },
        { name: "Edge & remote access", items: ["Check Point security gateway", "Firewall policy · NAT", "Remote Access VPN"] },
        { name: "Network", items: ["Switching", "Grandstream GWN Wi-Fi via GWN.Cloud"] },
        { name: "Compute & workloads", items: ["Dell PowerEdge R740 / R750", "VMware ESXi hosts", "Windows Server and Ubuntu VMs", "NVR recording"] },
      ],
      note: "Illustrative only. Real topology, addressing, rule sets, hostnames and credentials are deliberately not published.",
    },
    decisions: [
      {
        title: "Troubleshoot by layer",
        text: "I start at what the user sees and work down through the application, database, operating system, network and firewall until the cause is found. Most problems that look like application bugs end up being somewhere else.",
      },
      {
        title: "Fix the cause, then write it down",
        text: "Restoring service comes first, but a problem isn't closed until I know why it happened and have done what I can to stop it coming back.",
      },
      {
        title: "Separate test from production",
        text: "New systems like the Odoo 19 migration run on separate test servers and databases instead of being tried out on what the business depends on.",
      },
    ],
    challenges: [
      {
        title: "Hardware failures on production servers",
        text: "Replacing failed SSDs and HDDs and reinstalling operating systems on PowerEdge servers, while keeping downtime for the companies as short as possible.",
      },
      {
        title: "Remote access across companies",
        text: "Keeping Check Point VPN access working for staff who need to reach internal systems from outside the office.",
      },
      {
        title: "Breadth",
        text: "In one day the work can cover an ESXi host, a firewall rule, an NVR that stopped recording and a laptop that won't boot. Prioritising by business impact matters as much as technical depth.",
      },
    ],
    progress: [
      {
        label: "Ongoing",
        tone: "live",
        items: ["Server, virtualisation and storage operations", "Firewall, VPN and network operations", "CCTV / NVR and end-user support"],
      },
    ],
    outcomes: [
      "Servers, network and CCTV kept running through hardware failures by replacing disks and rebuilding systems.",
      "Built gkllc.mn, the company website whose job listings come straight from the ERP, with CV uploads that land in Odoo HR.",
    ],
    outcomesNote:
      "This is internal infrastructure. I don't publish uptime, incident or cost figures, because I can't share the data behind them.",
    links: [{ href: "https://www.gkllc.mn", label: "gkllc.mn: company website (ERP-connected job listings)" }],
    screenshots: [],
  },
];

/* ------------------------------------------------------------------ */
/* Other work                                                          */
/* ------------------------------------------------------------------ */

export const otherWork: { name: string; kind: string; text: string; stack: string[]; links: { href: string; label: string }[] }[] = [
  {
    name: "Manlai Trading",
    kind: "Client project · Car import platform",
    text: "Built for a client importing used cars from Korea to Mongolia: search by brand, model, year, fuel and price, listings with inspection history, prices in won and tögrög from a timestamped exchange rate, an import cost calculator and customer accounts with favourites. Source code is private.",
    stack: ["Next.js", "Vercel", "MN / EN"],
    links: [{ href: "https://manlaitrading.com", label: "manlaitrading.com" }],
  },
  {
    name: "gkllc.mn",
    kind: "Corporate website",
    text: "Company site whose job listings are published straight from the ERP. Applicants' CVs land in Odoo HR through a custom jobs API.",
    stack: ["React", "Vite", "Odoo API"],
    links: [{ href: "https://www.gkllc.mn", label: "gkllc.mn" }],
  },
  {
    name: "Paul's Home Repair",
    kind: "Small business site",
    text: "Bilingual service site with a booking calendar, chat assistant and an admin dashboard for schedule and availability.",
    stack: ["Next.js", "Upstash Redis", "Vercel"],
    links: [
      { href: "https://paulshome-pi.vercel.app", label: "Live site" },
    ],
  },
  {
    name: "JK Mechanic Shop",
    kind: "Website + mobile app",
    text: "Site for an independent 4x4 and truck workshop in Gachuurt (services, parts import and storage), with a companion Expo mobile app.",
    stack: ["React", "Expo", "React Native"],
    links: [
      { href: "https://jkmechanic.vercel.app", label: "Live site" },
    ],
  },
  {
    name: "Travel Safety Form",
    kind: "Internal tool",
    text: "Signed travel-safety form for staff that emails itself to IT and admin through company SMTP, with the signature embedded. Replaced a paper process.",
    stack: ["React", "Serverless", "SMTP"],
    links: [],
  },
];

/* ------------------------------------------------------------------ */
/* Experience, skills, about                                           */
/* ------------------------------------------------------------------ */

export const experience = [
  {
    company: employer.name,
    role: "System Engineer & IT Manager",
    period: "Apr 2026 to present",
    context: "Group of about 11 related companies · Ulaanbaatar",
    bullets: [
      "Responsible for infrastructure, networking, security, virtualisation, ERP and end-user IT across the group.",
      "Run Dell PowerEdge R740 / R750 servers on VMware ESXi: disk replacement, OS reinstalls, host health.",
      "Manage Check Point firewall and Remote Access VPN, NAT, routing, Grandstream GWN.Cloud Wi-Fi, IP telephony and NVR camera systems.",
      "Leading the in-progress migration of the group ERP from Odoo 13 to Odoo 19 Community.",
      "Built gkllc.mn with ERP-connected job listings, plus internal tools that replace paper processes.",
    ],
  },
  {
    company: "KFC / Tavan Bogd Foods LLC",
    role: "IT Specialist: infrastructure, kiosk, POS",
    period: "Mar 2025 to Mar 2026",
    context: "Multi-branch restaurant network",
    bullets: [
      "Kept the branch servers, POS terminals, self-service kiosks and back-office systems running across the restaurant network.",
      "Set up Macromatix, the back-office system for inventory, ordering and reporting, from the start: initial data import, configuration and user accounts. Then ran it, fixing data and report problems.",
      "Supported r_keeper POS across the branches.",
      "Installed and configured new CCTV cameras, and reset and restored NVR recorders when recording failed.",
      "Resolved hardware, software and connectivity issues during live service, when every minute of downtime is visible.",
    ],
  },
  {
    company: "Ayenix LTD",
    role: "IT Specialist",
    period: "Nov 2024 to Mar 2025",
    context: "Short-term role · 5 months",
    bullets: [
      "Helped set up the company's new server and brought 100+ computers onto it.",
      "Handled day-to-day technical support for staff.",
      "Designed the company website, tredero-ai.com (no longer online).",
    ],
  },
  {
    company: "Bayan-Airag Exploration LLC",
    role: "IT Support",
    period: "2022 to 2024",
    context: "Mining exploration, remote site",
    bullets: [
      "Supported users, endpoints and the network in a remote mining operation.",
      "Where I learned hands-on troubleshooting with limited connectivity and no one to escalate to on site.",
    ],
  },
];

export const skills: { group: string; context: string; items: string[] }[] = [
  {
    group: "Infrastructure & virtualisation",
    context: "Used daily in production",
    items: ["Dell PowerEdge R740 / R750", "VMware ESXi", "Windows Server", "Ubuntu Linux", "Disk replacement & OS rebuilds", "NVR / CCTV"],
  },
  {
    group: "Networking & security",
    context: "Used daily in production",
    items: ["Check Point firewall", "Remote Access VPN", "NAT & routing", "TCP/IP · DNS · DHCP", "Grandstream GWN.Cloud", "nginx · UFW · TLS", "Nmap · Wireshark"],
  },
  {
    group: "ERP, data & backend",
    context: "Odoo migration and integrations",
    items: ["Odoo 13 / 19 Community", "Python", "FastAPI", "XML views / QWeb", "OWL", "PostgreSQL", "Alembic", "REST APIs"],
  },
  {
    group: "Software & automation",
    context: "InfraScope, ITCore and client projects",
    items: ["Docker Compose", "GitHub Actions CI", "TypeScript", "Go", "React", "Next.js", "Node.js", "Cloudflare Workers", "Electron", "Git / GitLab", "PowerShell", "Bash"],
  },
  {
    group: "IT operations & support",
    context: "Every role so far",
    items: ["Incident troubleshooting", "Windows endpoints", "r_keeper POS", "Macromatix", "Self-service kiosks", "Microsoft 365 / Outlook", "Printers & IP telephony"],
  },
];

export const about = {
  paragraphs: [
    "I started in IT support at a mining exploration company, at a remote site where there was nobody to escalate to. If something broke, I had to work it out myself. That's still the habit I rely on most.",
    "From there I supported POS terminals and self-service kiosks across a KFC restaurant network, where downtime happens in front of customers. Now I'm System Engineer and IT Manager for a group of about 11 related companies. I handle everything from Dell PowerEdge servers and Check Point VPN to the camera system and the laptop that won't boot.",
    "I also write software when there's a gap no tool fills. ITCore came out of my own support work. The company website pulls job listings straight from the ERP. Right now most of my engineering time goes into moving that ERP from Odoo 13 to Odoo 19.",
    "I'm looking for systems, infrastructure, IT operations or DevOps-adjacent roles with an international team, either remote or with relocation.",
  ],
  facts: [
    { label: "Based in", value: "Ulaanbaatar, Mongolia" },
    { label: "Current role", value: "System Engineer & IT Manager" },
    { label: "Languages", value: "Mongolian (native) · English" },
    { label: "Education", value: "Computer Science studies, Mongolian International University (4 years)" },
    { label: "Work", value: "Remote, or relocation with sponsorship" },
  ],
};
