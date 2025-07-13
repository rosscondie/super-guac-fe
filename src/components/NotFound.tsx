import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2 text-[var(--color-foreground)]">
        404 – Page Not Found
      </h1>
      <p className="text-[var(--color-muted-foreground)] mb-6">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link
        to="/"
        className="text-sm font-medium text-[var(--color-primary)] hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
};
