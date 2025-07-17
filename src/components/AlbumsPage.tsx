import { useEffect, useState } from 'react';
import { BACKEND_ORIGIN, API_URL } from '../lib/config';
import { useNavigate } from 'react-router';

type Album = {
  name: string;
  slug: string;
  cover: string;
};

export const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <p className="p-4">Loading albums...</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {albums.map((album) => (
        <button
          key={album.slug}
          onClick={() => navigate(`/photos/${album.slug}`)}
          className="text-left group hover:cursor-pointer"
          aria-label={`Open album ${album.name}`}
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg shadow hover:shadow-md transition">
            <img
              src={`${BACKEND_ORIGIN}${album.cover}`}
              alt={album.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h2 className="mt-2 text-base font-semibold">{album.name}</h2>
        </button>
      ))}
    </section>
  );
};
