export interface StemProject {
  id: string;
  grade: "10" | "11" | "12";
  groupId: "grade10" | "grade11" | "grade12";
  groupLabel: string;
  title: string;
  shortDesc: string;
  hardware: string[];
  realWorldApp: string;
  blocklyLogic: string[];
  arduinoCode: string;
  pythonCode: string;
}

export interface StemRoadmap {
  grade: "10" | "11" | "12";
  title: string;
  levelBadge: string;
  focusArea: string;
  skills: string[];
  color: string;
  badgeBg: string;
  borderColor: string;
}

export const STEM_ROADMAPS: StemRoadmap[] = [
  {
    grade: "10",
    title: "Khối 10 – STEM Cơ Bản",
    levelBadge: "Cơ Bản & Nhập Môn",
    focusArea: "Làm quen cảm biến, tự động hóa và IoT cơ bản",
    skills: ["Lập trình Arduino C/C++", "Cảm biến LDR, DHT11, MQ-2", "Mạch Relay, RFID", "Giao thức điều khiển cơ bản"],
    color: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
    borderColor: "border-blue-300"
  },
  {
    grade: "11",
    title: "Khối 11 – STEM Trung Cấp",
    levelBadge: "Trung Cấp & Hệ Thống",
    focusArea: "Tự động hóa, giám sát và nông nghiệp thông minh",
    skills: ["Thu thập & phân tích dữ liệu", "Giao tiếp UART, I2C, SPI", "Màn hình LCD / OLED", "Xây dựng Dashboard giám sát từ xa"],
    color: "from-emerald-600 to-teal-600",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    borderColor: "border-emerald-300"
  },
  {
    grade: "12",
    title: "Khối 12 – STEM Nâng Cao",
    levelBadge: "Nâng Cao & Chuyên Sâu",
    focusArea: "Robot thông minh, AI cơ bản, Cloud và tự động hóa phức hợp",
    skills: ["Điều khiển động cơ PID, Servo, Động cơ bước", "Xử lý ảnh & AI cơ bản", "Đưa dữ liệu lên Cloud Firebase / ThingSpeak", "Nghiên cứu KHKT & Cuộc thi STEM"],
    color: "from-purple-600 to-pink-600",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
    borderColor: "border-purple-300"
  }
];

export const STEM_PROJECTS: StemProject[] = [
  // ==========================================
  // KHỐI 10 – STEM CƠ BẢN (16 DỰ ÁN)
  // ==========================================
  {
    id: "agritech_garden",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 1",
    title: "1. Hệ Thống Tưới Tiêu Thông Minh",
    shortDesc: "Cảm biến độ ẩm đất phát hiện đất khô (< 35%), tự động bật Rơ-le kích hoạt máy bơm nước tưới cho cây trồng.",
    hardware: ["Arduino Uno R3", "Cảm biến độ ẩm đất v1.2", "Máy bơm mini 5V", "Mạch Relay 1 kênh", "Màn hình LCD1602 I2C"],
    realWorldApp: "Ứng dụng trong chậu cây cảnh văn phòng, vườn rau sạch gia đình, tiết kiệm nước tưới.",
    blocklyLogic: [
      "NẾU (Độ_Ẩm_Đất < 35%) THÌ:",
      "    Bật_Bơm_Tưới = ĐÚNG",
      "    In_LCD('Đất khô -> Bật bơm')",
      "NGƯỢC LẠI NẾU (Độ_Ẩm_Đất >= 60%) THÌ:",
      "    Tắt_Bơm_Tưới = SAI",
      "    In_LCD('Đất đủ ẩm -> Tắt bơm')"
    ],
    arduinoCode: `// Khối 10 - Dự án 1: Hệ thống tưới tiêu thông minh
const int SOIL_PIN = A0;
const int RELAY_PUMP = 7;

void setup() {
  pinMode(RELAY_PUMP, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int raw = analogRead(SOIL_PIN);
  int moisture = map(raw, 1023, 0, 0, 100);
  
  if (moisture < 35) {
    digitalWrite(RELAY_PUMP, HIGH); // Bật bơm
    Serial.println("Đất khô -> Bật máy bơm tưới");
  } else if (moisture >= 60) {
    digitalWrite(RELAY_PUMP, LOW);  // Tắt bơm
    Serial.println("Đất đủ ẩm -> Tắt máy bơm");
  }
  delay(1000);
}`,
    pythonCode: `# Khối 10 - Dự án 1: Python Smart Irrigation
from machine import ADC, Pin
import time

soil = ADC(Pin(34))
pump = Pin(2, Pin.OUT)

while True:
    moisture = int(100 - (soil.read() / 4095 * 100))
    if moisture < 35:
        pump.value(1)
        print(f"Độ ẩm đất {moisture}% -> BẬT BƠM")
    elif moisture >= 60:
        pump.value(0)
        print(f"Độ ẩm đất {moisture}% -> TẮT BƠM")
    time.sleep(1)`
  },
  {
    id: "g10_distance_bot",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 2",
    title: "2. Robot Dò Quãng Đường",
    shortDesc: "Đo quãng đường dịch chuyển của robot nhờ cảm biến Encoder đĩa quay gắn trên trục động cơ bánh xe.",
    hardware: ["Khung xe robot 2 bánh", "Bo mạch Arduino Uno", "Cảm biến Encoder đĩa đếm xung", "Mạch cầu H L298N", "OLED 0.96 inch"],
    realWorldApp: "Đo chiều dài đoạn đường, tính toán chu vi sân trường, định vị vị trí robot di chuyển.",
    blocklyLogic: [
      "Mỗi khi Đĩa_Xung quay 1 lỗ -> Tăng_Số_Xung + 1",
      "Quãng_Đường_cm = (Số_Xung / Xung_Một_Vòng) * Chu_Vi_Bánh_Xe",
      "Hiển_Thị_OLED(Quãng_Đường_cm)"
    ],
    arduinoCode: `// Khối 10 - Dự án 2: Robot dò quãng đường
const int ENCODER_PIN = 2;
volatile unsigned long pulseCount = 0;
const float WHEEL_CIRCUMFERENCE = 20.4; // cm

void countPulse() {
  pulseCount++;
}

void setup() {
  pinMode(ENCODER_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(ENCODER_PIN), countPulse, RISING);
  Serial.begin(9600);
}

void loop() {
  float distance = (pulseCount / 20.0) * WHEEL_CIRCUMFERENCE;
  Serial.print("Quang duong robot chay: ");
  Serial.print(distance);
  Serial.println(" cm");
  delay(500);
}`,
    pythonCode: `# Khối 10 - Dự án 2: Python Distance Bot
from machine import Pin
import time

encoder = Pin(14, Pin.IN, Pin.PULL_UP)
pulses = 0

def on_pulse(p):
    global pulses
    pulses += 1

encoder.irq(trigger=Pin.IRQ_RISING, handler=on_pulse)

while True:
    dist = (pulses / 20) * 20.4
    print(f"Quãng đường: {dist:.1f} cm")
    time.sleep(0.5)`
  },
  {
    id: "g10_grabber_bot",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 3",
    title: "3. Robot Gắp Vật Tự Động",
    shortDesc: "Robot di chuyển lại gần vật thể, cảm biến siêu âm nhận diện khoảng cách dưới 10cm và ra lệnh kẹp Servo gắp vật.",
    hardware: ["Khung xe robot kẹp vật", "Arduino Uno", "Động cơ Servo SG90 gắp", "Cảm biến HC-SR04", "Pin 18650"],
    realWorldApp: "Mô hình phân loại hàng tự động trong nhà kho, gắp linh kiện cơ khí nhỏ.",
    blocklyLogic: [
      "NẾU (Khoảng_Cách_Vật <= 10cm) THÌ:",
      "    Dừng_Xe()",
      "    Đóng_Kẹp_Servo(Góc 15°)",
      "    Nâng_Tay_Gắp(Góc 45°)"
    ],
    arduinoCode: `// Khối 10 - Dự án 3: Robot gắp vật tự động
#include <Servo.h>
Servo gripper;
const int TRIG = 3, ECHO = 4;

void setup() {
  gripper.attach(9);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  gripper.write(90); // Mở kẹp
}

void loop() {
  digitalWrite(TRIG, HIGH); delayMicroseconds(10); digitalWrite(TRIG, LOW);
  long dist = pulseIn(ECHO, HIGH) * 0.034 / 2;
  
  if (dist > 0 && dist <= 10) {
    gripper.write(15); // Đóng kẹp gắp vật
    delay(2000);
  }
  delay(200);
}`,
    pythonCode: `# Khối 10 - Dự án 3: Python Grabber Bot
from machine import Pin, PWM
import time

servo = PWM(Pin(15), freq=50)

def set_angle(angle):
    servo.duty(int((angle/180*102)+26))

while True:
    set_angle(15) # Gắp vật
    time.sleep(1)
    set_angle(90) # Nhả vật
    time.sleep(1)`
  },
  {
    id: "g10_fire_alarm_bot",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 4",
    title: "4. Robot Báo Cháy",
    shortDesc: "Robot tuần tra tích hợp cảm biến ngọn lửa (Flame sensor) và cảm biến nhiệt độ DHT11 để phát hiện điểm hỏa hoạn.",
    hardware: ["Khung xe 2 bánh", "Cảm biến ngọn lửa IR Flame", "DHT11", "Còi còi Buzzer 5V", "LED báo động đỏ"],
    realWorldApp: "Tuần tra an toàn PCCC tự động đêm khuya trong nhà xưởng, trường học, chung cư.",
    blocklyLogic: [
      "NẾU (Cảm_Biến_Lửa == PHÁT_HIỆN HOẶC Nhiệt_Độ > 45°C) THÌ:",
      "    Dừng_Di_Chuyển()",
      "    Phát_Còi_Báo_Động(Tần số 1000Hz)",
      "    Chớp_Đèn_LED_Đỏ()"
    ],
    arduinoCode: `// Khối 10 - Dự án 4: Robot báo cháy
const int FLAME_PIN = 2;
const int BUZZER_PIN = 8;

void setup() {
  pinMode(FLAME_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(FLAME_PIN) == LOW) { // Phát hiện lửa
    tone(BUZZER_PIN, 1000);
  } else {
    noTone(BUZZER_PIN);
  }
  delay(100);
}`,
    pythonCode: `# Khối 10 - Dự án 4: Python Fire Alarm Bot
from machine import Pin
import time

flame = Pin(13, Pin.IN)
buzzer = Pin(12, Pin.OUT)

while True:
    if flame.value() == 0:
        buzzer.value(1)
        print("🚨 BÁO ĐỘNG PHÁT HIỆN NGỌN LỬA!")
    else:
        buzzer.value(0)
    time.sleep(0.1)`
  },
  {
    id: "smarthome_light",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 5",
    title: "5. Đèn Tự Động",
    shortDesc: "Tự động phát hiện độ sáng môi trường bằng quang trở LDR. Trời tối (< 30%), Rơ-le tự đóng nguồn bật đèn chiếu sáng.",
    hardware: ["Arduino Uno", "Cảm biến quang trở LDR", "Mạch Relay 5V", "Đèn LED 220V/5V", "Điện trở 10kΩ"],
    realWorldApp: "Đèn đường thông minh, đèn hành lang trường học tự bật khi chạng vạng tối.",
    blocklyLogic: [
      "NẾU (Ánh_Sáng_LDR < 30%) THÌ:",
      "    Bật_Relay_Đèn = ĐÚNG",
      "NGƯỢC LẠI:",
      "    Tắt_Relay_Đèn = SAI"
    ],
    arduinoCode: `// Khối 10 - Dự án 5: Đèn tự động LDR
const int LDR_PIN = A0;
const int RELAY_PIN = 7;

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int val = map(analogRead(LDR_PIN), 0, 1023, 0, 100);
  if (val < 30) {
    digitalWrite(RELAY_PIN, HIGH);
  } else {
    digitalWrite(RELAY_PIN, LOW);
  }
  delay(500);
}`,
    pythonCode: `# Khối 10 - Dự án 5: Python Auto Light
from machine import ADC, Pin
import time

ldr = ADC(Pin(34))
relay = Pin(2, Pin.OUT)

while True:
    lux = int((ldr.read() / 4095) * 100)
    relay.value(1 if lux < 30 else 0)
    time.sleep(0.5)`
  },
  {
    id: "g10_smart_bedroom_light",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 6",
    title: "6. Đèn Phòng Ngủ Thông Minh",
    shortDesc: "Đèn ngủ đổi màu RGB theo tâm trạng hoặc độ sáng nhẹ, tự tắt khi cảm biến siêu âm không thấy người sau 10 phút.",
    hardware: ["Arduino Uno", "Mạch LED RGB Neopixel WS2812B", "Cảm biến siêu âm HC-SR04", "Nút bấm chuyển chế độ"],
    realWorldApp: "Đèn ngủ thông minh giúp tiết kiệm điện, chống lóa mắt cho trẻ nhỏ và người già.",
    blocklyLogic: [
      "NẾU (Phát_Hiện_Người VÀ Đang_Đêm) THÌ:",
      "    Sáng_LED_RGB_Màu_Vàng_Ấm(Độ sáng 20%)",
      "NGƯỢC LẠI:",
      "    Tắt_Đèn_Ngủ()"
    ],
    arduinoCode: `// Khối 10 - Dự án 6: Đèn phòng ngủ thông minh
const int LED_R = 9, LED_G = 10, LED_B = 11;

void setup() {
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_B, OUTPUT);
}

void setWarmColor() {
  analogWrite(LED_R, 255);
  analogWrite(LED_G, 100);
  analogWrite(LED_B, 20); // Màu vàng ấm dịu mắt
}

void loop() {
  setWarmColor();
  delay(1000);
}`,
    pythonCode: `# Khối 10 - Dự án 6: Python Smart Bedroom Light
from machine import Pin, PWM
import time

r = PWM(Pin(25)); g = PWM(Pin(26)); b = PWM(Pin(27))

def set_color(red, green, blue):
    r.duty(red); g.duty(green); b.duty(blue)

set_color(1023, 400, 80) # Vàng ấm nhẹ`
  },
  {
    id: "g10_auto_door",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 7",
    title: "7. Cửa Tự Động",
    shortDesc: "Sử dụng cảm biến chuyển động PIR hồng ngoại phát hiện người đi tới để ra lệnh Servo quay 90° mở cửa khép kín.",
    hardware: ["Arduino Uno", "Cảm biến PIR HC-SR501", "Động cơ Servo SG90 / MG996R", "Còi chíp báo hiệu"],
    realWorldApp: "Cửa kính tự động siêu thị, trung tâm thương mại, sảnh đón tiếp trường học.",
    blocklyLogic: [
      "NẾU (Cảm_Biến_PIR == CÓ_CHUYỂN_ĐỘNG) THÌ:",
      "    Xoay_Servo_Mở_Cửa(90°)",
      "    Chờ 5 Giây",
      "    Xoay_Servo_Đóng_Cửa(0°)"
    ],
    arduinoCode: `// Khối 10 - Dự án 7: Cửa tự động PIR Servo
#include <Servo.h>
Servo door;
const int PIR_PIN = 2;

void setup() {
  door.attach(9);
  pinMode(PIR_PIN, INPUT);
  door.write(0); // Đóng cửa
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    door.write(90); // Mở cửa
    delay(5000);
    door.write(0);  // Đóng cửa
  }
  delay(200);
}`,
    pythonCode: `# Khối 10 - Dự án 7: Python Auto Door
from machine import Pin, PWM
import time

pir = Pin(13, Pin.IN)
door = PWM(Pin(14), freq=50)

while True:
    if pir.value() == 1:
        door.duty(128) # Mở cửa
        time.sleep(5)
        door.duty(26)  # Đóng cửa
    time.sleep(0.2)`
  },
  {
    id: "g10_smart_lock",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 8",
    title: "8. Khóa Cửa Thông Minh",
    shortDesc: "Khóa cửa mở bằng mật mã Keypad matrix 4x4. Nhập đúng mật khẩu Rơ-le kích hoạt chốt khóa điện tử Solenoid.",
    hardware: ["Arduino Uno", "Bàn phím Keypad 4x4", "Chốt khóa điện từ Solenoid 12V", "Mạch Relay", "Màn hình LCD1602"],
    realWorldApp: "Khóa phòng tin học, phòng máy chủ, cửa căn hộ chung cư an toàn.",
    blocklyLogic: [
      "Nhập_Mật_Khẩu_Keypad()",
      "NẾU (Mật_Khẩu == '1234') THÌ:",
      "    Bật_Relay_Chốt_Khóa = ĐÚNG",
      "    Hiển_Thị_LCD('MỞ CỬA THÀNH CÔNG')",
      "NGƯỢC LẠI:",
      "    Hiển_Thị_LCD('SAI MẬT MÃ!')"
    ],
    arduinoCode: `// Khối 10 - Dự án 8: Khóa cửa thông minh Keypad
#include <Keypad.h>
const char PASS[] = "1234";
const int RELAY_LOCK = 10;

void setup() {
  pinMode(RELAY_LOCK, OUTPUT);
  digitalWrite(RELAY_LOCK, LOW);
}

void unlock() {
  digitalWrite(RELAY_LOCK, HIGH); // Mở chốt khóa
  delay(3000);
  digitalWrite(RELAY_LOCK, LOW);
}

void loop() {
  // Logic kiểm tra chuỗi bàn phím
}`,
    pythonCode: `# Khối 10 - Dự án 8: Python Smart Lock
from machine import Pin
import time

relay = Pin(18, Pin.OUT)

def unlock():
    relay.value(1)
    time.sleep(3)
    relay.value(0)`
  },
  {
    id: "g10_auto_fan",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 9",
    title: "9. Quạt Tự Động",
    shortDesc: "Quạt điện tự bật khi phát hiện có người ngồi trong bán kính 1.5m và nhiệt độ phòng vượt quá 30°C.",
    hardware: ["Arduino Uno", "Cảm biến nhiệt độ DHT11", "Cảm biến chuyển động PIR", "Mạch công suất động cơ DC / Relay"],
    realWorldApp: "Quạt làm mát tự động góc học tập, tiết kiệm điện cho gia đình.",
    blocklyLogic: [
      "NẾU (Nhiệt_Độ > 30°C VÀ Có_Người) THÌ:",
      "    Chạy_Quạt_DC = ĐÚNG",
      "NGƯỢC LẠI:",
      "    Tắt_Quạt = SAI"
    ],
    arduinoCode: `// Khối 10 - Dự án 9: Quạt tự động
const int PIR_PIN = 2;
const int FAN_RELAY = 8;

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(FAN_RELAY, OUTPUT);
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    digitalWrite(FAN_RELAY, HIGH); // Bật quạt
  } else {
    digitalWrite(FAN_RELAY, LOW);
  }
  delay(1000);
}`,
    pythonCode: `# Khối 10 - Dự án 9: Python Auto Fan
from machine import Pin
import time

pir = Pin(12, Pin.IN)
fan = Pin(13, Pin.OUT)

while True:
    fan.value(1 if pir.value() == 1 else 0)
    time.sleep(1)`
  },
  {
    id: "smarthome_curtain",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 10",
    title: "10. Rèm Cửa Thông Minh",
    shortDesc: "Động cơ Servo kéo mở rèm khi nhận ánh sáng bình minh nhẹ và tự đóng lại khi nắng gắt hoặc đêm tối.",
    hardware: ["Arduino Uno", "Động cơ Servo SG90", "Cảm biến LDR", "Màn hình OLED 0.96 inch"],
    realWorldApp: "Tự động hóa nhà thông minh, bảo vệ đồ gỗ nội thất khỏi ánh nắng gắt trực tiếp.",
    blocklyLogic: [
      "NẾU (30% <= Ánh_Sáng <= 80%) THÌ:",
      "    Mở_Rèm_Servo(90°)",
      "NGƯỢC LẠI:",
      "    Đóng_Rèm_Servo(0°)"
    ],
    arduinoCode: `// Khối 10 - Dự án 10: Rèm cửa thông minh
#include <Servo.h>
Servo curtain;
const int LDR_PIN = A0;

void setup() {
  curtain.attach(9);
}

void loop() {
  int lux = map(analogRead(LDR_PIN), 0, 1023, 0, 100);
  if (lux >= 30 && lux <= 80) {
    curtain.write(90); // Mở rèm
  } else {
    curtain.write(0);  // Đóng rèm
  }
  delay(1000);
}`,
    pythonCode: `# Khối 10 - Dự án 10: Python Smart Curtain
from machine import Pin, PWM, ADC
import time

servo = PWM(Pin(15), freq=50)
ldr = ADC(Pin(33))

while True:
    lux = int((ldr.read()/4095)*100)
    servo.duty(128 if 30 <= lux <= 80 else 26)
    time.sleep(1)`
  },
  {
    id: "g10_iot_led",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 11",
    title: "11. Điều Khiển LED Bằng IoT",
    shortDesc: "Sử dụng bo mạch ESP8266 / ESP32 kết nối Wi-Fi để điều khiển bật/tắt chuỗi LED qua giao diện Web đơn giản.",
    hardware: ["Bo mạch ESP8266 NodeMCU", "Đèn LED 5mm", "Trang Web điều khiển WebServer HTML"],
    realWorldApp: "Nhập môn điều khiển thiết bị điện tử gia dụng từ xa qua mạng Wi-Fi nội bộ.",
    blocklyLogic: [
      "Khởi_Tạo_WiFi_WebServer()",
      "KHI (Nhận_Yêu_Cầu_Web == '/led/on'):",
      "    Bật_LED = ĐÚNG",
      "KHI (Nhận_Yêu_Cầu_Web == '/led/off'):",
      "    Tắt_LED = SAI"
    ],
    arduinoCode: `// Khối 10 - Dự án 11: Điều khiển LED qua Web ESP8266
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

ESP8266WebServer server(80);
const int LED_PIN = D2;

void handleOn() {
  digitalWrite(LED_PIN, HIGH);
  server.send(200, "text/plain", "LED IS ON");
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  WiFi.begin("WiFi_TRUONG", "12345678");
  server.on("/on", handleOn);
  server.begin();
}`,
    pythonCode: `# Khối 10 - Dự án 11: Python Web IoT LED
import network, socket
from machine import Pin

led = Pin(2, Pin.OUT)
# Lập trình Socket Server điều khiển LED`
  },
  {
    id: "g10_stair_light_app",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 12",
    title: "12. Đèn Cầu Thang Điều Khiển Bằng Điện Thoại",
    shortDesc: "Đèn LED cầu thang bật hiệu ứng đuổi màu thông minh khi kết nối Bluetooth HC-05 từ ứng dụng điện thoại Android.",
    hardware: ["Arduino Uno", "Module Bluetooth HC-05", "Dải LED WS2812B", "App MIT App Inventor"],
    realWorldApp: "Hệ thống chiếu sáng kiến trúc nhà ở hiện đại, chống té ngã ban đêm.",
    blocklyLogic: [
      "NẾU (Nhận_Dữ_Liệu_Bluetooth == '1') THÌ:",
      "    Chạy_Hiệu_Ứng_LED_Cầu_Thang_Sáng_Đuổi()",
      "NGƯỢC LẠI NẾU (L == '0') THÌ:",
      "    Tắt_Toàn_Bộ_LED()"
    ],
    arduinoCode: `// Khối 10 - Dự án 12: Đèn cầu thang Bluetooth
#include <SoftwareSerial.h>
SoftwareSerial BT(2, 3); // RX, TX
const int LED_PIN = 13;

void setup() {
  BT.begin(9600);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (BT.available()) {
    char cmd = BT.read();
    if (cmd == '1') digitalWrite(LED_PIN, HIGH);
    else if (cmd == '0') digitalWrite(LED_PIN, LOW);
  }
}`,
    pythonCode: `# Khối 10 - Dự án 12: Python Bluetooth Stair Light
from machine import UART, Pin
bt = UART(1, baudrate=9600, tx=17, rx=16)
led = Pin(2, Pin.OUT)`
  },
  {
    id: "g10_water_level_alert",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 13",
    title: "13. Hệ Thống Cảnh Báo Mực Nước",
    shortDesc: "Cảm biến đo mực nước trong bể chứa. Mực nước quá thấp (< 20%) báo nạp nước, quá đầy (> 90%) còi báo ngắt bơm.",
    hardware: ["Arduino Uno", "Cảm biến mực nước Water Sensor", "Còi Buzzer", "3 x LED báo mức (Xanh/Vàng/Đỏ)"],
    realWorldApp: "Cảnh báo ngập lụt đô thị, giám sát bồn chứa nước sinh hoạt gia đình.",
    blocklyLogic: [
      "Mực_Nước = Đọc_Cảm_Biến_Nước()",
      "NẾU (Mực_Nước > 90%) THÌ:",
      "    Phát_Còi_Báo_Tràn_Nước()",
      "    Sáng_LED_Đỏ()"
    ],
    arduinoCode: `// Khối 10 - Dự án 13: Cảnh báo mực nước
const int WATER_PIN = A0;
const int BUZZER = 8;

void setup() {
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  int level = analogRead(WATER_PIN);
  if (level > 600) { // Nước đầy
    tone(BUZZER, 800);
  } else {
    noTone(BUZZER);
  }
  delay(500);
}`,
    pythonCode: `# Khối 10 - Dự án 13: Python Water Level Alert
from machine import ADC, Pin
import time

water = ADC(Pin(35))
buzzer = Pin(12, Pin.OUT)

while True:
    if water.read() > 2500:
        buzzer.value(1)
    else:
        buzzer.value(0)
    time.sleep(0.5)`
  },
  {
    id: "g10_burglar_alarm",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 14",
    title: "14. Hệ Thống Báo Động Chống Trộm",
    shortDesc: "Cảm biến hồng ngoại phát hiện chuyển động đột nhập bất hợp pháp ban đêm, lập tức nháy đèn cảnh báo và hú còi.",
    hardware: ["Arduino Uno", "Cảm biến PIR chuyển động", "Còi hú báo động 12V", "Module Relay", "LED nhấp nháy"],
    realWorldApp: "Chống trộm sân vườn, ban công, bảo vệ tài sản trường học.",
    blocklyLogic: [
      "NẾU (Bật_Chế_Độ_Bảo_Vệ VÀ Phát_Hiện_Chuyển_Động) THÌ:",
      "    Hú_Còi_Báo_Trộm(Chế độ ngắt quãng)",
      "    Gửi_Cảnh_Báo_Loa_Thông_Báo()"
    ],
    arduinoCode: `// Khối 10 - Dự án 14: Hệ thống chống trộm PIR
const int PIR = 2, SIREN = 7;

void setup() {
  pinMode(PIR, INPUT);
  pinMode(SIREN, OUTPUT);
}

void loop() {
  if (digitalRead(PIR) == HIGH) {
    digitalWrite(SIREN, HIGH); // Hú còi
  } else {
    digitalWrite(SIREN, LOW);
  }
  delay(200);
}`,
    pythonCode: `# Khối 10 - Dự án 14: Python Burglar Alarm
from machine import Pin
import time

pir = Pin(13, Pin.IN)
siren = Pin(12, Pin.OUT)

while True:
    siren.value(1 if pir.value() == 1 else 0)
    time.sleep(0.2)`
  },
  {
    id: "g10_rfid_door",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 15",
    title: "15. Hệ Thống Cửa Từ RFID",
    shortDesc: "Quét thẻ từ RFID RC522 để xác minh danh tính. Đúng UID mã thẻ, động cơ Servo mở chốt cửa trong 3 giây.",
    hardware: ["Arduino Uno", "Module RFID RC522 13.56MHz", "Thẻ từ / Móc khóa RFID", "Động cơ Servo SG90", "Còi Buzzer"],
    realWorldApp: "Điểm danh học sinh tự động, kiểm soát cửa ra vào thư viện, chung cư.",
    blocklyLogic: [
      "Đọc_Mã_Thẻ_Từ_RFID()",
      "NẾU (Mã_Thẻ == 'A1 B2 C3 D4') THÌ:",
      "    Phát_Tiếng_Kêu_Beep_Xác_Nhận()",
      "    Xoay_Servo_Mở_Cửa(90°)",
      "    Chờ 3 Giây",
      "    Đóng_Cửa()"
    ],
    arduinoCode: `// Khối 10 - Dự án 15: Cửa từ RFID RC522
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

#define SS_PIN 10
#define RST_PIN 9
MFRC522 rfid(SS_PIN, RST_PIN);
Servo lockServo;

void setup() {
  SPI.begin();
  rfid.PCD_Init();
  lockServo.attach(5);
  lockServo.write(0);
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;
  // So sánh UID thẻ và mở cửa
  lockServo.write(90);
  delay(3000);
  lockServo.write(0);
}`,
    pythonCode: `# Khối 10 - Dự án 15: Python RFID Lock
# Sử dụng mfrc522 MicroPython
print("Đang chờ quét thẻ từ RFID...")`
  },
  {
    id: "g10_group_smarthome",
    grade: "10",
    groupId: "grade10",
    groupLabel: "🏫 Khối 10 - Dự án 16 (Dự Án Nhóm)",
    title: "16. Dự Án Nhóm: Nhà Thông Minh Tích Hợp IoT",
    shortDesc: "Tích hợp toàn bộ hệ thống: Đèn LDR, Cửa RFID, Cảnh Báo PCCC và Điều khiển thiết bị qua Wi-Fi trong 1 mô hình nhà hoàn chỉnh.",
    hardware: ["Mô hình nhà gỗ Balsa / Mica", "ESP32", "Cảm biến LDR, DHT11, MQ2, RFID", "Relay 4 kênh", "OLED 128x64"],
    realWorldApp: "Sản phẩm tổng hợp cuối khóa STEM Khối 10, tham gia Triển lãm Ngày hội STEM cấp trường.",
    blocklyLogic: [
      "Khởi_Tạo_Tất_Cả_Cảm_Biến_Và_Wi-Fi()",
      "VÒNG_LẶP_CHÍNH:",
      "    1. Giám_Sát_An_Toàn_Chống_Cháy()",
      "    2. Điều_Khiển_Đèn_Ban_Đêm_LDR()",
      "    3. Kiểm_Soát_Cửa_Từ_RFID()",
      "    4. Cập_Nhật_Trạng_Thái_Lên_Màn_Hình_OLED()"
    ],
    arduinoCode: `// Khối 10 - Dự án 16: Mô hình Nhà Thông Minh Tích Hợp IoT
#include <WiFi.h>
// Lập trình tích hợp hệ thống đa nhiệm Smart Home`,
    pythonCode: `# Khối 10 - Dự án 16: Python Smart Home IoT System
import time
print("Hệ thống Smart Home Khối 10 đã sẵn sàng!")`
  },

  // ==========================================
  // KHỐI 11 – STEM TRUNG CẤP (16 DỰ ÁN)
  // ==========================================
  {
    id: "g11_adv_line_follower",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 1",
    title: "1. Robot Dò Đường Nâng Cao",
    shortDesc: "Sử dụng thanh 5 cảm biến hồng ngoại kết hợp thuật toán điều khiển PID giúp xe robot bám đường cong mượt mà tốc độ cao.",
    hardware: ["Thanh 5 cảm biến IR TCRT5000", "Arduino Uno", "Mạch công suất TB6612FNG", "Động cơ N20 siêu tốc", "Pin Li-po"],
    realWorldApp: "Robot AGV vận chuyển linh kiện tự động trong nhà máy thông minh Samsung, Foxconn.",
    blocklyLogic: [
      "Lỗi = Tính_Lỗi_Lệch_Vạch_Từ_5_Cảm_Biến()",
      "P = Lỗi * Kp",
      "I = (I + Lỗi) * Ki",
      "D = (Lỗi - Lỗi_Trước) * Kd",
      "Tín_Hiệu_PID = P + I + D",
      "Điều_Chỉnh_Tốc_Độ_2_Động_Cơ(Tốc_Độ_Chuẩn ± Tín_Hiệu_PID)"
    ],
    arduinoCode: `// Khối 11 - Dự án 1: Robot dò đường nâng cao PID
float Kp = 12.0, Ki = 0.05, Kd = 25.0;
float error = 0, previousError = 0, integral = 0;

void loop() {
  // Đọc 5 cảm biến IR và tính error
  float derivative = error - previousError;
  integral += error;
  float output = (error * Kp) + (integral * Ki) + (derivative * Kd);
  previousError = error;
  // Điều khiển động cơ PID
}`,
    pythonCode: `# Khối 11 - Dự án 1: Python Advanced Line Follower PID
# Thuật toán PID điều khiển robot dò đường`
  },
  {
    id: "robot_arm",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 2",
    title: "2. Cánh Tay Robot Công Nghiệp",
    shortDesc: "Mô phỏng cánh tay robot 3-DOF gắp sản phẩm chính xác theo góc quay điều khiển của các khớp Servo MG996R lực gắp mạnh.",
    hardware: ["3 x Động cơ Servo MG996R kim loại", "Bo mạch Arduino Uno", "Tay cầm Joystick 2 trục", "Khung nhôm kim loại"],
    realWorldApp: "Dây chuyền gắp hàn linh kiện tự động, đóng gói sản phẩm tự động hóa.",
    blocklyLogic: [
      "Đặt_Góc_Khớp_Vai = Đọc_Joystick_Trục_X()",
      "Đặt_Góc_Khớp_Khuỷu = Đọc_Joystick_Trục_Y()",
      "NẾU (Nút_Gắp == BẤM) THÌ:",
      "    Siết_Tay_Kẹp(15°)",
      "NGƯỢC LẠI:",
      "    Mở_Tay_Kẹp(75°)"
    ],
    arduinoCode: `// Khối 11 - Dự án 2: Cánh tay robot công nghiệp
#include <Servo.h>
Servo shoulder, elbow, gripper;

void setup() {
  shoulder.attach(5);
  elbow.attach(6);
  gripper.attach(9);
}

void loop() {
  // Đọc Joystick và điều khiển góc Servo
}`,
    pythonCode: `# Khối 11 - Dự án 2: Python Industrial Arm Controller
from machine import Pin, PWM
print("Cánh tay Robot công nghiệp Khối 11 sẵn sàng!")`
  },
  {
    id: "g11_patrol_bot",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 3",
    title: "3. Robot Rà Soát Trong Khuôn Viên Trường",
    shortDesc: "Robot tuần tra bánh xích né vật cản bằng cảm biến siêu âm quét Servo 180°, quay Video trực tiếp về trung tâm.",
    hardware: ["Khung xe bánh xích Tank", "ESP32-CAM", "Cảm biến siêu âm HC-SR04", "Servo SG90 quét góc", "Pin Li-ion"],
    realWorldApp: "Robot an ninh rà soát khuôn viên trường học, kiểm tra chướng ngại vật ban đêm.",
    blocklyLogic: [
      "Quét_Siêu_Âm_Góc_Trái_Thẳng_Phải()",
      "NẾU (Hướng_Thẳng_Vật_Cản < 20cm) THÌ:",
      "    Dừng_Xe()",
      "    Chọn_Hướng_Có_Khoảng_Cách_Xa_Nhất()",
      "    Quay_Xe_Sang_Hướng_Đó()"
    ],
    arduinoCode: `// Khối 11 - Dự án 3: Robot tuần tra khuôn viên né vật cản
#include <Servo.h>
Servo scanServo;
const int TRIG = 3, ECHO = 4;

void setup() {
  scanServo.attach(9);
}

void loop() {
  // Quét 3 hướng và né vật cản
}`,
    pythonCode: `# Khối 11 - Dự án 3: Python Patrol Bot
print("Robot rà soát khuôn viên trường học...")`
  },
  {
    id: "g11_pingpong_bot",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 4",
    title: "4. Robot Phát Bóng Bàn Tự Động",
    shortDesc: "Tự động bắn bóng bàn với tốc độ và góc xoáy tùy chỉnh nhờ 2 động cơ DC quay ngược chiều tốc độ cao.",
    hardware: ["Arduino Uno", "2 x Động cơ DC không chổi than", "Mạch PWM tốc độ", "Động cơ bước nạp bóng", "Khung ống nhựa PVC"],
    realWorldApp: "Thiết bị hỗ trợ luyện tập thể thao tự động trong nhà thi đấu trường học.",
    blocklyLogic: [
      "Đặt_Tốc_Độ_Bắn_Bóng(PWM 80%)",
      "Mỗi 2 Giây:",
      "    Động_Cơ_Nạp_Xoay 1 Nấc -> Đẩy 1 quả bóng bàn vào ống bắn"
    ],
    arduinoCode: `// Khối 11 - Dự án 4: Robot phát bóng bàn tự động
const int MOTOR_A = 5, MOTOR_B = 6;

void setup() {
  pinMode(MOTOR_A, OUTPUT);
  pinMode(MOTOR_B, OUTPUT);
}

void loop() {
  analogWrite(MOTOR_A, 200); // Bắn bóng tốc độ cao
  analogWrite(MOTOR_B, 200);
  delay(2000);
}`,
    pythonCode: `# Khối 11 - Dự án 4: Python Pingpong Launcher
print("Robot bắn bóng bàn tự động...")`
  },
  {
    id: "g11_wind_speed_alert",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 5",
    title: "5. Hệ Thống Cảnh Báo Tốc Độ Gió",
    shortDesc: "Cảm biến anung kế đếm vòng quay cánh quạt gió. Khi tốc độ gió vượt cấp 6 (> 12 m/s), phát còi và hạ mái che.",
    hardware: ["Cảm biến đo tốc độ gió Anemometer", "Arduino Uno", "Màn hình LCD1602", "Còi Buzzer", "Servo thu mái che"],
    realWorldApp: "Cảnh báo giông lốc cho nhà kính nông nghiệp, tàu thuyền cập bến.",
    blocklyLogic: [
      "Tốc_Độ_Gió_ms = Đếm_Xung_Cánh_Quạt_Trong_1s() * Hệ_Số",
      "NẾU (Tốc_Độ_Gió_ms > 12.0) THÌ:",
      "    Phát_Báo_Động_Gió_Lớn()",
      "    Thu_Rèm_Mái_Che_Bảo_Vệ()"
    ],
    arduinoCode: `// Khối 11 - Dự án 5: Cảnh báo tốc độ gió
const int WIND_PIN = 2;
volatile int windPulses = 0;

void setup() {
  pinMode(WIND_PIN, INPUT_PULLUP);
  attachInterrupt(0, [](){ windPulses++; }, RISING);
}

void loop() {
  windPulses = 0;
  delay(1000);
  float windSpeed = windPulses * 0.87; // m/s
  Serial.print("Tốc độ gió: "); Serial.println(windSpeed);
}`,
    pythonCode: `# Khối 11 - Dự án 5: Python Wind Speed Meter
print("Hệ thống đo tốc độ gió anung kế...")`
  },
  {
    id: "g11_water_quality_monitor",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 6",
    title: "6. Giám Sát Chất Lượng Nước",
    shortDesc: "Đo độ đục TDS và độ pH của nguồn nước. Hiển thị thông số chỉ số nước sạch lên màn hình OLED.",
    hardware: ["Arduino Uno", "Cảm biến độ đục nước TDS Sensor", "Cảm biến đo độ pH", "OLED 0.96 inch"],
    realWorldApp: "Kiểm tra chất lượng nước bể bơi trường học, ao nuôi thủy sản cá tôm.",
    blocklyLogic: [
      "TDS_ppm = Đọc_Cảm_Biến_TDS()",
      "pH_val = Đọc_Cảm_Biến_pH()",
      "NẾU (TDS > 500 ppm HOẶC pH < 6.5) THÌ:",
      "    Hiển_Thị_OLED('CẢNH BÁO NƯỚC Ô NHIỄM!')"
    ],
    arduinoCode: `// Khối 11 - Dự án 6: Giám sát chất lượng nước TDS & pH
const int TDS_PIN = A0;

void loop() {
  int raw = analogRead(TDS_PIN);
  float voltage = raw * (5.0 / 1024.0);
  float tdsValue = (133.42 * voltage * voltage * voltage - 255.86 * voltage * voltage + 857.39 * voltage) * 0.5;
  Serial.print("TDS: "); Serial.print(tdsValue); Serial.println(" ppm");
  delay(1000);
}`,
    pythonCode: `# Khối 11 - Dự án 6: Python Water Quality Monitor
print("Giám sát chỉ số chất lượng nước...")`
  },
  {
    id: "g11_greenhouse_irrigation",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 7",
    title: "7. Hệ Thống Tưới Cây Nhà Kính Tự Động",
    shortDesc: "Điều khiển phun sương nhà kính khi nhiệt độ không khí > 32°C và bật bơm nhỏ giọt khi độ ẩm đất khô.",
    hardware: ["Arduino Mega 2560", "DHT22", "4 x Cảm biến độ ẩm đất", "Relay 4 kênh", "Bơm phun sương 12V"],
    realWorldApp: "Mô hình nông nghiệp công nghệ cao trồng dâu tây, hoa lan trong nhà kính.",
    blocklyLogic: [
      "NẾU (Nhiệt_Độ_Không_Khí > 32°C) THÌ:",
      "    Bật_Bơm_Phun_Sương_Làm_Mát()",
      "NẾU (Trung_Bình_Độ_Ẩm_Đất < 40%) THÌ:",
      "    Bật_Hệ_Thống_Tưới_Nhỏ_Giọt()"
    ],
    arduinoCode: `// Khối 11 - Dự án 7: Tưới cây nhà kính tự động
// Lập trình điều khiển đa vùng nhà kính`,
    pythonCode: `# Khối 11 - Dự án 7: Python Greenhouse Controller
print("Hệ thống quản lý nhà kính nông nghiệp...")`
  },
  {
    id: "g11_lab_temp_monitor",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 8",
    title: "8. Giám Sát Nhiệt Độ Phòng Thí Nghiệm",
    shortDesc: "Sử dụng cảm biến chính xác DS18B20 bọc kim loại để theo dõi nhiệt độ dung dịch hóa chất trong phòng lab.",
    hardware: ["Arduino Uno", "Cảm biến nhiệt độ DS18B20 chống nước", "LCD2004 I2C", "Module Buzzer"],
    realWorldApp: "Bảo quản hóa chất, mẫu phẩm sinh học trong phòng thí nghiệm THPT.",
    blocklyLogic: [
      "Nhiệt_Độ_Dung_Dịch = Đọc_DS18B20()",
      "NẾU (Nhiệt_Độ > 50°C) THÌ:",
      "    Cảnh_Báo_Nhiệt_Độ_Quá_Ngưỡng_An_Toàn()"
    ],
    arduinoCode: `// Khối 11 - Dự án 8: DS18B20 Giám sát nhiệt độ phòng lab
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  sensors.begin();
  Serial.begin(9600);
}

void loop() {
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
  Serial.print("Nhiet do Lab: "); Serial.println(tempC);
  delay(1000);
}`,
    pythonCode: `# Khối 11 - Dự án 8: Python DS18B20 Monitor
print("Theo dõi nhiệt độ phòng thí nghiệm...")`
  },
  {
    id: "g11_classroom_lighting",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 9",
    title: "9. Hệ Thống Quản Lý Chiếu Sáng Lớp Học",
    shortDesc: "Tự động điều chỉnh số lượng bóng đèn nhấp nháy trong lớp học dựa theo cường độ ánh sáng tự nhiên từ cửa sổ.",
    hardware: ["Arduino Uno", "Cảm biến BH1750 Lux", "Cảm biến PIR", "Mạch Relay 4 kênh điều khiển các dãy đèn"],
    realWorldApp: "Tiết kiệm 40% điện năng chiếu sáng lớp học, bảo vệ thị lực chống cận thị cho học sinh.",
    blocklyLogic: [
      "NẾU (Có_Học_Sinh_Trong_Lớp) THÌ:",
      "    NẾU (Ánh_Sáng_Tự_Nhiên < 300 Lux) -> Bật 4 Dãy Đèn",
      "    NẾU (300 Lux <= Ánh_Sáng <= 500 Lux) -> Bật 2 Dãy Đèn",
      "    NẾU (Ánh_Sáng > 500 Lux) -> Tắt Bớt Đèn Cửa Sổ"
    ],
    arduinoCode: `// Khối 11 - Dự án 9: Quản lý chiếu sáng lớp học
// Tự động bật tắt dàn đèn học đường`,
    pythonCode: `# Khối 11 - Dự án 9: Python Classroom Lighting
print("Quản lý năng lượng chiếu sáng lớp học...")`
  },
  {
    id: "smarthome_fire",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 10",
    title: "10. Cảnh Báo Cháy Trong Phòng Thí Nghiệm",
    shortDesc: "Theo dõi rò rỉ khí gas hóa chất và nhiệt độ. Khi phát hiện nguy cơ cháy, hú còi và bật quạt hút độc.",
    hardware: ["Arduino Uno", "Cảm biến MQ-2", "DHT11", "Còi còi báo động", "Quạt DC hút khói"],
    realWorldApp: "Hệ thống an toàn PCCC bắt buộc cho phòng thí nghiệm Hóa - Sinh học đường.",
    blocklyLogic: [
      "NẾU (Khói_MQ2 > 120 ppm HOẶC Nhiệt_Độ > 40°C) THÌ:",
      "    Hú_Còi_Báo_Cháy_Khẩn_Cấp()",
      "    Bật_Quạt_Hút_Khói_Độc()"
    ],
    arduinoCode: `// Khối 11 - Dự án 10: Cảnh báo cháy phòng thí nghiệm
const int MQ2_PIN = A1;
const int FAN_PIN = 9;

void loop() {
  int smoke = analogRead(MQ2_PIN);
  if (smoke > 300) {
    digitalWrite(FAN_PIN, HIGH);
  }
  delay(1000);
}`,
    pythonCode: `# Khối 11 - Dự án 10: Python Lab Fire Alarm
print("Hệ thống PCCC phòng thí nghiệm...")`
  },
  {
    id: "smart_parking",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 11",
    title: "11. Quản Lý Bãi Xe Thông Minh",
    shortDesc: "Cảm biến siêu âm nhận diện xe tới gần (< 15cm). Động cơ Servo nâng Barrier và màn hình LCD báo số vị trí trống.",
    hardware: ["Arduino Uno", "Cảm biến HC-SR04", "Servo SG90", "LCD1602 I2C", "Cảm biến hồng ngoại từng ô đỗ"],
    realWorldApp: "Quản lý bãi đỗ xe ô tô, xe máy thông minh tại trường học và tòa nhà công sở.",
    blocklyLogic: [
      "NẾU (Khoảng_Cách_Xe < 15cm VÀ Chỗ_Trống > 0) THÌ:",
      "    Nâng_Barrier_Servo(90°)",
      "    Trừ_Số_Chỗ_Trống - 1",
      "    Hiển_Thị_LCD('MỜI VÀO - CÒN X CHỖ')"
    ],
    arduinoCode: `// Khối 11 - Dự án 11: Bãi đỗ xe thông minh
#include <Servo.h>
Servo barrier;
void setup() { barrier.attach(9); }
void loop() { /* Điều khiển barrier bãi đỗ xe */ }`,
    pythonCode: `# Khối 11 - Dự án 11: Python Smart Parking Management
print("Hệ thống quản lý bãi đỗ xe...")`
  },
  {
    id: "g11_humidity_fan",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 12",
    title: "12. Quạt Tự Động Theo Độ Ẩm Không Khí",
    shortDesc: "Quạt thông gió tự động bật khi độ ẩm không khí vượt quá 80% RH để làm khô thoáng phòng học.",
    hardware: ["Arduino Uno", "Cảm biến DHT11", "Module Relay 5V", "Quạt hút thông gió AC 220V/DC 12V"],
    realWorldApp: "Chống ẩm mốc mùa nồm ẩm cho thư viện sách, phòng máy tính trường học.",
    blocklyLogic: [
      "Độ_Ẩm = Đọc_Cảm_Biến_DHT11()",
      "NẾU (Độ_Ẩm > 80%) THÌ:",
      "    Bật_Quạt_Hút_Thông_Gió_Chống_Ẩm()"
    ],
    arduinoCode: `// Khối 11 - Dự án 12: Quạt tự động theo độ ẩm
#include <DHT.h>
DHT dht(2, DHT11);
const int FAN = 7;

void loop() {
  float h = dht.readHumidity();
  if (h > 80) digitalWrite(FAN, HIGH);
  else digitalWrite(FAN, LOW);
  delay(2000);
}`,
    pythonCode: `# Khối 11 - Dự án 12: Python Humidity Controlled Fan
print("Quạt hút chống ẩm tự động...")`
  },
  {
    id: "g11_farm_rain_alarm",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 13",
    title: "13. Cảnh Báo Mưa Cho Nông Trại",
    shortDesc: "Cảm biến giọt nước phát hiện trời mưa, kích hoạt động cơ Servo tự động kéo mái che bảo vệ nông sản phơi outdoor.",
    hardware: ["Arduino Uno", "Cảm biến nước Raindrop Sensor", "Servo MG996R", "Còi Buzzer"],
    realWorldApp: "Mái che tự động phơi lúa, cà phê, nông sản cho bà con nông dân.",
    blocklyLogic: [
      "NẾU (Cảm_Biến_Mưa == CÓ_NƯỚC) THÌ:",
      "    Kéo_Mái_Che_Servo(180°)",
      "    Cảnh_Báo_Buzzer('TRỜI MƯA!')"
    ],
    arduinoCode: `// Khối 11 - Dự án 13: Cảnh báo mưa phơi nông sản
const int RAIN_PIN = A0;
void loop() {
  if (analogRead(RAIN_PIN) < 500) { // Có mưa
    Serial.println("Trời mưa -> Kéo mái che!");
  }
  delay(1000);
}`,
    pythonCode: `# Khối 11 - Dự án 13: Python Farm Rain Sensor
print("Cảnh báo mưa nông trại...")`
  },
  {
    id: "g11_bh1750_lux_meter",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 14",
    title: "14. Đo Ánh Sáng Bằng Cảm Biến BH1750",
    shortDesc: "Sử dụng cảm biến kĩ thuật số BH1750 giao tiếp I2C đo chính xác cường độ ánh sáng Lux chiếu lên lá cây.",
    hardware: ["Arduino Uno", "Cảm biến BH1750 I2C", "Màn hình OLED 0.96 inch"],
    realWorldApp: "Thực hành bài tập thí nghiệm Quang hợp môn Sinh học 11.",
    blocklyLogic: [
      "Đọc_Giá_Trị_Lux_Từ_BH1750_I2C()",
      "Hiển_Thị_Biểu_Đồ_Cường_Độ_Sáng_OLED()"
    ],
    arduinoCode: `// Khối 11 - Dự án 14: Đo ánh sáng chuẩn BH1750
#include <Wire.h>
#include <BH1750.h>
BH1750 lightMeter;

void setup() {
  Wire.begin();
  lightMeter.begin();
}

void loop() {
  float lux = lightMeter.readLightLevel();
  Serial.print("Cường độ sáng: "); Serial.print(lux); Serial.println(" lx");
  delay(1000);
}`,
    pythonCode: `# Khối 11 - Dự án 14: Python BH1750 Lux Meter
print("Đo cường độ ánh sáng chuẩn Lux BH1750...")`
  },
  {
    id: "g11_farm_dashboard",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 15",
    title: "15. Giám Sát Nông Trại Từ Xa Qua Dashboard",
    shortDesc: "Đẩy dữ liệu Nhiệt độ, Độ ẩm, Ánh sáng nông trại lên bảng điều khiển Web Dashboard trực quan theo thời gian thực.",
    hardware: ["Bo mạch ESP32", "DHT22", "BH1750", "Server Dashboard Blynk / Adafruit IO"],
    realWorldApp: "Giám sát thông số trang trại từ xa qua ứng dụng Smartphone cho chủ trang trại.",
    blocklyLogic: [
      "Đọc_Dữ_Liệu_Tất_Cả_Cảm_Biến()",
      "Gửi_Dữ_Liệu_Lên_Cloud_Blynk_App()",
      "Vẽ_Đồ_Thị_Nhiệt_Độ_Thời_Gian_Thực()"
    ],
    arduinoCode: `// Khối 11 - Dự án 15: Dashboard Nông Trại ESP32 Blynk
#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
// Đẩy dữ liệu cảm biến lên ứng dụng Blynk`,
    pythonCode: `# Khối 11 - Dự án 15: Python Smart Farm Dashboard
print("Đồng bộ dữ liệu nông trại lên Web Dashboard...")`
  },
  {
    id: "g11_group_smart_farm",
    grade: "11",
    groupId: "grade11",
    groupLabel: "🚀 Khối 11 - Dự án 16 (Dự Án Nhóm)",
    title: "16. Dự Án Nhóm: Nông Trại Thông Minh",
    shortDesc: "Xây dựng mô hình tổng thể nông trại công nghệ cao: Tưới tự động, chiếu sáng sinh trưởng, cảnh báo mưa giông và Dashboard IoT.",
    hardware: ["Mô hình nông trại thu nhỏ", "ESP32", "Đầy đủ tập cảm biến AgriTech", "Relay 4 kênh", "Máy bơm mini"],
    realWorldApp: "Dự án nhóm tích hợp xuất sắc đại diện tham gia Cuộc thi KHKT Học sinh Trung học.",
    blocklyLogic: [
      "TÍCH_HỢP_HỆ_THỐNG_NÔNG_TRẠI_THÔNG_MINH:",
      "1. Quản lý tưới tiêu đất & nhà kính",
      "2. Theo dõi môi trường không khí",
      "3. Thu mái che tự động khi mưa",
      "4. Đồng bộ Dashboard IoT Cloud"
    ],
    arduinoCode: `// Khối 11 - Dự án 16: Mô hình Nông Trại Thông Minh Tích Hợp
print("Dự án nhóm Khối 11 Nông Trại Thông Minh!");`,
    pythonCode: `# Khối 11 - Dự án 16: Python Smart Farm Complete System
print("Hệ thống Nông Nghiệp Thông Minh Khối 11 sẵn sàng!")`
  },

  // ==========================================
  // KHỐI 12 – STEM NÂNG CAO (16 DỰ ÁN)
  // ==========================================
  {
    id: "g12_mini_delivery_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 1",
    title: "1. Robot Giao Hàng Mini",
    shortDesc: "Robot tự hành mang thùng chứa đồ, di chuyển theo vạch chỉ dẫn và dừng đúng vị trí phòng học nhờ đọc thẻ RFID mốc điểm.",
    hardware: ["Khung xe 4 bánh Mecanum", "Arduino Mega", "Cảm biến dò line 5 kênh", "RFID RC522", "Mạch L298N"],
    realWorldApp: "Robot chuyển tài liệu, phấn viết, đồ dùng học tập giữa các phòng ban trong nhà trường.",
    blocklyLogic: [
      "Chạy_Dò_Line_Theo_Tuyến_Đường()",
      "NẾU (Quét_Thấy_Mốc_RFID_Phòng_12A1) THÌ:",
      "    Dừng_Xe_30_Giây()",
      "    Mở_Thùng_Hàng_Giao_Đồ()",
      "    Phát_Âm_Thanh('Đã giao hàng thành công!')"
    ],
    arduinoCode: `// Khối 12 - Dự án 1: Robot giao hàng mini
// Lập trình định vị điểm dừng theo RFID`,
    pythonCode: `# Khối 12 - Dự án 1: Python Mini Delivery Robot
print("Robot giao hàng tự động...")`
  },
  {
    id: "g12_trash_picker_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 2",
    title: "2. Robot Nhặt Rác Trong Lớp Học",
    shortDesc: "Robot di chuyển tự do nhặt chai nhựa, mẩu giấy rác trên sàn lớp học bằng trục gạt rác xoay liên tục.",
    hardware: ["Khung xe robot bánh xích", "Arduino Uno", "Trục chổi gạt rác xoay DC", "Cảm biến HC-SR04 né vật cản"],
    realWorldApp: "Giữ gìn vệ sinh không gian lớp học xanh - sạch - đẹp tự động.",
    blocklyLogic: [
      "Bật_Trục_Chổi_Gạt_Rác_Xoay_Liên_Tục()",
      "Chạy_Chế_Độ_Di_Chuyển_Né_Bàn_Ghế()",
      "NẾU (Thùng_Chứa_Rác_Đầy) THÌ:",
      "    Dừng_Xe_Và_Phát_Cảnh_Báo_Đổ_Rác()"
    ],
    arduinoCode: `// Khối 12 - Dự án 2: Robot nhặt rác lớp học
const int BRUSH_MOTOR = 5;
void setup() { pinMode(BRUSH_MOTOR, OUTPUT); }
void loop() { digitalWrite(BRUSH_MOTOR, HIGH); }`,
    pythonCode: `# Khối 12 - Dự án 2: Python Trash Picker Bot
print("Robot nhặt rác lớp học tự động...")`
  },
  {
    id: "g12_security_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 3",
    title: "3. Robot An Ninh",
    shortDesc: "Robot an ninh phát video trực tuyến Wi-Fi. Khi phát hiện khuôn mặt người lạ ban đêm, phát còi hú và chụp ảnh gửi Telegram.",
    hardware: ["Bo mạch ESP32-CAM", "Khung xe 2 bánh", "Đèn Flash LED", "Cảm biến PIR", "Bot Telegram API"],
    realWorldApp: "Tuần tra an ninh đêm cho thư viện, phòng máy tính, kho vật tư trường học.",
    blocklyLogic: [
      "Truyền_Hình_Ảnh_Camera_Live_Stream()",
      "NẾU (PIR_Phát_Hiện_Xâm_Nhập_Đêm) THÌ:",
      "    Bật_Đèn_Flash_Chụp_Ảnh()",
      "    Gửi_Bức_Ảnh_Qua_Telegram_Cho_Bảo_Vệ()",
      "    Bật_Còi_Báo_Động_An_Ninh()"
    ],
    arduinoCode: `// Khối 12 - Dự án 3: Robot an ninh ESP32-CAM Telegram
#include "esp_camera.h"
#include <WiFi.h>
#include <UniversalTelegramBot.h>
// Lập trình chụp hình gửi Telegram Bot`,
    pythonCode: `# Khối 12 - Dự án 3: Python Security Bot
print("Robot an ninh truyền video & cảnh báo Telegram...")`
  },
  {
    id: "g12_stair_climbing_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 4",
    title: "4. Robot Leo Cầu Thang",
    shortDesc: "Thiết kế cơ cấu bánh sao 3 chấu đặc biệt giúp xe robot vượt chướng ngại vật và trèo lên các bậc cầu thang.",
    hardware: ["Khung xe bánh sao 3 chấu (Rocker-Bogie)", "2 x Động cơ GA25 giảm tốc", "Mạch TB6612", "Arduino Uno"],
    realWorldApp: "Robot cứu hộ di chuyển trong địa hình phức tạp, nhà cao tầng không có thang máy.",
    blocklyLogic: [
      "Bật_Chế_Độ_Mô-men_Xoắn_Cực_Đại()",
      "Xoay_Cơ_Cấu_Bánh_Sao_Để_Móc_Lên_Bậc_Cầu_Thang()"
    ],
    arduinoCode: `// Khối 12 - Dự án 4: Robot leo cầu thang cơ cấu bánh sao
// Động cơ công suất lớn vượt địa hình`,
    pythonCode: `# Khối 12 - Dự án 4: Python Stair Climbing Robot
print("Robot trèo cầu thang vượt địa hình...")`
  },
  {
    id: "g12_app_robot_arm",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 5",
    title: "5. Cánh Tay Robot Điều Khiển Qua Điện Thoại",
    shortDesc: "Điều khiển mượt mà 4 khớp cánh tay robot bằng giao diện thanh trượt Slider trên ứng dụng di động kết nối Bluetooth.",
    hardware: ["4 x Động cơ Servo MG990D", "Arduino Uno", "Module Bluetooth HC-05", "Khung Acrylic Cánh Tay"],
    realWorldApp: "Điều khiển từ xa tay máy thao tác trong môi trường độc hại, phòng thí nghiệm bức xạ.",
    blocklyLogic: [
      "Nhận_Góc_Quay_4_Khớp_Từ_App_Smartphone()",
      "Cập_Nhật_Góc_Servo_Vai_Khuỷu_Xoay_Kẹp()"
    ],
    arduinoCode: `// Khối 12 - Dự án 5: Cánh tay Robot app điện thoại Bluetooth
#include <Servo.h>
Servo s1, s2, s3, s4;
void setup() { Serial.begin(9600); }
void loop() { /* Nhận lệnh chuỗi góc từ Bluetooth */ }`,
    pythonCode: `# Khối 12 - Dự án 5: Python Bluetooth Arm Controller
print("Điều khiển cánh tay robot qua ứng dụng di động...")`
  },
  {
    id: "g12_sorting_arm_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 6",
    title: "6. Robot Gắp Phân Loại Sản Phẩm",
    shortDesc: "Sử dụng cảm biến nhận diện màu sắc TCS3200 để phân loại sản phẩm Đỏ / Xanh / Vàng và gắp thả vào đúng khay.",
    hardware: ["Arduino Uno", "Cảm biến màu sắc TCS3200", "Cánh tay Robot Servo 3-DOF", "Băng tải mini"],
    realWorldApp: "Phân loại nông sản trái cây, phân loại linh kiện nhựa trong dây chuyền sản xuất tự động.",
    blocklyLogic: [
      "Màu = Phân_Tích_Màu_Cảm_Biến_TCS3200()",
      "NẾU (Màu == ĐỎ) -> Gắp thả sang Khay A",
      "NẾU (Màu == XANH) -> Gắp thả sang Khay B",
      "NẾU (Màu == VÀNG) -> Gắp thả sang Khay C"
    ],
    arduinoCode: `// Khối 12 - Dự án 6: Robot phân loại màu sắc TCS3200
const int S2 = 4, S3 = 5, OUT_PIN = 6;
void setup() { pinMode(OUT_PIN, INPUT); }
void loop() { /* Đọc chu kỳ tần số màu R-G-B */ }`,
    pythonCode: `# Khối 12 - Dự án 6: Python Color Sorting Robot
print("Robot phân loại sản phẩm theo màu sắc...")`
  },
  {
    id: "g12_barista_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 7",
    title: "7. Robot Pha Chế Đồ Uống Mini",
    shortDesc: "Hệ thống tự động rót đúng định lượng ml nước ngọt / si rô theo lựa chọn công thức từ màn hình cảm ứng Touch Screen.",
    hardware: ["Arduino Mega", "3 x Bơm nhu động Peristaltic 12V", "Màn hình TFT Touch Screen 3.5 inch", "Relay 4 kênh"],
    realWorldApp: "Máy pha chế đồ uống tự động tại canteen trường học, tiệm trà sữa thông minh.",
    blocklyLogic: [
      "Chọn_Món_Từ_Màn_Hình_TFT('Trà Trái Cây')",
      "Bật_Bơm_1(Bơm 100ml Nước Trà)",
      "Bật_Bơm_2(Bơm 30ml Si-rô Cam)",
      "Khuấy_Đều_Và_Thông_Báo_Hoàn_Thành()"
    ],
    arduinoCode: `// Khối 12 - Dự án 7: Robot pha chế đồ uống tự động
const int PUMP1 = 22, PUMP2 = 23, PUMP3 = 24;
void setup() { pinMode(PUMP1, OUTPUT); }
void loop() { /* Rót dung dịch theo định lượng thời gian */ }`,
    pythonCode: `# Khối 12 - Dự án 7: Python Barista Bot
print("Robot pha chế đồ uống tự động...")`
  },
  {
    id: "g12_soccer_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 8",
    title: "8. Robot Bóng Đá Mini",
    shortDesc: "Robot đá bóng bánh xe Omni di chuyển đa hướng 360°, sút bóng cơ cấu lò xo piston lực mạnh điều khiển gamepad.",
    hardware: ["3 x Động cơ DC kèm Encoder", "3 x Bánh xe Omni", "Mạch điều khiển Driver Motor", "Tay cầm Gamepad PS2 / Bluetooth"],
    realWorldApp: "Sản phẩm tham gia Giải thi đấu Robotacon Robofetch cho học sinh THPT.",
    blocklyLogic: [
      "Di_Chuyển_Đa_Hướng_Omni(Góc 45°, Tốc độ 100%)",
      "NẾU (Nút_Sút_Bóng == BẤM) THÌ:",
      "    Kích_Hoạt_Piston_Sút_Bóng_Mạnh()"
    ],
    arduinoCode: `// Khối 12 - Dự án 8: Robot đá bóng bánh xe Omni 360
// Lập trình động học ngược Robot Omni`,
    pythonCode: `# Khối 12 - Dự án 8: Python Soccer Bot
print("Robot đá bóng di chuyển đa hướng Omni...")`
  },
  {
    id: "g12_fire_fighting_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 9",
    title: "9. Robot Chữa Cháy Tự Động",
    shortDesc: "Robot tự động tìm định vị nguồn ngọn lửa bằng mảng cảm biến ngọn lửa và bật máy bơm nước phun dập tắt lửa.",
    hardware: ["Khung xe robot", "Mảng 3 cảm biến Flame IR", "Máy bơm nước áp lực cao 12V", "Vòi phun xịt nước xoay Servo"],
    realWorldApp: "Robot chữa cháy tiên phong đi vào vùng hỏa hoạn nguy hiểm dập lửa bảo vệ con người.",
    blocklyLogic: [
      "Quét_Định_Vị_Góc_Ngọn_Lửa()",
      "Xoay_Xe_Hướng_Về_Phía_Đống_Lửa()",
      "Di_Chuyển_Lại_Gần(Khoảng cách 30cm)",
      "Bật_Bơm_Áp_Lực_Phun_Nước_Dập_Tắt_Lửa()"
    ],
    arduinoCode: `// Khối 12 - Dự án 9: Robot chữa cháy dập lửa tự động
const int PUMP = 8;
void setup() { pinMode(PUMP, OUTPUT); }
void loop() { /* Phun nước khi thấy lửa */ }`,
    pythonCode: `# Khối 12 - Dự án 9: Python Fire Fighting Bot
print("Robot chữa cháy tự động dập lửa...")`
  },
  {
    id: "g12_shape_recognition_bot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 10",
    title: "10. Robot Nhận Diện Hình Dạng",
    shortDesc: "Tích hợp AI xử lý ảnh camera OpenCV phân biệt hình Tròn / Vuông / Tam giác để điều khiển hướng di chuyển.",
    hardware: ["Raspberry Pi 4 / ESP32-S3", "Module Camera OV2640", "Màn hình hiển thị LCD", "Khung xe robot"],
    realWorldApp: "Nhập môn Thị giác máy tính (Computer Vision) và Trí tuệ nhân tạo (AI) cho học sinh THPT.",
    blocklyLogic: [
      "Chụp_Ảnh_Khung_Hình_Từ_Camera()",
      "Phân_Tích_Đường_Viền_Contour_OpenCV()",
      "NẾU (Số_Cạnh == 3) -> Nhận diện Hình Tam Giác",
      "NẾU (Số_Cạnh == 4) -> Nhận diện Hình Vuông",
      "NẾU (Độ_Tròn > 0.85) -> Nhận diện Hình Tròn"
    ],
    arduinoCode: `// Khối 12 - Dự án 10: Robot AI nhận diện hình dạng
// Kết nối ESP32-S3 AI Sense`,
    pythonCode: `# Khối 12 - Dự án 10: Python OpenCV Shape Recognition
import cv2
print("Robot AI nhận diện hình dạng khối...")`
  },
  {
    id: "g12_pump_vibration_monitor",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 11",
    title: "11. Giám Sát Độ Rung Máy Bơm",
    shortDesc: "Cảm biến gia tốc MPU6050 đo độ rung lắc 3 trục của động cơ máy bơm. Độ rung bất thường báo động bảo trì trước khi hỏng.",
    hardware: ["Arduino Uno", "Cảm biến MPU6050 6-Axis Gyro/Accel", "Màn hình OLED 0.96 inch", "Còi Buzzer"],
    realWorldApp: "Bảo trì dự đoán (Predictive Maintenance) cho máy móc công nghiệp trong nhà máy.",
    blocklyLogic: [
      "Đọc_Gia_Tốc_X_Y_Z_Từ_MPU6050()",
      "Độ_Rung_Tổng = Sqrt(Ax^2 + Ay^2 + Az^2)",
      "NẾU (Độ_Rung_Tổng > Ngưỡng_An_Toàn) THÌ:",
      "    Phát_Cảnh_Báo_Máy_Rung_Lắc_Bất_Thường()"
    ],
    arduinoCode: `// Khối 12 - Dự án 11: Giám sát độ rung MPU6050
#include <Wire.h>
#include <MPU6050.h>
MPU6050 mpu;

void setup() {
  Wire.begin();
  mpu.initialize();
}

void loop() {
  int16_t ax, ay, az;
  mpu.getAcceleration(&ax, &ay, &az);
  Serial.print("Vibration Z: "); Serial.println(az);
  delay(200);
}`,
    pythonCode: `# Khối 12 - Dự án 11: Python MPU6050 Vibration Monitor
print("Giám sát độ rung động cơ MPU6050...")`
  },
  {
    id: "g12_mini_drone",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 12",
    title: "12. Robot Drone Mini (Mô Hình Quạt Nâng)",
    shortDesc: "Mô hình cân bằng lực nâng quạt cân bằng động bằng cảm biến góc nghiêng MPU6050 điều khiển động cơ không chổi than BLDC.",
    hardware: ["Khung tay đòn cân bằng", "Cảm biến MPU6050", "Động cơ BLDC + ESC 30A", "Arduino Uno", "Cánh quạt Drone"],
    realWorldApp: "Nghiên cứu nguyên lý khí động học và hệ thống tự cân bằng cho thiết bị bay không người lái.",
    blocklyLogic: [
      "Góc_Nghiêng = Đọc_Góc_Nghiêng_MPU6050()",
      "Tín_Hiệu_Tốc_Độ_Quạt = Tín_Hiệu_PID_Cân_Bằng(Góc_Nghiêng)",
      "Điều_Chỉnh_Xung_PWM_ESC_Tăng_Giảm_Lực_Nâng()"
    ],
    arduinoCode: `// Khối 12 - Dự án 12: Mô hình lực nâng Drone cân bằng PID
// Lập trình điều khiển tốc độ góc nghiêng quạt nâng`,
    pythonCode: `# Khối 12 - Dự án 12: Python Mini Drone PID Balance
print("Mô hình quạt nâng Drone cân bằng PID...")`
  },
  {
    id: "g12_water_leak_alert",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 13",
    title: "13. Hệ Thống Cảnh Báo Rò Rỉ Nước",
    shortDesc: "Cảm biến lưu lượng dòng chảy YF-S201 phát hiện ống nước rò rỉ âm tường, tự động đóng van điện từ Solenoid khóa nước.",
    hardware: ["Arduino Uno", "Cảm biến lưu lượng nước YF-S201", "Van điện từ Solenoid Valve 12V", "LCD1602"],
    realWorldApp: "Chống thất thoát nước sạch, bảo vệ công trình khỏi bị ngấm rò rỉ nước âm tường.",
    blocklyLogic: [
      "Lưu_Lượng = Đếm_Số_Xung_Cảm_Biến_Lưu_Lượng()",
      "NẾU (Không_Có_Ai_Dùng_Mà_Lưu_Lượng > 0) THÌ:",
      "    Phát_Hiện_Rò_Rỉ_Đường_Ống!",
      "    Đóng_Van_Điện_Từ_Khóa_Nước_Khẩn_Cấp()"
    ],
    arduinoCode: `// Khối 12 - Dự án 13: Cảnh báo rò rỉ nước van điện từ
const int FLOW_SENSOR = 2;
const int VALVE_PIN = 8;
volatile int flowPulses = 0;

void setup() {
  pinMode(FLOW_SENSOR, INPUT_PULLUP);
  pinMode(VALVE_PIN, OUTPUT);
  attachInterrupt(0, [](){ flowPulses++; }, RISING);
}

void loop() {
  // Kiểm tra lưu lượng rò rỉ và khóa van
}`,
    pythonCode: `# Khối 12 - Dự án 13: Python Water Leak Detector
print("Hệ thống cảnh báo rò rỉ nước tự động...")`
  },
  {
    id: "g12_farm_cloud_iot",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 14",
    title: "14. IoT Gửi Dữ Liệu Farm Lên Cloud",
    shortDesc: "Sử dụng giao thức MQTT kết nối ESP32 gửi toàn bộ dữ liệu nông trại lên nền tảng Cloud Firebase / ThingSpeak.",
    hardware: ["Bo mạch ESP32", "Cảm biến DHT22, Soil, Lux", "Nền tảng Cloud Google Firebase Realtime Database"],
    realWorldApp: "Số hóa dữ liệu nông nghiệp, lưu trữ lịch sử vụ mùa trên đám mây để phân tích AI.",
    blocklyLogic: [
      "Kết_Nối_WiFi_Và_MQTT_Broker_Cloud()",
      "Đóng_Gói_Dữ_Liệu_JSON({temp, humidity, soil, lux})",
      "Gửi_Dữ_Liệu_Lên_Cloud_Firebase_Database()"
    ],
    arduinoCode: `// Khối 12 - Dự án 14: Gửi dữ liệu Farm lên Cloud Firebase
#include <WiFi.h>
#include <FirebaseESP32.h>
// Lập trình đồng bộ dữ liệu Realtime Database`,
    pythonCode: `# Khối 12 - Dự án 14: Python Cloud Farm IoT
import urequests, json
print("Đồng bộ dữ liệu Nông nghiệp lên Cloud Firebase...")`
  },
  {
    id: "g12_grain_drying_fan",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 15",
    title: "15. Điều Khiển Quạt Sấy Nông Sản",
    shortDesc: "Tự động điều chỉnh nhiệt độ gia nhiệt và tốc độ quạt thổi khí nóng sấy khô lúa, ngô, cà phê đạt chuẩn ẩm độ.",
    hardware: ["Arduino Uno", "Cảm biến nhiệt độ ẩm DHT22", "Mạch công suất sấy Relay / Triac BTA16", "Quạt sấy ly tâm 220V"],
    realWorldApp: "Hệ thống lò sấy nông sản quy mô trang trại, giảm tổn thất sau thu hoạch.",
    blocklyLogic: [
      "NẾU (Độ_Ẩm_Nông_Sản > 14%) THÌ:",
      "    Bật_Dây_Mai-so_Gia_Nhiệt(Nhiệt độ 55°C)",
      "    Bật_Quạt_Thổi_Khí_Nóng_Sấy()",
      "NGƯỢC LẠI:",
      "    Hoàn_Thành_Mẻ_Sấy -> Tắt_Hệ_Thống()"
    ],
    arduinoCode: `// Khối 12 - Dự án 15: Điều khiển quạt sấy nông sản
const int HEATER = 6, FAN = 7;
void setup() { pinMode(HEATER, OUTPUT); pinMode(FAN, OUTPUT); }
void loop() { /* Lập trình chu trình sấy tự động */ }`,
    pythonCode: `# Khối 12 - Dự án 15: Python Grain Drying System
print("Hệ thống lò sấy nông sản tự động...")`
  },
  {
    id: "g12_group_autonomous_car",
    grade: "12",
    groupId: "grade12",
    groupLabel: "🦾 Khối 12 - Dự án 16 (Dự Án Nhóm)",
    title: "16. Dự Án Nhóm: Xe Tự Hành Dò Line",
    shortDesc: "Dự án xe tự hành thông minh kết hợp Dò đường PID, Né vật cản Siêu âm, Đọc biển báo RFID và Điều khiển qua Wi-Fi Cloud.",
    hardware: ["Khung xe 4 bánh Mecanum", "ESP32-CAM / Arduino Mega", "Cảm biến dò line, HC-SR04, RFID", "Pin Li-po 3S"],
    realWorldApp: "Mô hình xe ô tô tự lái (Autonomous Vehicle) cấp độ trung học, sản phẩm nghiên cứu trọng điểm Cuộc thi STEM.",
    blocklyLogic: [
      "DỰ_ÁN_NHÓM_XE_TỰ_HÀNH_XUẤT_SẮC:",
      "1. Điều khiển di chuyển dò line tốc độ cao",
      "2. Phát hiện vật cản & chọn làn né tránh",
      "3. Đọc mốc biển báo dừng xe RFID",
      "4. Truyền Video Live Stream & Điều khiển từ xa Cloud"
    ],
    arduinoCode: `// Khối 12 - Dự án 16: Mô hình Xe Tự Hành Thông Minh Tích Hợp
print("Dự án Xe Tự Hành Khối 12 hoàn chỉnh!");`,
    pythonCode: `# Khối 12 - Dự án 16: Python Autonomous Self-Driving Car
print("Hệ thống Xe Tự Hành Khối 12 đã sẵn sàng!")`
  }
];
