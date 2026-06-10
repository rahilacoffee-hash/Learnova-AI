import React from 'react'

const WelcomeSection = ({ user }) => {
  return (
    <div>

      <p className="text-slate-400">
        Welcome back,{" "}
        {user?.name || "Student"} 👋
      </p>

      <h1 className="text-5xl font-bold text-white mt-2">
        Your Learning Command Center
      </h1>

      <p className="text-slate-400 mt-3">
        AI-powered insights into your
        academic performance.
      </p>

    </div>
  );
};

export default WelcomeSection;
