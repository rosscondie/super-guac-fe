import { Link } from 'react-router';

export type Post = {
  title: string;
  slug: string;
  summary: string;
  date: string;
};

type PostListProps = {
  posts: Post[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="px-4 md:px-0">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-foreground)] dark:text-[var(--color-card-foreground)]">
        Blog Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(({ title, slug, summary, date }) => (
          <article
            key={slug}
            className="rounded-xl bg-[var(--color-card)] dark:bg-[var(--color-card)] shadow-md p-5 flex flex-col hover:shadow-lg transition-shadow duration-200"
          >
            <header className="mb-4">
              <h3 className="text-xl font-semibold mb-1 text-black dark:text-white">
                {title}
              </h3>
              <time className="text-xs mb-2 text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)]">
                {date}
              </time>
              <p
                className="text-sm overflow-hidden text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)]"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {summary}
              </p>
            </header>
            <div className="flex justify-end mt-auto">
              <Link
                to={`/posts/${slug}`}
                className="text-[var(--color-foreground)] dark:text-[var(--color-foreground)] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
