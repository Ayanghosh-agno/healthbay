#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <PubSubClient.h>

#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

#define WIFI_SSID "GNXS-2DC800"
#define WIFI_PW "PassKey@321"

#define MQTT_USER "healthbay"
#define MQTT_PASS "PassKey321"

#define REPORT_EVERY 1000

WiFiClient client;
PubSubClient psClient;

// Connections : SCL PIN - D1 , SDA PIN - D2 , INT PIN - D0
PulseOximeter pox;
unsigned long lastReportTime = millis();

void connectToWifi()
{
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PW);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void mqttCallback(char *topic, byte *payload, unsigned int length)
{
}

void connectMqtt()
{
  psClient.setClient(client);
  psClient.setServer("api.healthbay.us", 1883);

  bool konnek = psClient.connect("healthbay-dev-0f2dc");

  if (konnek)
  {
    Serial.println("MQTT Connected");
    psClient.setCallback(mqttCallback);
  }
  else
    Serial.println("MQTT Not Connected");
}

void setupPox()
{
  Serial.print("Initializing Pulse Oximeter..");

  if (!pox.begin())
  {
    Serial.println("FAILED");
    for (;;)
      ;
  }
  else
  {
    Serial.println("SUCCESS");
  }

  // The default current for the IR LED is 50mA and it could be changed by uncommenting the following line.
  // pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
}

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  Serial.begin(115200);

  connectToWifi();
  connectMqtt();
  setupPox();

  digitalWrite(LED_BUILTIN, HIGH);
}

void loop()
{
  pox.update();
  psClient.loop();

  digitalWrite(LED_BUILTIN, HIGH);

  if (!psClient.connected())
  {
    digitalWrite(LED_BUILTIN, LOW);
    connectMqtt();
  }

  if (millis() - lastReportTime > REPORT_EVERY)
  {
    lastReportTime = millis();

    String json = "{\"bpm\":" + String(pox.getHeartRate()) + ",\"spo2\":" + String(pox.getSpO2()) + "}";
    psClient.publish("healthbay/hrtspo2-0f2dc/hrtspo2", json.c_str());
  }
}