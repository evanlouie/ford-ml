import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { Redirect } from "react-router";
import { getDatasets, getModels, IDataset, IModel, train } from "../lib/helpers";

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
      <form className="JobForm">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography>Select a Dataset and Model to train against:</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel htmlFor="dataset-select">Dataset</InputLabel>
              <Select
                style={{ minWidth: "10em" }}
                className="JobForm__dataset"
                onChange={this.updateDataset}
                value={this.state.dataset}
                inputProps={{ name: "dataset", id: "dataset-select" }}
              >
                <MenuItem value="">
                  <em>Select Dataset</em>
                </MenuItem>
                {datasets.map(dataset => (
                  <MenuItem key={dataset.directory} value={dataset.directory}>
                    {dataset.directory}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel htmlFor="model-select">Model</InputLabel>
              <Select
                style={{ width: "10em" }}
                className="JobForm__model"
                onChange={this.updateModel}
                value={this.state.model}
                inputProps={{ name: "model", id: "model-select" }}
              >
                <MenuItem value="">Select Model</MenuItem>
                {models.map(model => (
                  <MenuItem key={model.name} value={model.name}>
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!(!!this.state.dataset && !!this.state.model)}
              variant="raised"
              color="primary"
              onClick={async () => {
                const jobId = await train(this.state.dataset, this.state.model);
                return <Redirect to={`/jobs/${jobId}`} />;
              }}
            >
              Run
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  private updateDataset = (e: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({ dataset: e.target.value });

  private updateModel = (e: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({ model: e.target.value });
}
