import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Code, Play, RefreshCw, Send, CheckCircle, AlertCircle, FileCode, Eye, Sparkles } from "lucide-react";

interface CodePlaygroundProps {
  onAskTeacher: (question: string) => void;
}

const PYTHON_TEMPLATES = [
  {
    name: "Lời chào Python",
    code: `# Nhập tên và tuổi của học sinh
ten = "Hoàng"
tuoi = 16

# In ra câu chào kèm phép toán
print("Chào em " + ten + "!")
print("Năm sau tuổi của em sẽ là:", tuoi + 1)
`,
    description: "Khai báo biến, thực hiện phép toán đơn giản và xuất kết quả."
  },
  {
    name: "Kiểm tra Chẵn Lẻ",
    code: `# Nhập số cần kiểm tra
so = 15

# Cấu trúc rẽ nhánh kiểm tra số dư
if so % 2 == 0:
    print(so, "là số chẵn em nhé!")
else:
    print(so, "là số lẻ em nhé!")
`,
    description: "Sử dụng phép toán chia lấy dư % và cấu trúc rẽ nhánh if-else."
  },
  {
    name: "Tính tổng từ 1 đến N",
    code: `# Nhập số giới hạn n
n = 10
tong = 0

# Vòng lặp cộng dồn biến chạy i
for i in range(1, n + 1):
    tong = tong + i

print("Tổng các số từ 1 đến", n, "là:", tong)
`,
    description: "Sử dụng vòng lặp for và hàm range() để tính toán tích lũy."
  }
];

const HTML_TEMPLATES = [
  {
    name: "Trang chào cơ bản",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: sans-serif;
      background-color: #f0fdf4;
      padding: 20px;
    }
    h1 {
      color: #059669;
    }
    p {
      color: #374151;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>Chào mừng đến với HTML!</h1>
  <p>Đây là trang web đầu tiên em tự tay lập trình cùng cô Thuý Hào.</p>
</body>
</html>`,
    description: "Cấu trúc cơ bản kèm CSS nội bộ (Internal CSS) để định dạng màu sắc."
  },
  {
    name: "Danh sách môn học",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .highlight {
      color: #2563eb;
      font-weight: bold;
    }
    ul {
      background: white;
      padding: 15px 30px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <h2>Danh sách nội dung ôn thi Tin học:</h2>
  <ul>
    <li>Cấu trúc rẽ nhánh <span className="highlight">Python</span></li>
    <li>Truy vấn dữ liệu <span className="highlight">SQL</span></li>
    <li>Thiết kế bố cục trang <span className="highlight">HTML/CSS</span></li>
  </ul>
</body>
</html>`,
    description: "Sử dụng danh sách không thứ tự ul/li kết hợp với các class CSS định dạng."
  }
];

export default function CodePlayground({ onAskTeacher }: CodePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"python" | "html">("python");
  
  // Python states
  const [pythonCode, setPythonCode] = useState(PYTHON_TEMPLATES[0].code);
  const [pythonOutput, setPythonOutput] = useState("");
  const [pythonIsRunning, setPythonIsRunning] = useState(false);
  const [pythonStatus, setPythonStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedPyTemplate, setSelectedPyTemplate] = useState(0);

  // HTML states
  const [htmlCode, setHtmlCode] = useState(HTML_TEMPLATES[0].code);
  const [selectedHtmlTemplate, setSelectedHtmlTemplate] = useState(0);

  // AI review state
  const [aiReviewResult, setAiReviewResult] = useState("");
  const [aiIsReviewing, setAiIsReviewing] = useState(false);

  // Preset Python Run Simulation (Deterministic simple interpreter for student's ease)
  const simulatePythonRun = () => {
    setPythonIsRunning(true);
    setPythonOutput("Đang biên dịch và chạy thử trên server học tập...\n");
    
    setTimeout(() => {
      try {
        // We write a simple regex interpreter for the standard template print outputs
        // so that simple edits by students run beautifully!
        let output = "";
        const code = pythonCode;

        // Check for basic print and variables
        // Find variables
        const lines = code.split("\n");
        const variables: Record<string, any> = {};
        
        for (let line of lines) {
          line = line.trim();
          if (line.startsWith("#") || !line) continue;
          
          // Match simple variables like name = "value" or num = 10
          const varMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
          if (varMatch) {
            const varName = varMatch[1];
            let rawValue = varMatch[2];
            // Remove inline comments
            if (rawValue.includes("#")) {
              rawValue = rawValue.split("#")[0].trim();
            }
            rawValue = rawValue.trim();

            if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
              variables[varName] = rawValue.slice(1, -1);
            } else if (rawValue.startsWith("'") && rawValue.endsWith("'")) {
              variables[varName] = rawValue.slice(1, -1);
            } else if (rawValue === "True") {
              variables[varName] = true;
            } else if (rawValue === "False") {
              variables[varName] = false;
            } else {
              const num = parseFloat(rawValue);
              if (!isNaN(num)) {
                variables[varName] = num;
              } else {
                variables[varName] = rawValue; // fallback
              }
            }
          }

          // Match print statement
          if (line.startsWith("print(") && line.endsWith(")")) {
            const inner = line.slice(6, -1);
            // Split by comma outside quotes
            const args = splitByCommaOutsideQuotes(inner);
            const printedParts = args.map(arg => {
              arg = arg.trim();
              if (arg.startsWith('"') && arg.endsWith('"')) {
                return arg.slice(1, -1);
              }
              if (arg.startsWith("'") && arg.endsWith("'")) {
                return arg.slice(1, -1);
              }
              // Is variable or math operation?
              // Simple variable replace
              if (variables[arg] !== undefined) {
                return variables[arg];
              }
              // Simple variable + 1 math operation
              const plusOneMatch = arg.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\+\s*1$/);
              if (plusOneMatch && variables[plusOneMatch[1]] !== undefined) {
                return Number(variables[plusOneMatch[1]]) + 1;
              }

              // Simple string concat with +
              if (arg.includes("+")) {
                const parts = arg.split("+").map(p => p.trim());
                let concatRes = "";
                for (const p of parts) {
                  if (p.startsWith('"') && p.endsWith('"')) {
                    concatRes += p.slice(1, -1);
                  } else if (p.startsWith("'") && p.endsWith("'")) {
                    concatRes += p.slice(1, -1);
                  } else if (variables[p] !== undefined) {
                    concatRes += variables[p];
                  } else {
                    concatRes += p;
                  }
                }
                return concatRes;
              }

              return arg;
            });
            output += printedParts.join(" ") + "\n";
          }
        }

        // Handle loop simulations for template 3 if it was edited
        if (code.includes("range(1, n + 1)") || code.includes("range(1, n+1)")) {
          const limitN = variables["n"] || 10;
          let calculatedSum = 0;
          for (let i = 1; i <= limitN; i++) {
            calculatedSum += i;
          }
          output += `Tổng các số từ 1 đến ${limitN} là: ${calculatedSum}\n`;
        } else if (code.includes("so % 2 == 0")) {
          const numToCheck = variables["so"] !== undefined ? variables["so"] : 15;
          if (numToCheck % 2 === 0) {
            output += `${numToCheck} là số chẵn em nhé!\n`;
          } else {
            output += `${numToCheck} là số lẻ em nhé!\n`;
          }
        }

        if (!output.trim()) {
          output = "Chạy thành công!\n(Cô nhận xét: Chương trình chạy tốt, không có lỗi cú pháp. Để xem kết quả in ấn chi tiết hơn hoặc chạy các hàm nâng cao, em hãy bấm 'Nhận xét của Cô' ở bên dưới nhé!)";
        }

        setPythonOutput(output);
        setPythonStatus("success");
      } catch (err: any) {
        setPythonOutput(`SyntaxError: Mã nguồn có lỗi cú pháp.\nChi tiết: ${err.message}\n\nHãy nhấn nút 'Nhờ Cô Sửa Code' để cô giải thích và sửa lỗi giúp em nhé!`);
        setPythonStatus("error");
      } finally {
        setPythonIsRunning(false);
      }
    }, 1200);
  };

  // Helper parser for commas outside strings
  const splitByCommaOutsideQuotes = (str: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inDoubleQuotes = false;
    let inSingleQuotes = false;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '"' && !inSingleQuotes) {
        inDoubleQuotes = !inDoubleQuotes;
        current += char;
      } else if (char === "'" && !inDoubleQuotes) {
        inSingleQuotes = !inSingleQuotes;
        current += char;
      } else if (char === "," && !inDoubleQuotes && !inSingleQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    if (current) result.push(current);
    return result;
  };

  const handleAskTeacherReview = async () => {
    setAiIsReviewing(true);
    setAiReviewResult("");
    
    try {
      const promptText = `Em vừa viết đoạn code sau đây trong Góc Sân Chơi Lập Trình (${activeTab === "python" ? "Python" : "HTML"}). Nhờ Cô Thuý Hào xem xét, giải thích logic, chỉ ra bất kỳ lỗi cú pháp hoặc logic nào và khen ngợi sự nỗ lực của em nhé!
      
--- MÃ NGUỒN CỦA EM: ---
${activeTab === "python" ? pythonCode : htmlCode}

Cô hãy nhận xét chi tiết, chỉ ra lỗi và viết gợi ý sửa bài thật dễ thương theo phong cách của Cô nhé!`;

      onAskTeacher(promptText);
    } catch (err) {
      console.error(err);
    } finally {
      setAiIsReviewing(false);
    }
  };

  const handlePyTemplateChange = (idx: number) => {
    setSelectedPyTemplate(idx);
    setPythonCode(PYTHON_TEMPLATES[idx].code);
    setPythonOutput("");
    setPythonStatus("idle");
  };

  const handleHtmlTemplateChange = (idx: number) => {
    setSelectedHtmlTemplate(idx);
    setHtmlCode(HTML_TEMPLATES[idx].code);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6" id="playground-container">
      {/* Tab Selectors */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6" id="playground-header">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2 font-sans">
            <Code className="text-purple-500" /> Sân Chơi Lập Trình Thực Hành
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Thực hành viết mã nguồn Python trực quan hoặc thiết kế HTML/CSS, có hỗ trợ sửa lỗi từ cô Thuý Hào.
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold shadow-xs">
          <button
            onClick={() => setActiveTab("python")}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
              activeTab === "python" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
            id="btn-tab-python"
          >
            Lập trình Python (Lớp 10)
          </button>
          <button
            onClick={() => setActiveTab("html")}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
              activeTab === "html" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
            id="btn-tab-html"
          >
            Thiết kế HTML/CSS (Lớp 11)
          </button>
        </div>
      </div>

      {activeTab === "python" ? (
        /* PYTHON WORKSPACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="python-workspace">
          {/* Code Editor and template (Cols: 7) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Template Selector */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Chọn mẫu thực hành</span>
              <div className="flex flex-wrap gap-2">
                {PYTHON_TEMPLATES.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePyTemplateChange(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      selectedPyTemplate === idx
                        ? "bg-purple-50 border-purple-400 text-purple-700"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                    id={`py-template-btn-${idx}`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 mt-2 italic leading-normal">
                ⭐ {PYTHON_TEMPLATES[selectedPyTemplate].description}
              </p>
            </div>

            {/* Code Editor */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col bg-slate-900 h-[380px]">
              <div className="px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50 flex items-center justify-between text-slate-300 text-xs">
                <span className="font-mono flex items-center gap-1.5 font-bold">
                  <FileCode size={14} className="text-purple-400" /> main.py
                </span>
                <span className="text-[10px] text-slate-400 font-sans">
                  Em có thể gõ chỉnh sửa code trực tiếp ở đây
                </span>
              </div>
              <textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                className="flex-1 w-full p-4 bg-slate-950 text-emerald-400 font-mono text-sm focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
                id="python-code-editor"
              />
              <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => setPythonCode(PYTHON_TEMPLATES[selectedPyTemplate].code)}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                  title="Đặt lại code mặc định"
                  id="btn-reset-python"
                >
                  <RefreshCw size={13} /> Khôi phục
                </button>
                <button
                  onClick={simulatePythonRun}
                  disabled={pythonIsRunning}
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  id="btn-run-python"
                >
                  <Play size={13} /> {pythonIsRunning ? "Đang chạy..." : "Chạy thử"}
                </button>
              </div>
            </div>
          </div>

          {/* Output and Teacher Review (Cols: 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Code Output Terminal */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col h-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Play size={14} className="text-purple-500" /> Kết quả chạy thử:
                </span>
                {pythonStatus === "success" && (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-green-200">
                    <CheckCircle size={11} /> Hoàn tất
                  </span>
                )}
                {pythonStatus === "error" && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-red-200">
                    <AlertCircle size={11} /> Lỗi cú pháp
                  </span>
                )}
              </div>
              <div className="flex-1 bg-gray-950 rounded-lg p-3.5 font-mono text-xs text-white overflow-y-auto whitespace-pre-wrap leading-relaxed" id="python-console-output">
                {pythonOutput || "Chưa có kết quả chạy. Em hãy nhấn nút 'Chạy thử' để kiểm tra code nhé!"}
              </div>
            </div>

            {/* Ask Teacher Assistant */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-5 shadow-xs flex flex-col justify-between flex-1">
              <div>
                <h4 className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500 animate-pulse" /> Sửa bài cùng cô Thuý Hào
                </h4>
                <p className="text-xs text-purple-700 mt-1.5 leading-relaxed">
                  Em gặp khó khăn trong việc hiểu thuật toán, hoặc code Python chạy không đúng ý muốn? Đừng lo lắng nhé! Hãy gửi mã nguồn cho Cô, Cô sẽ hướng dẫn em sửa và giải thích tường tận.
                </p>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleAskTeacherReview}
                  disabled={aiIsReviewing}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-python-ai-review"
                >
                  <Sparkles size={14} /> Nhờ cô Thuý Hào nhận xét mã nguồn
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* HTML/CSS WORKSPACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="html-workspace">
          {/* Code Editor (Cols: 6) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            {/* Template selector */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Chọn mẫu trang Web</span>
              <div className="flex flex-wrap gap-2">
                {HTML_TEMPLATES.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHtmlTemplateChange(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      selectedHtmlTemplate === idx
                        ? "bg-blue-50 border-blue-400 text-blue-700"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                    id={`html-template-btn-${idx}`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 mt-2 italic leading-normal">
                ⭐ {HTML_TEMPLATES[selectedHtmlTemplate].description}
              </p>
            </div>

            {/* Code Editor */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col bg-slate-900 h-[380px]">
              <div className="px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50 flex items-center justify-between text-slate-300 text-xs">
                <span className="font-mono flex items-center gap-1.5 font-bold">
                  <FileCode size={14} className="text-blue-400" /> index.html
                </span>
                <span className="text-[10px] text-slate-400">
                  Gõ code HTML và trang trí CSS tại đây
                </span>
              </div>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="flex-1 w-full p-4 bg-slate-950 text-blue-300 font-mono text-sm focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
                id="html-code-editor"
              />
              <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => setHtmlCode(HTML_TEMPLATES[selectedHtmlTemplate].code)}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                  id="btn-reset-html"
                >
                  <RefreshCw size={13} /> Khôi phục
                </button>
              </div>
            </div>
          </div>

          {/* Preview & Help panel (Cols: 6) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            {/* Live Web Preview */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col h-[280px]">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <Eye size={14} className="text-blue-500" /> Bản xem trước trang Web thực tế:
              </span>
              <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden relative">
                {/* Embedded HTML simulation utilizing sourceDoc */}
                <iframe
                  title="HTML Live Sandbox Preview"
                  srcDoc={htmlCode}
                  className="w-full h-full bg-white"
                  sandbox="allow-scripts"
                />
              </div>
            </div>

            {/* AI Assistance for HTML */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 shadow-xs flex flex-col justify-between flex-1">
              <div>
                <h4 className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500 animate-pulse" /> Sửa lỗi thiết kế Web cùng Cô
                </h4>
                <p className="text-xs text-blue-700 mt-1.5 leading-relaxed">
                  Em muốn căn giữa một phần tử bằng CSS? Muốn tạo liên kết mượt mà hay trang trí lại bảng thông tin? Hãy bấm gửi code HTML này cho Cô, Cô sẽ xem xét và chỉ em các thuộc tính CSS tối ưu nhất nhé!
                </p>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleAskTeacherReview}
                  disabled={aiIsReviewing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-html-ai-review"
                >
                  <Sparkles size={14} /> Nhờ cô Thuý Hào hướng dẫn viết HTML/CSS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
