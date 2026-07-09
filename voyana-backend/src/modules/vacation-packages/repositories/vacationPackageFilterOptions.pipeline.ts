import type { PipelineStage } from "mongoose";

export const buildStringValueFilterOptionsPipeline = ({
  labelPath,
  sort = { value: 1 },
  valuePath,
}: {
  labelPath?: string;
  sort?: Record<string, 1 | -1>;
  valuePath: string;
}): PipelineStage[] => [
  {
    $match: {
      [valuePath]: { $type: "string" },
    },
  },
  {
    $group: {
      _id: `$${valuePath}`,
      count: { $sum: 1 },
      label: { $first: `$${labelPath ?? valuePath}` },
    },
  },
  {
    $project: {
      _id: 0,
      label: "$label",
      value: "$_id",
      count: 1,
    },
  },
  { $sort: sort },
];

export const buildLabelValueArrayFilterOptionsPipeline = ({
  arrayPath,
  sort = { value: 1 },
}: {
  arrayPath: string;
  sort?: Record<string, 1 | -1>;
}): PipelineStage[] => [
  { $unwind: `$${arrayPath}` },
  {
    $match: {
      [`${arrayPath}.value`]: { $type: "string" },
    },
  },
  {
    $group: {
      _id: `$${arrayPath}.value`,
      count: { $sum: 1 },
      label: { $first: `$${arrayPath}.label` },
    },
  },
  {
    $project: {
      _id: 0,
      label: "$label",
      value: "$_id",
      count: 1,
    },
  },
  { $sort: sort },
];
