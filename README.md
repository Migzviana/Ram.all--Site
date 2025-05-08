# Ram.all - Sistema de Gerenciamento de Ramais

Aplicação web desenvolvida com **Angular** para o gerenciamento de ramais, com funcionalidades de login, cadastro e controle de acesso. O sistema permite visualizar, filtrar e gerenciar ramais por diferentes intervalos e status (disponíveis, todos ou por intervalo específico). Além disso, conta com autenticação de usuários via token JWT.

🎯 **Objetivo**
O objetivo principal do projeto é facilitar o gerenciamento de ramais de uma empresa, permitindo que os usuários se cadastrem, façam login e realizem operações de login/logout nos ramais disponíveis. O sistema também possibilita a visualização de ramais em diferentes estados e intervalos, além de oferecer uma interface intuitiva para usuários administrativos.

✨ **Funcionalidades**
- **Cadastro de usuários**: Realize o registro de novos usuários.
- **Login de usuários**: Autentique usuários no sistema com um e-mail e senha válidos.
- **Controle de Ramais**:
  - Visualização de **todos os ramais** cadastrados.
  - Visualização de **ramais disponíveis** (não logados).
  - Filtragem de **ramais por intervalo**.
  - Opções de **login/logout** nos ramais.
- **Interface intuitiva** com componentes reutilizáveis como campos de entrada e tabelas de ramais.
- **Validação de Formulários**: Verificação de campos obrigatórios e consistência dos dados fornecidos (ex: senhas iguais no cadastro).

🛠️ **Tecnologias e Ferramentas**
| Tecnologia             | Finalidade                          |
|------------------------|-------------------------------------|
| Angular 17+            | Framework principal                |
| Angular Material       | Design responsivo e UI             |
| RxJS                   | Programação reativa                |
| TypeScript             | Linguagem de desenvolvimento       |
| ngx-toastr             | Notificações (sucesso, erro, aviso)|
| FormsModule            | Controle de formulários            |
| SCSS                   | Estilização                        |
| Angular Router         | Navegação entre páginas            |


✍️ **Contribuições e Aprendizados**
- Aprendizado prático com o Angular 17+.
- Implementação de autenticação com tokens JWT para segurança de acesso.
- Criação de interfaces dinâmicas e responsivas usando Angular Material.
- Integração do frontend com uma API RESTful para gerenciamento de ramais.

🚧 **Desafios e Soluções**
| Problema                                | Solução                                   |
|---------------------------------------------|------------------------------------------|
| Falta de recuperação de senha no login      | Implementação de validadores customizados|

⚙️ **Como Executar**
### Pré-requisitos
- **Node.js** (v16+)
- **npm** (v8+)

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ram.all.git

1\.  Acesse a pasta do projeto:

    bash

    `cd ram.all`

2\.  Instale as dependências:

    `npm install`

### Execução

Para rodar a aplicação localmente, execute:

bash

`npx ng serve --host 0.0.0.0 --port 4200`

Acesse o projeto em: http://localhost:4200

### Build para Produção

bash

`npx ng build --prod`

🧪 **Testes Realizados**

-   Testes de autenticação (login, cadastro).

-   Validação dos formulários (campo de senha, e-mail e confirmação de senha).

-   Testes de funcionalidade dos filtros de ramais por intervalo e disponibilidade.

-   Verificação de responsividade em múltiplos dispositivos.

📚 **Aprendizados**

-   Implementação de formulários reativos com validações avançadas no Angular.

-   Criação de componentes reutilizáveis e modulares.

-   Implementação de um sistema de login com autenticação via tokens JWT.

-   Desenvolvimento de um sistema com filtros dinâmicos baseados em dados de uma API RESTful.
