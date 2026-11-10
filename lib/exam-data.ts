export type Choice = "A" | "B" | "C" | "D";

export type Option = {
  letter: Choice;
  text: string;
  mono?: boolean;
};

export type Question = {
  id: number;
  sectionId: string;
  points: number;
  prompt: string;
  code?: string;
  options: Option[];
  answer: Choice;
  explanation: string;
};

export type Section = {
  id: string;
  title: string;
};

export const SECTIONS: Section[] = [
  { id: "variaveis", title: "Variáveis e tipos de dados" },
  { id: "aritmetica", title: "Operações aritméticas" },
  { id: "io", title: "Input e output na consola" },
  { id: "condicoes", title: "Condições if / else" },
  { id: "switch", title: "Seleção switch / case" },
  { id: "while", title: "Ciclo while" },
  { id: "dowhile", title: "Ciclo do / while" },
  { id: "for", title: "Ciclo for" },
];

/** Opção cujo texto é código (letra tipo monoespaçado). */
export const code = (letter: Choice, text: string): Option => ({
  letter,
  text,
  mono: true,
});

/** Opção cujo texto é prosa. */
export const text = (letter: Choice, label: string): Option => ({
  letter,
  text: label,
});

export function sectionById(id: string) {
  const section = SECTIONS.find((item) => item.id === id);
  if (!section) {
    throw new Error(`Secção ${id} inexistente.`);
  }
  return section;
}

export function formatQuestionNumber(id: number) {
  return String(id).padStart(2, "0");
}

/** Converte pontos para valores numa escala de 0 a 20. */
export function formatValores(points: number, maxPoints: number) {
  const valores = maxPoints > 0 ? (points / maxPoints) * 20 : 0;
  return valores.toLocaleString("pt-PT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}
