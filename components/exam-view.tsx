"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, Flag, List } from "lucide-react";
import { cn } from "cn";

import { JavaCode, RichText } from "@/components/java-code";
import { QuestionMap } from "@/components/question-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  formatDuration,
  formatQuestionNumber,
  questionById,
  sectionById,
  TOTAL_QUESTIONS,
  type Choice,
} from "@/lib/exam-data";
import { answeredCount, gradeSession, type Session } from "@/lib/session";

export function ExamView({
  session,
  review,
  onAnswer,
  onToggleFlag,
  onNavigate,
  onConfirmStudy,
  onSubmit,
  onAbandon,
  onBackToResults,
}: {
  session: Session;
  review: boolean;
  onAnswer: (id: number, choice: Choice) => void;
  onToggleFlag: (id: number) => void;
  onNavigate: (id: number) => void;
  onConfirmStudy: (id: number) => void;
  onSubmit: () => void;
  onAbandon: () => void;
  onBackToResults: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());
  const [mapOpen, setMapOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [abandonOpen, setAbandonOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const question = questionById(session.currentId);
  const section = sectionById(question.sectionId);
  const chosen = session.answers[question.id] ?? null;
  const revealed =
    review ||
    (session.mode === "estudo" && session.revealed.includes(question.id));
  const locked = review || revealed;
  const mapGrade =
    review || session.mode === "estudo" ? gradeSession(session.answers) : null;
  const isCorrect = chosen === question.answer;
  const answered = answeredCount(session);
  const blank = TOTAL_QUESTIONS - answered;
  const flagged = session.flagged.includes(question.id);
  const elapsedEnd = session.submittedAt ?? now;
  const elapsed = elapsedEnd - session.startedAt;
  const limitMs = session.limitMinutes ? session.limitMinutes * 60 * 1000 : null;
  const overTime = limitMs !== null && elapsed >= limitMs;

  useEffect(() => {
    if (session.submittedAt) {
      return;
    }
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [session.submittedAt]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    document
      .getElementById(`q-nav-${session.currentId}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [session.currentId]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target instanceof HTMLElement ? event.target : null;
      const inOptions = target?.closest("[data-slot='radio-group']");
      if (
        target &&
        !inOptions &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button, a"))
      ) {
        return;
      }
      const key = event.key.toUpperCase();
      if (!locked && (key === "A" || key === "B" || key === "C" || key === "D")) {
        onAnswer(question.id, key);
      }
      if (
        event.key === "Enter" &&
        session.mode === "estudo" &&
        !review &&
        !revealed &&
        chosen
      ) {
        onConfirmStudy(question.id);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chosen, locked, onAnswer, onConfirmStudy, question.id, revealed, review, session.mode]);

  function go(offset: number) {
    const next = question.id + offset;
    if (next >= 1 && next <= TOTAL_QUESTIONS) {
      onNavigate(next);
    }
  }

  return (
    <div className="flex h-dvh min-h-0 flex-col">
      <header className="border-b border-border bg-card/80 px-3 py-3 backdrop-blur-sm sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Algoritmia e Programação
            </p>
            <p className="truncate font-heading text-lg leading-tight sm:text-xl">
              {review ? "Revisão" : "Teste modelo"}
              <span className="text-muted-foreground">
                {" "}
                · modo {session.mode}
              </span>
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1 text-right">
            <p className="text-sm tabular-nums">
              {answered} de {TOTAL_QUESTIONS}
            </p>
            <p
              className={cn(
                "flex items-center gap-1 text-xs tabular-nums text-muted-foreground",
                overTime && "text-destructive",
              )}
            >
              <Clock3 className="size-3.5" />
              {formatDuration(elapsed)}
              {session.limitMinutes ? ` / ${session.limitMinutes} min` : ""}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="lg:hidden"
            onClick={() => setMapOpen(true)}
          >
            <List />
            Questões
          </Button>
          {review ? (
            <Button type="button" variant="outline" onClick={onBackToResults}>
              Voltar à nota
            </Button>
          ) : (
            <>
              <Button type="button" onClick={() => setSubmitOpen(true)}>
                Entregar teste
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setAbandonOpen(true)}
              >
                Abandonar
              </Button>
            </>
          )}
        </div>
        {overTime && !review ? (
          <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            O tempo que definiste terminou. Podes entregar ou continuar a
            responder.
          </p>
        ) : null}
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden h-full min-h-0 w-72 shrink-0 border-r border-border bg-card/50 lg:block">
          <ScrollArea className="h-full">
            <div className="p-4">
              <QuestionMap
                session={session}
                grade={mapGrade}
                showResult={review}
                onNavigate={onNavigate}
              />
            </div>
          </ScrollArea>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div
            ref={mainRef}
            className="min-h-0 flex-1 overflow-y-auto"
          >
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-8">
            <article className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_oklch(0.4_0.03_60/0.04),0_22px_44px_-28px_oklch(0.35_0.04_50/0.55)]">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-spine" />
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-5xl leading-none tabular-nums">
                      {formatQuestionNumber(question.id)}
                    </p>
                    <p className="mt-2 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                      {section.title}
                    </p>
                  </div>
                  <Badge variant="outline" className="h-6">
                    {question.points} pontos
                  </Badge>
                </div>

                <h2 className="mt-5 text-lg leading-7 text-pretty">
                  <RichText text={question.prompt} />
                </h2>

                {question.code ? (
                  <div className="mt-4">
                    <JavaCode code={question.code} />
                  </div>
                ) : null}

                <RadioGroup
                  key={question.id}
                  value={chosen}
                  disabled={locked}
                  onValueChange={(value: Choice) => {
                    if (!locked) {
                      onAnswer(question.id, value);
                    }
                  }}
                  aria-label={`Opções da questão ${question.id}`}
                  className="mt-5 gap-2.5"
                >
                  {question.options.map((option) => {
                    const selected = chosen === option.letter;
                    const isAnswer = option.letter === question.answer;
                    return (
                      <label
                        key={option.letter}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition-colors",
                          locked && "cursor-default",
                          !revealed &&
                            selected &&
                            "border-primary bg-primary/5",
                          !revealed &&
                            !selected &&
                            "border-border hover:border-foreground/25",
                          revealed &&
                            isAnswer &&
                            "border-correct/50 bg-correct/10",
                          revealed &&
                            selected &&
                            !isAnswer &&
                            "border-destructive/50 bg-destructive/10",
                          revealed &&
                            !selected &&
                            !isAnswer &&
                            "border-border opacity-70",
                        )}
                      >
                        <RadioGroupItem
                          value={option.letter}
                          className="mt-1"
                          aria-label={`Opção ${option.letter}`}
                        />
                        <span
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-md border font-heading text-sm",
                            !revealed &&
                              selected &&
                              "border-primary bg-primary text-primary-foreground",
                            !revealed && !selected && "border-border bg-background",
                            revealed &&
                              isAnswer &&
                              "border-correct bg-correct text-correct-foreground",
                            revealed &&
                              selected &&
                              !isAnswer &&
                              "border-destructive bg-destructive text-white",
                          )}
                        >
                          {option.letter}
                        </span>
                        <span
                          className={cn(
                            "pt-0.5 text-[15px] leading-6",
                            option.mono && "font-mono text-[13.5px] leading-6",
                          )}
                        >
                          {option.text}
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>

                {revealed ? (
                  <div
                    className={cn(
                      "mt-5 rounded-xl border px-4 py-3",
                      chosen === null
                        ? "border-border bg-muted/60"
                        : isCorrect
                          ? "border-correct/30 bg-correct/10"
                          : "border-destructive/30 bg-destructive/10",
                    )}
                  >
                    <p
                      className={cn(
                        "font-heading text-base italic",
                        chosen !== null && isCorrect && "text-correct",
                        chosen !== null && !isCorrect && "text-destructive",
                      )}
                    >
                      {chosen === null
                        ? `Em branco · resposta ${question.answer}`
                        : isCorrect
                          ? `Certa · opção ${question.answer}`
                          : `Errada · escolheste ${chosen}, a resposta é ${question.answer}`}
                    </p>
                    <p className="mt-1 text-sm leading-6">{question.explanation}</p>
                  </div>
                ) : null}
              </div>
            </article>
            <p className="pb-2 text-xs leading-5 text-muted-foreground">
              Fragmentos no método main. Assume{" "}
              <span className="font-mono">import java.util.Scanner;</span>{" "}
              quando for preciso. As teclas A a D escolhem a opção.
            </p>
          </div>
          </div>

          <div className="border-t border-border bg-card/95 px-4 py-3 backdrop-blur-sm sm:px-6">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => go(-1)}
                  disabled={question.id === 1}
                >
                  <ChevronLeft />
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => go(1)}
                  disabled={question.id === TOTAL_QUESTIONS}
                >
                  Seguinte
                  <ChevronRight />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {!review ? (
                  <Button
                    type="button"
                    variant={flagged ? "secondary" : "ghost"}
                    onClick={() => onToggleFlag(question.id)}
                    aria-pressed={flagged}
                  >
                    <Flag />
                    {flagged ? "Marcada" : "Marcar para rever"}
                  </Button>
                ) : null}
                {!review && session.mode === "estudo" && !revealed ? (
                  <Button
                    type="button"
                    disabled={!chosen}
                    onClick={() => onConfirmStudy(question.id)}
                  >
                    Confirmar resposta
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-hidden sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Grelha de respostas</DialogTitle>
            <DialogDescription>
              {answered} de {TOTAL_QUESTIONS} questões com resposta.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <QuestionMap
              session={session}
              grade={mapGrade}
              showResult={review}
              idPrefix="q-dialog-"
              onNavigate={(id) => {
                onNavigate(id);
                setMapOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Entregar o teste?</DialogTitle>
            <DialogDescription>
              {blank > 0
                ? `Ficam ${blank} ${blank === 1 ? "questão" : "questões"} por responder. Em branco contam zero pontos.`
                : "As 31 questões têm resposta. A correção fica disponível a seguir."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSubmitOpen(false)}
            >
              Continuar a responder
            </Button>
            <Button
              type="button"
              onClick={() => {
                setSubmitOpen(false);
                onSubmit();
              }}
            >
              Entregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={abandonOpen} onOpenChange={setAbandonOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Abandonar este teste?</DialogTitle>
            <DialogDescription>
              As respostas guardadas neste browser são apagadas. Podes começar
              outro teste de seguida.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAbandonOpen(false)}
            >
              Voltar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setAbandonOpen(false);
                onAbandon();
              }}
            >
              Abandonar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
