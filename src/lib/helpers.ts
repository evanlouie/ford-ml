import { IJobList } from "./types";

export interface IModel {
  name: string; // base model name
}

export interface ITrainedModel extends IModel {
  // @TODO: find out what trained models have that base models dont'
  score: number;
}

export interface IDataset {
  directory: string; // fully qualified URL to folder containing dataset in blob storage
}

export interface IJob {
  // @TODO: fill in what a "job" actually has
  name: string;
  status: string; // latest status
  startTime: string;
  completionTime: string;
}

export interface IDeployment {
  // @TODO: fill in the minimum for what is needed to track a deployment
  id: string;
}

export const getModels = async (): Promise<IModel[]> => [
  { name: "rcnn" },
  { name: "other cool model 1" },
  { name: "other cool model 2" },
  { name: "other cool model 3" },
  { name: "other cool model 4" },
];

export const getTrainedModels = async (): Promise<ITrainedModel[]> => [
  {
    name: "foobar",
    score: 123,
  },
];

export const getDatasets = async (): Promise<IDataset[]> => [
  { directory: "/foo/awe/aewf/aw/aewfawefa" },
  { directory: "/aoiwejf/awef/awef/23f/2j" },
  { directory: "/fooa/awf/23f2/4b//f/" },
  { directory: "/foo/awe/aewf/aw/aewfawefaaweifjawe" },
];

export const getJobs = async (): Promise<IJob[]> => {
  const response = await fetch(`/apis/batch/v1/jobs`);
  const json: IJobList = await response.json();
  const jobs: IJob[] = json.items!.map(item => {
    return {
      completionTime: item.status.completionTime,
      name: item.metadata.name,
      startTime: item.status.startTime,
      status:
        item.status.conditions!.length > 0 ? item.status.conditions![0].type : "No status found",
    };
  });
  return jobs;
};

export const getDeployments = async (): Promise<IDeployment[]> => [];

export const train = async (dataset: string, model: string): Promise<number> => {
  console.info(`Submitting training job for dataset ${dataset} using ${model}`);
  return 123; // Return job-id
};

export const deploy = async (trainedModel: IModel) => {
  return true;
};

export const teardown = async (deployment: IDeployment) => {
  return true;
};
