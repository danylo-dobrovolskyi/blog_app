import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../helpers/AuthContext';

function PostForm({ initialPost, onSave, onCancel }) {
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const { user } = useAuth();

  useEffect(() => {
    if (initialPost) {
      setPost({
        title: initialPost.attributes.Title || '',
        content: initialPost.attributes.Content || '',
        author: initialPost.attributes.Author || user.username,
      });
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        author: user ? user.username : 'Невідомий автор',
      }));
    }
  }, [initialPost, user?.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(post);
    setPost({ title: '', content: '', author: user.username });
    if (onCancel) onCancel();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              initialPost ? 'bg-yellow-100' : 'bg-white'
            }`}
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              initialPost ? 'bg-yellow-100' : 'bg-white'
            }`}
            id="content"
            name="content"
            placeholder="Type something..."
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            id="author"
            name="author"
            type="text"
            value={post.author}
            disabled={true}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {initialPost ? 'Save' : 'Create'}
          </button>
          {initialPost && (
            <button
              onClick={onCancel}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Discard
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
