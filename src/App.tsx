import { Route, Router, Switch, type AroundNavHandler } from "wouter";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import LicenseDetails from "./pages/LicenseDetails";
import NotFound from "./pages/NotFound";
import { flushSync } from "react-dom";

const aroundNav: AroundNavHandler = (navigate, to, options) => {
  if (!document.startViewTransition) {
    // check if supported
    navigate(to, options);
    return;
  }

  document.startViewTransition(() => {
    flushSync(() => {
      navigate(to, options);
    });
  });
};

function App() {
  return (
    <Router aroundNav={aroundNav}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/license-details/:barcode" component={LicenseDetails} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
