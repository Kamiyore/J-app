# J-address Web Application

Japanese mail forwarding service - Receive mail at a Japanese address and manage it online.

## 📁 Project Structure

```
J-app/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/               # App router pages
│   │   │   ├── inbox/        # Inbox management
│   │   │   ├── contact/      # Contact page
│   │   │   └── page.tsx      # Home page
│   │   ├── srcs/
│   │   │   ├── components/   # React components
│   │   │   └── pages/        # Additional pages
│   │   └── package.json
│   │
│   └── api/                   # NestJS backend
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   └── app.service.ts
│       ├── prisma/
│       │   └── schema.prisma  # Database schema
│       └── package.json
│
├── packages/
│   └── shared/                # Shared types & DTOs
│       ├── src/
│       │   ├── types/        # TypeScript types
│       │   └── dto/          # Data Transfer Objects
│       └── package.json
│
├── docker-compose.yml         # Docker services
├── package.json              # Workspace configuration
└── tsconfig.base.json        # Shared TypeScript config
```

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Headless UI** - Accessible components

### Backend

- **NestJS 11** - Node.js framework
- **Prisma 5** - ORM
- **PostgreSQL 15** - Database
- **TypeScript** - Type safety

### Infrastructure

- **Docker** - Containerization
- **AWS** - Cloud hosting (EC2/ECS, S3, RDS, CloudFront)
- **GitHub Actions** - CI/CD

### Additional Features

- **Redis + BullMQ** - Job queues
- **JWT + 2FA + RBAC** - Authentication & Authorization
- **Stripe** - Payment processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Docker & Docker Compose

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd J-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env` file in `apps/api/`:

   ```env
   DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/jaddress_db"
   PORT=3001
   ```

   Create `.env.local` file in `apps/web/`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the database**

   ```bash
   docker-compose up -d db
   ```

5. **Run database migrations**

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

6. **Start development servers**

   Option 1 - Run both servers:

   ```bash
   npm run dev
   ```

   Option 2 - Run separately:

   ```bash
   # Terminal 1 - Backend
   npm run dev:api

   # Terminal 2 - Frontend
   npm run dev:web
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Prisma Studio: `npm run prisma:studio --workspace=apps/api`

## 📦 NPM Scripts

### Root Commands

```bash
npm run dev              # Start both web and api
npm run dev:web          # Start frontend only
npm run dev:api          # Start backend only
npm run build            # Build all workspaces
npm run lint             # Lint all workspaces
npm run typecheck        # Type check all workspaces
npm run test             # Run tests in all workspaces
npm run clean            # Remove all node_modules
```

### Prisma Commands

```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

## 📊 Database Schema

### User

- id (UUID)
- email (unique)
- password
- createdAt
- updatedAt

### Inbox

- id (auto-increment)
- imageUrl (optional)
- status (RECEIVED | ACTION_REQUESTED | COMPLETED)
- requestedAction (NONE | SEND | SCAN | DISCARD)
- userId (foreign key)
- createdAt
- updatedAt

## 🔧 Development

### Adding Dependencies

```bash
# Add to frontend
npm install <package> --workspace=apps/web

# Add to backend
npm install <package> --workspace=apps/api

# Add to shared package
npm install <package> --workspace=packages/shared
```

### Using Shared Types

```typescript
// In apps/web or apps/api
import { InboxStatus, ActionType, User, Inbox } from "@j-address/shared";
```

## 🐳 Docker

### Start all services (when Dockerfiles are created)

```bash
docker-compose up
```

### Stop all services

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f
```

## 📝 License

ISC
