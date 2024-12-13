import React from 'react';
import { useApp } from '../context/AppContext';
import { Post } from './Post';
import { CreatePost } from './CreatePost';

export function Feed() {
  const { posts } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}