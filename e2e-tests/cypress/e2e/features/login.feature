Feature: Login e navegação

  Scenario: Login e acesso ao formulário de checkout step one
    Given que acesso a aplicação
    When eu faço login com credenciais válidas
    And eu navego até o formulário de checkout
    Then deve abrir a tela Checkout: Your Information
