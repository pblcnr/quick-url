# QuickURL - Scalable URL Shortener

A high-performance URL shortener built with TypeScript, focusing on clean architecture and scalability.

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

- **Domain Layer**: Core business logic and entities
- **Application Layer**: Use cases and business workflows  
- **Infrastructure Layer**: External concerns (database, cache, messaging)

## 🛠️ Tech Stack

- **Backend**: TypeScript + Express
- **Database**: PostgreSQL
- **Cache**: Redis
- **Messaging**: RabbitMQ
- **Testing**: Jest + Supertest
- **DevOps**: Docker + Docker Compose

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Development Setup

1. **Clone and install dependencies**
```bash
git clone https://github.com/pblcnr/quick-url.git
cd quick-url
npm install
```

2. **Enviroment setup**
```bash
cp .env.exemple .env
# Edit .env with your configurations
```

3. **Start development**
```bash
npm run dev
```

### Project Structure
```
src/
├── domain/              # Core business logic
│   ├── entities/        # Business entities
│   ├── repositories/    # Repository interfaces
│   └── value-objects/   # Value objects
├── application/         # Use cases
│   └── use-cases/       # Business workflows
├── infrastructure/      # External concerns
│   ├── database/        # PostgreSQL setup
│   ├── cache/           # Redis setup
│   ├── messaging/       # RabbitMQ setup
│   ├── repositories/    # Repository implementations
│   └── web/             # Express controllers
└── shared/              # Shared utilities
    ├── config/          # Configuration
    └── errors/          # Custom errors
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run testst in watch mode

---
**Status**: In Development