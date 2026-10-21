// All portfolio content lives here. Every visible sentence has an English (en)
// and Mongolian (mn) version so the language switch changes the whole page.

export type Lang = "en" | "mn";
export type Text = Record<Lang, string>;

export const profile = {
  name: "Dolgion",
  fullName: "O. Dolgion",
  email: "odolgion222@gmail.com",
  phone: "+976 8909 0126",
  github: "https://github.com/PiggyDan",
  linkedin: "",
  site: "https://daniel70.netlify.app",
  headline: { en: "IT Infrastructure & Systems Engineer", mn: "IT дэд бүтэц ба системийн инженер" } as Text,
  specializations: ["Windows & Linux Administration", "Networking", "Virtualization", "ERP Operations"],
  // The Resume button downloads the PDF that matches the selected language.
  resume: { en: "/Dolgion_Oldokh_Resume_2026.pdf", mn: "/Dolgion_Oldokh_Resume_2026_MN.pdf" } as Text,
  location: { en: "Ulaanbaatar, Mongolia", mn: "Улаанбаатар, Монгол" } as Text,
  availability: {
    en: "Open to international roles — remote or with relocation",
    mn: "Олон улсын ажилд нээлттэй — зайнаас эсвэл нүүж очиж",
  } as Text,
};

// One spelling for the employer everywhere on the page.
export const employer = { name: "Govikhangai Khudulmur LLC", site: "https://www.gkllc.mn", host: "gkllc.mn" };

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    {
      en: "I'm an IT infrastructure and systems engineer based in Ulaanbaatar, Mongolia. My current role combines System Engineer and IT Manager responsibilities for a group of about 11 related companies: servers, virtualization, networks, firewalls, CCTV, end-user support and the group's Odoo ERP.",
      mn: "Би Улаанбаатарт ажилладаг IT дэд бүтэц, системийн инженер. Одоогийн ажилдаа Систем инженер болон IT менежерийн үүргийг хослуулан ~11 компанийн сервер, виртуалчлал, сүлжээ, firewall, камер, хэрэглэгчийн дэмжлэг, Odoo ERP-г хариуцдаг.",
    },
    {
      en: "Before that I supported POS terminals, self-service kiosks and back-office systems across a multi-branch KFC restaurant network, and worked in IT support for a remote mining exploration company. That mix taught me to troubleshoot under pressure and to fix the cause, not just the symptom.",
      mn: "Өмнө нь олон салбартай KFC рестораны POS, өөрөө үйлчлэх киоск, оффисын системийг дэмжиж, алслагдсан хайгуулын компанид IT дэмжлэгээр ажилласан. Энэ туршлага дарамттай үед асуудлыг шалтгаанаас нь шийдэж сургасан.",
    },
    {
      en: "Right now I'm leading the migration of the group's ERP from Odoo 13 to Odoo 19 Community — the project documented below.",
      mn: "Одоо группийн ERP-г Odoo 13-аас Odoo 19 Community руу шилжүүлэх ажлыг удирдаж байна — доорх кейс судалгаанд дэлгэрэнгүй бий.",
    },
  ] as Text[],
  facts: [
    { label: { en: "Based in", mn: "Байршил" } as Text, value: { en: "Ulaanbaatar, Mongolia", mn: "Улаанбаатар, Монгол" } as Text },
    { label: { en: "Current role", mn: "Одоогийн ажил" } as Text, value: { en: "System Engineer & IT Manager", mn: "Систем инженер ба IT менежер" } as Text },
    { label: { en: "Focus", mn: "Чиглэл" } as Text, value: { en: "Infrastructure · Linux · ERP operations", mn: "Дэд бүтэц · Linux · ERP ажиллагаа" } as Text },
    { label: { en: "Languages", mn: "Хэл" } as Text, value: { en: "Mongolian (native) · English", mn: "Монгол (төрөлх) · Англи" } as Text },
  ],
  targetRoles: [
    "IT Infrastructure Engineer",
    "Systems Administrator",
    "Linux Systems Administrator",
    "IT Support Engineer",
    "Technical Support Engineer",
    "ERP Technical Support Engineer",
    "Junior Cloud / DevOps Engineer",
  ],
};

/* ------------------------------------------------------------------ */
/* IT Core — the flagship product                                      */
/* ------------------------------------------------------------------ */

export const itcore = {
  site: "https://itcore.dev",
  app: "https://sup.itcore.dev",
  name: "IT Core",
  tagline: {
    en: "Every IT request, handled in one place.",
    mn: "IT-н бүх хүсэлт нэг дор шийдэгдэнэ.",
  } as Text,
  pitch: {
    en: "IT Core is a multi-company IT help desk and device-inventory platform I designed, built and run end to end. Staff ask IT for help from a Windows app, a phone or a browser; IT teams get tickets, chat, live PC health, announcements and reports in one place.",
    mn: "IT Core бол миний бүтээж, хөгжүүлж, ажиллуулж буй олон компанид зориулсан IT тусламжийн төв ба төхөөрөмжийн бүртгэлийн платформ. Ажилтнууд Windows апп, утас эсвэл хөтчөөс IT-гаас тусламж хүсдэг; IT баг тикет, чат, компьютерын төлөв, зарлал, тайлангаа нэг дороос удирддаг.",
  } as Text,
  links: [
    {
      href: "https://itcore.dev",
      label: "itcore.dev",
      note: { en: "Product website, pricing & downloads", mn: "Бүтээгдэхүүний вэб, үнэ, татах" } as Text,
    },
    {
      href: "https://sup.itcore.dev",
      label: "sup.itcore.dev",
      note: { en: "The live help desk app", mn: "Ажиллаж буй тусламжийн төв апп" } as Text,
    },
  ],
  stats: [
    { value: "3", label: { en: "Languages — MN · EN · 中文", mn: "Хэл — MN · EN · 中文" } as Text },
    { value: "15 min", label: { en: "PC health check-ins", mn: "Компьютер мэдээлэл илгээх давтамж" } as Text },
    { value: "90+", label: { en: "Releases shipped in 4 weeks", mn: "4 долоо хоногт гаргасан шинэчлэл" } as Text },
    { value: "$35", label: { en: "Plans from / month", mn: "Сарын багц эхлэх үнэ" } as Text },
  ],
  features: [
    {
      icon: "ticket",
      title: { en: "Tickets", mn: "Тикет" } as Text,
      text: {
        en: "Status, priority, assignment, comments and attachments with previews — no request gets lost.",
        mn: "Төлөв, зэрэглэл, хариуцагч, сэтгэгдэл, хавсралт — нэг ч хүсэлт алдагдахгүй.",
      } as Text,
    },
    {
      icon: "chat",
      title: { en: "Chat & announcements", mn: "Чат ба зарлал" } as Text,
      text: {
        en: "Messenger-style chat, group chats, and admin announcements that pop up on every PC with read receipts.",
        mn: "Messenger шиг чат, групп чат, бүх компьютер дээр гарч ирэх уншсан тэмдэгтэй зарлал.",
      } as Text,
    },
    {
      icon: "monitor",
      title: { en: "ITCore Sentinel agent", mn: "ITCore Sentinel агент" } as Text,
      text: {
        en: "A Windows monitoring agent enrolls each PC with a token and reports health telemetry — telemetry only, never remote commands.",
        mn: "Windows агент компьютер бүрийг токеноор бүртгэж, төлөвийн мэдээлэл илгээнэ — зөвхөн мэдээлэл, алсаас тушаал хэзээ ч өгөхгүй.",
      } as Text,
    },
    {
      icon: "download",
      title: { en: "Self-updating desktop app", mn: "Өөрөө шинэчлэгддэг десктоп апп" } as Text,
      text: {
        en: "Electron app in the tray with a Call-IT button that works offline, installed from a USB kit in a minute.",
        mn: "Интернэтгүй үед ч ажиллах «IT руу залгах» товчтой, флашаас нэг минутад суудаг Electron апп.",
      } as Text,
    },
    {
      icon: "shield",
      title: { en: "Secure multi-tenant core", mn: "Аюулгүй олон компанийн бүтэц" } as Text,
      text: {
        en: "Company isolation, 4 roles, scrypt hashing, HttpOnly sessions, CSRF checks and login rate limits — covered by tests.",
        mn: "Компани бүр тусдаа, 4 эрх, scrypt нууц үг, HttpOnly сешн, CSRF хамгаалалт, нэвтрэх хязгаар — тестээр баталгаажсан.",
      } as Text,
    },
    {
      icon: "chart",
      title: { en: "Reports & billing", mn: "Тайлан ба нэхэмжлэл" } as Text,
      text: {
        en: "First-reply and resolve times per technician, plus automatic invoices in USD, MNT and CNY from today's rate.",
        mn: "IT ажилтан бүрийн хариу өгөх, шийдвэрлэх хугацаа, мөн USD, MNT, CNY-ээр автомат нэхэмжлэл.",
      } as Text,
    },
  ],
  stack: ["React", "Vite", "Cloudflare Workers", "Neon PostgreSQL", "R2", "Electron", "Node.js", "i18n"],
  architecture: [
    { en: "Windows app + Sentinel", mn: "Windows апп + Sentinel" },
    { en: "itcore.dev / sup.itcore.dev", mn: "itcore.dev / sup.itcore.dev" },
    { en: "Cloudflare Worker API", mn: "Cloudflare Worker API" },
    { en: "PostgreSQL (Neon)", mn: "PostgreSQL (Neon)" },
  ] as Text[],
};

/* ------------------------------------------------------------------ */
/* System Engineer — the hands-on day job                              */
/* ------------------------------------------------------------------ */

export const systems = {
  title: {
    en: "The servers, cameras, networks and PCs that ~11 companies run on — I keep them up.",
    mn: "~11 компанийн ашигладаг сервер, камер, сүлжээ, компьютерыг тасралтгүй ажиллуулдаг.",
  } as Text,
  summary: {
    en: "As System Engineer I'm the person who gets called when anything with a power cable stops working — and the one who makes sure it doesn't happen again. Server room to front desk, it's my responsibility.",
    mn: "Систем инженерийн хувьд цахилгааны утастай аливаа зүйл ажиллахаа болиход над руу залгадаг — дахин давтагдахгүй байхыг ч би хариуцдаг. Серверийн өрөөнөөс эхлээд хүлээн авах хүртэл.",
  } as Text,
  areas: [
    {
      icon: "server",
      title: { en: "Servers — Dell PowerEdge", mn: "Сервер — Dell PowerEdge" } as Text,
      text: {
        en: "Keep the Dell PowerEdge R740 / R750 fleet safe and healthy: replace and reinstall SSDs and HDDs, reinstall operating systems, run VMware ESXi hosts and watch uptime.",
        mn: "Dell PowerEdge R740 / R750 серверүүдийг аюулгүй, хэвийн ажиллуулна: SSD, HDD солих, дахин суулгах, үйлдлийн систем суулгах, VMware ESXi host ажиллуулах, тасралтгүй байдлыг хянах.",
      } as Text,
      tags: ["Dell R740", "Dell R750", "SSD / HDD", "VMware ESXi", "Windows Server", "Linux"],
    },
    {
      icon: "cctv",
      title: { en: "CCTV & NVR cameras", mn: "CCTV ба NVR камер" } as Text,
      text: {
        en: "Install, configure and maintain NVR camera systems across sites — keeping recording, storage and remote viewing working around the clock.",
        mn: "Салбаруудын NVR камерын системийг суурилуулж, тохируулж, засварлана — бичлэг, хадгалалт, алсаас харах боломжийг 24/7 ажиллуулна.",
      } as Text,
      tags: ["NVR", "IP cameras", "Recording", "Remote view"],
    },
    {
      icon: "network",
      title: { en: "Network services up & running", mn: "Сүлжээг тасралтгүй ажиллуулах" } as Text,
      text: {
        en: "Keep the network alive for every company: Check Point firewall, VPN, NAT, routing, Grandstream GWN Wi-Fi and switches managed through GWN.Cloud, printers and IP telephony.",
        mn: "Компани бүрийн сүлжээг тасралтгүй ажиллуулна: Check Point firewall, VPN, NAT, routing, GWN.Cloud-оор удирддаг Grandstream GWN Wi-Fi ба свитч, принтер, IP утас.",
      } as Text,
      tags: ["Check Point", "Grandstream GWN", "GWN.Cloud", "VPN · NAT", "Wi-Fi", "Switching", "IP phones"],
    },
    {
      icon: "wrench",
      title: { en: "Hands-on IT support", mn: "Бүх төрлийн IT дэмжлэг" } as Text,
      text: {
        en: "Every kind of support, from formatting and reinstalling Windows to rebuilding PCs and swapping hardware — plus accounts, email, printers and whatever else breaks.",
        mn: "Компьютер форматлах, Windows суулгахаас эхлээд компьютер дахин угсрах, эд анги солих хүртэл — мөн аккаунт, и-мэйл, принтер гээд эвдэрсэн бүхнийг.",
      } as Text,
      tags: ["Format & reinstall", "PC rebuilds", "Hardware", "Windows", "Office / Outlook"],
    },
  ],
  rack: [
    { name: "PowerEdge R750", role: { en: "Production server", mn: "Production сервер" } as Text },
    { name: "PowerEdge R740", role: { en: "Production server", mn: "Production сервер" } as Text },
    { name: "NVR", role: { en: "CCTV recording", mn: "Камерын бичлэг" } as Text },
    { name: "Check Point", role: { en: "Firewall / VPN", mn: "Firewall / VPN" } as Text },
    { name: "Grandstream GWN", role: { en: "Wi-Fi · GWN.Cloud", mn: "Wi-Fi · GWN.Cloud" } as Text },
    { name: "Core switch", role: { en: "Network", mn: "Сүлжээ" } as Text },
  ],
};

/* ------------------------------------------------------------------ */
/* ERP 19 — Odoo 13 → Odoo 19 migration                                */
/* ------------------------------------------------------------------ */

// Everything here is taken from the migration report (MIGRATION-ODOO19.md) and the
// module repository. The project is IN PROGRESS: never describe it as completed.
export type PhaseStatus = "done" | "active" | "planned";

export const erp = {
  name: { en: "Enterprise ERP Modernization — Odoo 13 to Odoo 19 Community", mn: "ERP шинэчлэл — Odoo 13-аас Odoo 19 Community руу" } as Text,
  title: {
    en: "Moving a heavily customized group ERP from Odoo 13 to Odoo 19 Community",
    mn: "Ихээхэн өөрчилсөн группийн ERP-г Odoo 13-аас Odoo 19 Community руу шилжүүлэх",
  } as Text,
  summary: {
    en: "The company group runs accounting, inventory, HR, payroll, transport and maintenance on a customized Odoo 13 Community system. I'm migrating it to Odoo 19 Community: auditing every module, porting the custom code, and validating it on separate test databases before any production cutover.",
    mn: "Компаниудын групп санхүү, агуулах, хүний нөөц, цалин, тээвэр, засварын ажлаа өөрчилсөн Odoo 13 Community систем дээр явуулдаг. Би үүнийг Odoo 19 Community руу шилжүүлж байна: модуль бүрийг шинжилж, өөрийн кодыг шилжүүлж, production руу шилжихээс өмнө тусдаа тест өгөгдлийн сан дээр шалгаж байна.",
  } as Text,
  meta: [
    { label: { en: "Company", mn: "Байгууллага" } as Text, value: { en: employer.name, mn: "Говьхангай Хөдөлмөр ХХК" } as Text },
    { label: { en: "My role", mn: "Миний үүрэг" } as Text, value: { en: "System Engineer & IT Manager — migration lead", mn: "Систем инженер ба IT менежер — шилжүүлэлтийг удирдагч" } as Text },
    { label: { en: "Scope", mn: "Хамрах хүрээ" } as Text, value: { en: "Accounting · Inventory · HR · Payroll · Transport · Maintenance", mn: "Санхүү · Агуулах · Хүний нөөц · Цалин · Тээвэр · Засвар" } as Text },
    { label: { en: "Status", mn: "Төлөв" } as Text, value: { en: "In progress — Odoo 13 is still the live system", mn: "Хийгдэж байна — Odoo 13 одоо ч ажиллаж байгаа систем" } as Text },
  ],
  screenshots: {
    before: {
      label: { en: "Odoo 13 — Existing ERP", mn: "Odoo 13 — Одоогийн ERP" } as Text,
      caption: {
        en: "The current Odoo 13 Community environment the group runs on today.",
        mn: "Группийн өнөөдөр ашиглаж буй Odoo 13 Community орчин.",
      } as Text,
      alt: "Screenshot of the existing Odoo 13 Community ERP home screen",
    },
    after: {
      label: { en: "Odoo 19 — Migration / Test Environment", mn: "Odoo 19 — Шилжүүлэлтийн / тест орчин" } as Text,
      caption: {
        en: "The Odoo 19 Community test server with migrated modules installed and the branded GKK / TKMI home screen. Browser address bar removed for privacy.",
        mn: "Шилжүүлсэн модулиуд суусан, GKK / TKMI брэндийн нүүр дэлгэцтэй Odoo 19 Community тест сервер. Нууцлалын үүднээс хөтчийн хаягийн мөрийг хассан.",
      } as Text,
      alt: "Screenshot of the Odoo 19 Community test environment home screen with Mongolian app menu",
    },
    note: {
      en: "A new home screen is not proof of a successful migration. The real evidence is the module installs and runtime tests on the test databases, described below.",
      mn: "Шинэ нүүр дэлгэц нь шилжүүлэлт амжилттай болсны баталгаа биш. Бодит нотолгоо нь тест өгөгдлийн сан дээрх модулийн суулгалт ба ажиллагааны тестүүд — доор тайлбарлав.",
    } as Text,
  },
  // Measured during the audit — inputs to the project, not outcomes.
  stats: [
    { value: "375", label: { en: "Module manifests audited", mn: "Шинжилсэн модулийн manifest" } as Text },
    { value: "46", label: { en: "Third-party modules in the dependency chain", mn: "Хамаарлын гинжин дэх гуравдагч модуль" } as Text },
    { value: "225k", label: { en: "Lines of Python, XML and JS in that chain", mn: "Тэр гинжин дэх Python, XML, JS мөр" } as Text },
    { value: "6", label: { en: "Enterprise-only modules to replace", mn: "Солих шаардлагатай Enterprise модуль" } as Text },
  ],
  areas: [
    "Ubuntu Linux server administration",
    "VMware ESXi virtualization",
    "PostgreSQL backup & migration planning",
    "Odoo custom-module migration",
    "Python development & debugging",
    "ERP infrastructure & deployment",
    "Accounting & inventory workflows",
    "Data integrity & validation planning",
    "Backup & rollback procedures",
    "Testing & troubleshooting",
  ],
  phases: [
    {
      status: "done" as PhaseStatus,
      title: { en: "Audit & dependency mapping", mn: "Шинжилгээ ба хамаарлын зураглал" } as Text,
      text: {
        en: "Audited 375 module manifests and traced which of them the custom modules actually depend on: 46 third-party modules (~225,000 lines). The other 317 are unused and stay behind. Documented every Odoo 13 → 19 incompatibility in a written migration report.",
        mn: "375 модулийн manifest-ийг шинжилж, өөрийн модулиуд аль модулиас хамаардгийг тогтоосон: 46 гуравдагч модуль (~225,000 мөр). Үлдсэн 317 нь ашиглагддаггүй. Odoo 13 → 19 үл нийцлийг шилжүүлэлтийн тайланд бүртгэсэн.",
      } as Text,
    },
    {
      status: "active" as PhaseStatus,
      title: { en: "Port & validate modules locally", mn: "Модулийг шилжүүлж, локалд шалгах" } as Text,
      text: {
        en: "Porting module by module against the real Odoo 19 source: view and model API changes, hr.contract → hr.version, removed stock models, and legacy JavaScript widgets that no longer load. Each module is installed into a throw-away Odoo 19 database and its main flows are runtime-tested.",
        mn: "Модуль бүрийг Odoo 19-ийн жинхэнэ эх код дээр шилжүүлж байна: view, model API-ийн өөрчлөлт, hr.contract → hr.version, хасагдсан агуулахын model, ачаалагдахгүй болсон хуучин JavaScript widget. Модуль бүрийг түр Odoo 19 өгөгдлийн санд суулгаж, үндсэн урсгалыг тестэлдэг.",
      } as Text,
    },
    {
      status: "active" as PhaseStatus,
      title: { en: "Test server & test databases", mn: "Тест сервер ба тест өгөгдлийн сан" } as Text,
      text: {
        en: "Odoo 19 runs on a separate Ubuntu 24.04 test server, with a dedicated PostgreSQL 16 test database server. Module bundles are installed onto copied test databases — never onto production — and server-only issues are logged and fixed.",
        mn: "Odoo 19 нь тусдаа Ubuntu 24.04 тест сервер дээр, тусгай PostgreSQL 16 тест өгөгдлийн сангийн сервертэй ажилладаг. Модулийн багцуудыг production биш, хуулбарласан тест өгөгдлийн санд суулгаж, зөвхөн сервер дээр гарсан алдааг бүртгэж засдаг.",
      } as Text,
    },
    {
      status: "planned" as PhaseStatus,
      title: { en: "Data validation & parallel checks", mn: "Өгөгдөл шалгах ба зэрэгцүүлэн харьцуулах" } as Text,
      text: {
        en: "Before go-live: run a full payroll month on migrated data and compare every line with Odoo 13, configure stock valuation accounts and reconcile a month of inventory, and have key users check their workflows.",
        mn: "Нэвтрүүлэхээс өмнө: шилжүүлсэн өгөгдөл дээр нэг сарын цалинг бодож Odoo 13-тай мөр бүрээр харьцуулах, агуулахын үнэлгээний данс тохируулж нэг сарын бараа тулгах, гол хэрэглэгчдээр ажлын урсгалаа шалгуулах.",
      } as Text,
    },
    {
      status: "planned" as PhaseStatus,
      title: { en: "Cutover with backup & rollback", mn: "Backup ба буцаах төлөвлөгөөтэй шилжилт" } as Text,
      text: {
        en: "Full PostgreSQL dump and filestore backup of Odoo 13, a documented rollback path, then the production data migration and switchover.",
        mn: "Odoo 13-ийн PostgreSQL болон filestore-ийн бүрэн backup, баримтжуулсан буцаах зам, дараа нь production өгөгдлийн шилжүүлэлт ба шилжилт.",
      } as Text,
    },
  ],
  challenges: [
    {
      title: { en: "Enterprise code in a Community target", mn: "Community руу шилжихэд Enterprise код" } as Text,
      text: {
        en: "Six modules in the chain were Odoo Enterprise source (accounting reports, assets, budgets, Gantt, grid). They can't be used in Odoo 19 Community, and through the asset module they blocked transport, technic, stock, timetable and salary. They have to be replaced with Community/OCA alternatives or rewritten.",
        mn: "Гинжин дэх зургаан модуль Odoo Enterprise код байсан (санхүүгийн тайлан, хөрөнгө, төсөв, Gantt, grid). Тэдгээрийг Odoo 19 Community-д ашиглах боломжгүй бөгөөд хөрөнгийн модулиар дамжин тээвэр, техник, агуулах, цагийн хуваарь, цалинг хааж байсан. Community/OCA хувилбараар солих эсвэл дахин бичих шаардлагатай.",
      } as Text,
    },
    {
      title: { en: "HR contracts became versions", mn: "HR гэрээ → хувилбар" } as Text,
      text: {
        en: "Odoo 19 merges hr.contract into hr.version, so every HR, timetable and payroll module that read contracts — including raw SQL reports — has to be re-pointed. Payroll is flagged for human verification against Odoo 13.",
        mn: "Odoo 19 нь hr.contract-ийг hr.version-д нэгтгэсэн тул гэрээ уншдаг HR, цагийн хуваарь, цалингийн модуль бүрийг, тэр дундаа SQL тайлангуудыг дахин холбох шаардлагатай. Цалинг Odoo 13-тай хүнээр тулгаж шалгахаар тэмдэглэсэн.",
      } as Text,
    },
    {
      title: { en: "Legacy JavaScript", mn: "Хуучин JavaScript" } as Text,
      text: {
        en: "All Odoo 13 widgets use the old odoo.define / Widget API that was removed in Odoo 17. They were taken out of the asset bundles so views fall back to standard widgets; anything still needed gets rewritten in OWL.",
        mn: "Odoo 13-ийн бүх widget Odoo 17-д хасагдсан odoo.define / Widget API ашигладаг. Тэдгээрийг asset bundle-аас хасч, view-үүд стандарт widget ашиглана; хэрэгтэй хэсгийг OWL-оор дахин бичнэ.",
      } as Text,
    },
    {
      title: { en: "Server-only failures", mn: "Зөвхөн сервер дээр гарах алдаа" } as Text,
      text: {
        en: "Some bugs only appeared on the test server because modules were installed in a different order than locally — one blanked the whole web client. Each was traced, fixed and recorded in the deployment log.",
        mn: "Зарим алдаа модулийг локалаас өөр дарааллаар суулгасан тул зөвхөн тест сервер дээр гарсан — нэг нь вэб клиентийг бүхэлд нь хоосон болгосон. Тус бүрийг олж, засаж, deployment log-д бүртгэсэн.",
      } as Text,
    },
  ],
  modules: ["gkk_hr", "gkk_timetable", "gkk_salary", "gkk_account", "gkk_stock", "gkk_trans", "gkk_maintenance", "gkk_technic", "gkk_purchase_and_request", "gkk_document", "gkk_camp_register", "gkk_jobs_api", "gkk_website", "gkk_ui", "mw_spare_parts"],
  stack: ["Odoo 13 / 19 Community", "Python", "PostgreSQL 16", "OWL", "Ubuntu 24.04", "VMware ESXi", "nginx", "Git / GitLab"],
};

/* ------------------------------------------------------------------ */
/* Websites                                                            */
/* ------------------------------------------------------------------ */

export type Site = {
  name: string;
  url?: string;
  host?: string;
  kind: Text;
  text: Text;
  stack: string[];
  accent: string;
};

export const websites: Site[] = [
  {
    name: "IT Core",
    url: "https://itcore.dev",
    host: "itcore.dev",
    kind: { en: "SaaS product", mn: "SaaS бүтээгдэхүүн" },
    text: {
      en: "Marketing site with live pricing in three currencies, plan request form, automatic invoices, website chat and SEO.",
      mn: "Гурван валютын үнэ, багцын хүсэлт, автомат нэхэмжлэл, вэб чат, SEO бүхий бүтээгдэхүүний сайт.",
    },
    stack: ["React", "Cloudflare", "PostgreSQL"],
    accent: "#5ad1ff",
  },
  {
    name: "Govikhangai Khudulmur",
    url: "https://gkllc.mn",
    host: "gkllc.mn",
    kind: { en: "Corporate website", mn: "Байгууллагын вэб" },
    text: {
      en: "Company site whose job listings come straight from the ERP; applicants upload CVs that land in Odoo HR.",
      mn: "Ажлын зар нь ERP-ээс шууд ирдэг, CV нь Odoo HR руу орж ирдэг компанийн вэб сайт.",
    },
    stack: ["React", "Vite", "Odoo API"],
    accent: "#f5b84b",
  },
  {
    name: "Paul's Home Repair",
    url: "https://paulshome-pi.vercel.app",
    host: "paulshome-pi.vercel.app",
    kind: { en: "Small business", mn: "Жижиг бизнес" },
    text: {
      en: "Bilingual service site with a booking calendar, chat assistant and an admin dashboard for schedule and availability.",
      mn: "Цаг захиалгын календарь, чат туслах, хуваарь удирдах админ самбартай хоёр хэлтэй үйлчилгээний сайт.",
    },
    stack: ["Next.js", "Upstash Redis", "Vercel"],
    accent: "#7ee0a1",
  },
  {
    name: "JK Mechanic Shop — Garage 84",
    kind: { en: "Website + mobile app", mn: "Вэб + гар утасны апп" },
    text: {
      en: "Independent 4x4 and truck workshop in Gachuurt: services, parts import and storage — with a companion Expo mobile app.",
      mn: "Гачууртын 4x4, ачааны машины засварын газар: үйлчилгээ, сэлбэг импорт, хадгалалт — Expo гар утасны апптай.",
    },
    stack: ["React", "Expo", "React Native"],
    accent: "#ff7a59",
  },
  {
    name: "Travel Safety Form",
    kind: { en: "Internal tool", mn: "Дотоод хэрэгсэл" },
    text: {
      en: "Signed travel-safety form for staff that emails itself to IT and admin through company SMTP, signature embedded.",
      mn: "Гарын үсэгтэй аяллын аюулгүй байдлын маягт — компанийн SMTP-ээр IT, захиргаа руу автоматаар илгээгддэг.",
    },
    stack: ["React", "Serverless", "SMTP"],
    accent: "#b18cff",
  },
  {
    name: "ERP 19 Portal",
    kind: { en: "ERP front page", mn: "ERP нүүр хуудас" },
    text: {
      en: "Branded GKK / TKMI front page and login screen for the Odoo 19 ERP, replacing the stock Odoo look.",
      mn: "Odoo 19 ERP-д зориулсан GKK / TKMI брэндийн нүүр хуудас, нэвтрэх дэлгэц.",
    },
    stack: ["Odoo 19", "QWeb", "SCSS"],
    accent: "#9fb4ff",
  },
];

/* ------------------------------------------------------------------ */
/* Experience, skills, education                                       */
/* ------------------------------------------------------------------ */

export const experience = [
  {
    company: employer.name,
    role: { en: "System Engineer & IT Manager", mn: "Систем инженер ба IT менежер" } as Text,
    period: "2026 — Now",
    bullets: [
      {
        en: "Own IT for ~11 related companies: Dell PowerEdge R740 / R750 servers, networks, Check Point firewall, Grandstream GWN.Cloud Wi-Fi, VPN, VMware, NVR cameras and IP telephony.",
        mn: "~11 компанийн IT-г хариуцдаг: Dell PowerEdge R740 / R750 сервер, сүлжээ, Check Point firewall, Grandstream GWN.Cloud Wi-Fi, VPN, VMware, NVR камер, IP утас.",
      },
      {
        en: "Replace and reinstall server SSDs and HDDs, format and rebuild PCs, and handle day-to-day support for every user.",
        mn: "Серверийн SSD, HDD солих, дахин суулгах, компьютер форматлах, дахин угсрах, хэрэглэгч бүрийн өдөр тутмын дэмжлэг.",
      },
      {
        en: "Leading the in-progress migration of the group ERP from Odoo 13 to Odoo 19 Community: module audit, porting and validation on a separate Ubuntu test server.",
        mn: "Группийн ERP-г Odoo 13-аас Odoo 19 Community руу шилжүүлэх ажлыг удирдаж байна: модулийн шинжилгээ, шилжүүлэлт, тусдаа Ubuntu тест сервер дээрх шалгалт.",
      },
      {
        en: "Built gkllc.mn with live ERP job listings and internal tools that remove manual paperwork.",
        mn: "ERP-тэй холбогдсон gkllc.mn вэб болон гар ажиллагааг багасгах дотоод хэрэгслүүд хийсэн.",
      },
    ] as Text[],
  },
  {
    company: "KFC / Tavan Bogd Foods LLC",
    role: { en: "IT Specialist · Infrastructure · KIOSK · POS", mn: "IT мэргэжилтэн · Дэд бүтэц · KIOSK · POS" } as Text,
    period: "2025 — 2026",
    bullets: [
      {
        en: "Kept POS, kiosks and back-office systems running across a multi-site restaurant network.",
        mn: "Олон салбартай рестораны POS, киоск, оффисын системийг тасралтгүй ажиллуулсан.",
      },
      {
        en: "Resolved hardware, software and connectivity issues under live-service time pressure.",
        mn: "Үйлчилгээ явагдаж байх үед техник, программ, сүлжээний асуудлыг шуурхай шийдсэн.",
      },
    ] as Text[],
  },
  {
    company: "Bayan-Airag Exploration LLC",
    role: { en: "IT Support", mn: "IT дэмжлэг" } as Text,
    period: "2022 — 2025",
    bullets: [
      {
        en: "Supported users, endpoints and network in a remote mining operation.",
        mn: "Алслагдсан уурхайн орчинд хэрэглэгч, компьютер, сүлжээг дэмжсэн.",
      },
      {
        en: "Built the hands-on troubleshooting foundation everything else grew from.",
        mn: "Бусад бүх ур чадварын суурь болсон практик туршлага хуримтлуулсан.",
      },
    ] as Text[],
  },
];

export const skills: { group: Text; items: string[] }[] = [
  {
    group: { en: "Systems & Virtualization", mn: "Систем ба виртуалчлал" },
    items: ["Windows / Windows Server", "Ubuntu Linux", "VMware ESXi", "Dell PowerEdge R740 / R750", "SSD / HDD replacement", "NVR / CCTV"],
  },
  {
    group: { en: "Networking & Security", mn: "Сүлжээ ба аюулгүй байдал" },
    items: ["Check Point", "VPN · NAT · Routing", "TCP/IP · DNS · DHCP", "Grandstream GWN.Cloud", "nginx", "UFW · TLS"],
  },
  {
    group: { en: "ERP & Data", mn: "ERP ба өгөгдөл" },
    items: ["Odoo 13 → 19", "Python", "PostgreSQL", "REST APIs", "Git / GitLab"],
  },
  {
    group: { en: "Web & Tooling", mn: "Вэб ба хэрэгсэл" },
    items: ["React", "Next.js", "TypeScript", "Vite", "Node.js", "Prisma", "Electron", "Expo", "Cloudflare Workers", "Vercel"],
  },
];

export const education: { title: Text; detail: Text } = {
  title: { en: "Computer Science — Mongolian International University", mn: "Компьютерын ухаан — Монголын Олон Улсын Их Сургууль" },
  detail: { en: "University studies — 4 years", mn: "Их сургууль — 4 жил" },
};
