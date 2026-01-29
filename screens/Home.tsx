
import React, { useState } from 'react';
import { Post, Category } from '../types';
import { CATEGORIES } from '../constants';
import ReviewCard from '../components/ReviewCard';
import { SlidersHorizontal } from 'lucide-react';

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filteredPosts = posts.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  return (
    <div className="px-5 pt-6 pb-20">
      <header className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Explore Feed</h2>
          <p className="text-slate-500 text-sm">Discover honest travel insights</p>
        </div>
        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600">
          <SlidersHorizontal size={20} />
        </button>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-5 px-5 no-scrollbar">
        <button 
          onClick={() => setActiveCategory('All')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'All' ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}
          >
            {cat}s
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <ReviewCard key={post.id} post={post} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
             <span className="text-5xl mb-4">🏜️</span>
             <p className="text-slate-600 font-medium">No experiences found for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
