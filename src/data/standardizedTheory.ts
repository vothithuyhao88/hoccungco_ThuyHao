import { LessonChapter } from "../types";

export interface LessonSection {
  title: string;
  contentMarkdown: string;
  example?: string;
}

export interface PracticalApplication {
  ungDung: string;   // Tổng quan ứng dụng thực tế
  tinhHuong: string; // Tình huống / Câu hỏi thực tế THPT
  goiY: string;      // Gợi ý hướng suy nghĩ
  dapAn: string;     // Đáp án & Giải thích chi tiết
}

export interface StandardizedCoreTheory {
  sections: LessonSection[];
  sampleCode?: { title: string; code: string; language?: string };
  loiHayNham: string[]; // Lỗi thường gặp
  meoGhiNho: string[];  // Mẹo ghi nhớ
  lienHeThucTe: PracticalApplication; // Liên hệ thực tế (có gợi ý & đáp án)
}

/**
 * Parses a lesson chapter into SGK textbook sections with illustrative examples,
 * plus post-lesson review summaries: Lỗi thường gặp, Mẹo ghi nhớ, Liên hệ thực tế.
 */
export function getStandardizedTheory(chapter: LessonChapter): StandardizedCoreTheory {
  const raw = chapter.content || "";
  const titleLower = chapter.title.toLowerCase();

  const isPython = chapter.codeLanguage === "python" || titleLower.includes("python") || titleLower.includes("lập trình") || titleLower.includes("biến") || titleLower.includes("vòng lặp") || titleLower.includes("hàm") || titleLower.includes("danh sách");
  const isWebCSS = titleLower.includes("html") || titleLower.includes("css") || titleLower.includes("web") || titleLower.includes("trang web") || titleLower.includes("giao diện");
  const isSQL = titleLower.includes("sql") || titleLower.includes("cơ sở dữ liệu") || titleLower.includes("csdl") || titleLower.includes("bảng") || titleLower.includes("truy vấn");
  const isExcel = titleLower.includes("excel") || titleLower.includes("bảng tính") || titleLower.includes("hàm");

  // Parse textbook sections by "### "
  const rawSections = raw.split(/^###\s+/m).filter(s => s.trim().length > 0);
  const parsedSections: LessonSection[] = [];

  if (rawSections.length > 0) {
    rawSections.forEach((secStr) => {
      const lines = secStr.trim().split("\n");
      const secTitle = lines[0].replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();
      const secBody = lines.slice(1).join("\n").trim();

      // Tailor illustrative example for section
      let secExample: string | undefined;
      const lowerSec = secTitle.toLowerCase();

      if (lowerSec.includes("khái niệm") || lowerSec.includes("định nghĩa") || lowerSec.includes("thông tin")) {
        secExample = isWebCSS 
          ? "Ví dụ: Định dạng tiêu đề bài viết 'Tin học THPT' bằng CSS: h1 { color: #2563eb; font-size: 24px; }."
          : isPython 
          ? "Ví dụ: Khai báo biến lưu tên và tuổi học sinh: ten = 'An', tuoi = 16."
          : isSQL 
          ? "Ví dụ: Lọc học sinh có điểm trung bình từ 8.0: SELECT * FROM HocSinh WHERE DiemTB >= 8.0;"
          : isExcel 
          ? "Ví dụ: Công thức tính tổng điểm 3 môn: =SUM(B2:D2)."
          : "Ví dụ: Tên học sinh 'Nguyễn Văn A' và điểm số là Dữ liệu thô; kết quả xếp loại 'Học sinh Giỏi' là Thông tin hữu ích.";
      } else if (lowerSec.includes("xử lí") || lowerSec.includes("quá trình") || lowerSec.includes("vai trò")) {
        secExample = "Ví dụ thực tế: Học sinh gõ từ bàn phím (Thu nhận) -> CPU tính toán (Xử lí) -> RAM/Ổ cứng lưu (Lưu trữ) -> Màn hình hiển thị kết quả (Truyền/Xuất).";
      } else if (lowerSec.includes("mã") || lowerSec.includes("nhị phân") || lowerSec.includes("biểu diễn")) {
        secExample = "Ví dụ: Ký tự 'A' được mã hóa thành số 65 trong bảng mã ASCII, tương ứng dãy bit nhị phân 01000001 trong máy tính.";
      } else if (secBody.includes("Ví dụ") || secBody.includes("*Ví dụ:*")) {
        // Example already embedded inside body text
        secExample = undefined;
      } else {
        secExample = `Ví dụ minh họa: Áp dụng kiến thức ${secTitle} vào các bài thực hành và đề thi kiểm tra Tin học THPT.`;
      }

      parsedSections.push({
        title: secTitle,
        contentMarkdown: secBody,
        example: secExample
      });
    });
  } else {
    // Fallback if no "###" markdown headers found
    parsedSections.push({
      title: chapter.title,
      contentMarkdown: chapter.content,
      example: `Ví dụ minh họa: Bám sát nội dung trọng tâm bài học ${chapter.title} để giải các câu hỏi trắc nghiệm và bài tập vận dụng.`
    });
  }

  // Sample Code if available
  let sampleCode: { title: string; code: string; language?: string } | undefined;
  if (chapter.sampleCode) {
    sampleCode = {
      title: `Mã lệnh & Cú pháp minh họa (${chapter.codeLanguage || "code"})`,
      code: chapter.sampleCode,
      language: chapter.codeLanguage || "python"
    };
  }

  // 1. Lỗi thường gặp (Lỗi gặp)
  const loiHayNham: string[] = [
    isWebCSS 
      ? "❌ Nhầm lẫn thuộc tính color (màu chữ) và background-color (màu nền)." 
      : isPython 
      ? "❌ Nhầm lẫn toán tử gán (=) và toán tử so sánh bằng (==)." 
      : isSQL 
      ? "❌ Nhầm lẫn thứ tự các từ khóa SQL: SELECT phải đứng trước FROM, WHERE phải đứng sau FROM." 
      : isExcel 
      ? "❌ Quên dấu bằng (=) ở đầu công thức Excel khiến ô chỉ hiển thị dạng văn bản thô." 
      : "❌ Nhầm lẫn giữa Dữ liệu (chưa qua xử lý) và Thông tin (đã có ý nghĩa mang lại hiểu biết).",
    isWebCSS 
      ? "❌ Quên dấu chấm phẩy (;) ở cuối mỗi khai báo thuộc tính CSS làm sai cú pháp." 
      : isPython 
      ? "❌ Nhầm lẫn chỉ số phần tử trong danh sách (list trong Python bắt đầu từ 0, không phải 1)." 
      : isSQL 
      ? "❌ Lọc dữ liệu chuỗi trong mệnh đề WHERE mà quên đặt chuỗi trong dấu ngoặc đơn ' '." 
      : isExcel 
      ? "❌ Nhầm lẫn địa chỉ tương đối (A1) và địa chỉ tuyệt đối ($A$1) khi sao chép công thức." 
      : "❌ Nhầm lẫn chức năng của bộ nhớ RAM (mất dữ liệu khi ngắt điện) và Ổ cứng (lưu trữ lâu dài).",
    isPython 
      ? "❌ Lỗi thụt lùi đầu dòng (IndentationError) trong các khối lệnh if, for, while, def." 
      : "❌ Đọc không kỹ các từ khóa khẳng định / phủ định ('không phải', 'ngoại trừ') trong câu hỏi trắc nghiệm."
  ];

  // 2. Mẹo ghi nhớ
  const meoGhiNho: string[] = [
    `🎯 ${chapter.title.split(".")[1]?.trim() || chapter.title}: Ghi nhớ từ khóa cốt lõi "${chapter.description.slice(0, 45)}...".`,
    isWebCSS 
      ? "🎯 Cú pháp CSS: Selector { Thuộc_tính: Giá_trị; } - color = chữ, background = nền, margin = lề ngoài." 
      : isPython 
      ? "🎯 Python: append() = thêm cuối, len() = độ dài, range(a, b) = chạy từ a đến b-1." 
      : isSQL 
      ? "🎯 Câu lệnh SQL: SELECT (chọn) -> FROM (bảng) -> WHERE (điều kiện) -> ORDER BY (sắp xếp)." 
      : isExcel 
      ? "🎯 Hàm Excel: SUM = tổng, AVERAGE = trung bình, MAX/MIN = lớn/nhỏ nhất, COUNT = đếm số." 
      : "🎯 4 bước xử lí thông tin: Thu nhận -> Lưu trữ -> Xử lí -> Truyền/Xuất.",
    "🎯 Khi làm bài trắc nghiệm: Gạch chân từ khóa chính trong câu hỏi để chọn đáp án chính xác."
  ];

  // 3. Liên hệ thực tế (Có gợi ý & đáp án tình huống)
  const lienHeThucTe: PracticalApplication = isWebCSS 
    ? {
        ungDung: "Thiết kế website tin tức lớp học, trang web câu lạc bộ truyền thông trường THPT.",
        tinhHuong: "Bạn được phân công thiết kế trang web lớp 11A. Tiêu đề chính bài viết 'CHÀO MỪNG NĂM HỌC MỚI' bị dính sát lề trái và chữ màu đen rất khó đọc. Bạn cần áp dụng CSS như thế nào để tiêu đề có chữ màu xanh dương, căn giữa và có khoảng cách lề thoáng?",
        goiY: "Sử dụng selector thẻ <h1> hoặc class CSS với các thuộc tính định dạng: color (màu chữ), text-align (căn lề) và padding/margin (khoảng cách).",
        dapAn: "Khai báo CSS: h1 { color: #1e40af; text-align: center; padding: 12px 0; font-weight: bold; }. Việc áp dụng CSS giúp giao diện website sinh động, chữ nổi bật, căn chỉnh khoa học và tối ưu trải nghiệm đọc cho học sinh."
      }
    : isPython 
    ? {
        ungDung: "Lập trình ứng dụng tự động hóa tính điểm trung bình môn học, lập danh sách khen thưởng học sinh THPT.",
        tinhHuong: "Lớp trưởng muốn viết một chương trình Python tự động kiểm tra danh sách điểm trung bình của 40 học sinh trong lớp, đếm xem có bao nhiêu bạn đạt điểm Tốt (>= 8.0). Cần áp dụng những kiến thức Python cốt lõi nào?",
        goiY: "Sử dụng cấu trúc Danh sách (list) để lưu điểm số, kết hợp Vòng lặp (for) để duyệt qua từng học sinh và Cấu trúc rẽ nhánh (if) để kiểm tra điều kiện.",
        dapAn: "Mã mẫu Python:\ndiem_so = [8.5, 7.2, 9.0, 6.8, 8.0, 9.5]\ndem_gioi = 0\nfor d in diem_so:\n    if d >= 8.0:\n        dem_gioi += 1\nprint('Số học sinh giỏi:', dem_gioi)\n\nGiải thích: Chương trình duyệt tự động từng điểm số, nếu >= 8.0 thì tăng biến đếm. Giúp xử lý hàng trăm bản ghi điểm trong vài mili-giây thay vì dò tay thủ công."
      }
    : isSQL 
    ? {
        ungDung: "Hệ thống cơ sở dữ liệu quản lý điểm thi tốt nghiệp THPT, tra cứu điểm tuyển sinh đại học, phần mềm quản lý thư viện trường.",
        tinhHuong: "Thư viện trường THPT cần tra cứu danh sách tất cả các cuốn sách môn 'Tin học' có số lượng còn lại trong kho lớn hơn 5 bản để phục vụ tiết thực hành. Hãy viết câu truy vấn SQL phù hợp.",
        goiY: "Sử dụng câu lệnh SELECT để chọn các cột cần xem, FROM tên bảng 'Sach', và kết hợp điều kiện trong mệnh đề WHERE bằng toán tử AND.",
        dapAn: "Câu lệnh SQL: SELECT TenSach, SoLuong FROM Sach WHERE Mon = 'Tin học' AND SoLuong > 5;\n\nGiải thích: Mệnh đề WHERE lọc đúng sách môn Tin học đồng thời có SoLuong > 5. Cơ sở dữ liệu SQL giúp truy xuất thông tin chính xác, tức thì trong hàng nghìn bản ghi."
      }
    : isExcel 
    ? {
        ungDung: "Giáo viên chủ nhiệm lập sổ điểm điện tử, tính điểm trung bình tổng kết và xếp loại học lực học sinh cuối học kỳ.",
        tinhHuong: "Giáo viên cần tính điểm trung bình môn Tin học của cả lớp (từ ô B2 đến B45) và xác định bạn có điểm cao nhất lớp. Cần dùng các hàm Excel nào?",
        goiY: "Sử dụng hàm tính giá trị trung bình cộng (AVERAGE) và hàm tìm giá trị lớn nhất (MAX) trên vùng dữ liệu B2:B45.",
        dapAn: "Công thức Excel:\n- Tính điểm trung bình cả lớp: =AVERAGE(B2:B45)\n- Tìm điểm cao nhất: =MAX(B2:B45)\n\nGiải thích: Các hàm tự động tính toán chính xác và tự động cập nhật lại kết quả ngay khi giáo viên sửa điểm số của bất kỳ học sinh nào."
      }
    : {
        ungDung: "Số hóa dữ liệu trong đời sống: Zalo, VNeID, Ngân hàng số, Cổng dịch vụ công trực tuyến.",
        tinhHuong: "Khi học sinh quét mã QR trên Căn cước công dân để hoàn thiện hồ sơ đăng ký thi tốt nghiệp THPT, thành phần nào là Dữ liệu thô và thành phần nào là Thông tin?",
        goiY: "Dữ liệu thô là dãy ký tự/số được mã hóa chứa trong QR code. Thông tin là kết quả máy tính giải mã ra Họ tên, Ngày sinh, Số CCCD hiển thị trên màn hình.",
        dapAn: "Phân tích thực tế:\n- Dữ liệu (Data): Dãy mã vạch/bit nhị phân được lưu trên mã QR.\n- Thông tin (Information): Văn bản Họ tên 'Nguyễn Văn A', Ngày sinh, Số CCCD được ứng dụng giải mã và hiển thị rõ ràng trên màn hình, giúp cán bộ coi thi xác minh danh tính học sinh."
      };

  return {
    sections: parsedSections,
    sampleCode,
    loiHayNham,
    meoGhiNho,
    lienHeThucTe
  };
}

