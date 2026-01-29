
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { Star, MapPin, ThumbsUp, MessageSquare } from 'lucide-react';

interface ReviewCardProps {
  post: Post;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-4 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <img src={post.userPhoto} alt={post.userName} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">{post.userName}</h4>
              <div className="flex items-center text-[10px] text-slate-400">
                <MapPin size={10} className="mr-1" /> {post.location}
              </div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${post.sentiment === 'Good' ? 'sentiment-good' : 'sentiment-bad'}`}>
            {post.sentiment}
          </span>
        </div>

        <div className="mb-2">
          <h3 className="text-base font-bold text-slate-900 mb-1">{post.serviceName}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < post.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} 
              />
            ))}
            <span className="text-xs text-slate-400 ml-1">({post.category})</span>
          </div>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>

        {post.images.length > 0 && (
          <div className="relative h-40 w-full mb-3 rounded-xl overflow-hidden">
            <img src={post.images[0]} alt="Travel" className="w-full h-full object-cover" />
            {post.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md">
                +{post.images.length - 1} photos
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 pt-3 border-t border-slate-50">
          <button className="flex items-center gap-1 text-slate-400 text-xs">
            <ThumbsUp size={14} /> {post.helpfulCount} Helpful
          </button>
          <button className="flex items-center gap-1 text-slate-400 text-xs">
            <MessageSquare size={14} /> {post.comments.length} Comments
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
