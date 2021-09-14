import { Route, Switch, Redirect } from "react-router-dom";
import AllQuotes from "./components/pages/AllQuotes";
import NewQuote from "./components/pages/NewQuote";
import QuoteDetail from "./components/pages/QuoteDetail";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/layout/Layout";
import BBB from "./context";
function App() {
  return (
    <Layout>
      <BBB>
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
      </BBB>
    </Layout>
  );
}

export default App;

// const { DUMMY_QUOTES } = useCustomHook();
