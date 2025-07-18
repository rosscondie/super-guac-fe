import { CreateAlbumModal } from '@/components/CreateAlbumModal';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <div className="space-x-4">
        <CreateAlbumModal />
        <Button onClick={() => navigate('/admin/upload-photo')}>
          Upload Photos
        </Button>
      </div>
    </div>
  );
};
