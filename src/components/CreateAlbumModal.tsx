import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/config';

export const CreateAlbumModal = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    const res = await fetch(`${API_URL}/albums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, slug }),
    });

    if (res.ok) {
      setName('');
      setSlug('');
      alert('Album created!'); // swap with toast if needed
    } else {
      const errorText = await res.text();
      console.error('Failed to create album:', res.status, errorText);
      alert('Failed to create album');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer">Create Album</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Album</DialogTitle>
          <DialogDescription>
            Give your album a name and optional slug.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium">Album Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Optional — auto-generated from name"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
