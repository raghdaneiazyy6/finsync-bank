import React from "react";
import type { CustomInputProps } from "@/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Helper function to provide real-time hints
const getHelperText = (name: string, value: string): string | null => {
  switch (name) {
    case "firstName":
    case "lastName":
      if (value && !/^[A-Za-z'-]+$/.test(value)) {
        return "Only letters, apostrophes, and hyphens allowed";
      }
      break;
    case "state":
      if (value && value.length === 1) {
        return "Enter second letter of state code";
      }
      break;
    case "postalCode":
      if (value && !/^\d+(-\d+)?$/.test(value)) {
        return "Format: 12345 or 12345-6789";
      }
      break;
    case "ssn":
      const digits = value.replace(/\D/g, "");
      if (digits.length > 0 && digits.length < 9) {
        return `${9 - digits.length} more digits needed`;
      }
      break;
    case "email":
      if (value && !value.includes("@") && value.length > 3) {
        return "Email must include @ symbol";
      }
      break;
  }
  return null;
};

const CustomInput: React.FC<CustomInputProps> = ({
  form,
  name,
  label,
  placeholder,
  type = "text",
  onChange,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const { onChange: fieldOnChange, value, ...restField } = field;
        const helperText = getHelperText(name, value || "");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          // Call the field onChange to update the value
          fieldOnChange(e);

          // Call custom onChange if provided
          if (onChange) {
            onChange(e);
          }

          // Trigger validation for this field
          form.trigger(name);
        };

        return (
          <FormItem>
            <div className="form-item">
              <FormLabel className="form-label">{label}</FormLabel>
              <div className="flex w-full flex-col">
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    className={`input-class ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                    type={type}
                    onChange={handleChange}
                    onBlur={() => {
                      if (field.onBlur) field.onBlur();
                      form.trigger(name);
                    }}
                    value={value}
                    {...(() => {
                      const { onBlur, ...rest } = restField;
                      return rest;
                    })()}
                  />
                </FormControl>
                {/* Show helper text if no error and helper text exists */}
                {!fieldState.error && helperText && value && (
                  <p className="text-sm text-blue-600 mt-1">{helperText}</p>
                )}
                <FormMessage className="form-message mt-2" />
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default CustomInput;
