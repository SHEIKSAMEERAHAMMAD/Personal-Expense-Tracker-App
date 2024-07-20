import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from "./pages/Home/Home";
import SignUp from "./pages/Users/Register/SignUp"
import SignIn from "./pages/Users/Login/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <h1>App</h1>
      <RouterProvider router={route} />
    </>
  );
};

export default App;
