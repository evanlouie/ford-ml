/**
 * Auto generated with https://jvilk.com/MakeTypes/
 */
export interface IJobList {
  kind: string;
  apiVersion: string;
  metadata: IMetadata;
  items?: IItemsEntity[] | null;
}
export interface IMetadata {
  selfLink: string;
  resourceVersion: string;
}
export interface IItemsEntity {
  metadata: IMetadata1;
  spec: ISpec;
  status: IStatus;
}
export interface IMetadata1 {
  name: string;
  namespace: string;
  selfLink: string;
  uid: string;
  resourceVersion: string;
  creationTimestamp: string;
  labels: ILabels;
}
export interface ILabels {
  "controller-uid": string;
  "job-name": string;
}
export interface ISpec {
  parallelism: number;
  completions: number;
  backoffLimit: number;
  selector: ISelector;
  template: ITemplate;
}
export interface ISelector {
  matchLabels: IMatchLabels;
}
export interface IMatchLabels {
  "controller-uid": string;
}
export interface ITemplate {
  metadata: IMetadata2;
  spec: ISpec1;
}
export interface IMetadata2 {
  creationTimestamp?: null;
  labels: ILabels;
}
export interface ISpec1 {
  containers?: IContainersEntity[] | null;
  restartPolicy: string;
  terminationGracePeriodSeconds: number;
  dnsPolicy: string;
  securityContext: IResourcesOrSecurityContext;
  schedulerName: string;
}
export interface IContainersEntity {
  name: string;
  image: string;
  command?: string[] | null;
  resources: IResourcesOrSecurityContext;
  terminationMessagePath: string;
  terminationMessagePolicy: string;
  imagePullPolicy: string;
}
export type IResourcesOrSecurityContext = any[];

export interface IStatus {
  conditions?: IConditionsEntity[] | null;
  startTime: string;
  completionTime: string;
  succeeded: number;
}
export interface IConditionsEntity {
  type: string;
  status: string;
  lastProbeTime: string;
  lastTransitionTime: string;
}
