import type { Segment } from "../types";

interface SegmentRowProps {
  segment: Segment;
  index: number;
  onIncrementSegment: () => void;
  onDecrementSegment: () => void;
  onDeleteSegment: () => void;
}

export default function SegmentRow({ segment, index, onIncrementSegment, onDecrementSegment, onDeleteSegment }: SegmentRowProps) {
  return (
    <div className="segment-row">
      <span className="segment-label">Set {index + 1}</span>
      <button className="btn btn-control btn-sm" onClick={onDecrementSegment}>−</button>
      <span className="segment-count">{segment.count}</span>
      <button className="btn btn-control btn-sm" onClick={onIncrementSegment}>+</button>
      <div className="segment-delete">
        <button className="btn btn-danger btn-sm" onClick={onDeleteSegment}>Delete</button>
      </div>
    </div>
  );
}
