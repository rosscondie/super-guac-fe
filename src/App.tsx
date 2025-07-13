import { useEffect, useState } from 'react';
import { PostList } from './components/PostList';
import type { Post } from './components/PostList';
import { API_URL } from './lib/config';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div className="text-2xl">
      <h1>Welcome to my blog</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default App;
