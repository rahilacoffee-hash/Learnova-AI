import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardLayout from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import MyNotesPage from "./pages/MyNotesPage";
import SummaryPage from "./pages/SummaryPage";
import ProfilePage from "./pages/ProfilePage";import AiChatPage from "./pages/AiChatPage";
import QuizPage from "./pages/QuizPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import ProfileContent from "./components/Editprofile";
import Quiz from "./pages/Quiz";
import Flashcards from "./components/Flashcards";
import { Toaster } from "react-hot-toast";

const App = () => {
    const [darkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <>
      <Toaster />
    <BrowserRouter>
  
      <Routes>
     
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/notes" element={<MyNotesPage />} />
        <Route path="/summary/:noteId" element={<SummaryPage />} />
        <Route path="/quiz/:noteId" element={<QuizPage />} />
        <Route path="/chat" element={<AiChatPage />} />
        <Route path="/chat/:noteId" element={<AiChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<ProfileContent />} />
        <Route
  path="/flashcards/:noteId"
  element={<FlashcardsPage />}
/>
  <Route path="/quiz" element={<Quiz />} />
  <Route path="/flashcard" element={<Flashcards />} />

      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;