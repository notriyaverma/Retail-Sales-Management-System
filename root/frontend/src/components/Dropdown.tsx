import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

interface DropdownProps {
  label: string;
  value: string | null;
  options: Option[];
  onChange: (v: string) => void;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value) || null;

  return (
    <div className="relative inline-block text-sm">
      <button
        className="px-3 py-2 border rounded-md bg-white shadow-sm flex items-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="text-gray-600">{label}:</span>
        <span className="font-medium">
          {selected ? selected.label : "All"}
        </span>
      </button>

      {open && (
        <div className="absolute mt-2 w-56 bg-white border rounded-md shadow-md z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                opt.value === value ? "bg-gray-50 font-medium" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
