"use client";
import { useState } from "react";

const ToggleSwitch = ({ initial, onChange }) => {
  const [enabled, setEnabled] = useState(initial);

  const handleToggle = () => {
    setEnabled(!enabled);
    onChange && onChange(!enabled); // send back to parent if needed
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
        enabled ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
