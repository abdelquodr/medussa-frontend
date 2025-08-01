/* eslint-disable react-hooks/exhaustive-deps */

import {
  DashboardIcon,
  HomeIcon,
  Logo,
  LogoutIcon,
  ProjectsIcon,
  ReportIcon,
  SettingsIcon,
  SupportIcon,
  TasksIcon,
  UsersIcon,
} from "@/assets/svgs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  getStorageItem,
  setStorageItem,
} from "@/utils/hooks/useLocalStorage";
import { AVATAR_USER_TWO, LADY } from "@/assets/images";
import { CounterBadge } from "@/components/fragments";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowSize from "@/utils/hooks/useWindowSize";
import { routesPath } from "@/utils/route-path";

interface IProps {
  showSidebar: boolean;
  setShowSidebar: (state: boolean) => void;
}

const {
  HOME,
  DASHBOARD,
  USER_MANAGEMENT,
  SETTINGS,
  PROJECTS,
  REPORTS,
  TASKS,
  SUPPORTS,
} = routesPath;

const navigationPath = [
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Home",
        accessor: "Home",
        icon: {
          default: <HomeIcon />,
          active: <HomeIcon />,
        },
        // <Home className="w-5 h-5" />,
        path: HOME,
        collapsed: false,
        subLinks: [],
        changes: 0
      },
    ],
  },
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Dashboard",
        accessor: "Dashboard",
        icon: {
          default: <DashboardIcon />,
          active: <DashboardIcon />,
        },
        // <Box className="w-5 h-5" />,
        path: DASHBOARD,
        collapsed: false,
        subLinks: [],
        changes: 10
      },
    ],
  },
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Projects",
        accessor: "Projects",
        icon: {
          default: <ProjectsIcon />,
          active: <ProjectsIcon />,
        },
        // <Users2 className="w-5 h-5" />,
        path: PROJECTS,
        collapsed: false,
        subLinks: [],
        changes: 0
      },
    ],
  },
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Tasks",
        accessor: "Tasks",
        icon: {
          default: <TasksIcon />,
          active: <TasksIcon />,
        },
        // <Newspaper className="w-5 h-5" />,
        path: TASKS,
        collapsed: false,
        subLinks: [],
        changes: 0
      },
    ],
  },
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Reporting",
        icon: {
          default: <ReportIcon />,
          active: <ReportIcon />,
        },
        // <CandlestickChart className="w-5 h-5" />,
        path: REPORTS,
        accessor: "Reporting",
        collapsed: false,
        subLinks: [],
        changes: 0
      },
    ],
  },
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Users",
        accessor: "Users",
        icon: {
          default: <UsersIcon />,
          active: <UsersIcon />,
        },
        // <CircleUser className="w-5 h-4" />,
        path: USER_MANAGEMENT,
        collapsed: false,
        subLinks: [],
        changes: 0
      },
    ],
  },
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Supports",
        accessor: "Supports",
        icon: {
          default: <SupportIcon />,
          active: <SupportIcon />,
        },
        // <MessageCircleMore className="w-4 h-4" />,
        path: SUPPORTS,
        collapsed: false,
        subLinks: [],
        changes: 0
      },
    ],
  },
  {
    id: crypto.randomUUID().toString(),
    links: [
      {
        id: crypto.randomUUID().toString(),
        title: "Settings",
        accessor: "Settings",
        icon: {
          default: <SettingsIcon />,
          active: <SettingsIcon />,
        },
        // <MessageCircleMore className="w-4 h-4" />,
        path: `${SETTINGS}?ui=my-details`,
        collapsed: false,
        subLinks: [],
        changes: 0
      },
    ],
  },
];

const Sidebar = ({ setShowSidebar, showSidebar }: IProps) => {
  const [showUpdate, setShowUpdate] = useState(true)
  const collapsibleData = getStorageItem("collapsible");
  const activeNavData = getStorageItem("activeNav");

  const [navigationState] = useState(navigationPath);
  const [collapsible, setCollapsible] = useState({
    path: "/admin/overview",
    collapsed: false,
  });
  const [activeNav, setActiveNav] = useState("Dashboard");

  const NAVIGATION_MENU = useMemo(() => navigationState, [navigationState]);

  const { width } = useWindowSize();

  const normal = "relative p-2.5 block rounded-sm flex justify-between w-full";
  const defaultLink =
    normal +
    "text-[#344054] pl-4 hover:text-[#344054] hover:p-2.5 hover:pl-4 hover:bg-gray-50";
  const activeLink = normal + " text-gray-800 pl-4 bg-gray-50";

  // const location = useLocation();
  // const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (width < 768) {
      // dispatch an action to close sidebar
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [width]);

  // Set the default active link
  // If store has active link, set active link to store link
  useEffect(() => {
    if (collapsibleData && activeNavData) {
      setActiveNav(activeNavData);
      setCollapsible(collapsibleData);
      return;
    }
    setStorageItem("collapsible", collapsible);
    setStorageItem("activeNav", activeNav);
  }, []);

  // Update store link to selected link
  useEffect(() => {
    setStorageItem("collapsible", collapsible);
    setStorageItem("activeNav", activeNav);
  }, [collapsible, activeNav]);
  return (
    <>
      {showSidebar && width < 768 && (
        <div
          className="absolute w-screen h-screen left-0 bg-neutral-50/5 z-20 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        ></div>
      )}
      <nav
        className={`fixed flex flex-col top-0 left-0 h-screen bg-white w-[14rem] pt-4 z-30 transition-all duration-500 ease-in-out border-r md:relative md:x-7 lg:min-w-[16.5rem] ${showSidebar || width >= 768 ? "translate-x-0" : "-translate-x-full"
          } dark:bg-gray-800`}
      >
        <div className="pt-4 flex flex-col mx-6 justify-center pb-4">
          <Logo />
          <div className="relative mt-5">
            <Input
              id=""
              name=""
              onChange={() => null}
              placeholder="Olivia Rhye"
              icon={<Search width={13} className="text-gray-400" />}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh_-_2rem)] overflow-y-auto">
          <div className="">
            <div className="flex-1 h-[60% overflow-y-scrol">
              {NAVIGATION_MENU?.map((navigation) => (
                <div
                  key={navigation.id}
                  className={cn(
                    "relative pb-1"
                    //    ( data?.user?.role === 'support superstar' && (idx === 4 || idx === 5) ) ? 'hidden' : ''
                  )}
                >
                  {navigation?.links?.map((link) => (
                    <div
                      className={cn(
                        "mx-3 md:mx-"
                        // ( data?.user?.role === 'support superstar' && (idx === 4 || idx === 5) ) ? 'hidden' : ''
                      )}
                      key={link.id}
                    >
                      <Link
                        key={link.id}
                        to={link?.path}
                        className={cn(
                          `relative p-2.5 items-center gap-x-2`,
                          link.path === location.pathname
                            ? activeLink
                            : defaultLink
                        )}
                      >

                        <div className="flex items-center gap-x-2">
                          <span>
                            {link.path === location.pathname
                              ? link.icon.active
                              : link.icon.default}
                          </span>
                          <span className="text-[.8rem] font-normal md:text-[.9rem] pl-2">
                            {link.title}
                          </span>
                        </div>
                        {link.changes > 0 && <CounterBadge value={link.changes} />}
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={cn(
            "bg-[#F9FAFB] p-5 mx-4 mb-6 opacity-100 transition-all duration-300",
            !showUpdate && "opacity-0 hidden"
          )}>
            <h4 className="text-sm">New features available!</h4>
            <span className="block text-xs leading-1 my-2 text-[#667085]">Check out the new dashboard view. Pages now load faster. </span>
            <img src={LADY} alt="new-feature" className="rounded-md" />
            <div className="flex gap-3 mt-2">
              <Link to="#" className="text-xs" onClick={() => setShowUpdate(!showUpdate)}>Dismiss</Link>
              <Link to="#" className="text-xs text-[#7F56D9]">What's new</Link>
            </div>
          </div>

          <div className="bottom-0 w-full">
            <span className="border border-t mx-4 block border-[#EAECF0]"></span>
            <div className="flex items-center justify-between p-3 pl-4 py-5">
              <div className="flex items-center gap-x-3">
                <img
                  src={AVATAR_USER_TWO}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-[.7rem]">Olivia Rhye</span>
                  <span className="font-light text-gray-400 text-[.6rem]">
                    olivia@unitedui.com
                  </span>
                </div>
              </div>
              <span className="text-gray-500 cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    {" "}
                    <LogoutIcon />
                  </PopoverTrigger>
                  <PopoverContent
                    className="rounded-lg p-6 absolute w-[10.5rem] -top-[11.2rem] -right-6"
                    align="end"
                    alignOffset={10}
                  >
                    <div className="flex flex-col gap-y-2">
                      <span
                        className="text-[.75rem] cursor-pointer p-1.5 px-2 rounded-sm transition-all ease-in-out duration-500 hover:bg-gray-100"
                      >
                        Change Password
                      </span>
                      <button
                        className="text-[.75rem] cursor-pointer p-1 px-2 bg-transparent rounded-sm text-red-700 transition-all ease-in-out duration-500 hover:bg-gray-100 w-full text-left"
                      // onClick={handleLogout}
                      // loading={isLoading}
                      // loadingText="Logout"
                      >
                        Logout
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </span>
            </div>
          </div>
        </div>


      </nav>
    </>
  );
};

export default Sidebar;
