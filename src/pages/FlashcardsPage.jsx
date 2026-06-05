import React from "react";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import MobileDashNav from "../layouts/MobileDashNav";
import Flashcardscontent from "../components/Flashcardscontent";

const FlashcardsPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fc] overflow-x-hidden">
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
        ml-[380px]
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
