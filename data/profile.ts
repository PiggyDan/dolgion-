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
  // The Resume button downloads the PDF that matches the selected language.
  resume: { en: "/Dolgion_Oldokh_Resume_2026.pdf", mn: "/Dolgion_Oldokh_Resume_2026_MN.pdf" } as Text,
  location: { en: "Ulaanbaatar, Mongolia", mn: "Улаанбаатар, Монгол" } as Text,
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

export const erp = {
  title: { en: "ERP 19 — moving a live group ERP from Odoo 13 to Odoo 19", mn: "ERP 19 — группийн ERP-г Odoo 13-аас Odoo 19 руу шилжүүлэлт" } as Text,
  summary: {
    en: "The company group ran five years of operations on a heavily customized Odoo 13. I audited every module, mapped the dependency chain, ported the custom modules to Odoo 19 Community and stood up a hardened production server — then connected it to the public website.",
    mn: "Компаниудын групп таван жил тусгайлан өөрчилсөн Odoo 13 дээр ажилласан. Би модуль бүрийг шинжилж, хамаарлын гинжийг зурж, өөрийн модулиудыг Odoo 19 Community руу шилжүүлж, хамгаалалттай production сервер босгоод, олон нийтийн вэбтэй холбосон.",
  } as Text,
  stats: [
    { value: "375", label: { en: "Module manifests audited", mn: "Шинжилсэн модуль" } as Text },
    { value: "225k", label: { en: "Lines in the dependency chain", mn: "Хамаарлын гинжин дэх мөр код" } as Text },
    { value: "15", label: { en: "Custom GKK modules", mn: "GKK өөрийн модуль" } as Text },
    { value: "1,100+", label: { en: "Commits of history carried over", mn: "Шилжүүлсэн commit түүх" } as Text },
  ],
  steps: [
    {
      title: { en: "Audit", mn: "Шинжилгээ" } as Text,
      text: {
        en: "Mapped 375 manifests, found the 46 third-party modules actually in use and flagged Enterprise-only code and removed APIs.",
        mn: "375 модулийг шинжилж, бодитоор ашиглагдаж буй 46 гуравдагч модуль, Enterprise код, хасагдсан API-г тодорхойлсон.",
      } as Text,
    },
    {
      title: { en: "Port", mn: "Шилжүүлэлт" } as Text,
      text: {
        en: "Rewrote views, models and legacy JS widgets for Odoo 19 — HR, timetable, salary, stock, transport, accounting and maintenance.",
        mn: "HR, цагийн хуваарь, цалин, агуулах, тээвэр, санхүү, засварын модулиудыг Odoo 19-д тааруулж дахин бичсэн.",
      } as Text,
    },
    {
      title: { en: "Harden & deploy", mn: "Хамгаалж нэвтрүүлэх" } as Text,
      text: {
        en: "Ubuntu 24.04 server with nginx reverse proxy, UFW firewall, Let's Encrypt TLS and a scripted hardening playbook.",
        mn: "Ubuntu 24.04, nginx reverse proxy, UFW firewall, Let's Encrypt TLS болон автомат хамгаалалтын скрипт.",
      } as Text,
    },
    {
      title: { en: "Integrate", mn: "Холболт" } as Text,
      text: {
        en: "Custom branded login and home screen, plus a jobs API that publishes vacancies to gkllc.mn and receives CV uploads.",
        mn: "Брэндийн нэвтрэх болон нүүр дэлгэц, gkllc.mn руу ажлын зар нийтэлж CV хүлээн авах jobs API.",
      } as Text,
    },
  ],
  modules: ["gkk_hr", "gkk_timetable", "gkk_salary", "gkk_account", "gkk_stock", "gkk_trans", "gkk_maintenance", "gkk_technic", "gkk_purchase_and_request", "gkk_document", "gkk_camp_register", "gkk_jobs_api", "gkk_website", "gkk_ui", "mw_spare_parts"],
  stack: ["Odoo 19", "Python", "PostgreSQL", "OWL", "Ubuntu 24.04", "nginx", "Git / GitLab"],
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
    url: "https://paulshome.vercel.app",
    host: "paulshome.vercel.app",
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
    company: "Govikhangai Khudulmur LLC",
    role: { en: "System Engineer · ERP · DevOps", mn: "Систем инженер · ERP · DevOps" } as Text,
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
        en: "Led the ERP 19 migration from Odoo 13 to Odoo 19 and deployed the hardened production server.",
        mn: "Odoo 13-аас Odoo 19 руу ERP 19 шилжүүлэлтийг удирдаж, хамгаалалттай production сервер нэвтрүүлсэн.",
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
    group: { en: "Infrastructure", mn: "Дэд бүтэц" },
    items: ["Dell PowerEdge R740 / R750", "NVR / CCTV", "Windows Server", "Ubuntu / Linux", "VMware ESXi", "Check Point", "Grandstream GWN.Cloud", "VPN · NAT · Routing", "TCP/IP · DNS · DHCP", "nginx", "UFW · TLS"],
  },
  {
    group: { en: "ERP & Backend", mn: "ERP ба Backend" },
    items: ["Odoo 13 → 19", "Python", "PostgreSQL", "REST APIs", "Node.js", "Prisma", "Git / GitLab"],
  },
  {
    group: { en: "Frontend & Cloud", mn: "Frontend ба Cloud" },
    items: ["React", "Next.js", "TypeScript", "Vite", "Electron", "Expo", "Cloudflare Workers", "Vercel"],
  },
];

export const education: { title: Text; detail: Text } = {
  title: { en: "Computer Science — Mongolian International University", mn: "Компьютерын ухаан — Монголын Олон Улсын Их Сургууль" },
  detail: { en: "University studies — 4 years", mn: "Их сургууль — 4 жил" },
};
