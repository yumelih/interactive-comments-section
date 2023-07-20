// import { useState } from "react";

import Post from "./components/Post";
import Comment from "./components/Comment";
import { useState } from "react";
import data from "./data.json";
// import iconDelete from "./assets/icon-delete.svg";

function App() {
  const [postData, setPostData] = useState(data.comments);
  console.log(postData);

  function addPost(post) {
    setPostData((p) => [...p, post]);
  }

  function addRepliedPost(id, repliedPost) {
    setPostData((postData) =>
      postData.map((p) => {
        if (p.id === id) {
          return { ...p, replies: p.replies.map((r) => [...r, repliedPost]) };
        } else {
          return p;
        }
      })
    );
  }

  return (
    <div className="container">
      {postData &&
        postData.map((post) => (
          <Post key={post.id} data={post} onAddpRepliedPost={addRepliedPost} />
        ))}
      <Comment onAddPost={addPost} />
    </div>
  );
}

export default App;
