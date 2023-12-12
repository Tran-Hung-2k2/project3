#include <Arduino.h>
#include <ESP32Servo.h>
#include <MFRC522.h>
#include <SPI.h>

// Định nghĩa chân kết nối
#define SS_PIN  21
#define RST_PIN 22

// Tạo đối tượng MFRC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

Servo myservo;  // create servo object to control a servo
int pos = 0;

int servoPin = 13;

void setup() {
    // Khởi tạo kết nối Serial
    Serial.begin(9600);
    // Khởi tạo giao tiếp SPI
    SPI.begin();
    // Khởi tạo module đọc thẻ RFID
    mfrc522.PCD_Init();
    // Allow allocation of all timers
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    ESP32PWM::allocateTimer(2);
    ESP32PWM::allocateTimer(3);
    myservo.setPeriodHertz(50);  // standard 50 hz servo
    myservo.attach(servoPin, 1000,
                   2000);  // attaches the servo on pin 18 to the servo object
}

void loop() {
    // Kiểm tra xem có thẻ mới nằm trên đầu đọc hay không
    if (!mfrc522.PICC_IsNewCardPresent()) {
        return;
    }

    // Đọc thông tin từ thẻ nếu có thẻ mới
    if (!mfrc522.PICC_ReadCardSerial()) {
        return;
    }

    myservo.write(180);
    delay(3000);
    myservo.write(0);
}