import { LessonChapter } from "../types";

export const CHAPTERS: LessonChapter[] = [
  // GRADE 10 (34 Lessons based on textbook 'Kết nối tri thức với cuộc sống')
  {
    id: "lop10-bai-1",
    grade: "10",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 1. Thông tin và xử lí thông tin",
    description: "Tìm hiểu khái niệm thông tin, dữ liệu, vật mang tin và 4 bước cốt lõi trong quá trình xử lí thông tin.",
    content: `### 1. Khái niệm thông tin và dữ liệu
- **Thông tin (Information):** Là những gì mang lại hiểu biết cho con người về thế giới xung quanh và về chính mình.
- **Dữ liệu (Data):** Là thông tin đã được đưa vào máy tính để lưu trữ, xử lý. Dữ liệu là nguyên liệu cho máy tính hoạt động.
- **Vật mang tin (Carrier):** Là phương tiện, vật chứa đựng hoặc truyền dữ liệu (ví dụ: đĩa cứng, sách vở, sóng Wi-Fi).

### 2. Quá trình xử lí thông tin
Quá trình xử lý thông tin trong máy tính và con người đều gồm 4 bước cơ bản tuần tự:
1. **Thu nhận:** Tiếp nhận thông tin từ bên ngoài (ví dụ: mắt nhìn, microphone ghi âm, bàn phím gõ vào).
2. **Lưu trữ:** Ghi nhớ dữ liệu vào bộ nhớ trong (RAM) hoặc bộ nhớ ngoài (ổ cứng) để dùng lâu dài.
3. **Xử lí:** Biến đổi, tính toán dữ liệu bằng bộ vi xử lý (CPU) để tạo ra thông tin mới hữu ích.
4. **Truyền/Xuất:** Đưa kết quả hữu ích ra thiết bị hiển thị (màn hình, loa) hoặc truyền đi qua mạng Internet.`,
    suggestedQuestions: [
      "Cô ơi, sự khác biệt bản chất nhất giữa Thông tin và Dữ liệu là gì ạ?",
      "Vật mang tin có thể là những thứ gì xung quanh chúng ta thế Cô?",
      "Bước nào là quan trọng nhất trong 4 bước xử lí thông tin hả Cô?"
    ]
  },
  {
    id: "lop10-bai-2",
    grade: "10",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 2. Vai trò của thiết bị thông minh và tin học đối với xã hội",
    description: "Làm quen với các thiết bị thông minh thế hệ mới và tầm ảnh hưởng sâu rộng của Tin học trong cuộc sống.",
    content: `### 1. Thiết bị thông minh là gì?
- **Định nghĩa:** Là các thiết bị điện tử có bộ vi xử lý độc lập, kết nối internet/mạng không dây, có khả năng tương tác tự động và xử lý dữ liệu thông minh.
- **Đặc điểm:** Tự động hóa, kết nối không giới hạn, hoạt động không cần con người can thiệp liên tục.
- *Ví dụ:* Điện thoại thông minh (smartphone), robot hút bụi thông minh, camera AI, nhà thông minh (smart home).

### 2. Vai trò của Tin học đối với xã hội
- **Sản xuất và quản lý:** Tối ưu hóa dây chuyền sản xuất tự động, quản lý chính phủ điện tử, quản trị doanh nghiệp hiệu quả.
- **Y tế & Giáo dục:** Giúp chẩn đoán bệnh từ xa, học tập trực tuyến thông qua các hệ thống quản lý học tập (LMS).
- **Thúc đẩy xã hội tri thức:** Chuyển đổi mọi mặt đời sống sang chuyển đổi số, tạo nền tảng cho sự phát triển của cách mạng công nghiệp lần thứ tư.`,
    suggestedQuestions: [
      "Cô ơi, tại sao một chiếc điều hòa thông thường lại không được gọi là thiết bị thông minh ạ?",
      "Tin học đã thay đổi cách chúng ta học tập như thế nào vậy Cô?",
      "Sau này robot thông minh có thể thay thế hoàn toàn con người không hả Cô?"
    ]
  },
  {
    id: "lop10-bai-3",
    grade: "10",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 3. Một số kiểu dữ liệu và dữ liệu văn bản",
    description: "Tìm hiểu cách số hóa dữ liệu văn bản thông qua các hệ thống mã hóa ký tự chuẩn quốc tế ASCII và Unicode.",
    content: `### 1. Biểu diễn dữ liệu văn bản trong máy tính
- Máy tính không hiểu trực tiếp các chữ cái hay ký tự văn bản. Tất cả phải được chuyển đổi thành dãy bit (gồm các chữ số 0 và 1).
- **Số hóa văn bản:** Là quá trình chuyển đổi văn bản thành dãy các bit tương ứng dựa trên một bảng mã ký tự thống nhất.

### 2. Các bảng mã ký tự thông dụng
- **Bảng mã ASCII:** 
  - Sử dụng 8 bit để biểu diễn 256 ký tự khác nhau.
  - Thích hợp cho các ký tự tiếng Anh cơ bản, chữ số và các ký hiệu điều khiển.
- **Bảng mã Unicode:**
  - Chuẩn mã hóa toàn cầu, sử dụng từ 16 đến 32 bit.
  - Có khả năng mã hóa hàng triệu ký tự khác nhau, biểu diễn đầy đủ tất cả ngôn ngữ trên thế giới, bao gồm tiếng Việt có dấu và các biểu tượng cảm xúc (emoji).`,
    suggestedQuestions: [
      "Cô ơi, tại sao bảng mã ASCII lại không thể gõ được tiếng Việt có dấu ạ?",
      "Bảng mã Unicode hoạt động như thế nào để hiển thị được mọi ngôn ngữ vậy Cô?",
      "Một ký tự Unicode thường tốn nhiều dung lượng lưu trữ hơn ASCII phải không Cô?"
    ]
  },
  {
    id: "lop10-bai-4",
    grade: "10",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 4. Hệ nhị phân và dữ liệu số nguyên",
    description: "Cách máy tính sử dụng hệ đếm nhị phân cơ số 2 để lưu trữ số nguyên và cách chuyển đổi giữa hệ thập phân và nhị phân.",
    content: `### 1. Hệ nhị phân (Binary System)
- Là hệ đếm cơ số 2, chỉ sử dụng đúng hai chữ số là \`0\` và \`1\`.
- **Vì sao máy tính dùng hệ nhị phân?** Vì các linh kiện phần cứng điện tử hoạt động dựa trên dòng điện có hai trạng thái vật lý cực kỳ rõ ràng, dễ đo lường: Đóng mạch (có điện - tương ứng với \`1\`) và Ngắt mạch (không có điện - tương ứng với \`0\`).

### 2. Chuyển đổi giữa hệ thập phân và nhị phân
- **Thập phân sang Nhị phân:** Chia liên tiếp số thập phân cho 2, lấy phần dư và viết các số dư theo chiều từ dưới lên trên.
  - *Ví dụ:* Số \`13\` chia 2 dư 1; thương là 6. 6 chia 2 dư 0; thương là 3. 3 chia 2 dư 1; thương là 1. 1 chia 2 dư 1; thương là 0. Viết ngược lại ta được \`1101\`.
- **Nhị phân sang Thập phân:** Nhân từng chữ số nhị phân với lũy thừa của 2 tương ứng với vị trí của nó (tính từ phải qua trái bắt đầu từ lũy thừa 0), rồi cộng các kết quả lại.`,
    sampleCode: `# Ví dụ Python: Chuyển đổi hệ cơ số
so_thap_phan = 13
so_nhi_phan = bin(so_thap_phan) # Kết quả có tiền tố '0b' biểu thị nhị phân
print("Hệ thập phân 13 chuyển sang nhị phân là:", so_nhi_phan)

# Chuyển ngược lại
chuyen_nguoc = int("1101", 2)
print("Hệ nhị phân '1101' chuyển sang thập phân là:", chuyen_nguoc)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, làm thế nào để đổi một số thập phân lớn sang nhị phân thật nhanh ạ?",
      "Tiền tố '0b' trong kết quả bin() của Python có ý nghĩa gì thế Cô?",
      "Số nguyên âm được lưu trữ trong hệ nhị phân như thế nào hả Cô?"
    ]
  },
  {
    id: "lop10-bai-5",
    grade: "10",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 5. Dữ liệu lôgic",
    description: "Khám phá thế giới của các phép toán logic cơ bản AND, OR, NOT tạo nền tảng cho lập trình điều khiển.",
    content: `### 1. Giá trị lôgic và Biến lôgic
- **Giá trị lôgic:** Chỉ nhận một trong hai trạng thái duy nhất: **Đúng (True / 1)** hoặc **Sai (False / 0)**.
- **Biến lôgic:** Là biến chỉ lưu trữ giá trị lôgic.

### 2. Các phép toán lôgic cơ bản
- **Phép toán AND (Và - Phép nhân lôgic):** Kết quả chỉ ĐÚNG khi tất cả các điều kiện thành phần đều đúng.
- **Phép toán OR (Hoặc - Phép cộng lôgic):** Kết quả ĐÚNG khi có ít nhất một điều kiện thành phần đúng.
- **Phép toán NOT (Phủ định):** Đảo ngược giá trị logic hiện tại (Đúng thành Sai, Sai thành Đúng).`,
    sampleCode: `# Ví dụ minh họa phép toán logic trong Python
troi_mua = False
co_o = True

# Điều kiện ra đường
di_choi = (not troi_mua) or co_o
print("Có đi chơi được không?", di_choi)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, phép toán NOT AND (NAND) hay phép XOR hoạt động như thế nào ạ?",
      "Tại sao dữ liệu lôgic lại vô cùng quan trọng trong cấu trúc rẽ nhánh hả Cô?",
      "Làm sao để lập bảng chân trị (truth table) cho các biểu thức phức tạp hả Cô?"
    ]
  },
  {
    id: "lop10-bai-6",
    grade: "10",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 6. Dữ liệu âm thanh và hình ảnh",
    description: "Tìm hiểu phương pháp lấy mẫu số hóa âm thanh, biểu diễn hình ảnh dạng lưới pixel tinh vi trong máy tính.",
    content: `### 1. Số hóa hình ảnh
- **Ảnh bitmap:** Được tạo thành từ một lưới các điểm nhỏ gọi là **Pixel (Điểm ảnh)**.
- Mỗi pixel lưu trữ một giá trị màu sắc cụ thể dưới dạng số nhị phân. Hệ màu phổ biến là **RGB** (Red, Green, Blue).
- **Độ phân giải:** Tổng số điểm ảnh (ví dụ: Full HD 1920x1080).

### 2. Số hóa âm thanh
- Sóng âm ngoài tự nhiên có dạng liên tục hình sin.
- **Số hóa âm thanh:** Được thực hiện bằng cách đo đạc độ cao sóng âm liên tục theo từng khoảng thời gian cực kỳ nhỏ, quá trình này gọi là **Lấy mẫu (Sampling)**.
- Tốc độ lấy mẫu càng cao thì chất lượng âm thanh tái tạo càng trung thực.`,
    suggestedQuestions: [
      "Cô ơi, hệ màu RGB hoạt động thế nào để tạo ra hàng triệu màu sắc khác nhau ạ?",
      "Tại sao ảnh vectơ lại không bị vỡ hình khi phóng to như ảnh bitmap hả Cô?",
      "Tần số lấy mẫu âm thanh chuẩn CD 44.1 kHz nghĩa là gì vậy Cô?"
    ]
  },
  {
    id: "lop10-bai-7",
    grade: "10",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 7. Thực hành sử dụng thiết bị số thông dụng",
    description: "Thực hành kết nối các thiết bị di động, máy ảnh, máy quét và cách sao lưu dữ liệu an toàn.",
    content: `### 1. Thực hành kết nối thiết bị số
- Kết nối điện thoại thông minh, máy ảnh số với máy tính qua cổng USB, Bluetooth, hoặc Wi-Fi.
- Thao tác truyền dữ liệu (chép ảnh, nhạc, tài liệu) qua lại an toàn.

### 2. Sử dụng thiết bị quét và hiển thị
- Làm quen với máy quét tài liệu (Scanner), chuyển đổi văn bản giấy thành định dạng số (PDF, ảnh).
- Thiết lập kết nối máy tính với máy chiếu (Projector), màn hình phụ an toàn.

### 3. Sao lưu an toàn đám mây
- Thực hành đồng bộ ảnh và tài liệu lên các dịch vụ đám mây uy tín như Google Drive, OneDrive, iCloud để phòng ngừa mất mát dữ liệu phần cứng.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để đồng bộ dữ liệu giữa Android và Windows thật nhanh ạ?",
      "Tại sao máy tính của em không nhận kết nối cổng USB với điện thoại hả Cô?",
      "Lưu trữ dữ liệu trên đám mây có thực sự an toàn tuyệt đối không Cô?"
    ]
  },
  {
    id: "lop10-bai-8",
    grade: "10",
    topic: "Chủ đề 2. MẠNG MÁY TÍNH VÀ INTERNET",
    title: "Bài 8. Mạng máy tính trong cuộc sống hiện đại",
    description: "Hiểu sâu sắc về lợi ích của mạng máy tính toàn cầu và xu thế Cách mạng Điện toán đám mây (Cloud Computing).",
    content: `### 1. Lợi ích vượt trội của mạng máy tính
- **Giao tiếp:** Kết nối liên lạc tức thời thông qua thư điện tử, mạng xã hội, cuộc họp trực tuyến.
- **Chia sẻ tài nguyên:** Chia sẻ phần cứng dùng chung (máy in, máy chủ lưu trữ dữ liệu) giúp giảm thiểu chi phí.
- **Dữ liệu tập trung:** Giúp quản lý thông tin chính xác, đồng bộ hóa tức thời dữ liệu.

### 2. Sự phát triển của Điện toán đám mây
- **Khái niệm:** Cung cấp các tài nguyên công nghệ (máy chủ, lưu trữ, cơ sở dữ liệu, phần mềm) qua Internet theo yêu cầu.
- **Các mô hình dịch vụ chính:**
  - **SaaS (Software as a Service):** Phần mềm dưới dạng dịch vụ (ví dụ: Gmail, Office 365, Canva).
  - **PaaS (Platform as a Service):** Nền tảng lập trình và triển khai ứng dụng.
  - **IaaS (Infrastructure as a Service):** Hạ tầng máy chủ, ổ cứng vật lý ảo hóa.`,
    suggestedQuestions: [
      "Cô ơi, Điện toán đám mây đã giúp tiết kiệm chi phí cho các công ty như thế nào ạ?",
      "Sự khác biệt giữa mạng nội bộ LAN và mạng toàn cầu Internet là gì vậy Cô?",
      "Làm sao để biết một ứng dụng em đang dùng thuộc mô hình SaaS hay PaaS hả Cô?"
    ]
  },
  {
    id: "lop10-bai-9",
    grade: "10",
    topic: "Chủ đề 2. MẠNG MÁY TÍNH VÀ INTERNET",
    title: "Bài 9. An toàn trên không gian mạng",
    description: "Trang bị các kỹ năng nhận diện phần mềm độc hại, phòng tránh tấn công giả mạo lừa đảo thông tin trực tuyến.",
    content: `### 1. Các mối đe dọa mất an toàn thông tin
- **Malware (Phần mềm độc hại):**
  - **Virus:** Lây lan bằng cách gắn mã độc vào các tệp tin sạch khác.
  - **Worm (Sâu máy tính):** Tự nhân bản và lây lan qua mạng internet mà không cần tệp vật chủ.
  - **Trojan:** Giả dạng làm phần mềm hữu ích để lừa người dùng cài đặt nhằm đánh cắp dữ liệu.
  - **Ransomware:** Mã hóa toàn bộ dữ liệu máy tính của nạn nhân để đòi tiền chuộc.
- **Phishing (Tấn công giả mạo):** Gửi email, tin nhắn giả dạng cơ quan chức năng, ngân hàng dụ dỗ nạn nhân đăng nhập tài khoản.

### 2. Các biện pháp bảo vệ bản thân trên Internet
- Tạo mật khẩu mạnh (dài trên 8 ký tự, có ký tự đặc biệt, không dùng ngày sinh).
- Kích hoạt xác thực hai yếu tố (2FA) cho tất cả các tài khoản mạng xã hội và email.
- Không tải tệp lạ từ các trang web lậu hoặc nhấp vào liên kết đáng ngờ gửi từ người lạ.`,
    suggestedQuestions: [
      "Cô ơi, Ransomware nguy hiểm như thế nào và nếu bị nhiễm thì phải làm sao ạ?",
      "Làm sao để nhận biết một liên kết hoặc email lừa đảo giả mạo hả Cô?",
      "Có nên dùng các phần mềm diệt virus miễn phí không thế Cô?"
    ]
  },
  {
    id: "lop10-bai-10",
    grade: "10",
    topic: "Chủ đề 2. MẠNG MÁY TÍNH VÀ INTERNET",
    title: "Bài 10. Thực hành khai thác tài nguyên trên Internet",
    description: "Thao tác tìm kiếm thông tin chuyên sâu trên Google Search và cách đánh giá độ chính xác của tài liệu.",
    content: `### 1. Kỹ năng tìm kiếm nâng cao (Google Advanced Search)
- Sử dụng cặp dấu ngoặc kép \`"cụm từ"\` để tìm chính xác cụm từ khóa đó.
- Sử dụng toán tử \`filetype:pdf\` hoặc \`filetype:docx\` để tìm trực tiếp các tệp tài liệu định dạng mong muốn.
- Sử dụng toán tử \`site:ten_mien.vn\` để giới hạn phạm vi tìm kiếm trên một trang web cụ thể.

### 2. Đánh giá độ tin cậy của thông tin
- **Nguồn gốc:** Kiểm tra thông tin thuộc trang web chính phủ (\`.gov\`), tổ chức (\`.org\`), hay cá nhân lừa đảo.
- **Tác giả:** Người viết có chuyên môn về lĩnh vực đó không.
- **Tính cập nhật:** Ngày xuất bản bài viết gần đây hay đã quá cũ lỗi thời.
- **Đối chiếu:** Kiểm tra xem các nguồn báo chí chính thống khác có đưa tin tương tự không.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để tìm kiếm các bài viết khoa học đáng tin cậy trên Internet ạ?",
      "Tại sao kết quả tìm kiếm đầu tiên của Google chưa chắc đã là kết quả chính xác nhất hả Cô?",
      "Mẹo tìm kiếm tài liệu học tập theo từng định dạng file cụ thể thế nào ạ Cô?"
    ]
  },
  {
    id: "lop10-bai-11",
    grade: "10",
    topic: "Chủ đề 3. ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ",
    title: "Bài 11. Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền",
    description: "Học các ứng xử văn minh khi tham gia mạng xã hội và tuân thủ luật bảo hộ bản quyền phần mềm, sở hữu trí tuệ.",
    content: `### 1. Quy tắc ứng xử trên mạng (Netiquette)
- Tôn trọng quyền riêng tư của người khác, không chia sẻ thông tin, hình ảnh cá nhân của người khác khi chưa được đồng ý.
- Sử dụng ngôn từ lịch sự, văn minh; không tham gia vào các hội nhóm bắt nạt trực tuyến, thóa mạ bôi nhọ người khác.
- Có trách nhiệm với thông tin mình chia sẻ, không phát tán tin đồn thất thiệt, tin giả (Fake News).

### 2. Luật và nghĩa vụ tôn trọng bản quyền
- **Luật Sở hữu trí tuệ:** Bảo hộ các sản phẩm sáng tạo như tác phẩm văn học, âm nhạc, video, phần mềm máy tính.
- **Vi phạm bản quyền:** Sao chép lậu, sử dụng các bản bẻ khóa (crack) phần mềm, chia sẻ tài liệu thương mại trái phép.
- **Ứng xử đúng đắn:** Ưu tiên sử dụng phần mềm mã nguồn mở miễn phí, ghi nguồn trích dẫn đầy đủ khi dùng tài liệu tham khảo.`,
    suggestedQuestions: [
      "Cô ơi, lấy một hình ảnh trên Google về chèn vào bài thuyết trình có cần xin phép bản quyền không ạ?",
      "Làm sao để biết một phần mềm là bản quyền thương mại hay phần mềm nguồn mở tự do thế Cô?",
      "Chia sẻ một bài đăng tin tức chưa được kiểm chứng lên mạng xã hội có bị phạt pháp luật không hả Cô?"
    ]
  },
  {
    id: "lop10-bai-12",
    grade: "10",
    topic: "Chủ đề 4. ỨNG DỤNG TIN HỌC",
    title: "Bài 12. Phần mềm thiết kế đồ hoạ",
    description: "Giới thiệu phân biệt giữa đồ họa bitmap và đồ họa vectơ, làm quen giao diện Inkscape.",
    content: `### 1. Phân biệt đồ họa vectơ và đồ họa bitmap
- **Đồ họa bitmap (Raster Graphics):**
  - Biểu diễn bằng lưới pixel.
  - Phù hợp với ảnh chụp tự nhiên, độ chuyển màu mịn.
  - **Nhược điểm:** Khi phóng to vượt mức sẽ xảy ra hiện tượng vỡ ảnh, rạn hình.
- **Đồ họa vectơ (Vector Graphics):**
  - Biểu diễn bằng các công thức toán học (đường thẳng, đường cong, đa giác).
  - Phù hợp thiết kế logo, banner quảng cáo, phông bạt cỡ lớn.
  - **Ưu điểm vượt trội:** Phóng to thoải mái mà hình ảnh vẫn mịn màng sắc nét tuyệt đối.

### 2. Phần mềm thiết kế Inkscape
- Là phần mềm đồ họa vectơ mã nguồn mở miễn phí phổ biến hàng đầu.
- Giao diện gồm thanh công cụ vẽ bên trái, trang vẽ ở giữa và bảng thuộc tính màu sắc ở dưới.`,
    suggestedQuestions: [
      "Cô ơi, tại sao khi thiết kế logo người ta luôn bắt buộc phải vẽ bằng đồ họa vectơ ạ?",
      "Inkscape có thể mở và chỉnh sửa các file ảnh chụp thông thường .jpg được không hả Cô?",
      "Cách cài đặt phần mềm Inkscape trên hệ điều hành Windows thế nào vậy Cô?"
    ]
  },
  {
    id: "lop10-bai-13",
    grade: "10",
    topic: "Chủ đề 4. ỨNG DỤNG TIN HỌC",
    title: "Bài 13. Bổ sung các đối tượng đồ hoạ",
    description: "Hướng dẫn thực hành tạo các hình khối cơ bản, tùy biến thuộc tính màu nền Fill và viền Stroke.",
    content: `### 1. Tạo các đối tượng hình học cơ bản
- Inkscape hỗ trợ vẽ nhanh các hình học tiêu chuẩn:
  - Vẽ hình chữ nhật, hình vuông (\`F4\`).
  - Vẽ hình tròn, hình elip (\`F5\`).
  - Vẽ đa giác, hình ngôi sao (\`* \` hoặc \`F9\`).

### 2. Thuộc tính màu sắc của đối tượng
- Mở bảng điều khiển thuộc tính bằng phím tắt \`Ctrl + Shift + F\`:
  - **Fill (Màu tô bên trong):** Chọn màu đơn sắc, tô chuyển màu hoặc không tô màu nền.
  - **Stroke paint (Màu đường viền):** Chọn màu sắc cho đường nét viền của đối tượng.
  - **Stroke style (Kiểu đường viền):** Thay đổi độ dày, nét đứt, nét liền của viền đối tượng.

### 3. Ghép nhóm đối tượng
- Chọn nhiều đối tượng và bấm \`Ctrl + G\` để nhóm chúng lại thành một khối thống nhất, thuận tiện khi di chuyển. Bấm \`Ctrl + Shift + G\` để rã nhóm.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để chỉnh sửa riêng một đối tượng đã được group mà không cần rã nhóm ạ?",
      "Tại sao viền hình vẽ của em bị biến dạng móp méo khi em co dãn kích thước hình vậy Cô?",
      "Làm sao để bo tròn các góc nhọn của hình chữ nhật trong Inkscape hả Cô?"
    ]
  },
  {
    id: "lop10-bai-14",
    grade: "10",
    topic: "Chủ đề 4. ỨNG DỤNG TIN HỌC",
    title: "Bài 14. Làm việc với đối tượng đường và văn bản",
    description: "Làm chủ công cụ Bezier tạo các đường cong mềm mại và nghệ thuật đặt chữ uốn lượn theo đường dẫn.",
    content: `### 1. Công cụ Bezier vẽ đường dẫn tự do (\`Shift + F6\`)
- Giúp vẽ các đường thẳng nối tiếp hoặc các đường cong Bezier tinh xảo thông qua các **Điểm neo (Nodes)**.
- Khi vẽ đường cong, giữ chuột trái và kéo nhẹ để tạo các thanh điều hướng uốn nắn độ cong của nét vẽ.
- Chỉnh sửa điểm neo chuyên nghiệp bằng công cụ **Edit paths by nodes** (\`F2\`).

### 2. Làm việc với văn bản (Text Tool - \`F8\`)
- Bấm biểu tượng chữ \`A\` để nhập văn bản tự do, tùy chỉnh font chữ, cỡ chữ, khoảng cách ký tự.
- **Đưa văn bản uốn lượn theo đường dẫn (Put on Path):**
  1. Vẽ một đường dẫn cong bằng công cụ Bezier.
  2. Tạo một đoạn chữ văn bản.
  3. Chọn cả chữ và đường dẫn bằng phím \`Shift\`.
  4. Chọn menu **Text -> Put on Path**. Chữ sẽ uốn lượn hoàn hảo theo dáng đường cong.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để biến một đoạn chữ thành một đối tượng đường vẽ thông thường trong Inkscape ạ?",
      "Tại sao khi em xóa đường dẫn Bezier thì đoạn chữ uốn lượn lại quay về dạng nằm ngang ban đầu ạ Cô?",
      "Mẹo tạo hiệu ứng chữ lồng vào hình hoặc uốn thành hình tròn thế nào vậy Cô?"
    ]
  },
  {
    id: "lop10-bai-15",
    grade: "10",
    topic: "Chủ đề 4. ỨNG DỤNG TIN HỌC",
    title: "Bài 15. Hoàn thiện hình ảnh đồ hoạ",
    description: "Sử dụng tô màu chuyển sắc phức tạp, quản lý lớp (layers) và cách xuất bản tệp SVG sang ảnh chụp PNG.",
    content: `### 1. Kỹ thuật tô màu chuyển sắc (Gradient Tool - \`Ctrl + F1\`)
- Cho phép tô màu đối tượng mượt mà chuyển dần giữa 2 hay nhiều màu sắc khác nhau theo hướng mong muốn (tuyến tính Linear hoặc tỏa tròn Radial).
- Thích hợp tạo hiệu ứng bóng đổ, ánh sáng phản chiếu kim loại hoặc mặt gương chân thực.

### 2. Quản lý các lớp (Layers)
- Giúp phân chia bản thiết kế phức tạp thành các tầng lớp riêng biệt (\`Ctrl + Shift + L\`).
- Có thể khóa một lớp để tránh lỡ tay sửa đổi trong lúc thiết kế lớp khác.

### 3. Lưu trữ và Xuất bản sản phẩm
- **Định dạng thiết kế gốc:** Lưu file dạng \`.svg\` để giữ nguyên các thuộc tính vectơ chỉnh sửa sau này.
- **Xuất bản chia sẻ:** Chọn menu **File -> Export PNG Image** (\`Ctrl + Shift + E\`) để xuất ra ảnh bitmap nền trong suốt chất lượng cao chia sẻ lên mạng xã hội.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để đổi hướng của dải màu Gradient từ trái sang phải thành từ trên xuống dưới ạ?",
      "Sự khác biệt giữa việc Lưu file (Save) và Xuất file (Export) trong Inkscape là gì vậy Cô?",
      "Lớp (Layer) giúp ích gì khi chúng ta vẽ một bức tranh phong cảnh phức tạp hả Cô?"
    ]
  },
  {
    id: "lop10-bai-16",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 16. Ngôn ngữ lập trình bậc cao và Python",
    description: "Những bước chân đầu tiên làm quen với lập trình Python, viết câu lệnh hiển thị đầu tiên trên màn hình console.",
    content: `### 1. Ngôn ngữ lập trình bậc cao là gì?
- Là ngôn ngữ có cú pháp gần gũi với ngôn ngữ tự nhiên của con người (chủ yếu là tiếng Anh), giúp việc viết code trở nên trực quan, dễ học và dễ bảo trì.
- **Chương trình dịch (Compiler/Interpreter):** Làm nhiệm vụ biên dịch hoặc thông dịch mã nguồn bậc cao sang ngôn ngữ máy (\`0\` và \`1\`) để máy tính thực thi.

### 2. Giới thiệu ngôn ngữ Python
- Ra mắt năm 1991 bởi Guido van Rossum.
- Là ngôn ngữ thông dịch, mã nguồn mở, đa nền tảng, có cú pháp cực kỳ sáng sủa, ngắn gọn.
- Được ứng dụng rộng rãi trong lập trình Web, Khoa học dữ liệu và Trí tuệ nhân tạo (AI).
- Lệnh in thông tin ra màn hình cơ bản nhất: \`print("Nội dung cần in")\`.`,
    sampleCode: `# Viết chương trình đầu tiên trong cuộc đời
print("Chào mừng học trò cưng của Cô Thuý Hào!")
print("Học lập trình Python cực kỳ vui và bổ ích nhé.")`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, tại sao Python lại được bình chọn là ngôn ngữ dễ học nhất dành cho học sinh ạ?",
      "Sự khác nhau giữa trình thông dịch (Interpreter) và trình biên dịch (Compiler) là gì thế Cô?",
      "Làm thế nào để chạy chương trình Python trên máy tính cá nhân của em ạ?"
    ]
  },
  {
    id: "lop10-bai-17",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 17. Biến và lệnh gán",
    description: "Nắm vững cách lưu trữ dữ liệu vào các biến nhớ và thao tác gán giá trị linh hoạt bằng toán tử bằng.",
    content: `### 1. Biến (Variable) trong lập trình
- Là tên gọi đại diện cho một vùng nhớ dùng để lưu giữ các giá trị dữ liệu tạm thời trong lúc chạy chương trình.
- **Quy tắc đặt tên biến trong Python:**
  - Chỉ được chứa chữ cái, chữ số và dấu gạch dưới \`_\`.
  - Không được bắt đầu bằng chữ số.
  - Phân biệt chữ hoa và chữ thường (ví dụ \`a\` và \`A\` là hai biến độc lập).
  - Không trùng các từ khóa hệ thống (\`if\`, \`else\`, \`while\`, ...).

### 2. Lệnh gán (Assignment statement)
- Sử dụng toán tử bằng \`=\` để đưa giá trị vào trong biến.
- **Cú pháp:** \`tên_biến = giá_trị_hoặc_biểu_thức\`
  - *Ví dụ:* \`chieu_dai = 15\`, \`chieu_rong = 5\`, \`dien_tich = chieu_dai * chieu_rong\`.`,
    sampleCode: `# Khai báo biến và tính toán chu vi hình chữ nhật
a = 10
b = 5
chu_vi = (a + b) * 2

print("Chiều dài:", a)
print("Chiều rộng:", b)
print("Chu vi hình chữ nhật là:", chu_vi)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, tại sao lệnh gán lại dùng dấu '=' nhưng trong toán học dấu này lại là so sánh bằng ạ?",
      "Cách gán nhiều giá trị cho nhiều biến trên cùng một dòng lệnh thế nào vậy Cô?",
      "Biến trong Python tự động nhận diện kiểu dữ liệu mà không cần khai báo trước phải không Cô?"
    ]
  },
  {
    id: "lop10-bai-18",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 18. Các lệnh vào ra đơn giản",
    description: "Nhập dữ liệu sống động từ bàn phím bằng hàm input và lưu ý kỹ thuật ép kiểu dữ liệu.",
    content: `### 1. Lệnh nhập dữ liệu từ bàn phím (\`input()\`)
- Hàm \`input()\` giúp chương trình tạm dừng để chờ người dùng gõ nội dung từ bàn phím rồi nhấn Enter.
- **LƯU Ý CỰC KỲ QUAN TRỌNG:** Dữ liệu nhận về từ hàm \`input()\` luôn luôn mang kiểu **chuỗi ký tự (string)**.
- Muốn tính toán số học, bắt buộc phải dùng các hàm ép kiểu bao bọc bên ngoài:
  - Ép kiểu số nguyên: \`tuoi = int(input("Nhập tuổi: "))\`
  - Ép kiểu số thực: \`diem = float(input("Nhập điểm: "))\`

### 2. Lệnh xuất dữ liệu ra màn hình (\`print()\`)
- In nhiều giá trị phân cách bởi dấu phẩy \`,\`.
- Có thể tùy biến ký tự kết thúc bằng tham số \`end\` (mặc định là xuống dòng) hoặc ký tự phân cách bằng tham số \`sep\`.`,
    sampleCode: `# Nhập năm sinh và tính tuổi
nam_sinh_str = input("Em hãy nhập năm sinh của mình nhé: ")
nam_sinh = int(nam_sinh_str) # Ép kiểu sang số nguyên

nam_hien_tai = 2026
tuoi = nam_hien_tai - nam_sinh

print("Chào em! Năm nay em", tuoi, "tuổi nhé.")`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, tại sao nếu em không ép kiểu int() mà lấy chuỗi nhân với 2 thì Python không báo lỗi mà lại ra kết quả lạ ạ?",
      "Làm thế nào để in dữ liệu định dạng đẹp mắt f-string trong Python thế Cô?",
      "Tham số 'end' và 'sep' trong hàm print() hoạt động cụ thể ra sao hả Cô?"
    ]
  },
  {
    id: "lop10-bai-19",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 19. Câu lệnh rẽ nhánh if",
    description: "Điều khiển luồng chương trình rẽ hướng thông minh dựa trên điều kiện đúng/sai với cấu trúc if - elif - else.",
    content: `### 1. Cấu trúc rẽ nhánh là gì?
- Giúp máy tính đưa ra quyết định thực thi các đoạn code khác nhau dựa trên kết quả kiểm tra điều kiện (Đúng hoặc Sai).

### 2. Các dạng cú pháp rẽ nhánh trong Python
- **Dạng khuyết:**
\`\`\`python
if điều_kiện:
    # thực hiện nếu điều kiện ĐÚNG
\`\`\`
- **Dạng đầy đủ:**
\`\`\`python
if điều_kiện:
    # thực hiện nếu điều kiện ĐÚNG
else:
    # thực hiện nếu điều kiện SAI
\`\`\`
- **Dạng nhiều nhánh:**
\`\`\`python
if điều_kiện_1:
    # lệnh 1
elif điều_kiện_2:
    # lệnh 2
else:
    # lệnh khi tất cả đều sai
\`\`\`

### 3. Quy tắc thụt lề (Indentation) bắt buộc
- Khối lệnh bên trong \`if\`, \`elif\`, \`else\` bắt buộc phải được thụt lề thụt vào trong (thường gõ 1 phím Tab hoặc 4 khoảng trắng). Nếu thụt lề không đồng đều, chương trình sẽ báo lỗi \`IndentationError\` và dừng chạy ngay lập tức.`,
    sampleCode: `# Kiểm tra xếp loại học sinh theo điểm trung bình
diem_tb = 8.5

if diem_tb >= 8.0:
    print("Học lực: Giỏi! Đỉnh chóp luôn em ơi! 🎉")
elif diem_tb >= 6.5:
    print("Học lực: Khá! Cố gắng chút nữa là đạt Giỏi nha.")
else:
    print("Học lực: Cần cố gắng nhiều hơn nữa nè học trò ơi!")`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, lỗi thụt lề 'IndentationError: unexpected indent' sửa thế nào nhanh nhất ạ?",
      "Sự khác biệt bản chất giữa cấu trúc nhiều lệnh if rời nhau và cấu trúc if-elif-else là gì thế Cô?",
      "Làm sao để lồng các câu lệnh if vào bên trong nhau cho đúng cú pháp hả Cô?"
    ]
  },
  {
    id: "lop10-bai-20",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 20. Câu lệnh lặp for",
    description: "Giải quyết các bài toán lặp đi lặp lại với số lần biết trước cực kỳ tối ưu thông qua vòng lặp for và hàm range.",
    content: `### 1. Khái niệm vòng lặp for
- Sử dụng khi chúng ta biết trước chính xác số lần cần thực hiện lặp lại một công việc nào đó.

### 2. Cú pháp vòng lặp for kết hợp hàm \`range()\`
\`\`\`python
for i in range(n):
    # Khối lệnh được lặp lại n lần (i chạy lần lượt từ 0 đến n-1)
\`\`\`

### 3. Tìm hiểu hoạt động của hàm \`range()\`
- \`range(5)\`: Tạo dãy số \`0, 1, 2, 3, 4\` (lặp 5 lần).
- \`range(2, 7)\`: Tạo dãy số chạy từ \`2\` đến \`6\` (dừng ngay trước 7).
- \`range(1, 10, 2)\`: Tạo dãy số lẻ bắt đầu từ \`1\`, bước nhảy tăng \`2\` đơn vị mỗi lần: \`1, 3, 5, 7, 9\`.`,
    sampleCode: `# Tính tổng các số lẻ từ 1 đến 9
tong = 0
for i in range(1, 10, 2):
    tong = tong + i
    print("Cộng thêm", i, "-> Tổng hiện tại là:", tong)

print("Kết quả tổng cuối cùng là:", tong)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, biến chạy i trong vòng lặp 'for i in range()' có bắt buộc phải khai báo trước không ạ?",
      "Hàm range() có hỗ trợ tạo dãy số giảm dần lùi về phía sau không hả Cô?",
      "Vòng lặp for có thể lặp qua các phần tử của một chuỗi ký tự được không thế Cô?"
    ]
  },
  {
    id: "lop10-bai-21",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 21. Câu lệnh lặp while",
    description: "Vòng lặp với số lần chưa biết trước, lặp liên tục khi điều kiện còn Đúng và nghệ thuật tránh lặp vô hạn.",
    content: `### 1. Cú pháp vòng lặp \`while\`
- Sử dụng khi số lần lặp chưa biết trước, hành động lặp phụ thuộc vào điều kiện.
\`\`\`python
while điều_kiện_lặp:
    # Khối lệnh lặp
\`\`\`
- Chừng nào \`điều_kiện_lặp\` còn nhận giá trị **True**, khối lệnh bên dưới sẽ tiếp tục được thực hiện.

### 2. Cảnh báo lỗi Lặp vô hạn (Infinite Loop)
- Nếu điều kiện lặp luôn luôn Đúng (không bao giờ chuyển sang Sai), chương trình sẽ chạy lặp mãi mãi không dừng, gây đơ máy, treo ứng dụng.
- **Biện pháp khắc phục:** Bên trong khối lệnh lặp, bắt buộc phải có ít nhất một câu lệnh làm thay đổi giá trị của biến điều kiện hướng tới trạng thái kết thúc (ví dụ tăng biến đếm, thay đổi cờ trạng thái).`,
    sampleCode: `# In ra dãy số từ 1 đến 5 bằng vòng lặp while
i = 1
while i <= 5:
    print("Lần lặp thứ:", i)
    i = i + 1 # Tăng i lên 1 đơn vị để tránh lặp vô hạn!

print("Vòng lặp kết thúc thành công.")`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, làm thế nào để thoát khỏi vòng lặp ngay lập tức khi đang chạy lặp vô hạn ạ?",
      "Từ khóa 'break' và 'continue' hoạt động thế nào trong vòng lặp while hả Cô?",
      "Khi nào thì nên chọn dùng vòng lặp for và khi nào bắt buộc dùng while vậy Cô?"
    ]
  },
  {
    id: "lop10-bai-22",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 22. Kiểu dữ liệu danh sách",
    description: "Làm quen với kiểu dữ liệu List để lưu trữ tập hợp nhiều phần tử có thứ tự, thao tác truy xuất qua chỉ số index.",
    content: `### 1. Khái niệm kiểu dữ liệu Danh sách (List)
- Là kiểu dữ liệu trong Python cho phép lưu trữ một chuỗi gồm nhiều giá trị có thứ tự.
- Khai báo danh sách đặt trong cặp dấu ngoặc vuông \`[]\`, các phần tử phân cách nhau bởi dấu phẩy \`,\`.
- *Ví dụ:* \`danh_sach_lop = ["Nam", "An", "Bình", "Chi"]\`

### 2. Chỉ số phần tử (Index) trong danh sách
- Các phần tử được đánh chỉ số tăng dần từ trái qua phải, bắt đầu từ **chỉ số 0**.
- Có thể truy xuất giá trị phần tử qua cú pháp \`tên_list[index]\`.
  - *Ví dụ:* \`danh_sach_lop[0]\` trả về \`"Nam"\`.
  - *Ví dụ:* \`danh_sach_lop[2]\` trả về \`"Bình"\`.
- Python hỗ trợ chỉ số âm để duyệt từ cuối lên: \`tên_list[-1]\` là phần tử cuối cùng của danh sách.`,
    sampleCode: `# Khởi tạo và truy xuất danh sách
trai_cay = ["Táo", "Cam", "Xoài", "Ổi"]

print("Danh sách trái cây hiện tại:", trai_cay)
print("Phần tử đầu tiên (vị trí 0):", trai_cay[0])
print("Phần tử cuối cùng (vị trí -1):", trai_cay[-1])
print("Tổng số lượng trái cây trong rổ là:", len(trai_cay))`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, nếu truy xuất một chỉ số vượt quá số lượng phần tử của danh sách thì có sao không ạ?",
      "Một danh sách trong Python có thể chứa nhiều phần tử có kiểu dữ liệu khác nhau được không Cô?",
      "Chỉ số âm hoạt động thế nào trong việc duyệt danh sách lùi về trước hả Cô?"
    ]
  },
  {
    id: "lop10-bai-23",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 23. Một số lệnh làm việc với dữ liệu danh sách",
    description: "Thêm, xóa, chỉnh sửa danh sách năng động với các phương thức append, insert, remove, pop cực kỳ tiện lợi.",
    content: `### 1. Thêm phần tử vào danh sách
- \`append(x)\`: Thêm phần tử \`x\` vào cuối danh sách.
- \`insert(i, x)\`: Chèn phần tử \`x\` vào vị trí chỉ định \`i\`, đẩy các phần tử phía sau lùi lại.

### 2. Xóa phần tử khỏi danh sách
- \`remove(x)\`: Tìm và xóa phần tử đầu tiên trong danh sách có giá trị bằng \`x\`. Nếu không tìm thấy sẽ báo lỗi.
- \`pop(i)\`: Xóa và trả về phần tử tại vị trí chỉ số \`i\`. Nếu không truyền \`i\`, mặc định xóa phần tử cuối cùng.
- \`clear()\`: Xóa sạch sành sanh toàn bộ phần tử trong danh sách.

### 3. Kiểm tra sự tồn tại của phần tử
- Sử dụng toán tử \`in\` để kiểm tra một phần tử có nằm trong danh sách hay không (trả về kết quả lôgic True/False).
  - *Ví dụ:* \`"Táo" in trai_cay\` -> Trả về \`True\`.`,
    sampleCode: `# Thực hành thay đổi cấu trúc danh sách học sinh
hoc_sinh = ["Tuấn", "Lan"]
print("Ban đầu:", hoc_sinh)

# Thêm học sinh mới vào cuối danh sách
hoc_sinh.append("Hùng")
# Chèn học sinh mới vào vị trí đầu tiên
hoc_sinh.insert(0, "Vy")
print("Sau khi thêm:", hoc_sinh)

# Xóa học sinh Lan ra khỏi danh sách
hoc_sinh.remove("Lan")
print("Sau khi xóa Lan:", hoc_sinh)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, hàm remove() sẽ làm thế nào nếu trong danh sách có 2 phần tử trùng tên nhau ạ?",
      "Làm sao để sắp xếp các phần tử trong danh sách theo thứ tự bảng chữ cái alphabet hả Cô?",
      "Cách duyệt qua từng phần tử của danh sách bằng vòng lặp for thế nào ạ Cô?"
    ]
  },
  {
    id: "lop10-bai-24",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 24. Xâu kí tự",
    description: "Làm quen với kiểu dữ liệu xâu ký tự (String) biểu diễn thông tin văn bản, kỹ thuật ghép xâu và trích xuất ký tự.",
    content: `### 1. Khai báo xâu ký tự (String)
- Xâu ký tự biểu diễn chuỗi văn bản, được đặt trong cặp dấu nháy kép \`"\` hoặc nháy đơn \`'\`.
- *Ví dụ:* \`ten_truong = "THPT Chuyên Nguyễn Huệ"\`

### 2. Ghép xâu và Lặp xâu
- **Phép cộng \`+\`:** Ghép hai hay nhiều xâu ký tự lại thành một xâu duy nhất.
- **Phép nhân \`*\`:** Lặp xâu ký tự lên nhiều lần.
  - *Ví dụ:* \`"A" * 3\` cho kết quả \`"AAA"\`.

### 3. Đọc ký tự từ xâu qua chỉ số index
- Tương tự như Danh sách, xâu ký tự cũng được đánh chỉ số từ 0. Ký tự đầu tiên ở vị trí 0, ký tự cuối cùng ở vị trí -1.
- **LƯU Ý:** Xâu ký tự trong Python là đối tượng **bất biến (immutable)**. Nghĩa là bạn không thể trực tiếp gán đè ký tự mới vào một vị trí chỉ số (Ví dụ lệnh \`xau[0] = 'H'\` sẽ báo lỗi ngay lập tức).`,
    sampleCode: `# Thao tác ghép xâu và đọc ký tự
ho = "Nguyễn"
ten = "Nam"
ho_ten = ho + " " + ten # Ghép các xâu lại bằng dấu +
print("Họ và tên đầy đủ:", ho_ten)

# Đọc ký tự đầu tiên
ky_tu_dau = ho_ten[0]
print("Ký tự đầu tiên trong tên là:", ky_tu_dau)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, tại sao Python lại không cho phép sửa đổi trực tiếp ký tự trong xâu qua chỉ số ạ?",
      "Làm sao để lấy ra một phần của xâu (cắt xâu - string slicing) hả Cô?",
      "Cách viết xâu ký tự xuống dòng nhiều dòng thoải mái trong Python thế nào hả Cô?"
    ]
  },
  {
    id: "lop10-bai-25",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 25. Một số lệnh làm việc với xâu kí tự",
    description: "Thao tác tách xâu thành mảng với split, ghép mảng thành xâu với join và thay thế cụm từ thông minh.",
    content: `### 1. Phương thức tách xâu \`split()\`
- Tách một xâu lớn thành một danh sách (list) các xâu con dựa trên ký tự phân tách (mặc định là khoảng trắng).
  - *Ví dụ:* \`"Học Tin Học".split()\` trả về \`["Học", "Tin", "Học"]\`.

### 2. Phương thức ghép xâu \`join()\`
- Ghép các phần tử của một danh sách chuỗi thành một chuỗi lớn thống nhất, kết nối bằng ký tự nối chỉ định.
  - *Ví dụ:* \`"-".join(["A", "B", "C"])\` trả về \`"A-B-C"\`.

### 3. Các phương thức tìm kiếm và thay thế
- \`find(sub)\`: Tìm kiếm xâu con \`sub\` trong xâu lớn, trả về vị trí xuất hiện đầu tiên, hoặc trả về \`-1\` nếu không thấy.
- \`replace(old, new)\`: Thay thế tất cả cụm từ cũ \`old\` bằng cụm từ mới \`new\`.`,
    sampleCode: `# Thực hành chuẩn hóa họ tên học sinh bằng split và join
ten_sai = "nguyen  van  binh"
tu_tach = ten_sai.split() # Tách bỏ toàn bộ khoảng trắng thừa
print("Mảng từ tách được:", tu_tach)

# Thay thế từ ngữ
thong_diep = "Học Python rất khó"
tin_moi = thong_diep.replace("khó", "dễ và thú vị!")
print("Thông điệp truyền cảm hứng:", tin_moi)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, làm thế nào để chuyển đổi toàn bộ xâu sang chữ hoa (UPPER) hoặc chữ thường (lower) ạ?",
      "Làm sao để tìm kiếm và đếm số lần xuất hiện của một từ trong xâu ký tự hả Cô?",
      "Cách loại bỏ khoảng trắng thừa ở hai đầu xâu ký tự (hàm strip) thế nào hả Cô?"
    ]
  },
  {
    id: "lop10-bai-26",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 26. Hàm trong Python",
    description: "Khởi tạo hàm con tự định nghĩa bằng từ khóa def để tổ chức mã nguồn khoa học, gọn gàng và tái sử dụng.",
    content: `### 1. Khái niệm Hàm (Function) trong lập trình
- Hàm là một khối lệnh độc lập được đặt tên cụ thể, dùng để thực hiện một công việc trọn vẹn nào đó.
- **Lợi ích:** Tránh việc phải viết lặp đi lặp lại cùng một đoạn code nhiều lần, giúp chương trình có cấu trúc rõ ràng, dễ bảo trì nâng cấp.

### 2. Định nghĩa và gọi hàm trong Python
- Sử dụng từ khóa \`def\` để khai báo một hàm mới.
- **Cú pháp:**
\`\`\`python
def tên_hàm():
    # Khối lệnh bên trong hàm (phải thụt lề)
\`\`\`
- Muốn thực thi khối lệnh của hàm, ta chỉ cần gọi tên hàm kèm theo cặp dấu ngoặc đơn \`tên_hàm()\`.`,
    sampleCode: `# Định nghĩa một hàm in lời chào ân ần
def chao_hoc_sinh():
    print("✨ Chào mừng em đã đến với lớp học của Cô Thuý Hào! ✨")
    print("Chúc em một ngày học tập ngập tràn niềm vui và kiến thức bổ ích nhé.")

# Gọi hàm để chạy thử lệnh bên trong
chao_hoc_sinh()
chao_hoc_sinh() # Có thể gọi lại bao nhiêu lần tùy thích!`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, một hàm không có tham số và không có giá trị trả về thì hoạt động thế nào ạ?",
      "Tại sao chúng ta phải định nghĩa hàm ở phía trên trước khi gọi hàm ở phía dưới ạ Cô?",
      "Làm thế nào để tổ chức một chương trình lớn thành nhiều hàm nhỏ khác nhau hả Cô?"
    ]
  },
  {
    id: "lop10-bai-27",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 27. Tham số của hàm",
    description: "Truyền dữ liệu linh hoạt vào hàm qua các tham số đầu vào và trả về giá trị tính toán bằng từ khóa return.",
    content: `### 1. Tham số và Đối số của hàm
- **Tham số (Parameter):** Các biến đại diện được khai báo bên trong cặp dấu ngoặc đơn \`()\` của định nghĩa hàm để nhận dữ liệu đầu vào.
- **Đối số (Argument):** Giá trị thực tế được truyền vào hàm khi ta thực hiện cuộc gọi hàm.
  - *Ví dụ:* Định nghĩa \`def tinh(x, y):\` có hai tham số \`x\`, \`y\`. Gọi hàm \`tinh(10, 5)\` thì \`10\` và \`5\` là hai đối số.

### 2. Hàm có kết quả trả về (\`return\`)
- Từ khóa \`return\` dùng để kết thúc hàm lập tức và gửi giá trị kết quả tính toán của hàm ra ngoài cho nơi gọi sử dụng tiếp.
- Mọi câu lệnh viết phía dưới từ khóa \`return\` trong cùng một khối hàm đều bị bỏ qua (không bao giờ được thực thi).`,
    sampleCode: `# Hàm tính diện tích hình chữ nhật có kết quả trả về
def tinh_dien_tich(dai, rong):
    S = dai * rong
    return S # Trả về kết quả diện tích

# Gọi hàm và hứng lấy giá trị trả về để sử dụng tiếp
ket_qua = tinh_dien_tich(8, 5)
print("Diện tích nhận được là:", ket_qua)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, sự khác nhau giữa việc dùng print() trong hàm và dùng return trong hàm là gì ạ?",
      "Một hàm Python có thể trả về cùng lúc nhiều giá trị khác nhau được không thế Cô?",
      "Làm thế nào để đặt giá trị mặc định cho tham số (default parameter) của hàm hả Cô?"
    ]
  },
  {
    id: "lop10-bai-28",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 28. Phạm vi của biến",
    description: "Phân biệt rạch ròi biến toàn cục và biến cục bộ, kỹ thuật thay đổi biến toàn cục bằng từ khóa global.",
    content: `### 1. Biến cục bộ (Local Variable)
- Là biến được khai báo và khởi tạo **bên trong một hàm**.
- **Phạm vi tác dụng:** Chỉ có giá trị sử dụng và tồn tại bên trong hàm đó. Bên ngoài hàm không thể đọc hay thay đổi giá trị biến này.

### 2. Biến toàn cục (Global Variable)
- Là biến được khai báo **bên ngoài tất cả các hàm**.
- **Phạm vi tác dụng:** Có thể truy cập và sử dụng từ bất kỳ nơi nào trong chương trình (kể cả bên trong các hàm).
- **LƯU Ý:** Nếu muốn thay đổi (gán giá trị mới) cho biến toàn cục ngay bên trong một hàm, bắt buộc phải khai báo từ khóa \`global tên_biến\` ở dòng đầu tiên của hàm đó.`,
    sampleCode: `# Minh họa biến cục bộ và biến toàn cục
diem_lop = 10 # Biến toàn cục

def thi_cu():
    global diem_lop # Khai báo để sửa đổi biến toàn cục
    diem_lop = 9
    diem_cong = 1 # Biến cục bộ (chỉ dùng trong hàm)
    print("Điểm thi học sinh:", diem_lop + diem_cong)

thi_cu()
print("Điểm lớp sau khi thi:", diem_lop)
# Lệnh dưới đây nếu mở ra sẽ bị báo lỗi vì biến cục bộ không tồn tại ở đây!
# print(diem_cong)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, tại sao việc lạm dụng quá nhiều biến toàn cục lại bị coi là thói quen lập trình xấu ạ?",
      "If em đặt tên biến cục bộ trùng khớp hoàn toàn với tên biến toàn cục thì điều gì xảy ra ạ Cô?",
      "Từ khóa 'global' bắt buộc phải viết ở vị trí nào trong hàm để không bị lỗi cú pháp hả Cô?"
    ]
  },
  {
    id: "lop10-bai-29",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 29. Nhận biết lỗi chương trình",
    description: "Phân loại 3 loại lỗi kinh điển: Lỗi cú pháp, Lỗi thực thi và Lỗi logic để bình tĩnh xử lý khi gõ code.",
    content: `### 1. Lỗi cú pháp (Syntax Error)
- Do gõ sai quy tắc chính tả, cấu trúc câu lệnh của ngôn ngữ lập trình Python.
- Chương trình bị trình thông dịch chặn đứng ngay khi phân tích và không thể khởi chạy được.
- *Ví dụ:* Thiếu dấu hai chấm \`:\` sau lệnh \`if\`, thụt lề sai dòng, viết sai chính tả từ khóa \`prnt()\` thay vì \`print()\`.

### 2. Lỗi thực thi (Runtime Error / Exception)
- Chương trình không sai cú pháp nên vẫn khởi chạy được, nhưng bị sập (crash) đột ngột giữa chừng khi đang chạy do gặp thao tác bất hợp pháp.
- *Ví dụ:* Thực hiện phép toán chia cho số 0, gọi tới một biến chưa từng được khai báo trước đó, truy xuất phần tử vượt quá kích thước mảng.

### 3. Lỗi lôgic (Semantic Error)
- Cực kỳ nguy hiểm! Chương trình không sai cú pháp, chạy trơn tru mượt mà từ đầu đến cuối nhưng **ra kết quả sai hoàn toàn** so với yêu cầu đề bài.
- *Ví dụ:* Đề bài yêu cầu tính chu vi hình chữ nhật \`(a+b)*2\` nhưng lập trình viên lỡ tay gõ công thức thành \`a + b * 2\`.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để đọc hiểu nhanh các dòng thông báo lỗi bằng tiếng Anh của Python ạ?",
      "Lỗi logic thường được phát hiện bằng cách nào khi chương trình không hề báo đỏ sập ứng dụng hả Cô?",
      "Cách xử lý khi chương trình báo lỗi ZeroDivisionError hay NameError thế nào hả Cô?"
    ]
  },
  {
    id: "lop10-bai-30",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 30. Kiểm thử và gỡ lỗi chương trình",
    description: "Học các phương pháp kiểm thử hộp đen, cách thủ công in chèn biến debug để tìm diệt tận gốc các lỗi logic.",
    content: `### 1. Kiểm thử chương trình (Testing)
- Là hoạt động chạy thử chương trình với nhiều bộ dữ liệu đầu vào khác nhau (gọi là các **Test Cases**) nhằm phát hiện lỗi tiềm ẩn.
- Các nhóm Test Cases cần chuẩn bị:
  - Dữ liệu thông thường (bình thường).
  - Dữ liệu ở các vùng biên giới hạn (ví dụ giá trị bằng 0, giá trị cực đại, cực tiểu).
  - Dữ liệu đầu vào sai định dạng để kiểm tra tính bền bỉ của chương trình.

### 2. Gỡ lỗi chương trình (Debugging)
- Là quá trình xác định vị trí nguyên nhân gây lỗi lôgic và tiến hành sửa chữa mã nguồn để chương trình chạy đúng đắn.
- **Phương pháp gỡ lỗi đơn giản và hữu hiệu nhất:** Chèn thêm các câu lệnh \`print()\` tạm thời tại các dòng nghi ngờ để hiển thị giá trị các biến trung gian ra màn hình, xem biến bị thay đổi sai lệch từ dòng lệnh nào.`,
    sampleCode: `# Ví dụ gỡ lỗi bằng cách chèn print kiểm tra biến trung gian
def tinh_tong_le(n):
    tong = 0
    for i in range(1, n + 1):
        if i % 2 != 0:
            tong = tong + i
            # Dòng print debug tạm thời để theo dõi thuật toán
            print(f"DEBUG: i = {i}, tong hien tai = {tong}")
    return tong

tinh_tong_le(5)`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, sự khác biệt bản chất giữa Tester (người kiểm thử) và Developer (người gỡ lỗi) là gì ạ?",
      "Làm sao để tắt nhanh các dòng lệnh in DEBUG sau khi đã sửa xong lỗi lôgic hả Cô?",
      "Công cụ Debugger tích hợp sẵn trong các IDE như VS Code hay PyCharm giúp ích gì vậy Cô?"
    ]
  },
  {
    id: "lop10-bai-31",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 31. Thực hành viết chương trình đơn giản",
    description: "Trải nghiệm quy trình 4 bước lập trình tiêu chuẩn để tự tay xây dựng một phần mềm hoàn chỉnh, chạy ổn định.",
    content: `### 1. Quy trình phát triển phần mềm 4 bước cơ bản
Khi đối mặt với bất kỳ bài toán lập trình nào, em hãy bình tĩnh thực hiện theo đúng 4 bước sau để viết code thông thái nhất:
1. **Xác định bài toán:** Xác định rõ ràng dữ liệu đầu vào (**Input**) là gì, kết quả đầu ra mong đợi (**Output**) là gì, kiểu dữ liệu nào phù hợp.
2. **Thiết kế thuật toán:** Phân tích các bước giải bài toán một cách tuần tự rõ ràng (có thể dùng sơ đồ khối hoặc viết mã giả bằng tiếng Việt).
3. **Viết mã nguồn (Coding):** Chuyển đổi thuật toán đã thiết kế thành các dòng lệnh Python chuẩn cú pháp.
4. **Kiểm thử và Gỡ lỗi:** Chạy thử chương trình với các bộ dữ liệu khác nhau để tìm và triệt tiêu toàn bộ lỗi cú pháp, lỗi thực thi hay lỗi logic nếu có.`,
    sampleCode: `# Ví dụ: Chương trình kiểm tra số nguyên tố đơn giản
import math

def kiem_tra_snt(n):
    if n < 2:
        return False
    # Duyệt kiểm tra ước số từ 2 đến căn bậc hai của n
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

so_nhap = 17
if kiem_tra_snt(so_nhap):
    print(f"Số {so_nhap} là số nguyên tố tuyệt vời!")
else:
    print(f"Số {so_nhap} không phải là số nguyên tố.")`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, tại sao việc thiết kế thuật toán trước khi gõ code lại giúp tiết kiệm thời gian hơn rất nhiều ạ?",
      "Làm thế nào để tối ưu hóa thuật toán kiểm tra số nguyên tố chạy siêu tốc hả Cô?",
      "Quy trình 4 bước này có thể áp dụng cho các ngôn ngữ lập trình khác không Cô?"
    ]
  },
  {
    id: "lop10-bai-32",
    grade: "10",
    topic: "Chủ đề 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 32. Ôn tập lập trình Python",
    description: "Hệ thống hóa toàn bộ kiến thức lập trình Python lớp 10, tự tin sẵn sàng cho các kỳ thi học kỳ.",
    content: `### 1. Tổng ôn tập các chủ đề cốt lõi đã học
- **Cơ bản:** Khai báo biến, toán tử số học, toán tử logic, các kiểu dữ liệu \`int\`, \`float\`, \`str\`, \`bool\`.
- **Luồng điều khiển:** Cấu trúc rẽ nhánh rẽ hướng thông minh (\`if-elif-else\`), vòng lặp lặp lại tối ưu (\`for\` bám sát range, \`while\` kiểm soát điều kiện).
- **Cấu trúc dữ liệu:** Danh sách (\`List\`) lưu trữ chuỗi phần tử có thứ tự và Xâu ký tự (\`String\`) xử lý văn bản năng động.
- **Hàm:** Định nghĩa hàm (\`def\`), truyền tham số đầu vào và nhận giá trị trả về (\`return\`), kiểm soát phạm vi hoạt động của biến.
- **Chất lượng code:** Nhận diện và gỡ bỏ 3 loại lỗi chương trình (\`Syntax\`, \`Runtime\`, \`Logic\`), thiết kế các bộ test case kiểm thử.`,
    sampleCode: `# Bài tập tổng hợp: Tính điểm trung bình môn học và đưa ra xếp loại
def tinh_trung_binh(ds_diem):
    if len(ds_diem) == 0:
        return 0
    tong = sum(ds_diem)
    return round(tong / len(ds_diem), 2)

diem_so = [8.5, 9.0, 7.5, 10.0]
dtb = tinh_trung_binh(diem_so)

print("Điểm trung bình học phần:", dtb)
if dtb >= 8.0:
    print("Xếp loại cuối khóa: Đạt loại Xuất Sắc! Chúc mừng học trò cưng của Cô!")`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, em nên bắt đầu luyện tập giải các bài toán Python ở những trang web tự học nào uy tín ạ?",
      "Mẹo làm bài thi lập trình đạt điểm tuyệt đối không lỡ dính lỗi vặt thế nào vậy Cô?",
      "Làm sao để củng cố tư duy thuật toán tốt hơn sau khi kết thúc chương trình lớp 10 hả Cô?"
    ]
  },
  {
    id: "lop10-bai-33",
    grade: "10",
    topic: "Chủ đề 6. HƯỚNG NGHIỆP VỚI TIN HỌC",
    title: "Bài 33. Nghề thiết kế đồ hoạ máy tính",
    description: "Định hướng nghề nghiệp tương lai, khám phá cơ hội việc làm phong phú và yêu cầu kỹ năng của Graphic Designer.",
    content: `### 1. Nghề thiết kế đồ họa máy tính là gì?
- Là nghề sử dụng các phần mềm chuyên dụng (như Inkscape, Photoshop, Illustrator) để tạo ra các tác phẩm truyền thông thị giác ấn tượng (logo thương hiệu, banner quảng cáo, giao diện ứng dụng di động, tranh minh họa kỹ thuật số).

### 2. Cơ hội việc làm trong thời đại số
- Thiết kế tại các công ty quảng cáo truyền thông, tòa soạn báo chí, hãng phát triển game đồ họa.
- Làm việc tự do (Freelancer) nhận các dự án thiết kế toàn cầu qua internet.

### 3. Yêu cầu năng lực cốt lõi
- **Thẩm mỹ và sáng tạo:** Có tư duy tốt về bố cục, phối màu hài hòa, kiểu chữ phong cách.
- **Kỹ thuật:** Sử dụng thành thạo ít nhất một phần mềm đồ họa vectơ và một phần mềm bitmap.
- **Kỹ năng mềm:** Làm việc nhóm, giao tiếp thuyết phục và khả năng tự cập nhật xu hướng thiết kế mới.`,
    suggestedQuestions: [
      "Cô ơi, em không biết vẽ tay thì có thể theo học nghề thiết kế đồ họa được không ạ?",
      "Cần chuẩn bị cấu hình máy tính như thế nào để phục vụ tốt cho việc học đồ họa hả Cô?",
      "Làm sao để rèn luyện tư duy thẩm mỹ màu sắc tốt hơn mỗi ngày thế Cô?"
    ]
  },
  {
    id: "lop10-bai-34",
    grade: "10",
    topic: "Chủ đề 6. HƯỚNG NGHIỆP VỚI TIN HỌC",
    title: "Bài 34. Nghề phát triển phần mềm",
    description: "Hành trình trở thành Lập trình viên chuyên nghiệp, tìm hiểu thế giới Front-End, Back-End và Full-Stack đầy cơ hội.",
    content: `### 1. Vai trò của nghề phát triển phần mềm
- Thiết kế, xây dựng và bảo trì các hệ điều hành, phần mềm ứng dụng di động, trang web và game phục vụ hàng triệu người tiêu dùng, tối ưu hóa cuộc sống.

### 2. Các vị trí việc làm chính trong dự án phần mềm
- **Lập trình viên Front-End:** Thiết kế và xây dựng giao diện trực quan hiển thị trên màn hình người dùng tương tác.
- **Lập trình viên Back-End:** Xử lý logic nghiệp vụ, quản lý cơ sở dữ liệu và bảo mật máy chủ chạy ẩn phía sau.
- **Kiểm thử phần mềm (Tester/QA):** Chạy thử phần mềm tìm lỗi, đảm bảo chất lượng trước khi phát hành.
- **Quản trị dự án (Project Manager):** Điều phối tiến độ và phân chia công việc cho các thành viên.

### 3. Yêu cầu năng lực đặc thù
- Tư duy logic, giải quyết vấn đề sắc sảo.
- Khả năng tự học ngôn ngữ mới, chịu được áp lực cao và phối hợp làm việc nhóm ăn ý.`,
    suggestedQuestions: [
      "Cô ơi, nên chọn học lập trình Front-End hay Back-End trước khi mới bắt đầu ạ?",
      "Lập trình viên cần tự rèn luyện kỹ năng tự học như thế nào để không bị lạc hậu hả Cô?",
      "Cơ hội thu nhập và làm việc ở nước ngoài của nghề phát triển phần mềm thế nào hả Cô?"
    ]
  },

  // GRADE 11 - DETAILED CURRICULUM GROUPED BY 7 TOPICS (BÁM SÁT MỤC LỤC SGK)
  // 主题1
  {
    id: "lop11-bai-1",
    grade: "11",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 1. Hệ điều hành",
    description: "Tìm hiểu lịch sử phát triển, vai trò cốt lõi và các chức năng của Hệ điều hành trong máy tính.",
    content: `### 1. Hệ điều hành là gì?
**Hệ điều hành (Operating System - OS)** là một tập hợp các chương trình được tổ chức thành một hệ thống thống nhất, nhằm đảm bảo quản lý và phân phối tài nguyên phần cứng, đồng thời cung cấp môi trường chạy cho các phần mềm ứng dụng.

### 2. Các chức năng chính của hệ điều hành
- **Quản lý thiết bị:** Đảm nhận việc điều khiển, giám sát và phân phối tài nguyên như CPU, RAM, ổ đĩa cứng, và các thiết bị ngoại vi (chuột, bàn phím, máy in, màn hình).
- **Quản lý và lưu trữ tệp tin:** Tổ chức dữ liệu thành hệ thống các thư mục và tệp, hỗ trợ tìm kiếm, chia sẻ và bảo mật thông tin.
- **Cung cấp giao diện tương tác:** Giúp người dùng dễ dàng giao tiếp với phần cứng máy tính.
- **Cung cấp môi trường chạy ứng dụng:** Nạp chương trình vào bộ nhớ và điều phối thực thi tiến trình.

### 3. Lịch sử phát triển
- **Giao diện dòng lệnh (CLI):** Người dùng nhập lệnh trực tiếp bằng văn bản (ví dụ: MS-DOS).
- **Giao diện đồ họa (GUI):** Người dùng tương tác qua cửa sổ, biểu tượng (icon) và chuột (như Windows, macOS).`,
    sampleCode: `# Ví dụ minh họa: Sử dụng thư viện OS của Python để tương tác với hệ điều hành
import os

# Lấy thư mục làm việc hiện tại
cwd = os.getcwd()
print("Thư mục làm việc hiện tại:", cwd)

# Liệt kê các tệp và thư mục trong thư mục hiện tại
print("Danh sách tệp:", os.listdir('.'))`,
    codeLanguage: "python",
    suggestedQuestions: [
      "Cô ơi, tại sao điện thoại Android và iPhone lại dùng hai hệ điều hành khác nhau ạ?",
      "Sự khác biệt lớn nhất giữa giao diện dòng lệnh CLI và giao diện đồ họa GUI là gì vậy Cô?",
      "Hệ điều hành đa nhiệm (Multitasking) hoạt động như thế nào hả Cô?"
    ]
  },
  {
    id: "lop11-bai-2",
    grade: "11",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 2. Thực hành sử dụng hệ điều hành",
    description: "Hướng dẫn thực hành các thao tác quản lý tệp tin, tùy biến môi trường làm việc trên Windows/Linux.",
    content: `### 1. Thao tác quản lý tệp và thư mục chuyên nghiệp
- **Sắp xếp khoa học:** Đặt tên thư mục rõ ràng, không chứa ký tự đặc biệt, phân chia theo mục đích sử dụng.
- **Phím tắt đắc lực:**
  - \`Ctrl + N\`: Tạo mới cửa sổ / tệp.
  - \`Alt + Tab\`: Chuyển đổi nhanh giữa các cửa sổ ứng dụng đang chạy.
  - \`Shift + Delete\`: Xóa vĩnh viễn tệp tin không qua Thùng rác (Recycle Bin).

### 2. Thiết lập môi trường và tùy biến hệ thống
- Truy cập **Control Panel** hoặc **Settings**:
  - Tùy chỉnh ngày, giờ và múi giờ quốc gia phù hợp (\`Asia/Ho_Chi_Minh\`).
  - Quản lý các thiết bị kết nối ngoại vi (máy in, loa bluetooth).
  - Gỡ bỏ phần mềm ứng dụng không dùng đến để giải phóng không gian ổ đĩa.`,
    suggestedQuestions: [
      "Cô ơi, làm sao để khôi phục một tệp tin đã lỡ tay xóa vĩnh viễn bằng Shift+Delete ạ?",
      "Cách dọn dẹp các tệp tin tạm (Temporary files) trên hệ điều hành Windows như thế nào thế Cô?",
      "Tại sao chúng ta nên phân chia ổ đĩa thành C và D vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-3",
    grade: "11",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 3. Phần mềm nguồn mở và phần mềm chạy trên Internet",
    description: "Tìm hiểu sự khác nhau giữa phần mềm mã nguồn đóng, phần mềm mã nguồn mở và xu hướng điện toán đám mây SaaS.",
    content: `### 1. Phân biệt Phần mềm Nguồn đóng và Nguồn mở
- **Phần mềm thương mại (Nguồn đóng - Proprietary Software):** Nhà phát triển giữ bản quyền mã nguồn. Người dùng phải trả phí mua bản quyền và không được chỉnh sửa mã nguồn (ví dụ: Windows, Microsoft Office, Photoshop).
- **Phần mềm mã nguồn mở (Open Source Software):** Cung cấp miễn phí mã nguồn công khai. Cho phép cộng đồng tự do sao chép, chỉnh sửa, nâng cấp và phân phối lại (ví dụ: Linux, LibreOffice, GIMP, WordPress).

### 2. Phần mềm chạy trên Internet (SaaS)
- **SaaS (Software as a Service):** Mô hình cung cấp phần mềm dưới dạng dịch vụ chạy trực tiếp trên trình duyệt Internet mà không cần cài đặt vào máy tính.
- **Ưu điểm:** Truy cập mọi lúc mọi nơi, tự động đồng bộ hóa dữ liệu lên đám mây, dễ dàng làm việc nhóm trực tuyến.
- **Ví dụ điển hình:** Google Docs, Google Sheets, Canva, Microsoft 365 trực tuyến.`,
    suggestedQuestions: [
      "Cô ơi, phần mềm mã nguồn mở miễn phí thì nhà phát triển kiếm tiền bằng cách nào ạ?",
      "Khi dùng Google Docs, nếu bị mất kết nối Internet đột ngột thì dữ liệu có bị mất không hả Cô?",
      "Hệ điều hành Android có phải là phần mềm mã nguồn mở không vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-4",
    grade: "11",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 4. Bên trong máy tính",
    description: "Khám phá cấu trúc phần cứng bên trong máy tính, bao gồm CPU, RAM, ROM, Mainboard và nguyên lý hoạt động.",
    content: `### 1. Các bộ phận cốt lõi của máy tính
- **CPU (Central Processing Unit):** Bộ vi xử lý trung tâm, được coi là \"não bộ\" của máy tính, thực hiện các phép toán logic và điều khiển hoạt động hệ thống.
- **Bộ nhớ trong (Internal Memory):**
  - **RAM (Random Access Memory):** Bộ nhớ truy cập ngẫu nhiên, lưu trữ dữ liệu tạm thời khi máy tính đang bật. Dữ liệu sẽ mất đi hoàn toàn khi tắt máy (Volatile).
  - **ROM (Read-Only Memory):** Bộ nhớ chỉ đọc, chứa các chương trình khởi động hệ thống cơ bản (BIOS). Dữ liệu không bị mất khi tắt nguồn (Non-volatile).
- **Bộ nhớ ngoài:** Ổ cứng HDD, SSD, USB, thẻ nhớ dùng để lưu trữ dữ liệu lâu dài.
- **Mainboard (Bo mạch chủ):** Đế cắm kết nối tất cả linh kiện lại với nhau.

### 2. Hoạt động xử lý thông tin
Thông tin được biểu diễn dưới dạng dãy nhị phân (0 và 1) và được xử lý theo chu kỳ lệnh bao gồm: **Nhận lệnh (Fetch) -> Giải mã (Decode) -> Thực thi (Execute)**.`,
    suggestedQuestions: [
      "Cô ơi, tại sao máy tính lắp ổ cứng SSD lại chạy nhanh hơn nhiều so với ổ HDD truyền thống ạ?",
      "Bộ nhớ RAM bao nhiêu GB là đủ cho nhu cầu học tập và lập trình cơ bản vậy Cô?",
      "Tốc độ GHz ghi trên CPU thể hiện điều gì hả Cô?"
    ]
  },
  {
    id: "lop11-bai-5",
    grade: "11",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 5. Kết nối máy tính với các thiết bị số",
    description: "Cách nhận diện các cổng kết nối vật lý và thiết lập kết nối máy tính với các thiết bị thông minh ngoại vi.",
    content: `### 1. Các cổng kết nối thông dụng trên máy tính
- **USB (Universal Serial Bus):** Cổng kết nối đa năng cho chuột, bàn phím, ổ cứng di động, thẻ nhớ. Có các thế hệ USB Type-A, Type-B, và hiện đại nhất là **USB Type-C**.
- **HDMI / DisplayPort / VGA:** Các cổng xuất tín hiệu hình ảnh và âm thanh ra màn hình phụ, máy chiếu hoặc tivi.
- **LAN (RJ45):** Cổng kết nối dây mạng Internet tốc độ cao và ổn định.
- **Jack 3.5mm:** Cổng cắm tai nghe, micro và loa âm thanh.

### 2. Thiết lập kết nối không dây và có dây
- **Kết nối có dây:** Cắm trực tiếp thiết bị số qua cáp kết nối. Máy tính sẽ tự động nhận diện thông qua driver điều khiển của hệ thống.
- **Kết nối không dây:** Sử dụng công nghệ **Bluetooth** hoặc **Wi-Fi Direct** để truyền tải tệp tin nhanh chóng giữa máy tính và điện thoại thông minh mà không cần dây cáp rườm rà.`,
    suggestedQuestions: [
      "Cô ơi, cổng USB Type-C khác gì so với cổng USB truyền thống ạ?",
      "Làm sao để kết nối máy tính của em ra máy chiếu lớp học mà có cả tiếng và hình hả Cô?",
      "Driver của thiết bị là gì và tại sao thỉnh thoảng máy tính lại báo thiếu Driver vậy Cô?"
    ]
  },

  // 主题2
  {
    id: "lop11-bai-6",
    grade: "11",
    topic: "Chủ đề 2. TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN",
    title: "Bài 6. Lưu trữ và chia sẻ tệp tin trên Internet",
    description: "Sử dụng các dịch vụ đám mây để lưu trữ an toàn, sao lưu dữ liệu và cộng tác nhóm trực tuyến hiệu quả.",
    content: `### 1. Dịch vụ lưu trữ đám mây (Cloud Storage)
Lưu trữ đám mây là dịch vụ cho phép người dùng lưu trữ tệp tin trên hệ thống máy chủ lớn của nhà cung cấp trên Internet thay vì ổ cứng vật lý cục bộ.
- **Các dịch vụ phổ biến:** Google Drive, Microsoft OneDrive, Dropbox, iCloud.
- **Lợi ích:** Đồng bộ dữ liệu tự động, dễ dàng truy cập bằng điện thoại/máy tính, bảo vệ dữ liệu khi thiết bị hỏng hóc.

### 2. Chia sẻ và Phân quyền tệp tin văn minh
Khi chia sẻ tệp tin hoặc thư mục trên đám mây, chúng ta cần lưu ý cấu hình quyền hạn:
- **Người xem (Viewer):** Chỉ được đọc nội dung, không được sửa hay xóa.
- **Người nhận xét (Commenter):** Được đọc và viết nhận xét góp ý bên lề.
- **Người chỉnh sửa (Editor):** Có toàn quyền sửa đổi, xóa nội dung tệp tin.`,
    suggestedQuestions: [
      "Cô ơi, lưu trữ đám mây có tuyệt đối an toàn không và làm sao để tránh bị hack dữ liệu ạ?",
      "Làm cách nào để em chia sẻ một file bài tập nhóm trên Google Drive mà các bạn không thể chỉnh sửa phá hỏng bài ạ?",
      "Tính năng đồng bộ tự động (Auto-sync) hoạt động như thế nào hả Cô?"
    ]
  },
  {
    id: "lop11-bai-7",
    grade: "11",
    topic: "Chủ đề 2. TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN",
    title: "Bài 7. Thực hành tìm kiếm thông tin trên Internet",
    description: "Làm chủ công cụ tìm kiếm với các cú pháp tìm nâng cao để tìm tài liệu học tập chính xác trong 3 giây.",
    content: `### 1. Công cụ tìm kiếm Google nâng cao
Tìm kiếm thông tin nhanh và chính xác nhất bằng các cú pháp (toán tử tìm kiếm):
- **Tìm kiếm cụm từ chính xác:** Đặt cụm từ trong cặp dấu ngoặc kép \`"..."\`.
  - *Ví dụ:* \`"tin học 11 kết nối tri thức"\`
- **Tìm kiếm theo định dạng tệp:** Sử dụng từ khóa \`filetype:<phần_mở_rộng>\`.
  - *Ví dụ:* \`"đề cương tin học 11" filetype:pdf\`
- **Tìm kiếm trên một trang web cụ thể:** Sử dụng từ khóa \`site:<tên_miền>\`.
  - *Ví dụ:* \`"tài liệu sql" site:vietjack.com\`
- **Loại trừ từ khóa không mong muốn:** Sử dụng dấu trừ \`-\` ngay trước từ cần loại bỏ.
  - *Ví dụ:* \`python -snake\` (tìm ngôn ngữ lập trình Python, loại bỏ các trang nói về loài rắn).

### 2. Đánh giá tính xác thực của thông tin
- Kiểm tra nguồn phát hành (ưu tiên các trang đuôi \`.gov\`, \`.edu\`, hoặc báo chính thống).
- Đối chiếu thông tin giữa nhiều trang tin cậy khác nhau trước khi sử dụng.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để tìm kiếm slide bài thuyết trình PowerPoint về chủ đề AI trên Google ạ?",
      "Toán tử OR và AND hoạt động như thế nào khi kết hợp các từ khóa tìm kiếm hả Cô?",
      "Làm sao biết một trang web có chứa tin giả (Fake News) để tránh chia sẻ vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-8",
    grade: "11",
    topic: "Chủ đề 2. TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN",
    title: "Bài 8. Thực hành nâng cao sử dụng thư điện tử và mạng xã hội",
    description: "Sử dụng Email chuyên nghiệp và tham gia mạng xã hội an toàn, xây dựng hồ sơ số cá nhân lành mạnh.",
    content: `### 1. Sử dụng Thư điện tử (Email) chuyên nghiệp
- **Cấu trúc thư chuẩn mực:** Tiêu đề rõ ràng ngắn gọn, lời chào đầu thư, nội dung mạch lạc, lời chúc và chữ ký cuối thư.
- **Phân biệt CC và BCC:**
  - **CC (Carbon Copy):** Gửi thư cho nhiều người đồng thời, tất cả người nhận đều nhìn thấy địa chỉ email của nhau.
  - **BCC (Blind Carbon Copy):** Gửi thư cho nhiều người nhưng ẩn danh sách người nhận, không ai thấy ai được gửi cùng.
- **Gửi tệp đính kèm lớn:** Nên tải lên Google Drive trước rồi gửi đường link chia sẻ.

### 2. Ứng xử thông minh trên Mạng xã hội
- Tuyệt đối không chia sẻ thông tin cá nhân nhạy cảm (số CCCD, địa chỉ, ảnh thẻ ngân hàng).
- Thiết lập chế độ bảo mật 2 lớp (2FA) cho tài khoản cá nhân.
- Suy nghĩ kỹ trước khi đăng tải bài viết hoặc bình luận trên mạng (Quy tắc: Đã đăng là không thể thu hồi hoàn toàn).`,
    suggestedQuestions: [
      "Cô ơi, khi nào thì em nên dùng CC và khi nào thì nên dùng BCC trong viết email ạ?",
      "Tính năng bảo mật 2 lớp (2FA) là gì và cài đặt như thế nào để tài khoản Facebook không bị hack hả Cô?",
      "Làm sao để lọc các thư rác (Spam email) hiệu quả trong hộp thư Gmail vậy Cô?"
    ]
  },

  // 主题3
  {
    id: "lop11-bai-9",
    grade: "11",
    topic: "Chủ đề 3. ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ",
    title: "Bài 9. Giao tiếp an toàn trên Internet",
    description: "Phòng tránh mã độc, tin tặc lừa đảo, tuân thủ Luật An ninh mạng và quy tắc ứng xử văn minh trên không gian mạng.",
    content: `### 1. Nhận diện các mối đe dọa trực tuyến
- **Malware (Mã độc):** Gồm virus, trojan, worm, và đặc biệt là **Ransomware** (mã độc tống tiền, mã hóa toàn bộ dữ liệu máy tính để đòi tiền chuộc).
- **Phishing (Lừa đảo giả mạo):** Kẻ xấu gửi tin nhắn hoặc thiết kế trang web giả mạo ngân hàng, nhà trường để dụ dỗ người dùng nhập tài khoản, mật khẩu.
- **Cyberbullying (Bắt nạt mạng):** Sử dụng mạng xã hội để công kích, đe dọa, xúc phạm người khác.

### 2. Các quy tắc giao tiếp an toàn và đúng pháp luật
- **Luật An ninh mạng Việt Nam:** Nghiêm cấm phát tán tin giả, tuyên truyền thông tin sai lệch chống phá nhà nước, bôi nhọ danh dự tổ chức/cá nhân.
- **Quy tắc bảo vệ bản thân:** Không nhấn vào link lạ, không tải phần mềm lậu crack, luôn cập nhật hệ điều hành và phần mềm diệt virus định kỳ.`,
    suggestedQuestions: [
      "Cô ơi, Ransomware (mã độc tống tiền) nguy hiểm như thế nào và cách phòng tránh ra sao ạ?",
      "Em nhận được tin nhắn trúng thưởng xe máy SH kèm đường link lạ thì phải xử lý thế nào hả Cô?",
      "Luật An ninh mạng quy định hình phạt gì cho hành vi bôi nhọ người khác trên Facebook vậy Cô?"
    ]
  },

  // 主题4
  {
    id: "lop11-bai-10",
    grade: "11",
    topic: "Chủ đề 4. GIỚI THIỆU CÁC HỆ CƠ SỞ DỮ LIỆU",
    title: "Bài 10. Lưu trữ dữ liệu và khai thác thông tin phục vụ quản lý",
    description: "Sự cần thiết của bài toán quản lý dữ liệu trong thực tế và nhược điểm khi quản lý bằng cách thủ công.",
    content: `### 1. Bài toán quản lý dữ liệu trong thực tế
Trong mọi tổ chức (trường học, bệnh viện, siêu thị, ngân hàng), công tác quản lý thông tin đóng vai trò sống còn:
- *Ví dụ trường học:* Cần quản lý hồ sơ học sinh, điểm số các môn học, thông tin giáo viên, thời khóa biểu, thiết bị dạy học.
- *Mục tiêu:* Lưu trữ thông tin một cách ngăn nắp, dễ dàng tìm kiếm nhanh chóng, cập nhật kịp thời và lập các báo cáo thống kê chính xác.

### 2. Hạn chế của phương pháp lưu trữ thủ công hoặc file đơn lẻ (Excel)
- **Dư thừa dữ liệu:** Thông tin bị trùng lặp nhiều nơi, gây lãng phí bộ nhớ.
- **Không nhất quán dữ liệu:** Khi dữ liệu thay đổi ở một nơi nhưng nơi khác chưa cập nhật, dẫn tới mâu thuẫn thông tin.
- **Khó khăn khi chia sẻ:** Nhiều người khó có thể đồng thời chỉnh sửa dữ liệu một cách an toàn mà không làm đè đè ghi đè dữ liệu của nhau.
- **An toàn bảo mật kém:** Dễ bị mất mát, cháy nổ tài liệu giấy hoặc hỏng file đơn lẻ do virus.`,
    suggestedQuestions: [
      "Cô ơi, tại sao trường học mình không quản lý điểm bằng Excel nữa mà lại dùng hệ thống CSDL trực tuyến ạ?",
      "Hiện tượng mâu thuẫn dữ liệu (Inconsistency) trong lưu trữ thủ công xảy ra cụ thể như thế nào vậy Cô?",
      "Bài toán quản lý thư viện trường học cần lưu trữ và theo dõi những thông tin cơ bản nào hả Cô?"
    ]
  },
  {
    id: "lop11-bai-11",
    grade: "11",
    topic: "Chủ đề 4. GIỚI THIỆU CÁC HỆ CƠ SỞ DỮ LIỆU",
    title: "Bài 11. Cơ sở dữ liệu",
    description: "Khái niệm khoa học về Cơ sở dữ liệu (CSDL) và các yêu cầu cơ bản của một hệ thống CSDL chuẩn.",
    content: `### 1. Định nghĩa Cơ sở dữ liệu (CSDL)
**Cơ sở dữ liệu (Database)** là một tập hợp các dữ liệu có liên quan với nhau, được sắp xếp và lưu trữ một cách có tổ chức trên các thiết bị lưu trữ của máy tính để có thể đáp ứng nhu cầu khai thác thông tin đồng thời của nhiều người dùng và nhiều chương trình ứng dụng khác nhau.

### 2. Các đặc trưng (yêu cầu) cơ bản của một hệ CSDL
- **Tính độc lập của dữ liệu:** Dữ liệu độc lập với chương trình ứng dụng. Thay đổi cấu trúc vật lý của dữ liệu không làm ảnh hưởng tới chương trình viết cho nó.
- **Tính toàn vẹn (Integrity):** Bảo đảm dữ liệu luôn đúng đắn, chính xác và hợp lệ theo các ràng buộc thực tế (ví dụ: điểm số phải từ 0 đến 10).
- **Tính không dư thừa (Non-redundancy):** Hạn chế tối đa việc lặp lại thông tin không cần thiết để tối ưu bộ nhớ và tránh mâu thuẫn dữ liệu.
- **Tính an toàn và bảo mật thông tin:** Ngăn chặn truy cập trái phép, bảo vệ thông tin khi có sự cố kỹ thuật.`,
    suggestedQuestions: [
      "Cô ơi, 'Tính độc lập của dữ liệu' nghĩa là gì, em vẫn chưa hiểu rõ lắm ạ?",
      "Làm thế nào để hệ thống tự động kiểm tra và bảo đảm 'Tính toàn vẹn' của dữ liệu điểm học sinh hả Cô?",
      "Nếu dữ liệu bị dư thừa nhiều thì sẽ dẫn đến những hậu quả xấu gì vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-12",
    grade: "11",
    topic: "Chủ đề 4. GIỚI THIỆU CÁC HỆ CƠ SỞ DỮ LIỆU",
    title: "Bài 12. Hệ quản trị cơ sở dữ liệu và hệ cơ sở dữ liệu",
    description: "Phân biệt rõ ràng ba khái niệm dễ nhầm lẫn: CSDL, Hệ quản trị CSDL (DBMS) và Hệ CSDL.",
    content: `### 1. Phân biệt các khái niệm cốt lõi

| Khái niệm | Ý nghĩa bản chất | Ví dụ cụ thể |
| :--- | :--- | :--- |
| **Cơ sở dữ liệu (CSDL)** | Tập hợp các bảng dữ liệu lưu trữ trên đĩa cứng. | Danh sách học sinh, điểm thi lưu trữ. |
| **Hệ quản trị CSDL (DBMS)** | Phần mềm dùng để tạo lập, cập nhật, truy xuất và quản lý CSDL. | MySQL, Microsoft Access, SQLite, PostgreSQL. |
| **Hệ cơ sở dữ liệu (Database System)** | Toàn bộ hệ thống hoàn chỉnh bao gồm CSDL + DBMS + Phần mềm ứng dụng + Người dùng. | Hệ thống quản lý điểm học sinh trực tuyến VnEdu. |

### 2. Các chức năng của Hệ quản trị CSDL (DBMS)
- Cung cấp ngôn ngữ định nghĩa dữ liệu (DDL) để thiết lập cấu trúc.
- Cung cấp ngôn ngữ thao tác dữ liệu (DML) để cập nhật và truy vấn thông tin.
- Kiểm soát và bảo đảm an toàn dữ liệu, phân quyền người dùng và thực hiện giao dịch (Transaction).`,
    suggestedQuestions: [
      "Cô ơi, phần mềm Microsoft Access có phải là một Hệ quản trị CSDL không ạ?",
      "Tại sao chúng ta không trực tiếp ghi dữ liệu vào file mà phải thông qua Hệ quản trị CSDL làm gì hả Cô?",
      "Một lập trình viên phát triển web cần học những Hệ quản trị CSDL phổ biến nào vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-13",
    grade: "11",
    topic: "Chủ đề 4. GIỚI THIỆU CÁC HỆ CƠ SỞ DỮ LIỆU",
    title: "Bài 13. Cơ sở dữ liệu quan hệ",
    description: "Mô hình dữ liệu quan hệ của E.F. Codd: Cấu trúc bảng, thuộc tính, bản ghi, khóa chính và khóa ngoài.",
    content: `### 1. Mô hình cơ sở dữ liệu quan hệ
Do nhà khoa học máy tính **E.F. Codd** đề xuất năm 1970. Đây là mô hình lưu trữ phổ biến nhất thế giới hiện nay.
- Dữ liệu được tổ chức dưới dạng các **Quan hệ (bản chất là các Bảng - Tables)**.
- Mỗi hàng trong bảng gọi là một **Bộ (bản ghi - Record / Row)** biểu diễn cho một thực thể cụ thể.
- Mỗi cột trong bảng gọi là một **Thuộc tính (Trường - Field / Column)** biểu diễn một đặc điểm của thực thể.

### 2. Các loại khóa trong bảng quan hệ
- **Khóa chính (Primary Key - PK):** Là một hoặc một nhóm thuộc tính dùng để định danh **duy nhất** mỗi hàng trong bảng. Giá trị khóa chính không được rỗng (NOT NULL) và không trùng lặp.
- **Khóa ngoài (Foreign Key - FK):** Là cột trong bảng này liên kết trực tiếp tới khóa chính của một bảng khác, bảo đảm tính toàn vẹn tham chiếu giữa các thực thể liên quan.`,
    sampleCode: `-- Ví dụ mô hình quan hệ: Bảng LỚP HỌC liên kết với bảng HỌC SINH qua khóa ngoài MaLop
CREATE TABLE LopHoc (
    MaLop VARCHAR(10) PRIMARY KEY,
    TenLop VARCHAR(20) NOT NULL
);

CREATE TABLE HocSinh (
    MaHS VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(50) NOT NULL,
    MaLop VARCHAR(10),
    FOREIGN KEY (MaLop) REFERENCES LopHoc(MaLop) -- Khóa ngoài liên kết
);`,
    codeLanguage: "sql",
    suggestedQuestions: [
      "Cô ơi, một bảng có thể có nhiều hơn một Khóa chính được không ạ?",
      "Nếu em cố tình chèn một học sinh có mã lớp không tồn tại trong bảng LopHoc thì hệ thống sẽ báo lỗi gì hả Cô?",
      "Thế nào là 'Ràng buộc toàn vẹn tham chiếu' trong cơ sở dữ liệu quan hệ vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-14",
    grade: "11",
    topic: "Chủ đề 4. GIỚI THIỆU CÁC HỆ CƠ SỞ DỮ LIỆU",
    title: "Bài 14. SQL – Ngôn ngữ truy vấn có cấu trúc",
    description: "Tổng quan về ngôn ngữ SQL: Lệnh tạo bảng, sửa cấu trúc, thêm, sửa, xóa và truy vấn dữ liệu.",
    content: `### 1. SQL là gì?
**SQL (Structured Query Language)** là ngôn ngữ chuẩn quốc tế được sử dụng để giao tiếp với các hệ quản trị cơ sở dữ liệu quan hệ.

### 2. Ba nhóm lệnh SQL cơ bản
- **DDL (Data Definition Language - Định nghĩa dữ liệu):** Tạo, sửa đổi cấu trúc bảng.
  - \`CREATE TABLE\`, \`ALTER TABLE\`, \`DROP TABLE\`.
- **DML (Data Manipulation Language - Thao tác dữ liệu):** Thêm, sửa, xóa các bản ghi.
  - \`INSERT INTO\`, \`UPDATE\`, \`DELETE\`.
- **DQL (Data Query Language - Truy vấn dữ liệu):** Lấy dữ liệu.
  - \`SELECT\` phối hợp với \`WHERE\`, \`ORDER BY\`, \`GROUP BY\`.

### 3. Ví dụ truy vấn SQL cơ bản
\`\`\`sql
SELECT HoTen, DiemToan 
FROM HocSinh 
WHERE DiemToan >= 8.5 
ORDER BY DiemToan DESC;
\`\`\``,
    sampleCode: `-- Tạo bảng Sách và viết câu truy vấn cơ bản
CREATE TABLE Sach (
    MaSach INT PRIMARY KEY,
    TenSach VARCHAR(100),
    GiaBia DECIMAL(10, 2),
    TheLoai VARCHAR(50)
);

-- Truy vấn sách thuộc thể loại 'Tin học' có giá bìa < 100.000đ
SELECT TenSach, GiaBia 
FROM Sach 
WHERE TheLoai = 'Tin học' AND GiaBia < 100000;`,
    codeLanguage: "sql",
    suggestedQuestions: [
      "Cô ơi, sự khác biệt giữa hai lệnh DELETE và DROP TABLE trong SQL là gì ạ?",
      "Làm thế nào để lấy ra danh sách học sinh sắp xếp theo thứ tự chữ cái A-Z vậy Cô?",
      "Cú pháp UPDATE để sửa lại số điện thoại của một giáo viên viết như thế nào hả Cô?"
    ]
  },
  {
    id: "lop11-bai-15",
    grade: "11",
    topic: "Chủ đề 4. GIỚI THIỆU CÁC HỆ CƠ SỞ DỮ LIỆU",
    title: "Bài 15. Bảo mật và an toàn hệ cơ sở dữ liệu",
    description: "Các biện pháp bảo vệ CSDL khỏi sự phá hoại của hacker, rò rỉ dữ liệu và phục hồi khi có thiên tai.",
    content: `### 1. Các nguy cơ đe dọa an toàn cơ sở dữ liệu
- Truy cập trái phép bởi tin tặc (Hackers).
- Các cuộc tấn công chèn mã độc hại **SQL Injection** phá hoại hoặc đánh cắp dữ liệu.
- Sự cố hỏng hóc phần cứng, mất điện, cháy nổ làm mất mát hoàn toàn dữ liệu.

### 2. Các biện pháp bảo mật và an toàn thông tin
- **Phân quyền truy cập (Authorization):** Chỉ cấp quyền tối thiểu cần thiết cho từng nhóm người dùng (ví dụ: Học sinh chỉ được xem điểm, Giáo viên được sửa điểm).
- **Mã hóa dữ liệu (Encryption):** Mã hóa mật khẩu và các thông tin cá nhân nhạy cảm trước khi lưu xuống ổ đĩa.
- **Lưu nhật ký hệ thống (Logging):** Theo dõi lịch sử ai đã truy cập, chỉnh sửa dữ liệu vào thời gian nào.
- **Sao lưu định kỳ (Backup):** Thường xuyên lưu trữ một bản copy CSDL sang thiết bị lưu trữ khác hoặc lên mây.`,
    suggestedQuestions: [
      "Cô ơi, tấn công SQL Injection là gì và lập trình viên làm thế nào để ngăn chặn ạ?",
      "Tại sao chúng ta phải mã hóa mật khẩu học sinh bằng các thuật toán như MD5 hay bcrypt trước khi lưu hả Cô?",
      "Quy trình sao lưu dự phòng (Database Backup) tự động hàng ngày hoạt động thế nào thế Cô?"
    ]
  },

  // 主题5
  {
    id: "lop11-bai-16",
    grade: "11",
    topic: "Chủ đề 5. HƯỚNG NGHIỆP VỚI TIN HỌC",
    title: "Bài 16. Công việc quản trị cơ sở dữ liệu",
    description: "Tìm hiểu về cơ hội nghề nghiệp, trách nhiệm và kỹ năng cần có của một kỹ sư quản trị CSDL (DBA).",
    content: `### 1. Người quản trị cơ sở dữ liệu (DBA - Database Administrator) là ai?
**DBA** là chuyên gia chịu trách nhiệm tối cao trong việc thiết lập, cấu hình, quản lý, duy trì hiệu năng ổn định và bảo mật an toàn cho toàn bộ hệ thống cơ sở dữ liệu của một tổ chức.

### 2. Các nhiệm vụ chính của công việc quản trị CSDL
- **Thiết kế và cài đặt:** Xây dựng mô hình dữ liệu, cài đặt các phần mềm DBMS như PostgreSQL, Oracle.
- **Tối ưu hóa hiệu năng (Database Tuning):** Thiết lập chỉ mục (index), tinh chỉnh các truy vấn SQL chạy cực nhanh.
- **Đảm bảo tính sẵn sàng:** Thiết lập hệ thống sao lưu dự phòng tự động, xử lý khôi phục dữ liệu ngay khi có sự cố.
- **Quản lý bảo mật:** Cấp phát và thu hồi quyền truy cập của người dùng.

### 3. Kỹ năng cần trang bị
Kiến thức toán học logic, kỹ năng truy vấn SQL thành thạo, tư duy phân tích hệ thống và tính cẩn thận, bảo mật cao.`,
    suggestedQuestions: [
      "Cô ơi, mức lương và cơ hội việc làm của ngành Quản trị CSDL (DBA) tại Việt Nam hiện nay thế nào ạ?",
      "Em nên tự học những Hệ quản trị CSDL nào đầu tiên để có định hướng làm DBA hả Cô?",
      "Sự khác biệt giữa lập trình viên viết code phần mềm (Developer) và kỹ sư quản trị CSDL (DBA) là gì vậy Cô?"
    ]
  },

  // 主题6
  {
    id: "lop11-bai-17",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 17. Quản trị cơ sở dữ liệu trên máy tính",
    description: "Làm quen và thực hành sử dụng các phần mềm quản trị CSDL trực quan phổ biến trên máy tính.",
    content: `### 1. Các phần mềm quản trị CSDL trực quan thông dụng
Để làm việc với CSDL một cách dễ dàng thay vì gõ lệnh thô, lập trình viên sử dụng các công cụ giao diện đồ họa (GUI Client):
- **HeidiSQL / MySQL Workbench / phpMyAdmin:** Phổ biến nhất để quản lý MySQL và MariaDB.
- **pgAdmin:** Công cụ chuyên dụng cho cơ sở dữ liệu PostgreSQL.
- **SQLite Studio / DBeaver:** Các trình quản lý đa năng hỗ trợ kết nối nhiều loại CSDL cùng lúc.

### 2. Các thao tác cơ bản trên giao diện trực quan
- Kết nối tới máy chủ CSDL (Database Server) bằng cách nhập: Host (thường là \`localhost\` hoặc địa chỉ IP), Port, Username, Password.
- Xem danh sách các cơ sở dữ liệu, danh sách bảng, cấu trúc các trường và dữ liệu thực tế đang lưu trữ trong bảng.
- Chạy trực tiếp các câu lệnh SQL tự viết thông qua trình soạn thảo Query Editor tích hợp sẵn.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để kết nối phần mềm HeidiSQL tới một cơ sở dữ liệu MySQL chạy trên máy tính của em ạ?",
      "Port mặc định của hệ quản trị CSDL MySQL là bao nhiêu vậy Cô?",
      "Sử dụng công cụ trực quan để quản lý CSDL có những lợi thế gì so với viết lệnh trực tiếp hả Cô?"
    ]
  },
  {
    id: "lop11-bai-18",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 18. Thực hành xác định cấu trúc bảng và các trường khóa",
    description: "Phân tích yêu cầu bài toán quản lý thực tế, thiết kế cấu trúc bảng và chọn trường làm khóa chính thích hợp.",
    content: `### 1. Quy trình thiết kế cơ sở dữ liệu từ thực tế
Để xây dựng CSDL cho một bài toán quản lý (ví dụ: Quản lý Thư viện sách):
1. **Xác định các thực thể cần quản lý:** Bạn đọc, Sách, Phiếu mượn.
2. **Xác định các thuộc tính của thực thể:**
   - *Bạn đọc:* Mã thẻ, Họ tên, Lớp, Ngày sinh.
   - *Sách:* Mã sách, Tên sách, Tác giả, Năm xuất bản, Số lượng.
3. **Xác định các bảng tương ứng:** Tạo bảng \`BanDoc\`, \`Sach\`, \`PhieuMuon\`.

### 2. Xác định trường khóa chính (Primary Key)
Trường khóa chính được chọn phải bảo đảm:
- Giá trị không bao giờ bị trùng lặp giữa 2 hàng khác nhau.
- Không bao giờ được phép để trống (NOT NULL).
- Thường sử dụng các mã định danh tự tăng hoặc chuỗi mã hóa độc nhất (như \`MaSach\`, \`MaThe\`).`,
    suggestedQuestions: [
      "Cô ơi, trong bài toán quản lý điểm học sinh, nếu em lấy cột 'Họ tên' làm khóa chính thì có được không và tại sao ạ?",
      "Trường hợp nào chúng ta nên sử dụng khóa chính gồm nhiều thuộc tính kết hợp (Composite Key) vậy Cô?",
      "Kiểu dữ liệu nào thích hợp nhất để lưu số điện thoại của bạn đọc trong bảng BanDoc hả Cô?"
    ]
  },
  {
    id: "lop11-bai-19",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 19. Thực hành tạo lập cơ sở dữ liệu và các bảng",
    description: "Viết câu lệnh SQL hoàn chỉnh để tạo cơ sở dữ liệu mới và định nghĩa cấu trúc các bảng dữ liệu kèm ràng buộc.",
    content: `### 1. Lệnh tạo Cơ sở dữ liệu mới
Để bắt đầu một dự án mới, ta tạo một CSDL trống trên máy chủ:
\`\`\`sql
CREATE DATABASE QuanLyHocSinh;
USE QuanLyHocSinh; -- Chọn CSDL vừa tạo để làm việc
\`\`\`

### 2. Lệnh tạo bảng dữ liệu với các ràng buộc cột
Cú pháp tổng quát:
\`\`\`sql
CREATE TABLE TenBang (
    TenCot1 KieuDuLieu RangBuoc,
    TenCot2 KieuDuLieu RangBuoc,
    ...
);
\`\`\`

**Các ràng buộc thông dụng:**
- \`PRIMARY KEY\`: Khai báo cột làm khóa chính.
- \`NOT NULL\`: Bắt buộc phải nhập giá trị cho cột này khi thêm dữ liệu.
- \`AUTO_INCREMENT\` (hoặc \`SERIAL\`): Tự động tăng giá trị số nguyên lên 1 cho mỗi hàng mới thêm vào.`,
    sampleCode: `-- Tạo bảng HocSinh hoàn chỉnh
CREATE TABLE HocSinh (
    MaHS INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính tự tăng
    HoTen VARCHAR(50) NOT NULL,          -- Không được rỗng
    NgaySinh DATE,
    DiemTrungBinh DECIMAL(4, 2)          -- Số thập phân ví dụ 9.25
);`,
    codeLanguage: "sql",
    suggestedQuestions: [
      "Cô ơi, kiểu dữ liệu DECIMAL(4,2) có nghĩa là gì thế Cô?",
      "Sự khác biệt giữa kiểu dữ liệu CHAR và VARCHAR trong SQL là gì ạ?",
      "Làm cách nào để xóa một bảng khỏi CSDL bằng câu lệnh SQL hả Cô?"
    ]
  },
  {
    id: "lop11-bai-20",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 20. Thực hành tạo lập các bảng có khóa ngoài",
    description: "Hướng dẫn khai báo khóa ngoài để tạo liên kết vững chắc giữa các bảng trong cơ sở dữ liệu.",
    content: `### 1. Ý nghĩa của Khóa ngoài (Foreign Key)
Khóa ngoài giúp liên kết bảng phụ tới bảng chính, tạo thành một mối quan hệ logic (ví dụ: Một học sinh thuộc về một lớp cụ thể). Nó ngăn chặn việc nhập dữ liệu rác, bảo vệ tính toàn vẹn tham chiếu.

### 2. Cú pháp khai báo khóa ngoài trong SQL
Khai báo trực tiếp khi tạo bảng phụ bằng từ khóa \`FOREIGN KEY\` kết hợp \`REFERENCES\`:
\`\`\`sql
CREATE TABLE HocSinh (
    MaHS VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(50) NOT NULL,
    MaLop VARCHAR(10), -- Cột lưu mã lớp của học sinh
    FOREIGN KEY (MaLop) REFERENCES LopHoc(MaLop) -- Tạo liên kết khóa ngoài
);
\`\`\`
*Lưu ý:* Kiểu dữ liệu của cột khóa ngoài ở bảng con bắt buộc phải **trùng khớp hoàn toàn** với kiểu dữ liệu của cột khóa chính ở bảng cha.`,
    sampleCode: `-- Thiết lập CSDL gồm 2 bảng: Lớp học và Học sinh có khóa ngoài liên kết
CREATE TABLE LopHoc (
    MaLop VARCHAR(10) PRIMARY KEY,
    TenLop VARCHAR(50) NOT NULL
);

CREATE TABLE HocSinh (
    MaHS VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(50) NOT NULL,
    MaLop VARCHAR(10),
    FOREIGN KEY (MaLop) REFERENCES LopHoc(MaLop)
);`,
    codeLanguage: "sql",
    suggestedQuestions: [
      "Cô ơi, khi tạo bảng, em phải tạo bảng chính LopHoc trước hay tạo bảng phụ HocSinh trước ạ?",
      "Một bảng có thể có tối đa bao nhiêu khóa ngoài liên kết tới các bảng khác nhau hả Cô?",
      "Làm sao để thêm khóa ngoài vào một bảng đã tồn tại từ trước bằng lệnh ALTER TABLE vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-21",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 21. Thực hành cập nhật và truy xuất dữ liệu các bảng",
    description: "Thực hành viết các câu lệnh thêm bản ghi mới, sửa đổi thông tin và xóa bản ghi khỏi bảng.",
    content: `### 1. Lệnh thêm dữ liệu mới: \`INSERT INTO\`
Cú pháp thêm một hoặc nhiều bản ghi vào bảng:
\`\`\`sql
INSERT INTO TenBang (Cot1, Cot2, Cot3) 
VALUES (GiaTri1, GiaTri2, GiaTri3);
\`\`\`
*Ví dụ:* \`INSERT INTO LopHoc (MaLop, TenLop) VALUES ('11A1', 'Lớp 11 chuyên Tin');\`

### 2. Lệnh sửa đổi dữ liệu: \`UPDATE\`
Dùng để cập nhật giá trị mới cho các bản ghi thỏa mãn điều kiện lọc.
\`\`\`sql
UPDATE TenBang 
SET Cot1 = GiaTriMoi 
WHERE DieuKien;
\`\`\`
*Cảnh báo cực kỳ quan trọng:* Bắt buộc phải có mệnh đề \`WHERE\`, nếu không câu lệnh sẽ cập nhật giá trị mới cho **tất cả** các bản ghi trong bảng!

### 3. Lệnh xóa dữ liệu: \`DELETE FROM\`
Dùng để xóa bớt bản ghi khỏi bảng.
\`\`\`sql
DELETE FROM TenBang WHERE DieuKien;
\`\`\``,
    sampleCode: `-- Sửa đổi điểm số của bạn có mã học sinh MaHS = 'HS001' lên 9.5
UPDATE HocSinh 
SET DiemTrungBinh = 9.5 
WHERE MaHS = 'HS001';

-- Xóa học sinh có điểm trung bình nhỏ hơn 5.0
DELETE FROM HocSinh 
WHERE DiemTrungBinh < 5.0;`,
    codeLanguage: "sql",
    suggestedQuestions: [
      "Cô ơi, điều gì xảy ra nếu em chạy lệnh DELETE FROM HocSinh mà quên không viết điều kiện WHERE ạ?",
      "Em có thể viết một câu lệnh INSERT để thêm nhiều học sinh cùng lúc được không hả Cô?",
      "Tại sao khi thêm chuỗi văn bản trong lệnh INSERT ta phải đặt trong dấu nháy đơn '' mà không dùng nháy kép vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-22",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 22. Thực hành cập nhật bảng dữ liệu có tham chiếu",
    description: "Giải quyết các lỗi vi phạm ràng buộc khóa ngoài khi cập nhật hoặc xóa dữ liệu ở bảng có tham chiếu.",
    content: `### 1. Lỗi vi phạm ràng buộc toàn vẹn tham chiếu
Khi hai bảng được liên kết với nhau bằng khóa ngoài:
- **Lỗi khi chèn dữ liệu (INSERT):** Chèn dữ liệu vào bảng con với giá trị khóa ngoài chưa tồn tại ở bảng cha.
- **Lỗi khi xóa dữ liệu (DELETE):** Xóa một hàng ở bảng cha khi hàng đó đang được tham chiếu bởi các hàng ở bảng con.

### 2. Các cơ chế xử lý tham chiếu tự động (CASCADE, SET NULL)
Để quản lý hành vi này, khi định nghĩa khóa ngoài ta có thể cấu hình thêm các tùy chọn:
- \`ON DELETE CASCADE\`: Khi xóa 1 dòng ở bảng cha, hệ thống tự động xóa tất cả các dòng liên kết ở bảng con.
- \`ON DELETE SET NULL\`: Khi xóa ở bảng cha, hệ thống tự động chuyển giá trị khóa ngoài ở bảng con thành NULL.
- \`ON DELETE RESTRICT\`: Hệ thống ngăn chặn không cho phép xóa ở bảng cha nếu có tham chiếu đang tồn tại (Mặc định).`,
    sampleCode: `-- Tạo bảng Học sinh có tùy chọn ON DELETE CASCADE
CREATE TABLE HocSinh (
    MaHS VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(50) NOT NULL,
    MaLop VARCHAR(10),
    FOREIGN KEY (MaLop) REFERENCES LopHoc(MaLop) ON DELETE CASCADE
);`,
    codeLanguage: "sql",
    suggestedQuestions: [
      "Cô ơi, cơ chế ON DELETE CASCADE hoạt động tự động như thế nào, có nguy hiểm không ạ?",
      "Khi nào chúng ta nên dùng ON DELETE SET NULL thay vì ON DELETE CASCADE vậy Cô?",
      "Làm sao để tạm thời tắt kiểm tra ràng buộc khóa ngoài khi muốn nhập dữ liệu thử nghiệm hả Cô?"
    ]
  },
  {
    id: "lop11-bai-23",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 23. Thực hành truy xuất dữ liệu qua liên kết các bảng",
    description: "Học cách viết câu lệnh INNER JOIN và LEFT JOIN để kết hợp dữ liệu từ nhiều bảng khác nhau thành một bảng kết quả duy nhất.",
    content: `### 1. Tại sao cần liên kết các bảng khi truy vấn?
Trong cơ sở dữ liệu quan hệ, dữ liệu được phân rã ra nhiều bảng để tránh trùng lặp dư thừa. Để lấy ra thông tin đầy đủ, ta cần thực hiện phép kết (Join) các bảng lại dựa trên khóa liên kết.

### 2. Phép kết nối bằng từ khóa \`INNER JOIN\`
Lấy ra các bản ghi có sự khớp nhau về giá trị khóa ở cả hai bảng.
\`\`\`sql
SELECT HocSinh.HoTen, LopHoc.TenLop
FROM HocSinh
INNER JOIN LopHoc ON HocSinh.MaLop = LopHoc.MaLop;
\`\`\`

### 3. Phép kết nối bằng từ khóa \`LEFT JOIN\`
Lấy toàn bộ bản ghi của bảng bên trái, và ghép các bản ghi khớp ở bảng bên phải. Nếu không khớp, kết quả hiển thị của bảng bên phải sẽ là NULL.`,
    sampleCode: `-- Liệt kê tất cả học sinh kèm theo tên lớp của họ, kể cả những học sinh chưa được xếp lớp
SELECT HS.HoTen, L.TenLop
FROM HocSinh HS
LEFT JOIN LopHoc L ON HS.MaLop = L.MaLop;`,
    codeLanguage: "sql",
    suggestedQuestions: [
      "Cô ơi, INNER JOIN và LEFT JOIN khác nhau cơ bản ở điểm nào thế Cô?",
      "Em có thể viết một câu lệnh SQL để kết hợp dữ liệu từ 3 bảng cùng lúc được không hả Cô?",
      "Từ khóa ON trong câu lệnh JOIN có nhiệm vụ gì vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-24",
    grade: "11",
    topic: "Chủ đề 6. THỰC HÀNH TẠO VÀ KHAI THÁC CƠ SỞ DỮ LIỆU",
    title: "Bài 24. Thực hành sao lưu dữ liệu",
    description: "Thực hành quy trình Backup và Restore cơ sở dữ liệu để bảo vệ tài sản thông tin quý giá trước mọi sự cố.",
    content: `### 1. Khái niệm Sao lưu (Backup) và Khôi phục (Restore)
- **Sao lưu (Backup):** Là quá trình sao chép cấu trúc và toàn bộ dữ liệu hiện tại của cơ sở dữ liệu ra một file nén độc lập (thường là định dạng \`.sql\`).
- **Khôi phục (Restore):** Là việc đọc file sao lưu để xây dựng lại hoàn toàn CSDL về trạng thái tại thời điểm sao lưu.

### 2. Thực hành sao lưu bằng lệnh terminal (mysqldump)
Sử dụng công cụ dòng lệnh được tích hợp sẵn:
\`\`\`bash
# Sao lưu cơ sở dữ liệu ra tệp tin
mysqldump -u username -p TenCSDL > du_phong_du_lieu.sql

# Khôi phục cơ sở dữ liệu từ tệp tin
mysql -u username -p TenCSDL < du_phong_du_lieu.sql
\`\`\`

### 3. Sao lưu bằng công cụ giao diện đồ họa
Trên HeidiSQL hoặc pgAdmin: Click chuột phải vào tên CSDL cần sao lưu -> Chọn Export database as SQL -> Cấu hình lưu cấu trúc và dữ liệu -> Lưu tệp tin xuống máy tính.`,
    suggestedQuestions: [
      "Cô ơi, sự khác nhau giữa sao lưu toàn phần (Full backup) và sao lưu gia tăng (Incremental backup) là gì ạ?",
      "Chúng ta nên thực hiện sao lưu cơ sở dữ liệu với tần suất như thế nào là hợp lý hả Cô?",
      "Làm cách nào để nén tệp sao lưu .sql lại cho đỡ tốn dung lượng lưu trữ đám mây hả Cô?"
    ]
  },

  // 主题7
  {
    id: "lop11-bai-25",
    grade: "11",
    topic: "Chủ đề 7. PHẦN MỀM CHỈNH SỬA ẢNH VÀ LÀM VIDEO",
    title: "Bài 25. Phần mềm chỉnh sửa ảnh",
    description: "Làm quen giao diện và các khái niệm cơ bản về xử lý ảnh số: Lớp ảnh (Layer), vùng chọn và định dạng tệp.",
    content: `### 1. Giới thiệu phần mềm chỉnh sửa ảnh
Phần mềm chỉnh sửa ảnh giúp chúng ta xử lý độ sáng, màu sắc, cắt ghép, thêm văn bản để tạo ra các bức ảnh đẹp phục vụ học tập và cuộc sống.
- **Phần mềm thương mại:** Adobe Photoshop.
- **Phần mềm nguồn mở miễn phí:** GIMP (GNU Image Manipulation Program).

### 2. Các khái niệm cốt lõi trong xử lý ảnh số
- **Độ phân giải (Resolution):** Số lượng điểm ảnh (pixel) trên một đơn vị chiều dài. Độ phân giải càng cao, ảnh càng sắc nét và chi tiết.
- **Lớp ảnh (Layer):** Tưởng tượng như các tấm kính trong suốt xếp chồng lên nhau. Mỗi lớp chứa một phần hình ảnh riêng biệt, giúp chỉnh sửa dễ dàng mà không ảnh hưởng đến các phần khác.
- **Định dạng tệp ảnh phổ biến:**
  - \`.JPG / .JPEG\`: Dung lượng nhẹ, phù hợp cho ảnh chụp thông thường.
  - \`.PNG\`: Hỗ trợ nền trong suốt (transparent background), chất lượng cao.
  - \`.XCF\` (GIMP) / \`.PSD\` (Photoshop): Tệp dự án gốc, giữ nguyên các layer để tiếp tục chỉnh sửa.`,
    suggestedQuestions: [
      "Cô ơi, tại sao khi xuất ảnh làm logo em nên chọn định dạng .PNG thay vì .JPG ạ?",
      "Khái niệm Layer (Lớp ảnh) giúp ích gì cho việc cắt ghép ảnh vậy Cô?",
      "Làm sao để cài đặt phần mềm chỉnh sửa ảnh GIMP miễn phí trên máy tính hả Cô?"
    ]
  },
  {
    id: "lop11-bai-26",
    grade: "11",
    topic: "Chủ đề 7. PHẦN MỀM CHỈNH SỬA ẢNH VÀ LÀM VIDEO",
    title: "Bài 26. Công cụ tinh chỉnh màu sắc và công cụ chọn",
    description: "Sử dụng các công cụ chọn hình dáng và tinh chỉnh độ sáng, độ tương phản giúp bức ảnh rực rỡ hơn.",
    content: `### 1. Các công cụ tạo Vùng chọn (Selection Tools)
Để chỉnh sửa một khu vực cụ thể mà không làm ảnh hưởng phần còn lại của ảnh, ta cần tạo vùng chọn:
- **Vùng chọn hình học:** Rectangle Select (Hình chữ nhật), Ellipse Select (Hình tròn/ellipse).
- **Vùng chọn tự do:** Lasso Tool (Vẽ tự do quanh vật thể), Magic Wand / Fuzzy Select (Chọn vùng có màu sắc tương đồng tự động).

### 2. Tinh chỉnh màu sắc và độ sáng của ảnh
Sử dụng các bộ lọc điều chỉnh màu trong mục **Colors**:
- **Brightness - Contrast:** Tăng giảm độ sáng tổng thể và độ tương phản giữa các mảng sáng tối.
- **Color Balance:** Cân bằng sắc thái màu (Red, Green, Blue) để sửa ảnh bị ám xanh hoặc ám vàng.
- **Hue - Saturation:** Thay đổi tông màu và độ rực rỡ, đậm nhạt của màu sắc.`,
    suggestedQuestions: [
      "Cô ơi, khi nào thì em nên dùng công cụ Fuzzy Select (Magic Wand) để tách nền ảnh nhanh nhất ạ?",
      "Làm cách nào để cứu một bức ảnh bị chụp tối đen, thiếu sáng trở nên rõ nét hơn hả Cô?",
      "Làm thế nào để đảo ngược vùng chọn (Invert Selection) trong phần mềm chỉnh sửa ảnh vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-27",
    grade: "11",
    topic: "Chủ đề 7. PHẦN MỀM CHỈNH SỬA ẢNH VÀ LÀM VIDEO",
    title: "Bài 27. Công cụ vẽ và một số ứng dụng",
    description: "Thực hành sử dụng các loại cọ vẽ, công cụ tẩy xóa và kỹ thuật Clone Stamp để phục chế ảnh bị lỗi.",
    content: `### 1. Các công cụ vẽ cơ bản
- **Brush Tool (Cọ vẽ):** Vẽ các nét vẽ mềm mại với nhiều tùy chọn về độ lớn, độ nhòe và hình dáng nét vẽ.
- **Eraser Tool (Tẩy/Gôm):** Xóa các chi tiết thừa trên một layer để lộ ra nội dung của layer bên dưới.
- **Bucket Fill (Đổ màu):** Tô màu đồng nhất lên một vùng chọn khép kín một cách nhanh chóng.
- **Gradient Tool (Tô màu chuyển sắc):** Tạo hiệu ứng đổ màu mượt mà từ màu này sang màu khác.

### 2. Phục chế ảnh lỗi với Clone Stamp Tool
- **Clone Stamp Tool:** Cho phép sao chép dữ liệu ảnh từ vùng này (vùng mẫu lành lặn) để đè lên vùng khác (vùng bị rách, xước hoặc có mụn, nốt ruồi).
- *Cách dùng:* Giữ phím \`Ctrl\` và click chuột vào vùng da láng mịn để lấy mẫu, sau đó click chuột lên vết mụn để che khuyết điểm.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để xóa một người đi qua lọt vào tấm ảnh phong cảnh của em bằng Clone Stamp ạ?",
      "Cách điều chỉnh độ mờ đục (Opacity) của nét cọ vẽ Brush để vẽ hiệu ứng đổ bóng mượt mà thế nào hả Cô?",
      "Công cụ tô màu Gradient tạo ra những dải màu nghệ thuật như thế nào vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-28",
    grade: "11",
    topic: "Chủ đề 7. PHẦN MỀM CHỈNH SỬA ẢNH VÀ LÀM VIDEO",
    title: "Bài 28. Tạo ảnh động",
    description: "Khám phá nguyên lý ảnh động dạng chuỗi khung hình và thực hành thiết kế tệp GIF chuyển động vui nhộn.",
    content: `### 1. Nguyên lý tạo ảnh động (Animation)
Ảnh động thực chất là một chuỗi các ảnh tĩnh (khung hình - **Frames**) được hiển thị liên tục với tốc độ cao, tạo ra ảo giác về sự chuyển động trong mắt người xem nhờ hiện tượng lưu ảnh của võng mạc.

### 2. Thiết kế ảnh động bằng GIMP/Photoshop
- Mỗi lớp ảnh (Layer) trong dự án sẽ đóng vai trò là một khung hình đơn lẻ.
- Sắp xếp các layer theo thứ tự thời gian xuất hiện từ dưới lên trên.
- Sử dụng tính năng xem trước chuyển động: **Filters -> Animation -> Playback**.
- **Xuất bản:** Chọn định dạng tệp là **GIF** (\`*.gif\`), tích chọn vào ô \"As Animation\" và thiết lập thời gian trễ giữa các khung hình (thường tính bằng mili-giây, ví dụ: 100ms).`,
    suggestedQuestions: [
      "Cô ơi, thời gian trễ giữa các khung hình (Frame delay) quá nhanh hoặc quá chậm sẽ ảnh hưởng thế nào ạ?",
      "Làm sao để xuất ảnh động GIF lặp đi lặp lại vô tận (Loop forever) vậy Cô?",
      "Sự khác nhau giữa tệp ảnh động .GIF và tệp video ngắn .MP4 là gì thế Cô?"
    ]
  },
  {
    id: "lop11-bai-29",
    grade: "11",
    topic: "Chủ đề 7. PHẦN MỀM CHỈNH SỬA ẢNH VÀ LÀM VIDEO",
    title: "Bài 29. Khám phá phần mềm làm phim",
    description: "Tìm hiểu các thành phần của một dự án làm phim: Timeline, các đường rãnh hình ảnh, âm thanh và hiệu ứng.",
    content: `### 1. Khái quát về quy trình sản xuất video
Sản xuất video (làm phim) gồm 3 giai đoạn:
1. **Tiền kỳ:** Xây dựng ý tưởng, viết kịch bản, chuẩn bị thiết bị quay.
2. **Quay phim:** Thu thập các đoạn video thô (footage) và âm thanh hiện trường.
3. **Hậu kỳ (Biên tập):** Cắt ghép, chèn nhạc, lồng tiếng, tạo hiệu ứng và xuất bản phim.

### 2. Giao diện làm việc của phần mềm làm phim (CapCut/Shotcut)
- **Media Pool (Khối tài nguyên):** Nơi chứa tất cả tệp video, ảnh, nhạc thô được nhập vào dự án.
- **Preview Window (Màn hình xem trước):** Hiển thị nội dung video đang chỉnh sửa thời gian thực.
- **Timeline (Trục thời gian):** Trái tim của phần mềm biên tập, nơi sắp xếp các lớp dữ liệu:
  - **Video Track (Rãnh hình ảnh):** Chứa các clip hình ảnh xếp chồng lên nhau.
  - **Audio Track (Rãnh âm thanh):** Chứa nhạc nền, hiệu ứng âm thanh (sound effects) và giọng lồng tiếng (voiceover).`,
    suggestedQuestions: [
      "Cô ơi, dự án làm phim (Project file) khác gì so với video kết quả xuất bản cuối cùng (.MP4) ạ?",
      "Phần mềm làm phim miễn phí nào dễ sử dụng và phổ biến nhất cho học sinh hiện nay hả Cô?",
      "Rãnh âm thanh và rãnh hình ảnh trên Timeline tương tác với nhau như thế nào thế Cô?"
    ]
  },
  {
    id: "lop11-bai-30",
    grade: "11",
    topic: "Chủ đề 7. PHẦN MỀM CHỈNH SỬA ẢNH VÀ LÀM VIDEO",
    title: "Bài 30. Biên tập phim",
    description: "Hướng dẫn thực hành các thao tác biên tập cốt lõi: Cắt clip, chèn nhạc nền, thêm hiệu ứng chuyển cảnh và phụ đề.",
    content: `### 1. Các thao tác biên tập video cốt lõi
- **Cắt tỉa (Split/Trim):** Cắt bỏ những đoạn video bị lỗi, thừa thãi để giữ mạch phim gãy gọn.
- **Điều chỉnh tốc độ (Speed Control):** Làm video nhanh hơn (Fast motion) để tua nhanh hoặc chậm lại (Slow motion) tạo cảm giác nghệ thuật.

### 2. Nâng tầm video bằng Hiệu ứng và Phụ đề
- **Hiệu ứng chuyển cảnh (Transition):** Đặt giữa hai clip giúp chuyển cảnh mượt mà, tự nhiên (như Fade in, Fade out, Dissolve, Slide).
- **Phụ đề (Subtitles/Captions):** Thêm chữ giải thích lời nói trong video. Các phần mềm hiện đại như CapCut có khả năng tự động nhận diện giọng nói và tạo phụ đề tự động (Auto-captions) cực kỳ nhanh.
- **Nhạc nền và Âm thanh:** Điều chỉnh âm lượng nhạc nền nhỏ xuống khi có giọng nói phát ra (Audio Ducking) để người xem nghe rõ lời.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để nhạc nền tự động nhỏ đi khi em bắt đầu nói thuyết minh trong video ạ?",
      "Nên sử dụng hiệu ứng chuyển cảnh (Transition) như thế nào để video không bị rối mắt hả Cô?",
      "Tính năng tự động tạo phụ đề (Auto captions) trên CapCut có hỗ trợ tiếng Việt tốt không vậy Cô?"
    ]
  },
  {
    id: "lop11-bai-31",
    grade: "11",
    topic: "Chủ đề 7. PHẦN MỀM CHỈNH SỬA ẢNH VÀ LÀM VIDEO",
    title: "Bài 31. Thực hành tạo phim hoạt hình",
    description: "Quy trình thiết kế và sản xuất một bộ phim hoạt hình ngắn hoàn chỉnh từ ý tưởng kịch bản đến video xuất bản.",
    content: `### 1. Quy trình 4 bước tạo phim hoạt hình ngắn
1. **Xây dựng kịch bản phân cảnh (Storyboard):** Vẽ nháp các phân cảnh chính, mô tả hành động và lời thoại của nhân vật.
2. **Thiết kế nhân vật và bối cảnh:** Vẽ các nhân vật hoạt hình ở nhiều tư thế khác nhau dưới dạng các layer riêng biệt trên phần mềm chỉnh sửa ảnh.
3. **Tạo chuyển động:** Đưa các nhân vật vào phần mềm biên tập phim, sử dụng kỹ thuật đặt khung khóa (**Keyframe**) để di chuyển nhân vật dọc theo màn hình, tạo chuyển động sinh động.
4. **Lồng tiếng và Xuất bản:** Thu âm giọng đọc lời thoại, chèn thêm hiệu ứng âm thanh tiếng bước đi, gió thổi, nhạc nền vui nhộn và xuất video định dạng MP4 chất lượng cao.

### 2. Thực hành sáng tạo
Hãy cùng cô Thuý Hào thực hành thiết kế một câu chuyện hoạt hình ngắn tuyên truyền về bảo vệ môi trường trường học nhé!`,
    suggestedQuestions: [
      "Cô ơi, kỹ thuật Keyframe trong làm phim hoạt hình hoạt động như thế nào thế Cô?",
      "Làm sao để đồng bộ khớp hoàn hảo giữa lời thoại nhân vật và hình ảnh chuyển động hả Cô?",
      "Em có thể lấy nhạc nền miễn phí không dính bản quyền ở đâu để chèn vào phim hoạt hình hả Cô?"
    ]
  },

  // GRADE 12 - DETAILED CURRICULUM GROUPED BY 7 TOPICS (BÁM SÁT SGK KẾT NỐI TRI THỨC)
  {
    id: "lop12-bai-1",
    grade: "12",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 1. Làm quen với Trí tuệ nhân tạo",
    description: "Khái niệm Trí tuệ nhân tạo (AI), lịch sử phát triển và các đặc trưng cơ bản.",
    content: `### 1. Khái niệm AI
Trí tuệ nhân tạo (AI) là khả năng của máy tính thực hiện các công việc thông minh của con người như suy luận, tự học và giải quyết vấn đề.
### 2. Lịch sử phát triển
Ra đời năm 1956 tại hội thảo Dartmouth, trải qua các thời kỳ thăng trầm và bùng nổ mạnh mẽ nhờ Học sâu (Deep Learning) và dữ liệu lớn ngày nay.
### 3. Các đặc trưng cơ bản
Học tập (Learning), suy luận (Reasoning), tự sửa lỗi (Self-correction) và nhận thức môi trường.`,
    suggestedQuestions: [
      "Cô ơi, sự khác biệt giữa lập trình truyền thống và lập trình AI là gì ạ?",
      "Trí tuệ nhân tạo dạng hẹp (Narrow AI) và tổng hợp (AGI) khác nhau thế nào hả Cô?",
      "Làm sao máy tính có thể tự học hỏi từ dữ liệu được vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-2",
    grade: "12",
    topic: "Chủ đề 1. MÁY TÍNH VÀ XÃ HỘI TRI THỨC",
    title: "Bài 2. Trí tuệ nhân tạo trong khoa học và đời sống",
    description: "Ứng dụng đột phá của AI trong khoa học dữ liệu, y tế, giáo dục và tác động xã hội.",
    content: `### 1. Ứng dụng khoa học
Phân tích dữ liệu gen sinh học (AlphaFold), dự báo thời tiết, khám phá thiên văn vũ trụ.
### 2. Ứng dụng đời sống
Xe tự hành, robot trợ lý thông minh, hệ thống đề xuất cá nhân hóa, giáo dục thông minh.
### 3. Tác động xã hội
Nâng cao năng suất lao động nhưng đồng thời đặt ra thách thức về việc làm, đạo đức số và an toàn bảo mật.`,
    suggestedQuestions: [
      "Cô ơi, AI AlphaFold đã giúp ích gì cho ngành y học hiện đại vậy Cô?",
      "Sau này xe tự lái AI có thể thay thế hoàn toàn tài xế con người không hả Cô?",
      "Làm thế nào để học sinh tụi em rèn luyện kỹ năng để không bị AI thay thế ạ?"
    ]
  },
  {
    id: "lop12-bai-3",
    grade: "12",
    topic: "Chủ đề 2. MẠNG MÁY TÍNH VÀ INTERNET",
    title: "Bài 3. Một số thiết bị mạng thông dụng",
    description: "Nhận diện và phân biệt chức năng Switch, Router, Access Point và Modem.",
    content: `### 1. Thiết bị kết nối LAN
Switch (chuyển mạch gói chính xác theo địa chỉ MAC) và Access Point (phát sóng Wi-Fi).
### 2. Thiết bị định tuyến và kết nối Internet
Router (định tuyến gói tin, tìm đường đi tối ưu) và Modem (chuyển đổi tín hiệu Digital và Analog).
### 3. Đường truyền vật lý
Cáp xoắn đôi (UTP) khoảng cách ngắn, cáp quang truyền tín hiệu ánh sáng siêu tốc độ khoảng cách xa.`,
    suggestedQuestions: [
      "Cô ơi, tại sao Router lại có thể kết nối được các mạng máy tính khác nhau ạ?",
      "Switch và Hub khác nhau như thế nào trong truyền dữ liệu hả Cô?",
      "Tại sao thỉnh thoảng cáp quang biển vẫn bị đứt và làm mạng chậm vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-4",
    grade: "12",
    topic: "Chủ đề 2. MẠNG MÁY TÍNH VÀ INTERNET",
    title: "Bài 4. Giao thức mạng",
    description: "Kiến trúc phân tầng, bộ giao thức TCP/IP, địa chỉ IPv4 và IPv6.",
    content: `### 1. Khái niệm giao thức
Quy tắc chuẩn hóa truyền nhận thông tin trên mạng giúp các hệ thống khác nhau có thể giao tiếp.
### 2. Bộ giao thức TCP/IP
Chia làm 4 tầng: Ứng dụng (HTTP, FTP), Truyền tải (TCP kết nối tin cậy, UDP truyền nhanh), Mạng (IP), và Liên kết.
### 3. Địa chỉ IP
IPv4 (32 bit, 4 nhóm số thập phân) và IPv6 (128 bit, 8 nhóm số hexadecimal) giải quyết bùng nổ IoT.`,
    suggestedQuestions: [
      "Cô ơi, tại sao giao thức TCP lại an toàn và đáng tin cậy hơn giao thức UDP thế Cô?",
      "Địa chỉ IP công cộng (Public IP) và địa chỉ IP nội bộ (Private IP) khác nhau thế nào ạ?",
      "Làm sao để biết địa chỉ IP hiện tại của máy tính em đang dùng vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-5",
    grade: "12",
    topic: "Chủ đề 2. MẠNG MÁY TÍNH VÀ INTERNET",
    title: "Bài 5. Thực hành chia sẻ tài nguyên trên mạng",
    description: "Chia sẻ thư mục, máy in trong mạng cục bộ LAN và phân quyền an toàn.",
    content: `### 1. Chia sẻ thư mục trên Windows
Thiết lập Sharing trong Properties với các quyền: Read (chỉ đọc), Change (sửa đổi), Full Control (toàn quyền).
### 2. Chia sẻ máy in qua mạng LAN
Máy tính chủ kết nối máy in bật tính năng chia sẻ, các máy trạm kết nối qua địa chỉ IP máy chủ để in từ xa.
### 3. Bảo mật chia sẻ
Sử dụng mật khẩu mạng, chỉ chia sẻ đúng thư mục cần thiết, không chia sẻ thư mục hệ thống.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để truy cập vào một thư mục đã được bạn khác chia sẻ trong mạng LAN ạ?",
      "Tại sao khi em chia sẻ thư mục rồi mà các máy khác vẫn báo lỗi truy cập hả Cô?",
      "Có thể chia sẻ ổ đĩa cứng C hoặc D cho máy khác qua mạng được không vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-6",
    grade: "12",
    topic: "Chủ đề 3. ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ",
    title: "Bài 6. Giao tiếp và ứng xử trong không gian mạng",
    description: "Ứng xử số văn minh, phòng chống bắt nạt mạng, lừa đảo trực tuyến và bản quyền tác giả.",
    content: `### 1. Ứng xử văn minh
Tôn trọng người khác trên không gian mạng, không dùng từ ngữ bôi nhọ hay công kích cá nhân.
### 2. Phòng chống tiêu cực
Nhận diện bắt nạt mạng (Cyberbullying), ngăn chặn phát tán tin giả (Fake News) và các tin nhắn lừa đảo giả mạo (Phishing).
### 3. Bản quyền tác giả số
Tuân thủ Luật sở hữu trí tuệ, luôn trích dẫn nguồn khi sử dụng tài liệu, không dùng phần mềm bẻ khóa lậu.`,
    suggestedQuestions: [
      "Cô ơi, nếu em lỡ chia sẻ một tin giả lên Facebook do không biết thì có bị phạt không ạ?",
      "Cách nhận biết một trang web đăng tin giả mạo hoặc lừa đảo tài khoản thế nào hả Cô?",
      "Em bị người khác bắt nạt mạng xã hội thì phải làm gì thế Cô?"
    ]
  },
  {
    id: "lop12-bai-7",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 7. HTML và cấu trúc trang web",
    description: "Tìm hiểu ngôn ngữ HTML, các thẻ cơ bản và cấu trúc khung xương trang web.",
    content: `### 1. HTML là gì?
HyperText Markup Language - Ngôn ngữ đánh dấu siêu văn bản định nghĩa cấu trúc của trang web.
### 2. Cấu trúc trang chuẩn
Bao gồm các cặp thẻ: \`<!DOCTYPE html>\`, \`<html>\`, \`<head>\` (chứa siêu dữ liệu), và \`<body>\` (chứa nội dung hiển thị).
### 3. Thẻ cơ bản
Thẻ tiêu đề \`<h1>\` đến \`<h6>\` và thẻ đoạn văn \`<p>\`.`,
    sampleCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Trang web</title>
</head>
<body>
    <h1>Chào mừng đến với website</h1>
    <p>Nội dung trang web viết ở đây.</p>
</body>
</html>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, thẻ meta charset=\"UTF-8\" có nhiệm vụ gì thế Cô?",
      "Một trang web có thể viết nhiều thẻ h1 được không hay chỉ nên viết một thẻ hả Cô?",
      "Trình duyệt web đọc và biên dịch file HTML như thế nào thế Cô?"
    ]
  },
  {
    id: "lop12-bai-8",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 8. Định dạng văn bản",
    description: "Sử dụng các thẻ định dạng in đậm, in nghiêng, gạch chân và khối dòng div/span.",
    content: `### 1. Định dạng chữ
\`<strong>\` / \`<b>\` (in đậm), \`<em>\` / \`<i>\` (in nghiêng), và \`<u>\` (gạch chân).
### 2. Ngắt dòng và đường kẻ
Thẻ ngắt dòng \`<br>\` và thẻ tạo đường kẻ ngang phân cách \`<hr>\`.
### 3. Khối nhóm
Thẻ \`<div>\` tạo khối độc lập xuống dòng mới, thẻ \`<span>\` định dạng nội khối trên cùng một dòng.`,
    sampleCode: `<p>Môn Tin học 12 rất <strong>quan trọng</strong>.</p>
<hr>
<div>Nhóm khối div kèm chữ <span style="color:red;">màu đỏ</span> bằng thẻ span.</div>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, thẻ strong và thẻ b khác nhau thế nào khi đều làm chữ in đậm ạ?",
      "Tại sao thẻ div lại nhảy xuống dòng mới còn thẻ span thì nằm chung dòng hả Cô?",
      "Khi nào chúng ta nên sử dụng thẻ ngắt dòng <br> thay vì viết thẻ p mới vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-9",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 9. Tạo danh sách, bảng",
    description: "Xây dựng danh sách có thứ tự, không thứ tự và bảng dữ liệu khoa học.",
    content: `### 1. Tạo danh sách
Danh sách không thứ tự \`<ul>\` và có thứ tự \`<ol>\` chứa các thẻ mục \`<li>\`.
### 2. Tạo bảng biểu
Thẻ \`<table>\` bao ngoài, các hàng \`<tr>\`, ô tiêu đề \`<th>\` và ô dữ liệu \`<td>\`.
### 3. Gộp ô bảng
Sử dụng thuộc tính \`colspan\` để gộp cột ngang, và \`rowspan\` để gộp hàng dọc.`,
    sampleCode: `<table border="1">
    <tr>
        <th>Môn Học</th>
        <th>Tiết</th>
    </tr>
    <tr>
        <td>Tin Học 12</td>
        <td>Tiết 1</td>
    </tr>
</table>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, làm thế nào để thay đổi dấu chấm tròn mặc định của thẻ ul thành hình vuông ạ?",
      "Thuộc tính colspan và rowspan hoạt động thế nào khi em muốn gộp ô bảng thời khóa biểu hả Cô?",
      "Tại sao bảng của em tạo ra lại không thấy đường viền chia ô vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-10",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 10. Tạo liên kết",
    description: "Sử dụng thẻ neo anchor để tạo siêu liên kết nội bộ, liên kết ngoài và mở tab mới.",
    content: `### A. LÝ THUYẾT CHI TIẾT

### 1. Siêu văn bản và đường dẫn

* **Siêu văn bản (Hypertext):** Là loại văn bản đặc biệt, không chỉ chứa ký tự thông thường mà còn tích hợp nhiều dạng dữ liệu khác nhau như **văn bản, âm thanh, hình ảnh, video**,... và quan trọng nhất là chứa các **liên kết (hyperlinks)** trỏ tới các siêu văn bản khác.
* **Siêu liên kết (Hyperlink):** Đóng vai trò là một tham chiếu (đường dẫn kết nối) để liên kết từ siêu văn bản này tới một siêu văn bản khác, hoặc trỏ đến một vị trí cụ thể khác trong cùng một trang web.
* **Thẻ HTML tạo siêu liên kết:** Sử dụng cặp thẻ neo \`<a>\` (Anchor) với thuộc tính bắt buộc \`href\` (Hypertext Reference) để chứa địa chỉ đích:
  \`\`\`html
  <a href="URL">Nội dung hiển thị</a>
  \`\`\`
  *Ví dụ:* \`<a href="https://vi.hotels.com">Khách sạn Đà Nẵng</a>\`

---

#### 📌 Khái niệm URL và các loại tài liệu liên kết
* **URL (Uniform Resource Locator):** Là địa chỉ (đường dẫn) định vị tài nguyên thống nhất trên Internet, dùng làm tham chiếu đến tài liệu đích.
* **Tài liệu được liên kết bao gồm:**
  - Trang web khác (\`.html\`, \`.php\`,...)
  - Đoạn văn bản cụ thể.
  - Hình ảnh tĩnh hoặc động (\`.jpg\`, \`.png\`, \`.gif\`).
  - Tệp âm thanh (\`.mp3\`, \`.wav\`).
  - Video (\`.mp4\`, \`.avi\`).
  - Các tệp tin tài liệu khác (\`.pdf\`, \`.zip\`,...).

---

#### 🌐 Phân biệt Đường dẫn tuyệt đối và Đường dẫn tương đối

##### a. Đường dẫn tuyệt đối (Absolute Path)
* **Khái niệm:** Cung cấp một địa chỉ đầy đủ, chi tiết và duy nhất để tìm thấy tài nguyên trên không gian mạng Internet toàn cầu, bất kể trang web hiện hành đang nằm ở đâu.
* **Cấu trúc bao gồm:** **Giao thức + Tên miền (Domain) + Đường dẫn chi tiết**.
* *Ví dụ:* \`<a href="https://www.danang.edu.vn/homedn">Sở Giáo dục và Đào tạo</a>\`
* **Phân tích cấu trúc chi tiết:**
  - \`https://\` : **Giao thức** (Protocol) dùng để truyền tải siêu văn bản an toàn.
  - \`www.danang.edu.vn\` : **Tên miền** (Domain Name) định danh của máy chủ lưu trữ website.
  - \`/homedn\` : **Tên đường dẫn chi tiết** (Path) dẫn tới thư mục hoặc tệp tin cụ thể trong máy chủ.

##### b. Đường dẫn tương đối (Relative Path)
* **Khái niệm:** Cung cấp đường liên kết tới một tài liệu khác nằm trong cùng một hệ thống website (cục bộ) mà **không cần** chỉ định giao thức hay tên miền. Đường dẫn tương đối xác định vị trí tài nguyên dựa trên mối tương quan với vị trí của thư mục chứa trang web hiện hành.
* *Ví dụ:* \`<a href="bai_tap/bai_tap_1.html">Bài tập 1</a>\`
* **Phân tích cấu trúc chi tiết:**
  - \`bai_tap/bai_tap_1.html\` : **Tên đường dẫn tương đối** chỉ ra rằng từ thư mục hiện hành, đi vào thư mục con \`bai_tap\`, sau đó mở tệp tin \`bai_tap_1.html\`.

---

### 2. Các cách liên kết tới một trang web

#### a) Liên kết tới một trang web khác (Liên kết ngoài - External Link)
Liên kết từ một trang web hiện tại tới một trang web khác hoàn toàn trên Internet. Trường hợp này bắt buộc phải sử dụng **Đường dẫn tuyệt đối**.
* **Cú pháp:** \`<a href="Đường dẫn tuyệt đối">Nội dung hiển thị</a>\`
* *Ví dụ thực tế:*
  \`\`\`html
  <a href="https://vi.hotels.com/index.html">Khách sạn Đà Nẵng</a>
  \`\`\`

#### b) Liên kết đến một vị trí khác trong cùng website (Liên kết trong - Internal Link)
Liên kết trỏ tới các tài nguyên hoặc trang web con khác nằm trong cùng một website. Trường hợp này sử dụng **Đường dẫn tương đối**. Các tình huống điều hướng thư mục thường gặp bao gồm:

1. **Liên kết trang web cùng thư mục:**
   Khi tệp tin đích nằm cùng thư mục với trang web hiện hành, ta chỉ cần viết tên tệp tin đó.
   \`\`\`html
   <a href="thong_tin.html">Giới thiệu về trang web</a>
   \`\`\`

2. **Liên kết tới trang web khác thư mục con (Thư mục cấp dưới):**
   Chỉ định tên thư mục con trước, sau đó là dấu gạch chéo \`/\` và tên tệp tin đích.
   \`\`\`html
   <a href="bai_tap/bai_tap_1.html">Bài tập 1</a>
   \`\`\`

3. **Liên kết tới trang web ở thư mục mức trên (Thư mục cha / cấp trên):**
   Sử dụng ký hiệu hai dấu chấm liền nhau và gạch chéo \`../\` để nhảy lùi ra ngoài một cấp thư mục, sau đó trỏ đến tệp tin đích.
   \`\`\`html
   <a href="../index.html">Quay lại trang chủ</a>
   \`\`\`

4. **Liên kết tới vị trí khác trong cùng một trang web (Neo trang - Anchor link / Bookmark):**
   * **Bước 1 (Tạo điểm neo):** Đặt thuộc tính \`id\` duy nhất cho thẻ HTML tại vị trí muốn cuộn tới.
     \`\`\`html
     <h2 id="Dau_trang">GIỚI THIỆU VỀ TRANG WEB</h2>
     \`\`\`
   * **Bước 2 (Tạo liên kết trỏ tới điểm neo):** Đặt ký tự thăng \`#\` kèm theo tên \`id\` vào thuộc tính \`href\` của thẻ \`<a>\`.
     \`\`\`html
     <a href="#Dau_trang">Về đầu trang</a>
     \`\`\`

5. **Tạo liên kết cho hình ảnh (Biến ảnh thành nút bấm chuyển hướng):**
   Lồng thẻ hình ảnh \`<img>\` vào bên trong cặp thẻ mở và đóng \`<a>...</a>\`. Khi người dùng nhấp vào ảnh, trình duyệt sẽ chuyển tới trang được liên kết.
   \`\`\`html
   <a href="bai_tap_2.html">
       <img src="images/sun.png" alt="Mặt trời">
   </a>
   \`\`\`

---

### 3. Thuộc tính bổ trợ quan trọng: \`target="_blank"\`
* Theo mặc định, khi click vào liên kết, trang web mới sẽ tải đè lên tab trình duyệt hiện hành của người dùng.
* Để **mở liên kết ở một tab mới** (giúp người dùng không bị mất trang hiện tại), ta thêm thuộc tính \`target="_blank"\` vào trong thẻ \`<a>\`.
  \`\`\`html
  <a href="https://google.com" target="_blank">Tìm kiếm trên Google</a>
  \`\`\``,
    sampleCode: `<!-- 1. Liên kết ngoài bằng đường dẫn tuyệt đối -->
<a href="https://vi.hotels.com/index.html" target="_blank">Khách sạn Đà Nẵng</a>

<!-- 2. Liên kết nội bộ cùng thư mục -->
<a href="thong_tin.html">Giới thiệu về trang web</a>

<!-- 3. Liên kết nội bộ đi vào thư mục con -->
<a href="bai_tap/bai_tap_1.html">Bài tập 1</a>

<!-- 4. Liên kết nội bộ nhảy ra thư mục cha cấp trên -->
<a href="../index.html">Quay lại trang chủ</a>

<!-- 5. Liên kết điểm neo trong cùng một trang -->
<h2 id="Dau_trang">GIỚI THIỆU VỀ TRANG WEB</h2>
<p>Nội dung trang web...</p>
<a href="#Dau_trang">Về đầu trang</a>

<!-- 6. Biến hình ảnh thành liên kết chuyển hướng -->
<a href="bai_tap_2.html">
    <img src="images/sun.png" alt="Mặt trời" width="120" height="120">
</a>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, sự khác biệt giữa đường dẫn tương đối và tuyệt đối là gì ạ?",
      "Làm thế nào để tạo liên kết tự động mở ứng dụng gửi Email hả Cô?",
      "Có thể biến một hình ảnh thành nút bấm liên kết được không vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-11",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 11. Chèn tệp tin đa phương tiện và khung nội tuyến vào trang web",
    description: "Tích hợp hình ảnh, âm thanh, video và nhúng website ngoài bằng iframe.",
    content: `### 1. Thẻ chèn ảnh \`<img>\`
Thẻ tự đóng, có thuộc tính \`src\` (đường dẫn ảnh) và \`alt\` (chữ thay thế khi ảnh lỗi), co giãn bằng \`width\`, \`height\`.
### 2. Âm thanh & Video
Thẻ \`<audio>\` và \`<video>\` kết hợp thuộc tính \`controls\` hiển thị nút phát/tạm dừng.
### 3. Khung nội tuyến \`<iframe>\`
Nhúng một trang web bên ngoài trực tiếp vào trang hiện tại (như Youtube, Google Maps).`,
    sampleCode: `<img src="images/logo.png" alt="Logo" width="100">
<video src="intro.mp4" controls width="320"></video>
<iframe src="https://maps.google.com" width="300" height="200"></iframe>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, tại sao khi em chèn video mà quên viết 'controls' thì không có nút phát ạ?",
      "Làm sao để ảnh không bị méo mó khi thay đổi kích thước width và height hả Cô?",
      "Nhúng iframe có bị giới hạn bảo mật gì từ các trang web lớn như Facebook hay Google không ạ?"
    ]
  },
  {
    id: "lop12-bai-12",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 12. Tạo biểu mẫu",
    description: "Thiết kế các trường nhập liệu form như input, textarea, select và button gửi thông tin.",
    content: `### 1. Thẻ biểu mẫu \`<form>\`
Gom tập hợp các ô nhập liệu của người dùng để gửi về máy chủ xử lý dữ liệu.
### 2. Các thẻ nhập liệu
Thẻ \`<input>\` với thuộc tính \`type\` (text, password, email, radio, checkbox), ô nhập dài \`<textarea>\`.
### 3. Lựa chọn và nút bấm
Thẻ \`<select>\` kèm các \`<option>\` tạo dropdown menu, và nút bấm \`<button type=\"submit\">\`.`,
    sampleCode: `<form action="/submit" method="POST">
    <label>Họ tên:</label>
    <input type="text" name="name" required><br>
    <button type="submit">Gửi</button>
</form>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, thuộc tính action và method trong thẻ form dùng để làm gì ạ?",
      "Làm sao bắt buộc người dùng nhập thông tin vào ô input mới cho gửi form hả Cô?",
      "Tại sao khi chọn nút giới tính Radio, em chọn được cả hai mà không tự bỏ chọn nút kia ạ?"
    ]
  },
  {
    id: "lop12-bai-13",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 13. Khái niệm, vai trò của CSS",
    description: "Bản chất của Cascading Style Sheets (CSS), vai trò và 3 cách nhúng CSS.",
    content: `### 1. CSS là gì?
Cascading Style Sheets - Ngôn ngữ định kiểu giao diện giúp định hình vẻ đẹp cho mã HTML thô.
### 2. Ba cách nhúng CSS
CSS nội dòng (thuộc tính style), nội bộ (trong thẻ style ở head), và bên ngoài (file .css liên kết qua thẻ link).
### 3. Cấu trúc câu lệnh
Selector (bộ chọn phần tử) { property (thuộc tính): value (giá trị); }.`,
    sampleCode: `body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}
h1 {
    color: #1a73e8;
}`,
    codeLanguage: "css",
    suggestedQuestions: [
      "Cô ơi, tại sao dùng file CSS ngoài (External CSS) lại là tốt nhất so với 2 cách còn lại ạ?",
      "Trình duyệt ưu tiên luật CSS nào hơn nếu định kiểu trùng lặp ở cả 3 cách nhúng hả Cô?",
      "Làm sao liên kết file CSS ngoài vào trang HTML chuẩn nhất ạ?"
    ]
  },
  {
    id: "lop12-bai-14",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 14. Định dạng văn bản bằng CSS",
    description: "Tùy biến phông chữ, kích thước, độ dày, căn lề và khoảng cách dòng bằng CSS.",
    content: `### 1. Phông chữ (Fonts)
\`font-family\` chọn kiểu chữ (có font dự phòng), \`font-size\` kích thước chữ (\`px\`, \`rem\`), \`font-weight\` độ đậm.
### 2. Căn lề và khoảng cách
\`text-align\` căn chỉnh lề (left, right, center, justify), \`line-height\` khoảng cách dòng giúp dễ đọc.
### 3. Trang trí và đổi kiểu
\`text-decoration\` (gạch chân, xóa gạch chân), \`text-transform\` (in hoa \`uppercase\`, in thường, viết hoa đầu từ).`,
    sampleCode: `.text-content {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    line-height: 1.6;
    text-align: justify;
    text-decoration: none;
}`,
    codeLanguage: "css",
    suggestedQuestions: [
      "Cô ơi, đơn vị rem và px khác nhau thế nào, tại sao nên dùng rem vậy Cô?",
      "Làm sao để loại bỏ đường gạch chân mặc định của các thẻ liên kết a hả Cô?",
      "Làm thế nào để viết hoa chữ cái đầu dòng đoạn văn tự động bằng CSS vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-15",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 15. Tạo màu cho chữ và nền",
    description: "Sử dụng các hệ màu Hex, RGB, RGBA trong CSS thiết lập màu văn bản và màu nền chuyển sắc.",
    content: `### 1. Khai báo hệ màu
Sử dụng tên màu tiếng Anh, mã màu Hex (\`#ff0000\`), hệ màu \`rgb()\` và \`rgba()\` có kênh alpha chỉnh độ mờ từ 0 đến 1.
### 2. Màu chữ & Màu nền
Thuộc tính \`color\` tô màu cho chữ, và \`background-color\` tô màu nền khối.
### 3. Nền chuyển sắc Gradients
Sử dụng \`background-image: linear-gradient()\` tạo dải màu chuyển mượt mà không cần dùng tệp hình ảnh.`,
    sampleCode: `.color-box {
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to right, red, yellow);
}`,
    codeLanguage: "css",
    suggestedQuestions: [
      "Cô ơi, chữ 'a' trong hệ màu RGBA có ý nghĩa gì thế Cô?",
      "Làm thế nào để lấy được mã màu Hex chính xác từ một bức ảnh chụp trên điện thoại hả Cô?",
      "Làm sao tạo dải màu chuyển sắc chạy chéo góc bằng linear-gradient hả Cô?"
    ]
  },
  {
    id: "lop12-bai-16",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 16. Định dạng khung",
    description: "Mô hình hộp Box Model gồm Margin, Border, Padding và Content.",
    content: `### 1. Khái niệm Box Model
Mọi phần tử HTML được coi như chiếc hộp gồm: Content (nội dung), Padding (khoảng đệm trong), Border (đường viền), và Margin (khoảng cách ngoài).
### 2. Bo tròn góc
Thuộc tính \`border-radius\` bo tròn các góc vuông của viền hộp.
### 3. Khóa kích thước hộp
Sử dụng \`box-sizing: border-box\` giúp cố định kích thước hộp không bị nở rộng khi tăng Padding hoặc Border.`,
    sampleCode: `.box-item {
    width: 200px;
    padding: 10px;
    border: 2px solid black;
    margin: 15px;
    box-sizing: border-box;
    border-radius: 8px;
}`,
    codeLanguage: "css",
    suggestedQuestions: [
      "Cô ơi, tại sao khi em thêm padding thì tổng kích thước hộp lại bị phình to ra vậy Cô?",
      "Làm sao để căn giữa một chiếc hộp div ra chính giữa trang web bằng margin hả Cô?",
      "Sự khác nhau cơ bản giữa Margin và Padding trong thiết kế thực tế là gì thế Cô?"
    ]
  },
  {
    id: "lop12-bai-17",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 17. Các mức ưu tiên của bộ chọn",
    description: "Quy tắc điểm độ ưu tiên specificity của các bộ chọn thẻ, class và ID trong CSS.",
    content: `### 1. Ý nghĩa quy tắc ưu tiên
Giải quyết mâu thuẫn khi có nhiều luật CSS cùng áp dụng định kiểu giao diện lên một thẻ HTML duy nhất.
### 2. Thang điểm ưu tiên tăng dần
Bộ chọn thẻ (1 điểm) -> Bộ chọn lớp class (10 điểm) -> Bộ chọn định danh ID (100 điểm) -> CSS nội dòng (1000 điểm).
### 3. Cưỡng chế bằng \`!important\`
Từ khóa đặt cuối giá trị có độ ưu tiên cao tuyệt đối, ép trình duyệt hiển thị. Nên hạn chế dùng.`,
    sampleCode: `p { color: black; } /* 1 điểm */
.text-item { color: blue; } /* 10 điểm */
#first-para { color: red; } /* 100 điểm */
.force-color { color: green !important; }`,
    codeLanguage: "css",
    suggestedQuestions: [
      "Cô ơi, nếu một thẻ vừa có ID vừa có Class thì màu sắc sẽ hiển thị theo ID hay Class ạ?",
      "Tại sao trong dự án thực tế người ta khuyên hạn chế sử dụng từ khóa !important ạ?",
      "Tính kế thừa trong CSS hoạt động như thế nào hả Cô?"
    ]
  },
  {
    id: "lop12-bai-18",
    grade: "12",
    topic: "Chủ đề 4. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH",
    title: "Bài 18. Thực hành tổng hợp thiết kế trang web",
    description: "Kết hợp HTML và CSS thiết kế trang blog hoặc giới thiệu cá nhân hoàn chỉnh.",
    content: `### 1. Phác thảo bố cục (Mockup)
Phân chia Header (đầu trang), Nav (menu điều hướng), Main (nội dung chính), Aside (sidebar phụ), và Footer (chân trang).
### 2. Viết khung xương HTML
Sử dụng các thẻ mang ngữ nghĩa (Semantic tags) để phân vùng rõ ràng cho trang web.
### 3. Định kiểu mỹ thuật CSS ngoài
Thiết lập phông chữ thống nhất, bảng màu hài hòa, căn chỉnh lề Box Model tạo bố cục cân đối.`,
    sampleCode: `<!DOCTYPE html>
<html>
<head>
    <title>Blog Cá Nhân</title>
    <style>
        body { font-family: sans-serif; margin: 0; }
        header { background: #333; color: white; text-align: center; padding: 15px; }
        nav { background: #444; text-align: center; padding: 5px; }
        nav a { color: white; margin: 10px; text-decoration: none; }
        main { padding: 20px; max-width: 800px; margin: auto; }
        footer { text-align: center; padding: 15px; background: #eee; }
    </style>
</head>
<body>
    <header><h1>Blog Của Em</h1></header>
    <nav><a href="#">Trang chủ</a><a href="#">Giới thiệu</a></nav>
    <main><h2>Bài thực hành đầu tiên</h2><p>Nội dung trang web.</p></main>
    <footer><p>&copy; 2026 Bản quyền thuộc về Em</p></footer>
</body>
</html>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, làm sao đưa trang web em vừa code lên mạng cho các bạn cùng xem được ạ?",
      "Các thẻ semantic như header, nav, main khác gì so với thẻ div thông thường hả Cô?",
      "Làm sao chia bố cục trang web thành 2 cột: chính 70% và sidebar 30% vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-19",
    grade: "12",
    topic: "Chủ đề 5. HƯỚNG NGHIỆP WITH TIN HỌC",
    title: "Bài 19. Dịch vụ sửa chữa và bảo trì máy tính",
    description: "Công việc kỹ thuật viên phần cứng: Lắp ráp, cài đặt hệ điều hành và xử lý lỗi.",
    content: `### 1. Vai trò công việc
Bảo dưỡng phần cứng, nâng cấp máy tính, cài đặt hệ điều hành, khắc phục lỗi hệ thống giúp thiết bị số chạy trơn tru.
### 2. Nghiệp vụ chuyên môn
Lắp ráp tương thích linh kiện (CPU, RAM, SSD), vệ sinh bụi bẩn, tra keo tản nhiệt CPU định kỳ.
### 3. Chẩn đoán sự cố
Nhận diện màn hình xanh chết chóc (BSOD), lỗi lỏng RAM không lên hình, xung đột driver thiết bị.`,
    suggestedQuestions: [
      "Cô ơi, tại sao việc vệ sinh máy tính và tra keo tản nhiệt định kỳ lại quan trọng ạ?",
      "Khi máy bị lỗi màn hình xanh (BSOD) thì em nên làm gì để chẩn đoán lỗi hả Cô?",
      "Làm thế nào để phân biệt lỗi do hỏng phần cứng và lỗi do xung đột phần mềm ạ?"
    ]
  },
  {
    id: "lop12-bai-20",
    grade: "12",
    topic: "Chủ đề 5. HƯỚNG NGHIỆP WITH TIN HỌC",
    title: "Bài 20. Nhóm nghề quản trị trong ngành Công nghệ thông tin",
    description: "Khám phá công việc Quản trị hệ thống, Quản trị mạng và Quản trị CSDL (DBA).",
    content: `### 1. Quản trị hệ thống
Cài đặt, cấu hình máy chủ vận hành 24/7, quản lý tài khoản người dùng và thực hiện sao lưu.
### 2. Quản trị mạng
Thiết kế, xây dựng hạ tầng mạng truyền thông (Switch, Router, Wi-Fi), cấu hình tường lửa ngăn chặn xâm nhập.
### 3. Quản trị CSDL (DBA)
Đảm bảo an toàn, bảo mật CSDL doanh nghiệp, tối ưu hóa truy vấn SQL và thiết lập kế hoạch sao lưu khôi phục dữ liệu.`,
    suggestedQuestions: [
      "Cô ơi, học sinh muốn theo nghề Quản trị mạng thì cần chuẩn bị những gì ạ?",
      "Sự khác nhau giữa Kỹ sư lập trình (Developer) và Kỹ sư quản trị mạng là gì hả Cô?",
      "Tại sao công việc Quản trị cơ sở dữ liệu (DBA) lại cực kỳ quan trọng trong các ngân hàng vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-21",
    grade: "12",
    topic: "Chủ đề 5. HƯỚNG NGHIỆP WITH TIN HỌC",
    title: "Bài 21. Hội thảo hướng nghiệp",
    description: "Xu hướng phát triển nhân lực CNTT, cách viết CV và rèn luyện kỹ năng mềm.",
    content: `### 1. Xu hướng nhân lực
Cơ hội nghề nghiệp hấp dẫn: Kỹ sư AI, Chuyên gia phân tích dữ liệu, Kỹ sư bảo mật, Lập trình viên Full-stack.
### 2. Kỹ năng cốt lõi
Khả năng tự học tự nghiên cứu công nghệ mới, ngoại ngữ (Tiếng Anh), kỹ năng giao tiếp làm việc nhóm.
### 3. Viết CV chuyên nghiệp
Trình bày rõ mục tiêu nghề nghiệp, học vấn, các dự án thực hành cá nhân và chứng chỉ đã đạt được.`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để rèn luyện kỹ năng tự học tốt nhất trước sự bùng nổ của AI ạ?",
      "Cơ hội thu nhập và làm việc ở nước ngoài của nghề phát triển phần mềm thế nào hả Cô?",
      "Học sinh cấp 3 nên bắt đầu tự xây dựng những dự án nhỏ nào để đưa vào CV hả Cô?"
    ]
  },
  {
    id: "lop12-bai-22",
    grade: "12",
    topic: "Chủ đề 6. MÁY TÍNH VÀ XÃ HỘI TRI THỨC (thực hành)",
    title: "Bài 22. Thực hành kết nối các thiết bị số",
    description: "Thực hành kết nối điện thoại, máy ảnh với máy tính để sao chép dữ liệu.",
    content: `### 1. Kết nối có dây
Sử dụng cáp USB (Type-C / Lightning) nối điện thoại với máy tính, bật chế độ truyền tệp (MTP) trên điện thoại để sao chép ảnh, tài liệu.
### 2. Kết nối không dây
Bật ghép đôi Bluetooth giữa 2 thiết bị để chia sẻ nhanh tệp tin, hoặc đồng bộ hóa qua dịch vụ lưu trữ đám mây (Google Drive, iCloud).
### 3. An toàn kết nối
Kiểm tra quét virus, tránh kết nối điện thoại lạ vào máy tính chứa dữ liệu mật.`,
    suggestedQuestions: [
      "Cô ơi, tại sao em cắm cáp USB nối điện thoại với máy tính mà chỉ thấy sạc pin ạ?",
      "Cách gửi file ảnh chất lượng cao không bị nén mờ hình ảnh từ điện thoại sang máy tính thế nào hả Cô?",
      "Mã độc di động có thể lây lan sang máy tính qua kết nối dây cáp USB được không vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-23",
    grade: "12",
    topic: "Chủ đề 7. ỨNG DỤNG TIN HỌC",
    title: "Bài 23. Chuẩn bị xây dựng trang web",
    description: "Xác định mục tiêu, thiết lập Sitemap và cấu trúc thư mục tài nguyên dự án web.",
    content: `### 1. Mục tiêu & Đối tượng
Xác định rõ trang web làm ra với mục đích gì (giới thiệu bản thân, chia sẻ học tập), chọn bảng màu chủ đạo.
### 2. Sơ đồ trang (Sitemap)
Lập bản đồ sơ đồ liên kết giữa trang chủ (\`index.html\`), trang giới thiệu (\`about.html\`), trang liên hệ (\`contact.html\`).
### 3. Cấu trúc thư mục
Tạo thư mục dự án gốc, bên trong tạo các thư mục con \`css/\`, \`images/\` để quản lý tài nguyên gọn gàng.`,
    suggestedQuestions: [
      "Cô ơi, tại sao việc thiết kế sơ đồ Sitemap lại quan trọng trước khi lập trình web ạ?",
      "Để lộn xộn ảnh chung với file HTML ở thư mục gốc có bị lỗi hiển thị không hả Cô?",
      "Làm sao lựa chọn bảng màu sắc hài hòa nhất cho giao diện web vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-24",
    grade: "12",
    topic: "Chủ đề 7. ỨNG DỤNG TIN HỌC",
    title: "Bài 24. Xây dựng phần đầu trang web",
    description: "Viết HTML và CSS thiết kế phần Header chứa logo và thanh menu điều hướng chính.",
    content: `### 1. Vai trò Header
Định danh thương hiệu website và dẫn dắt người dùng truy cập nhanh sang các trang con khác.
### 2. Khung HTML Header
Sử dụng thẻ semantic \`<header>\`, thẻ \`<nav>\` chứa danh sách không thứ tự \`<ul>\` để tạo menu.
### 3. Định kiểu CSS menu ngang
Sử dụng \`list-style: none\` xóa dấu chấm tròn, dùng \`display: flex\` hoặc \`inline-block\` để dàn hàng ngang menu.`,
    sampleCode: `<header>
    <div class="logo">Logo</div>
    <nav>
        <ul>
            <li><a href="index.html">Trang chủ</a></li>
            <li><a href="about.html">Giới thiệu</a></li>
        </ul>
    </nav>
</header>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, làm thế nào để biến menu danh sách dọc thành một hàng ngang bằng CSS ạ?",
      "Làm sao tạo hiệu ứng đổi màu chữ nổi bật khi rê chuột vào thanh menu hả Cô?",
      "Làm thế nào để thanh menu cố định ở trên cùng màn hình khi cuộn trang web vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-25",
    grade: "12",
    topic: "Chủ đề 7. ỨNG DỤNG TIN HỌC",
    title: "Bài 25. Xây dựng phần thân và chân trang web",
    description: "Thiết kế khu vực Main Content, Aside Sidebar và phần chân trang Footer.",
    content: `### 1. Phần thân trang (Main Content)
Sử dụng thẻ semantic \`<main>\` chứa nội dung cốt lõi chính, thẻ \`<section>\` chia nhỏ chủ đề bài viết.
### 2. Cột phụ Sidebar (\`<aside>\`)
Chứa các bài viết liên quan xem nhiều, liên kết mạng xã hội, quảng cáo hoặc thông tin tác giả.
### 3. Chân trang Footer
Sử dụng thẻ \`<footer>\` ghi thông tin liên hệ, bản quyền tác quyền (&copy;) và điều khoản bảo mật.`,
    sampleCode: `<main>
    <section><h2>Nội dung chính</h2></section>
    <aside><h3>Cột bên</h3></aside>
</main>
<footer><p>&copy; 2026 Bản quyền Lớp Học Cô Thuý Hào</p></footer>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, làm sao để cố định phần Footer luôn nằm dưới cùng màn hình khi nội dung ít ạ?",
      "Thẻ aside có bắt buộc phải hiển thị bên cạnh không hay đặt ở đâu cũng được hả Cô?",
      "Làm thế nào để hiển thị ký hiệu bản quyền hình chữ C trong vòng tròn (©) vậy Cô?"
    ]
  },
  {
    id: "lop12-bai-26",
    grade: "12",
    topic: "Chủ đề 7. ỨNG DỤNG TIN HỌC",
    title: "Bài 26. Liên kết và thanh điều hướng",
    description: "Đồng bộ liên kết menu giữa các trang HTML con giúp người dùng di chuyển mượt mà.",
    content: `### 1. Đồng bộ menu liên kết
Thanh menu điều hướng ở đầu trang của mọi file HTML (\`index.html\`, \`about.html\`) bắt buộc phải viết giống nhau để liên kết các trang với nhau.
### 2. Liên kết href chính xác
Khai báo \`href=\"index.html\"\` trỏ về Trang chủ, \`href=\"about.html\"\` trỏ về Giới thiệu.
### 3. Đánh dấu active trang hiện tại
Thêm class \`class=\"active\"\` vào thẻ menu tương ứng để đổi màu làm nổi bật trang mà người dùng đang truy cập xem.`,
    sampleCode: `<nav class="menu">
    <a href="index.html">Trang chủ</a>
    <a href="about.html" class="active">Giới thiệu</a>
</nav>
<style>
    .menu a.active { color: #ff5722; font-weight: bold; }
</style>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, tại sao khi em bấm liên kết menu trình duyệt lại báo lỗi 404 Not Found ạ?",
      "Làm sao để khi nhấp liên kết trang tự động cuộn xuống vị trí mong muốn mượt mà hả Cô?",
      "Có cách nào viết thanh menu một lần mà dùng chung cho tất cả trang không phải copy không Cô?"
    ]
  },
  {
    id: "lop12-bai-27",
    grade: "12",
    topic: "Chủ đề 7. ỨNG DỤNG TIN HỌC",
    title: "Bài 27. Biểu mẫu trên trang web",
    description: "Tích hợp Form liên hệ góp ý, thiết lập thuộc tính validate hợp lệ HTML5.",
    content: `### 1. Form liên hệ (\`contact.html\`)
Cho phép người dùng gõ nội dung thắc mắc và bấm nút gửi thông tin về ban quản lý website.
### 2. Thuộc tính kiểm tra (Validation)
\`required\` bắt buộc điền thông tin, \`placeholder\` dòng chữ gợi ý mờ, \`minlength\` giới hạn độ dài ký tự tối thiểu.
### 3. Thẩm mỹ nút nhấn
Sử dụng CSS đổi màu đường viền input khi nhấp chuột focus, tạo nút bấm nổi bật thu hút người xem.`,
    sampleCode: `<form action="/contact" method="POST">
    <input type="text" placeholder="Họ tên của em" required>
    <input type="email" placeholder="Email liên hệ" required>
    <button type="submit">Gửi Tin Nhắn</button>
</form>`,
    codeLanguage: "html",
    suggestedQuestions: [
      "Cô ơi, làm thế nào để khi click vào label chữ thì tự động nhảy trỏ chuột vào ô input tương ứng ạ?",
      "Làm sao thiết kế hiệu ứng viền ô input tự phát sáng đổi màu xanh dương khi click focus hả Cô?",
      "Sau khi người dùng bấm gửi form, làm thế nào để thông tin đó tự động gửi về hòm thư Gmail của em ạ?"
    ]
  },
  {
    id: "lop12-bai-28",
    grade: "12",
    topic: "Chủ đề 7. ỨNG DỤNG TIN HỌC",
    title: "Bài 28. Thực hành tổng hợp",
    description: "Rà soát gỡ lỗi Debug, tối ưu giao diện Responsive và đóng gói xuất bản website.",
    content: `### 1. Sửa lỗi Debugging
Chạy thử website, bấm \`F12\` mở công cụ Chrome DevTools kiểm tra tab **Console** phát hiện lỗi cú pháp và căn chỉnh Box Model.
### 2. Tối ưu hiển thị thích ứng (Responsive)
Đảm bảo trang web co giãn hiển thị đẹp đều trên cả máy tính bàn lẫn màn hình điện thoại di động nhỏ.
### 3. Đóng gói xuất bản
Dọn dẹp tệp tin dư thừa, nén tệp tin định dạng \`.zip\` nộp bài hoặc đăng tải lên hosting tĩnh miễn phí (GitHub Pages, Netlify).`,
    suggestedQuestions: [
      "Cô ơi, làm thế nào để kiểm tra giao diện trang web trên màn hình điện thoại ngay trên máy tính hả Cô?",
      "Công cụ Chrome DevTools giúp ích gì cho lập trình viên khi sửa lỗi layout CSS vậy Cô?",
      "Em có thể xuất bản trang web tĩnh hoàn toàn miễn phí lên đâu dễ dàng và uy tín nhất hả Cô?"
    ]
  }
];
