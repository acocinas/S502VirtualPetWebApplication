# 🐾 Virtual Pet Web Application

Welcome to **Virtual Pet**, an educational full-stack project where users can create and care for their own virtual developer pets. The system is built with a clear backend–frontend separation, following modern development practices and guided by AI assistance.

---

## 🚀 Project Overview

This project was developed as part of a learning challenge focused on building a full-stack web application using AI assistance. The main goal was to understand the AI's role in generating the frontend, while ensuring a secure and functional backend.

Users can:
- Register and log in using JWT authentication.
- Create personalized pets (frontend/backend developers).
- Interact with pets to manage happiness, energy, and knowledge.
- Change habitats and improve their stacks through study.
- Admin users can manage all pets in the system.
- View pets by role (User vs Admin).

---

## 📁 Project Structure

<details>  <summary> 🛠️ Backend – Spring Boot</summary> 

- **Framework:** Spring Boot (Java 21)
- **Build tool:** Maven
- **Database:** MySQL (`virtualpetdb`)
- **Security:** JWT, Spring Security
- **Architecture:** DTO + Mapper + Services + Controllers
- **Roles:** Admin and User (with route-based access control)
- **Swagger:** `/swagger-ui/index.html` for API documentation
- **Logging:** SLF4J for key processes and errors
- **SOLID principles:** Applied through service decomposition and clean responsibilities
</details>

<details>  <summary>🎨 Frontend – React + TypeScript</summary> 

- **Routing:** React Router v6
- **State Management:** `useState` + `useEffect`
- **Communication:** Axios for REST API calls with token injection
- **Dynamic Habitat UI:** Full-screen background based on pet's environment
- **Pet Actions:** Buttons trigger actions (`Eat`, `Sleep`, `Play`, `Study`)
- **Stack Management:** Study improves specific technologies dynamically
- **Role-Based Views:** Admins can access extra management panels
</details>
 

 ## 🧠 AI Used in This Project 

<details>  <summary>🤖 ChatGPT was used to:</summary> 

- Generate boilerplate code for both frontend and backend.
- Refactor and modularize services following SOLID principles.
- Assist with debugging and understanding errors.
- Plan frontend component architecture in React.
- Create TypeScript service classes with Axios.
- Solve bugs and interpret stack traces.
- Support Swagger documentation.
- Create UI components dynamically in React.
 
</details>

🔗 **Presentation available here:**  
📄 [📊 AI in Application Development – Gamma Presentation](https://gamma.app/docs/IA-en-el-Desarrollo-de-Aplicaciones-jdq6ozc27vcxng3?mode=doc)  
---

## 🧱 Technologies Used

<details>  <summary> 🛠️ Backend (Spring Boot)</summary> 

- Java 21
- Spring Boot 3
- Spring Security + JWT
- Maven
- MySQL + JPA
- Lombok
- MapStruct
- Swagger/OpenAPI v3
- SLF4J (Logging)
- JUnit 5 (unit tests)
</details>

<details>  <summary>🎨 Frontend (React + Vite)</summary> 

- React 18 + TypeScript
- TailwindCSS
- React Router
- Axios
- Zustand (state management)
- Vite
- Custom components & icons
</details>

<details>  <summary>Tools & Collaboration</summary>
- Git + GitHub
- Postman (for testing)
- ChatGPT (for assisted coding)
- Visual Studio Code / IntelliJ IDEA
</details>

## 📦 Project Structure

<details>  <summary>🧩 Backend: `pet-api`</summary> 

Handles:

- REST API endpoints
- JWT authentication
- Role-based authorization (USER / ADMIN)
- Business logic for pet actions (eat, sleep, play, study)
- Unit testing (partially implemented)
- Database integration with `virtualpetdb` (MySQL)
- Swagger UI: [`/swagger-ui.html`](http://localhost:8080/swagger-ui/index.html)
</details>
<details>  <summary>💻 Frontend: `pet-frontend`</summary> 

Handles:

- User login flow and role-based UI
- Home screen with full-screen habitat backgrounds
- Pet interaction UI (buttons for actions, stack progress)
- Dynamic views for USER and ADMIN
- REST API communication via Axios
- Custom `PetCard`, `StudyButton`, and modal components
</details>


## 📘 Development Stages

<details>  <summary> ✅  Functionality</summary> 

- [x] Backend and frontend fully connected
- [x] Roles and JWT integrated
- [x] Pet CRUD + basic interactions (eat, play, sleep, study)
- [x] Swagger documentation included
- [x] Frontend adjusts layout based on role



## 📝 Notes

- The project intentionally prioritizes **educational value and structure over production readiness**.
- Some unit tests are pending or temporarily removed due to DTO visibility constraints.
- This project is designed to demonstrate the use of **AI as a development assistant**.
</details>


## 📂 Getting Started

<details>  <summary>🔧 Backend</summary> 

```bash
cd pet-api
mvn spring-boot:run
```
Access swaagger at: [`/swagger-ui.html`](http://localhost:8080/swagger-ui/index.html)
</details>
<details>  <summary>💻 Frontend</summary> 
```bash
cd pet-frontend
npm install
npm run dev
```
Run at: [`/Vite-localhost`](http://localhost:5173)
</details>

# 🤝 Author
👤 [Alfonso Cocinas](https://acocinas.github.io)

📧 Mail: [alcogar79@gmail.com](mailto:alcogar79@gmail.com)  
🔗 LinkedIn: [linkedin.com/in/alfonso-cocinas](https://linkedin.com/in/alfonso-cocinas)  
🐙 GitHub: [github.com/acocinas](https://github.com/acocinas)


### 📌 License
This project is for educational purposes only. Not intended for commercial use.
