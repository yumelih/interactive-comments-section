import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import userAvatar from "../assets/avatars/image-amyrobson.png";
import iconReply from "../assets/icon-reply.svg";

function Post() {
  return (
    <div className="post">
      <div className="post__vote">
        <div className="vote-container">
          <img
            src={iconPlus}
            alt="plus icon"
            className="vote-container__plus-icon"
          />
          <span className="vote-container__number">12</span>
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
            <img src={userAvatar} alt="user avatar" className="avatar" />
            <span className="username">amyrobson</span>
            <span className="post-date">2 days ago</span>
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
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You&apos;ve nailed the design and
            responsiveness at various breakpoints works reall well.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
