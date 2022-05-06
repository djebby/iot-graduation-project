#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WifiClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include "json-web-token.h";
#include "pitches.h";

#define SS_PIN D2
#define RST_PIN D1
#define ON_Board_LED 2
#define buzzer 15

const char* ssid = "Flybox_936B";
const char* password = "80850275";
MFRC522 mfrc522(SS_PIN, RST_PIN);

int numberOfRequests = 0;

HTTPClient http;
WiFiClient wifiClient;

int readsuccess;
byte readcard[4];
char str[32] = "";
String StrUID;

// notes in the melody:
int melody[] = { NOTE_C4, NOTE_G3, NOTE_G3, NOTE_A3, NOTE_G3, 0, NOTE_B3, NOTE_C4 };
// note durations: 4 = quarter note, 8 = eighth note, etc.:
int noteDurations[] = { 4, 8, 8, 4, 4, 4, 4, 4 };

void setup() {
   for (int thisNote = 0; thisNote < 8; thisNote++) {
    // to calculate the note duration, take one second divided by the note type.
    //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 1000 / noteDurations[thisNote];
    tone(buzzer, melody[thisNote], noteDuration);
    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);
    // stop the tone playing:
    noTone(buzzer);
  }
  pinMode(buzzer,OUTPUT);

  
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();
  delay(500);
  WiFi.begin(ssid, password);
  Serial.println("");
  pinMode(ON_Board_LED, OUTPUT);
  digitalWrite(ON_Board_LED, HIGH);
  // Waiting for conection
  Serial.print("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    digitalWrite(ON_Board_LED, LOW);
    delay(250);
    digitalWrite(ON_Board_LED, HIGH);
    delay(250);
  }
  // Turn off the On Board LED when it is connected to the wifi router.
  digitalWrite(ON_Board_LED, HIGH);
  Serial.println("");
  Serial.print("Successfully connected to : ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("");
}

void loop() {
  readsuccess = getid();
  if(readsuccess) {
    digitalWrite(ON_Board_LED, LOW);
    Serial.println("POST => http://192.168.1.155:4000/api/ajouter_movement/"+StrUID);
    http.begin(wifiClient, "http://192.168.1.155:4000/api/ajouter_movement/"+StrUID);
    http.addHeader("Authorization", JSON_WEB_TOKEN);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST("{}"); // Sending the request
    String responseData = http.getString(); // response of our request

    // Handling the response comming from the backend
    if(httpCode == 201) {
      Serial.println(responseData);
      digitalWrite(buzzer,HIGH);
      delay(75);
      digitalWrite(buzzer,LOW);
    } else {
      Serial.println("error from the backend " + responseData);
      int i_error = 0;
      while(i_error < 15 ) {
        digitalWrite(buzzer,HIGH);
        delay(75);
        digitalWrite(buzzer,LOW);
        delay(75);
        i_error++;
      }
    }
    http.end();
    delay(1000);
    digitalWrite(ON_Board_LED, HIGH);
  }
}

//----------------------------------------Procedure for reading and obtaining a UID from a card or keychain
int getid() {
  if(!mfrc522.PICC_IsNewCardPresent()){
    return 0;
  }
  if(!mfrc522.PICC_ReadCardSerial()){
    return 0;
  }
  Serial.print("THE UID OF THE SCANNED CARD IS : ");
  for(int i=0; i<4; i++){
    readcard[i] = mfrc522.uid.uidByte[i]; // storing the UID of the tag in readcard
    array_to_string(readcard, 4, str);
    StrUID = str;
  }
  Serial.println(StrUID);
  mfrc522.PICC_HaltA();
  return 1;
}

void array_to_string(byte array[], unsigned int len, char buffer[]) {
    for (unsigned int i = 0; i < len; i++) {
        byte nib1 = (array[i] >> 4) & 0x0F;
        byte nib2 = (array[i] >> 0) & 0x0F;
        buffer[i*2+0] = nib1  < 0xA ? '0' + nib1  : 'A' + nib1  - 0xA;
        buffer[i*2+1] = nib2  < 0xA ? '0' + nib2  : 'A' + nib2  - 0xA;
    }
    buffer[len*2] = '\0';
}
