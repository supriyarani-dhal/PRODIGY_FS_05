import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Notification } from '../types';
import { generateMockData } from '../utils/mockData';

interface AppContextType {
  currentUser: User | null;
  posts: Post[];
  notifications: Notification[];
  users: User[];
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  followUser: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const { mockUsers, mockPosts, mockNotifications } = generateMockData();
    setUsers(mockUsers);
    setPosts(mockPosts);
    setNotifications(mockNotifications);
    setCurrentUser(mockUsers[0]);
  }, []);

  const addPost = (post: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && currentUser) {
          const likes = post.likes.includes(currentUser.id)
            ? post.likes.filter((id) => id !== currentUser.id)
            : [...post.likes, currentUser.id];
          return { ...post, likes };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: Math.random().toString(36).substr(2, 9),
            userId: currentUser.id,
            content,
            createdAt: new Date(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  const followUser = (userId: string) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === currentUser.id) {
          const following = user.following.includes(userId)
            ? user.following.filter((id) => id !== userId)
            : [...user.following, userId];
          return { ...user, following };
        }
        if (user.id === userId) {
          const followers = user.followers.includes(currentUser.id)
            ? user.followers.filter((id) => id !== currentUser.id)
            : [...user.followers, currentUser.id];
          return { ...user, followers };
        }
        return user;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        posts,
        notifications,
        users,
        addPost,
        likePost,
        addComment,
        followUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};