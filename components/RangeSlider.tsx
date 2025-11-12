"use state";
import { useState } from "react";

export default function RangeSlider({
  onMinimumChange,
  onMaximumChange,
}: {
  onMinimumChange: (minVal: number) => void;
  onMaximumChange: (maxVal: number) => void;
}) {
  const [minimum, setMinimum] = useState(1);
  const [maximum, setMaximum] = useState(10000);

  return (
    <div className="flex flex-row gap-[-2]">
      <input
        type="range"
        name="minimum"
        value={minimum}
        min={0}
        max={5000}
        step={100}
        onChange={(event) => {
          const minVal = parseInt(event.target.value);
          setMinimum(minVal);
          onMinimumChange(minVal);
        }}
        style={{
          width: "50%",
          maxWidth: "200px",
        }}
      />
      <input
        type="range"
        name="maximum"
        min={0}
        max={5000}
        step={100}
        value={maximum}
        onChange={(event) => {
          const maxVal = parseInt(event.target.value);
          setMaximum(maxVal);
          onMaximumChange(maxVal);
        }}
        style={{
          width: "50%",
          maxWidth: "200px",
        }}
      />
    </div>
  );
}
