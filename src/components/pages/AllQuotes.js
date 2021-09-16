import React, { useEffect } from "react";
import QuoteList from "../quotes/QuoteList";
import NoQuotesFound from "../quotes/NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getAllQuotes } from "../../lib/api";

export default function AllQuotes() {
  const {
    sendRequest, //# GET request to firebase using sendRequest()
    status,
    error,
    data: loadedQuotes, // pull down every quote stored in Firebase
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  //# CONDITIONAL SECTION -------------------------------------------
  //# Basing our JSX on the state object values from use-http.js (imported KVP's to this file earlier)
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={loadedQuotes} />;
}
