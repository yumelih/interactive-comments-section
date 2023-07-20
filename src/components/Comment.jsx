import { useState } from "react";
import { nanoid } from "nanoid";
import moment from "moment";

// eslint-disable-next-line react/prop-types
const Comment = function ({ onAddPost, replying, postId, onAddpRepliedPost }) {
  const [formData, setFormData] = useState({ message: "" });
  const [inputError, setInputError] = useState("");
  const minMessageLength = 5;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData.message);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!replying) {
      if (formData.message.length > minMessageLength) {
        onAddPost({
          id: nanoid(),
          content: formData.message,
          createdAt: moment().toString(),
          score: 0,
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          replies: [],
        });
        setFormData({ message: "" });
      } else {
        setInputError(`Input must be more than ${minMessageLength} characters`);
        setTimeout(() => {
          setInputError("");
        }, 1500);
      }
    } else {
      onAddpRepliedPost(postId, {
        id: nanoid(),
        content: formData.message,
        createdAt: moment(Date.now().toString()).format(
          "MMMM Do YYYY, h:mm:ss a"
        ),
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
        replies: [],
      });
    }
  };

  return (
    <div className="comment">
      <img
        src="/images/avatars/image-maxblagun.png"
        className="avatar comment__avatar"
      />
      <textarea
        id="text-area"
        rows="6"
        cols="50"
        className="textarea"
        name="message"
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      {inputError && <div style={{ color: "red" }}>{inputError}</div>}
      <button onClick={handleSubmit} className="reply">
        {replying ? "Reply" : "Send"}
      </button>
    </div>
  );
};

export default Comment;
