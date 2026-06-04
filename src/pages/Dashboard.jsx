import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import DashboardNav from "../layouts/DashboardNav";
import DashboardContent from "../components/DashboardContent";

const DashboardLayout = () => {
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">

  {/* Purple Glow */}
  <div
    className="
      absolute
      top-20
      left-64
      w-[500px]
      h-[500px]
      bg-violet-500/15
      blur-[180px]
      rounded-full
    "
  />

  {/* Blue Glow */}
  <div
    className="
      absolute
      bottom-0
      right-0
      w-[500px]
      h-[500px]
      bg-cyan-500/15
      blur-[180px]
      rounded-full
    "
  />

  {/* Pink Glow */}
  <div
    className="
      absolute
      top-1/2
      right-1/3
      w-[350px]
      h-[350px]
      bg-pink-500/10
      blur-[150px]
      rounded-full
    "
  />


      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <MobileBottomNav />
      </div>

      {/* Main Content */}
      <main className="lg:ml-[320px] min-h-screen p-4 md:p-6 lg:p-10 relative z-10">

        {/* Header */}
        <DashboardNav />

        {/* Page Content */}
        <div className="mt-24">
          <DashboardContent />
        </div>

      </main>

    </div>
  );
};

export default DashboardLayout;