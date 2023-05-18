export type LabGraphType = {
  keyword: string;
  line: number[][];
  scatter: number[][];
};

export type LabRegressionType = {
  keyword: string;
  coefficient: number;
}

export type ChangeType = "increase" | "decrease" | "noChange";