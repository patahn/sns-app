import React from "react";
import { db } from "../firebaseSetup";

function Post({ post, isOwner }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(post.post);

  function deletePost() {
    const ok = window.confirm("Are you sure you want to delete this post?");
    if (ok) {
      db.doc(`posts/${post.id}`).delete();
    }
  }

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  function onChange(event) {
    const {
      target: { value },
    } = event;
    setValue(value);
  }

  function updatePost(event) {
    event.preventDefault();
    db.doc(`posts/${post.id}`).update({
      post: value,
      updatedAt: new Date().toLocaleString(),
    });
    toggleEditing();
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <form onSubmit={updatePost}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Update your post"
              value={value}
            />
            <button onClick={toggleEditing} type="button">
              Cancel
            </button>
            <button type="submit">Update Post</button>
          </form>
        </div>
      ) : (
        <div>
          <h4>{post.post}</h4>
          {post.imageURL && (
            <>
              <img src={post.imageURL} width="250px" height="300px" />
              <br />
            </>
          )}
          <span>Created at {post.createdAt}</span>
          <br />
          {post.updatedAt && <span>Updated at {post.updatedAt}</span>}

          {isOwner && (
            <div>
              <button onClick={toggleEditing}>Update Post</button>
              <button onClick={deletePost}>Delete Post</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
