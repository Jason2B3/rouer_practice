import React, { useEffect } from "react";
import QuoteForm from "../quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";
export default function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote); // explained at bottom
  const history = useHistory(); // an object containing the URL history

  // Once our HTTP request finishes (success or fail), change the URL to the route which renders AllQuotes.js
  useEffect(() => {
    if (status === "completed") history.push("/quotes");
  }, [status, history]);

  // Send the typed quote to our Firebase backend
  // This function's invoked in a diff component: QuoteForm
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  // A spinner loads in QuoteForm if "isLoading" equals true
  return (
    <QuoteForm onAddQuote={addQuoteHandler} isLoading={status === "pending"} />
  );
}
/*
sendRequest(needsArg)
a superior version of the addQuote function that includes...
(error handling + success/fail/pending state management), refer to as PKG

status
a part of the state object defined in use-http.js 's reducer function
equals "pending" or "completed" (regardless of whether the operation succeeded or not)

both were created by supplying the useHttp custom hook with
a function that makes some kind of HTTP request
All the useHttp does is provide PKG

All the HTTP request functions for this project are defined inside lib/api.js
These are simple async functions with no PKG on their own
The Udemy prof created useHttp to help provide these without retyping them over and over
*/
