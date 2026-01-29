
import React from 'react';
import { User, Post } from '../types';
import { Settings, LogOut, Award, ThumbsUp, MessageCircle, Map } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';

interface ProfileProps {
  user: User;
  posts: Post[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, posts, onLogout }) => {
  const userPosts = posts.filter(p => p.userId === user.id);
  const totalHelpful = userPosts.reduce((acc, curr) => acc + curr.helpfulCount, 0);

  return (
    <div className="px-5 pt-8 pb-24">
      <div className="flex justify-between items-start mb-8">
        <div className="bg-slate-50 p-1 rounded-full border border-slate-200">
           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
             <img src={user.photo} className="w-full h-full object-cover" />
           </div>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 shadow-sm">
            <Settings size={20} />
          </button>
          <button 
            onClick={onLogout}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-red-500 shadow-sm"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{user.name}</h2>
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <Map size={14} className="text-teal-600" />
          <span>Explorer from {user.country || 'Worldwide'}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
          <span className="block text-xl font-black text-slate-900">{userPosts.length}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reviews</span>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
          <span className="block text-xl font-black text-slate-900">{totalHelpful}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Helpful</span>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
          <div className="flex justify-center mb-1">
             <Award size={18} className="text-yellow-500" />
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">My Experiences</h3>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Recent first</span>
        </div>

        <div className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map(post => <ReviewCard key={post.id} post={post} />)
          ) : (
            <div className="py-20 flex flex-col items-center justify-center opacity-40 grayscale">
               <span className="text-5xl mb-4">✍️</span>
               <p className="text-sm font-medium text-slate-600">You haven't shared any experiences yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
