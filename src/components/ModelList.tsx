import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { ITrainedModel } from "../lib/helpers";

interface IProps {
  models: ITrainedModel[];
  deploy: (model: ITrainedModel) => Promise<any>;
}

export const ModelList = ({ models, deploy }: IProps) => (
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
        {models.map(model => {
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
