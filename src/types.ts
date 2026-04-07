export type Segment = {
  readonly id: string;
  count: number;
};

export type Category = {
  readonly id: string;
  name: string;
  readonly createdAt: string;
};

type BaseCounter = {
  readonly id: string;
  label: string;
  readonly createdAt: string;
  lastModified: string;
  readonly categoryId: string;
};

export type SimpleCounter = BaseCounter & {
  mode: "simple";
  count: number;
};

export type SegmentedCounter = BaseCounter & {
  mode: "segmented";
  segments: Segment[];
};

export type Counter = SimpleCounter | SegmentedCounter;