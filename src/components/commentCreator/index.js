import React from "react";
import { func } from "prop-types";

// Components
import CommentFormContainer from "./components/commentFormContainer";
// Style
import "./commentCreator.css";

const CommentCreator = (props) => (
  <aside id="comment-creator">
    <CommentFormContainer {...props} />
  </aside>
);

CommentCreator.propTypes = {
  setIfCommentWasSubmitted: func.isRequired,
  setIfInDarkMode: func.isRequired,
};

export default CommentCreator;
