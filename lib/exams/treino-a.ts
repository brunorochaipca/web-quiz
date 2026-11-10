import { code, text, type Question } from "@/lib/exam-data";

// Treino A: 40 questões novas, 5 por bloco (4 + 4 + 8 + 8 + 12 pontos).
export const TREINO_A_QUESTIONS: Question[] = [
  // ---------- Variáveis e tipos de dados ----------
  {
    id: 1,
    sectionId: "variaveis",
    points: 4,
    prompt: "Qual dos seguintes nomes é um identificador válido para uma variável em Java?",
    options: [
      code("A", "2nota"),
      code("B", "nota-final"),
      code("C", "final"),
      code("D", "nota_final"),
    ],
    answer: "D",
    explanation:
      "nota_final usa só letras e _, e não começa por dígito. 2nota começa por um dígito, nota-final tem um hífen (que seria lido como subtração) e final é palavra reservada.",
  },
  {
    id: 2,
    sectionId: "variaveis",
    points: 4,
    prompt: "Que tipo de dados guarda apenas os valores true ou false?",
    options: [
      code("A", "boolean"),
      code("B", "String"),
      code("C", "int"),
      code("D", "double"),
    ],
    answer: "A",
    explanation:
      "boolean é o tipo lógico e só aceita true ou false. String guarda texto, int guarda inteiros e double guarda números reais.",
  },
  {
    id: 3,
    sectionId: "variaveis",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `int x = 5;
double y = x;
System.out.println(y);`,
    options: [
      text("A", "5"),
      text("B", "5.0"),
      text("C", "Ocorre um erro de compilação."),
      text("D", "0.0"),
    ],
    answer: "B",
    explanation:
      "Converter int para double é seguro, por isso o Java faz-o automaticamente. y passa a valer 5.0 e é isso que println escreve, com a parte decimal.",
  },
  {
    id: 4,
    sectionId: "variaveis",
    points: 8,
    prompt: "O que acontece ao compilar o seguinte excerto?",
    code: `double preco = 9.99;
int inteiro = preco;`,
    options: [
      text("A", "inteiro fica com o valor 9."),
      text("B", "inteiro fica com o valor 10."),
      text("C", "Erro de compilação: de double para int é preciso um cast."),
      text("D", "inteiro fica com o valor 9.99."),
    ],
    answer: "C",
    explanation:
      "Passar de double para int perde a parte decimal, por isso o Java não o faz sozinho e recusa compilar. Seria preciso um cast explícito, int inteiro = (int) preco;, que truncaria para 9.",
  },
  {
    id: 5,
    sectionId: "variaveis",
    points: 12,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int a = 10;
int b = 3;
double c = a / b;
System.out.println(c);`,
    options: [
      text("A", "3.3333333333333335"),
      text("B", "3.0"),
      text("C", "3"),
      text("D", "3.33"),
    ],
    answer: "B",
    explanation:
      "A divisão a / b é feita entre dois int, por isso dá 3 (inteira). Só depois esse 3 é convertido para double ao ser guardado em c, ficando 3.0. A conversão acontece tarde demais para recuperar a parte decimal.",
  },

  // ---------- Operações aritméticas ----------
  {
    id: 6,
    sectionId: "aritmetica",
    points: 4,
    prompt: "Qual é o valor da expressão `20 - 4 * 3`?",
    options: [
      text("A", "8"),
      text("B", "48"),
      text("C", "12"),
      text("D", "5"),
    ],
    answer: "A",
    explanation:
      "A multiplicação tem prioridade: 4 * 3 = 12 e depois 20 - 12 = 8. O valor 48 resultaria de (20 - 4) * 3, que exigiria parênteses.",
  },
  {
    id: 7,
    sectionId: "aritmetica",
    points: 4,
    prompt: "Qual é o resultado de `25 % 7`?",
    options: [
      text("A", "3"),
      text("B", "4"),
      text("C", "5"),
      text("D", "0"),
    ],
    answer: "B",
    explanation:
      "% devolve o resto da divisão inteira. 25 = 3 × 7 + 4, portanto o resto é 4. O valor 3 é o quociente.",
  },
  {
    id: 8,
    sectionId: "aritmetica",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int x = 9;
x += 3;
x *= 2;
System.out.println(x);`,
    options: [
      text("A", "21"),
      text("B", "18"),
      text("C", "24"),
      text("D", "15"),
    ],
    answer: "C",
    explanation:
      "As instruções correm por ordem. x += 3 faz x = 12 e depois x *= 2 faz x = 24. Não há prioridade entre as duas linhas: cada uma atua sobre o valor atual de x.",
  },
  {
    id: 9,
    sectionId: "aritmetica",
    points: 8,
    prompt: "Qual é o output do seguinte programa?",
    code: `int a = 5;
int b = ++a + a--;
System.out.println(a + " " + b);`,
    options: [
      text("A", "6 12"),
      text("B", "4 11"),
      text("C", "5 11"),
      text("D", "5 12"),
    ],
    answer: "D",
    explanation:
      "A expressão avalia-se da esquerda para a direita. ++a faz a = 6 e vale 6. Depois a-- vale 6 e só a seguir a desce para 5. Assim b = 6 + 6 = 12 e a termina com 5. A consola mostra 5 12.",
  },
  {
    id: 10,
    sectionId: "aritmetica",
    points: 12,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int a = 7, b = 2;
System.out.println(a / b + a % b + (double) a / b);`,
    options: [
      text("A", "7"),
      text("B", "6.5"),
      text("C", "7.5"),
      text("D", "8.0"),
    ],
    answer: "C",
    explanation:
      "Parcelas: a / b = 3 (divisão inteira), a % b = 1 e (double) a / b = 3.5, porque o cast converte a antes da divisão. Somando da esquerda para a direita: 3 + 1 = 4 e 4 + 3.5 = 7.5.",
  },

  // ---------- Input e output na consola ----------
  {
    id: 11,
    sectionId: "io",
    points: 4,
    prompt:
      "Qual é a diferença entre `System.out.print` e `System.out.println`?",
    options: [
      text("A", "print muda de linha no fim e println não."),
      text("B", "println muda de linha no fim e print não."),
      text("C", "print escreve no ecrã e println escreve num ficheiro."),
      text("D", "Não há nenhuma diferença."),
    ],
    answer: "B",
    explanation:
      "println escreve o texto e muda de linha. print escreve o texto e deixa o cursor na mesma linha. Ambos escrevem na consola.",
  },
  {
    id: 12,
    sectionId: "io",
    points: 4,
    prompt:
      "Assumindo que input é um objeto Scanner, qual das expressões lê um número real?",
    options: [
      code("A", "input.nextDouble()"),
      code("B", "input.nextReal()"),
      code("C", "input.nextFloatNumber()"),
      code("D", "input.readDouble()"),
    ],
    answer: "A",
    explanation:
      "nextDouble() lê o próximo token como double. nextReal(), nextFloatNumber() e readDouble() não existem na classe Scanner.",
  },
  {
    id: 13,
    sectionId: "io",
    points: 8,
    prompt:
      "O utilizador escreve Ana Silva e pressiona Enter. O que é apresentado?",
    code: `Scanner input = new Scanner(System.in);
String nome = input.next();
System.out.println(nome);`,
    options: [
      text("A", "Ana Silva"),
      text("B", "Silva"),
      text("C", "Ana"),
      text("D", "Não é apresentado nada."),
    ],
    answer: "C",
    explanation:
      "next() lê apenas uma palavra: pára no primeiro espaço. Fica Ana em nome e Silva fica por ler. Para ler a linha toda seria preciso nextLine().",
  },
  {
    id: 14,
    sectionId: "io",
    points: 8,
    prompt:
      "O utilizador escreve 3, Enter, 4, Enter. Qual é o output?",
    code: `Scanner input = new Scanner(System.in);
int a = input.nextInt();
int b = input.nextInt();
System.out.println(a + b + " = soma");`,
    options: [
      text("A", "34 = soma"),
      text("B", "soma = 7"),
      text("C", "7"),
      text("D", "7 = soma"),
    ],
    answer: "D",
    explanation:
      "A expressão avalia-se da esquerda para a direita. Primeiro a + b soma dois inteiros e dá 7. Só depois o 7 é concatenado com o texto \" = soma\". O resultado é 7 = soma.",
  },
  {
    id: 15,
    sectionId: "io",
    points: 12,
    prompt: "Quais são as duas linhas apresentadas, por ordem?",
    code: `System.out.println("1" + 2 + 3);
System.out.println(1 + 2 + "3");`,
    options: [
      text("A", "123 e depois 33"),
      text("B", "123 e depois 123"),
      text("C", "6 e depois 33"),
      text("D", "33 e depois 123"),
    ],
    answer: "A",
    explanation:
      "Na primeira linha, \"1\" é texto, por isso + concatena sempre: \"12\" e depois \"123\". Na segunda, 1 + 2 ainda são inteiros e somam 3; só então + 3 concatena com o texto \"3\", dando 33.",
  },

  // ---------- Condições if / else ----------
  {
    id: 16,
    sectionId: "condicoes",
    points: 4,
    prompt:
      "Qual é o operador de comparação que significa «diferente de» em Java?",
    options: [
      code("A", "<>"),
      code("B", "!="),
      code("C", "=!"),
      code("D", "!=="),
    ],
    answer: "B",
    explanation:
      "!= devolve true quando os dois valores são diferentes. <> existe noutras linguagens, =! não é um operador de comparação e !== não existe em Java.",
  },
  {
    id: 17,
    sectionId: "condicoes",
    points: 4,
    prompt: "O que faz o operador `!` numa condição?",
    options: [
      text("A", "Inverte o valor lógico da condição."),
      text("B", "Compara dois valores."),
      text("C", "Junta duas condições."),
      text("D", "Termina o programa."),
    ],
    answer: "A",
    explanation:
      "! é a negação: transforma true em false e false em true. Por exemplo, !(x > 5) é verdadeiro quando x não é maior que 5.",
  },
  {
    id: 18,
    sectionId: "condicoes",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `int idade = 17;
if (idade >= 18) {
    System.out.println("Maior");
}
System.out.println("Fim");`,
    options: [
      text("A", "Maior"),
      text("B", "Maior e Fim"),
      text("C", "Não é apresentado nada."),
      text("D", "Fim"),
    ],
    answer: "D",
    explanation:
      "17 >= 18 é falso, por isso o bloco do if não corre. A última linha está fora do if e executa sempre, por isso aparece Fim.",
  },
  {
    id: 19,
    sectionId: "condicoes",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `int a = 5, b = 8;
if (a > 3 || b < 5) {
    System.out.println("X");
}
if (a > 3 && b < 5) {
    System.out.println("Y");
}`,
    options: [
      text("A", "Y"),
      text("B", "X e Y"),
      text("C", "X"),
      text("D", "Não é apresentado nada."),
    ],
    answer: "C",
    explanation:
      "No primeiro if, a > 3 é verdadeiro e || só precisa de uma condição verdadeira, por isso imprime X. No segundo, && precisa das duas, mas b < 5 é falso, por isso Y não aparece.",
  },
  {
    id: 20,
    sectionId: "condicoes",
    points: 12,
    prompt:
      "Atenção à falta de chavetas. Qual é o output (tudo na mesma linha)?",
    code: `int n = 10;
if (n % 3 == 0)
    System.out.print("A");
    System.out.print("B");
if (n % 4 == 0)
    System.out.print("C");
else
    System.out.print("D");`,
    options: [
      text("A", "D"),
      text("B", "BD"),
      text("C", "ABD"),
      text("D", "O código não compila."),
    ],
    answer: "B",
    explanation:
      "Sem chavetas, o primeiro if controla só a instrução seguinte (o print de A). A identação engana: o print de B está fora do if e corre sempre. 10 % 3 é 1, por isso A não sai e B sai. No segundo if, 10 % 4 é 2, logo corre o else e sai D. Resultado: BD.",
  },

  // ---------- Seleção switch / case ----------
  {
    id: 21,
    sectionId: "switch",
    points: 4,
    prompt:
      "O que acontece num switch quando nenhum case corresponde e não existe default?",
    options: [
      text("A", "Ocorre um erro de execução."),
      text("B", "Executa-se o primeiro case."),
      text("C", "Não se executa nenhum bloco do switch."),
      text("D", "Executa-se o último case."),
    ],
    answer: "C",
    explanation:
      "O default é opcional. Se nada corresponder e ele não existir, o switch simplesmente termina sem executar nenhum case e o programa continua a seguir.",
  },
  {
    id: 22,
    sectionId: "switch",
    points: 4,
    prompt:
      "Qual dos seguintes tipos pode ser usado na expressão de um switch tradicional?",
    options: [
      code("A", "double"),
      code("B", "boolean"),
      code("C", "long"),
      code("D", "char"),
    ],
    answer: "D",
    explanation:
      "O switch tradicional aceita int, char, byte, short, String e enumerados. Não aceita boolean, long, float nem double.",
  },
  {
    id: 23,
    sectionId: "switch",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `char letra = 'b';
switch (letra) {
    case 'a':
        System.out.println("Um");
        break;
    case 'b':
        System.out.println("Dois");
        break;
    case 'c':
        System.out.println("Três");
}`,
    options: [
      text("A", "Um"),
      text("B", "Dois"),
      text("C", "Três"),
      text("D", "Dois e Três"),
    ],
    answer: "B",
    explanation:
      "letra vale 'b' e entra no case 'b', imprime Dois e o break termina o switch. O case 'c' não chega a ser executado.",
  },
  {
    id: 24,
    sectionId: "switch",
    points: 8,
    prompt: "Qual é o output (tudo na mesma linha)?",
    code: `int dia = 3;
switch (dia) {
    case 1:
        System.out.print("S");
    case 3:
        System.out.print("T");
    case 5:
        System.out.print("Q");
        break;
    default:
        System.out.print("X");
}`,
    options: [
      text("A", "T"),
      text("B", "TQX"),
      text("C", "STQ"),
      text("D", "TQ"),
    ],
    answer: "D",
    explanation:
      "dia vale 3, por isso a execução começa no case 3 e imprime T. Como esse case não tem break, continua no case 5 e imprime Q. O break pára antes do default. Saída: TQ.",
  },
  {
    id: 25,
    sectionId: "switch",
    points: 12,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int x = 2;
switch (x) {
    case 1:
        x += 10;
    case 2:
        x += 20;
    case 3:
        x += 30;
        break;
    case 4:
        x += 40;
}
System.out.println(x);`,
    options: [
      text("A", "52"),
      text("B", "22"),
      text("C", "32"),
      text("D", "92"),
    ],
    answer: "A",
    explanation:
      "Com x = 2, a execução entra no case 2 e faz x = 22. Sem break, cai no case 3 e faz x = 52. Aí o break termina o switch. O case 1 nunca corre e o case 4 também não.",
  },

  // ---------- Ciclo while ----------
  {
    id: 26,
    sectionId: "while",
    points: 4,
    prompt:
      "O que acontece se a condição de um while nunca se tornar falsa?",
    options: [
      text("A", "O programa não compila."),
      text("B", "O ciclo é infinito."),
      text("C", "O ciclo executa uma única vez."),
      text("D", "O ciclo é ignorado."),
    ],
    answer: "B",
    explanation:
      "O while repete enquanto a condição for verdadeira. Se ela nunca falhar, o ciclo nunca termina. O compilador não deteta isso: é um erro de lógica.",
  },
  {
    id: 27,
    sectionId: "while",
    points: 4,
    prompt:
      "A variável i começa em 0. Qual das instruções, colocada dentro do ciclo, evita que `while (i < 5)` seja infinito?",
    options: [
      code("A", "i--;"),
      code("B", "i = 0;"),
      code("C", "i++;"),
      code("D", "System.out.println(i);"),
    ],
    answer: "C",
    explanation:
      "i++ aproxima i de 5 a cada volta, por isso a condição acaba por falhar. i-- afasta-o, i = 0 repõe-no sempre a zero e println não altera o valor.",
  },
  {
    id: 28,
    sectionId: "while",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `int i = 10;
while (i < 5) {
    System.out.println(i);
    i++;
}
System.out.println("fim");`,
    options: [
      text("A", "10 e fim"),
      text("B", "O ciclo é infinito."),
      text("C", "Não é apresentado nada."),
      text("D", "fim"),
    ],
    answer: "D",
    explanation:
      "A condição 10 < 5 é falsa logo à partida, por isso o corpo do while não corre nenhuma vez. A instrução a seguir ao ciclo executa e imprime fim.",
  },
  {
    id: 29,
    sectionId: "while",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int n = 20;
int passos = 0;
while (n > 1) {
    n = n / 2;
    passos++;
}
System.out.println(passos);`,
    options: [
      text("A", "4"),
      text("B", "3"),
      text("C", "5"),
      text("D", "10"),
    ],
    answer: "A",
    explanation:
      "n vai valendo 20, 10, 5, 2 e 1 (as divisões são inteiras: 5 / 2 = 2). São quatro divisões até n deixar de ser maior que 1, por isso passos = 4.",
  },
  {
    id: 30,
    sectionId: "while",
    points: 12,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int a = 1;
int b = 1;
int cont = 0;
while (cont < 5) {
    int c = a + b;
    a = b;
    b = c;
    cont++;
}
System.out.println(b);`,
    options: [
      text("A", "8"),
      text("B", "21"),
      text("C", "13"),
      text("D", "5"),
    ],
    answer: "C",
    explanation:
      "Cada volta calcula a soma dos dois valores anteriores. Pares (a, b) no fim de cada volta: (1,2), (2,3), (3,5), (5,8), (8,13). Após as cinco voltas, b vale 13.",
  },

  // ---------- Ciclo do / while ----------
  {
    id: 31,
    sectionId: "dowhile",
    points: 4,
    prompt: "Em que momento é avaliada a condição de um do / while?",
    options: [
      text("A", "Antes de executar o corpo pela primeira vez."),
      text("B", "Só quando o corpo contém um break."),
      text("C", "Antes de cada execução do corpo."),
      text("D", "No fim de cada execução do corpo."),
    ],
    answer: "D",
    explanation:
      "No do / while o corpo corre primeiro e a condição é testada no fim de cada volta. É por isso que o corpo executa pelo menos uma vez.",
  },
  {
    id: 32,
    sectionId: "dowhile",
    points: 4,
    prompt: "Qual das seguintes formas de escrever um do / while está correta?",
    options: [
      code("A", "do { x++; } while (x < 5)"),
      code("B", "do { x++; } while (x < 5);"),
      code("C", "do while (x < 5) { x++; }"),
      code("D", "do (x < 5) { x++; }"),
    ],
    answer: "B",
    explanation:
      "A sintaxe é do { ... } while (condição); e termina com ponto e vírgula. A opção A não tem o ; final e as opções C e D misturam a ordem das partes.",
  },
  {
    id: 33,
    sectionId: "dowhile",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int n = 0;
do {
    n += 3;
} while (n < 10);
System.out.println(n);`,
    options: [
      text("A", "9"),
      text("B", "10"),
      text("C", "12"),
      text("D", "15"),
    ],
    answer: "C",
    explanation:
      "n vai valendo 3, 6, 9 e 12. Com n = 9, a condição 9 < 10 ainda é verdadeira e faz mais uma volta. Com n = 12, 12 < 10 é falso e o ciclo pára. Fica 12.",
  },
  {
    id: 34,
    sectionId: "dowhile",
    points: 8,
    prompt: "Qual é o output do código seguinte?",
    code: `int i = 10;
do {
    System.out.print(i + " ");
    i -= 4;
} while (i > 0);`,
    options: [
      text("A", "10 6 2"),
      text("B", "10 6 2 -2"),
      text("C", "10 6"),
      text("D", "10"),
    ],
    answer: "A",
    explanation:
      "Imprime 10 e i fica 6; imprime 6 e i fica 2; imprime 2 e i fica -2. Com i = -2, a condição i > 0 é falsa e o ciclo termina. O -2 nunca é impresso.",
  },
  {
    id: 35,
    sectionId: "dowhile",
    points: 12,
    prompt: "Qual é o output do código seguinte?",
    code: `int soma = 0;
int k = 1;
do {
    soma += k;
    k += 2;
} while (soma < 20);
System.out.println(soma + " " + k);`,
    options: [
      text("A", "25 11"),
      text("B", "25 9"),
      text("C", "16 9"),
      text("D", "20 11"),
    ],
    answer: "A",
    explanation:
      "Valores de (soma, k) no fim de cada volta: (1,3), (4,5), (9,7), (16,9), (25,11). Com soma = 16 a condição ainda é verdadeira e faz mais uma volta. Com soma = 25 pára. A consola mostra 25 11.",
  },

  // ---------- Ciclo for ----------
  {
    id: 36,
    sectionId: "for",
    points: 4,
    prompt:
      "Quais são as três partes, por ordem, que aparecem entre parênteses num ciclo for?",
    options: [
      text("A", "Condição; inicialização; atualização"),
      text("B", "Atualização; condição; inicialização"),
      text("C", "Inicialização; condição; atualização"),
      text("D", "Início; fim; nome"),
    ],
    answer: "C",
    explanation:
      "Num for escreve-se primeiro a inicialização (int i = 0), depois a condição de continuação (i < n) e por fim a atualização (i++), separadas por ponto e vírgula.",
  },
  {
    id: 37,
    sectionId: "for",
    points: 4,
    prompt: "Quantas vezes é executado o corpo deste ciclo?",
    code: `for (int i = 1; i <= 10; i += 3) {
    System.out.println(i);
}`,
    options: [
      text("A", "3 vezes"),
      text("B", "10 vezes"),
      text("C", "5 vezes"),
      text("D", "4 vezes"),
    ],
    answer: "D",
    explanation:
      "i toma os valores 1, 4, 7 e 10. Depois i passa a 13 e 13 <= 10 é falso. São 4 execuções, porque o passo é 3 e não 1.",
  },
  {
    id: 38,
    sectionId: "for",
    points: 8,
    prompt: "Qual é a sequência apresentada na consola?",
    code: `for (int i = 5; i > 0; i--) {
    System.out.print(i);
}`,
    options: [
      text("A", "54321"),
      text("B", "12345"),
      text("C", "5432"),
      text("D", "543210"),
    ],
    answer: "A",
    explanation:
      "i começa em 5 e desce de uma em uma unidade enquanto i > 0. São impressos 5, 4, 3, 2 e 1. O 0 já não entra, porque 0 > 0 é falso.",
  },
  {
    id: 39,
    sectionId: "for",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int total = 0;
for (int i = 1; i <= 6; i++) {
    if (i % 2 == 1) {
        total += i;
    }
}
System.out.println(total);`,
    options: [
      text("A", "21"),
      text("B", "12"),
      text("C", "9"),
      text("D", "6"),
    ],
    answer: "C",
    explanation:
      "O if só deixa acumular os números ímpares entre 1 e 6: 1 + 3 + 5 = 9. A soma de todos seria 21 e a dos pares (2 + 4 + 6) seria 12.",
  },
  {
    id: 40,
    sectionId: "for",
    points: 12,
    prompt: "O que apresenta o seguinte conjunto de ciclos?",
    code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println();
}`,
    options: [
      text("A", "Uma única linha com 6 asteriscos."),
      text("B", "Três linhas, cada uma com 3 asteriscos."),
      text("C", "Três linhas, com 3, 2 e 1 asteriscos."),
      text("D", "Três linhas, com 1, 2 e 3 asteriscos."),
    ],
    answer: "D",
    explanation:
      "O ciclo interior vai de 1 até i, por isso escreve i asteriscos em cada volta do exterior. O println() final muda de linha. Saem 1, 2 e 3 asteriscos em linhas sucessivas, formando um triângulo.",
  },
];
