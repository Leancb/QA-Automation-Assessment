# Load Tests (JMeter)

- Alvo: `https://reqres.in/api/users`
- Carga: ~500 usuários simultâneos por 5 minutos
- Gera relatório HTML

## Rodar
```bash
jmeter -n -t jmeter-test-plan.jmx -l results.jtl -e -o report
# Abra report/index.html
```
