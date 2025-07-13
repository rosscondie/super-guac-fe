import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API_URL } from '../lib/config';

type Post = {
  title: string;
  date: string;
  slug: string;
  html: string;
};

export const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  function formatDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/posts/${slug}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <span className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-current mx-auto mb-4" />
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-8 text-center text-destructive font-semibold">
        Post not found.
      </div>
    );
  }

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
        <time className="text-sm text-muted-foreground">
          {formatDate(post.date)}
        </time>
      </header>
      <section dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
};
