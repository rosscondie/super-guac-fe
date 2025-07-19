import { Link, useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { BACKEND_ORIGIN, API_URL } from '../lib/config';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useTheme } from './ThemeProvider';
import { toast } from 'sonner';
import { Pencil, Upload } from 'lucide-react';
import { DeletePhotoButton } from './DeletePhotoButton';
import { Spinner } from './ui/spinner';

type Photo = {
  filename: string;
  url: string;
  size: number;
};

type AlbumMetadata = {
  title: string;
  cover?: string;
};

export const AlbumDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [metadata, setMetadata] = useState<AlbumMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const fetchPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const res = await fetch(`${API_URL}/albums/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch album photos');
      const photosData = await res.json();

      setPhotos(photosData.photos ?? []);
      setMetadata(photosData.metadata || { title: slug || 'Album' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPhotos(false);
      setLoading(false); // keep your existing loading state as well
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [slug]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !slug) return;

    const formData = new FormData();
    for (const file of files) {
      formData.append('photo', file);
    }

    try {
      const res = await fetch(`${API_URL}/albums/${slug}/photos`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload photos');
      toast.success('Photos uploaded!');
      fetchPhotos();
    } catch (err) {
      toast.error('Upload failed.');
      console.error(err);
    }
  };

  const handleDeletePhoto = async (filename: string) => {
    if (!slug || !token) return;

    try {
      const res = await fetch(`${API_URL}/albums/${slug}/photos/${filename}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete photo');

      setOpenIndex(null);
      toast.success('Photo deleted');
    } catch (err) {
      toast.error('Delete failed.');
      console.error(err);
    }
  };

  if (loading || loadingPhotos)
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner size="large" />
        <p className="mt-4 text-lg">Loading album...</p>
      </div>
    );

  const slides = photos.map((photo) => ({
    src: `${BACKEND_ORIGIN}${photo.url}`,
    alt: photo.filename,
  }));

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">{metadata?.title || slug}</h1>

        {isLoggedIn && !isAdmin && (
          <Link
            to={`/admin/photos/${slug}`}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Pencil className="w-4 h-4" />
            Edit Album
          </Link>
        )}

        {isAdmin && token && (
          <label className="cursor-pointer inline-flex items-center gap-2 text-sm px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition">
            <Upload className="h-5 w-5" />
            Upload Photos
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        )}
      </div>

      <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-2 space-y-4">
        {photos.map(({ filename, url }, index) => (
          <button
            key={filename}
            onClick={() => setOpenIndex(index)}
            className="block w-full break-inside-avoid focus:outline-none"
            aria-label={`Open photo ${filename}`}
          >
            <div className="relative group">
              <img
                src={`${BACKEND_ORIGIN}${url}`}
                alt={filename}
                className="w-full h-auto rounded-md object-cover transition-transform hover:scale-105 cursor-zoom-in"
              />

              {isAdmin && token && (
                <DeletePhotoButton
                  filename={filename}
                  onDelete={handleDeletePhoto}
                />
              )}
            </div>
          </button>
        ))}
      </section>

      {isAdmin && token && photos.length === 0 && (
        <div className="text-center text-zinc-500 py-12">
          This album is empty. Add some photos!
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          open
          close={() => setOpenIndex(null)}
          index={openIndex}
          slides={slides}
          styles={{
            root: {
              '--yarl__color_backdrop':
                theme === 'dark'
                  ? 'rgba(0, 0, 0, 0.9)'
                  : 'rgba(255, 255, 255, 0.9)',
              '--yarl__color_button': theme === 'dark' ? 'white' : '#111',
              '--yarl__color_button_active': theme === 'dark' ? '#888' : '#666',
              '--yarl__color_button_hover': theme === 'dark' ? '#ccc' : '#444',
            },
            button: {
              filter: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
              transition: 'color 0.2s ease-in-out',
            },
          }}
        />
      )}
    </>
  );
};
