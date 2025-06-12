import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DirectoryView from "./DirectoryView.jsx";
import Home from "./home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ContactPage from "./ContactPage.jsx";
import AboutPage from "./AboutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", 
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
  ,
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/storage",
    element: <DirectoryView />,
  },
  {
    path: "directory/:dirId",
    element: <DirectoryView />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
