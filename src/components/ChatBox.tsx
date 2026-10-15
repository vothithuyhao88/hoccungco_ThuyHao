import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { 
  Send, Sparkles, AlertCircle, FileText, Upload, RefreshCw, 
  GraduationCap, Trash2, Paperclip, Check, Mic, MicOff, Volume2, 
  VolumeX, Camera, Lightbulb, Code, Database, Globe, Cpu, ShieldCheck, 
  MessageSquare, Wand2, Zap
} from "lucide-react";
import { Message, UserProfile } from "../types";
import { auth, saveMessageToFirestore } from "../lib/firebase";
import { getAIConfig } from "../lib/aiConfig";
import { callAIChat } from "../lib/aiService";

const defaultAvatarImg = "https://i.ibb.co/PZxSPmrG/image.jpg";
// @ts-ignore
import mammoth from "mammoth";

interface ChatBoxProps {
  initialMessage?: string;
  onClearInitialMessage?: () => void;
  avatarUrl?: string;
  onUpdateAvatar?: (url: string) => void;
  currentUser?: UserProfile | null;
  onOpenAISettings?: () => void;
}

export interface SuggestionItem {
  text: string;
  category: string;
  icon?: string;
  color: string;
}

const GRADE_SUGGESTIONS: Record<"all" | "10" | "11" | "12", SuggestionItem[]> = {
  all: [
    { text: "Cô ơi, phân biệt khi nào dùng vòng lặp for và while trong Python?", category: "Python 10", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "Khóa chính và Khóa ngoài trong CSDL khác nhau thế nào ạ?", category: "CSDL 11", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Địa chỉ IPv4 và IPv6 khác nhau như thế nào về độ dài?", category: "Mạng 12", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Thẻ <a> và thẻ <img> trong HTML viết sao cho đúng vậy Cô?", category: "Web 11", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "Cô chỉ em viết chương trình Python kiểm tra số chẵn lẻ nhé!", category: "Python 10", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "Khi dùng AI, học sinh chúng em cần tuân thủ đạo đức số ra sao?", category: "AI & Đạo đức 12", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "Cách căn giữa một phần tử bằng CSS Flexbox đơn giản?", category: "Web 11", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "Mạng LAN và mạng WAN khác nhau thế nào về quy mô?", category: "Mạng 12", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Cách tạo mật khẩu mạnh và phòng tránh lộ tài khoản cá nhân?", category: "An toàn số", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "Hàm VLOOKUP trong Excel dùng để làm gì và cú pháp thế nào ạ?", category: "Tin văn phòng", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  ],
  "10": [
    { text: "Cô ơi, phân biệt khi nào dùng vòng lặp for và while trong Python?", category: "Vòng lặp", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "Em gặp lỗi IndentationError thụt lề khi viết Python, sửa sao ạ?", category: "Cú pháp", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "Cô giải thích giúp em các kiểu dữ liệu int, float, str, bool trong Python?", category: "Kiểu dữ liệu", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Cách viết chương trình Python tính tổng dãy số từ 1 đến n?", category: "Thuật toán", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "Làm sao để thêm, sửa, xóa một phần tử trong danh sách (list) Python?", category: "List Python", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Cô chỉ em cách dùng hàm range(start, stop, step) với bước lùi?", category: "Hàm range", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "Khi nào nên dùng if-elif-else thay vì nhiều câu lệnh if độc lập?", category: "Điều kiện", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "So sánh phép chia thực / và phép chia nguyên // trong Python?", category: "Toán tử", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "Làm sao để viết một hàm (def) có trả về giá trị (return) trong Python?", category: "Hàm def", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Phần mềm hệ điều hành và phần mềm ứng dụng khác nhau thế nào?", category: "Hệ điều hành", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "Cách nhận biết thiết bị vào (Input) và thiết bị ra (Output) của máy tính?", category: "Phần cứng", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Thuật toán tìm kiếm nhị phân và tìm kiếm tuần tự khác nhau ra sao?", category: "Thuật toán", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "Làm thế nào để tạo mật khẩu mạnh và không bị kẻ xấu hack nick?", category: "An toàn số", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ],
  "11": [
    { text: "Khóa chính (Primary Key) và Khóa ngoài (Foreign Key) trong CSDL khác nhau thế nào?", category: "CSDL", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Cô hướng dẫn em viết câu lệnh SQL lấy danh sách học sinh đạt điểm giỏi?", category: "Truy vấn SQL", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "Thẻ <a> và thẻ <img> trong HTML viết sao cho đúng vậy Cô?", category: "HTML5", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "Làm cách nào để tạo màu nền và đổi phông chữ cho trang web bằng CSS?", category: "CSS", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Mục đích của việc chuẩn hóa dữ liệu trong thiết kế CSDL là gì hả Cô?", category: "Thiết kế CSDL", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "Cô giải thích giúp em lệnh INNER JOIN trong SQL hoạt động ra sao?", category: "Liên kết SQL", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "Làm sao để căn giữa một khối div bằng CSS Flexbox nhanh nhất?", category: "CSS Layout", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "Các thẻ danh sách <ul> và <ol> khác nhau thế nào trong HTML?", category: "Thẻ HTML", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "Câu lệnh SELECT DISTINCT trong SQL dùng để làm gì vậy Cô?", category: "Lọc dữ liệu", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Tại sao nên tách riêng file CSS ra khỏi file HTML?", category: "Kiến trúc Web", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "Sự khác biệt giữa câu lệnh SQL INSERT, UPDATE và DELETE?", category: "Thao tác SQL", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Cách chèn và định dạng bảng dữ liệu bằng thẻ <table> trong HTML?", category: "Bảng HTML", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ],
  "12": [
    { text: "Cô ơi, địa chỉ IPv4 và IPv6 khác nhau như thế nào về dung lượng?", category: "Địa chỉ IP", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Khi sử dụng các công cụ AI (Generative AI), em cần chú ý đạo đức số gì?", category: "Trí tuệ nhân tạo", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "Làm sao để phát hiện và phòng tránh tin giả, lừa đảo trực tuyến (Phishing)?", category: "An toàn mạng", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "Vai trò của giao thức TCP/IP trong truyền nhận gói tin qua mạng?", category: "Giao thức", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Cô giải thích thế nào là Học máy (Machine Learning) và Học sâu (Deep Learning)?", category: "Khái niệm AI", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "Mạng LAN và mạng WAN khác nhau như thế nào về quy mô và thiết bị?", category: "Mạng máy tính", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { text: "Thiết bị Switch, Router và Access Point đóng vai trò gì trong mạng LAN?", category: "Thiết bị mạng", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "Cô ơi, chữ ký số và mã hóa dữ liệu bảo vệ thông tin như thế nào?", category: "Bảo mật", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { text: "Điện toán đám mây (Cloud Computing) mang lại lợi ích gì cho học sinh?", category: "Đám mây", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { text: "Giao thức HTTPS khác HTTP thế nào về tính an toàn và mã hóa?", category: "An toàn Web", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { text: "Tường lửa (Firewall) bảo vệ hệ thống mạng khỏi mối đe dọa nào?", category: "An ninh mạng", color: "bg-rose-50 text-rose-700 border-rose-200" },
  ]
};

export default function ChatBox({ 
  initialMessage, 
  onClearInitialMessage, 
  avatarUrl = defaultAvatarImg, 
  onUpdateAvatar, 
  currentUser, 
  onOpenAISettings 
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "teacher",
      text: "Chào em thân yêu! Cô là Thuý Hào đây 👋. Hôm nay em đang học đến bài nào trong chương trình Tin học THPT? Hay em có bài tập nào ở lớp hoặc Trung tâm An Nhơn chưa làm được? Hãy nhắn cho Cô biết, Cô sẽ giải thích từng bước thật dễ hiểu nhé! 💕",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<"all" | "10" | "11" | "12">("all");
  const [currentSuggestions, setCurrentSuggestions] = useState<SuggestionItem[]>([]);

  // Shuffle & sample 5 random questions whenever filter or action triggers
  const shuffleSuggestions = (grade: "all" | "10" | "11" | "12") => {
    const pool = GRADE_SUGGESTIONS[grade] || GRADE_SUGGESTIONS["all"];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setCurrentSuggestions(shuffled.slice(0, 5));
  };

  useEffect(() => {
    shuffleSuggestions(gradeFilter);
  }, [gradeFilter]);

  // Real file/text attachment state
  const [attachment, setAttachment] = useState<{
    name: string;
    type: "image" | "text" | "pdf";
    mimeType: string;
    data: string;
    size?: number;
  } | null>(null);

  // Attachment Modal state
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [modalTab, setModalTab] = useState<"upload" | "paste">("upload");
  const [inputAttachTitle, setInputAttachTitle] = useState("");
  const [inputAttachContent, setInputAttachContent] = useState("");
  const [tempAttachment, setTempAttachment] = useState<{
    name: string;
    type: "image" | "text" | "pdf";
    mimeType: string;
    data: string;
    size?: number;
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loadingPhrase, setLoadingPhrase] = useState("Cô đang đọc câu hỏi của em nhé...");

  // Speech-to-Text & TTS states
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  const startVoiceListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói tiếng Việt. Em hãy sử dụng Google Chrome để trải nghiệm đầy đủ nhé!");
      return;
    }

    try {
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsPlayingAudio(null);
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "vi-VN";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        if (resultText) {
          setInputText(prev => prev ? prev + " " + resultText : resultText);
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const stopVoiceListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  const speakMessage = (messageId: string, text: string) => {
    if (!synthRef.current) return;

    if (isPlayingAudio === messageId) {
      synthRef.current.cancel();
      setIsPlayingAudio(null);
      return;
    }

    synthRef.current.cancel();

    const cleanText = text
      .replace(/[*_`#\-]/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "vi-VN";

    const voices = synthRef.current.getVoices();
    const viVoice = voices.find(v => v.lang.toLowerCase().includes("vi"));
    if (viVoice) utterance.voice = viVoice;

    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(null);
    utterance.onerror = () => setIsPlayingAudio(null);

    setIsPlayingAudio(messageId);
    synthRef.current.speak(utterance);
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  const waitingPhrases = [
    "Cô đang đọc câu hỏi của em nhé...",
    "Chờ cô suy nghĩ một chút nha...",
    "Cô đang soạn câu trả lời chi tiết cho em đây...",
    "Em chờ Cô một vài giây nhé..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let counter = 0;
      interval = setInterval(() => {
        counter = (counter + 1) % waitingPhrases.length;
        setLoadingPhrase(waitingPhrases[counter]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage);
      if (onClearInitialMessage) onClearInitialMessage();
    }
  }, [initialMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) processFile(files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) processFile(files[0]);
  };

  const processFile = (file: File) => {
    setFileError("");
    setUploading(true);

    if (file.size > 10 * 1024 * 1024) {
      setFileError("Tệp quá lớn. Vui lòng chọn tệp nhỏ hơn 10MB nhé.");
      setUploading(false);
      return;
    }

    const nameLower = file.name.toLowerCase();

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempAttachment({
            name: file.name,
            type: "image",
            mimeType: file.type,
            data: event.target.result as string,
            size: file.size
          });
          setUploading(false);
        }
      };
      reader.onerror = () => {
        setFileError("Lỗi khi đọc tệp ảnh.");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf" || nameLower.endsWith(".pdf")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempAttachment({
            name: file.name,
            type: "pdf",
            mimeType: "application/pdf",
            data: event.target.result as string,
            size: file.size
          });
          setUploading(false);
        }
      };
      reader.onerror = () => {
        setFileError("Lỗi khi đọc tệp PDF.");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else if (nameLower.endsWith(".docx")) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          try {
            const arrayBuffer = event.target.result as ArrayBuffer;
            const result = await mammoth.extractRawText({ arrayBuffer });
            setTempAttachment({
              name: file.name,
              type: "text",
              mimeType: "text/plain",
              data: result.value,
              size: file.size
            });
            setUploading(false);
          } catch (err) {
            console.error("Mammoth parse error:", err);
            setFileError("Không thể đọc tệp Word (.docx). Em kiểm tra lại nhé.");
            setUploading(false);
          }
        }
      };
      reader.onerror = () => {
        setFileError("Lỗi khi đọc tệp Word.");
        setUploading(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempAttachment({
            name: file.name,
            type: "text",
            mimeType: file.type || "text/plain",
            data: event.target.result as string,
            size: file.size
          });
          setUploading(false);
        }
      };
      reader.onerror = () => {
        setFileError("Lỗi khi đọc tệp văn bản/mã nguồn.");
        setUploading(false);
      };
      reader.readAsText(file);
    }
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() && !attachment) return;

    let userMsgText = textToSend;
    if (!userMsgText.trim() && attachment) {
      userMsgText = `Cô xem giúp em tài liệu đính kèm này nhé: ${attachment.name}`;
    }

    const currentAttachment = attachment;
    const currentUserId = auth.currentUser?.uid || "guest_student";

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: userMsgText,
      timestamp: new Date(),
      attachment: currentAttachment ? {
        name: currentAttachment.name,
        type: currentAttachment.type,
        data: currentAttachment.data
      } : undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setAttachment(null);
    setIsLoading(true);

    saveMessageToFirestore({
      sender: "user",
      text: userMsgText,
      userId: currentUserId,
      userName: auth.currentUser?.displayName || "Học sinh An Nhơn",
      attachment: currentAttachment ? {
        name: currentAttachment.name,
        type: currentAttachment.type
      } : null
    });

    try {
      const apiHistory = messages.map(m => ({
        sender: m.sender === "user" ? "user" : "teacher",
        text: m.text
      }));

      const aiConfig = getAIConfig();
      const activeModel = aiConfig.selectedModel === "custom" ? (aiConfig.customModelName || "gemini-2.5-flash") : aiConfig.selectedModel;

      const replyText = await callAIChat({
        message: textToSend,
        history: apiHistory,
        apiKey: aiConfig.apiKey,
        model: activeModel,
        attachment: currentAttachment ? {
          name: currentAttachment.name,
          type: currentAttachment.mimeType || currentAttachment.type,
          base64: currentAttachment.data
        } : null
      });

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: "teacher",
        text: replyText,
        timestamp: new Date()
      }]);

      saveMessageToFirestore({
        sender: "teacher",
        text: replyText,
        userId: currentUserId,
        userName: "Cô Thuý Hào"
      });

      shuffleSuggestions(gradeFilter);
    } catch (err: any) {
      const errText = `Ôi em ơi, kết nối bị gián đoạn một chút. Em có thể gửi lại câu hỏi được không? Cô vẫn ở đây chờ em nè! (Chi tiết lỗi: ${err.message})`;
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: "teacher",
        text: errText,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const handleAttachSubmit = () => {
    if (modalTab === "upload") {
      if (tempAttachment) {
        setAttachment(tempAttachment);
        setTempAttachment(null);
        setShowAttachModal(false);
      }
    } else {
      if (!inputAttachContent.trim()) return;
      const title = inputAttachTitle.trim() || "Tài liệu dán tay";
      setAttachment({
        name: title,
        type: "text",
        mimeType: "text/plain",
        data: inputAttachContent
      });
      setInputAttachTitle("");
      setInputAttachContent("");
      setShowAttachModal(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Em có muốn làm mới lại đoạn hội thoại với Cô không?")) {
      setMessages([
        {
          id: "welcome",
          sender: "teacher",
          text: "Chào em thân yêu! Cô là Thuý Hào đây 👋. Hôm nay em đang học đến bài nào trong chương trình Tin học THPT? Hay em có bài tập nào chưa làm được? Hãy nhắn cho Cô biết nhé! 💕",
          timestamp: new Date()
        }
      ]);
      shuffleSuggestions(gradeFilter);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[80vh] bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden font-sans" id="chat-box-container">
      {/* Modern Gradient Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-4 flex items-center justify-between text-white border-b border-emerald-500/20 shadow-md relative z-10" id="chat-header">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/80 bg-white shadow-md group/header-avatar flex-shrink-0">
            <img src={avatarUrl} alt="Cô Thuý Hào" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white z-10 animate-pulse"></div>
            {onUpdateAvatar && (
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover/header-avatar:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer text-white">
                <Camera size={16} className="text-emerald-300" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => onUpdateAvatar(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg leading-tight text-white tracking-wide">Cô Thuý Hào</h2>
              <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-100 border border-white/20">
                Giáo viên Tin học AI
              </span>
            </div>
            <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-0.5">
              <Sparkles size={13} className="text-amber-300 animate-spin" style={{ animationDuration: "6s" }} /> 
              <span>Trực tuyến 24/7 • Giải đáp chương trình SGK mới THPT</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAISettings && (
            <button
              onClick={onOpenAISettings}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-amber-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-white/20 shadow-xs"
              title="Cấu hình Gemini API Key cá nhân"
              id="btn-chat-ai-config"
            >
              <Zap size={14} className="text-amber-300" />
              <span className="hidden sm:inline">Cấu hình AI Key</span>
            </button>
          )}
          <button
            onClick={clearChat}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-emerald-100 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-white/20"
            title="Làm mới cuộc trò chuyện"
            id="btn-clear-chat"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50/50">
        {/* Messages Feed */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 md:p-6 space-y-4" id="chat-messages-area">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Teacher Avatar */}
                {msg.sender === "teacher" && (
                  <div className="w-10 h-10 rounded-2xl overflow-hidden border border-emerald-200 flex-shrink-0 bg-white shadow-sm self-end">
                    <img src={avatarUrl} alt="Cô Thuý Hào" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] md:max-w-[80%] rounded-3xl px-5 py-3.5 text-sm shadow-xs border ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500/30 rounded-tr-xs"
                      : "bg-white text-slate-800 border-slate-200/80 rounded-tl-xs shadow-slate-100"
                  }`}
                >
                  {msg.sender === "teacher" && (
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                        <GraduationCap size={14} className="text-emerald-600" /> Cô Thuý Hào
                      </span>
                      <button
                        onClick={() => speakMessage(msg.id, msg.text)}
                        className={`text-[10px] flex items-center gap-1 font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                          isPlayingAudio === msg.id
                            ? "bg-rose-50 text-rose-600 border-rose-200 animate-pulse"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        }`}
                        title={isPlayingAudio === msg.id ? "Dừng đọc" : "Nghe cô giảng bằng giọng nói"}
                      >
                        {isPlayingAudio === msg.id ? <VolumeX size={12} /> : <Volume2 size={12} />}
                        <span>{isPlayingAudio === msg.id ? "Đang đọc..." : "Nghe cô giảng"}</span>
                      </button>
                    </div>
                  )}

                  {msg.sender === "user" ? (
                    <div>
                      <p className="whitespace-pre-wrap leading-relaxed text-emerald-50 font-medium">{msg.text}</p>
                      {msg.attachment && (
                        <div className="mt-3 p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col gap-1.5 max-w-xs shadow-xs">
                          {msg.attachment.type === "image" ? (
                            <div className="relative group overflow-hidden rounded-xl">
                              <img
                                src={msg.attachment.data}
                                alt={msg.attachment.name}
                                className="max-h-48 w-full object-contain bg-black/20 rounded-xl"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-[10px] text-white truncate font-medium">
                                {msg.attachment.name}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-2 py-1 bg-white/20 rounded-xl text-white">
                              <FileText size={16} className="text-white flex-shrink-0" />
                              <span className="text-xs font-bold truncate">{msg.attachment.name}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="prose prose-sm prose-emerald leading-relaxed text-slate-700">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}

                  <div className="mt-2 text-right">
                    <span className={`text-[10px] font-medium ${msg.sender === "user" ? "text-emerald-100" : "text-slate-400"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
                id="typing-indicator"
              >
                <div className="w-10 h-10 rounded-2xl overflow-hidden border border-emerald-200 flex-shrink-0 bg-white shadow-sm self-end">
                  <img src={avatarUrl} alt="Cô Thuý Hào" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-white border border-emerald-200/80 rounded-3xl rounded-tl-xs px-5 py-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
                    <Wand2 size={14} className="animate-spin text-amber-500" />
                    <span>{loadingPhrase}</span>
                  </div>
                  <div className="flex gap-1.5 items-center py-1">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Dynamic Suggested Questions Side Panel */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-200/80 bg-white p-4 md:p-5 flex flex-col justify-between" id="chat-sidebar-suggestions">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb size={16} className="text-amber-500" /> Câu hỏi gợi ý theo Khối
              </span>
              <button
                onClick={() => shuffleSuggestions(gradeFilter)}
                className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer border border-amber-200 shadow-2xs"
                title="Đổi bộ câu hỏi ngẫu nhiên khác"
                id="btn-shuffle-suggestions"
              >
                <RefreshCw size={12} className="text-amber-600" />
                <span>Đổi câu hỏi 🎲</span>
              </button>
            </div>

            {/* Grade Selector Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-2xl mb-4 text-xs font-bold">
              {(["all", "10", "11", "12"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`py-1.5 rounded-xl text-center transition-all cursor-pointer ${
                    gradeFilter === g
                      ? "bg-white text-emerald-700 shadow-sm border border-slate-200 font-extrabold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  id={`tab-grade-${g}`}
                >
                  {g === "all" ? "Tất cả" : `Lớp ${g}`}
                </button>
              ))}
            </div>

            {/* Dynamic Suggestions List */}
            <div className="space-y-2 overflow-y-auto max-h-[220px] md:max-h-[360px] pr-1" id="suggestions-list">
              {currentSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(item.text);
                    sendMessage(item.text);
                  }}
                  disabled={isLoading}
                  className="w-full text-left p-3 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 rounded-2xl transition-all cursor-pointer group hover:shadow-xs disabled:opacity-50 block"
                  id={`suggestion-item-${idx}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${item.color}`}>
                      {item.category}
                    </span>
                    <MessageSquare size={12} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-700 group-hover:text-emerald-900 font-medium leading-relaxed">
                    {item.text}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              💡 Bấm vào câu hỏi gợi ý để cô giải thích ngay!
            </p>
          </div>
        </div>
      </div>

      {/* Modern Footer Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200/80 flex flex-col gap-2 relative z-10" id="chat-input-bar">
        {/* Attachment Pill if active */}
        {attachment && (
          <div className="flex items-center justify-between px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 animate-fadeIn">
            <span className="flex items-center gap-2 font-semibold truncate">
              {attachment.type === "image" ? (
                <img src={attachment.data} alt="Đính kèm" className="w-7 h-7 rounded-lg object-cover border border-emerald-300" referrerPolicy="no-referrer" />
              ) : (
                <FileText size={16} className="text-emerald-600" />
              )}
              <span className="truncate font-bold">Đã đính kèm: {attachment.name}</span>
            </span>
            <button
              onClick={() => setAttachment(null)}
              className="text-rose-600 hover:text-rose-800 font-bold transition-colors cursor-pointer text-xs px-2 py-1 hover:bg-rose-100/50 rounded-lg"
              id="btn-remove-attachment"
            >
              Gỡ bỏ
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* File Attachment Button */}
          <button
            onClick={() => {
              setTempAttachment(null);
              setFileError("");
              setShowAttachModal(true);
            }}
            className="p-3 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-2xl transition-all cursor-pointer border border-slate-200 flex-shrink-0"
            title="Đính kèm hình ảnh đề bài, file Word, PDF hoặc code"
            id="btn-attach-modal"
          >
            <Paperclip size={18} />
          </button>

          {/* Voice Input Button */}
          <button
            onClick={isListening ? stopVoiceListening : startVoiceListening}
            disabled={isLoading}
            className={`p-3 rounded-2xl transition-all cursor-pointer border flex-shrink-0 ${
              isListening
                ? "bg-rose-500 text-white border-rose-600 animate-pulse hover:bg-rose-600 shadow-md"
                : "bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border-slate-200"
            }`}
            title={isListening ? "Đang lắng nghe giọng nói... Bấm để kết thúc" : "Hỏi cô bằng giọng nói tiếng Việt"}
            id="btn-voice-input"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isListening ? "🔴 Cô đang lắng nghe em nói..." : "Nhập câu hỏi môn Tin học cho Cô Thuý Hào..."}
            disabled={isLoading}
            className="flex-1 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 px-4 py-3 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all placeholder:text-slate-400 font-medium disabled:opacity-75"
            id="chat-text-input"
          />

          {/* Send Button */}
          <button
            onClick={() => sendMessage(inputText)}
            disabled={isLoading || (!inputText.trim() && !attachment)}
            className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            id="btn-send-message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Upload Attachment Modal */}
      {showAttachModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs animate-fadeIn" id="attach-modal">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 animate-scaleUp">
            <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2 mb-1">
              <Upload className="text-emerald-600" size={20} /> Đính kèm bài tập & tài liệu
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Tải ảnh chụp bài tập từ điện thoại, chọn file Word/PDF/mã nguồn Python hoặc dán nội dung thủ công dưới đây.
            </p>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setModalTab("upload");
                  setFileError("");
                }}
                className={`flex-1 py-2.5 border-b-2 text-center transition-all cursor-pointer ${
                  modalTab === "upload"
                    ? "border-emerald-600 text-emerald-700 font-extrabold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                📁 Tải file / ảnh chụp
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalTab("paste");
                  setFileError("");
                }}
                className={`flex-1 py-2.5 border-b-2 text-center transition-all cursor-pointer ${
                  modalTab === "paste"
                    ? "border-emerald-600 text-emerald-700 font-extrabold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                📝 Nhập văn bản thủ công
              </button>
            </div>

            <div className="min-h-[200px]">
              {modalTab === "upload" ? (
                <div>
                  {!tempAttachment ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 min-h-[180px] ${
                        dragOver
                          ? "border-emerald-500 bg-emerald-50/50"
                          : "border-slate-200 bg-slate-50/50 hover:bg-emerald-50/30 hover:border-emerald-400"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,application/pdf,.pdf,.doc,.docx,text/*,.py,.html,.css,.csv,.json,.sql"
                        className="hidden"
                      />
                      <Upload size={32} className={`${dragOver ? "text-emerald-600" : "text-slate-400"}`} />
                      <div>
                        <p className="text-sm font-bold text-slate-700">Kéo thả tệp vào đây hoặc bấm để chọn tệp</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                          Hỗ trợ ảnh chụp đề bài, tài liệu Word (.docx), PDF (.pdf) hoặc file Python dưới 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Tệp đã chọn:</span>
                        <button
                          type="button"
                          onClick={() => setTempAttachment(null)}
                          className="text-rose-500 hover:text-rose-700 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} /> Xóa tệp
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-emerald-100 shadow-2xs">
                        {tempAttachment.type === "image" ? (
                          <img
                            src={tempAttachment.data}
                            alt="Preview"
                            className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText size={20} />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">{tempAttachment.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                            {tempAttachment.type === "image" ? "Hình ảnh" : tempAttachment.type === "pdf" ? "Tài liệu PDF" : "Tài liệu văn bản / Word"}
                            {tempAttachment.size ? ` • ${(tempAttachment.size / 1024).toFixed(1)} KB` : ""}
                          </p>
                        </div>
                        <Check size={16} className="text-emerald-600 flex-shrink-0 bg-emerald-50 p-0.5 rounded-full border border-emerald-200" />
                      </div>
                    </div>
                  )}

                  {fileError && (
                    <div className="mt-3 p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700 flex items-center gap-1.5">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span className="font-semibold">{fileError}</span>
                    </div>
                  )}
                  {uploading && (
                    <p className="text-center text-xs text-slate-400 animate-pulse mt-3 font-semibold">Đang xử lý tệp...</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Tên bài tập / Chủ đề (Tùy chọn):</label>
                    <input
                      type="text"
                      value={inputAttachTitle}
                      onChange={(e) => setInputAttachTitle(e.target.value)}
                      placeholder="Ví dụ: Bài tập Python câu lệnh lặp"
                      className="w-full bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nội dung câu hỏi / Mã nguồn:</label>
                    <textarea
                      rows={5}
                      value={inputAttachContent}
                      onChange={(e) => setInputAttachContent(e.target.value)}
                      placeholder="Dán câu hỏi hoặc mã Python/SQL/HTML tại đây..."
                      className="w-full bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none font-mono placeholder:font-sans"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setTempAttachment(null);
                  setFileError("");
                  setShowAttachModal(false);
                }}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl transition-all cursor-pointer"
                id="btn-close-attach-modal"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleAttachSubmit}
                disabled={modalTab === "upload" ? (!tempAttachment || uploading) : !inputAttachContent.trim()}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-50"
                id="btn-confirm-attachment"
              >
                Lưu đính kèm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

