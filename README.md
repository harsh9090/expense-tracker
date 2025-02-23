# Expense Tracker 📊💰

A full-stack **Expense Tracking Application** that allows users to manage their income, expenses, and generate financial summaries. The backend is built with **Spring Boot**, secured with **JWT authentication**, and deployed on **Render**. The frontend is developed using **Angular** and deployed on **Netlify**.

---

## 🚀 Features

- ✅ **User Authentication** (Login & Registration with JWT)
- ✅ **Expense Management** (Add, Update, Delete Expenses)
- ✅ **Income Management** (Track Monthly Income)
- ✅ **Monthly Summary Reports** 📊
- ✅ **CORS Handling & Security Enhancements**
- ✅ **Optimized API Calls with Loaders**
- ✅ **Dockerized Deployment**
- ✅ **Scheduled Jobs with Cron**
- ✅ **Error Handling & Debugging Logs**

---

## 🏗️ Tech Stack

### 🔹 Backend
- **Spring Boot** (Java 17)
- **Spring Security & JWT** (Authentication & Authorization)
- **Hibernate & JPA** (PostgreSQL Database)
- **Lombok** (For reducing boilerplate code)
- **Maven** (Dependency Management)
- **Docker** (Containerization)
- **Render** (Backend Deployment)

### 🔹 Frontend
- **Angular** (TypeScript)
- **RxJS** (State Management)
- **Bootstrap** (UI Styling)
- **Netlify** (Frontend Deployment)

---

## 🛠️ Installation & Setup

### 🔹 Backend Setup (Spring Boot)
1. Clone the repository:
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker/backend
Update the application.properties with your database credentials:
properties

spring.datasource.url=jdbc:postgresql://your-db-url:5432/expensetracking
spring.datasource.username=your-db-username
spring.datasource.password=your-db-password
Run the application:
mvn clean install
mvn spring-boot:run
🔹 Frontend Setup (Angular)
Navigate to frontend:
cd frontend
Install dependencies:

npm install
Start the development server:

ng serve --open
🔐 Security Measures
Spring Security + JWT for Authentication
CORS Handling to allow frontend communication
Exception Handling for better debugging
Dockerized Environment for portability
🐳 Docker Deployment
Build and run the Docker container:

docker build -t expense-tracker .
docker run -p 8080:8080 expense-tracker
📝 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/auth/register	Register a new user	❌ No
POST	/auth/login	User login (JWT)	❌ No
GET	/expenses	Fetch all expenses	✅ Yes
POST	/expenses	Add new expense	✅ Yes
PUT	/expenses/{id}	Update an expense	✅ Yes
DELETE	/expenses/{id}	Delete an expense	✅ Yes
GET	/income	Fetch all incomes	✅ Yes
POST	/income	Add new income	✅ Yes
GET	/summary/monthly	Get monthly report	✅ Yes
📌 Deployment
Backend: Hosted on Render
Frontend: Hosted on Netlify
Database: PostgreSQL (Render Cloud DB)
Docker: Containerized setup
🤝 Contributing
Fork the project
Create your feature branch (git checkout -b feature/new-feature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/new-feature)
Open a Pull Request
📧 Contact
For queries or collaboration, feel free to reach out:
📩 Email: harsh.hm@gmail.com

⭐ Show Some Love!
If you like this project, star it on GitHub! ⭐


### 📌 Next Steps:
1. Copy the content above.
2. Open your GitHub project.
3. Create a **README.md** file in the root directory.
4. Paste the content and **commit** it.

You're all set! 🚀 Let me know if you need any modifications. 😊
