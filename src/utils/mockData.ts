import { User, Post, Notification } from '../types';

export function generateMockData() {
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Software developer by day, musician by night',
      followers: [],
      following: [],
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: 'Travel enthusiast | Photography lover',
      followers: [],
      following: [],
    },
  ];

  const mockPosts: Post[] = [
    {
      id: '1',
      userId: '2',
      content: 'Just visited this amazing place! 🌄',
      image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop',
      likes: [],
      comments: [],
      tags: ['travel', 'photography'],
      createdAt: new Date(),
    },
  ];

  const mockNotifications: Notification[] = [];

  return { mockUsers, mockPosts, mockNotifications };
}