export interface UserProfile {
  uid?: string;
  role: "student" | "teacher";
  fullName: string;
  className?: string;
  email?: string;
  teacherCode?: string;
}

export interface Message {
  id: string;
  sender: "user" | "teacher";
  text: string;
  timestamp: Date;
  attachment?: {
    name: string;
    type: "image" | "text" | "pdf";
    data?: string;
  };
}

export interface LessonChapter {
  id: string;
  grade: "10" | "11" | "12";
  topic: string; // e.g. "Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính"
  title: string;
  description: string;
  content: string; // Markdown summary content
  sampleCode?: string;
  codeLanguage?: "python" | "html" | "sql" | "excel" | "css";
  suggestedQuestions: string[];
}

export interface QuizQuestion {
  id: string;
  category?: string;
  topicId?: string; // e.g. "g10_t1", "g11_t4", "g12_t7"
  topicNumber?: number; // 1, 2, 3...
  topicTitle?: string; // e.g. "Chủ đề 1. Máy tính và xã hội tri thức"
  topicCode?: string;
  topicName?: string;
  grade: "10" | "11" | "12" | "all";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExcelFunctionSim {
  name: string;
  syntax: string;
  description: string;
  exampleData: { row: number; colA: string; colB: string; colC: string }[];
  inputs: { label: string; defaultValue: string; description: string }[];
  calculate: (inputs: string[]) => string;
}

// Structured types for 15-question lesson-specific exercise sets
export interface MultipleChoiceQuestion {
  id: string;
  type: "multiple_choice";
  level: "Nhận biết" | "Thông hiểu" | "Vận dụng" | "Vận dụng cao";
  question: string;
  options: string[]; // exactly 4 options
  correctIndex: number; // 0 to 3
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  type: "short_answer";
  level: "Nhận biết" | "Thông hiểu" | "Vận dụng" | "Vận dụng cao";
  question: string;
  correctAnswer: string; // correct exact keyword or numeric/short answer
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  type: "true_false";
  level: "Nhận biết" | "Thông hiểu" | "Vận dụng" | "Vận dụng cao";
  question: string;
  correctAnswer: boolean; // true = Đúng, false = Sai
  explanation: string;
}

export interface LessonQuiz {
  multipleChoice: MultipleChoiceQuestion[];
  shortAnswer: ShortAnswerQuestion[];
  trueFalse: TrueFalseQuestion[];
}

