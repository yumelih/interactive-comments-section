// import { useState } from "react";

import Post from "./components/Post";
import Comment from "./components/Comment";
import Modal from "./components/Modal";
import { useState } from "react";
import data from "./data.json";
// import iconDelete from "./assets/icon-delete.svg";

function App() {
  const [postData, setPostData] = useState(data.comments);
  const [openModal, setOpenModal] = useState({
    openModal: false,
    id: "",
    parentId: null,
  });
  // const [userData, setUserData] = useState(data.currentUser);

  // console.log(postData);

  function addPost(post) {
    setPostData((p) => [...p, post]);
  }

  function addRepliedPost(id, repliedPost) {
    setPostData((postData) =>
      postData.map((p) => {
        if (p.id === id) {
          console.log(p.replies);
          return {
            ...p,
            replies: p.replies.concat(repliedPost),
          };
        } else {
          return p;
        }
      })
    );
  }

  // function updateUserScore(id, type, score) {
  //   setUserData((user) => {
  //     if (user?.interacted) {
  //       return {
  //         ...user,
  //         interacted: user.interacted.map((post) => [
  //           ...post,
  //           { postId: id, type: type },
  //         ]),
  //       };
  //     } else {
  //       return { ...user, interacted: [{ postId: id, type: type }] };
  //     }
  //   });

  // }

  function updateScore(id, score) {
    setPostData((postData) =>
      postData.map((p) => {
        return p.id === id ? { ...p, score: p.score + score } : p;
      })
    );
  }

  function updateReplyScore(postId, replyId, score) {
    console.log(postId, replyId, score);
    setPostData((postData) =>
      postData.map((p) => {
        return p.id === postId
          ? {
              ...p,
              replies: p.replies.map((subp) => {
                return subp.id === replyId
                  ? { ...subp, score: subp.score + score }
                  : subp;
              }),
            }
          : p;
      })
    );
  }

  function handleDeletePost(id) {
    setPostData((postData) => {
      return postData.filter((p) => p.id !== id);
    });
  }

  function handleReplyDeletePost(parentId, id) {
    setPostData((postData) => {
      return postData.map((post) => {
        return post.id === parentId
          ? { ...post, replies: post.replies.filter((p) => p.id !== id) }
          : post;
      });
    });
  }

  function handleEdit(parentId, id, newContent) {
    !parentId
      ? setPostData((postData) => {
          return postData.map((post) => {
            return post.id === id ? { ...post, content: newContent } : post;
          });
        })
      : setPostData((postData) => {
          return postData.map((post) => {
            return post.id === parentId
              ? {
                  ...post,
                  replies: post.replies.map((p) =>
                    p.id === id ? { ...p, content: newContent } : p
                  ),
                }
              : post;
          });
        });
  }

  // function deletePost() {

  // }

  return (
    <>
      {openModal.openModal && (
        <Modal
          openModal={openModal}
          onOpenModal={setOpenModal}
          onDeletePost={handleDeletePost}
          onDeleteReplyPost={handleReplyDeletePost}
        />
      )}
      <div className="container">
        {postData &&
          postData.map((post) => (
            <Post
              key={post.id}
              type={false}
              data={post}
              onUpdateScore={updateScore}
              onAddRepliedPost={addRepliedPost}
              onOpenModal={setOpenModal}
              onEdit={handleEdit}
            >
              {post.replies.length !== 0 &&
                post.replies.map((rpost) => {
                  return (
                    <Post
                      key={rpost.id}
                      postId={post.id}
                      data={rpost}
                      type={true}
                      onAddRepliedPost={addRepliedPost}
                      onUpdateReplyScore={updateReplyScore}
                      onOpenModal={setOpenModal}
                      onEdit={handleEdit}
                    />
                  );
                })}
            </Post>
          ))}
        <Comment onAddPost={addPost} />
      </div>
    </>
  );
}

export default App;
