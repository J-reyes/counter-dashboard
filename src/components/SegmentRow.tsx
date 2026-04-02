import type { Segment } from "../types";

interface SegmentRowProps {
  segment: Segment;
  index: number;
  onIncrementSegment: () => void;
  onDecrementSegment: () => void;
  onDeleteSegment: () => void;
}
export default function SegmentRow({
  segment,
  index,
  onIncrementSegment,
  onDecrementSegment,
  onDeleteSegment,
}: SegmentRowProps) {
  return (
    <div>
      <span>Set {index + 1}</span>
      <button onClick={onDecrementSegment}>Decrement -</button>
      <span>{segment.count}</span>
      <button onClick={onIncrementSegment}>Increment +</button>
      <button onClick={onDeleteSegment}>Delete</button>
    </div>
  );
}
