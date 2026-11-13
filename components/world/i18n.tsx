"use client";

import { createContext, useContext } from "react";
import { about, caseStudies, experience, hero, otherWork, profile, skills } from "@/data/profile";
import { aboutMn, caseStudiesMn, experienceMn, heroMn, otherWorkMn, profileMn, skillsMn } from "@/data/profile.mn";
import type { PlaceId } from "./scene";

export type Lang = "en" | "mn";

const en = {
  place: { work: "Work", experience: "Experience", skills: "Skills", about: "About", contact: "Contact" } as Record<PlaceId, string>,
  title: { work: "Work", experience: "Experience", skills: "Skills", about: "About me", contact: "Contact" } as Record<PlaceId, string>,
  role: "systems engineer",
  seeWork: "See my work",
  touch: "Get in touch",
  hintFine: "Hover a node to zoom in · click to open",
  hintTouch: "Tap a node · drag to look around",
  close: "Close",
  toLight: "Switch to light mode",
  toDark: "Switch to dark mode",
  langLabel: "Монгол хэлээр",
  workLead: "Four case studies from my current work. Pick one.",
  allWork: "All work",
  otherWork: "Other work",
  otherCount: (n: number) => `${n} client sites, internal tools and apps`,
  tabs: { Overview: "Overview", Facts: "Facts", Architecture: "Architecture", Decisions: "Decisions", Challenges: "Challenges", Status: "Status", Results: "Results", Screens: "Screens" },
  roleL: "Role",
  periodL: "Period",
  stack: "Stack",
  fullWriteUp: "Full write-up",
  expLead: "Each hop on the route is a role. Newest first.",
  skillsLead: "Type a command, or click one below. Try",
  psHelp: [
    ["Get-Skills", "list skill groups (also: dir, ls)"],
    ["Get-Skills -Group <name|#>", "show one group"],
    ["whoami", "who runs this box"],
    ["cls", "clear the screen"],
  ],
  psNoGroup: "No group matches",
  psTry: "Try 'help'.",
};
type Strings = typeof en;

const mn: Strings = {
  place: { work: "Ажил", experience: "Туршлага", skills: "Ур чадвар", about: "Тухай", contact: "Холбоо" },
  title: { work: "Ажил", experience: "Туршлага", skills: "Ур чадвар", about: "Миний тухай", contact: "Холбоо барих" },
  role: "системийн инженер",
  seeWork: "Ажлаа үзэх",
  touch: "Холбогдох",
  hintFine: "Зангилаа дээр хулганаа барьвал томорно · дарж нээнэ",
  hintTouch: "Зангилаа дээр дарна уу · чирж харна",
  close: "Хаах",
  toLight: "Гэрэл горим",
  toDark: "Харанхуй горим",
  langLabel: "Switch to English",
  workLead: "Одоогийн ажлаас дөрвөн кейс. Нэгийг нь сонгоно уу.",
  allWork: "Бүх ажил",
  otherWork: "Бусад ажил",
  otherCount: (n: number) => `${n} захиалгат сайт, дотоод хэрэгсэл, апп`,
  tabs: { Overview: "Тойм", Facts: "Тоо баримт", Architecture: "Архитектур", Decisions: "Шийдвэр", Challenges: "Сорилт", Status: "Төлөв", Results: "Үр дүн", Screens: "Зураг" },
  roleL: "Үүрэг",
  periodL: "Хугацаа",
  stack: "Технологи",
  fullWriteUp: "Дэлгэрэнгүй (англиар)",
  expLead: "Маршрут дээрх үе бүр нэг ажил. Хамгийн сүүлийнх нь эхэндээ.",
  skillsLead: "Команд бичих эсвэл доороос дарна уу. Оролдоод үзээрэй:",
  psHelp: [
    ["Get-Skills", "ур чадварын бүлгүүд (мөн: dir, ls)"],
    ["Get-Skills -Group <нэр|#>", "нэг бүлгийг харуулах"],
    ["whoami", "энэ компьютерийн эзэн"],
    ["cls", "дэлгэц цэвэрлэх"],
  ],
  psNoGroup: "Тохирох бүлэг алга",
  psTry: "'help' гэж бичээд үзээрэй.",
};

const DATA = {
  en: { t: en, hero, caseStudies, otherWork, experience, skills, about, me: { name: profile.name, positioning: profile.positioning, availability: profile.availability, location: profile.location } },
  mn: { t: mn, hero: heroMn, caseStudies: caseStudiesMn, otherWork: otherWorkMn, experience: experienceMn, skills: skillsMn, about: aboutMn, me: profileMn },
};
export type Data = (typeof DATA)["en"];

export const LangContext = createContext<Lang>("en");
export const useData = (): Data => DATA[useContext(LangContext)] as Data;
export const dataFor = (l: Lang): Data => DATA[l] as Data;
