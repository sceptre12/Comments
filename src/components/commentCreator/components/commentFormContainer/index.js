import React from "react";
import { func } from "prop-types";

// Components
import CommentForm from "./components/commentForm";
// Style
import "./commentFormContainer.css";

const CommentFormContainer = (props) => {
  return (
    <div id="comment-form-container">
      <div id="comment-form_header">
        <h2>Comments Feed</h2>
      </div>
      <CommentForm {...props} />
    </div>
  );
};

CommentFormContainer.propTypes = {
  setIfCommentWasSubmitted: func.isRequired,
  setIfInDarkMode: func.isRequired,
};

export default CommentFormContainer;
