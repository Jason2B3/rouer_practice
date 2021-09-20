import { useRef } from "react";
import { useEffect } from "react/cjs/react.development";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = ({ onAddedComment, quoteID }) => {
  console.log(onAddedComment, quoteID)
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, onAddedComment, error]); // include all useHTTP return variables

  const submitFormHandler = (event) => {
    event.preventDefault();
    //% Send comment to Firebase server
    const enteredText = commentTextRef.current.value;
    sendRequest({commentData: { text: enteredText }, quoteID});
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {/* Render loading spinner when the request is on its way */}
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
