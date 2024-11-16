import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorRoute from './components/Error';
import MainLayout from './layout/MainLayout';
import Register from "./(auth)/Register"
import Login from "./(auth)/Login";
import Users from './pages/Products';
import ProtectedRoute from './(auth)/ProtectedRoute';
import Home from './components/Home';
import Contact from './pages/Contact';
import SingleCategory from './components/common/category/SingleCategory';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "categories",
        element:<ProtectedRoute><SingleCategory /></ProtectedRoute> ,
        loader: ({ request,params }) => {
          const url = new URL(request.url); 
          console.log(params);
          
          const category = url.searchParams.get('category');
          if (!isNaN(Number(category))) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "/catgory",
        element: <Contact />,
      },
      {
        path: "/register",
        element: <Register />,
      }, {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
   
    ],
  },
]);
export default function App(){
 return <RouterProvider router={router} />
}

