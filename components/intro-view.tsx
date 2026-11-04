"use client";

import { useState, type ReactNode } from "react";
import { BookOpen, Clock3, PenLine } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { TOTAL_POINTS, TOTAL_QUESTIONS } from "@/lib/exam-data";
import {
  answeredCount,
  type PracticeMode,
  type Session,
} from "@/lib/session";

const LIMITS = [null, 45, 60, 90] as const;

export function IntroView({
  saved,
  onStart,
  onResume,
}: {
  saved: Session | null;
  onStart: (mode: PracticeMode, limitMinutes: number | null) => void;
  onResume: () => void;
}) {
  const [limit, setLimit] = useState<number | null>(null);
  const [pendingMode, setPendingMode] = useState<PracticeMode | null>(null);
  const savedAnswers = saved ? answeredCount(saved) : 0;

  function requestStart(mode: PracticeMode) {
    if (saved) {
      setPendingMode(mode);
      return;
    }
    onStart(mode, limit);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-3xl">
        <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Algoritmia e Programação · Java
        </p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.05] text-balance sm:text-6xl">
          Teste modelo teórico-prático
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-7 text-foreground/80">
          Trinta e uma questões de escolha múltipla para treinares antes do
          teste de 11 de novembro de 2026. Há uma única resposta correta em
          cada questão.
        </p>
      </header>

      <dl className="mt-8 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
        <Stat value={String(TOTAL_QUESTIONS)} label="questões" />
        <Stat value={String(TOTAL_POINTS)} label="pontos" />
        <Stat value="20" label="valores" />
      </dl>

      {saved ? (
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg">
              {saved.submittedAt
                ? "Tens um teste já corrigido neste browser."
                : "Tens um teste a meio."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {saved.submittedAt
                ? `Modo ${saved.mode}. A nota e as resoluções continuam guardadas.`
                : `${savedAnswers} de ${TOTAL_QUESTIONS} respostas no modo ${saved.mode}.`}
            </p>
          </div>
          <Button type="button" size="lg" className="h-10 px-4" onClick={onResume}>
            {saved.submittedAt ? "Ver a correção" : "Continuar"}
          </Button>
        </div>
      ) : null}

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <ModeCard
          icon={<PenLine className="size-4" />}
          title="Modo exame"
          body="Respondes às 31 questões sem veres a correção. No fim recebes a nota, a grelha e a resolução de cada pergunta."
          action="Começar em modo exame"
          onClick={() => requestStart("exame")}
        />
        <ModeCard
          icon={<BookOpen className="size-4" />}
          title="Modo estudo"
          body="Confirmas cada resposta e vês logo a explicação. A nota final conta a opção que confirmaste, por isso não dá para experimentar até acertar."
          action="Começar em modo estudo"
          onClick={() => requestStart("estudo")}
        />
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card/80 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock3 className="size-4 text-muted-foreground" />
          Tempo de prática
        </div>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          O modelo não indica duração. O cronómetro conta sempre o tempo
          decorrido. Podes acrescentar um limite só como referência: ao
          esgotar, o teste não é entregue sozinho.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LIMITS.map((minutes) => {
            const selected = limit === minutes;
            return (
              <Button
                key={minutes ?? "none"}
                type="button"
                variant={selected ? "default" : "outline"}
                aria-pressed={selected}
                onClick={() => setLimit(minutes)}
              >
                {minutes === null ? "Sem limite" : `${minutes} min`}
              </Button>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="font-heading text-2xl">Instruções</h2>
          <p className="mt-3 text-[15px] leading-7 text-foreground/85">
            Lê cada enunciado com atenção e seleciona apenas uma opção, A, B, C
            ou D. Assume que os fragmentos estão inseridos no método{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.92em]">
              main
            </code>{" "}
            de uma classe Java e que, sempre que necessário, foi declarado{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.92em]">
              import java.util.Scanner;
            </code>
            . Salvo indicação em contrário, os valores introduzidos na consola
            são válidos.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-border px-4 py-4">
          <h2 className="font-heading text-xl">Materiais de consulta</h2>
          <Separator className="my-3" />
          <ul className="space-y-2 text-sm leading-6 text-foreground/80">
            <li>Slides do docente</li>
            <li>Resoluções das fichas disponibilizadas pelo docente</li>
            <li>Material de suporte do estudante</li>
            <li>Resoluções das fichas realizadas pelo estudante</li>
          </ul>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            As respostas ficam só neste browser. Nada é enviado para um
            servidor.
          </p>
        </div>
      </section>

      <Dialog
        open={pendingMode !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingMode(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Substituir o teste guardado?</DialogTitle>
            <DialogDescription>
              {saved?.submittedAt
                ? "A nota que está neste browser deixa de estar disponível."
                : "As respostas deste teste a meio são apagadas."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setPendingMode(null)}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (pendingMode) {
                  onStart(pendingMode, limit);
                }
                setPendingMode(null);
              }}
            >
              Começar de novo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-3 py-3 sm:px-4">
      <dd className="font-heading text-3xl leading-none tabular-nums sm:text-4xl">
        {value}
      </dd>
      <dt className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
    </div>
  );
}

function ModeCard({
  icon,
  title,
  body,
  action,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_oklch(0.4_0.03_60/0.04),0_18px_40px_-28px_oklch(0.35_0.04_50/0.55)]">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="h-6 px-1.5">
          {icon}
        </Badge>
        <h2 className="font-heading text-2xl">{title}</h2>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-foreground/80">{body}</p>
      <Button type="button" className="mt-5 h-10" onClick={onClick}>
        {action}
      </Button>
    </article>
  );
}
