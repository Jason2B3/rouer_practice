import React from "react";
import QuoteForm from "../quotes/QuoteForm";
import { useHistory } from "react-router-dom";

export default function NewQuote() {
  const history = useHistory(); // an object containing the URL history
  
  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    console.log(history, 99);
    //% Take us to the /quotes route that renders AllQuotes.js
    history.push("/quotes"); 
    // redirects us to the route with a path of /quotes
    // while letting us go back to the previous pg if we want
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
}
