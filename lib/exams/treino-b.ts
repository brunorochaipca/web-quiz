import { code, text, type Question } from "@/lib/exam-data";

// Treino B: 40 questões novas, 5 por bloco (4 + 4 + 8 + 8 + 12 pontos).
export const TREINO_B_QUESTIONS: Question[] = [
  // ---------- Variáveis e tipos de dados ----------
  {
    id: 1,
    sectionId: "variaveis",
    points: 4,
    prompt: "Qual das declarações inicializa corretamente uma variável do tipo char?",
    options: [
      code("A", 'char letra = "A";'),
      code("B", "char letra = 'A';"),
      code("C", "char letra = AB;"),
      code("D", "char letra = 'AB';"),
    ],
    answer: "B",
    explanation:
      "Um char guarda um único carácter entre aspas simples. Aspas duplas criam uma String, AB sem aspas seria lido como um nome de variável e 'AB' tem dois caracteres.",
  },
  {
    id: 2,
    sectionId: "variaveis",
    points: 4,
    prompt:
      "Qual é o tipo de dados mais adequado para guardar o número de alunos de uma turma?",
    options: [
      code("A", "String"),
      code("B", "boolean"),
      code("C", "int"),
      code("D", "double"),
    ],
    answer: "C",
    explanation:
      "Uma contagem de alunos é um número inteiro, por isso int é o tipo natural. double permitiria casas decimais sem necessidade, boolean só guarda verdadeiro ou falso e String guarda texto.",
  },
  {
    id: 3,
    sectionId: "variaveis",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `String a = "Java";
String b = a + 8;
System.out.println(b);`,
    options: [
      text("A", "Java 8"),
      text("B", "8Java"),
      text("C", "Ocorre um erro de compilação."),
      text("D", "Java8"),
    ],
    answer: "D",
    explanation:
      "Quando um dos lados do + é String, o outro é convertido para texto e os dois são concatenados, sem espaço. O resultado é Java8.",
  },
  {
    id: 4,
    sectionId: "variaveis",
    points: 8,
    prompt: "O que acontece ao compilar o seguinte excerto?",
    code: `final int LIMITE = 10;
LIMITE = 20;
System.out.println(LIMITE);`,
    options: [
      text("A", "Erro de compilação, porque LIMITE foi declarada como final."),
      text("B", "É apresentado 10."),
      text("C", "É apresentado 20."),
      text("D", "O erro só aparece quando o programa é executado."),
    ],
    answer: "A",
    explanation:
      "Uma variável final só pode receber valor uma vez. Atribuir 20 a LIMITE depois de a inicializar com 10 é rejeitado pelo compilador, antes de o programa correr.",
  },
  {
    id: 5,
    sectionId: "variaveis",
    points: 12,
    prompt: "Qual é o output do seguinte programa?",
    code: `int a = 3, b = 7, aux;
aux = a;
a = b;
b = aux;
a = a + b;
System.out.println(a + ":" + b);`,
    options: [
      text("A", "7:3"),
      text("B", "10:3"),
      text("C", "10:7"),
      text("D", "3:10"),
    ],
    answer: "B",
    explanation:
      "As três primeiras instruções trocam os valores: a fica 7 e b fica 3. Depois a = a + b faz a = 10, e b continua 3. A consola mostra 10:3.",
  },

  // ---------- Operações aritméticas ----------
  {
    id: 6,
    sectionId: "aritmetica",
    points: 4,
    prompt: "Qual é o valor da expressão `(8 + 2) * 3 - 4`?",
    options: [
      text("A", "14"),
      text("B", "34"),
      text("C", "18"),
      text("D", "26"),
    ],
    answer: "D",
    explanation:
      "Primeiro o parêntesis: 8 + 2 = 10. Depois 10 * 3 = 30 e por fim 30 - 4 = 26.",
  },
  {
    id: 7,
    sectionId: "aritmetica",
    points: 4,
    prompt: "Qual é o valor da expressão `7 / 2.0`?",
    options: [
      text("A", "3"),
      text("B", "3.5"),
      text("C", "4"),
      text("D", "3.0"),
    ],
    answer: "B",
    explanation:
      "Basta um dos operandos ser double para a divisão ser real. 7 / 2.0 dá 3.5. Com dois int, 7 / 2 daria 3.",
  },
  {
    id: 8,
    sectionId: "aritmetica",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int a = 15;
a %= 4;
a++;
System.out.println(a);`,
    options: [
      text("A", "3"),
      text("B", "5"),
      text("C", "4"),
      text("D", "0"),
    ],
    answer: "C",
    explanation:
      "a %= 4 equivale a a = a % 4, ou seja, 15 % 4 = 3. Depois a++ soma 1 e a fica 4.",
  },
  {
    id: 9,
    sectionId: "aritmetica",
    points: 8,
    prompt: "Qual é o output do seguinte programa?",
    code: `int i = 3;
int j = i-- - --i;
System.out.println(i + " " + j);`,
    options: [
      text("A", "1 2"),
      text("B", "2 2"),
      text("C", "1 3"),
      text("D", "2 1"),
    ],
    answer: "A",
    explanation:
      "i-- vale 3 e depois i passa a 2. Em seguida --i desce i para 1 e vale 1. Assim j = 3 - 1 = 2 e i termina com 1. A consola mostra 1 2.",
  },
  {
    id: 10,
    sectionId: "aritmetica",
    points: 12,
    prompt: "Qual é o valor de x apresentado na consola?",
    code: `int x = 5;
x = x++ + ++x;
System.out.println(x);`,
    options: [
      text("A", "10"),
      text("B", "11"),
      text("C", "12"),
      text("D", "13"),
    ],
    answer: "C",
    explanation:
      "Da esquerda para a direita: x++ vale 5 e x passa a 6; depois ++x faz x = 7 e vale 7. A soma é 5 + 7 = 12 e é esse valor que é atribuído a x no fim, sobrepondo-se aos incrementos.",
  },

  // ---------- Input e output na consola ----------
  {
    id: 11,
    sectionId: "io",
    points: 4,
    prompt: "Qual é a linha que permite usar a classe Scanner num programa?",
    options: [
      code("A", "include java.util.Scanner;"),
      code("B", "import java.util.Scanner;"),
      code("C", "using java.util.Scanner;"),
      code("D", "import Scanner.java;"),
    ],
    answer: "B",
    explanation:
      "A classe Scanner está no pacote java.util e importa-se com import java.util.Scanner;. As outras opções não são sintaxe válida de importação em Java.",
  },
  {
    id: 12,
    sectionId: "io",
    points: 4,
    prompt: "Qual das instruções cria um Scanner que lê do teclado?",
    options: [
      code("A", "Scanner input = new Scanner(System.out);"),
      code("B", "Scanner input = Scanner(System.in);"),
      code("C", "Scanner input = new Scanner(System.in);"),
      code("D", "Scanner input = new System.in();"),
    ],
    answer: "C",
    explanation:
      "É preciso o operador new e passar System.in, a entrada padrão, ao construtor. System.out é a saída e, sem new, Scanner(System.in) não cria o objeto.",
  },
  {
    id: 13,
    sectionId: "io",
    points: 8,
    prompt:
      "O utilizador escreve 10, Enter, 4, Enter. O que é apresentado na consola?",
    code: `Scanner input = new Scanner(System.in);
int a = input.nextInt();
int b = input.nextInt();
System.out.println(a / b);`,
    options: [
      text("A", "2.5"),
      text("B", "3"),
      text("C", "2.0"),
      text("D", "2"),
    ],
    answer: "D",
    explanation:
      "a e b são int, por isso a divisão é inteira: 10 / 4 dá 2 e a parte decimal desaparece. Nunca aparece 2.5 sem que um dos operandos seja double.",
  },
  {
    id: 14,
    sectionId: "io",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `System.out.print("A");
System.out.println("B");
System.out.print("C");
System.out.println("D");`,
    options: [
      text("A", "AB numa linha e CD na linha seguinte."),
      text("B", "ABCD, tudo na mesma linha."),
      text("C", "A, B, C e D, cada letra numa linha."),
      text("D", "Apenas BD."),
    ],
    answer: "A",
    explanation:
      "print deixa o cursor na mesma linha e println muda de linha depois de escrever. Assim A e B ficam juntos e a linha acaba. Depois C e D ficam juntos na linha seguinte.",
  },
  {
    id: 15,
    sectionId: "io",
    points: 12,
    prompt:
      "O utilizador escreve 5, Enter, 3, Enter. Qual é o output?",
    code: `Scanner input = new Scanner(System.in);
int base = input.nextInt();
int altura = input.nextInt();
double area = base * altura / 2;
System.out.println("Area: " + area);`,
    options: [
      text("A", "Area: 7.0"),
      text("B", "Area: 7.5"),
      text("C", "Area: 7"),
      text("D", "Area: 15.0"),
    ],
    answer: "A",
    explanation:
      "base * altura / 2 só envolve int: 5 * 3 = 15 e 15 / 2 = 7 (divisão inteira). Só depois o 7 é convertido para double ao ser guardado em area, ficando 7.0. Para obter 7.5 seria preciso dividir por 2.0.",
  },

  // ---------- Condições if / else ----------
  {
    id: 16,
    sectionId: "condicoes",
    points: 4,
    prompt: "Qual é o resultado da expressão `5 > 3 && 2 > 4`?",
    options: [
      text("A", "5"),
      text("B", "true"),
      text("C", "Erro de compilação."),
      text("D", "false"),
    ],
    answer: "D",
    explanation:
      "5 > 3 é verdadeiro, mas 2 > 4 é falso. O operador && só dá verdadeiro se as duas condições o forem, por isso o resultado é false.",
  },
  {
    id: 17,
    sectionId: "condicoes",
    points: 4,
    prompt: "Qual das condições verifica se n é um número par?",
    options: [
      code("A", "n / 2 == 0"),
      code("B", "n % 2 == 1"),
      code("C", "n % 2 == 0"),
      code("D", "n % 2 = 0"),
    ],
    answer: "C",
    explanation:
      "Um número é par quando o resto da divisão por 2 é 0. n % 2 == 1 testa os ímpares positivos, n / 2 == 0 só é verdadeiro para 0 e 1, e n % 2 = 0 usa = (atribuição) em vez de ==.",
  },
  {
    id: 18,
    sectionId: "condicoes",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `int a = 6, b = 6;
if (a > b) {
    System.out.println("A");
} else if (a == b) {
    System.out.println("B");
} else {
    System.out.println("C");
}`,
    options: [
      text("A", "A"),
      text("B", "C"),
      text("C", "Não é apresentado nada."),
      text("D", "B"),
    ],
    answer: "D",
    explanation:
      "6 > 6 é falso, por isso o primeiro ramo é ignorado. A condição seguinte, 6 == 6, é verdadeira e imprime B. O else final não chega a ser avaliado.",
  },
  {
    id: 19,
    sectionId: "condicoes",
    points: 8,
    prompt: "Qual é o valor de x apresentado na consola?",
    code: `int x = 10;
if (x > 5) {
    x = x - 6;
}
if (x < 5) {
    x = x * 2;
}
System.out.println(x);`,
    options: [
      text("A", "4"),
      text("B", "8"),
      text("C", "10"),
      text("D", "14"),
    ],
    answer: "B",
    explanation:
      "Os dois if são independentes (não há else). O primeiro faz x = 10 - 6 = 4. O segundo avalia x já com o valor 4: 4 < 5 é verdadeiro e x passa a 8.",
  },
  {
    id: 20,
    sectionId: "condicoes",
    points: 12,
    prompt: "O que é apresentado na consola?",
    code: `int a = 8, b = 3, c = 5;
if (a > b && b > c) {
    System.out.println("1");
} else if (!(a > b) || b > c) {
    System.out.println("2");
} else if (a == b + c) {
    System.out.println("3");
} else {
    System.out.println("4");
}`,
    options: [
      text("A", "1"),
      text("B", "2"),
      text("C", "3"),
      text("D", "4"),
    ],
    answer: "C",
    explanation:
      "Primeira condição: 8 > 3 é verdadeiro mas 3 > 5 é falso, logo falha. Segunda: !(8 > 3) é falso e 3 > 5 é falso, e falso || falso é falso. Terceira: b + c = 8, portanto a == b + c é verdadeiro e imprime 3.",
  },

  // ---------- Seleção switch / case ----------
  {
    id: 21,
    sectionId: "switch",
    points: 4,
    prompt:
      "Qual é a palavra reservada que marca o ramo executado quando nenhum case corresponde?",
    options: [
      code("A", "default"),
      code("B", "else"),
      code("C", "otherwise"),
      code("D", "final"),
    ],
    answer: "A",
    explanation:
      "default é o ramo por omissão do switch. else pertence ao if, otherwise não existe em Java e final tem outro significado.",
  },
  {
    id: 22,
    sectionId: "switch",
    points: 4,
    prompt:
      "Qual das seguintes linhas é um cabeçalho válido de um switch tradicional?",
    options: [
      code("A", "switch (x > 5)"),
      code("B", "switch opcao"),
      code("C", "switch (x, y)"),
      code("D", "switch (opcao)"),
    ],
    answer: "D",
    explanation:
      "O switch recebe uma única expressão entre parênteses, e do tipo permitido (int, char, String…). x > 5 é boolean, opcao sem parênteses é sintaxe inválida e (x, y) tem duas expressões.",
  },
  {
    id: 23,
    sectionId: "switch",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `int mes = 2;
switch (mes) {
    case 12:
    case 1:
    case 2:
        System.out.println("Inverno");
        break;
    case 6:
    case 7:
        System.out.println("Verão");
        break;
    default:
        System.out.println("Outro");
}`,
    options: [
      text("A", "Outro"),
      text("B", "Verão"),
      text("C", "Inverno"),
      text("D", "Inverno e Verão"),
    ],
    answer: "C",
    explanation:
      "Vários case seguidos sem instruções partilham o mesmo bloco. mes vale 2, entra no case 2, que não tem código próprio e cai até ao println de Inverno. O break termina o switch.",
  },
  {
    id: 24,
    sectionId: "switch",
    points: 8,
    prompt: "Qual é o output (tudo na mesma linha)?",
    code: `String cor = "verde";
switch (cor) {
    case "vermelho":
        System.out.print("Pare");
        break;
    case "verde":
        System.out.print("Siga");
    default:
        System.out.print("!");
}`,
    options: [
      text("A", "Siga!"),
      text("B", "Siga"),
      text("C", "!"),
      text("D", "Pare!"),
    ],
    answer: "A",
    explanation:
      "cor vale \"verde\", por isso entra nesse case e imprime Siga. Como falta o break, a execução continua no default e imprime !. O resultado é Siga!.",
  },
  {
    id: 25,
    sectionId: "switch",
    points: 12,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int total = 0;
for (int i = 1; i <= 4; i++) {
    switch (i) {
        case 1:
            total += 1;
        case 2:
            total += 2;
            break;
        case 3:
            total += 3;
        default:
            total += 10;
    }
}
System.out.println(total);`,
    options: [
      text("A", "18"),
      text("B", "28"),
      text("C", "38"),
      text("D", "24"),
    ],
    answer: "B",
    explanation:
      "i = 1: soma 1 e, sem break, soma 2 (total 3), e o break pára. i = 2: soma 2 (total 5). i = 3: soma 3 e cai no default, que soma 10 (total 18). i = 4: não há case 4, executa o default e soma 10 (total 28).",
  },

  // ---------- Ciclo while ----------
  {
    id: 26,
    sectionId: "while",
    points: 4,
    prompt: "Sabendo que x vale 0, qual dos seguintes ciclos nunca termina?",
    options: [
      code("A", "while (x < 0) { }"),
      code("B", "while (x > 0) { }"),
      code("C", "while () { }"),
      code("D", "while (true) { }"),
    ],
    answer: "D",
    explanation:
      "while (true) tem uma condição sempre verdadeira, por isso repete para sempre. As duas primeiras são falsas à partida e o corpo nunca corre, e while () nem compila porque não tem condição.",
  },
  {
    id: 27,
    sectionId: "while",
    points: 4,
    prompt: "O que faz a instrução break dentro de um ciclo while?",
    options: [
      text("A", "Salta para a iteração seguinte."),
      text("B", "Reinicia o ciclo do princípio."),
      text("C", "Termina imediatamente o ciclo."),
      text("D", "Termina o programa."),
    ],
    answer: "C",
    explanation:
      "break sai do ciclo mais interior em que está e o programa continua na instrução a seguir. Saltar para a iteração seguinte é o que faz continue.",
  },
  {
    id: 28,
    sectionId: "while",
    points: 8,
    prompt: "O que é apresentado na consola?",
    code: `int n = 3;
while (n > 0) {
    System.out.print(n + " ");
    n--;
}
System.out.print("Fogo!");`,
    options: [
      text("A", "3 2 1 0 Fogo!"),
      text("B", "3 2 1 Fogo!"),
      text("C", "2 1 0 Fogo!"),
      text("D", "Fogo!"),
    ],
    answer: "B",
    explanation:
      "O corpo corre com n = 3, 2 e 1, e escreve cada valor seguido de espaço. Quando n chega a 0, 0 > 0 é falso e o ciclo pára antes de o escrever. Depois imprime Fogo!.",
  },
  {
    id: 29,
    sectionId: "while",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int i = 1;
int produto = 1;
while (i <= 5) {
    produto *= i;
    i++;
}
System.out.println(produto);`,
    options: [
      text("A", "15"),
      text("B", "24"),
      text("C", "720"),
      text("D", "120"),
    ],
    answer: "D",
    explanation:
      "O ciclo multiplica produto por i = 1, 2, 3, 4 e 5: 1 × 2 × 3 × 4 × 5 = 120. A soma desses números seria 15, e 24 seria o produto até 4.",
  },
  {
    id: 30,
    sectionId: "while",
    points: 12,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int num = 1234;
int soma = 0;
while (num > 0) {
    soma += num % 10;
    num /= 10;
}
System.out.println(soma);`,
    options: [
      text("A", "10"),
      text("B", "4"),
      text("C", "1234"),
      text("D", "24"),
    ],
    answer: "A",
    explanation:
      "num % 10 dá o último algarismo e num /= 10 remove-o. As voltas somam 4, 3, 2 e 1, e depois num chega a 0. A soma dos algarismos é 10. O valor 4 é o número de algarismos e 24 o seu produto.",
  },

  // ---------- Ciclo do / while ----------
  {
    id: 31,
    sectionId: "dowhile",
    points: 4,
    prompt:
      "Qual é o número mínimo de vezes que o corpo de um do / while é executado?",
    options: [
      text("A", "0"),
      text("B", "Depende da condição."),
      text("C", "1"),
      text("D", "2"),
    ],
    answer: "C",
    explanation:
      "A condição só é testada depois de o corpo correr. Por isso o corpo executa sempre pelo menos uma vez, mesmo que a condição seja falsa desde o início.",
  },
  {
    id: 32,
    sectionId: "dowhile",
    points: 4,
    prompt:
      "Sabendo que x vale 0, qual dos seguintes ciclos executa x++ pelo menos uma vez?",
    options: [
      code("A", "do { x++; } while (x < 0);"),
      code("B", "while (x < 0) { x++; }"),
      code("C", "for (; x < 0; ) { x++; }"),
      code("D", "if (x < 0) { x++; }"),
    ],
    answer: "A",
    explanation:
      "Só o do / while corre o corpo antes de testar a condição. Nas outras três opções, x < 0 é falso logo à partida e x++ nunca executa.",
  },
  {
    id: 33,
    sectionId: "dowhile",
    points: 8,
    prompt: "Qual é o output do código seguinte?",
    code: `int x = 100;
do {
    x = x / 10;
    System.out.print(x + " ");
} while (x > 1);`,
    options: [
      text("A", "10"),
      text("B", "100 10 1"),
      text("C", "10 1 0"),
      text("D", "10 1"),
    ],
    answer: "D",
    explanation:
      "Na primeira volta x = 10 e imprime 10. Como 10 > 1, faz outra volta: x = 1 e imprime 1. Agora 1 > 1 é falso e o ciclo termina. A saída é 10 1.",
  },
  {
    id: 34,
    sectionId: "dowhile",
    points: 8,
    prompt: "Qual é o output do código seguinte?",
    code: `int tentativas = 0;
int valor = 7;
do {
    valor -= 2;
    tentativas++;
} while (valor > 0);
System.out.println(tentativas + " " + valor);`,
    options: [
      text("A", "3 1"),
      text("B", "4 -1"),
      text("C", "4 1"),
      text("D", "3 -1"),
    ],
    answer: "B",
    explanation:
      "valor vai de 7 para 5, 3, 1 e -1, e tentativas conta 1, 2, 3 e 4. Com valor = 1 a condição ainda é verdadeira e faz mais uma volta. Com -1 pára. A consola mostra 4 -1.",
  },
  {
    id: 35,
    sectionId: "dowhile",
    points: 12,
    prompt: "Qual é o output do código seguinte?",
    code: `int a = 0, b = 10;
do {
    a += 2;
    b -= 1;
} while (a < b);
System.out.println(a + " " + b);`,
    options: [
      text("A", "6 7"),
      text("B", "8 7"),
      text("C", "8 6"),
      text("D", "7 6"),
    ],
    answer: "C",
    explanation:
      "Valores de (a, b) no fim de cada volta: (2,9), (4,8), (6,7), (8,6). Com (6,7), 6 < 7 ainda é verdadeiro e faz mais uma volta. Com (8,6), 8 < 6 é falso e pára. A saída é 8 6.",
  },

  // ---------- Ciclo for ----------
  {
    id: 36,
    sectionId: "for",
    points: 4,
    prompt:
      "Em `for (int i = 0; i < 5; i++)`, qual é o último valor de i dentro do corpo do ciclo?",
    options: [
      text("A", "4"),
      text("B", "5"),
      text("C", "6"),
      text("D", "0"),
    ],
    answer: "A",
    explanation:
      "O corpo corre com i = 0, 1, 2, 3 e 4. Quando i passa a 5, a condição i < 5 falha e o corpo já não executa. O valor 5 existe, mas só depois de o ciclo terminar.",
  },
  {
    id: 37,
    sectionId: "for",
    points: 4,
    prompt:
      "Qual das atualizações faz a variável i decrescer de 2 em 2 num ciclo for?",
    options: [
      code("A", "i--"),
      code("B", "i =- 2"),
      code("C", "i - 2"),
      code("D", "i -= 2"),
    ],
    answer: "D",
    explanation:
      "i -= 2 equivale a i = i - 2. i-- só desce 1, i =- 2 atribui o valor -2 a i e i - 2 calcula um valor mas não o guarda em lado nenhum.",
  },
  {
    id: 38,
    sectionId: "for",
    points: 8,
    prompt: "Qual é a sequência apresentada na consola?",
    code: `for (int i = 2; i <= 10; i += 4) {
    System.out.print(i + ";");
}`,
    options: [
      text("A", "2;6;"),
      text("B", "2;6;10;"),
      text("C", "2;4;6;8;10;"),
      text("D", "6;10;"),
    ],
    answer: "B",
    explanation:
      "i começa em 2 e avança de 4 em 4: 2, 6 e 10. Como 10 <= 10 é verdadeiro, o 10 também é impresso. Depois i vale 14 e o ciclo termina.",
  },
  {
    id: 39,
    sectionId: "for",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int s = 0;
for (int i = 1; i <= 4; i++) {
    s += i * i;
}
System.out.println(s);`,
    options: [
      text("A", "10"),
      text("B", "30"),
      text("C", "20"),
      text("D", "100"),
    ],
    answer: "B",
    explanation:
      "O ciclo soma os quadrados de 1 a 4: 1 + 4 + 9 + 16 = 30. O valor 10 seria a soma simples dos números e 100 o quadrado dessa soma.",
  },
  {
    id: 40,
    sectionId: "for",
    points: 12,
    prompt: "Qual é o output do seguinte conjunto de ciclos (tudo na mesma linha)?",
    code: `for (int i = 1; i <= 3; i++) {
    for (int j = i; j <= 3; j++) {
        System.out.print(i * j + " ");
    }
}`,
    options: [
      text("A", "1 2 3 4 6 9"),
      text("B", "1 2 3 2 4 6 3 6 9"),
      text("C", "1 4 9"),
      text("D", "1 2 3 4 6"),
    ],
    answer: "A",
    explanation:
      "O ciclo interior começa em j = i. Com i = 1, j vai de 1 a 3 e dá 1 2 3. Com i = 2, j vai de 2 a 3 e dá 4 6. Com i = 3, só j = 3 e dá 9. Saída: 1 2 3 4 6 9.",
  },
];
