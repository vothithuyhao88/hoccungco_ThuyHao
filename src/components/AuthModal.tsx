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
  UserCheck,
  Mail,
  UserPlus,
  LogIn,
  KeyRound,
  Eye,
  EyeOff,
  Compass
} from "lucide-react";
import { UserProfile } from "../types";
import { 
  auth, 
  googleProvider, 
  saveUserProfileToFirestore,
  registerWithEmailAndPassword,
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

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}: AuthModalProps) {
  // Main Tab: "login" vs "register"
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  // Login Sub-Type: "cloud" (Email & Google Cloud) vs "admin" (Quản trị Giáo viên)
  const [loginType, setLoginType] = useState<"cloud" | "admin">("cloud");

  // Registration state
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState<"student" | "teacher">("student");
  const [regClass, setRegClass] = useState("11A1");
  const [regTeacherCode, setRegTeacherCode] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);

  // Email / Admin Login state (Default prefilled with requested admin account)
  const [loginEmail, setLoginEmail] = useState("Thuyhao");
  const [loginPassword, setLoginPassword] = useState("Thuyhao88@");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Quick Guest Login state
  const [guestName, setGuestName] = useState("");
  const [guestClass, setGuestClass] = useState("11A1");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // Direct 1-Click Admin Login
  const handleQuickAdminLogin = async () => {
    setLoadingLogin(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const profile: UserProfile = { ...ADMIN_DEFAULT_PROFILE };
      localStorage.setItem("app_user_profile", JSON.stringify(profile));
      setSuccessMessage("🎉 Đăng nhập quyền Quản trị thành công! Xin chào Cô Thuý Hào.");
      onLogin(profile);
      // Asynchronously trigger Firebase background sync
      loginWithEmailAndPassword("Thuyhao", "Thuyhao88@").catch(() => {});
      setTimeout(() => {
        onClose();
      }, 400);
    } catch (err: any) {
      setErrorMessage("Không thể đăng nhập quản trị: " + (err.message || String(err)));
    } finally {
      setLoadingLogin(false);
    }
  };

  if (!isOpen) return null;

  // Handle Register Form Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!regFullName.trim()) {
      setErrorMessage("Vui lòng nhập Họ và tên!");
      return;
    }
    if (!regEmail.trim()) {
      setErrorMessage("Vui lòng nhập email hợp lệ!");
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMessage("Mật khẩu phải chứa ít nhất 6 ký tự!");
      return;
    }

    if (regRole === "teacher") {
      if (regTeacherCode !== "Thuyhao88@") {
        setErrorMessage("Mã xác thực giáo viên không chính xác! Vui lòng kiểm tra lại với Cô Thuý Hào.");
        return;
      }
    }

    setLoadingRegister(true);
    try {
      const profile = await registerWithEmailAndPassword(
        regFullName.trim(),
        regEmail.trim(),
        regPassword,
        regRole,
        regClass.trim(),
        regTeacherCode.trim()
      );
      setSuccessMessage("Đăng ký tài khoản thành công! Đã kết nối dữ liệu đám mây.");
      onLogin(profile);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      console.error("Register Error:", err);
      if (err.code === "auth/email-already-in-use" || err.message?.includes("email-already-in-use")) {
        setErrorMessage("Email này đã được đăng ký tài khoản! Vui lòng chuyển sang Đăng nhập.");
      } else if (err.code === "auth/invalid-email" || err.message?.includes("invalid-email")) {
        setErrorMessage("Địa chỉ email không đúng định dạng!");
      } else if (err.code === "auth/weak-password" || err.message?.includes("weak-password")) {
        setErrorMessage("Mật khẩu quá yếu, cần ít nhất 6 ký tự!");
      } else {
        setErrorMessage(err.message || "Đăng ký không thành công, vui lòng thử lại!");
      }
    } finally {
      setLoadingRegister(false);
    }
  };

  // Handle Login with Email Form Submit
  const handleEmailLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const emailTrim = loginEmail.trim();
    const passTrim = loginPassword.trim();

    if (!emailTrim) {
      setErrorMessage("Vui lòng nhập Tên đăng nhập hoặc Email!");
      return;
    }
    if (!passTrim) {
      setErrorMessage("Vui lòng nhập mật khẩu!");
      return;
    }

    setLoadingLogin(true);
    try {
      // Check Admin Credentials: Thuyhao / Thuyhao88@
      if (checkIsAdminCredentials(emailTrim, passTrim)) {
        const profile: UserProfile = { ...ADMIN_DEFAULT_PROFILE };
        localStorage.setItem("app_user_profile", JSON.stringify(profile));
        setSuccessMessage("🎉 Đăng nhập quyền Quản trị thành công! Xin chào Cô Thuý Hào.");
        onLogin(profile);
        // Background sync with Firebase
        loginWithEmailAndPassword(emailTrim, passTrim).catch(() => {});
        setTimeout(() => {
          onClose();
        }, 400);
        return;
      }

      const profile = await loginWithEmailAndPassword(emailTrim, passTrim);
      setSuccessMessage("Đăng nhập thành công! Đã đồng bộ thông tin.");
      onLogin(profile);
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      console.error("Login Error:", err);
      if (
        err.code === "auth/user-not-found" || 
        err.code === "auth/wrong-password" || 
        err.code === "auth/invalid-credential" ||
        err.message?.includes("invalid-credential")
      ) {
        setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
      } else {
        setErrorMessage(err.message || "Đăng nhập không thành công!");
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const profile: UserProfile = {
        uid: user.uid,
        role: "student",
        fullName: user.displayName || "Học sinh Google",
        className: "Lớp Google",
        email: user.email || ""
      };
      await saveUserProfileToFirestore(user.uid, profile, user.email || "");
      onLogin(profile);
      onClose();
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setErrorMessage("Đăng nhập bằng Google không thành công. Hãy thử lại!");
    } finally {
      setLoadingGoogle(false);
    }
  };

  // Fast Guest Student Login
  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = guestName.trim() || "Học sinh Khách";
    setErrorMessage("");
    const uid = auth.currentUser?.uid || `guest_${Date.now()}`;
    const profile: UserProfile = {
      uid,
      role: "student",
      fullName: finalName,
      className: guestClass.trim() || "THPT"
    };
    await saveUserProfileToFirestore(uid, profile);
    onLogin(profile);
    onClose();
  };

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
        {/* Top Header Hero with Cô Thuý Hào's Badge & Youthful Aesthetics */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 px-6 py-5 text-white relative overflow-hidden shrink-0">
          {/* Decorative glowing background orbs */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-teal-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              {/* Teacher Avatar Ring */}
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
                  {currentUser ? "Cài Đặt Tài Khoản" : "Chào Mừng Em Đến Với Lớp Học Cô Thuý Hào!"}
                </h3>
                <p className="text-emerald-200/70 text-[11px] font-medium leading-tight mt-0.5">
                  Chatbox Hỏi Cô • Góc Ôn Tập • Dự Án STEM • Trắc Nghiệm THPT
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

          {/* Quick Subject Chips */}
          {!currentUser && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-white/10 text-[10px] font-bold text-emerald-200">
              <span className="bg-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1">💬 Chatbox Hỏi Cô</span>
              <span className="bg-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1">📚 Góc Ôn Tập</span>
              <span className="bg-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1">⚙️ Dự Án STEM</span>
              <span className="bg-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1">📝 Thi Trắc Nghiệm</span>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {currentUser ? (
            /* Logged-In User Profile Card */
            <div className="space-y-5 text-center" id="logged-in-profile">
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

              {/* Notice for Admin / Teacher */}
              {currentUser.role === "teacher" ? (
                <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-2xl text-xs text-emerald-900 font-bold flex items-center justify-between shadow-3xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                    <span>Tài khoản Quản trị: <strong className="font-mono text-emerald-950">Thuyhao</strong> (Cô Thuý Hào)</span>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-2xs">
                    Hoạt động
                  </span>
                </div>
              ) : (
                /* Switch to Admin Quick Button if user is currently student */
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 p-4 rounded-2xl border border-emerald-500/40 text-white text-left space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      Chuyển Đổi Quyền Hạn
                    </span>
                    <span className="text-[10px] text-slate-400">Giáo viên quản trị</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Bạn muốn đăng nhập vào quyền Quản trị viên của <strong>Cô Thuý Hào</strong>?
                  </p>
                  <button
                    type="button"
                    onClick={handleQuickAdminLogin}
                    disabled={loadingLogin}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    id="switch-to-admin-btn"
                  >
                    <ShieldCheck size={16} />
                    <span>{loadingLogin ? "Đang chuyển quyền..." : "Đăng Nhập Quản Trị Viên (Thuyhao)"}</span>
                  </button>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left space-y-2.5 text-xs text-slate-600 shadow-3xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-400">Trạng thái tài khoản:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Sparkles size={13} /> Đồng bộ Firebase Firestore
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-400">Quyền hạn hệ thống:</span>
                  <span className="font-bold text-slate-800">{currentUser.role === "teacher" ? "Toàn quyền quản lý bài giảng & dữ liệu" : "Học tập, giải bài tập & thi trắc nghiệm"}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="font-semibold text-slate-400">Ứng dụng:</span>
                  <span className="font-bold text-slate-800">Trợ lý Cô Thuý Hào THPT</span>
                </div>
              </div>

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
            <div>
              {/* Segmented Tab Switcher (Đăng Nhập vs Đăng Ký Mới) */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl mb-4 border border-slate-200/70 shadow-3xs">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    authMode === "login"
                      ? "bg-white text-emerald-900 shadow-sm border border-emerald-100/80 scale-102"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  id="auth-tab-login"
                >
                  <LogIn size={15} className={authMode === "login" ? "text-emerald-600" : ""} />
                  <span>Đăng Nhập</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("register");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    authMode === "register"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm scale-102"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  id="auth-tab-register"
                >
                  <UserPlus size={15} />
                  <span>Đăng Ký Mới</span>
                </button>
              </div>

              {/* Status Banner Messages */}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200/90 text-red-700 text-xs font-semibold rounded-2xl text-center shadow-3xs"
                >
                  ⚠️ {errorMessage}
                </motion.div>
              )}
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-2xl text-center flex items-center justify-center gap-1.5 shadow-3xs"
                >
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>{successMessage}</span>
                </motion.div>
              )}

              {/* ================= REGISTER MODE ================= */}
              {authMode === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5" id="register-account-form">
                  <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 text-[11px] text-emerald-900 font-semibold text-center leading-snug">
                    🌱 Tạo tài khoản mới kết nối đồng bộ dữ liệu với Firebase Authentication & Firestore.
                  </div>

                  {/* Role Selector Card Options */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5">
                      1. Chọn vai trò đăng ký <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setRegRole("student")}
                        className={`p-3 rounded-2xl border text-xs font-black flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          regRole === "student"
                            ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-400/30"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-200/60 flex items-center justify-center text-emerald-800">
                          <GraduationCap size={18} />
                        </div>
                        <span>Học Sinh THPT</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRegRole("teacher")}
                        className={`p-3 rounded-2xl border text-xs font-black flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          regRole === "teacher"
                            ? "border-emerald-800 bg-slate-950 text-emerald-300 shadow-sm ring-2 ring-emerald-500/30"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                          <ShieldCheck size={18} />
                        </div>
                        <span>Quản Trị / Giáo Viên</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Name Input */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                      <User size={13} className="text-emerald-600" />
                      Họ và Tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={regRole === "student" ? "Ví dụ: Nguyễn Văn An" : "Ví dụ: Cô Thuý Hào"}
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                      id="reg-fullname-input"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                      <Mail size={13} className="text-emerald-600" />
                      Địa chỉ Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hocsinh@gmail.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                      id="reg-email-input"
                    />
                  </div>

                  {/* Password Input with Visibility Toggle */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                      <Lock size={13} className="text-emerald-600" />
                      Mật Khẩu Mới <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showRegPassword ? "text" : "password"}
                        required
                        minLength={6}
                        placeholder="Tối thiểu 6 ký tự..."
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 pr-10 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                        id="reg-password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showRegPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Class Name (for student) */}
                  {regRole === "student" && (
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                        <School size={13} className="text-emerald-600" />
                        Lớp Học (Ví dụ: 10A1, 11A2, 12A3...)
                      </label>
                      <input
                        type="text"
                        placeholder="11A1"
                        value={regClass}
                        onChange={(e) => setRegClass(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                        id="reg-class-input"
                      />
                    </div>
                  )}

                  {/* Teacher Security Code (for teacher) */}
                  {regRole === "teacher" && (
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                        <KeyRound size={13} className="text-emerald-600" />
                        Mã Xác Thực Giáo Viên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Nhập mã xác thực của Cô Thuý Hào..."
                        value={regTeacherCode}
                        onChange={(e) => setRegTeacherCode(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                        id="reg-teachercode-input"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        🔒 Nhập mã bảo mật giáo viên do Cô Thuý Hào cung cấp.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loadingRegister}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-3"
                    id="submit-register-btn"
                  >
                    <UserPlus size={16} />
                    <span>{loadingRegister ? "Đang tạo tài khoản..." : "Tạo Tài Khoản Mới (Firestore Sync)"}</span>
                  </button>
                </form>
              )}

              {/* ================= LOGIN MODE ================= */}
              {authMode === "login" && (
                <div className="space-y-3.5">
                  {/* Quick Admin One-Click Login Callout */}
                  <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 p-3.5 rounded-2xl border border-emerald-500/40 text-white shadow-md flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded-md border border-emerald-500/40">
                            Quản Trị Viên
                          </span>
                          <span className="text-[10px] font-mono text-emerald-200">Thuyhao</span>
                        </div>
                        <p className="text-xs font-black text-white mt-0.5">Cô Thuý Hào</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleQuickAdminLogin}
                      disabled={loadingLogin}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1 shrink-0 disabled:opacity-50"
                      id="quick-admin-login-btn"
                    >
                      <LogIn size={13} />
                      <span>{loadingLogin ? "Đang vào..." : "Đăng Nhập"}</span>
                    </button>
                  </div>

                  {/* Login Sub-Type Selector: Email/Cloud vs Quản trị */}
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-3xs">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginType("cloud");
                        setErrorMessage("");
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        loginType === "cloud"
                          ? "bg-white text-emerald-900 shadow-sm border border-emerald-100/80"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                      id="login-subtab-cloud"
                    >
                      <Mail size={14} className={loginType === "cloud" ? "text-emerald-600" : ""} />
                      <span>Email / Cloud</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginType("admin");
                        setErrorMessage("");
                        setLoginEmail("Thuyhao");
                        setLoginPassword("Thuyhao88@");
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        loginType === "admin"
                          ? "bg-gradient-to-r from-slate-950 to-teal-950 text-emerald-300 shadow-sm border border-emerald-500/40"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                      id="login-subtab-admin"
                    >
                      <ShieldCheck size={14} className={loginType === "admin" ? "text-emerald-400" : ""} />
                      <span>Quản Trị</span>
                    </button>
                  </div>

                  {/* Sub-tab 1: EMAIL / CLOUD */}
                  {loginType === "cloud" && (
                    <div className="space-y-3.5">
                      {/* Google Sign In */}
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loadingGoogle}
                        className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-2xl text-xs font-extrabold transition-all shadow-2xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2.5 group"
                        id="google-signin-btn"
                      >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span>{loadingGoogle ? "Đang kết nối Google..." : "Đăng nhập bằng tài khoản Google Cloud"}</span>
                      </button>

                      <div className="relative flex items-center justify-center my-1.5">
                        <div className="border-t border-slate-200 w-full"></div>
                        <span className="bg-white px-2.5 text-[10px] uppercase font-black tracking-wider text-slate-400 shrink-0">
                          hoặc đăng nhập bằng Email / Tên Đăng Nhập
                        </span>
                      </div>

                      {/* Form Login with Email */}
                      <form onSubmit={handleEmailLoginSubmit} className="space-y-3" id="email-login-form">
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                            <Mail size={13} className="text-emerald-600" />
                            Email hoặc Tên Đăng Nhập
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nhập email hoặc tên tài khoản (ví dụ: Thuyhao)..."
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                            id="login-email-input"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                            <Lock size={13} className="text-emerald-600" />
                            Mật Khẩu
                          </label>
                          <div className="relative">
                            <input
                              type={showLoginPassword ? "text" : "password"}
                              required
                              placeholder="Nhập mật khẩu..."
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 pr-10 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-3xs"
                              id="login-password-input"
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {showLoginPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loadingLogin}
                          className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          id="submit-email-login-btn"
                        >
                          <LogIn size={16} />
                          <span>{loadingLogin ? "Đang xác thực..." : "Đăng Nhập Tài Khoản"}</span>
                        </button>
                      </form>

                      {/* Fast Guest Entry Toggle Option */}
                      <div className="pt-2.5 border-t border-slate-100 bg-slate-50/80 p-3 rounded-2xl border border-slate-200/80">
                        <p className="text-[11px] text-slate-600 font-extrabold mb-1.5 flex items-center gap-1">
                          <Compass size={14} className="text-emerald-600" />
                          <span>Trải nghiệm thử nhanh (Không cần tài khoản):</span>
                        </p>
                        <form onSubmit={handleGuestSubmit} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Nhập tên học sinh..."
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
                          />
                          <input
                            type="text"
                            placeholder="Lớp"
                            value={guestClass}
                            onChange={(e) => setGuestClass(e.target.value)}
                            className="w-16 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-800 shrink-0"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shrink-0 cursor-pointer shadow-2xs hover:shadow-sm transition-all"
                          >
                            Vào Học
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 2: QUẢN TRỊ */}
                  {loginType === "admin" && (
                    <div className="space-y-3.5 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 p-4 rounded-2xl border border-emerald-500/40 text-white shadow-xl">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30">
                          <ShieldCheck size={22} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">Khu Vực Quản Trị Giáo Viên</h4>
                          <p className="text-[10px] text-emerald-200/70 font-medium">Toàn quyền điều hành & quản lý dữ liệu môn học Cô Thuý Hào</p>
                        </div>
                      </div>

                      <div className="bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl text-[11px] text-emerald-300">
                        🔑 Tài khoản: <strong className="text-white font-mono">Thuyhao</strong> • Mật khẩu: <strong className="text-white font-mono">Thuyhao88@</strong>
                      </div>

                      <form onSubmit={handleEmailLoginSubmit} className="space-y-3" id="admin-login-form">
                        <div>
                          <label className="block text-[11px] font-extrabold text-emerald-200 mb-1">
                            Tên Đăng Nhập / Email Quản Trị
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nhập tên đăng nhập hoặc email..."
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 text-xs text-white font-semibold focus:outline-none placeholder:text-slate-500"
                            id="admin-email-input"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-extrabold text-emerald-200 mb-1">
                            Mật Khẩu Quản Trị
                          </label>
                          <div className="relative">
                            <input
                              type={showLoginPassword ? "text" : "password"}
                              required
                              placeholder="Nhập mật khẩu..."
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white font-semibold focus:outline-none placeholder:text-slate-500"
                              id="admin-password-input"
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                            >
                              {showLoginPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loadingLogin}
                          className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          id="submit-admin-login-btn"
                        >
                          <LogIn size={16} />
                          <span>{loadingLogin ? "Đang xác thực..." : "Đăng Nhập Quyền Quản Trị"}</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
