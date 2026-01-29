
import React, { useState, useMemo } from 'react';
import { Post } from '../types';
import ReviewCard from '../components/ReviewCard';
// Added Star to the imports from lucide-react
import { Search as SearchIcon, X, TrendingUp, History, Star } from 'lucide-react';

interface SearchProps {
  posts: Post[];
}

const Search: React.FC<SearchProps> = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return posts.filter(p => 
      p.serviceName.toLowerCase().includes(lower) || 
      p.location.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
    );
  }, [query, posts]);

  const stats = useMemo(() => {
    if (filteredPosts.length === 0) return null;
    const goodCount = filteredPosts.filter(p => p.sentiment === 'Good').length;
    const avgRating = filteredPosts.reduce((a, b) => a + b.rating, 0) / filteredPosts.length;
    return {
      goodPercent: Math.round((goodCount / filteredPosts.length) * 100),
      avgRating: avgRating.toFixed(1),
      total: filteredPosts.length
    };
  }, [filteredPosts]);

  return (
    <div className="px-5 pt-8 pb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Search</h2>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-slate-400 group-focus-within:text-teal-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search hotels, airlines, cities..." 
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-sm"
          />
          {query && (
            <button 
              onClick={() => {setQuery(''); setShowResults(false);}}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-500"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-teal-600" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Popular Destinations</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Bali', 'Tokyo', 'London', 'Paris', 'New York', 'Singapore'].map(city => (
                <button 
                  key={city}
                  onClick={() => {setQuery(city); setShowResults(true);}}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-600 transition-colors border border-slate-100"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <History size={16} className="text-slate-400" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Searches</h3>
            </div>
            <div className="space-y-3">
              {['British Airways', 'Marriott', 'Shinkansen'].map(item => (
                <div 
                  key={item} 
                  onClick={() => {setQuery(item); setShowResults(true);}}
                  className="flex items-center justify-between py-2 text-sm font-bold text-slate-400 hover:text-teal-600 cursor-pointer transition-colors"
                >
                  <span>{item}</span>
                  <History size={14} className="opacity-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {stats && (
             <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                   <SearchIcon size={120} />
                </div>
                <div className="z-10">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400 mb-1">Consensus for "{query}"</p>
                   <div className="flex items-end gap-2">
                     <span className="text-4xl font-black">{stats.goodPercent}%</span>
                     <span className="text-xs font-medium text-slate-400 mb-1.5">Positive Experience</span>
                   </div>
                </div>
                <div className="text-right z-10">
                   <div className="flex items-center gap-1 justify-end text-yellow-400 mb-1">
                      <Star size={16} className="fill-yellow-400" />
                      <span className="text-xl font-black text-white">{stats.avgRating}</span>
                   </div>
                   <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">From {stats.total} reviews</p>
                </div>
             </div>
          )}

          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => <ReviewCard key={post.id} post={post} />)
            ) : (
              <div className="py-20 text-center opacity-40">
                <span className="text-5xl block mb-4">🔍</span>
                <p className="text-slate-600 font-medium italic">We couldn't find any reviews for that.</p>
                <button 
                  onClick={() => setQuery('')}
                  className="mt-4 text-teal-600 font-bold underline"
                >
                  Try a different search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
