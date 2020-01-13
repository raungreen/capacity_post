import React from 'react';

const PostTable = props => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Post</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* maps data from api call */}
      {props.posts.length > 0 ? (
        props.posts.map(post => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.body}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(post);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deletePost(post.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          {props.error ? (
            <td>{props.error.message}</td>
          ) : (
            <td colSpan={3}>No posts</td>
          )}
        </tr>
      )}
    </tbody>
  </table>
);

export default PostTable;
