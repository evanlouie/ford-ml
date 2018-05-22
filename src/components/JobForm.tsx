import * as React from "react";
import { getDatasets, getModels, IDataset, IModel } from "../lib/helpers";

export interface IJobFormState {
  dataset: string;
  model: string;
  datasets: IDataset[];
  models: IModel[];
}

export class JobForm extends React.Component<{}, IJobFormState> {
  public state: IJobFormState = {
    dataset: "",
    datasets: [],
    model: "",
    models: [],
  };

  public componentDidMount() {
    getDatasets().then(datasets => this.setState({ datasets }));
    getModels().then(models => this.setState({ models }));
  }

  public render() {
    const { datasets, models } = this.state;
    return (
      <div className="JobForm">
        <label>
          Select Dataset:
          <select className="JobForm__dataset" onChange={this.updateDataset}>
            <option />
            {datasets.map(dataset => (
              <option key={dataset.directory} value={dataset.directory}>
                {dataset.directory}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select Training Model:
          <select className="JobForm__model" onChange={this.updateModel}>
            <option />
            {models.map(model => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => console.log(this.state.dataset, this.state.model)}>Run</button>
      </div>
    );
  }

  private updateDataset = (e: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({ dataset: e.target.value });

  private updateModel = (e: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({ model: e.target.value });
}
