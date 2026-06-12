import React from "react";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import MobileDashNav from "../layouts/MobileDashNav";
import Flashcardscontent from "../components/Flashcardscontent";

const FlashcardsPage = () => {
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
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileDashNav />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main
        className="
          pt-24
          pb-24
          px-4
          md:px-8
        md:ml-[380px]
          min-h-screen
          
        "
      >
        <Flashcardscontent />
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default FlashcardsPage;
