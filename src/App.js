import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Home = React.lazy(() => import("./components/Home"));
const CoffeeOverview = React.lazy(() => import("./components/CoffeeOverview"));

const loading = () => <div>loading...</div>;

function App() {
  return (
    <React.Suspense fallback={loading()}>
      <Router>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/coffee/:name"
            exact={true}
            render={(props) => <CoffeeOverview {...props} />}
          />
        </Switch>
      </Router>
    </React.Suspense>
    // <div>
    //   <Home />
    // </div>
  );
}

export default App;
