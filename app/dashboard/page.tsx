"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

import { demoMatches, players, powers, worldCupTeams } from "../../lib/demoData";

import { Standings } from "../../components/Standings";
import { MatchCard } from "../../components/MatchCard";
import { PowerCard } from "../../components/PowerCard";

const flags: Record<string, string> = {
  Polska: "https://flagcdn.com/w40/pl.png",
  Meksyk: "https://flagcdn.com/w40/mx.png",
  "Republika Południowej Afryki": "https://flagcdn.com/w40/za.png",
  "Korea Południowa": "https://flagcdn.com/w40/kr.png",
  Czechy: "https://flagcdn.com/w40/cz.png",
  Kanada: "https://flagcdn.com/w40/ca.png",
  "Bośnia i Hercegowina": "https://flagcdn.com/w40/ba.png",
  Katar: "https://flagcdn.com/w40/qa.png",
  Szwajcaria: "https://flagcdn.com/w40/ch.png",
  Brazylia: "https://flagcdn.com/w40/br.png",
  Maroko: "https://flagcdn.com/w40/ma.png",
  Haiti: "https://flagcdn.com/w40/ht.png",
  Szkocja: "https://flagcdn.com/w40/gb-sct.png",
  USA: "https://flagcdn.com/w40/us.png",
  Paragwaj: "https://flagcdn.com/w40/py.png",
  Australia: "https://flagcdn.com/w40/au.png",
  Turcja: "https://flagcdn.com/w40/tr.png",
  Niemcy: "https://flagcdn.com/w40/de.png",
  Curacao: "https://flagcdn.com/w40/cw.png",
  "Wybrzeże Kości Słoniowej": "https://flagcdn.com/w40/ci.png",
  Ekwador: "https://flagcdn.com/w40/ec.png",
  Holandia: "https://flagcdn.com/w40/nl.png",
  Japonia: "https://flagcdn.com/w40/jp.png",
  Szwecja: "https://flagcdn.com/w40/se.png",
  Tunezja: "https://flagcdn.com/w40/tn.png",
  Belgia: "https://flagcdn.com/w40/be.png",
  Egipt: "https://flagcdn.com/w40/eg.png",
  Iran: "https://flagcdn.com/w40/ir.png",
  "Nowa Zelandia": "https://flagcdn.com/w40/nz.png",
  Hiszpania: "https://flagcdn.com/w40/es.png",
  "Wyspy Zielonego Przylądka": "https://flagcdn.com/w40/cv.png",
  "Arabia Saudyjska": "https://flagcdn.com/w40/sa.png",
  Urugwaj: "https://flagcdn.com/w40/uy.png",
  Francja: "https://flagcdn.com/w40/fr.png",
  Senegal: "https://flagcdn.com/w40/sn.png",
  Irak: "https://flagcdn.com/w40/iq.png",
  Norwegia: "https://flagcdn.com/w40/no.png",
  Argentyna: "https://flagcdn.com/w40/ar.png",
  Algieria: "https://flagcdn.com/w40/dz.png",
  Austria: "https://flagcdn.com/w40/at.png",
  Jordania: "https://flagcdn.com/w40/jo.png",
  Portugalia: "https://flagcdn.com/w40/pt.png",
  "Demokratyczna Republika Konga": "https://flagcdn.com/w40/cd.png",
  Uzbekistan: "https://flagcdn.com/w40/uz.png",
  Kolumbia: "https://flagcdn.com/w40/co.png",
  Anglia: "https://flagcdn.com/w40/gb-eng.png",
  Chorwacja: "https://flagcdn.com/w40/hr.png",
  Ghana: "https://flagcdn.com/w40/gh.png",
  Panama: "https://flagcdn.com/w40/pa.png",
};


type KnockoutFirstRoundMatch = {
  id: string;
  date: string;
  time: string;
  homeSlot: string;
  awaySlot: string;
};

const knockoutFirstRoundMatches: KnockoutFirstRoundMatch[] = [
  { id: "M49", date: "29 cze", time: "22:30", homeSlot: "1E", awaySlot: "3A/3B/3C/3D/3F" },
  { id: "M50", date: "30 cze", time: "23:00", homeSlot: "1I", awaySlot: "3C/3D/3F/3G/3H" },
  { id: "M51", date: "28 cze", time: "21:00", homeSlot: "2A", awaySlot: "2B" },
  { id: "M52", date: "30 cze", time: "03:00", homeSlot: "1F", awaySlot: "2C" },
  { id: "M53", date: "3 lip", time: "01:00", homeSlot: "2K", awaySlot: "2L" },
  { id: "M54", date: "2 lip", time: "21:00", homeSlot: "1H", awaySlot: "2J" },
  { id: "M55", date: "2 lip", time: "02:00", homeSlot: "1D", awaySlot: "3B/3E/3F/3I/3J" },
  { id: "M56", date: "1 lip", time: "22:00", homeSlot: "1G", awaySlot: "3A/3E/3H/3I/3J" },
  { id: "M57", date: "29 cze", time: "19:00", homeSlot: "1C", awaySlot: "2F" },
  { id: "M58", date: "30 cze", time: "19:00", homeSlot: "2E", awaySlot: "2I" },
  { id: "M59", date: "1 lip", time: "03:00", homeSlot: "1A", awaySlot: "3C/3E/3F/3H/3I" },
  { id: "M60", date: "1 lip", time: "18:00", homeSlot: "1L", awaySlot: "3E/3H/3I/3J/3K" },
  { id: "M61", date: "4 lip", time: "00:00", homeSlot: "1J", awaySlot: "2H" },
  { id: "M62", date: "3 lip", time: "20:00", homeSlot: "2D", awaySlot: "2G" },
  { id: "M63", date: "3 lip", time: "05:00", homeSlot: "1B", awaySlot: "3E/3F/3G/3I/3J" },
  { id: "M64", date: "4 lip", time: "03:30", homeSlot: "1K", awaySlot: "3D/3E/3I/3J/3L" },
];

const knockoutLaterRounds = [
  { title: "1/8 finału", items: ["W73 vs W75", "W74 vs W77", "W81 vs W82", "W83 vs W84", "W76 vs W78", "W79 vs W80", "W85 vs W87", "W86 vs W88"] },
  { title: "Ćwierćfinały", items: ["W89 vs W90", "W93 vs W94", "W91 vs W92", "W95 vs W96"] },
  { title: "Półfinały", items: ["W97 vs W98", "W99 vs W100"] },
  { title: "Finał", items: ["W101 vs W102"] },
  { title: "Mecz o 3. miejsce", items: ["Przegrany półfinału 1 vs przegrany półfinału 2"] },
];


const fullGroupPredictionTableMatches = [
  { id: 1, group: "Grupa A", date: "11.06.2026", time: "21:00", teamA: "Meksyk", teamB: "Republika Południowej Afryki" },
  { id: 2, group: "Grupa A", date: "12.06.2026", time: "04:00", teamA: "Korea Południowa", teamB: "Czechy" },
  { id: 3, group: "Grupa B", date: "12.06.2026", time: "21:00", teamA: "Kanada", teamB: "Bośnia i Hercegowina" },
  { id: 4, group: "Grupa D", date: "13.06.2026", time: "03:00", teamA: "USA", teamB: "Paragwaj" },
  { id: 5, group: "Grupa B", date: "13.06.2026", time: "21:00", teamA: "Katar", teamB: "Szwajcaria" },
  { id: 6, group: "Grupa C", date: "14.06.2026", time: "00:00", teamA: "Brazylia", teamB: "Maroko" },
  { id: 7, group: "Grupa C", date: "14.06.2026", time: "03:00", teamA: "Haiti", teamB: "Szkocja" },
  { id: 8, group: "Grupa D", date: "14.06.2026", time: "06:00", teamA: "Australia", teamB: "Turcja" },
  { id: 9, group: "Grupa E", date: "14.06.2026", time: "19:00", teamA: "Niemcy", teamB: "Curacao" },
  { id: 10, group: "Grupa F", date: "14.06.2026", time: "22:00", teamA: "Holandia", teamB: "Japonia" },
  { id: 11, group: "Grupa E", date: "15.06.2026", time: "01:00", teamA: "Wybrzeże Kości Słoniowej", teamB: "Ekwador" },
  { id: 12, group: "Grupa F", date: "15.06.2026", time: "04:00", teamA: "Szwecja", teamB: "Tunezja" },
  { id: 13, group: "Grupa H", date: "15.06.2026", time: "18:00", teamA: "Hiszpania", teamB: "Wyspy Zielonego Przylądka" },
  { id: 14, group: "Grupa G", date: "15.06.2026", time: "21:00", teamA: "Belgia", teamB: "Egipt" },
  { id: 15, group: "Grupa H", date: "16.06.2026", time: "00:00", teamA: "Arabia Saudyjska", teamB: "Urugwaj" },
  { id: 16, group: "Grupa G", date: "16.06.2026", time: "03:00", teamA: "Iran", teamB: "Nowa Zelandia" },
  { id: 17, group: "Grupa I", date: "16.06.2026", time: "21:00", teamA: "Francja", teamB: "Senegal" },
  { id: 18, group: "Grupa I", date: "17.06.2026", time: "00:00", teamA: "Irak", teamB: "Norwegia" },
  { id: 19, group: "Grupa J", date: "17.06.2026", time: "03:00", teamA: "Argentyna", teamB: "Algieria" },
  { id: 20, group: "Grupa J", date: "17.06.2026", time: "06:00", teamA: "Austria", teamB: "Jordania" },
  { id: 21, group: "Grupa K", date: "17.06.2026", time: "19:00", teamA: "Portugalia", teamB: "Demokratyczna Republika Konga" },
  { id: 22, group: "Grupa L", date: "17.06.2026", time: "22:00", teamA: "Anglia", teamB: "Chorwacja" },
  { id: 23, group: "Grupa L", date: "18.06.2026", time: "01:00", teamA: "Ghana", teamB: "Panama" },
  { id: 24, group: "Grupa K", date: "18.06.2026", time: "04:00", teamA: "Uzbekistan", teamB: "Kolumbia" },
  { id: 25, group: "Grupa A", date: "18.06.2026", time: "18:00", teamA: "Czechy", teamB: "Republika Południowej Afryki" },
  { id: 26, group: "Grupa B", date: "18.06.2026", time: "21:00", teamA: "Szwajcaria", teamB: "Bośnia i Hercegowina" },
  { id: 27, group: "Grupa B", date: "19.06.2026", time: "00:00", teamA: "Kanada", teamB: "Katar" },
  { id: 28, group: "Grupa A", date: "19.06.2026", time: "03:00", teamA: "Meksyk", teamB: "Korea Południowa" },
  { id: 29, group: "Grupa D", date: "19.06.2026", time: "21:00", teamA: "USA", teamB: "Australia" },
  { id: 30, group: "Grupa C", date: "20.06.2026", time: "00:00", teamA: "Szkocja", teamB: "Maroko" },
  { id: 31, group: "Grupa C", date: "20.06.2026", time: "02:30", teamA: "Brazylia", teamB: "Haiti" },
  { id: 32, group: "Grupa D", date: "20.06.2026", time: "05:00", teamA: "Turcja", teamB: "Paragwaj" },
  { id: 33, group: "Grupa F", date: "20.06.2026", time: "19:00", teamA: "Holandia", teamB: "Szwecja" },
  { id: 34, group: "Grupa E", date: "20.06.2026", time: "22:00", teamA: "Niemcy", teamB: "Wybrzeże Kości Słoniowej" },
  { id: 35, group: "Grupa E", date: "21.06.2026", time: "02:00", teamA: "Ekwador", teamB: "Curacao" },
  { id: 36, group: "Grupa F", date: "21.06.2026", time: "06:00", teamA: "Tunezja", teamB: "Japonia" },
  { id: 37, group: "Grupa H", date: "21.06.2026", time: "18:00", teamA: "Hiszpania", teamB: "Arabia Saudyjska" },
  { id: 38, group: "Grupa G", date: "21.06.2026", time: "21:00", teamA: "Belgia", teamB: "Iran" },
  { id: 39, group: "Grupa H", date: "22.06.2026", time: "00:00", teamA: "Urugwaj", teamB: "Wyspy Zielonego Przylądka" },
  { id: 40, group: "Grupa G", date: "22.06.2026", time: "03:00", teamA: "Nowa Zelandia", teamB: "Egipt" },
  { id: 41, group: "Grupa J", date: "22.06.2026", time: "19:00", teamA: "Argentyna", teamB: "Austria" },
  { id: 42, group: "Grupa I", date: "22.06.2026", time: "23:00", teamA: "Francja", teamB: "Irak" },
  { id: 43, group: "Grupa I", date: "23.06.2026", time: "02:00", teamA: "Norwegia", teamB: "Senegal" },
  { id: 44, group: "Grupa J", date: "23.06.2026", time: "05:00", teamA: "Jordania", teamB: "Algieria" },
  { id: 45, group: "Grupa K", date: "23.06.2026", time: "19:00", teamA: "Portugalia", teamB: "Uzbekistan" },
  { id: 46, group: "Grupa L", date: "23.06.2026", time: "22:00", teamA: "Anglia", teamB: "Ghana" },
  { id: 47, group: "Grupa L", date: "24.06.2026", time: "01:00", teamA: "Panama", teamB: "Chorwacja" },
  { id: 48, group: "Grupa K", date: "24.06.2026", time: "04:00", teamA: "Kolumbia", teamB: "Demokratyczna Republika Konga" },
  { id: 49, group: "Grupa B", date: "24.06.2026", time: "21:00", teamA: "Szwajcaria", teamB: "Kanada" },
  { id: 50, group: "Grupa B", date: "24.06.2026", time: "21:00", teamA: "Bośnia i Hercegowina", teamB: "Katar" },
  { id: 51, group: "Grupa C", date: "25.06.2026", time: "00:00", teamA: "Maroko", teamB: "Haiti" },
  { id: 52, group: "Grupa C", date: "25.06.2026", time: "00:00", teamA: "Szkocja", teamB: "Brazylia" },
  { id: 53, group: "Grupa A", date: "25.06.2026", time: "03:00", teamA: "Republika Południowej Afryki", teamB: "Korea Południowa" },
  { id: 54, group: "Grupa A", date: "25.06.2026", time: "03:00", teamA: "Czechy", teamB: "Meksyk" },
  { id: 55, group: "Grupa E", date: "25.06.2026", time: "22:00", teamA: "Curacao", teamB: "Wybrzeże Kości Słoniowej" },
  { id: 56, group: "Grupa E", date: "25.06.2026", time: "22:00", teamA: "Ekwador", teamB: "Niemcy" },
  { id: 57, group: "Grupa F", date: "26.06.2026", time: "01:00", teamA: "Tunezja", teamB: "Holandia" },
  { id: 58, group: "Grupa F", date: "26.06.2026", time: "01:00", teamA: "Japonia", teamB: "Szwecja" },
  { id: 59, group: "Grupa D", date: "26.06.2026", time: "04:00", teamA: "Turcja", teamB: "USA" },
  { id: 60, group: "Grupa D", date: "26.06.2026", time: "04:00", teamA: "Paragwaj", teamB: "Australia" },
  { id: 61, group: "Grupa I", date: "26.06.2026", time: "21:00", teamA: "Norwegia", teamB: "Francja" },
  { id: 62, group: "Grupa I", date: "26.06.2026", time: "21:00", teamA: "Senegal", teamB: "Irak" },
  { id: 63, group: "Grupa H", date: "27.06.2026", time: "02:00", teamA: "Wyspy Zielonego Przylądka", teamB: "Arabia Saudyjska" },
  { id: 64, group: "Grupa H", date: "27.06.2026", time: "02:00", teamA: "Urugwaj", teamB: "Hiszpania" },
  { id: 65, group: "Grupa G", date: "27.06.2026", time: "05:00", teamA: "Nowa Zelandia", teamB: "Belgia" },
  { id: 66, group: "Grupa G", date: "27.06.2026", time: "05:00", teamA: "Egipt", teamB: "Iran" },
  { id: 67, group: "Grupa L", date: "27.06.2026", time: "23:00", teamA: "Panama", teamB: "Anglia" },
  { id: 68, group: "Grupa L", date: "27.06.2026", time: "23:00", teamA: "Chorwacja", teamB: "Ghana" },
  { id: 69, group: "Grupa K", date: "28.06.2026", time: "01:30", teamA: "Kolumbia", teamB: "Portugalia" },
  { id: 70, group: "Grupa K", date: "28.06.2026", time: "01:30", teamA: "Demokratyczna Republika Konga", teamB: "Uzbekistan" },
  { id: 71, group: "Grupa J", date: "28.06.2026", time: "04:00", teamA: "Algieria", teamB: "Austria" },
  { id: 72, group: "Grupa J", date: "28.06.2026", time: "04:00", teamA: "Jordania", teamB: "Argentyna" },
];

function getFlag(teamName: string) {
  return flags[teamName] || "https://flagcdn.com/w40/un.png";
}

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/[łŁ]/g, "l")
    .replace(/[ąĄ]/g, "a")
    .replace(/[ćĆ]/g, "c")
    .replace(/[ęĘ]/g, "e")
    .replace(/[ńŃ]/g, "n")
    .replace(/[óÓ]/g, "o")
    .replace(/[śŚ]/g, "s")
    .replace(/[źŹżŻ]/g, "z")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function predictionBelongsToPlayer(predictionName: string, playerName: string) {
  const prediction = normalizeName(predictionName);
  const player = normalizeName(playerName);

  return prediction === player || prediction.includes(player);
}

function getPlayerNameFromEmail(email: string) {
  const normalized = normalizeName(email || "");

  if (normalized.includes("damian")) return "Damian";
  if (normalized.includes("andrzej")) return "Andrzej";
  if (normalized.includes("fabian")) return "Fabian";
  if (normalized.includes("michal")) return "Michał";

  return email ? email.split("@")[0] : "Unknown";
}

function getTestEmailForPlayer(playerName: string) {
  const normalized = normalizeName(playerName);

  if (normalized === "damian") return "damian@test.pl";
  if (normalized === "andrzej") return "andrzej@test.pl";
  if (normalized === "fabian") return "fabian@test.pl";
  if (normalized === "michal") return "michal@test.pl";

  return "";
}

function predictionMatchesPlayer(prediction: { user_name?: string; user_email?: string }, playerName: string) {
  const testEmail = getTestEmailForPlayer(playerName);

  if (testEmail && prediction.user_email === testEmail) {
    return true;
  }

  return predictionBelongsToPlayer(prediction.user_name || "", playerName);
}

function getPowerTime(powerName: string) {
  const morningPowers = ["Vabank", "Rozdwojenie Jaźni", "Goleador"];

  const eveningPowers = [
    "Słabiak",
    "Slabiak",
    "Zamianka",
    "Złodziej",
    "Blokada",
  ];

  if (morningPowers.includes(powerName)) return "morning";
  if (eveningPowers.includes(powerName)) return "evening";

  return "evening";
}

function calculateDistance(
  predictedHome: number,
  predictedAway: number,
  realHome: number,
  realAway: number
) {
  return Math.abs(predictedHome - realHome) + Math.abs(predictedAway - realAway);
}

type PredictionsType = {
  [matchId: number]: {
    homeScore: string;
    awayScore: string;
  };
};

type ResultsType = {
  [matchId: number]: {
    homeScore: string;
    awayScore: string;
  };
};

type DoublePredictionType = {
  matchId: string;
  homeScore: string;
  awayScore: string;
};

type PodiumType = {
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
};

type AllPodiumPredictionType = {
  user_name: string;
  user_email: string;
  first_place: string;
  second_place: string;
  third_place: string;
};

type FinalPodiumResultsType = {
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
};

type AllPredictionsType = {
  user_name: string;
  user_email: string;
  match_id: number;
  home_score: number;
  away_score: number;
  power_name?: string | null;
  power_target_match_id?: number | null;
  power_home_score?: number | null;
  power_away_score?: number | null;
  power_target_team?: string | null;
};

type DailyPowerType = {
  user_name: string;
  user_email: string;
  match_date: string;
  power_name: string;
  power_time: "morning" | "evening";
  target_player?: string | null;
  created_at?: string | null;
};

// EVENING_POWER_LIVE_SCORE_FIX_2026_06_06: mocne porownywanie graczy i odswiezanie mocy
// EVENING_CARD_CLEAN_FIX_2026_06_06: oryginalne karty, bez dodatkowego przycisku w karcie
// BRACKET_TEAM_PICK_FIX_2026_06_06: wybor druzyn do slotow, znikanie juz wybranych druzyn
// STATUS_RESET_AFTER_RESULTS_2026_06_06: po wpisaniu wszystkich wynikow status typow sie zeruje
// STATUS_PHASE_FIX_2026_06_06: statusy resetuja sie per faza dnia, moce wieczorne bez ujawniania nazw
// BRACKET_VIEW_FIX_2026_06_05: drabinka jako osobny widok z poziomym przewijaniem
// POWERS_SETTLE_FIX_2026_06_05: wszystkie moce rozliczaja sie dopiero po komplecie wynikow dnia, Blokada wieczorna
// POWER_LOG_FIX_2026_06_05: log mocy pokazuje się dopiero po wpisaniu wszystkich wyników dnia
// MICHAL_POWER_USED_FIX_2026_06_24: normalizacja ł->l i dopasowanie po test.pl, aby Michałowi poprawnie blokowało wykorzystane moce
type PowerLogType = {
  id: string;
  matchDate: string;
  message: string;
  type: "info" | "block" | "power";
};


function parseMatchDate(matchDate: string) {
  const [day, month, year] = matchDate.split(".").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}


function normalizeMatchDateKey(value: string) {
  if (!value) return "";

  const raw = String(value).trim();

  const isoMatch = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const dotMatch = raw.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/);

  if (dotMatch) {
    const [, day, month, year] = dotMatch;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return raw;
}

function isSameMatchDate(a: string, b: string) {
  return normalizeMatchDateKey(a) === normalizeMatchDateKey(b);
}

function getMatchDateTime(value: string) {
  return parseMatchDate(value).getTime();
}

function getMatchKickoffTime(match: { date: string; time?: string }) {
  const kickoff = parseMatchDate(match.date);
  const [hoursValue, minutesValue] = String(match.time || "00:00")
    .split(":")
    .map(Number);

  const hours = Number.isFinite(hoursValue) ? hoursValue : 0;
  const minutes = Number.isFinite(minutesValue) ? minutesValue : 0;

  kickoff.setHours(hours, minutes, 0, 0);

  return kickoff.getTime();
}

function isMatchStillVisibleForResultInput(match: { date: string; time?: string }, now: Date) {
  const kickoffTime = getMatchKickoffTime(match);
  const visibleUntil = kickoffTime + 12 * 60 * 60 * 1000;
  const currentTime = now.getTime();

  return currentTime >= kickoffTime && currentTime <= visibleUntil;
}

function normalizePowerText(value?: string | null) {
  return normalizeName(String(value || "")).trim();
}

function isEveningPowerTime(value?: string | null) {
  return normalizePowerText(value) === "evening";
}

function normalizePowerTime(value?: string | null): "morning" | "evening" {
  return normalizePowerText(value) === "morning" ? "morning" : "evening";
}

function isPower(value: string | null | undefined, expected: string) {
  return normalizePowerText(value) === normalizePowerText(expected);
}

function normalizePlayerKey(value: string) {
  return normalizeName(value || "")
    .replace(/@.*$/, "")
    .replace(/[^a-z0-9]/g, "");
}

function samePlayerName(a: string, b: string) {
  const left = normalizePlayerKey(a);
  const right = normalizePlayerKey(b);

  return left === right || left.includes(right) || right.includes(left);
}

function findPlayerRowByName<T extends { name: string }>(rows: T[], value?: string | null): T | undefined {
  if (!value) return undefined;

  return rows.find((row) => samePlayerName(value, row.name));
}

function getDailyPowerTargetPlayer(row: any) {
  const directValue =
    row?.target_player ||
    row?.target_player_name ||
    row?.target ||
    row?.target_name ||
    row?.target_user ||
    row?.target_user_name ||
    row?.targetPlayer ||
    row?.targetPlayerName;

  if (directValue) return String(directValue);

  const targetKey = Object.keys(row || {}).find((key) => {
    if (!key.toLowerCase().includes("target")) return false;

    const value = row[key];
    if (!value) return false;

    return players.some((player) => samePlayerName(String(value), player.name));
  });

  return targetKey ? String(row[targetKey]) : null;
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getBettingWindow(matchDate: string) {
  const matchDay = parseMatchDate(matchDate);
  const opensAt = new Date(matchDay);
  opensAt.setDate(opensAt.getDate() - 1);
  opensAt.setHours(20, 0, 0, 0);

  const closesAt = new Date(matchDay);
  closesAt.setDate(closesAt.getDate() - 1);
  closesAt.setHours(23, 59, 59, 999);

  return { opensAt, closesAt };
}

function getCurrentMatchDate(matches: any[]) {
  const dates = Array.from(
    new Set(matches.map((match) => match.date).filter(Boolean))
  ).sort((a, b) => parseMatchDate(a).getTime() - parseMatchDate(b).getTime());

  if (dates.length === 0) return "";

  const now = new Date();

  const activeDate = dates.find((date) => {
    const { opensAt, closesAt } = getBettingWindow(date);
    return now >= opensAt && now <= closesAt;
  });

  if (activeDate) return activeDate;

  const nextDate = dates.find((date) => {
    const { closesAt } = getBettingWindow(date);
    return now <= closesAt;
  });

  return nextDate || dates[dates.length - 1];
}

function getPreviousMatchDate(matches: any[], currentMatchDate: string) {
  const dates = Array.from(
    new Set(matches.map((match) => match.date).filter(Boolean))
  ).sort((a, b) => parseMatchDate(a).getTime() - parseMatchDate(b).getTime());

  const currentIndex = dates.indexOf(currentMatchDate);

  if (currentIndex <= 0) return "";

  return dates[currentIndex - 1];
}

function getEveningPowerWindow(currentMatchDate: string) {
  if (!currentMatchDate) return null;

  const currentDay = parseMatchDate(currentMatchDate);

  const opensAt = new Date(currentDay);
  opensAt.setDate(opensAt.getDate() - 1);
  opensAt.setHours(12, 0, 0, 0);

  const closesAt = new Date(currentDay);
  closesAt.setDate(closesAt.getDate() - 1);
  closesAt.setHours(20, 0, 0, 0);

  return { opensAt, closesAt };
}


function isFullMatchDateFinished(matchDate: string, results: ResultsType) {
  const matchesForDate = demoMatches.filter((match) => match.date === matchDate);

  if (matchesForDate.length === 0) return false;

  return matchesForDate.every((match) => {
    const result = results[match.id];

    return (
      result &&
      result.homeScore !== "" &&
      result.awayScore !== ""
    );
  });
}

function getSortedMatchDates(matches: any[]) {
  return Array.from(
    new Set(matches.map((match) => match.date).filter(Boolean))
  ).sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));
}

function formatMatchDateKeyFromDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function getDailyPointsTableDates(matches: any[], now: Date) {
  const dates = getSortedMatchDates(matches);

  if (dates.length === 0) {
    return { settlementDate: "", liveDate: "" };
  }

  const todayKey = formatMatchDateKeyFromDate(now);
  const todayIndex = dates.findIndex((date) => isSameMatchDate(date, todayKey));
  const afterEveningSettlement = now.getHours() >= 20;

  if (todayIndex >= 0) {
    if (afterEveningSettlement) {
      return {
        settlementDate: dates[todayIndex] || "",
        liveDate: dates[todayIndex + 1] || "",
      };
    }

    return {
      settlementDate: dates[todayIndex - 1] || "",
      liveDate: dates[todayIndex] || "",
    };
  }

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const latestPastIndex = dates.reduce((lastIndex, date, index) => {
    return parseMatchDate(date).getTime() <= todayStart.getTime()
      ? index
      : lastIndex;
  }, -1);

  if (latestPastIndex < 0) {
    return {
      settlementDate: "",
      liveDate: dates[0] || "",
    };
  }

  if (afterEveningSettlement) {
    return {
      settlementDate: dates[latestPastIndex] || "",
      liveDate: dates[latestPastIndex + 1] || "",
    };
  }

  return {
    settlementDate: dates[latestPastIndex - 1] || "",
    liveDate: dates[latestPastIndex] || "",
  };
}

function getPowerStatsRevealTime(matchDate: string) {
  if (!matchDate || matchDate === "Brak daty") return null;

  const revealAt = parseMatchDate(matchDate);

  if (Number.isNaN(revealAt.getTime())) return null;

  revealAt.setDate(revealAt.getDate() + 1);
  revealAt.setHours(20, 0, 0, 0);

  return revealAt;
}

function isPowerSettledForStats(matchDate: string, results: ResultsType, now: Date) {
  const revealAt = getPowerStatsRevealTime(matchDate);

  if (!revealAt || now < revealAt) return false;

  return isFullMatchDateFinished(matchDate, results);
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const testAdminEmails = ["damian@test.pl"];
  const [isAdmin, setIsAdmin] = useState(false);
  const [predictions, setPredictions] = useState<PredictionsType>({});
  const [savedPredictions, setSavedPredictions] = useState<PredictionsType>({});
  const [results, setResults] = useState<ResultsType>({});
  const [allPredictions, setAllPredictions] = useState<AllPredictionsType[]>([]);
  const [selectedPower, setSelectedPower] = useState<string | null>(null);
  const [savedPower, setSavedPower] = useState<string | null>(null);
  const [selectedGoleadorTeam, setSelectedGoleadorTeam] = useState("");
  const [selectedEveningPower, setSelectedEveningPower] = useState<string | null>(null);
  const [savedEveningPower, setSavedEveningPower] = useState<string | null>(null);
  const [selectedEveningTargetPlayer, setSelectedEveningTargetPlayer] = useState("");
  const [savedEveningTargetPlayer, setSavedEveningTargetPlayer] = useState("");
  const [allDailyPowers, setAllDailyPowers] = useState<DailyPowerType[]>([]);
  const [isEditingPredictions, setIsEditingPredictions] = useState(true);
  const [powerTab, setPowerTab] = useState<"morning" | "evening">("morning");
  const [doublePrediction, setDoublePrediction] =
    useState<DoublePredictionType>({
      matchId: "",
      homeScore: "",
      awayScore: "",
    });
  const [podiumPrediction, setPodiumPrediction] = useState<PodiumType>({
    firstPlace: "",
    secondPlace: "",
    thirdPlace: "",
  });
  const [savedPodiumPrediction, setSavedPodiumPrediction] =
    useState<PodiumType | null>(null);
  const [allPodiumPredictions, setAllPodiumPredictions] = useState<
    AllPodiumPredictionType[]
  >([]);
  const [finalPodiumResults, setFinalPodiumResults] = useState<FinalPodiumResultsType>({
    firstPlace: "",
    secondPlace: "",
    thirdPlace: "",
  });
  const [savedFinalPodiumResults, setSavedFinalPodiumResults] =
    useState<FinalPodiumResultsType | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "bracket">("dashboard");
  const [isPredictionsTableOpen, setIsPredictionsTableOpen] = useState(false);
  const [isFinalPodiumOpen, setIsFinalPodiumOpen] = useState(false);
  const [isDailyPointsOpen, setIsDailyPointsOpen] = useState(false);
  const [isLiveDailyPointsOpen, setIsLiveDailyPointsOpen] = useState(false);
  const [isMatchOnlyStandingsOpen, setIsMatchOnlyStandingsOpen] = useState(false);
  const [selectedPowerStatsPlayer, setSelectedPowerStatsPlayer] = useState<string | null>(null);
  const [bracketSlots, setBracketSlots] = useState<Record<string, string>>({});

  const router = useRouter();

  const currentMatchDate = useMemo(() => getCurrentMatchDate(demoMatches), []);

  const visibleMatches = useMemo(() => {
    return demoMatches.filter((match) => match.date === currentMatchDate);
  }, [currentMatchDate]);

  const currentBettingWindow = useMemo(() => {
    if (!currentMatchDate) return null;

    return getBettingWindow(currentMatchDate);
  }, [currentMatchDate]);

  const previousMatchDate = useMemo(() => {
    return getPreviousMatchDate(demoMatches, currentMatchDate);
  }, [currentMatchDate]);

  const resultInputMatches = useMemo(() => {
    const datesToShow = new Set<string>();
    const resultInputNow = new Date();

    if (previousMatchDate) {
      datesToShow.add(previousMatchDate);
    }

    if (currentMatchDate) {
      datesToShow.add(currentMatchDate);
    }

    return demoMatches
      .filter((match) => {
        return (
          datesToShow.has(match.date) ||
          isMatchStillVisibleForResultInput(match, resultInputNow)
        );
      })
      .sort((a, b) => {
        const dateDiff = getMatchDateTime(a.date) - getMatchDateTime(b.date);

        if (dateDiff !== 0) return dateDiff;

        return String(a.time || "").localeCompare(String(b.time || ""));
      });
  }, [currentMatchDate, previousMatchDate]);


  const eveningSettlementDate = useMemo(() => {
    const finishedDates = Array.from(
      new Set(demoMatches.map((match) => match.date).filter(Boolean))
    )
      .filter((date) => isFullMatchDateFinished(date, results))
      .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));

    return finishedDates[finishedDates.length - 1] || previousMatchDate;
  }, [results, previousMatchDate]);

  const eveningPowerWindow = useMemo(() => {
    return getEveningPowerWindow(currentMatchDate);
  }, [currentMatchDate]);

  const now = new Date();
  const isBeforeBettingOpen =
    Boolean(currentBettingWindow) && now < currentBettingWindow!.opensAt;
  const isAfterDeadline =
    Boolean(currentBettingWindow) && now > currentBettingWindow!.closesAt;
  const isBettingOpen =
    Boolean(currentBettingWindow) &&
    now >= currentBettingWindow!.opensAt &&
    now <= currentBettingWindow!.closesAt;

  const isEveningPowerWindow =
    Boolean(eveningPowerWindow) &&
    Boolean(previousMatchDate) &&
    now >= eveningPowerWindow!.opensAt &&
    now <= eveningPowerWindow!.closesAt;


  const isDoublePowerSelected = isPower(selectedPower, "Rozdwojenie Jaźni");
  const isDoublePowerSaved = isPower(savedPower, "Rozdwojenie Jaźni");

  const filteredPowers = useMemo(() => {
    return powers.filter((power) => getPowerTime(power.name) === powerTab);
  }, [powerTab]);

  const usedPowerNames = useMemo(() => {
    const used = new Set<string>();

    allPredictions
      .filter((prediction) =>
        predictionMatchesPlayer(prediction, userName)
      )
      .forEach((prediction) => {
        if (prediction.power_name) {
          used.add(prediction.power_name);
        }
      });

    allDailyPowers
      .filter((power) => predictionMatchesPlayer(power, userName))
      .forEach((power) => {
        if (power.power_name) {
          used.add(power.power_name);
        }
      });

    if (savedPower) {
      used.add(savedPower);
    }

    if (savedEveningPower) {
      used.add(savedEveningPower);
    }

    return used;
  }, [allPredictions, allDailyPowers, savedPower, savedEveningPower, userName]);

  const loadKnockoutBracket = async () => {
    const { data } = await supabase.from("knockout_bracket").select("*");

    if (data) {
      const loaded: Record<string, string> = {};

      data.forEach((row: any) => {
        loaded[row.slot_id] = row.team_name || "";
      });

      setBracketSlots(loaded);
    }
  };

  const loadAllPredictions = async () => {
    const { data } = await supabase.from("predictions").select("*");

    if (data) {
      const mapped = data.map((p: any) => ({
        user_name: getPlayerNameFromEmail(p.user_email || ""),
        user_email: p.user_email || "",
        match_id: p.match_id,
        home_score: p.home_score,
        away_score: p.away_score,
        power_name: p.power_name || null,
        power_target_match_id: p.power_target_match_id || null,
        power_home_score: p.power_home_score ?? null,
        power_away_score: p.power_away_score ?? null,
        power_target_team: p.power_target_team || null,
      }));

      setAllPredictions(mapped);
    }
  };

  const loadAllPodiumPredictions = async () => {
    const { data } = await supabase.from("final_predictions").select("*");

    if (data) {
      const mapped = data.map((p: any) => ({
        user_name: getPlayerNameFromEmail(p.user_email || ""),
        user_email: p.user_email || "",
        first_place: p.first_place || "",
        second_place: p.second_place || "",
        third_place: p.third_place || "",
      }));

      const uniquePodiumPredictions = Array.from(
        new Map(
          mapped.map((prediction: AllPodiumPredictionType) => [
            prediction.user_email || prediction.user_name,
            prediction,
          ])
        ).values()
      );

      setAllPodiumPredictions(uniquePodiumPredictions);
    }
  };

  const loadFinalPodiumResults = async () => {
    const { data, error } = await supabase
      .from("final_podium_results")
      .select("*")
      .eq("id", "official")
      .maybeSingle();

    if (error) {
      console.warn("Brak tabeli final_podium_results albo błąd odczytu:", error.message);
      return;
    }

    if (data) {
      const loadedResults = {
        firstPlace: data.first_place || "",
        secondPlace: data.second_place || "",
        thirdPlace: data.third_place || "",
      };

      setFinalPodiumResults(loadedResults);
      setSavedFinalPodiumResults(loadedResults);
    }
  };

  const loadAllDailyPowers = async () => {
    const { data } = await supabase
      .from("daily_powers")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      const mapped = data.map((p: any) => ({
        user_name: getPlayerNameFromEmail(p.user_email || ""),
        user_email: p.user_email || "",
        match_date: String(p.match_date || "").trim(),
        power_name: String(p.power_name || "").trim(),
        power_time: normalizePowerTime(p.power_time),
        target_player: getDailyPowerTargetPlayer(p),
        created_at: p.created_at || null,
      }));

      setAllDailyPowers(mapped);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const activeUser = user;

      if (!activeUser) return;

      if (activeUser.email) {
        setUserName(getPlayerNameFromEmail(activeUser.email || ""));
        setIsAdmin(testAdminEmails.includes(activeUser.email));
      }

      const currentMatchIds = visibleMatches.map((match) => match.id);

      const { data: predictionsData } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", activeUser.id)
        .in("match_id", currentMatchIds);

      if (predictionsData) {
        const loadedPredictions: PredictionsType = {};
        let loadedPower: string | null = null;
        let loadedDouble: DoublePredictionType = {
          matchId: "",
          homeScore: "",
          awayScore: "",
        };

        predictionsData.forEach((prediction: any) => {
          loadedPredictions[prediction.match_id] = {
            homeScore: prediction.home_score?.toString() || "",
            awayScore: prediction.away_score?.toString() || "",
          };

          if (prediction.power_name) {
            loadedPower = prediction.power_name;
          }

          if (isPower(prediction.power_name, "Goleador") && prediction.power_target_team) {
            setSelectedGoleadorTeam(prediction.power_target_team);
          }

          if (
            isPower(prediction.power_name, "Rozdwojenie Jaźni") &&
            prediction.power_target_match_id
          ) {
            loadedDouble = {
              matchId: prediction.power_target_match_id.toString(),
              homeScore: prediction.power_home_score?.toString() || "",
              awayScore: prediction.power_away_score?.toString() || "",
            };
          }
        });

        setPredictions(loadedPredictions);
        setSavedPredictions(loadedPredictions);
        setSelectedPower(loadedPower);
        setSavedPower(loadedPower);
        setDoublePrediction(loadedDouble);

        if (loadedPower) {
          setPowerTab(getPowerTime(loadedPower));
        }

        const hasLoadedFullCurrentMatchDate =
          currentMatchIds.length > 0 &&
          currentMatchIds.every((matchId) => loadedPredictions[matchId]);

        if (hasLoadedFullCurrentMatchDate) {
          setIsEditingPredictions(false);
        } else {
          setIsEditingPredictions(true);
        }
      }

      const { data: podiumData } = await supabase
        .from("final_predictions")
        .select("*")
        .eq("user_id", activeUser.id)
        .maybeSingle();

      if (podiumData) {
        const loadedPodium = {
          firstPlace: podiumData.first_place || "",
          secondPlace: podiumData.second_place || "",
          thirdPlace: podiumData.third_place || "",
        };

        setPodiumPrediction(loadedPodium);
        setSavedPodiumPrediction(loadedPodium);
      }

      const { data: dailyPowerData } = await supabase
        .from("daily_powers")
        .select("*")
        .eq("user_id", activeUser.id);

      if (dailyPowerData) {
        const activeEveningMatchDate = eveningSettlementDate || previousMatchDate;

        const eveningForPreviousDay = dailyPowerData.find(
          (power: any) =>
            isSameMatchDate(power.match_date, activeEveningMatchDate) &&
            isEveningPowerTime(power.power_time)
        );

        if (eveningForPreviousDay) {
          setSavedEveningPower(eveningForPreviousDay.power_name);
          setSelectedEveningPower(eveningForPreviousDay.power_name);
          setSelectedEveningTargetPlayer(eveningForPreviousDay.target_player || "");
          setSavedEveningTargetPlayer(eveningForPreviousDay.target_player || "");
        }
      }


      const { data: resultsData } = await supabase.from("results").select("*");

      if (resultsData) {
        const loadedResults: ResultsType = {};

        resultsData.forEach((result: any) => {
          loadedResults[result.match_id] = {
            homeScore: result.home_score?.toString() || "",
            awayScore: result.away_score?.toString() || "",
          };
        });

        setResults(loadedResults);
      }

      await loadAllPredictions();
      await loadAllPodiumPredictions();
      await loadFinalPodiumResults();
      await loadAllDailyPowers();
      await loadKnockoutBracket();
    };

    loadData();
  }, [currentMatchDate]);

  useEffect(() => {
    const refreshLiveData = async () => {
      await loadAllPredictions();
      await loadAllDailyPowers();
    };

    const intervalId = window.setInterval(refreshLiveData, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!userName || !eveningSettlementDate) return;

    const userEveningPower = allDailyPowers.find(
      (power) =>
        isSameMatchDate(power.match_date, eveningSettlementDate) &&
        isEveningPowerTime(power.power_time) &&
        predictionMatchesPlayer(power, userName)
    );

    if (userEveningPower) {
      const savedTarget = userEveningPower.target_player || "";
      const hasUnsavedEveningSelection =
        isEveningPowerWindow &&
        Boolean(selectedEveningPower) &&
        (
          !isPower(selectedEveningPower, userEveningPower.power_name) ||
          (selectedEveningTargetPlayer || "") !== savedTarget
        );

      setSavedEveningPower(userEveningPower.power_name);
      setSavedEveningTargetPlayer(savedTarget);

      if (!hasUnsavedEveningSelection) {
        setSelectedEveningPower(userEveningPower.power_name);
        setSelectedEveningTargetPlayer(savedTarget);
      }

      return;
    }

    setSavedEveningPower(null);
    setSavedEveningTargetPlayer("");
  }, [
    allDailyPowers,
    userName,
    eveningSettlementDate,
    isEveningPowerWindow,
    selectedEveningPower,
    selectedEveningTargetPlayer,
  ]);

  const isCurrentMatchDateFinished =
    Boolean(currentMatchDate) && isFullMatchDateFinished(currentMatchDate, results);

  const isEveningStatusMode =
    Boolean(previousMatchDate) &&
    Boolean(eveningPowerWindow) &&
    now >= eveningPowerWindow!.opensAt &&
    now <= eveningPowerWindow!.closesAt;

  const activeEveningStatusMatchDate = eveningSettlementDate || previousMatchDate;

  const playerStatuses = useMemo(() => {
    const currentMatchIds = visibleMatches.map((match) => match.id);

    return players.map((player) => {
      const currentDayPredictions = allPredictions.filter(
        (prediction) =>
          currentMatchIds.includes(prediction.match_id) &&
          predictionMatchesPlayer(prediction, player.name)
      );

      const usedMorningPower = currentDayPredictions.some(
        (prediction) =>
          prediction.power_name &&
          getPowerTime(prediction.power_name) === "morning"
      );

      const hasFullDayPredictions =
        currentMatchIds.length > 0 &&
        currentMatchIds.every((matchId) =>
          currentDayPredictions.some((prediction) => prediction.match_id === matchId)
        );

      const usedEveningPowerRecord = allDailyPowers.find(
        (power) =>
          isSameMatchDate(power.match_date, activeEveningStatusMatchDate) &&
          isEveningPowerTime(power.power_time) &&
          predictionBelongsToPlayer(power.user_name, player.name)
      );

      const usedEveningPower = Boolean(usedEveningPowerRecord);

      const hasPodiumPrediction = allPodiumPredictions.some((prediction) =>
        predictionMatchesPlayer(prediction, player.name)
      );

      if (isCurrentMatchDateFinished && !isEveningStatusMode) {
        return {
          ...player,
          statusPhase: "finished" as const,
          hasPredictions: false,
          hasPower: false,
          hasMorningPower: false,
          hasEveningPower: false,
          eveningPowerName: null,
          hasPodiumPrediction,
        };
      }

      if (isEveningStatusMode) {
        return {
          ...player,
          statusPhase: "evening" as const,
          hasPredictions: false,
          hasPower: usedEveningPower,
          hasMorningPower: false,
          hasEveningPower: usedEveningPower,
          eveningPowerName: usedEveningPowerRecord?.power_name || null,
          hasPodiumPrediction,
        };
      }

      return {
        ...player,
        statusPhase: "morning" as const,
        hasPredictions: hasFullDayPredictions,
        hasPower: usedMorningPower,
        hasMorningPower: usedMorningPower,
        hasEveningPower: false,
        eveningPowerName: null,
        hasPodiumPrediction,
      };
    });
  }, [
    allPredictions,
    allDailyPowers,
    allPodiumPredictions,
    visibleMatches,
    activeEveningStatusMatchDate,
    isEveningStatusMode,
    isCurrentMatchDateFinished,
  ]);

  const currentVisibleMatchIdsForSubmit = visibleMatches.map((match) => match.id);

  const hasPlayerSubmittedFullCurrentMatchDate = (playerName: string) => {
    if (currentVisibleMatchIdsForSubmit.length === 0) return false;

    return currentVisibleMatchIdsForSubmit.every((matchId) =>
      allPredictions.some(
        (prediction) =>
          prediction.match_id === matchId &&
          predictionMatchesPlayer(prediction, playerName)
      )
    );
  };

  const submittedPlayersCount = players.filter((player) =>
    hasPlayerSubmittedFullCurrentMatchDate(player.name)
  ).length;

  const allPlayersSubmitted =
    players.length > 0 && submittedPlayersCount === players.length;

  const isPredictionLocked = isAfterDeadline || allPlayersSubmitted;

  const hasPlayerSubmittedFullMatchDate = (playerName: string, matchDate: string) => {
    const matchesForDate = demoMatches.filter((match) => match.date === matchDate);

    if (matchesForDate.length === 0) return false;

    return matchesForDate.every((match) =>
      allPredictions.some(
        (prediction) =>
          prediction.match_id === match.id &&
          predictionMatchesPlayer(prediction, playerName)
      )
    );
  };

  const isPredictionTableMatchRevealed = (match: any) => {
    const matchDate = String(match?.date || "");

    if (!matchDate) return true;

    const allSubmittedForDate = players.every((player) =>
      hasPlayerSubmittedFullMatchDate(player.name, matchDate)
    );

    if (allSubmittedForDate) return true;

    const isNormalMatchDate = /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(matchDate);

    if (!isNormalMatchDate) return false;

    const { closesAt } = getBettingWindow(matchDate);

    return now > closesAt;
  };

  const bracketPredictionTableMatches = useMemo(() => {
    const firstRound = knockoutFirstRoundMatches.map((match) => ({
      id: Number(match.id.replace("M", "")),
      group: "Drabinka — 1/32 finału",
      date: match.date,
      time: match.time,
      teamA: match.homeSlot,
      teamB: match.awaySlot,
    }));

    const laterRounds = knockoutLaterRounds.flatMap((round, roundIndex) =>
      round.items.map((item, itemIndex) => {
        const [homeSlot = item, awaySlot = ""] = item.split(" vs ");

        return {
          id: 1000 + roundIndex * 100 + itemIndex,
          group: `Drabinka — ${round.title}`,
          date: "",
          time: "",
          teamA: homeSlot,
          teamB: awaySlot,
        };
      })
    );

    return [...firstRound, ...laterRounds];
  }, []);

  const allPredictionTableMatches = useMemo(() => {
    return [...fullGroupPredictionTableMatches, ...bracketPredictionTableMatches];
  }, [bracketPredictionTableMatches]);

  const predictionTableMatches = useMemo(() => {
    const datesToShow = new Set<string>();

    if (previousMatchDate) {
      datesToShow.add(previousMatchDate);
    }

    if (currentMatchDate) {
      datesToShow.add(currentMatchDate);
    }

    return demoMatches
      .filter((match) => datesToShow.has(match.date))
      .sort((a, b) => {
        const dateDiff = getMatchDateTime(a.date) - getMatchDateTime(b.date);

        if (dateDiff !== 0) return dateDiff;

        return String(a.time || "").localeCompare(String(b.time || ""));
      });
  }, [currentMatchDate, previousMatchDate]);

  const resolvePredictionTableMatch = (match: any) => {
    if (typeof match.id === "number" && match.group?.startsWith("Drabinka")) {
      return {
        ...match,
        teamA: bracketSlots[`M${match.id}_home`] || match.teamA,
        teamB: bracketSlots[`M${match.id}_away`] || match.teamB,
      };
    }

    return getDisplayMatch(match);
  };

  const getScoringMatchDate = (match: any) => match.date;

  const isBracketPlaceholderTeam = (teamName: string) => {
    return !worldCupTeams.includes(teamName);
  };

  const getBracketSlotIdForMatchSide = (
    matchId: number,
    side: "home" | "away"
  ) => {
    return `M${matchId}_${side}`;
  };

  const getResolvedMatchTeam = (match: any, side: "home" | "away") => {
    const rawTeamName = side === "home" ? match.teamA : match.teamB;
    const slotId = getBracketSlotIdForMatchSide(match.id, side);

    return bracketSlots[slotId] || rawTeamName;
  };

  const getDisplayMatch = (match: any) => ({
    ...match,
    teamA: getResolvedMatchTeam(match, "home"),
    teamB: getResolvedMatchTeam(match, "away"),
  });

  const matchNeedsTeamSelection = (match: any) => {
    return (
      isBracketPlaceholderTeam(match.teamA) ||
      isBracketPlaceholderTeam(match.teamB)
    );
  };


  const calculateGoleadorBonusForPrediction = (
    match: any,
    prediction?: AllPredictionsType | null
  ) => {
    const result = results[Number(match.id)];

    const hasResult =
      result !== undefined &&
      result.homeScore !== "" &&
      result.awayScore !== "";

    if (!hasResult || !prediction) return 0;

    const realHome = Number(result.homeScore);
    const realAway = Number(result.awayScore);

    if (Number.isNaN(realHome) || Number.isNaN(realAway)) return 0;

    if (
      !isPower(prediction.power_name, "Goleador") ||
      !prediction.power_target_team
    ) {
      return 0;
    }

    const resolvedHomeTeam = getResolvedMatchTeam(match, "home");
    const resolvedAwayTeam = getResolvedMatchTeam(match, "away");

    let bonus = 0;

    if (prediction.power_target_team === resolvedHomeTeam) {
      bonus += realHome;
    }

    if (prediction.power_target_team === resolvedAwayTeam) {
      bonus += realAway;
    }

    return bonus;
  };

  const calculateMatchPointsForPlayer = (match: any, playerName: string) => {
    const matchId = Number(match.id);
    const result = results[matchId];

    const hasResult =
      result !== undefined &&
      result.homeScore !== "" &&
      result.awayScore !== "";

    if (!hasResult) return null;

    const realHome = Number(result.homeScore);
    const realAway = Number(result.awayScore);

    if (Number.isNaN(realHome) || Number.isNaN(realAway)) return null;

    const matchPredictions = allPredictions
      .filter((prediction) => prediction.match_id === matchId)
      .map((prediction) => {
        const baseDistance = calculateDistance(
          prediction.home_score,
          prediction.away_score,
          realHome,
          realAway
        );

        const hasDoubleForThisMatch =
          isPower(prediction.power_name, "Rozdwojenie Jaźni") &&
          prediction.power_target_match_id === matchId &&
          prediction.power_home_score !== null &&
          prediction.power_home_score !== undefined &&
          prediction.power_away_score !== null &&
          prediction.power_away_score !== undefined;

        if (!hasDoubleForThisMatch) {
          return {
            ...prediction,
            effective_home_score: prediction.home_score,
            effective_away_score: prediction.away_score,
            distance: baseDistance,
          };
        }

        const doubleDistance = calculateDistance(
          Number(prediction.power_home_score),
          Number(prediction.power_away_score),
          realHome,
          realAway
        );

        if (doubleDistance < baseDistance) {
          return {
            ...prediction,
            effective_home_score: Number(prediction.power_home_score),
            effective_away_score: Number(prediction.power_away_score),
            distance: doubleDistance,
          };
        }

        return {
          ...prediction,
          effective_home_score: prediction.home_score,
          effective_away_score: prediction.away_score,
          distance: baseDistance,
        };
      });

    const playerPrediction = matchPredictions.find((prediction) =>
      predictionMatchesPlayer(prediction, playerName)
    );

    if (!playerPrediction || matchPredictions.length === 0) return null;

    let points = 0;

    const exactHits = matchPredictions.filter(
      (prediction) =>
        prediction.effective_home_score === realHome &&
        prediction.effective_away_score === realAway
    );

    const playerExactHit =
      playerPrediction.effective_home_score === realHome &&
      playerPrediction.effective_away_score === realAway;

    if (exactHits.length === 1 && playerExactHit) {
      points += 5;
    } else if (exactHits.length > 1 && playerExactHit) {
      points += 4;
    } else if (exactHits.length === 0) {
      const minDistance = Math.min(
        ...matchPredictions.map((prediction) => prediction.distance)
      );
      const closest = matchPredictions.filter(
        (prediction) => prediction.distance === minDistance
      );
      const playerClosest = closest.some((prediction) =>
        predictionMatchesPlayer(prediction, playerName)
      );

      if (playerClosest) {
        points += closest.length === 1 ? 2 : 1;
      }
    }

    points += calculateGoleadorBonusForPrediction(match, playerPrediction);

    return points;
  };

  const getAvailableTeamsForBracketSlot = (slotId: string) => {
    const selectedTeam = bracketSlots[slotId] || "";

    return worldCupTeams.filter((team) => {
      if (team === selectedTeam) return true;

      return !Object.entries(bracketSlots).some(
        ([otherSlotId, otherTeam]) =>
          otherSlotId !== slotId && otherTeam === team
      );
    });
  };

  const standings = useMemo(() => {
    type StandingRowInternal = {
      name: string;
      points: number;
      exact_hits: number;
      daily_points: Record<string, number>;
    };

    const table: StandingRowInternal[] = players.map((player) => ({
      name: player.name,
      points: 0,
      exact_hits: 0,
      daily_points: {} as Record<string, number>,
    }));

    const addDailyPoints = (playerName: string, matchDate: string, points: number) => {
      const player = table.find((row) =>
        predictionBelongsToPlayer(playerName, row.name)
      );

      if (!player) return;

      if (player.daily_points[matchDate] === undefined) {
        player.daily_points[matchDate] = 0;
      }

      player.daily_points[matchDate] += points;
      player.points += points;
    };

    const addExactHit = (playerName: string) => {
      const player = table.find((row) =>
        predictionBelongsToPlayer(playerName, row.name)
      );

      if (player) {
        player.exact_hits += 1;
      }
    };

    demoMatches.forEach((match) => {
      const result = results[match.id];

      if (!result) return;

      const matchDate = getScoringMatchDate(match);
      const isFinishedDay = isFullMatchDateFinished(matchDate, results);

      table.forEach((player) => {
        if (player.daily_points[matchDate] === undefined) {
          player.daily_points[matchDate] = 0;
        }
      });

      const realHome = Number(result.homeScore);
      const realAway = Number(result.awayScore);

      const matchPredictions = allPredictions
        .filter((p) => p.match_id === match.id)
        .map((p) => {
          const baseDistance = calculateDistance(
            p.home_score,
            p.away_score,
            realHome,
            realAway
          );

          const hasDoubleForThisMatch =
            isPower(p.power_name, "Rozdwojenie Jaźni") &&
            p.power_target_match_id === match.id &&
            p.power_home_score !== null &&
            p.power_home_score !== undefined &&
            p.power_away_score !== null &&
            p.power_away_score !== undefined;

          if (!hasDoubleForThisMatch) {
            return {
              ...p,
              effective_home_score: p.home_score,
              effective_away_score: p.away_score,
              distance: baseDistance,
            };
          }

          const doubleDistance = calculateDistance(
            Number(p.power_home_score),
            Number(p.power_away_score),
            realHome,
            realAway
          );

          if (doubleDistance < baseDistance) {
            return {
              ...p,
              effective_home_score: Number(p.power_home_score),
              effective_away_score: Number(p.power_away_score),
              distance: doubleDistance,
            };
          }

          return {
            ...p,
            effective_home_score: p.home_score,
            effective_away_score: p.away_score,
            distance: baseDistance,
          };
        });

      if (matchPredictions.length === 0) return;

      const exactHits = matchPredictions.filter(
        (p) =>
          p.effective_home_score === realHome &&
          p.effective_away_score === realAway
      );

      if (exactHits.length === 1) {
        addDailyPoints(exactHits[0].user_name, matchDate, 5);
        addExactHit(exactHits[0].user_name);
      } else if (exactHits.length > 1) {
        exactHits.forEach((hit) => {
          addDailyPoints(hit.user_name, matchDate, 4);
          addExactHit(hit.user_name);
        });
      } else {
        const minDistance = Math.min(...matchPredictions.map((d) => d.distance));
        const closest = matchPredictions.filter((d) => d.distance === minDistance);

        if (closest.length === 1) {
          addDailyPoints(closest[0].user_name, matchDate, 2);
        } else {
          closest.forEach((hit) => {
            addDailyPoints(hit.user_name, matchDate, 1);
          });
        }
      }

      matchPredictions.forEach((prediction) => {
        if (!isPower(prediction.power_name, "Goleador") || !prediction.power_target_team) {
          return;
        }

        let bonus = 0;
        const resolvedHomeTeam = getResolvedMatchTeam(match, "home");
        const resolvedAwayTeam = getResolvedMatchTeam(match, "away");

        if (prediction.power_target_team === resolvedHomeTeam) {
          bonus = realHome;
        }

        if (prediction.power_target_team === resolvedAwayTeam) {
          bonus = realAway;
        }

        if (bonus > 0) {
          addDailyPoints(prediction.user_name, matchDate, bonus);
        }
      });
    });

    const allMatchDates = Array.from(
      new Set(demoMatches.map((match) => match.date).filter(Boolean))
    ) as string[];

    const getDailyPointsTotal = (date: string) =>
      table.reduce((sum, player) => sum + Math.abs(player.daily_points[date] || 0), 0);

    const getEveningPowerApplyDate = (powerDate: string) => {
      const directDate =
        allMatchDates.find((date) => isSameMatchDate(date, powerDate)) || powerDate;

      if (getDailyPointsTotal(directDate) > 0) {
        return directDate;
      }

      const datesWithPoints = allMatchDates
        .filter((date) => isFullMatchDateFinished(date, results))
        .filter((date) => getDailyPointsTotal(date) > 0)
        .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));

      if (datesWithPoints.length === 0) {
        return directDate;
      }

      const directTime = getMatchDateTime(directDate);

      const nearestAfter = datesWithPoints.find(
        (date) => getMatchDateTime(date) >= directTime
      );

      return nearestAfter || datesWithPoints[datesWithPoints.length - 1];
    };

    allMatchDates.forEach((matchDate) => {
      table.forEach((player) => {
        if (player.daily_points[matchDate] === undefined) {
          player.daily_points[matchDate] = 0;
        }
      });

      const isEveningPowerSettledForDate = isPowerSettledForStats(
        matchDate,
        results,
        now
      );

      const eveningPowersForDay = isEveningPowerSettledForDate
        ? allDailyPowers
            .filter(
              (power) =>
                isSameMatchDate(getEveningPowerApplyDate(power.match_date), matchDate) &&
                isEveningPowerTime(power.power_time)
            )
            .sort((a, b) =>
              String(a.created_at || "").localeCompare(String(b.created_at || ""))
            )
        : [];

      const isFullDayFinished = isFullMatchDateFinished(matchDate, results);
      const hasAnyMorningPointsForDate = getDailyPointsTotal(matchDate) > 0;
      const shouldSettleDate =
        hasAnyMorningPointsForDate || isFullDayFinished || eveningPowersForDay.length > 0;

      if (!shouldSettleDate) {
        return;
      }

      const blockedPlayers = new Set<string>();

      allPredictions.forEach((prediction) => {
        if (prediction.power_name !== "Blokada") return;

        const powerMatch = demoMatches.find((match) => match.id === prediction.match_id);

        if (powerMatch?.date === matchDate) {
          const player = table.find((row) =>
            predictionMatchesPlayer(prediction, row.name)
          );

          if (player) {
            blockedPlayers.add(player.name);
          }
        }
      });

      if (isEveningPowerSettledForDate) {
        allDailyPowers.forEach((power) => {
          if (!isPower(power.power_name, "Blokada")) return;
          if (!isSameMatchDate(getEveningPowerApplyDate(power.match_date), matchDate)) return;

          const player = findPlayerRowByName(
            table,
            power.user_name || power.user_email
          );

          if (player) {
            blockedPlayers.add(player.name);
          }
        });
      }

      table.forEach((player) => {
        const vabankPrediction = allPredictions.find((prediction) => {
          if (prediction.power_name !== "Vabank") return false;
          if (!predictionMatchesPlayer(prediction, player.name)) return false;

          const powerMatch = demoMatches.find((match) => match.id === prediction.match_id);

          return powerMatch?.date === matchDate;
        });

        if (!vabankPrediction) return;

        const dayPoints = player.daily_points[matchDate] || 0;

        if (dayPoints === 0 && !isFullDayFinished) {
          return;
        }

        player.points -= dayPoints;

        if (dayPoints === 0) {
          player.daily_points[matchDate] = -4;
          player.points -= 4;
        } else {
          player.daily_points[matchDate] = dayPoints * 2;
          player.points += dayPoints * 2;
        }
      });

      eveningPowersForDay.forEach((power) => {
        const actor = findPlayerRowByName(
          table,
          power.user_name || power.user_email
        );

        if (!actor) return;

        if (isPower(power.power_name, "Słabiak")) {
          const unblockedPlayers = table.filter(
            (player) => !blockedPlayers.has(player.name)
          );

          const sortedByPoints = [...unblockedPlayers].sort(
            (a, b) => (b.daily_points[matchDate] || 0) - (a.daily_points[matchDate] || 0)
          );

          const reversedPoints = sortedByPoints
            .map((player) => player.daily_points[matchDate] || 0)
            .reverse();

          sortedByPoints.forEach((player, index) => {
            const oldPoints = player.daily_points[matchDate] || 0;
            const newPoints = reversedPoints[index] || 0;

            player.points += newPoints - oldPoints;
            player.daily_points[matchDate] = newPoints;
          });
        }

        if (isPower(power.power_name, "Zamianka") && power.target_player) {
          const target = findPlayerRowByName(table, power.target_player);

          if (!target || blockedPlayers.has(target.name)) return;

          const actorPoints = actor.daily_points[matchDate] || 0;
          const targetPoints = target.daily_points[matchDate] || 0;

          actor.points += targetPoints - actorPoints;
          target.points += actorPoints - targetPoints;

          actor.daily_points[matchDate] = targetPoints;
          target.daily_points[matchDate] = actorPoints;
        }

        if (isPower(power.power_name, "Złodziej") && power.target_player) {
          const target = findPlayerRowByName(table, power.target_player);

          if (!target || blockedPlayers.has(target.name)) return;

          const targetPoints = target.daily_points[matchDate] || 0;

          actor.points += targetPoints;
          target.points -= targetPoints;

          actor.daily_points[matchDate] =
            (actor.daily_points[matchDate] || 0) + targetPoints;
          target.daily_points[matchDate] = 0;
        }
      });
    });

    if (savedFinalPodiumResults) {
      allPodiumPredictions.forEach((prediction) => {
        const player = findPlayerRowByName(
          table,
          prediction.user_name || prediction.user_email
        );

        if (!player) return;

        let podiumBonus = 0;

        if (prediction.first_place === savedFinalPodiumResults.firstPlace) {
          podiumBonus += 9;
        }

        if (prediction.second_place === savedFinalPodiumResults.secondPlace) {
          podiumBonus += 6;
        }

        if (prediction.third_place === savedFinalPodiumResults.thirdPlace) {
          podiumBonus += 3;
        }

        if (podiumBonus > 0) {
          player.points += podiumBonus;
          player.daily_points.PODIUM = (player.daily_points.PODIUM || 0) + podiumBonus;
        }
      });
    }

    return table;
  }, [results, allPredictions, allDailyPowers, bracketSlots, savedFinalPodiumResults, allPodiumPredictions]);

  const matchOnlyStandings = useMemo(() => {
    const table = players.map((player) => ({
      name: player.name,
      points: 0,
      exact_hits: 0,
    }));

    const findPlayerForPrediction = (prediction: AllPredictionsType) => {
      return table.find(
        (row) =>
          predictionMatchesPlayer(prediction, row.name) ||
          samePlayerName(prediction.user_name || "", row.name) ||
          samePlayerName(prediction.user_email || "", row.name)
      );
    };

    const addMatchOnlyPoints = (
      prediction: AllPredictionsType,
      points: number,
      exactHit = false
    ) => {
      const player = findPlayerForPrediction(prediction);

      if (!player) return;

      player.points += points;

      if (exactHit) {
        player.exact_hits += 1;
      }
    };

    demoMatches.forEach((match) => {
      const result = results[match.id];

      const hasResult =
        result !== undefined &&
        result.homeScore !== "" &&
        result.awayScore !== "";

      if (!hasResult) return;

      const realHome = Number(result.homeScore);
      const realAway = Number(result.awayScore);

      if (Number.isNaN(realHome) || Number.isNaN(realAway)) return;

      const matchPredictions = allPredictions
        .filter((prediction) => prediction.match_id === match.id)
        .map((prediction) => ({
          ...prediction,
          distance: calculateDistance(
            prediction.home_score,
            prediction.away_score,
            realHome,
            realAway
          ),
        }));

      if (matchPredictions.length === 0) return;

      const exactHits = matchPredictions.filter(
        (prediction) =>
          prediction.home_score === realHome &&
          prediction.away_score === realAway
      );

      if (exactHits.length === 1) {
        addMatchOnlyPoints(exactHits[0], 5, true);
        return;
      }

      if (exactHits.length > 1) {
        exactHits.forEach((prediction) => {
          addMatchOnlyPoints(prediction, 4, true);
        });
        return;
      }

      const minDistance = Math.min(
        ...matchPredictions.map((prediction) => prediction.distance)
      );
      const closest = matchPredictions.filter(
        (prediction) => prediction.distance === minDistance
      );

      closest.forEach((prediction) => {
        addMatchOnlyPoints(prediction, closest.length === 1 ? 2 : 1);
      });
    });

    return table;
  }, [results, allPredictions]);

  const powerLogs = useMemo<PowerLogType[]>(() => {
    const logs: PowerLogType[] = [];
    const logged = new Set<string>();

    const pushLog = (log: PowerLogType) => {
      if (logged.has(log.id)) return;
      logged.add(log.id);
      logs.push(log);
    };

    const allMatchDates = Array.from(
      new Set(demoMatches.map((match) => match.date).filter(Boolean))
    ) as string[];

    const getMatchesForDate = (matchDate: string) => {
      return demoMatches.filter((match) => match.date === matchDate);
    };

    const isPowerLogMatchDateFinished = (matchDate: string) => {
      const matchesForDate = getMatchesForDate(matchDate);

      if (matchesForDate.length === 0) return false;

      return matchesForDate.every((match) => {
        const result = results[match.id];

        return (
          result &&
          result.homeScore !== "" &&
          result.awayScore !== ""
        );
      });
    };

    const isMorningPowerLogVisible = (matchDate: string) => {
      const matchesForDate = getMatchesForDate(matchDate);

      if (matchesForDate.length === 0) return false;

      const allSubmittedForDate = players.every((player) =>
        matchesForDate.every((match) =>
          allPredictions.some(
            (prediction) =>
              prediction.match_id === match.id &&
              predictionMatchesPlayer(prediction, player.name)
          )
        )
      );

      if (allSubmittedForDate) return true;

      const { closesAt } = getBettingWindow(matchDate);

      return now > closesAt;
    };

    allMatchDates.forEach((matchDate) => {
      if (isMorningPowerLogVisible(matchDate)) {
        allPredictions.forEach((prediction) => {
          if (!prediction.power_name) return;
          if (getPowerTime(prediction.power_name) !== "morning") return;

          const powerMatch = demoMatches.find((match) => match.id === prediction.match_id);
          if (powerMatch?.date !== matchDate) return;

          const playerName = getPlayerNameFromEmail(
            prediction.user_email || prediction.user_name || ""
          );

          if (isPower(prediction.power_name, "Vabank")) {
            pushLog({
              id: `${matchDate}-morning-vabank-${playerName}`,
              matchDate,
              type: "power",
              message: `💥 ${playerName} zagrał Vabank.`,
            });
          }

          if (isPower(prediction.power_name, "Rozdwojenie Jaźni")) {
            const targetMatch = demoMatches.find(
              (match) => match.id === prediction.power_target_match_id
            );
            const targetText = targetMatch
              ? ` na mecz ${targetMatch.teamA} - ${targetMatch.teamB}`
              : "";

            pushLog({
              id: `${matchDate}-morning-double-${playerName}`,
              matchDate,
              type: "power",
              message: `🪞 ${playerName} użył Rozdwojenia Jaźni${targetText}.`,
            });
          }

          if (isPower(prediction.power_name, "Goleador")) {
            const teamText = prediction.power_target_team
              ? ` na drużynę ${prediction.power_target_team}`
              : "";

            pushLog({
              id: `${matchDate}-morning-goleador-${playerName}`,
              matchDate,
              type: "power",
              message: `⚽ ${playerName} aktywował Goleadora${teamText}.`,
            });
          }
        });
      }

      if (!isPowerLogMatchDateFinished(matchDate)) {
        return;
      }

      if (!isPowerSettledForStats(matchDate, results, now)) {
        return;
      }

      const blockedPlayers = new Set<string>();

      allDailyPowers.forEach((power) => {
        if (!isSameMatchDate(power.match_date, matchDate)) return;
        if (power.power_time !== "evening") return;
        if (!isPower(power.power_name, "Blokada")) return;

        const playerName = getPlayerNameFromEmail(
          power.user_email || power.user_name || ""
        );

        blockedPlayers.add(playerName);

        pushLog({
          id: `${matchDate}-evening-block-${playerName}`,
          matchDate,
          type: "power",
          message: `🛡️ ${playerName} aktywował Blokadę.`,
        });
      });

      const eveningPowersForDay = allDailyPowers.filter(
        (power) => isSameMatchDate(power.match_date, matchDate) && isEveningPowerTime(power.power_time)
      );

      eveningPowersForDay.forEach((power) => {
        const actorName = getPlayerNameFromEmail(
          power.user_email || power.user_name || ""
        );

        const targetPlayerName = power.target_player
          ? findPlayerRowByName(players, power.target_player)?.name || power.target_player
          : "";

        if (isPower(power.power_name, "Słabiak")) {
          pushLog({
            id: `${matchDate}-slabiak-${actorName}`,
            matchDate,
            type: "power",
            message: `🔄 ${actorName} użył Słabiaka.`,
          });

          blockedPlayers.forEach((blockedName) => {
            pushLog({
              id: `${matchDate}-slabiak-block-${actorName}-${blockedName}`,
              matchDate,
              type: "block",
              message: `🛡️ Słabiak ${actorName} nie zadziałał na ${blockedName}, bo miał aktywną Blokadę.`,
            });
          });
        }

        if (isPower(power.power_name, "Zamianka") && targetPlayerName) {
          if (blockedPlayers.has(targetPlayerName)) {
            pushLog({
              id: `${matchDate}-swap-block-${actorName}-${targetPlayerName}`,
              matchDate,
              type: "block",
              message: `🚫 ${actorName} próbował użyć Zamianki na ${targetPlayerName}, ale został odbity przez Blokadę.`,
            });
          } else {
            pushLog({
              id: `${matchDate}-swap-${actorName}-${targetPlayerName}`,
              matchDate,
              type: "power",
              message: `🔁 ${actorName} użył Zamianki na ${targetPlayerName}.`,
            });
          }
        }

        if (isPower(power.power_name, "Złodziej") && targetPlayerName) {
          if (blockedPlayers.has(targetPlayerName)) {
            pushLog({
              id: `${matchDate}-thief-block-${actorName}-${targetPlayerName}`,
              matchDate,
              type: "block",
              message: `🚫 FRAJER ${actorName} próbował okraść ${targetPlayerName}, ale dostał Blokadą po łapach 😂`,
            });
          } else {
            pushLog({
              id: `${matchDate}-thief-${actorName}-${targetPlayerName}`,
              matchDate,
              type: "power",
              message: `🦹 ${actorName} użył Złodzieja na ${targetPlayerName}.`,
            });
          }
        }
      });
    });

    return logs.reverse();
  }, [allPredictions, allDailyPowers, results]);

  const sortedStandings = useMemo(() => {
    return [...standings].sort(
      (a, b) => b.points - a.points || b.exact_hits - a.exact_hits
    );
  }, [standings]);

  const dailyPointsTableDates = getDailyPointsTableDates(demoMatches, now);
  const settlementDailyPointsDate =
    dailyPointsTableDates.settlementDate || previousMatchDate || currentMatchDate;
  const liveDailyPointsDate =
    dailyPointsTableDates.liveDate || currentMatchDate || previousMatchDate;

  const settlementDailyPointsRows = useMemo(() => {
    if (!settlementDailyPointsDate) return [];

    return players
      .map((player) => {
        const standingRow = standings.find((row) => row.name === player.name);

        return {
          name: player.name,
          points: standingRow?.daily_points?.[settlementDailyPointsDate] || 0,
        };
      })
      .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  }, [standings, settlementDailyPointsDate]);

  const liveDailyPointsRows = useMemo(() => {
    if (!liveDailyPointsDate) return [];

    return players
      .map((player) => {
        const standingRow = standings.find((row) => row.name === player.name);

        return {
          name: player.name,
          points: standingRow?.daily_points?.[liveDailyPointsDate] || 0,
        };
      })
      .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  }, [standings, liveDailyPointsDate]);

  const exactStats = useMemo(() => {
    return players.map((player) => {
      const row = standings.find((s) => s.name === player.name);

      return {
        name: player.name,
        exactHits: row?.exact_hits || 0,
      };
    });
  }, [standings]);

  const powerStats = useMemo(() => {
    return players.map((player) => {
      const powerDetails: {
        key: string;
        name: string;
        time: string;
        matchDate: string;
        description: string;
      }[] = [];

      const seenPowers = new Set<string>();

      allPredictions
        .filter((prediction) =>
          predictionMatchesPlayer(prediction, player.name) && Boolean(prediction.power_name)
        )
        .forEach((prediction) => {
          const match = demoMatches.find((demoMatch) => demoMatch.id === prediction.match_id);
          const matchDate = match?.date || "Brak daty";

          if (!isPowerSettledForStats(matchDate, results, now)) return;

          const powerName = String(prediction.power_name || "");
          const key = [
            "morning",
            player.name,
            powerName,
            matchDate,
            prediction.power_target_match_id || "",
            prediction.power_target_team || "",
          ].join("|");

          if (seenPowers.has(key)) return;
          seenPowers.add(key);

          let description = "Moc poranna";

          if (isPower(powerName, "Goleador") && prediction.power_target_team) {
            description = `Wybrana drużyna: ${prediction.power_target_team}`;
          }

          if (isPower(powerName, "Rozdwojenie Jaźni") && prediction.power_target_match_id) {
            const targetMatch = demoMatches.find(
              (demoMatch) => demoMatch.id === prediction.power_target_match_id
            );

            description = targetMatch
              ? `${targetMatch.teamA} - ${targetMatch.teamB}: ${prediction.power_home_score}:${prediction.power_away_score}`
              : `Drugi typ: ${prediction.power_home_score}:${prediction.power_away_score}`;
          }

          if (isPower(powerName, "Vabank")) {
            description = "Punkty dnia x2, przy 0 pkt kara -4";
          }

          powerDetails.push({
            key,
            name: powerName,
            time: "Poranna",
            matchDate,
            description,
          });
        });

      allDailyPowers
        .filter((power) => predictionMatchesPlayer(power, player.name))
        .forEach((power) => {
          const powerName = String(power.power_name || "");
          const matchDate = power.match_date || "Brak daty";

          if (!isPowerSettledForStats(matchDate, results, now)) return;

          const targetPlayer = getDailyPowerTargetPlayer(power);
          const key = [
            "evening",
            player.name,
            powerName,
            normalizeMatchDateKey(matchDate),
            targetPlayer || "",
            power.created_at || "",
          ].join("|");

          if (seenPowers.has(key)) return;
          seenPowers.add(key);

          powerDetails.push({
            key,
            name: powerName,
            time: "Wieczorna",
            matchDate,
            description: targetPlayer ? `Cel: ${targetPlayer}` : "Bez wybranego celu",
          });
        });

      powerDetails.sort((a, b) => {
        const dateDiff = normalizeMatchDateKey(a.matchDate).localeCompare(
          normalizeMatchDateKey(b.matchDate)
        );

        if (dateDiff !== 0) return dateDiff;

        return a.name.localeCompare(b.name);
      });

      return {
        name: player.name,
        usedPowers: powerDetails.length,
        powers: powerDetails,
      };
    });
  }, [allPredictions, allDailyPowers, results, now]);

  const selectedPowerStats = useMemo(() => {
    if (!selectedPowerStatsPlayer) return null;

    return powerStats.find((player) => player.name === selectedPowerStatsPlayer) || null;
  }, [powerStats, selectedPowerStatsPlayer]);

  const bestRound = useMemo(() => {
    const rounds = standings.flatMap((player) =>
      Object.entries(player.daily_points || {}).map(([matchDate, points]) => ({
        name: player.name,
        matchDate,
        points: Number(points) || 0,
      }))
    );

    if (rounds.length === 0) return null;

    return rounds.sort(
      (a, b) =>
        b.points - a.points ||
        getMatchDateTime(a.matchDate) - getMatchDateTime(b.matchDate) ||
        a.name.localeCompare(b.name)
    )[0];
  }, [standings]);

  const handlePredictionChange = (
    matchId: number,
    field: "homeScore" | "awayScore",
    value: string
  ) => {
    if (isPredictionLocked) return;

    setPredictions((prev) => ({
      ...prev,
      [matchId]: {
        homeScore: prev[matchId]?.homeScore || "",
        awayScore: prev[matchId]?.awayScore || "",
        [field]: value,
      },
    }));
  };

  const handleDoublePredictionChange = (
    field: "matchId" | "homeScore" | "awayScore",
    value: string
  ) => {
    if (isPredictionLocked) return;

    setDoublePrediction((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResultChange = (
    matchId: number,
    field: "homeScore" | "awayScore",
    value: string
  ) => {
    setResults((prev) => ({
      ...prev,
      [matchId]: {
        homeScore: prev[matchId]?.homeScore || "",
        awayScore: prev[matchId]?.awayScore || "",
        [field]: value,
      },
    }));
  };

  const handlePodiumChange = (
    field: "firstPlace" | "secondPlace" | "thirdPlace",
    value: string
  ) => {
    if (isPredictionLocked || savedPodiumPrediction) return;

    setPodiumPrediction((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleFinalPodiumResultChange = (
    field: "firstPlace" | "secondPlace" | "thirdPlace",
    value: string
  ) => {
    if (!isAdmin) return;

    setFinalPodiumResults((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveFinalPodiumResults = async () => {
    if (!isAdmin) return;

    if (
      !finalPodiumResults.firstPlace ||
      !finalPodiumResults.secondPlace ||
      !finalPodiumResults.thirdPlace
    ) {
      alert("Wybierz faktyczne 1, 2 i 3 miejsce.");
      return;
    }

    const uniqueTeams = new Set([
      finalPodiumResults.firstPlace,
      finalPodiumResults.secondPlace,
      finalPodiumResults.thirdPlace,
    ]);

    if (uniqueTeams.size !== 3) {
      alert("Każde miejsce musi mieć inny zespół.");
      return;
    }

    const { error } = await supabase.from("final_podium_results").upsert({
      id: "official",
      first_place: finalPodiumResults.firstPlace,
      second_place: finalPodiumResults.secondPlace,
      third_place: finalPodiumResults.thirdPlace,
    });

    if (error) {
      console.error(error);
      alert("Błąd zapisu faktycznego podium: " + error.message);
      return;
    }

    setSavedFinalPodiumResults(finalPodiumResults);
    await loadFinalPodiumResults();

    alert("Faktyczne podium zapisane. Punkty zostały doliczone do tabeli.");
  };

  const handleBracketSlotChange = (slotId: string, teamName: string) => {
    setBracketSlots((prev) => ({
      ...prev,
      [slotId]: teamName,
    }));
  };

  const hasUsedMorningPowerToday = allPredictions.some(
    (prediction) =>
      visibleMatches.some((match) => match.id === prediction.match_id) &&
      predictionMatchesPlayer(prediction, userName) &&
      prediction.power_name &&
      getPowerTime(prediction.power_name) === "morning"
  );

  const hasUsedEveningPowerForPreviousDay =
    Boolean(savedEveningPower) ||
    allDailyPowers.some(
      (power) =>
        isSameMatchDate(power.match_date, eveningSettlementDate) &&
        isEveningPowerTime(power.power_time) &&
        predictionMatchesPlayer(power, userName)
    );

  const saveKnockoutBracket = async () => {
    const rows = Object.entries(bracketSlots)
      .filter(([, teamName]) => teamName)
      .map(([slotId, teamName]) => ({
        slot_id: slotId,
        team_name: teamName,
      }));

    const { error: deleteError } = await supabase
      .from("knockout_bracket")
      .delete()
      .neq("slot_id", "__never__");

    if (deleteError) {
      console.error(deleteError);
      alert("Błąd czyszczenia drabinki: " + deleteError.message);
      return;
    }

    if (rows.length > 0) {
      const { error: insertError } = await supabase
        .from("knockout_bracket")
        .insert(rows);

      if (insertError) {
        console.error(insertError);
        alert("Błąd zapisu drabinki: " + insertError.message);
        return;
      }
    }

    await loadKnockoutBracket();
    alert("Drabinka zapisana!");
  };

  const togglePower = (powerName: string) => {
    if (powerTab === "evening") {
      if (!isEveningPowerWindow) {
        alert("Moce wieczorne można wybrać tylko w oknie 12:00–20:00.");
        return;
      }

      const isCurrentSavedEveningPower = Boolean(savedEveningPower) && isPower(savedEveningPower, powerName);
      const wasPowerUsedEarlier = usedPowerNames.has(powerName) && !isCurrentSavedEveningPower;

      if (wasPowerUsedEarlier) {
        alert("Ta moc została już wykorzystana w turnieju i nie można użyć jej ponownie.");
        return;
      }

      setSelectedEveningPower((prev) => {
        const next = prev && isPower(prev, powerName) ? null : powerName;

        if (isCurrentSavedEveningPower) {
          setSelectedEveningTargetPlayer(savedEveningTargetPlayer || "");
        } else if (!isPower(next, "Zamianka") && !isPower(next, "Złodziej")) {
          setSelectedEveningTargetPlayer("");
        }

        return next;
      });
      return;
    }

    if (usedPowerNames.has(powerName)) {
      alert("Ta moc została już wykorzystana w turnieju i nie można użyć jej ponownie.");
      return;
    }

    if (!isBettingOpen) {
      alert("Moce poranne można wybrać tylko w oknie typowania 20:00–23:59 dzień przed meczami.");
      return;
    }

    if (isPredictionLocked) return;

    if (savedPower || !isEditingPredictions) {
      alert("Typy zostały już zapisane. Nie można zmienić mocy porannej dla tego dnia.");
      return;
    }

    if (hasUsedMorningPowerToday) {
      alert("Użyłeś już mocy porannej dla tego dnia meczowego.");
      return;
    }

    setSelectedPower((prev) => {
      const next = isPower(prev, powerName) ? null : powerName;

      if (!isPower(next, "Rozdwojenie Jaźni")) {
        setDoublePrediction({
          matchId: "",
          homeScore: "",
          awayScore: "",
        });
      }

      if (next !== "Goleador") {
        setSelectedGoleadorTeam("");
      }

      if (next) {
        setPowerTab(getPowerTime(next));
      }

      return next;
    });
  };

  const saveSinglePrediction = async (match: any) => {
    if (!isBettingOpen) {
      alert("Pojedynczy typ można zapisać tylko w oknie typowania 20:00–23:59 dzień przed meczami.");
      return;
    }

    if (isPredictionLocked) {
      alert("Typowanie jest już zablokowane.");
      return;
    }

    const prediction = predictions[match.id];

    if (
      !prediction ||
      prediction.homeScore === "" ||
      prediction.awayScore === ""
    ) {
      alert(`Najpierw wpisz pełny typ dla meczu: ${match.teamA} - ${match.teamB}.`);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const powerToKeep = savedPower;

    const row = {
      user_id: user.id,
      user_email: user.email,
      match_id: match.id,
      home_score: Number(prediction.homeScore),
      away_score: Number(prediction.awayScore),
      power_name: powerToKeep,
      power_target_match_id:
        isPower(powerToKeep, "Rozdwojenie Jaźni")
          ? Number(doublePrediction.matchId)
          : null,
      power_home_score:
        isPower(powerToKeep, "Rozdwojenie Jaźni")
          ? Number(doublePrediction.homeScore)
          : null,
      power_away_score:
        isPower(powerToKeep, "Rozdwojenie Jaźni")
          ? Number(doublePrediction.awayScore)
          : null,
      power_target_team:
        isPower(powerToKeep, "Goleador") ? selectedGoleadorTeam : null,
    };

    const { error: deleteError } = await supabase
      .from("predictions")
      .delete()
      .eq("user_id", user.id)
      .eq("match_id", match.id);

    if (deleteError) {
      console.error(deleteError);
      alert("Błąd usuwania starego typu: " + deleteError.message);
      return;
    }

    const { error: insertError } = await supabase
      .from("predictions")
      .insert([row]);

    if (insertError) {
      console.error(insertError);
      alert("Błąd zapisu typu: " + insertError.message);
      return;
    }

    setSavedPredictions((prev) => ({
      ...prev,
      [match.id]: {
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
      },
    }));

    await loadAllPredictions();

    alert(`Zapisano typ: ${match.teamA} - ${match.teamB} ${prediction.homeScore}:${prediction.awayScore}`);
  };

  const savePredictions = async () => {
    if (!isBettingOpen) {
      alert("Typy i moce poranne można zapisać tylko w oknie typowania 20:00–23:59 dzień przed meczami.");
      return;
    }

    if (isPredictionLocked) {
      alert("Typowanie jest już zablokowane.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeUser = user;

    if (!activeUser) return;

    if (selectedPower && hasUsedMorningPowerToday) {
      alert("Użyłeś już mocy porannej dla tego dnia meczowego.");
      return;
    }

    if (isPower(selectedPower, "Goleador") && !selectedGoleadorTeam) {
      alert("Przy Goleadorze wybierz drużynę.");
      return;
    }

    if (
      isPower(selectedPower, "Rozdwojenie Jaźni") &&
      (!doublePrediction.matchId ||
        doublePrediction.homeScore === "" ||
        doublePrediction.awayScore === "")
    ) {
      alert("Przy Rozdwojeniu Jaźni wybierz mecz i wpisz drugi wynik.");
      return;
    }

    const currentMatchIds = visibleMatches.map((match) => match.id);

    const missingMatches = visibleMatches.filter((match) => {
      const prediction = predictions[match.id];

      return (
        !prediction ||
        prediction.homeScore === "" ||
        prediction.awayScore === ""
      );
    });

    if (missingMatches.length > 0) {
      const missingNames = missingMatches
        .map((match) => `${match.teamA} - ${match.teamB}`)
        .join(", ");

      alert(`Musisz wpisać wszystkie typy z tego dnia. Brakuje: ${missingNames}`);
      return;
    }

    const rows = visibleMatches.map((match) => {
      const prediction = predictions[match.id];

      return {
        user_id: activeUser.id,
        user_email: activeUser.email,
        match_id: match.id,
        home_score: Number(prediction.homeScore),
        away_score: Number(prediction.awayScore),
        power_name: selectedPower,
        power_target_match_id:
          isPower(selectedPower, "Rozdwojenie Jaźni")
            ? Number(doublePrediction.matchId)
            : null,
        power_home_score:
          isPower(selectedPower, "Rozdwojenie Jaźni")
            ? Number(doublePrediction.homeScore)
            : null,
        power_away_score:
          isPower(selectedPower, "Rozdwojenie Jaźni")
            ? Number(doublePrediction.awayScore)
            : null,
        power_target_team:
          isPower(selectedPower, "Goleador") ? selectedGoleadorTeam : null,
      };
    });

    let deletePredictionsQuery = supabase
      .from("predictions")
      .delete()
      .eq("user_id", user.id)
      .in("match_id", currentMatchIds);

    const { error: deleteError } = await deletePredictionsQuery;

    if (deleteError) {
      console.error(deleteError);
      alert("Błąd usuwania starych typów: " + deleteError.message);
      return;
    }

    const { error: insertError } = await supabase.from("predictions").insert(rows);

    if (insertError) {
      console.error(insertError);
      alert("Błąd zapisu typów: " + insertError.message);
      return;
    }

    setSavedPredictions(predictions);
    setSavedPower(selectedPower);
    setIsEditingPredictions(false);

    await loadAllPredictions();

    alert("Typy zaakceptowane!");
  };

  const resetPredictions = async () => {
    if (isPredictionLocked) {
      alert("Typowanie jest już zablokowane. Nie można resetować typów.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const confirmed = confirm("Na pewno usunąć swoje typy z aktualnego dnia meczowego?");
    if (!confirmed) return;

    const currentMatchIds = visibleMatches.map((match) => match.id);

    const { error } = await supabase
      .from("predictions")
      .delete()
      .eq("user_id", user.id)
      .in("match_id", currentMatchIds);

    if (error) {
      console.error(error);
      alert("Błąd resetu typów: " + error.message);
      return;
    }

    setPredictions((prev) => {
      const next = { ...prev };
      currentMatchIds.forEach((matchId) => {
        delete next[matchId];
      });
      return next;
    });

    setSavedPredictions((prev) => {
      const next = { ...prev };
      currentMatchIds.forEach((matchId) => {
        delete next[matchId];
      });
      return next;
    });
    setSelectedPower(null);
    setSavedPower(null);
    setSelectedGoleadorTeam("");
    setDoublePrediction({
      matchId: "",
      homeScore: "",
      awayScore: "",
    });
    setIsEditingPredictions(true);

    await loadAllPredictions();

    alert("Typy z aktualnego dnia meczowego usunięte!");
  };

  const savePodiumPrediction = async () => {
    if (savedPodiumPrediction) {
      alert("Typ podium został już zaakceptowany i nie można go zmienić.");
      return;
    }

    if (isPredictionLocked) {
      alert("Typowanie jest już zablokowane.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeUser = user;

    if (!activeUser) return;

    if (
      !podiumPrediction.firstPlace ||
      !podiumPrediction.secondPlace ||
      !podiumPrediction.thirdPlace
    ) {
      alert("Wybierz mistrza, drugie miejsce i trzecie miejsce.");
      return;
    }

    const uniqueTeams = new Set([
      podiumPrediction.firstPlace,
      podiumPrediction.secondPlace,
      podiumPrediction.thirdPlace,
    ]);

    if (uniqueTeams.size !== 3) {
      alert("Każde miejsce musi mieć inny zespół.");
      return;
    }

    let deleteOldPodiumQuery = supabase
      .from("final_predictions")
      .delete()
      .eq("user_id", activeUser.id);

    const { error: deleteOldPodiumError } = await deleteOldPodiumQuery;

    if (deleteOldPodiumError) {
      console.error(deleteOldPodiumError);
      alert("Błąd czyszczenia starego typu podium: " + deleteOldPodiumError.message);
      return;
    }

    const { error } = await supabase.from("final_predictions").insert({
      user_id: activeUser.id,
      user_email: activeUser.email,
      first_place: podiumPrediction.firstPlace,
      second_place: podiumPrediction.secondPlace,
      third_place: podiumPrediction.thirdPlace,
    });

    if (error) {
      console.error(error);
      alert("Błąd zapisu typów podium: " + error.message);
      return;
    }

    setSavedPodiumPrediction(podiumPrediction);

    await loadAllPodiumPredictions();

    alert("Typ podium zapisany!");
  };

  const saveEveningPower = async () => {
    if (!isEveningPowerWindow || !eveningSettlementDate) {
      alert("Moce wieczorne można zaakceptować tylko w oknie 12:00–20:00.");
      return;
    }

    const isChangingEveningPower = Boolean(savedEveningPower || hasUsedEveningPowerForPreviousDay);

    if (!selectedEveningPower) {
      alert("Wybierz moc wieczorną.");
      return;
    }

    if (
      (selectedEveningPower === "Zamianka" || selectedEveningPower === "Złodziej") &&
      !selectedEveningTargetPlayer
    ) {
      alert("Wybierz gracza, którego dotyczy moc.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeUser = user;

    if (!activeUser) return;

    const finalEveningTarget =
      selectedEveningPower === "Zamianka" || selectedEveningPower === "Złodziej"
        ? selectedEveningTargetPlayer
        : "";

    const { error: deleteExistingPowerError } = await supabase
      .from("daily_powers")
      .delete()
      .eq("user_id", activeUser.id)
      .eq("match_date", eveningSettlementDate)
      .eq("power_time", "evening");

    if (deleteExistingPowerError) {
      console.error(deleteExistingPowerError);
      alert("Błąd usuwania poprzedniej mocy wieczornej: " + deleteExistingPowerError.message);
      return;
    }

    const { error } = await supabase.from("daily_powers").insert({
      user_id: activeUser.id,
      user_email: activeUser.email,
      match_date: eveningSettlementDate,
      power_name: selectedEveningPower,
      power_time: "evening",
      target_player: finalEveningTarget || null,
    });

    if (error) {
      console.error(error);
      alert("Błąd zapisu mocy wieczornej: " + error.message);
      return;
    }

    setSavedEveningPower(selectedEveningPower);
    setSavedEveningTargetPlayer(finalEveningTarget);
    setSelectedEveningPower(selectedEveningPower);
    setSelectedEveningTargetPlayer(finalEveningTarget);

    await loadAllDailyPowers();

    alert(isChangingEveningPower ? "Moc wieczorna zmieniona. Możesz ją zmieniać albo wycofać do 20:00." : "Moc wieczorna zaakceptowana. Możesz ją zmienić albo wycofać do 20:00.");
  };

  const withdrawEveningPower = async () => {
    if (!isEveningPowerWindow || !eveningSettlementDate) {
      alert("Moc wieczorną można wycofać tylko w oknie 12:00–20:00.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeUser = user;

    if (!activeUser) return;

    const { error } = await supabase
      .from("daily_powers")
      .delete()
      .eq("user_id", activeUser.id)
      .eq("match_date", eveningSettlementDate)
      .eq("power_time", "evening");

    if (error) {
      console.error(error);
      alert("Błąd wycofywania mocy wieczornej: " + error.message);
      return;
    }

    setSavedEveningPower(null);
    setSavedEveningTargetPlayer("");
    setSelectedEveningPower(null);
    setSelectedEveningTargetPlayer("");

    await loadAllDailyPowers();

    alert("Moc wieczorna wycofana. Do 20:00 możesz wybrać inną albo zostawić bez mocy.");
  };

  const resetEverythingForTests = async () => {
    if (!isAdmin) return;

    const confirmed = confirm(
      "Na pewno wyzerować całą ligę testową? Usunie typy, wyniki, moce, podium i drabinkę."
    );

    if (!confirmed) return;

    const deleteAllRows = async (
      tableName: string,
      columnName: string,
      impossibleValue: string | number
    ) => {
      const { error: deleteFilledRowsError } = await supabase
        .from(tableName)
        .delete()
        .neq(columnName, impossibleValue);

      if (deleteFilledRowsError) {
        return deleteFilledRowsError;
      }

      const { error: deleteEmptyRowsError } = await supabase
        .from(tableName)
        .delete()
        .is(columnName, null);

      return deleteEmptyRowsError;
    };

    const tablesToClear = [
      { name: "predictions", column: "match_id", value: -1 },
      { name: "results", column: "match_id", value: -1 },
      { name: "daily_powers", column: "user_email", value: "__never__" },
      { name: "final_predictions", column: "user_email", value: "__never__" },
      { name: "final_podium_results", column: "id", value: "__never__" },
      { name: "knockout_bracket", column: "slot_id", value: "__never__" },
    ];

    for (const table of tablesToClear) {
      const error = await deleteAllRows(table.name, table.column, table.value);

      if (error) {
        console.error(error);
        alert(`Błąd resetu tabeli ${table.name}: ${error.message}`);
        return;
      }
    }

    setPredictions({});
    setSavedPredictions({});
    setResults({});
    setAllPredictions([]);
    setSelectedPower(null);
    setSavedPower(null);
    setSelectedGoleadorTeam("");
    setSelectedEveningPower(null);
    setSavedEveningPower(null);
    setSelectedEveningTargetPlayer("");
    setSavedEveningTargetPlayer("");
    setAllDailyPowers([]);
    setPodiumPrediction({
      firstPlace: "",
      secondPlace: "",
      thirdPlace: "",
    });
    setSavedPodiumPrediction(null);
    setAllPodiumPredictions([]);
    setFinalPodiumResults({
      firstPlace: "",
      secondPlace: "",
      thirdPlace: "",
    });
    setSavedFinalPodiumResults(null);
    setBracketSlots({});
    setDoublePrediction({
      matchId: "",
      homeScore: "",
      awayScore: "",
    });
    setIsEditingPredictions(true);

    await loadAllPredictions();
    await loadAllPodiumPredictions();
    await loadFinalPodiumResults();
    await loadAllDailyPowers();
    await loadKnockoutBracket();

    alert("Liga testowa została wyzerowana razem z mocami i typami podium. Odświeżam stronę.");
    window.location.reload();
  };

  const resetResults = async () => {
    const confirmed = confirm("Na pewno usunąć wszystkie wyniki?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("results")
      .delete()
      .neq("match_id", -1);

    if (error) {
      console.error(error);
      alert("Błąd resetu wyników: " + error.message);
      return;
    }

    setResults({});

    alert("Wyniki usunięte!");
  };

  const saveResult = async (matchId: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const result = results[matchId];

    if (!result || result.homeScore === "" || result.awayScore === "") {
      alert("Wpisz oba wyniki meczu");
      return;
    }

    await supabase.from("results").delete().eq("match_id", matchId);

    const { error } = await supabase.from("results").insert({
      match_id: matchId,
      home_score: Number(result.homeScore),
      away_score: Number(result.awayScore),
      added_by: user.id,
    });

    if (error) {
      console.error(error);
      alert("Błąd zapisu wyniku: " + error.message);
      return;
    }

    alert("Wynik zapisany!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const savedPredictionRows = visibleMatches.filter(
    (match) =>
      savedPredictions[match.id]?.homeScore !== "" &&
      savedPredictions[match.id]?.awayScore !== "" &&
      savedPredictions[match.id] !== undefined
  );

  const selectedDoubleMatch =
    visibleMatches.find((match) => match.id === Number(doublePrediction.matchId)) ||
    demoMatches.find((match) => match.id === Number(doublePrediction.matchId));


  const renderPredictionsResultsTable = (matchesToShow: any[], height: string) => (
    <div
      style={{
        maxHeight: height,
        overflowY: "auto",
        overflowX: "auto",
        borderRadius: "16px",
        border: "1px solid rgba(148, 163, 184, 0.16)",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "760px",
          borderCollapse: "collapse",
          fontSize: "13px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              color: "#cbd5e1",
              textAlign: "left",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <th style={{ padding: "10px", minWidth: "230px", whiteSpace: "nowrap" }}>Mecz</th>
            <th style={{ padding: "10px", minWidth: "70px", textAlign: "center", whiteSpace: "nowrap" }}>Wynik</th>
            {players.map((player) => (
              <th
                key={`type-head-${player.name}`}
                style={{ padding: "10px", minWidth: "90px", textAlign: "center", whiteSpace: "nowrap" }}
              >
                {player.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {matchesToShow.map((match) => {
            const matchId = Number(match.id);
            const realResult = results[matchId];
            const displayMatch = resolvePredictionTableMatch(match);
            const arePredictionsVisible = isPredictionTableMatchRevealed(match);

            return (
              <tr key={`types-row-${match.id}`}>
                <td
                  style={{
                    padding: "10px",
                    borderTop: "1px solid rgba(148, 163, 184, 0.12)",
                    whiteSpace: "nowrap",
                    color: "#e5e7eb",
                    fontWeight: 800,
                  }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "11px", marginRight: "8px" }}>
                    {displayMatch.group || "Mecz"}
                  </span>
                  {displayMatch.teamA} - {displayMatch.teamB}
                </td>

                <td
                  style={{
                    padding: "10px",
                    borderTop: "1px solid rgba(148, 163, 184, 0.12)",
                    minWidth: "70px",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    color: "#fde68a",
                    fontWeight: 950,
                  }}
                >
                  {realResult?.homeScore !== "" && realResult?.awayScore !== "" && realResult !== undefined
                    ? `${realResult?.homeScore}:${realResult?.awayScore}`
                    : "-"}
                </td>

                {players.map((player) => {
                  const prediction = arePredictionsVisible
                    ? allPredictions.find(
                        (item) =>
                          item.match_id === matchId &&
                          predictionMatchesPlayer(item, player.name)
                      )
                    : undefined;

                  const hasResult =
                    realResult?.homeScore !== "" &&
                    realResult?.awayScore !== "" &&
                    realResult !== undefined;

                  const realHome = Number(realResult?.homeScore);
                  const realAway = Number(realResult?.awayScore);

                  const hasDoubleForThisMatch = Boolean(
                    prediction &&
                      isPower(prediction.power_name, "Rozdwojenie Jaźni") &&
                      prediction.power_target_match_id === matchId &&
                      prediction.power_home_score !== null &&
                      prediction.power_home_score !== undefined &&
                      prediction.power_away_score !== null &&
                      prediction.power_away_score !== undefined
                  );

                  const baseExact =
                    Boolean(prediction) &&
                    hasResult &&
                    Number(prediction?.home_score) === realHome &&
                    Number(prediction?.away_score) === realAway;

                  const doubleHomeScore = hasDoubleForThisMatch
                    ? Number(prediction?.power_home_score)
                    : null;
                  const doubleAwayScore = hasDoubleForThisMatch
                    ? Number(prediction?.power_away_score)
                    : null;

                  const doubleExact =
                    hasDoubleForThisMatch &&
                    hasResult &&
                    doubleHomeScore === realHome &&
                    doubleAwayScore === realAway;

                  const exact = Boolean(baseExact || doubleExact);

                  const matchPoints = arePredictionsVisible
                    ? calculateMatchPointsForPlayer(match, player.name)
                    : null;

                  const goleadorBonus =
                    arePredictionsVisible && prediction
                      ? calculateGoleadorBonusForPrediction(match, prediction)
                      : 0;

                  const pointsLine =
                    prediction && matchPoints !== null ? `(${matchPoints} pkt)` : "";

                  const goleadorPointsLine =
                    goleadorBonus > 0 ? `+${goleadorBonus} Goleador` : "";

                  const hasVabankForThisMatchDate =
                    arePredictionsVisible &&
                    allPredictions.some((item) => {
                      if (!predictionMatchesPlayer(item, player.name)) return false;
                      if (!isPower(item.power_name, "Vabank")) return false;

                      const powerMatch = demoMatches.find(
                        (demoMatch) => demoMatch.id === item.match_id
                      );

                      return isSameMatchDate(powerMatch?.date || "", match.date);
                    });

                  return (
                    <td
                      key={`types-cell-${match.id}-${player.name}`}
                      style={{
                        padding: "10px",
                        borderTop: "1px solid rgba(148, 163, 184, 0.12)",
                        minWidth: "90px",
                        whiteSpace: "normal",
                        textAlign: "center",
                        lineHeight: 1.15,
                        color: !arePredictionsVisible
                          ? "#94a3b8"
                          : prediction
                            ? "#e5e7eb"
                            : "#64748b",
                        background: hasVabankForThisMatchDate
                          ? "linear-gradient(135deg, rgba(250, 204, 21, 0.26), rgba(245, 158, 11, 0.16))"
                          : prediction && doubleExact
                            ? "rgba(168, 85, 247, 0.16)"
                            : prediction && baseExact
                              ? "rgba(34, 197, 94, 0.10)"
                              : undefined,
                        boxShadow: hasVabankForThisMatchDate
                          ? "inset 0 0 0 1px rgba(250, 204, 21, 0.35), inset 0 0 22px rgba(250, 204, 21, 0.13)"
                          : undefined,
                        fontWeight: prediction ? 950 : 700,
                      }}
                    >
                      {!arePredictionsVisible ? (
                        "Ukryte"
                      ) : prediction ? (
                        <div
                          style={{
                            display: "grid",
                            gap: "2px",
                            justifyItems: "center",
                          }}
                        >
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              color: baseExact ? "#4ade80" : "#e5e7eb",
                            }}
                          >
                            {prediction.home_score}:{prediction.away_score}
                          </span>

                          {hasDoubleForThisMatch ? (
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                color: doubleExact ? "#c084fc" : "#e5e7eb",
                                fontSize: "12px",
                                fontWeight: 950,
                              }}
                            >
                              {doubleHomeScore}:{doubleAwayScore}
                            </span>
                          ) : null}

                          {pointsLine ? (
                            <span
                              style={{
                                fontSize: "11px",
                                color: doubleExact
                                  ? "#c084fc"
                                  : baseExact
                                    ? "#4ade80"
                                    : "#94a3b8",
                                fontWeight: 800,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {pointsLine}
                            </span>
                          ) : null}

                          {goleadorPointsLine ? (
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#fb923c",
                                fontWeight: 950,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {goleadorPointsLine}
                            </span>
                          ) : null}

                          {hasVabankForThisMatchDate ? (
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#fde68a",
                                fontWeight: 950,
                                whiteSpace: "nowrap",
                                textShadow: "0 0 10px rgba(250, 204, 21, 0.55)",
                              }}
                            >
                              Vabank
                            </span>
                          ) : null}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const getPowerCardUsedNote = (powerName: string) => {
    const isEveningPower = getPowerTime(powerName) === "evening";

    if (isEveningPower) {
      const savedPowerRow = [...allDailyPowers]
        .reverse()
        .find(
          (power) =>
            Boolean(userName) &&
            predictionMatchesPlayer(power, userName) &&
            isPower(power.power_name, powerName)
        );

      const targetPlayer =
        savedPowerRow?.target_player ||
        (savedEveningPower && isPower(savedEveningPower, powerName)
          ? savedEveningTargetPlayer
          : "");

      if (isPower(powerName, "Zamianka") || isPower(powerName, "Złodziej")) {
        return targetPlayer
          ? `Użyta przeciwko: ${targetPlayer}`
          : "Użyta przeciwko: nie zapisano celu";
      }

      if (isPower(powerName, "Słabiak") || isPower(powerName, "Slabiak")) {
        return "Użyta na wszystkich graczy";
      }

      if (isPower(powerName, "Blokada")) {
        return "Użyta na sobie";
      }

      return savedPowerRow?.match_date
        ? `Użyta na dzień: ${savedPowerRow.match_date}`
        : "Moc wykorzystana";
    }

    const savedPredictionPower = [...allPredictions]
      .reverse()
      .find(
        (prediction) =>
          Boolean(userName) &&
          predictionMatchesPlayer(prediction, userName) &&
          prediction.power_name &&
          isPower(prediction.power_name, powerName)
      );

    if (isPower(powerName, "Goleador")) {
      const team =
        savedPredictionPower?.power_target_team ||
        (savedPower && isPower(savedPower, powerName) ? selectedGoleadorTeam : "");

      return team ? `Wybrana drużyna: ${team}` : "Moc wykorzystana";
    }

    if (isPower(powerName, "Rozdwojenie Jaźni")) {
      const matchId =
        savedPredictionPower?.power_target_match_id ||
        Number(doublePrediction.matchId || 0);
      const match = demoMatches.find((item) => Number(item.id) === Number(matchId));
      const homeScore =
        savedPredictionPower?.power_home_score ??
        (doublePrediction.homeScore !== "" ? Number(doublePrediction.homeScore) : null);
      const awayScore =
        savedPredictionPower?.power_away_score ??
        (doublePrediction.awayScore !== "" ? Number(doublePrediction.awayScore) : null);

      if (match && homeScore !== null && awayScore !== null) {
        return `Drugi typ: ${getResolvedMatchTeam(match, "home")} - ${getResolvedMatchTeam(match, "away")} ${homeScore}:${awayScore}`;
      }

      if (match) {
        return `Drugi typ: ${getResolvedMatchTeam(match, "home")} - ${getResolvedMatchTeam(match, "away")}`;
      }

      return "Drugi typ zapisany";
    }

    if (isPower(powerName, "Vabank")) {
      return "Użyta na ten dzień meczowy";
    }

    return "Moc wykorzystana";
  };

  return (
    <main className="page">

      <style>{`
        /* MOBILE RESPONSIVE PATCH */
        @media (max-width: 900px) {
          .page {
            padding: 12px !important;
            overflow-x: hidden !important;
          }

          .hero {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 14px !important;
            padding: 18px !important;
            border-radius: 22px !important;
          }

          .hero h1 {
            font-size: clamp(28px, 9vw, 42px) !important;
            line-height: 1.05 !important;
            margin-bottom: 10px !important;
          }

          .hero .panel {
            width: 100% !important;
            min-width: 0 !important;
            text-align: left !important;
          }

          .grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          .panel {
            padding: 16px !important;
            border-radius: 20px !important;
            min-width: 0 !important;
            overflow: hidden !important;
          }

          .panel-header {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            align-items: start !important;
          }

          .panel-header h2,
          .panel-header h3 {
            font-size: 20px !important;
            line-height: 1.2 !important;
          }

          .btn {
            min-height: 46px !important;
            padding: 12px 14px !important;
            border-radius: 14px !important;
            font-size: 15px !important;
          }

          .card-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .status-card {
            min-height: auto !important;
            padding: 14px !important;
            border-radius: 18px !important;
          }

          .standing-row {
            grid-template-columns: 36px minmax(0, 1fr) auto auto !important;
            gap: 8px !important;
            padding: 12px !important;
          }

          .standing-row strong {
            min-width: 0 !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          .points,
          .exact {
            white-space: nowrap !important;
            font-size: 14px !important;
          }

          table {
            font-size: 12px !important;
          }

          th,
          td {
            padding: 8px !important;
          }

          input,
          select {
            font-size: 16px !important;
          }

          img {
            max-width: 100%;
          }

          .bracket-scroll {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: auto !important;
            overflow-y: visible !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 14px !important;
          }

          .bracket-board {
            min-width: 1026px !important;
            width: 1026px !important;
            transform: scale(0.5);
            transform-origin: top left;
            height: 624px;
          }
        }

        @media (max-width: 560px) {
          .page {
            padding: 8px !important;
          }

          .hero {
            padding: 16px !important;
          }

          .hero h1 {
            font-size: 30px !important;
          }

          .eyebrow {
            font-size: 12px !important;
            letter-spacing: 0.08em !important;
          }

          .muted {
            font-size: 13px !important;
          }

          .btn {
            width: auto !important;
            flex: 1 1 auto !important;
            justify-content: center !important;
          }

          .panel {
            padding: 14px !important;
          }

          .status-card {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
          }

          .standing-row {
            grid-template-columns: 34px minmax(0, 1fr) auto !important;
          }

          .standing-row .exact {
            grid-column: 3 !important;
          }

          .premium-power-card {
            min-height: 210px !important;
          }

          .power-inner {
            min-height: 210px !important;
          }
        }
      `}</style>

      <header className="hero">
        <div>
          <p className="eyebrow">Prywatna liga typowania</p>
          <h1>🏆 Mundial o Flachę</h1>

          <p className="muted">
            Dzień meczowy: <strong>{currentMatchDate || "-"}</strong>
            {currentBettingWindow && (
              <>
                {" "}
                · Typowanie:{" "}
                <strong>{formatShortDate(currentBettingWindow.opensAt)} 20:00</strong>
                {" "}–{" "}
                <strong>{formatShortDate(currentBettingWindow.closesAt)} 23:59</strong>
              </>
            )}
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginTop: "12px",
              flexWrap: "wrap",
            }}
          >
            <span>
              Zalogowany: <strong>{userName}</strong>
            </span>

            <Link href="/regulamin" className="btn">
              Regulamin
            </Link>

            {isAdmin && (
              <button
                onClick={resetEverythingForTests}
                className="btn"
                style={{ background: "linear-gradient(135deg, #7f1d1d, #ef4444)" }}
              >
                🧨 Reset całej gry
              </button>
            )}

            <button
              onClick={handleLogout}
              className="btn"
              style={{ background: "linear-gradient(135deg, #991b1b, #ef4444)" }}
            >
              Wyloguj
            </button>
          </div>
</div>

        <div className="panel">
          <span className="muted">
            {isPredictionLocked ? "Typowanie zamknięte" : "Do zamknięcia"}
          </span>
          <h2 style={{ margin: 0 }}>
            {isPredictionLocked ? "LOCK" : "00:00"}
          </h2>
        </div>
      </header>

      {activeTab === "dashboard" && (
        <>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn"
              onClick={() => setActiveTab("bracket")}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              }}
            >
              🏆 Drabinka
            </button>
          </div>

          <div className="grid">
        <section className="panel" style={{ minHeight: "auto" }}>
          <div className="panel-header" style={{ marginBottom: "10px" }}>
            <h2 style={{ fontSize: "20px" }}>📊 Mundial o flachę</h2>
          </div>

          <div style={{ transform: "scale(0.92)", transformOrigin: "top left", width: "108%" }}>
            <Standings rows={standings} />
          </div>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(148, 163, 184, 0.18)",
              display: "grid",
              gap: "12px",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(148, 163, 184, 0.16)",
                borderRadius: "16px",
                padding: "12px",
                background: "rgba(15, 23, 42, 0.38)",
              }}
            >
              <div className="panel-header" style={{ marginBottom: isDailyPointsOpen ? "10px" : 0 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px" }}>
                    🌙 Punkty dnia do rozliczenia
                  </h3>
                  <p className="muted" style={{ margin: "4px 0 0", fontSize: "12px" }}>
                    {settlementDailyPointsDate
                      ? now.getHours() < 20
                        ? `Dzień meczowy: ${settlementDailyPointsDate} — można dodawać moce wieczorne do 20:00`
                        : `Dzień meczowy: ${settlementDailyPointsDate} — dzień po rozliczeniu mocy wieczornych`
                      : "Brak dnia do rozliczenia"}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setIsDailyPointsOpen((prev) => !prev)}
                  style={{ padding: "9px 12px", fontSize: "13px" }}
                >
                  {isDailyPointsOpen ? "Ukryj" : "Pokaż"}
                </button>
              </div>

              {isDailyPointsOpen && (
                <div style={{ display: "grid", gap: "8px" }}>
                  {settlementDailyPointsRows.map((row, index) => (
                    <div
                      key={row.name}
                      className="standing-row"
                      style={{ gridTemplateColumns: "42px 1fr auto" }}
                    >
                      <div className={`place ${index === 0 ? "first" : ""}`}>
                        {index + 1}
                      </div>
                      <strong>{row.name}</strong>
                      <span className="points">{row.points} pkt</span>
                    </div>
                  ))}

                  <p className="muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                    To jest tabela do mocy wieczornych. Słabiak, Zamianka i Złodziej patrzą na punkty tego dnia.
                  </p>
                </div>
              )}
            </div>

            <div
              style={{
                border: "1px solid rgba(148, 163, 184, 0.16)",
                borderRadius: "16px",
                padding: "12px",
                background: "rgba(15, 23, 42, 0.38)",
              }}
            >
              <div className="panel-header" style={{ marginBottom: isLiveDailyPointsOpen ? "10px" : 0 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px" }}>
                    📅 Punkty bieżących wyników
                  </h3>
                  <p className="muted" style={{ margin: "4px 0 0", fontSize: "12px" }}>
                    {liveDailyPointsDate
                      ? `Dzień meczowy: ${liveDailyPointsDate} — tutaj wpadają punkty z wpisywanych teraz wyników`
                      : "Brak kolejnego dnia meczowego"}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setIsLiveDailyPointsOpen((prev) => !prev)}
                  style={{ padding: "9px 12px", fontSize: "13px" }}
                >
                  {isLiveDailyPointsOpen ? "Ukryj" : "Pokaż"}
                </button>
              </div>

              {isLiveDailyPointsOpen && (
                <div style={{ display: "grid", gap: "8px" }}>
                  {liveDailyPointsRows.map((row, index) => (
                    <div
                      key={row.name}
                      className="standing-row"
                      style={{ gridTemplateColumns: "42px 1fr auto" }}
                    >
                      <div className={`place ${index === 0 ? "first" : ""}`}>
                        {index + 1}
                      </div>
                      <strong>{row.name}</strong>
                      <span className="points">{row.points} pkt</span>
                    </div>
                  ))}

                  <p className="muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                    To jest osobna tabela dla bieżących wyników, żeby nie mieszały się z dniem rozliczanym mocami wieczornymi.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(148, 163, 184, 0.18)",
            }}
          >
            <div className="panel-header" style={{ marginBottom: "10px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                  👁️ Typy graczy i wyniki
                </h3>
                <p className="muted" style={{ margin: "4px 0 0", fontSize: "12px" }}>
                  Tabela widoczna cały czas, ale typy są ukryte do kompletu graczy albo zamknięcia typowania.
                </p>
              </div>

              <button
                type="button"
                className="btn secondary"
                onClick={() => setIsPredictionsTableOpen(true)}
                style={{ padding: "9px 12px", fontSize: "13px" }}
              >
                Otwórz pełną tabelę
              </button>
            </div>

            {renderPredictionsResultsTable(predictionTableMatches, "430px")}

            <p className="muted" style={{ marginTop: "8px", marginBottom: 0, fontSize: "12px" }}>
              Zielony typ = dokładnie trafiony wynik. Fioletowy = trafiony wynik gracza, który użył Rozdwojenia Jaźni. Punkty w nawiasie są za konkretny mecz, z porannymi bonusami za Goleadora i Rozdwojenie Jaźni, bez mocy wieczornych i bez mnożnika Vabank.
            </p>
          </div>

        </section>

        <section className="panel" style={{ minHeight: "auto" }}>
          <div className="panel-header" style={{ marginBottom: "10px" }}>
            <h2 style={{ fontSize: "20px" }}>⚡ Status graczy</h2>
          </div>

          <div className="card-grid">
            {playerStatuses.map((p) => {
              const isEveningPhase = p.statusPhase === "evening";
              const isFinishedPhase = p.statusPhase === "finished";

              const statusColor = isFinishedPhase
                ? "#64748b"
                : isEveningPhase
                  ? "#ef4444"
                  : p.hasPredictions
                    ? "#22c55e"
                    : "#ef4444";

              const statusIcon = isFinishedPhase
                ? "✅"
                : isEveningPhase
                  ? "⏳"
                  : p.hasPredictions
                    ? "⚽"
                    : "⏳";

              const statusText = isFinishedPhase
                ? "Dzień rozliczony"
                : isEveningPhase
                  ? "Możliwość dodania mocy wieczornej"
                  : p.hasPredictions
                    ? "Typy oddane"
                    : "Czeka";

              return (
                <div className="status-card" key={p.id}>
                  <span
                    className="dot"
                    style={{
                      background: statusColor,
                      boxShadow: `0 0 16px ${statusColor}`,
                    }}
                  />

                  <div>
                    <strong>{p.name}</strong>
                    <br />

                    <span
                      className="muted"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "22px",
                          height: "22px",
                          borderRadius: "999px",
                          alignItems: "center",
                          justifyContent: "center",
                          background: statusColor,
                          boxShadow: `0 0 16px ${statusColor}`,
                          fontSize: "13px",
                        }}
                      >
                        {statusIcon}
                      </span>

                      {statusText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="muted" style={{ marginTop: "14px" }}>
            {isCurrentMatchDateFinished && !isEveningStatusMode ? (
              <>
                Dzień meczowy rozliczony. Status typów został wyzerowany.
              </>
            ) : isEveningStatusMode ? (
              <>
                Moce wieczorne można dodać do 20:00. Użyte moce pojawią się w logu po rozliczeniu.
              </>
            ) : (
              <>
                Oddane typy: <strong>{submittedPlayersCount}</strong> /{" "}
                <strong>{players.length}</strong>
              </>
            )}
          </p>
          {powerLogs.length > 0 && (
            <div
              style={{
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(148, 163, 184, 0.16)",
              }}
            >
              <div className="panel-header" style={{ marginBottom: "10px" }}>
                <h2 style={{ fontSize: "18px" }}>📜 Log mocy</h2>
              </div>

              {powerLogs.length === 0 ? (
                <p className="muted">Brak akcji mocy do pokazania.</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                    maxHeight: "210px",
                    overflowY: "auto",
                    paddingRight: "4px",
                  }}
                >
                  {powerLogs.map((log) => (
                    <div
                      key={log.id}
                      style={{
                        padding: "9px 11px",
                        borderRadius: "12px",
                        background:
                          log.type === "block"
                            ? "rgba(127, 29, 29, 0.24)"
                            : "rgba(15, 23, 42, 0.75)",
                        border:
                          log.type === "block"
                            ? "1px solid rgba(248, 113, 113, 0.36)"
                            : "1px solid rgba(148, 163, 184, 0.16)",
                        fontSize: "12px",
                        lineHeight: 1.35,
                      }}
                    >
                      <strong
                        style={{
                          color: log.type === "block" ? "#fecaca" : "#bfdbfe",
                        }}
                      >
                        {log.matchDate}
                      </strong>

                      <div style={{ marginTop: "4px" }}>{log.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>


        {!savedPodiumPrediction && (
        <section className="panel" style={{ gridColumn: "1 / -1" }}>
          <div className="panel-header">
            <div>
              <h2>🏆 Typ mistrza świata</h2>
              <p className="muted" style={{ marginTop: "6px" }}>
                Wybierz kto zajmie 1, 2 i 3 miejsce. Po akceptacji nie da się tego cofnąć.
              </p>
            </div>

            {!savedPodiumPrediction && !isPredictionLocked && (
              <button className="btn" onClick={savePodiumPrediction}>
                Akceptuj typ podium
              </button>
            )}
          </div>
          <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {[
                { field: "firstPlace", label: "🥇 1 miejsce / Mistrz", points: "+9 pkt" },
                { field: "secondPlace", label: "🥈 2 miejsce", points: "+6 pkt" },
                { field: "thirdPlace", label: "🥉 3 miejsce", points: "+3 pkt" },
              ].map((item) => (
                <div
                  key={item.field}
                  className="result-card"
                  style={{ padding: "16px", borderRadius: "16px" }}
                >
                  <strong>{item.label}</strong>
                  <p className="muted" style={{ marginTop: "4px" }}>{item.points}</p>

                  <select
                    value={podiumPrediction[item.field as keyof PodiumType]}
                    onChange={(e) =>
                      handlePodiumChange(
                        item.field as "firstPlace" | "secondPlace" | "thirdPlace",
                        e.target.value
                      )
                    }
                    disabled={Boolean(savedPodiumPrediction) || isPredictionLocked}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "13px",
                      borderRadius: "14px",
                      border: "1px solid rgba(139, 92, 246, 0.8)",
                      background: "rgba(15, 23, 42, 0.95)",
                      color: "white",
                      fontWeight: 800,
                      outline: "none",
                    }}
                  >
                    <option value="">Wybierz zespół</option>
                    {worldCupTeams.map((team) => (
                      <option key={`${item.field}-${team}`} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
        </section>
        )}


        {isAdmin && (
          <section className="panel" style={{ gridColumn: "1 / -1" }}>
            <div className="panel-header">
              <div>
                <h2>🏁 Faktyczne podium turnieju</h2>
                <p className="muted" style={{ marginTop: "6px" }}>
                  Używane tylko raz po zakończeniu mundialu. Punkty doliczą się automatycznie: 9 / 6 / 3.
                </p>
              </div>

              <button
                className="btn secondary"
                onClick={() => setIsFinalPodiumOpen((prev) => !prev)}
              >
                {isFinalPodiumOpen ? "Ukryj" : "Pokaż"}
              </button>
            </div>

            {savedFinalPodiumResults && !isFinalPodiumOpen && (
              <p className="muted" style={{ marginTop: "-4px", marginBottom: 0 }}>
                Zapisane podium: 🥇 {savedFinalPodiumResults.firstPlace || "-"}, 🥈 {savedFinalPodiumResults.secondPlace || "-"}, 🥉 {savedFinalPodiumResults.thirdPlace || "-"}
              </p>
            )}

            {isFinalPodiumOpen && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "14px",
                  }}
                >
                  {[
                    { field: "firstPlace", label: "🥇 Mistrz świata", points: "+9 pkt" },
                    { field: "secondPlace", label: "🥈 Drugie miejsce", points: "+6 pkt" },
                    { field: "thirdPlace", label: "🥉 Trzecie miejsce", points: "+3 pkt" },
                  ].map((item) => (
                    <div
                      key={`official-${item.field}`}
                      className="result-card"
                      style={{ padding: "16px", borderRadius: "16px" }}
                    >
                      <strong>{item.label}</strong>
                      <p className="muted" style={{ marginTop: "4px" }}>{item.points}</p>

                      <select
                        value={finalPodiumResults[item.field as keyof FinalPodiumResultsType]}
                        onChange={(e) =>
                          handleFinalPodiumResultChange(
                            item.field as "firstPlace" | "secondPlace" | "thirdPlace",
                            e.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          padding: "13px",
                          borderRadius: "14px",
                          border: "1px solid rgba(34, 197, 94, 0.8)",
                          background: "rgba(15, 23, 42, 0.95)",
                          color: "white",
                          fontWeight: 800,
                          outline: "none",
                        }}
                      >
                        <option value="">Wybierz zespół</option>
                        {worldCupTeams.map((team) => (
                          <option key={`official-${item.field}-${team}`} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "14px",
                  }}
                >
                  <button className="btn" onClick={saveFinalPodiumResults}>
                    Zapisz faktyczne podium
                  </button>
                </div>

                {savedFinalPodiumResults && (
                  <p className="muted" style={{ marginTop: "12px" }}>
                    Zapisane podium: 🥇 {savedFinalPodiumResults.firstPlace}, 🥈 {savedFinalPodiumResults.secondPlace}, 🥉 {savedFinalPodiumResults.thirdPlace}
                  </p>
                )}
              </>
            )}
          </section>
        )}

        <section className="panel" style={{ gridColumn: "1 / -1" }}>
          <div className="panel-header">
            <h2>👑 Typy podium wszystkich graczy</h2>
          </div>

          {allPodiumPredictions.length === 0 ? (
            <p className="muted">Nikt jeszcze nie zaakceptował typu podium.</p>
          ) : (
            <div style={{ display: "grid", gap: "10px" }}>
              {allPodiumPredictions.map((prediction, index) => (
                <div
                  key={`${prediction.user_name}-podium-${index}`}
                  className="result-card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr repeat(3, minmax(0, 1fr))",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <strong>{prediction.user_name}</strong>
                  <span>🥇 {prediction.first_place}</span>
                  <span>🥈 {prediction.second_place}</span>
                  <span>🥉 {prediction.third_place}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>⚽ Dzisiejsze mecze</h2>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {isPredictionLocked ? (
                <button className="btn" disabled style={{ opacity: 0.5 }}>
                  Typowanie zablokowane
                </button>
              ) : isEditingPredictions ? (
                <button className="btn" onClick={savePredictions}>
                  Akceptuj typy
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => setIsEditingPredictions(true)}
                >
                  Edytuj dzisiejsze typy
                </button>
              )}
            </div>
          </div>

          {isBeforeBettingOpen && currentBettingWindow && (
            <div
              className="card"
              style={{
                padding: "18px",
                marginBottom: "18px",
                borderRadius: "18px",
                background: "rgba(30, 64, 175, 0.28)",
                border: "1px solid rgba(96, 165, 250, 0.35)",
              }}
            >
              <strong>Typowanie jeszcze nie wystartowało.</strong>
              <p className="muted" style={{ marginBottom: 0 }}>
                Start typowania: {formatShortDate(currentBettingWindow.opensAt)} o 20:00.
              </p>
            </div>
          )}

          {isPredictionLocked && (
            <div
              className="card"
              style={{
                padding: "18px",
                marginBottom: "18px",
                borderRadius: "18px",
                background: "rgba(127, 29, 29, 0.35)",
                border: "1px solid rgba(248, 113, 113, 0.35)",
              }}
            >
              <strong>Typowanie jest zablokowane.</strong>
              <p className="muted" style={{ marginBottom: 0 }}>
                Typowanie dla tego dnia jest niedostępne. Otwiera się dzień
                wcześniej o 20:00 i zamyka o 23:59.
              </p>
            </div>
          )}

          {!isPredictionLocked && isEditingPredictions ? (
            <>
              {visibleMatches.length === 0 && (
                <p className="muted">Brak meczów do typowania w aktualnym oknie.</p>
              )}

              {visibleMatches.map((match, index) => {
                const displayMatch = getDisplayMatch(match);
                const homeSlotId = getBracketSlotIdForMatchSide(match.id, "home");
                const awaySlotId = getBracketSlotIdForMatchSide(match.id, "away");

                return (
                  <div key={`${match.id}-${index}`} style={{ display: "grid", gap: "10px" }}>
                    {matchNeedsTeamSelection(match) && (
                      <div
                        className="result-card"
                        style={{
                          padding: "14px",
                          borderRadius: "16px",
                          background: "rgba(15, 23, 42, 0.72)",
                          border: "1px solid rgba(250, 204, 21, 0.25)",
                        }}
                      >
                        <strong>🏆 Uzupełnij drużyny do meczu pucharowego</strong>
                        <p className="muted" style={{ margin: "6px 0 10px" }}>
                          Jeśli drużyny nie są jeszcze znane, mecz i tak pojawi się w typowaniu. Po wyborze drużyny znika ona z kolejnych list.
                        </p>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "10px",
                          }}
                        >
                          <label style={{ display: "grid", gap: "6px" }}>
                            <span className="muted">{match.teamA}</span>
                            <select
                              value={bracketSlots[homeSlotId] || ""}
                              onChange={(e) =>
                                handleBracketSlotChange(homeSlotId, e.target.value)
                              }
                              style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "12px",
                                border: "1px solid rgba(250, 204, 21, 0.45)",
                                background: "rgba(15, 23, 42, 0.95)",
                                color: "white",
                                fontWeight: 800,
                              }}
                            >
                              <option value="">Wybierz drużynę</option>
                              {getAvailableTeamsForBracketSlot(homeSlotId).map((team) => (
                                <option key={`${homeSlotId}-${team}`} value={team}>
                                  {team}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label style={{ display: "grid", gap: "6px" }}>
                            <span className="muted">{match.teamB}</span>
                            <select
                              value={bracketSlots[awaySlotId] || ""}
                              onChange={(e) =>
                                handleBracketSlotChange(awaySlotId, e.target.value)
                              }
                              style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "12px",
                                border: "1px solid rgba(250, 204, 21, 0.45)",
                                background: "rgba(15, 23, 42, 0.95)",
                                color: "white",
                                fontWeight: 800,
                              }}
                            >
                              <option value="">Wybierz drużynę</option>
                              {getAvailableTeamsForBracketSlot(awaySlotId).map((team) => (
                                <option key={`${awaySlotId}-${team}`} value={team}>
                                  {team}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>
                    )}

                    <MatchCard
                      match={displayMatch}
                      prediction={
                        predictions[match.id] || {
                          homeScore: "",
                          awayScore: "",
                        }
                      }
                      onPredictionChange={handlePredictionChange}
                    />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "-12px",
                        marginBottom: "16px",
                      }}
                    >
                      <button
                        type="button"
                        className="btn secondary"
                        onClick={() => saveSinglePrediction(match)}
                        style={{
                          minWidth: "160px",
                          border: "1px solid rgba(96, 165, 250, 0.35)",
                          background: savedPredictions[match.id]
                            ? "rgba(34, 197, 94, 0.18)"
                            : "rgba(59, 130, 246, 0.18)",
                        }}
                      >
                        {savedPredictions[match.id] ? "💾 Zapisz ponownie" : "💾 Zapisz typ"}
                      </button>
                    </div>
                  </div>
                );
              })}

              {isDoublePowerSelected && (
                <div
                  className="card"
                  style={{
                    padding: "clamp(16px, 4vw, 22px)",
                    marginTop: "8px",
                    borderRadius: "22px",
                    background: "rgba(88, 28, 135, 0.35)",
                    border: "1px solid rgba(168, 85, 247, 0.55)",
                    boxShadow: "0 0 28px rgba(168, 85, 247, 0.25)",
                  }}
                >
                  <div className="panel-header">
                    <div>
                      <h3 style={{ margin: 0 }}>🪞 Rozdwojenie Jaźni</h3>
                      <p className="muted" style={{ marginTop: "6px" }}>
                        Wybierz jeden mecz i wpisz drugi typ. Przy liczeniu
                        punktów system wybierze lepszy z dwóch typów.
                      </p>
                    </div>
                  </div>

                  <select
                    value={doublePrediction.matchId}
                    onChange={(e) =>
                      handleDoublePredictionChange("matchId", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginTop: "14px",
                      padding: "14px",
                      borderRadius: "14px",
                      border: "1px solid rgba(168, 85, 247, 0.8)",
                      background: "rgba(15, 23, 42, 0.95)",
                      color: "white",
                      fontWeight: 800,
                      outline: "none",
                    }}
                  >
                    <option value="">Wybierz mecz</option>
                    {visibleMatches.map((match) => (
                      <option key={`double-select-${match.id}`} value={match.id}>
                        {match.teamA} vs {match.teamB}
                      </option>
                    ))}
                  </select>

                  {selectedDoubleMatch && (
                    <div
                      style={{
                        marginTop: "16px",
                        display: "grid",
                        gridTemplateColumns: "1fr auto 1fr",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px" }}>
                        <img
                          src={getFlag(selectedDoubleMatch.teamA)}
                          alt={selectedDoubleMatch.teamA}
                          width={30}
                          height={30}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                        <strong>{selectedDoubleMatch.teamA}</strong>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <input
                          type="number"
                          value={doublePrediction.homeScore}
                          onChange={(e) =>
                            handleDoublePredictionChange(
                              "homeScore",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          style={{
                            width: "58px",
                            height: "46px",
                            borderRadius: "12px",
                            border: "1px solid rgba(168, 85, 247, 0.9)",
                            background: "rgba(15, 23, 42, 0.95)",
                            color: "white",
                            fontSize: "22px",
                            fontWeight: 800,
                            textAlign: "center",
                            outline: "none",
                          }}
                        />

                        <strong style={{ fontSize: "24px" }}>:</strong>

                        <input
                          type="number"
                          value={doublePrediction.awayScore}
                          onChange={(e) =>
                            handleDoublePredictionChange(
                              "awayScore",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          style={{
                            width: "58px",
                            height: "46px",
                            borderRadius: "12px",
                            border: "1px solid rgba(168, 85, 247, 0.9)",
                            background: "rgba(15, 23, 42, 0.95)",
                            color: "white",
                            fontSize: "22px",
                            fontWeight: 800,
                            textAlign: "center",
                            outline: "none",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <strong>{selectedDoubleMatch.teamB}</strong>
                        <img
                          src={getFlag(selectedDoubleMatch.teamB)}
                          alt={selectedDoubleMatch.teamB}
                          width={30}
                          height={30}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div
              className="card"
              style={{
                padding: "22px",
                borderRadius: "20px",
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
              }}
            >
              <strong>
                {isPredictionLocked ? "Typy zamknięte ✅" : "Typy zapisane ✅"}
              </strong>
              <p className="muted" style={{ marginBottom: 0 }}>
                {isPredictionLocked
                  ? "Nie można już edytować dzisiejszych typów."
                  : "Dzisiejsze mecze są zwinięte. Kliknij „Edytuj dzisiejsze typy”, żeby je rozwinąć i zmienić. Każdy mecz możesz zapisać osobno, a na końcu kliknąć „Akceptuj typy”."}
              </p>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>✅ Moje zapisane typy</h2>

            <button
              className="btn"
              onClick={resetPredictions}
              disabled={isPredictionLocked}
              style={{
                background: "#7f1d1d",
                opacity: isPredictionLocked ? 0.5 : 1,
              }}
            >
              Reset typów
            </button>
          </div>

          {savedPredictionRows.length === 0 ? (
            <p className="muted">Nie masz jeszcze zapisanych typów.</p>
          ) : (
            <div style={{ display: "grid", gap: "10px" }}>
              {savedPredictionRows.map((match) => {
                const prediction = savedPredictions[match.id];
                const displayMatch = getDisplayMatch(match);

                return (
                  <div
                    key={`my-prediction-${match.id}`}
                    className="result-card"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px",
                      borderRadius: "14px",
                      background: "rgba(15, 23, 42, 0.7)",
                      border: "1px solid rgba(148, 163, 184, 0.16)",
                    }}
                  >
                    <span>
                      <img
                        src={getFlag(displayMatch.teamA)}
                        alt={displayMatch.teamA}
                        width={24}
                        height={24}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          verticalAlign: "middle",
                          marginRight: "8px",
                        }}
                      />
                      {match.teamA}
                    </span>

                    <strong className="points">
                      {prediction.homeScore}:{prediction.awayScore}
                    </strong>

                    <span style={{ textAlign: "right" }}>
                      {match.teamB}
                      <img
                        src={getFlag(displayMatch.teamB)}
                        alt={displayMatch.teamB}
                        width={24}
                        height={24}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          verticalAlign: "middle",
                          marginLeft: "8px",
                        }}
                      />
                    </span>
                  </div>
                );
              })}

              {savedPower && (
                <div
                  className="result-card"
                  style={{
                    padding: "14px",
                    borderRadius: "14px",
                    background: "rgba(88, 28, 135, 0.45)",
                    border: "1px solid rgba(168, 85, 247, 0.45)",
                  }}
                >
                  🟣 Użyta moc: <strong>{savedPower}</strong>
                  {savedPower === "Goleador" && selectedGoleadorTeam && (
                    <div className="muted" style={{ marginTop: "8px" }}>
                      Drużyna: <strong>{selectedGoleadorTeam}</strong>
                    </div>
                  )}
                  {isDoublePowerSaved && doublePrediction.matchId && (
                    <div className="muted" style={{ marginTop: "8px" }}>
                      Drugi typ:{" "}
                      <strong>
                        {
                          demoMatches.find(
                            (match) =>
                              match.id === Number(doublePrediction.matchId)
                          )?.teamA
                        }{" "}
                        {doublePrediction.homeScore}:{doublePrediction.awayScore}{" "}
                        {
                          demoMatches.find(
                            (match) =>
                              match.id === Number(doublePrediction.matchId)
                          )?.teamB
                        }
                      </strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>📈 Wyniki meczów</h2>

              <p className="muted" style={{ marginTop: "6px" }}>
                Uzupełnij wyniki dla poprzedniego i aktualnego dnia meczowego:{" "}
                <strong>
                  {[previousMatchDate, currentMatchDate].filter(Boolean).join(" oraz ")}
                </strong>
                . Mecze po rozpoczęciu zostają tu jeszcze przez 12 godzin, żeby dało się wpisać wynik późno w nocy albo rano.
              </p>
            </div>

            <button
              className="btn"
              onClick={resetResults}
              style={{ background: "#450a0a" }}
            >
              Reset wyników
            </button>
          </div>

          {resultInputMatches.length === 0 && (
            <p className="muted">Brak meczów do wpisania wyniku.</p>
          )}

          {resultInputMatches.map((match) => {
            const displayMatch = getDisplayMatch(match);

            return (
            <div
              key={`result-${match.id}`}
              className="card"
              style={{
                padding: "22px",
                marginBottom: "18px",
                borderRadius: "22px",
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  gap: "clamp(8px, 2.5vw, 16px)",
                }}
              >
                <div
                  style={{
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={getFlag(displayMatch.teamA)}
                    alt={displayMatch.teamA}
                    width={34}
                    height={34}
                    style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />

                  <strong
                    style={{
                      maxWidth: "100%",
                      fontSize: "clamp(12px, 3.2vw, 16px)",
                      lineHeight: 1.15,
                      wordBreak: "break-word",
                    }}
                  >
                    {displayMatch.teamA}
                  </strong>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <input
                    type="number"
                    value={results[match.id]?.homeScore || ""}
                    onChange={(e) =>
                      handleResultChange(match.id, "homeScore", e.target.value)
                    }
                    placeholder="0"
                    style={{
                      width: "clamp(46px, 13vw, 58px)",
                      height: "46px",
                      borderRadius: "12px",
                      border: "1px solid rgba(139, 92, 246, 0.9)",
                      background: "rgba(15, 23, 42, 0.95)",
                      color: "white",
                      fontSize: "22px",
                      fontWeight: 800,
                      textAlign: "center",
                      outline: "none",
                    }}
                  />

                  <strong style={{ fontSize: "24px" }}>:</strong>

                  <input
                    type="number"
                    value={results[match.id]?.awayScore || ""}
                    onChange={(e) =>
                      handleResultChange(match.id, "awayScore", e.target.value)
                    }
                    placeholder="0"
                    style={{
                      width: "clamp(46px, 13vw, 58px)",
                      height: "46px",
                      borderRadius: "12px",
                      border: "1px solid rgba(99, 102, 241, 0.9)",
                      background: "rgba(15, 23, 42, 0.95)",
                      color: "white",
                      fontSize: "22px",
                      fontWeight: 800,
                      textAlign: "center",
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={getFlag(displayMatch.teamB)}
                    alt={displayMatch.teamB}
                    width={34}
                    height={34}
                    style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />

                  <strong
                    style={{
                      maxWidth: "100%",
                      fontSize: "clamp(12px, 3.2vw, 16px)",
                      lineHeight: 1.15,
                      wordBreak: "break-word",
                    }}
                  >
                    {displayMatch.teamB}
                  </strong>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button className="btn" onClick={() => saveResult(match.id)}>
                  Zapisz wynik
                </button>
              </div>
            </div>
            );
          })}
        </section>

        <section className="panel" style={{ gridColumn: "1 / -1" }}>
          <div className="panel-header">
            <div>
              <h2>🃏 Moce</h2>
              <p className="muted" style={{ marginTop: "6px" }}>
                Poranne moce wybierasz razem z typami 20:00–23:59. Wieczorne moce akceptujesz osobno 12:00–20:00 dla poprzedniego dnia.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                className="btn"
                onClick={() => setPowerTab("morning")}
                style={{
                  background:
                    powerTab === "morning"
                      ? "linear-gradient(135deg, #0ea5e9, #22c55e)"
                      : "rgba(15, 23, 42, 0.8)",
                  boxShadow:
                    powerTab === "morning"
                      ? "0 0 24px rgba(56, 189, 248, 0.45)"
                      : undefined,
                }}
              >
                🌅 Poranne
              </button>

              <button
                className="btn"
                onClick={() => setPowerTab("evening")}
                style={{
                  background:
                    powerTab === "evening"
                      ? "linear-gradient(135deg, #7c3aed, #f59e0b)"
                      : "rgba(15, 23, 42, 0.8)",
                  boxShadow:
                    powerTab === "evening"
                      ? "0 0 24px rgba(168, 85, 247, 0.45)"
                      : undefined,
                }}
              >
                🌙 Wieczorne
              </button>
            </div>
          </div>

          <div className="power-grid">
            {filteredPowers.map((power, index) => (
              <PowerCard
                key={`${power.id}-${index}`}
                {...power}
                active={
                  powerTab === "evening"
                    ? selectedEveningPower === power.name
                    : selectedPower === power.name
                }
                used={
                  powerTab === "morning"
                    ? savedPower === power.name || usedPowerNames.has(power.name)
                    : savedEveningPower === power.name || usedPowerNames.has(power.name)
                }
                onClick={() => togglePower(power.name)}
                hideAction={powerTab === "evening"}
                canEditUsed={
                  powerTab === "evening" &&
                  isEveningPowerWindow &&
                  Boolean(savedEveningPower) &&
                  isPower(savedEveningPower, power.name)
                }
                usedNote={getPowerCardUsedNote(power.name)}
              />
            ))}
          </div>


          {powerTab === "morning" && isPower(selectedPower, "Goleador") && !savedPower && (
            <div
              className="result-card"
              style={{
                marginTop: "14px",
                background: "rgba(34, 197, 94, 0.16)",
                border: "1px solid rgba(34, 197, 94, 0.35)",
              }}
            >
              <strong>⚽ Goleador — wybierz drużynę</strong>
              <p className="muted" style={{ marginTop: "6px" }}>
                Dostaniesz +1 punkt za każdą bramkę tej drużyny w aktualnym dniu meczowym.
              </p>

              <select
                value={selectedGoleadorTeam}
                onChange={(e) => setSelectedGoleadorTeam(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "13px",
                  borderRadius: "14px",
                  border: "1px solid rgba(34, 197, 94, 0.8)",
                  background: "rgba(15, 23, 42, 0.95)",
                  color: "white",
                  fontWeight: 800,
                  outline: "none",
                }}
              >
                <option value="">Wybierz drużynę z dzisiejszych meczów</option>
                {Array.from(
                  new Set(
                    visibleMatches.flatMap((match) => [
                      getResolvedMatchTeam(match, "home"),
                      getResolvedMatchTeam(match, "away"),
                    ])
                  )
                ).map((team) => (
                  <option key={`goleador-${team}`} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          )}

          {powerTab === "evening" && (
            <div
              className="result-card"
              style={{
                marginTop: "14px",
                background: isEveningPowerWindow
                  ? "rgba(14, 165, 233, 0.18)"
                  : "rgba(71, 85, 105, 0.22)",
                border: isEveningPowerWindow
                  ? "1px solid rgba(56, 189, 248, 0.36)"
                  : "1px solid rgba(148, 163, 184, 0.20)",
              }}
            >
              <strong>
                🌙 12:00–20:00 — czas na użycie mocy wieczornej
              </strong>
              <p className="muted" style={{ marginTop: "8px", marginBottom: 0 }}>
                Moc wieczorna dotyczy poprzedniego dnia meczowego:
                {" "}
                <strong>{eveningSettlementDate || previousMatchDate || "brak poprzedniego dnia"}</strong>.
                Użyj jej mądrze, bo tego samego dnia nie wybierzesz drugiej.
              </p>

              {(savedEveningPower || hasUsedEveningPowerForPreviousDay) && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px",
                    borderRadius: "14px",
                    background: "rgba(15, 23, 42, 0.62)",
                    border: "1px solid rgba(96, 165, 250, 0.30)",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    ✅ Moc wieczorna zaakceptowana:{" "}
                    <strong>{savedEveningPower || "zapisana"}</strong>
                    {savedEveningTargetPlayer ? (
                      <>
                        {" "}→ <strong>{savedEveningTargetPlayer}</strong>
                      </>
                    ) : null}
                  </p>
                  {isEveningPowerWindow && (
                    <p className="muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                      Do 20:00 możesz kliknąć inną kartę, zmienić cel albo całkowicie wycofać moc.
                    </p>
                  )}
                </div>
              )}

              {isEveningPowerWindow ? (
                <>
                  {(selectedEveningPower === "Zamianka" || selectedEveningPower === "Złodziej") && (
                    <div style={{ marginTop: "14px" }}>
                      <strong>
                        {selectedEveningPower === "Zamianka"
                          ? "🔁 Wybierz gracza do zamiany punktów"
                          : "🦹 Wybierz gracza do kradzieży punktów"}
                      </strong>

                      <select
                        value={selectedEveningTargetPlayer}
                        onChange={(e) => setSelectedEveningTargetPlayer(e.target.value)}
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          padding: "13px",
                          borderRadius: "14px",
                          border: "1px solid rgba(96, 165, 250, 0.8)",
                          background: "rgba(15, 23, 42, 0.95)",
                          color: "white",
                          fontWeight: 800,
                          outline: "none",
                        }}
                      >
                        <option value="">Wybierz gracza</option>
                        {players
                          .filter((player) => !predictionBelongsToPlayer(userName, player.name))
                          .map((player) => (
                            <option key={`evening-target-${player.id}`} value={player.name}>
                              {player.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      className="btn"
                      onClick={saveEveningPower}
                      disabled={
                        !isEveningPowerWindow ||
                        !selectedEveningPower ||
                        ((selectedEveningPower === "Zamianka" ||
                          selectedEveningPower === "Złodziej") &&
                          !selectedEveningTargetPlayer)
                      }
                      style={{
                        opacity:
                          !isEveningPowerWindow ||
                          !selectedEveningPower ||
                          ((selectedEveningPower === "Zamianka" ||
                            selectedEveningPower === "Złodziej") &&
                            !selectedEveningTargetPlayer)
                            ? 0.55
                            : 1,
                      }}
                    >
                      {savedEveningPower || hasUsedEveningPowerForPreviousDay
                        ? "Zmień moc wieczorną"
                        : "Akceptuj moc wieczorną"}
                    </button>

                    {(savedEveningPower || hasUsedEveningPowerForPreviousDay) && (
                      <button
                        className="btn secondary"
                        onClick={withdrawEveningPower}
                        style={{
                          background: "rgba(239, 68, 68, 0.18)",
                          border: "1px solid rgba(239, 68, 68, 0.45)",
                          color: "#fecaca",
                        }}
                      >
                        Wycofaj moc wieczorną
                      </button>
                    )}

                    {selectedEveningPower && (
                      <span className="muted" style={{ alignSelf: "center" }}>
                        Wybrana: <strong>{selectedEveningPower}</strong>
                        {selectedEveningTargetPlayer ? (
                          <>
                            {" "}→ <strong>{selectedEveningTargetPlayer}</strong>
                          </>
                        ) : null}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                (savedEveningPower || hasUsedEveningPowerForPreviousDay) && (
                  <p className="muted" style={{ marginTop: "10px", marginBottom: 0, fontSize: "12px" }}>
                    Po 20:00 zmiana mocy jest zablokowana.
                  </p>
                )
              )}
            </div>
          )}

          {powerTab === "morning" && selectedPower && !savedPower && (
            <p className="muted" style={{ marginTop: "12px" }}>
              Wybrana moc poranna: <strong>{selectedPower}</strong>. Aktywuje się
              dopiero po kliknięciu „Akceptuj typy”.
            </p>
          )}
        </section>

        <section className="panel" style={{ gridColumn: "1 / -1" }}>
          <div className="panel-header">
            <h2>📊 Statystyki ligi</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            <div className="result-card">
              <strong>🎯 Dokładne trafienia</strong>

              <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
                {exactStats.map((player) => (
                  <div
                    key={`exact-${player.name}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <span>{player.name}</span>
                    <strong>{player.exactHits}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="result-card">
              <strong>🔥 Najlepsza kolejka</strong>

              <div style={{ marginTop: "12px" }}>
                {bestRound ? (
                  <>
                    <span>{bestRound.name}</span>
                    <br />
                    <span className="muted">{bestRound.matchDate}</span>
                    <br />
                    <strong>{bestRound.points} pkt</strong>
                  </>
                ) : (
                  <span className="muted">Brak danych</span>
                )}
              </div>
            </div>

            <div className="result-card">
              <strong>🟣 Użyte moce</strong>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: "12px" }}>
                Moce pojawią się tutaj dopiero po rozliczeniu danego dnia meczowego o 20:00.
              </p>

              <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
                {powerStats.map((player) => (
                  <div
                    key={`power-${player.name}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      {player.name}

                      <button
                        type="button"
                        onClick={() => setSelectedPowerStatsPlayer(player.name)}
                        aria-label={`Pokaż moce gracza ${player.name}`}
                        title={`Pokaż moce gracza ${player.name}`}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "999px",
                          border: "1px solid rgba(168, 85, 247, 0.75)",
                          background: "rgba(168, 85, 247, 0.18)",
                          color: "#f5f3ff",
                          fontWeight: 900,
                          cursor: "pointer",
                          lineHeight: 1,
                        }}
                      >
                        ?
                      </button>
                    </span>

                    <strong>{player.usedPowers}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="panel" style={{ gridColumn: "1 / -1" }}>
          <div
            className="panel-header"
            style={{ marginBottom: isMatchOnlyStandingsOpen ? "12px" : 0 }}
          >
            <div>
              <h2 style={{ margin: 0 }}>📋 Punkty za same mecze</h2>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: "13px" }}>
                Tabela bez żadnych mocy: bez Vabank, Rozdwojenia Jaźni, Goleadora i mocy wieczornych. Liczy tylko pierwszy, zwykły typ do każdego meczu.
              </p>
            </div>

            <button
              type="button"
              className="btn secondary"
              onClick={() => setIsMatchOnlyStandingsOpen((value) => !value)}
            >
              {isMatchOnlyStandingsOpen ? "Ukryj" : "Pokaż"}
            </button>
          </div>

          {isMatchOnlyStandingsOpen && (
            <div style={{ marginTop: "12px" }}>
              <Standings rows={matchOnlyStandings} />
            </div>
          )}
        </section>
          </div>
        </>
      )}


      {selectedPowerStats && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            padding: "clamp(12px, 3vw, 28px)",
            background: "rgba(2, 6, 23, 0.82)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedPowerStatsPlayer(null)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(560px, 100%)",
              maxHeight: "86vh",
              overflowY: "auto",
              borderRadius: "24px",
              border: "1px solid rgba(168, 85, 247, 0.35)",
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.96))",
              boxShadow: "0 30px 90px rgba(0,0,0,.55)",
              padding: "clamp(16px, 3vw, 24px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "22px" }}>
                  🟣 Moce gracza: {selectedPowerStats.name}
                </h2>
                <p className="muted" style={{ margin: "6px 0 0", fontSize: "13px" }}>
                  Łącznie użyte: <strong>{selectedPowerStats.usedPowers}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPowerStatsPlayer(null)}
                aria-label="Zamknij okno mocy"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "999px",
                  border: "1px solid rgba(148, 163, 184, 0.25)",
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {selectedPowerStats.powers.length === 0 ? (
              <p className="muted" style={{ margin: 0 }}>
                Ten gracz nie użył jeszcze żadnej mocy.
              </p>
            ) : (
              <div style={{ display: "grid", gap: "10px" }}>
                {selectedPowerStats.powers.map((power) => (
                  <div
                    key={power.key}
                    className="result-card"
                    style={{
                      display: "grid",
                      gap: "6px",
                      borderColor: "rgba(168, 85, 247, 0.28)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <strong>{power.name}</strong>
                      <span
                        style={{
                          border: "1px solid rgba(148, 163, 184, 0.24)",
                          borderRadius: "999px",
                          padding: "3px 8px",
                          fontSize: "12px",
                          color: "#c4b5fd",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {power.time}
                      </span>
                    </div>

                    <span className="muted" style={{ fontSize: "13px" }}>
                      Dzień: {power.matchDate}
                    </span>

                    <span style={{ fontSize: "14px" }}>{power.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isPredictionsTableOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            padding: "clamp(12px, 3vw, 28px)",
            background: "rgba(2, 6, 23, 0.82)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsPredictionsTableOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1180px, 100%)",
              maxHeight: "92vh",
              overflow: "hidden",
              borderRadius: "24px",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.96))",
              boxShadow: "0 30px 90px rgba(0,0,0,.55)",
              padding: "clamp(14px, 3vw, 22px)",
            }}
          >
            <div
              className="panel-header"
              style={{
                marginBottom: "12px",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>👁️ Pełna tabela typów i wyników</h2>
                <p className="muted" style={{ margin: "6px 0 0" }}>
                  Tu są wszystkie mecze: faza grupowa oraz drabinka. Mecze bez wpisanego wyniku zostają puste, a po uzupełnieniu wyniku same pokażą rezultat.
                </p>
              </div>

              <button
                type="button"
                className="btn secondary"
                onClick={() => setIsPredictionsTableOpen(false)}
                style={{ minWidth: "44px", padding: "10px 14px", fontSize: "18px" }}
              >
                ×
              </button>
            </div>

            {renderPredictionsResultsTable(allPredictionTableMatches, "72vh")}
          </div>
        </div>
      )}

      {activeTab === "bracket" && (
        <section className="panel" style={{ minHeight: "calc(100vh - 24px)", overflow: "hidden" }}>
          <button
            className="btn"
            onClick={() => setActiveTab("dashboard")}
            style={{
              marginBottom: "16px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            }}
          >
            ← Powrót do ligi
          </button>
          <style>{`
            .wc-bracket-board {
              position: relative;
              min-width: 2052px;
              height: 1248px;
              display: grid;
              grid-template-columns: 220px 180px 180px 180px 260px 180px 180px 180px 220px;
              grid-template-rows: repeat(16, 78px);
              column-gap: 34px;
              padding: 0;
            }

            .wc-bracket-lines {
              position: absolute;
              inset: 0;
              width: 2052px;
              height: 1248px;
              pointer-events: none;
              z-index: 1;
            }

            .wc-bracket-card {
              position: relative;
              z-index: 2;
              border-radius: 16px;
              background: rgba(15, 23, 42, 0.86);
              border: 1px solid rgba(148, 163, 184, 0.22);
              box-shadow: 0 14px 34px rgba(2, 6, 23, 0.25);
              overflow: hidden;
            }

            .wc-bracket-card.empty {
              background: rgba(15, 23, 42, 0.54);
              border: 1px dashed rgba(148, 163, 184, 0.32);
            }

            .wc-bracket-card.final {
              background:
                radial-gradient(circle at top, rgba(250, 204, 21, 0.18), transparent 42%),
                rgba(15, 23, 42, 0.9);
              border: 1px solid rgba(250, 204, 21, 0.35);
            }

            .wc-match-meta {
              display: flex;
              justify-content: space-between;
              gap: 8px;
              color: #94a3b8;
              font-size: 11px;
              font-weight: 800;
              padding: 8px 10px 4px;
            }

            .wc-team-row {
              display: flex;
              align-items: center;
              gap: 7px;
              padding: 5px 10px;
              min-height: 28px;
              font-size: 12px;
              font-weight: 800;
            }

            .wc-team-row + .wc-team-row {
              border-top: 1px solid rgba(148, 163, 184, 0.14);
            }

            .wc-slot-label {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 78px;
              min-width: 78px;
              height: 22px;
              border-radius: 999px;
              background: rgba(148, 163, 184, 0.12);
              color: #cbd5e1;
              font-size: 9px;
              font-weight: 900;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .wc-team-select {
              width: 100%;
              min-width: 0;
              padding: 7px 8px;
              border-radius: 10px;
              border: 1px solid rgba(139, 92, 246, 0.65);
              background: rgba(15, 23, 42, 0.95);
              color: white;
              font-weight: 800;
              outline: none;
              font-size: 12px;
            }

            .wc-placeholder {
              color: #cbd5e1;
              padding: 8px 10px 10px;
              display: grid;
              gap: 7px;
              font-size: 12px;
              font-weight: 800;
            }

            .wc-placeholder-line {
              display: flex;
              align-items: center;
              gap: 7px;
              min-height: 22px;
            }

            .wc-shield {
              width: 16px;
              height: 18px;
              display: inline-block;
              flex: 0 0 auto;
              opacity: 0.55;
            }

            .wc-final-title {
              text-align: center;
              font-size: 13px;
              font-weight: 900;
              color: #facc15;
              margin-top: 12px;
            }

            .wc-final-time {
              text-align: center;
              font-size: 25px;
              font-weight: 950;
              color: white;
              margin-top: 4px;
            }

            .wc-third-place {
              margin-top: 18px;
              border-radius: 14px;
              background: rgba(14, 165, 233, 0.12);
              border: 1px solid rgba(14, 165, 233, 0.26);
              padding: 10px;
            }
          `}</style>

          <div className="panel-header">
            <div>
              <h2>🏆 Drabinka fazy pucharowej</h2>
              <p className="muted" style={{ marginTop: "6px" }}>
                W 1/16 finału wybieracie drużyny ręcznie. Kolejne rundy są połączone kreskami i będą później uzupełniane automatycznie po wyborze zwycięzców.
              </p>
            </div>

            <button className="btn" onClick={saveKnockoutBracket}>
              Zapisz drabinkę
            </button>
          </div>

          {(() => {
            const leftMatches = knockoutFirstRoundMatches.slice(0, 8);
            const rightMatches = knockoutFirstRoundMatches.slice(8);

            const shield = (
              <svg className="wc-shield" viewBox="0 0 24 28" aria-hidden="true">
                <path
                  d="M12 2L21 5V12C21 18.2 17.4 23.6 12 26C6.6 23.6 3 18.2 3 12V5L12 2Z"
                  fill="currentColor"
                />
              </svg>
            );

            const drawConnector = (
              fromX: number,
              y1: number,
              y2: number,
              toX: number,
              key: string
            ) => {
              const midX = fromX < toX ? fromX + 24 : fromX - 24;
              const middleY = (y1 + y2) / 2;

              if (y1 === y2) {
                return (
                  <path
                    key={key}
                    d={`M ${fromX} ${y1} H ${toX}`}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.52)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              }

              return (
                <g key={key}>
                  <path
                    d={`M ${fromX} ${y1} H ${midX}`}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.52)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M ${fromX} ${y2} H ${midX}`}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.52)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M ${midX} ${y1} V ${y2}`}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.52)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M ${midX} ${middleY} H ${toX}`}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.52)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            };

            const leftY32 = [78, 234, 390, 546, 702, 858, 1014, 1170];
            const leftY16 = [156, 468, 780, 1092];
            const yQf = [312, 936];
            const ySf = 624;
            const yFinal = 624;

            const leftLines = [
              ...leftY16.map((y, i) =>
                drawConnector(220, leftY32[i * 2], leftY32[i * 2 + 1], 254, `l32-${i}`)
              ),
              drawConnector(434, leftY16[0], leftY16[1], 468, "l16-0"),
              drawConnector(434, leftY16[2], leftY16[3], 468, "l16-1"),
              drawConnector(648, yQf[0], yQf[1], 682, "lqf"),
              drawConnector(862, ySf, yFinal, 896, "lsf"),
            ];

            const rightLines = [
              ...leftY16.map((y, i) =>
                drawConnector(1832, leftY32[i * 2], leftY32[i * 2 + 1], 1798, `r32-${i}`)
              ),
              drawConnector(1618, leftY16[0], leftY16[1], 1584, "r16-0"),
              drawConnector(1618, leftY16[2], leftY16[3], 1584, "r16-1"),
              drawConnector(1404, yQf[0], yQf[1], 1370, "rqf"),
              drawConnector(1190, ySf, yFinal, 1156, "rsf"),
            ];

            const renderFirstRoundCard = (
              match: KnockoutFirstRoundMatch,
              index: number,
              side: "left" | "right"
            ) => {
              const column = side === "left" ? 1 : 9;
              const row = index * 2 + 1;

              return (
                <div
                  key={match.id}
                  className="wc-bracket-card"
                  style={{ gridColumn: column, gridRow: `${row} / span 2` }}
                >
                  <div className="wc-match-meta">
                    <span>{match.date}</span>
                    <span>{match.time}</span>
                  </div>

                  {[
                    { sideKey: "home", label: match.homeSlot },
                    { sideKey: "away", label: match.awaySlot },
                  ].map((slot) => {
                    const slotId = `${match.id}_${slot.sideKey}`;
                    const selectedTeam = bracketSlots[slotId] || "";

                    return (
                      <div className="wc-team-row" key={slotId}>
                        <span className="wc-slot-label">{slot.label}</span>
                        <select
                          value={selectedTeam}
                          onChange={(e) =>
                            handleBracketSlotChange(slotId, e.target.value)
                          }
                          className="wc-team-select"
                        >
                          <option value="">Wybierz</option>
                          {getAvailableTeamsForBracketSlot(slotId).map((team) => (
                            <option key={`${slotId}-${team}`} value={team}>
                              {team}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              );
            };

            const renderEmptyCard = (
              key: string,
              column: number,
              row: string,
              date: string,
              time: string,
              homeText: string,
              awayText: string
            ) => (
              <div
                key={key}
                className="wc-bracket-card empty"
                style={{ gridColumn: column, gridRow: row }}
              >
                <div className="wc-match-meta">
                  <span>{date}</span>
                  <span>{time}</span>
                </div>
                <div className="wc-placeholder">
                  <div className="wc-placeholder-line">{shield}<span>{homeText}</span></div>
                  <div className="wc-placeholder-line">{shield}<span>{awayText}</span></div>
                </div>
              </div>
            );

            return (
              <div className="bracket-scroll">
            <div className="bracket-board">
              <div className="wc-bracket-board">
                <svg className="wc-bracket-lines" viewBox="0 0 2052 1248">
                  {[...leftLines, ...rightLines]}
                </svg>

                {leftMatches.map((match, index) =>
                  renderFirstRoundCard(match, index, "left")
                )}

                {rightMatches.map((match, index) =>
                  renderFirstRoundCard(match, index, "right")
                )}

                {[
                  ["L16-1", 2, "2 / span 2", "4 lip", "23:00", "Zwycięzca pary 1", "Zwycięzca pary 2"],
                  ["L16-2", 2, "6 / span 2", "4 lip", "19:00", "Zwycięzca pary 3", "Zwycięzca pary 4"],
                  ["L16-3", 2, "10 / span 2", "6 lip", "21:00", "Zwycięzca pary 5", "Zwycięzca pary 6"],
                  ["L16-4", 2, "14 / span 2", "7 lip", "02:00", "Zwycięzca pary 7", "Zwycięzca pary 8"],
                  ["R16-1", 8, "2 / span 2", "5 lip", "22:00", "Zwycięzca pary 9", "Zwycięzca pary 10"],
                  ["R16-2", 8, "6 / span 2", "6 lip", "02:00", "Zwycięzca pary 11", "Zwycięzca pary 12"],
                  ["R16-3", 8, "10 / span 2", "7 lip", "18:00", "Zwycięzca pary 13", "Zwycięzca pary 14"],
                  ["R16-4", 8, "14 / span 2", "7 lip", "22:00", "Zwycięzca pary 15", "Zwycięzca pary 16"],
                  ["LQF-1", 3, "4 / span 2", "9 lip", "22:00", "Zwycięzca 1/8", "Zwycięzca 1/8"],
                  ["LQF-2", 3, "12 / span 2", "10 lip", "21:00", "Zwycięzca 1/8", "Zwycięzca 1/8"],
                  ["RQF-1", 7, "4 / span 2", "11 lip", "23:00", "Zwycięzca 1/8", "Zwycięzca 1/8"],
                  ["RQF-2", 7, "12 / span 2", "12 lip", "03:00", "Zwycięzca 1/8", "Zwycięzca 1/8"],
                  ["LSF", 4, "7 / span 4", "14 lip", "21:00", "Zwycięzca ćwierćfinału", "Zwycięzca ćwierćfinału"],
                  ["RSF", 6, "7 / span 4", "15 lip", "21:00", "Zwycięzca ćwierćfinału", "Zwycięzca ćwierćfinału"],
                ].map((item) =>
                  renderEmptyCard(
                    item[0] as string,
                    item[1] as number,
                    item[2] as string,
                    item[3] as string,
                    item[4] as string,
                    item[5] as string,
                    item[6] as string
                  )
                )}

                <div
                  className="wc-bracket-card final"
                  style={{ gridColumn: 5, gridRow: "6 / span 5" }}
                >
                  <div className="wc-final-title">Finał</div>
                  <div className="wc-final-time">19 lip · 21:00</div>
                  <div className="wc-placeholder" style={{ marginTop: "12px" }}>
                    <div className="wc-placeholder-line">{shield}<span>Zwycięzca półfinału</span></div>
                    <div className="wc-placeholder-line">{shield}<span>Zwycięzca półfinału</span></div>
                  </div>
                </div>

                <div
                  className="wc-bracket-card empty"
                  style={{ gridColumn: 5, gridRow: "12 / span 3" }}
                >
                  <div className="wc-third-place">
                    <strong>🥉 Mecz o 3. miejsce</strong>
                    <p className="muted" style={{ margin: "6px 0 0" }}>
                      Dwaj przegrani półfinałów
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            );
          })()}
        </section>
      )}

    </main>
  );
}
