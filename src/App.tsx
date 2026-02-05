import { Route, Switch } from "wouter";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Scanner = lazy(() => import("./pages/Scanner"));
const LicenseDetails = lazy(() => import("./pages/LicenseDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/license-details/:barcode" component={LicenseDetails} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default App;
