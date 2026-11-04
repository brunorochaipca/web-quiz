import {
  QUESTIONS,
  SECTIONS,
  TOTAL_POINTS,
  questionsInSection,
  type Choice,
  type Question,
} from "@/lib/exam-data";

export type PracticeMode = "exame" | "estudo";

export type Session = {
  mode: PracticeMode;
  answers: Partial<Record<number, Choice>>;
  flagged: number[];
  revealed: number[];
  currentId: number;
  startedAt: number;
  submittedAt: number | null;
  limitMinutes: number | null;
};

const STORAGE_KEY = "alg-java-teste-modelo-v1";

function isChoice(value: unknown): value is Choice {
  return value === "A" || value === "B" || value === "C" || value === "D";
}

export function loadSession(): Session | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const data = JSON.parse(raw) as Partial<Session>;
    if (data.mode !== "exame" && data.mode !== "estudo") {
      return null;
    }
    if (typeof data.startedAt !== "number" || typeof data.currentId !== "number") {
      return null;
    }

    const answers: Session["answers"] = {};
    if (data.answers && typeof data.answers === "object") {
      for (const [key, value] of Object.entries(data.answers)) {
        const id = Number(key);
        if (Number.isInteger(id) && isChoice(value)) {
          answers[id] = value;
        }
      }
    }

    return {
      mode: data.mode,
      answers,
      flagged: Array.isArray(data.flagged)
        ? data.flagged.filter((id) => Number.isInteger(id))
        : [],
      revealed: Array.isArray(data.revealed)
        ? data.revealed.filter((id) => Number.isInteger(id))
        : [],
      currentId: Math.min(31, Math.max(1, data.currentId)),
      startedAt: data.startedAt,
      submittedAt: typeof data.submittedAt === "number" ? data.submittedAt : null,
      limitMinutes:
        data.limitMinutes === 45 ||
        data.limitMinutes === 60 ||
        data.limitMinutes === 90
          ? data.limitMinutes
          : null,
    };
  } catch {
    return null;
  }
}

export function saveSession(session: Session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export type GradedQuestion = {
  question: Question;
  chosen: Choice | null;
  correct: boolean;
  blank: boolean;
};

export type SectionScore = {
  id: string;
  title: string;
  points: number;
  maxPoints: number;
  correct: number;
  total: number;
  answered: number;
};

export type Grade = {
  points: number;
  maxPoints: number;
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  bySection: SectionScore[];
  perQuestion: GradedQuestion[];
};

export function gradeSession(answers: Session["answers"]): Grade {
  const perQuestion: GradedQuestion[] = QUESTIONS.map((question) => {
    const chosen = answers[question.id] ?? null;
    return {
      question,
      chosen,
      blank: chosen === null,
      correct: chosen === question.answer,
    };
  });

  const bySection: SectionScore[] = SECTIONS.map((section) => {
    const items = questionsInSection(section.id).map((question) => {
      const graded = perQuestion.find((item) => item.question.id === question.id);
      if (!graded) {
        throw new Error(`Falta a correção da questão ${question.id}.`);
      }
      return graded;
    });

    return {
      id: section.id,
      title: section.title,
      points: items.reduce(
        (sum, item) => sum + (item.correct ? item.question.points : 0),
        0,
      ),
      maxPoints: items.reduce((sum, item) => sum + item.question.points, 0),
      correct: items.filter((item) => item.correct).length,
      total: items.length,
      answered: items.filter((item) => !item.blank).length,
    };
  });

  const correctCount = perQuestion.filter((item) => item.correct).length;
  const blankCount = perQuestion.filter((item) => item.blank).length;

  return {
    points: perQuestion.reduce(
      (sum, item) => sum + (item.correct ? item.question.points : 0),
      0,
    ),
    maxPoints: TOTAL_POINTS,
    correctCount,
    wrongCount: perQuestion.length - correctCount - blankCount,
    blankCount,
    bySection,
    perQuestion,
  };
}

export function answeredCount(session: Session) {
  return Object.keys(session.answers).length;
}
