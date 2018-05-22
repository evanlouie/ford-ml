import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
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
      <Paper className="ModelList">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.models.map(model => {
              return (
                <TableRow key={model.name + model.score}>
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.score}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => deploy(model)}>
                      Deploy
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
