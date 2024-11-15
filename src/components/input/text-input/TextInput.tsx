import { ChangeEvent, useId } from "react";
import "./TextInput.css";
import isEmpty from "../../../validation/isEmpty";


// Text Input Props Interface
interface IProps {
  name?: string;
  type: HTMLInputElement["type"];
  id?: string;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showRequiredStar?: boolean;
  min?: string;
  max?: string;
  maxLength?: number;
  disabled?: boolean;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  title?: string;
  children?: React.ReactNode;
  readOnly?: boolean;
}

// Can be Text, Password, Email, Number(Unformatted) or Url Input
const TextInput = ({
  name = "",
  id = "",
  type,
  className = "",
  placeholder,
  value,
  onChange,
  required,
  showRequiredStar,
  min,
  max,
  maxLength,
  disabled,
  onFocus,
  autoComplete,
  title = "",
  children,
  readOnly = false,
}: IProps) => {
  const randomId = useId();
  return (
    <>
      <label htmlFor={id || `text_input_${randomId}`}>
        <input
          type={type}
          id={id || `text_input_${randomId}`}
          className={`
        ${className} ${disabled === true ? "disabled-text-input" : ""} ${
            !isEmpty(value) ? "not-empty-input" : ""
          }
        `}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          maxLength={maxLength}
          disabled={disabled}
          onFocus={onFocus}
          autoComplete={autoComplete}
          title={title}
          readOnly={readOnly}
        />
        <span className="placeholder">
          {placeholder}{" "}
          <div className="required_star">
            {!disabled && showRequiredStar && "*"}
          </div>
        </span>
        {children}
      </label>
    </>
  );
};

export default TextInput;
