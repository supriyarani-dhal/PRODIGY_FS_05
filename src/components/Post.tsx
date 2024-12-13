import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { users, currentUser, likePost, addComment } = useApp();
  const [comment, setComment] = useState('');
  const author = users.find((u) => u.id === post.userId);
  const isLiked = currentUser && post.likes.includes(currentUser.id);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(post.id, comment.trim());
    setComment('');
  };

  if (!author) return null;

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <div className="font-semibold">{author.name}</div>
            <div className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <p className="mb-4">{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg mb-4"
          />
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-gray-500">
          <button
            onClick={() => likePost(post.id)}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-red-500' : ''
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes.length}</span>
          </button>
          <button className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {post.comments.length > 0 && (
        <div className="border-t border-gray-100 p-4">
          {post.comments.map((comment) => {
            const commentAuthor = users.find((u) => u.id === comment.userId);
            if (!commentAuthor) return null;

            return (
              <div key={comment.id} className="flex items-start mb-4 last:mb-0">
                <img
                  src={commentAuthor.avatar}
                  alt={commentAuthor.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-3">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="font-semibold text-sm">{commentAuthor.name}</div>
                    <div className="text-sm">{comment.content}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <form onSubmit={handleComment} className="border-t border-gray-100 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}