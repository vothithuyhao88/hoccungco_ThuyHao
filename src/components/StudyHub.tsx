import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { 
  BookOpen, Search, ArrowRight, MessageSquare, Code, GraduationCap,
  CheckCircle, XCircle, AlertCircle, Award, Sparkles, RefreshCw, Loader2, Info, HelpCircle,
  Bookmark, Library, BookMarked, Check, Target, Clock, AlertTriangle, Lightbulb, Table, Zap, Cpu
} from "lucide-react";
import { CHAPTERS } from "../data/chapters";
import { PRESEEDED_QUIZZES } from "../data/preseeded_quizzes";
import { LessonChapter, LessonQuiz, UserProfile } from "../types";
import { auth, saveQuizResultToFirestore, seedInitialChaptersToFirestore, subscribeToLessons } from "../lib/firebase";
import { getAIConfig } from "../lib/aiConfig";
import { generateLessonQuizAI } from "../lib/aiService";
import { getStandardizedTheory, PracticalApplication } from "../data/standardizedTheory";

interface StudyHubProps {
  onAskTeacher: (question: string) => void;
  currentUser?: UserProfile | null;
  onOpenAISettings?: () => void;
}

interface ThemeClasses {
  borderActive: string;
  borderInactive: string;
  textActive: string;
  textMuted: string;
  badge: string;
  spineGradient: string;
  cardActiveBg: string;
  cardInactiveBg: string;
  hoverBorder: string;
  ribbonBg: string;
  accentText: string;
  gradientText: string;
  glowClass: string;
  btnBg: string;
  qBtnBg: string;
  tabActive: string;
  accentRing: string;
}

const getGradeTheme = (grade: string): ThemeClasses => {
  if (grade === "10") {
    return {
      borderActive: "border-emerald-500 ring-4 ring-emerald-500/10",
      borderInactive: "border-slate-200/80 hover:border-emerald-300",
      textActive: "text-emerald-800",
      textMuted: "text-emerald-500",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      spineGradient: "from-emerald-400 via-teal-500 to-emerald-600",
      cardActiveBg: "bg-gradient-to-br from-emerald-50/90 to-teal-50/40 shadow-md",
      cardInactiveBg: "bg-white",
      hoverBorder: "hover:border-emerald-400/70",
      ribbonBg: "bg-emerald-500",
      accentText: "text-emerald-700",
      gradientText: "from-emerald-600 to-teal-600",
      glowClass: "shadow-emerald-100/50",
      btnBg: "bg-emerald-600 hover:bg-emerald-500 text-white",
      qBtnBg: "bg-emerald-50/40 hover:bg-emerald-50 border-emerald-100/30 hover:border-emerald-200 text-emerald-800",
      tabActive: "border-emerald-600 text-emerald-600",
      accentRing: "focus:border-emerald-500 focus:ring-emerald-500/20"
    };
  } else if (grade === "11") {
    return {
      borderActive: "border-amber-500 ring-4 ring-amber-500/10",
      borderInactive: "border-slate-200/80 hover:border-amber-300",
      textActive: "text-amber-850",
      textMuted: "text-amber-500",
      badge: "bg-amber-50 text-amber-700 border-amber-200/60",
      spineGradient: "from-amber-400 via-orange-450 to-amber-600",
      cardActiveBg: "bg-gradient-to-br from-amber-50/90 to-orange-50/40 shadow-md",
      cardInactiveBg: "bg-white",
      hoverBorder: "hover:border-amber-400/70",
      ribbonBg: "bg-amber-500",
      accentText: "text-amber-700",
      gradientText: "from-amber-600 to-orange-600",
      glowClass: "shadow-amber-100/50",
      btnBg: "bg-amber-600 hover:bg-amber-500 text-white",
      qBtnBg: "bg-amber-50/40 hover:bg-amber-50 border-amber-100/30 hover:border-amber-200 text-amber-800",
      tabActive: "border-amber-600 text-amber-600",
      accentRing: "focus:border-amber-500 focus:ring-amber-500/20"
    };
  } else {
    // Grade 12
    return {
      borderActive: "border-indigo-500 ring-4 ring-indigo-500/10",
      borderInactive: "border-slate-200/80 hover:border-indigo-300",
      textActive: "text-indigo-800",
      textMuted: "text-indigo-500",
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
      spineGradient: "from-indigo-400 via-violet-500 to-indigo-600",
      cardActiveBg: "bg-gradient-to-br from-indigo-50/90 to-violet-50/40 shadow-md",
      cardInactiveBg: "bg-white",
      hoverBorder: "hover:border-indigo-400/70",
      ribbonBg: "bg-indigo-500",
      accentText: "text-indigo-700",
      gradientText: "from-indigo-600 to-violet-600",
      glowClass: "shadow-indigo-100/50",
      btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white",
      qBtnBg: "bg-indigo-50/40 hover:bg-indigo-50 border-indigo-100/30 hover:border-indigo-200 text-indigo-800",
      tabActive: "border-indigo-600 text-indigo-600",
      accentRing: "focus:border-indigo-500 focus:ring-indigo-500/20"
    };
  }
};

function PracticalScenarioCard({ app }: { app: PracticalApplication }) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-teal-50/80 border border-teal-200/90 rounded-2xl p-4 shadow-3xs space-y-3">
      <h5 className="text-xs font-black text-teal-900 uppercase tracking-wider flex items-center gap-2">
        <Target size={15} className="text-teal-600" /> ✅ Liên hệ thực tế & Tình huống vận dụng
      </h5>

      {/* Overview Application */}
      <div className="bg-white/90 p-3 rounded-xl border border-teal-100 text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
        <span className="font-extrabold text-teal-800 block mb-1 text-[11px] uppercase tracking-wide">
          🌐 Ứng dụng thực tế THPT:
        </span>
        <p className="text-slate-700">{app.ungDung}</p>
      </div>

      {/* Scenario / Problem */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-900 text-white p-3.5 rounded-xl text-xs md:text-sm font-medium space-y-2.5 shadow-inner border border-teal-800/80">
        <span className="font-extrabold text-teal-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
          <HelpCircle size={14} className="text-teal-300 flex-shrink-0" /> Tình huống thực tế & Bài toán vận dụng:
        </span>
        <p className="text-teal-50 leading-relaxed">{app.tinhHuong}</p>

        {/* Action Buttons for Hint & Answer */}
        <div className="pt-1.5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 rounded-lg bg-teal-800/90 hover:bg-teal-700 text-teal-100 text-xs font-bold transition flex items-center gap-1.5 border border-teal-700 cursor-pointer shadow-2xs"
          >
            <Lightbulb size={13} className="text-amber-400 fill-amber-400" />
            {showHint ? "Ẩn Gợi ý" : "💡 Gợi ý suy nghĩ"}
          </button>

          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle size={13} />
            {showAnswer ? "Ẩn Đáp án" : "✅ Xem Đáp án & Giải thích"}
          </button>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="bg-amber-950/80 border border-amber-500/40 p-3 rounded-lg text-amber-200 text-xs font-medium space-y-1 animate-fadeIn">
            <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px] uppercase tracking-wider">
              💡 Gợi ý làm bài:
            </span>
            <p className="leading-relaxed text-amber-100">{app.goiY}</p>
          </div>
        )}

        {/* Answer Box */}
        {showAnswer && (
          <div className="bg-emerald-950/90 border border-emerald-500/40 p-3 rounded-lg text-emerald-100 text-xs font-medium space-y-1.5 animate-fadeIn">
            <span className="font-bold text-emerald-300 flex items-center gap-1 text-[11px] uppercase tracking-wider">
              ✅ Đáp án & Giải thích chi tiết:
            </span>
            <pre className="whitespace-pre-wrap font-sans leading-relaxed text-emerald-100">{app.dapAn}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudyHub({ onAskTeacher, currentUser, onOpenAISettings }: StudyHubProps) {
  const isTeacher = currentUser?.role === "teacher";
  const [selectedGrade, setSelectedGrade] = useState<"all" | "10" | "11" | "12">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<LessonChapter | null>(null);

  // Tabs structure inside selected chapter
  const [activeTab, setActiveTab] = useState<"theory" | "quiz">("theory");
  
  // Quiz specific states
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<LessonQuiz | null>(null);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);

  // Student quiz responses
  const [mcAnswers, setMcAnswers] = useState<Record<string, number>>({});
  const [saAnswers, setSaAnswers] = useState<Record<string, string>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 15 });
  const [loadingMessage, setLoadingMessage] = useState("Cô đang chuẩn bị...");

  // Filter chapters based on grade tab and search text
  const filteredChapters = CHAPTERS.filter((ch) => {
    const matchesGrade = selectedGrade === "all" || ch.grade === selectedGrade;
    const matchesSearch =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  // Group chapters by topic to mimic the textbook's table of contents (Mục lục)
  const groupedChapters: { topic: string; chapters: LessonChapter[] }[] = [];
  filteredChapters.forEach((ch) => {
    let group = groupedChapters.find((g) => g.topic === ch.topic);
    if (!group) {
      group = { topic: ch.topic, chapters: [] };
      groupedChapters.push(group);
    }
    group.chapters.push(ch);
  });

  // Sync quiz data when the chosen chapter changes
  useEffect(() => {
    if (selectedChapter) {
      setActiveTab("theory");
      setIsSubmitted(false);
      setMcAnswers({});
      setSaAnswers({});
      setTfAnswers({});
      setQuizError(null);

      // Check pre-seeded list first
      if (PRESEEDED_QUIZZES[selectedChapter.id]) {
        setQuizData(PRESEEDED_QUIZZES[selectedChapter.id]);
      } else {
        // Try local storage cache
        const cacheKey = `quiz-${selectedChapter.id}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          try {
            setQuizData(JSON.parse(cached));
          } catch (e) {
            setQuizData(null);
          }
        } else {
          setQuizData(null);
        }
      }
    }
  }, [selectedChapter]);

  // Rotate custom loading encouragement cards during generation
  useEffect(() => {
    let interval: any;
    if (loadingQuiz) {
      const messages = [
        "Cô Thuý Hào đang đọc tóm tắt bài học để chắt lọc những kiến thức tinh túy nhất...",
        "Cô đang chia độ khó thành các mức độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao...",
        "Cô đang biên soạn 5 câu trắc nghiệm 4 đáp án bám sát chuẩn thi cử...",
        "Cô đang thiết kế 5 câu hỏi tự điền câu trả lời ngắn...",
        "Cô đang lập biểu mẫu 5 nhận định Đúng / Sai cực kỳ thông thái...",
        "Cô đang hoàn thành phần giải thích bằng lời văn ấm áp, ân cần giảng dạy cho em...",
        "Chỉ còn vài giây nữa là bộ đề 15 câu hoàn thành rồi nhé! Em chuẩn bị giấy nháp nha..."
      ];
      let idx = 0;
      setLoadingMessage(messages[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % messages.length;
        setLoadingMessage(messages[idx]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loadingQuiz]);

  const handleFetchQuiz = async (customWeakTopics?: string[]) => {
    if (!selectedChapter) return;
    setLoadingQuiz(true);
    setQuizError(null);
    try {
      const aiConfig = getAIConfig();
      const activeModel = aiConfig.selectedModel === "custom" ? (aiConfig.customModelName || "gemini-2.5-flash") : aiConfig.selectedModel;

      const topicsToTarget = customWeakTopics || weakTopics;

      const data = await generateLessonQuizAI({
        grade: selectedChapter.grade,
        topic: selectedChapter.topic,
        title: selectedChapter.title,
        content: selectedChapter.content,
        weakTopics: topicsToTarget,
        apiKey: aiConfig.apiKey,
        model: activeModel
      });

      if (data.multipleChoice && data.shortAnswer && data.trueFalse) {
        const processed: LessonQuiz = {
          multipleChoice: data.multipleChoice.map((q: any, idx: number) => ({ ...q, id: q.id || `mc-${idx}` })),
          shortAnswer: data.shortAnswer.map((q: any, idx: number) => ({ ...q, id: q.id || `sa-${idx}` })),
          trueFalse: data.trueFalse.map((q: any, idx: number) => ({ ...q, id: q.id || `tf-${idx}` }))
        };
        setQuizData(processed);
        localStorage.setItem(`quiz-${selectedChapter.id}`, JSON.stringify(processed));
      } else {
        throw new Error("Định dạng đề thi trả về chưa đồng bộ chính xác.");
      }

    } catch (err: any) {
      console.error(err);
      setQuizError(err.message || "Đã xảy ra lỗi khi kết nối AI để tạo bài tập.");
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quizData) return;
    let correctCount = 0;
    const missedList: string[] = [];

    // 1. Multiple Choice (5)
    quizData.multipleChoice.forEach((q) => {
      if (mcAnswers[q.id] === q.correctIndex) {
        correctCount++;
      } else {
        missedList.push(q.question);
      }
    });

    // 2. Short Answer (5)
    quizData.shortAnswer.forEach((q) => {
      const userAns = (saAnswers[q.id] || "").trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();
      
      const isMatch = userAns === correctAns ||
        (correctAns.length >= 3 && userAns.includes(correctAns)) ||
        (userAns.length >= 3 && correctAns.includes(userAns));

      if (isMatch) {
        correctCount++;
      } else {
        missedList.push(q.question);
      }
    });

    // 3. True/False (5)
    quizData.trueFalse.forEach((q) => {
      if (tfAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      } else {
        missedList.push(q.question);
      }
    });

    setQuizScore({ correct: correctCount, total: 15 });
    setWeakTopics(missedList.slice(0, 5));
    setIsSubmitted(true);

    // Save score to Firestore
    if (selectedChapter) {
      const user = auth.currentUser;
      saveQuizResultToFirestore({
        userId: user?.uid || "guest_student",
        userName: user?.displayName || "Học sinh An Nhơn",
        userClass: `Lớp ${selectedChapter.grade}`,
        score: correctCount,
        totalQuestions: 15,
        grade: selectedChapter.grade,
        topicId: selectedChapter.id
      });
    }

    // Scroll to the top of the worksheet to see scorecard
    const element = document.getElementById("quiz-worksheet-view");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetQuiz = () => {
    setIsSubmitted(false);
    setMcAnswers({});
    setSaAnswers({});
    setTfAnswers({});
  };

  // Get active book theme classes
  const activeBookTheme = selectedChapter ? getGradeTheme(selectedChapter.grade) : getGradeTheme("12");

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6" id="study-hub-container">
      {/* Refined Light Header Bar */}
      <div className="mb-6 bg-white border-2 border-slate-900 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4" id="study-hub-header">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-900 border border-blue-300 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={11} className="text-blue-600 fill-blue-500" /> THƯ VIỆN KIẾN THỨC BÁM SÁT SGK
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5 font-sans">
            <Library className="text-blue-600 shrink-0" size={24} /> Góc Ôn Tập Lý Thuyết Tin Học THPT
          </h2>
          <p className="text-xs md:text-sm text-slate-700 font-medium max-w-2xl leading-relaxed">
            Hệ thống lý thuyết cô đọng, ví dụ thực tế & bài tập ôn luyện chuẩn hóa bộ sách Tin học THPT Kết nối tri thức.
          </p>
        </div>

        {/* Quick Help Button & AI Settings */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={() => onAskTeacher("Cô ơi, em cần cô hướng dẫn ôn tập lý thuyết Tin học THPT & Kỹ năng số ạ!")}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs md:text-sm rounded-xl border-2 border-emerald-950 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] flex items-center gap-2 cursor-pointer transition-all"
            id="btn-ask-teacher-quick"
          >
            <MessageSquare size={16} className="text-emerald-100 fill-emerald-200" />
            <span>Hỏi Cô Thuý Hào</span>
          </button>

          {onOpenAISettings && (
            <button
              type="button"
              onClick={onOpenAISettings}
              className="px-3 py-2.5 bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-900 font-extrabold text-xs rounded-xl border-2 border-amber-900 shadow-[2px_2px_0px_0px_rgba(120,53,15,1)] transition-all cursor-pointer flex items-center gap-1.5"
              id="btn-studyhub-ai-config"
              title="Cấu hình API Key AI"
            >
              <Cpu size={15} className="text-amber-700" />
              <span className="hidden sm:inline">Cấu hình AI</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="study-hub-layout-grid">
        {/* Left Side: Chapter List & Filters (Cols: 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Grade filter & Search - Styled like a study planner card */}
          <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 shadow-sm space-y-4 relative overflow-hidden">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-blue-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên bài học, từ khóa lý thuyết..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs text-slate-900 font-bold rounded-xl border-2 border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-slate-400"
                id="chapter-search-input"
              />
            </div>

            {/* 4 Mục Lựa Chọn Hiện Đại & Viền Đậm Nổi Bật */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-blue-600" /> 4 Mục Lựa Chọn Học Tập:
                </span>
                {searchQuery && (
                  <span className="text-[10px] bg-blue-100 text-blue-900 border border-blue-300 font-black px-2 py-0.5 rounded-md">
                    Tìm thấy {filteredChapters.length} bài
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    id: "all",
                    title: "✨ Tất cả",
                    subtitle: "Toàn bộ THPT",
                    count: CHAPTERS.length,
                    activeBg: "bg-blue-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
                    badgeActive: "bg-white text-blue-950"
                  },
                  {
                    id: "10",
                    title: "🎒 Lớp 10",
                    subtitle: "Tin học 10",
                    count: CHAPTERS.filter(c => c.grade === "10").length,
                    activeBg: "bg-emerald-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
                    badgeActive: "bg-white text-emerald-950"
                  },
                  {
                    id: "11",
                    title: "📚 Lớp 11",
                    subtitle: "Tin ứng dụng",
                    count: CHAPTERS.filter(c => c.grade === "11").length,
                    activeBg: "bg-amber-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
                    badgeActive: "bg-white text-amber-950"
                  },
                  {
                    id: "12",
                    title: "🎓 Lớp 12",
                    subtitle: "Tin học 12",
                    count: CHAPTERS.filter(c => c.grade === "12").length,
                    activeBg: "bg-indigo-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
                    badgeActive: "bg-white text-indigo-950"
                  }
                ].map((item) => {
                  const isSelected = selectedGrade === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedGrade(item.id as any);
                        setSelectedChapter(null);
                      }}
                      className={`p-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                        isSelected
                          ? `${item.activeBg} font-black scale-[1.02] z-10`
                          : "bg-white text-slate-900 border-slate-300 hover:border-slate-900 hover:bg-slate-50 shadow-2xs font-bold"
                      }`}
                      id={`filter-grade-${item.id}`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className="text-xs font-black tracking-tight">{item.title}</span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md border ${
                          isSelected ? `${item.badgeActive} border-transparent` : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}>
                          {item.count} bài
                        </span>
                      </div>
                      <span className={`text-[10px] mt-1 block font-medium ${
                        isSelected ? "text-white/90" : "text-slate-500"
                      }`}>
                        {item.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chapter cards list styled like a neat Digital Bookshelf */}
          <div className="bg-slate-50/60 rounded-2xl border border-slate-200/50 p-4 max-h-[580px] overflow-y-auto pr-2 space-y-5" id="chapters-list-cards" style={{ scrollbarWidth: 'thin' }}>
            <div className="text-center pb-2 border-b border-dashed border-slate-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                📚 KỆ SÁCH HỌC TẬP CỦA EM
              </span>
            </div>

            {groupedChapters.length > 0 ? (
              groupedChapters.map((group, gIdx) => (
                <div key={gIdx} className="space-y-3" id={`topic-group-${gIdx}`}>
                  {/* Topic Title Badge Header - Shelf Partition Label */}
                  <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 px-3 py-2.5 rounded-xl text-[10px] md:text-xs font-black text-slate-700 tracking-tight flex items-center justify-between gap-2 shadow-2xs sticky top-0 z-10">
                    <span className="flex items-center gap-1.5 truncate max-w-[85%]">
                      <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full shrink-0 shadow-xs animate-pulse"></span>
                      <span className="leading-tight truncate" title={group.topic}>{group.topic}</span>
                    </span>
                    <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                      {group.chapters.length} bài
                    </span>
                  </div>

                  {/* Lessons in Topic - Designed as stacked Book Spines (Gáy Sách) */}
                  <div className="space-y-3 pl-1">
                    {group.chapters.map((ch) => {
                      const theme = getGradeTheme(ch.grade);
                      const isSelected = selectedChapter?.id === ch.id;

                      return (
                        <button
                          key={ch.id}
                          onClick={() => setSelectedChapter(ch)}
                          className={`w-full relative text-left pl-7 pr-3.5 py-3.5 rounded-r-xl rounded-l-md border transition-all duration-300 cursor-pointer block select-none group transform hover:-translate-y-0.5 hover:translate-x-1 ${
                            isSelected
                              ? `${theme.cardActiveBg} ${theme.borderActive} shadow-md translate-x-2`
                              : "bg-white border-slate-200 hover:bg-slate-50/50 hover:border-slate-300 hover:shadow-2xs"
                          }`}
                          id={`chapter-card-${ch.id}`}
                        >
                          {/* Book Spine (Gáy Sách) - Left side textured cylinder ridge */}
                          <div className={`absolute left-0 top-0 bottom-0 w-4.5 rounded-l-md bg-gradient-to-r ${theme.spineGradient} flex flex-col justify-between items-center py-2.5 shadow-inner z-10 overflow-hidden`}>
                            {/* Top decorative spine ribbon band */}
                            <div className="w-full h-[2.5px] bg-white/40"></div>
                            
                            {/* Rotated text spine indicator */}
                            <span 
                              className="text-[7.5px] font-black text-white/90 tracking-widest uppercase"
                              style={{ 
                                writingMode: 'vertical-lr', 
                                transform: 'rotate(180deg)',
                                textShadow: '0px 1px 1px rgba(0,0,0,0.15)'
                              }}
                            >
                              LỚP {ch.grade}
                            </span>
                            
                            {/* Bottom decorative spine ribbon band */}
                            <div className="w-full h-[2.5px] bg-white/40"></div>
                          </div>

                          {/* Shiny textbook cover reflection lines */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-black/5 pointer-events-none rounded-r-xl"></div>

                          {/* Bouncing Bookmark Ribbon (Ruy-băng kẹp trang sách) when selected */}
                          {isSelected && (
                            <div className={`absolute right-4.5 -top-1 w-3.5 h-8 ${theme.ribbonBg} rounded-b-md shadow-sm animate-bounce z-20 flex items-end justify-center pb-1.5`}>
                              <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[9px] font-extrabold tracking-tight px-1.5 py-0.5 rounded-md border ${theme.badge}`}>
                                Bài {ch.id}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold truncate max-w-[170px]">
                                {ch.topic.includes(".") ? ch.topic.split(".")[1]?.trim() : ch.topic}
                              </span>
                            </div>
                            
                            <h4 className={`font-black text-xs md:text-sm leading-tight transition-colors ${
                              isSelected ? theme.textActive : "text-slate-800 group-hover:text-blue-600"
                            }`}>
                              {ch.title}
                            </h4>
                            
                            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 leading-relaxed">
                              {ch.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Digital Wood/White Shelf Plank (Tấm ván gỗ của kệ sách) */}
                  <div className="h-3 w-full bg-gradient-to-r from-slate-250 via-slate-200 to-slate-250 rounded-b-md shadow-xs border-t border-slate-350/20 mb-5 relative">
                    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black/5 rounded-b-md"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                <p className="text-sm text-slate-400 font-bold">Không tìm thấy bài học nào phù hợp.</p>
                <p className="text-xs text-slate-300 mt-1">Em hãy nhập lại từ khóa khác nhé!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Chapter Content (Cols: 7) */}
        <div className="lg:col-span-7 flex flex-col" id="chapter-detail-pane">
          <AnimatePresence mode="wait">
            {selectedChapter ? (
              <motion.div
                key={selectedChapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col h-full relative"
                id={`chapter-detail-content-${selectedChapter.id}`}
              >
                {/* Visual binder rings on top to look like a student's open binder notebook */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none z-20">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-3 h-6 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-full border border-slate-400 shadow-xs opacity-60"></div>
                  ))}
                </div>

                {/* Topic Header styled like a beautiful book chapter opener */}
                <div className="border-b border-slate-100 pb-5 mb-5 mt-2">
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className={`px-2.5 py-0.5 text-[10px] font-black rounded-full uppercase tracking-wider border shadow-3xs ${activeBookTheme.badge}`}>
                      📚 LỚP {selectedChapter.grade}
                    </span>
                    <span className="text-[10px] md:text-xs text-slate-400 font-extrabold uppercase tracking-wider">{selectedChapter.topic}</span>
                  </div>
                  
                  <h3 className={`text-xl md:text-2xl font-black tracking-tight font-sans ${activeBookTheme.textActive}`}>
                    {selectedChapter.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed italic border-l-3 border-slate-200 pl-3 py-0.5">
                    "{selectedChapter.description}"
                  </p>
                </div>

                {/* Phần 1 & Phần 2 Notebook Divider Tabs */}
                <div className="flex gap-2 border-b border-slate-200 mb-5 pb-px">
                  <button
                    onClick={() => setActiveTab("theory")}
                    className={`flex-1 pb-2.5 text-center text-xs md:text-sm font-extrabold border-b-2.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === "theory"
                        ? `${activeBookTheme.tabActive} font-black`
                        : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
                    }`}
                    id="tab-btn-theory"
                  >
                    <BookOpen size={15} /> Phần 1. Lý thuyết cần nắm
                  </button>
                  <button
                    onClick={() => setActiveTab("quiz")}
                    className={`flex-1 pb-2.5 text-center text-xs md:text-sm font-extrabold border-b-2.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === "quiz"
                        ? `${activeBookTheme.tabActive} font-black`
                        : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
                    }`}
                    id="tab-btn-quiz"
                  >
                    <Sparkles size={15} className={activeTab === "quiz" ? "text-amber-500 animate-pulse" : ""} /> Phần 2. Bài tập vận dụng
                  </button>
                </div>

                {/* TAB CONTENT: THEORY */}
                {activeTab === "theory" && (() => {
                  const stdTheory = getStandardizedTheory(selectedChapter);
                  return (
                    <div className="flex-1 flex flex-col h-full">
                      {/* TEXTBOOK SECTIONS & POST-LESSON REVIEW */}
                      <div className="flex-1 overflow-y-auto pr-2 max-h-[480px] mb-6 space-y-4" style={{ scrollbarWidth: 'thin' }}>
                        
                        {/* 1. TEXTBOOK SECTIONS (BÁM SÁT MỤC SGK TIN HỌC THPT) */}
                        {stdTheory.sections.map((sec, idx) => (
                          <div key={idx} className="bg-white/90 border border-slate-200/90 rounded-2xl p-4 shadow-3xs space-y-3">
                            <h4 className="text-xs md:text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                              <span className="w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center text-[11px] font-mono flex-shrink-0">
                                {idx + 1}
                              </span>
                              <span>{sec.title}</span>
                            </h4>

                            {/* Section content markdown */}
                            <div className="prose prose-sm prose-slate leading-relaxed markdown-body text-slate-800 text-xs md:text-sm">
                              <ReactMarkdown>{sec.contentMarkdown}</ReactMarkdown>
                            </div>

                            {/* Illustrative Example for Section */}
                            {sec.example && (
                              <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-xl text-xs text-blue-950 font-medium space-y-1">
                                <span className="font-extrabold text-blue-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                                  <Lightbulb size={13} className="text-amber-500 fill-amber-400" /> Ví dụ minh họa:
                                </span>
                                <p className="text-slate-700 leading-relaxed font-medium">{sec.example}</p>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* 2. SAMPLE CODE / SYNTAX IF AVAILABLE */}
                        {stdTheory.sampleCode && (
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md text-white space-y-2">
                            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
                              <Code size={14} className="text-amber-400" /> {stdTheory.sampleCode.title}
                            </h4>
                            <pre className="p-3 bg-slate-950/80 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed border border-slate-800 select-all">
                              <code>{stdTheory.sampleCode.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* 3. POST-LESSON REVIEW SECTIONS (SAU BÀI HỌC) */}
                        <div className="pt-2 border-t border-slate-200/80 space-y-3">
                          <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-emerald-500" /> Tổng kết sau bài học:
                          </h4>

                          {/* ❌ LỖI THƯỜNG GẶP */}
                          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 shadow-3xs space-y-2">
                            <h5 className="text-xs font-black text-rose-900 uppercase tracking-wider flex items-center gap-2">
                              <AlertTriangle size={14} className="text-rose-600" /> ✅ Lỗi thường gặp (Cần tránh khi làm bài)
                            </h5>
                            <div className="space-y-1.5">
                              {stdTheory.loiHayNham.map((l, lIdx) => (
                                <div key={lIdx} className="flex items-start gap-2 text-xs md:text-sm text-rose-950 font-medium bg-white/80 p-2.5 rounded-xl border border-rose-100">
                                  <span>{l}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 🎯 MẸO GHI NHỚ */}
                          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 shadow-3xs space-y-2">
                            <h5 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-2">
                              <Zap size={14} className="text-amber-600 animate-pulse fill-amber-500" /> ✅ Mẹo ghi nhớ siêu tốc
                            </h5>
                            <div className="space-y-1.5">
                              {stdTheory.meoGhiNho.map((m, mIdx) => (
                                <div key={mIdx} className="bg-white/80 border border-amber-200/60 p-2.5 rounded-xl text-xs font-bold text-amber-950 shadow-2xs">
                                  <span>{m}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 🌐 LIÊN HỆ THỰC TẾ & TÌNH HUỐNG (CÓ GỢI Ý & ĐÁP ÁN) */}
                          <PracticalScenarioCard app={stdTheory.lienHeThucTe} />
                        </div>

                      </div>

                      {/* Footer interactive tools */}
                      <div className="border-t border-slate-100 pt-4 mt-auto">
                        <h5 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          <MessageSquare size={14} className="text-indigo-500 animate-bounce" /> Hỏi cô Thuý Hào về bài này:
                        </h5>
                        <div className="grid grid-cols-1 gap-2.5">
                          {selectedChapter.suggestedQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => onAskTeacher(q)}
                              className={`w-full text-left p-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${activeBookTheme.qBtnBg}`}
                              id={`ask-chapter-q-${idx}`}
                            >
                              <span className="font-semibold pr-4 leading-normal text-xs">{q}</span>
                              <ArrowRight size={14} className="text-slate-500 group-hover:translate-x-1.5 transition-transform flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* TAB CONTENT: QUIZ (BÀI TẬP VẬN DỤNG) */}
                {activeTab === "quiz" && (
                  <div className="flex-1 flex flex-col h-full" id="quiz-worksheet-view">
                    
                    {/* LOADING STATE */}
                    {loadingQuiz && (
                      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
                        <Loader2 className="animate-spin text-blue-500 h-10 w-10 mb-4" />
                        <h4 className="font-bold text-gray-700 text-sm">Cô Thuý Hào đang biên soạn đề...</h4>
                        <p className="text-xs text-gray-500 mt-2 max-w-sm animate-pulse leading-relaxed">
                          {loadingMessage}
                        </p>
                        <div className="w-full max-w-xs bg-gray-100 h-1.5 rounded-full overflow-hidden mt-6">
                          <div className="bg-blue-500 h-full w-2/3 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}

                    {/* ERROR STATE */}
                    {quizError && (
                      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
                        <AlertCircle className="text-red-500 h-10 w-10 mb-3" />
                        <h4 className="font-bold text-gray-700 text-sm">Không thể soạn bài tập ôn tập</h4>
                        <p className="text-xs text-red-500 mt-1 max-w-md leading-relaxed">{quizError}</p>
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                          <button
                            onClick={() => handleFetchQuiz()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                          >
                            <RefreshCw size={12} /> Soạn lại bài tập
                          </button>
                          {onOpenAISettings && (
                            <button
                              onClick={onOpenAISettings}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                            >
                              ⚙️ Cấu hình API Key AI
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* NOT GENERATED STATE */}
                    {!loadingQuiz && !quizError && !quizData && (
                      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100 mb-4 text-amber-500">
                          <Sparkles size={24} className="animate-bounce" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm md:text-base">Kiểm tra & Vận dụng kiến thức!</h4>
                        <p className="text-xs text-gray-500 mt-2 max-w-md leading-relaxed">
                          Nhấn nút dưới đây để cô Thuý Hào thiết kế riêng cho em bộ <strong>15 câu hỏi bài tập vận dụng</strong> bám sát bài <strong>"{selectedChapter.title}"</strong> với 3 dạng đề thi thực tế:
                        </p>
                        <div className="grid grid-cols-3 gap-2 my-5 text-[10px] md:text-xs text-gray-600 max-w-md w-full">
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                            <span className="font-extrabold text-blue-600 block">Dạng 1</span>
                            <span className="mt-0.5 block">5 câu Trắc nghiệm 4 đáp án</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                            <span className="font-extrabold text-purple-600 block">Dạng 2</span>
                            <span className="mt-0.5 block">5 câu Trả lời ngắn tự nhập</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                            <span className="font-extrabold text-amber-600 block">Dạng 3</span>
                            <span className="mt-0.5 block">5 nhận định Đúng / Sai</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFetchQuiz()}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2 group"
                          id="btn-trigger-ai-quiz"
                        >
                          <Sparkles size={16} className="text-amber-300" /> Cô ơi, ra đề bài tập cho em làm ạ!
                        </button>
                      </div>
                    )}

                    {/* QUIZ WORKSHEET RUNNING STATE */}
                    {!loadingQuiz && !quizError && quizData && (
                      <div className="flex-1 flex flex-col h-full">
                        
                        {/* SCORECARD ON SUBMISSION */}
                        {isSubmitted && (() => {
                          const evaluation = (() => {
                            const correct = quizScore.correct;
                            if (correct === 15) {
                              return {
                                badge: "👑 CHIẾN THẦN TIN HỌC VŨ TRỤ",
                                bgColor: "bg-amber-50 border-amber-300 text-amber-900",
                                badgeColor: "bg-amber-500 text-white",
                                emoji: "🏆",
                                stars: 5,
                                quote: "Mẹ ơi con đậu thủ khoa rồi! Đúng 15/15 câu tuyệt đối thế này thì danh hiệu 'Học bá đám mây' chắc chắn thuộc về em rồi đó nha. Hôm nào Cô Thuý Hào bận đi họp hội đồng sư phạm có khi nhờ em lên bục giảng dạy thay Cô luôn, cưng xỉu! 😘😎 Hãy giữ vững phong độ đỉnh chóp này và thách đấu các bạn khác nha!"
                              };
                            } else if (correct >= 12) {
                              return {
                                badge: "⚡ CAO THỦ THUẬT TOÁN ĐÁM MÂY",
                                bgColor: "bg-emerald-50 border-emerald-300 text-emerald-900",
                                badgeColor: "bg-emerald-600 text-white",
                                emoji: "🚀",
                                stars: 4,
                                quote: "Thần thái ngút ngàn luôn em ơi! Trả lời đúng gần hết thế này là em sắp sửa có chân trong hội đồng quản trị của các tập đoàn công nghệ rồi đó nha. Chỉ sai sót tí xíu do lỡ tay gõ nhanh quá thôi đúng không nè? Đọc kỹ bí kíp giải thích của Cô bên dưới rồi bấm nút làm lại 'phục thù' lấy điểm tuyệt đối đi nào! ✨🔥"
                              };
                            } else if (correct >= 8) {
                              return {
                                badge: "💻 CHIẾN BINH BÀN PHÍM CẦN MẪN",
                                bgColor: "bg-blue-50 border-blue-200 text-blue-900",
                                badgeColor: "bg-blue-600 text-white",
                                emoji: "⭐",
                                stars: 3,
                                quote: "Điểm số cực kỳ ổn áp phết em ơi! Đạt trên trung bình thế này là đủ chỉ tiêu đạt chuẩn chất lượng cao của Bộ Giáo dục rồi đó nha. Cơ mà Cô biết thừa nội công thâm hậu của em còn bay cao bay xa hơn nhiều. Đừng vội hài lòng nè, lo 'đắp' thêm kiến thức từ mấy câu bị lừa bên dưới rồi cày lại cho Cô lác mắt chơi nào! 📚😏"
                              };
                            } else if (correct >= 5) {
                              return {
                                badge: "🤖 THỰC TẬP SINH CÔNG NGHỆ BÁO THỦ",
                                bgColor: "bg-orange-50 border-orange-200 text-orange-900",
                                badgeColor: "bg-orange-500 text-white",
                                emoji: "🧐",
                                stars: 2,
                                quote: "Hơi báo nhẹ rồi nha học trò cưng của Cô ơi! Lúc làm bài có phải vừa cắn hướng dương, vừa lướt TikTok, rồi đầu óc lại nghĩ về 'crush' đúng không khai mau? Trả lời đúng được phân nửa thế này là báo động vàng rồi nhé. Mau cất điện thoại đi, đọc kỹ lời giảng đầy yêu thương của Cô ở dưới rồi làm lại để lấy lại danh dự đi nào! Cô tin em làm được! 💪😂"
                              };
                            } else {
                              return {
                                badge: "🚨 KẺ HỦY DIỆT LINH KIỆN MÁY TÍNH",
                                bgColor: "bg-rose-50 border-rose-200 text-rose-900",
                                badgeColor: "bg-rose-600 text-white",
                                emoji: "😱",
                                stars: 1,
                                quote: "Ui cha! Kết quả này là 'báo động đỏ' cấp độ vũ trụ luôn rồi đó nha học trò ơi! Chắc là chưa thèm đọc kỹ tóm tắt Lý Thuyết ở Phần 1 đã lao vào thực chiến hòng 'ăn may' đúng không nè? Thôi không sao cả, thất bại là mẹ thành công, làm sai là mẹ của... điểm 10 lần sau! Lập tức uống một ngụm nước, hít một hơi thật sâu, xem kỹ bài giải Cô dặn ở dưới rồi quyết chiến lại cho Cô xem thần thái học trò cưng của Cô Thuý Hào nào! Quyết tâm! 🔥🦉"
                              };
                            }
                          })();

                          return (
                            <div className={`mb-6 border rounded-2xl p-5 md:p-6 shadow-sm transition-all animate-fade-in ${evaluation.bgColor}`} id="quiz-scorecard">
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
                                {/* Large dynamic badge / score indicator */}
                                <div className="flex flex-col items-center justify-center text-center flex-shrink-0">
                                  <div className="relative">
                                    <div className="w-20 h-20 bg-white rounded-full border-4 border-dashed border-current flex flex-col items-center justify-center shadow-md select-none">
                                      <span className="text-[28px]">{evaluation.emoji}</span>
                                      <span className="absolute -bottom-2 bg-slate-900 text-white px-2 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider">
                                        {quizScore.correct} / {quizScore.total}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Star Rating Display */}
                                  <div className="flex gap-1 mt-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span 
                                        key={i} 
                                        className={`text-sm select-none transition-transform duration-300 ${i < evaluation.stars ? "text-amber-500 scale-110 drop-shadow-xs" : "text-gray-300 scale-90"}`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                 {/* Main grading detail */}
                                <div className="text-center md:text-left flex-1 space-y-2">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2">
                                    <span className={`text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs inline-block ${evaluation.badgeColor}`}>
                                      {evaluation.badge}
                                    </span>
                                    <span className="text-[11px] text-gray-700 font-extrabold self-center bg-white/80 px-2.5 py-0.5 rounded-full border border-gray-200">
                                      Điểm: {((quizScore.correct / quizScore.total) * 10).toFixed(1)} / 10 ({Math.round((quizScore.correct / quizScore.total) * 100)}%)
                                    </span>
                                  </div>

                                  <h4 className="font-extrabold text-sm md:text-base text-gray-800 flex items-center justify-center md:justify-start gap-1.5 mt-1">
                                    <Award className="text-amber-500 animate-bounce" size={18} /> Lời nhắn ấm áp từ Cô Thuý Hào:
                                  </h4>
                                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium bg-white/65 p-3 rounded-xl border border-white/80 shadow-3xs italic">
                                    "{evaluation.quote}"
                                  </p>

                                  {/* WEAK TOPICS / KIẾN THỨC CẦN ÔN LẠI */}
                                  {weakTopics.length > 0 && (
                                    <div className="bg-rose-50/80 border border-rose-200/80 p-3 rounded-xl space-y-1.5 mt-2">
                                      <span className="text-[11px] font-black text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                                        <Target size={13} className="text-rose-600 animate-pulse" /> Kiến thức em chọn chưa đúng (Cần ôn lại):
                                      </span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {weakTopics.map((wt, wIdx) => (
                                          <span key={wIdx} className="text-[10px] font-bold text-rose-900 bg-white/90 border border-rose-200 px-2 py-0.5 rounded-md shadow-3xs">
                                            ❌ {wt.length > 45 ? wt.slice(0, 45) + "..." : wt}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                                    <button
                                      onClick={() => handleFetchQuiz()}
                                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                                    >
                                      <Sparkles size={12} className="text-amber-300" /> Sinh bộ câu hỏi MỚI (Ngẫu nhiên)
                                    </button>
                                    {weakTopics.length > 0 && (
                                      <button
                                        onClick={() => handleFetchQuiz(weakTopics)}
                                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all animate-pulse"
                                      >
                                        <Target size={12} /> Cô ơi, ra đề tập trung khắc phục điểm yếu cho em!
                                      </button>
                                    )}
                                    <a
                                      href="#quiz-worksheet-scroll"
                                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-gray-700 text-[11px] font-bold rounded-lg border border-gray-200 flex items-center gap-1 shadow-3xs transition-all"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("quiz-worksheet-scroll")?.scrollIntoView({ behavior: "smooth" });
                                      }}
                                    >
                                      🔍 Xem lời giải chi tiết
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* WORKSHEET SCROLL AREA */}
                        <div className="flex-1 overflow-y-auto pr-1 max-h-[350px] space-y-6 mb-4" id="quiz-worksheet-scroll">
                          
                          {/* SECTION A: MULTIPLE CHOICE */}
                          <div className="space-y-3.5">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
                              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-black rounded-md">PHẦN A</span>
                              <h4 className="text-xs font-black text-slate-700 uppercase tracking-tight">Câu hỏi trắc nghiệm (Chọn 1 trong 4 đáp án)</h4>
                            </div>
                            
                            {quizData.multipleChoice.map((q, idx) => {
                              const isCorrect = mcAnswers[q.id] === q.correctIndex;
                              const isSelected = mcAnswers[q.id] !== undefined;

                              return (
                                <div key={q.id} className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3 transition-all">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-extrabold text-blue-600">Câu hỏi {idx + 1} / 5</span>
                                    <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-md ${
                                      q.level === "Nhận biết" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                      q.level === "Thông hiểu" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                                      q.level === "Vận dụng" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                      "bg-rose-50 text-rose-700 border border-rose-100"
                                    }`}>{q.level}</span>
                                  </div>
                                  <p className="text-xs font-bold text-gray-800 leading-normal">{q.question}</p>
                                  
                                  {/* 4 options buttons */}
                                  <div className="grid grid-cols-1 gap-1.5">
                                    {q.options.map((option, optIdx) => {
                                      const charPrefix = ["A", "B", "C", "D"][optIdx];
                                      const isUserSelected = mcAnswers[q.id] === optIdx;
                                      const isThisCorrect = optIdx === q.correctIndex;

                                      let btnClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";

                                      if (isUserSelected && !isSubmitted) {
                                        btnClass = "bg-blue-50 border-blue-500 text-blue-700 font-semibold";
                                      }

                                      if (isSubmitted) {
                                        if (isThisCorrect) {
                                          btnClass = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                                        } else if (isUserSelected) {
                                          btnClass = "bg-rose-50 border-rose-300 text-rose-800 font-medium";
                                        } else {
                                          btnClass = "bg-white border-slate-100 text-slate-300 opacity-60";
                                        }
                                      }

                                      return (
                                        <button
                                          key={optIdx}
                                          disabled={isSubmitted}
                                          onClick={() => setMcAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                          className={`w-full text-left p-2.5 rounded-lg border text-xs leading-relaxed transition-all flex items-start gap-2 ${
                                            isSubmitted ? "" : "cursor-pointer"
                                          } ${btnClass}`}
                                        >
                                          <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] flex-shrink-0 ${
                                            isUserSelected 
                                              ? isSubmitted && !isCorrect ? "bg-rose-500 text-white" : "bg-blue-600 text-white"
                                              : isSubmitted && isThisCorrect ? "bg-emerald-600 text-white" : "bg-slate-200 text-gray-600"
                                          }`}>{charPrefix}</span>
                                          <span className="flex-1">{option}</span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Explain */}
                                  {isSubmitted && (
                                    <div className="bg-white border border-slate-200 rounded-xl p-3 text-[11px] text-gray-600 leading-relaxed space-y-1.5">
                                      <span className="font-extrabold text-gray-700 flex items-center gap-1">
                                        <Info size={11} className="text-blue-500" /> Cô Thuý Hào giảng giải:
                                      </span>
                                      <p className="italic">"{q.explanation}"</p>
                                      {!isCorrect && (
                                        <div className="bg-amber-50/80 border border-amber-200/80 p-2 rounded-lg text-amber-950 font-medium text-[10px]">
                                          <strong className="text-amber-800">📌 Nhắc lại SGK:</strong> Bám sát kiến thức trọng tâm "{selectedChapter.title}" (Lớp {selectedChapter.grade}) - chú ý mức độ {q.level}!
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* SECTION B: SHORT ANSWER */}
                          <div className="space-y-3.5 pt-2">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
                              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[9px] font-black rounded-md">PHẦN B</span>
                              <h4 className="text-xs font-black text-slate-700 uppercase tracking-tight">Câu hỏi trả lời ngắn (Điền từ khóa đúng nhất)</h4>
                            </div>

                            {quizData.shortAnswer.map((q, idx) => {
                              const userAns = (saAnswers[q.id] || "").trim();
                              const correctAns = q.correctAnswer.trim();
                              const isCorrect = userAns.toLowerCase() === correctAns.toLowerCase() ||
                                (correctAns.length >= 3 && userAns.toLowerCase().includes(correctAns.toLowerCase())) ||
                                (userAns.length >= 3 && correctAns.toLowerCase().includes(userAns.toLowerCase()));

                              return (
                                <div key={q.id} className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3 transition-all">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-extrabold text-purple-600">Câu hỏi {idx + 1} / 5</span>
                                    <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-md ${
                                      q.level === "Nhận biết" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                      q.level === "Thông hiểu" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                                      q.level === "Vận dụng" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                      "bg-rose-50 text-rose-700 border border-rose-100"
                                    }`}>{q.level}</span>
                                  </div>
                                  <p className="text-xs font-bold text-gray-800 leading-normal">{q.question}</p>

                                  {/* Input area */}
                                  <div className="relative">
                                    <input
                                      type="text"
                                      disabled={isSubmitted}
                                      value={saAnswers[q.id] || ""}
                                      onChange={(e) => setSaAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                      placeholder="Hãy nhập câu trả lời ngắn của em..."
                                      className={`w-full p-2.5 pr-8 text-xs border rounded-lg focus:outline-none transition-all ${
                                        isSubmitted 
                                          ? isCorrect 
                                            ? "bg-emerald-50/50 border-emerald-400 text-emerald-900 font-bold" 
                                            : "bg-rose-50/50 border-rose-300 text-rose-900"
                                          : "bg-white focus:bg-white border-slate-200 focus:border-blue-500"
                                      }`}
                                    />
                                    <div className="absolute right-2.5 top-2.5">
                                      {isSubmitted && (
                                        isCorrect 
                                          ? <CheckCircle size={14} className="text-emerald-600" />
                                          : <XCircle size={14} className="text-rose-500" />
                                      )}
                                    </div>
                                  </div>

                                  {/* Answer details & explanations */}
                                  {isSubmitted && (
                                    <div className="space-y-2">
                                      <div className="text-[11px]">
                                        <span className="text-gray-400">Đáp án chính xác: </span>
                                        <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 ml-1 inline-block">{q.correctAnswer}</span>
                                      </div>

                                      <div className="bg-white border border-slate-200 rounded-xl p-3 text-[11px] text-gray-600 leading-relaxed space-y-1.5">
                                        <span className="font-extrabold text-gray-700 flex items-center gap-1">
                                          <Info size={11} className="text-purple-500" /> Cô Thuý Hào giảng giải:
                                        </span>
                                        <p className="italic">"{q.explanation}"</p>
                                        {!isCorrect && (
                                          <div className="bg-amber-50/80 border border-amber-200/80 p-2 rounded-lg text-amber-950 font-medium text-[10px]">
                                            <strong className="text-amber-800">📌 Nhắc lại SGK:</strong> Bám sát chuẩn thuật ngữ SGK - hãy đối chiếu đáp án "{q.correctAnswer}"!
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* SECTION C: TRUE / FALSE */}
                          <div className="space-y-3.5 pt-2">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
                              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-black rounded-md">PHẦN C</span>
                              <h4 className="text-xs font-black text-slate-700 uppercase tracking-tight">Câu hỏi Đúng / Sai (Nhận định đúng hoặc sai)</h4>
                            </div>

                            {quizData.trueFalse.map((q, idx) => {
                              const userChoice = tfAnswers[q.id];
                              const isCorrect = userChoice === q.correctAnswer;

                              return (
                                <div key={q.id} className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3 transition-all">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-extrabold text-amber-600">Nhận định {idx + 1} / 5</span>
                                    <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-md ${
                                      q.level === "Nhận biết" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                      q.level === "Thông hiểu" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                                      q.level === "Vận dụng" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                      "bg-rose-50 text-rose-700 border border-rose-100"
                                    }`}>{q.level}</span>
                                  </div>
                                  <p className="text-xs font-medium text-gray-800 leading-normal p-2 bg-white rounded-lg border border-slate-100 italic">"{q.question}"</p>

                                  {/* Đúng Sai buttons */}
                                  <div className="grid grid-cols-2 gap-2">
                                    {[true, false].map((boolVal) => {
                                      const label = boolVal ? "ĐÚNG" : "SAI";
                                      const isSelected = userChoice === boolVal;
                                      const isThisCorrect = q.correctAnswer === boolVal;

                                      let btnClass = "bg-white border-slate-200 text-slate-600 hover:bg-slate-50";

                                      if (isSelected && !isSubmitted) {
                                        btnClass = boolVal
                                          ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold"
                                          : "bg-rose-50 border-rose-400 text-rose-700 font-bold";
                                      }

                                      if (isSubmitted) {
                                        if (isThisCorrect) {
                                          btnClass = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                                        } else if (isSelected) {
                                          btnClass = "bg-rose-50 border-rose-300 text-rose-800 font-medium";
                                        } else {
                                          btnClass = "bg-white border-slate-100 text-slate-300 opacity-60";
                                        }
                                      }

                                      return (
                                        <button
                                          key={boolVal.toString()}
                                          disabled={isSubmitted}
                                          onClick={() => setTfAnswers(prev => ({ ...prev, [q.id]: boolVal }))}
                                          className={`py-2 rounded-lg border text-xs font-bold tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${
                                            isSubmitted ? "" : "cursor-pointer"
                                          } ${btnClass}`}
                                        >
                                          <span>{label}</span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Explanation */}
                                  {isSubmitted && (
                                    <div className="bg-white border border-slate-200 rounded-xl p-3 text-[11px] text-gray-600 leading-relaxed space-y-1.5">
                                      <span className="font-extrabold text-gray-700 flex items-center gap-1">
                                        <Info size={11} className="text-amber-500" /> Cô Thuý Hào giảng giải:
                                      </span>
                                      <p className="italic">"{q.explanation}"</p>
                                      {!isCorrect && (
                                        <div className="bg-amber-50/80 border border-amber-200/80 p-2 rounded-lg text-amber-950 font-medium text-[10px]">
                                          <strong className="text-amber-800">📌 Nhắc lại SGK:</strong> Chú ý kỹ từ khóa khẳng định hoặc phủ định trong mệnh đề để tránh bẫy!
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                        </div>

                        {/* WORKSHEET ACTIONS FOOTER */}
                        <div className="border-t border-slate-100 pt-3 mt-auto flex items-center justify-between gap-4">
                          {!isSubmitted ? (
                            <>
                              <span className="text-[10px] text-gray-400 font-bold">
                                Đã làm: {Object.keys(mcAnswers).length + Object.keys(saAnswers).length + Object.keys(tfAnswers).length} / 15 câu
                              </span>
                              <button
                                onClick={handleSubmitQuiz}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                                id="btn-submit-worksheet"
                              >
                                Nộp bài cho Cô chấm
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={handleResetQuiz}
                              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                              id="btn-retry-worksheet"
                            >
                              <RefreshCw size={12} /> Làm lại bài tập lần nữa
                            </button>
                          )}
                        </div>

                      </div>
                    )}

                  </div>
                )}

              </motion.div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <BookOpen size={48} className="text-gray-300 mb-3" />
                <h4 className="font-bold text-gray-600 text-sm">Chưa có bài học nào được chọn</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  Em hãy click chọn một bài học ở cột bên trái để đọc nội dung tóm tắt lý thuyết và đặt câu hỏi cho cô nhé!
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setSelectedChapter(CHAPTERS[0])}
                    className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                    id="btn-quick-read-chapter"
                  >
                    Xem bài học đầu tiên
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
