import React, { ChangeEvent } from "react";

interface FormFieldProps {
  labelName: string;
  placeholder: string;
  isTextArea: boolean;
  type: "text" | "number" | "date";
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ labelName, placeholder, isTextArea, value, type, handleChange }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && <span className="font-medium text-[14px] leading-[22px] ">{labelName}</span>}
      {isTextArea ? (
        <textarea
          value={value}
          onChange={handleChange as (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void}
          rows={10}
          placeholder={placeholder}
          className="input focus-within:border-white focus:outline-white focus:text-white min-h-[10rem] px-4 border bg-[#334155] w-full font-medium text-white rounded-[10px]"
        />
      ) : (
        <input
          required
          value={value}
          type={type}
          onChange={handleChange}
          step="0.1"
          placeholder={placeholder}
          className="input focus-within:border-white focus:outline-white focus:text-white h-[2.2rem] min-h-[2.2rem] px-4 border bg-[#334155] w-full font-medium text-white rounded-[10px]"
        />
      )}
    </label>
  );
};

export default FormField;
