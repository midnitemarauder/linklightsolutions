import { ChangeEvent } from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required
}: FormInputProps) {
  const baseClassName = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 hover:shadow-md";

  return (
    <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={`from_${id}`}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          className={baseClassName}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={`from_${id}`}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClassName}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}