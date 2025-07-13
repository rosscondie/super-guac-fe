import { Outlet } from 'react-router';
import { ModeToggle } from './ModeToggle';

export const Layout = () => {
  return (
    <>
      <nav className="bg-card text-card-foreground shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <a href="/" className="font-bold text-xl">
            My Photo Blog
          </a>
          <div className="flex items-center space-x-6">
            <a href="/" className="hover:text-primary transition-colors">
              Blog
            </a>
            <a href="/photos" className="hover:text-primary transition-colors">
              Photography
            </a>
            <a href="/about" className="hover:text-primary transition-colors">
              About
            </a>
            <ModeToggle />
          </div>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-64px-64px)] container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-muted text-muted-foreground text-center py-4 text-sm">
        © {new Date().getFullYear()} My Photo Blog — Built with ❤️ and ☕️
      </footer>
    </>
  );
};
