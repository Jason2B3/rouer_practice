import React from "react";
import { useParams } from "react-router";

export default function QuoteDetail() {
  const params = useParams();
  console.log(params.quoteID);
  return <h1>Quote Detail Page</h1>;
}
