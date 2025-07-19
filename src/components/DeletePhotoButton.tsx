import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { DeletePhotoModal } from './DeletePhotoModal';

export const DeletePhotoButton = ({
  filename,
  onDelete,
}: {
  filename: string;
  onDelete: (filename: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={`Delete photo ${filename}`}
      >
        <Trash className="w-5 h-5" />
      </Button>
      <DeletePhotoModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => onDelete(filename)}
      />
    </>
  );
};
