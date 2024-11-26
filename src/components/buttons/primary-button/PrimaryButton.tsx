
import './PrimaryButton.css';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset"; 
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  icon,
  disabled = false,
  className = '',
  type = "button" 
}) => {
  return (
    <button
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={`primary-button ${className}`}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {label}
    </button>
  );
};

export default PrimaryButton;
