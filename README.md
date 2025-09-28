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
* **Styling:** Tailwind CSS
* **State Management:** React Context API
* **Containerization:** Docker, Docker Compose

---

## Installation

### Method 1: Traditional Setup (Development)

#### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/) (local or cloud instance)

#### Backend Setup

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

#### Frontend Setup

```bash
cd ./frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend server:

```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173).

### Method 2: Docker Setup (Recommended)

#### Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

#### Quick Start with Docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rohit03022006/Recipe-Manager.git
   cd Recipe-Manager
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Atlas connection string
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipe-manager?retryWrites=true&w=majority
   
   # JWT Secret Key
   JWT_SECRET=your_super_secret_jwt_key_change_in_production

   # FRONTEND_URL
   FRONTEND_URL=http://localhost:5173
   ```

3. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

#### Docker Commands

```bash
# Start services in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

#### Docker Configuration

The project includes the following Docker files:

- `docker-compose.yml` - Multi-container configuration
- `backend/Dockerfile` - Backend service definition
- `frontend/Dockerfile` - Frontend service definition
- `.dockerignore` - Files to exclude from Docker builds

## Running Tests

* **Backend tests:**

```bash
cd backend
npm test
```

* **Backend tests with Docker:**
```bash
docker-compose exec backend npm test
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

| Page | Description | Screenshot |
|------|-------------|------------|
| **Home/Base** | Main landing page | ![Home](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/base.png) |
| **Login** | User authentication | ![Login](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/login.png) |
| **Register** | New user signup | ![Register](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/register.png) |
| **Create Recipe** | Recipe creation interface | ![Create Recipe](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/create-recipe.png) |
| **Profile** | User profile management | ![Profile](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/profile.png) |
| **About** | Application information | ![About](https://github.com/Rohit03022006/Recipe-Manager/blob/main/Images/Web/about.png) |

---

## Database Configuration

### Using MongoDB Atlas (Recommended)
1. Create a [MongoDB Atlas](https://www.mongodb.com/atlas) account
2. Create a cluster and database
3. Get your connection string
4. Update the `MONGO_URI` in your `.env` file

### Using Local MongoDB
```bash
# Install MongoDB locally
# Update MONGO_URI in .env to:
MONGO_URI=mongodb://localhost:27017/recipe-manager
```

---

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit (`git commit -am 'Add new feature'`)
5. Push (`git push origin feature/your-feature`)
6. Create a Pull Request

### Development with Docker
```bash
# For active development with file watching
docker-compose up --build

# The application supports hot-reload for both frontend and backend
```

---

## Troubleshooting

### Common Docker Issues

1. **Port already in use:**
   ```bash
   # Stop any services using ports 5173 or 5000
   sudo lsof -i :5173
   sudo lsof -i :5000
   ```

2. **Build failures:**
   ```bash
   # Clear Docker cache
   docker-compose build --no-cache
   ```

3. **Environment variables not loading:**
   - Ensure `.env` file is in the root directory
   - Check variable names match those in docker-compose.yml

### Database Connection Issues
- Verify your MongoDB Atlas connection string
- Ensure IP is whitelisted in MongoDB Atlas network settings
- Check database user permissions

---

## Contact

* **Email:** [kumarrohit67476@gmail.com](mailto:kumarrohit67476@gmail.com)
* **GitHub:** [@Rohit03022006](https://github.com/Rohit03022006)

---

**Happy Cooking!**