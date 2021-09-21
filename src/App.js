import { Route, Switch, Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import AllQuotes from "./components/pages/AllQuotes";
import QuoteDetail from "./components/pages/QuoteDetail";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Layout from "./components/layout/Layout";
import BBB from "./context";
// Lazy load these components:
const NotFound = lazy(() => import("./components/pages/NotFound"));
const NewQuote = lazy(() => import("./components/pages/NewQuote"));

function App() {
  const fallbackJSX = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );
  return (
    <Layout>
      <BBB>
        <Suspense fallback={fallbackJSX}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteID">
              <QuoteDetail />
            </Route>
            <Route path="/new-quote">
              <NewQuote />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </BBB>
    </Layout>
  );
}

export default App;

// const { DUMMY_QUOTES } = useCustomHook();
