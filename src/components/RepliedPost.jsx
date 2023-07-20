import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";

import iconReply from "../assets/icon-reply.svg";
import PropTypes from "prop-types";
import moment from "moment";

function RepliedPost({ replyData }) {
  return (
    <div className="main main--replied">
      <div className="replied"></div>
      <div className="post">
        <div className="post__vote">
          <div className="vote-container">
            <img
              src={iconPlus}
              alt="plus icon"
              className="vote-container__plus-icon"
            />
            <span className="vote-container__number">{replyData.score}</span>
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
                src={replyData.user.image.png}
                alt="user avatar"
                className="avatar"
              />
              <span className="username">{replyData.user.username}</span>
              <span className="post-date">
                {replyData.createdAt.includes("ago")
                  ? replyData.createdAt
                  : moment(replyData.createdAt).toNow()}
              </span>
            </div>
            <div className="user-interaction">
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
              {replyData.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

RepliedPost.propTypes = {
  replyData: PropTypes.object,
};

export default RepliedPost;
