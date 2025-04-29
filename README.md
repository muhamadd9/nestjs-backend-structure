nestjs-backend-structure
A clean, scalable, and modular backend architecture for NestJS applications using the Generic Repository Pattern with Mongoose. This structure promotes maintainability, separation of concerns, and ease of testing.
Features

Generic Repository Pattern: DRY and reusable database access logic.
Clean Architecture: Decouples business logic from data access layers.
Authentication/Authorization Ready: Supports JWT and role-based access control.
Modular Structure: Feature-based modules for scalability.
Testable: Repository abstraction simplifies unit testing.
Mongoose Integration: Leverages @InjectModel and schemas effectively.

Tech Stack

NestJS: Progressive Node.js framework.
MongoDB / Mongoose: Document-based database and ORM.
TypeScript: Type-safe JavaScript.
class-validator: DTO validation.
dotenv: Environment configuration.

Folder Structure

config/: Configuration files (e.g., .env, .env.example).
src/
common/
decorators/: Custom decorators (e.g., authentication.decorator.ts, roles.decorator.ts).
email/: Email utilities (e.g., sendEmail.ts).
guard/: Authentication and authorization guards (e.g., authentication-guard.spec.ts, authorization-guard.ts).
pipes/: Custom pipes (e.g., hash-security.ts).
service/: Shared services (e.g., token-service.ts).


model/
user-model.ts: Mongoose schema definitions.
db.repository-service.ts: Generic repository implementation.


modules/
app.controller.spec.ts: Controller tests.
app.module.ts: Root application module.


main.ts: Application entry point.


test/: Test files (e.g., app.e2e-spec.ts).
package.json: Project dependencies and scripts.
package-lock.json: Dependency lock file.
prettierc: Prettier configuration.
nest-cli.json: Nest CLI configuration.

Installation
Prerequisites

Node.js (>= 16.x)
MongoDB

Setup Instructions

Clone the repository:
git clone https://github.com/muhamadd9/nestjs-backend-structure.git
cd nestjs-backend-structure


Install dependencies:
npm install


Set up environment variables:
Copy .env.example to .env and update with your MongoDB URI, JWT secret, etc.:
cp .env.example .env


Run the application:
Start in development mode:
npm run start:dev



