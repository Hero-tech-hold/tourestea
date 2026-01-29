
import { Category, Post } from './types';

export const CATEGORIES: Category[] = [
  'Hotel', 'Train', 'Flight', 'Taxi', 'Tour', 'Restaurant', 'Other'
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Sarah Jenkins',
    userPhoto: 'https://picsum.photos/seed/sarah/100/100',
    category: 'Hotel',
    serviceName: 'The Grand Palace Resort',
    rating: 5,
    sentiment: 'Good',
    description: 'Absolutely incredible stay! The staff went above and beyond for our anniversary. The ocean view from the suite was breathtaking. Highly recommend the breakfast buffet!',
    images: ['https://picsum.photos/seed/hotel1/800/400', 'https://picsum.photos/seed/hotel2/800/400'],
    location: 'Bali, Indonesia',
    helpfulCount: 24,
    createdAt: Date.now() - 86400000 * 2,
    comments: []
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Marco Rossi',
    userPhoto: 'https://picsum.photos/seed/marco/100/100',
    category: 'Train',
    serviceName: 'Eurostar Brussels to London',
    rating: 2,
    sentiment: 'Bad',
    description: 'Train was delayed by 3 hours with very little communication. The air conditioning was broken in coach 7. Very cramped and unhappy journey.',
    images: ['https://picsum.photos/seed/train1/800/400'],
    location: 'Brussels, Belgium',
    helpfulCount: 15,
    createdAt: Date.now() - 86400000 * 5,
    comments: []
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Liam Chen',
    userPhoto: 'https://picsum.photos/seed/liam/100/100',
    category: 'Flight',
    serviceName: 'SkyHigh Airways SH402',
    rating: 4,
    sentiment: 'Good',
    description: 'Smooth flight, great legroom in economy. The food was surprisingly edible and the entertainment selection was vast.',
    images: [],
    location: 'Singapore Changi',
    helpfulCount: 8,
    createdAt: Date.now() - 3600000 * 4,
    comments: []
  }
];
