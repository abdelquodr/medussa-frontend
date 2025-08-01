import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps {
  isChecked: boolean;
  handleClick?: () => void;
  type?: "RADIO" | "CHECK";
  className?: string;
}

export default function Checkbox({
  isChecked,
  handleClick,
  type = "RADIO",
  className,
}: CheckboxProps) {
  return (
    <div
      className={cn(
        "w-4 h-4 border border-[#D0D5DD] rounded-full grid place-content-center cursor-pointer",
        isChecked && type === "RADIO" && "border-primary bg-primary/10",
        type === "CHECK" && isChecked && "bg-[#7F56D9] border-none",
        className
      )}
      onClick={handleClick}
      role={type === "RADIO" ? "radio" : "checkbox"}
      aria-checked={isChecked}
    >
      {isChecked && type === "RADIO" && (
        <span className="w-[.35rem] h-[.35rem] bg-[#7F56D9] block rounded-full" role="radio-indicator"></span>
      )}
      {type === "CHECK" && isChecked && (
        <Check width={10} height={10} color="#ffffff" role="check-indicator"/>
      )}
    </div>
  );
}
