export interface ExcelCell {
  col: string; // "A", "B", "C", "D", "E"
  row: number; // 1, 2, 3...
  value: string;
  isHeader?: boolean;
  isTargetResult?: boolean;
  editable?: boolean;
}

export interface ExcelFunctionData {
  id: string;
  name: string;
  category: "Hàm tính toán" | "Hàm điều kiện" | "Hàm tìm kiếm / Chuỗi";
  syntax: string;
  description: string;
  teacherTip: string;
  // Grid layout
  columns: string[]; // ["A", "B", "C", "D", "E"]
  columnLabels: string[]; // ["Họ Tên", "Toán", "Lý", "Tin", "Kết Quả"]
  gridRows: { rowNum: number; cells: Record<string, string> }[];
  targetCell: { col: string; row: number };
  targetLabel: string;
  
  // Exercise details
  taskTitle: string;
  taskInstruction: string;
  sampleCorrectFormula: string;
  
  // Function logic evaluator
  evaluate: (
    formula: string,
    gridData: Record<string, Record<string, string>>
  ) => {
    isCorrect: boolean;
    resultValue: string;
    feedback: string;
  };
}

export const EXCEL_FUNCTION_GROUPS = [
  {
    category: "Hàm tính toán",
    icon: "Calculator",
    color: "emerald",
    functions: ["SUM", "AVERAGE", "MAX", "MIN"]
  },
  {
    category: "Hàm điều kiện",
    icon: "GitBranch",
    color: "indigo",
    functions: ["IF", "COUNTIF", "SUMIF"]
  },
  {
    category: "Hàm tìm kiếm / Chuỗi",
    icon: "Search",
    color: "amber",
    functions: ["VLOOKUP", "LEFT", "RIGHT"]
  }
];

export const EXCEL_FUNCTIONS_DATA: ExcelFunctionData[] = [
  // 1. SUM
  {
    id: "sum",
    name: "SUM",
    category: "Hàm tính toán",
    syntax: "=SUM(ô_đầu:ô_cuối) hoặc =SUM(số1, số2, ...)",
    description: "Tính tổng tất cả các số trong một khoảng ô hoặc danh sách các đối số.",
    teacherTip: "Em có thể kéo quét từ ô đầu đến ô cuối (ví dụ B2:D2) hoặc nhập từng ô ngăn cách bởi dấu phẩy B2, C2, D2.",
    columns: ["A", "B", "C", "D", "E"],
    columnLabels: ["Họ Tên", "Toán (B)", "Lý (C)", "Tin (D)", "Tổng Điểm (E)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Họ Tên", B: "Toán", C: "Lý", D: "Tin", E: "Tổng Điểm" } },
      { rowNum: 2, cells: { A: "Nguyễn Văn A", B: "8", C: "7", D: "9", E: "?" } },
      { rowNum: 3, cells: { A: "Trần Thị B", B: "6", C: "8", D: "7", E: "?" } },
    ],
    targetCell: { col: "E", row: 2 },
    targetLabel: "Ô E2 (Tổng điểm của Nguyễn Văn A)",
    taskTitle: "Bài tập 1: Tính tổng điểm 3 môn học",
    taskInstruction: "Hãy nhập công thức Excel vào ô bên dưới để tính tổng điểm 3 môn Toán (B2), Lý (C2) và Tin (D2) cho học sinh Nguyễn Văn A.",
    sampleCorrectFormula: "=SUM(B2:D2)",
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) {
        return {
          isCorrect: false,
          resultValue: "#VALUE!",
          feedback: "Em quên dấu '=' ở đầu công thức rồi! Mọi công thức Excel luôn bắt đầu bằng dấu '=' nhé."
        };
      }
      if (!clean.startsWith("=SUM")) {
        return {
          isCorrect: false,
          resultValue: "#NAME?",
          feedback: "Em chưa dùng đúng tên hàm SUM. Hãy kiểm tra lại chính tả tên hàm nhé!"
        };
      }
      if (!clean.endsWith(")")) {
        return {
          isCorrect: false,
          resultValue: "#ERROR!",
          feedback: "Em chưa đóng ngoặc ')' ở cuối công thức kìa!"
        };
      }

      // Read current values from grid
      const b2 = parseFloat(gridData["2"]?.B || "8") || 0;
      const c2 = parseFloat(gridData["2"]?.C || "7") || 0;
      const d2 = parseFloat(gridData["2"]?.D || "9") || 0;
      const expectedSum = (b2 + c2 + d2).toString();

      // Accepted patterns: =SUM(B2:D2), =SUM(B2,C2,D2), =SUM(B2, C2, D2)
      if (clean.includes("B2:D2") || clean.includes("B2,C2,D2") || clean.includes("B2, C2, D2") || (clean.includes("B2") && clean.includes("C2") && clean.includes("D2"))) {
        return {
          isCorrect: true,
          resultValue: expectedSum,
          feedback: `Chính xác! 🎉 Công thức '${formula}' đã tính ra tổng điểm là ${expectedSum}.`
        };
      } else {
        return {
          isCorrect: false,
          resultValue: "#REF!",
          feedback: "Địa chỉ vùng chọn chưa chính xác! B2 là Toán, C2 là Lý, D2 là Tin. Hãy viết '=SUM(B2:D2)' hoặc '=SUM(B2,C2,D2)' nhé."
        };
      }
    }
  },

  // 2. AVERAGE
  {
    id: "average",
    name: "AVERAGE",
    category: "Hàm tính toán",
    syntax: "=AVERAGE(ô_đầu:ô_cuối)",
    description: "Tính giá trị trung bình cộng của các ô số được chọn.",
    teacherTip: "Hàm AVERAGE lấy tổng các số chia cho số lượng ô số. Rất thích hợp để tính điểm trung bình học tập!",
    columns: ["A", "B", "C", "D", "E"],
    columnLabels: ["Họ Tên", "Toán (B)", "Lý (C)", "Tin (D)", "Điểm TB (E)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Họ Tên", B: "Toán", C: "Lý", D: "Tin", E: "Điểm TB" } },
      { rowNum: 2, cells: { A: "Lê Văn C", B: "9", C: "8", D: "10", E: "?" } },
      { rowNum: 3, cells: { A: "Phạm Thị D", B: "7", C: "6", D: "8", E: "?" } },
    ],
    targetCell: { col: "E", row: 2 },
    targetLabel: "Ô E2 (Điểm trung bình của Lê Văn C)",
    taskTitle: "Bài tập 2: Tính điểm trung bình 3 môn",
    taskInstruction: "Hãy nhập công thức Excel để tính điểm trung bình 3 môn Toán (B2), Lý (C2), Tin (D2) của Lê Văn C.",
    sampleCorrectFormula: "=AVERAGE(B2:D2)",
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) {
        return {
          isCorrect: false,
          resultValue: "#VALUE!",
          feedback: "Em quên dấu '=' ở đầu công thức rồi nha!"
        };
      }
      if (!clean.startsWith("=AVERAGE")) {
        return {
          isCorrect: false,
          resultValue: "#NAME?",
          feedback: "Hãy dùng tên hàm AVERAGE để tính điểm trung bình nhé."
        };
      }
      const b2 = parseFloat(gridData["2"]?.B || "9") || 0;
      const c2 = parseFloat(gridData["2"]?.C || "8") || 0;
      const d2 = parseFloat(gridData["2"]?.D || "10") || 0;
      const expectedAvg = ((b2 + c2 + d2) / 3).toFixed(1);

      if (clean.includes("B2:D2") || (clean.includes("B2") && clean.includes("C2") && clean.includes("D2"))) {
        return {
          isCorrect: true,
          resultValue: expectedAvg,
          feedback: `Chính xác! 🎉 Công thức '${formula}' đã tính điểm trung bình là ${expectedAvg}.`
        };
      }
      return {
        isCorrect: false,
        resultValue: "#REF!",
        feedback: "Sai vùng chọn! Em nên chọn khoảng ô từ B2 đến D2: '=AVERAGE(B2:D2)'."
      };
    }
  },

  // 3. MAX
  {
    id: "max",
    name: "MAX",
    category: "Hàm tính toán",
    syntax: "=MAX(ô_đầu:ô_cuối)",
    description: "Tìm giá trị lớn nhất trong danh sách các số.",
    teacherTip: "Hàm MAX giúp giáo viên nhanh chóng tìm ra điểm số cao nhất lớp học!",
    columns: ["A", "B", "C", "D", "E"],
    columnLabels: ["Họ Tên", "Toán (B)", "Lý (C)", "Tin (D)", "Điểm Cao Nhất (E)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Họ Tên", B: "Toán", C: "Lý", D: "Tin", E: "Điểm Max" } },
      { rowNum: 2, cells: { A: "Nguyễn Hoàng E", B: "7.5", C: "9.5", D: "8.0", E: "?" } },
    ],
    targetCell: { col: "E", row: 2 },
    targetLabel: "Ô E2 (Môn điểm cao nhất của Nguyễn Hoàng E)",
    taskTitle: "Bài tập 3: Tìm điểm môn cao nhất",
    taskInstruction: "Tính giá trị điểm số lớn nhất trong các môn Toán (B2), Lý (C2), Tin (D2) bằng hàm MAX.",
    sampleCorrectFormula: "=MAX(B2:D2)",
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Công thức phải bắt đầu bằng dấu '='." };
      if (!clean.startsWith("=MAX")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là MAX." };

      const b2 = parseFloat(gridData["2"]?.B || "7.5") || 0;
      const c2 = parseFloat(gridData["2"]?.C || "9.5") || 0;
      const d2 = parseFloat(gridData["2"]?.D || "8.0") || 0;
      const maxVal = Math.max(b2, c2, d2).toString();

      if (clean.includes("B2:D2") || (clean.includes("B2") && clean.includes("C2") && clean.includes("D2"))) {
        return { isCorrect: true, resultValue: maxVal, feedback: `Chính xác! 🎉 Môn có điểm cao nhất là ${maxVal}.` };
      }
      return { isCorrect: false, resultValue: "#REF!", feedback: "Vùng chọn đúng là 'B2:D2'." };
    }
  },

  // 4. MIN
  {
    id: "min",
    name: "MIN",
    category: "Hàm tính toán",
    syntax: "=MIN(ô_đầu:ô_cuối)",
    description: "Tìm giá trị nhỏ nhất trong một khoảng dãy số.",
    teacherTip: "Hàm MIN tìm giá trị thấp nhất để phát hiện môn học sinh cần phụ đạo thêm.",
    columns: ["A", "B", "C", "D", "E"],
    columnLabels: ["Họ Tên", "Toán (B)", "Lý (C)", "Tin (D)", "Điểm Thấp Nhất (E)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Họ Tên", B: "Toán", C: "Lý", D: "Tin", E: "Điểm Min" } },
      { rowNum: 2, cells: { A: "Trần Bảo F", B: "8.5", C: "5.0", D: "9.0", E: "?" } },
    ],
    targetCell: { col: "E", row: 2 },
    targetLabel: "Ô E2 (Môn điểm thấp nhất của Trần Bảo F)",
    taskTitle: "Bài tập 4: Tìm điểm môn thấp nhất",
    taskInstruction: "Dùng hàm MIN để tìm điểm thấp nhất giữa 3 môn ở B2, C2, D2.",
    sampleCorrectFormula: "=MIN(B2:D2)",
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Công thức phải bắt đầu bằng dấu '='." };
      if (!clean.startsWith("=MIN")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là MIN." };

      const b2 = parseFloat(gridData["2"]?.B || "8.5") || 0;
      const c2 = parseFloat(gridData["2"]?.C || "5.0") || 0;
      const d2 = parseFloat(gridData["2"]?.D || "9.0") || 0;
      const minVal = Math.min(b2, c2, d2).toString();

      if (clean.includes("B2:D2") || (clean.includes("B2") && clean.includes("C2") && clean.includes("D2"))) {
        return { isCorrect: true, resultValue: minVal, feedback: `Chính xác! 🎉 Điểm thấp nhất là ${minVal}.` };
      }
      return { isCorrect: false, resultValue: "#REF!", feedback: "Hãy nhập '=MIN(B2:D2)' nhé." };
    }
  },

  // 5. IF
  {
    id: "if",
    name: "IF",
    category: "Hàm điều kiện",
    syntax: '=IF(điều_kiện, giá_trị_nếu_đúng, giá_trị_nếu_sai)',
    description: "Kiểm tra một điều kiện logic và trả về một giá trị nếu ĐÚNG, và giá trị khác nếu SAI.",
    teacherTip: "Chuỗi ký tự văn bản trong hàm IF (như \"Đạt\", \"Học lại\") bắt buộc phải bọc trong dấu ngoặc kép \"\".",
    columns: ["A", "B", "C", "D"],
    columnLabels: ["Họ Tên", "Điểm TB (B)", "Kết Quả (C)", "Ghi Chú (D)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Họ Tên", B: "Điểm TB", C: "Kết Quả", D: "Ghi Chú" } },
      { rowNum: 2, cells: { A: "Nguyễn Thị G", B: "7.5", C: "?", D: "Ngưỡng Đạt >= 5.0" } },
      { rowNum: 3, cells: { A: "Đỗ Văn H", B: "4.2", C: "?", D: "Ngưỡng Đạt >= 5.0" } },
    ],
    targetCell: { col: "C", row: 2 },
    targetLabel: "Ô C2 (Xếp loại kết quả cho Nguyễn Thị G)",
    taskTitle: "Bài tập 5: Xét kết quả Đạt hay Học lại",
    taskInstruction: "Hãy nhập công thức IF cho ô C2: Nếu điểm TB (B2) >= 5 thì trả về \"Đạt\", ngược lại trả về \"Học lại\".",
    sampleCorrectFormula: '=IF(B2>=5, "Đạt", "Học lại")',
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Thiếu dấu '=' ở đầu công thức." };
      if (!clean.startsWith("=IF")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là IF." };

      const b2 = parseFloat(gridData["2"]?.B || "7.5") || 0;
      const expected = b2 >= 5 ? "Đạt" : "Học lại";

      if (clean.includes("B2>=5") || clean.includes("B2 >= 5") || clean.includes("B2>4.9")) {
        if (clean.includes('"ĐẠT"') || clean.includes('"DAT"') || clean.includes('ĐẠT') || clean.includes('DAT')) {
          return { isCorrect: true, resultValue: expected, feedback: `Chính xác! 🎉 Nguyễn Thị G điểm TB ${b2} được xếp loại: ${expected}.` };
        }
      }
      return {
        isCorrect: false,
        resultValue: "#VALUE!",
        feedback: 'Chưa chính xác! Công thức chuẩn là: =IF(B2>=5, "Đạt", "Học lại"). Nhớ dùng dấu ngoặc kép cho văn bản nhé!'
      };
    }
  },

  // 6. COUNTIF
  {
    id: "countif",
    name: "COUNTIF",
    category: "Hàm điều kiện",
    syntax: '=COUNTIF(vùng_chọn, "điều_kiện")',
    description: "Đếm số lượng ô trong một vùng thỏa mãn một điều kiện nhất định.",
    teacherTip: "Điều kiện kiểm tra ví dụ đếm số học sinh Đạt: =COUNTIF(C2:C5, \"Đạt\") hoặc đếm điểm giỏi: =COUNTIF(B2:B5, \">=8\").",
    columns: ["A", "B", "C", "D"],
    columnLabels: ["STT", "Họ Tên (A)", "Xếp Loại (B)", "Số HS Đạt (C)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Họ Tên", B: "Xếp Loại", C: "Thống Kê", D: "Mô tả" } },
      { rowNum: 2, cells: { A: "Nguyễn Văn A", B: "Đạt", C: "?", D: "Đếm số HS 'Đạt'" } },
      { rowNum: 3, cells: { A: "Trần Thị B", B: "Đạt", C: "", D: "" } },
      { rowNum: 4, cells: { A: "Lê Văn C", B: "Học lại", C: "", D: "" } },
      { rowNum: 5, cells: { A: "Phạm Thị D", B: "Đạt", C: "", D: "" } },
    ],
    targetCell: { col: "C", row: 2 },
    targetLabel: "Ô C2 (Đếm tổng số học sinh Đạt trong danh sách B2:B5)",
    taskTitle: "Bài tập 6: Đếm số lượng học sinh Đạt",
    taskInstruction: "Viết công thức COUNTIF đếm số lượng ô trong vùng B2:B5 có giá trị là \"Đạt\".",
    sampleCorrectFormula: '=COUNTIF(B2:B5, "Đạt")',
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Công thức phải bắt đầu bằng dấu '='." };
      if (!clean.startsWith("=COUNTIF")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là COUNTIF." };

      // Count "Đạt" in B2:B5 from gridData
      let count = 0;
      ["2", "3", "4", "5"].forEach((r) => {
        const val = (gridData[r]?.B || "").trim().toLowerCase();
        if (val === "đạt" || val === "dat") count++;
      });

      if (clean.includes("B2:B5") && (clean.includes("ĐẠT") || clean.includes("DAT"))) {
        return { isCorrect: true, resultValue: count.toString(), feedback: `Chính xác! 🎉 Đã đếm được ${count} học sinh đạt.` };
      }
      return {
        isCorrect: false,
        resultValue: "#VALUE!",
        feedback: 'Công thức chưa đúng. Hãy thử: =COUNTIF(B2:B5, "Đạt")'
      };
    }
  },

  // 7. SUMIF
  {
    id: "sumif",
    name: "SUMIF",
    category: "Hàm điều kiện",
    syntax: '=SUMIF(vùng_điều_kiện, "điều_kiện", vùng_tính_tổng)',
    description: "Tính tổng các giá trị trong một vùng thỏa mãn điều kiện chỉ định.",
    teacherTip: "Rất hữu ích khi tính tổng tiền học bổng cho riêng lớp 10A1 hoặc tổng điểm các môn tự nhiên.",
    columns: ["A", "B", "C", "D"],
    columnLabels: ["Họ Tên", "Lớp (B)", "Học Bổng (C)", "Tổng HB Lớp 10A1 (D)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Họ Tên", B: "Lớp", C: "Học Bổng", D: "Tổng HB 10A1" } },
      { rowNum: 2, cells: { A: "Nguyễn A", B: "10A1", C: "500000", D: "?" } },
      { rowNum: 3, cells: { A: "Trần B", B: "10A2", C: "300000", D: "" } },
      { rowNum: 4, cells: { A: "Lê C", B: "10A1", C: "500000", D: "" } },
    ],
    targetCell: { col: "D", row: 2 },
    targetLabel: "Ô D2 (Tổng tiền học bổng của riêng học sinh lớp 10A1)",
    taskTitle: "Bài tập 7: Tính tổng tiền có điều kiện lớp 10A1",
    taskInstruction: "Viết công thức SUMIF tính tổng tiền học bổng (C2:C4) dành riêng cho các bạn ở lớp \"10A1\" (kiểm tra vùng B2:B4).",
    sampleCorrectFormula: '=SUMIF(B2:B4, "10A1", C2:C4)',
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Công thức thiếu dấu '=' ở đầu." };
      if (!clean.startsWith("=SUMIF")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là SUMIF." };

      let total = 0;
      ["2", "3", "4"].forEach((r) => {
        const cls = (gridData[r]?.B || "").trim().toUpperCase();
        const money = parseFloat(gridData[r]?.C || "0") || 0;
        if (cls === "10A1") total += money;
      });

      if (clean.includes("B2:B4") && clean.includes("10A1") && clean.includes("C2:C4")) {
        return { isCorrect: true, resultValue: total.toLocaleString() + " VNĐ", feedback: `Chính xác! 🎉 Tổng học bổng lớp 10A1 là ${total.toLocaleString()} VNĐ.` };
      }
      return {
        isCorrect: false,
        resultValue: "#VALUE!",
        feedback: 'Công thức gợi ý: =SUMIF(B2:B4, "10A1", C2:C4)'
      };
    }
  },

  // 8. VLOOKUP
  {
    id: "vlookup",
    name: "VLOOKUP",
    category: "Hàm tìm kiếm / Chuỗi",
    syntax: "=VLOOKUP(giá_trị_tìm, bảng_phụ, số_thứ_tự_cột, 0)",
    description: "Tìm kiếm một giá trị theo cột dọc trong bảng dữ liệu và trả về giá trị ở cột tương ứng.",
    teacherTip: "Số 0 ở cuối (hoặc FALSE) đảm bảo tìm kiếm chính xác tuyệt đối 100%. Cột thứ 2 trả về Tên môn học.",
    columns: ["A", "B", "C", "D"],
    columnLabels: ["Mã Môn", "Tên Môn (Tìm)", "Bảng Phụ (A)", "Bảng Phụ (B)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Mã Môn", B: "Tên Môn Dò", C: "Mã Gốc", D: "Tên Môn Gốc" } },
      { rowNum: 2, cells: { A: "TIN10", B: "?", C: "TOAN", D: "Toán Học" } },
      { rowNum: 3, cells: { A: "", B: "", C: "TIN10", D: "Tin Học 10" } },
      { rowNum: 4, cells: { A: "", B: "", C: "ANH10", D: "Tiếng Anh" } },
    ],
    targetCell: { col: "B", row: 2 },
    targetLabel: "Ô B2 (Dò tìm tên môn học ứng với mã 'TIN10' ở A2)",
    taskTitle: "Bài tập 8: Dò tìm tên môn học từ bảng phụ",
    taskInstruction: "Dùng hàm VLOOKUP để tìm giá trị mã ở ô A2 trong bảng phụ C2:D4 và lấy tên môn học ở cột thứ 2.",
    sampleCorrectFormula: "=VLOOKUP(A2, C2:D4, 2, 0)",
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Công thức phải bắt đầu bằng '='." };
      if (!clean.startsWith("=VLOOKUP")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là VLOOKUP." };

      if (clean.includes("A2") && clean.includes("C2:D4") && clean.includes("2")) {
        return { isCorrect: true, resultValue: "Tin Học 10", feedback: "Chính xác! 🎉 VLOOKUP đã tra dò đúng mã TIN10 là 'Tin Học 10'." };
      }
      return {
        isCorrect: false,
        resultValue: "#N/A",
        feedback: "Công thức đúng tham số: =VLOOKUP(A2, C2:D4, 2, 0)."
      };
    }
  },

  // 9. LEFT
  {
    id: "left",
    name: "LEFT",
    category: "Hàm tìm kiếm / Chuỗi",
    syntax: "=LEFT(chuỗi_văn_bản, số_ký_tự)",
    description: "Trích xuất một số lượng ký tự nhất định tính từ bên TRÁI của chuỗi văn bản.",
    teacherTip: "Ví dụ lấy mã khối lớp từ mã số học sinh '10A1-001' -> LEFT(A2, 2) cho kết quả '10'.",
    columns: ["A", "B", "C"],
    columnLabels: ["Mã Lớp Đầy Đủ (A)", "Khối Lớp Trích (B)", "Mô tả (C)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Mã Lớp Đầy Đủ", B: "Khối Lớp", C: "Ghi chú" } },
      { rowNum: 2, cells: { A: "12A1_NH2026", B: "?", C: "Trích 2 ký tự đầu bên trái" } },
    ],
    targetCell: { col: "B", row: 2 },
    targetLabel: "Ô B2 (Lấy 2 ký tự bên trái của chuỗi '12A1_NH2026' tại A2)",
    taskTitle: "Bài tập 9: Trích xuất ký tự bên trái chuỗi",
    taskInstruction: "Viết công thức LEFT để lấy 2 ký tự đầu tiên bên trái của ô A2 (để ra khối lớp '12').",
    sampleCorrectFormula: "=LEFT(A2, 2)",
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Công thức phải bắt đầu bằng '='." };
      if (!clean.startsWith("=LEFT")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là LEFT." };

      const str = gridData["2"]?.A || "12A1_NH2026";
      const res = str.substring(0, 2);

      if (clean.includes("A2") && clean.includes("2")) {
        return { isCorrect: true, resultValue: res, feedback: `Chính xác! 🎉 Hàm LEFT đã cắt 2 ký tự bên trái ra '${res}'.` };
      }
      return {
        isCorrect: false,
        resultValue: "#VALUE!",
        feedback: "Cú pháp gợi ý: =LEFT(A2, 2)"
      };
    }
  },

  // 10. RIGHT
  {
    id: "right",
    name: "RIGHT",
    category: "Hàm tìm kiếm / Chuỗi",
    syntax: "=RIGHT(chuỗi_văn_bản, số_ký_tự)",
    description: "Trích xuất một số lượng ký tự nhất định tính từ bên PHẢI của chuỗi văn bản.",
    teacherTip: "Thích hợp khi trích xuất đuôi năm học hoặc số thứ tự ở cuối chuỗi mã.",
    columns: ["A", "B", "C"],
    columnLabels: ["Mã Học Sinh (A)", "Năm Học (B)", "Ghi Chú (C)"],
    gridRows: [
      { rowNum: 1, cells: { A: "Mã Học Sinh", B: "Năm Học", C: "Ghi chú" } },
      { rowNum: 2, cells: { A: "HS_ANNHO_2026", B: "?", C: "Trích 4 ký tự cuối bên phải" } },
    ],
    targetCell: { col: "B", row: 2 },
    targetLabel: "Ô B2 (Lấy 4 ký tự bên phải của 'HS_ANNHO_2026' tại A2)",
    taskTitle: "Bài tập 10: Trích xuất ký tự bên phải chuỗi",
    taskInstruction: "Dùng hàm RIGHT lấy 4 ký tự cuối bên phải của chuỗi ở ô A2 (để ra năm '2026').",
    sampleCorrectFormula: "=RIGHT(A2, 4)",
    evaluate: (formula, gridData) => {
      const clean = formula.trim().toUpperCase();
      if (!clean.startsWith("=")) return { isCorrect: false, resultValue: "#VALUE!", feedback: "Công thức phải bắt đầu bằng '='." };
      if (!clean.startsWith("=RIGHT")) return { isCorrect: false, resultValue: "#NAME?", feedback: "Tên hàm phải là RIGHT." };

      const str = gridData["2"]?.A || "HS_ANNHO_2026";
      const res = str.slice(-4);

      if (clean.includes("A2") && clean.includes("4")) {
        return { isCorrect: true, resultValue: res, feedback: `Chính xác! 🎉 Hàm RIGHT đã cắt 4 ký tự bên phải ra '${res}'.` };
      }
      return {
        isCorrect: false,
        resultValue: "#VALUE!",
        feedback: "Cú pháp gợi ý: =RIGHT(A2, 4)"
      };
    }
  }
];
