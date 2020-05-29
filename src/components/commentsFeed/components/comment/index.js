import React from "react";
import moment from "moment";
import { string, bool, number } from "prop-types";

// Style
import "./comment.css";

const Comment = ({ id, name, message, created, isNewComment }) => {
  return (
    <article
      className={`comment ${isNewComment ? "animated new-comment" : ""}`}
    >
      <div className="comment-header">
        <h3 className="comment-user-name">{name}</h3>
        <p>-</p>
        <p className="comment-post-time">{moment.utc(created).fromNow()}</p>
      </div>
      <div className="comment-content">{message}</div>
    </article>
  );
};

Comment.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  message: string.isRequired,
  created: string.isRequired,
  isNewComment: bool,
};

export default Comment;
