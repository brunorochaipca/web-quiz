"use client";

import { useState } from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  formatDuration,
  formatQuestionNumber,
  formatValores,
} from "@/lib/exam-data";
import { gradeSession, type Grade, type Session } from "@/lib/session";

export function ResultsView({
  session,
  onReview,
  onRestart,
}: {
  session: Session;
  onReview: (questionId: number) => void;
  onRestart: () => void;
}) {
  const grade = gradeSession(session.answers);
  const [restartOpen, setRestartOpen] = useState(false);
  const [filter, setFilter] = useState<"todas" | "erradas" | "certas">("todas");
  const elapsed = (session.submittedAt ?? session.startedAt) - session.startedAt;
  const weakest = weakestSection(grade);
  const visible = grade.perQuestion.filter((item) => {
    if (filter === "erradas") {
      return !item.correct;
    }
    if (filter === "certas") {
      return item.correct;
    }
    return true;
  });
  const firstWrong =
    grade.perQuestion.find((item) => !item.correct)?.question.id ?? 1;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Correção · modo {session.mode}
      </p>
      <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-heading text-4xl leading-none sm:text-5xl">
            Nota do teste
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {plural(grade.correctCount, "certa", "certas")} ·{" "}
            {plural(grade.wrongCount, "errada", "erradas")}
            {grade.blankCount > 0
              ? ` · ${grade.blankCount} em branco`
              : ""}
            . Tempo {formatDuration(elapsed)}.
            {grade.correctCount === grade.perQuestion.length
              ? " Todos os blocos estão completos."
              : weakest
                ? ` Entre os blocos que respondeste, o mais fraco foi ${weakest.title}: ${weakest.points} de ${weakest.maxPoints} pontos.`
                : ""}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
          <p className="font-heading text-6xl leading-none tabular-nums">
            {formatValores(grade.points)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            valores · {grade.points} de {grade.maxPoints} pontos
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button type="button" onClick={() => onReview(firstWrong)}>
          {grade.correctCount === grade.perQuestion.length
            ? "Rever as questões"
            : "Rever as erradas"}
        </Button>
        <Button type="button" variant="outline" onClick={() => setRestartOpen(true)}>
          Novo teste
        </Button>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        {grade.bySection.map((section) => (
          <div
            key={section.id}
            className="rounded-xl border border-border bg-card px-4 py-3"
          >
            <Progress value={section.points} max={section.maxPoints}>
              <ProgressLabel className="text-sm">{section.title}</ProgressLabel>
              <ProgressValue>
                {() =>
                  `${section.correct}/${section.total} · ${section.points}/${section.maxPoints}`
                }
              </ProgressValue>
            </Progress>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl">Grelha de respostas</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A letra escolhida fica à esquerda. A correta aparece quando
              diferem.
            </p>
          </div>
          <div className="flex gap-2">
            {(
              [
                ["todas", "Todas"],
                ["erradas", "Erradas"],
                ["certas", "Certas"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                type="button"
                variant={filter === value ? "default" : "outline"}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <Separator className="my-4" />
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Não há questões nesta lista.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {visible.map((item) => (
              <li key={item.question.id}>
                <button
                  type="button"
                  onClick={() => onReview(item.question.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-foreground/25"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 font-heading text-lg tabular-nums">
                      {formatQuestionNumber(item.question.id)}
                    </span>
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-md text-sm",
                        item.correct
                          ? "bg-correct/10 text-correct"
                          : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {item.chosen ?? "—"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.correct
                        ? "Certa"
                        : item.blank
                          ? `Em branco · correta ${item.question.answer}`
                          : `Correta ${item.question.answer}`}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {item.correct ? item.question.points : 0}/{item.question.points}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Dialog open={restartOpen} onOpenChange={setRestartOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Começar um teste novo?</DialogTitle>
            <DialogDescription>
              A nota deste teste deixa de estar guardada neste browser.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRestartOpen(false)}
            >
              Ficar na correção
            </Button>
            <Button
              type="button"
              onClick={() => {
                setRestartOpen(false);
                onRestart();
              }}
            >
              Novo teste
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function weakestSection(grade: Grade) {
  return grade.bySection
    .filter((section) => section.answered > 0 && section.points < section.maxPoints)
    .sort((a, b) => a.points / a.maxPoints - b.points / b.maxPoints)[0];
}

function plural(count: number, singular: string, many: string) {
  return `${count} ${count === 1 ? singular : many}`;
}
