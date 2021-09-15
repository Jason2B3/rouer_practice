import classes from "./QuoteItem.module.css";
import { Link } from "react-router-dom";

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>
            {props.text} (ID:{props.id})
          </p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      {/* Link to a webpage whose URL ends in the quote's unique ID */}
      {/* The ID's are provided by QuoteList.js via props */}
      <Link to={`/quotes/${props.id}`} className="btn">
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
// "/quotes/:quoteID"
