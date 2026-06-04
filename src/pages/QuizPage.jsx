import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import DashboardNav from "../layouts/DashboardNav";
import QuizContent from "../components/QuizContent";

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb] overflow-hidden relative">

      <div className="absolute top-32 left-96 w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full" />

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <DashboardNav />

      <main className="relative z-10 lg:ml-[320px] pt-24 px-4 md:px-8 pb-24">
        <QuizContent />
      </main>

      <div className="lg:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default QuizPage;