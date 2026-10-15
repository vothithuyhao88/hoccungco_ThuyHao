import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Key, 
  Sparkles, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Save, 
  Zap, 
  ExternalLink,
  Cpu,
  Info,
  Globe,
  User,
  ShieldCheck,
  Server
} from "lucide-react";
import { 
  getAIConfig, 
  saveAIConfig, 
  testAIConnection, 
  fetchAvailableModels, 
  AVAILABLE_GEMINI_MODELS, 
  AIConfig,
  fetchGlobalAIConfig,
  getCachedGlobalApiKey,
  setCachedGlobalApiKey
} from "../lib/aiConfig";
import { saveGlobalAIConfigToFirestore } from "../lib/firebase";
import { UserProfile } from "../types";

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated?: (config: AIConfig) => void;
  currentUser?: UserProfile | null;
}

export default function AISettingsModal({ isOpen, onClose, onConfigUpdated, currentUser }: AISettingsModalProps) {
  const isTeacher = currentUser?.role === "teacher";
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [customModel, setCustomModel] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [globalKeyInput, setGlobalKeyInput] = useState("");
  const [showGlobalPassword, setShowGlobalPassword] = useState(false);
  const [currentGlobalKeyStatus, setCurrentGlobalKeyStatus] = useState<string>("");
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);
  const [globalSaveMsg, setGlobalSaveMsg] = useState("");

  const [modelsList, setModelsList] = useState(AVAILABLE_GEMINI_MODELS);
  const [isRefreshingModels, setIsRefreshingModels] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState("");

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Load existing configuration & fetch Global Key on open
  useEffect(() => {
    if (isOpen) {
      const config = getAIConfig();
      setApiKey(config.apiKey || "");
      setSelectedModel(config.selectedModel || "gemini-2.5-flash");
      setCustomModel(config.customModelName || "");
      setTestResult(null);
      setSaveSuccessMsg("");
      setRefreshMsg("");
      setGlobalSaveMsg("");

      // Fetch Global Key from Firestore settings/ai_config
      fetchGlobalAIConfig().then((fetchedGlobalKey) => {
        if (fetchedGlobalKey) {
          setGlobalKeyInput(fetchedGlobalKey);
          setCurrentGlobalKeyStatus(`Đã cấu hình (${fetchedGlobalKey.slice(0, 6)}...${fetchedGlobalKey.slice(-4)})`);
        } else {
          setGlobalKeyInput("");
          setCurrentGlobalKeyStatus("Chưa cấu hình trên Firestore");
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const targetModel = selectedModel === "custom" ? customModel : selectedModel;
    const res = await testAIConnection(apiKey, targetModel);
    setIsTesting(false);
    setTestResult(res);
  };

  const handleRefreshModelsList = async () => {
    setIsRefreshingModels(true);
    setRefreshMsg("");
    const res = await fetchAvailableModels(apiKey);
    setIsRefreshingModels(false);
    if (res.models) {
      setModelsList(res.models);
      setRefreshMsg("✨ Đã cập nhật và làm mới danh sách mô hình Gemini thành công!");
      setTimeout(() => setRefreshMsg(""), 3500);
    }
  };

  const handleSaveGlobalToFirestore = async () => {
    if (!globalKeyInput.trim()) {
      setGlobalSaveMsg("❌ Vui lòng nhập mã Gemini API Key cho hệ thống!");
      return;
    }
    setIsSavingGlobal(true);
    setGlobalSaveMsg("");
    try {
      const activeModel = selectedModel === "custom" ? customModel : selectedModel;
      await saveGlobalAIConfigToFirestore({
        apiKey: globalKeyInput.trim(),
        defaultModel: activeModel,
        updatedBy: currentUser?.email || currentUser?.fullName || "Admin"
      });
      setCachedGlobalApiKey(globalKeyInput.trim());
      setCurrentGlobalKeyStatus(`Đã cập nhật Global Key (${globalKeyInput.trim().slice(0, 6)}...)`);
      setGlobalSaveMsg("🎉 Đã lưu Global Gemini API Key lên Firestore thành công! Tất cả học sinh sẽ tự động sử dụng Key này.");
      setTimeout(() => setGlobalSaveMsg(""), 4000);
    } catch (err: any) {
      console.error("Save Global Key Error:", err);
      setGlobalSaveMsg("❌ Không thể lưu lên Firestore. Vui lòng kiểm tra quyền hạn Admin/Teacher.");
    } finally {
      setIsSavingGlobal(false);
    }
  };

  const handleSavePersonal = () => {
    const newConfig: AIConfig = {
      apiKey: apiKey.trim(),
      selectedModel: selectedModel,
      customModelName: customModel.trim()
    };
    saveAIConfig(newConfig);
    setSaveSuccessMsg("🎉 Đã lưu cấu hình API Key cá nhân & Mô hình Gemini thành công!");
    if (onConfigUpdated) {
      onConfigUpdated(newConfig);
    }
    setTimeout(() => {
      setSaveSuccessMsg("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
      />

      {/* Dialog Body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-xl rounded-3xl p-6 md:p-8 border border-slate-200 shadow-2xl z-10 space-y-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-2xl shadow-md">
              <Cpu size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                Cấu hình API Key Trí Tuệ Nhân Tạo (AI)
                <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Gemini Client API
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quản lý Global API Key trên Firestore & Personal API Key trên trình duyệt.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
            id="close-ai-settings-modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global Key Status Banner */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-emerald-900">
          <Globe size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold flex items-center gap-2">
              <span>Trạng thái Global API Key (Firestore):</span>
              <span className="bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-md text-[11px] font-mono font-extrabold">
                {currentGlobalKeyStatus || "Đang tải..."}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800/90 leading-relaxed">
              Nếu học sinh không nhập API Key cá nhân, hệ thống sẽ tự động sử dụng <strong>Global API Key</strong> được kéo trực tiếp từ Firestore về trình duyệt.
            </p>
          </div>
        </div>

        {/* ADMIN / TEACHER SECTION TO UPDATE FIRESTORE GLOBAL KEY */}
        {isTeacher && (
          <div className="bg-slate-50 border border-amber-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-600" />
                Quản lý Global API Key Toàn Hệ Thống (Dành cho Admin / Giáo viên)
              </span>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                Firestore Sync
              </span>
            </div>

            <div className="relative">
              <input
                type={showGlobalPassword ? "text" : "password"}
                value={globalKeyInput}
                onChange={(e) => setGlobalKeyInput(e.target.value)}
                placeholder="Dán mã Global Gemini API Key cho toàn bộ học sinh..."
                className="w-full bg-white border border-amber-300 rounded-xl pl-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500 shadow-2xs"
                id="input-global-gemini-key"
              />
              <button
                type="button"
                onClick={() => setShowGlobalPassword(!showGlobalPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showGlobalPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-slate-500">
                Lưu trực tiếp lên Firestore document <code>settings/ai_config</code>.
              </span>
              <button
                type="button"
                onClick={handleSaveGlobalToFirestore}
                disabled={isSavingGlobal}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
                id="btn-save-global-key"
              >
                <Server size={13} />
                <span>{isSavingGlobal ? "Đang lưu Firestore..." : "Lưu Global Key lên Firestore"}</span>
              </button>
            </div>

            {globalSaveMsg && (
              <p className="text-[11px] font-bold text-slate-800 bg-amber-100/70 p-2 rounded-xl animate-fadeIn">
                {globalSaveMsg}
              </p>
            )}
          </div>
        )}

        {/* PERSONAL API KEY SECTION */}
        <div className="space-y-4 pt-1">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <User size={14} className="text-amber-600" />
                API Key cá nhân (Lưu trên trình duyệt / localStorage):
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
              >
                Lấy API Key miễn phí <ExternalLink size={11} />
              </a>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Để trống nếu muốn ưu tiên sử dụng Global API Key của hệ thống..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 py-2.5 pr-10 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-2xs"
                id="input-gemini-api-key"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                title={showPassword ? "Ẩn mã API Key" : "Hiện mã API Key"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              * Ưu tiên cao nhất: Nếu em điền Key cá nhân ở đây, hệ thống sẽ sử dụng Key cá nhân của em.
            </p>
          </div>

          {/* Model Selection Dropdown */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                Chọn phiên bản mô hình Gemini (Model):
              </label>

              <button
                type="button"
                onClick={handleRefreshModelsList}
                disabled={isRefreshingModels}
                className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer active:scale-95 disabled:opacity-50"
                id="btn-refresh-models"
              >
                <RefreshCw size={12} className={isRefreshingModels ? "animate-spin text-amber-600" : "text-amber-600"} />
                <span>{isRefreshingModels ? "Đang tải phiên bản..." : "Làm mới phiên bản mới"}</span>
              </button>
            </div>

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-amber-500 focus:bg-white transition-all cursor-pointer shadow-2xs"
              id="select-gemini-model"
            >
              {modelsList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            {refreshMsg && (
              <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 size={12} /> {refreshMsg}
              </p>
            )}
          </div>

          {/* Custom Model Input if custom is chosen */}
          {selectedModel === "custom" && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Tên ID phiên bản mô hình tùy chỉnh:
              </label>
              <input
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                placeholder="Ví dụ: gemini-2.5-flash, gemini-experimental..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500 shadow-2xs"
              />
            </div>
          )}
        </div>

        {/* Connection Test Result Feedback */}
        {testResult && (
          <div
            className={`p-3.5 rounded-2xl border text-xs font-bold flex items-start gap-2.5 animate-fadeIn ${
              testResult.success
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="leading-relaxed">
              <div>{testResult.message}</div>
            </div>
          </div>
        )}

        {/* Save success toast banner */}
        {saveSuccessMsg && (
          <div className="p-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-md flex items-center gap-2 animate-bounce">
            <CheckCircle2 size={16} />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Button: Test Connection */}
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={isTesting}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 border border-slate-200 disabled:opacity-50"
            id="btn-test-ai-connection"
          >
            <Zap size={14} className={isTesting ? "text-amber-500 animate-spin" : "text-amber-600"} />
            <span>{isTesting ? "Đang kiểm tra..." : "Kiểm tra kết nối"}</span>
          </button>

          {/* Right Action Buttons */}
          <div className="w-full sm:w-auto flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSavePersonal}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              id="btn-save-ai-config"
            >
              <Save size={14} />
              <span>Lưu cấu hình</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

