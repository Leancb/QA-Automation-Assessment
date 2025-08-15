Feature: Fluxo de compra - carrinho

  Background:
    Given que estou logado na aplicação

  Scenario: Adicionar, remover e finalizar compra verificando preço do produto
    When eu procuro o produto "Sauce Labs Backpack"
    And eu guardo o valor do produto "Sauce Labs Backpack"
    And eu clico no botão Add to cart do produto "Sauce Labs Backpack"
    And eu procuro o produto "Sauce Labs Bike Light"
    And eu clico no botão Add to cart do produto "Sauce Labs Bike Light"
    And eu localizo novamente o produto "Sauce Labs Backpack"
    And eu clico no botão Remover do produto "Sauce Labs Backpack"
    And eu clico no botão Add to cart do produto "Sauce Labs Backpack" novamente
    And eu clico no carrinho de compras
    And eu clico no botão checkout
    And eu preencho o campo First Name com "Leandro"
    And eu preencho o campo Last Name com "Brum"
    And eu preencho o campo Cep com "91010006"
    And eu clico no botão Continue
    Then deve abrir a tela Checkout: Overview
    And o produto "Sauce Labs Backpack" deve estar visível no Overview
    And o preço do produto "Sauce Labs Backpack" no Overview deve ser igual ao valor guardado
    When eu clico no botão Finish
    Then deve aparecer a mensagem "Thank you for your order!"
    And eu clico no botão Back Home
    And eu fecho as telas
