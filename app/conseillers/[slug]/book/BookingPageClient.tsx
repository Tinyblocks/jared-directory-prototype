"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { Advisor } from "@/data/advisors";
import { useLanguage } from "@/components/useLanguage";
import { tAdvisorTitle } from "@/components/advisorI18n";

interface BookingPageClientProps {
  advisor: Advisor;
}

// 30-min slots, weekdays only, 9:00–12:00 and 14:00–18:00, for the next 6 weeks
function buildAvailability(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  for (let d = 0; d < 42; d++) {
    const date = new Date(start);
    date.setDate(date.getDate() + d);
    const day = date.getDay();
    if (day === 0 || day === 6) continue; // skip weekend

    const key = date.toDateString();
    const times: string[] = [];
    for (let h = 9; h < 12; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`, `${h.toString().padStart(2, "0")}:30`);
    }
    times.push("12:00");
    for (let h = 14; h < 18; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`, `${h.toString().padStart(2, "0")}:30`);
    }
    map.set(key, times);
  }
  return map;
}

const AVAILABILITY = buildAvailability();

function getDatesWithSlots(): Set<string> {
  return new Set(AVAILABILITY.keys());
}

const WEEKDAY_LABELS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKDAY_LABELS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
  const mondayFirst = startDay === 0 ? 6 : startDay - 1;
  const daysInMonth = last.getDate();
  const leading = mondayFirst;
  const total = leading + daysInMonth;
  const rows = Math.ceil(total / 7);
  const grid: (number | null)[][] = [];
  let day = 1;
  for (let r = 0; r < rows; r++) {
    const row: (number | null)[] = [];
    for (let c = 0; c < 7; c++) {
      const i = r * 7 + c;
      if (i < leading || day > daysInMonth) {
        row.push(null);
      } else {
        row.push(day++);
      }
    }
    grid.push(row);
  }
  return grid;
}

function formatMonthYear(date: Date, isEnglish: boolean) {
  return date.toLocaleDateString(isEnglish ? "en-GB" : "fr-FR", {
    month: "long",
    year: "numeric",
  });
}

function formatSelectedDate(date: Date, isEnglish: boolean) {
  return date.toLocaleDateString(isEnglish ? "en-GB" : "fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function BookingPageClient({ advisor }: BookingPageClientProps) {
  const router = useRouter();
  const { isEnglish } = useLanguage();
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const datesWithSlots = useMemo(() => getDatesWithSlots(), []);
  const monthGrid = useMemo(
    () => getMonthGrid(viewMonth.getFullYear(), viewMonth.getMonth()),
    [viewMonth]
  );

  const slotsForSelectedDate = selectedDate
    ? AVAILABILITY.get(selectedDate.toDateString()) ?? []
    : [];
  const morningSlots = slotsForSelectedDate.filter((t) => {
    const [h] = t.split(":").map(Number);
    return h < 12;
  });
  const afternoonSlots = slotsForSelectedDate.filter((t) => {
    const [h] = t.split(":").map(Number);
    return h >= 12;
  });

  const isPast = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };
  const hasSlots = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    return datesWithSlots.has(d.toDateString());
  };
  const isSelected = (day: number | null) =>
    day !== null &&
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === viewMonth.getMonth() &&
    selectedDate.getFullYear() === viewMonth.getFullYear();

  const weekdays = isEnglish ? WEEKDAY_LABELS_EN : WEEKDAY_LABELS_FR;

  const prevMonth = () => {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  };

  const canPrev =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());
  const maxViewMonth = new Date(today.getFullYear(), today.getMonth() + 3, 1);
  const canNext = viewMonth.getTime() < maxViewMonth.getTime();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href={`/conseillers/${advisor.slug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEnglish ? "Back to profile" : "Retour au profil"}
        </Link>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            Phase 2
          </span>

          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100 sm:h-16 sm:w-16">
              <Image
                src={advisor.photo}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
                {advisor.firstName} {advisor.lastName}
              </h1>
              <p className="text-sm text-gray-600">
                {tAdvisorTitle(advisor.title, isEnglish)}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {isEnglish ? "30 min · Free introductory call" : "30 min · Appel de découverte gratuit"}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">
              {isEnglish ? "Select a date" : "Choisir une date"}
            </h2>
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canPrev}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-40"
                aria-label={isEnglish ? "Previous month" : "Mois précédent"}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <p className="text-base font-semibold text-gray-900 capitalize">
                {formatMonthYear(viewMonth, isEnglish)}
              </p>
              <button
                type="button"
                onClick={nextMonth}
                disabled={!canNext}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-40"
                aria-label={isEnglish ? "Next month" : "Mois suivant"}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80">
                    {weekdays.map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="py-2.5 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthGrid.map((row, ri) => (
                    <tr key={ri} className="border-b border-gray-100 last:border-0">
                      {row.map((day, ci) => {
                        if (day === null) {
                          return <td key={ci} className="bg-gray-50/50 p-1" />;
                        }
                        const past = isPast(viewMonth.getFullYear(), viewMonth.getMonth(), day);
                        const available = hasSlots(viewMonth.getFullYear(), viewMonth.getMonth(), day);
                        const selected = isSelected(day);
                        const clickable = !past && available;
                        return (
                          <td key={ci} className="p-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (!clickable) return;
                                setSelectedDate(
                                  new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
                                );
                                setSelectedTime(null);
                              }}
                              disabled={!clickable}
                              className={`flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors sm:h-10 ${
                                !clickable
                                  ? "cursor-default text-gray-300"
                                  : selected
                                    ? "bg-[var(--color-primary)] text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {day}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedDate && slotsForSelectedDate.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-sm font-medium text-gray-900">
                {isEnglish ? "Select a time" : "Choisir un horaire"}
              </h2>
              <p className="mt-1 text-sm text-gray-600 capitalize">
                {formatSelectedDate(selectedDate, isEnglish)}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {morningSlots.length > 0 && (
                  <>
                    <div className="col-span-full text-xs font-medium uppercase tracking-wide text-gray-500">
                      {isEnglish ? "Morning" : "Matin"}
                    </div>
                    {morningSlots.map((time) => {
                      const active = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "border-[var(--color-primary)] bg-[var(--color-primary-muted)] text-[var(--color-primary)]"
                              : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </>
                )}
                {afternoonSlots.length > 0 && (
                  <>
                    <div className="col-span-full mt-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                      {isEnglish ? "Afternoon" : "Après-midi"}
                    </div>
                    {afternoonSlots.map((time) => {
                      const active = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "border-[var(--color-primary)] bg-[var(--color-primary-muted)] text-[var(--color-primary)]"
                              : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                {isEnglish ? "You selected:" : "Vous avez choisi :"}{" "}
                <span className="font-medium text-gray-900 capitalize">
                  {formatSelectedDate(selectedDate, isEnglish)} at {selectedTime}
                </span>
              </p>
              <button
                type="button"
                className="btn-primary shrink-0 py-3 px-6"
                onClick={() => {
                  const y = selectedDate.getFullYear();
                  const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
                  const d = String(selectedDate.getDate()).padStart(2, "0");
                  const dateStr = `${y}-${m}-${d}`;
                  router.push(
                    `/conseillers/${advisor.slug}/book/confirmation?date=${encodeURIComponent(dateStr)}&time=${encodeURIComponent(selectedTime)}`
                  );
                }}
              >
                {isEnglish ? "Confirm request" : "Confirmer ma demande"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
