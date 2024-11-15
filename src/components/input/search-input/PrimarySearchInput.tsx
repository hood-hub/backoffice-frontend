import { ChangeEvent } from "react";
import styles from "./PrimarySearchInput.module.css";
import searchIcon from "../../../assets/svg/sidebar-icons/search-icon.svg";

interface IProps {
  id?: string;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  title?: string;
}

function PrimarySearchInput({
  id,
  className,
  placeholder,
  value,
  onChange,
  disabled = false,
}: IProps) {
  return (
    <div
      className={`${styles.search_form_group}  ${
        className || "search_input_wrapper"
      }`}
    >
      <input
        type="search"
        id={id || `search_input_${Math.floor(Math.random() * 1000)}`}
        placeholder={placeholder || "Search"}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      <img src={searchIcon} alt="search-icon" />
    </div>
  );
}

export default PrimarySearchInput;
