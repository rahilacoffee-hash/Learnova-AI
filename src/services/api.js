import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ================= AUTH TOKEN =================
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ================= AUTH =================
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

// ================= NOTES =================
export const uploadNote = (formData) =>
  API.post("/notes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getNotes = () =>
  API.get("/notes");

export const getNoteById = (id) =>
  API.get(`/notes/${id}`);

export const deleteNote = (id) =>
  API.delete(`/notes/${id}`);

// ================= SUMMARIES =================
export const generateSummary = (noteId) =>
  API.post("/ai/summarize", { noteId });

export const getAllSummaries = () =>
  API.get("/ai/summaries");


// ================= AI CHAT =================
export const askAI = (noteId, question) =>
  API.post("/ai/ask", {
    noteId,
    question,
  });

// ================= QUIZZES =================
export const generateQuiz = (data) =>
  API.post("/quiz/generate", data);

export const getQuiz = (quizId) =>
  API.get(`/quiz/${quizId}`);

export const submitQuiz = (quizId, answers) =>
  API.post(`/quiz/${quizId}/submit`, {
    answers,
  });





// ================= FLASHCARDS =================

export const generateFlashcards = (noteId) =>
  API.post("/flashcards/generate", { noteId });

export const getAllFlashcards = () =>
  API.get("/flashcards");

export const getFlashcardsByNote = (noteId) =>
  API.get(`/flashcards
    /${noteId}`);

export default API;