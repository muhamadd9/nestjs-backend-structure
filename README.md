# nestjs-backend-structure

A clean, scalable, and modular backend architecture for NestJS applications using the Generic Repository Pattern with Mongoose. This structure promotes maintainability, separation of concerns, and ease of testing.

## Features

- Generic Repository Pattern: DRY and reusable database access logic.
- Clean Architecture: Decouples business logic from data access layers.
- Authentication/Authorization Ready: Supports JWT and role-based access control.
- Modular Structure: Feature-based modules for scalability.
- Testable: Repository abstraction simplifies unit testing.
- Mongoose Integration: Leverages `@InjectModel` and schemas effectively.

## Tech Stack

- NestJS: Progressive Node.js framework.
- MongoDB / Mongoose: Document-based database and ORM.
- TypeScript: Type-safe JavaScript.
- class-validator: DTO validation.
- dotenv: Environment configuration.


## Installation

### Prerequisites

- Node.js (>= 16.x)
- MongoDB

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/muhamadd9/nestjs-backend-structure.git
   cd nestjs-backend-structure
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Copy `.env.example` to `.env` and update with your MongoDB URI, JWT secret, etc.:

   ```bash
   cp .env.example .env
   ```

4. Run the application:

   Start in development mode:

   ```bash
   npm run start:dev
   ```
