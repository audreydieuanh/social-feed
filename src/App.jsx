import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import DetailPost from './pages/DetailPost';
import EditPost from './pages/EditPost';
import { supabase } from './client';
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('Posts')
        .select()
        .order('created_at', { ascending: true })

      setPosts(data);
    }
    fetchPosts();
  }, []);


  return (
    <BrowserRouter>
    <div id="root">
      <div className='whole-page'>
          <Routes>
            <Route path="/" index={true} element={<Home data={posts}/>} />
            <Route path="/new" index={false} element={<CreatePost />} />
            <Route path="/:id" index={false} element={<DetailPost posts={posts} />} />
            <Route path="/edit/:id" index={false} element={<EditPost data={posts} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
