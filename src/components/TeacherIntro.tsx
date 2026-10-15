import { motion } from "motion/react";
import { BookOpen, Code, Brain, Trophy, MessageSquareHeart, Youtube, Camera, Upload, Sparkles } from "lucide-react";
import { UserProfile } from "../types";
const defaultAvatarImg = "https://i.ibb.co/PZxSPmrG/image.jpg";

interface TeacherIntroProps {
  onNavigate: (tab: "chat" | "study" | "playground" | "quiz" | "excel") => void;
  avatarUrl?: string;
  onUpdateAvatar?: (url: string) => void;
  currentUser?: UserProfile | null;
}

export default function TeacherIntro({ onNavigate, avatarUrl = defaultAvatarImg, onUpdateAvatar, currentUser }: TeacherIntroProps) {
  const isTeacher = currentUser?.role === "teacher";
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateAvatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdateAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 md:p-8 max-w-4xl mx-auto my-6" id="teacher-intro-card">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-emerald-400 shadow-lg flex-shrink-0 bg-slate-50 group"
          >
            <img
              src={avatarUrl}
              alt="Cô Thuý Hào"
              className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Elegant hover overlay for Teacher */}
            {isTeacher && (
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col items-center justify-center cursor-pointer text-white text-xs font-bold gap-1.5 select-none">
                <Camera size={24} className="text-emerald-400 drop-shadow-sm" />
                <span>Thay ảnh đại diện</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </motion.div>

          {/* Quick upload button for Teacher if logged in */}
          {isTeacher && (
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95 text-xs font-bold transition-all duration-200 cursor-pointer border border-emerald-200/50 shadow-3xs select-none">
              <Upload size={13} className="text-emerald-600" />
              <span>Cập nhật ảnh đại diện</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Message and Intro */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-black tracking-wide uppercase mb-2">
              <Sparkles size={13} className="text-emerald-600 animate-pulse" />
              <span>Chạm AI • Bật Tư Duy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight font-sans uppercase">
              Học Tin Cùng <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 font-black">Cô Hào</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 justify-center md:justify-start">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] px-3 py-1 rounded-full font-extrabold tracking-wide uppercase shadow-xs">
                Chạm AI — Bật Tư Duy
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-semibold text-xs sm:text-sm">
                Tin học THPT 10, 11, 12 • Trung tâm An Nhơn
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-gray-600 leading-relaxed italic bg-emerald-50/50 p-4 rounded-xl border-l-4 border-emerald-500 text-left text-sm"
          >
            "Chào các em thân yêu! Cô là Thuý Hào, người đồng hành cùng các em trong môn Tin học Trung học Phổ thông. Dù là lập trình Python, truy vấn SQL, thiết kế HTML/CSS hay tính toán Excel phức tạp, các em đừng lo lắng nhé! Cô sẽ giải thích từng bước thật chi tiết để các em tự tin làm chủ kiến thức. Hãy chọn một phần học tập bên dưới và khám phá ngay nhé!"
          </motion.div>
        </div>
      </div>

      {/* Feature Navigation Cards (Styled perfectly with the premium glowing gradients and layouts from mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8" id="intro-navigation-grid">
        {/* Card 1: Hỏi cô Thuý Hào (Teal/Cyan system) */}
        <motion.button
          whileHover={{ y: -6, scale: 1.03 }}
          onClick={() => onNavigate("chat")}
          className="p-5 flex items-center gap-4 text-left bg-gradient-to-r from-[#00b4d8] to-[#0077b6] rounded-2xl border-2 border-white/40 shadow-[0_8px_20px_-4px_rgba(0,180,216,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_30px_0px_rgba(0,180,216,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
          id="nav-btn-chat"
        >
          {/* Decorative subtle ambient light inside card */}
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>
          
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
            <MessageSquareHeart size={22} className="text-[#0077b6] font-bold" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-white text-xs md:text-sm tracking-wide uppercase leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Hỏi cô Thuý Hào</h3>
            <p className="text-[10.5px] text-white mt-1 leading-snug font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Hỏi đáp thông minh, trò chuyện cùng Cô tức thì.
            </p>
          </div>
        </motion.button>

        {/* Card 2: Góc Ôn Tập (Purple/Magenta system) */}
        <motion.button
          whileHover={{ y: -6, scale: 1.03 }}
          onClick={() => onNavigate("study")}
          className="p-5 flex items-center gap-4 text-left bg-gradient-to-r from-[#c084fc] to-[#db2777] rounded-2xl border-2 border-white/40 shadow-[0_8px_20px_-4px_rgba(192,132,252,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_30px_0px_rgba(219,39,119,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
          id="nav-btn-study"
        >
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>

          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
            <BookOpen size={22} className="text-[#db2777]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-white text-xs md:text-sm tracking-wide uppercase leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Góc Ôn Tập</h3>
            <p className="text-[10.5px] text-white mt-1 leading-snug font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Tóm tắt lý thuyết bám sát SGK lớp 10, 11, 12.
            </p>
          </div>
        </motion.button>

        {/* Card 3: Sân Chơi Lập Trình (Yellow tech system) */}
        <motion.button
          whileHover={{ y: -6, scale: 1.03 }}
          onClick={() => onNavigate("playground")}
          className="p-5 flex items-center gap-4 text-left bg-gradient-to-r from-[#fbbf24] to-[#d97706] rounded-2xl border-2 border-white/40 shadow-[0_8px_20px_-4px_rgba(251,191,36,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_30px_0px_rgba(217,119,6,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
          id="nav-btn-playground"
        >
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>

          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
            <Code size={22} className="text-[#d97706]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-white text-xs md:text-sm tracking-wide uppercase leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Sân Chơi Code</h3>
            <p className="text-[10.5px] text-white mt-1 leading-snug font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Thực hành viết Python & HTML trực quan dễ hiểu.
            </p>
          </div>
        </motion.button>

        {/* Card 4: Đấu Trường Quiz (Orange/Red system) */}
        <motion.button
          whileHover={{ y: -6, scale: 1.03 }}
          onClick={() => onNavigate("quiz")}
          className="p-5 flex items-center gap-4 text-left bg-gradient-to-r from-[#ff8a65] to-[#f43f5e] rounded-2xl border-2 border-white/40 shadow-[0_8px_20px_-4px_rgba(255,138,101,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_30px_0px_rgba(244,63,94,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
          id="nav-btn-quiz"
        >
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>

          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
            <Trophy size={22} className="text-[#f43f5e]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-white text-xs md:text-sm tracking-wide uppercase leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Đấu Trường Quiz</h3>
            <p className="text-[10.5px] text-white mt-1 leading-snug font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Trắc nghiệm thông minh, có bảng điểm, đáp án chi tiết.
            </p>
          </div>
        </motion.button>
      </div>

      {/* Interactive, colorful premium Excel/Brain Banner below the grid */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("excel")}
          className="w-full max-w-lg p-4 flex items-center justify-between bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] rounded-2xl border-2 border-white/40 shadow-[0_8px_20px_-4px_rgba(59,130,246,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_30px_0px_rgba(29,78,216,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer group relative overflow-hidden text-left"
          id="quick-excel-btn"
        >
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>
          
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Brain size={20} className="text-[#1d4ed8] font-bold" />
            </div>
            <div>
              <span className="block text-[9px] text-blue-100 font-extrabold tracking-widest uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">KHÔNG GIAN SÁNG TẠO SỐ</span>
              <span className="block font-black text-white text-sm md:text-base leading-tight mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Kỹ Năng Số Hub: STEM, AI, Excel, Powerpoint</span>
            </div>
          </div>
          
          <div className="mr-2 text-white bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
