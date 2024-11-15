import React from 'react';
import './CheckBox.css'

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, className }) => {
  return (
    <label className={`checkbox-container ${className}`}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        className="checkbox-input" 
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default Checkbox;
