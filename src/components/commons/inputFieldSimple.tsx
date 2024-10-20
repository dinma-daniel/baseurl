import React from "react";

interface InputFieldSimpleProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputFieldSimple({
  label,
  placeholder,
  value,
  onChange,
}: InputFieldSimpleProps) {
  return (
    <div className="relative w-full space-y-2">
      <label htmlFor="name" className="text-sm text-gray-800 dark:text-white">
        {label}
      </label>
      <input
        type="text"
        name="name"
        className="w-full rounded-full bg-zinc-200 p-2 text-base text-gray-800 dark:bg-zinc-900 dark:text-white"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
