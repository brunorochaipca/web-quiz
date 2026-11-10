import {
  SECTIONS,
  type Question,
} from "@/lib/exam-data";
import { MODELO_QUESTIONS } from "@/lib/exams/modelo";
import { TREINO_A_QUESTIONS } from "@/lib/exams/treino-a";
import { TREINO_B_QUESTIONS } from "@/lib/exams/treino-b";

export type ExamSet = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  totalPoints: number;
};

function makeSet(
  id: string,
  title: string,
  description: string,
  questions: Question[],
): ExamSet {
  assertIntegrity(id, questions);
  return {
    id,
    title,
    description,
    questions,
    totalPoints: questions.reduce((sum, question) => sum + question.points, 0),
  };
}

function assertIntegrity(setId: string, questions: Question[]) {
  questions.forEach((question, index) => {
    const where = `${setId}, questão ${index + 1}`;
    if (question.id !== index + 1) {
      throw new Error(`${where}: o id é ${question.id}, esperado ${index + 1}.`);
    }
    if (!SECTIONS.some((section) => section.id === question.sectionId)) {
      throw new Error(`${where}: secção desconhecida.`);
    }
    if (question.options.length !== 4) {
      throw new Error(`${where}: não tem 4 opções.`);
    }
    const letters = question.options.map((option) => option.letter).join("");
    if (letters !== "ABCD") {
      throw new Error(`${where}: as opções têm de ser A, B, C, D por ordem.`);
    }
    if (!question.options.some((option) => option.letter === question.answer)) {
      throw new Error(`${where}: a resposta aponta para uma opção inexistente.`);
    }
  });

  const sectionOrder = questions.map((question) =>
    SECTIONS.findIndex((section) => section.id === question.sectionId),
  );
  for (let i = 1; i < sectionOrder.length; i += 1) {
    if (sectionOrder[i] < sectionOrder[i - 1]) {
      throw new Error(`${setId}: as questões têm de seguir a ordem dos blocos.`);
    }
  }
}

export const EXAM_SETS: ExamSet[] = [
  makeSet(
    "treino-a",
    "Treino A",
    "Questões novas, sobre os mesmos blocos do teste modelo. Cinco por bloco, com a mesma mistura de teoria e rastreio de código.",
    TREINO_A_QUESTIONS,
  ),
  makeSet(
    "treino-b",
    "Treino B",
    "Outro conjunto de questões novas, diferente do Treino A e do teste modelo. Mais rastreio de código e armadilhas comuns.",
    TREINO_B_QUESTIONS,
  ),
  makeSet(
    "modelo",
    "Teste modelo",
    "O teste modelo teórico-prático original, com as 31 questões e a cotação oficial de 200 pontos.",
    MODELO_QUESTIONS,
  ),
];

export const DEFAULT_SET_ID = EXAM_SETS[0].id;

export function findExamSet(id: string) {
  return EXAM_SETS.find((set) => set.id === id) ?? null;
}

export function getExamSet(id: string) {
  const set = findExamSet(id);
  if (!set) {
    throw new Error(`Conjunto ${id} inexistente.`);
  }
  return set;
}

export function questionById(set: ExamSet, id: number) {
  const question = set.questions.find((item) => item.id === id);
  if (!question) {
    throw new Error(`Questão ${id} inexistente em ${set.id}.`);
  }
  return question;
}

export function questionsInSection(set: ExamSet, sectionId: string) {
  return set.questions.filter((question) => question.sectionId === sectionId);
}
