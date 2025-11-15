"use client";
import { useEffect, useState } from "react";

interface RangeSliderProps {
  min: number; // actual min value (0–5000)
  max: number; // actual max value (5000–10000)
  onMinimumChange: (minVal: number) => void;
  onMaximumChange: (maxVal: number) => void;
}

export default function RangeSlider({
  min,
  max,
  onMinimumChange,
  onMaximumChange,
}: RangeSliderProps) {
  // internal state for the sliders
  const [minimum, setMinimum] = useState(min); // 0–5000
  const [maximum, setMaximum] = useState(max - 5000); // 0–5000 internally

  // update state when props change
  useEffect(() => {
    setMinimum(min);
  }, [min]);

  useEffect(() => {
    setMaximum(max - 5000);
  }, [max]);

  return (
    <div className="flex flex-row gap-0">
      {/* Minimum slider */}
      <input
        type="range"
        value={minimum}
        min={0}
        max={5000}
        step={100}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setMinimum(val);
          onMinimumChange(val); // actual value
        }}
        style={{ width: "50%", maxWidth: "200px" }}
      />

      {/* Maximum slider */}
      <input
        type="range"
        value={maximum}
        min={0}
        max={5000}
        step={100}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setMaximum(val);
          onMaximumChange(val + 5000); // add 5000 to get actual max
        }}
        style={{ width: "50%", maxWidth: "200px" }}
      />
    </div>
  );
}
