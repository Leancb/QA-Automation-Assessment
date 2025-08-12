Feature: Login e navegação
  Como um usuário do e-commerce de exemplo
  Eu quero fazer login e navegar até a página de produtos
  Para validar que o fluxo básico funciona

  Scenario: Login válido e visualização da lista de itens
    Given que eu abro a página inicial
    When eu faço login com credenciais válidas
    Then devo ver a página de produtos
