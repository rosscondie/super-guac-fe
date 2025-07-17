import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { BACKEND_ORIGIN, API_URL } from '../lib/config';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useTheme } from './ThemeProvider';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`${API_URL}/albums/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch album photos');
        const photosData = await res.json();

        setPhotos(photosData);

        setMetadata({ title: slug || 'Album' });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [slug]);

  if (loading) return <p>Loading album...</p>;

  const slides = photos.map((photo) => ({
    src: `${BACKEND_ORIGIN}${photo.url}`,
    alt: photo.filename,
  }));

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{metadata?.title || slug}</h1>

      <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-2 space-y-4">
        {photos.map(({ filename, url }, index) => (
          <button
            key={filename}
            onClick={() => setOpenIndex(index)}
            className="block w-full break-inside-avoid focus:outline-none"
            aria-label={`Open photo ${filename}`}
          >
            <img
              src={`${BACKEND_ORIGIN}${url}`}
              alt={filename}
              className="w-full h-auto rounded-md object-cover transition-transform hover:scale-105 cursor-zoom-in"
            />
          </button>
        ))}
      </section>

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
