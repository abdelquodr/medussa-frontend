import { UsersIcon } from "@/assets/svgs";
import { Checkbox, ReusableLabel } from "../fragments";
import { cn } from "@/lib/utils";

interface RoleCardProps {
    title: string,
    subTitle: string,
    isActive: boolean,
    handleSetAsDefault: () => void,
    handleEdit: () => void,
    handleClick: () => void
}

export default function RoleCard({title, subTitle, isActive, handleSetAsDefault, handleClick, handleEdit}: RoleCardProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-start border bg-white rounded-[8px] w-full p-5",
        isActive && "bg-[#F9F5FF] border-primary"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <span className="w-10 h-10 rounded-lg border border-[#F2F4F7] px-6 bg-white grid place-content-center">
          <UsersIcon />
        </span>
        <div>
          <ReusableLabel
            title={title}
            subTitle={subTitle}
            titleClass={cn(isActive && "text-[#53389E]")}
            subTitleClass={cn(isActive && "text-[#9E77ED]")}
          />
          <div className="mt-3 flex items-center gap-2">
            <span
              className={cn(
                "text-clr_gray_300 cursor-pointer text-xs",
                isActive && "text-[#9E77ED]"
              )}
              onClick={handleSetAsDefault}
            >
              Set as default
            </span>
            <span className="text-[#6941C6] text-xs cursor-pointer font-medium"
                onClick={handleEdit}
            >
              Edit
            </span>
          </div>
        </div>
      </div>
      <Checkbox isChecked={isActive} type="CHECK" handleClick={handleSetAsDefault}/>
    </div>
  );
}
