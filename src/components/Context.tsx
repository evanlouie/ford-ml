import * as React from "react";
import {
  getDatasets,
  getModels,
  getTrainedModels,
  IDataset,
  IJob,
  IModel,
  ITrainedModel,
} from "../lib/helpers";

export interface IAppState {
  models: IModel[];
  jobs: IJob[];
  trainedModels: ITrainedModel[];
  datasets: IDataset[];
  update: <T extends { [key: string]: any }>(state: T) => Promise<any>;
}

export class Context extends React.Component {
  private static context: React.Context<IAppState>;

  public static get Consumer() {
    return this.context.Consumer;
  }

  public state: IAppState = {
    datasets: [],
    jobs: [],
    models: [],
    trainedModels: [],
    update: state => new Promise(resolve => this.setState(state)),
  };

  public componentDidMount() {
    getDatasets().then(datasets => this.setState({ datasets }));
    getModels().then(models => this.setState({ models }));
    getTrainedModels().then(trainedModels => this.setState({ trainedModels }));
  }

  public render() {
    if (!Context.context) {
      Context.context = React.createContext(this.state);
    }

    const { Provider } = Context.context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
