import { useState } from "react";
import { Sidebar, Topnav } from "./components";

interface DashboardLayoutProps {
  pageTitle: string;
  pageDescription?: string;
  children: React.ReactNode;
}

export default function DashboardLayout({
  pageTitle,
  pageDescription,
  children,
}: DashboardLayoutProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#F9FAFB]">
      <div className="max-w-container 3xl:max-w-container-lg mx-auto h-full">
        <section className="md:flex md:gap-0">
          <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          <section className="md:mr-3 md:w-[calc(100vw_-14rem)] lg:w-[calc(100vw-_16.5rem)]">
            <Topnav setShowSidebar={setShowSidebar} />
            <section className="h-screen overflow-y-hidden p-4 pt-24 sm:pt-20 md:pt-10 md:px-10">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium text-clr_gray_600 tracking-wide lg:text-2xl">
                  {pageTitle}
                </h3>
                <span className="text-clr_gray_300 text-s">
                  {pageDescription}
                </span>
              </div>
              {/* <Outlet /> */}
              <div className="w-full overflow-x-hidden py-5">{children}</div>
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}
