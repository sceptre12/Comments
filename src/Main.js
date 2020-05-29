import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

// Components
import CommentsFeed from "./components/commentsFeed";
import CommentCreator from "./components/commentCreator";

// Api
import { getComments, getComment } from "./api/endPoints";
// Style
import "./main.css";

const defaultCommentSubmissionState = {
  wasSubmitted: false,
  commentId: -1,
};
const defaultPostCommentState = {
  hasRetrievedNewComment: false, // Gets Set whenever a posted Comment was retrieved from the db
  commentId: -1,
};

export const sortDateDesc = (commentA, commentB) => {
  const isSame = moment(commentA.created).isSame(commentB.created);
  const isAfter = moment(commentA.created).isAfter(commentB.created);

  if (isSame) {
    return 0;
  } else {
    if (isAfter) {
      return -1;
    } else {
      return 1;
    }
  }
};

const Main = () => {
  // Main Comments state
  const [commentsState, setCommentsState] = useState({
    comments: [],
    isLoadingEverything: true,
  });
  // State for determining a user has submitted a post
  const [commentSubmissionState, setIfCommentWasSubmitted] = useState({
    ...defaultCommentSubmissionState,
  });
  // Posted Comment State
  const [postedCommentState, setPostedCommentState] = useState({
    ...defaultPostCommentState,
  });
  // Style Theme check
  const [isInDarkMode, setIfInDarkMode] = useState(false);

  /*
    This is used to store the timeoutID for resetting 
    the postedCommentState
  */
  const resetTimer = useRef(undefined);

  // Runs on first mount
  useEffect(() => {
    getComments()
      .then((result) => {
        result.sort(sortDateDesc);
        setCommentsState({
          comments: result,
          isLoadingEverything: false,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  /**
   * Checks if a post was submitted
   * If so then retrieve that post from the db
   */
  useEffect(() => {
    if (commentSubmissionState.wasSubmitted) {
      getComment(commentSubmissionState.commentId)
        .then((result) => {
          if (!!resetTimer.current) {
            clearTimeout(resetTimer.current);
            resetTimer.current = undefined;
          }

          // Reset Submission state
          setIfCommentWasSubmitted({ ...defaultCommentSubmissionState });

          // Update the comment state
          setCommentsState({
            ...commentsState,
            comments: [{ ...result }, ...commentsState.comments],
          });

          // Set Posted Comment State
          setPostedCommentState({
            hasRetrievedNewComment: true,
            commentId: commentSubmissionState.commentId,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [commentSubmissionState, commentsState]);

  // Resets Posted Comment State
  useEffect(() => {
    if (postedCommentState.hasRetrievedNewComment) {
      resetTimer.current = setTimeout(() => {
        setPostedCommentState({
          ...defaultPostCommentState,
        });
      }, 2000);
    }
  }, [postedCommentState.hasRetrievedNewComment]);

  return (
    <div id="main">
      <CommentCreator {...{ setIfInDarkMode, setIfCommentWasSubmitted }} />
      <CommentsFeed
        {...{
          isInDarkMode,
          ...commentsState,
          postedCommentState,
        }}
      />
    </div>
  );
};

export default Main;
