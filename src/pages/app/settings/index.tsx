import { MessageIcon, PlusIcon } from "@/assets/svgs";
import { ReusableTab, ReusableTable, RoleCard } from "@/components";
import { Checkbox, ReusableLabel } from "@/components/fragments";
import { Input } from "@/components/ui/input";
import DashboardLayout from "../layout";
import {
  ACTIVE_ROLES,
  CONNECTED_EMAILS,
  TABS,
  USER_ROLES_HEADERS,
} from "./data";
import { useMemo, useState, useEffect } from "react";
import useSelectItem from "@/utils/hooks/useSelectItem";
import { Dictionary } from "@/types";
import { getRoles } from "@/services/roles/rolesApi";
import { Role } from "@/services/roles/types";

interface UserRole {
  _id: string;
  name: string;
  type: "DEFAULT" | "CUSTOM" | "SYSTEM-CUSTOM";
  dateCreated: string;
  status: string; // Changed from React.ReactNode to string
  users?: number; // Changed from React.ReactNode to number
}

const USER_ROLE_DATA: UserRole[] = [
  {
    _id: "1",
    name: "SuperAdmin",
    type: "DEFAULT",
    dateCreated: "Jan 1, 2023",
    status: "Active", // Changed to string
    users: 7, // Changed to number
  },
  {
    _id: "2",
    name: "Sales Personnel",
    type: "DEFAULT",
    dateCreated: "Feb 1, 2023",
    status: "Active", // Changed to string
    users: 6, // Changed to number
  },
  {
    _id: "3",
    name: "Finance",
    type: "DEFAULT",
    dateCreated: "Feb 1, 2023",
    status: "In Active", // Changed to string
    users: 6, // Changed to number
  },
];

export default function Settings() {
  const [activeRoles, setActiveRoles] = useState<Dictionary[]>(ACTIVE_ROLES);
  const [activeConnectedEmails, setActiveConnectedEmails] =
    useState<Dictionary[]>(CONNECTED_EMAILS);

  // call the local endpoint to get the user roles
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentRoles = useMemo(() => activeRoles, [activeRoles]);
  const currentConnectedEmails = useMemo(
    () => activeConnectedEmails,
    [activeConnectedEmails]
  );

  const { handleSelectItem } = useSelectItem({
    setState: setActiveRoles,
    slug: "is_active",
  });

  const { handleSelectItem: handleChangeEmail } = useSelectItem({
    setState: setActiveConnectedEmails,
    slug: "isActive",
  });

  // use fetched roles to replace the hardcoded USER_ROLE_DATA
  const sortedData = useMemo(() => {
    if (roles.length === 0) {
      return USER_ROLE_DATA; // fallback to static data while loading
    }

    return roles.map((role) => ({
      _id: role._id.toString(),
      name: role.name,
      type: role.type,
      dateCreated: role.dateCreated,
      status: role.status, // Keep as string, not React component
      users: role.users, // Keep as number, not React component
    }));
  }, [roles]);

  // fetch roles
  useEffect(() => {
    getRoles()
      .then(setRoles)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log("Roles:", roles);

  return (
    <DashboardLayout
      pageTitle="Settings"
      pageDescription="Manage your team and preferences here."
    >
      <section className="">
        <ReusableTab tabList={TABS} />
        <section className="mt-6 h-[calc(100vh_-_10rem)] overflow-y-auto pb-20 pr-5 hide-scrollbar">
          <div className="flex flex-col border-b pb-4">
            <h3 className="text-lg font-normal text-clr_gray_600 tracking-wide lg:text-">
              User Roles
            </h3>
            <span className="text-clr_gray_300 text-sm">
              Update your roles details and information.
            </span>
          </div>
          <section className="mt-6">
            <div className="md:flex gap-8 lg:w-1/2">
              <ReusableLabel
                title="Connected email"
                subTitle="Select role account"
                subTitleClass="text-[12px]"
                labelClass="min-w-fit"
              />

              <div className="flex lg:mt-0 mt-5 md:mt-0 flex-col gap-4 w-full">
                {currentConnectedEmails.map(
                  ({ id, title, value, isActive }) => (
                    <div key={id} className="flex gap-2 items-start">
                      <Checkbox
                        isChecked={isActive}
                        type="RADIO"
                        handleClick={() => handleChangeEmail(id)}
                      />
                      <ReusableLabel
                        title={title}
                        subTitle={
                          value ? (
                            value
                          ) : (
                            <Input
                              id=""
                              name=""
                              onChange={() => null}
                              placeholder="billing@untitledui.com"
                              className="mt-1.5 pl-8"
                              icon={<MessageIcon width={18} height={18} />}
                              iconClass="top-2.5"
                              disabled={!isActive}
                            />
                          )
                        }
                        labelClass="w-full"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
          <div className="flex flex-col lg:flex-row gap-8 border-t pt-8 mt-8 lg:pr-5">
            <ReusableLabel
              title="Active Role"
              subTitle="Select active role available to the user."
              subTitleClass="text-[12px]"
              labelClass="w-[20rem]"
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-3">
                {currentRoles.map((active_role, idx) => {
                  const { title, sub_title, id, is_active } = active_role;
                  return (
                    <RoleCard
                      key={id || idx}
                      title={title}
                      subTitle={sub_title}
                      isActive={is_active}
                      handleClick={() => null}
                      handleSetAsDefault={() => handleSelectItem(id)}
                      handleEdit={() => null}
                    />
                  );
                })}
              </div>

              <div className="flex gap-2 mt-4 items-center cursor-pointer">
                <PlusIcon />
                <p className="text-sm text-clr_gray_300 font-medium">
                  Add role to user
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {loading || sortedData.length === 0 ? (
              <div className="w-full">
                {/* Table Header Skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Table Skeleton */}
                <div className="rounded-md border shadow-shadowTwo">
                  {/* Table Header Skeleton */}
                  <div className="border-b bg-gray-50 p-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>

                  {/* Table Rows Skeleton */}
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="border-b p-4 bg-white">
                      <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="flex gap-1">
                          {Array.from({ length: 3 }).map((_, avatarIdx) => (
                            <div
                              key={avatarIdx}
                              className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"
                            ></div>
                          ))}
                        </div>
                        <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-red-500">Error loading roles: {error}</p>
              </div>
            ) : (
              <ReusableTable
                title="User Roles"
                hasDownloadBtn
                hasCheck
                headerList={USER_ROLES_HEADERS}
                dataList={sortedData}
              />
            )}
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
}
