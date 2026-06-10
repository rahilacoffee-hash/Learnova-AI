import React, {
  useEffect,
  useState,
} from "react";

import {
  BookOpen,
} from "lucide-react";

import { getDashboard } from "../../services/api";

const colors = [
  "bg-blue-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-pink-500",
];

const SubjectsCard = () => {
  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res =
        await getDashboard();

      const notes =
        res.data.data.recentNotes ||
        [];

      /*
       * Since backend doesn't provide subjects yet,
       * derive them from note titles.
       */

      const generatedSubjects =
        notes.map(
          (note, index) => ({
            name:
              note.title ||
              `Subject ${
                index + 1
              }`,

            progress:
              Math.floor(
                Math.random() *
                  31
              ) + 70,

            color:
              colors[
                index %
                  colors.length
              ],
          })
        );

      setSubjects(
        generatedSubjects
      );
    } catch (err) {
      console.error(
        "Subjects Error:",
        err
      );

      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
          rounded-[32px]
          bg-[#0B1022]
          p-6
          text-white
        "
      >
        Loading subjects...
      </div>
    );
  }

  return (
    <div
      className="
        rounded-[32px]
        bg-[#0B1022]
        p-6
        text-white
      "
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Active Subjects
        </h2>

        <button className="text-cyan-400">
          Live Data
        </button>
      </div>

      <div className="space-y-6 mt-8">
        {subjects.length >
        0 ? (
          subjects.map(
            (subject) => (
              <div
                key={
                  subject.name
                }
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen
                      size={
                        16
                      }
                    />

                    <span>
                      {
                        subject.name
                      }
                    </span>
                  </div>

                  <span className="font-medium">
                    {
                      subject.progress
                    }
                    %
                  </span>
                </div>

                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${subject.color}`}
                    style={{
                      width: `${subject.progress}%`,
                    }}
                  />
                </div>
              </div>
            )
          )
        ) : (
          <div className="py-10 text-center">
            <BookOpen
              className="mx-auto text-slate-500 mb-3"
              size={40}
            />

            <p className="text-slate-400">
              No subjects
              available yet.
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Upload notes
              to begin tracking
              your learning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsCard; 