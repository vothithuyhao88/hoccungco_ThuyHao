import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  MessageSquare, 
  BookOpen, 
  Code, 
  Trophy, 
  FileSpreadsheet, 
  Home, 
  Heart,
  ChevronRight,
  Phone,
  Mail,
  Youtube,
  ShieldCheck,
  Compass,
  Cpu,
  User
} from "lucide-react";

import TeacherIntro from "./components/TeacherIntro";
import ChatBox from "./components/ChatBox";
import StudyHub from "./components/StudyHub";
import CodePlayground from "./components/CodePlayground";
import QuizPortal from "./components/QuizPortal";
import ExcelGuide from "./components/ExcelGuide";
import MaterialsModal from "./components/MaterialsModal";
import AuthModal from "./components/AuthModal";
import AISettingsModal from "./components/AISettingsModal";
import { UserProfile } from "./types";
import { auth, getUserProfileFromFirestore, ADMIN_DEFAULT_PROFILE } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchGlobalAIConfig } from "./lib/aiConfig";

// @ts-ignore
import defaultAvatarImg from "./assets/images/co_thuy_hao_avatar_red_1784533117032.jpg";

export const TEACHER_AVATAR_DEFAULT = "https://i.ibb.co/PZxSPmrG/image.jpg";

export function formatAvatarUrl(url?: string): string {
  if (!url || url.includes("co_thuy_hao_avatar_red_") || url.includes("gZCxGY4L")) {
    return TEACHER_AVATAR_DEFAULT;
  }
  if (url.includes("ibb.co/") && !url.includes("i.ibb.co/")) {
    const parts = url.split("ibb.co/");
    const id = parts[1]?.split("/")[0]?.split("?")[0];
    if (id) return `https://i.ibb.co/${id}/image.jpg`;
  }
  return url;
}

const LIFE_QUOTES = [
  "Đường tuy ngắn không đi không đến, việc tuy nhỏ không làm không nên.",
  "Đừng xấu hổ khi không biết, chỉ xấu hổ khi không chịu học hỏi.",
  "Sự học như đi thuyền trên dòng nước ngược, không tiến ắt sẽ lùi.",
  "Tri thức là chìa khóa mở ra cánh cửa của tương lai.",
  "Học tập là một kho báu đi theo chủ nhân của nó tới mọi nơi.",
  "Thành công không phải là chìa khóa mở cánh cửa hạnh phúc. Hạnh phúc là chìa khóa dẫn tới thành công.",
  "Mỗi ngày là một cơ hội mới để học hỏi, hoàn thiện bản thân và yêu thương nhiều hơn.",
  "Hãy sống như thể ngày mai bạn sẽ chết. Hãy học như thể bạn sẽ sống mãi mãi.",
  "Đừng đợi cơ hội thuận lợi, hãy tự tạo ra nó bằng nỗ lực của bản thân.",
  "Cuộc sống không phải là để tìm kiếm bản thân mình, mà là để sáng tạo ra bản thân mình."
];

type TabType = "intro" | "chat" | "study" | "playground" | "quiz" | "excel";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("intro");
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
  
  // Set default logged in with Admin account: Thuyhao / Thuyhao88@
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("app_user_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.role === "teacher" || parsed.fullName?.includes("Thúy Hào") || parsed.fullName?.includes("Thuý Hào"))) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    // Default to admin account Thuyhao
    localStorage.setItem("app_user_profile", JSON.stringify(ADMIN_DEFAULT_PROFILE));
    return ADMIN_DEFAULT_PROFILE;
  });

  // Since user is logged in as Admin, keep auth modal closed on start
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Listen for Firebase Auth state changes and fetch Global AI Config
  useEffect(() => {
    fetchGlobalAIConfig();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Always protect and preserve Teacher / Admin account from being downgraded
      const savedStr = localStorage.getItem("app_user_profile");
      if (savedStr) {
        try {
          const parsed = JSON.parse(savedStr);
          if (parsed && parsed.role === "teacher") {
            setCurrentUser(parsed);
            return;
          }
        } catch (_) {}
      }

      if (user) {
        const firestoreProfile = await getUserProfileFromFirestore(user.uid);
        if (firestoreProfile) {
          setCurrentUser(firestoreProfile);
          localStorage.setItem("app_user_profile", JSON.stringify(firestoreProfile));
        } else {
          const isTeacher = 
            user.email === "vothithuyhao88@gmail.com" || 
            user.email === "clbanhsao1@gmail.com";

          const fallbackProfile: UserProfile = {
            fullName: isTeacher ? "Cô Thuý Hào" : (user.displayName || user.email?.split("@")[0] || "Học sinh THPT"),
            role: isTeacher ? "teacher" : "student",
            className: isTeacher ? "Giáo viên Quản trị" : "Khối 10",
            email: user.email || (isTeacher ? "vothithuyhao88@gmail.com" : ""),
            uid: user.uid,
            teacherCode: isTeacher ? "Thuyhao88@" : undefined
          };
          setCurrentUser(fallbackProfile);
          localStorage.setItem("app_user_profile", JSON.stringify(fallbackProfile));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    const saved = localStorage.getItem("co_thuy_hao_avatar_url");
    if (!saved || saved.includes("co_thuy_hao_avatar_red_") || saved.includes("gZCxGY4L")) {
      return TEACHER_AVATAR_DEFAULT;
    }
    return formatAvatarUrl(saved);
  });

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem("app_user_profile", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("app_user_profile");
  };
  const [initialChatMessage, setInitialChatMessage] = useState<string>("");
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * LIFE_QUOTES.length);
    return LIFE_QUOTES[randomIndex];
  });

  const handleUpdateAvatar = (newUrl: string) => {
    setAvatarUrl(newUrl);
    localStorage.setItem("co_thuy_hao_avatar_url", newUrl);
  };

  // Seamless helper to ask Cô Thuý Hào from any external tab
  const handleAskTeacher = (question: string) => {
    setInitialChatMessage(question);
    setActiveTab("chat");
  };

  const handleClearInitialMessage = () => {
    setInitialChatMessage("");
  };

  const handleNavigateFromIntro = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900" id="app-root">
      {/* Top Navigation Bar with premium dark gradient from Slate to deep Emerald */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-b border-emerald-800/40 shadow-md" id="app-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Brand Logo with modern rounded-xl and rotate interaction */}
            <button 
              onClick={() => setActiveTab("intro")}
              className="flex items-center gap-3 cursor-pointer text-left group select-none"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <span className="block font-black text-white text-xs sm:text-sm md:text-base leading-none tracking-tight group-hover:text-emerald-300 transition-colors uppercase">
                  Học Tin Cùng Cô Hào
                </span>
                <span className="block text-[9px] text-emerald-400 font-extrabold tracking-wider uppercase mt-1">
                  Chạm AI • Bật Tư Duy
                </span>
              </div>
            </button>

            {/* Premium segmented control layout for desktop navigation against dark background */}
            <nav className="hidden md:flex items-center bg-white/5 p-1 rounded-2xl border border-white/10 gap-0.5" id="desktop-nav-links">
              {[
                { id: "intro", label: "Trang chủ", icon: Home },
                { id: "chat", label: "Hỏi Cô", icon: MessageSquare },
                { id: "study", label: "Góc Ôn Tập", icon: BookOpen },
                { id: "playground", label: "Sân Chơi Code", icon: Code },
                { id: "quiz", label: "Trắc Nghiệm", icon: Trophy },
                { id: "excel", label: "Kỹ Năng Số", icon: Cpu }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-250 cursor-pointer select-none relative ${
                      isActive 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm font-black" 
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                    id={`nav-item-${item.id}`}
                  >
                    <Icon size={14} className={isActive ? "scale-110 text-white" : "opacity-80"} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Textbook reference, AI Settings & User Login button */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsAISettingsOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 shadow-3xs hover:scale-102 transition-all cursor-pointer select-none"
                id="open-ai-settings-btn"
                title="Cấu hình API Key & Mô hình Gemini AI"
              >
                <Cpu size={13} className="text-amber-400" />
                <span>⚙️ Cấu hình AI</span>
              </button>

              <button 
                onClick={() => setIsMaterialsOpen(true)}
                className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 shadow-3xs hover:scale-102 transition-all cursor-pointer select-none"
              >
                📚 Tài liệu học tập
              </button>

              {currentUser ? (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-3xs hover:scale-102 transition-all cursor-pointer select-none"
                  id="user-profile-badge-btn"
                >
                  <span className="text-emerald-400">{currentUser.role === "teacher" ? "👩‍🏫" : "👨‍🎓"}</span>
                  <span className="truncate max-w-[120px] sm:max-w-[180px]">{currentUser.fullName}</span>
                  {currentUser.className && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md font-extrabold hidden sm:inline">
                      {currentUser.className}
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-sm hover:scale-102 transition-all cursor-pointer select-none"
                  id="open-login-btn"
                >
                  <User size={14} className="text-slate-950 font-bold" />
                  <span>Đăng Nhập</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6" id="app-workspace">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeTab === "intro" && (
              <TeacherIntro 
                onNavigate={handleNavigateFromIntro} 
                avatarUrl={avatarUrl}
                onUpdateAvatar={handleUpdateAvatar}
                currentUser={currentUser}
              />
            )}
            
            {activeTab === "chat" && (
              <ChatBox 
                initialMessage={initialChatMessage} 
                onClearInitialMessage={handleClearInitialMessage} 
                avatarUrl={avatarUrl}
                onUpdateAvatar={handleUpdateAvatar}
                currentUser={currentUser}
                onOpenAISettings={() => setIsAISettingsOpen(true)}
              />
            )}

            {activeTab === "study" && (
              <StudyHub 
                onAskTeacher={handleAskTeacher} 
                currentUser={currentUser} 
                onOpenAISettings={() => setIsAISettingsOpen(true)}
              />
            )}

            {activeTab === "playground" && (
              <CodePlayground onAskTeacher={handleAskTeacher} />
            )}

            {activeTab === "quiz" && (
              <QuizPortal currentUser={currentUser} />
            )}

            {activeTab === "excel" && (
              <ExcelGuide onAskTeacher={handleAskTeacher} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Sticky Mobile Navigation Bar with premium dark gradient matching the header and footer */}
      <div className="md:hidden sticky bottom-0 z-40 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-t border-emerald-800/40 shadow-lg flex justify-around py-2.5 px-2" id="mobile-nav-bar">
        {[
          { id: "intro", label: "Home", icon: Home },
          { id: "chat", label: "Hỏi Cô", icon: MessageSquare },
          { id: "study", label: "Ôn Tập", icon: BookOpen },
          { id: "playground", label: "Code", icon: Code },
          { id: "quiz", label: "Đề Thi", icon: Trophy },
          { id: "excel", label: "Kỹ Năng Số", icon: Cpu }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all duration-250 cursor-pointer ${
                isActive ? "text-emerald-400 scale-105 font-extrabold" : "text-slate-400 hover:text-slate-200"
              }`}
              id={`mobile-nav-item-${item.id}`}
            >
              <Icon size={18} className={isActive ? "text-emerald-400 filter drop-shadow-xs" : "text-slate-400"} />
              <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Premium, High-Contrast & Streamlined Compact Footer */}
      <footer className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-t border-emerald-800/40 py-3 text-slate-100" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main layout flex */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Column: Brand Logo, Title & Life Quote */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center text-slate-950 shadow-md shadow-emerald-400/10 flex-shrink-0">
                <GraduationCap size={20} className="font-bold text-slate-950" />
              </div>
              <div className="text-left">
                <span className="block font-black text-white text-sm md:text-base tracking-tight leading-none uppercase">Học Tin Cùng Cô Hào</span>
                <span className="block text-[10px] text-emerald-400 font-extrabold tracking-wide uppercase mt-1">Chạm AI • Bật Tư Duy</span>
                
                {/* Compact calligraphy Life Quote under title block - 1 very small line */}
                <div className="mt-1 animate-fadeIn max-w-xs sm:max-w-md md:max-w-lg">
                  <p className="font-calligraphy text-[11px] md:text-[13px] text-teal-300 font-bold tracking-wide leading-tight truncate" title={quote}>
                    "{quote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Compact Horizontal Contact Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                <Phone size={11} className="text-emerald-400" />
                <span><span className="opacity-60 text-[10px]">Zalo:</span> <span className="font-bold text-white">093 2556 039</span></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                <Mail size={11} className="text-teal-400" />
                <span><span className="opacity-60 text-[10px]">Email:</span> <span className="font-bold text-white">trungtamannhon@gmail.com</span></span>
              </div>
              <a 
                href="https://www.youtube.com/@thuyhao1988" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-semibold text-red-200 transition-colors"
              >
                <Youtube size={11} className="text-red-400" />
                <span><span className="opacity-60 text-[10px]">YouTube:</span> <span className="font-bold text-white hover:underline">@thuyhao1988</span></span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Materials Modal for teachers and students */}
      <MaterialsModal isOpen={isMaterialsOpen} onClose={() => setIsMaterialsOpen(false)} currentUser={currentUser} />

      {/* AI Settings Modal */}
      <AISettingsModal isOpen={isAISettingsOpen} onClose={() => setIsAISettingsOpen(false)} currentUser={currentUser} />

      {/* Auth Modal for students and teachers */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}
