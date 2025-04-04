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

* 🧠 **Interactive Code Editor** – Built with Monaco Editor, allowing users to write and test code in real-time.
* 📖 **Detailed Problem Descriptions** – Each challenge includes comprehensive descriptions, examples, constraints, and helpful hints.
* 🧪 **Automated Test Cases** – Validate solutions by running them against predefined test cases.
* 🌍 **Support for Multiple Languages** – Write code in JavaScript, Python, or Java.
* 📈 **Submission Tracking** – Track submissions with detailed information like memory usage, runtime, and result status (✅ Accepted, ❌ Wrong Answer, etc.).
* 📱 **Mobile-Friendly Design** – A modern, responsive UI that works seamlessly across all devices.

## 🛠 Tech Stack 

* **Frontend**: React.js with Tailwind CSS for styling and Monaco Editor for code editing.
* **Backend**: Node.js with Express.js for building RESTful APIs.
* **Database**: PostgreSQL, optionally managed via Prisma ORM for type-safe data access.
* **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
* **Code Execution**: Integrated with the Judge0 API to run and validate code submissions.
* **State Management**: Zustand for scalable and lightweight React state management.
* **Version Control**: Git for version tracking and GitHub for code collaboration and hosting.

---

## 📦 Installation

```bash
git clone https://github.com/soumadip-dev/Logiqo.git
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
