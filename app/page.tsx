"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/profile";

const emailAddress = profile.email;

const translations = {
  en: {
    nav: [
      ["About", "#about"],
      ["Experience", "#experience"],
      ["Work", "#work"],
      ["Projects", "#projects"],
      ["Skills", "#skills"],
      ["Contact", "#contact"],
    ],
    overline: "SYSTEM ENGINEER • DEVOPS • FULL-STACK",
    title: ["Building reliable ", "infrastructure", " and software."],
    availability: profile.availability,
    hero: profile.hero,
    viewWork: "View my work",
    downloadResume: "Download resume",
    email: "Email",
    about: "ABOUT",
    aboutHeading: "I solve problems across the whole stack.",
    experience: "EXPERIENCE",
    experienceHeading: "Production responsibility, not tutorial experience.",
    selectedWork: "SELECTED ENGINEERING WORK",
    selectedWorkHeading: "Real systems. Real operational problems.",
    systems: "HOW I THINK ABOUT SYSTEMS",
    projects: "SOFTWARE PROJECTS",
    projectsHeading: "Turning infrastructure knowledge into software.",
    skills: "SKILLS",
    skillsHeading: "Experience over arbitrary percentages.",
    education: "EDUCATION",
    contactBadge: "AVAILABLE FOR INTERNATIONAL REMOTE WORK",
    contactHeading: "Let's build reliable systems.",
    contactText:
      "Open to System Engineering, DevOps, infrastructure, ERP integration, full-stack development and technical consulting opportunities.",
    contact: "Contact me",
    footer: "System Engineer • Infrastructure + Software",
  },
  mn: {
    nav: [
      ["Тухай", "#about"],
      ["Туршлага", "#experience"],
      ["Ажлын төрөл", "#work"],
      ["Төслүүд", "#projects"],
      ["Ур чадвар", "#skills"],
      ["Холбоо барих", "#contact"],
    ],
    overline: "СИСТЕМ ИНЖЕНЕР • DEVOPS • FULL-STACK",
    title: ["Бие даасан ", "инфраструктур", " болон программ хийгдүүлнэ."],
    availability: "Олон улсын алсын зайны ажилд нээлттэй",
    hero:
      "Би сервер, сүлжээ, виртуалчлал, ERP болон программийн талаар бодит үйлдвэрлэлийн системийг найдвартай ажиллуулахад анхаардаг.",
    viewWork: "Ажлаа үзэх",
    downloadResume: "CV татах",
    email: "И-мэйл",
    about: "ТУХАЙ",
    aboutHeading: "Би системийн бүх давхаргыг нэг дор шийддэг.",
    experience: "ТУРШЛАГА",
    experienceHeading: "Хичээлээс илүү үйлдвэрлэлийн хариуцлага.",
    selectedWork: "СОНГОН ТУГТАЙ ИНЖЕНЕРИЙН АЖЛУУД",
    selectedWorkHeading: "Бодит систем. Бодит үйл ажиллагааны асуудал.",
    systems: "БИ СИСТЕМЭЭ ИЙМЭЭ БОДОДОГ",
    projects: "ПРОГРАМЫН ТӨСЛҮҮД",
    projectsHeading: "Инфраструктурын мэдлэгийг программ руу буулгах.",
    skills: "УР ЧАДВАР",
    skillsHeading: "Тоо хэмжээнээс илүү туршлага.",
    education: "БОЛОВСРОЛ",
    contactBadge: "ОЛОН УЛСЫН АЛСЫН ЗАЙНЫ АЖИЛД БЭЛТГЭЭТЭЙ",
    contactHeading: "Найдвартай систем барьцгаая.",
    contactText:
      "System Engineering, DevOps, infrastructure, ERP integration, full-stack development болон техникийн зөвлөгөөний боломжуудыг авч үзэж байна.",
    contact: "Холбоо барих",
    footer: "System Engineer • Infrastructure + Software",
  },
  zh: {
    nav: [
      ["关于", "#about"],
      ["经验", "#experience"],
      ["工作", "#work"],
      ["项目", "#projects"],
      ["技能", "#skills"],
      ["联系", "#contact"],
    ],
    overline: "系统工程师 • DEVOPS • 全栈",
    title: ["构建可靠的 ", "基础设施", " 和软件。"],
    availability: "接受国际远程机会",
    hero:
      "我在基础设施、网络、虚拟化、ERP 和软件之间工作，确保生产系统稳定运行并自动化关键流程。",
    viewWork: "查看我的工作",
    downloadResume: "下载简历",
    email: "邮箱",
    about: "关于",
    aboutHeading: "我能解决全栈层面的复杂问题。",
    experience: "经验",
    experienceHeading: "生产责任胜过教程经验。",
    selectedWork: "精选工程工作",
    selectedWorkHeading: "真实系统。真实运营问题。",
    systems: "我如何看待系统",
    projects: "软件项目",
    projectsHeading: "将基础设施知识转化为软件。",
    skills: "技能",
    skillsHeading: "经验重于任意百分比。",
    education: "教育",
    contactBadge: "可接受国际远程工作",
    contactHeading: "让我们构建可靠的系统。",
    contactText:
      "欢迎系统工程、DevOps、基础设施、ERP 集成、全栈开发和技术咨询机会。",
    contact: "联系我",
    footer: "系统工程师 • 基础设施 + 软件",
  },
  ko: {
    nav: [
      ["소개", "#about"],
      ["경험", "#experience"],
      ["업무", "#work"],
      ["프로젝트", "#projects"],
      ["기술", "#skills"],
      ["연락", "#contact"],
    ],
    overline: "시스템 엔지니어 • DEVOPS • 풀스택",
    title: ["신뢰할 수 있는 ", "인프라", "와 소프트웨어를 만듭니다."],
    availability: "국제 원격 업무 환영",
    hero:
      "저는 인프라, 네트워크, 가상화, ERP, 소프트웨어 전반을 다루며 실제 운영 시스템의 안정성과 자동화를 책임집니다.",
    viewWork: "업무 보기",
    downloadResume: "이력서 다운로드",
    email: "이메일",
    about: "소개",
    aboutHeading: "저는 전체 스택에서 문제를 해결합니다.",
    experience: "경험",
    experienceHeading: "튜토리얼 경험보다 실무 책임이 중요합니다.",
    selectedWork: "선정 엔지니어링 작업",
    selectedWorkHeading: "실제 시스템. 실제 운영 문제.",
    systems: "시스템을 바라보는 방식",
    projects: "소프트웨어 프로젝트",
    projectsHeading: "인프라 지식을 소프트웨어로 전환합니다.",
    skills: "기술",
    skillsHeading: "무작위 백분율보다 경험이 중요합니다.",
    education: "교육",
    contactBadge: "국제 원격 근무 가능",
    contactHeading: "안정적인 시스템을 함께 만들어가요.",
    contactText:
      "시스템 엔지니어링, DevOps, 인프라, ERP 통합, 풀스택 개발, 기술 컨설팅 기회를 환영합니다.",
    contact: "연락하기",
    footer: "시스템 엔지니어 • 인프라 + 소프트웨어",
  },
  ru: {
    nav: [
      ["Обо мне", "#about"],
      ["Опыт", "#experience"],
      ["Работа", "#work"],
      ["Проекты", "#projects"],
      ["Навыки", "#skills"],
      ["Контакты", "#contact"],
    ],
    overline: "СИСТЕМНЫЙ ИНЖЕНЕР • DEVOPS • FULL-STACK",
    title: ["Создаю надёжную ", "инфраструктуру", " и программное обеспечение."],
    availability: "Готов к международной удалённой работе",
    hero:
      "Я работаю на стыке инфраструктуры, сетей, виртуализации, ERP и программного обеспечения, чтобы поддерживать стабильную работу производственных систем.",
    viewWork: "Смотреть работы",
    downloadResume: "Скачать резюме",
    email: "Email",
    about: "ОБО МНЕ",
    aboutHeading: "Я решаю задачи на всём стеке технологий.",
    experience: "ОПЫТ",
    experienceHeading: "Ответственность в продакшене важнее учебного опыта.",
    selectedWork: "ИЗБРАННЫЕ ИНЖЕНЕРНЫЕ РАБОТЫ",
    selectedWorkHeading: "Реальные системы. Реальные операционные задачи.",
    systems: "КАК Я ДУМАЮ О СИСТЕМАХ",
    projects: "ПРОГРАММНЫЕ ПРОЕКТЫ",
    projectsHeading: "Преобразую знания об инфраструктуре в программное обеспечение.",
    skills: "НАВЫКИ",
    skillsHeading: "Опыт важнее произвольных процентов.",
    education: "ОБРАЗОВАНИЕ",
    contactBadge: "ДОСТУПЕН ДЛЯ МЕЖДУНАРОДНОЙ УДАЛЁННОЙ РАБОТЫ",
    contactHeading: "Давайте строить надёжные системы.",
    contactText:
      "Готов к ролям в системной инженерии, DevOps, инфраструктуре, интеграции ERP, full-stack разработке и техническом консалтинге.",
    contact: "Связаться со мной",
    footer: "Системный инженер • Инфраструктура + Программное обеспечение",
  },
  ja: {
    nav: [
      ["概要", "#about"],
      ["経験", "#experience"],
      ["業務", "#work"],
      ["プロジェクト", "#projects"],
      ["スキル", "#skills"],
      ["連絡", "#contact"],
    ],
    overline: "システムエンジニア • DEVOPS • フルスタック",
    title: ["信頼性の高い ", "インフラ", " とソフトウェアを構築します。"],
    availability: "国際リモート勤務可能",
    hero:
      "私はインフラ、ネットワーク、仮想化、ERP、ソフトウェアの境界で働き、運用システムの安定と自動化を担当しています。",
    viewWork: "実績を見る",
    downloadResume: "履歴書をダウンロード",
    email: "メール",
    about: "概要",
    aboutHeading: "私は全体像から問題を解決します。",
    experience: "経験",
    experienceHeading: "チュートリアル経験よりも実運用の責任が重要です。",
    selectedWork: "選定したエンジニアリング業務",
    selectedWorkHeading: "実システム。実運用の課題。",
    systems: "システムを考える方法",
    projects: "ソフトウェアプロジェクト",
    projectsHeading: "インフラ知識をソフトウェアへ変換します。",
    skills: "スキル",
    skillsHeading: "経験は数値より重要です。",
    education: "学歴",
    contactBadge: "国際リモート勤務可能",
    contactHeading: "信頼できるシステムを一緒に作りましょう。",
    contactText:
      "システムエンジニアリング、DevOps、インフラ、ERP統合、フルスタック開発、技術コンサルティングの機会を歓迎します。",
    contact: "お問い合わせ",
    footer: "システムエンジニア • インフラ + ソフトウェア",
  },
  de: {
    nav: [
      ["Über mich", "#about"],
      ["Erfahrung", "#experience"],
      ["Arbeit", "#work"],
      ["Projekte", "#projects"],
      ["Skills", "#skills"],
      ["Kontakt", "#contact"],
    ],
    overline: "SYSTEMENGINEER • DEVOPS • FULL-STACK",
    title: ["Ich baue zuverlässige ", "Infrastruktur", " und Software."],
    availability: "Für internationale Remote-Arbeit offen",
    hero:
      "Ich arbeite über Infrastruktur, Netzwerke, Virtualisierung, ERP und Software, um produktive Systeme stabil zu halten und Prozesse zu automatisieren.",
    viewWork: "Meine Arbeit ansehen",
    downloadResume: "Lebenslauf herunterladen",
    email: "E-Mail",
    about: "ÜBER MICH",
    aboutHeading: "Ich löse Probleme über den gesamten Stack hinweg.",
    experience: "ERFAHRUNG",
    experienceHeading: "Produktionsverantwortung statt Tutorial-Erfahrung.",
    selectedWork: "AUSGEWÄHLTE ENGINEERING-ARBEITEN",
    selectedWorkHeading: "Echte Systeme. Echte Betriebsprobleme.",
    systems: "WIE ICH ÜBER SYSTEME DENKE",
    projects: "SOFTWAREPROJEKTE",
    projectsHeading: "Infrastrukturwissen in Software verwandeln.",
    skills: "FÄHIGKEITEN",
    skillsHeading: "Erfahrung zählt mehr als beliebige Prozentsätze.",
    education: "AUSBILDUNG",
    contactBadge: "FÜR INTERNATIONALE REMOTE-ARBEIT VERFÜGBAR",
    contactHeading: "Lassen Sie uns zuverlässige Systeme bauen.",
    contactText:
      "Offen für System Engineering, DevOps, Infrastruktur, ERP-Integration, Full-Stack-Entwicklung und technisches Consulting.",
    contact: "Kontakt aufnehmen",
    footer: "System Engineer • Infrastruktur + Software",
  },
  kk: {
    nav: [
      ["Туралы", "#about"],
      ["Тәжірибе", "#experience"],
      ["Жұмыс", "#work"],
      ["Жобалар", "#projects"],
      ["Дағдылар", "#skills"],
      ["Байланыс", "#contact"],
    ],
    overline: "СИСТЕМА ИНЖЕНЕРІ • DEVOPS • FULL-STACK",
    title: ["Сенімді ", "инфрақұрылымды", " және бағдарламаларды жасаймын."],
    availability: "Халықаралық қашықтан жұмысқа дайын",
    hero:
      "Мен инфрақұрылым, желілер, виртуализация, ERP және бағдарламалық қамтамасыз ету шеңберінде жұмыс істеп, өндірістік жүйелердің тұрақтылығын қамтамасыз етемін.",
    viewWork: "Жұмысты көру",
    downloadResume: "Резюмеге жүктеу",
    email: "Email",
    about: "ТУРАЛЫ",
    aboutHeading: "Мен барлық деңгейдегі мәселелерді шешемін.",
    experience: "ТӘЖІРИБЕ",
    experienceHeading: "Өндірістік жауапкершілік оқулық тәжірибеден маңызды.",
    selectedWork: "ТАңдау бойынша инженерлік жұмыстар",
    selectedWorkHeading: "Нақты жүйелер. Нақты операциялық мәселелер.",
    systems: "ЖҮЙЕЛЕРДІ ҚАЛАЙ БОЛЖАЙМЫН",
    projects: "БАҒДАРЛАМАЛЫҚ ЖОБАЛАР",
    projectsHeading: "Инфрақұрылым білімін бағдарламалық қауіпке айналдырамын.",
    skills: "ДАҒДЫЛАР",
    skillsHeading: "Тәжірибе кез келген пайыздан маңызды.",
    education: "БІЛІМ",
    contactBadge: "ХАЛЫҚАРАЛЫҚ ҚАШЫҚТАН ЖҰМЫСҚА ДАЙЫН",
    contactHeading: "Сенімді жүйелер құрастырайық.",
    contactText:
      "System Engineering, DevOps, инфрақұрылым, ERP интеграциясы, full-stack әзірлеу және техникалық консалтинг мүмкіндіктерін қарастырамыз.",
    contact: "Байланыс",
    footer: "System Engineer • Инфрақұрылым + Бағдарламалау",
  },
  tr: {
    nav: [
      ["Hakkımda", "#about"],
      ["Deneyim", "#experience"],
      ["İşler", "#work"],
      ["Projeler", "#projects"],
      ["Yetenekler", "#skills"],
      ["İletişim", "#contact"],
    ],
    overline: "SİSTEM MÜHENDİSİ • DEVOPS • FULL-STACK",
    title: ["Güvenilir ", "altyapı", " ve yazılım kuruyorum."],
    availability: "Uluslararası uzaktan çalışma için açık",
    hero:
      "İnşaat, ağ, sanallaştırma, ERP ve yazılım alanları arasında çalışarak üretim sistemlerinin güvenilirliğini ve otomasyonunu sağlarım.",
    viewWork: "İşlerimi görün",
    downloadResume: "Özgeçmişi indir",
    email: "E-posta",
    about: "HAKKIMDA",
    aboutHeading: "Sorunları tüm yığının üzerinden çözüyorum.",
    experience: "DENEYİM",
    experienceHeading: "Üretim sorumluluğu, eğitim deneyiminden daha değerlidir.",
    selectedWork: "SEÇİLMİŞ MÜHENDİSLİK ÇALIŞMALARI",
    selectedWorkHeading: "Gerçek sistemler. Gerçek operasyonel sorunlar.",
    systems: "SİSTEMLERİ NASIL DÜŞÜNÜYORUM",
    projects: "YAZILIM PROJELERİ",
    projectsHeading: "Altyapı bilgisini yazılıma dönüştürüyorum.",
    skills: "YETENEKLER",
    skillsHeading: "Deneyim rastgele yüzdeliklerden daha değerlidir.",
    education: "EĞİTİM",
    contactBadge: "ULUSLARARASI UZAKTAN ÇALIŞMA İÇİN MÜMKÜN",
    contactHeading: "Güvenilir sistemler kuralım.",
    contactText:
      "Sistem Mühendisliği, DevOps, altyapı, ERP entegrasyonu, full-stack geliştirme ve teknik danışmanlık fırsatları için açığım.",
    contact: "İletişime geç",
    footer: "Sistem Mühendisi • Altyapı + Yazılım",
  },
  uz: {
    nav: [
      ["Haqida", "#about"],
      ["Tajriba", "#experience"],
      ["Ishlar", "#work"],
      ["Loyihalar", "#projects"],
      ["Ko'nikmalar", "#skills"],
      ["Bog'lanish", "#contact"],
    ],
    overline: "SISTEM MUHANDISI • DEVOPS • FULL-STACK",
    title: ["Ishonchli ", "infratuzilma", " va dasturlar yarataman."],
    availability: "Xalqaro masofaviy ishga tayyor",
    hero:
      "Men infratuzilma, tarmoq, virtualizatsiya, ERP va dasturiy ta'minot sohalarida ishlab, ishlab chiqarish tizimlarining ishonchliligini ta'minlayman.",
    viewWork: "Ishlarni ko'rish",
    downloadResume: "Rezume yuklab olish",
    email: "Email",
    about: "HAQIDA",
    aboutHeading: "Men muammolarni butun stack bo'ylab hal qilaman.",
    experience: "TAJRIBA",
    experienceHeading: "Ishlab chiqarish mas'uliyati darslik tajribasidan ustun.",
    selectedWork: "TANLANGAN MUHANDISLIK ISHLARI",
    selectedWorkHeading: "Haqiqiy tizimlar. Haqiqiy operatsion muammolar.",
    systems: "TIZIMLAR HAQIDA O'YLASHIM",
    projects: "DASTURLI LOYIHALAR",
    projectsHeading: "Infratuzilma bilimini dasturlarga aylantiraman.",
    skills: "KO'NIKMALAR",
    skillsHeading: "Tajriba ixtiyoriy foizlardan ustun.",
    education: "TA'LIM",
    contactBadge: "XALQARO MASOFAVIY ISH UCHUN MUMKIN",
    contactHeading: "Ishonchli tizimlar yaratamiz.",
    contactText:
      "System Engineering, DevOps, infratuzilma, ERP integratsiyasi, full-stack ishlab chiqish va texnik maslahat imkoniyatlari uchun ochiqman.",
    contact: "Bog'lanish",
    footer: "System Engineer • Infratuzilma + Dasturiy ta'minot",
  },
} as const;

const languageOptions = [
  { code: "en", label: "English" },
  { code: "mn", label: "Монгол" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
  { code: "de", label: "Deutsch" },
  { code: "kk", label: "Қазақ" },
  { code: "tr", label: "Türkçe" },
  { code: "uz", label: "O'zbek" },
] as const;

type LanguageCode = keyof typeof translations;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const t = translations[language];
  const nav = t.nav;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`New portfolio comment from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nComment:\n${form.message}`
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav shell">
          <a className="brand" href="#top">DOLGION<span>.</span></a>
          <div className="nav-links">
            {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
          <div className="nav-controls">
            <label className="language-select" aria-label="Language selector">
              <span>Lang</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as LanguageCode)}
              >
                {languageOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <a className="nav-cta" href={profile.resume}>{t.downloadResume} <Arrow /></a>
          </div>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> {t.availability}</div>
          <p className="overline">{t.overline}</p>
          <h1>
            {t.title[0]}<span>{t.title[1]}</span>{t.title[2]}
          </h1>
          <p className="hero-text">{t.hero}</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">{t.viewWork} <Arrow /></a>
            <a className="button ghost" href={profile.resume}>{t.downloadResume}</a>
          </div>
          <div className="social-row">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>}
            <a href={`mailto:${profile.email}`}>{t.email} <Arrow /></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Portrait">
          <div className="visual-ring ring-a" />
          <div className="visual-ring ring-b" />
          <div className="tech-card tech-card-a">
            <span>01</span><strong>INFRASTRUCTURE</strong><small>Networks • Servers • Security</small>
          </div>
          <div className="tech-card tech-card-b">
            <span>02</span><strong>SOFTWARE</strong><small>ERP • APIs • Automation</small>
          </div>
          <Image
            src="/dolgion-hero.png"
            alt="Dolgion with acoustic guitar"
            width={900}
            height={900}
            priority
            className="portrait"
          />
        </div>
      </section>

      <section className="metrics shell">
        {profile.metrics.map((item) => (
          <div className="metric" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section shell" id="about">
        <div className="section-head">
          <span className="section-number">01</span>
          <p>{t.about}</p>
          <h2>{t.aboutHeading}</h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            {profile.about.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="stack-map">
            {["User", "Frontend", "API", "Application", "Database", "OS / VM", "Network", "Firewall", "Infrastructure"].map((item, i) => (
              <div className="stack-node" key={item}>
                <span>{String(i + 1).padStart(2, "0")}</span>{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="experience">
        <div className="section-head">
          <span className="section-number">02</span>
          <p>{t.experience}</p>
          <h2>{t.experienceHeading}</h2>
        </div>
        <div className="timeline">
          {profile.experience.map((job) => (
            <article className="job" key={job.company}>
              <div className="job-side">
                <span>{job.period}</span>
                <h3>{job.role}</h3>
                <p>{job.company}</p>
              </div>
              <div className="job-body">
                <p className="job-summary">{job.summary}</p>
                <ul>{job.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="work">
        <div className="section-head">
          <span className="section-number">03</span>
          <p>{t.selectedWork}</p>
          <h2>{t.selectedWorkHeading}</h2>
        </div>
        <div className="work-grid">
          {profile.work.map((item, i) => (
            <article className="work-card" key={item.title}>
              <div className="card-top">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{item.kicker}</p>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture shell">
        <div className="arch-label">{t.systems}</div>
        <div className="arch-flow">
          {["Remote User", "Web App", "API", "Service", "PostgreSQL", "Linux / Docker", "VMware", "Network", "Check Point"].map((item, i, arr) => (
            <div className="arch-item" key={item}>
              <span>{item}</span>{i < arr.length - 1 && <b>→</b>}
            </div>
          ))}
        </div>
      </section>

      <section className="section shell" id="projects">
        <div className="section-head">
          <span className="section-number">04</span>
          <p>{t.projects}</p>
          <h2>{t.projectsHeading}</h2>
        </div>
        <div className="project-grid">
          {profile.projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span className="project-status">{project.status}</span>
              <div className="mock-ui">
                <div className="mock-sidebar" />
                <div className="mock-content">
                  <i /><i /><i />
                  <div className="mock-panels"><b /><b /><b /></div>
                </div>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">{project.stack.map((x) => <span key={x}>{x}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="skills">
        <div className="section-head">
          <span className="section-number">05</span>
          <p>{t.skills}</p>
          <h2>{t.skillsHeading}</h2>
        </div>
        <div className="skills-grid">
          {Object.entries(profile.skills).map(([group, skills]) => (
            <article className="skill-column" key={group}>
              <h3>{group}</h3>
              <div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="education shell">
        <p>{t.education}</p>
        <h3>{profile.education.title}</h3>
        <span>{profile.education.detail}</span>
      </section>

      <section className="contact shell" id="contact">
        <p className="overline">{t.contactBadge}</p>
        <h2>{t.contactHeading}</h2>
        <p>{t.contactText}</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Your name"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="message">Comment</label>
            <textarea
              id="message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Tell me what you need..."
              rows={5}
              required
            />
          </div>

          <div className="hero-actions">
            <button type="submit" className="button primary" aria-label="Send comment to email">
              Send <Arrow />
            </button>
            <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </form>
      </section>

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Dolgion</span>
        <span>{t.footer}</span>
      </footer>
    </main>
  );
}
