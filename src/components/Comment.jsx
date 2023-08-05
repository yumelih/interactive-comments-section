/* eslint-disable react/prop-types */
import { useState } from "react";
import { nanoid } from "nanoid";
import moment from "moment";

const Comment = function ({
  onAddPost,
  replying,
  postId,
  onAddRepliedPost,
  onReplying,
  replyingTo,
  editing = false,
  onEdit,
  onEditing,
  postContent,
  parentId,
}) {
  const [formData, setFormData] = useState({
    message: editing ? postContent : replying ? `@${replyingTo}` : "",
  });
  const [inputError, setInputError] = useState("");
  const minMessageLength = 5;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      if (formData.message.length > minMessageLength) {
        onAddRepliedPost(postId, {
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
          replyingTo,
          replies: [],
        });
        onReplying(false);
      } else {
        setInputError(`Input must be more than ${minMessageLength} characters`);
        setTimeout(() => {
          setInputError("");
        }, 1500);
      }
    }
  };

  function handleEdit() {
    console.log(postId, onEdit, onEditing, editing);
    onEdit(parentId, postId, formData.message);
    onEditing(false);
  }

  return (
    <div className="comment">
      <img
        src="/images/avatars/image-juliusomo.png"
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
        placeholder="Add a comment..."
      ></textarea>

      {inputError && <div style={{ color: "red" }}>{inputError}</div>}
      <button onClick={editing ? handleEdit : handleSubmit} className="reply">
        {replying ? "Reply" : "Send"}
      </button>
    </div>
  );
};

export default Comment;
