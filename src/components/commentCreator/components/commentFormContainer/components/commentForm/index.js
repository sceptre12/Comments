import React, { useState, useEffect } from "react";
import { func } from "prop-types";
import BarLoader from "react-spinners/BarLoader";

// Api
import { createComment } from "../../../../../../api/endPoints";

// Style
import "./commentForm.css";

// Event Handlers
const onNameStateChange = (setState, e) => {
  const value = e.target.value;
  setState({
    isValid: true,
    value,
  });
};

const onMessageStateChange = (setState, e) => {
  const value = e.target.value;
  setState({
    isValid: true,
    value,
  });
};

const defaultInputState = {
  isValid: false,
  value: "",
};

const CommentForm = ({ setIfCommentWasSubmitted, setIfInDarkMode }) => {
  const [nameState, setNameState] = useState({ ...defaultInputState });

  const [messageState, setMessageState] = useState({ ...defaultInputState });

  const [submitState, setSubmitState] = useState({
    isBtnDisabled: true,
    isWaitingOnSubmission: false,
  });

  // Updates the buttons disabled state
  useEffect(() => {
    setSubmitState({
      isBtnDisabled: !(messageState.isValid && nameState.isValid),
      isWaitingOnSubmission: false,
    });
  }, [nameState.isValid, messageState.isValid]);

  const onSubmission = (e) => {
    e.preventDefault();
    // Prevent multiple submissions
    setSubmitState({
      isBtnDisabled: true,
      isWaitingOnSubmission: true, // Set submission Loading
    });
    createComment(nameState.value, messageState.value).then((result) => {
      setSubmitState({
        isBtnDisabled: true,
        isWaitingOnSubmission: false, // Turn off submission Loading
      });
      setIfCommentWasSubmitted({
        wasSubmitted: true,
        commentId: result.id,
      });

      setNameState({ ...defaultInputState });
      setMessageState({ ...defaultInputState });
    });
  };

  return (
    <form id="comment-form" onSubmit={onSubmission}>
      <div id="comment-form-fieldset">
        <div id="comment-form-name">
          <div className="comment-form-label">
            <label htmlFor="comment-name">Name:</label>
          </div>
          <div className="comment-form-userinput">
            <input
              id="comment-name"
              type="text"
              value={nameState.value}
              onChange={onNameStateChange.bind(null, setNameState)}
            />
          </div>
        </div>
        <div id="comment-form-message">
          <div className="comment-form-label">
            <label htmlFor="comment-message">Message:</label>
          </div>
          <div className="comment-form-userinput">
            <textarea
              name="comment-message"
              id="comment-message"
              value={messageState.value}
              maxLength={160}
              onChange={onMessageStateChange.bind(null, setMessageState)}
            />
          </div>
        </div>
      </div>
      <div id="comment-send-button_container">
        <button type="submit" disabled={submitState.isBtnDisabled}>
          {submitState.isWaitingOnSubmission ? (
            <BarLoader />
          ) : (
            <span>Send</span>
          )}
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  setIfCommentWasSubmitted: func.isRequired,
  setIfInDarkMode: func.isRequired,
};

export default CommentForm;
