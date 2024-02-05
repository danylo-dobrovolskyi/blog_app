'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PostForm from '../components/PostForm';
import Posts from '../components/Posts';
import { AuthProvider } from '../helpers/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?populate=*`, { headers });

      if (response.ok) {
        const { data } = await response.json();

        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const savePost = async (postDetails) => {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const postData = {
      data: {
        Title: postDetails.title,
        Content: postDetails.content,
        Author: postDetails.author,
      },
    };

    try {
      const response = postDetails.id
        ? await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postDetails.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(postData),
        })
        : await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, {
          method: 'POST',
          headers,
          body: JSON.stringify(postData),
        });

      if (response.ok) {
        fetchPosts(); // Refresh the posts list after saving
        setEditingPost(null); // Reset the editing post state
      } else {
        const errorText = await response.text();

        console.error('Error saving the post:', errorText);
      }
    } catch (error) {
      console.error('Error saving the post:', error);
    }
  };

  const editPost = (post) => {
    setEditingPost(post); // Set the selected post for editing
  };

  const deletePost = async (postId) => {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        fetchPosts(); // Refresh the posts list after deletion
      }
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
  };

  return (
    <AuthProvider>
      <Header />
      <div className="container mx-auto mt-8">
        <PostForm
          initialPost={editingPost}
          onSave={savePost}
          onCancel={() => setEditingPost(null)}
        />
        <Posts posts={posts} onEdit={editPost} onDelete={deletePost} />
      </div>
    </AuthProvider>
  );
};

export default Home;
