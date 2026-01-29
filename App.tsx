
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Post, User } from './types';
import { MOCK_POSTS } from './constants';

// Screens
import Splash from './screens/Splash';
import Login from './screens/Login';
import Home from './screens/Home';
import CreatePost from './screens/CreatePost';
import PostDetail from './screens/PostDetail';
import Profile from './screens/Profile';
import Search from './screens/Search';

// Components
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSplashDone, setIsSplashDone] = useState(false);

  useEffect(() => {
    // Check local storage for user
    const savedUser = localStorage.getItem('tourestea_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    const timer = setTimeout(() => setIsSplashDone(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('tourestea_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tourestea_user');
  };

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  if (!isSplashDone) {
    return <Splash />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto border-x border-slate-200 shadow-xl relative overflow-x-hidden">
        {currentUser && <Navbar user={currentUser} />}
        
        <main className="flex-1 pb-20 overflow-y-auto">
          <Routes>
            <Route 
              path="/login" 
              element={currentUser ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/" 
              element={currentUser ? <Home posts={posts} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/create" 
              element={currentUser ? <CreatePost onAddPost={addPost} user={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/post/:id" 
              element={currentUser ? <PostDetail posts={posts} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={currentUser ? <Profile user={currentUser} posts={posts} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/search" 
              element={currentUser ? <Search posts={posts} /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
