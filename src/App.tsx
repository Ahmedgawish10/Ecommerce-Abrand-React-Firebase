import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorRoute from './components/Error';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './(auth)/ProtectedRoute';

// lazy imports for components
const Register = React.lazy(() => import('./(auth)/Register'));
const Login = React.lazy(() => import('./(auth)/Login'));
const Home = React.lazy(() => import('./components/Home'));
const Contact = React.lazy(() => import('./pages/Contact'));
const SingleCategory = React.lazy(() =>import('./components/common/category/SingleCategory'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: (
            <Home />
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading Category...</div>}>
              <SingleCategory />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: ({ request, params }) => {
          const url = new URL(request.url);
          const category = url.searchParams.get('category');
          if (!isNaN(Number(category))) {
            throw new Response('Bad Request', {
              statusText: 'Category not found',
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: '/catgory',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<div>Loading Register...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<div>Loading Contact...</div>}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}


