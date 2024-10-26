// Field.tsx
import React from 'react';

interface FieldInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FieldInput = ({ label, name, type = 'text', value, onChange, placeholder }:FieldInputProps ) => (
  <div className="field">
    <label htmlFor={name} className="block text-sm font-medium ">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"

    />
  </div>
);

export default FieldInput;
