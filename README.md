# API de Gerenciamento de Estoque

API RESTful para gerenciamento de estoque desenvolvida com Node.js, Express e MongoDB Atlas.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB Atlas** - Banco de dados NoSQL na nuvem
- **Mongoose** - ODM para MongoDB
- **Cloudinary** - Armazenamento de imagens na nuvem
- **Multer** - Upload de arquivos
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **Jest** - Framework de testes
- **Supertest** - Testes de API

## Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>

# Entre na pasta do projeto
cd proj-web2

# Instale as dependências
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?appName=Cluster0
PORT=3000
JWT_SECRET=sua_chave_secreta_jwt

# Configuração Cloudinary (para upload de imagens)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### Como obter as credenciais:

**MongoDB Atlas:**
1. Acesse https://cloud.mongodb.com
2. Crie um cluster gratuito
3. Configure Database Access e Network Access
4. Obtenha a string de conexão

**Cloudinary:**
1. Acesse https://cloudinary.com
2. Crie uma conta gratuita
3. No Dashboard, copie as credenciais

## Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start

# Executar testes
npm test
```

## Documentação da API

Base URL: `http://localhost:3000/api`

### Autenticação

#### POST /api/login
Realiza login e retorna token JWT

**Request:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com"
  }
}
```

---

### Produtos (Products)

#### GET /api/products
Lista todos os produtos

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Notebook Dell",
    "sku": "NB-DELL-001",
    "category_id": {...},
    "supplier_id": {...},
    "cost_price": 2000.00,
    "selling_price": 3000.00,
    "description": "Notebook para trabalho",
    "imageUrl": "https://res.cloudinary.com/..."
  }
]
```

#### GET /api/products/:id
Busca um produto por ID

**Response:**
```json
{
  "_id": "...",
  "name": "Notebook Dell",
  "sku": "NB-DELL-001",
  "category_id": {...},
  "supplier_id": {...},
  "cost_price": 2000.00,
  "selling_price": 3000.00,
  "description": "Notebook para trabalho",
  "imageUrl": "https://res.cloudinary.com/..."
}
```

#### POST /api/products
Cria um novo produto (com upload de imagem)

**Request (multipart/form-data):**
```
name: Notebook Dell
sku: NB-DELL-001
category_id: 507f1f77bcf86cd799439011
supplier_id: 507f1f77bcf86cd799439012
cost_price: 2000.00
selling_price: 3000.00
description: Notebook para trabalho
image: [arquivo de imagem]
```

**Response:**
```json
{
  "_id": "...",
  "name": "Notebook Dell",
  "sku": "NB-DELL-001",
  "imageUrl": "https://res.cloudinary.com/..."
}
```

#### PUT /api/products/:id
Atualiza um produto existente

**Request:**
```json
{
  "name": "Notebook Dell Atualizado",
  "selling_price": 3500.00
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "Notebook Dell Atualizado",
  "selling_price": 3500.00
}
```

#### DELETE /api/products/:id
Exclui um produto

**Response:**
```json
{
  "ok": true
}
```

---

### Categorias (Categories)

#### GET /api/categories
Lista todas as categorias

#### GET /api/categories/:id
Busca uma categoria por ID

#### POST /api/categories
Cria uma nova categoria

**Request:**
```json
{
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos"
}
```

#### PUT /api/categories/:id
Atualiza uma categoria

#### DELETE /api/categories/:id
Exclui uma categoria

---

### Fornecedores (Suppliers)

#### GET /api/suppliers
Lista todos os fornecedores

#### GET /api/suppliers/:id
Busca um fornecedor por ID

#### POST /api/suppliers
Cria um novo fornecedor

**Request:**
```json
{
  "name": "Fornecedor XYZ",
  "cnpj": "12345678901234",
  "contact": "contato@fornecedor.com",
  "phone": "(11) 99999-9999"
}
```

#### PUT /api/suppliers/:id
Atualiza um fornecedor

#### DELETE /api/suppliers/:id
Exclui um fornecedor

---

### Depósitos (Warehouses)

#### GET /api/warehouses
Lista todos os depósitos

#### GET /api/warehouses/:id
Busca um depósito por ID

#### POST /api/warehouses
Cria um novo depósito

**Request:**
```json
{
  "name": "Depósito Central",
  "location": "São Paulo - SP"
}
```

#### PUT /api/warehouses/:id
Atualiza um depósito

#### DELETE /api/warehouses/:id
Exclui um depósito

---

### Estoque (Stocks)

#### GET /api/stocks
Lista todo o estoque

#### GET /api/stocks/:id
Busca estoque por ID

#### POST /api/stocks
Registra um novo item no estoque

#### PUT /api/stocks/:id
Atualiza informações do estoque

#### DELETE /api/stocks/:id
Remove um item do estoque

---

### Movimentações de Estoque (Stock Movements)

#### GET /api/stock_movement
Lista todas as movimentações

#### GET /api/stock_movement/:id
Busca uma movimentação por ID

#### POST /api/stock_movement
Registra uma nova movimentação

#### PUT /api/stock_movement/:id
Atualiza uma movimentação

#### DELETE /api/stock_movement/:id
Exclui uma movimentação

---

### Ajustes de Preço (Price Adjustments)

#### GET /api/price_adjustment
Lista todos os ajustes de preço

#### POST /api/price_adjustment
Registra um novo ajuste de preço

---

### Usuários (Users)

#### GET /api/users
Lista todos os usuários

#### POST /api/users
Cria um novo usuário

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123",
  "role": "admin"
}
```

---

## Testes

O projeto possui testes automatizados usando Jest e Supertest.

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

### Testes Implementados:

- **Products**: POST (inserir), GET (listar), GET/:id (buscar), PUT (atualizar), DELETE (excluir)
- **Categories**: Testes completos de CRUD
- **Suppliers**: Testes completos de CRUD
- **Warehouses**: Testes completos de CRUD
- **Auth**: Testes de autenticação

## Estrutura do Projeto

```
proj-web2/
├── config/
│   ├── cloudinary.js    # Configuração do Cloudinary
│   ├── mongo.js         # Conexão com MongoDB
│   └── multer.js        # Configuração upload de arquivos
├── controllers/         # Lógica de negócio
├── middlewares/         # Middlewares customizados
├── models/             # Modelos do Mongoose
├── routes/             # Definição das rotas
├── services/           # Serviços auxiliares
├── test/               # Testes automatizados
├── .env                # Variáveis de ambiente
├── .gitignore
├── package.json
├── server.js           # Arquivo principal
└── README.md
```

## Funcionalidades Implementadas

- ✅ CRUD completo para todas as entidades
- ✅ Upload de imagens para produtos (Cloudinary)
- ✅ Autenticação com JWT
- ✅ Criptografia de senhas com Bcrypt
- ✅ Validação de dados
- ✅ Testes automatizados com Jest
- ✅ Conexão com MongoDB Atlas
- ✅ Relacionamentos entre coleções (populate)

## Autor

Desenvolvido como projeto da disciplina Web 2

## Licença

MIT
