import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import DashboardNav from "../layouts/DashboardNav";
import DashboardContent from "../components/DashboardContent";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden">

      {/* Glow Effects */}
      <div
        className="
          absolute
          top-0
          left-1/3
          w-[500px]
          h-[500px]
          bg-indigo-600/10
          blur-[180px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-cyan-600/10
          blur-[180px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[350px]
          h-[350px]
          bg-purple-600/10
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
      <main
        className="
          relative
          z-10
          min-h-screen
          lg:ml-[320px]
          px-4
          pt-6
          pb-28
          md:px-6
          lg:px-10
          lg:pb-10
        "
      >

        {/* Header */}
        <DashboardNav />

        {/* Dashboard */}
        <div className="mt-24">
          <DashboardContent />
        </div>

      </main>

    </div>
  );
};

export default DashboardLayout;