import { useState } from "react";

export default function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="px-3 py-2 border rounded-md bg-white shadow-sm"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {label}: {value || "All"}
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-md z-10">
          {options.map((opt) => (
            <div
              key={opt}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
