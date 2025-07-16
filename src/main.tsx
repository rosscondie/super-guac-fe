import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Post } from './components/Post.tsx';
import { PhotoList } from './components/PhotoList.tsx';
import { Photo } from './components/Photo.tsx';
import { Layout } from './components/Layout.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { ErrorPage } from './components/ErrorPage.tsx';
import { NotFound } from './components/NotFound.tsx';
import { AboutPage } from './components/AboutPage.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/posts/:slug',
        element: <Post />,
      },
      {
        path: '/photos',
        element: <PhotoList />,
      },
      {
        path: '/photos/:filename',
        element: <Photo />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
