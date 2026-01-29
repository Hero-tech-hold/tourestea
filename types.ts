
export type Category = 'Hotel' | 'Train' | 'Flight' | 'Taxi' | 'Tour' | 'Restaurant' | 'Other';
export type Sentiment = 'Good' | 'Bad';

export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  country?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  category: Category;
  serviceName: string;
  rating: number;
  sentiment: Sentiment;
  description: string;
  images: string[];
  location: string;
  helpfulCount: number;
  createdAt: number;
  comments: Comment[];
}

export interface AppState {
  posts: Post[];
  currentUser: User | null;
  isAuthenticated: boolean;
}
