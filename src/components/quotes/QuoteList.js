import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, sortOrder) => {
  return quotes.sort((quoteA, quoteB) => {
    if (sortOrder) return quoteA.id > quoteB.id ? 1 : -1;
    if (!sortOrder) return quoteA.id < quoteB.id ? 1 : -1;
  });
};

const QuoteList = (props) => {
  // ----------------[ GRAB REQUIRED DATA ]------------------------
  const history = useHistory(); // history object
  const location = useLocation(); // location object

  //% Break down the current URL's query parameters
  let queryParameters = new URLSearchParams(location.search);
  const qpValue = queryParameters.get("sort"); // equals undefined, asc, or desc

  //% Sort the quotes based on the query parameter of the searched URL
  let stateVari;
  if (qpValue === "desc") stateVari = false;
  if (qpValue === "asc") stateVari = true;
  if (!qpValue) stateVari = true; // if QP's undefined → sort ascending by default
  const [sortOrder, setSortOrder] = useState(stateVari);
  const sortedQuotes = sortQuotes(props.quotes, sortOrder);

  //% Switch query parameter between ?sort=asc or ?sort=desc when we hit the button
  const changeSortingHandler = () => {
    const flippedSortOrder = sortOrder ? "desc" : "asc";
    history.push(`/quotes?sort=${flippedSortOrder}`);
    setSortOrder((state) => !state); // flip the sortOrder value for real now
  };
  return (
    <Fragment>
      <div>
        <button onClick={changeSortingHandler}>
          Sort {sortOrder ? "descending" : "ascending"}
        </button>
        <p>Currently sorted {sortOrder ? "ascending" : "descending"}</p>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
// http://localhost:3000/quotes       (ascending)
// http://localhost:3000/quotes?sort=desc (descending)
// http://localhost:3000/quotes?sort=asc  (ascending)
