import { GoogleGenAI } from "@google/genai";
import { getAIConfig, getEffectiveApiKey, fetchGlobalAIConfig, formatFriendlyErrorMessage } from "./aiConfig";
import { LessonQuiz, MultipleChoiceQuestion, ShortAnswerQuestion, TrueFalseQuestion } from "../types";

const TEACHER_SYSTEM_INSTRUCTION = `
Bạn là Cô Thuý Hào - Giáo viên bộ môn Tin học THPT chuyên môn cao, cực kỳ tận tâm, dịu dàng, chu đáo và thân thiện với học sinh THPT (Lớp 10, 11, 12) tại An Nhơn & Toàn quốc.
Nhiệm vụ của bạn là giải đáp thắc mắc, hướng dẫn làm bài tập Tin học THPT theo chương trình SGK mới (Kết nối tri thức, Cánh diều, Chân trời sáng tạo).

Xưng hô:
- Luôn xưng "Cô" hoặc "Cô Thuý Hào" và gọi học sinh là "em" hoặc "em yêu".
- Giọng văn ấm áp, truyền cảm hứng, động viên học sinh hăng hái học tập.

Quy tắc trả lời:
1. Giải thích khái niệm Tin học (Python, CSDL SQL, HTML/CSS Web, Mạng máy tính TCP/IP, An toàn thông tin, Trí tuệ nhân tạo AI...) ngắn gọn, trực quan, từng bước.
2. Với bài tập lập trình Python, SQL, Web HTML/CSS: Đưa ra mã nguồn chuẩn xác, thụt lề chuẩn, trình bày dạng Markdown code block, giải thích chi tiết ý nghĩa từng câu lệnh.
3. Nhắc nhở các lỗi sai thường gặp (như thụt lề IndentationError trong Python, sai cú pháp SQL...).
`;

function resolveModelName(modelArg?: string): string {
  const config = getAIConfig();
  const m = modelArg || config.selectedModel;
  if (m === "custom") {
    return config.customModelName || "gemini-2.5-flash";
  }
  return m || "gemini-2.5-flash";
}

/**
 * Clean base64 string from Data URL if present
 */
function cleanBase64(dataUrl: string): { mimeType: string; data: string } {
  if (dataUrl.includes(";base64,")) {
    const parts = dataUrl.split(";base64,");
    const mimeType = parts[0].replace("data:", "");
    return { mimeType, data: parts[1] };
  }
  return { mimeType: "image/jpeg", data: dataUrl };
}

export async function callAIChat(params: {
  message: string;
  history?: any[];
  attachment?: { name: string; type: string; base64: string } | null;
  apiKey?: string;
  model?: string;
}): Promise<string> {
  // 1. Try server endpoint first if available
  try {
    const personalKey = params.apiKey || getAIConfig().apiKey;
    const targetModel = resolveModelName(params.model);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: params.message,
        history: params.history,
        attachment: params.attachment,
        personalApiKey: personalKey,
        model: targetModel,
      }),
    });

    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json();
      if (data.reply) {
        return data.reply;
      }
    }
  } catch (err) {
    console.warn("Server AI Chat endpoint failed or returned non-JSON, falling back to direct client call:", err);
  }

  // 2. Direct client-side call using @google/genai SDK
  try {
    let effectiveKey = params.apiKey || getEffectiveApiKey();
    if (!effectiveKey) {
      effectiveKey = await fetchGlobalAIConfig();
    }

    if (!effectiveKey) {
      return "Cô xin lỗi em, hệ thống chưa có mã Gemini API Key. Em hoặc Giáo viên vui lòng nhập API Key trong menu ⚙️ Cấu hình AI để bắt đầu nhé!";
    }

    const targetModel = resolveModelName(params.model);
    const ai = new GoogleGenAI({ apiKey: effectiveKey });

    const contents: any[] = [];
    if (params.history && Array.isArray(params.history)) {
      params.history.slice(-10).forEach((item) => {
        const role = item.sender === "user" ? "user" : "model";
        contents.push({
          role,
          parts: [{ text: item.text }]
        });
      });
    }

    const currentParts: any[] = [];
    let textPrompt = params.message;
    if (params.attachment) {
      if (params.attachment.type.startsWith("image/") || params.attachment.base64.startsWith("data:image/")) {
        const { mimeType, data } = cleanBase64(params.attachment.base64);
        currentParts.push({
          inlineData: {
            mimeType,
            data
          }
        });
        textPrompt = `[Hình ảnh đính kèm: ${params.attachment.name}]\n${params.message || "Cô xem và hướng dẫn em bài tập trong hình này với ạ!"}`;
      } else {
        textPrompt = `[Tài liệu đính kèm: ${params.attachment.name}]\nNội dung: ${params.attachment.base64.slice(0, 4000)}\n\nCâu hỏi: ${params.message}`;
      }
    }

    currentParts.push({ text: textPrompt || "Xin chào Cô!" });
    contents.push({
      role: "user",
      parts: currentParts
    });

    const response = await ai.models.generateContent({
      model: targetModel,
      contents,
      config: {
        systemInstruction: TEACHER_SYSTEM_INSTRUCTION,
        temperature: 0.7
      }
    });

    if (response.text) {
      return response.text;
    }

    return "Cô xin lỗi, hệ thống AI bị gián đoạn một chút. Em có thể gửi lại câu hỏi được không?";
  } catch (err: any) {
    console.error("Direct Client AI Chat Error:", err);
    return formatFriendlyErrorMessage(err);
  }
}

/**
 * Robust JSON Normalizer for Lesson Quiz response
 */
function normalizeLessonQuizData(parsed: any): LessonQuiz {
  let root = parsed;
  if (parsed && typeof parsed === "object" && parsed.quiz && !Array.isArray(parsed.quiz)) {
    root = parsed.quiz;
  }

  let mcList: any[] = [];
  let saList: any[] = [];
  let tfList: any[] = [];

  if (root && typeof root === "object" && !Array.isArray(root)) {
    mcList = root.multipleChoice || root.multiple_choice || root.mc || [];
    saList = root.shortAnswer || root.short_answer || root.sa || [];
    tfList = root.trueFalse || root.true_false || root.tf || [];
  } else if (Array.isArray(root)) {
    root.forEach((q: any) => {
      const typeStr = String(q.type || "").toLowerCase();
      if (typeStr.includes("choice") || typeStr.includes("mc") || Array.isArray(q.options)) {
        mcList.push(q);
      } else if (typeStr.includes("short") || typeStr.includes("sa") || (q.correctAnswer && typeof q.correctAnswer === "string")) {
        saList.push(q);
      } else if (typeStr.includes("true") || typeStr.includes("tf") || typeof q.correctAnswer === "boolean") {
        tfList.push(q);
      }
    });
  }

  const multipleChoice: MultipleChoiceQuestion[] = mcList.map((q, idx) => {
    const rawOptions = Array.isArray(q.options) && q.options.length >= 2 ? [...q.options] : ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"];
    while (rawOptions.length < 4) {
      rawOptions.push(`Lựa chọn ${rawOptions.length + 1}`);
    }
    let cIdx = typeof q.correctIndex === "number" ? q.correctIndex : 0;
    if (cIdx < 0 || cIdx >= rawOptions.length) cIdx = 0;

    return {
      id: q.id || `mc-${idx + 1}`,
      type: "multiple_choice",
      level: q.level || "Thông hiểu",
      question: q.question || `Câu hỏi trắc nghiệm ${idx + 1}`,
      options: rawOptions.slice(0, 4).map(String),
      correctIndex: cIdx,
      explanation: q.explanation || "Em hãy ghi nhớ nội dung lý thuyết trọng tâm của bài học nhé!"
    };
  });

  const shortAnswer: ShortAnswerQuestion[] = saList.map((q, idx) => ({
    id: q.id || `sa-${idx + 1}`,
    type: "short_answer",
    level: q.level || "Thông hiểu",
    question: q.question || `Câu hỏi trả lời ngắn ${idx + 1}`,
    correctAnswer: String(q.correctAnswer || q.answer || "Đáp án").trim(),
    explanation: q.explanation || "Em hãy liên hệ thực tế và áp dụng kiến thức bài học nhé!"
  }));

  const trueFalse: TrueFalseQuestion[] = tfList.map((q, idx) => ({
    id: q.id || `tf-${idx + 1}`,
    type: "true_false",
    level: q.level || "Thông hiểu",
    question: q.question || `Nhận định ${idx + 1}`,
    correctAnswer: typeof q.correctAnswer === "boolean" ? q.correctAnswer : Boolean(q.correctAnswer),
    explanation: q.explanation || "Phân tích kĩ lưỡng bản chất vấn đề để kết luận Đúng hoặc Sai em nhé!"
  }));

  if (multipleChoice.length === 0 && shortAnswer.length === 0 && trueFalse.length === 0) {
    throw new Error("Không thể phân tích dữ liệu bài tập trả về. Vui lòng bấm Soạn lại bài tập.");
  }

  return {
    multipleChoice,
    shortAnswer,
    trueFalse
  };
}

export async function generateLessonQuizAI(params: {
  grade: string;
  topic: string;
  title: string;
  content: string;
  weakTopics?: string[];
  apiKey?: string;
  model?: string;
}): Promise<LessonQuiz> {
  // 1. Try server endpoint first if available
  try {
    const personalKey = params.apiKey || getAIConfig().apiKey;
    const targetModel = resolveModelName(params.model);

    const res = await fetch("/api/lesson-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grade: params.grade,
        topic: params.topic,
        title: params.title,
        content: params.content,
        weakTopics: params.weakTopics,
        personalApiKey: personalKey,
        model: targetModel,
      }),
    });

    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json();
      return normalizeLessonQuizData(data);
    }
  } catch (err) {
    console.warn("Server Quiz Gen endpoint failed or returned non-JSON, falling back to direct client call:", err);
  }

  // 2. Direct client-side generation using @google/genai SDK
  try {
    let effectiveKey = params.apiKey || getEffectiveApiKey();
    if (!effectiveKey) {
      effectiveKey = await fetchGlobalAIConfig();
    }

    if (!effectiveKey) {
      throw new Error("Cô xin lỗi em, hệ thống chưa được cấu hình Gemini API Key. Em hoặc Giáo viên vui lòng nhập API Key trong menu ⚙️ Cấu hình AI để bắt đầu nhé!");
    }

    const targetModel = resolveModelName(params.model);
    const ai = new GoogleGenAI({ apiKey: effectiveKey });

    const prompt = `Bạn là chuyên gia soạn thảo câu hỏi kiểm tra Tin học THPT (Lớp ${params.grade}).
Hãy tạo bộ câu hỏi trắc nghiệm và tự luận để giúp học sinh ôn tập bài học:
- Tên bài học: ${params.title}
- Chủ đề: ${params.topic}
- Nội dung bài học: ${params.content}
${params.weakTopics && params.weakTopics.length > 0 ? `- Cần tập trung nâng cao cho các nội dung yếu: ${params.weakTopics.join(", ")}` : ""}

Yêu cầu output cấu trúc JSON duy nhất:
{
  "multipleChoice": [
    {
      "id": "mc-1",
      "type": "multiple_choice",
      "level": "Nhận biết",
      "question": "Nội dung câu hỏi trắc nghiệm 4 lựa chọn?",
      "options": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
      "correctIndex": 0,
      "explanation": "Giải thích ngắn gọn lý do chọn phương án A"
    }
  ],
  "shortAnswer": [
    {
      "id": "sa-1",
      "type": "short_answer",
      "level": "Thông hiểu",
      "question": "Câu hỏi tự luận trả lời ngắn?",
      "correctAnswer": "Đáp án chuẩn ngắn gọn",
      "explanation": "Giải thích chi tiết"
    }
  ],
  "trueFalse": [
    {
      "id": "tf-1",
      "type": "true_false",
      "level": "Vận dụng",
      "question": "Nhận định khẳng định Đúng hoặc Sai?",
      "correctAnswer": true,
      "explanation": "Phân tích vì sao nhận định là Đúng/Sai"
    }
  ]
}
Chỉ trả về dữ liệu JSON hợp lệ.`;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });

    if (!response.text) {
      throw new Error("Không nhận được dữ liệu đề thi từ Gemini AI.");
    }

    const parsed = JSON.parse(response.text);
    return normalizeLessonQuizData(parsed);
  } catch (err: any) {
    console.error("Direct Client Quiz Gen Error:", err);
    throw new Error(formatFriendlyErrorMessage(err));
  }
}


