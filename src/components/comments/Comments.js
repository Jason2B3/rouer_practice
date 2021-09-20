import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getAllComments } from "../../lib/api";
// Comment imports
import classes from "./Comments.module.css";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

const Comments = ({ quoteID }) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  // Run async code with useEffect
  useEffect(() => {
    sendRequest(quoteID); // quoteID is a long random string that Firebase made
  }, [sendRequest, quoteID]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  // Immediately loads all comments after its added by pressing the button
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteID); // quoteID is a long random string that Firebase made
  }, [sendRequest, quoteID]);

  let comments;
  //% Conditional JSX for pending state
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  //% Conditional JSX for completed state with comments retrieved
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }
  //% Conditional JSX for completed state with no comments found
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteID={quoteID}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
