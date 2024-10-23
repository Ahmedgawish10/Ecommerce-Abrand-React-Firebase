import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './components/Home';
import Error from './components/Error';
// import Test from './components/Test';
import MainLayout from './components/MainLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
   
    ],
  },
]);
export default function App(){
 return <RouterProvider router={router} />
}

