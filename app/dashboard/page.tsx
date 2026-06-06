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

function getFlag(teamName: string) {
  return flags[teamName] || "https://flagcdn.com/w40/un.png";
}

function normalizeName(value: string) {
  return value
    .toLowerCase()
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

  if (normalized === "damian") return "damian@test.local";
  if (normalized === "andrzej") return "andrzej@test.local";
  if (normalized === "fabian") return "fabian@test.local";
  if (normalized === "michal") return "michal@test.local";

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
  const [activeTab, setActiveTab] = useState<"dashboard" | "bracket">("dashboard");
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

  const isDoublePowerSelected = selectedPower === "Rozdwojenie Jaźni";
  const isDoublePowerSaved = savedPower === "Rozdwojenie Jaźni";

  const filteredPowers = useMemo(() => {
    return powers.filter((power) => getPowerTime(power.name) === powerTab);
  }, [powerTab]);

  const usedPowerNames = useMemo(() => {
    const used = new Set<string>();

    allPredictions
      .filter((prediction) =>
        predictionBelongsToPlayer(prediction.user_name, userName)
      )
      .forEach((prediction) => {
        if (prediction.power_name) {
          used.add(prediction.power_name);
        }
      });

    allDailyPowers
      .filter((power) => predictionBelongsToPlayer(power.user_name, userName))
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
        setUserName(activeUser.email.split("@")[0]);
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

          if (prediction.power_name === "Goleador" && prediction.power_target_team) {
            setSelectedGoleadorTeam(prediction.power_target_team);
          }

          if (
            prediction.power_name === "Rozdwojenie Jaźni" &&
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

        if (Object.keys(loadedPredictions).length > 0) {
          setIsEditingPredictions(false);
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
        const eveningForPreviousDay = dailyPowerData.find(
          (power: any) =>
            isSameMatchDate(power.match_date, previousMatchDate) &&
            isEveningPowerTime(power.power_time)
        );

        if (eveningForPreviousDay) {
          setSavedEveningPower(eveningForPreviousDay.power_name);
          setSelectedEveningTargetPlayer(eveningForPreviousDay.target_player || "");
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

  const isCurrentMatchDateFinished =
    Boolean(currentMatchDate) && isFullMatchDateFinished(currentMatchDate, results);

  const isEveningStatusMode =
    Boolean(previousMatchDate) &&
    Boolean(eveningPowerWindow) &&
    now >= eveningPowerWindow!.opensAt &&
    now <= eveningPowerWindow!.closesAt;

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

      const usedEveningPower = allDailyPowers.some(
        (power) =>
          isSameMatchDate(power.match_date, previousMatchDate) &&
          isEveningPowerTime(power.power_time) &&
          predictionBelongsToPlayer(power.user_name, player.name)
      );

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
          hasPodiumPrediction,
        };
      }

      return {
        ...player,
        statusPhase: "morning" as const,
        hasPredictions: currentDayPredictions.length > 0,
        hasPower: usedMorningPower,
        hasMorningPower: usedMorningPower,
        hasEveningPower: false,
        hasPodiumPrediction,
      };
    });
  }, [
    allPredictions,
    allDailyPowers,
    allPodiumPredictions,
    visibleMatches,
    previousMatchDate,
    isEveningStatusMode,
    isCurrentMatchDateFinished,
  ]);

  const submittedPlayersCount = players.filter((player) =>
    allPredictions.some(
      (prediction) =>
        visibleMatches.some((match) => match.id === prediction.match_id) &&
        predictionMatchesPlayer(prediction, player.name)
    )
  ).length;

  const allPlayersSubmitted =
    players.length > 0 && submittedPlayersCount === players.length;

  const arePredictionsRevealed = isAfterDeadline || allPlayersSubmitted;

  const isPredictionLocked = isAfterDeadline || allPlayersSubmitted;

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
            isFinishedDay &&
            p.power_name === "Rozdwojenie Jaźni" &&
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

      if (isFinishedDay) {
        matchPredictions.forEach((prediction) => {
          if (prediction.power_name !== "Goleador" || !prediction.power_target_team) {
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
      }
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

      const eveningPowersForDay = allDailyPowers
        .filter(
          (power) =>
            isSameMatchDate(getEveningPowerApplyDate(power.match_date), matchDate) &&
            isEveningPowerTime(power.power_time)
        )
        .sort((a, b) =>
          String(a.created_at || "").localeCompare(String(b.created_at || ""))
        );

      const shouldSettleDate =
        isFullMatchDateFinished(matchDate, results) || eveningPowersForDay.length > 0;

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

      table.forEach((player) => {
        const vabankPrediction = allPredictions.find((prediction) => {
          if (prediction.power_name !== "Vabank") return false;
          if (!predictionMatchesPlayer(prediction, player.name)) return false;

          const powerMatch = demoMatches.find((match) => match.id === prediction.match_id);

          return powerMatch?.date === matchDate;
        });

        if (!vabankPrediction) return;

        const dayPoints = player.daily_points[matchDate] || 0;
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

    return table;
  }, [results, allPredictions, allDailyPowers, bracketSlots]);

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

    const isPowerLogMatchDateFinished = (matchDate: string) => {
      const matchesForDate = demoMatches.filter(
        (match) => match.date === matchDate
      );

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

    allMatchDates.forEach((matchDate) => {
      if (!isPowerLogMatchDateFinished(matchDate)) {
        return;
      }

      const blockedPlayers = new Set<string>();

      allPredictions.forEach((prediction) => {
        if (!prediction.power_name) return;

        const powerMatch = demoMatches.find((match) => match.id === prediction.match_id);
        if (powerMatch?.date !== matchDate) return;

        const playerName = getPlayerNameFromEmail(
          prediction.user_email || prediction.user_name || ""
        );

        if (prediction.power_name === "Blokada") {
          blockedPlayers.add(playerName);

          pushLog({
            id: `${matchDate}-block-${playerName}`,
            matchDate,
            type: "power",
            message: `🛡️ ${playerName} aktywował Blokadę.`,
          });
        }

        if (prediction.power_name === "Vabank") {
          pushLog({
            id: `${matchDate}-vabank-${playerName}`,
            matchDate,
            type: "power",
            message: `💥 ${playerName} zagrał Vabank.`,
          });
        }

        if (prediction.power_name === "Rozdwojenie Jaźni") {
          pushLog({
            id: `${matchDate}-double-${playerName}`,
            matchDate,
            type: "power",
            message: `🪞 ${playerName} użył Rozdwojenia Jaźni.`,
          });
        }

        if (prediction.power_name === "Goleador") {
          pushLog({
            id: `${matchDate}-goleador-${playerName}`,
            matchDate,
            type: "power",
            message: `⚽ ${playerName} aktywował Goleadora.`,
          });
        }
      });

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

        if (isPower(power.power_name, "Zamianka") && power.target_player) {
          if (blockedPlayers.has(power.target_player)) {
            pushLog({
              id: `${matchDate}-swap-block-${actorName}-${power.target_player}`,
              matchDate,
              type: "block",
              message: `🚫 ${actorName} próbował użyć Zamianki na ${power.target_player}, ale został odbity przez Blokadę.`,
            });
          } else {
            pushLog({
              id: `${matchDate}-swap-${actorName}-${power.target_player}`,
              matchDate,
              type: "power",
              message: `🔁 ${actorName} użył Zamianki na ${power.target_player}.`,
            });
          }
        }

        if (isPower(power.power_name, "Złodziej") && power.target_player) {
          if (blockedPlayers.has(power.target_player)) {
            pushLog({
              id: `${matchDate}-thief-block-${actorName}-${power.target_player}`,
              matchDate,
              type: "block",
              message: `🚫 FRAJER ${actorName} próbował okraść ${power.target_player}, ale dostał Blokadą po łapach 😂`,
            });
          } else {
            pushLog({
              id: `${matchDate}-thief-${actorName}-${power.target_player}`,
              matchDate,
              type: "power",
              message: `🦹 ${actorName} użył Złodzieja na ${power.target_player}.`,
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
      const playerPredictions = allPredictions.filter((p) =>
        predictionMatchesPlayer(p, player.name)
      );

      const uniquePowers = new Set(
        playerPredictions
          .map((prediction) => prediction.power_name)
          .filter(Boolean)
      );

      return {
        name: player.name,
        usedPowers: uniquePowers.size,
      };
    });
  }, [allPredictions]);

  const bestRound = sortedStandings[0];

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


  const handleBracketSlotChange = (slotId: string, teamName: string) => {
    setBracketSlots((prev) => ({
      ...prev,
      [slotId]: teamName,
    }));
  };

  const hasUsedMorningPowerToday = allPredictions.some(
    (prediction) =>
      visibleMatches.some((match) => match.id === prediction.match_id) &&
      predictionBelongsToPlayer(prediction.user_name, userName) &&
      prediction.power_name &&
      getPowerTime(prediction.power_name) === "morning"
  );

  const hasUsedEveningPowerForPreviousDay =
    Boolean(savedEveningPower) ||
    allDailyPowers.some(
      (power) =>
        isSameMatchDate(power.match_date, eveningSettlementDate) &&
        isEveningPowerTime(power.power_time) &&
        predictionBelongsToPlayer(power.user_name, userName)
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
    if (usedPowerNames.has(powerName)) {
      alert("Ta moc została już wykorzystana w turnieju i nie można użyć jej ponownie.");
      return;
    }

    if (powerTab === "evening") {
      if (!isEveningPowerWindow) {
        alert("Moce wieczorne można wybrać tylko w oknie 12:00–20:00.");
        return;
      }

      if (savedEveningPower) {
        alert("Użyłeś już mocy wieczornej dla tego dnia.");
        return;
      }

      if (hasUsedEveningPowerForPreviousDay) {
        alert("Użyłeś już mocy wieczornej dla poprzedniego dnia meczowego.");
        return;
      }

      setSelectedEveningPower((prev) => (prev === powerName ? null : powerName));
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
      const next = prev === powerName ? null : powerName;

      if (next !== "Rozdwojenie Jaźni") {
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

  const savePredictions = async () => {
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

    if (selectedPower === "Goleador" && !selectedGoleadorTeam) {
      alert("Przy Goleadorze wybierz drużynę.");
      return;
    }

    if (
      selectedPower === "Rozdwojenie Jaźni" &&
      (!doublePrediction.matchId ||
        doublePrediction.homeScore === "" ||
        doublePrediction.awayScore === "")
    ) {
      alert("Przy Rozdwojeniu Jaźni wybierz mecz i wpisz drugi wynik.");
      return;
    }

    const currentMatchIds = visibleMatches.map((match) => match.id);

    const rows = (Object.entries(predictions) as [string, { homeScore: string; awayScore: string }][])
      .filter(
        ([matchId, prediction]) =>
          currentMatchIds.includes(Number(matchId)) &&
          prediction.homeScore !== "" &&
          prediction.awayScore !== ""
      )
      .map(([matchId, prediction]) => ({
        user_id: activeUser.id,
        user_email: activeUser.email,
        match_id: Number(matchId),
        home_score: Number(prediction.homeScore),
        away_score: Number(prediction.awayScore),
        power_name: selectedPower,
        power_target_match_id:
          selectedPower === "Rozdwojenie Jaźni"
            ? Number(doublePrediction.matchId)
            : null,
        power_home_score:
          selectedPower === "Rozdwojenie Jaźni"
            ? Number(doublePrediction.homeScore)
            : null,
        power_away_score:
          selectedPower === "Rozdwojenie Jaźni"
            ? Number(doublePrediction.awayScore)
            : null,
        power_target_team:
          selectedPower === "Goleador" ? selectedGoleadorTeam : null,
      }));

    if (rows.length === 0) {
      alert("Nie wpisałeś żadnych typów");
      return;
    }

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

    alert("Typy zapisane!");
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

    if (savedEveningPower || hasUsedEveningPowerForPreviousDay) {
      alert("Użyłeś już mocy wieczornej dla tego dnia.");
      return;
    }

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

    const { error } = await supabase.from("daily_powers").insert({
      user_id: activeUser.id,
      user_email: activeUser.email,
      match_date: eveningSettlementDate,
      power_name: selectedEveningPower,
      power_time: "evening",
      target_player:
        selectedEveningPower === "Zamianka" || selectedEveningPower === "Złodziej"
          ? selectedEveningTargetPlayer
          : null,
    });

    if (error) {
      console.error(error);
      alert("Błąd zapisu mocy wieczornej: " + error.message);
      return;
    }

    setSavedEveningPower(selectedEveningPower);
    setSelectedEveningPower(null);

    await loadAllDailyPowers();

    alert("Moc wieczorna zaakceptowana. Użyj jej mądrze 😄");
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
    setAllDailyPowers([]);
    setPodiumPrediction({
      firstPlace: "",
      secondPlace: "",
      thirdPlace: "",
    });
    setSavedPodiumPrediction(null);
    setAllPodiumPredictions([]);
    setBracketSlots({});
    setDoublePrediction({
      matchId: "",
      homeScore: "",
      awayScore: "",
    });
    setIsEditingPredictions(true);

    await loadAllPredictions();
    await loadAllPodiumPredictions();
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

  const latestResultMatches = demoMatches
    .filter((match) => {
      const result = results[match.id];
      return result?.homeScore !== "" && result?.awayScore !== "";
    })
    .sort((a, b) => b.id - a.id)
    .slice(0, 15);

  const selectedDoubleMatch =
    visibleMatches.find((match) => match.id === Number(doublePrediction.matchId)) ||
    demoMatches.find((match) => match.id === Number(doublePrediction.matchId));

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

          {arePredictionsRevealed && (
            <div
              style={{
                marginTop: "18px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(148, 163, 184, 0.18)",
              }}
            >
              <div className="panel-header" style={{ marginBottom: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                  👁️ Typy graczy i wyniki
                </h3>
              </div>

              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  overflowX: "auto",
                  borderRadius: "16px",
                  border: "1px solid rgba(148, 163, 184, 0.16)",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    minWidth: "620px",
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
                      }}
                    >
                      <th style={{ padding: "10px" }}>Mecz</th>
                      <th style={{ padding: "10px", textAlign: "center" }}>Wynik</th>
                      {players.map((player) => (
                        <th
                          key={`type-head-${player.name}`}
                          style={{ padding: "10px", textAlign: "center" }}
                        >
                          {player.name}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {visibleMatches.map((match) => {
                      const realResult = results[match.id];
                      const displayMatch = getDisplayMatch(match);

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
                            {displayMatch.teamA} - {displayMatch.teamB}
                          </td>

                          <td
                            style={{
                              padding: "10px",
                              borderTop: "1px solid rgba(148, 163, 184, 0.12)",
                              textAlign: "center",
                              color: "#fde68a",
                              fontWeight: 950,
                            }}
                          >
                            {realResult?.homeScore !== "" && realResult?.awayScore !== ""
                              ? `${realResult?.homeScore}:${realResult?.awayScore}`
                              : "-"}
                          </td>

                          {players.map((player) => {
                            const prediction = allPredictions.find(
                              (item) =>
                                item.match_id === match.id &&
                                predictionMatchesPlayer(item, player.name)
                            );

                            const hasResult =
                              realResult?.homeScore !== "" &&
                              realResult?.awayScore !== "" &&
                              realResult !== undefined;

                            const realHome = Number(realResult?.homeScore);
                            const realAway = Number(realResult?.awayScore);

                            const hasDoubleForThisMatch =
                              prediction &&
                              prediction.power_name === "Rozdwojenie Jaźni" &&
                              prediction.power_target_match_id === match.id &&
                              prediction.power_home_score !== null &&
                              prediction.power_home_score !== undefined &&
                              prediction.power_away_score !== null &&
                              prediction.power_away_score !== undefined;

                            let displayHomeScore = prediction?.home_score;
                            let displayAwayScore = prediction?.away_score;

                            if (prediction && hasResult && hasDoubleForThisMatch) {
                              const baseDistance = calculateDistance(
                                prediction.home_score,
                                prediction.away_score,
                                realHome,
                                realAway
                              );

                              const doubleDistance = calculateDistance(
                                Number(prediction.power_home_score),
                                Number(prediction.power_away_score),
                                realHome,
                                realAway
                              );

                              if (doubleDistance < baseDistance) {
                                displayHomeScore = Number(prediction.power_home_score);
                                displayAwayScore = Number(prediction.power_away_score);
                              }
                            }

                            const exact =
                              prediction &&
                              hasResult &&
                              Number(displayHomeScore) === realHome &&
                              Number(displayAwayScore) === realAway;

                            const exactWithDoublePower =
                              Boolean(exact) && Boolean(hasDoubleForThisMatch);

                            return (
                              <td
                                key={`types-cell-${match.id}-${player.name}`}
                                style={{
                                  padding: "10px",
                                  borderTop: "1px solid rgba(148, 163, 184, 0.12)",
                                  textAlign: "center",
                                  color: prediction
                                    ? exact
                                      ? exactWithDoublePower
                                        ? "#c084fc"
                                        : "#4ade80"
                                      : "#e5e7eb"
                                    : "#64748b",
                                  background:
                                    prediction && exactWithDoublePower
                                      ? "rgba(168, 85, 247, 0.16)"
                                      : undefined,
                                  fontWeight: prediction ? 950 : 700,
                                }}
                              >
                                {prediction
                                  ? `${displayHomeScore}:${displayAwayScore}`
                                  : "-"}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="muted" style={{ marginTop: "8px", marginBottom: 0, fontSize: "12px" }}>
                Zielony typ = dokładnie trafiony wynik. Fioletowy = trafiony wynik gracza, który użył Rozdwojenia Jaźni.
              </p>
            </div>
          )}

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
                  ? p.hasEveningPower
                    ? "#60a5fa"
                    : "#ef4444"
                  : p.hasPredictions
                    ? p.hasMorningPower
                      ? "#a855f7"
                      : "#22c55e"
                    : "#ef4444";

              const statusIcon = isFinishedPhase
                ? "✅"
                : isEveningPhase
                  ? p.hasEveningPower
                    ? "🌙"
                    : "⏳"
                  : p.hasPredictions
                    ? p.hasMorningPower
                      ? "⚡"
                      : "⚽"
                    : "⏳";

              const statusText = isFinishedPhase
                ? "Dzień rozliczony"
                : isEveningPhase
                  ? p.hasEveningPower
                    ? "Moc wieczorna dodana"
                    : "Możliwość dodania mocy wieczornej"
                  : p.hasPredictions
                    ? "Typy oddane"
                    : "Czeka";

              const usedMorningPower = !isEveningPhase && p.hasMorningPower;
              const usedEveningPower = isEveningPhase && p.hasEveningPower;

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

                    {(usedMorningPower || usedEveningPower) && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                          marginTop: "8px",
                        }}
                      >
                        {usedMorningPower && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "6px 10px",
                              borderRadius: "999px",
                              background: "rgba(250, 204, 21, 0.18)",
                              border: "1px solid rgba(250, 204, 21, 0.45)",
                              color: "#fde68a",
                              fontSize: "12px",
                              fontWeight: 900,
                              boxShadow: "0 0 14px rgba(250, 204, 21, 0.16)",
                            }}
                          >
                            ☀️ Moc
                          </span>
                        )}

                        {usedEveningPower && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "6px 10px",
                              borderRadius: "999px",
                              background: "rgba(96, 165, 250, 0.18)",
                              border: "1px solid rgba(96, 165, 250, 0.45)",
                              color: "#bfdbfe",
                              fontSize: "12px",
                              fontWeight: 900,
                              boxShadow: "0 0 14px rgba(96, 165, 250, 0.16)",
                            }}
                          >
                            🌙 Moc
                          </span>
                        )}
                      </div>
                    )}
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
                Moce wieczorne:{" "}
                <strong>{playerStatuses.filter((player) => player.hasEveningPower).length}</strong> /{" "}
                <strong>{players.length}</strong>
              </>
            ) : (
              <>
                Oddane typy: <strong>{submittedPlayersCount}</strong> /{" "}
                <strong>{players.length}</strong>
              </>
            )}
          </p>
          {arePredictionsRevealed && (
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
                  Zapisz typy
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
                  </div>
                );
              })}

              {isDoublePowerSelected && (
                <div
                  className="card"
                  style={{
                    padding: "22px",
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
                  : "Dzisiejsze mecze są zwinięte. Kliknij „Edytuj dzisiejsze typy”, żeby je rozwinąć i zmienić."}
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
                Uzupełnij wyniki tylko dla dnia meczowego: <strong>{currentMatchDate}</strong>.
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

          {visibleMatches.length === 0 && (
            <p className="muted">Brak meczów dla aktualnego dnia.</p>
          )}

          {visibleMatches.map((match) => {
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
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={getFlag(displayMatch.teamA)}
                    alt={displayMatch.teamA}
                    width={34}
                    height={34}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />

                  <strong>{displayMatch.teamA}</strong>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="number"
                    value={results[match.id]?.homeScore || ""}
                    onChange={(e) =>
                      handleResultChange(match.id, "homeScore", e.target.value)
                    }
                    placeholder="0"
                    style={{
                      width: "58px",
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
                      width: "58px",
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
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <strong>{displayMatch.teamB}</strong>

                  <img
                    src={getFlag(displayMatch.teamB)}
                    alt={displayMatch.teamB}
                    width={34}
                    height={34}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
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

        <section className="panel">
          <div className="panel-header">
            <h2>📈 Ostatnie wyniki</h2>
          </div>

          {latestResultMatches.length === 0 ? (
            <p className="muted">
              Brak wyników. Ta tabela uzupełni się automatycznie po zapisaniu
              pierwszego wyniku meczu.
            </p>
          ) : (
            latestResultMatches.map((match) => {
              const result = results[match.id];

              return (
                <div
                  className="result-card"
                  key={`last-result-${match.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    gap: "12px",
                  }}
                >
                  <span>
                    <span className="muted">{match.date} · {match.time}</span>
                    <br />
                    {match.teamA} <span className="muted">vs</span>{" "}
                    {match.teamB}
                  </span>

                  <strong className="points">
                    {result ? `${result.homeScore}:${result.awayScore}` : "-:-"}
                  </strong>
                </div>
              );
            })
          )}
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
              />
            ))}
          </div>


          {powerTab === "morning" && selectedPower === "Goleador" && !savedPower && (
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
                <strong>{previousMatchDate || "brak poprzedniego dnia"}</strong>.
                Użyj jej mądrze, bo tego samego dnia nie wybierzesz drugiej.
              </p>

              {savedEveningPower || hasUsedEveningPowerForPreviousDay ? (
                <p style={{ marginTop: "12px", marginBottom: 0 }}>
                  ✅ Moc wieczorna zaakceptowana:{" "}
                  <strong>{savedEveningPower || "zapisana"}</strong>
                </p>
              ) : (
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
                    Akceptuj moc wieczorną
                  </button>

                  {selectedEveningPower && (
                    <span className="muted" style={{ alignSelf: "center" }}>
                      Wybrana: <strong>{selectedEveningPower}</strong>
                    </span>
                  )}
                </div>
                </>
              )}
            </div>
          )}

          {powerTab === "morning" && selectedPower && !savedPower && (
            <p className="muted" style={{ marginTop: "12px" }}>
              Wybrana moc poranna: <strong>{selectedPower}</strong>. Aktywuje się
              dopiero po kliknięciu „Zapisz typy”.
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
                    <strong>{bestRound.points} pkt</strong>
                  </>
                ) : (
                  <span className="muted">Brak danych</span>
                )}
              </div>
            </div>

            <div className="result-card">
              <strong>🟣 Użyte moce</strong>

              <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
                {powerStats.map((player) => (
                  <div
                    key={`power-${player.name}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <span>{player.name}</span>
                    <strong>{player.usedPowers}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
          </div>
        </>
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
