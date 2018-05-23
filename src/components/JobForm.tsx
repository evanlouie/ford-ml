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
import { IDataset, IModel, train } from "../lib/helpers";

export interface IJobFormState {
  dataset: string;
  model: string;
  running: boolean;
}

export interface IJobFormProps {
  datasets: IDataset[];
  models: IModel[];
}

export class JobForm extends React.Component<IJobFormProps, IJobFormState> {
  public state: IJobFormState = {
    dataset: "",
    model: "",
    running: false,
  };

  public render() {
    const { datasets, models } = this.props;
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
                style={{ minWidth: "15em" }}
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
                style={{ width: "15em" }}
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
              disabled={!(!!this.state.dataset && !!this.state.model) || this.state.running}
              variant="raised"
              color="primary"
              onClick={async () => {
                this.setState({ running: true });
                const jobId = await train(this.state.dataset, this.state.model);
                this.setState({ running: false });
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
