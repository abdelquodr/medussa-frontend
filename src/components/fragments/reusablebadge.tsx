import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface CheckboxProps {
    status: string
}

const COLOR_TYPE = {
  green: ['active'],
  orange: ['in active']
}

const getBadgeColor = (status: string) => {
  if (COLOR_TYPE.green.includes(status.toLowerCase())) {
    return "green"
  }
  if (COLOR_TYPE.orange.includes(status.toLowerCase())) {
    return "orange"
  }
}

export default function ReusableBadge({status}: CheckboxProps) {
  return (
    <div className={cn(
      "text-xs flex items-center gap-1 p-1 px-2 rounded-full w-fit font-normal",
      getBadgeColor(status) === "green" && "text-green-800 bg-green-100",
      getBadgeColor(status) === "orange" && "text-white bg-[#F2994A]",
    )}>
     {status === "Active" && <Check width={12} height={12}/> } <span>{status}</span>
    </div>
  );
}
