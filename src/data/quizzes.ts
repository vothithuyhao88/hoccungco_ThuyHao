import { QuizQuestion } from "../types";

export interface GradeTopicConfig {
  id: string; // e.g. "g10_t1"
  grade: "10" | "11" | "12";
  number: number;
  title: string;
}

export const GRADE_TOPICS: Record<"10" | "11" | "12", GradeTopicConfig[]> = {
  "10": [
    { id: "g10_t1", grade: "10", number: 1, title: "Chủ đề 1. Máy tính và xã hội tri thức" },
    { id: "g10_t2", grade: "10", number: 2, title: "Chủ đề 2. Mạng máy tính và Internet" },
    { id: "g10_t3", grade: "10", number: 3, title: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số" },
    { id: "g10_t4", grade: "10", number: 4, title: "Chủ đề 4. Ứng dụng Tin học (Đồ họa số)" },
    { id: "g10_t5", grade: "10", number: 5, title: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính (Python)" },
    { id: "g10_t6", grade: "10", number: 6, title: "Chủ đề 6. Hướng nghiệp với Tin học" },
  ],
  "11": [
    { id: "g11_t1", grade: "11", number: 1, title: "Chủ đề 1. Máy tính và xã hội tri thức" },
    { id: "g11_t2", grade: "11", number: 2, title: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin" },
    { id: "g11_t3", grade: "11", number: 3, title: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số" },
    { id: "g11_t4", grade: "11", number: 4, title: "Chủ đề 4. Giới thiệu các hệ cơ sở dữ liệu" },
    { id: "g11_t5", grade: "11", number: 5, title: "Chủ đề 5. Hướng nghiệp với Tin học" },
    { id: "g11_t6", grade: "11", number: 6, title: "Chủ đề 6. Thực hành tạo và khai thác cơ sở dữ liệu (SQL)" },
    { id: "g11_t7", grade: "11", number: 7, title: "Chủ đề 7. Phần mềm chỉnh sửa ảnh và làm video" },
  ],
  "12": [
    { id: "g12_t1", grade: "12", number: 1, title: "Chủ đề 1. Máy tính và xã hội tri thức" },
    { id: "g12_t2", grade: "12", number: 2, title: "Chủ đề 2. Mạng máy tính và Internet" },
    { id: "g12_t3", grade: "12", number: 3, title: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số" },
    { id: "g12_t4", grade: "12", number: 4, title: "Chủ đề 4. Giải quyết vấn đề với sự trợ giúp của máy tính" },
    { id: "g12_t5", grade: "12", number: 5, title: "Chủ đề 5. Hướng nghiệp với Tin học" },
    { id: "g12_t6", grade: "12", number: 6, title: "Chủ đề 6. Máy tính và xã hội tri thức (Chuyên đề)" },
    { id: "g12_t7", grade: "12", number: 7, title: "Chủ đề 7. Ứng dụng Tin học (Thiết kế & phát triển Website)" },
  ],
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // LỚP 10
  // =========================================================================
  // LỚP 10 - CHỦ ĐỀ 1: Máy tính và xã hội tri thức
  {
    id: "q-g10-t1-1",
    grade: "10",
    topicId: "g10_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Mối quan hệ giữa Dữ liệu, Thông tin và Tri thức được phát biểu như thế nào?",
    options: [
      "Dữ liệu là thông tin đã được xử lý thành tri thức.",
      "Dữ liệu là đầu vào, qua xử lý tạo ra Thông tin, đúc kết thành Tri thức để ra quyết định.",
      "Tri thức là dữ liệu thô chưa qua xử lý.",
      "Thông tin và Dữ liệu là hai khái niệm hoàn toàn giống nhau."
    ],
    correctIndex: 1,
    explanation: "Dữ liệu (số liệu thô) qua xử lý trở thành Thông tin có ý nghĩa. Từ thông tin, con người tổng hợp và áp dụng thành Tri thức."
  },
  {
    id: "q-g10-t1-2",
    grade: "10",
    topicId: "g10_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "1 Megabyte (MB) bằng bao nhiêu Kilobyte (KB) theo chuẩn nhị phân?",
    options: [
      "1000 KB",
      "1024 KB",
      "100 KB",
      "1024 Byte"
    ],
    correctIndex: 1,
    explanation: "Các đơn vị lưu trữ trong tin học tính theo lũy thừa 2: 1 MB = 2^10 KB = 1024 KB."
  },
  {
    id: "q-g10-t1-3",
    grade: "10",
    topicId: "g10_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Thiết bị nào sau đây vừa là thiết bị vào vừa là thiết bị ra?",
    options: [
      "Màn hình cảm ứng",
      "Bàn phím cơ",
      "Chuột quang",
      "Máy in laser"
    ],
    correctIndex: 0,
    explanation: "Màn hình cảm ứng nhận thao tác chạm từ người dùng (Vào) và hiển thị hình ảnh kết quả (Ra)."
  },
  {
    id: "q-g10-t1-4",
    grade: "10",
    topicId: "g10_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Bộ nhớ RAM của máy tính có đặc điểm quan trọng nào?",
    options: [
      "Lưu trữ dữ liệu vĩnh viễn không bị mất khi tắt máy.",
      "Là bộ nhớ truy xuất ngẫu nhiên, dữ liệu bị xóa sạch khi mất nguồn điện.",
      "Có dung lượng lớn nhất trong máy tính.",
      "Dùng để in ấn văn bản."
    ],
    correctIndex: 1,
    explanation: "RAM (Random Access Memory) là bộ nhớ tạm thời, dữ liệu trong RAM sẽ biến mất hoàn toàn khi tắt máy."
  },
  {
    id: "q-g10-t1-5",
    grade: "10",
    topicId: "g10_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Xã hội tri thức dựa trên nền tảng cốt lõi nào sau đây?",
    options: [
      "Sản xuất nông nghiệp thủ công.",
      "Khai thác tài nguyên thiên nhiên thô.",
      "Việc tạo ra, chia sẻ và ứng dụng tri thức dựa trên công nghệ thông tin số.",
      "Thương mại truyền thống chợ đêm."
    ],
    correctIndex: 2,
    explanation: "Xã hội tri thức lấy tri thức và công nghệ thông tin làm động lực phát triển kinh tế - xã hội."
  },

  // LỚP 10 - CHỦ ĐỀ 2: Mạng máy tính và Internet
  {
    id: "q-g10-t2-1",
    grade: "10",
    topicId: "g10_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "Mạng LAN (Local Area Network) là loại mạng có phạm vi kết nối như thế nào?",
    options: [
      "Kết nối thiết bị trên phạm vi toàn cầu.",
      "Kết nối các máy tính trong phạm vi nhỏ như phòng học, tòa nhà hoặc cơ quan.",
      "Mạng vô tuyến kết nối giữa các hành tinh.",
      "Kết nối các thành phố lớn trong cùng một quốc gia."
    ],
    correctIndex: 1,
    explanation: "Mạng LAN kết nối các máy tính trong phạm vi địa lý hẹp như tòa nhà, trường học hoặc gia đình."
  },
  {
    id: "q-g10-t2-2",
    grade: "10",
    topicId: "g10_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "Lợi ích nổi bật của Điện toán đám mây (Cloud Computing) là gì?",
    options: [
      "Tăng tốc độ xử lý của card màn hình.",
      "Truy cập dữ liệu và phần mềm mọi lúc mọi nơi qua Internet mà không cần hạ tầng lưu trữ tại chỗ.",
      "Không cần kết nối mạng vẫn truy cập được dữ liệu từ xa.",
      "Tự động nâng cấp ram cho máy tính."
    ],
    correctIndex: 1,
    explanation: "Điện toán đám mây cho phép lưu trữ và khai thác ứng dụng linh hoạt trên mạng Internet."
  },
  {
    id: "q-g10-t2-3",
    grade: "10",
    topicId: "g10_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "Địa chỉ IP (Internet Protocol) dùng để làm gì trong mạng máy tính?",
    options: [
      "Định danh duy nhất từng thiết bị tham gia kết nối trong mạng.",
      "Đo tốc độ quay của quạt tản nhiệt CPU.",
      "Xóa tệp tin rác trên ổ cứng.",
      "Tạo mật khẩu đăng nhập Windows."
    ],
    correctIndex: 0,
    explanation: "Địa chỉ IP đóng vai trò như địa chỉ nhà, giúp các gói tin gửi chính xác đến từng thiết bị trong mạng."
  },
  {
    id: "q-g10-t2-4",
    grade: "10",
    topicId: "g10_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "IoT (Internet of Things - Mạng lưới vạn vật kết nối) có đặc điểm nào?",
    options: [
      "Chỉ kết nối máy tính để bàn với máy in.",
      "Kết nối các thiết bị thông minh (đồ gia dụng, cảm biến, xe hơi) với Internet để tự động thu thập và trao đổi dữ liệu.",
      "Là tên gọi khác của trình duyệt web Google Chrome.",
      "Không yêu cầu sử dụng kết nối mạng."
    ],
    correctIndex: 1,
    explanation: "IoT kết nối đa dạng các vật dụng đời sống qua cảm biến và Internet để tự động hóa điều khiển."
  },

  // LỚP 10 - CHỦ ĐỀ 3: Đạo đức, pháp luật và văn hóa trong môi trường số
  {
    id: "q-g10-t3-1",
    grade: "10",
    topicId: "g10_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Hành động nào thể hiện văn hóa ứng xử và tôn trọng bản quyền khi tham gia môi trường số?",
    options: [
      "Sao chép nguyên văn tài liệu của tác giả khác không ghi nguồn.",
      "Trích dẫn rõ ràng tên tác giả và nguồn thông tin khi sử dụng tài liệu từ Internet.",
      "Đăng thông tin giật gân chưa qua kiểm chứng.",
      "Tự ý chia sẻ ảnh riêng tư của bạn bè lên mạng."
    ],
    correctIndex: 1,
    explanation: "Tôn trọng bản quyền tác giả và ghi nguồn rõ ràng là chuẩn mực văn hóa ứng xử trên môi trường số."
  },
  {
    id: "q-g10-t3-2",
    grade: "10",
    topicId: "g10_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Khái niệm 'Dấu chân số' (Digital Footprint) ám chỉ điều gì?",
    options: [
      "Kích thước bàn chân của kỹ sư máy tính.",
      "Dấu vết thông tin và dữ liệu cá nhân còn lưu lại trên Internet thông qua các hoạt động trực tuyến.",
      "Số bước chân đo bằng đồng hồ thông minh.",
      "Mã vạch trên tem sản phẩm điện tử."
    ],
    correctIndex: 1,
    explanation: "Mọi bình luận, lượt thích, bài đăng hay tìm kiếm trên Internet đều tạo nên dấu chân số của bạn."
  },
  {
    id: "q-g10-t3-3",
    grade: "10",
    topicId: "g10_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Biện pháp nào giúp tạo mật khẩu an toàn và bảo vệ tài khoản cá nhân trực tuyến?",
    options: [
      "Dùng ngày tháng năm sinh hoặc '123456'.",
      "Sử dụng kết hợp chữ hoa, chữ thường, chữ số, ký tự đặc biệt và bật xác thực hai lớp (2FA).",
      "Dùng chung 1 mật khẩu đơn giản cho tất cả tài khoản.",
      "Viết mật khẩu lên tờ giấy dán trước màn hình."
    ],
    correctIndex: 1,
    explanation: "Mật khẩu phức tạp kết hợp xác thực 2 bước (2FA) ngăn chặn tối đa nguy cơ bị hack tài khoản."
  },

  // LỚP 10 - CHỦ ĐỀ 4: Ứng dụng Tin học (Đồ họa số Inkscape / GIMP)
  {
    id: "q-g10-t4-1",
    grade: "10",
    topicId: "g10_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Ứng dụng Tin học (Đồ họa số)",
    question: "Đặc điểm vượt trội của Ảnh Vector (như thiết kế trong Inkscape) so với Ảnh Raster là gì?",
    options: [
      "Có dung lượng luôn lớn hơn ảnh Raster.",
      "Được tạo từ các công thức toán học nên có thể phóng to vô hạn mà không bị vỡ hay gián đoạn độ nét.",
      "Chỉ hiển thị được hai màu đen trắng.",
      "Không thể xuất ra file định dạng hình ảnh."
    ],
    correctIndex: 1,
    explanation: "Đồ họa Vector biểu diễn bằng công thức hình học nên bảo toàn độ sắc nét tuyệt đối khi thay đổi kích thước."
  },
  {
    id: "q-g10-t4-2",
    grade: "10",
    topicId: "g10_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Ứng dụng Tin học (Đồ họa số)",
    question: "Định dạng tệp nào sau đây thuộc về đồ họa Vector tiêu chuẩn mở?",
    options: [
      ".SVG",
      ".JPG",
      ".PNG",
      ".BMP"
    ],
    correctIndex: 0,
    explanation: "SVG (Scalable Vector Graphics) là định dạng đồ họa vector phổ biến được các phần mềm như Inkscape hỗ trợ."
  },
  {
    id: "q-g10-t4-3",
    grade: "10",
    topicId: "g10_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Ứng dụng Tin học (Đồ họa số)",
    question: "Trong phần mềm xử lý ảnh bitmap GIMP, công cụ 'Crop Tool' dùng để làm gì?",
    options: [
      "Tạo hiệu ứng xoay ảnh.",
      "Cắt bỏ phần dư thừa viền ngoài của bức ảnh.",
      "Tăng độ sáng tối.",
      "Vẽ nét cọ màu nước."
    ],
    correctIndex: 1,
    explanation: "Crop Tool giúp cắt ngắn xén bớt kích thước khung ảnh theo khung nhìn mong muốn."
  },

  // LỚP 10 - CHỦ ĐỀ 5: Giải quyết vấn đề với sự trợ giúp của máy tính (Python)
  {
    id: "q-g10-t5-1",
    grade: "10",
    topicId: "g10_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính (Python)",
    question: "Đâu là quy tắc đặt tên biến HỢP LỆ trong ngôn ngữ lập trình Python?",
    options: [
      "1_diem_tin",
      "diem tin",
      "diem_tin_hoc",
      "diem-tin"
    ],
    correctIndex: 2,
    explanation: "Tên biến chỉ bao gồm chữ cái, chữ số và dấu gạch dưới '_', không được bắt đầu bằng chữ số và không chứa ký tự đặc biệt."
  },
  {
    id: "q-g10-t5-2",
    grade: "10",
    topicId: "g10_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính (Python)",
    question: "Cho câu lệnh Python 'for i in range(2, 8, 2):'. Biến i sẽ nhận các giá trị nào?",
    options: [
      "2, 4, 6, 8",
      "2, 4, 6",
      "2, 3, 4, 5, 6, 7",
      "4, 6, 8"
    ],
    correctIndex: 1,
    explanation: "range(start, stop, step) chạy từ start (2) đến trước stop (8) với bước nhảy step (2), sinh ra dãy: 2, 4, 6."
  },
  {
    id: "q-g10-t5-3",
    grade: "10",
    topicId: "g10_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính (Python)",
    question: "Kết quả của phép toán Python '17 // 5' và '17 % 5' lần lượt là bao nhiêu?",
    options: [
      "3 và 2",
      "3.4 và 2",
      "3 và 0",
      "2 và 3"
    ],
    correctIndex: 0,
    explanation: "// là phép chia lấy phần nguyên (17 // 5 = 3), % là phép chia lấy phần dư (17 % 5 = 2)."
  },
  {
    id: "q-g10-t5-4",
    grade: "10",
    topicId: "g10_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính (Python)",
    question: "Cú pháp hàm nhập dữ liệu từ bàn phím trả về kiểu chuỗi (string) trong Python là gì?",
    options: [
      "input()",
      "read()",
      "get()",
      "scan()"
    ],
    correctIndex: 0,
    explanation: "Hàm input() dừng chương trình chờ người dùng nhập văn bản và trả về giá trị kiểu str."
  },

  // LỚP 10 - CHỦ ĐỀ 6: Hướng nghiệp với Tin học
  {
    id: "q-g10-t6-1",
    grade: "10",
    topicId: "g10_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Hướng nghiệp với Tin học",
    question: "Nhóm nghề nghiệp nào sau đây thuộc lĩnh vực Tin học & Công nghệ thông tin?",
    options: [
      "Lập trình viên, Chuyên viên quản trị mạng, Kỹ sư dữ liệu",
      "Kiến trúc sư xây dựng dân dụng",
      "Bác sĩ phẫu thuật ngoại khoa",
      "Kế toán viên ngân hàng"
    ],
    correctIndex: 0,
    explanation: "Lập trình viên, chuyên viên mạng và kỹ sư dữ liệu là các ngành nghề cốt lõi trong ngành CNTT."
  },
  {
    id: "q-g10-t6-2",
    grade: "10",
    topicId: "g10_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Hướng nghiệp với Tin học",
    question: "Phần mềm ứng dụng và phần mềm hệ thống khác nhau cơ bản thế nào?",
    options: [
      "Phần mềm hệ thống quản lý phần cứng (ví dụ: Windows, Linux), phần mềm ứng dụng phục vụ nhu cầu cụ thể của người dùng (ví dụ: Word, Excel).",
      "Phần mềm ứng dụng chỉ chạy khi không có hệ điều hành.",
      "Phần mềm hệ thống do người dùng tự cài thêm, phần mềm ứng dụng do nhà sản xuất chip nạp sẵn.",
      "Hai loại phần mềm này hoàn toàn giống nhau."
    ],
    correctIndex: 0,
    explanation: "Hệ điều hành quản lý nền tảng phần cứng, tạo môi trường cho các phần mềm ứng dụng hoạt động."
  },

  // =========================================================================
  // LỚP 11
  // =========================================================================
  // LỚP 11 - CHỦ ĐỀ 1: Máy tính và xã hội tri thức
  {
    id: "q-g11-t1-1",
    grade: "11",
    topicId: "g11_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Bộ phận ALU (Arithmetic Logic Unit) trong CPU thực hiện chức năng gì?",
    options: [
      "Điều khiển luồng dữ liệu giữa các thiết bị ngoại vi.",
      "Thực hiện các phép tính số học (cộng, trừ, nhân, chia) và phép so sánh logic.",
      "Lưu trữ dữ liệu vĩnh viễn khi tắt máy.",
      "Nối máy tính với cáp mạng LAN."
    ],
    correctIndex: 1,
    explanation: "ALU đảm nhận tính toán số học và xử lý logic cho các chỉ thị của CPU."
  },
  {
    id: "q-g11-t1-2",
    grade: "11",
    topicId: "g11_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Tốc độ xung nhịp của CPU thường được đo bằng đơn vị nào?",
    options: [
      "Gigahertz (GHz)",
      "Megabyte (MB)",
      "Gigabit / giây (Gbps)",
      "Pixel"
    ],
    correctIndex: 0,
    explanation: "GHz thể hiện số triệu triệu chu kỳ dao động xử lý của vi xử lý CPU trong một giây."
  },
  {
    id: "q-g11-t1-3",
    grade: "11",
    topicId: "g11_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Hệ điều hành mã nguồn mở có đặc điểm tiêu biểu nào?",
    options: [
      "Mã nguồn được công khai rộng rãi, cộng đồng có thể tự do sử dụng, chỉnh sửa và phân phối.",
      "Bắt buộc người dùng phải trả phí bản quyền đắt đỏ.",
      "Không bao giờ bị lỗi phần mềm.",
      "Chỉ hoạt động trên siêu máy tính."
    ],
    correctIndex: 0,
    explanation: "Linux hay Android là ví dụ điển hình của hệ điều hành mã nguồn mở tự do phát triển."
  },

  // LỚP 11 - CHỦ ĐỀ 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin
  {
    id: "q-g11-t2-1",
    grade: "11",
    topicId: "g11_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    question: "Hệ quản trị CSDL đóng vai trò gì trong việc lưu trữ và khai thác dữ liệu?",
    options: [
      "Là thiết bị ổ cứng lưu trữ tệp tin.",
      "Là phần mềm cung cấp môi trường tạo lập, cập nhật, lưu trữ và truy vấn dữ liệu an toàn.",
      "Là chương trình soạn thảo văn bản đơn thuần.",
      "Là dịch vụ sửa chữa phần cứng máy tính."
    ],
    correctIndex: 1,
    explanation: "Hệ quản trị CSDL (DBMS) giúp quản lý, truy vấn và bảo mật dữ liệu tập trung hiệu quả."
  },
  {
    id: "q-g11-t2-2",
    grade: "11",
    topicId: "g11_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    question: "Kỹ thuật tìm kiếm Nâng cao bằng từ khóa logic AND trong Google Search mang lại kết quả gì?",
    options: [
      "Tìm các trang web chứa ÍT NHẤT MỘT trong các từ khóa.",
      "Bắt buộc trang kết quả phải chứa TẤT CẢ các từ khóa kết nối bởi AND.",
      "Loại bỏ từ khóa đứng sau AND.",
      "Tìm kiếm dịch từ tự động sang tiếng Anh."
    ],
    correctIndex: 1,
    explanation: "Phép toán AND thu hẹp phạm vi tìm kiếm, yêu cầu trang hiển thị chứa đầy đủ các từ kết hợp."
  },

  // LỚP 11 - CHỦ ĐỀ 3: Đạo đức, pháp luật và văn hóa trong môi trường số
  {
    id: "q-g11-t3-1",
    grade: "11",
    topicId: "g11_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Hành vi nào dưới đây bị nghiêm cấm theo Luật An ninh mạng?",
    options: [
      "Tìm kiếm thông tin phục vụ học tập trực tuyến.",
      "Phát tán thông tin sai sự thật, xúc phạm danh dự nhân phẩm của tổ chức hoặc cá nhân.",
      "Gửi bài tập qua thư điện tử cho thầy cô giáo.",
      "Đăng ký tài khoản học học trực tuyến bằng email nhà trường."
    ],
    correctIndex: 1,
    explanation: "Hành vi tung tin giả, bôi nhọ danh dự người khác vi phạm pháp luật An ninh mạng."
  },
  {
    id: "q-g11-t3-2",
    grade: "11",
    topicId: "g11_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Tác hại nguy hiểm của việc cài đặt phần mềm vi phạm bản quyền (phần mềm bẻ khóa - Crack) là gì?",
    options: [
      "Làm máy tính chạy nhanh gấp đôi.",
      "Có nguy cơ cao bị đính kèm mã độc, phần mềm gián điệp (Spyware) đánh cắp dữ liệu cá nhân.",
      "Giúp bàn phím gõ tiếng Việt không bị lỗi.",
      "Tăng dung lượng lưu trữ của ổ cứng."
    ],
    correctIndex: 1,
    explanation: "File crack thường bị tin tặc cài cắm Trojan và Ransomware để tống tiền hoặc kiểm soát máy tính từ xa."
  },

  // LỚP 11 - CHỦ ĐỀ 4: Giới thiệu các hệ cơ sở dữ liệu
  {
    id: "q-g11-t4-1",
    grade: "11",
    topicId: "g11_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Giới thiệu các hệ cơ sở dữ liệu",
    question: "Trong CSDL quan hệ, Khóa chính (Primary Key) có đặc điểm mấu chốt nào?",
    options: [
      "Được phép chứa giá trị trùng lặp.",
      "Xác định duy nhất mỗi bản ghi trong bảng và không bao giờ nhận giá trị NULL.",
      "Chỉ chấp nhận kiểu dữ liệu ngày tháng.",
      "Tự động mã hóa tệp hình ảnh."
    ],
    correctIndex: 1,
    explanation: "Khóa chính đảm bảo phân biệt duy nhất từng dòng dữ liệu và bắt buộc không được rỗng (NOT NULL)."
  },
  {
    id: "q-g11-t4-2",
    grade: "11",
    topicId: "g11_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Giới thiệu các hệ cơ sở dữ liệu",
    question: "Mối quan hệ giữa hai bảng trong CSDL quan hệ được liên kết thông qua đối tượng nào?",
    options: [
      "Khóa ngoại (Foreign Key) tham chiếu đến Khóa chính.",
      "Địa chỉ email của lập trình viên.",
      "Thẻ HTML <a>.",
      "Thẻ nhớ RAM."
    ],
    correctIndex: 0,
    explanation: "Khóa ngoại tạo liên kết giữa các bản ghi của bảng này với khóa chính của bảng khác."
  },
  {
    id: "q-g11-t4-3",
    grade: "11",
    topicId: "g11_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Giới thiệu các hệ cơ sở dữ liệu",
    question: "Mỗi dòng trong một bảng của CSDL quan hệ đại diện cho đối tượng nào?",
    options: [
      "Một trường (Field) thuộc tính.",
      "Một bản ghi (Record / Tuple) thông tin của đối tượng.",
      "Một tên CSDL.",
      "Một tệp tin âm thanh."
    ],
    correctIndex: 1,
    explanation: "Mỗi hàng (row) biểu diễn thông tin trọn vẹn của một bản ghi cụ thể."
  },

  // LỚP 11 - CHỦ ĐỀ 5: Hướng nghiệp với Tin học
  {
    id: "q-g11-t5-1",
    grade: "11",
    topicId: "g11_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Hướng nghiệp với Tin học",
    question: "Nhiệm vụ chính của một Chuyên viên Quản trị Cơ sở dữ liệu (DBA) là gì?",
    options: [
      "Sửa chữa bàn phím và chuột máy tính.",
      "Thiết kế, bảo trì, tối ưu hiệu năng và đảm bảo an toàn bảo mật cho hệ thống CSDL.",
      "Lập trình giao diện ứng dụng di động.",
      "Quay phim và biên tập kịch bản truyền hình."
    ],
    correctIndex: 1,
    explanation: "DBA (Database Administrator) quản lý vận hành, bảo mật và khôi phục dữ liệu cho tổ chức."
  },
  {
    id: "q-g11-t5-2",
    grade: "11",
    topicId: "g11_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Hướng nghiệp với Tin học",
    question: "Kỹ sư An toàn thông tin (Cybersecurity Specialist) chịu trách nhiệm về công việc gì?",
    options: [
      "Lắp ráp case máy tính phòng nét.",
      "Phát hiện lỗ hổng, thiết lập tường lửa và phòng chống tấn công mạng bảo vệ tài sản số.",
      "Soạn thảo hợp đồng mua bán thiết bị văn phòng.",
      "Dịch thuật sách ngoại văn."
    ],
    correctIndex: 1,
    explanation: "Chuyên gia an ninh mạng bảo vệ hạ tầng công nghệ khỏi các cuộc tấn công của tin tặc."
  },

  // LỚP 11 - CHỦ ĐỀ 6: Thực hành tạo và khai thác cơ sở dữ liệu (SQL)
  {
    id: "q-g11-t6-1",
    grade: "11",
    topicId: "g11_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Thực hành tạo và khai thác cơ sở dữ liệu (SQL)",
    question: "Câu lệnh SQL nào dùng để truy vấn LỌC các bản ghi theo điều kiện cụ thể?",
    options: [
      "SELECT ... FROM ... WHERE <điều_kiện>",
      "GET ALL WHERE <điều_kiện>",
      "FILTER <điều_kiện> FROM TABLE",
      "SORT BY <điều_kiện>"
    ],
    correctIndex: 0,
    explanation: "Mệnh đề WHERE trong câu lệnh SELECT quy định tiêu chuẩn lọc bản ghi thỏa mãn điều kiện."
  },
  {
    id: "q-g11-t6-2",
    grade: "11",
    topicId: "g11_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Thực hành tạo và khai thác cơ sở dữ liệu (SQL)",
    question: "Để THÊM MỚI một bản ghi dữ liệu vào bảng trong SQL, ta dùng cú pháp nào?",
    options: [
      "INSERT INTO TenBang (cot1, cot2) VALUES (gia_tri1, gia_tri2)",
      "ADD NEW RECORD TO TenBang",
      "UPDATE TenBang SET cot1 = gia_tri1",
      "CREATE RECORD IN TenBang"
    ],
    correctIndex: 0,
    explanation: "Cú pháp INSERT INTO thêm dữ liệu mới vào các cột chỉ định trong bảng."
  },
  {
    id: "q-g11-t6-3",
    grade: "11",
    topicId: "g11_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Thực hành tạo và khai thác cơ sở dữ liệu (SQL)",
    question: "Muốn SẮP XẾP kết quả truy vấn SQL giảm dần theo cột 'DiemTB', ta dùng từ khóa nào?",
    options: [
      "ORDER BY DiemTB DESC",
      "SORT BY DiemTB DOWN",
      "GROUP BY DiemTB MIN",
      "ORDER BY DiemTB ASC"
    ],
    correctIndex: 0,
    explanation: "ORDER BY ... DESC sắp xếp thứ tự giảm dần (Descending). ASC là tăng dần (Ascending)."
  },

  // LỚP 11 - CHỦ ĐỀ 7: Phần mềm chỉnh sửa ảnh và làm video
  {
    id: "q-g11-t7-1",
    grade: "11",
    topicId: "g11_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Phần mềm chỉnh sửa ảnh và làm video",
    question: "Trong phần mềm biên tập video, khái niệm 'Timeline' (Dòng thời gian) dùng để làm gì?",
    options: [
      "Sắp xếp, cắt ghép và đồng bộ các lớp video, âm thanh, hiệu ứng theo chuỗi thời gian.",
      "Xem lịch ngày tháng năm của máy tính.",
      "Lưu trữ danh bạ người dùng.",
      "Đo tốc độ quạt chip CPU."
    ],
    correctIndex: 0,
    explanation: "Timeline là không gian làm việc chính để xếp các phân cảnh, âm thanh và hiệu ứng theo dòng thời gian hoàn chỉnh."
  },
  {
    id: "q-g11-t7-2",
    grade: "11",
    topicId: "g11_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Phần mềm chỉnh sửa ảnh và làm video",
    question: "Hiệu ứng chuyển cảnh (Transition) trong dựng phim có tác dụng gì?",
    options: [
      "Tạo sự nối tiếp mượt mà, tự nhiên giữa hai đoạn clip video liền kề.",
      "Thay đổi phông chữ phụ đề.",
      "Tự động dịch giọng nói sang tiếng nước ngoài.",
      "Tăng dung lượng RAM máy tính."
    ],
    correctIndex: 0,
    explanation: "Hiệu ứng chuyển cảnh giúp mượt hóa sự hòa nhập giữa các phân đoạn cảnh quay."
  },

  // =========================================================================
  // LỚP 12
  // =========================================================================
  // LỚP 12 - CHỦ ĐỀ 1: Máy tính và xã hội tri thức
  {
    id: "q-g12-t1-1",
    grade: "12",
    topicId: "g12_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Xu hướng Học máy (Machine Learning) trong Trí tuệ nhân tạo (AI) giúp máy tính có khả năng gì?",
    options: [
      "Tự động học hỏi từ dữ liệu lịch sử để dự đoán và đưa ra quyết định mà không cần lập trình quy tắc cứng.",
      "Tăng dung lượng pin cho máy tính xách tay.",
      "Thay thế hoàn toàn chuột và bàn phím.",
      "Tự động dọn dẹp bụi bẩn trong thùng máy."
    ],
    correctIndex: 0,
    explanation: "Machine Learning giúp mô hình AI phân tích tập dữ liệu mẫu để rút ra quy luật và đưa ra dự đoán chính xác."
  },
  {
    id: "q-g12-t1-2",
    grade: "12",
    topicId: "g12_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Hệ thống AI tạo sinh (Generative AI) nổi tiếng như ChatGPT hay Gemini có khả năng chính là gì?",
    options: [
      "Tạo ra nội dung mới (văn bản, hình ảnh, mã lập trình) dựa trên kho dữ liệu tri thức được huấn luyện.",
      "Tự động sửa chữa phần cứng máy tính hư hỏng.",
      "Sạc điện thoại không dây từ xa.",
      "Thay thế hệ thống đường dây điện lưới quốc gia."
    ],
    correctIndex: 0,
    explanation: "AI tạo sinh (Generative AI) sinh ra văn bản, thơ ca, mã nguồn hay hình ảnh mới theo câu lệnh prompt của người dùng."
  },
  {
    id: "q-g12-t1-3",
    grade: "12",
    topicId: "g12_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Thử nghiệm Turing (Turing Test) được đề xuất nhằm mục đích gì?",
    options: [
      "Đánh giá xem một cỗ máy có khả năng thể hiện trí thông minh tương đương con người hay không.",
      "Kiểm tra độ bền của màn hình máy tính.",
      "Đo tốc độ đường truyền mạng cáp quang.",
      "Tính toán dung lượng ổ cứng HDD."
    ],
    correctIndex: 0,
    explanation: "Phép thử Turing kiểm tra khả năng giao tiếp của máy tính sao cho người đối thoại không phân biệt được với con người."
  },

  // LỚP 12 - CHỦ ĐỀ 2: Mạng máy tính và Internet
  {
    id: "q-g12-t2-1",
    grade: "12",
    topicId: "g12_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "Thiết bị Router (Bộ định tuyến) có vai trò chính là gì trong mô hình mạng Internet?",
    options: [
      "Định tuyến gói tin và chọn đường đi tốt nhất giữa các mạng máy tính khác nhau.",
      "Chuyển đổi dữ liệu văn bản thành file âm thanh.",
      "Lưu trữ hệ điều hành Windows.",
      "Sạc pin cho điện thoại di động."
    ],
    correctIndex: 0,
    explanation: "Router điều hướng luồng dữ liệu qua các địa chỉ IP để gói tin di chuyển chính xác qua các mạng độc lập."
  },
  {
    id: "q-g12-t2-2",
    grade: "12",
    topicId: "g12_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "Hệ thống phân giải tên miền DNS (Domain Name System) chuyển đổi dữ liệu thế nào?",
    options: [
      "Chuyển tên miền dễ nhớ (như google.com) thành địa chỉ IP số (như 142.250.190.46) để máy tính kết nối.",
      "Nén file ảnh thành file zip.",
      "Dịch tiếng Việt sang tiếng Pháp.",
      "Mã hóa file PDF."
    ],
    correctIndex: 0,
    explanation: "DNS hoạt động như danh bạ Internet, dịch tên miền chữ sang địa chỉ IP để định tuyến kết nối."
  },
  {
    id: "q-g12-t2-3",
    grade: "12",
    topicId: "g12_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "Giao thức HTTPS khác với HTTP ở điểm mấu chốt nào?",
    options: [
      "HTTPS được bổ sung thêm lớp mã hóa SSL/TLS giúp bảo mật an toàn dữ liệu truyền giữa trình duyệt và máy chủ.",
      "HTTP có tốc độ nhanh hơn 100 lần.",
      "HTTPS chỉ dành riêng cho máy tính Apple.",
      "HTTP không thể tải được hình ảnh."
    ],
    correctIndex: 0,
    explanation: "HTTPS (HTTP Secure) mã hóa đường truyền dữ liệu, chống lại nguy cơ nghe lén và đánh cắp thông tin."
  },

  // LỚP 12 - CHỦ ĐỀ 3: Đạo đức, pháp luật và văn hóa trong môi trường số
  {
    id: "q-g12-t3-1",
    grade: "12",
    topicId: "g12_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Tấn công giả mạo Phishing thường lợi dụng sơ hở nào của người dùng?",
    options: [
      "Gửi email/tin nhắn mạo danh ngân hàng hoặc dịch vụ uy tín dụ nhập mật khẩu/mã OTP vào trang web giả.",
      "Quét mã QR tại siêu thị thanh toán hàng hóa.",
      "Cập nhật driver card màn hình chính hãng.",
      "Tắt máy tính khi không sử dụng."
    ],
    correctIndex: 0,
    explanation: "Phishing lừa đảo người dùng bằng giao diện giả mạo giống hệt trang thật để chiếm đoạt thông tin đăng nhập."
  },
  {
    id: "q-g12-t3-2",
    grade: "12",
    topicId: "g12_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Trách nhiệm pháp lý khi chia sẻ thông tin cá nhân của người khác mà không được đồng ý là gì?",
    options: [
      "Vi phạm quyền riêng tư cá nhân và có thể bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự.",
      "Được mạng xã hội thưởng điểm uy tín.",
      "Không vi phạm bất kỳ quy định nào.",
      "Được cấp chứng chỉ bảo mật trực tuyến."
    ],
    correctIndex: 0,
    explanation: "Luật An toàn thông tin mạng và Nghị định bảo vệ dữ liệu cá nhân nghiêm cấm việc mua bán, chia sẻ dữ liệu riêng tư trái phép."
  },

  // LỚP 12 - CHỦ ĐỀ 4: Giải quyết vấn đề với sự trợ giúp của máy tính
  {
    id: "q-g12-t4-1",
    grade: "12",
    topicId: "g12_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Giải quyết vấn đề với sự trợ giúp của máy tính",
    question: "Đánh giá độ phức tạp thuật toán (Time Complexity) giúp lập trình viên xác định điều gì?",
    options: [
      "Mức độ tăng thời gian thực thi của thuật toán khi kích thước dữ liệu đầu vào n tăng lên.",
      "Số lượng dòng lệnh viết trong tệp nguồn.",
      "Kích thước màn hình hiển thị kết quả.",
      "Màu sắc giao diện phần mềm."
    ],
    correctIndex: 0,
    explanation: "Độ phức tạp thuật toán (Big O notation) đánh giá hiệu năng tối ưu hóa khi tập dữ liệu mở rộng."
  },
  {
    id: "q-g12-t4-2",
    grade: "12",
    topicId: "g12_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Giải quyết vấn đề với sự trợ giúp của máy tính",
    question: "Thuật toán Tìm kiếm Nhị phân (Binary Search) đòi hỏi danh sách đầu vào phải thỏa mãn điều kiện gì?",
    options: [
      "Danh sách đã được sắp xếp theo thứ tự (tăng dần hoặc giảm dần).",
      "Danh sách phải chứa toàn số nguyên âm.",
      "Độ dài danh sách bắt buộc phải là số lẻ.",
      "Danh sách không được phép có quá 10 phần tử."
    ],
    correctIndex: 0,
    explanation: "Tìm kiếm nhị phân chia đôi khoảng tìm kiếm dựa vào thứ tự đã sắp xếp của mảng."
  },

  // LỚP 12 - CHỦ ĐỀ 5: Hướng nghiệp với Tin học
  {
    id: "q-g12-t5-1",
    grade: "12",
    topicId: "g12_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Hướng nghiệp với Tin học",
    question: "Kỹ năng cần thiết nào giúp Lập trình viên Web (Web Developer) phát triển sự nghiệp vững chắc?",
    options: [
      "Thành thạo ngôn ngữ HTML/CSS/JS, tư duy thuật toán, giao thức mạng và học hỏi công nghệ mới.",
      "Kỹ năng sửa chữa động cơ xe máy.",
      "Kỹ năng cắm hoa nghệ thuật.",
      "Kỹ năng phẫu thuật y khoa."
    ],
    correctIndex: 0,
    explanation: "Web Developer cần kiến thức lập trình vững vàng kết hợp tư duy logic và cập nhật công nghệ nhanh chóng."
  },
  {
    id: "q-g12-t5-2",
    grade: "12",
    topicId: "g12_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Hướng nghiệp với Tin học",
    question: "Nghề Kỹ sư Dữ liệu (Data Engineer) đóng vai trò gì trong tổ chức?",
    options: [
      "Xây dựng đường ống dẫn dữ liệu (Data Pipeline), lưu trữ và xử lý dữ liệu lớn (Big Data) cho các nhà phân tích.",
      "Thiết kế băng rôn quảng cáo ngoài trời.",
      "Quản lý kho hàng nông sản.",
      "Chụp ảnh chân dung nghệ thuật."
    ],
    correctIndex: 0,
    explanation: "Data Engineer chuẩn bị hạ tầng thu thập và làm sạch dữ liệu lớn phục vụ phân tích kinh doanh và AI."
  },

  // LỚP 12 - CHỦ ĐỀ 6: Máy tính và xã hội tri thức (Chuyên đề)
  {
    id: "q-g12-t6-1",
    grade: "12",
    topicId: "g12_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Máy tính và xã hội tri thức (Chuyên đề)",
    question: "Chuyển đổi số (Digital Transformation) trong cơ quan nhà nước và doanh nghiệp nhằm mục tiêu chính nào?",
    options: [
      "Tích hợp công nghệ số vào quy trình hoạt động để nâng cao hiệu quả, tính minh bạch và tối ưu trải nghiệm dịch vụ.",
      "Thay thế toàn bộ nhân sự bằng robot cơ khí.",
      "Bắt buộc xóa bỏ hoàn toàn văn bản giấy tờ quá khứ.",
      "Tăng giá dịch vụ công lên gấp đôi."
    ],
    correctIndex: 0,
    explanation: "Chuyển đổi số hiện đại hóa quy trình làm việc, giúp quản lý dữ liệu số hóa nhanh chóng và phục vụ nhân dân tốt hơn."
  },
  {
    id: "q-g12-t6-2",
    grade: "12",
    topicId: "g12_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Máy tính và xã hội tri thức (Chuyên đề)",
    question: "Thành phố thông minh (Smart City) ứng dụng công nghệ nào để tối ưu giao thông và năng lượng?",
    options: [
      "Hệ thống cảm biến IoT kết hợp AI và phân tích dữ liệu thời gian thực.",
      "Sử dụng xe ngựa truyền thống.",
      "Tắt toàn bộ hệ thống đèn đường vào ban đêm.",
      "Ngừng cung cấp dịch vụ Internet công cộng."
    ],
    correctIndex: 0,
    explanation: "Smart City dùng mạng cảm biến IoT và trí tuệ nhân tạo điều phối giao thông, chiếu sáng và rác thải tự động."
  },

  // LỚP 12 - CHỦ ĐỀ 7: Ứng dụng Tin học (Thiết kế & phát triển Website HTML, CSS)
  {
    id: "q-g12-t7-1",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Cặp thẻ HTML chuẩn nào bao bọc TOÀN BỘ nội dung hiển thị trực tiếp trên giao diện trình duyệt?",
    options: [
      "<html> ... </html>",
      "<body> ... </body>",
      "<head> ... </head>",
      "<title> ... </title>"
    ],
    correctIndex: 1,
    explanation: "Thẻ <body> chứa tất cả phần tử văn bản, hình ảnh, bảng biểu hiển thị trực quan cho người dùng xem."
  },
  {
    id: "q-g12-t7-2",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Trong ngôn ngữ CSS, thuộc tính nào quy định MÀU SẮC của chữ?",
    options: [
      "text-color",
      "color",
      "font-color",
      "background-color"
    ],
    correctIndex: 1,
    explanation: "Thuộc tính 'color' trong CSS thiết lập màu chữ (ví dụ: color: #10b981;)."
  },
  {
    id: "q-g12-t7-3",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Thẻ HTML nào dùng để tạo liên kết (Hyperlink) dẫn sang trang web khác?",
    options: [
      "<link>",
      "<a href=\"...\">",
      "<url>",
      "<goto>"
    ],
    correctIndex: 1,
    explanation: "Thẻ <a> với thuộc tính href chỉ định đường dẫn siêu liên kết chuyển trang."
  },
  {
    id: "q-g12-t7-4",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Để chèn hình ảnh vào trang web HTML, ta sử dụng thẻ nào sau đây?",
    options: [
      "<img src=\"...\" alt=\"...\" />",
      "<image url=\"...\" />",
      "<pic source=\"...\" />",
      "<media img=\"...\" />"
    ],
    correctIndex: 0,
    explanation: "Thẻ <img> với thuộc tính src khai báo đường dẫn tệp ảnh và alt khai báo văn bản thay thế."
  },
  {
    id: "q-g12-t7-5",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Kỹ thuật Responsive Web Design (RWD) giải quyết vấn đề gì trong thiết kế website?",
    options: [
      "Tự động điều chỉnh giao diện website hiển thị tối ưu trên nhiều thiết bị có kích thước màn hình khác nhau (Desktop, Tablet, Mobile).",
      "Tự động dịch trang web sang 100 ngôn ngữ.",
      "Tăng tốc độ kết nối wifi nhà mạng.",
      "Mã hóa toàn bộ trang web thành file âm thanh."
    ],
    correctIndex: 0,
    explanation: "Responsive Web Design giúp trang web thích ứng linh hoạt với mọi độ phân giải màn hình thông qua CSS Media Queries."
  },
  {
    id: "q-g12-t7-6",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Trong CSS, bộ chọn ID được ký hiệu bằng ký tự nào trước tên ID?",
    options: [
      "Dấu thăng (#)",
      "Dấu chấm (.)",
      "Dấu hai chấm (:)",
      "Dấu còng (@)"
    ],
    correctIndex: 0,
    explanation: "Bộ chọn ID trong CSS sử dụng dấu thăng (#, ví dụ: #header), trong khi Class dùng dấu chấm (.)."
  },
  {
    id: "q-g12-t7-7",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Thẻ HTML nào dùng để tạo danh sách KHÔNG có thứ tự (Orderless / Bulleted list)?",
    options: [
      "<ul>",
      "<ol>",
      "<li>",
      "<dl>"
    ],
    correctIndex: 0,
    explanation: "Thẻ <ul> (Unordered List) tạo danh sách đầu dòng ký hiệu (bullet), còn <ol> tạo danh sách đánh số thứ tự."
  },
  {
    id: "q-g12-t7-8",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Mô hình CSS Box Model gồm có các thành phần nào từ trong ra ngoài?",
    options: [
      "Content -> Padding -> Border -> Margin",
      "Margin -> Border -> Padding -> Content",
      "Content -> Margin -> Border -> Padding",
      "Border -> Padding -> Margin -> Content"
    ],
    correctIndex: 0,
    explanation: "Box Model định nghĩa: Content (nội dung) nằm trong cùng, bao quanh bởi Padding (đệm), Border (viền), và Margin (lề ngoài)."
  },
  {
    id: "q-g12-t7-9",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Thẻ HTML nào tạo ô nhập dữ liệu văn bản hoặc mật khẩu trong biểu mẫu (Form)?",
    options: [
      "<input>",
      "<text>",
      "<field>",
      "<entry>"
    ],
    correctIndex: 0,
    explanation: "Thẻ <input type=\"text\"> hoặc <input type=\"password\"> nhận dữ liệu đầu vào của người dùng trong Form."
  },
  {
    id: "q-g12-t7-10",
    grade: "12",
    topicId: "g12_t7",
    topicNumber: 7,
    topicTitle: "Chủ đề 7. Ứng dụng Tin học (Thiết kế Website)",
    question: "Thuộc tính CSS nào cho phép dàn trang linh hoạt theo dạng lưới hai chiều (Grid layout)?",
    options: [
      "display: grid;",
      "display: flex;",
      "display: block;",
      "display: inline;"
    ],
    correctIndex: 0,
    explanation: "CSS Grid (display: grid;) hỗ trợ tạo bố cục website dạng hàng và cột hai chiều tối ưu."
  },
  {
    id: "q-g12-t1-4",
    grade: "12",
    topicId: "g12_t1",
    topicNumber: 1,
    topicTitle: "Chủ đề 1. Máy tính và xã hội tri thức",
    question: "Thị giác máy tính (Computer Vision) trong AI ứng dụng vào lĩnh vực nào?",
    options: [
      "Nhận diện khuôn mặt, tự động lái xe và chẩn đoán hình ảnh y tế.",
      "Tăng công suất loa máy tính.",
      "Sửa chữa đường dây điện nguồn.",
      "Làm sạch màn hình hiển thị."
    ],
    correctIndex: 0,
    explanation: "Computer Vision giúp máy tính phân tích, trích xuất và hiểu thông tin từ hình ảnh và video số."
  },
  {
    id: "q-g12-t2-4",
    grade: "12",
    topicId: "g12_t2",
    topicNumber: 2,
    topicTitle: "Chủ đề 2. Mạng máy tính và Internet",
    question: "Địa chỉ IPv6 ra đời nhằm mục đích chính nào so với IPv4?",
    options: [
      "Mở rộng không gian địa chỉ IP lên 128 bit, giải quyết tình trạng cạn kệt địa chỉ IPv4 32 bit.",
      "Tăng dung lượng lưu trữ ổ cứng SSD.",
      "Dịch ngôn ngữ lập trình Python.",
      "Giảm độ sáng màn hình laptop."
    ],
    correctIndex: 0,
    explanation: "IPv6 dài 128 bit cung cấp kho địa chỉ khổng lồ cho hàng tỷ thiết bị IoT kết nối Internet."
  },
  {
    id: "q-g12-t3-3",
    grade: "12",
    topicId: "g12_t3",
    topicNumber: 3,
    topicTitle: "Chủ đề 3. Đạo đức, pháp luật và văn hóa trong môi trường số",
    question: "Công nghệ Deepfake tạo ra nguy cơ gì nghiêm trọng trên môi trường số?",
    options: [
      "Giả mạo khuôn mặt và giọng nói của con người trong video/âm thanh để lừa đảo hoặc bôi nhọ.",
      "Làm hỏng bàn phím máy tính.",
      "Tăng tốc độ truy cập wifi.",
      "Tự động gửi email bài tập."
    ],
    correctIndex: 0,
    explanation: "Deepfake lợi dụng AI giả mạo chân thực hình ảnh, giọng nói con người, đe dọa an ninh thông tin và tài sản."
  },
  {
    id: "q-g12-t4-3",
    grade: "12",
    topicId: "g12_t4",
    topicNumber: 4,
    topicTitle: "Chủ đề 4. Giải quyết vấn đề với sự trợ giúp của máy tính",
    question: "Thuật toán Sắp xếp Nhanh (QuickSort) hoạt động dựa trên chiến lược tư duy nào?",
    options: [
      "Chia để trị (Divide and Conquer).",
      "Duyệt qua toàn bộ phần tử ngẫu nhiên.",
      "Sắp xếp theo thứ tự bảng chữ cái.",
      "Quay đĩa may mắn."
    ],
    correctIndex: 0,
    explanation: "QuickSort chọn một phần tử chốt (pivot), phân chia mảng thành 2 nửa và đệ quy sắp xếp theo tư duy Chia để trị."
  },
  {
    id: "q-g12-t5-3",
    grade: "12",
    topicId: "g12_t5",
    topicNumber: 5,
    topicTitle: "Chủ đề 5. Hướng nghiệp với Tin học",
    question: "Nhà thiết kế giao diện và trải nghiệm người dùng (UI/UX Designer) cần ưu tiên điều gì?",
    options: [
      "Tạo giao diện đẹp mắt, dễ sử dụng, thân thiện và tối ưu sự thuận tiện cho người dùng.",
      "Viết mã nguồn bằng ngôn ngữ Assembly.",
      "Cài đặt phần mềm diệt virus.",
      "Thiết kế mạch điện tử bên trong ổ cứng."
    ],
    correctIndex: 0,
    explanation: "UI/UX Designer đảm bảo giao diện trực quan (UI) và hành trình trải nghiệm người dùng (UX) đạt hiệu quả cao nhất."
  },
  {
    id: "q-g12-t6-3",
    grade: "12",
    topicId: "g12_t6",
    topicNumber: 6,
    topicTitle: "Chủ đề 6. Máy tính và xã hội tri thức (Chuyên đề)",
    question: "Dữ liệu lớn (Big Data) có đặc trưng tiêu biểu nào (quy tắc các chữ V)?",
    options: [
      "Volume (Dung lượng lớn), Velocity (Tốc độ cao), Variety (Đa dạng dạng thức).",
      "Virus, Virtual, Vector.",
      "Value, Voice, Video.",
      "Volume, Version, View."
    ],
    correctIndex: 0,
    explanation: "3V cốt lõi của Big Data gồm Khối lượng siêu lớn (Volume), Tốc độ sinh dữ liệu cực nhanh (Velocity) và Đa dạng cấu trúc (Variety)."
  }
];

export const EXCEL_SIMS: any[] = [
  {
    name: "SUM",
    syntax: "=SUM(đối_số_1, đối_số_2, ...)",
    description: "Tính tổng tất cả các số có trong vùng chọn hoặc các ô chỉ định.",
    exampleData: [
      { row: 1, colA: "Toán", colB: "Vật lý", colC: "Tin học" },
      { row: 2, colA: "8", colB: "7", colC: "9" }
    ],
    inputs: [
      { label: "Số thứ 1 (A2)", defaultValue: "8", description: "Điểm Toán" },
      { label: "Số thứ 2 (B2)", defaultValue: "7", description: "Điểm Lý" },
      { label: "Số thứ 3 (C2)", defaultValue: "9", description: "Điểm Tin" }
    ],
    calculate: (inputs: string[]) => {
      const sum = inputs.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
      return sum.toString();
    }
  },
  {
    name: "AVERAGE",
    syntax: "=AVERAGE(đối_số_1, đối_số_2, ...)",
    description: "Tính giá trị trung bình cộng của các đối số truyền vào.",
    exampleData: [
      { row: 1, colA: "Toán", colB: "Vật lý", colC: "Tin học" },
      { row: 2, colA: "8", colB: "7", colC: "9" }
    ],
    inputs: [
      { label: "Toán (A2)", defaultValue: "8", description: "Điểm Toán" },
      { label: "Vật lý (B2)", defaultValue: "7", description: "Điểm Lý" },
      { label: "Tin học (C2)", defaultValue: "9", description: "Điểm Tin" }
    ],
    calculate: (inputs: string[]) => {
      const parsed = inputs.map(v => parseFloat(v) || 0);
      const avg = parsed.reduce((acc, val) => acc + val, 0) / (parsed.length || 1);
      return avg.toFixed(2);
    }
  },
  {
    name: "IF",
    syntax: "=IF(điều_kiện, giá_trị_nếu_đúng, giá_trị_nếu_sai)",
    description: "Trả về một giá trị nếu điều kiện được đáp ứng, và một giá trị khác nếu điều kiện không được đáp ứng.",
    exampleData: [
      { row: 1, colA: "Họ Tên", colB: "Điểm TB", colC: "Xếp loại" },
      { row: 2, colA: "Nam", colB: "7.5", colC: "=IF(B2>=8, \"Giỏi\", \"Khá\")" }
    ],
    inputs: [
      { label: "Điểm TB (B2)", defaultValue: "7.5", description: "Điểm trung bình học sinh" },
      { label: "Điểm chuẩn Giỏi", defaultValue: "8", description: "Ngưỡng điểm xếp loại Giỏi" }
    ],
    calculate: (inputs: string[]) => {
      const score = parseFloat(inputs[0]) || 0;
      const benchmark = parseFloat(inputs[1]) || 8;
      return score >= benchmark ? "Giỏi" : "Khá";
    }
  }
];
