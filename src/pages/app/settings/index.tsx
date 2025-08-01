import { MessageIcon, PlusIcon } from "@/assets/svgs";
import { ReusableTab, ReusableTable, RoleCard } from "@/components";
import {
  Checkbox,
  ReusableBadge,
  ReusableLabel,
  TeamsBadge,
} from "@/components/fragments";
import { Input } from "@/components/ui/input";
import DashboardLayout from "../layout";
import {
  ACTIVE_ROLES,
  CONNECTED_EMAILS,
  TABS,
  USER_ROLES_HEADERS,
} from "./data";
import { useMemo, useState } from "react";
import useSelectItem from "@/utils/hooks/useSelectItem";
import { Dictionary } from "@/types";
import { AVATAR_USER_TWO } from "@/assets/images";

interface UserRole {
  _id: string;
  name: string;
  type: "DEFAULT" | "CUSTOM" | "SYSTEM-CUSTOM";
  dateCreated: string;
  status: React.ReactNode;
  users?: React.ReactNode;
}

export default function Settings() {
  const [activeRoles, setActiveRoles] = useState<Dictionary[]>(ACTIVE_ROLES);
  const [activeConnectedEmails, setActiveConnectedEmails] =
    useState<Dictionary[]>(CONNECTED_EMAILS);

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

  const USER_ROLE_DATA: UserRole[] = [
    {
      _id: "1",
      name: "Finance",
      type: "DEFAULT",
      dateCreated: "Jan 1, 2023",
      status: <ReusableBadge status={"Active"} />,
      users: (
        <TeamsBadge
          data={[
            { id: "1", name: "User 1", avatar: AVATAR_USER_TWO },
            { id: "2", name: "User 2", avatar: AVATAR_USER_TWO },
            { id: "3", name: "User 3", avatar: AVATAR_USER_TWO },
            { id: "4", name: "User 4", avatar: AVATAR_USER_TWO },
            { id: "5", name: "User 5", avatar: AVATAR_USER_TWO },
            { id: "6", name: "User 6", avatar: AVATAR_USER_TWO },
            { id: "7", name: "User 7", avatar: AVATAR_USER_TWO },
          ]}
        />
      ),
    },
    {
      _id: "2",
      name: "Admin",
      type: "DEFAULT",
      dateCreated: "Feb 1, 2023",
      status: <ReusableBadge status={"Active"} />,
      users: (
        <TeamsBadge
          data={[
            { id: "1", name: "User 1", avatar: AVATAR_USER_TWO },
            { id: "2", name: "User 2", avatar: AVATAR_USER_TWO },
            { id: "3", name: "User 3", avatar: AVATAR_USER_TWO },
            { id: "4", name: "User 4", avatar: AVATAR_USER_TWO },
            { id: "5", name: "User 5", avatar: AVATAR_USER_TWO },
            { id: "6", name: "User 6", avatar: AVATAR_USER_TWO },
          ]}
        />
      ),
    },
    {
      _id: "3",
      name: "Finance",
      type: "DEFAULT",
      dateCreated: "Feb 1, 2023",
      status: <ReusableBadge status={"In Active"} />,
      users: (
        <TeamsBadge
          data={[
            { id: "1", name: "User 1", avatar: AVATAR_USER_TWO },
            { id: "2", name: "User 2", avatar: AVATAR_USER_TWO },
            { id: "3", name: "User 3", avatar: AVATAR_USER_TWO },
            { id: "4", name: "User 4", avatar: AVATAR_USER_TWO },
            { id: "5", name: "User 5", avatar: AVATAR_USER_TWO },
            { id: "6", name: "User 6", avatar: AVATAR_USER_TWO },
          ]}
        />
      ),
    },
    // Add more sample data as needed
  ];

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
            <ReusableTable
              title="User Roles"
              hasDownloadBtn
              hasCheck
              headerList={USER_ROLES_HEADERS}
              dataList={USER_ROLE_DATA}
            />
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
}
