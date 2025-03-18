
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  showRequirements?: boolean;
  showToggle?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder = 'Password',
  value,
  onChange,
  error,
  helperText,
  required = false,
  showRequirements = false,
  showToggle = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pr-10 ${error ? 'border-destructive' : ''}`}
          required={required}
        />
        {showToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4 transition-transform rotate-180" />
            ) : (
              <EyeIcon className="h-4 w-4 transition-transform rotate-0" />
            )}
          </button>
        )}
      </div>
      
      {error && helperText && (
        <p className="text-destructive text-sm mt-1">{helperText}</p>
      )}
      
      {showRequirements && (
        <div className="text-xs text-muted-foreground mt-2">
          <p>Password must:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            <li>Be at least 8 characters long</li>
            <li>Include at least one uppercase letter</li>
            <li>Include at least one number</li>
            <li>Include at least one special character</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
