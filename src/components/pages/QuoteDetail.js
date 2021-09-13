import React from "react";
import { Route, useParams } from "react-router";
import Comments from "../comments/Comments";
import { useCustomHook } from "../../context";
import HighlightedQuote from "../quotes/HighlightedQuote";

export default function QuoteDetail() {
  const { DUMMY_QUOTES } = useCustomHook(); // list of dummy quotes fr/ context file
  const params = useParams(); // :quoteID from App.js

  // Find the quote in our list that matches the params.quoteID to display itsinfo
  /*const DUMMY_QUOTES_IN_CONTEXT.JS = [
    { id: "q1", author: "max", text: "Learning React is fun!" },
    { id: "q2", author: "Maximilian", text: "Learning React is great!" },
  ]; */
  const quote = DUMMY_QUOTES.find((quoteObj) => {
    return quoteObj.id === params.quoteID;
  });
  if (!quote) {
    return <p>No quote found!</p>;
  }
  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={`/quotes/${params.quoteID}/comments`}>
        <Comments />
      </Route>
    </>
  );
}
