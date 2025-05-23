## Finance Manager – Documentação Técnica

### Conteúdo

1. #### Visão Geral
2. #### Arquitetura

   * Backend (FastAPI + Clean Architecture)
   * Frontend (React + Lean Architecture)
3. #### Estrutura de Diretórios
4. #### Tecnologias e Bibliotecas
5. #### Configuração & Execução
6. #### Variáveis de Ambiente
7. #### API Endpoints Principais
8. #### Design Patterns & Boas Práticas
9. #### Requisitos Ausentes
---

## Visão Geral

Aplicação SPA para gestão financeira pessoal, com autenticação JWT, CRUD de categorias e transações, e dashboard com saldo e gráficos de despesas por categoria.

---

## Arquitetura

### Backend

* **Clean Architecture** dividida em:

  * **Core**: configurações (env/settings), segurança (hash de senha, OAuth2/JWT).
  * **DB**: SQLAlchemy + SessionLocal/Base; migrações via `Base.metadata.create_all()`.
  * **Models**: entidades `User`, `Category`, `Transaction` (com enums e relacionamentos).
  * **Schemas**: Pydantic v2 DTOs separados em Create/Read/Update.
  * **CRUD**: repositórios em `app/crud/`.
  * **Services**: lógica de negócio em `app/services/`.
  * **API**: routers versionados em `app/api/v1/`, protegidos pelo dependency `get_current_user`.

### Frontend

* **Lean Architecture** com pastas claras:

  * **`/context`**: `AuthContext` (login, logout, user).
  * **`/hooks`**: React Query para dados (`useCategories`, `useTransactions`, `useSummary`, `useCreateCategory`, `useCreateTransaction`, `useUpdateTransaction`, `useDeleteTransaction`).
  * **`/components`**: UI atômica com Chakra UI v3 (`Dialog`, `Field`, `Button`, etc.), formulários e gráficos (`PieChartCard`).
  * **`/pages`**: rotas protegidas (`DashboardPage`).
  * **`/services/apiClient.ts`**: instância Axios com interceptor JWT.
  * **`/types`**: DTOs TypeScript gerados manualmente.
  * **`/schemas`**: Zod para validação de payloads de formulário.

---

## Estrutura de Diretórios

```text
backend/                    # FastAPI app
├─ app/
│  ├─ core/                 # settings, seguridad
│  ├─ db/                   # SQLAlchemy Base & Session
│  ├─ models/               # ORM models
│  ├─ schemas/              # Pydantic DTOs
│  ├─ crud/                 # repositórios DB
│  ├─ services/             # lógica de negócio
│  └─ api/
│     └─ v1/                # routers (auth, categories, transactions, summary)
frontend/                   # React + TS
├─ src/
│  ├─ context/              # AuthContext.tsx
│  ├─ hooks/                # useCategories.ts, useTransactions.ts, useSummary.ts, etc.
│  ├─ components/           # PieChartCard, TransactionList, TransactionForm ...
│  ├─ pages/                # DashboardPage.tsx, LoginPage.tsx, RegistrationPage.tsx
│  ├─ services/             # apiClient.ts, authClient.ts ...
│  ├─ types/                # CategoryDTO, TransactionDTO, SummaryDTO
│  └─ schemas/              # NewTransactionSchema, NewCategorySchema
```

---

## Tecnologias e Bibliotecas

* **Backend**: Python 3.10+, FastAPI, Pydantic v2, SQLAlchemy, Uvicorn
* **Frontend**: React 18, TypeScript, Chakra UI v3, React Query v5, React Router v6, Zod, React Hook Form, Recharts
* **Autenticação**: OAuth2 Password + JWT Bearer

---

## Configuração & Execução

### Clone the repository
```bash 
git clone https://github.com/GabeMed/personal-financial-menager.git
# entre no diretório
cd personal-financial-menager
```

### Backend

```bash
# criar e ativar venv
python -m venv .venv && source .venv/bin/activate
# instalar deps
cd backend
pip install -r requirements.txt
# rodar o backend
cd ..
uvicorn backend.app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
cd finance-app
# instalar deps
npm install
# rodar
npm run dev
```

---

## Variáveis de Ambiente

| Nome                  | Descrição                     | Exemplo                             |
| --------------------- | ----------------------------- | ----------------------------------- |
| `DATABASE_URL`        | URL de conexão com PostgreSQL | `sqlite:///./app.db`                |
| `SECRET_KEY`          | Chave JWT                     | `yourSecret.`                       |
| `ACCESS_TOKEN_EXPIRE` | Validade do token (minutos)   | `30`                                |
| `VITE_API_URL`        | Base URL do backend no front  | `http://localhost:8000/api/v1`      |

---

## API Endpoints Principais

| Método | Rota                           | Descrição                                    |
| ------ | ------------------------------ | -------------------------------------------- |
| POST   | `/api/v1/auth/token`           | Login, retorna JWT                           |
| GET    | `/api/v1/users/me`             | Dados do usuário logado                      |
| GET    | `/api/v1/categories/all`       | Listar categorias do usuário                 |
| POST   | `/api/v1/categories`           | Criar categoria                              |
| GET    | `/api/v1/transactions/all`     | Listar transações                            |
| POST   | `/api/v1/transactions`         | Criar transação                              |
| PATCH  | `/api/v1/transactions/{id}`    | Editar transação                             |
| DELETE | `/api/v1/transactions/{id}`    | Excluir transação                            |
| GET    | `/api/v1/transactions/summary` | Resumo (balance, income/expense totals & %s) |

---

## Design Patterns & Boas Práticas

* **Clean Architecture** (backend): separação clara entre camadas
* **React Hooks** para composição de lógica de dados (React Query)
* **Validação em Runtime** com Zod + `react-hook-form`
* **JWT + Axios Interceptor** para autenticação automática

---

## Requisitos Ausentes

### Testes Unitários

#### Backend

* **Framework**: pytest
 
* **Cobertura mínima**:

  * **Serviços de Categoria** (`app/services/category.py`)

    * criar categoria válida
    * listar categorias de um usuário
    * tratar tentativas de duplicação ou nome inválido
  * **Serviços de Transação** (`app/services/transaction.py`)

    * criar, atualizar e excluir transação
  * **Resumo (`/transactions/summary`)**

    * agrupar despesas e receitas corretamente
    * calcular percentuais e balance
* **Mocks**: fixtures para usuário e sessão de banco de dados in-memory (SQLite)

### Filtragem Básica

#### Backend

* **GET `/transactions`**

  * parâmetros opcionais de query:

    * `start_date` (YYYY-MM-DD)
    * `end_date` (YYYY-MM-DD)
    * `category_id` (inteiro)
  * aplicar filtros no repositório:

    ex:
    ```python
    query = db.query(Transaction).filter(Transaction.user_id == user.id)
    if start_date: query = query.filter(Transaction.date >= start_date)
    if end_date:   query = query.filter(Transaction.date <= end_date)
    if category_id: query = query.filter(Transaction.category_id == category_id)
    ```
  * retornar lista filtrada

## Motivação das Prioridades

* **Charts em vez de filtros**: um dashboard visual (saldo + gráfico de pizza) dá **insight imediato** sobre os padrões de gastos, acelerando a validação do MVP. Filtros são importantes, mas geram menos “wow” inicial e podem ficar para iteração seguinte.
* **Teste automatizado deixado para depois**: foquei primeiro na **entrega de valor visível** (autenticação, CRUD, dashboard reativo). Com a base de funcionalidades estável.

