import React from "react";
import Post from "../components/Post";
import { auth, db, storage } from "../firebaseSetup";
import { v4 as uuidv4 } from "uuid";

function Home({ user }) {
  const [post, setPost] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [attachment, setAttachment] = React.useState();

  React.useEffect(function () {
    getData();
  }, []);

  async function getData() {
    await db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const postArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postArray);
      });
  }

  function onChange(event) {
    const {
      target: { value },
    } = event;
    setPost(value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    let imageURL;

    if (imageURL !== "") {
      const fileRef = storage.ref().child(`${user.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      imageURL = await response.ref.getDownloadURL();
    }

    const postObj = {
      post: post,
      createdAt: new Date().toLocaleString(),
      creatorId: user.uid,
      imageURL: imageURL,
    };

    await db.collection("posts").add(postObj);

    setPost("");
    setAttachment(null);
  }

  function onFileChange(event) {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = function (event) {
      const {
        target: { result },
      } = event;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  }

  function cancelImageUpload() {
    setAttachment(null);
  }

  async function signOut() {
    await auth.signOut();
  }

  async function deleteAccount() {
    await auth.currentUser.delete();
  }

  return (
    <div>
      <div className="container">
        <h1>Home</h1>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={post}
            type="text"
            placeholder="What's on your mind?"
          />
          <input type="submit" value="Go!" />
          <br />
          <input onChange={onFileChange} accept="image/*" type="file" />
          {attachment && (
            <>
              <img src={attachment} width="50px" height="50px" />
              <br />
              <button onClick={cancelImageUpload}>Cancel Upload</button>
            </>
          )}
          <br />
        </form>

        {posts.map((post, index) => {
          return (
            <Post
              isOwner={post.creatorId === user.uid}
              post={post}
              key={index}
            />
          );
        })}
      </div>

      <br />
      <br />

      <button className="home-button" onClick={signOut}>
        Log Out
      </button>
      <button className="home-button" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>
  );
}

export default Home;
