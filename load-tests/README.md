# Load Tests (JMeter)

- Alvo: `https://reqres.in/api/users`
- Carga: ~500 usuários simultâneos por 5 minutos
- Gera relatório HTML

## Rodar
```bash
jmeter -n -t jmeter-test-plan.jmx -l results.jtl -e -o report
# Abra report/index.html
```
Set-Location C:\Projetos\QA-Automation-Assessment\load-tests
@"
# Load Tests — JMeter

Este projeto executa testes de **carga** em uma **API pública** usando **Apache JMeter**, gera o **relatório HTML (Dashboard)** e documenta como analisar os resultados.

## 📌 Objetivos do desafio

**Tarefa 1 — Teste de carga básico**
- Simular **500 usuários simultâneos por 5 minutos**.
- Script com boas práticas: ramp-up, validações (assertions), cabeçalhos/token quando necessário.

**Tarefa 2 — Relatório + análise**
- Gerar o **HTML Dashboard** do JMeter.
- Apresentar **análise** do resultado (throughput, latências p50/p90/p95/p99, erros, threads ativas).

---

## 📁 Estrutura

load-tests/
├─ jmeter-test-plan.jmx # Plano JMeter (código do teste)
├─ rep/ # Relatórios HTML (uma pasta por execução)
├─ results-YYYYMMDD-HHmmss.jtl # Resultados (CSV) por execução
└─ jmeter-YYYYMMDD-HHmmss.log # Log da execução


> O “código” do teste é o **`.jmx`** (XML do JMeter). Abra no GUI (`File > Open`) para editar.

---

## 🧪 Como rodar (PowerShell – Windows)

> Requisitos: Java instalado (`java -version`) e JMeter via Chocolatey (caminho padrão abaixo).

```powershell
# 1) Aponta o JMeter (ajuste se a sua instalação for diferente)
$env:JMETER_HOME = "C:\ProgramData\chocolatey\lib\jmeter\tools\apache-jmeter-5.6.3"

# 2) Define nomes com timestamp e garante pasta nova para o relatório
$ts   = Get-Date -Format "yyyyMMdd-HHmmss"
$jtl  = ".\results-$ts.jtl"
$out  = ".\rep\report-$ts"
$log  = ".\jmeter-$ts.log"
New-Item -ItemType Directory -Force ".\rep" | Out-Null
Remove-Item -Recurse -Force $out -ErrorAction SilentlyContinue

# 3) Executa o plano e GERA o dashboard (500 usuários / 5 min)
& "$env:JMETER_HOME\bin\jmeter.bat" -Djava.awt.headless=true `
  -n -t ".\jmeter-test-plan.jmx" `
  -Jusers=500 -Jduration=300 -Jrampup=60 `
  -Jjmeter.save.saveservice.output_format=csv `
  -Jjmeter.save.saveservice.print_field_names=true `
  -Jjmeter.save.saveservice.default_delimiter=, `
  -Jjmeter.save.saveservice.timestamp_format=ms `
  -Jjmeter.save.saveservice.assertion_results=none `
  -Jjmeter.save.saveservice.label=true `
  -Jjmeter.save.saveservice.response_code=true `
  -Jjmeter.save.saveservice.response_message=true `
  -Jjmeter.save.saveservice.thread_name=true `
  -Jjmeter.save.saveservice.data_type=true `
  -Jjmeter.save.saveservice.successful=true `
  -Jjmeter.save.saveservice.failure_message=true `
  -Jjmeter.save.saveservice.bytes=true `
  -Jjmeter.save.saveservice.sent_bytes=true `
  -Jjmeter.save.saveservice.grp_threads=true `
  -Jjmeter.save.saveservice.all_threads=true `
  -Jjmeter.save.saveservice.url=true `
  -Jjmeter.save.saveservice.latency=true `
  -Jjmeter.save.saveservice.idle_time=true `
  -Jjmeter.save.saveservice.connect_time=true `
  -l $jtl -f -e -o $out -j $log

# 4) Abre o relatório
Start-Process "$out\index.html"
