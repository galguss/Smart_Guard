#include "esp_camera.h"

//#define RedLed 33
unsigned long TimeOfInformationRequest;
int distance;

// camera init
#define CAMERA_MODEL_AI_THINKER
#include "camera_pins.h"

void camera_setup(){
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 10000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if(psramFound()){
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 40;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
}

// Application manager
#define VEHICLE_IDENTIFICATION 40
#define ISSUING_A_VEHICLE_NUMBER 41
#define VEHICLE_NUMBER_CKECK 42
#define DATA_RESET 43
int CurrentStatus;
String carNumber = "";

void setup() {
  Serial.begin(115200);
  //pinMode(RedLed, OUTPUT);
  WiFi_SETUP();
  //connectingSocket();
  camera_setup();
  TimeOfInformationRequest = millis();
  CurrentStatus = VEHICLE_IDENTIFICATION;
}


void loop() {
  /*switch(CurrentStatus){
    case VEHICLE_IDENTIFICATION:
    
      if((millis() - TimeOfInformationRequest) > 1000){
        distance = GetData();
        TimeOfInformationRequest = millis();
      }
    
      if(distance < 50){
        CurrentStatus = ISSUING_A_VEHICLE_NUMBER;
      }

      
    break;
    case ISSUING_A_VEHICLE_NUMBER:
      sendImage();
      carNumber = getMessage();
      if(carNumber != ""){
        CurrentStatus = VEHICLE_NUMBER_CKECK;
      }
    break;
    case VEHICLE_NUMBER_CKECK:
    break;
    case DATA_RESET:
      carNumber = "";
      CurrentStatus = VEHICLE_IDENTIFICATION;
    break;
  }*/
  /*Serial.print("distance(CM): ");
  Serial.println(distanceCM());*/
  delay(1000); // wait a bit before taking the next measurement
}
