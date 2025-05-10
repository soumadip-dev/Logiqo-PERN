<h1 align="center">
  <br>
  Logiqo
  <br>
</h1>

<div align="center">
  <a href="https://github.com/soumadip-dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,postgres,react,tailwindcss,docker,github" alt="Tech Stack" width="340" style="padding: 15px 0;">
  </a>
</div>

<h3 align="center">
  Logiqo is a LeetCode-inspired platform designed to help developers enhance their coding skills by solving programming challenges in various languages, including JavaScript, Python, and Java.
</h3>

---

<p align="center">
  <img src="https://github.com/Aestheticsuraj234/chai-or-leetcode/blob/main/frontend/public/thumbnail.png" alt="Screenshot" width="600">
</p>

---

## 🌟 Features

- 🧠 **Interactive Code Editor** – Built with Monaco Editor, allowing users to write and test code in real-time.
- 📖 **Detailed Problem Descriptions** – Each challenge includes comprehensive descriptions, examples, constraints, and helpful hints.
- 🧪 **Automated Test Cases** – Validate solutions by running them against predefined test cases.
- 🌍 **Support for Multiple Languages** – Write code in JavaScript, Python, or Java.
- 📈 **Submission Tracking** – Track submissions with detailed information like memory usage, runtime, and result status (✅ Accepted, ❌ Wrong Answer, etc.).
- 📱 **Mobile-Friendly Design** – A modern, responsive UI that works seamlessly across all devices.

## 🛠 Tech Stack

- **Frontend**: React.js with Tailwind CSS for styling and Monaco Editor for code editing.
- **Backend**: Node.js with Express.js for building RESTful APIs.
- **Database**: PostgreSQL, optionally managed via Prisma ORM for type-safe data access.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
- **Code Execution**: Integrated with the Judge0 API to run and validate code submissions.
- **State Management**: Zustand for scalable and lightweight React state management.
- **Version Control**: Git for version tracking and GitHub for code collaboration and hosting.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/soumadip-dev/Logiqo.git
cd Logiqo
```

### 2. Set up Judge0 (Code Execution Engine)

Follow the official [Judge0 Docker setup guide](https://github.com/judge0/judge0/blob/master/CHANGELOG.md) to configure the code execution environment.

### 3. Configure PostgreSQL

Run PostgreSQL in Docker (replace placeholders with your credentials):

```bash
docker run --name logiqo-db \
  -e POSTGRES_USER=<your_username> \
  -e POSTGRES_PASSWORD=<your_password> \
  -p 5432:5432 \
  -d postgres

# To start the container after initial setup:
docker start logiqo-db
```

### 4. Configure Environment Variables

Create a `.env` file in the backend folder with these configurations:

```env
########## SERVER CONFIGURATION ##########
PORT=<server_port>

########## DATABASE CONFIGURATION ##########
DATABASE_URL="postgresql://<your_username>:<your_password>@localhost:5432/logiqo?schema=public"

########## AUTHENTICATION ##########
JWT_TOKEN_SECRET=<your_random_secret_key>
JWT_TOKEN_EXPIRY=<token_expiry_duration>

########## JUDGE0 INTEGRATION ##########
JUDGE0_API_URL=http://localhost:2358
```

<!--
Set up Prisma container using Docker
-------------------------------------
docker run --name logiqo -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres

Daily usage:
------------
docker start logiqo
cd ~/Dev/judge0-v1.13.1
docker-compose up -d

After every change in the Prisma schema:
----------------------------------------
npx prisma migrate dev --name shift-to-linux
npx prisma generate
npx prisma db push

-->
