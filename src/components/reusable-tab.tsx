import { cn } from "@/lib/utils";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

type TAB_TYPE = {
  title: string;
  accessor: string;
};

interface ReusableTabProps {
  tabList: TAB_TYPE[];
  //   handleClick: () => void;
}

export default function ReusableTab({
  tabList,
}: //   handleClick,
ReusableTabProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate()
  
  const { ui } = queryString.parse(location.search);




  return (
    <nav className="w-full overflow-x-auto xl:w-fit">
      <ul className="flex items-center overflow-auto rounded-lg border border-r-0 bg-background text-muted-foreground last:border-r-0">
        {tabList?.map(({ title, accessor }) => (
          <li key={title} onClick={() => navigate(`${pathname}?ui=${accessor}`)}>
            <button
              className={cn(
                "inline-flex items-center whitespace-nowrap px-5 text-sm font-medium ring-offset-background transition-all py-2.5 border-r rounded-l-md hover:text-foreground hover:bg-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                ui === accessor && "text-clr_gray_600 bg-primary-foreground rounded-l-non"
              )}
            >
              {title}
            </button>
          </li>
        ))}
{/* 
        <li>
          <button className="inline-flex items-center whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            API
          </button>
        </li> */}
      </ul>
    </nav>
  );
}
