import React from "react";
import { Route, useParams } from "react-router";
import Comments from "../comments/Comments";

export default function QuoteDetail() {
  const params = useParams();
  console.log(params.quoteID);
  return (
    <>
      <h1>Quote Detail Page</h1>
      <p>{params.quoteID}</p>
      <Route path={`/quotes/${params.quoteID}/comments`}>
        <Comments />
      </Route>
    </>
  );
}
