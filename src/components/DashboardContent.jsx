import React, { useEffect, useState } from "react";

import {
  getNotes,
  getAllSummaries,
  getAllFlashcards,
} from "../services/api";
import WelcomeSection from "./DashboardContent/WelcomeSection";
import StatsGrid from "./DashboardContent/StatsGrid";
import StreakCard from "./DashboardContent/StreakCard";
import InsightsCard from "./DashboardContent/InsightsCard";
import SubjectsCard from "./DashboardContent/SubjectsCard";
import QuickActions from "./DashboardContent/QuickActions";
import StudyHeatmap from "./DashboardContent/StudyHeatmap";
import RecentActivity from "./DashboardContent/RecentActivity";
import AICoach from "./DashboardContent/AICoachsx";
import StudyPlanner from "./DashboardContent/StudyPlanner";



const DashboardContent = () => {
  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] =
    useState({
      notes: [],
      summaries: [],
      flashcards: [],
    });

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    {};

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [
        notesRes,
        summariesRes,
        flashcardsRes,
      ] = await Promise.all([
        getNotes(),
        getAllSummaries(),
        getAllFlashcards(),
      ]);

      setDashboardData({
        notes: notesRes.data.notes || [],
        summaries:
          summariesRes.data.summaries || [],
        flashcards:
          flashcardsRes.data.flashcards || [],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-[32px] bg-[#0B1022] p-8 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <WelcomeSection user={user} />

      {/* Top */}
      <div className="grid gap-6 xl:grid-cols-12">

        <div className="xl:col-span-9">
          <StatsGrid
            notes={dashboardData.notes}
            summaries={
              dashboardData.summaries
            }
            flashcards={
              dashboardData.flashcards
            }
          />
        </div>

        <div className="xl:col-span-3">
          <StreakCard />
        </div>

      </div>

      {/* Middle */}
      <div className="grid gap-6 xl:grid-cols-12">

        <div className="xl:col-span-4">
          <InsightsCard />
        </div>

        <div className="xl:col-span-5">
          <SubjectsCard />
        </div>

        <div className="xl:col-span-3">
          <QuickActions />
        </div>

      </div>

      {/* Bottom */}
      <div className="grid gap-6 xl:grid-cols-12">

        <div className="xl:col-span-4">
          <StudyHeatmap />
        </div>

        <div className="xl:col-span-5">
          <RecentActivity
            notes={dashboardData.notes}
            summaries={
              dashboardData.summaries
            }
            flashcards={
              dashboardData.flashcards
            }
          />
        </div>

        <div className="xl:col-span-3 space-y-6">
          <StudyPlanner  />

          <AICoach />
        </div>

      </div>

    </div>
  );
};

export default DashboardContent;