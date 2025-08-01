import * as React from "react";

import { cn } from "@/lib/utils";
import { Dictionary } from "@/types";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClass?: string;
  isRequired?: boolean;
  id: string;
  name: string;
  value?: string;
  icon?: React.ReactNode;
  iconClass?: string;
  handleBlur?: (event: Dictionary) => void;
  onChange: (event: Dictionary) => void;
  touched?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      labelClass,
      id,
      name,
      isRequired,
      onChange,
      error,
      value,
      touched,
      handleBlur,
      icon,
      iconClass,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={label}
            className={cn("block font-normal text-[.8rem] pb-1", labelClass)}
          >
            {" "}
            {label}
            {isRequired && <span className="text-red-500 text-lg">*</span>}{" "}
          </label>
        )}
        {icon && (
          <span className={cn(
            "absolute left-2 top-1.5",
            iconClass
          )}>
            {icon}
          </span>
        )}
        <input
          type={type}
          onBlur={handleBlur}
          onChange={onChange}
          id={id}
          name={name}
          value={value}
          className={cn(
            "flex h-9 w-full rounded-[8px] border border-[#D0D5DD] bg-background pl-3 py-3 text-[.8rem] ring-offset-background font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/30 focus:border-primary file:focus:border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:font-normal placeholder:text-[.7rem] placeholder:pl- placeholder:text-gray-400 ring-purple-100 focus:ring-4 focus:ring-offset-0",
            icon && "pl-6",
            className,
            error && touched && "border-red-500"
          )}
          ref={ref}
          {...props}
        />
        <span className={cn("text-xs text-red-500 hidden", error && "block")}>
          {error && touched && error}
        </span>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
