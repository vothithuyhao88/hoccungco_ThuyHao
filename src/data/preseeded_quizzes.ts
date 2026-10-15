import { LessonQuiz } from "../types";

export const PRESEEDED_QUIZZES: Record<string, LessonQuiz> = {
  "lop11-bai-10": {
    multipleChoice: [
      {
        id: "mc-1",
        type: "multiple_choice",
        level: "Nhận biết",
        question: "Công tác quản lý hồ sơ học sinh, điểm số, và xếp loại học tập trong nhà trường là ví dụ của hoạt động nào?",
        options: [
          "Xử lý đồ họa đa phương tiện",
          "Khai thác thông tin phục vụ quản lý",
          "Lập trình hệ điều hành",
          "Bảo mật mạng LAN"
        ],
        correctIndex: 1,
        explanation: "Chào em! Việc lưu giữ thông tin học sinh, theo dõi điểm số và xếp loại chính là hoạt động quản lý dữ liệu để phục vụ nhu cầu khai thác thông tin của nhà trường."
      },
      {
        id: "mc-2",
        type: "multiple_choice",
        level: "Thông hiểu",
        question: "Nhược điểm lớn nhất khi quản lý dữ liệu bằng các tệp Excel rời rạc hoặc sổ sách thủ công là gì?",
        options: [
          "Không thể nhập được ký tự tiếng Việt",
          "Dữ liệu bị dư thừa và không nhất quán",
          "Không thể in ra giấy được",
          "Tốn năng lượng điện khi lưu trữ"
        ],
        correctIndex: 1,
        explanation: "Đúng vậy em ạ! Khi lưu trữ rời rạc, thông tin dễ bị trùng lặp nhiều nơi (dư thừa), và khi sửa một nơi mà nơi khác chưa sửa thì sẽ dẫn đến hiện tượng mâu thuẫn (không nhất quán)."
      },
      {
        id: "mc-3",
        type: "multiple_choice",
        level: "Thông hiểu",
        question: "Thế nào là hiện tượng 'không nhất quán dữ liệu' (Inconsistency)?",
        options: [
          "Dữ liệu được lưu trữ ở nhiều định dạng tệp khác nhau như .xlsx và .txt",
          "Cùng một thông tin thực thể nhưng lại có các giá trị khác nhau ở các nơi lưu trữ khác nhau do cập nhật không đồng bộ",
          "Dữ liệu bị mất mát hoàn toàn khi máy tính bị mất điện đột ngột",
          "Dữ liệu không được phân quyền cho học sinh vào chỉnh sửa"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Ví dụ một học sinh chuyển lớp, tệp quản lý của giáo viên chủ nhiệm cũ đã sửa nhưng tệp của văn phòng trường chưa sửa, dẫn đến hai file có thông tin mâu thuẫn nhau."
      },
      {
        id: "mc-4",
        type: "multiple_choice",
        level: "Vận dụng",
        question: "Để giải quyết bài toán quản lý thông tin của một siêu thị lớn với hàng ngàn giao dịch mỗi ngày, giải pháp tối ưu nhất là:",
        options: [
          "Ghi chép vào sổ tay bán hàng thủ công",
          "Mỗi nhân viên thu ngân dùng một file Excel riêng trên máy tính cá nhân",
          "Sử dụng một Hệ cơ sở dữ liệu dùng chung để quản lý tập trung và đồng bộ hóa",
          "Sử dụng phần mềm Notepad để lưu trữ văn bản thô"
        ],
        correctIndex: 2,
        explanation: "Để phục vụ lượng khách lớn và giao dịch đồng thời, siêu thị cần sử dụng hệ CSDL tập trung giúp các máy thu ngân cùng cập nhật số lượng hàng tồn kho một cách đồng bộ và chính xác."
      },
      {
        id: "mc-5",
        type: "multiple_choice",
        level: "Vận dụng cao",
        question: "Khi nâng cấp từ quản lý file Excel đơn lẻ lên quản lý bằng Cơ sở dữ liệu, lợi ích chính về mặt cộng tác là gì?",
        options: [
          "Giảm dung lượng ổ cứng tối đa xuống còn 0 bytes",
          "Cho phép nhiều người dùng đồng thời truy cập, truy vấn và cập nhật dữ liệu một cách an toàn, tránh đè nén dữ liệu lên nhau",
          "Giúp máy tính tự động tăng tốc độ xử lý của CPU lên gấp đôi",
          "Không cần sử dụng kết nối mạng Internet vẫn đồng bộ được"
        ],
        correctIndex: 1,
        explanation: "Tuyệt vời! Hệ quản trị CSDL có cơ chế quản lý giao dịch (transactions) và kiểm soát truy cập đồng thời, giúp hàng trăm nhân viên có thể làm việc cùng lúc mà không lo ghi đè dữ liệu của nhau."
      }
    ],
    shortAnswer: [
      {
        id: "sa-1",
        type: "short_answer",
        level: "Nhận biết",
        question: "Tên viết tắt của phần mềm bảng tính phổ biến nhất của hãng Microsoft thường dùng để quản lý dữ liệu đơn giản là gì?",
        correctAnswer: "Excel",
        explanation: "Microsoft Excel là phần mềm bảng tính cực kỳ phổ biến giúp lưu trữ dữ liệu dạng hàng và cột cho các bài toán quy mô nhỏ và đơn giản."
      },
      {
        id: "sa-2",
        type: "short_answer",
        level: "Thông hiểu",
        question: "Khi cùng một thông tin (ví dụ địa chỉ của học sinh) bị lưu lặp đi lặp lại nhiều lần ở nhiều nơi khác nhau, gây lãng phí đĩa cứng, hiện tượng này được gọi là gì?",
        correctAnswer: "Dư thừa dữ liệu",
        explanation: "Hiện tượng này gọi là 'dư thừa dữ liệu' (Redundancy). Nó không chỉ gây lãng phí bộ nhớ mà còn là nguyên nhân trực tiếp dẫn đến mất nhất quán dữ liệu đó em."
      },
      {
        id: "sa-3",
        type: "short_answer",
        level: "Thông hiểu",
        question: "Để lập các thống kê, bảng tổng hợp kết quả học tập gửi cho phụ huynh học sinh vào cuối kỳ, nhà trường thực hiện hoạt động 'khai thác...' thông tin gì?",
        correctAnswer: "báo cáo",
        explanation: "Hoạt động lập các báo cáo (hoặc thống kê) là một khâu cực kỳ quan trọng trong khai thác thông tin quản lý đấy em."
      },
      {
        id: "sa-4",
        type: "short_answer",
        level: "Vận dụng",
        question: "Để đảm bảo an toàn cho dữ liệu quản lý trước các rủi ro hỏng máy tính hoặc virus phá hoại, chúng ta cần thực hiện công việc gì định kỳ để tạo bản sao lưu phòng hờ?",
        correctAnswer: "Sao lưu",
        explanation: "Công việc sao lưu dữ liệu (Backup) định kỳ giúp chúng ta có bản copy dự phòng, sẵn sàng khôi phục lại khi gặp sự cố bất ngờ."
      },
      {
        id: "sa-5",
        type: "short_answer",
        level: "Vận dụng cao",
        question: "Từ khóa tiếng Anh viết tắt của mô hình cung cấp phần mềm chạy trực tiếp trên Internet dưới dạng dịch vụ (ví dụ Google Sheets, Canva) là gì?",
        correctAnswer: "SaaS",
        explanation: "SaaS viết tắt của Software as a Service (Phần mềm dưới dạng dịch vụ), cho phép sử dụng trực tiếp qua trình duyệt mà không cần cài đặt."
      }
    ],
    trueFalse: [
      {
        id: "tf-1",
        type: "true_false",
        level: "Nhận biết",
        question: "Lưu trữ dữ liệu bằng sổ sách viết tay truyền thống giúp bảo mật thông tin tốt hơn và chống cháy nổ, ẩm mốc hiệu quả hơn lưu trữ trên máy tính.",
        correctAnswer: false,
        explanation: "Nhận định này hoàn toàn sai em nhé. Sổ sách giấy cực kỳ dễ bị cháy nổ, ẩm mốc, mối mọt và rất khó tìm kiếm hay bảo mật so với lưu trữ số trên máy tính."
      },
      {
        id: "tf-2",
        type: "true_false",
        level: "Thông hiểu",
        question: "Một trong các ưu điểm của việc sử dụng Hệ cơ sở dữ liệu là tránh được sự mâu thuẫn dữ liệu nhờ cơ chế lưu trữ tập trung và đồng bộ hóa.",
        correctAnswer: true,
        explanation: "Đúng rồi em! Việc quản lý tập trung qua Hệ CSDL giúp mọi thay đổi dữ liệu được cập nhật tức thời cho tất cả các bên liên quan, đảm bảo tính nhất quán."
      },
      {
        id: "tf-3",
        type: "true_false",
        level: "Thông hiểu",
        question: "Khi quản lý bằng tệp Excel rời rạc, giáo viên bộ môn có thể dễ dàng chia sẻ quyền sửa điểm đồng thời cho học sinh mà không sợ học sinh tự ý sửa điểm của nhau.",
        correctAnswer: false,
        explanation: "Sai rồi nè! Excel không hỗ trợ phân quyền chi tiết đến từng ô hay từng hàng cho nhiều người cùng lúc một cách an toàn tuyệt đối như Hệ CSDL."
      },
      {
        id: "tf-4",
        type: "true_false",
        level: "Vận dụng",
        question: "Trong bài toán quản lý thư viện, khi độc giả trả sách muộn, thủ thư chỉ cần cập nhật trạng thái trả sách mà không cần lưu lịch sử ngày mượn/trả.",
        correctAnswer: false,
        explanation: "Sai em nhé! Thủ thư cần lưu trữ chính xác ngày mượn và ngày trả thực tế để tính toán số ngày quá hạn và xử lý phạt trả muộn nếu có."
      },
      {
        id: "tf-5",
        type: "true_false",
        level: "Vận dụng cao",
        question: "Điện toán đám mây là nền tảng giúp triển khai các hệ quản lý dữ liệu trực tuyến thế hệ mới, cho phép truy cập mọi lúc mọi nơi thông qua mạng Internet.",
        correctAnswer: true,
        explanation: "Chính xác! Nhờ điện toán đám mây, học sinh và giáo viên có thể tra cứu điểm số, thời khóa biểu trên điện thoại ở bất kỳ nơi nào có Internet."
      }
    ]
  },
  "lop11-bai-13": {
    multipleChoice: [
      {
        id: "mc-1",
        type: "multiple_choice",
        level: "Nhận biết",
        question: "Ai là người đề xuất mô hình cơ sở dữ liệu quan hệ vào năm 1970?",
        options: [
          "Alan Turing",
          "Edgar Frank Codd (E.F. Codd)",
          "Bill Gates",
          "Guido van Rossum"
        ],
        correctIndex: 1,
        explanation: "Chào em! Edgar Frank Codd (E.F. Codd), nhà khoa học máy tính của IBM, chính là người đã đặt nền móng cho mô hình CSDL quan hệ vào năm 1970."
      },
      {
        id: "mc-2",
        type: "multiple_choice",
        level: "Nhận biết",
        question: "Trong cơ sở dữ liệu quan hệ, một 'Quan hệ' (Relation) tương ứng với khái niệm trực quan nào sau đây?",
        options: [
          "Một biểu đồ hình tròn",
          "Một bảng (Table) dữ liệu gồm các hàng và cột",
          "Một đoạn mã code Python",
          "Một file ảnh định dạng PNG"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Về mặt toán học gọi là 'Quan hệ' (Relation), còn trong thực tế lập trình và sử dụng, chúng ta gọi trực quan là một 'Bảng' (Table)."
      },
      {
        id: "mc-3",
        type: "multiple_choice",
        level: "Thông hiểu",
        question: "Khóa chính (Primary Key) của một bảng dữ liệu quan hệ phải thỏa mãn các ràng buộc nào?",
        options: [
          "Có thể trùng nhau và có thể để trống",
          "Không được trùng lặp (duy nhất) và không được phép để trống (NOT NULL)",
          "Bắt buộc phải là kiểu số thực",
          "Phải chứa ít nhất 10 chữ số"
        ],
        correctIndex: 1,
        explanation: "Đúng rồi! Khóa chính sinh ra để định danh duy nhất cho từng hàng dữ liệu, vì thế giá trị của nó bắt buộc không được trùng lặp và không bao giờ được rỗng."
      },
      {
        id: "mc-4",
        type: "multiple_choice",
        level: "Vận dụng",
        question: "Cho bảng HOC_SINH có khóa chính là MaHS, và bảng DIEM_THI có cột MaHS liên kết với bảng HOC_SINH. Cột MaHS trong bảng DIEM_THI được gọi là gì?",
        options: [
          "Khóa chính (Primary Key)",
          "Khóa ngoài (Foreign Key)",
          "Trường mô tả (Description field)",
          "Khóa phụ (Secondary Key)"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Một cột nằm ở bảng này liên kết trực tiếp tới khóa chính của một bảng khác thì được gọi là Khóa ngoài (Foreign Key) để tạo mối quan hệ giữa hai bảng."
      },
      {
        id: "mc-5",
        type: "multiple_choice",
        level: "Vận dụng cao",
        question: "Tại sao chúng ta phải thiết lập liên kết Khóa ngoài (Foreign Key) giữa các bảng có liên quan?",
        options: [
          "Để bảng có màu sắc đẹp mắt hơn trên giao diện",
          "Để bảo đảm tính toàn vẹn tham chiếu, ngăn ngừa việc nhập dữ liệu mâu thuẫn hoặc mồ côi",
          "Để tăng dung lượng file lưu trữ lên tối đa",
          "Để máy tính tự động dịch câu lệnh SQL sang Python"
        ],
        correctIndex: 1,
        explanation: "Đúng thế em! Khóa ngoài giúp ngăn chặn các lỗi như: Thêm một học sinh vào một lớp học không tồn tại, hoặc xóa một lớp học khi vẫn đang có học sinh học lớp đó."
      }
    ],
    shortAnswer: [
      {
        id: "sa-1",
        type: "short_answer",
        level: "Nhận biết",
        question: "Mỗi cột trong bảng CSDL quan hệ biểu diễn một đặc điểm của thực thể được gọi khoa học là gì?",
        correctAnswer: "Thuộc tính",
        explanation: "Mỗi cột đại diện cho một đặc điểm (như Họ tên, Ngày sinh, Điểm số) và được gọi khoa học là một 'Thuộc tính' (Attribute) hay trường (Field)."
      },
      {
        id: "sa-2",
        type: "short_answer",
        level: "Nhận biết",
        question: "Mỗi hàng trong bảng dữ liệu quan hệ biểu diễn thông tin của một đối tượng cụ thể được gọi khoa học là một 'Bộ' hay là một gì?",
        correctAnswer: "Bản ghi",
        explanation: "Mỗi hàng trong bảng gọi là một 'Bộ' (Tuple) hay thực tế gọi là một 'Bản ghi' (Record)."
      },
      {
        id: "sa-3",
        type: "short_answer",
        level: "Thông hiểu",
        question: "Từ khóa tiếng Anh của 'Khóa chính' trong thiết kế cơ sở dữ liệu quan hệ là gì?",
        correctAnswer: "Primary Key",
        explanation: "Primary Key chính là khóa chính - đóng vai trò định danh duy nhất cho mỗi bản ghi trong bảng."
      },
      {
        id: "sa-4",
        type: "short_answer",
        level: "Thông hiểu",
        question: "Từ khóa tiếng Anh viết tắt của 'Khóa ngoài' là gì (nhập 2 chữ cái viết tắt)?",
        correctAnswer: "FK",
        explanation: "FK là viết tắt của Foreign Key (Khóa ngoài), dùng để tạo mối liên kết tham chiếu giữa hai bảng."
      },
      {
        id: "sa-5",
        type: "short_answer",
        level: "Vận dụng",
        question: "Trong SQL, khi khai báo khóa ngoài tham chiếu tới bảng khác, ta dùng từ khóa nào đứng sau tên trường và khóa ngoại để chỉ định bảng cha (ví dụ: FOREIGN KEY (MaLop) ... LopHoc(MaLop))?",
        correctAnswer: "REFERENCES",
        explanation: "Từ khóa 'REFERENCES' đi kèm sau định nghĩa ngoại khóa để khai báo bảng cha và cột khóa chính được tham chiếu tới."
      }
    ],
    trueFalse: [
      {
        id: "tf-1",
        type: "true_false",
        level: "Nhận biết",
        question: "Trong một bảng cơ sở dữ liệu quan hệ, chúng ta có thể thiết lập nhiều trường khác nhau cùng làm Khóa chính (Primary Key) riêng biệt.",
        correctAnswer: false,
        explanation: "Nhận định này sai em nhé! Mỗi bảng chỉ được phép có duy nhất MỘT khóa chính (tuy nhiên khóa chính đó có thể gồm một hoặc nhiều cột kết hợp lại gọi là khóa phức hợp)."
      },
      {
        id: "tf-2",
        type: "true_false",
        level: "Nhận biết",
        question: "Mô hình cơ sở dữ liệu quan hệ tổ chức dữ liệu dưới dạng các bảng hai chiều gồm các hàng và các cột.",
        correctAnswer: true,
        explanation: "Hoàn toàn chính xác! Đây chính là cấu trúc cốt lõi, trực quan và dễ hiểu nhất của mô hình quan hệ."
      },
      {
        id: "tf-3",
        type: "true_false",
        level: "Thông hiểu",
        question: "Giá trị của khóa ngoài (Foreign Key) ở bảng con bắt buộc phải bằng một giá trị khóa chính nào đó đang tồn tại ở bảng cha, hoặc có thể để giá trị rỗng (NULL) nếu không bắt buộc liên kết.",
        correctAnswer: true,
        explanation: "Đúng rồi em! Ràng buộc toàn vẹn tham chiếu quy định khóa ngoài phải trỏ đúng tới một khóa chính tồn tại ở bảng cha, hoặc để NULL nếu học sinh đó chưa được xếp vào lớp nào."
      },
      {
        id: "tf-4",
        type: "true_false",
        level: "Vận dụng",
        question: "Nếu lấy cột 'Họ và tên' làm khóa chính cho bảng Học Sinh thì hệ thống vẫn hoạt động rất tốt vì không bao giờ có hai người trùng cả họ và tên trong thực tế.",
        correctAnswer: false,
        explanation: "Nhận định này sai hoàn toàn nhé! Trong thực tế việc trùng họ tên xảy ra rất nhiều (ví dụ có nhiều bạn tên Nguyễn Văn A). Vì thế ta phải tạo ra cột mã học sinh (MaHS) làm khóa chính."
      },
      {
        id: "tf-5",
        type: "true_false",
        level: "Vận dụng cao",
        question: "Tính toàn vẹn thực thể (Entity Integrity) yêu cầu không có bộ phận nào của khóa chính được phép nhận giá trị rỗng (NULL).",
        correctAnswer: true,
        explanation: "Rất chính xác! Nếu khóa chính bị NULL thì chúng ta không thể xác định hay phân biệt bản ghi đó với các bản ghi khác, vi phạm nguyên lý định danh."
      }
    ]
  }
};
