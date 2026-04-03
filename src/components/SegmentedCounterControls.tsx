import SegmentRow from "./SegmentRow";
import type { SegmentedCounter } from "../types";

interface SegmentedCounterControlsProps {
  counter: SegmentedCounter;
  onAddSegment: (counterId: string) => void;
  onIncrementSegment: (counterId: string, segmentId: string) => void;
  onDecrementSegment: (counterId: string, segmentId: string) => void;
  onDeleteSegment: (counterId: string, segmentId: string) => void;
}

export default function SegmentedCounterControls({
  counter,
  onAddSegment,
  onIncrementSegment,
  onDecrementSegment,
  onDeleteSegment,
}: SegmentedCounterControlsProps) {
  return (
    <div className="segmented-controls">
      <div className="segmented-header">
        <button className="btn btn-primary" onClick={() => onAddSegment(counter.id)}>
          + Add Set
        </button>
      </div>
      <div className="segments-list">
        {counter.segments.length > 0 ? (
          counter.segments.map((segment, index) => (
            <SegmentRow
              key={segment.id}
              segment={segment}
              index={index}
              onIncrementSegment={() => onIncrementSegment(counter.id, segment.id)}
              onDecrementSegment={() => onDecrementSegment(counter.id, segment.id)}
              onDeleteSegment={() => onDeleteSegment(counter.id, segment.id)}
            />
          ))
        ) : (
          <p className="empty-state">No sets yet — add one above.</p>
        )}
      </div>
    </div>
  );
}
