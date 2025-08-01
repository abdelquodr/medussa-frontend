import { AlignRight } from "lucide-react";
import { Logo } from "@/assets/svgs";

interface IProps {
  // showSidebar: any;
  setShowSidebar: (state: any) => void;
}

const Topnav = ({ setShowSidebar }: IProps) => {
  return (
    <header className="bg-white p-4 fixed w-screen z-[53] md:w-[calc(100vw_-14rem)] lg:w-[calc(100vw-_16rem)] border-b md:px-6 md:hidden">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center md:mr-6">
            <Logo/>
          {/* <span><SunMoon className="h-5 w-5 text-gray-600 cursor-pointer" /></span> */}
          {/* <ProfileDropdownMenu
            trigger={
              <div className="flex items-center gap-x-2">
                <div className="flex items-center">
                  <img
                    src={AVATAR_USER_TWO}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
            }
          /> */}
        </div>
        <span
          className="cursor-pointer lg:hidden"
          onClick={() =>
            setShowSidebar((prevState: any) => {
              return !prevState;
            })
          }
        >
          <AlignRight className="h-5 w-5 text-gray-600" />
        </span>
      </div>
    </header>
  );
};

export default Topnav;
