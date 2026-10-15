import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileSpreadsheet, 
  Brain, 
  Presentation, 
  Zap, 
  Calculator, 
  GitBranch, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Table, 
  RotateCcw, 
  Lightbulb, 
  ArrowRight, 
  Laptop, 
  Sun, 
  Thermometer, 
  Flame, 
  CheckCircle, 
  XCircle, 
  Cpu,
  CornerDownLeft,
  Droplets,
  Car,
  ShieldAlert,
  Trash2,
  Bot,
  Sliders,
  Code,
  Layers,
  Activity,
  Volume2,
  Fan,
  Radio,
  Navigation,
  MoveRight,
  Settings,
  Terminal,
  Home,
  Play,
  Copy,
  Check,
  Heart,
  Gift,
  GraduationCap,
  FileText,
  Layout,
  Palette,
  Type,
  Image,
  Wand2,
  Send,
  Award,
  PenTool,
  Bookmark,
  Share2
} from "lucide-react";
import { EXCEL_FUNCTIONS_DATA, ExcelFunctionData } from "../data/excelData";
import { STEM_PROJECTS, STEM_ROADMAPS, StemProject, StemRoadmap } from "../data/stemData";


export interface PptSlide {
  slide: string;
  title: string;
  subtitle: string;
  layoutType: "cover" | "greeting" | "report-intro" | "grid" | "timeline" | "metrics" | "conclusion";
  hint: string;
  sampleContent: string[];
  recommendedVisuals: string;
}

export interface PptThemeData {
  id: string;
  label: string;
  categoryBadge: string;
  description: string;
  colorPaletteName: string;
  badgeBg: string;
  cardBgGradient: string;
  previewBgClass: string;
  previewTextClass: string;
  accentBorder: string;
  fontRecommendation: string;
  slides: PptSlide[];
}

export const PPT_THEMES_DATA: Record<string, PptThemeData> = {
  card: {
    id: "card",
    label: "💌 Thiệp Mừng & Tri Ân",
    categoryBadge: "Thiệp & Sự Kiện",
    description: "Thiết kế thiệp chúc mừng 20/11, Tết, Sinh nhật, Ngày Phụ nữ 8/3 hoặc Thư tri ân thầy cô bằng Slide PowerPoint thơ mộng, ấm áp.",
    colorPaletteName: "Hồng Đào & Vàng Kim (Rose & Gold)",
    badgeBg: "bg-pink-100 text-pink-700 border-pink-200",
    cardBgGradient: "from-pink-500 via-rose-500 to-amber-500",
    previewBgClass: "bg-gradient-to-br from-pink-950 via-rose-900 to-amber-950 text-pink-50",
    previewTextClass: "text-pink-200",
    accentBorder: "border-pink-500/40",
    fontRecommendation: "Playfair Display / Dancing Script (Tiêu đề) + Be Vietnam Pro (Thân bài)",
    slides: [
      {
        slide: "Slide 1",
        title: "Thiệp Tri Ân Thầy Cô - Lời Tự Sự Từ Trái Tim",
        subtitle: "Gửi tặng Thầy Cô kính yêu nhân ngày Nhà Giáo Việt Nam 20/11",
        layoutType: "cover",
        hint: "Mẹo trang trí: Chọn khung viền hoa văn mềm mại, tông màu hồng phấn/vàng kim. Dùng font chữ uốn lượn cổ điển cho dòng tiêu đề.",
        sampleContent: [
          "🌸 Mái trường xưa - Nơi nâng cánh những giấc mơ",
          "✨ Dành trọn lòng biết ơn sâu sắc nhất gửi đến Thầy Cô",
          "📅 Lớp 11A1 - Niên khóa 2025 - 2026"
        ],
        recommendedVisuals: "Hình đóa hoa hướng dương, cuốn sách mở ra ánh sáng, viền lá mạ vàng."
      },
      {
        slide: "Slide 2",
        title: "Lời Chúc Ý Nghĩa & Nhớ Ơn Nguồn Cội",
        subtitle: "Ân tình người đưa đò qua từng trang giáo án",
        layoutType: "greeting",
        hint: "Mẹo bố cục: Đặt lời chúc ở vị trí trung tâm (Center Alignment), dùng trích dẫn câu thơ hoặc danh ngôn ý nghĩa.",
        sampleContent: [
          "📜 'Mấy ai là kẻ sang sông / Mà không nhớ lối người đưa đò qua'",
          "💖 Cảm ơn Thầy Cô đã luôn kiên nhẫn hướng dẫn chúng em từng bài học nhỏ.",
          "🕊️ Chúc Thầy Cô luôn dồi dào sức khỏe, hạnh phúc và tràn đầy tâm huyết với nghề!"
        ],
        recommendedVisuals: "Biểu tượng trái tim hồng, ngọn nến lung linh, cánh chim câu tự do."
      },
      {
        slide: "Slide 3",
        title: "Album Khoảnh Khắc Đáng Nhớ Lớp Chúng Ta",
        subtitle: "Ghi dấu những kỉ niệm rực rỡ dưới mái trường",
        layoutType: "grid",
        hint: "Mẹo bộ sưu tập: Dùng các khung ảnh lật nghiêng dạng Polaroid (3-4 hình) kèm lời chú thích ngắn dưới mỗi bức ảnh.",
        sampleContent: [
          "📸 Bức ảnh 1: Tiết học Tin học hào hứng cùng Thầy Cô",
          "📸 Bức ảnh 2: Buổi cắm trại thanh xuân tràn ngập tiếng cười",
          "📸 Bức ảnh 3: Ngày khai giảng rực rỡ sắc cờ hoa"
        ],
        recommendedVisuals: "Khung Polaroid lật nghiêng, băng dính màu trang trí (Washi Tape)."
      },
      {
        slide: "Slide 4",
        title: "Lời Hứa Học Tập & Trưởng Thành",
        subtitle: "Món quà vô giá gửi tặng Thầy Cô",
        layoutType: "timeline",
        hint: "Mẹo truyền cảm hứng: Nêu rõ 3 mục tiêu phấn đấu học tập của tập thể lớp như lời hứa chân thành nhất.",
        sampleContent: [
          "🎯 Quyết tâm đạt 100% Học sinh Giỏi & Khá",
          "🚀 Chinh phục các giải thưởng Học sinh giỏi & STEM cấp Tỉnh/Thành phố",
          "🌱 Rèn luyện đạo đức, trở thành người công dân có ích cho xã hội"
        ],
        recommendedVisuals: "Huy hiệu ngôi sao may mắn, biểu tượng mầm cây vươn mình, cúp tri thức."
      },
      {
        slide: "Slide 5",
        title: "Lời Cảm Ơn Chân Thành & Lời Chúc Mãi Mãi",
        subtitle: "Kính chúc Thầy Cô mãi là ngọn hải đăng soi sáng",
        layoutType: "conclusion",
        hint: "Mẹo slide kết: Dùng câu kết tình cảm, để lại thông tin tập thể lớp và một lời tri ân lắng đọng.",
        sampleContent: [
          "❤️ 'Thầy Cô chính là người thắp sáng ước mơ cho chúng em'",
          "💌 Tập thể Lớp 11A1 xin thành kính tri ân!",
          "🎉 Kính chúc mừng Ngày Nhà Giáo Việt Nam 20/11!"
        ],
        recommendedVisuals: "Đóa hoa bó hoa hướng dương rực rỡ, pháo hoa kim tuyến nhẹ nhàng."
      }
    ]
  },

  report: {
    id: "report",
    label: "📊 Báo Cáo Học Tập & Nghiên Cứu",
    categoryBadge: "Báo Cáo Học Thuật",
    description: "Bố cục báo cáo nhóm, thuyết trình dự án môn học, báo cáo nghiên cứu khoa học học sinh THPT chuẩn chỉnh.",
    colorPaletteName: "Xanh Hải Quân & Trắng Tinh (Navy & Crisp White)",
    badgeBg: "bg-blue-100 text-blue-700 border-blue-200",
    cardBgGradient: "from-blue-600 via-indigo-600 to-slate-700",
    previewBgClass: "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-blue-50",
    previewTextClass: "text-blue-200",
    accentBorder: "border-blue-500/40",
    fontRecommendation: "Montserrat / Plus Jakarta Sans (Tiêu đề) + Inter (Thân bài)",
    slides: [
      {
        slide: "Slide 1",
        title: "Báo Cáo Nghiên Cứu Khoa Học & Dự Án Nhóm",
        subtitle: "Đề tài: Ứng dụng Công nghệ Số trong Quản lý Học tập Học sinh",
        layoutType: "report-intro",
        hint: "Mẹo trang bìa báo cáo: Đặt logo trường góc trên trái, tiêu đề viết hoa đậm, danh sách tác giả & giáo viên hướng dẫn rõ ràng ở góc dưới.",
        sampleContent: [
          "🏫 Trắc nghiệm & Dự án Môn Tin Học 11",
          "👥 Nhóm thực hiện: Nguyễn Văn A, Trần Thị B, Lê Văn C",
          "👩‍🏫 Giáo viên hướng dẫn: Cô Thuý Hào"
        ],
        recommendedVisuals: "Logo nhà trường, biểu tượng bảng số liệu, đường kẻ phân cách chuẩn học thuật."
      },
      {
        slide: "Slide 2",
        title: "Đặt Vấn Đề & Mục Tiêu Nghiên Cứu",
        subtitle: "Thực trạng học tập hiện nay & Tính cấp thiết của đề tài",
        layoutType: "grid",
        hint: "Mẹo trình bày bài toán: Chia đôi Slide (50-50). Bên trái nêu Thực trạng (Problem), bên phải nêu Mục tiêu giải quyết (Goal).",
        sampleContent: [
          "⚠️ Thực trạng: 68% học sinh gặp khó khăn trong ghi nhớ công thức Excel & Logic thuật toán.",
          "💡 Mục tiêu: Xây dựng nền tảng hỗ trợ học tập trực quan tương tác real-time.",
          "🎯 Phạm vi: Áp dụng thử nghiệm cho 350 học sinh khối 10 & 11."
        ],
        recommendedVisuals: "Biểu tượng cảnh báo màu đỏ nhẹ, mục tiêu bắn cung, biểu đồ tăng trưởng."
      },
      {
        slide: "Slide 3",
        title: "Phương Pháp Nghiên Cứu & Dữ Liệu Thu Thập",
        subtitle: "Quy trình khảo sát & Phân tích số liệu thực tế",
        layoutType: "metrics",
        hint: "Mẹo trực quan hóa dữ liệu: Sử dụng 3 khối chỉ số lớn (Big Stat Numbers) kết hợp biểu đồ cột/tròn minh họa.",
        sampleContent: [
          "📈 89.5% Học sinh đánh giá mô hình trực quan dễ hiểu hơn sách giáo khoa",
          "⏱️ Giảm 45% thời gian làm bài tập thực hành Excel & Python",
          "📋 Khảo sát thực tế trên 500 phiếu phản hồi tích cực"
        ],
        recommendedVisuals: "Biểu đồ cột phần trăm, đồng hồ bấm giờ, kính hiển vi vi mô."
      },
      {
        slide: "Slide 4",
        title: "Kết Quả Đạt Được & Đánh Giá SWOT",
        subtitle: "Phân tích Điểm mạnh, Điểm yếu & Cơ hội mở rộng",
        layoutType: "grid",
        hint: "Mẹo mô hình SWOT: Dùng ma trận 4 ô vuông màu sắc khác nhau để trình bày Điểm mạnh (S), Điểm yếu (W), Cơ hội (O), Thách thức (T).",
        sampleContent: [
          "✅ Strengths: Giao diện dễ sử dụng, tương tác tức thì trên điện thoại & PC.",
          "⚡ Weaknesses: Cần kết nối Internet ổn định cho tính năng AI.",
          "🚀 Opportunities: Dễ dàng mở rộng cho các môn Vật Lý, Hóa Học, Toán Học."
        ],
        recommendedVisuals: "Ma trận 4 màu sắc phân biệt rõ ràng, biểu tượng khiên bảo vệ."
      },
      {
        slide: "Slide 5",
        title: "Kết Luận & Khuyến Nghị Phát Triển",
        subtitle: "Tóm tắt đóng góp chính & Lời cảm ơn Hội đồng Báo cáo",
        layoutType: "conclusion",
        hint: "Mẹo kết thúc báo cáo: Tóm tắt 3 điểm cốt lõi nhất, ghi rõ lời cảm ơn Ban Giám Hiệu, Thầy Cô và bạn bè.",
        sampleContent: [
          "📌 Đề tài đạt hiệu quả ứng dụng thực tiễn cao trong giảng dạy Tin học.",
          "🤝 Trân trọng cảm ơn Thầy Cô và Ban Giám Hiệu đã hỗ trợ nhóm hoàn thành nghiên cứu!",
          "❓ Q&A: Nhóm rất mong nhận được góp ý từ Hội đồng!"
        ],
        recommendedVisuals: "Biểu tượng bắt tay hợp tác, dấu tích hoàn thành, bong bóng câu hỏi Q&A."
      }
    ]
  },

  stem: {
    id: "stem",
    label: "🔬 Dự Án STEM & Robotics",
    categoryBadge: "Thuyết Trình STEM",
    description: "Báo cáo mô hình STEM, xe tự hành, nhà thông minh, hệ thống tự động hóa và vi điều khiển Arduino/ESP32.",
    colorPaletteName: "Xanh Công Nghệ & Vàng Cam (Electric Blue & Amber)",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
    cardBgGradient: "from-blue-600 via-indigo-600 to-amber-500",
    previewBgClass: "bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-blue-50",
    previewTextClass: "text-amber-300",
    accentBorder: "border-amber-500/40",
    fontRecommendation: "Space Grotesk (Tiêu đề) + Fira Code / Outfit (Thân bài)",
    slides: [
      {
        slide: "Slide 1",
        title: "Dự Án STEM: Hệ Thống Cảnh Báo PCCC & Tản Khói",
        subtitle: "Mô hình ứng dụng Arduino Uno R3, Cảm biến MQ-2 & Khối Rơ-le",
        layoutType: "cover",
        hint: "Mẹo trình bày STEM: Dùng nền màu tối công nghệ, đính kèm ảnh chụp thực tế sản phẩm Robot/Mạch điện ở góc phải.",
        sampleContent: [
          "🤖 Sản phẩm STEM thi KHKT Học sinh Trung học",
          "⚡ Vi điều khiển: Arduino Uno R3 & MicroPython ESP32",
          "👨‍💻 Đội ngũ chế tạo: Câu lạc bộ STEM Robotics Trường THPT"
        ],
        recommendedVisuals: "Hình chụp bo mạch Arduino phát sáng, vi mạch vi điều khiển, bánh răng cơ khí."
      },
      {
        slide: "Slide 2",
        title: "Ý Tưởng Sáng Tạo & Bối Cảnh Thực Tế",
        subtitle: "Giải quyết sự cố hỏa hoạn nhà xưởng bằng tự động hóa giá rẻ",
        layoutType: "report-intro",
        hint: "Mẹo bối cảnh: Nêu lý do chọn đề tài (Need). Sử dụng biểu đồ tròn thể hiện tỷ lệ sự cố và chi phí sản xuất siêu tiết kiệm.",
        sampleContent: [
          "🔥 Vấn đề: Sự cố cháy nổ nhà xưởng diễn biến phức tạp do phát hiện muộn.",
          "💡 Giải pháp: Mạch cảm biến khói tự động hú còi & bật quạt hút dưới 2 giây.",
          "💰 Chi phí chế tạo: Chỉ 180.000 VNĐ - Rẻ hơn 10 lần thiết bị thương mại!"
        ],
        recommendedVisuals: "Còi báo động đỏ, ngọn lửa đỏ cam, đồng tiền tiết kiệm chi phí."
      },
      {
        slide: "Slide 3",
        title: "Sơ Đồ Mạch Điện & Thuật Toán Điều Khiển",
        subtitle: "Nguyên lý kết nối phần cứng & Lưu đồ Blockly",
        layoutType: "grid",
        hint: "Mẹo nguyên lý: Đưa sơ đồ nối dây (Schematic) bên trái, bên phải là khối lệnh Blockly / Mã nguồn C++ chính.",
        sampleContent: [
          "🔌 Linh kiện: Cảm biến Khói MQ-2 -> Chân A0 Arduino -> Relay D7 -> Còi & Quạt",
          "🧠 Thuật toán: NẾU Khói > 300ppm THÌ Bật Còi & Quạt | NGƯỢC LẠI Tắt",
          "⚙️ Thời gian phản hồi cảm biến: < 0.5 giây"
        ],
        recommendedVisuals: "Sơ đồ khối điều khiển, dây cắm jumper màu sắc, đoạn mã code phát sáng."
      },
      {
        slide: "Slide 4",
        title: "Quá Trình Chế Tạo & Thử Nghiệm Thực Tế",
        subtitle: "Đánh giá độ chính xác qua 50 lần mô phỏng",
        layoutType: "metrics",
        hint: "Mẹo chạy thử nghiệm: Đính kèm mã QR link xem video chạy mô hình thực tế, bảng ghi nhận số liệu thử nghiệm.",
        sampleContent: [
          "🎯 Tỷ lệ kích hoạt chính xác: 98% trong điều kiện môi trường thực",
          "⏱️ Độ trễ cảnh báo: 1.2 giây sau khi phát hiện khói nhẹ",
          "🔋 Công suất tiêu thụ: Cực thấp (5V - 200mA), chạy ổn định bằng Pin sạc"
        ],
        recommendedVisuals: "Mã QR video Demo, đồng hồ đo điện áp VOM, bảng số liệu thử nghiệm."
      },
      {
        slide: "Slide 5",
        title: "Hướng Phát Triển IoT & Lời Cảm Ơn",
        subtitle: "Tích hợp Wi-Fi gửi thông báo điện thoại qua Blynk App",
        layoutType: "conclusion",
        hint: "Mẹo mở rộng: Nêu tính năng tương lai (kết nối IoT Cloud, App di động), kết thúc bằng câu slogan ấn tượng.",
        sampleContent: [
          "🌐 Định hướng 2.0: Tích hợp ESP8266 gửi tin nhắn khẩn cấp về điện thoại chủ nhà.",
          "🌟 Slogan: 'Công nghệ nhỏ - An toàn lớn cho mọi gia đình'",
          "🙏 Trân trọng cảm ơn Ban Giám Khảo và Thầy Cô đã lắng nghe!"
        ],
        recommendedVisuals: "Biểu tượng Wifi đám mây, ứng dụng Smartphone, ngôi sao sáng tạo STEM."
      }
    ]
  },

  ai: {
    id: "ai",
    label: "🤖 Đề Tài AI & Công Nghệ Số",
    categoryBadge: "Kỷ Nguyên AI",
    description: "Thuyết trình về Trí tuệ nhân tạo, Chuyển đổi số, An toàn thông tin và Công nghệ tương lai.",
    colorPaletteName: "Tím Dạ Quang & Xanh Neon (Neon Violet & Cyber Cyan)",
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200",
    cardBgGradient: "from-purple-600 via-indigo-600 to-cyan-500",
    previewBgClass: "bg-gradient-to-br from-slate-950 via-purple-950 to-cyan-950 text-cyan-50",
    previewTextClass: "text-cyan-300",
    accentBorder: "border-cyan-500/40",
    fontRecommendation: "Syne / Space Grotesk (Tiêu đề) + JetBrains Mono (Thân bài)",
    slides: [
      {
        slide: "Slide 1",
        title: "Trí Tuệ Nhân Tạo (AI) Trong Giáo Dục Hiện Đại",
        subtitle: "Cơ hội & Thách thức dành cho Học sinh Trung học",
        layoutType: "cover",
        hint: "Mẹo phong cách AI: Sử dụng hiệu ứng nền Gradient tím mộng mơ kết hợp đường nét mạng nơ-ron điện tử.",
        sampleContent: [
          "🧠 Khám phá kỷ nguyên AI Generative (Gemini, ChatGPT)",
          "🌐 Chuyển đổi số trong học tập & Lập trình tự động",
          "👤 Báo cáo viên: Học sinh CLB Tin Học THPT"
        ],
        recommendedVisuals: "Mạng nơ-ron nhân tạo phát sáng, robot tương lai, vi mạch AI."
      },
      {
        slide: "Slide 2",
        title: "AI Là Gì & Các Lĩnh Vực Ứng Dụng Đột Phá",
        subtitle: "Từ học máy (Machine Learning) đến xử lý ngôn ngữ tự nhiên",
        layoutType: "grid",
        hint: "Mẹo định nghĩa: Dùng 3 khối card tròn tượng trưng cho 3 ứng dụng nổi bật: Y tế, Giáo Dục và Tự Động Hóa.",
        sampleContent: [
          "🎓 Giáo dục: Trợ lý gia sư AI cá nhân hóa lộ trình học cho từng học sinh.",
          "🏥 Y tế: Chẩn đoán hình ảnh X-quang chính xác đến 99%.",
          "🚗 Giao thông: Xe tự hành thông minh phân tích vật cản thời gian thực."
        ],
        recommendedVisuals: "Icon bộ não điện tử, kính VR thực tế ảo, cánh tay Robot."
      },
      {
        slide: "Slide 3",
        title: "Lợi Ích Vượt Trội Của Trợ Lý AI Trong Học Tập",
        subtitle: "Tăng 300% hiệu suất tìm kiếm tri thức & Sửa lỗi lập trình",
        layoutType: "metrics",
        hint: "Mẹo con số ấn tượng: Dùng chỉ số % lớn rực rỡ để minh họa sự bùng nổ của năng suất lao động.",
        sampleContent: [
          "⚡ 85% Lập trình viên tiết kiệm thời gian nhờ AI sinh mã tự động",
          "📚 Tóm tắt 100 trang tài liệu nghiên cứu chỉ trong 5 giây",
          "🎯 Giải đáp thắc mắc 24/7 không cần chờ đợi"
        ],
        recommendedVisuals: "Tia sét năng lượng, cuốn sách điện tử, đồ thị dốc thẳng đứng."
      },
      {
        slide: "Slide 4",
        title: "Thách Thức Bảo Mật & Đạo Đức Sử Dụng AI",
        subtitle: "Sử dụng AI có trách nhiệm & Nguyên tắc không sao chép",
        layoutType: "report-intro",
        hint: "Mẹo đối lập: Chia 2 cột rõ rệt - Cột Xanh (Sử dụng đúng đắn), Cột Đỏ (Lạm dụng & Vi phạm bản quyền).",
        sampleContent: [
          "🛡️ An toàn dữ liệu: Bảo vệ thông tin cá nhân khi tương tác với chatbot.",
          "⚖️ Đạo đức học thuật: Dùng AI làm công cụ hỗ trợ tư duy, không sao chép nguyên văn.",
          "🔍 Kiểm chứng thông tin: Luôn đối chiếu dữ liệu AI đưa ra với sách giáo khoa."
        ],
        recommendedVisuals: "Khiên an ninh mạng, chiếc cân công lý, dấu chấm hỏi kiểm chứng."
      },
      {
        slide: "Slide 5",
        title: "Làm Chủ Công Nghệ - Chìa Khóa Tương Lai",
        subtitle: "Học sinh Việt Nam sẵn sàng bước vào kỷ nguyên trí tuệ nhân tạo",
        layoutType: "conclusion",
        hint: "Mẹo lời kêu gọi action: Đưa ra thông điệp truyền cảm hứng hướng tới việc rèn luyện tư duy phản biện.",
        sampleContent: [
          "🚀 'AI không thay thế con người - Nhưng người biết dùng AI sẽ thay thế người không biết!'",
          "💡 Rèn luyện 3 kỹ năng cốt lõi: Tư duy phản biện, Sáng tạo & Lập trình Prompt.",
          "✨ Cảm ơn Thầy Cô và các bạn đã chú ý theo dõi!"
        ],
        recommendedVisuals: "Chìa khóa vàng khai phá, tên lửa cất cánh, quả cầu trái đất kết nối."
      }
    ]
  },

  computer: {
    id: "computer",
    label: "🖥️ Lịch Sử Máy Tính & Tin Học",
    categoryBadge: "Lịch Sử Tin Học",
    description: "Hành trình phát triển từ máy tính bóng chân không ENIAC đến vi mạch Silicon và Máy tính Lượng tử.",
    colorPaletteName: "Nâu Cổ Đển Retro & Vàng Đồng (Vintage Sepia & Gold)",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
    cardBgGradient: "from-amber-700 via-orange-800 to-yellow-600",
    previewBgClass: "bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 text-amber-100",
    previewTextClass: "text-amber-200",
    accentBorder: "border-amber-500/40",
    fontRecommendation: "Merriweather / Courier Prime (Tiêu đề) + Source Sans (Thân bài)",
    slides: [
      {
        slide: "Slide 1",
        title: "Lịch Sử Phát Triển Máy Tính Điện Tử",
        subtitle: "Từ bàn tính gảy cổ đại đến Siêu máy tính Lượng tử",
        layoutType: "cover",
        hint: "Mẹo phong cách Retro: Dùng màu nền Sepia trầm ấm, font chữ gõ máy cổ điển tạo cảm giác lịch sử.",
        sampleContent: [
          "⌛ Chặng đường 80 năm tiến hóa của văn minh tin học",
          "📖 Bài thuyết trình Môn Tin Học Lớp 10",
          "🎙️ Người trình bày: Tổ 1 Class 10A"
        ],
        recommendedVisuals: "Hình máy tính ENIAC đen trắng, bánh răng đồng hồ thời gian, cuộn giấy cổ."
      },
      {
        slide: "Slide 2",
        title: "Thế Hệ 1: Máy Tính Bóng Chân Không (1945 - 1955)",
        subtitle: "Huyền thoại ENIAC - Căn phòng máy tính khổng lồ",
        layoutType: "grid",
        hint: "Mẹo thông số kỷ lục: Nêu rõ kích thước chiếm cả căn phòng 167m² và nặng 30 tấn của ENIAC.",
        sampleContent: [
          "📻 Công nghệ chính: 18.000 bóng chân không tỏa nhiệt cực lớn.",
          "🏢 Kích thước: Nặng 30 tấn, chiếm diện tích bằng một ngôi nhà lớn.",
          "⚡ Tốc độ: 5.000 phép tính/giây (Rất nhanh vào thời bấy giờ!)."
        ],
        recommendedVisuals: "Bóng đèn chân không phát sáng, sơ đồ căn phòng ENIAC."
      },
      {
        slide: "Slide 3",
        title: "Thế Hệ 2 & 3: Kỷ Nguyên Transistor & Vi Mạch (IC)",
        subtitle: "Định luật Moore & Cuộc cách mạng thu nhỏ linh kiện",
        layoutType: "timeline",
        hint: "Mẹo tiến trình: Dùng mốc thời gian Timeline nằm ngang thể hiện sự ra đời của Bóng bán dẫn (1955) và Vi mạch IC (1965).",
        sampleContent: [
          "🔬 Transistor (1955): Nhỏ hơn 100 lần, tiêu thụ ít điện năng hơn bóng chân không.",
          "💾 Vi mạch IC (1965): Tích hợp hàng nghìn linh kiện lên một phiến Silicon siêu nhỏ.",
          "🚀 Ra đời ngôn ngữ lập trình bậc cao đầu tiên: FORTRAN, COBOL."
        ],
        recommendedVisuals: "Linh kiện Transistor chân kim loại, con chip Silicon đen bóng."
      },
      {
        slide: "Slide 4",
        title: "Thế Hệ 4: Máy Tính Cá Nhân (PC) & Internet",
        subtitle: "Đưa máy tính đến bàn làm việc của mọi gia đình",
        layoutType: "report-intro",
        hint: "Mẹo bước ngoặt: Tuyên dương các huyền thoại như Steve Jobs (Apple) & Bill Gates (Microsoft).",
        sampleContent: [
          "🖥️ Vi xử lý Microprocessor (1971): Toàn bộ CPU nằm gọn trên 1 con chip.",
          "💻 Máy tính cá nhân PC xuất hiện: Apple II, IBM PC bùng nổ toàn cầu.",
          "🌐 Mạng Internet ra đời: Kết nối hàng tỷ người dùng khắp hành tinh."
        ],
        recommendedVisuals: "Máy tính PC màn hình CRT cổ điển, đĩa mềm 3.5 inch, logo World Wide Web."
      },
      {
        slide: "Slide 5",
        title: "Tương Lai: Máy Tính Lượng Tử & Điện Toán Đám Mây",
        subtitle: "Sức mạnh tính toán gấp hàng triệu lần siêu máy tính hiện nay",
        layoutType: "conclusion",
        hint: "Mẹo kết tầm nhìn: Nêu bật khái niệm Qubit và tương lai điện toán đám mây siêu tốc.",
        sampleContent: [
          "⚛️ Máy tính Lượng tử (Quantum Computing): Giải quyết bài toán trong vài giây thay vì hàng nghìn năm.",
          "☁️ Điện toán đám mây: Dữ liệu đồng bộ tức thì mọi lúc mọi nơi.",
          "✨ Cảm ơn Thầy Cô và các bạn đã cùng du hành qua lịch sử tin học!"
        ],
        recommendedVisuals: "Mô hình nguyên tử lượng tử, đám mây kết nối vô tận."
      }
    ]
  },

  idea: {
    id: "idea",
    label: "💡 Thuyết Trình Ý Tưởng / Khởi Nghiệp",
    categoryBadge: "Thuyết Trình Sáng Tạo",
    description: "Dàn ý thuyết trình gọi vốn dự án sáng tạo, cuộc thi khoa học kỹ thuật, ý tưởng khởi nghiệp học sinh.",
    colorPaletteName: "Cam Sáng Sáng Tạo & Xám Đen (Vibrant Orange & Dark Slate)",
    badgeBg: "bg-orange-100 text-orange-800 border-orange-200",
    cardBgGradient: "from-orange-500 via-amber-500 to-emerald-600",
    previewBgClass: "bg-gradient-to-br from-slate-950 via-orange-950 to-amber-950 text-orange-50",
    previewTextClass: "text-amber-200",
    accentBorder: "border-orange-500/40",
    fontRecommendation: "General Sans / Cabinet Grotesk (Tiêu đề) + Satoshi (Thân bài)",
    slides: [
      {
        slide: "Slide 1",
        title: "Ý Tưởng Sáng Tạo: Ứng Dụng Thu Gom Rác Thông Minh",
        subtitle: "Dự án Khởi nghiệp Xanh dành cho Trường học & Đô thị",
        layoutType: "cover",
        hint: "Mẹo Pitch Deck: Tiêu đề ngắn gọn dưới 7 từ, có câu Slogan định vị thương hiệu hấp dẫn (Elevator Pitch).",
        sampleContent: [
          "🌱 Dự án Sáng tạo Khởi nghiệp Học sinh THPT",
          "💡 Slogan: 'Phân loại rác thông minh - Hành động vì Trái Đất xanh'",
          "🚀 Nhóm tác giả: Green Tech Student Team"
        ],
        recommendedVisuals: "Bóng đèn phát sáng mầm cây green, logo dự án tối giản, tên lửa cất cánh."
      },
      {
        slide: "Slide 2",
        title: "Nỗi Đau Khách Hàng (Problem Statement)",
        subtitle: "Thực trạng rác thải chưa phân loại tại các trường học",
        layoutType: "grid",
        hint: "Mẹo đánh trúng tâm lý: Nêu 3 con số nhói lòng về môi trường để gây ấn tượng mạnh với Ban giám khảo.",
        sampleContent: [
          "🗑️ 82% Rác thải nhựa trường học bị bỏ chung không qua phân loại.",
          "⏳ Tốn 3 giờ mỗi ngày cho nhân viên vệ sinh phân loại thủ công.",
          "💸 Lãng phí nguồn tài nguyên tái chế trị giá hàng triệu đồng."
        ],
        recommendedVisuals: "Thùng rác quá tải, dấu chấm cảm màu cam đỏ, đồng hồ lãng phí."
      },
      {
        slide: "Slide 3",
        title: "Giải Pháp Đột Phá (The Product Solution)",
        subtitle: "Thùng rác AI tự động nhận diện & Tích điểm đổi quà",
        layoutType: "report-intro",
        hint: "Mẹo giới thiệu sản phẩm: Trình bày giải pháp bằng hình ảnh Demo 3D hoặc sơ đồ 3 bước đơn giản.",
        sampleContent: [
          "🤖 Camera AI: Phân loại rác Hữu cơ / Tái chế / Khác trong 0.5 giây.",
          "📱 App tích điểm: Học sinh quét mã QR nhận điểm thưởng đổi đồ dùng học tập.",
          "♻️ Vòng tuần hoàn: Kết nối trực tiếp với nhà máy tái chế rác thải."
        ],
        recommendedVisuals: "Camera quét AI, ứng dụng di động quét QR, món quà thưởng."
      },
      {
        slide: "Slide 4",
        title: "Giá Trị Khác Biệt & Mô Hình Hoạt Động",
        subtitle: "Tại sao ý tưởng của chúng tôi vượt trội hơn?",
        layoutType: "metrics",
        hint: "Mẹo tính khả thi: So sánh với các giải pháp hiện có trên thị trường theo 3 tiêu chí: Chi phí - Độ tiện lợi - Tính lan tỏa.",
        sampleContent: [
          "💰 Chi phí lắp đặt rẻ hơn 60% so với thùng rác nhập khẩu",
          "🎮 Game hóa (Gamification) giúp 95% học sinh tự giác tham gia",
          "📈 Dễ dàng nhân rộng ra toàn bộ 50 trường học trên địa bàn Tỉnh"
        ],
        recommendedVisuals: "Huy chương vô địch, biểu đồ so sánh tăng trưởng, ứng dụng Game."
      },
      {
        slide: "Slide 5",
        title: "Kế Hoạch Triển Khai & Lời Kêu Gọi Đồng Hành",
        subtitle: "Lộ trình 6 tháng thử nghiệm & Kêu gọi tài trợ",
        layoutType: "conclusion",
        hint: "Mẹo kêu gọi hành động (Call to Action): Nêu rõ số vốn/sự hỗ trợ cần thiết và thông tin liên hệ nhóm dự án.",
        sampleContent: [
          "📅 Lộ trình: Tháng 9 (Chế tạo Demo) -> Tháng 11 (Thử nghiệm) -> Tháng 1 (Nhân rộng).",
          "🤝 Kêu gọi: Rất mong nhận được sự cố vấn chuyên môn & tài trợ 5 triệu đồng tiền linh kiện thử nghiệm.",
          "💌 Hãy cùng chúng tôi kiến tạo môi trường học đường Xanh - Sạch - Thông Minh!"
        ],
        recommendedVisuals: "Lộ trình mũi tên tiến lên, cái bắt tay hợp tác, cây cối xanh tươi."
      }
    ]
  }
};

interface Stem2DSimulatorProps {
  activeStemId: string;
  stemLightLevel: number;
  stemTemp: number;
  stemSmoke: number;
  stemSoil: number;
  stemSunlight: number;
  stemEmergency: boolean;
  stemCarDist: number;
  stemLinePos: "left" | "center" | "right";
  stemHandDist: number;
  stemSanitizerPresent: boolean;
  stemShoulderAngle: number;
  stemElbowAngle: number;
  stemGripperClosed: boolean;
  stemLockUnlocked?: boolean;
}

function Stem2DSimulator({
  activeStemId,
  stemLightLevel,
  stemTemp,
  stemSmoke,
  stemSoil,
  stemSunlight,
  stemEmergency,
  stemCarDist,
  stemLinePos,
  stemHandDist,
  stemSanitizerPresent,
  stemShoulderAngle,
  stemElbowAngle,
  stemGripperClosed,
  stemLockUnlocked = false,
}: Stem2DSimulatorProps) {
  // 1. Lighting & LED Projects (smarthome_light, g10_smart_bedroom_light, g10_stair_light_app, g10_iot_led, g11_classroom_lighting, g11_bh1750_lux_meter)
  if (
    ["smarthome_light", "g10_smart_bedroom_light", "g10_stair_light_app", "g10_iot_led", "g11_classroom_lighting", "g11_bh1750_lux_meter"].includes(activeStemId)
  ) {
    const isNight = stemLightLevel < 30;
    const isSunset = stemLightLevel >= 30 && stemLightLevel <= 60;
    const isBedroom = activeStemId === "g10_smart_bedroom_light";
    const isStair = activeStemId === "g10_stair_light_app";
    const isClassroom = activeStemId === "g11_classroom_lighting";
    const isBH1750 = activeStemId === "g11_bh1750_lux_meter";

    return (
      <div className={`w-full rounded-2xl p-4 transition-all duration-500 min-h-[230px] flex flex-col justify-between relative overflow-hidden border ${
        isNight 
          ? "bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 border-indigo-900 text-white" 
          : isSunset 
            ? "bg-gradient-to-b from-orange-950 via-amber-900 to-slate-900 border-orange-500 text-white"
            : "bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 border-sky-300 text-slate-900"
      }`}>
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-1.5">
            <Sun size={16} className={isNight ? "text-slate-400" : isSunset ? "text-amber-200" : "text-amber-500 animate-spin"} />
            <span>Môi trường: {isNight ? "Trời Tối (Sẩm Đêm)" : isSunset ? "Hoàng Hôn" : "Ban Ngày Rực Rỡ"}</span>
          </div>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-black/30 border border-white/20 text-white">
            {isBH1750 ? `BH1750 Lux: ${stemLightLevel * 10} Ix` : `LDR Lux: ${stemLightLevel}%`}
          </span>
        </div>

        <div className="my-3 flex items-center justify-around relative z-10">
          {/* Visual House / Room Structure */}
          <div className="relative flex flex-col items-center">
            <div className={`w-0 h-0 border-l-[40px] border-r-[40px] border-b-[28px] border-l-transparent border-r-transparent ${isNight ? "border-b-indigo-800" : "border-b-amber-700"}`} />
            <div className={`w-24 h-16 ${isNight ? "bg-slate-900" : "bg-amber-100"} border-2 border-slate-700 rounded-b-md flex items-center justify-around p-2 relative shadow-inner`}>
              <div className={`w-6 h-6 rounded-md border transition-all ${
                isNight 
                  ? isBedroom 
                    ? "bg-amber-300 border-amber-200 shadow-[0_0_15px_#f59e0b]" 
                    : "bg-amber-400 border-amber-300 shadow-[0_0_18px_#f59e0b]" 
                  : "bg-sky-200 border-sky-300"
              }`} />
              <div className={`w-6 h-6 rounded-md border transition-all ${
                isNight && (isStair || isClassroom)
                  ? "bg-sky-300 border-sky-200 shadow-[0_0_15px_#38bdf8]" 
                  : "bg-slate-700/50 border-slate-600"
              }`} />
            </div>
          </div>

          {/* Light Bulb / WS2812B LED Graphic */}
          <div className="flex flex-col items-center relative">
            {isNight && (
              <div className="absolute -top-6 w-28 h-28 bg-amber-400/30 rounded-full blur-xl animate-pulse pointer-events-none" />
            )}
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-20 ${
              isNight
                ? isBedroom
                  ? "bg-amber-300 border-amber-100 shadow-[0_0_30px_#f59e0b] text-amber-950"
                  : isStair
                    ? "bg-pink-400 border-pink-200 shadow-[0_0_30px_#ec4899] text-white"
                    : "bg-amber-300 border-amber-200 shadow-[0_0_25px_#f59e0b] text-slate-900"
                : "bg-slate-300 border-slate-400 text-slate-500"
            }`}>
              <Sun size={20} className={isNight ? "animate-pulse" : ""} />
            </div>
            <div className="w-2 h-14 bg-slate-700 rounded-t-sm" />
            <div className="w-10 h-2 bg-slate-800 rounded-full" />
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Rơ-le / Xung PWM Đèn:</span>
          {isNight ? (
            <span className="text-amber-300 bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-400/50 flex items-center gap-1.5 animate-pulse">
              🌟 RƠ-LE ĐÃ BẬT ({isBedroom ? "Chế độ Vàng Dịu 20%" : isStair ? "Hiệu ứng Đuổi Màu WS2812B" : "Cung cấp nguồn cho Đèn"})
            </span>
          ) : (
            <span className="text-slate-400 bg-black/40 px-3 py-1 rounded-lg">
              🌙 RƠ-LE NGẮT (Ánh sáng tự nhiên đạt chuẩn)
            </span>
          )}
        </div>
      </div>
    );
  }

  // 2. Fire, Flame, Temperature & Fan Projects (smarthome_fire, g10_fire_alarm_bot, g12_fire_fighting_bot)
  if (["smarthome_fire", "g10_fire_alarm_bot", "g12_fire_fighting_bot"].includes(activeStemId)) {
    const isAlarm = stemTemp > 40 || stemSmoke > 120;
    const isFireFightingBot = activeStemId === "g12_fire_fighting_bot";

    return (
      <div className={`w-full rounded-2xl p-4 transition-all duration-300 min-h-[230px] flex flex-col justify-between relative overflow-hidden border ${
        isAlarm ? "bg-gradient-to-b from-red-950 via-slate-950 to-red-900 border-red-600 text-white animate-pulse" : "bg-slate-900 border-slate-800 text-white"
      }`}>
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className={isAlarm ? "text-red-400 animate-bounce" : "text-emerald-400"} />
            <span>{isFireFightingBot ? "Robot Chữa Cháy Phun Nước Dập Lửa" : "Giám Sát An Toàn PCCC Nhà Thông Minh"}</span>
          </div>
          <div className="flex gap-2 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded-md bg-white/10">{stemTemp}°C</span>
            <span className="px-2 py-0.5 rounded-md bg-white/10">{stemSmoke} ppm Khói</span>
          </div>
        </div>

        <div className="my-3 grid grid-cols-3 gap-3 items-center text-center relative z-10">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex flex-col items-center">
            <Thermometer size={22} className={stemTemp > 40 ? "text-red-500 animate-bounce" : "text-blue-400"} />
            <span className="text-[10px] text-slate-400 mt-1">Cảm biến DHT11</span>
            <span className="text-xs font-black font-mono mt-0.5">{stemTemp}°C</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex flex-col items-center relative overflow-hidden">
            {stemSmoke > 50 && (
              <div className="absolute inset-0 bg-slate-400/20 backdrop-blur-xs flex items-center justify-center animate-pulse">
                <span className="text-[10px] font-mono text-amber-300">💨 Khói bốc lên</span>
              </div>
            )}
            <Flame size={22} className={stemSmoke > 120 ? "text-amber-500 animate-bounce" : "text-slate-500"} />
            <span className="text-[10px] text-slate-400 mt-1">Cảm biến Flame/MQ-2</span>
            <span className="text-xs font-black font-mono mt-0.5">{stemSmoke} ppm</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex flex-col items-center transition-all ${
            isAlarm ? "bg-red-600/30 border-red-500/80 text-red-200" : "bg-white/5 border-white/10 text-slate-400"
          }`}>
            <Fan size={22} className={isAlarm ? "animate-spin text-red-400" : ""} />
            <span className="text-[10px] mt-1 font-bold">{isFireFightingBot ? "Bơm Áp Lực 12V" : "Quạt Hút Khói RUN"}</span>
            <span className="text-[10px] font-black">{isAlarm ? "🚨 PHUN NƯỚC/HÚ CÒI" : "An Toàn"}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Trạng thái Hệ Thống:</span>
          {isAlarm ? (
            <span className="text-red-300 bg-red-600/40 px-3 py-1 rounded-lg border border-red-500 animate-bounce">
              🚨 BÁO ĐỘNG CHÁY! KÍCH HOẠT CÒI &amp; BƠM PHUN NƯỚC
            </span>
          ) : (
            <span className="text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/30">
              🛡️ Bình thường - Nhiệt độ &amp; Khói trong ngưỡng an toàn
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. Smart Garden & Agriculture Projects (agritech_garden, g11_greenhouse_irrigation, g11_farm_dashboard, g11_group_smart_farm)
  if (["agritech_garden", "g11_greenhouse_irrigation", "g11_farm_dashboard", "g11_group_smart_farm"].includes(activeStemId)) {
    const isWatering = stemSoil < 35;
    return (
      <div className="w-full rounded-2xl p-4 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white min-h-[230px] flex flex-col justify-between border border-teal-800/60 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Droplets size={16} className={isWatering ? "text-teal-400 animate-bounce" : "text-emerald-400"} />
            <span>Hệ Thống Nông Nghiệp Thông Minh Smart Garden</span>
          </div>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Độ ẩm đất: {stemSoil}%
          </span>
        </div>

        <div className="my-2 flex items-center justify-center gap-10 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-3 bg-slate-700 rounded-full border border-slate-600 flex items-center justify-end px-2">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
            </div>
            {isWatering ? (
              <div className="flex flex-col items-center my-1 space-y-1 animate-bounce">
                <Droplets size={16} className="text-teal-300 fill-teal-400" />
                <Droplets size={12} className="text-teal-200 fill-teal-300" />
              </div>
            ) : (
              <div className="h-8 flex items-center justify-center">
                <span className="text-[10px] text-slate-500 font-mono">--- Bơm Khóa ---</span>
              </div>
            )}
            <span className="text-[10px] font-extrabold text-teal-300 mt-0.5">Bơm Nước Mini 5V</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`text-2xl transition-all duration-300 ${isWatering ? "scale-110 rotate-3" : "scale-100"}`}>
              🌱
            </div>
            <div className={`w-24 h-10 rounded-b-xl border border-amber-900 flex items-center justify-center font-mono text-[10px] ${
              isWatering ? "bg-amber-950 text-teal-200 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.3)]" : "bg-amber-900 text-amber-200"
            }`}>
              {isWatering ? "Đất đang được tưới" : stemSoil >= 60 ? "Đất đủ độ ẩm" : "Đất hơi khô"}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Trạng Thái Rơ-Le Máy Bơm:</span>
          {isWatering ? (
            <span className="text-teal-300 bg-teal-500/30 px-3 py-1 rounded-lg border border-teal-400/50 animate-pulse">
              💦 MÁY BƠM ĐANG CHẠY (Tưới nước cho tới khi độ ẩm &gt; 60%)
            </span>
          ) : (
            <span className="text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg">
              🌱 ĐÃ TẮT BƠM (Độ ẩm đất đủ điều kiện sinh trưởng)
            </span>
          )}
        </div>
      </div>
    );
  }

  // 4. Water Level, Quality & Rain Alarm Projects (g10_water_level_alert, g11_water_quality_monitor, g11_farm_rain_alarm)
  if (["g10_water_level_alert", "g11_water_quality_monitor", "g11_farm_rain_alarm"].includes(activeStemId)) {
    const isWaterQuality = activeStemId === "g11_water_quality_monitor";
    const isRain = activeStemId === "g11_farm_rain_alarm";
    const waterLevel = stemSoil; // reuse soil slider as level

    return (
      <div className="w-full rounded-2xl p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-cyan-950 text-white min-h-[230px] flex flex-col justify-between border border-cyan-800/60 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-cyan-400" />
            <span>{isWaterQuality ? "Giám Sát Chất Lượng Nước TDS & pH" : isRain ? "Cảnh Báo Mưa Phơi Nông Sản" : "Hệ Thống Cảnh Báo Mực Nước Bồn Chứa"}</span>
          </div>
          <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {isWaterQuality ? "TDS: 180 ppm | pH 7.2" : isRain ? `Cảm biến Mưa: ${stemLightLevel < 40 ? "TRỜI MƯA" : "KHÔ RÁO"}` : `Mực Nước: ${waterLevel}%`}
          </span>
        </div>

        <div className="my-2 flex items-center justify-around relative z-10">
          {/* Tank Graphic */}
          <div className="w-24 h-20 bg-slate-900 border-2 border-cyan-500/80 rounded-b-xl relative overflow-hidden flex flex-col justify-end p-1">
            <div className="bg-cyan-500/40 border-t border-cyan-300 w-full transition-all duration-500 rounded-b-lg flex items-center justify-center font-mono text-[9px] font-bold" style={{ height: `${waterLevel}%` }}>
              {waterLevel}%
            </div>
          </div>

          <div className="flex flex-col items-center bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-cyan-300 font-bold">OLED MONITOR</span>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">
              {isWaterQuality ? "DRINKABLE OK" : isRain ? (stemLightLevel < 40 ? "🌧️ RAIN DETECTED!" : "☀️ DRY WEATHER") : (waterLevel > 80 ? "🚨 TANK FULL!" : "WATER LEVEL OK")}
            </div>
            <span className="text-[9px] text-slate-400 mt-0.5">Báo hiệu Rơ-le / Còi</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Trạng Thái Cảnh Báo:</span>
          {waterLevel > 80 || stemLightLevel < 40 ? (
            <span className="text-amber-300 bg-amber-500/30 px-3 py-1 rounded-lg border border-amber-400 animate-pulse">
              🚨 BÁO ĐỘNG - KÍCH HOẠT CÒI / RƠ-LE BƠM
            </span>
          ) : (
            <span className="text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg">
              🟢 Mực nước &amp; Cảm biến hoạt động bình thường
            </span>
          )}
        </div>
      </div>
    );
  }

  // 5. Smart Curtains (smarthome_curtain)
  if (activeStemId === "smarthome_curtain") {
    const isOpen = 30 <= stemSunlight && stemSunlight <= 80;
    return (
      <div className="w-full rounded-2xl p-4 bg-slate-900 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-amber-400" />
            <span>Rèm Cửa Tự Động Động Cơ Servo SG90</span>
          </div>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Nắng: {stemSunlight}%
          </span>
        </div>

        <div className="my-2 relative w-full h-24 bg-sky-300 rounded-xl border-2 border-slate-700 overflow-hidden flex justify-between items-center px-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Sun size={36} className="text-amber-500 animate-spin" />
              <span className="text-[9px] font-bold text-slate-800 bg-white/80 px-2 py-0.5 rounded-md mt-1">Cảnh quan ngoài trời</span>
            </div>
          </div>

          <div className={`absolute left-0 top-0 bottom-0 bg-indigo-900 border-r-2 border-indigo-700 transition-all duration-500 flex items-center justify-center ${
            isOpen ? "w-8" : "w-1/2"
          }`}>
            <span className="text-[9px] text-indigo-200 rotate-90 font-mono">Rèm Trái</span>
          </div>

          <div className={`absolute right-0 top-0 bottom-0 bg-indigo-900 border-l-2 border-indigo-700 transition-all duration-500 flex items-center justify-center ${
            isOpen ? "w-8" : "w-1/2"
          }`}>
            <span className="text-[9px] text-indigo-200 -rotate-90 font-mono">Rèm Phải</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Góc Quay Động Cơ Servo:</span>
          {isOpen ? (
            <span className="text-amber-300 bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-400/50">
              🪟 SERVO XOAY 90° - MỞ RÈM ĐÓN ÁNH SÁNG
            </span>
          ) : (
            <span className="text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              🔒 SERVO XOAY 0° - ĐÓNG RÈM BẢO VỆ
            </span>
          )}
        </div>
      </div>
    );
  }

  // 6. Doors, Locks, RFID & Security Projects (g10_auto_door, g10_smart_lock, g10_rfid_door, g10_burglar_alarm, g12_security_bot)
  if (
    ["g10_auto_door", "g10_smart_lock", "g10_rfid_door", "g10_burglar_alarm", "g12_security_bot"].includes(activeStemId)
  ) {
    const isPIRDoor = activeStemId === "g10_auto_door";
    const isRFID = activeStemId === "g10_rfid_door";
    const isBurglar = activeStemId === "g10_burglar_alarm" || activeStemId === "g12_security_bot";

    const isUnlocked = stemLockUnlocked || stemHandDist < 15 || stemCarDist < 15;

    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-indigo-900/60 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-indigo-400" />
            <span>{isBurglar ? "Hệ Thống An Ninh Chống Trộm Telegram / Siren" : isRFID ? "Cửa Từ Xác Minh Thẻ RFID RC522" : isPIRDoor ? "Cửa Kính Tự Động Cảm Biến PIR" : "Khóa Cửa Thông Minh Bàn Phím Keypad"}</span>
          </div>
          <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
            isUnlocked ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"
          }`}>
            {isUnlocked ? "🔓 CỬA MỞ / XÁC THỰC" : "🔒 ĐÓNG CHỐT KHÓA"}
          </span>
        </div>

        <div className="my-2 flex items-center justify-around bg-slate-900/90 p-3 rounded-xl border border-slate-800 relative z-10">
          {/* Keypad or RFID Graphic */}
          <div className="bg-slate-950 border border-indigo-500/50 p-2 rounded-lg text-center">
            <span className="text-[9px] font-mono text-indigo-300 font-bold block">{isRFID ? "MFRC522 RFID" : "KEYPAD 4x4"}</span>
            <div className="text-lg my-1">{isRFID ? "💳" : "🔢"}</div>
            <span className="text-[8px] font-mono text-slate-400">{isUnlocked ? "UID: A1 B2 C3" : "PASS: ****"}</span>
          </div>

          {/* Door Frame Graphic */}
          <div className="w-28 h-18 bg-slate-800 border-2 border-slate-600 rounded-md relative flex items-center overflow-hidden p-1">
            <div className={`absolute top-0 bottom-0 left-0 w-1/2 bg-indigo-950 border-r border-indigo-500 transition-transform duration-500 ${
              isUnlocked ? "-translate-x-full" : "translate-x-0"
            }`} />
            <div className={`absolute top-0 bottom-0 right-0 w-1/2 bg-indigo-950 border-l border-indigo-500 transition-transform duration-500 ${
              isUnlocked ? "translate-x-full" : "translate-x-0"
            }`} />
            <div className="w-full text-center text-[10px] font-bold text-emerald-300 z-10">
              {isUnlocked ? "MỜI VÀO!" : "KHÓA AN TOÀN"}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Trạng Thái Solenoid / Servo:</span>
          {isUnlocked ? (
            <span className="text-emerald-300 bg-emerald-500/30 px-3 py-1 rounded-lg border border-emerald-400">
              🟢 CHỐT MỞ THÀNH CÔNG (Relay kích nguồn 12V)
            </span>
          ) : (
            <span className="text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              🔴 Đang giữ chốt khóa an toàn
            </span>
          )}
        </div>
      </div>
    );
  }

  // 7. Fans, Temperature & Air Systems (g10_auto_fan, g11_humidity_fan, g11_lab_temp_monitor, g11_wind_speed_alert)
  if (["g10_auto_fan", "g11_humidity_fan", "g11_lab_temp_monitor", "g11_wind_speed_alert"].includes(activeStemId)) {
    const isWind = activeStemId === "g11_wind_speed_alert";
    const isFanRunning = stemTemp > 30 || stemSoil > 70;

    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Fan size={16} className={isFanRunning ? "text-cyan-400 animate-spin" : "text-slate-400"} />
            <span>{isWind ? "Cảnh Báo Tốc Độ Gió Anung Kế" : "Hệ Thống Quạt Tự Động Theo Môi Trường"}</span>
          </div>
          <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
            {isWind ? `Tốc độ gió: ${stemLightLevel / 5} m/s` : `Nhiệt độ/Độ ẩm: ${stemTemp}°C`}
          </span>
        </div>

        <div className="my-2 flex items-center justify-around relative z-10">
          <div className="flex flex-col items-center">
            <Fan size={48} className={`transition-all ${isFanRunning ? "text-cyan-300 animate-spin" : "text-slate-600"}`} />
            <span className="text-[10px] font-mono text-cyan-400 font-bold mt-1">Động cơ DC 12V</span>
          </div>

          <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl text-center">
            <span className="text-[9px] font-mono text-slate-400 block">DHT11 / ANEMOMETER</span>
            <div className="text-sm font-black font-mono text-cyan-300 my-1">
              {isFanRunning ? "RPM: 2400 HIGH" : "STANDBY 0 RPM"}
            </div>
            <span className="text-[9px] text-emerald-400">{isFanRunning ? "Đang thông gió..." : "Tắt tiết kiệm điện"}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Rơ-le Động Cơ Quạt:</span>
          {isFanRunning ? (
            <span className="text-cyan-300 bg-cyan-500/30 px-3 py-1 rounded-lg border border-cyan-400 animate-pulse">
              🌀 QUẠT ĐANG BẬT LÀM MÁT KHÔNG KHÍ
            </span>
          ) : (
            <span className="text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              💤 Tắt quạt (Nhiệt độ / Độ ẩm dưới ngưỡng)
            </span>
          )}
        </div>
      </div>
    );
  }

  // 8. Traffic Light (traffic_light)
  if (activeStemId === "traffic_light") {
    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Car size={16} className={stemEmergency ? "text-red-400 animate-bounce" : "text-blue-400"} />
            <span>Đèn Giao Thông Thông Minh Ưu Tiên Xe Cấp Cứu</span>
          </div>
          <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
            stemEmergency ? "bg-red-600 text-white animate-pulse" : "bg-emerald-500/20 text-emerald-300"
          }`}>
            {stemEmergency ? "🚨 ƯU TIÊN CẤP CỨU" : "Chế độ Chu Kỳ Sáng"}
          </span>
        </div>

        <div className="my-2 flex items-center justify-around relative z-10">
          <div className="bg-slate-900 border-2 border-slate-700 p-2 rounded-xl flex flex-col gap-2 items-center shadow-lg">
            <div className={`w-5 h-5 rounded-full border ${!stemEmergency ? "bg-red-600 border-red-400 shadow-[0_0_10px_#dc2626]" : "bg-slate-800 border-slate-700"}`} />
            <div className={`w-5 h-5 rounded-full border ${!stemEmergency ? "bg-amber-500/20 border-slate-700" : "bg-slate-800 border-slate-700"}`} />
            <div className={`w-5 h-5 rounded-full border ${stemEmergency ? "bg-emerald-500 border-emerald-400 shadow-[0_0_15px_#10b981] animate-pulse" : "bg-slate-800 border-slate-700"}`} />
          </div>

          <div className="flex flex-col items-center">
            {stemEmergency ? (
              <div className="p-3 bg-red-950/80 border border-red-500 rounded-2xl flex items-center gap-3 animate-pulse">
                <span className="text-2xl">🚑</span>
                <div className="text-left">
                  <div className="text-xs font-black text-red-300">Xe Cấp Cứu Tiến Đến!</div>
                  <div className="text-[10px] text-emerald-300 font-mono">Đèn Xanh Mở Tức Thì</div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">🚗</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-300">Phương Tiện Thường</div>
                  <div className="text-[10px] text-slate-500 font-mono">Dừng khi Đèn Đỏ</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Tín Hiệu Luồng Giao Thông:</span>
          {stemEmergency ? (
            <span className="text-emerald-300 bg-emerald-600/30 px-3 py-1 rounded-lg border border-emerald-400 animate-pulse">
              🟢 ĐÈN XANH ƯU TIÊN - TẮT TẤT CẢ LUỒNG CẮT NGANG
            </span>
          ) : (
            <span className="text-amber-300 bg-amber-500/20 px-3 py-1 rounded-lg">
              🚦 CHẠY THEO CHU KỲ TỰ ĐỘNG (Đỏ 30s - Xanh 30s)
            </span>
          )}
        </div>
      </div>
    );
  }

  // 9. Smart Parking (smart_parking)
  if (activeStemId === "smart_parking") {
    const isNear = stemCarDist < 15;
    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Car size={16} className="text-indigo-400" />
            <span>Bãi Đỗ Xe Thông Minh Barrier Tự Động</span>
          </div>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Khoảng cách siêu âm: {stemCarDist} cm
          </span>
        </div>

        <div className="my-2 flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 relative z-10">
          <div className="bg-emerald-950 border border-emerald-500/60 text-emerald-300 font-mono p-2 rounded-lg text-[10px] leading-tight">
            <div>[LCD 16x2 MONITOR]</div>
            <div className="font-bold text-white mt-0.5">SLOT FREE: 04/10</div>
            <div className="text-emerald-400">{isNear ? "WELCOME IN!" : "WAITING CAR..."}</div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`transition-all duration-300 text-2xl ${isNear ? "translate-x-0" : "-translate-x-4 opacity-70"}`}>
              🚘
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-20 h-2 bg-gradient-to-r from-red-500 via-white to-red-500 rounded-full transition-transform duration-500 origin-left ${
                isNear ? "-rotate-45" : "rotate-0"
              }`} />
              <div className="w-4 h-10 bg-slate-700 rounded-b-md mt-1" />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Thanh Barrier:</span>
          {isNear ? (
            <span className="text-indigo-300 bg-indigo-500/30 px-3 py-1 rounded-lg border border-indigo-500/40">
              🚧 NÂNG BARRIER (Phát hiện xe gần {stemCarDist}cm)
            </span>
          ) : (
            <span className="text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              🛑 HẠ BARRIER (Xe chưa vào vị trí nhận diện)
            </span>
          )}
        </div>
      </div>
    );
  }

  // 10. AGVs, Line Followers, Robots & Autonomous Delivery (line_follower, g11_adv_line_follower, g10_distance_bot, g11_patrol_bot, g12_mini_delivery_bot, g12_stair_climbing_bot, g12_soccer_bot)
  if (
    ["line_follower", "g11_adv_line_follower", "g10_distance_bot", "g11_patrol_bot", "g12_mini_delivery_bot", "g12_stair_climbing_bot", "g12_soccer_bot"].includes(activeStemId)
  ) {
    const isDelivery = activeStemId === "g12_mini_delivery_bot";
    const isSoccer = activeStemId === "g12_soccer_bot";

    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-blue-400 animate-pulse" />
            <span>{isDelivery ? "Robot Giao Hàng Mini Đa Điểm" : isSoccer ? "Robot Bóng Đá Bánh Xe Omni 360°" : "Xe Robot Dò Đường Theo Vạch Đen (Line Follower PID)"}</span>
          </div>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
            {isSoccer ? "Bánh xe Omni 360" : "Cảm biến Hồng Ngoại IR PID"}
          </span>
        </div>

        <div className="my-2 relative w-full h-24 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
          <div className={`absolute top-0 bottom-0 w-8 bg-slate-950 transition-all duration-300 ${
            stemLinePos === "left" ? "left-12" : stemLinePos === "right" ? "right-12" : "left-1/2 -translate-x-1/2"
          }`} />

          <div className={`w-28 h-16 bg-blue-900 border-2 border-blue-400 rounded-xl shadow-lg relative z-10 flex flex-col justify-between p-1.5 transition-transform duration-300 ${
            stemLinePos === "left" ? "-rotate-12" : stemLinePos === "right" ? "rotate-12" : "rotate-0"
          }`}>
            <div className="flex justify-between items-center px-1">
              <span className="text-[8px] font-mono text-emerald-300 bg-black/40 px-1 rounded">IR-L</span>
              <span className="text-[8px] font-mono text-emerald-300 bg-black/40 px-1 rounded">IR-R</span>
            </div>
            <div className="text-[9px] font-black text-center text-white">{isDelivery ? "DELIVERY BOT" : "ROBOT AGV"}</div>
            <div className="flex justify-between items-center text-[8px] font-mono text-slate-300">
              <span>L: {stemLinePos === "right" ? "100%" : "30%"}</span>
              <span>R: {stemLinePos === "left" ? "100%" : "30%"}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Điều Khiển Động Cơ L298N / TB6612:</span>
          <span className="text-blue-300 bg-blue-500/20 px-3 py-1 rounded-lg border border-blue-400/30">
            {stemLinePos === "left" ? "🤖 QUAY TRÁI (Motor Phải tăng tốc)" : stemLinePos === "right" ? "🤖 QUAY PHẢI (Motor Trái tăng tốc)" : "🤖 CHẠY THẲNG (2 Motor đều tốc)"}
          </span>
        </div>
      </div>
    );
  }

  // 11. Smart Trash Bin (smart_trash, g12_trash_picker_bot)
  if (activeStemId === "smart_trash" || activeStemId === "g12_trash_picker_bot") {
    const isOpen = stemHandDist < 15;
    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Trash2 size={16} className="text-emerald-400" />
            <span>Thùng Rác Thông Minh Tự Động Mở Nắp Servo</span>
          </div>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Siêu âm: {stemHandDist} cm
          </span>
        </div>

        <div className="my-2 flex items-center justify-center gap-8 relative z-10">
          <div className={`transition-all duration-300 flex flex-col items-center ${isOpen ? "scale-110 text-emerald-400" : "opacity-60"}`}>
            <span className="text-2xl">🖐️</span>
            <span className="text-[10px] font-mono mt-1">Bàn tay người</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-20 h-3 bg-emerald-600 rounded-t-md transition-transform duration-300 origin-right ${
              isOpen ? "-rotate-45" : "rotate-0"
            }`} />
            <div className="w-18 h-16 bg-slate-800 border-2 border-emerald-700 rounded-b-xl flex items-center justify-center text-xs font-bold text-emerald-300">
              🗑️ STEM
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Trạng Thái Nắp Thùng Rác:</span>
          {isOpen ? (
            <span className="text-emerald-300 bg-emerald-500/30 px-3 py-1 rounded-lg border border-emerald-400 animate-pulse">
              🗑️ MỞ NẮP (Giữ 3 giây sau khi xả rác)
            </span>
          ) : (
            <span className="text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              🔒 ĐÓNG NẮP (Giữ vệ sinh &amp; chống mùi)
            </span>
          )}
        </div>
      </div>
    );
  }

  // 12. Auto Sanitizer (auto_sanitizer)
  if (activeStemId === "auto_sanitizer") {
    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-teal-400" />
            <span>Máy Rửa Tay Sát Khuẩn Tự Động Khôn Tiếp Xúc</span>
          </div>
          <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
            stemSanitizerPresent ? "bg-teal-500/30 text-teal-300 border border-teal-400" : "bg-slate-800 text-slate-400"
          }`}>
            {stemSanitizerPresent ? "Cảm biến IR: CÓ TAY" : "Cảm biến IR: TRỐNG"}
          </span>
        </div>

        <div className="my-2 flex items-center justify-center gap-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-20 bg-teal-950 border-2 border-teal-500 rounded-2xl flex flex-col items-center justify-between p-2 shadow-lg">
              <div className={`w-3 h-3 rounded-full ${stemSanitizerPresent ? "bg-teal-400 animate-ping" : "bg-slate-700"}`} />
              <div className="text-[9px] font-bold text-teal-200">SAN TIZER</div>
              <div className="w-4 h-2 bg-slate-700 rounded-b-sm" />
            </div>

            {stemSanitizerPresent && (
              <div className="my-1 text-teal-300 animate-bounce flex flex-col items-center">
                <Droplets size={14} className="fill-teal-400" />
              </div>
            )}
          </div>

          <div className={`transition-all ${stemSanitizerPresent ? "scale-110 text-teal-300" : "opacity-50"}`}>
            <span className="text-3xl">🖐️</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Đầu Phun Dung Dịch:</span>
          {stemSanitizerPresent ? (
            <span className="text-teal-300 bg-teal-500/30 px-3 py-1 rounded-lg border border-teal-400 animate-pulse">
              🧼 PHUN DUNG DỊCH SÁT KHUẨN (Tự động ngắt sau 1.5s)
            </span>
          ) : (
            <span className="text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              💤 Chờ đưa tay vào vòi xịt
            </span>
          )}
        </div>
      </div>
    );
  }

  // 13. Robot Arms & Mechanical Grabbers (robot_arm, g10_grabber_bot, g12_app_robot_arm, g12_sorting_arm_bot, g12_barista_bot)
  if (["robot_arm", "g10_grabber_bot", "g12_app_robot_arm", "g12_sorting_arm_bot", "g12_barista_bot"].includes(activeStemId)) {
    const rad1 = (stemShoulderAngle * Math.PI) / 180;
    const rad2 = ((stemShoulderAngle + stemElbowAngle - 90) * Math.PI) / 180;

    const x0 = 150;
    const y0 = 160;
    const len1 = 55;
    const len2 = 45;

    const x1 = x0 + len1 * Math.cos(rad1);
    const y1 = y0 - len1 * Math.sin(rad1);

    const x2 = x1 + len2 * Math.cos(rad2);
    const y2 = y1 - len2 * Math.sin(rad2);

    return (
      <div className="w-full rounded-2xl p-4 bg-slate-950 text-white min-h-[230px] flex flex-col justify-between border border-purple-900/60 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold relative z-10">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-purple-400" />
            <span>Mô Phỏng Cánh Tay Robot 3 Khớp Servo</span>
          </div>
          <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Vai: {stemShoulderAngle}° | Khuỷu: {stemElbowAngle}°
          </span>
        </div>

        <div className="my-1 relative w-full h-32 bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 300 180">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="300" height="180" fill="url(#grid)" />

            <rect x="120" y="160" width="60" height="15" rx="4" fill="#475569" stroke="#64748b" strokeWidth="2" />
            <circle cx="150" cy="160" r="10" fill="#a855f7" />

            <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#c084fc" strokeWidth="8" strokeLinecap="round" />

            <circle cx={x1} cy={y1} r="8" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />

            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#818cf8" strokeWidth="6" strokeLinecap="round" />

            <circle cx={x2} cy={y2} r="6" fill={stemGripperClosed ? "#ef4444" : "#22c55e"} />
            <path
              d={`M ${x2 - 8} ${y2 - 6} L ${x2} ${y2 - 12} L ${x2 + 8} ${y2 - 6}`}
              fill="none"
              stroke={stemGripperClosed ? "#ef4444" : "#22c55e"}
              strokeWidth="3"
            />

            <rect x="220" y="145" width="20" height="20" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <text x="230" y="159" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">OBJ</text>
          </svg>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
          <span>Trạng Thái Tay Kẹp:</span>
          <span className="text-purple-300 bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-400/30">
            🤖 {stemGripperClosed ? "✊ ĐANG KẸP GIỮ VẬT THỂ" : "🖐️ MỞ TAY KẸP SẴN SÀNG"}
          </span>
        </div>
      </div>
    );
  }

  // Universal Dynamic 2D Visual Circuit & Hardware Simulator for all other projects
  const currentProj = STEM_PROJECTS.find((p) => p.id === activeStemId) || STEM_PROJECTS[0];
  const gradeBadge = currentProj.grade === "10" ? "Khối 10 (Cơ bản)" : currentProj.grade === "11" ? "Khối 11 (Trung cấp)" : "Khối 12 (Nâng cao)";

  return (
    <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white min-h-[230px] flex flex-col justify-between border border-slate-800 relative overflow-hidden shadow-md">
      <div className="flex items-center justify-between text-xs font-bold relative z-10 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-blue-400 animate-pulse" />
          <span className="text-blue-200 font-extrabold">{currentProj.title}</span>
        </div>
        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {gradeBadge}
        </span>
      </div>

      <div className="my-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center relative z-10">
        {/* MCU Board & 2D Circuit Schematic Animation */}
        <div className="md:col-span-7 bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
              <Zap size={12} className="text-amber-400 animate-bounce" /> Mô Phỏng Mạch Điện 2D &amp; Linh Kiện GPIO
            </span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              ● POWER 5V / 3.3V ON
            </span>
          </div>

          {/* 2D Interactive Circuit Visual Canvas */}
          <div className="relative w-full h-24 bg-slate-950 rounded-lg border border-slate-800 p-2 overflow-hidden flex items-center justify-between px-3">
            {/* MCU Board SVG */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-16 bg-blue-900/90 border-2 border-blue-400 rounded-md flex flex-col items-center justify-between p-1 shadow-md">
                <span className="text-[7px] font-mono text-white font-bold">ARDUINO/ESP</span>
                <div className="w-3 h-3 bg-black rounded-xs border border-blue-300 animate-pulse" />
                <span className="text-[6px] font-mono text-emerald-300">USB 5V</span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 mt-0.5">Vi Xử Lý chính</span>
            </div>

            {/* Signal Wires SVG Animation */}
            <div className="flex-1 px-2 flex flex-col justify-center gap-1">
              <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 animate-pulse" />
              <div className="h-0.5 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-teal-400 animate-pulse" />
              <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-400 animate-pulse" />
            </div>

            {/* Active Sensor / Actuator Graphic */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-950/90 border-2 border-emerald-500 rounded-lg flex flex-col items-center justify-center p-1 relative text-center">
                <span className="text-xl">⚡</span>
                <span className="text-[8px] font-mono font-bold text-emerald-300 line-clamp-1">
                  {currentProj.hardware[1] || currentProj.hardware[0]}
                </span>
                <span className="text-[7px] font-mono text-amber-300">SIGNAL: {stemLightLevel}%</span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 mt-0.5">Cảm Biến / Thiết Bị</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-300 bg-slate-950/70 p-2 rounded-lg border border-slate-800 leading-relaxed">
            💡 <strong className="text-blue-300">Nguyên lý hoạt động 2D:</strong> {currentProj.shortDesc}
          </div>
        </div>

        {/* Real-time Telemetry Monitor Console */}
        <div className="md:col-span-5 bg-black/90 border border-emerald-900/80 rounded-xl p-3 text-emerald-400 font-mono text-[10px] h-36 overflow-y-auto space-y-1">
          <div className="text-slate-500 border-b border-slate-800 pb-1 flex justify-between font-bold">
            <span>SERIAL MONITOR (9600 baud)</span>
            <span className="text-emerald-500 animate-pulse">2D LIVE</span>
          </div>
          <div>[SYSTEM] Initializing GPIO pins... DONE</div>
          <div>[SENSOR] Reading telemetry signals: {stemLightLevel}%...</div>
          <div className="text-emerald-300">[STATUS] Operational state: ACTIVE</div>
          <div className="text-amber-300">[APP] {currentProj.realWorldApp}</div>
          <div className="text-cyan-300 animate-pulse">&gt; Executing Blockly logic loop...</div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10">
        <span className="text-slate-400">Trạng Thái Mô Phỏng Hardware 2D:</span>
        <span className="text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
          <Activity size={14} className="text-emerald-400 animate-spin" />
          <span>Mô Phỏng 2D Sẵn Sàng – Nạp Code &amp; Chạy Test Trực Quan</span>
        </span>
      </div>
    </div>
  );
}

// Helper function to generate wiring connection pinouts for STEM projects
export interface PinConnectionItem {
  moduleName: string;
  modulePin: string;
  arduinoPin: string;
  voltage: string;
  wireColor: "Đỏ" | "Đen" | "Xanh Dương" | "Xanh Lá" | "Vàng" | "Cam" | "Trắng";
  wireColorHex: string;
  note: string;
}

export function generateWiringConnections(project: { hardware: string[] }): PinConnectionItem[] {
  const list: PinConnectionItem[] = [];
  const hw = project.hardware;

  hw.forEach((item) => {
    const itemLower = item.toLowerCase();

    if (itemLower.includes("màn hình lcd") || itemLower.includes("lcd1602")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn 5V nuôi màn hình LCD" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "Chân đất chung" },
        { moduleName: item, modulePin: "SDA", arduinoPin: "A4 (SDA)", voltage: "5V", wireColor: "Xanh Dương", wireColorHex: "#3b82f6", note: "Tín hiệu I2C Data" },
        { moduleName: item, modulePin: "SCL", arduinoPin: "A5 (SCL)", voltage: "5V", wireColor: "Trắng", wireColorHex: "#94a3b8", note: "Tín hiệu I2C Clock" }
      );
    } else if (itemLower.includes("oled")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "3.3V / 5V", voltage: "3.3V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn nuôi màn hình OLED 0.96 inch" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "Chân đất chung" },
        { moduleName: item, modulePin: "SDA", arduinoPin: "A4 (SDA / GPIO21)", voltage: "3.3V", wireColor: "Xanh Dương", wireColorHex: "#3b82f6", note: "Giao tiếp I2C Dữ liệu" },
        { moduleName: item, modulePin: "SCL", arduinoPin: "A5 (SCL / GPIO22)", voltage: "3.3V", wireColor: "Trắng", wireColorHex: "#94a3b8", note: "Giao tiếp I2C Xung clock" }
      );
    } else if (itemLower.includes("độ ẩm đất")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Cấp nguồn 5V cảm biến đất" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "Nối chung đất hệ thống" },
        { moduleName: item, modulePin: "AO (Analog Out)", arduinoPin: "A0", voltage: "5V", wireColor: "Vàng", wireColorHex: "#eab308", note: "Đọc điện áp ADC tương tự 0 - 1023" }
      );
    } else if (itemLower.includes("máy bơm") || itemLower.includes("bơm")) {
      list.push(
        { moduleName: item, modulePin: "Cực Dương (+)", arduinoPin: "Qua tiếp điểm NO của Rơ-le 5V", voltage: "5V/12V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn động cơ bơm ngắt qua rơ le" },
        { moduleName: item, modulePin: "Cực Âm (-)", arduinoPin: "GND Nguồn Bơm", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "Nối chung GND toàn mạch" }
      );
    } else if (itemLower.includes("relay") || itemLower.includes("rơ-le") || itemLower.includes("rơ le")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn nuôi rơ-le" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "Chân đất chung" },
        { moduleName: item, modulePin: "IN1", arduinoPin: "D7 (hoặc D4)", voltage: "5V", wireColor: "Xanh Lá", wireColorHex: "#22c55e", note: "Tín hiệu kích đóng ngắt rơ le" }
      );
    } else if (itemLower.includes("ldr") || itemLower.includes("quang trở") || itemLower.includes("ánh sáng")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Cấp nguồn 5V" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "Qua điện trở kéo 10kΩ xuống đất" },
        { moduleName: item, modulePin: "AO / Signal", arduinoPin: "A0", voltage: "5V", wireColor: "Vàng", wireColorHex: "#eab308", note: "Tín hiệu ánh sáng ADC" }
      );
    } else if (itemLower.includes("dht11") || itemLower.includes("nhiệt độ")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn nuôi cảm biến nhiệt ẩm" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND chung" },
        { moduleName: item, modulePin: "DATA", arduinoPin: "D2", voltage: "5V", wireColor: "Xanh Lá", wireColorHex: "#22c55e", note: "Dữ liệu Single-Wire kèm trở 10kΩ" }
      );
    } else if (itemLower.includes("mq-2") || itemLower.includes("khói") || itemLower.includes("gas")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn 5V sấy dây đốt cảm biến" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND chung" },
        { moduleName: item, modulePin: "AO", arduinoPin: "A1", voltage: "5V", wireColor: "Cam", wireColorHex: "#f97316", note: "Đọc nồng độ khói Analog 0-1023" },
        { moduleName: item, modulePin: "DO", arduinoPin: "D3", voltage: "5V", wireColor: "Xanh Dương", wireColorHex: "#3b82f6", note: "Tín hiệu ngưỡng báo động Digital" }
      );
    } else if (itemLower.includes("hc-sr04") || itemLower.includes("siêu âm")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Cấp nguồn 5V" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND" },
        { moduleName: item, modulePin: "TRIG", arduinoPin: "D8", voltage: "5V", wireColor: "Xanh Dương", wireColorHex: "#3b82f6", note: "Chân phát xung sóng siêu âm" },
        { moduleName: item, modulePin: "ECHO", arduinoPin: "D9", voltage: "5V", wireColor: "Vàng", wireColorHex: "#eab308", note: "Chân nhận xung phản hồi về" }
      );
    } else if (itemLower.includes("servo") || itemLower.includes("sg90") || itemLower.includes("mg996r")) {
      list.push(
        { moduleName: item, modulePin: "VCC (Đỏ/Cam)", arduinoPin: "5V (hoặc Nguồn 5V 2A riêng)", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn nuôi động cơ Servo" },
        { moduleName: item, modulePin: "GND (Nâu/Đen)", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "BẮT BUỘC nối chung GND hệ thống" },
        { moduleName: item, modulePin: "Signal (Vàng/Cam)", arduinoPin: "D5 PWM (hoặc D6 PWM)", voltage: "5V", wireColor: "Vàng", wireColorHex: "#eab308", note: "Tín hiệu điều khiển góc Servo 50Hz" }
      );
    } else if (itemLower.includes("l298n") || itemLower.includes("cầu h")) {
      list.push(
        { moduleName: item, modulePin: "12V / VIN", arduinoPin: "Cực dương Pin / Acquy 7.4V - 12V", voltage: "VIN/12V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn công suất động cơ DC" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND Arduino & Cực âm Pin", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "Nối chung GND toàn hệ thống" },
        { moduleName: item, modulePin: "IN1, IN2", arduinoPin: "D4, D5", voltage: "5V", wireColor: "Cam", wireColorHex: "#f97316", note: "Điều khiển chiều quay Động cơ A" },
        { moduleName: item, modulePin: "IN3, IN4", arduinoPin: "D6, D7", voltage: "5V", wireColor: "Xanh Lá", wireColorHex: "#22c55e", note: "Điều khiển chiều quay Động cơ B" }
      );
    } else if (itemLower.includes("rfid") || itemLower.includes("mfrc522") || itemLower.includes("rc522")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "3.3V (**LƯU Ý: KHÔNG NỐI 5V!**)", voltage: "3.3V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn chuẩn 3.3V" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND" },
        { moduleName: item, modulePin: "RST", arduinoPin: "D9", voltage: "3.3V", wireColor: "Trắng", wireColorHex: "#94a3b8", note: "Chân Reset" },
        { moduleName: item, modulePin: "SDA (SS)", arduinoPin: "D10", voltage: "3.3V", wireColor: "Xanh Dương", wireColorHex: "#3b82f6", note: "SPI Slave Select" },
        { moduleName: item, modulePin: "MOSI", arduinoPin: "D11", voltage: "3.3V", wireColor: "Xanh Lá", wireColorHex: "#22c55e", note: "SPI Master Out" },
        { moduleName: item, modulePin: "MISO", arduinoPin: "D12", voltage: "3.3V", wireColor: "Vàng", wireColorHex: "#eab308", note: "SPI Master In" },
        { moduleName: item, modulePin: "SCK", arduinoPin: "D13", voltage: "3.3V", wireColor: "Cam", wireColorHex: "#f97316", note: "SPI Serial Clock" }
      );
    } else if (itemLower.includes("keypad") || itemLower.includes("bàn phím")) {
      list.push(
        { moduleName: item, modulePin: "Hàng 1, 2, 3, 4", arduinoPin: "D2, D3, D4, D5", voltage: "5V", wireColor: "Xanh Dương", wireColorHex: "#3b82f6", note: "Chân quét hàng Keypad" },
        { moduleName: item, modulePin: "Cột 1, 2, 3, 4", arduinoPin: "D6, D7, D8, D9", voltage: "5V", wireColor: "Xanh Lá", wireColorHex: "#22c55e", note: "Chân đọc cột Keypad" }
      );
    } else if (itemLower.includes("line") || itemLower.includes("tcrt5000") || itemLower.includes("dò vạch") || itemLower.includes("hồng ngoại")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn 5V" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND chung" },
        { moduleName: item, modulePin: "OUT1 (Trái)", arduinoPin: "D2", voltage: "5V", wireColor: "Vàng", wireColorHex: "#eab308", note: "Tín hiệu vạch đen Trái" },
        { moduleName: item, modulePin: "OUT2 (Phải)", arduinoPin: "D3", voltage: "5V", wireColor: "Xanh Dương", wireColorHex: "#3b82f6", note: "Tín hiệu vạch đen Phải" }
      );
    } else if (itemLower.includes("encoder")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn 5V" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND" },
        { moduleName: item, modulePin: "OUT / Signal", arduinoPin: "D2 (Interrupt 0)", voltage: "5V", wireColor: "Xanh Lá", wireColorHex: "#22c55e", note: "Chân ngắt D2 đếm xung đĩa quay" }
      );
    } else if (itemLower.includes("pir") || itemLower.includes("chuyển động")) {
      list.push(
        { moduleName: item, modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn 5V" },
        { moduleName: item, modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND" },
        { moduleName: item, modulePin: "OUT", arduinoPin: "D2", voltage: "5V", wireColor: "Vàng", wireColorHex: "#eab308", note: "Phát hiện người (HIGH)" }
      );
    } else if (itemLower.includes("còi") || itemLower.includes("buzzer")) {
      list.push(
        { moduleName: item, modulePin: "Chân (+)", arduinoPin: "D6", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Phát âm thanh cảnh báo" },
        { moduleName: item, modulePin: "Chân (-)", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND chung" }
      );
    }
  });

  if (list.length === 0) {
    list.push(
      { moduleName: "Cảm biến Tương tự / Số", modulePin: "VCC", arduinoPin: "5V", voltage: "5V", wireColor: "Đỏ", wireColorHex: "#ef4444", note: "Nguồn 5V" },
      { moduleName: "Cảm biến Tương tự / Số", modulePin: "GND", arduinoPin: "GND", voltage: "GND", wireColor: "Đen", wireColorHex: "#1e293b", note: "GND chung" },
      { moduleName: "Cảm biến Tương tự / Số", modulePin: "OUT", arduinoPin: "A0 / D2", voltage: "5V", wireColor: "Vàng", wireColorHex: "#eab308", note: "Chân đọc dữ liệu" }
    );
  }

  return list;
}

interface ExcelGuideProps {
  onAskTeacher: (question: string) => void;
}

export default function ExcelGuide({ onAskTeacher }: ExcelGuideProps) {
  const [activeTab, setActiveTab] = useState<"excel" | "ai" | "powerpoint" | "stem">("excel");

  // Excel State
  const [selectedFuncId, setSelectedFuncId] = useState<string>("sum");
  const activeFunc = EXCEL_FUNCTIONS_DATA.find((f) => f.id === selectedFuncId) || EXCEL_FUNCTIONS_DATA[0];

  // Editable Grid State for active function
  const [gridData, setGridData] = useState<Record<string, Record<string, string>>>({});
  const [userFormula, setUserFormula] = useState<string>("");
  const [evaluationResult, setEvaluationResult] = useState<{
    isCorrect: boolean;
    resultValue: string;
    feedback: string;
  } | null>(null);

  // Initialize or reset spreadsheet grid when active function changes
  useEffect(() => {
    if (activeFunc) {
      const initial: Record<string, Record<string, string>> = {};
      activeFunc.gridRows.forEach((row) => {
        initial[row.rowNum.toString()] = { ...row.cells };
      });
      setGridData(initial);
      setUserFormula("");
      setEvaluationResult(null);
    }
  }, [selectedFuncId]);

  // Handle cell edit directly inside the simulation spreadsheet
  const handleCellChange = (rowNum: number, col: string, newVal: string) => {
    setGridData((prev) => ({
      ...prev,
      [rowNum.toString()]: {
        ...(prev[rowNum.toString()] || {}),
        [col]: newVal
      }
    }));
  };

  // Check formula submission
  const handleCheckFormula = () => {
    if (!userFormula.trim()) {
      setEvaluationResult({
        isCorrect: false,
        resultValue: "#NO_INPUT",
        feedback: "Em chưa nhập công thức! Hãy gõ công thức Excel bắt đầu bằng dấu '=' vào ô nhé."
      });
      return;
    }

    const result = activeFunc.evaluate(userFormula, gridData);
    setEvaluationResult(result);

    // If correct, update the cell in the spreadsheet grid!
    if (result.isCorrect) {
      const targetCol = activeFunc.targetCell.col;
      const targetRow = activeFunc.targetCell.row.toString();
      setGridData((prev) => ({
        ...prev,
        [targetRow]: {
          ...(prev[targetRow] || {}),
          [targetCol]: result.resultValue
        }
      }));
    }
  };

  // Quick fill sample formula
  const handleUseSampleFormula = () => {
    setUserFormula(activeFunc.sampleCorrectFormula);
  };

  const handleAskTeacherAboutFunc = () => {
    const q = `Cô ơi, em đang thực hành hàm ${activeFunc.name} trong Excel. Cô hướng dẫn thêm cho em về cú pháp ${activeFunc.syntax} và các lỗi thường gặp khi làm bài tập này với ạ!`;
    onAskTeacher(q);
  };

  // AI Prompt Builder State
  const [aiRole, setAiRole] = useState("Cô giáo ôn thi tin học xuất sắc");
  const [aiTask, setAiTask] = useState("Giải thích thuật toán tìm kiếm nhị phân");
  const [aiFormat, setAiFormat] = useState("Giải thích thật ngắn gọn kèm ví dụ thực tế dễ hiểu nhất");

  const generatedPrompt = `Bạn đóng vai trò là một ${aiRole}. Hãy giúp tôi ${aiTask}. Hãy ${aiFormat} chi tiết nhất nhé.`;

  // PowerPoint State
  const [pptTheme, setPptTheme] = useState<string>("card");
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [copiedPptPrompt, setCopiedPptPrompt] = useState<boolean>(false);

  const currentTheme = PPT_THEMES_DATA[pptTheme] || PPT_THEMES_DATA["card"];
  const currentSlide = currentTheme.slides[activeSlideIdx] || currentTheme.slides[0];

  const handleCopyPptPrompt = () => {
    const promptText = `Hãy tạo nội dung slide PowerPoint chuẩn chủ đề "${currentTheme.label}":
- Trang: ${currentSlide.slide} - ${currentSlide.title}
- Tiêu đề phụ: ${currentSlide.subtitle}
- Mẹo thiết kế & Bố cục: ${currentSlide.hint}
- Nội dung mẫu:
${currentSlide.sampleContent.map(c => `  + ${c}`).join('\n')}
- Phối màu gợi ý: ${currentTheme.colorPaletteName}
- Font chữ gợi ý: ${currentTheme.fontRecommendation}
Hãy viết dàn ý chi tiết và kịch bản thuyết trình tiếng Việt ấn tượng cho trang slide này.`;

    navigator.clipboard.writeText(promptText);
    setCopiedPptPrompt(true);
    setTimeout(() => setCopiedPptPrompt(false), 2000);
  };

  const handleAskTeacherAboutSlide = () => {
    const q = `Cô ơi, em đang thiết kế Slide PowerPoint chủ đề "${currentTheme.label}" (Trang ${currentSlide.slide}: ${currentSlide.title}). Cô hướng dẫn em cách phối màu, chọn font chữ ${currentTheme.fontRecommendation} và cách thuyết trình nội dung này tự tin ấn tượng với ạ!`;
    onAskTeacher(q);
  };

  // STEM & Robotics State
  const [selectedStemId, setSelectedStemId] = useState<string>("g10_irrigation");
  const [selectedStemGrade, setSelectedStemGrade] = useState<"all" | "10" | "11" | "12">("all");
  const [selectedStemGroup, setSelectedStemGroup] = useState<string>("all");
  const [stemSearchQuery, setStemSearchQuery] = useState<string>("");
  const [stemCodeTab, setStemCodeTab] = useState<"wiring" | "blockly" | "arduino" | "python">("wiring");
  const [copiedCode, setCopiedCode] = useState(false);

  // STEM Inputs State
  const [stemLightLevel, setStemLightLevel] = useState<number>(20);
  const [stemTemp, setStemTemp] = useState<number>(28);
  const [stemSmoke, setStemSmoke] = useState<number>(40);
  const [stemSoil, setStemSoil] = useState<number>(25);
  const [stemSunlight, setStemSunlight] = useState<number>(50);
  const [stemEmergency, setStemEmergency] = useState<boolean>(false);
  const [stemCarDist, setStemCarDist] = useState<number>(10);
  const [stemSlots, setStemSlots] = useState<number>(4);
  const [stemLinePos, setStemLinePos] = useState<"left" | "center" | "right">("center");
  const [stemHandDist, setStemHandDist] = useState<number>(8);
  const [stemSanitizerPresent, setStemSanitizerPresent] = useState<boolean>(true);
  const [stemShoulderAngle, setStemShoulderAngle] = useState<number>(45);
  const [stemElbowAngle, setStemElbowAngle] = useState<number>(90);
  const [stemGripperClosed, setStemGripperClosed] = useState<boolean>(true);
  const [stemLockUnlocked, setStemLockUnlocked] = useState<boolean>(false);

  const activeStem = STEM_PROJECTS.find((p) => p.id === selectedStemId) || STEM_PROJECTS[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAskTeacherAboutStem = () => {
    const q = `Cô ơi, em đang nghiên cứu dự án STEM & Robotics "${activeStem.title}". Cô hướng dẫn thêm cho em về nguyên lý cảm biến, cách đấu nối linh kiện ${activeStem.hardware.join(", ")} và các lỗi thường gặp khi nạp code bài này với ạ!`;
    onAskTeacher(q);
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-5" id="digital-skills-workspace">
      {/* 4 Main Category Option Tabs - Vibrant & Youthful Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6" id="digital-skills-tabs">
        {[
          {
            id: "excel",
            label: "Hàm Excel Thực Hành",
            icon: FileSpreadsheet,
            badge: "TRỌNG TÂM",
            activeClass: "bg-emerald-600 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5",
            inactiveClass: "bg-emerald-50 text-slate-900 border-2 border-emerald-300 hover:border-slate-900 hover:bg-emerald-100/90 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5",
            iconBoxActive: "bg-emerald-500/80 text-white border border-emerald-300/40",
            iconBoxInactive: "bg-emerald-200/80 text-emerald-900 border border-emerald-300",
            badgeActive: "bg-amber-300 text-slate-950 font-black border border-amber-400 shadow-xs",
            badgeInactive: "bg-emerald-200/90 text-emerald-950 font-black border border-emerald-300"
          },
          {
            id: "ai",
            label: "Viết Câu Lệnh AI",
            icon: Brain,
            badge: "PROMPT AI",
            activeClass: "bg-purple-600 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5",
            inactiveClass: "bg-purple-50 text-slate-900 border-2 border-purple-300 hover:border-slate-900 hover:bg-purple-100/90 shadow-[2px_2px_0px_0px_rgba(168,85,247,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5",
            iconBoxActive: "bg-purple-500/80 text-white border border-purple-300/40",
            iconBoxInactive: "bg-purple-200/80 text-purple-900 border border-purple-300",
            badgeActive: "bg-amber-300 text-slate-950 font-black border border-amber-400 shadow-xs",
            badgeInactive: "bg-purple-200/90 text-purple-950 font-black border border-purple-300"
          },
          {
            id: "powerpoint",
            label: "Thiết Kế PowerPoint",
            icon: Presentation,
            badge: "THUYẾT TRÌNH",
            activeClass: "bg-orange-600 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5",
            inactiveClass: "bg-orange-50 text-slate-900 border-2 border-orange-300 hover:border-slate-900 hover:bg-orange-100/90 shadow-[2px_2px_0px_0px_rgba(249,115,22,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5",
            iconBoxActive: "bg-orange-500/80 text-white border border-orange-300/40",
            iconBoxInactive: "bg-orange-200/80 text-orange-900 border border-orange-300",
            badgeActive: "bg-amber-300 text-slate-950 font-black border border-amber-400 shadow-xs",
            badgeInactive: "bg-orange-200/90 text-orange-950 font-black border border-orange-300"
          },
          {
            id: "stem",
            label: "STEM & Robotics",
            icon: Zap,
            badge: "MÔ PHỎNG",
            activeClass: "bg-blue-600 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5",
            inactiveClass: "bg-blue-50 text-slate-900 border-2 border-blue-300 hover:border-slate-900 hover:bg-blue-100/90 shadow-[2px_2px_0px_0px_rgba(59,130,246,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5",
            iconBoxActive: "bg-blue-500/80 text-white border border-blue-300/40",
            iconBoxInactive: "bg-blue-200/80 text-blue-900 border border-blue-300",
            badgeActive: "bg-amber-300 text-slate-950 font-black border border-amber-400 shadow-xs",
            badgeInactive: "bg-blue-200/90 text-blue-950 font-black border border-blue-300"
          }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-28 sm:h-32 w-full ${
                isActive ? tab.activeClass : tab.inactiveClass
              }`}
              id={`tab-select-${tab.id}`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2 rounded-xl flex items-center justify-center ${isActive ? tab.iconBoxActive : tab.iconBoxInactive}`}>
                  <Icon size={24} className="shrink-0" />
                </div>
                <span className={`text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  isActive ? tab.badgeActive : tab.badgeInactive
                }`}>
                  {tab.badge}
                </span>
              </div>
              <span className={`text-base sm:text-lg leading-snug font-black font-sans tracking-tight ${
                isActive ? "text-white" : "text-slate-900"
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 📊 TAB 1: EXCEL WORKSPACE - 2-SCREEN SIDE-BY-SIDE LAYOUT */}
      {activeTab === "excel" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="excel-interactive-workspace">
          
          {/* ==================== MÀN HÌNH BÊN TRÁI: DANH SÁCH HÀM & LÝ THUYẾT CÚ PHÁP ==================== */}
          <div className="lg:col-span-5 space-y-4" id="excel-left-panel">
            
            {/* 1. Danh sách các hàm chuẩn */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <FileSpreadsheet size={16} className="text-emerald-600" />
                  Màn Hình Trái: Danh Sách Hàm
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  10 Hàm Trọng Tâm
                </span>
              </div>

              {/* Grouped Functions List */}
              <div className="space-y-3.5">
                {/* Group 1: Hàm Tính Toán */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-emerald-800 uppercase tracking-wider mb-1.5 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-100">
                    <Calculator size={13} className="text-emerald-600" />
                    <span>Hàm Tính Toán Số Học:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {["sum", "average", "max", "min"].map((funcId) => {
                      const item = EXCEL_FUNCTIONS_DATA.find((f) => f.id === funcId)!;
                      const isSelected = selectedFuncId === funcId;
                      return (
                        <button
                          key={funcId}
                          onClick={() => setSelectedFuncId(funcId)}
                          className={`px-3 py-2 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-extrabold"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50/50 hover:border-emerald-300"
                          }`}
                          id={`excel-func-select-${funcId}`}
                        >
                          <span>{item.name}</span>
                          <span className={`text-[10px] font-mono ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>
                            fx
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Group 2: Hàm Điều Kiện */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-indigo-800 uppercase tracking-wider mb-1.5 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100">
                    <GitBranch size={13} className="text-indigo-600" />
                    <span>Hàm Logic & Điều Kiện:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["if", "countif", "sumif"].map((funcId) => {
                      const item = EXCEL_FUNCTIONS_DATA.find((f) => f.id === funcId)!;
                      const isSelected = selectedFuncId === funcId;
                      return (
                        <button
                          key={funcId}
                          onClick={() => setSelectedFuncId(funcId)}
                          className={`px-2.5 py-2 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-extrabold"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-300"
                          }`}
                          id={`excel-func-select-${funcId}`}
                        >
                          <span className="truncate block">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Group 3: Hàm Tìm Kiếm & Chuỗi */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-800 uppercase tracking-wider mb-1.5 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-100">
                    <Search size={13} className="text-amber-600" />
                    <span>Hàm Tìm Kiếm & Chuỗi:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["vlookup", "left", "right"].map((funcId) => {
                      const item = EXCEL_FUNCTIONS_DATA.find((f) => f.id === funcId)!;
                      const isSelected = selectedFuncId === funcId;
                      return (
                        <button
                          key={funcId}
                          onClick={() => setSelectedFuncId(funcId)}
                          className={`px-2 py-2 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-amber-600 text-white border-amber-600 shadow-xs font-extrabold"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50/50 hover:border-amber-300"
                          }`}
                          id={`excel-func-select-${funcId}`}
                        >
                          <span className="truncate block">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Cú Pháp & Lý Thuyết Chi Tiết Hàm Đang Chọn */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFuncId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4" id="excel-sec-syntax">
                  <div className="flex items-center justify-between mb-2.5 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-emerald-600 text-white font-mono text-xs font-black rounded-lg shadow-2xs">
                        {activeFunc.name}
                      </span>
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wide">Cú Pháp Chuẩn</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Lý thuyết trọng tâm
                    </span>
                  </div>

                  {/* Code syntax banner */}
                  <div className="bg-slate-900 text-emerald-300 font-mono text-xs font-bold px-3 py-2 rounded-xl mb-3 border border-slate-800 shadow-inner">
                    {activeFunc.syntax}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                    {activeFunc.description}
                  </p>
                </div>

                {/* 3. Lời Khuyên & Ghi Chú Giáo Viên */}
                <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-emerald-500/5 rounded-2xl border border-emerald-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">👩‍🏫</span>
                    <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">Lời khuyên từ Cô Thúy Hào</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {activeFunc.teacherTip}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-[10px] text-emerald-800 font-bold">
                    <span>Hàm đang chọn: <strong className="text-emerald-900 font-black">{activeFunc.name}</strong></span>
                    <button
                      onClick={handleAskTeacherAboutFunc}
                      className="text-emerald-700 hover:text-emerald-900 underline font-bold cursor-pointer"
                    >
                      Hỏi cô thêm &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* ==================== MÀN HÌNH BÊN PHẢI: BẢNG TÍNH MÔ PHỎNG & THAO TÁC THỰC HÀNH ==================== */}
          <div className="lg:col-span-7 space-y-5" id="excel-right-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFuncId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-5"
              >
                {/* 1. BẢNG TÍNH MÔ PHỎNG TƯƠNG TÁC (Excel Spreadsheet Simulator) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5" id="excel-sec-grid">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                      <Table size={16} className="text-emerald-600" />
                      Màn Hình Phải: Bảng Tính Mô Phỏng
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      💡 Sửa ô để tự kiểm tra dữ liệu!
                    </span>
                  </div>

                  {/* Excel Formula Bar */}
                  <div className="flex items-center gap-2 mb-3 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5">
                    <span className="text-xs font-mono font-bold text-slate-500 italic">fx</span>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <div className="text-xs font-mono font-bold text-emerald-800 truncate">
                      {userFormula ? userFormula : `Công thức / Dữ liệu tại ${activeFunc.targetLabel}`}
                    </div>
                  </div>

                  {/* Spreadsheet Interactive Grid */}
                  <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-2xs">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className="bg-slate-200 text-slate-700 font-bold text-center border-b border-slate-300">
                          <th className="p-2 border-r border-slate-300 w-12 bg-slate-300 text-slate-600">Row</th>
                          {activeFunc.columns.map((col, idx) => (
                            <th key={col} className="p-2 border-r border-slate-300 min-w-[90px]">
                              {col} <span className="text-[10px] font-normal text-slate-500 block">({activeFunc.columnLabels[idx] || ""})</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeFunc.gridRows.map((row) => {
                          const isHeaderRow = row.rowNum === 1;
                          return (
                            <tr 
                              key={row.rowNum} 
                              className={isHeaderRow ? "bg-slate-100 font-bold border-b border-slate-300 text-center" : "border-b border-slate-200 text-center"}
                            >
                              <td className="p-2 border-r border-slate-300 font-bold bg-slate-200 text-slate-600">
                                {row.rowNum}
                              </td>

                              {activeFunc.columns.map((col) => {
                                const cellValue = gridData[row.rowNum.toString()]?.[col] ?? row.cells[col] ?? "";
                                const isTargetCell = activeFunc.targetCell.col === col && activeFunc.targetCell.row === row.rowNum;

                                if (isHeaderRow) {
                                  return (
                                    <td key={col} className="p-2 border-r border-slate-300 text-slate-700 font-extrabold bg-slate-50">
                                      {cellValue}
                                    </td>
                                  );
                                }

                                return (
                                  <td 
                                    key={col} 
                                    className={`p-1 border-r border-slate-200 font-mono transition-all ${
                                      isTargetCell 
                                        ? "bg-amber-100/90 font-extrabold text-slate-900 border-2 border-amber-500 shadow-inner" 
                                        : "hover:bg-emerald-50/50"
                                    }`}
                                  >
                                    {isTargetCell ? (
                                      <div className="py-1 px-2 font-black text-amber-900 flex items-center justify-center gap-1">
                                        {cellValue === "?" ? (
                                          <span className="animate-pulse text-amber-700 font-mono font-bold">? (Chờ nhập công thức)</span>
                                        ) : (
                                          <span className="text-emerald-700 font-black text-sm bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                                            {cellValue}
                                          </span>
                                        )}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={cellValue}
                                        onChange={(e) => handleCellChange(row.rowNum, col, e.target.value)}
                                        className="w-full text-center py-1 px-1.5 bg-transparent border-0 focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-md font-bold text-slate-800 outline-none"
                                        title={`Bấm để chỉnh sửa ô ${col}${row.rowNum}`}
                                      />
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. KHU VỰC LÀM BÀI TẬP THỰC HÀNH REAL-TIME */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4" id="excel-sec-exercise">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={15} className="text-emerald-400" />
                      Thực Hành Nhập Công Thức Real-time
                    </span>
                    <button
                      onClick={handleUseSampleFormula}
                      className="text-[10px] font-bold text-slate-300 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg border border-white/10 transition-colors cursor-pointer"
                      title="Điền công thức mẫu để tham khảo"
                    >
                      💡 Điền gợi ý
                    </button>
                  </div>

                  {/* Đề bài thực hành */}
                  <div>
                    <h4 className="text-sm font-black text-white tracking-tight">
                      {activeFunc.taskTitle}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                      📌 <strong className="text-emerald-300 font-bold">Yêu cầu bài tập:</strong> {activeFunc.taskInstruction}
                    </p>
                  </div>

                  {/* Ô Nhập Công Thức */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
                      Nhập công thức Excel của em vào ô bên dưới:
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={userFormula}
                          onChange={(e) => setUserFormula(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleCheckFormula();
                          }}
                          placeholder={activeFunc.sampleCorrectFormula}
                          className="w-full bg-slate-900 border-2 border-emerald-500/50 focus:border-emerald-400 text-emerald-300 font-mono font-bold text-sm px-3 py-2.5 rounded-xl outline-none shadow-inner placeholder:text-slate-600"
                          id="input-excel-formula"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 font-bold hidden sm:inline">
                          {activeFunc.targetLabel.split(" ")[0]}
                        </span>
                      </div>

                      {/* Nút "Kiểm tra kết quả" */}
                      <button
                        onClick={handleCheckFormula}
                        className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                        id="btn-check-formula"
                      >
                        <CornerDownLeft size={14} className="text-slate-950 font-black" />
                        <span>Kiểm tra kết quả</span>
                      </button>
                    </div>
                  </div>

                  {/* Phản hồi kết quả / AI Cô Thúy Hào Feedback */}
                  {evaluationResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-xl border ${
                        evaluationResult.isCorrect
                          ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-200"
                          : "bg-amber-950/80 border-amber-500/60 text-amber-200"
                      }`}
                      id="formula-result-banner"
                    >
                      <div className="flex items-start gap-2.5">
                        {evaluationResult.isCorrect ? (
                          <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm">
                              {evaluationResult.isCorrect ? "Chính xác! 🎉" : "Chưa chính xác!"}
                            </span>
                            {evaluationResult.isCorrect && (
                              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                                Đã cập nhật kết quả vào bảng tính
                              </span>
                            )}
                          </div>
                          <p className="text-xs leading-relaxed font-sans">
                            <span className="font-bold">Cô Thuý Hào:</span> {evaluationResult.feedback}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      )}

      {/* 🤖 TAB 2: AI PROMPT WORKSPACE */}
      {activeTab === "ai" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6" id="ai-workspace">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-purple-950 flex items-center gap-1.5">
              <Brain className="text-purple-500" /> Kỹ năng Viết Câu Lệnh AI (Prompt Engineering)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              AI thông minh phụ thuộc vào câu lệnh chuẩn cấu trúc **[Vai Trò] + [Nhiệm Vụ] + [Định Dạng]**.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">1. Chọn Vai Trò (Role)</label>
                <select 
                  value={aiRole} 
                  onChange={(e) => setAiRole(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer shadow-2xs font-medium"
                >
                  <option value="Cô giáo ôn thi tin học xuất sắc">Cô giáo ôn thi Tin học THPT</option>
                  <option value="Chuyên gia lập trình Python cao cấp">Chuyên gia Lập trình Python</option>
                  <option value="Chuyên gia quản trị cơ sở dữ liệu SQL">Chuyên gia Truy vấn SQL</option>
                  <option value="Trợ lý thiết kế mỹ thuật và PowerPoint chuyên nghiệp">Trợ lý Thiết kế PowerPoint</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">2. Chọn Nhiệm vụ (Task)</label>
                <select 
                  value={aiTask} 
                  onChange={(e) => setAiTask(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer shadow-2xs font-medium"
                >
                  <option value="Giải thích thuật toán tìm kiếm nhị phân bằng hình ảnh ẩn dụ">Giải thích Thuật toán tìm kiếm</option>
                  <option value="Viết một chương trình Python giải quyết bài toán đếm số lần xuất hiện của từ">Lập trình Python đếm từ</option>
                  <option value="Xây dựng 5 câu hỏi trắc nghiệm SQL kèm đáp án chi tiết">Thiết kế trắc nghiệm SQL</option>
                  <option value="Đề xuất ý tưởng phối màu và bố cục cho một dự án STEM xe tự hành">Ý tưởng thiết kế xe tự hành STEM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">3. Định dạng đầu ra (Format)</label>
                <select 
                  value={aiFormat} 
                  onChange={(e) => setAiFormat(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer shadow-2xs font-medium"
                >
                  <option value="Giải thích thật ngắn gọn kèm ví dụ thực tế dễ hiểu nhất">Giải thích ngắn gọn kèm ví dụ</option>
                  <option value="Trình bày dưới dạng bảng so sánh ưu nhược điểm trực quan">Bảng so sánh trực quan</option>
                  <option value="Hướng dẫn chi tiết từng bước (step-by-step) dành cho người mới bắt đầu">Từng bước cho người mới học</option>
                  <option value="Viết mã nguồn sạch, có chú thích chi tiết bằng tiếng Việt">Mã nguồn sạch, có chú thích</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Xem trước câu lệnh (Prompt Preview)</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold text-purple-700 bg-purple-50 border border-purple-100 rounded-full">Chuẩn AI</span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 font-mono text-xs text-slate-700 leading-relaxed shadow-3xs min-h-[140px]">
                  <span className="text-purple-600 font-bold">"</span>
                  {generatedPrompt}
                  <span className="text-purple-600 font-bold">"</span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <button
                  onClick={() => onAskTeacher(generatedPrompt)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} className="animate-pulse" />
                  <span>Gửi câu lệnh này đến Cô Thuý Hào</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 💻 TAB 3: POWERPOINT WORKSPACE */}
      {activeTab === "powerpoint" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6" id="powerpoint-workspace">
          {/* Header */}
          <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[11px] font-black uppercase tracking-wider mb-2 border border-orange-200">
                <Presentation className="text-orange-500 shrink-0" size={14} />
                <span>Trợ Lý & Cẩm Nang Thiết Kế Slide PowerPoint Theo Chủ Đề</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Thiết Kế Slide Chuyên Nghiệp Cho Mọi Đề Tài
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                Khám phá dàn ý chuẩn cấu trúc, mẹo phối màu, font chữ & trực quan hóa Slide mẫu cho Thiệp mừng, Báo cáo học tập, Dự án STEM, Đề tài AI, Lịch sử Máy tính và Thuyết trình Ý tưởng!
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyPptPrompt}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedPptPrompt ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedPptPrompt ? "Đã sao chép Prompt!" : "Sao chép Prompt Slide AI"}</span>
              </button>
            </div>
          </div>

          {/* Golden Rules Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 border border-amber-200/70 p-4 rounded-2xl flex items-start gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-wide">Quy tắc vàng 10 - 20 - 30</h4>
                <p className="text-[11px] text-amber-800 leading-relaxed mt-1">
                  Bài thuyết trình lý tưởng: Tối đa <strong className="font-bold">10 slide</strong>, trình bày trong <strong className="font-bold">20 phút</strong> và cỡ chữ tối thiểu <strong className="font-bold">30pt</strong> để người ngồi cuối khán phòng vẫn đọc rõ.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50/80 to-rose-50/80 border border-orange-200/70 p-4 rounded-2xl flex items-start gap-3">
              <div className="p-2.5 bg-orange-500/10 text-orange-600 rounded-xl shrink-0">
                <Laptop size={20} />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-orange-950 uppercase tracking-wide">Quy tắc thông tin 6 x 6 & Tương phản</h4>
                <p className="text-[11px] text-orange-800 leading-relaxed mt-1">
                  Mỗi trang chiếu không quá <strong className="font-bold">6 dòng</strong>, mỗi dòng không quá <strong className="font-bold">6 từ</strong>. Luôn đảm bảo tương phản cao giữa màu chữ và màu nền Slide.
                </p>
              </div>
            </div>
          </div>

          {/* Theme Selector Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Palette size={14} className="text-orange-500" />
                <span>1. Chọn chủ đề thiết kế Slide:</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">6 Chủ đề chuẩn hóa</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {Object.values(PPT_THEMES_DATA).map((t) => {
                const isActive = pptTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setPptTheme(t.id);
                      setActiveSlideIdx(0);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[88px] ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-500/30 scale-[1.02]"
                        : "bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isActive ? "bg-orange-500/20 text-orange-300" : t.badgeBg
                      }`}>
                        {t.categoryBadge}
                      </span>
                      {isActive && <Sparkles size={12} className="text-orange-400 animate-pulse" />}
                    </div>
                    <span className="text-xs font-bold leading-tight mt-2 block">
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Details Banner */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-extrabold text-slate-900">{currentTheme.label}</h4>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${currentTheme.badgeBg}`}>
                  {currentTheme.categoryBadge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentTheme.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs">
                <Palette size={13} className="text-purple-500" />
                <span>Màu: <strong className="text-slate-900">{currentTheme.colorPaletteName}</strong></span>
              </div>
              <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs">
                <Type size={13} className="text-indigo-500" />
                <span>Font: <strong className="text-slate-900">{currentTheme.fontRecommendation}</strong></span>
              </div>
            </div>
          </div>

          {/* Main Workspace: Left Slide Outlines, Right 16:9 Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Slide List */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                2. Danh sách trang Slide ({currentTheme.slides.length} trang)
              </span>
              {currentTheme.slides.map((s, idx) => {
                const isSelected = activeSlideIdx === idx;
                return (
                  <button
                    key={s.slide}
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-50 to-amber-50/50 border-orange-400 text-slate-900 font-bold shadow-xs ring-1 ring-orange-400/50"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-[10px] font-extrabold px-2 py-1 rounded-lg font-mono shrink-0 ${
                        isSelected ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {s.slide}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-800 truncate">{s.title}</div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">{s.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className={`shrink-0 transition-opacity ${isSelected ? "text-orange-600 opacity-100" : "opacity-0"}`} />
                  </button>
                );
              })}

              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 mt-4">
                <div className="flex items-center gap-2 text-amber-900 text-xs font-bold mb-1">
                  <Wand2 size={14} className="text-amber-600" />
                  <span>Mẹo Thuyết Trình Ấn Tượng</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Đừng đọc nguyên văn từng từ trên Slide! Hãy xem Slide là hình ảnh hỗ trợ trực quan, bạn chính là người truyền cảm hứng bằng giọng nói và tương tác mắt với khán giả.
                </p>
              </div>
            </div>

            {/* Right Column: 16:9 Slide Canvas Preview */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layout size={13} className="text-orange-500" />
                    <span>3. Xem trước Màn hình Slide (Khung tỉ lệ 16:9)</span>
                  </span>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full font-mono">
                    {currentSlide.slide} / {currentTheme.slides.length}
                  </span>
                </div>

                {/* Simulated 16:9 Slide Screen */}
                <div className={`w-full rounded-3xl p-6 sm:p-8 border-2 shadow-xl flex flex-col justify-between transition-all duration-300 min-h-[300px] ${currentTheme.previewBgClass} ${currentTheme.accentBorder} relative overflow-hidden`}>
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Top Header of the Slide */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white/10 text-white rounded-lg text-[10px] font-extrabold font-mono uppercase tracking-wider backdrop-blur-md">
                        {currentTheme.label}
                      </span>
                      <span className="text-xs text-white/60 font-mono hidden sm:inline">
                        • {currentSlide.layoutType.toUpperCase()} LAYOUT
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-mono">
                      <Sparkles size={12} className="text-amber-400" />
                      <span>16:9 Widescreen</span>
                    </div>
                  </div>

                  {/* Body Content of the Slide Preview */}
                  <div className="my-6 space-y-4 relative z-10">
                    <div>
                      <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {currentSlide.title}
                      </h3>
                      <p className={`text-xs sm:text-sm font-medium mt-1.5 ${currentTheme.previewTextClass}`}>
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    {/* Sample bullet points list */}
                    <div className="space-y-2 pt-2">
                      {currentSlide.sampleContent.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5 backdrop-blur-xs">
                          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Visual & Graphic Hint */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-white/70 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <Image size={13} className="text-amber-400 shrink-0" />
                      <span>Gợi ý hình ảnh: <strong className="text-white font-medium">{currentSlide.recommendedVisuals}</strong></span>
                    </div>
                    <div className="text-[10px] text-white/40 font-mono">
                      Lớp 11A1 • Tin Học THPT
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Tips & AI Ask Buttons */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 text-orange-700 rounded-xl shrink-0 mt-0.5">
                    <PenTool size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                      Mẹo thiết kế chuyên sâu cho {currentSlide.slide}:
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {currentSlide.hint}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1 border-t border-slate-200/80">
                  <button
                    onClick={handleCopyPptPrompt}
                    className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {copiedPptPrompt ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedPptPrompt ? "Đã sao chép dàn ý Slide!" : "Sao chép Prompt Gamma / AI"}</span>
                  </button>

                  <button
                    onClick={handleAskTeacherAboutSlide}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send size={14} />
                    <span>Hỏi Cô Thuý Hào về Slide này</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔬 TAB 4: STEM & ROBOTICS MULTI-PROJECT WORKSPACE */}
      {activeTab === "stem" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6" id="stem-workspace">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-black uppercase tracking-wider mb-1.5 border border-blue-200">
                <Bot size={14} className="text-blue-600 animate-bounce" />
                <span>Không Gian Sáng Tạo STEM &amp; Robotics THPT (48 Dự Án)</span>
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                Mô Phỏng Trực Quan 2D &amp; Lập Trình Dự Án STEM Khối 10, 11, 12
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Hệ thống 48 dự án STEM được thiết kế chuẩn lộ trình phổ thông: Khối 10 (Làm quen cảm biến, Arduino, IoT), Khối 11 (Tự động hóa, Nông nghiệp thông minh), và Khối 12 (Robot nâng cao, AI, Xe tự hành Cloud).
              </p>
            </div>

            <button
              onClick={handleAskTeacherAboutStem}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black rounded-2xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Sparkles size={15} className="text-white" />
              <span>Hỏi Cô Về Dự Án Robot Này</span>
            </button>
          </div>

          {/* ROADMAP OVERVIEW SECTION (Khối 10 -> Khối 11 -> Khối 12) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {STEM_ROADMAPS.map((rm) => {
              const projCount = STEM_PROJECTS.filter((p) => p.grade === rm.grade).length;
              return (
                <div
                  key={rm.grade}
                  onClick={() => setSelectedStemGrade(rm.grade as any)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedStemGrade === rm.grade
                      ? "bg-gradient-to-br from-slate-900 to-blue-950 text-white border-blue-500 shadow-md ring-2 ring-blue-400/40"
                      : "bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        selectedStemGrade === rm.grade ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
                      }`}>
                        Khối {rm.grade}
                      </span>
                      <span className="text-xs font-black font-mono opacity-80">{projCount} Dự Án</span>
                    </div>
                    <h4 className="text-xs font-black leading-snug mb-1">{rm.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${selectedStemGrade === rm.grade ? "text-slate-300" : "text-slate-600"}`}>
                      {rm.focusArea}
                    </p>
                  </div>

                  <div className={`mt-3 pt-2 border-t text-[10px] font-bold flex items-center justify-between ${
                    selectedStemGrade === rm.grade ? "border-slate-800 text-blue-300" : "border-slate-200 text-slate-500"
                  }`}>
                    <span>🎯 {rm.levelBadge}</span>
                    <span className="text-blue-500">Xem danh sách &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FILTER BAR: Grade Filter, Category Filter & Search Input */}
          <div className="space-y-3 bg-slate-100/80 p-3 rounded-2xl border border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Grade Level Selector Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider mr-1">Khối Lớp:</span>
                {[
                  { id: "all", label: "Tất Cả (48 Dự án)" },
                  { id: "10", label: "🏫 Khối 10 (16)" },
                  { id: "11", label: "🚀 Khối 11 (16)" },
                  { id: "12", label: "🦾 Khối 12 (16)" }
                ].map((g) => {
                  const isActive = selectedStemGrade === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedStemGrade(g.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-200/80"
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  placeholder="Tìm tên dự án, linh kiện, cảm biến..."
                  value={stemSearchQuery}
                  onChange={(e) => setStemSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
                <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* PROJECT CARDS SELECTOR GRID (Filtered List) */}
          <div>
            {(() => {
              const filteredList = STEM_PROJECTS.filter((p) => {
                const matchesGrade = selectedStemGrade === "all" || p.grade === selectedStemGrade;
                const matchesGroup = selectedStemGroup === "all" || p.groupId === selectedStemGroup;
                const matchesQuery =
                  !stemSearchQuery.trim() ||
                  p.title.toLowerCase().includes(stemSearchQuery.toLowerCase()) ||
                  p.shortDesc.toLowerCase().includes(stemSearchQuery.toLowerCase()) ||
                  p.hardware.some((h) => h.toLowerCase().includes(stemSearchQuery.toLowerCase()));
                return matchesGrade && matchesGroup && matchesQuery;
              });

              return (
                <div className="space-y-3">
                  <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Danh sách dự án STEM ({filteredList.length} kết quả):</span>
                    <span className="text-blue-600 font-bold">Bấm chọn để chạy mô phỏng 2D &amp; xem mã nguồn</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto p-1 pr-2 border border-slate-100 rounded-2xl bg-slate-50/50">
                    {filteredList.map((proj) => {
                      const isSelected = selectedStemId === proj.id;
                      const gradeColor = proj.grade === "10" ? "bg-emerald-100 text-emerald-800" : proj.grade === "11" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";

                      return (
                        <button
                          key={proj.id}
                          onClick={() => setSelectedStemId(proj.id)}
                          className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-full ${
                            isSelected
                              ? "bg-slate-900 text-white border-blue-500 shadow-md ring-2 ring-blue-500/50"
                              : "bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                          }`}
                          id={`stem-proj-select-${proj.id}`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                isSelected ? "bg-blue-800 text-blue-200" : gradeColor
                              }`}>
                                Khối {proj.grade}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                                  <Activity size={12} className="animate-pulse" /> Đang chọn
                                </span>
                              )}
                            </div>

                            <h4 className={`text-xs font-black leading-snug line-clamp-2 ${isSelected ? "text-white" : "text-slate-900"}`}>
                              {proj.title}
                            </h4>
                            <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                              {proj.shortDesc}
                            </p>
                          </div>

                          <div className={`mt-2.5 pt-2 border-t text-[10px] flex items-center justify-between font-bold ${
                            isSelected ? "border-slate-800 text-blue-300" : "border-slate-100 text-slate-400"
                          }`}>
                            <span>⚡ {proj.hardware.length} Linh kiện</span>
                            <span className="text-blue-400 font-black">Xem Mô Phỏng 2D &rarr;</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* ACTIVE PROJECT SIMULATION & CODE WORKSPACE (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2" id="stem-active-workspace">
            
            {/* COLUMN 1: LIVE SENSOR CONTROLS & VISUAL SIMULATION (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Project Title & Real-World Application */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-600 text-white font-mono text-[10px] font-black rounded-md">
                      KHỐI {activeStem.grade}
                    </span>
                    <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                      Dự Án Đang Mô Phỏng
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    ID: {activeStem.id}
                  </span>
                </div>

                <h3 className="text-sm font-black text-white leading-tight">
                  {activeStem.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed pt-1.5 border-t border-slate-800">
                  🌍 <strong className="text-blue-300 font-bold">Ứng dụng thực tế:</strong> {activeStem.realWorldApp}
                </p>
              </div>

              {/* Hardware List Badges */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Cpu size={14} className="text-blue-600" /> Linh kiện mạch phần cứng:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeStem.hardware.map((hw, idx) => (
                    <span key={idx} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                      ⚡ {hw}
                    </span>
                  ))}
                </div>
              </div>

              {/* DYNAMIC SENSOR CONTROLS & INTERACTIVE SLIDERS */}
              <div className="bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-white rounded-2xl border border-blue-200 p-4 space-y-4 shadow-3xs">
                <div className="flex items-center justify-between border-b border-blue-100 pb-2.5">
                  <span className="text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders size={16} className="text-blue-600" /> Bảng Điều Khiển Cảm Biến Real-time
                  </span>
                  <span className="text-[9px] bg-blue-600 text-white font-black px-2 py-0.5 rounded-full">
                    Kéo để test
                  </span>
                </div>

                {/* Contextual Interactive Sensor & Actuator Controls */}
                {/* 1. Lighting & LDR / Lux */}
                {["smarthome_light", "g10_smart_bedroom_light", "g10_stair_light_app", "g10_iot_led", "g11_classroom_lighting", "g11_bh1750_lux_meter"].includes(activeStem.id) && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-1"><Sun size={15} className="text-amber-500 animate-spin" /> Ánh sáng Môi trường (LDR / Lux):</span>
                        <span className="font-mono text-blue-700 font-black">{stemLightLevel}% ({stemLightLevel < 30 ? "Trời tối" : stemLightLevel <= 60 ? "Hoàng hôn" : "Đủ ánh sáng"})</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={stemLightLevel}
                        onChange={(e) => setStemLightLevel(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Temperature, Smoke & Fire Hazard */}
                {["smarthome_fire", "g10_fire_alarm_bot", "g12_fire_fighting_bot", "g10_auto_fan", "g11_humidity_fan", "g11_lab_temp_monitor", "g12_pump_vibration_monitor"].includes(activeStem.id) && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1"><Thermometer size={15} className="text-red-500" /> Nhiệt độ Cảm biến (DHT11):</span>
                        <span className="font-mono text-red-600 font-black">{stemTemp}°C</span>
                      </div>
                      <input
                        type="range" min="15" max="60" value={stemTemp}
                        onChange={(e) => setStemTemp(Number(e.target.value))}
                        className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1"><Flame size={15} className="text-amber-600" /> Cảm biến Khói / Khí Gas (MQ-2):</span>
                        <span className="font-mono text-amber-700 font-black">{stemSmoke} ppm</span>
                      </div>
                      <input
                        type="range" min="10" max="200" value={stemSmoke}
                        onChange={(e) => setStemSmoke(Number(e.target.value))}
                        className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Soil Moisture & Water Tank Level */}
                {["agritech_garden", "g11_greenhouse_irrigation", "g11_farm_dashboard", "g11_group_smart_farm", "g10_water_level_alert", "g11_water_quality_monitor", "g11_farm_rain_alarm"].includes(activeStem.id) && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-1"><Droplets size={15} className="text-teal-600" /> Độ ẩm đất / Mực nước bồn:</span>
                        <span className="font-mono text-teal-700 font-black">{stemSoil}% ({stemSoil < 35 ? "Mức Thấp / Khô" : stemSoil >= 60 ? "Đạt Chuẩn" : "Mức Vừa"})</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={stemSoil}
                        onChange={(e) => setStemSoil(Number(e.target.value))}
                        className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 4. Sunlight & Curtains */}
                {activeStem.id === "smarthome_curtain" && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-1"><Sun size={15} className="text-amber-500" /> Cường độ Nắng (Sunlight):</span>
                        <span className="font-mono text-amber-700 font-black">{stemSunlight}%</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={stemSunlight}
                        onChange={(e) => setStemSunlight(Number(e.target.value))}
                        className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 5. Ultrasonic Proximity & Barrier / Trash / Sanitizer */}
                {["smart_parking", "smart_trash", "auto_sanitizer"].includes(activeStem.id) && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center gap-1"><Car size={15} className="text-indigo-600" /> Khoảng cách Vật thể / Xe / Bàn tay:</span>
                        <span className="font-mono text-indigo-700 font-black">{stemCarDist} cm ({stemCarDist < 15 ? "GẦN - MỞ BARRIER/NẮP" : "XA - GIỮ KHÓA"})</span>
                      </div>
                      <input
                        type="range" min="2" max="50" value={stemCarDist}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setStemCarDist(val);
                          setStemHandDist(val);
                          setStemSanitizerPresent(val < 15);
                        }}
                        className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 6. Line Follower IR Steering */}
                {["line_follower", "g11_adv_line_follower", "g10_distance_bot", "g11_patrol_bot", "g12_mini_delivery_bot"].includes(activeStem.id) && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">Thử nghiệm Vạch Đen IR (Line Position):</span>
                    <div className="flex gap-2">
                      {(["left", "center", "right"] as const).map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setStemLinePos(pos)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            stemLinePos === pos ? "bg-blue-600 text-white shadow-xs" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          {pos === "left" ? "⬅️ Lệch Trái" : pos === "right" ? "➡️ Lệch Phải" : "⬆️ Giữa Vạch"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Robot Arms & Servo Joints */}
                {["robot_arm", "g10_grabber_bot", "g12_app_robot_arm", "g12_sorting_arm_bot", "g12_barista_bot"].includes(activeStem.id) && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Góc Khớp Vai (Shoulder Servo):</span>
                        <span className="font-mono text-purple-700 font-black">{stemShoulderAngle}°</span>
                      </div>
                      <input
                        type="range" min="0" max="180" value={stemShoulderAngle}
                        onChange={(e) => setStemShoulderAngle(Number(e.target.value))}
                        className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Góc Khớp Khuỷu (Elbow Servo):</span>
                        <span className="font-mono text-indigo-700 font-black">{stemElbowAngle}°</span>
                      </div>
                      <input
                        type="range" min="0" max="180" value={stemElbowAngle}
                        onChange={(e) => setStemElbowAngle(Number(e.target.value))}
                        className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={() => setStemGripperClosed(!stemGripperClosed)}
                      className={`w-full py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        stemGripperClosed ? "bg-red-600 text-white" : "bg-emerald-600 text-white"
                      }`}
                    >
                      {stemGripperClosed ? "✊ ĐANG KẸP GIỮ VẬT (Bấm để Mở Tay Kẹp)" : "🖐️ MỞ TAY KẸP (Bấm để Kẹp Vật)"}
                    </button>
                  </div>
                )}

                {/* 8. Door & Lock RFID Security Controls */}
                {["g10_auto_door", "g10_smart_lock", "g10_rfid_door", "g10_burglar_alarm", "g12_security_bot"].includes(activeStem.id) && (
                  <div>
                    <button
                      onClick={() => setStemLockUnlocked(!stemLockUnlocked)}
                      className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        stemLockUnlocked ? "bg-emerald-600 text-white shadow-xs" : "bg-indigo-900 text-indigo-100 hover:bg-indigo-800"
                      }`}
                    >
                      <span>{stemLockUnlocked ? "🔓 KHÓA ĐANG MỞ (Bấm để Khóa Chốt Solenoid)" : "🔒 BẤM QUẸT THẺ RFID / NHẬP PASS ĐỂ MỞ CỬA"}</span>
                    </button>
                  </div>
                )}

                {/* 9. Traffic Light Emergency Ambulance Button */}
                {activeStem.id === "traffic_light" && (
                  <div>
                    <button
                      onClick={() => setStemEmergency(!stemEmergency)}
                      className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        stemEmergency ? "bg-red-600 text-white animate-pulse" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                      }`}
                    >
                      <span>🚑 {stemEmergency ? "TẮT ƯU TIÊN XE CẤP CỨU" : "KÍCH HOẠT XE CẤP CỨU TIẾN ĐẾN"}</span>
                    </button>
                  </div>
                )}

                {/* Universal Fallback Input Signal for all other projects */}
                <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-xs text-slate-600 font-mono">
                  <span>Mô phỏng tín hiệu phần cứng:</span>
                  <span className="font-bold text-blue-700">ADC 10-bit (0-1023)</span>
                </div>

              </div>

              {/* VISUAL 2D GRAPHICAL SIMULATION STAGE BOX */}
              <div className="bg-slate-950 text-white rounded-2xl p-4 border-2 border-slate-800 shadow-md flex flex-col justify-between min-h-[220px] relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[10px] font-black font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1">
                    <Play size={12} className="text-emerald-400 fill-emerald-400" /> Mô Hình 2D Chạy Thực Tế (2D Visual Simulation)
                  </span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                    REAL-TIME 🟢
                  </span>
                </div>

                <Stem2DSimulator
                  activeStemId={activeStem.id}
                  stemLightLevel={stemLightLevel}
                  stemTemp={stemTemp}
                  stemSmoke={stemSmoke}
                  stemSoil={stemSoil}
                  stemSunlight={stemSunlight}
                  stemEmergency={stemEmergency}
                  stemCarDist={stemCarDist}
                  stemLinePos={stemLinePos}
                  stemHandDist={stemHandDist}
                  stemSanitizerPresent={stemSanitizerPresent}
                  stemShoulderAngle={stemShoulderAngle}
                  stemElbowAngle={stemElbowAngle}
                  stemGripperClosed={stemGripperClosed}
                  stemLockUnlocked={stemLockUnlocked}
                />
              </div>

            </div>

            {/* COLUMN 2: CODE & BLOCKLY LOGIC VIEWER (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between shadow-lg space-y-4">
              
              {/* Code Tab Switcher */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-blue-400" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Mã Nguồn Lập Trình Dự Án Khối {activeStem.grade}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {[
                      { id: "wiring", label: "🔌 Sơ Đồ Nối Dây", icon: Cpu },
                      { id: "blockly", label: "Blockly (Thuật Toán)", icon: Bot },
                      { id: "arduino", label: "Arduino C++", icon: Code },
                      { id: "python", label: "Python / MicroPython", icon: Terminal }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = stemCodeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setStemCodeTab(tab.id as any)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                            isActive
                              ? "bg-blue-600 text-white shadow-xs"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                          }`}
                        >
                          <Icon size={12} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CODE & WIRING CONTENT VIEW */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-xs text-slate-200 leading-relaxed overflow-x-auto min-h-[220px]">
                  {/* 1. Wiring Diagram Pinout View */}
                  {stemCodeTab === "wiring" && (() => {
                    const connections = generateWiringConnections(activeStem);
                    return (
                      <div className="space-y-4 font-sans text-slate-200">
                        {/* Header Summary */}
                        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3">
                          <div>
                            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider font-mono">
                              🔌 SƠ ĐỒ ĐẤU NỐI &amp; BẢNG CHÂN PIN PHẦN CỨNG
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Bo mạch chủ: <span className="text-emerald-400 font-mono">{activeStem.hardware[0] || "Arduino Uno R3"}</span> ({connections.length} điểm đấu nối)
                            </div>
                          </div>
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono font-bold px-2.5 py-1 rounded-lg border border-emerald-800">
                            PINOUT CHUẨN ARDUINO 🟢
                          </span>
                        </div>

                        {/* Graphical 2D Wiring Schematic Routing */}
                        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center justify-between">
                            <span className="flex items-center gap-1"><Zap size={12} /> Sơ đồ phân tuyến dây Jumper (Cable Schematic)</span>
                            <span className="text-[9px] text-slate-400 font-mono">🔴 DÂY ĐỎ=5V/3.3V | ⬛ DÂY ĐEN=GND | 🔵 MÀU=SIGNAL</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 items-center font-mono text-[11px]">
                            {/* Left Modules */}
                            <div className="space-y-1.5">
                              {connections.filter((_, idx) => idx % 2 === 0).map((conn, idx) => (
                                <div key={idx} className="bg-slate-950 border border-slate-800 p-2 rounded-lg flex items-center justify-between gap-2 shadow-xs">
                                  <div className="min-w-0 flex-1">
                                    <div className="font-bold text-slate-200 text-[11px] truncate">{conn.moduleName}</div>
                                    <div className="text-[10px] text-slate-400">Chân: <span className="text-blue-300 font-bold">{conn.modulePin}</span></div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold text-white shadow-xs" style={{ backgroundColor: conn.wireColorHex }}>
                                      {conn.wireColor}
                                    </span>
                                    <span className="text-slate-500 font-bold">&rarr;</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Center Board Box */}
                            <div className="bg-slate-950 border-2 border-blue-500/80 p-3 rounded-xl text-center space-y-1.5 shadow-md">
                              <div className="w-8 h-8 bg-blue-600/20 border border-blue-500 text-blue-400 rounded-lg flex items-center justify-center mx-auto">
                                <Cpu size={20} />
                              </div>
                              <div className="font-black text-[11px] text-white uppercase tracking-wide">
                                {activeStem.hardware[0] || "ARDUINO UNO R3"}
                              </div>
                              <div className="text-[9px] text-slate-400 space-y-0.5 border-t border-slate-800 pt-1.5 font-mono">
                                <div className="text-emerald-400 font-bold">● Nguồn 5V / 3.3V &amp; GND</div>
                                <div className="text-amber-300 font-bold">● Analog A0 - A5 (I2C)</div>
                                <div className="text-blue-300 font-bold">● Digital D0 - D13 (PWM/SPI)</div>
                              </div>
                            </div>

                            {/* Right Modules */}
                            <div className="space-y-1.5">
                              {connections.filter((_, idx) => idx % 2 === 1).map((conn, idx) => (
                                <div key={idx} className="bg-slate-950 border border-slate-800 p-2 rounded-lg flex items-center justify-between gap-2 shadow-xs">
                                  <div className="flex items-center gap-1">
                                    <span className="text-slate-500 font-bold">&larr;</span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold text-white shadow-xs" style={{ backgroundColor: conn.wireColorHex }}>
                                      {conn.wireColor}
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 text-right">
                                    <div className="font-bold text-slate-200 text-[11px] truncate">{conn.moduleName}</div>
                                    <div className="text-[10px] text-slate-400">Chân: <span className="text-blue-300 font-bold">{conn.modulePin}</span></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Pinout Table */}
                        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
                          <table className="w-full text-left font-mono text-[11px]">
                            <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-800">
                              <tr>
                                <th className="py-2 px-2.5">Linh Kiện / Module</th>
                                <th className="py-2 px-2.5">Chân Module</th>
                                <th className="py-2 px-2.5">Chân Arduino</th>
                                <th className="py-2 px-2.5">Điện Áp</th>
                                <th className="py-2 px-2.5">Màu Dây Jumper</th>
                                <th className="py-2 px-2.5">Ghi Chú Đấu Nối</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80 text-slate-300">
                              {connections.map((conn, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                                  <td className="py-1.5 px-2.5 font-bold text-white">{conn.moduleName}</td>
                                  <td className="py-1.5 px-2.5 text-blue-300 font-bold">{conn.modulePin}</td>
                                  <td className="py-1.5 px-2.5 text-emerald-400 font-black">{conn.arduinoPin}</td>
                                  <td className="py-1.5 px-2.5">
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                      conn.voltage.includes("3.3V") ? "bg-amber-950 text-amber-300 border border-amber-800" :
                                      conn.voltage.includes("12V") ? "bg-red-950 text-red-300 border border-red-800" :
                                      conn.voltage === "GND" ? "bg-slate-800 text-slate-300" : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                    }`}>
                                      {conn.voltage}
                                    </span>
                                  </td>
                                  <td className="py-1.5 px-2.5">
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style={{ backgroundColor: conn.wireColorHex }}>
                                      {conn.wireColor}
                                    </span>
                                  </td>
                                  <td className="py-1.5 px-2.5 text-slate-400 text-[10px]">{conn.note}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Safety Warning */}
                        <div className="bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-xl text-[10px] text-amber-200 space-y-0.5">
                          <div className="font-bold text-amber-300 flex items-center gap-1">
                            <ShieldAlert size={13} /> Lưu ý an toàn điện:
                          </div>
                          <p className="text-slate-300 leading-tight">
                            Luôn ngắt nguồn USB/Pin trước khi cắm dây. Đảm bảo nối <strong>Chung GND (Âm)</strong> giữa bo mạch điều khiển và nguồn ngoài (Pin/Acquy 12V / Servo).
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 2. Blockly Logic Blocks */}
                  {stemCodeTab === "blockly" && (
                    <div className="space-y-2 font-mono">
                      <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">// Logic thuật toán điều khiển (Scratch / Blockly):</div>
                      {activeStem.blocklyLogic.map((line, idx) => (
                        <div key={idx} className="bg-blue-900/40 border-l-4 border-blue-500 px-3 py-1.5 rounded-r-lg font-bold text-blue-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. Arduino C++ Code */}
                  {stemCodeTab === "arduino" && (
                    <pre className="text-emerald-400 whitespace-pre font-mono text-[11px]">
                      {activeStem.arduinoCode}
                    </pre>
                  )}

                  {/* 4. Python Code */}
                  {stemCodeTab === "python" && (
                    <pre className="text-amber-300 whitespace-pre font-mono text-[11px]">
                      {activeStem.pythonCode}
                    </pre>
                  )}
                </div>
              </div>

              {/* Bottom Copy Code & AI Helper Bar */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    if (stemCodeTab === "wiring") {
                      const connections = generateWiringConnections(activeStem);
                      const text = connections
                        .map(c => `• ${c.moduleName} [Chân ${c.modulePin}] -> Arduino ${c.arduinoPin} (${c.voltage}, Dây ${c.wireColor}) | ${c.note}`)
                        .join("\n");
                      handleCopyCode(`SƠ ĐỒ NỐI DÂY DỰ ÁN: ${activeStem.title}\nBo mạch: ${activeStem.hardware[0]}\n\n` + text);
                    } else {
                      const code = stemCodeTab === "blockly" ? activeStem.blocklyLogic.join("\n") : stemCodeTab === "arduino" ? activeStem.arduinoCode : activeStem.pythonCode;
                      handleCopyCode(code);
                    }
                  }}
                  className="w-full sm:w-auto px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedCode ? "Đã sao chép!" : stemCodeTab === "wiring" ? "Sao chép Sơ đồ Nối dây" : "Sao chép mã nguồn"}</span>
                </button>

                <button
                  onClick={handleAskTeacherAboutStem}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Giải thích mã với Cô Thuý Hào</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
