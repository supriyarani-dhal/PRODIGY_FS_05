export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  tags: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow';
  targetId: string;
  read: boolean;
  createdAt: Date;
}