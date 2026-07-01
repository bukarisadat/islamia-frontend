export type SemesterSettings = {
  semester: string;
  fee: number;
  admissionStart: string;
  admissionEnd: string;
};

export const SEMESTER_SETTINGS_STORAGE_KEY = "ami_semester_settings";

export const emptySemesterSettings: SemesterSettings = {
  semester: "",
  fee: 0,
  admissionStart: "",
  admissionEnd: "",
};

export function readSemesterSettings(): SemesterSettings {
  if (typeof window === "undefined") {
    return { ...emptySemesterSettings };
  }

  try {
    const stored = localStorage.getItem(SEMESTER_SETTINGS_STORAGE_KEY);
    if (!stored) return { ...emptySemesterSettings };
    const parsed = JSON.parse(stored) as Partial<SemesterSettings>;
    return {
      semester: parsed.semester || "",
      fee: Number(parsed.fee || 0),
      admissionStart: (parsed as any).admissionStart || (parsed as any).semesterStart || "",
      admissionEnd: (parsed as any).admissionEnd || (parsed as any).semesterEnd || "",
    };
  } catch {
    return { ...emptySemesterSettings };
  }
}

export function writeSemesterSettings(settings: SemesterSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SEMESTER_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function formatSemesterDate(value: string) {
  if (!value) return "Not set";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}