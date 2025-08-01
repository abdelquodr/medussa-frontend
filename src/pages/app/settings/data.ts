export const TABS = [
  {
    title: "My Details",
    accessor: "my-details",
  },
  {
    title: "Profile",
    accessor: "profile",
  },
  {
    title: "Password",
    accessor: "password",
  },
  {
    title: "Team",
    accessor: "team",
  },
  {
    title: "Plan",
    accessor: "plan",
  },
  {
    title: "Roles",
    accessor: "roles",
  },
  {
    title: "Notification",
    accessor: "notifications",
  },
  {
    title: "Integrations",
    accessor: "integrations",
  },
  {
    title: "API",
    accessor: "api",
  },
];

export const ACTIVE_ROLES = [
  {
    id: 1,
    title: "Superadmin",
    sub_title: "Last active 06/2023",
    is_active: true,
  },
  {
    id: 2,
    title: "Developeradmin",
    sub_title: "Last active 01/2023",
    is_active: false,
  },
  {
    id: 3,
    title: "Supportadmin",
    sub_title: "Last active 10/2022",
    is_active: false,
  },
];

export const CONNECTED_EMAILS = [
  {
    id: 1,
    title: "My account email",
    value: "olivia@untitledui.com",
    isActive: false,
  },
  {
    id: 2,
    title: "An alternative email",
    value: "",
    isActive: false,
  },
];

export const USER_ROLES_HEADERS = [
  {
    name: "Name",
    accessor: "name",
    hasSort: true,
  },
  {
    name: "Type",
    accessor: "type",
    hasSort: false,
  },
  {
    name: "Date created",
    accessor: "dateCreated",
    hasSort: false,
  },
  {
    name: "Status",
    accessor: "status",
    hasSort: false,
  },
  {
    name: "Role users",
    accessor: "users", // Changed from "role" to "users"
    hasSort: false,
  },
];
