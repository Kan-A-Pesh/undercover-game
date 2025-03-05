# 🎭 Undercover Game

Undercover is a social deduction party game where players receive secret roles and a word. Players take turns saying words related to their secret word, trying to identify who's on their team while avoiding detection by others.

## 📁 Project Structure

### Root Directory

- `.github/`: GitHub workflows and actions
- `docker-compose.yml`: Docker Compose configuration

### Client

- `.gitignore`: Git ignore file for client
- `.prettierrc`: Prettier configuration for client
- `.storybook/`: Storybook configuration
- `Dockerfile`: Dockerfile for client
- `eslint.config.js`: ESLint configuration for client
- `index.html`: Main HTML file for client
- `package.json`: NPM package file for client
- `postcss.config.js`: PostCSS configuration for client
- `public/`: Public assets for client
- `README.md`: README file for client
- `shared/`: Shared code between client and server
- `src/`: Source code for client
- `tailwind.config.js`: Tailwind CSS configuration for client
- `tsconfig.app.json`: TypeScript configuration for client app
- `tsconfig.json`: TypeScript configuration for client
- `tsconfig.node.json`: TypeScript configuration for client node
- `vite.config.ts`: Vite configuration for client

### Server

- `.dockerignore`: Docker ignore file for server
- `.gitignore`: Git ignore file for server
- `.prettierrc`: Prettier configuration for server
- `Dockerfile`: Dockerfile for server
- `eslint.config.js`: ESLint configuration for server
- `package.json`: NPM package file for server
- `src/`: Source code for server
- `tsconfig.json`: TypeScript configuration for server
- `types/`: TypeScript type definitions for server

### Shared

- `.gitignore`: Git ignore file for shared code
- `events/`: Event definitions
- `models/`: Data models
- `package.json`: NPM package file for shared code
- `payloads/`: Payload definitions
- `response/`: Response types
- `validation/`: Validation schemas

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (version 20)
- Docker

### 📦 Installation

1. Clone the repository:

```
git clone https://github.com/your-repo/undercover-game.git
cd undercover-game
```

2. Install dependencies for the client and server:

```
cd client
npm ci
cd ../server
npm ci
```

### ▶️ Running the Application

#### 🐳 Using Docker

1. Build and run the Docker containers:

```
docker-compose up --build
```

2. The client will be available at `http://localhost:3000` and the server at `http://localhost:3001`.

#### 📦 Using npm

1. Start the client:

```
cd client
npm run dev
```

2. Start the server:

```
cd server
npm run dev
```

### 🛠️ Building the Application

To build the client and server:

```
cd client
npm run build
cd ../server
npm run build
```

### 🧹 Linting and Formatting

To lint and format the code:

```
cd client
npm run lint
npm run format
cd ../server
npm run lint
npm run format
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.