'use client';

import React from 'react';
import { useAuth } from '../helpers/AuthContext';

const PostList = ({ posts, onEdit, onDelete }) => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto mt-8">
      {posts.length > 0 ? (
        posts.map(
          (post) => (
            console.log('Post and Author ID:', post, post.user?.id),
            (
              <div
                key={post.id}
                className="mb-8 p-6 shadow-lg rounded-lg bg-white"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {post.attributes.Title}
                </h2>
                <p className="text-gray-700 mb-4">{post.attributes.Content}</p>
                {post.attributes.Author && (
                  <p className="text-sm font-semibold">
                    Автор: {post.attributes.Author}
                  </p>
                )}
                <div className="flex justify-end">
                  {user && user.id === post.attributes.Author?.id && (
                    <>
                      <button
                        onClick={() => onEdit(post)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(post.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          ),
        )
      ) : (
        <p className="text-center text-gray-500">No posts found</p>
      )}
    </div>
  );
};

export default PostList;
