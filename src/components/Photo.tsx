import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { BACKEND_ORIGIN } from '../lib/config';

export const Photo = () => {
  const { slug, filename } = useParams<{ slug: string; filename: string }>();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (slug && filename) {
      setPhotoUrl(`${BACKEND_ORIGIN}/photos/${slug}/${filename}`);
    }
  }, [slug, filename]);

  if (!photoUrl) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img
        src={photoUrl}
        alt={filename}
        className="w-full h-auto rounded-md shadow-lg"
      />
    </div>
  );
};
