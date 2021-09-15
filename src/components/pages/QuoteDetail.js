import React from "react";
import { useParams } from "react-router";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import Comments from "../comments/Comments";
import { useCustomHook } from "../../context";
import HighlightedQuote from "../quotes/HighlightedQuote";

export default function QuoteDetail() {
  const { DUMMY_QUOTES } = useCustomHook(); // list of dummy quotes fr/ context file
  const params = useParams(); // :quoteID from App.js (should be q1 or q2)
  console.log(params);

  // Find the quote in our list that matches the params.quoteID to display its info
  const quote = DUMMY_QUOTES.find((quoteObj) => {
    return quoteObj.id === params.quoteID;
  });
  if (!quote) return <p>No quote found!</p>;

  const pathToCommentsPage = `/quotes/${params.quoteID}/comments`;
  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={pathToCommentsPage}>
        <Comments />
      </Route>
      <div className="centered">
        <Link to={pathToCommentsPage} className="btn--flat">
          Load Comments
        </Link>
      </div>
    </>
  );
}
/*
http://localhost:3000/quotes/q1
*/
