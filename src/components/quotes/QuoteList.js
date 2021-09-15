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
  const longQueryParamString = location.search; // queryParameter string
  // ----------------[ PREPARATION OVER ]------------------------
  //% STEP 2.2
  // Sort the quotes with our helper function according to sortOrder's Boolean
  // When true, sort ascending. When false, sort descending
  const [sortOrder, setSortOrder] = useState(true);
  const sortedQuotes = sortQuotes(props.quotes, sortOrder);

  //% STEP 2.1: Switch query parameter between ?sort=asc or ?sort=desc
  const changeSortingHandler = () => {
    const flippedSortOrder = sortOrder ? "desc" : "asc";
    history.push(`/quotes?sort=${flippedSortOrder}`);
    setSortOrder((state) => !state); // flip the sortOrder vakue for real now
  };
  return (
    <Fragment>
      <div>
        <button onClick={changeSortingHandler}>
          Sort {sortOrder ? "Descending" : "Ascending"}
        </button>
        <p>Currently sorted {sortOrder ? "Ascending" : "Descending"}</p>
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
