import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";

import iconReply from "../assets/icon-reply.svg";
import PropTypes from "prop-types";
import { useState } from "react";
import Comment from "./Comment";
import moment from "moment";

function Post({ data, onAddRepliedPost }) {
  const [replying, setReplying] = useState(false);

  function handleReply() {
    setReplying(true);
  }

  return (
    <div className="main ">
      <div className="post">
        <div className="post__vote">
          <div className="vote-container">
            <img
              src={iconPlus}
              alt="plus icon"
              className="vote-container__plus-icon"
            />
            <span className="vote-container__number">{data.score}</span>
            <img
              src={iconMinus}
              alt="minus icon"
              className="vote-container__minus-icon"
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
            <div className="user-interaction" onClick={handleReply}>
              <img
                src={iconReply}
                alt=""
                className="user-interaction__reply-icon"
              />
              <span className="user-interaction__reply-text">Reply</span>
            </div>
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
        <Comment
          replying={replying}
          postId={data.id}
          onAddRepliedPost={onAddRepliedPost}
        />
      )}
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.object,
};

export default Post;
