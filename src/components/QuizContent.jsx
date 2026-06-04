import React, { useEffect, useState } from "react";
import {
  generateQuiz,
  getQuiz,
  submitQuiz,
} from "../services/api";

import {
  Brain,
  CheckCircle,
  Trophy,
  ArrowRight,
} from "lucide-react";

const QuizContent = () => {
  const noteId = window.location.pathname.split("/").pop();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    createQuiz();
  }, []);

  const createQuiz = async () => {
    try {
      setLoading(true);

      const res = await generateQuiz({
        noteId,
        count: 10,
        difficulty: "medium",
      });

      const quizId = res.data.quiz._id;

      const quizRes = await getQuiz(quizId);

      setQuiz(quizRes.data.quiz);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const updated = [...answers];
    updated[currentQuestion] = option;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz(
        quiz._id,
        answers
      );

      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">

        <h1 className="text-4xl font-bold text-slate-900">
          AI Quiz
        </h1>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
          Generating Quiz...
        </div>

      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-3xl">
        Failed to load quiz.
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Quiz Results
          </h1>

          <p className="text-slate-500 mt-2">
            Review your performance
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-xl">

          <div className="flex items-center gap-4 mb-8">
            <Trophy
              size={60}
              className="text-yellow-500"
            />

            <div>
              <h2 className="text-3xl font-bold text-black">
                {result.percentage}%
              </h2>

              <p className="text-slate-500">
                Final Score
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-indigo-50 rounded-2xl p-6">
              <h3 className="text-slate-500">
                Correct
              </h3>

              <p className="text-3xl font-bold text-green-600">
                {result.score}
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="text-slate-500">
                Wrong
              </h3>

              <p className="text-3xl font-bold text-red-600">
                {result.total - result.score}
              </p>
            </div>

            <div className="bg-cyan-50 rounded-2xl p-6">
              <h3 className="text-slate-500">
                Questions
              </h3>

              <p className="text-3xl font-bold text-black">
                {result.total}
              </p>
            </div>

          </div>

        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) /
      quiz.questions.length) *
    100;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          AI Quiz
        </h1>

        <p className="text-slate-500 mt-2">
          Test your understanding
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg">

        <div className="flex justify-between mb-3">

          <span className="font-medium text-black">
            Question {currentQuestion + 1}
          </span>

          <span className="text-slate-500">
            {quiz.questions.length}
          </span>

        </div>

        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Question Card */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl">

        <div className="flex items-center gap-3 mb-6">

          <Brain className="text-indigo-600" />

          <h2 className="text-2xl font-bold text-black">
            {question.question}
          </h2>

        </div>

        <div className="space-y-4">

          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${
                answers[currentQuestion] === option
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white hover:border-indigo-500 text-black"
              }`}
            >
              {option}
            </button>
          ))}

        </div>

        <div className="mt-8 flex justify-end">

          {currentQuestion <
          quiz.questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-8 py-3 rounded-xl"
            >
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl"
            >
              <CheckCircle size={18} />
              Submit Quiz
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default QuizContent;