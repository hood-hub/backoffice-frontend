import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  type = "text", 
  name, 
  placeholder = "", 
  value, 
  onChange, 
  error, 
  className 
}) => {
  return (
    <div style={{ marginBottom: '1em' }} className={className}>
      {label && (
        <label 
          htmlFor={name} 
          style={{ 
            display: 'block', 
            marginBottom: '0.5em',
            fontSize: '14px',    
            fontWeight: 100,      
            color: '#344054'
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          height: '4.4rem',
          width: '100%',
          padding: '0.5em',
          border: error ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none', // Remove default focus outline
          transition: 'border-color 0.2s ease', // Smooth transition
        }}
        onFocus={(e) => (e.target.style.borderColor = '#6A0DAD')}
        onBlur={(e) => (e.target.style.borderColor = error ? 'red' : '#ccc')}
      />
      {error && <p style={{ color: 'red', fontSize: '0.8em' }}>{error}</p>}
    </div>
  );
};

export default Input;
