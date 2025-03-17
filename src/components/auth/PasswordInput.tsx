
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { PASSWORD_REQUIREMENTS } from '@/lib/constants';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  showRequirements?: boolean;
  required?: boolean;
}

const PasswordInput = ({
  value,
  onChange,
  name,
  placeholder = 'Password',
  error,
  helperText,
  showRequirements = false,
  required = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const checkRequirement = (regex: RegExp) => {
    return regex.test(value);
  };

  return (
    <div className="w-full space-y-1">
      <div className="relative">
        <Input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pr-10"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      {error && helperText && (
        <p className="text-xs text-destructive">{helperText}</p>
      )}
      
      {showRequirements && isFocused && (
        <div className="mt-2 text-xs space-y-1 bg-muted p-2 rounded-md">
          <p className="font-medium text-muted-foreground">Password must have:</p>
          <ul className="space-y-1">
            {PASSWORD_REQUIREMENTS.map((req) => (
              <li 
                key={req.id} 
                className={`flex items-center space-x-2 ${
                  checkRequirement(req.regex) 
                    ? 'text-green-600' 
                    : 'text-muted-foreground'
                }`}
              >
                <span className="w-4 h-4">
                  {checkRequirement(req.regex) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                </span>
                <span>{req.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
