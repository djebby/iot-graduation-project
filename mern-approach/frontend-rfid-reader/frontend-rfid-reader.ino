#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WifiClient.h>

#define ON_Board_LED 2

const char* ssid = "Flybox_936B";
const char* password = "80850275";
const char JSON_WEB_TOKEN[] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlzIjoiVHVuaXNpYSIsImxpZXUiOiJBZ2VuY2UgUmFwaWQtUG9zdGUgQXJpYW5hIiwidHlwZV9ldmVuIjoiRW52b3llciB2ZXJzIGxlIHByb2NoYWluIHBvaW50IGRlIHRyYWl0ZW1lbnQiLCJhdXRyZXNfaW5mbyI6IiIsImlhdCI6MTY1MTc1NTQ0OSwiZXhwIjoxNjU5NTMxNDQ5fQ.fAinwS5XGkJfljdFIp87Z0aoSfcFyhrV0BoVdtbO-aU";

int numberOfRequests = 0;

HTTPClient http;
WiFiClient wifiClient;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
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
}

void loop() {
  // put your main code here, to run repeatedly:
  

  if(numberOfRequests < 1 ) {
    // Testing Request
    http.begin(wifiClient, "http://192.168.1.155:4000/api/ajouter_movement/1a2b3c4d");
    http.addHeader("Authorization", JSON_WEB_TOKEN);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST("{}"); // Sending the request
    String responseData = http.getString(); // response of our request
    Serial.println(httpCode);
    Serial.println(responseData);
  
    http.end();
    numberOfRequests++;
  }
}
