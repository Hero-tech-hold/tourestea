
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, Category, Sentiment, User } from '../types';
import { CATEGORIES } from '../constants';
import { analyzeSentiment } from '../services/gemini';
import { X, Camera, Star, ChevronLeft, Loader2, Sparkles } from 'lucide-react';

interface CreatePostProps {
  onAddPost: (post: Post) => void;
  user: User;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost, user }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>('Hotel');
  const [serviceName, setServiceName] = useState('');
  const [location, setLocation] = useState('');
  const [sentiment, setSentiment] = useState<Sentiment>('Good');
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const readers = Array.from(files).map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then(dataUrls => setImages([...images, ...dataUrls]));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAISuggest = async () => {
    if (!description || description.length < 10) return;
    setIsAnalyzing(true);
    const result = await analyzeSentiment(description);
    setSentiment(result.sentiment);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !description || !location) return;

    setIsSubmitting(true);
    
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      userPhoto: user.photo,
      category,
      serviceName,
      rating,
      sentiment,
      description,
      images,
      location,
      helpfulCount: 0,
      createdAt: Date.now(),
      comments: []
    };

    setTimeout(() => {
      onAddPost(newPost);
      setIsSubmitting(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center gap-4 z-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Post Experience</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Category Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Choose Category</label>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${category === cat ? 'bg-teal-600 text-white border-teal-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Service Name (e.g. Hilton London)" 
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm font-medium"
              required
            />
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="City, Country" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Sentiment & Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Sentiment</label>
            <div className="flex p-1 bg-white rounded-xl border border-slate-200">
              <button 
                type="button"
                onClick={() => setSentiment('Good')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${sentiment === 'Good' ? 'bg-green-100 text-green-700' : 'text-slate-400'}`}
              >
                Good
              </button>
              <button 
                type="button"
                onClick={() => setSentiment('Bad')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${sentiment === 'Bad' ? 'bg-red-100 text-red-700' : 'text-slate-400'}`}
              >
                Bad
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Rating</label>
            <div className="flex justify-center items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-125"
                >
                  <Star size={20} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Text */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Your Story</label>
          <textarea 
            placeholder="What happened? Be honest, it helps others."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full h-32 px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm leading-relaxed"
            required
          />
          <button 
            type="button"
            onClick={handleAISuggest}
            className="absolute bottom-4 right-4 bg-teal-50 text-teal-600 p-2 rounded-xl border border-teal-100 shadow-sm flex items-center gap-2 text-xs font-bold hover:bg-teal-100 disabled:opacity-50"
            disabled={description.length < 10 || isAnalyzing}
          >
            {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            AI Auto-Sentiment
          </button>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Photos (Optional)</label>
          <div className="flex flex-wrap gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm group">
                <img src={img} className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 hover:border-teal-300 hover:text-teal-500 transition-all"
            >
              <Camera size={24} />
              <span className="text-[10px] font-bold mt-1">Add</span>
            </button>
          </div>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload}
          />
        </div>

        {/* Action Button */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Post Experience'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
