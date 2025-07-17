import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { logout } = useContext(AuthContext);

  return (
    <Button onClick={logout} className="btn-logout hover:cursor-pointer">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
