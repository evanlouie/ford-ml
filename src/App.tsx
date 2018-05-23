import { AppBar, Button, CssBaseline, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { BrowserRouter, Link, Route, RouteComponentProps } from "react-router-dom";
import { Context } from "./components/Context";
import { JobForm } from "./components/JobForm";
import { ModelList } from "./components/ModelList";
import { deploy, ITrainedModel } from "./lib/helpers";

export class App extends React.Component {
  public static exactRoutes: {
    [route: string]: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  } = {
    "/": () => (
      <Context.Consumer>
        {state => <JobForm models={state.models} datasets={state.datasets} />}
      </Context.Consumer>
    ),
    "/jobs": () => <div className="JobList">LIST JOBS</div>,
    "/jobs/:id": () => <div className="JobView">View Job</div>,
    "/models": () => (
      <Context.Consumer>
        {state => (
          <ModelList
            models={state.trainedModels}
            deploy={(model: ITrainedModel) => deploy(model)}
          />
        )}
      </Context.Consumer>
    ),
  };

  public render() {
    return (
      <div className="App">
        <Context>
          <BrowserRouter>
            <React.Fragment>
              <CssBaseline />
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="title" color="inherit">
                    Ford ML
                  </Typography>
                </Toolbar>
              </AppBar>
              <Grid container className="App" style={{ padding: "1em" }} spacing={8}>
                <Grid item xs={12}>
                  <Paper style={{ padding: "1em" }}>
                    <Grid container spacing={8} style={{ marginBottom: "1em" }}>
                      <Grid item>
                        <Link to="/" style={{ textDecoration: "none" }}>
                          <Button color="primary">Submit Training Job</Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link to="/models" style={{ textDecoration: "none" }}>
                          <Button color="secondary">Trained Models</Button>
                        </Link>
                      </Grid>
                    </Grid>
                    {Object.entries(App.exactRoutes).map(([route, component]) => {
                      return <Route key={route} exact path={route} component={component} />;
                    })}
                  </Paper>
                </Grid>
              </Grid>
            </React.Fragment>
          </BrowserRouter>
        </Context>
      </div>
    );
  }
}
