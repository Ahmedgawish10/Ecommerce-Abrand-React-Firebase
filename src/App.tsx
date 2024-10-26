import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './components/Home';
import ErrorRoute from './components/Error';
import MainLayout from './layout/MainLayout';
import Register from "./(auth)/Register"
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        path: "Test/:prefix",
        element: <Home />,
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
   
    ],
  },
]);
export default function App(){
 return <RouterProvider router={router} />
}

