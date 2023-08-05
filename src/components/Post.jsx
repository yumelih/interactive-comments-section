import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconReply from "../assets/icon-reply.svg";
import iconDelete from "../assets/icon-delete.svg";
import iconEdit from "../assets/icon-edit.svg";

import PropTypes from "prop-types";
import { useState } from "react";
import Comment from "./Comment";
import moment from "moment";
// import RepliedPost from "./RepliedPost";

function Post({
  postId,
  data,
  type,
  onAddRepliedPost,
  onUpdateScore,
  onUpdateReplyScore,
  onOpenModal,
  onEdit,
  children,
}) {
  const [replying, setReplying] = useState(false);
  const [disabledPlus, setDisabledPlus] = useState(false);
  const [disabledMinus, setDisabledMinus] = useState(false);
  const [editing, setEditing] = useState(false);
  const username = data.user.username;

  function handleReply() {
    setReplying(true);
  }

  function handleScore(id, score, typeScore) {
    if (typeScore === "upvote" && disabledMinus === true) {
      setDisabledPlus(false);
      onUpdateScore(id, score);
      setDisabledMinus(false);
    } else if (typeScore === "downvote" && disabledPlus === true) {
      setDisabledMinus(false);
      onUpdateScore(id, score);
      setDisabledPlus(false);
    } else if (typeScore === "upvote") {
      setDisabledPlus(true);
      onUpdateScore(id, score);
    } else if (typeScore === "downvote") {
      setDisabledMinus(true);
      onUpdateScore(id, score);
    }
  }

  function handleReplyScore(postId, replyId, score, type) {
    if (type === "upvote" && disabledMinus === true) {
      setDisabledPlus(false);
      onUpdateReplyScore(postId, replyId, score);
      setDisabledMinus(false);
    } else if (type === "downvote" && disabledPlus === true) {
      setDisabledMinus(false);
      onUpdateReplyScore(postId, replyId, score);
      setDisabledPlus(false);
    } else if (type === "upvote") {
      setDisabledPlus(true);
      onUpdateReplyScore(postId, replyId, score);
    } else if (type === "downvote") {
      setDisabledMinus(true);
      onUpdateReplyScore(postId, replyId, score);
    }
  }

  function handleDeleteModal(parentId, id) {
    onOpenModal({ openModal: true, id: id, parentId: parentId });
  }

  return (
    <>
      {editing ? (
        <Comment
          onEditing={setEditing}
          onEdit={onEdit}
          postId={data.id}
          editing={editing}
          postContent={data.content}
          parentId={postId}
        />
      ) : (
        <div className={`main ${type ? "main--replied" : ""}`}>
          {type && <div className="replied"></div>}
          <div className="post">
            <div className="post__vote">
              <div className="vote-container">
                <img
                  src={iconPlus}
                  alt="plus icon"
                  className="vote-container__plus-icon"
                  disabled={disabledPlus}
                  onClick={() =>
                    type
                      ? handleReplyScore(postId, data.id, 1, "upvote")
                      : handleScore(data.id, 1, "upvote")
                  }
                />
                <span className="vote-container__number">{data.score}</span>
                <img
                  src={iconMinus}
                  alt="minus icon"
                  className="vote-container__minus-icon"
                  disabled={disabledMinus}
                  onClick={() =>
                    type
                      ? handleReplyScore(postId, data.id, -1, "downvote")
                      : handleScore(data.id, -1, "downvote")
                  }
                />
              </div>
            </div>
            <div className="post__main">
              <div className="post__up">
                <div className="user-details">
                  <img
                    src={data.user.image.png}
                    alt="user avatar"
                    className="avatar"
                  />
                  <span className="username">{data.user.username}</span>
                  <span className="post-date">
                    {data.createdAt.includes("ago")
                      ? data.createdAt
                      : moment(data.createdAt).toNow()}
                  </span>
                </div>
                {username !== "juliusomo" ? (
                  <div className="user-icons">
                    <div className="user-interaction" onClick={handleReply}>
                      <img
                        src={iconReply}
                        alt=""
                        className="user-interaction__reply-icon"
                      />
                      <span className="user-interaction__reply-text">
                        Reply
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="user-icons">
                    <div
                      className="user-interaction delete"
                      onClick={() =>
                        data?.replyingTo
                          ? handleDeleteModal(postId, data.id)
                          : handleDeleteModal(null, data.id)
                      }
                    >
                      <img
                        src={iconDelete}
                        alt=""
                        className="user-interaction__reply-icon"
                      />
                      <span className="user-interaction__reply-text delete-text">
                        Delete
                      </span>
                    </div>

                    <div
                      className="user-interaction edit"
                      onClick={() => setEditing(true)}
                    >
                      <img
                        src={iconEdit}
                        alt=""
                        className="user-interaction__reply-icon edit-icon"
                      />
                      <span className="user-interaction__reply-text">Edit</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="post__bottom">
                <p className="post__text">
                  {/* Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You&apos;ve nailed the design and
            responsiveness at various breakpoints works reall well.{" "} */}
                  {data.content}
                </p>
              </div>
            </div>
          </div>
          {replying && (
            <>
              <div className="replied"></div>
              <Comment
                replying={replying}
                postId={data.id}
                onAddRepliedPost={onAddRepliedPost}
                onReplying={setReplying}
                replyingTo={username}
              />
            </>
          )}
        </div>
      )}
      {children}
      {/* {data.replies.map((r) => {
        return (
          <RepliedPost
            key={r.id}
            postId={data.id}
            replyData={r}
            onUpdateReplyScore={onUpdateReplyScore}
          />
        );
      })} */}
    </>
  );
}

Post.propTypes = {
  data: PropTypes.object,
  type: PropTypes.bool,
  onAddRepliedPost: PropTypes.func,
  onUpdateScore: PropTypes.func,
  onUpdateReplyScore: PropTypes.func,
};

export default Post;
