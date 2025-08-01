import DashboardLayout from "../layout";

export default function Dashboard() {
  return (
    <DashboardLayout
      pageTitle="Dashboard"
      pageDescription="Get an overview of your store's performance and activities."
    >
      <section className="py-5">{/* <ReusableTab tabList={TABS} /> */}</section>
    </DashboardLayout>
  );
}
