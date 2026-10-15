import { GoogleGenAI } from "@google/genai";
import { getGlobalAIConfigFromFirestore } from "./firebase";

export interface AIConfig {
  apiKey: string;
  selectedModel: string;
  customModelName?: string;
}

export const DEFAULT_AI_CONFIG: AIConfig = {
  apiKey: "",
  selectedModel: "gemini-2.5-flash",
  customModelName: ""
};

export const AVAILABLE_GEMINI_MODELS = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash (Tốc độ cực nhanh - Phản hồi tức thì)",
    recommended: true,
    badge: "Khuyên dùng"
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro (Tư duy toán học & Logic chuyên sâu)",
    recommended: false,
    badge: "Thông minh"
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash (Thế hệ mới - Đa phương thức)",
    recommended: false,
    badge: "Mới"
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash (Xử lý tiêu chuẩn - Ổn định cao)",
    recommended: false,
    badge: "Ổn định"
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro (Hỗ trợ ngữ cảnh siêu lớn)",
    recommended: false,
    badge: "Chuyên sâu"
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash (Mô hình thử nghiệm mới)",
    recommended: false,
    badge: "Mới nhất"
  },
  {
    id: "custom",
    name: "✏️ Nhập phiên bản mô hình tùy chỉnh (Custom Model ID)",
    recommended: false,
    badge: "Tự chọn"
  }
];

const LOCAL_STORAGE_KEY = "app_ai_config";

// Global API Key cache in memory
let globalApiKeyCache: string = "";

/**
 * Fetch Global Gemini API Key from Firestore settings/ai_config and cache in memory
 */
export async function fetchGlobalAIConfig(): Promise<string> {
  try {
    const record = await getGlobalAIConfigFromFirestore();
    if (record && record.apiKey) {
      globalApiKeyCache = record.apiKey.trim();
      return globalApiKeyCache;
    }
  } catch (err) {
    console.warn("Could not fetch global AI config from Firestore:", err);
  }
  return globalApiKeyCache;
}

export function getCachedGlobalApiKey(): string {
  return globalApiKeyCache;
}

export function setCachedGlobalApiKey(key: string): void {
  globalApiKeyCache = key ? key.trim() : "";
}

/**
 * Resolves the effective API Key to use according to priority:
 * 1. Explicitly passed customApiKey
 * 2. Personal API Key stored in localStorage
 * 3. Global API Key fetched from Firestore (settings/ai_config)
 * 4. Fallback VITE_GEMINI_API_KEY env variable
 */
export function getEffectiveApiKey(customApiKey?: string): string {
  if (customApiKey && customApiKey.trim()) {
    return customApiKey.trim();
  }
  const localConfig = getAIConfig();
  if (localConfig.apiKey && localConfig.apiKey.trim()) {
    return localConfig.apiKey.trim();
  }
  if (globalApiKeyCache && globalApiKeyCache.trim()) {
    return globalApiKeyCache.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY || "";
}

export function getAIConfig(): AIConfig {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        apiKey: parsed.apiKey || "",
        selectedModel: parsed.selectedModel || "gemini-2.5-flash",
        customModelName: parsed.customModelName || ""
      };
    }
  } catch (e) {
    console.error("Error reading AI Config from localStorage:", e);
  }
  return { ...DEFAULT_AI_CONFIG };
}

export function saveAIConfig(config: AIConfig): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Error saving AI Config to localStorage:", e);
  }
}

export function formatFriendlyErrorMessage(err: any): string {
  const str = String(err?.message || err || "").toLowerCase();
  if (str.includes("no_api_key") || str.includes("no_key") || str.includes("401")) {
    return "Cô xin lỗi em, hệ thống chưa có mã Gemini API Key. Em hoặc Giáo viên vui lòng nhập API Key trong menu ⚙️ Cấu hình AI để bắt đầu nhé!";
  }
  if (str.includes("429") || str.includes("resource_exhausted") || str.includes("quota")) {
    return "Cô xin lỗi em, hệ thống Gemini API hiện tại đã hết hạn mức truy cập tạm thời (Quota Exceeded). Em vui lòng tự nhập mã API Key cá nhân của em trong menu ⚙️ Cấu hình AI để tiếp tục nhé! 💕";
  }
  if (str.includes("400") || str.includes("invalid") || str.includes("api_key_invalid")) {
    return "Mã Gemini API Key hiện tại không hợp lệ hoặc đã bị vô hiệu hóa. Em hãy kiểm tra và cập nhật lại mã API Key trong menu ⚙️ Cấu hình AI nhé!";
  }
  if (str.includes("failed to fetch") || str.includes("network") || str.includes("offline")) {
    return "Không thể kết nối đến hệ thống AI. Em vui lòng kiểm tra lại kết nối mạng Internet của mình và thử lại nhé!";
  }
  return err?.message || "Đã xảy ra sự cố kết nối AI. Em vui lòng thử lại sau ít phút hoặc cập nhật API Key cá nhân trong menu ⚙️ Cấu hình AI nhé!";
}

export async function testAIConnection(apiKey: string, model: string): Promise<{ success: boolean; message: string; modelUsed?: string }> {
  // 1. Try server endpoint if available
  try {
    const res = await fetch("/api/test-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalApiKey: apiKey || getAIConfig().apiKey,
        model: model || getAIConfig().selectedModel
      })
    });

    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json();
      if (data.success) {
        return {
          success: true,
          message: data.message || "🎉 Kết nối thành công!",
          modelUsed: data.modelUsed
        };
      } else {
        return {
          success: false,
          message: data.message || data.error || formatFriendlyErrorMessage(data)
        };
      }
    }
  } catch (err) {
    console.warn("Server API test key failed or returned non-JSON, falling back to direct client test:", err);
  }

  // 2. Direct client-side test using @google/genai SDK
  try {
    let effectiveKey = apiKey.trim();
    if (!effectiveKey) {
      effectiveKey = getEffectiveApiKey();
    }
    if (!effectiveKey) {
      effectiveKey = await fetchGlobalAIConfig();
    }

    if (!effectiveKey) {
      return {
        success: false,
        message: "Chưa có mã Gemini API Key. Vui lòng nhập Personal API Key hoặc nhờ Giáo viên cấu hình Global Key trên Firestore!"
      };
    }

    const targetModel = model === "custom" ? (getAIConfig().customModelName || "gemini-2.5-flash") : (model || "gemini-2.5-flash");
    const ai = new GoogleGenAI({ apiKey: effectiveKey });

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: "Xin chào! Trả lời đúng 1 từ 'OK' để xác nhận kết nối thành công.",
      config: {
        temperature: 0.1
      }
    });

    if (response.text) {
      return {
        success: true,
        message: `🎉 Kết nối thành công! Gemini API Key và mô hình ${targetModel} đang hoạt động tốt.`,
        modelUsed: targetModel
      };
    } else {
      return {
        success: false,
        message: "Không nhận được phản hồi từ mô hình Gemini."
      };
    }
  } catch (err: any) {
    console.error("Client Test Gemini Error:", err);
    return {
      success: false,
      message: formatFriendlyErrorMessage(err)
    };
  }
}

export async function fetchAvailableModels(apiKey?: string): Promise<{ success: boolean; models: typeof AVAILABLE_GEMINI_MODELS; message?: string }> {
  try {
    const res = await fetch("/api/list-models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalApiKey: apiKey || getAIConfig().apiKey
      })
    });

    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json();
      if (data.models) {
        return {
          success: true,
          models: data.models,
          message: data.message
        };
      }
    }
  } catch (err) {
    console.warn("Error fetching models list from server:", err);
  }

  return {
    success: true,
    models: AVAILABLE_GEMINI_MODELS,
    message: "Đã tải danh sách phiên bản mô hình Gemini mặc định."
  };
}

