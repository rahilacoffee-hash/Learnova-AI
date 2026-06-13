import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

import { CodeExample, floatingCards } from "../../layouts/CodeExample";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
export default function Terminal() {
  const [activeTab, setActiveTab] = useState("Upload Notes");
  return (
    <div className="relative order-2 w-full">
      <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
        <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm rounded-lg overflow-hidden h-[280px] sm:h-[350px] lg:h-[450px] border border-white/5 ">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-xs sm:text-sm text-gray-300 font-bold">
                Learn<span className="text-primary font-bold">ova AI</span>
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 relative h-full">
            <div className=" flex  space-x-1 sm:pace-x-2 mb-3 sm:mb-4 overflow-auto">
              {/* upload */}
              <button
                onClick={() => setActiveTab("Upload Notes")}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border 
                    ${
                      activeTab === "Upload Notes"
                        ? "bg-primary/30 text-white border-primary/20"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    } 
                   transition-all duration-200 whitespave-nowrap`}
              >
                Upload Notes
              </button>

              {/* summary */}
              <button
                onClick={() => setActiveTab("generate summary")}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border 
                    ${
                      activeTab === "generate summary"
                        ? "bg-primary/30 text-white border-primary/20"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    } 
                   transition-all duration-200 whitespave-nowrap`}
              >
                Generate summary
              </button>

              {/* Flascard */}
              <button
                onClick={() => setActiveTab("generate flashcard")}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border 
                    ${
                      activeTab === "generate flashcard"
                        ? "bg-primary/30 text-white border-primary/20"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    } 
                   transition-all duration-200 whitespave-nowrap`}
              >
                Generate flashcard
              </button>

              {/* AI Chat */}
               <button
                onClick={() => setActiveTab("AI Chat")}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border 
                    ${
                      activeTab === "AI Chat"
                        ? "bg-primary/30 text-white border-primary/20"
                        : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                    } 
                   transition-all duration-200 whitespave-nowrap`}
              >
                AI Chat
              </button>

              
            </div>
                <div className="relative overflow-hidden flex-grow">
                    <SyntaxHighlighter
                      language="javascript"
                      style={nightOwl}
                      customStyle={{
                        margin: 0,
                        borderRadius: "8px",
                        fontSize: "11px",
                        lineHeight: "1.4",
                        height: "100%",
                        border: "1px soild #3c3c3c",
                      }}
                    >
                      {CodeExample[activeTab]}
                    </SyntaxHighlighter>
                  </div>
          </div>
        </div>
      </div>
    </div>
  );
}
