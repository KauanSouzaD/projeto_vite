# Server for Projeto Empreendedorismo

This is a minimal Express + TypeScript + Mongoose backend that provides:

- `POST /api/auth/register` -> register (returns created user object)
- `POST /api/auth/login` -> login (returns user object)
- `GET|POST|PUT|DELETE /api/tasks` -> CRUD for tasks (no JWT required)

Setup

1. Copy `.env.example` to `.env` and update `MONGODB_URI`.

```powershell
cd server
copy .env.example .env
# then edit .env
```

2. Install dependencies:

```powershell
npm install
```

3. Run in development:

```powershell
npm run dev
```

Build and run production:

```powershell
npm run build
npm start
```

Notes

- This server expects a MongoDB connection string in `MONGODB_URI`.

Security note

- JWT-based authentication and middleware were removed per project request. The API currently does not enforce access control — in a real app you should implement authentication and authorization.
# Server for Projeto Empreendedorismo

This is a minimal Express + TypeScript + Mongoose backend that provides:

- /api/auth/register -> register (returns JWT)
- /api/auth/login -> login (returns JWT)
- /api/tasks -> CRUD for tasks (protected by JWT)

Setup

1. Copy `.env.example` to `.env` and update `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
cd server
npm install
```

3. Run in development:

```bash
npm run dev
```

Build and run production:

```bash
npm run build
npm start
```

Notes

- This server expects a MongoDB connection string in `MONGODB_URI`.
- The JWT_SECRET in `.env` should be a secure random string for production.
