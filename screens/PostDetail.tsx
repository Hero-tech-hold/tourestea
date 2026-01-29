
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types';
import { summarizeReview } from '../services/gemini';
import { ChevronLeft, Share2, ThumbsUp, MessageSquare, Flag, Star, MapPin, Info, Sparkles, Loader2 } from 'lucide-react';

interface PostDetailProps {
  posts: Post[];
}

const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    if (post) {
      setLoadingSummary(true);
      summarizeReview(post.description).then(summary => {
        setAiSummary(summary);
        setLoadingSummary(false);
      });
    }
  }, [post]);

  if (!post) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 flex items-center justify-between z-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <span className="text-sm font-black text-slate-900">Post Detail</span>
        <button className="p-2 -mr-2">
          <Share2 size={20} className="text-slate-600" />
        </button>
      </div>

      <div className="overflow-y-auto">
        {/* Images */}
        {post.images.length > 0 && (
          <div className="w-full h-72 overflow-x-auto flex snap-x snap-mandatory no-scrollbar bg-slate-100">
            {post.images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                className="w-full h-full object-cover snap-start flex-shrink-0" 
                alt="Travel detail"
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className={`inline-block px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 ${post.sentiment === 'Good' ? 'sentiment-good' : 'sentiment-bad'}`}>
                {post.sentiment} Experience
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{post.serviceName}</h1>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} />
                <span className="text-sm font-medium">{post.location}</span>
              </div>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 rounded-2xl border border-slate-100 min-w-[60px]">
              <span className="text-xl font-black text-slate-900">{post.rating}</span>
              <div className="flex text-yellow-400">
                <Star size={10} className="fill-yellow-400" />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100">
            <img src={post.userPhoto} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">{post.userName}</h4>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Contributor • {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* AI Insight Section */}
          <div className="mb-6 p-4 bg-teal-50 rounded-2xl border border-teal-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
               <Sparkles size={48} className="text-teal-600" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-teal-600" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-800">AI Insight Summary</h4>
            </div>
            {loadingSummary ? (
              <div className="flex items-center gap-2 text-teal-600">
                <Loader2 size={14} className="animate-spin" />
                <span className="text-xs italic">Gemini is analyzing...</span>
              </div>
            ) : (
              <p className="text-sm text-teal-900 font-medium italic leading-relaxed">
                "{aiSummary || "This review highlights the key aspects of the service provided."}"
              </p>
            )}
          </div>

          {/* Full Text */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Detailed Experience</h4>
            <p className="text-slate-700 leading-relaxed text-base">
              {post.description}
            </p>
          </div>

          {/* Interaction Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-600 text-sm font-bold active:scale-95 transition-all">
              <ThumbsUp size={18} />
              Helpful ({post.helpfulCount})
            </button>
            <div className="flex gap-2">
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                <Flag size={20} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-10">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Comments ({post.comments.length})</h4>
            <div className="space-y-6">
              {post.comments.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-xl italic">No comments yet. Be the first!</p>
              ) : (
                post.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <img src={comment.userPhoto} className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <div className="bg-slate-50 p-3 rounded-2xl">
                        <span className="text-xs font-bold text-slate-900">{comment.userName}</span>
                        <p className="text-sm text-slate-600 mt-1">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 max-w-md mx-auto z-40">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 bg-slate-100 border-none rounded-2xl px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500/20"
          />
          <button className="bg-teal-600 text-white p-2 rounded-xl">
             <MessageSquare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
