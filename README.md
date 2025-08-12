# QA Automation Assessment – Monorepo

Este repositório contém **quatro** partes do teste prático:

1) **Testes de Carga – JMeter** (`load-tests/`)
2) **Testes de API – Cypress** (`api-tests/`)
3) **Testes E2E – Cypress + Cucumber** (`e2e-tests/`)
4) **Testes Mobile – WebdriverIO + Appium (Fake Driver)** (`mobile-tests/`)

Além disso, há um pipeline de **CI com GitHub Actions** em `.github/workflows/ci.yml` que executa:
- API (Cypress)
- E2E (Cypress + Cucumber)
- Mobile (WDIO + Appium Fake Driver – sem necessidade de emulador real)
- Carga (JMeter, com relatório HTML)

> Observação: os testes usam APIs públicas (ex.: `reqres.in`) e o **Appium Fake Driver** para viabilizar a execução em CI sem dispositivo/emulador.

---

## Estrutura de Pastas

```
.
├── api-tests
│   ├── cypress
│   │   ├── e2e
│   │   │   └── api.spec.cy.js
│   │   └── support
│   │       └── e2e.js
│   ├── cypress.config.js
│   ├── package.json
│   └── README.md
├── e2e-tests
│   ├── cypress
│   │   ├── e2e
│   │   │   ├── features
│   │   │   │   └── login.feature
│   │   │   └── step_definitions
│   │   │       └── login.steps.js
│   │   └── support
│   │       └── e2e.js
│   ├── cypress.config.js
│   ├── package.json
│   └── README.md
├── load-tests
│   ├── jmeter-test-plan.jmx
│   └── README.md
├── mobile-tests
│   ├── package.json
│   ├── wdio.conf.js
│   └── test
│       └── specs
│           └── login.e2e.js
└── .github
    └── workflows
        └── ci.yml
```

---

## Requisitos Locais

- Node.js 18+ (recomendado 20)
- Java 11+ (para JMeter e Appium)
- JMeter 5.6+ (opcional localmente, o CI instala via apt)

## Como Executar Localmente

### 1) Testes de API (Cypress)
```bash
cd api-tests
npm ci
npx cypress run
# Relatórios (mochawesome) em cypress/reports
```

### 2) Testes E2E (Cypress + Cucumber)
```bash
cd e2e-tests
npm ci
npx cypress run
# Relatórios (mochawesome) em cypress/reports
```

### 3) Testes Mobile (WebdriverIO + Appium Fake Driver)
Sem emulador/dispositivo. O teste usa o **Appium Fake Driver**.

```bash
cd mobile-tests
npm ci
# inicia o Appium com o plugin fake em background
npx appium driver install fake
npx appium server --log-level info &
# executa os testes
npx wdio run wdio.conf.js
# Relatórios JUnit em ./reports
```

### 4) Testes de Carga (JMeter)
Necessário ter o JMeter instalado localmente (ou use o CI).

```bash
cd load-tests
jmeter -n -t jmeter-test-plan.jmx -l results.jtl -e -o report
# O relatório HTML será gerado em ./report/index.html
```

---

## CI/CD – GitHub Actions

O workflow roda em cada `push` e `pull_request`, gerando artefatos de relatório para cada job:
- **api_tests**: Cypress API com Mochawesome
- **e2e_tests**: Cypress + Cucumber com Mochawesome
- **mobile_tests**: WDIO + Appium Fake Driver com JUnit
- **load_tests**: JMeter com relatório HTML

Para habilitar no seu GitHub:
1. Faça upload deste projeto para um repositório.
2. Verifique se o Actions está habilitado.
3. O pipeline executará automaticamente a cada commit.

---

## Versões Utilizadas

- Cypress 13
- @badeball/cypress-cucumber-preprocessor 20
- Mochawesome 7
- WebdriverIO 9
- Appium 2 + appium-fake-driver
- JMeter 5.6 (em CI)
- Node 20 (CI)
- Java 17 (CI)

---

## Dependências e Instalação

Cada subprojeto possui seu próprio `package.json` e README com instruções.

---

## Relatórios

- **Cypress**: Mochawesome (HTML) em `cypress/reports` (API e E2E)
- **WDIO**: JUnit em `mobile-tests/reports`
- **JMeter**: HTML em `load-tests/report`
