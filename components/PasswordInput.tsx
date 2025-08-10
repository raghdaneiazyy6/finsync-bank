import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Info, Check, X } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  className?: string;
  showTooltip?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  showTooltip = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Password validation checks
  const passwordChecks = [
    {
      label: "8-32 characters",
      test: value.length >= 8 && value.length <= 32,
    },
    {
      label: "One uppercase letter (A-Z)",
      test: /[A-Z]/.test(value),
    },
    {
      label: "One lowercase letter (a-z)",
      test: /[a-z]/.test(value),
    },
    {
      label: "One number (0-9)",
      test: /\d/.test(value),
    },
    {
      label: "One special character (@$!%*?&#)",
      test: /[@$!%*?&#]/.test(value),
    },
  ];

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`pr-20 ${className}`}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {showTooltip && (
          <div className="relative">
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-4 w-4 text-gray-400" />
            </button>
            {showInfo && (
              <div className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                <p className="font-semibold mb-2">Password must contain:</p>
                <ul className="space-y-1">
                  {passwordChecks.map((check, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {check.test ? (
                        <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="h-3 w-3 text-red-400 flex-shrink-0" />
                      )}
                      <span
                        className={
                          check.test ? "text-green-400" : "text-gray-300"
                        }
                      >
                        {check.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-400" />
          ) : (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};
