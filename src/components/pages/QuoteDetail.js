import React from "react";
import { useParams } from "react-router";
import { Route, useRouteMatch, useLocation, Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useCustomHook } from "../../context";
import HighlightedQuote from "../quotes/HighlightedQuote";

export default function QuoteDetail() {
  const match = useRouteMatch();
  console.log(match.path, "->", match.url);
  // Ex. {path: '/quotes/:quoteID', url: '/quotes/q1',
  // isExact: true, params: {quoteID: 'q1'}}

  const { DUMMY_QUOTES } = useCustomHook(); // list of dummy quotes fr/ context file
  const params = useParams(); // :quoteID from App.js (should be q1 or q2)
  const regParameter = params.quoteID;

  // Find the quote in our list that matches the params.quoteID to display its info
  const quote = DUMMY_QUOTES.find((quoteObj) => {
    return quoteObj.id === regParameter;
  });
  if (!quote) return <p>No quote found!</p>;

  const pathToQuotesIDPage = match.url;
  const pathToCommentsPage = `${match.url}/comments`;
  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      {/* We're already inside the next route that follows */}
      <Route path={pathToQuotesIDPage} exact>
        <div className="centered">
          <Link to={pathToCommentsPage} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>
      {/* This route's taken if we press the "load comments" button */}
      <Route path={pathToCommentsPage} exact>
        <Comments />
      </Route>
    </>
  );
}
/*
http://localhost:3000/quotes/q1
*/
