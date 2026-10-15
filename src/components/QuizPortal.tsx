import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { 
  Trophy, HelpCircle, Check, X, RefreshCw, ChevronRight, Dices, Sparkles, 
  Filter, AlertCircle, Hash, Layers, Play, ArrowLeft, RotateCcw, Award, Plus, Sparkle,
  Clock, Timer, Frown, Smile, Heart, Star, CloudRain
} from "lucide-react";
import { QUIZ_QUESTIONS, GRADE_TOPICS } from "../data/quizzes";
import { QuizQuestion, UserProfile } from "../types";
import { auth, saveQuizResultToFirestore } from "../lib/firebase";

interface QuizPortalProps {
  currentUser?: UserProfile | null;
}

// Fisher-Yates array shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Function to shuffle question options while maintaining correct index tracking
function shuffleQuestionOptions(q: QuizQuestion): QuizQuestion {
  const correctAnswerText = q.options[q.correctIndex];
  const shuffledOptions = shuffleArray(q.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
  return {
    ...q,
    options: shuffledOptions,
    correctIndex: newCorrectIndex
  };
}

// Cute 20s Clock Timer Component
function CuteClockTimer({ timeLeft, totalTime = 20 }: { timeLeft: number; totalTime?: number }) {
  const progressPercent = (timeLeft / totalTime) * 100;

  let face = "(◕‿◕)";
  let colorClass = "border-emerald-600 text-emerald-700 bg-emerald-50";
  let ringColor = "text-emerald-600";
  let wiggleAnimation = "";

  if (timeLeft <= 5) {
    face = "(>_<)";
    colorClass = "border-red-600 text-red-700 bg-red-50";
    ringColor = "text-red-600";
    wiggleAnimation = "animate-bounce";
  } else if (timeLeft <= 10) {
    face = "(⊙_⊙)";
    colorClass = "border-amber-600 text-amber-700 bg-amber-50";
    ringColor = "text-amber-600";
  }

  return (
    <div className={`relative flex items-center gap-2.5 px-3 py-1 rounded-2xl border-2 shadow-2xs transition-all ${colorClass} ${wiggleAnimation}`}>
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="15"
            className="stroke-slate-200"
            strokeWidth="3.5"
            fill="transparent"
          />
          <circle
            cx="20"
            cy="20"
            r="15"
            className={`${ringColor} transition-all duration-1000 ease-linear`}
            strokeWidth="3.5"
            strokeDasharray="94.25"
            strokeDashoffset={94.25 - (94.25 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute font-mono font-black text-xs text-slate-900">
          {timeLeft}s
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-black tracking-wider leading-none opacity-80">
          ĐỒNG HỒ 20S
        </span>
        <span className="text-xs font-black tracking-widest font-mono mt-0.5">
          {face}
        </span>
      </div>
    </div>
  );
}

// Celebration Flowers Component for Correct Answers
function CelebrationFlowers() {
  const flowers = ["🌸", "🌺", "🌼", "💐", "✨", "⭐", "🎉"];
  return (
    <div className="absolute -top-4 inset-x-0 pointer-events-none flex justify-around overflow-hidden h-20 z-20">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -20, opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{
            y: [0, 40, 70],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (i * 0.15) % 0.8,
            ease: "easeOut"
          }}
          className="text-lg md:text-xl select-none"
        >
          {flowers[i % flowers.length]}
        </motion.span>
      ))}
    </div>
  );
}

// Crying Rain Mascot for Incorrect Answers / Timeout
function CryingRainMascot({ isTimeout }: { isTimeout?: boolean }) {
  const tears = ["💧", "😭", "🌧️", "⚡", "💧"];
  return (
    <div className="relative overflow-hidden p-3 bg-red-100/90 border-2 border-red-400 rounded-xl flex items-center gap-3">
      <div className="text-3xl animate-bounce shrink-0">
        😭
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 font-black text-xs text-red-950 uppercase tracking-wider">
          <span>MÌ NHEO VUI NHỘN</span>
          <span className="text-base">🌧️</span>
        </div>
        <p className="text-xs font-bold text-red-900 leading-snug">
          {isTimeout 
            ? "Hết 20 giây mất rồi em ơi! Đừng buồn, xem lời giải của cô bên dưới nha~" 
            : "Chưa đúng mất rồi! Đừng nản chí nhé, cùng đọc lời giải chuẩn bên dưới!"}
        </p>
      </div>

      <div className="absolute right-3 top-0 bottom-0 pointer-events-none flex gap-1">
        {tears.map((t, idx) => (
          <motion.span
            key={idx}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: [0, 30], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: idx * 0.25,
              ease: "linear"
            }}
            className="text-sm select-none"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function QuizPortal({ currentUser }: QuizPortalProps) {
  const isTeacher = currentUser?.role === "teacher";
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  
  // Custom teacher new question state
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectIdx, setNewCorrectIdx] = useState(0);
  const [newExplanation, setNewExplanation] = useState("");
  const [newGrade, setNewGrade] = useState<"10" | "11" | "12" | "all">("10");
  const [addSuccessMsg, setAddSuccessMsg] = useState("");

  // Mode state: false = Setup / Selection Mode; true = Active Quiz Mode
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Selected Grade: "all" | "10" | "11" | "12"
  const [selectedGrade, setSelectedGrade] = useState<"all" | "10" | "11" | "12">("10");
  
  // Selected Topic ID: "all" or specific topic ID
  const [selectedTopicId, setSelectedTopicId] = useState<string>("all");
  
  // Quiz question limit
  const [quizLimit, setQuizLimit] = useState<number | "all">(10);
  const [customInputVal, setCustomInputVal] = useState<string>("");

  // 20s Timer per question state
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimedOut, setIsTimedOut] = useState(false);

  // Get available topic list based on selected grade
  const currentGradeTopics = useMemo(() => {
    if (selectedGrade === "all") {
      return [
        ...GRADE_TOPICS["10"],
        ...GRADE_TOPICS["11"],
        ...GRADE_TOPICS["12"]
      ];
    }
    return GRADE_TOPICS[selectedGrade] || [];
  }, [selectedGrade]);

  // Base question pool matching selected Grade & selected Topic
  const basePool = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      const matchGrade = selectedGrade === "all" || q.grade === selectedGrade || q.grade === "all";
      if (!matchGrade) return false;

      if (selectedTopicId === "all") return true;
      if (q.topicId === selectedTopicId) return true;

      const topicObj = currentGradeTopics.find(t => t.id === selectedTopicId);
      if (topicObj && q.topicNumber === topicObj.number && (q.grade === topicObj.grade || selectedGrade === "all")) {
        return true;
      }

      return false;
    });
  }, [selectedGrade, selectedTopicId, currentGradeTopics]);

  // Active quiz session questions state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = activeQuestions[currentIdx];

  // Trigger Confetti fireworks on correct answer
  const triggerFlowersConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10B981", "#F59E0B", "#EC4899", "#3B82F6", "#8B5CF6"]
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#FFD700", "#FF69B4", "#00FF7F"]
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#FFD700", "#FF69B4", "#00FF7F"]
        });
      }, 150);
    } catch (e) {
      // safe fallback
    }
  };

  // 20s Question Countdown Timer Effect
  useEffect(() => {
    if (!isQuizActive || isFinished || isAnswered || !currentQuestion) {
      return;
    }

    setTimeLeft(20);
    setIsTimedOut(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle timeout
          setIsAnswered(true);
          setIsTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIdx, isQuizActive, isFinished, isAnswered, currentQuestion]);

  // Generate Quiz Session
  const prepareQuizQuestions = (limit: number | "all" = quizLimit, poolOverride?: QuizQuestion[]): QuizQuestion[] => {
    const primaryPool = poolOverride !== undefined ? poolOverride : basePool;
    let targetLimit: number | "all" = limit;

    if (customInputVal.trim() !== "") {
      const parsed = parseInt(customInputVal, 10);
      if (!isNaN(parsed) && parsed > 0) {
        targetLimit = parsed;
      }
    }

    let selectedQuestions: QuizQuestion[] = [];

    if (targetLimit === "all") {
      selectedQuestions = shuffleArray(primaryPool);
    } else {
      const numNeeded = typeof targetLimit === "number" ? targetLimit : primaryPool.length;

      if (primaryPool.length >= numNeeded) {
        selectedQuestions = shuffleArray(primaryPool).slice(0, numNeeded);
      } else {
        const shuffledPrimary = shuffleArray(primaryPool);
        const primaryIds = new Set(shuffledPrimary.map(q => q.id));
        const neededRemaining = numNeeded - shuffledPrimary.length;

        const sameGradePool = QUIZ_QUESTIONS.filter(q =>
          (selectedGrade === "all" || q.grade === selectedGrade || q.grade === "all") && !primaryIds.has(q.id)
        );
        const shuffledSameGrade = shuffleArray(sameGradePool);
        let extra = shuffledSameGrade.slice(0, neededRemaining);

        if (shuffledPrimary.length + extra.length < numNeeded) {
          const usedIds = new Set([...primaryIds, ...extra.map(q => q.id)]);
          const allSystemPool = QUIZ_QUESTIONS.filter(q => !usedIds.has(q.id));
          const stillNeeded = numNeeded - (shuffledPrimary.length + extra.length);
          const systemExtra = shuffleArray(allSystemPool).slice(0, stillNeeded);
          extra = [...extra, ...systemExtra];
        }

        selectedQuestions = [...shuffledPrimary, ...extra];
      }
    }

    return selectedQuestions.map(shuffleQuestionOptions);
  };

  // Start Quiz Action
  const handleStartQuiz = () => {
    const questions = prepareQuizQuestions();
    if (questions.length === 0) {
      alert("Chưa có câu hỏi nào trong mục này. Vui lòng chọn khối lớp hoặc chủ đề khác!");
      return;
    }
    setActiveQuestions(questions);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTimedOut(false);
    setScore(0);
    setIsFinished(false);
    setIsQuizActive(true);
  };

  // Restart Current Quiz with new shuffled question order
  const handleRestartCurrentQuiz = () => {
    const questions = prepareQuizQuestions();
    setActiveQuestions(questions);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTimedOut(false);
    setScore(0);
    setIsFinished(false);
  };

  // Exit Quiz Mode to Setup
  const handleExitQuiz = () => {
    if (isQuizActive && !isFinished && currentIdx > 0) {
      if (!confirm("Em có chắc chắn muốn dừng bài làm trắc nghiệm hiện tại để chọn đề khác không?")) {
        return;
      }
    }
    setIsQuizActive(false);
    setIsFinished(false);
    setCurrentIdx(0);
  };

  const handleGradeChange = (grade: "all" | "10" | "11" | "12") => {
    setSelectedGrade(grade);
    setSelectedTopicId("all");
  };

  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const handleLimitChange = (limit: number | "all") => {
    setQuizLimit(limit);
    setCustomInputVal(limit === "all" ? "" : String(limit));
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered || !currentQuestion) return;

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
      triggerFlowersConfetti();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTimedOut(false);

    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
      const user = auth.currentUser;
      const finalScore = score + (selectedOption === currentQuestion?.correctIndex && !isTimedOut ? 1 : 0);
      saveQuizResultToFirestore({
        userId: user?.uid || "guest_student",
        userName: user?.displayName || "Học sinh An Nhơn",
        userClass: selectedGrade !== "all" ? `Lớp ${selectedGrade}` : "Lớp THPT",
        score: finalScore,
        totalQuestions: activeQuestions.length,
        grade: selectedGrade,
        topicId: selectedTopicId
      });
    }
  };

  const handleSaveNewQuestion = () => {
    if (!newQuestionText.trim() || newOptions.some(o => !o.trim())) {
      alert("Vui lòng nhập đầy đủ câu hỏi và 4 đáp án!");
      return;
    }
    const createdQuestion: QuizQuestion = {
      id: `teacher_q_${Date.now()}`,
      grade: newGrade,
      question: newQuestionText.trim(),
      options: [...newOptions],
      correctIndex: newCorrectIdx,
      explanation: newExplanation.trim() || "Đáp án chuẩn do Giáo viên biên soạn."
    };
    QUIZ_QUESTIONS.unshift(createdQuestion);
    setAddSuccessMsg("🎉 Đã thêm câu hỏi thành công vào Ngân hàng trắc nghiệm!");
    setTimeout(() => setAddSuccessMsg(""), 3500);
    setNewQuestionText("");
    setNewOptions(["", "", "", ""]);
    setNewExplanation("");
    setShowAddQuestionModal(false);
  };

  // Selected topic name helper
  const selectedTopicObj = currentGradeTopics.find(t => t.id === selectedTopicId);
  const selectedTopicName = selectedTopicId === "all" 
    ? "Tất cả chủ đề bài học" 
    : (selectedTopicObj?.title || "Chủ đề đã chọn");

  // Calculate 10-point scale score
  const scaledScore10 = useMemo(() => {
    if (activeQuestions.length === 0) return 0;
    return Math.round((score / activeQuestions.length) * 10 * 10) / 10;
  }, [score, activeQuestions]);

  const getScoreRank = (s10: number) => {
    if (s10 === 10) return { title: "🌟 XUẤT SẮC TUYỆT ĐỐI", color: "bg-amber-500 text-slate-950 border-amber-600", desc: "Em trả lời đúng 100%! Nắm vững hoàn toàn lý thuyết Tin học KNTT!" };
    if (s10 >= 8.0) return { title: "🥇 HỌC LỰC GIỎI", color: "bg-emerald-600 text-white border-emerald-700", desc: "Kết quả rất ấn tượng! Em đã hiểu sâu bài học rồi đấy." };
    if (s10 >= 6.5) return { title: "🥈 HỌC LỰC KHÁ", color: "bg-blue-600 text-white border-blue-700", desc: "Khá tốt em ơi! Ôn lại thêm một vài câu chưa đúng là đạt điểm tối đa nha." };
    if (s10 >= 5.0) return { title: "🥉 TRUNG BÌNH", color: "bg-amber-600 text-white border-amber-700", desc: "Tạm ổn! Em hãy xem lại lý thuyết trong ứng dụng và làm lại bài nhé." };
    return { title: "📚 CẦN CỐ GẮNG HƠN", color: "bg-red-600 text-white border-red-700", desc: "Đừng nản lòng nhé! Cùng cô Thuý Hào làm lại đề để ghi nhớ sâu bài nhé!" };
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-5" id="quiz-portal-container">
      {/* Teacher Control Bar */}
      {isTeacher && (
        <div className="mb-4 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-3 flex items-center justify-between text-amber-900 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-amber-600 text-white rounded-lg text-[10px] font-black uppercase">
              👩‍🏫 QUẢN TRỊ
            </span>
            <span className="hidden sm:inline">Quyền Giáo viên / Quản trị viên: Có thể thêm câu hỏi mới vào ngân hàng đề thi.</span>
          </div>
          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black shadow-xs transition-all cursor-pointer text-xs shrink-0 flex items-center gap-1"
          >
            <Plus size={14} /> Thêm câu hỏi
          </button>
        </div>
      )}

      {addSuccessMsg && (
        <div className="mb-4 bg-emerald-600 text-white text-xs font-bold p-3 rounded-xl shadow-md flex items-center gap-2 animate-bounce">
          <Check size={16} /> {addSuccessMsg}
        </div>
      )}

      {/* MODE 1: SETUP & SELECTION PANEL */}
      {!isQuizActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
          id="quiz-setup-panel"
        >
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border-2 border-slate-900 p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-900 border border-amber-300 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Sparkle size={12} className="text-amber-600 fill-amber-500" /> BÁM SÁT SGK KẾT NỐI TRI THỨC
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5 font-sans">
              <Trophy size={26} className="text-amber-500 shrink-0" /> Đấu Trường Trắc Nghiệm Tin Học THPT
            </h2>
            <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
              Hệ thống câu hỏi ôn luyện chuẩn hóa phân chia theo Khối lớp và từng Chủ đề bài học. Đồng hồ 20s mỗi câu cùng hiệu ứng tung hoa mừng điểm cao!
            </p>
          </div>

          {/* Step 1: Filter Grade */}
          <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Filter size={15} className="text-emerald-600" /> Bước 1: Chọn Khối Lớp Học Tập
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "10", title: "🎒 Lớp 10", desc: "Tin học 10 KNTT" },
                { id: "11", title: "📚 Lớp 11", desc: "Tin ứng dụng 11" },
                { id: "12", title: "🎓 Lớp 12", desc: "Tin học 12 KNTT" },
                { id: "all", title: "✨ Tất cả khối", desc: "Tổng hợp THPT" }
              ].map((item) => {
                const isSelected = selectedGrade === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleGradeChange(item.id as any)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-600 text-white border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] font-black scale-[1.02]"
                        : "bg-slate-50 text-slate-900 border-slate-300 hover:border-slate-900 hover:bg-white font-bold"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-black">{item.title}</span>
                    <span className={`text-[10px] mt-1 ${isSelected ? "text-white/90" : "text-slate-500"}`}>
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Topic */}
          <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={15} className="text-blue-600" /> Bước 2: Chọn Chủ Đề Ôn Luyện ({selectedGrade !== "all" ? `Lớp ${selectedGrade}` : "Toàn bộ THPT"})
              </span>
              <span className="text-xs font-bold text-slate-600">
                Kho: <strong className="text-emerald-700 font-extrabold">{basePool.length} câu</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="quiz-topic-selector">
              {/* Option: All topics for grade */}
              <button
                type="button"
                onClick={() => handleTopicChange("all")}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  selectedTopicId === "all"
                    ? "bg-blue-600 text-white border-slate-900 font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    : "bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-900 hover:bg-white font-bold"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold">📌 Tất cả chủ đề bài học</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                  selectedTopicId === "all" ? "bg-white text-blue-900" : "bg-slate-200 text-slate-700"
                }`}>
                  {QUIZ_QUESTIONS.filter(q => selectedGrade === "all" || q.grade === selectedGrade || q.grade === "all").length} câu
                </span>
              </button>

              {/* Individual Topics */}
              {currentGradeTopics.map((topic) => {
                const topicCount = QUIZ_QUESTIONS.filter(
                  (q) =>
                    (selectedGrade === "all" || q.grade === selectedGrade || q.grade === "all") &&
                    (q.topicId === topic.id || (q.topicNumber === topic.number && q.grade === topic.grade))
                ).length;
                const isSelected = selectedTopicId === topic.id;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleTopicChange(topic.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? "bg-blue-600 text-white border-slate-900 font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-900 hover:bg-white font-bold"
                    }`}
                  >
                    <span className="text-xs font-bold truncate">{topic.title}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 ${
                      isSelected ? "bg-white text-blue-900" : "bg-slate-200 text-slate-700"
                    }`}>
                      {topicCount} câu
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Question Count & Start Button */}
          <div className="bg-amber-50 rounded-2xl border-2 border-slate-900 p-4 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Hash size={15} className="text-amber-700" /> Bước 3: Số Lượng Câu Hỏi Làm Bài
              </span>

              {/* Number presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[5, 10, 15, 20, "all"].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleLimitChange(num as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer transition-all border-2 ${
                      (quizLimit === num || customInputVal === String(num) || (num === "all" && quizLimit === "all" && customInputVal === ""))
                        ? "bg-amber-500 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                        : "bg-white text-slate-800 border-slate-300 hover:border-slate-900"
                    }`}
                  >
                    {num === "all" ? "Tất cả" : `${num} câu`}
                  </button>
                ))}

                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Khác..."
                  value={customInputVal}
                  onChange={(e) => {
                    setCustomInputVal(e.target.value);
                    const parsed = parseInt(e.target.value, 10);
                    if (!isNaN(parsed) && parsed > 0) {
                      setQuizLimit(parsed);
                    }
                  }}
                  className="w-16 text-xs font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-lg px-2 py-1 outline-none focus:border-slate-900"
                  title="Nhập số lượng câu hỏi tùy chỉnh"
                />
              </div>
            </div>

            {/* Big Launch Button */}
            <button
              type="button"
              onClick={handleStartQuiz}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-black text-sm md:text-base rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center gap-2 cursor-pointer transition-all"
              id="btn-start-quiz-launch"
            >
              <Play size={20} className="fill-white" />
              <span>BẮT ĐẦU LÀM BÀI TRẮC NGHIỆM (20S/CÂU)</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* MODE 2: ACTIVE QUIZ TEST VIEW */}
      {isQuizActive && (
        <AnimatePresence mode="wait">
          {/* Finished Screen */}
          {isFinished ? (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border-2 border-slate-900 shadow-sm p-6 sm:p-8 text-center space-y-6"
              id="quiz-finished-screen"
            >
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto border-2 border-slate-900 animate-bounce">
                <Trophy size={42} className="text-amber-600" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 font-sans">
                  Hoàn Thành Lượt Ôn Luyện!
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-1 font-medium">
                  {selectedGrade !== "all" ? `Lớp ${selectedGrade}` : "THPT"} • {selectedTopicName}
                </p>
              </div>

              {/* 10-Point Scaled Score Display Box */}
              {(() => {
                const rank = getScoreRank(scaledScore10);
                return (
                  <div className="bg-slate-50 border-2 border-slate-900 p-6 rounded-2xl max-w-md mx-auto shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-3">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                      KẾT QUẢ QUY ĐỔI THANG ĐIỂM 10
                    </span>
                    <div className="flex items-baseline justify-center gap-1 font-sans">
                      <span className="text-6xl font-black text-emerald-600 font-mono tracking-tight">
                        {scaledScore10.toFixed(1)}
                      </span>
                      <span className="text-2xl font-black text-slate-400">/ 10 ĐIỂM</span>
                    </div>

                    <div className="inline-block px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-black border border-slate-300">
                      Thực tế: Đúng {score} / {activeQuestions.length} câu
                    </div>

                    <div className={`p-2.5 rounded-xl border-2 font-black text-xs uppercase tracking-wider ${rank.color}`}>
                      {rank.title}
                    </div>

                    <p className="text-xs text-slate-700 font-bold leading-relaxed pt-1">
                      {rank.desc}
                    </p>
                  </div>
                );
              })()}

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestartCurrentQuiz}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs md:text-sm rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center gap-2"
                  id="btn-restart-quiz-session"
                >
                  <RotateCcw size={16} /> Làm lại đề này
                </button>

                <button
                  type="button"
                  onClick={handleExitQuiz}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs md:text-sm rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center gap-2"
                  id="btn-select-other-topic"
                >
                  <ArrowLeft size={16} /> Chọn chủ đề & khối khác
                </button>
              </div>
            </motion.div>
          ) : activeQuestions.length > 0 && currentQuestion ? (
            /* Active Question Card Screen */
            <motion.div
              key={`${currentIdx}-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="relative bg-white rounded-2xl border-2 border-slate-900 shadow-sm p-4 sm:p-6 flex flex-col space-y-5"
              id={`quiz-question-card-${currentIdx}`}
            >
              {/* Question Top Bar with 20s Clock */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleExitQuiz}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-lg border border-slate-300 transition-all cursor-pointer flex items-center gap-1"
                    title="Trở về danh sách chọn đề thi"
                  >
                    <ArrowLeft size={14} /> Đổi đề khác
                  </button>

                  {/* 20s Cute Clock Timer */}
                  <CuteClockTimer timeLeft={timeLeft} totalTime={20} />

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 text-[10px] font-black rounded-md border border-blue-300">
                      Lớp {currentQuestion.grade}
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      Đúng: {score}/{currentIdx + (isAnswered && selectedOption === currentQuestion.correctIndex ? 1 : 0)}
                    </span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-black text-slate-700">
                    <span>CÂU HỎI {currentIdx + 1} / {activeQuestions.length}</span>
                    <span>{Math.round(((currentIdx + 1) / activeQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-300 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-300" 
                      style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl">
                <h4 className="text-sm md:text-base font-black text-slate-900 leading-snug flex items-start gap-2.5 font-sans">
                  <HelpCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line">{currentQuestion.question}</span>
                </h4>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="quiz-options-grid">
                {currentQuestion.options.map((option, idx) => {
                  let cardStyle = "bg-white border-slate-300 hover:border-slate-900 text-slate-900 hover:bg-slate-50";
                  let badgeStyle = "bg-slate-100 text-slate-800 border-slate-300";

                  if (selectedOption === idx) {
                    cardStyle = "bg-amber-100 border-amber-600 text-amber-950 font-black shadow-xs";
                    badgeStyle = "bg-amber-500 text-white border-amber-700";
                  }

                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      cardStyle = "bg-emerald-100 border-emerald-600 text-emerald-950 font-black";
                      badgeStyle = "bg-emerald-600 text-white border-emerald-700";
                    } else if (selectedOption === idx) {
                      cardStyle = "bg-red-100 border-red-500 text-red-950 font-bold";
                      badgeStyle = "bg-red-600 text-white border-red-700";
                    } else {
                      cardStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                      badgeStyle = "bg-slate-100 text-slate-400 border-slate-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      type="button"
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 disabled:cursor-default ${cardStyle}`}
                      id={`option-btn-${idx}`}
                    >
                      <span className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${badgeStyle}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs md:text-sm leading-snug font-bold">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Answer Feedback Banner: Tung hoa if Correct vs Mì nheo if Incorrect/Timeout */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 relative overflow-hidden"
                  id="quiz-explanation-banner"
                >
                  {selectedOption === currentQuestion.correctIndex && !isTimedOut ? (
                    <div className="relative p-4 rounded-xl border-2 bg-emerald-50 border-emerald-500 text-emerald-950 space-y-2 overflow-hidden">
                      <CelebrationFlowers />
                      <div className="flex items-center gap-2 font-black text-sm z-10 relative">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>TUNG HOA CHÚC MỪNG! 🎉🌸 Trả lời xuất sắc 100%!</span>
                      </div>
                      <p className="text-xs md:text-sm leading-relaxed text-slate-800 bg-white/90 p-3 rounded-lg border border-slate-300 font-medium z-10 relative">
                        <strong className="text-slate-900 block mb-1 font-extrabold">💡 Lời giải thích từ cô Thuý Hào:</strong>
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <CryingRainMascot isTimeout={isTimedOut} />
                      <div className="p-3 bg-white rounded-lg border-2 border-slate-200 text-xs md:text-sm text-slate-800 font-medium">
                        <strong className="text-slate-900 block mb-1 font-extrabold">💡 Lời giải thích từ cô Thuý Hào:</strong>
                        {currentQuestion.explanation}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Bottom Submit / Next Buttons */}
              <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-auto">
                <button
                  type="button"
                  onClick={handleRestartCurrentQuiz}
                  className="px-3 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 hover:bg-slate-100"
                  title="Xáo trộn lại câu hỏi"
                >
                  <Dices size={15} /> Xáo đề
                </button>

                <div>
                  {!isAnswered ? (
                    <button
                      type="button"
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      id="btn-submit-answer"
                    >
                      Nộp câu trả lời
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center gap-1.5"
                      id="btn-next-question"
                    >
                      {currentIdx + 1 === activeQuestions.length ? "Xem kết quả điểm số" : "Câu tiếp theo"}
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-slate-900 p-6 space-y-3">
              <AlertCircle size={40} className="text-slate-400 mx-auto" />
              <p className="text-sm text-slate-700 font-bold">
                Chủ đề hoặc khối lớp được chọn hiện chưa có câu hỏi phù hợp.
              </p>
              <button
                type="button"
                onClick={handleExitQuiz}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-emerald-500 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <RefreshCw size={14} /> Trở về chọn chủ đề khác
              </button>
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Teacher Add Question Modal Dialog */}
      <AnimatePresence>
        {showAddQuestionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddQuestionModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl p-6 border-2 border-slate-900 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-amber-100 text-amber-900 rounded-xl font-bold border border-amber-300">👩‍🏫</span>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">Thêm Câu Hỏi Mới Vào Ngân Hàng</h3>
                    <p className="text-[11px] text-slate-500 font-semibold">Quyền Quản trị viên / Giáo viên Cô Thuý Hào</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Dành cho Khối Lớp:</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-slate-900 font-bold"
                >
                  <option value="10">Lớp 10</option>
                  <option value="11">Lớp 11</option>
                  <option value="12">Lớp 12</option>
                  <option value="all">Tất cả các khối</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Nội dung câu hỏi trắc nghiệm:</label>
                <textarea
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Nhập câu hỏi..."
                  rows={3}
                  className="w-full text-xs bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-slate-900 font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-700">4 Lựa chọn phương án trả lời:</label>
                {newOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNewCorrectIdx(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-black shrink-0 flex items-center justify-center cursor-pointer transition-all border ${
                        newCorrectIdx === i
                          ? "bg-emerald-600 text-white border-slate-900 shadow-xs"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200 border-slate-300"
                      }`}
                      title={newCorrectIdx === i ? "Đáp án ĐÚNG" : "Bấm chọn làm đáp án đúng"}
                    >
                      {String.fromCharCode(65 + i)}
                    </button>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newOptions];
                        updated[i] = e.target.value;
                        setNewOptions(updated);
                      }}
                      placeholder={`Phương án ${String.fromCharCode(65 + i)}`}
                      className="flex-1 text-xs bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-slate-900 font-medium"
                    />
                    {newCorrectIdx === i && (
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-1 rounded-md shrink-0">
                        ĐÁP ÁN ĐÚNG
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Lời giải thích đáp án:</label>
                <textarea
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Nhập lời giải thích..."
                  rows={2}
                  className="w-full text-xs bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSaveNewQuestion}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer"
                >
                  Lưu Vào Ngân Hàng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

