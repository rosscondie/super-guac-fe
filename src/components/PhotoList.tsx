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

export const PhotoList = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`${API_URL}/photos`);
        if (!res.ok) throw new Error('Failed to fetch photos');
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <p>Loading photos...</p>;

  const slides = photos.map((photo) => ({
    src: `${BACKEND_ORIGIN}${photo.url}`,
    alt: photo.filename,
  }));

  return (
    <>
      <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 space-y-4">
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
              className="w-full h-auto rounded-md object-cover transition-transform hover:scale-105 cursor-pointer"
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
