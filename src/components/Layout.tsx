import { Link, Outlet, useNavigate } from 'react-router';
import { ModeToggle } from './ModeToggle';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { LogoutButton } from './LogoutButton';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';

export const Layout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-card text-card-foreground shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl">
            ryl0p3z
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/photos" className="hover:text-primary transition-colors">
              Photography
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <ModeToggle />

            {isAuthenticated ? (
              <LogoutButton />
            ) : (
              <Button
                className="hover: cursor-pointer"
                onClick={() => navigate('/login')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-64px-64px)] container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-muted text-muted-foreground text-center py-4 text-sm">
        © All photos are copyrighted {new Date().getFullYear()} - Built with ❤️
        and ☕️
      </footer>
    </>
  );
};
