# Recipe Manager

A full-stack web application to create, manage, and share recipes seamlessly. Built with the **MERN stack** (MongoDB, Express.js, React, Node.js), it features user authentication, recipe CRUD operations, likes, comments, and user-follow functionalities, providing an engaging culinary experience.

---

## Features

* **User Authentication** – Secure sign-up and login with JWT-based sessions.
* **Recipe Management** – Create, read, update, and delete recipes.
* **Interactive Engagement** – Like and comment on recipes, follow other users.
* **Responsive Design** – Works smoothly on desktop and mobile devices.
* **Real-time Updates** – Immediate feedback on actions without page reloads.

---

## Tech Stack

* **Frontend:** React.js, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **Styling:** tailwind CSS Modules / Styled Components
* **State Management:** React Context API / Redux

---

## Installation

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Backend Setup

```bash
git clone https://github.com/Rohit03022006/Recipe-Manager.git
cd Recipe-Manager/backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend server:

```bash
npm start
```

Open your browser at [http://localhost:3000](http://localhost:3000).

---

## Running Tests

* **Backend tests:**

```bash
cd backend
npm test
```

* **Frontend tests:**

```bash
cd frontend
npm test
```

---

## API Endpoints

### User Routes (`/api/users`)

* `POST /register` – Register a new user
* `POST /login` – Login and get JWT
* `GET /user` – Get current user info (protected)

### Recipe Routes (`/api/recipes`)

* `POST /newRecipe` – Create new recipe (protected)
* `GET /` – Get all recipes (protected)
* `GET /:id` – Get recipe by ID (protected)
* `GET /user/:userId` – Get recipes by user (protected)
* `POST /save/:recipeId` – Save recipe (protected)
* `GET /savedRecipes/:userId` – Get saved recipes (protected)
* `PUT /:id` – Update recipe (protected)
* `DELETE /:id` – Delete recipe (protected)

### Test Routes

* `GET /api/test` – API working
* `POST /api/test` – POST working

---

## Screenshots

| Page          | Screenshot                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| About         | ![About](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/about.png)                 |
| Home/Base     | ![Home](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/base.png)                   |
| Create Recipe | ![Create Recipe](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/create-recipe.png) |
| Login         | ![Login](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/login.png)                 |
| Profile       | ![Profile](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/profile.png)             |
| Register      | ![Register](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/register.png)           |

---

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit (`git commit -am 'Add new feature'`)
5. Push (`git push origin feature/your-feature`)
6. Create a Pull Request

---

## Contact

* **Email:** [kumarrohit67476@gmail.com](mailto:kumarrohit67476@gmail.com)
* **GitHub:** [@Rohit03022006](https://github.com/Rohit03022006)

