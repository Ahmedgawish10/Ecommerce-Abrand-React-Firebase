import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './components/Home';
import ErrorRoute from './components/Error';
import MainLayout from './layout/MainLayout';
import Register from "./(auth)/Register"
import Login from "./(auth)/Login";
import Users from './components/Users';
import ProtectedRoute from './(auth)/ProtectedRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "test/:prefix",
        element:<ProtectedRoute><Users /></ProtectedRoute> ,
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "/register",
        element: <Register />,
      }, {
        path: "/login",
        element: <Login />,
      },
   
    ],
  },
]);
export default function App(){
 return <RouterProvider router={router} />
}

