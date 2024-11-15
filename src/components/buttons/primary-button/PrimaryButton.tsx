import React from 'react';
import './PrimaryButton.css'
interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  icon,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`primary-button ${className}`}
    >
     {icon && <span className="button-icon">{icon}</span>} {/* Render the icon if provided */}
     {label}
    </button>
  );
};

export default PrimaryButton;
