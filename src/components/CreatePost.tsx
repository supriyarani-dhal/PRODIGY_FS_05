import React, { useState } from 'react';
import { Image, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function CreatePost() {
  const { addPost, currentUser } = useApp();
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !content.trim()) return;

    addPost({
      userId: currentUser.id,
      content: content.trim(),
      image: image.trim() || undefined,
      likes: [],
      comments: [],
      tags,
    });

    setContent('');
    setImage('');
    setTags([]);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags((prev) => [...new Set([...prev, tagInput.trim()])]);
      setTagInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      
      <div className="mt-2">
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Add tags (press Enter)"
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Image className="w-5 h-5 text-gray-500" />
          <Tag className="w-5 h-5 text-gray-500" />
        </div>
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </form>
  );
}