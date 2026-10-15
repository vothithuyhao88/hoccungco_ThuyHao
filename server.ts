import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK securely on the server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// System instructions that strictly shape the AI to behave like Cô Thuý Hào
const SYSTEM_INSTRUCTION = `Bạn là Cô Thuý Hào, một giáo viên/trợ giảng môn Tin học THPT cực kỳ nhiệt tình, thân thiện và kiên nhẫn.
Nhiệm vụ chính của bạn là giúp học sinh trả lời các câu hỏi, giải thích các khái niệm và hướng dẫn thực hành môn Tin học THPT theo chương trình giáo dục phổ thông Việt Nam (Lớp 10, Lớp 11, Lớp 12).

XƯNG HÔ VÀ VĂN PHONG:
- Luôn xưng "Cô" và gọi học sinh là "em" hoặc "các em".
- Sử dụng ngôn ngữ gần gũi, dễ hiểu, tích cực, truyền cảm hứng và kiên nhẫn với lứa tuổi học sinh cấp 3 (THPT).

NGUYÊN TẮC TRẢ LỜI NGHIÊM NGẶT:
1. Bám sát kiến thức Tin học THPT: Chỉ tập trung giải thích các chủ đề liên quan đến Tin học phổ thông như:
   - Lập trình Python (Lớp 10): Biến, kiểu dữ liệu, rẽ nhánh if-else, vòng lặp for/while, danh sách (list), hàm (def), thuật toán cơ bản.
   - Cơ sở dữ liệu & SQL (Lớp 11): Khái niệm CSDL quan hệ, bảng, khóa chính, khóa ngoài, truy vấn SQL cơ bản (SELECT, INSERT, UPDATE, DELETE).
   - Thiết kế Web (Lớp 11): HTML (tags, cấu trúc trang), CSS (styling, màu sắc, khoảng cách, font).
   - Tin học văn phòng (Lớp 10/11): Excel cơ bản (hàm SUM, AVERAGE, IF, COUNTIF, VLOOKUP, HLOOKUP, rải bảng tính), Word và PowerPoint.
   - Hệ điều hành, mạng máy tính, internet, an toàn thông tin, bảo mật thông tin, đạo đức số (Lớp 10, 11, 12).
   - Trí tuệ nhân tạo (AI), mạng xã hội, chuyển đổi số (Lớp 12).
   
2. KHÔNG TỰ BỊA THÔNG TIN hoặc đưa ra kiến thức quá cao siêu (đại học chuyên ngành sâu) trừ khi học sinh hỏi cụ thể và cần làm rõ một cách đơn giản nhất. Hãy giữ mọi thứ ở mức độ THPT dễ hiểu.

3. XỬ LÝ KHI THIẾU THÔNG TIN HOẶC HỎI NGOÀI CHỦ ĐỀ TIN HỌC:
   Nếu học sinh hỏi một vấn đề không liên quan đến Tin học (Ví dụ hỏi về Lịch sử, Văn học, Hoá học hoặc các vấn đề giải trí ngoài giáo dục) hoặc hỏi những vấn đề quá xa vời không có trong chương trình phổ thông, em PHẢI trả lời chính xác và lịch sự theo mẫu sau:
   "Thầy/Cô chưa tìm thấy thông tin này trong sách giáo khoa hiện tại của chúng ta. Em có thể kiểm tra lại câu hỏi hoặc hỏi giáo viên trên lớp để được giải đáp thêm nhé!"
   (Chú ý: Hãy linh hoạt đổi "Thầy/Cô" thành "Cô" để đúng với nhân vật Cô Thuý Hào: "Cô chưa tìm thấy thông tin này trong sách giáo khoa hiện tại của chúng ta. Em có thể kiểm tra lại câu hỏi hoặc hỏi giáo viên trên lớp để được giải đáp thêm nhé!")

4. KHUYẾN KHÍCH TƯ DUY (QUAN TRỌNG):
   - Khi học sinh hỏi bài tập lập trình (Python) hoặc bài tập SQL, Excel: TUYỆT ĐỐI không đưa thẳng code đáp án ngay lập tức.
   - Hãy giải thích ý tưởng trước (Step-by-step), hướng dẫn cách phân tích bài toán, phân tích các bước cần làm.
   - Gợi ý cấu trúc code (như cấu trúc vòng lặp cần dùng, điều kiện rẽ nhánh ra sao) hoặc viết mã giả (pseudo-code).
   - Gợi ý cho học sinh tự viết và gửi cô sửa.
   - Chỉ khi học sinh thực sự bế tắc hoặc nói "Cô viết code mẫu giúp em", bạn mới đưa code mẫu sạch, ngắn gọn, có chú thích tiếng Việt cực kỳ chi tiết từng dòng, và giải thích vì sao viết như vậy. Sau đó ra một bài tập nhỏ tương tự để em tự luyện tập.

5. TRÍCH DẪN SÁCH:
   - Hãy gợi ý cho học sinh biết kiến thức đó nằm ở lớp mấy, chương nào hoặc chủ đề nào trong chương trình Tin học THPT mới (ví dụ: Chủ đề F - Giải quyết vấn đề với sự trợ giúp của máy tính, Lập trình Python lớp 10, hay Chủ đề D - Đạo đức, pháp luật và văn hoá trong môi trường số) để học sinh dễ dàng tra cứu học tập.`;

// Helper to resolve API Key according to strict fallback rules:
// Step 1: Request payload personalApiKey (or apiKey)
// Step 2: Firestore settings/ai_config globalApiKey
// Step 3: process.env.GEMINI_API_KEY
async function getResolvedGeminiClient(requestedKey?: string) {
  let keyToUse = requestedKey ? requestedKey.trim() : "";
  let keySource: "personal" | "global" | "env" = "personal";

  if (!keyToUse) {
    // Step 2: Fetch Global API Key from Firestore settings/ai_config
    try {
      const projectId = process.env.FIREBASE_PROJECT_ID || "thuyhao3007";
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/ai_config`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const firestoreKey = data?.fields?.apiKey?.stringValue;
        if (firestoreKey && firestoreKey.trim()) {
          keyToUse = firestoreKey.trim();
          keySource = "global";
        }
      }
    } catch (err) {
      console.warn("[Server] Could not fetch global API key from Firestore:", err);
    }
  }

  if (!keyToUse && process.env.GEMINI_API_KEY) {
    keyToUse = process.env.GEMINI_API_KEY.trim();
    keySource = "env";
  }

  // Step 3: Return 401 error if both are missing
  if (!keyToUse) {
    throw {
      statusCode: 401,
      code: "NO_API_KEY",
      message: "Chưa cấu hình Gemini API Key trên hệ thống. Vui lòng nhập Personal API Key cá nhân trong menu ⚙️ Cấu hình AI để tiếp tục!"
    };
  }

  const client = new GoogleGenAI({
    apiKey: keyToUse,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  return { client, keySource, apiKey: keyToUse };
}

// Helper to resolve chosen model name
function getModelName(customModel?: string) {
  if (customModel && customModel.trim() && customModel !== "custom") {
    return customModel.trim();
  }
  return "gemini-2.5-flash";
}

// Format server errors for Gemini API
function handleGeminiServerError(res: express.Response, error: any) {
  console.error("[Server Gemini Error]:", error);

  if (error?.statusCode === 401 || error?.code === "NO_API_KEY") {
    return res.status(401).json({
      error: "NO_API_KEY",
      message: error.message || "Vui lòng nhập Personal API Key trong menu ⚙️ Cấu hình AI để sử dụng tính năng này!"
    });
  }

  const errStr = String(error?.message || error || "").toLowerCase();

  // Step 4: Handle 429 Quota Exceeded / Service Unavailable
  if (errStr.includes("429") || errStr.includes("resource_exhausted") || errStr.includes("quota")) {
    return res.status(429).json({
      error: "QUOTA_EXHAUSTED",
      message: "⚠️ Global API Key hiện tại đã vượt quá hạn mức truy cập (Quota Exceeded). Vui lòng tự nhập mã Personal API Key cá nhân của bạn trong menu ⚙️ Cấu hình AI để tiếp tục sử dụng mượt mà nhé!"
    });
  }

  if (errStr.includes("400") || errStr.includes("invalid") || errStr.includes("api_key_invalid")) {
    return res.status(400).json({
      error: "INVALID_API_KEY",
      message: "❌ Mã Gemini API Key không hợp lệ hoặc đã bị vô hiệu hóa. Vui lòng kiểm tra và cập nhật lại trong menu ⚙️ Cấu hình AI!"
    });
  }

  return res.status(500).json({
    error: "AI_SERVER_ERROR",
    message: error?.message || "Đã xảy ra lỗi khi kết nối với AI. Vui lòng kiểm tra lại cấu hình API Key!"
  });
}

// API endpoint to test Gemini API key connection
app.post("/api/test-key", async (req, res) => {
  try {
    const { apiKey, personalApiKey, model } = req.body;
    const keyToTest = personalApiKey || apiKey;
    const { client, keySource } = await getResolvedGeminiClient(keyToTest);
    const targetModel = getModelName(model);

    const response = await client.models.generateContent({
      model: targetModel,
      contents: "Xin chào! Trả lời đúng 1 từ 'OK' để xác nhận kết nối thành công.",
      config: {
        temperature: 0.1,
      },
    });

    if (response.text) {
      res.json({
        success: true,
        modelUsed: targetModel,
        keySource,
        message: `🎉 Kết nối thành công! Gemini API Key (${keySource === "personal" ? "Cá nhân" : "Global Firestore"}) và phiên bản ${targetModel} đang hoạt động tốt.`
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Không nhận được phản hồi từ mô hình Gemini."
      });
    }
  } catch (error: any) {
    handleGeminiServerError(res, error);
  }
});

// API endpoint to list/refresh available Gemini models
app.post("/api/list-models", async (req, res) => {
  try {
    const modelsList = [
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Tốc độ cực nhanh - Phản hồi tức thì)", recommended: true, badge: "Khuyên dùng" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (Tư duy toán học & Logic chuyên sâu)", recommended: false, badge: "Thông minh" },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash (Thế hệ mới - Đa phương thức)", recommended: false, badge: "Mới" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash (Xử lý tiêu chuẩn - Ổn định cao)", recommended: false, badge: "Ổn định" },
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro (Hỗ trợ ngữ cảnh siêu lớn)", recommended: false, badge: "Chuyên sâu" },
      { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash (Mô hình thử nghiệm mới)", recommended: false, badge: "Mới nhất" },
      { id: "custom", name: "✏️ Nhập phiên bản mô hình tùy chỉnh (Custom Model ID)", recommended: false, badge: "Tự chọn" }
    ];

    res.json({
      success: true,
      models: modelsList,
      message: "Đã làm mới danh sách phiên bản mô hình Gemini thành công!"
    });
  } catch (error: any) {
    res.status(500).json({ error: "Không thể lấy danh sách mô hình." });
  }
});

// API endpoint for Cô Thuý Hào's Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, attachment, apiKey, personalApiKey, model } = req.body;

    if (!message && !attachment) {
      return res.status(400).json({ error: "Tin nhắn hoặc tài liệu không được để trống" });
    }

    const keyToUse = personalApiKey || apiKey;
    const { client } = await getResolvedGeminiClient(keyToUse);
    const targetModel = getModelName(model);

    // Convert history format to Gemini parts
    const contents: any[] = [];

    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: (msg.sender === "user" || msg.role === "user") ? "user" : "model",
          parts: [{ text: msg.text || msg.message || "" }],
        });
      });
    }

    // Add current message parts
    const userParts: any[] = [];

    if (attachment) {
      if (attachment.type === "image" || attachment.type === "pdf" || attachment.base64) {
        let base64Data = attachment.base64 || attachment.data || "";
        const marker = ";base64,";
        const markerIndex = base64Data.indexOf(marker);
        if (markerIndex !== -1) {
          base64Data = base64Data.substring(markerIndex + marker.length);
        }

        userParts.push({
          inlineData: {
            mimeType: attachment.mimeType || attachment.type || "image/png",
            data: base64Data,
          }
        });
      } else if (attachment.type === "text" && attachment.data) {
        userParts.push({
          text: `\n\n--- [TÀI LIỆU ĐÍNH KÈM: ${attachment.name || "Tài liệu"}] ---\n${attachment.data}\n--- [HẾT TÀI LIỆU ĐÍNH KÈM] ---\n`
        });
      }
    }

    // Add user text
    userParts.push({ text: message || "Cô xem giúp em tài liệu đính kèm này với ạ!" });

    contents.push({
      role: "user",
      parts: userParts,
    });

    const response = await client.models.generateContent({
      model: targetModel,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Cô xin lỗi, hệ thống bị gián đoạn một chút. Em có thể gửi lại câu hỏi được không?";
    res.json({ reply: replyText, modelUsed: targetModel });
  } catch (error: any) {
    handleGeminiServerError(res, error);
  }
});

// API endpoint to generate 15-question structured quiz for a lesson
app.post("/api/lesson-quiz", async (req, res) => {
  try {
    const { grade, topic, title, content, weakTopics, apiKey, personalApiKey, model } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Thiếu tiêu đề hoặc nội dung bài học để soạn câu hỏi." });
    }

    const keyToUse = personalApiKey || apiKey;
    const { client } = await getResolvedGeminiClient(keyToUse);
    const targetModel = getModelName(model);

    const weakTopicInstruction = Array.isArray(weakTopics) && weakTopics.length > 0
      ? `\nĐẶC BIỆT CHÚ Ý (AI GHI NHỚ MẶT BÀI HỌC SINH YẾU): Học sinh vừa trả lời sai các kiến thức sau: [${weakTopics.join("; ")}]. Hãy TĂNG TẦN SUẤT các câu hỏi xoay quanh những điểm yếu này để giúp học sinh khắc phục lỗ hổng kiến thức!\n`
      : "";

    const prompt = `Bạn là Cô Thuý Hào - Giáo viên Tin học THPT với 20 năm kinh nghiệm, tác giả SGK & chuyên gia biên soạn đề thi Tin học THPT (Kết nối tri thức).
Nhiệm vụ: Biên soạn bộ bài tập vận dụng gồm chính xác 15 câu hỏi hoàn toàn MỚI, NGẪU NHIÊN, KHÔNG LẶP LẠI bám sát nội dung SGK bài học dưới đây:

Thông tin bài học:
- Khối lớp: Lớp ${grade || "11"}
- Chủ đề: ${topic || ""}
- Bài học: ${title}
- Nội dung SGK cốt lõi:
${content}
${weakTopicInstruction}

TỶ LỆ PHÂN BỔ MỨC ĐỘ CÂU HỎI BẮT BUỘC TRÊN TỔNG 15 CÂU:
- 40% Nhận biết (6 câu): Kiểm tra trí nhớ trực tiếp từ SGK.
- 30% Thông hiểu (5 câu): Kiểm tra khả năng giải thích bản chất khái niệm.
- 20% Vận dụng (3 câu): Cho tình huống thực tế hoặc đoạn mã / công thức / thao tác.
- 10% Vận dụng cao (1 câu): Phân tích, tổng hợp nâng cao hoặc tối ưu bài toán.

CẤU TRÚC 15 CÂU HỎI TRONG DỮ LIỆU JSON TRẢ VỀ:
1. multipleChoice (đúng 5 câu): Trắc nghiệm 4 đáp án (A, B, C, D). Gồm cả câu hỏi Thực hành (cho đoạn mã/thuộc tính CSS/Python/SQL/Excel và hỏi kết quả).
2. shortAnswer (đúng 5 câu): Điền khuyết / Trả lời ngắn / Thực hành điền câu lệnh. correctAnswer là từ khóa/câu lệnh/con số chính xác từ SGK.
3. trueFalse (đúng 5 câu): Câu hỏi Đúng / Sai. Mỗi câu là 1 nhận định tình huống SGK.

QUY TẮC GIẢI THÍCH (explanation):
- Viết dưới 3 dòng, ngắn gọn, súc tích.
- Văn phong ân cần, yêu thương của Cô Thuý Hào (xưng "Cô", gọi "em").
- Nếu học sinh chọn SAI, lời giải thích BẮT BUỘC chứa phần [📌 Nhắc lại SGK: ...] trích dẫn chính xác quy tắc kiến thức chuẩn SGK để học sinh khắc sâu memory.`;

    const response = await client.models.generateContent({
      model: targetModel,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\n\nBạn bắt buộc phải xuất ra dữ liệu ở định dạng JSON phù hợp chính xác với cấu trúc responseSchema được yêu cầu.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            multipleChoice: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  level: { type: Type.STRING, description: "Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao" },
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Mảng chứa đúng 4 đáp án văn bản" },
                  correctIndex: { type: Type.INTEGER, description: "Chỉ số đáp án đúng từ 0 đến 3" },
                  explanation: { type: Type.STRING, description: "Lời giải thích ngắn gọn (≤3 dòng) kèm 📌 Nhắc lại SGK" }
                },
                required: ["id", "level", "question", "options", "correctIndex", "explanation"]
              }
            },
            shortAnswer: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  level: { type: Type.STRING, description: "Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao" },
                  question: { type: Type.STRING },
                  correctAnswer: { type: Type.STRING, description: "Từ khóa đáp án ngắn gọn, từ/số/câu lệnh chuẩn" },
                  explanation: { type: Type.STRING, description: "Lời giải thích ngắn gọn (≤3 dòng) kèm 📌 Nhắc lại SGK" }
                },
                required: ["id", "level", "question", "correctAnswer", "explanation"]
              }
            },
            trueFalse: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  level: { type: Type.STRING, description: "Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao" },
                  question: { type: Type.STRING },
                  correctAnswer: { type: Type.BOOLEAN, description: "Nhận định này đúng (true) hay sai (false)" },
                  explanation: { type: Type.STRING, description: "Lời giải thích ngắn gọn (≤3 dòng) kèm 📌 Nhắc lại SGK" }
                },
                required: ["id", "level", "question", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["multipleChoice", "shortAnswer", "trueFalse"]
        }
      }
    });

    const quizJsonStr = response.text || "{}";
    const quizData = JSON.parse(quizJsonStr);
    res.json(quizData);
  } catch (error: any) {
    handleGeminiServerError(res, error);
  }
});

// Configure Vite or Static files depending on environment
async function startServer() {
  if (process.env.VERCEL) {
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();

export default app;
