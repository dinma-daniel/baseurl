import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, value, onChange }: InputFieldProps) {
  return (
    <div className="relative w-full rounded-xl bg-gray-200 p-2 pt-6 dark:dark:bg-zinc-900">
      <input
        type="text"
        name="name"
        required
        className="peer h-full w-full border-b-2 border-gray-300 bg-gray-200 text-base text-gray-800 outline-none dark:border-border-dark dark:dark:bg-zinc-900 dark:text-white"
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor="name"
        className="pointer-events-none absolute top-6 left-2 text-sm text-gray-800 transition-all peer-valid:top-1 peer-valid:text-blue-500 peer-focus:top-1 peer-focus:text-blue-500 dark:text-white"
      >
        {label}
      </label>
    </div>
  );
}
