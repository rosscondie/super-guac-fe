import { useEffect, useState, useContext } from 'react';
import { BACKEND_ORIGIN, API_URL } from '../lib/config';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import { DeleteAlbumModal } from './DeleteAlbumModal';
import { Button } from './ui/button';
import { AuthContext } from '../components/AuthContext'; // Adjust path if needed

type Album = {
  name: string;
  slug: string;
  cover: string;
  createdAt?: string;
};

export const AlbumsPage = () => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`${API_URL}/albums`);
        if (!res.ok) throw new Error('Failed to fetch albums');
        const data = await res.json();
        setAlbums(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const openDeleteModal = (album: Album) => {
    setAlbumToDelete(album);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!albumToDelete || !isAuthenticated || !token) {
      toast.error('You must be logged in to delete albums.');
      setDeleteModalOpen(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/albums/${albumToDelete.slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete album');

      setAlbums((prev) =>
        prev.filter((album) => album.slug !== albumToDelete.slug),
      );
      toast.success('Album deleted successfully');
    } catch (err) {
      toast.error('Failed to delete album');
      console.error(err);
    } finally {
      setDeleteModalOpen(false);
      setAlbumToDelete(null);
    }
  };

  if (loading) return <p className="p-4">Loading albums...</p>;

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {albums.map((album) => (
          <div
            key={album.slug}
            className="group relative flex flex-col text-center"
          >
            <button
              onClick={() => navigate(`/photos/${album.slug}`)}
              className="w-full hover: cursor-pointer"
              aria-label={`Open album ${album.name}`}
            >
              <div className="aspect-square w-full overflow-hidden shadow hover:shadow-md transition">
                <img
                  src={`${BACKEND_ORIGIN}${album.cover}`}
                  alt={album.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h2 className="mt-2 text-base font-semibold">{album.name}</h2>
              {album.createdAt && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {album.createdAt}
                </p>
              )}
            </button>

            {isAuthenticated && (
              <Button
                onClick={() => openDeleteModal(album)}
                aria-label={`Delete album ${album.name}`}
                className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition"
                title="Delete Album"
                variant="destructive"
                size="sm"
              >
                <Trash className="w-5 h-5" />
              </Button>
            )}
          </div>
        ))}
      </section>

      {albumToDelete && (
        <DeleteAlbumModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
          albumName={albumToDelete.name}
        />
      )}
    </>
  );
};
