import { code, text, type Question } from "@/lib/exam-data";

export const MODELO_QUESTIONS: Question[] = [
  {
    id: 1,
    sectionId: "variaveis",
    points: 4,
    prompt: "Qual das seguintes declarações de uma variável é válida em Java?",
    options: [
      code("A", "int 1total = 10;"),
      code("B", "int total_1 = 10;"),
      code("C", "int total vendas = 10;"),
      code("D", "int class = 10;"),
    ],
    answer: "B",
    explanation:
      "Um identificador pode ter letras, dígitos, _ e $, mas não pode começar por dígito, conter espaços nem coincidir com uma palavra reservada. total_1 cumpre as regras. 1total começa por um dígito, total vendas tem um espaço e class é palavra reservada.",
  },
  {
    id: 2,
    sectionId: "variaveis",
    points: 4,
    prompt:
      "Qual é o tipo de dados mais adequado para guardar um número real com casas decimais?",
    options: [
      code("A", "boolean"),
      code("B", "int"),
      code("C", "double"),
      code("D", "char"),
    ],
    answer: "C",
    explanation:
      "double guarda números em vírgula flutuante, com parte decimal. int só representa inteiros, boolean é verdadeiro ou falso e char guarda um único carácter.",
  },
  {
    id: 3,
    sectionId: "variaveis",
    points: 8,
    prompt: "O que acontece ao compilar o seguinte excerto de código?",
    code: `int total;
System.out.println(total);`,
    options: [
      text("A", "É apresentado 0."),
      text("B", "É apresentado null."),
      text("C", "É apresentado um valor inteiro aleatório."),
      text(
        "D",
        "Ocorre um erro de compilação porque total não foi inicializada.",
      ),
    ],
    answer: "D",
    explanation:
      "Uma variável local não recebe valor por omissão. Lê-la antes de lhe atribuir um valor é um erro de compilação. Um campo de instância do tipo int seria inicializado a 0, mas total aqui é local.",
  },
  {
    id: 4,
    sectionId: "variaveis",
    points: 4,
    prompt:
      "Qual das instruções declara corretamente uma variável que guarda o texto Porto?",
    options: [
      code("A", 'String cidade = "Porto";'),
      code("B", 'char cidade = "Porto";'),
      code("C", 'int cidade = "Porto";'),
      code("D", "String cidade = Porto;"),
    ],
    answer: "A",
    explanation:
      "Texto com vários caracteres guarda-se numa String, entre aspas duplas. char usa aspas simples e um só carácter. Sem aspas, Porto seria lido como nome de outra variável.",
  },
  {
    id: 5,
    sectionId: "aritmetica",
    points: 4,
    prompt: "Qual é o valor da expressão 10 + 2 * 3 em Java?",
    options: [
      text("A", "36"),
      text("B", "16"),
      text("C", "30"),
      text("D", "26"),
    ],
    answer: "B",
    explanation:
      "A multiplicação tem prioridade sobre a adição. Primeiro calcula-se 2 * 3 = 6 e depois 10 + 6 = 16. Os parênteses é que forçariam (10 + 2) * 3.",
  },
  {
    id: 6,
    sectionId: "aritmetica",
    points: 8,
    prompt: "Qual é o valor apresentado na consola?",
    code: `int resultado = 17 / 5;
System.out.println(resultado);`,
    options: [
      text("A", "3.4"),
      text("B", "4"),
      text("C", "3"),
      text("D", "2"),
    ],
    answer: "C",
    explanation:
      "Quando os dois operandos são int, a divisão é inteira e a parte decimal desaparece. 17 / 5 dá 3, não 3.4. Para uma divisão real, pelo menos um operando teria de ser double, por exemplo 17 / 5.0.",
  },
  {
    id: 7,
    sectionId: "aritmetica",
    points: 4,
    prompt: "Qual é o resultado de 14 % 4?",
    options: [
      text("A", "3"),
      text("B", "4"),
      text("C", "0"),
      text("D", "2"),
    ],
    answer: "D",
    explanation:
      "O operador % devolve o resto da divisão inteira. 14 = 3 × 4 + 2, portanto o resto é 2.",
  },
  {
    id: 8,
    sectionId: "aritmetica",
    points: 8,
    prompt: "Qual é o output do seguinte programa?",
    code: `int a = 4;
int b = a++ * 2;
System.out.println(a + ":" + b);`,
    options: [
      text("A", "5:8"),
      text("B", "4:10"),
      text("C", "5:10"),
      text("D", "4:8"),
    ],
    answer: "A",
    explanation:
      "a++ é um pós-incremento: a expressão usa o valor atual, 4, e só depois a passa a 5. Assim b = 4 * 2 = 8. A consola mostra 5:8. Com ++a, b seria 10.",
  },
  {
    id: 9,
    sectionId: "aritmetica",
    points: 12,
    prompt: "Após a execução deste código, qual é a sequência apresentada?",
    code: `int a = 6, b = 4;
int resultado = (a++ + --b) * 2;
System.out.println(resultado + ":" + a + ":" + b);`,
    options: [
      text("A", "20:7:3"),
      text("B", "18:7:3"),
      text("C", "18:6:3"),
      text("D", "20:6:4"),
    ],
    answer: "B",
    explanation:
      "--b decrementa antes de usar o valor: b passa de 4 para 3. a++ usa 6 e só depois a fica 7. A conta é (6 + 3) * 2 = 18. A saída é 18:7:3.",
  },
  {
    id: 10,
    sectionId: "io",
    points: 4,
    prompt: "Qual das instruções apresenta Olá na consola e termina a linha?",
    options: [
      code("A", 'System.in.println("Olá");'),
      code("B", 'System.out.print("Olá");'),
      code("C", 'System.out.println("Olá");'),
      code("D", 'Scanner.println("Olá");'),
    ],
    answer: "C",
    explanation:
      "System.out.println escreve no output padrão e muda de linha. print não muda de linha. System.in é a entrada, e Scanner não tem um método estático println.",
  },
  {
    id: 11,
    sectionId: "io",
    points: 4,
    prompt:
      "Assumindo que input é um objeto Scanner, qual das expressões permite ler um inteiro?",
    options: [
      code("A", "input.readInt()"),
      code("B", "input.nextLine()"),
      code("C", "input.nextDouble()"),
      code("D", "input.nextInt()"),
    ],
    answer: "D",
    explanation:
      "Scanner.nextInt() lê o próximo token como int. nextLine() lê uma linha de texto e nextDouble() lê um número real. readInt() não é um método de Scanner.",
  },
  {
    id: 12,
    sectionId: "io",
    points: 8,
    prompt:
      "Se o utilizador escrever Rita e pressionar Enter, o que será apresentado?",
    code: `Scanner input = new Scanner(System.in);
String nome = input.nextLine();
System.out.println("Olá, " + nome);`,
    options: [
      text("A", "Rita"),
      text("B", "Olá, nome"),
      text("C", 'Olá, "Rita"'),
      text("D", "Olá, Rita"),
    ],
    answer: "D",
    explanation:
      "nextLine() lê a linha inteira, Rita, e guarda-a em nome. A concatenação produz o texto Olá, Rita. O nome da variável não é impresso, e as aspas do código não fazem parte do valor.",
  },
  {
    id: 13,
    sectionId: "io",
    points: 4,
    prompt: "Considera que o utilizador introduz o número 4. Qual é o output?",
    code: `Scanner input = new Scanner(System.in);
int valor = input.nextInt();
System.out.println("Total: " + valor + 3);`,
    options: [
      text("A", "Total: 43"),
      text("B", "Total: 7"),
      text("C", "7"),
      text("D", "O código não compila."),
    ],
    answer: "A",
    explanation:
      "Com uma String à esquerda, + concatena da esquerda para a direita. \"Total: \" + 4 produz \"Total: 4\" e depois junta-se o 3, ficando Total: 43. Para somar, os parênteses são obrigatórios: \"Total: \" + (valor + 3).",
  },
  {
    id: 14,
    sectionId: "condicoes",
    points: 4,
    prompt:
      "Qual das expressões é verdadeira quando idade é igual a 18 e também para valores superiores?",
    options: [
      code("A", "idade > 18"),
      code("B", "idade >= 18"),
      code("C", "idade == 19"),
      code("D", "idade < 18"),
    ],
    answer: "B",
    explanation:
      ">= é verdadeiro se o valor for maior ou igual a 18, incluindo o próprio 18. > 18 deixa o 18 de fora e == 19 só acerta num valor.",
  },
  {
    id: 15,
    sectionId: "condicoes",
    points: 8,
    prompt: "Qual é o output do seguinte excerto?",
    code: `int nota = 9;
if (nota >= 10) {
    System.out.println("Aprovado");
} else {
    System.out.println("Reprovado");
}`,
    options: [
      text("A", "Aprovado"),
      text("B", "Não é apresentado nada."),
      text("C", "Reprovado"),
      text("D", "Aprovado e Reprovado"),
    ],
    answer: "C",
    explanation:
      "A condição 9 >= 10 é falsa, por isso executa-se o ramo else e imprime-se Reprovado. Os dois ramos de um if / else são mutuamente exclusivos.",
  },
  {
    id: 16,
    sectionId: "condicoes",
    points: 4,
    prompt: "O que significa o operador lógico && numa condição?",
    options: [
      text("A", "As duas condições têm de ser verdadeiras."),
      text("B", "Basta que uma das condições seja verdadeira."),
      text("C", "As duas condições têm de ser falsas."),
      text("D", "Compara se dois valores são diferentes."),
    ],
    answer: "A",
    explanation:
      "&& é o E lógico: o resultado só é verdadeiro quando as duas condições o são. O OU é ||. Para diferença usa-se !=.",
  },
  {
    id: 17,
    sectionId: "condicoes",
    points: 8,
    prompt: "Que mensagem será apresentada na consola?",
    code: `int x = 7;
if (x % 2 == 0) {
    System.out.println("Par");
} else if (x > 5) {
    System.out.println("Maior que 5");
} else {
    System.out.println("Outro");
}`,
    options: [
      text("A", "Par"),
      text("B", "Outro"),
      text("C", "Par e Maior que 5"),
      text("D", "Maior que 5"),
    ],
    answer: "D",
    explanation:
      "7 % 2 == 0 é falso, porque 7 é ímpar. A condição seguinte, 7 > 5, é verdadeira, logo imprime-se Maior que 5. Numa cadeia if / else if só corre um ramo.",
  },
  {
    id: 18,
    sectionId: "condicoes",
    points: 12,
    prompt:
      "O código seguinte classifica o valor de uma variável. Qual é o resultado apresentado?",
    code: `int valor = 15;
if (valor > 15) {
    System.out.println("Intervalo A");
} else if (valor >= 10 && valor <= 15) {
    System.out.println("Intervalo B");
} else {
    System.out.println("Intervalo C");
}`,
    options: [
      text("A", "Intervalo A"),
      text("B", "Intervalo B"),
      text("C", "Intervalo C"),
      text("D", "O código não compila."),
    ],
    answer: "B",
    explanation:
      "15 > 15 é falso. A segunda condição, 15 >= 10 && 15 <= 15, é verdadeira, por isso imprime-se Intervalo B. O limite 15 pertence a este intervalo por causa do <=.",
  },
  {
    id: 19,
    sectionId: "switch",
    points: 4,
    prompt:
      "Qual é a principal finalidade da instrução break num case de um switch tradicional?",
    options: [
      text("A", "Voltar ao início do switch."),
      text("B", "Obrigar a executar o default."),
      text("C", "Terminar o switch e evitar a execução dos cases seguintes."),
      text("D", "Repetir o case atual."),
    ],
    answer: "C",
    explanation:
      "Num switch tradicional, a execução continua nos cases seguintes se não houver break. O break termina o switch e impede esse fall-through.",
  },
  {
    id: 20,
    sectionId: "switch",
    points: 8,
    prompt: "Qual é o output do seguinte código?",
    code: `int opcao = 2;
switch (opcao) {
    case 1:
        System.out.println("Criar");
        break;
    case 2:
        System.out.println("Editar");
        break;
    default:
        System.out.println("Inválida");
}`,
    options: [
      text("A", "Editar"),
      text("B", "Criar"),
      text("C", "Inválida"),
      text("D", "Criar e Editar"),
    ],
    answer: "A",
    explanation:
      "opcao vale 2, portanto entra no case 2, imprime Editar e o break impede que o default também corra.",
  },
  {
    id: 21,
    sectionId: "switch",
    points: 4,
    prompt: "Se opcao tiver o valor 4, qual será a saída do seguinte switch?",
    code: `int opcao = 4;
switch (opcao) {
    case 1:
        System.out.println("A");
        break;
    case 2:
        System.out.println("B");
        break;
    default:
        System.out.println("Inválida");
}`,
    options: [
      text("A", "A"),
      text("B", "Inválida"),
      text("C", "B"),
      text("D", "Não será apresentada nenhuma mensagem."),
    ],
    answer: "B",
    explanation:
      "Não existe case 4. Quando nenhum case corresponde, executa-se o default e imprime-se Inválida.",
  },
  {
    id: 22,
    sectionId: "switch",
    points: 8,
    prompt:
      "Considera um switch sem break no primeiro case. Qual é o output?",
    code: `int opcao = 1;
switch (opcao) {
    case 1:
        System.out.print("A");
    case 2:
        System.out.print("B");
        break;
    default:
        System.out.print("C");
}`,
    options: [
      text("A", "A"),
      text("B", "B"),
      text("C", "ABC"),
      text("D", "AB"),
    ],
    answer: "D",
    explanation:
      "O case 1 não tem break, por isso a execução cai no case 2: imprime A e depois B. O break desse case impede o default. A saída é AB.",
  },
  {
    id: 23,
    sectionId: "while",
    points: 4,
    prompt: "Qual é a afirmação correta sobre o ciclo while?",
    options: [
      text(
        "A",
        "Pode não executar nenhuma vez se a condição começar por ser falsa.",
      ),
      text("B", "Executa sempre pelo menos uma vez."),
      text("C", "Não permite atualizar variáveis."),
      text("D", "Repete um número de vezes fixo definido pela linguagem."),
    ],
    answer: "A",
    explanation:
      "O while testa a condição antes do corpo. Se ela começar falsa, o corpo não chega a correr. O ciclo que garante pelo menos uma execução é o do / while.",
  },
  {
    id: 24,
    sectionId: "while",
    points: 8,
    prompt: "Qual é a sequência apresentada pelo seguinte código?",
    code: `int n = 1;
while (n <= 4) {
    System.out.print(n);
    n += 2;
}`,
    options: [
      text("A", "1234"),
      text("B", "13"),
      text("C", "135"),
      text("D", "24"),
    ],
    answer: "B",
    explanation:
      "n começa em 1. Enquanto n <= 4, imprime n e soma 2. Primeiro imprime 1 e n fica 3; depois imprime 3 e n fica 5. 5 <= 4 é falso e o ciclo pára. A saída é 13. O 5 já não é impresso.",
  },
  {
    id: 25,
    sectionId: "while",
    points: 12,
    prompt: "O programa seguinte calcula uma soma. Que valor será apresentado?",
    code: `int n = 1, soma = 0;
while (n <= 10) {
    if (n % 2 == 0) {
        soma += n;
    }
    n++;
}
System.out.println(soma);`,
    options: [
      text("A", "55"),
      text("B", "25"),
      text("C", "30"),
      text("D", "20"),
    ],
    answer: "C",
    explanation:
      "O ciclo percorre 1 a 10 e só acumula os pares: 2 + 4 + 6 + 8 + 10 = 30. A soma de todos os inteiros seria 55 e a dos ímpares seria 25.",
  },
  {
    id: 26,
    sectionId: "dowhile",
    points: 4,
    prompt: "Qual é a principal diferença entre do / while e while?",
    options: [
      text("A", "do / while verifica a condição antes de executar o corpo."),
      text("B", "do / while executa o corpo pelo menos uma vez."),
      text("C", "do / while só pode ser utilizado com números inteiros."),
      text("D", "do / while não permite usar condições booleanas."),
    ],
    answer: "B",
    explanation:
      "do / while executa o corpo e só depois testa a condição, portanto corre pelo menos uma vez. O while testa primeiro e pode não executar.",
  },
  {
    id: 27,
    sectionId: "dowhile",
    points: 8,
    prompt: "Qual é o output do código seguinte?",
    code: `int n = 5;
do {
    System.out.print(n);
    n--;
} while (n > 5);`,
    options: [
      text("A", "5"),
      text("B", "54"),
      text("C", "Não é apresentado nada."),
      text("D", "É um ciclo infinito."),
    ],
    answer: "A",
    explanation:
      "O corpo corre antes do teste: imprime 5 e n passa a 4. A condição 4 > 5 é falsa, logo o ciclo termina. A saída é apenas 5.",
  },
  {
    id: 28,
    sectionId: "for",
    points: 4,
    prompt: "Quantas vezes é executado o corpo deste ciclo?",
    code: `for (int i = 0; i < 3; i++) {
    System.out.println(i);
}`,
    options: [
      text("A", "2 vezes"),
      text("B", "4 vezes"),
      text("C", "3 vezes"),
      text("D", "0 vezes"),
    ],
    answer: "C",
    explanation:
      "i toma os valores 0, 1 e 2. Quando i chega a 3, a condição i < 3 falha e o corpo não volta a correr. São 3 execuções.",
  },
  {
    id: 29,
    sectionId: "for",
    points: 8,
    prompt: "Qual é a sequência apresentada na consola?",
    code: `for (int i = 0; i < 4; i++) {
    System.out.print(i);
}`,
    options: [
      text("A", "1234"),
      text("B", "01234"),
      text("C", "3210"),
      text("D", "0123"),
    ],
    answer: "D",
    explanation:
      "i começa em 0 e o ciclo continua enquanto i < 4. São impressos 0, 1, 2 e 3. O 4 não entra porque a condição já é falsa.",
  },
  {
    id: 30,
    sectionId: "for",
    points: 8,
    prompt: "Qual será o valor apresentado?",
    code: `int soma = 0;
for (int i = 1; i <= 5; i++) {
    soma += i;
}
System.out.println(soma);`,
    options: [
      text("A", "15"),
      text("B", "10"),
      text("C", "20"),
      text("D", "5"),
    ],
    answer: "A",
    explanation:
      "soma acumula i de 1 até 5, inclusive: 1 + 2 + 3 + 4 + 5 = 15.",
  },
  {
    id: 31,
    sectionId: "for",
    points: 8,
    prompt: "Qual é o output do seguinte conjunto de ciclos?",
    code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        System.out.print(i);
    }
}`,
    options: [
      text("A", "123123"),
      text("B", "112233"),
      text("C", "121212"),
      text("D", "111222"),
    ],
    answer: "B",
    explanation:
      "Para cada valor de i entre 1 e 3, o ciclo interior corre duas vezes e imprime i. A saída é 11, depois 22, depois 33: 112233.",
  },
];
