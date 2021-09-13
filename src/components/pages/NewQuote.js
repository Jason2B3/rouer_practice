import React from "react";
import QuoteForm from "../quotes/QuoteForm";
export default function NewQuote() {
  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
}
