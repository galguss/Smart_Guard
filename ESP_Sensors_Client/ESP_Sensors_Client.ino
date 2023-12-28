#include "Adafruit_VL53L0X.h"

// ----- distance sensor ---------
Adafruit_VL53L0X dis = Adafruit_VL53L0X();
unsigned long TimeMeasuringDistance;
int distanceMM(){
  VL53L0X_RangingMeasurementData_t distance;
  dis.rangingTest(&distance, false);
  
  return distance.RangeMilliMeter;
}

int distanceCM(){
  int distanceCM = distanceMM();
    int newDistance;
  int counter = 1;
  
  for(int k = 0; k<10; k++){
      newDistance = distanceMM();
    if(!((distanceCM - newDistance) < 0 || (distanceCM - newDistance) > 50)){
      distanceCM += newDistance;
      counter++;
    }
  }

    distanceCM /= counter;
    return distanceCM / 10;
}

void setup() {
  Serial.begin(115200);
  dis.begin();
  WiFi_Setup();
  TimeMeasuringDistance = millis();
}

void loop() {
  if((millis() - TimeMeasuringDistance) > 1000){
    SendData(distanceCM());
    TimeMeasuringDistance = millis();
  } 
}
