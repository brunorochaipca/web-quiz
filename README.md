# Teste modelo · Programação em Java

Prática do teste modelo teórico-prático de **Algoritmia e Programação**, mais dois conjuntos de treino com questões novas. Todas são de escolha múltipla, com uma única resposta correta, e a nota é sempre mostrada em pontos e em valores (escala de 0 a 20).

Conjuntos disponíveis:

- **Treino A** — 40 questões novas, 5 por bloco.
- **Treino B** — 40 questões novas, 5 por bloco, diferentes do Treino A.
- **Teste modelo** — as 31 questões originais, 200 pontos.

Há dois modos:

- **Exame** — respondes sem ver a correção. A nota, a grelha e as resoluções aparecem quando entregas.
- **Estudo** — confirmas cada resposta e vês logo a explicação. A nota conta a opção confirmada.

O progresso fica guardado neste browser. Nada é enviado para um servidor.

## Correr em qualquer computador

Precisas de [Git](https://git-scm.com/downloads) e de [Node.js 20.9 ou mais recente](https://nodejs.org/) (a versão 22 LTS serve). No Windows, o PowerShell chega; não é preciso WSL.

```bash
git clone https://github.com/brunorochaipca/web-quiz.git
cd web-quiz
npm install
npm run dev
```

O repositório é privado. No outro computador, o Git pede início de sessão na conta `brunorochaipca` antes de clonar.

Abre [http://localhost:3000](http://localhost:3000). Para parar o servidor, prime Ctrl+C.

Para deixar a página a servir a versão de produção, em vez do modo de desenvolvimento:

```bash
npm run build
npm start
```

`npm start` também usa o porto 3000. Noutro porto:

```bash
npm run dev -- --port 43123
```

No Windows, se `npm` não for reconhecido depois de instalares o Node.js, fecha e volta a abrir o terminal.

## O que está incluído

- Enunciados agrupados pelos mesmos blocos do teste modelo: variáveis, aritmética, consola, `if` / `else`, `switch`, `while`, `do` / `while` e `for`.
- Cronómetro e um limite opcional de 45, 60 ou 90 minutos. O limite não entrega o teste sozinho.
- Correção por questão, nota em pontos e em valores, e aproveitamento por bloco.
