import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string[];                  // MULTI-SELECT
  onChange: (values: string[]) => void;
}

export default function Dropdown({ label, options, selected, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border rounded-md bg-white shadow-sm flex items-center gap-2"
        type="button"
      >
        {label}
        <span className="text-gray-500">▾</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-md z-20 max-h-64 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex justify-between`}
              onClick={() => toggleOption(opt)}
            >
              {opt}
              {selected.includes(opt) && <span>✔</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
