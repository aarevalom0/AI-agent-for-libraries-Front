// src/lib/readingClient.ts
export type ReaderSettings = {
  night: boolean;
  font: "Newsreader" | "serif" | "sans";
  fontSize: number; // px
  bg: "default" | "cream" | "sepia";
  sidebarOpen: boolean;
};

export type ReaderNote = { id: string; chapter: number; text: string; createdAt: string };

export type ReaderState = {
  chapter: number;     // índice 0..N-1
  scroll: number;      // scrollY relativo
  notes: ReaderNote[];
  settings: ReaderSettings;
};

const DEFAULT: ReaderState = {
  chapter: 0,
  scroll: 0,
  notes: [],
  settings: { night: false, font: "Newsreader", fontSize: 20, bg: "default", sidebarOpen: true },
};

const key = (slug: string) => `lecturium_reader_${slug}`;

function safeGet<T>(k: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return fb; }
}
function safeSet<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
}

export function loadReader(slug: string): ReaderState {
  const s = safeGet<ReaderState>(key(slug), DEFAULT);
  return { ...DEFAULT, ...s, settings: { ...DEFAULT.settings, ...(s as any).settings } };
}

export function saveReader(slug: string, state: Partial<ReaderState>) {
  const prev = loadReader(slug);
  const next: ReaderState = {
    ...prev,
    ...state,
    settings: { ...prev.settings, ...(state.settings || {}) },
    notes: state.notes ?? prev.notes,
  };
  safeSet(key(slug), next);
  return next;
}

export function setChapter(slug: string, chapter: number) {
  return saveReader(slug, { chapter, scroll: 0 });
}

export function setScroll(slug: string, scroll: number) {
  return saveReader(slug, { scroll });
}

export function addNote(slug: string, chapter: number, text: string) {
  const now = new Date().toISOString();
  const n: ReaderNote = { id: crypto.randomUUID(), chapter, text, createdAt: now };
  const cur = loadReader(slug);
  const notes = [n, ...cur.notes];
  return saveReader(slug, { notes });
}

export function updateSettings(slug: string, s: Partial<ReaderSettings>) {
  return saveReader(slug, { settings: s as any });
}

export function deleteNote(slug: string, id: string) {
  const cur = loadReader(slug);
  return saveReader(slug, { notes: cur.notes.filter(n => n.id !== id) });
}
