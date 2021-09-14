import { useRef, useState, Fragment } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntered, setIsEntered] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    // Could validate here, but I choose not to
    event.preventDefault();
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    // Drilling upwards:
    // onAddQuote is a function from NewQuote.js that accepts the following obj of data
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  // set isEntered to true when you focus/start the form
  // set isEntered to false when you submit the form using a button
  const formFocusHandler = ()=> setIsEntered(true);
  const finishFormHandler= () => setIsEntered(false);

  const promptMessageFN = (location) => {
    console.log(location);
    return "Are you sure you wish to leave? All your entered data will be lost";
  };
  return (
    <Fragment>
      <Prompt when={isEntered} message={promptMessageFN} /> 
      {/* Only fire off a prompt when isEntered is true */}
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishFormHandler} className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
