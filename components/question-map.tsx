"use client";

import { cn } from "cn";
import { Flag } from "lucide-react";

import { SECTIONS, formatQuestionNumber } from "@/lib/exam-data";
import { getExamSet, questionsInSection } from "@/lib/exam-sets";
import type { Grade, Session } from "@/lib/session";

export function QuestionMap({
  session,
  grade,
  showResult,
  onNavigate,
  idPrefix = "q-nav-",
}: {
  session: Session;
  grade: Grade | null;
  showResult: boolean;
  onNavigate: (id: number) => void;
  idPrefix?: string;
}) {
  const set = getExamSet(session.setId);

  return (
    <div className="flex flex-col gap-4">
      {SECTIONS.map((section) => (
        <div key={section.id}>
          <p className="px-1 text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {section.title}
          </p>
          <div className="mt-1.5 grid grid-cols-4 gap-1.5">
            {questionsInSection(set, section.id).map((question) => {
              const chosen = session.answers[question.id];
              const flagged = session.flagged.includes(question.id);
              const current = session.currentId === question.id;
              const graded = grade?.perQuestion.find(
                (item) => item.question.id === question.id,
              );
              const revealed =
                showResult || session.revealed.includes(question.id);

              return (
                <button
                  key={question.id}
                  id={`${idPrefix}${question.id}`}
                  type="button"
                  aria-current={current ? "true" : undefined}
                  aria-label={`Questão ${formatQuestionNumber(question.id)}${
                    chosen ? `, resposta ${chosen}` : ", por responder"
                  }`}
                  onClick={() => onNavigate(question.id)}
                  className={cn(
                    "relative flex h-9 items-center justify-center rounded-md border text-sm tabular-nums transition-colors",
                    current
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-foreground/30",
                    !current && chosen && !revealed && "bg-secondary",
                    !current &&
                      revealed &&
                      graded?.correct &&
                      "border-correct/40 bg-correct/10 text-correct",
                    !current &&
                      revealed &&
                      graded &&
                      !graded.correct &&
                      "border-destructive/40 bg-destructive/10 text-destructive",
                  )}
                >
                  {formatQuestionNumber(question.id)}
                  {flagged ? (
                    <Flag
                      className={cn(
                        "absolute top-0.5 right-0.5 size-2.5",
                        current ? "text-primary-foreground" : "text-mark",
                      )}
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
