import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Upload, 
  Search, 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  FileCode, 
  Music, 
  Video, 
  Download, 
  Trash2, 
  Plus, 
  Check, 
  AlertCircle,
  FileDown,
  Sparkles,
  ExternalLink,
  BookOpen,
  ShieldCheck
} from "lucide-react";

import { UserProfile } from "../types";

interface MaterialFile {
  id: string;
  name: string;
  size: string;
  type: string;
  category: "textbook" | "exercise" | "graduation" | "video" | "other";
  uploadedAt: string;
  url?: string; // base64 string for uploaded files
}

interface MaterialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
}

const PRESEEDED_MATERIALS: MaterialFile[] = [
  {
    id: "pre-1",
    name: "Sách giáo khoa Tin học 11 - Kết nối tri thức.pdf",
    size: "18.4 MB",
    type: "pdf",
    category: "textbook",
    uploadedAt: "2026-02-15"
  },
  {
    id: "pre-2",
    name: "Đề cương Ôn thi Tốt nghiệp THPT Quốc gia 2026 môn Tin học.docx",
    size: "2.1 MB",
    type: "docx",
    category: "graduation",
    uploadedAt: "2026-03-01"
  },
  {
    id: "pre-3",
    name: "Bộ bài tập thực hành hàm Excel nâng cao.xlsx",
    size: "450 KB",
    type: "xlsx",
    category: "exercise",
    uploadedAt: "2026-03-05"
  },
  {
    id: "pre-4",
    name: "Báo cáo slide thuyết trình STEM robot tự hành tránh vật cản.pptx",
    size: "12.8 MB",
    type: "pptx",
    category: "exercise",
    uploadedAt: "2026-03-10"
  },
  {
    id: "pre-5",
    name: "Video hướng dẫn giải nhanh thuật toán Sắp xếp nổi bọt.mp4",
    size: "42.1 MB",
    type: "mp4",
    category: "video",
    uploadedAt: "2026-03-12"
  },
  {
    id: "pre-6",
    name: "Nhạc nền Lofi kích thích tư duy lập trình tập trung cao độ.mp3",
    size: "8.5 MB",
    type: "mp3",
    category: "other",
    uploadedAt: "2026-03-15"
  }
];

export default function MaterialsModal({ isOpen, onClose, currentUser }: MaterialsModalProps) {
  const isTeacher = currentUser?.role === "teacher";
  const [materials, setMaterials] = useState<MaterialFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "textbook" | "exercise" | "graduation" | "video" | "other">("all");
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"textbook" | "exercise" | "graduation" | "video" | "other">("exercise");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("learning_materials");
    if (saved) {
      try {
        setMaterials(JSON.parse(saved));
      } catch (e) {
        setMaterials(PRESEEDED_MATERIALS);
      }
    } else {
      setMaterials(PRESEEDED_MATERIALS);
      localStorage.setItem("learning_materials", JSON.stringify(PRESEEDED_MATERIALS));
    }
  }, []);

  const saveMaterials = (newMaterials: MaterialFile[]) => {
    setMaterials(newMaterials);
    localStorage.setItem("learning_materials", JSON.stringify(newMaterials));
  };

  // Helper to trigger automated notifications
  const triggerToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase() || "file";
    const sizeInMB = file.size / (1024 * 1024);
    const sizeString = sizeInMB < 1 ? `${Math.round(file.size / 1024)} KB` : `${sizeInMB.toFixed(1)} MB`;

    // Read file as base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const newMaterial: MaterialFile = {
        id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: sizeString,
        type: extension,
        category: selectedCategory,
        uploadedAt: new Date().toISOString().split("T")[0],
        url: base64
      };

      const updated = [newMaterial, ...materials];
      saveMaterials(updated);
      triggerToast(`Đã tải lên tệp "${file.name}" thành công!`);
    };
    reader.onerror = () => {
      triggerToast("Đã xảy ra lỗi khi đọc tệp tin này.", "error");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Delete file handler
  const handleDelete = (id: string, name: string) => {
    const filtered = materials.filter((item) => item.id !== id);
    saveMaterials(filtered);
    triggerToast(`Đã xóa tài liệu "${name}"!`);
  };

  // Download handler
  const handleDownload = (item: MaterialFile) => {
    if (item.url) {
      // Create actual browser download for base64 file
      const link = document.createElement("a");
      link.href = item.url;
      link.download = item.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerToast(`Bắt đầu tải về: ${item.name}`);
    } else {
      // For preseeded assets, we generate a mock file download to make the download work beautifully!
      const content = `Mock learning material content for: ${item.name}\nGenerated automatically for school purposes.`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = item.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast(`Đã tải tài liệu mẫu: ${item.name}`);
    }
  };

  // Get matching icons for any extension
  const getFileIcon = (type: string) => {
    const ext = type.toLowerCase();
    if (["doc", "docx", "txt", "pdf"].includes(ext)) {
      return <FileText className="text-blue-500" size={24} />;
    }
    if (["xls", "xlsx", "csv"].includes(ext)) {
      return <FileSpreadsheet className="text-emerald-500" size={24} />;
    }
    if (["ppt", "pptx"].includes(ext)) {
      return <Presentation className="text-orange-500" size={24} />;
    }
    if (["mp3", "wav", "ogg"].includes(ext)) {
      return <Music className="text-purple-500" size={24} />;
    }
    if (["mp4", "mkv", "avi", "mov"].includes(ext)) {
      return <Video className="text-red-500" size={24} />;
    }
    if (["html", "css", "js", "py", "sql"].includes(ext)) {
      return <FileCode className="text-indigo-500" size={24} />;
    }
    return <BookOpen className="text-teal-500" size={24} />;
  };

  // Filters
  const filteredMaterials = materials.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "textbook", label: "Sách giáo khoa" },
    { id: "exercise", label: "Bài tập ôn luyện" },
    { id: "graduation", label: "Ôn thi tốt nghiệp" },
    { id: "video", label: "Video bài giảng" },
    { id: "other", label: "Khác" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="materials-modal-backdrop">
      {/* Dim overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
      />

      {/* Main dialog box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-4xl h-[85vh] rounded-3xl overflow-hidden flex flex-col border border-slate-100 shadow-2xl z-10"
        id="materials-modal-box"
      >
        {/* Toast Notification popup */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white shadow-md ${
                toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
              }`}
            >
              {toast.type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-6 py-4 flex items-center justify-between text-white border-b border-emerald-900/35">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300">
              <FileDown size={18} />
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight flex items-center gap-1.5">
                Kho Tài Liệu Học Tập <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Mọi Định Dạng</span>
              </h3>
              <p className="text-emerald-100/70 text-[11px]">Nơi lưu trữ, chia sẻ tài liệu, bài giảng, đề ôn tập lớp học.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-lg transition-all cursor-pointer"
            id="close-materials-modal-btn"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal content body split into columns */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT: File lists & search (Col: 8) */}
          <div className="lg:col-span-8 flex flex-col p-6 overflow-hidden">
            {/* Search & filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 shrink-0">
              {/* Search input */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm tài liệu, bài giảng, đề thi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-3xs"
                />
              </div>

              {/* Counter status label */}
              <div className="text-[11px] font-bold text-slate-400 tracking-tight text-right shrink-0">
                Hiển thị: <span className="text-emerald-600">{filteredMaterials.length}</span> / {materials.length} tệp
              </div>
            </div>

            {/* Sub category filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4 shrink-0 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-emerald-600 text-white shadow-2xs font-extrabold"
                      : "bg-slate-50 text-slate-500 border border-slate-200/50 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Scrollable File List Grid */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1" id="materials-file-list">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((item) => (
                  <div 
                    key={item.id}
                    className="group bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-2xs p-3.5 flex items-center justify-between gap-4 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      {/* Interactive dynamic icon depending on extension */}
                      <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100/50 group-hover:scale-105 transition-transform duration-200">
                        {getFileIcon(item.type)}
                      </div>
                      <div className="text-left overflow-hidden">
                        <h4 className="font-extrabold text-slate-800 text-xs md:text-sm tracking-tight leading-snug truncate group-hover:text-emerald-700 transition-colors" title={item.name}>
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.size}</span>
                          <span>•</span>
                          <span className="text-emerald-600/80 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest text-[9px]">
                            {categories.find(c => c.id === item.category)?.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Download */}
                      <button
                        onClick={() => handleDownload(item)}
                        className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 active:scale-95 rounded-xl transition-all cursor-pointer"
                        title="Tải tài liệu xuống"
                      >
                        <Download size={15} />
                      </button>
                      {/* Delete (only show for uploaded files when logged in as Teacher/Admin) */}
                      {isTeacher && item.id.startsWith("upload-") && (
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 active:scale-95 rounded-xl transition-all cursor-pointer"
                          title="Xóa tài liệu (Quyền Quản trị)"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-100/80 mb-3 animate-pulse">
                    <FileText size={28} />
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm">Không tìm thấy tài liệu phù hợp</h4>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                    Hãy thử thay đổi từ khóa tìm kiếm hoặc bấm chọn các danh mục khác nhé.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Dynamic view based on Teacher vs Student Role */}
          <div className="lg:col-span-4 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200/60 p-6 flex flex-col overflow-y-auto">
            {isTeacher ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Không gian tải lên:</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300/80 text-[10px] font-black rounded-lg">
                    🔑 Quyền Giáo Viên
                  </span>
                </div>
                
                {/* Category Select for upload */}
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Chọn Phân Loại tài liệu tải lên:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-3xs font-semibold"
                  >
                    <option value="textbook">📘 Sách giáo khoa</option>
                    <option value="exercise">📝 Bài tập ôn luyện</option>
                    <option value="graduation">🏆 Ôn thi tốt nghiệp</option>
                    <option value="video">🎥 Video bài giảng</option>
                    <option value="other">⚙️ Các file khác</option>
                  </select>
                </div>

                {/* Drag drop zone container */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all cursor-pointer relative group ${
                    dragActive 
                      ? "border-emerald-500 bg-emerald-500/5 ring-4 ring-emerald-500/10" 
                      : "border-slate-300/80 bg-white hover:border-emerald-400"
                  }`}
                  id="upload-drag-zone"
                >
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Upload size={18} />
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-xs">Kéo thả hoặc click để tải lên</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-normal max-w-[160px] mx-auto">
                    Chấp nhận mọi định dạng file (PDF, Word, PPT, Excel, MP3, MP4, ZIP, RAR,...) lên tới 50MB.
                  </p>

                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={handleFileInput}
                    title="Tải tệp từ thiết bị"
                  />
                </div>

                {/* Formatting Guidelines for high school standard */}
                <div className="bg-gradient-to-br from-emerald-950 to-teal-950 border border-emerald-900 rounded-2xl p-4 text-white mt-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest block mb-2.5">💡 Quy định lưu trữ tài liệu</span>
                    <p className="text-[11px] text-slate-200 leading-relaxed mb-3">
                      Để đảm bảo học sinh dễ dàng tra cứu, giáo viên nên đặt tên file rõ ràng:
                    </p>
                    <ul className="space-y-2 text-[10px] text-slate-300 font-medium">
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-400 shrink-0 mt-0.5">✔</span>
                        <span><strong className="text-white">SGK_Tin11_KNTT.pdf</strong> - Sách giáo khoa.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-400 shrink-0 mt-0.5">✔</span>
                        <span><strong className="text-white">BaiTap_Excel_Buoi1.xlsx</strong> - Bài tập thực hành.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-400 shrink-0 mt-0.5">✔</span>
                        <span><strong className="text-white">DeThi_OnTotNghiep_A.pdf</strong> - Bộ đề thi tham khảo.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-white/10 pt-3 mt-4 text-[10px] text-emerald-300 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-yellow-400 animate-pulse shrink-0" />
                    <span>Hệ thống bảo lưu tệp an toàn trên máy khách.</span>
                  </div>
                </div>
              </>
            ) : (
              /* STUDENT ROLE VIEW */
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-xl">👨‍🎓</span>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider">Khu Vực Học Sinh</h4>
                      <p className="text-[10px] text-slate-500">Xem & Tải Tài Liệu Học Tập</p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3xs space-y-3 mb-4">
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      Chào em! Tất cả tài liệu như <strong className="text-emerald-700">Sách giáo khoa Tin học 10, 11, 12</strong>, bộ đề thi tốt nghiệp THPT, bài tập thực hành Excel, Python và Slide bài giảng đều được Cô Thuý Hào chia sẻ hoàn toàn <strong className="text-emerald-700">miễn phí</strong>.
                    </p>
                    <div className="space-y-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">1.</span>
                        <span>Dùng thanh tìm kiếm để tra cứu nhanh chủ đề em cần.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">2.</span>
                        <span>Nhấn vào nút <Download size={12} className="inline text-emerald-600" /> bên cạnh tệp để tải về máy tính/điện thoại.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">3.</span>
                        <span>Ôn luyện kết hợp với Góc Ôn Tập và Trắc Nghiệm để đạt kết quả cao!</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-extrabold text-[11px]">
                    <ShieldCheck size={14} />
                    <span>Lưu ý Phân Quyền</span>
                  </div>
                  <p className="text-[10px] text-emerald-100/80 leading-relaxed">
                    Học sinh có quyền <strong>Xem và Tải về</strong>. Quyền <strong>Tải lên & Quản lý (Xoá/Sửa)</strong> thuộc về Quản trị / Giáo viên Cô Thuý Hào.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
