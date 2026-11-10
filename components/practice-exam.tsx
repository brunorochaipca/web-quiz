"use client";

import { useState } from "react";

import { ExamView } from "@/components/exam-view";
import { IntroView } from "@/components/intro-view";
import { ResultsView } from "@/components/results-view";
import type { Choice } from "@/lib/exam-data";
import type { PracticeMode, Session } from "@/lib/session";
import {
  setStoredSession,
  useHasMounted,
  useStoredSession,
} from "@/lib/session-store";

export function PracticeExam() {
  const mounted = useHasMounted();
  const session = useStoredSession();
  const [entered, setEntered] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  function start(
    setId: string,
    mode: PracticeMode,
    limitMinutes: number | null,
  ) {
    setReviewing(false);
    setEntered(true);
    setStoredSession({
      setId,
      mode,
      answers: {},
      flagged: [],
      revealed: [],
      currentId: 1,
      startedAt: Date.now(),
      submittedAt: null,
      limitMinutes,
    });
  }

  function update(recipe: (current: Session) => Session) {
    if (!session) {
      return;
    }
    setStoredSession(recipe(session));
  }

  if (!mounted) {
    return (
      <div className="grid min-h-dvh place-items-center px-6">
        <p className="font-heading text-2xl text-muted-foreground">
          A abrir o caderno de exame…
        </p>
      </div>
    );
  }

  if (!entered || !session) {
    return (
      <IntroView
        saved={session}
        onStart={start}
        onResume={() => setEntered(true)}
      />
    );
  }

  if (session.submittedAt && !reviewing) {
    return (
      <ResultsView
        session={session}
        onReview={(questionId) => {
          update((current) => ({ ...current, currentId: questionId }));
          setReviewing(true);
        }}
        onRestart={() => {
          setReviewing(false);
          setEntered(false);
          setStoredSession(null);
        }}
      />
    );
  }

  return (
    <ExamView
      session={session}
      review={Boolean(session.submittedAt)}
      onAnswer={(id, choice: Choice) => {
        update((current) => {
          if (current.submittedAt || current.revealed.includes(id)) {
            return current;
          }
          return {
            ...current,
            answers: { ...current.answers, [id]: choice },
          };
        });
      }}
      onToggleFlag={(id) => {
        update((current) => ({
          ...current,
          flagged: current.flagged.includes(id)
            ? current.flagged.filter((item) => item !== id)
            : [...current.flagged, id],
        }));
      }}
      onNavigate={(id) => {
        update((current) => ({ ...current, currentId: id }));
      }}
      onConfirmStudy={(id) => {
        update((current) => {
          if (current.mode !== "estudo" || !current.answers[id]) {
            return current;
          }
          if (current.revealed.includes(id)) {
            return current;
          }
          return { ...current, revealed: [...current.revealed, id] };
        });
      }}
      onSubmit={() => {
        update((current) => ({
          ...current,
          submittedAt: Date.now(),
        }));
        setReviewing(false);
      }}
      onAbandon={() => {
        setReviewing(false);
        setEntered(false);
        setStoredSession(null);
      }}
      onBackToResults={() => setReviewing(false)}
    />
  );
}
