import React from "react";
import QuoteList from "../quotes/QuoteList";
import { useCustomHook } from "../../context";
// will eventually fetch quotes from a server

export default function AllQuotes() {
  const { DUMMY_QUOTES } = useCustomHook();
  return <QuoteList quotes={DUMMY_QUOTES} />;
}
