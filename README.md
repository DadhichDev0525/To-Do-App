# To-Do App

## 📌 Overview
This is a full-stack To-Do App built using React and Node.js. The app allows users to manage their tasks efficiently by adding, editing, and deleting to-dos and their corresponding sub-todos. It also integrates weather data for tasks related to outdoor activities.

## 🛠️ Tech Stack
### Frontend:
- React.js (Vite)
- Tailwind CSS
- Redux (with Redux Persist for state management)

### Backend:
- Node.js with ES Modules
- Express.js
- MongoDB (for storing user-specific to-dos)

### Authentication:
- User Signup, Login, and Logout
- JWT-based authentication

### Additional Features:
- Sub-todos stored in a separate collection
- OpenWeather API integration to display weather for relevant tasks

---

## 🚀 Features
- **User Authentication**: Secure login, signup, and logout.
- **Task Management**: Add, edit, delete tasks and sub-tasks.
- **State Persistence**: Tasks persist using Redux Persist.
- **Weather Integration**: If a task involves an outdoor activity, current weather conditions are displayed.
- **Responsive Design**: Optimized for mobile and desktop views.

---

## 📦 Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/DadhichDev0525/To-Do-App.git
cd TODO
```

### 2️⃣ Install dependencies
#### Frontend:
```sh
cd frontend
npm install
```
#### Backend:
```sh
cd backend
npm install
```

### 3️⃣ Set up Environment Variables
Create a `.env` file in the **server** directory and add the following:
```
MONGO_URI=mongodb+srv://madhavdadheech57:Madhav%402505@todo-cluster.j6djeem.mongodb.net/
JWT_SECRET=8c1b6c8793791ace07c9e38b31540e52303ec4fe19bc7f7167ddb7c176c76fb2
WEATHER_API_KEY=05462b0840cb004251dac80b253fa47a
```

### 4️⃣ Start the Development Server
#### Backend:
```sh
cd backend
npm run dev
```
#### Frontend:
```sh
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173/`.

---

## 📡 API Endpoints
### 🔹 **Authentication**
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user and return JWT

### 🔹 **To-Dos**
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Edit a todo
- `DELETE /api/todos/:id` - Delete a todo

### 🔹 **Sub-Todos**
- `POST /api/subtodos` - Create a new sub-todo
- `DELETE /api/subtodos/:id` - Delete a sub-todo

### 🔹 **Weather Integration**
- `GET /api/weather?city={city}` - Fetch weather data for a specific city

---

## 💡 Contribution Guidelines
1. **Fork the repository** and create a new branch.
2. **Make changes** and test them locally.
3. **Submit a pull request** with a detailed description of the changes.

---

## 📝 License
This project is licensed under the MIT License.

---

## 📬 Contact
For any queries or feedback, feel free to reach out!

---

🔗 **GitHub Repository**: https://github.com/DadhichDev0525/To-Do-App

