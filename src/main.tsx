import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Post } from './components/Post.tsx';
import { Photo } from './components/Photo.tsx';
import { Layout } from './components/Layout.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { ErrorPage } from './components/ErrorPage.tsx';
import { NotFound } from './components/NotFound.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { AlbumsPage } from './components/AlbumsPage.tsx';
import { AlbumDetailPage } from './components/AlbumDetailPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { Toaster } from 'sonner';

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
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/posts/:slug',
        element: <Post />,
      },
      {
        path: '/photos',
        element: <AlbumsPage />,
      },
      {
        path: '/photos/:slug',
        element: <AlbumDetailPage />,
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
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/photos/:slug',
        element: (
          <ProtectedRoute>
            <AlbumDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  </AuthProvider>,
);
