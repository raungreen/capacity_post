import React, { useState, useEffect } from 'react';
import PostTable from './tables/PostTable';
import AddPostForm from './forms/AddPostForm';
import EditPostForm from './forms/EditPostForm';
import './App.css';
import axios from 'axios';

function App() {
  // state using hooks
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: '', post: '' };
  const [currentPost, setCurrentPost] = useState(initialFormState);
  const [error, setError] = useState(null);

  // Url set to retrieve only 5 of 100 available post
  const apiUrl = 'http://jsonplaceholder.typicode.com/posts?_limit=5';

  // Call to api to get post
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(apiUrl);

      setPosts(response.data);
    } catch (err) {
      setError(err);
    }
  };

  // Function to add post
  const addPost = post => {
    post.id = posts.length + 1;
    setPosts([...posts, post]);
  };

  // function to delete post
  const deletePost = id => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // function to edit post
  const editRow = post => {
    setEditing(true);

    setCurrentPost({ id: post.id, title: post.title, body: post.body });
  };

  // function to update post
  const updatePost = (id, updatePost) => {
    setEditing(false);

    setPosts(posts.map(post => (post.id === id ? updatePost : post)));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Capacity Posts</h1>
      </div>
      <div className="row">
        <div className="leftColumn">
          <div className="card">
            {editing ? (
              <div>
                <h2>Edit Post</h2>
                <EditPostForm
                  editing={editing}
                  setEditing={setEditing}
                  currentPost={currentPost}
                  updatePost={updatePost}
                />
              </div>
            ) : (
              <div>
                <h2>Add Post</h2>
                <AddPostForm addPost={addPost} />
              </div>
            )}

            <p>{posts.body}</p>
          </div>
        </div>

        <div className="rightColumn">
          <div className="card">
            <h2>View Posts</h2>
            <PostTable
              posts={posts}
              editRow={editRow}
              deletePost={deletePost}
              error={error}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <h2>Front End Coding Task</h2>
      </div>
    </div>
  );
}

export default App;
