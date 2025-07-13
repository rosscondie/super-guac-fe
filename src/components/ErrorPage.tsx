import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-4">
        Something went wrong
      </h1>
      {isRouteErrorResponse(error) ? (
        <>
          <p className="text-[var(--color-muted-foreground)] mb-2">
            {error.status} – {error.statusText}
          </p>
        </>
      ) : (
        <p className="text-[var(--color-muted-foreground)] mb-2">
          Unexpected error occurred.
        </p>
      )}
      <Link
        to="/"
        className="text-sm font-medium text-[var(--color-primary)] hover:underline"
      >
        ← Go back home
      </Link>
    </div>
  );
};
