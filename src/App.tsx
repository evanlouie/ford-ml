import * as React from "react";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import "./App.css";
import { JobForm } from "./components/JobForm";
import { ModelList } from "./components/ModelList";

export class App extends React.Component {
  public static exactRoutes: {
    [route: string]: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  } = {
    "/": JobForm,
    "/model": ModelList,
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Ford ML</h1>
        </header>
        <BrowserRouter>
          <div>
            {Object.entries(App.exactRoutes).map(([route, component]) => {
              return <Route key={route} exact path={route} component={component} />;
            })}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
