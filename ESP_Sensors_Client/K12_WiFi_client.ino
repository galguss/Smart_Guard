#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>

const char* ssid = "Gal";
const char* password = "0544933268";

WiFiClient client;

void WiFi_Setup(){
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}


void SendData(int val) {
   HTTPClient http;
   String dataURL = "";
   dataURL += "IDY=9";
   dataURL += "&VAL="+String(val);
   http.begin(client,"http://192.168.1.83:4000/ESP/Change?" + dataURL);
   int httpCode = http.GET();
   Serial.println(httpCode);
   http.end();
}
