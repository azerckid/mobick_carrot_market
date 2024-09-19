import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input className="basic-input" name={name} {...rest} />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
