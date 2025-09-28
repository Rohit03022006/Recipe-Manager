import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from './components/custom/Header.jsx';
import Login from './components/features/auth/Login.jsx';
import Register from './components/features/auth/Register.jsx';
import Profile from './components/pages/Profile.jsx';
import About from './components/features/about/About.jsx';
import CreateRecipe from './components/features/recipes/CreateRecipe.jsx';
import EditProfile from './components/features/auth/EditProfile.jsx';
import EditRecipe from './components/features/recipes/EditRecipe.jsx';
import RecipeDetails from './components/features/recipes/RecipeDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/create-recipe",
    element: <CreateRecipe />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/edit-recipe/:id",
    element: <EditRecipe />,
  },
  {
    path: "/recipe/:id", 
    element: <RecipeDetails />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
  </StrictMode>,
)