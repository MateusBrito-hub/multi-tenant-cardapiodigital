# Multi-Tenant Cardápio Digital

Este projeto é uma aplicação para gerenciamento de cardápios digitais com suporte a múltiplos estabelecimentos (multi-tenant).

## Funcionalidades

- Cadastro e autenticação de estabelecimentos
- Gerenciamento de produtos e categorias
- Geração de cardápio digital personalizado por estabelecimento
- Interface amigável para clientes acessarem o cardápio

## Tecnologias Utilizadas

- Node.js / Express (backend)
- Angular (frontend)
- Postgress (banco de dados)
- Docker (opcional para deploy)

## Como Executar

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/multi-tenant-cardapiodigital.git
    ```
2. Instale as dependências:
    ```bash
    cd multi-tenant-cardapiodigital
    npm install
    ```
3. Configure as variáveis de ambiente conforme o arquivo `.env.example`.
4. Inicie a aplicação:
    ```bash
    npm start
    ```

## Estrutura do Projeto

```
/backend      # API e lógica de negócios
/frontend     # Aplicação Angular
/docker       # Arquivos para containerização
README.md
```

## Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.