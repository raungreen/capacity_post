import React, { useState, useEffect } from 'react';

const EditPostForm = props => {
  const [post, setPost] = useState(props.currentPost);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

  useEffect(() => {
    setPost(props.currentPost);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.updatePost(post.id, post);
      }}
    >
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleInputChange}
      />
      <label>Post</label>
      <textarea
        type="text"
        name="body"
        value={post.body}
        onChange={handleInputChange}
      />
      <button>Update post</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditPostForm;
