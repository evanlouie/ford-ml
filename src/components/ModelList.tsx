import * as React from "react";
import { deploy, getTrainedModels, ITrainedModel } from "../lib/helpers";

interface IState {
  models: ITrainedModel[];
}

export class ModelList extends React.Component<{}, IState> {
  public state: IState = {
    models: [],
  };

  public componentDidMount() {
    getTrainedModels().then(models => this.setState({ models }));
  }
  public render() {
    return (
      <div className="ModelList">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.models.map(model => {
              return (
                <tr key={model.name + model.score}>
                  <td>{model.name}</td>
                  <td>{model.score}</td>
                  <td>
                    <button onClick={() => deploy(model)}>Deploy</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
