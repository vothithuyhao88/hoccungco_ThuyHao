import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  User, 
  GraduationCap, 
  School, 
  Lock, 
  CheckCircle, 
  Sparkles, 
  LogOut, 
  ShieldCheck,
  Mail,
  LogIn,
  Eye,
  EyeOff,
  Compass,
  ArrowRight,
  UserCheck
} from "lucide-react";
import { UserProfile } from "../types";
import { 
  auth, 
  googleProvider, 
  saveUserProfileToFirestore,
  loginWithEmailAndPassword,
  checkIsAdminCredentials,
  ADMIN_DEFAULT_PROFILE
} from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const teacherAvatarImg = "https://i.ibb.co/PZxSPmrG/image.jpg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

const COMMON_CLASSES = ["10A1", "10A2", "10A3", "11A1", "11A2", "11A3", "12A1", "12A2", "12A3"];

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}: AuthModalProps) {
  // Main Tab: "user" (Học sinh / Người dùng) vs "admin" (Quản trị Cô Thuý Hào)
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");

  // User / Student Fast Entry state (Name + Class)
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("11A1");
  const [loadingStudent, setLoadingStudent] = useState(false);

  // Admin Login state (Pre-filled with Thuyhao & Thuyhsoa88@)
  const [adminUsername, setAdminUsername] = useState("Thuyhao");
  const [adminPassword, setAdminPassword] = useState("Thuyhsoa88@");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  // Google sign in loading state
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // 1. Handle Student Quick Login (Tên + Lớp không cần mật khẩu)
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const name = studentName.trim();
    if (!name) {
      setErrorMessage("Vui lòng nhập Họ và tên để lưu kết quả học tập!");
      return;
    }
    const cls = studentClass.trim() || "Khối Tin THPT";

    setLoadingStudent(true);
    try {
      // Check if user accidentally entered admin name here
      if (checkIsAdminCredentials(name, "")) {
        setActiveTab("admin");
        setErrorMessage("Phát hiện tài khoản Quản trị, vui lòng nhập mật khẩu bên tab Quản trị!");
        setLoadingStudent(false);
        return;
      }

      const uid = auth.currentUser?.uid || `hs_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const profile: UserProfile = {
        uid,
        role: "student",
        fullName: name,
        className: cls,
        email: `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@hocsinh.edu.vn`
      };

      // Save to localStorage immediately
      localStorage.setItem("app_user_profile", JSON.stringify(profile));

      // Save to Firestore asynchronously
      saveUserProfileToFirestore(uid, profile).catch((err) => {
        console.warn("Save student profile note:", err);
      });

      setSuccessMessage(`🎉 Chào mừng em ${name} (${cls}) vào học cùng Cô Thuý Hào!`);
      onLogin(profile);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err: any) {
      setErrorMessage("Không thể vào học: " + (err.message || String(err)));
    } finally {
      setLoadingStudent(false);
    }
  };

  // 2. Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const isTeacher = 
        user.email === "vothithuyhao88@gmail.com" || 
        user.email === "clbanhsao1@gmail.com";

      const profile: UserProfile = {
        uid: user.uid,
        role: isTeacher ? "teacher" : "student",
        fullName: user.displayName || (isTeacher ? "Cô Thuý Hào" : "Học sinh Google"),
        className: isTeacher ? "Giáo viên Quản trị" : "Lớp Google",
        email: user.email || ""
      };

      localStorage.setItem("app_user_profile", JSON.stringify(profile));
      saveUserProfileToFirestore(user.uid, profile, user.email || "").catch(() => {});
      
      setSuccessMessage(`🎉 Đăng nhập thành công với tài khoản Google!`);
      onLogin(profile);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setErrorMessage("Đăng nhập bằng Google không thành công. Hãy thử nhập Tên + Lớp bên dưới!");
    } finally {
      setLoadingGoogle(false);
    }
  };

  // 3. Handle Admin Login (Thuyhao / Thuyhsoa88@)
  const handleAdminLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const userTrim = adminUsername.trim();
    const passTrim = adminPassword.trim();

    if (!userTrim) {
      setErrorMessage("Vui lòng nhập Tên đăng nhập Quản trị!");
      return;
    }
    if (!passTrim) {
      setErrorMessage("Vui lòng nhập Mật khẩu Quản trị!");
      return;
    }

    setLoadingAdmin(true);
    try {
      if (checkIsAdminCredentials(userTrim, passTrim)) {
        const profile: UserProfile = { ...ADMIN_DEFAULT_PROFILE };
        localStorage.setItem("app_user_profile", JSON.stringify(profile));
        setSuccessMessage("🎉 Đăng nhập Quản trị viên thành công! Xin chào Cô Thuý Hào.");
        onLogin(profile);
        
        // Trigger background Firebase sync
        loginWithEmailAndPassword(userTrim, passTrim).catch(() => {});
        
        setTimeout(() => {
          onClose();
        }, 400);
        return;
      }

      // If invalid admin credentials
      setErrorMessage("Tên đăng nhập hoặc mật khẩu Quản trị không chính xác! (Gợi ý: Thuyhao / Thuyhsoa88@)");
    } catch (err: any) {
      setErrorMessage("Đăng nhập thất bại: " + (err.message || String(err)));
    } finally {
      setLoadingAdmin(false);
    }
  };

  // 4. Handle Logout
  const handleLogoutAction = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    onLogout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="auth-modal-backdrop">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

      {/* Modal Dialog Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-emerald-100/80 my-auto flex flex-col max-h-[92vh]"
        id="auth-modal-box"
      >
        {/* Top Header Hero with Cô Thuý Hào's Badge */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 px-6 py-5 text-white relative overflow-hidden shrink-0">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-teal-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <img 
                  src={teacherAvatarImg} 
                  alt="Cô Thuý Hào" 
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-emerald-400/80 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-slate-950 text-[10px]">
                  ✨
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Trợ Lý Tin Học THPT
                  </span>
                </div>
                <h3 className="font-black text-white text-base sm:text-lg tracking-tight leading-snug">
                  {currentUser ? "Cài Đặt Tài Khoản" : "Chào Mừng Đến Với Lớp Học Cô Thuý Hào!"}
                </h3>
                <p className="text-emerald-200/70 text-[11px] font-medium leading-tight mt-0.5">
                  Đăng nhập nhanh tiện lợi cho Học sinh & Quản trị viên
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl transition-all cursor-pointer shrink-0"
              id="close-auth-modal-btn"
              title="Đóng cửa sổ"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {currentUser ? (
            /* Logged-In User Profile Card */
            <div className="space-y-4 text-center" id="logged-in-profile">
              <div className="relative inline-block">
                <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-2xl border-2 border-emerald-500/80 flex items-center justify-center text-emerald-700 shadow-md">
                  {currentUser.role === "teacher" ? <ShieldCheck size={40} /> : <GraduationCap size={40} />}
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-sm">
                  <CheckCircle size={14} />
                </span>
              </div>

              <div>
                <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 mb-1.5 shadow-2xs">
                  {currentUser.role === "teacher" ? "Quản trị / Giáo viên" : "Học sinh Tin học THPT"}
                </span>
                <h4 className="text-xl font-black text-slate-800 tracking-tight">{currentUser.fullName}</h4>
                {currentUser.className && (
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Lớp: {currentUser.className}</p>
                )}
                {currentUser.email && (
                  <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center justify-center gap-1">
                    <Mail size={13} /> {currentUser.email}
                  </p>
                )}
              </div>

              {/* Notice for Admin / Teacher or Fast Switch */}
              {currentUser.role === "teacher" ? (
                <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl text-xs text-emerald-900 font-bold flex items-center justify-between shadow-3xs">
                  <div className="flex items-center gap-2 text-left">
                    <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-extrabold text-emerald-950">Quyền Quản Trị Viên (Thuyhao)</p>
                      <p className="text-[11px] text-emerald-700 font-medium">Toàn quyền cấu hình Gemini API Key & quản lý bài giảng</p>
                    </div>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                    Đang hoạt động
                  </span>
                </div>
              ) : (
                /* Switch to Admin Quick Button if user is currently student */
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 p-4 rounded-2xl border border-emerald-500/40 text-white text-left space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                      <ShieldCheck size={13} /> Chuyển Sang Quyền Quản Trị
                    </span>
                    <span className="text-[10px] font-mono text-emerald-200">Thuyhao</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Cô Thuý Hào muốn đăng nhập tài khoản quản trị? Nhấn vào đây để chuyển ngay:
                  </p>
                  <button
                    type="button"
                    onClick={() => handleAdminLoginSubmit()}
                    disabled={loadingAdmin}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    id="switch-to-admin-btn"
                  >
                    <ShieldCheck size={16} />
                    <span>{loadingAdmin ? "Đang chuyển..." : "Đăng Nhập Quản Trị (Thuyhao / Thuyhsoa88@)"}</span>
                  </button>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleLogoutAction}
                  className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-red-200/80 shadow-2xs active:scale-98"
                  id="logout-btn"
                >
                  <LogOut size={16} />
                  <span>Đăng xuất tài khoản</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged-Out Main View */
            <div className="space-y-4">
              {/* Top Segmented Controls: Học Sinh / Người Dùng vs Quản Trị Viên */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70 shadow-3xs">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("user");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-102"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  id="auth-tab-user"
                >
                  <GraduationCap size={16} />
                  <span>Học Sinh / Người Dùng</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("admin");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === "admin"
                      ? "bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-emerald-300 shadow-md border border-emerald-500/40 scale-102"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  id="auth-tab-admin"
                >
                  <ShieldCheck size={16} className={activeTab === "admin" ? "text-emerald-400" : ""} />
                  <span>Quản Trị Viên</span>
                </button>
              </div>

              {/* Status Banner Messages */}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl text-center shadow-3xs"
                >
                  ⚠️ {errorMessage}
                </motion.div>
              )}
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-2xl text-center flex items-center justify-center gap-1.5 shadow-3xs"
                >
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>{successMessage}</span>
                </motion.div>
              )}

              {/* ================= TAB 1: HỌC SINH / NGƯỜI DÙNG ================= */}
              {activeTab === "user" && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Option 1: Fast Google Login */}
                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loadingGoogle}
                      className="w-full py-3 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-emerald-400 text-slate-800 rounded-2xl text-xs font-extrabold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-3 group active:scale-98"
                      id="google-signin-btn"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>{loadingGoogle ? "Đang kết nối tài khoản Google..." : "Đăng Nhập Bằng Tài Khoản Google (1 Chạm)"}</span>
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-1">
                      * Tự động lưu tiến độ, đồng bộ tên & hình ảnh từ tài khoản Google.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-slate-200 w-full"></div>
                    <span className="bg-white px-3 text-[10px] uppercase font-black tracking-wider text-slate-400 shrink-0">
                      hoặc nhập Tên + Lớp vào học ngay
                    </span>
                  </div>

                  {/* Option 2: Enter Name + Class form */}
                  <form onSubmit={handleStudentLogin} className="space-y-3.5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 shadow-3xs" id="student-entry-form">
                    <div className="flex items-center gap-2 pb-1 text-emerald-900 font-extrabold text-xs">
                      <Compass size={16} className="text-emerald-600" />
                      <span>Vào học trực tiếp không cần mật khẩu:</span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                        <User size={13} className="text-emerald-600" />
                        Họ và Tên học sinh <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn An, Lê Thị Hà..."
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                        id="student-name-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                        <School size={13} className="text-emerald-600" />
                        Lớp học <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: 10A1, 11A2, 12A3..."
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs mb-2"
                        id="student-class-input"
                      />

                      {/* Quick Class Selection Chips */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-bold mr-1">Chọn nhanh:</span>
                        {COMMON_CLASSES.map((cls) => (
                          <button
                            type="button"
                            key={cls}
                            onClick={() => setStudentClass(cls)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              studentClass === cls
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-400"
                            }`}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loadingStudent}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                      id="submit-student-login-btn"
                    >
                      <ArrowRight size={16} />
                      <span>{loadingStudent ? "Đang lưu thông tin..." : "🚀 Vào Học Ngay (Lưu Bảng Điểm & Ôn Tập)"}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* ================= TAB 2: QUẢN TRỊ VIÊN ================= */}
              {activeTab === "admin" && (
                <div className="space-y-4 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 p-5 rounded-2xl border border-emerald-500/40 text-white shadow-xl animate-fadeIn">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30 shadow-inner">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-wider">Khu Vực Quản Trị Viên</h4>
                      <p className="text-[11px] text-emerald-200/70 font-medium">Cô Thuý Hào • Toàn quyền quản trị hệ thống</p>
                    </div>
                  </div>

                  {/* Pre-filled Account Callout */}
                  <div className="bg-emerald-950/70 border border-emerald-500/30 p-3 rounded-xl text-[11px] text-emerald-300 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Tên đăng nhập: <strong className="text-white font-mono font-bold">Thuyhao</strong></span>
                      <span>Mật khẩu: <strong className="text-white font-mono font-bold">Thuyhsoa88@</strong></span>
                    </div>
                    <p className="text-[10px] text-emerald-400/80 font-normal">
                      * Chấp nhận cả <code>Thuyhsoa88@</code> và <code>Thuyhao88@</code>.
                    </p>
                  </div>

                  {/* Direct 1-Click Login Button for Admin */}
                  <button
                    type="button"
                    onClick={() => handleAdminLoginSubmit()}
                    disabled={loadingAdmin}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    id="quick-one-click-admin-btn"
                  >
                    <Sparkles size={15} />
                    <span>{loadingAdmin ? "Đang xác thực..." : "⚡ Đăng Nhập 1-Chạm Ngay (Thuyhao)"}</span>
                  </button>

                  <div className="relative flex items-center justify-center my-1">
                    <div className="border-t border-white/10 w-full"></div>
                    <span className="bg-slate-900 px-2 text-[9px] uppercase font-bold text-slate-400 shrink-0">
                      hoặc nhập thủ công
                    </span>
                  </div>

                  <form onSubmit={handleAdminLoginSubmit} className="space-y-3" id="admin-login-form">
                    <div>
                      <label className="block text-[11px] font-extrabold text-emerald-200 mb-1">
                        Tên Đăng Nhập Quản Trị
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Thuyhao"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 text-xs text-white font-semibold focus:outline-none placeholder:text-slate-500"
                        id="admin-username-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-emerald-200 mb-1">
                        Mật Khẩu Quản Trị
                      </label>
                      <div className="relative">
                        <input
                          type={showAdminPassword ? "text" : "password"}
                          required
                          placeholder="Thuyhsoa88@"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white font-semibold focus:outline-none placeholder:text-slate-500"
                          id="admin-password-input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowAdminPassword(!showAdminPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                          title={showAdminPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        >
                          {showAdminPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loadingAdmin}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 active:scale-98"
                      id="submit-admin-login-btn"
                    >
                      <LogIn size={16} />
                      <span>{loadingAdmin ? "Đang xác thực..." : "Đăng Nhập Quyền Quản Trị"}</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
