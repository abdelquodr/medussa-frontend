import { cn } from "../../lib/utils";

interface ReusableLabelProps {
    title: string,
    subTitle?: string | React.ReactNode,
    titleClass?: string,
    subTitleClass?: string
    labelClass?: string
}

export default function ReusableLabel({title, subTitle, titleClass, subTitleClass, labelClass}: ReusableLabelProps) {
  return (
    <div className={cn(
      "flex flex-col",
      labelClass
    )}>
      <h3 className={cn(
        "text-sm font-normal text-clr_gray_600 tracking-wide",
        titleClass
      )}>
       {title}
      </h3>
      <span className={cn(
        "text-clr_gray_300 text-xs",
        subTitleClass
      )}>{subTitle}</span>
    </div>
  );
}
