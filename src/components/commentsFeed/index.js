import React, { useRef, useEffect } from "react";
import { bool, array, object } from "prop-types";

import PropagateLoader from "react-spinners/PropagateLoader";
// Components
import Comment from "./components/comment";

// Style
import "./commentsFeed.css";

const CommentsFeed = ({
  isInDarkMode,
  comments,
  isLoadingEverything,
  postedCommentState,
}) => {
  const { hasRetrievedNewComment, commentId } = postedCommentState;
  const commentListRef = useRef();

  // Scrolls the list to the top when a new comment is added
  useEffect(() => {
    if (!!commentListRef.current && hasRetrievedNewComment) {
      commentListRef.current.scrollTo(0, 0);
    }
  }, [hasRetrievedNewComment]);

  return (
    <main id="comments-feed">
      {isLoadingEverything ? (
        <div id="comments-feed_loadingSpinner">
          <PropagateLoader />
        </div>
      ) : (
        <div id="comment-list" ref={commentListRef}>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              {...{ ...comment, isInDarkMode }}
              isNewComment={
                hasRetrievedNewComment ? commentId === comment.id : undefined
              }
            />
          ))}
        </div>
      )}
    </main>
  );
};

CommentsFeed.propTypes = {
  isInDarkMode: bool,
  comments: array,
  isLoadingEverything: bool,
  postedCommentState: object,
};

export default CommentsFeed;
