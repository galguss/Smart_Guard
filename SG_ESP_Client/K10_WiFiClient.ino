#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include <WiFiClient.h>
#include <HTTPClient.h>

const char* ssid = "Gal";
const char* password = "0544933268";
const char* websocket_server_host = "192.168.1.83";
const uint16_t websocket_server_port = 4050;

using namespace websockets;
WebsocketsClient clientSocket;

WiFiClient client;

void WiFi_SETUP(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}

void connectingSocket(){
  while(!clientSocket.connect(websocket_server_host, websocket_server_port, "/ESP")){
    delay(500);
    Serial.print(".");
  }
  Serial.println("Websocket Connected!");
}

void sendImage(){
   camera_fb_t *fb = esp_camera_fb_get();
  if(!fb){
    Serial.println("Camera capture failed");
    esp_camera_fb_return(fb);
    return;
  }

  if(fb->format != PIXFORMAT_JPEG){
    Serial.println("Non-JPEG data not implemented");
    return;
  }

  clientSocket.send(IDY);
  clientSocket.sendBinary((const char*) fb->buf, fb->len);
  esp_camera_fb_return(fb);
}

/*String getMessage(){
  String getData;
  clientSocket.onMessage([&](WebsocketsMessage message){
       getData = String(message.data());  
    });
  clientSocket.poll();
  return getData;
}*/

int GetData() {
   int ret = -1;
   HTTPClient http;
   String dataURL = "";
   dataURL += "IDY=";
   dataURL += IDY;
   http.begin(client, "http://192.168.1.83:4000/ESP/Pull?" + dataURL);
   int httpCode = http.GET();
   //Serial.println(httpCode);
   if(httpCode == HTTP_CODE_OK) {
     //Serial.print("HTTP response code ");
     //Serial.println(httpCode);
     String Res = http.getString();
     //Serial.println(Res);
     ret = Res.toInt();
    }
    http.end();
        
    return ret;
}
