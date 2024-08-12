#include <SoftwareSerial.h>
#include<LiquidCrystal_I2C.h>
#include <Wire.h> 
#include<String.h>
LiquidCrystal_I2C lcd(0x27,20, 4);
// RE and DE Pins set the RS485 module to Receiver or Transmitter mode
#define RE 8
#define DE 7
int point = 1;
// Modbus RTU requests for reading NPK values
const byte nitro[] = {0x01,0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
const byte phos[] = {0x01,0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
const byte pota[] = {0x01,0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};
// A variable used to store NPK values
byte values[11];
// Sets up a new SoftwareSerial object
SoftwareSerial mod(2, 3); 
int a = 20, b = 0;
String message;
int pre1=0, pre2=0, pre3=0, pre4=0;
String   mystr2, mystr3, mystr4;
byte prev1=0, prev2=0,prev3=0;
void setup() {
  Serial.begin(19200);// Set the baud rate for the Serial port
  // Set the baud rate for the SerialSoftware object
  mod.begin(9600);
  // Define pin modes for RE and DE
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  digitalWrite(12,LOW);
  digitalWrite(4, HIGH);
    digitalWrite(12, HIGH);
  lcd.begin(20, 4);
  lcd.init();                      // initialize the lcd  
lcd.init();
lcd.backlight();
lcd.setCursor(2,0);
lcd.print("WELCOME!");
lcd.setCursor(2,1);
lcd.print("INITIALIZAING...");
   lcd.setCursor(0, 1);
 lcd.print("CONFIGURING GSM");
configure();
delay(5000);
lcd.clear();

}
 
void loop() {

  lcd.setCursor(0,0);
lcd.print(move_left("SOIL FERTILITY MONITORING SYSTEM"));
 lcd.setCursor(0,1);
 lcd.print("READY TO READ VALUES");
delay(10);
  // Read values
  byte val1,val2,val3;
  delay(100);
  // loop for the sensor to read so many times befor displacing on the screen so as to have accurate value
  for(int i=0; i<=20; i++)
  {
   byte val1,val2,val3;
  delay(100);
 pre1= digitalRead(9);
//delay(90);
  pre2= digitalRead(10);
//lay(90);
  pre3= digitalRead(11);
//delay(90);
  pre4= digitalRead(12);
  if(pre1 ==1)
  {// reading the values of nitrogen, phosphorus and potassium
    for(int i=0; i<=10; i++)
  {
  val1 = nitrogen();
  delay(100);
  val2 = phosphorous();
  delay(100);
  val3 = potassium();
  delay(100);
  } 
   lcd.clear();
    lcd.setCursor(0,0);
lcd.print(move_left("SOIL FERTILITY MONITORING SYSTEM"));
delay(10);
   lcd.setCursor(0, 1);
  lcd.print("NITROGEN  : ");
  lcd.setCursor(11, 1);
  lcd.print(val1);
  lcd.setCursor(15, 1);
  lcd.print("mg/kg");
  lcd.setCursor(0, 2);
  lcd.print("PHOSPHORUS: ");
  lcd.setCursor(11 , 2);
  lcd.print(val2);
  lcd.setCursor(15, 2);
  lcd.print("mg/kg");
  lcd.setCursor(0, 3);
  lcd.print("POTASSIUM : ");
  lcd.setCursor(11, 3);
  lcd.print(val3);
   lcd.setCursor(15, 3);
  lcd.print("mg/kg");
  Serial.print("mg/kg");
  delay(10);
mystr2= String(val1);
mystr3= String(val2);
mystr4= String(val3);
digitalWrite(11, HIGH);
Serial.println("AT\r");
delay(90);
Serial.println("AT+CMGF=1\r");
delay(90);
Serial.println("AT+CMGS=\"+237678116665\"\r");     
delay(90);
Serial.print( "THE NPK LEVEL PRESENT:");
delay(70);
Serial.print("\nNITROGEN: ");
Serial.print(mystr2);
delay(70);
Serial.print("mg/kg");
delay(70);
Serial.print("\nPHOSPHORUS: ");
Serial.print(mystr3);
delay(70);
Serial.print("mg/kg");
delay(70);
Serial.print("\nPOTASSIUM: ");
Serial.print(mystr4);
delay(70);
Serial.print("mg / kg");
delay(70);
Serial.print((char)26);
delay(5000);
 lcd.clear();
   }
  }
else if(pre2==1);
{
      for(int i=0; i<=10; i++)
  {
  val1 = nitrogen();
  delay(100);
  val2 = phosphorous();
  delay(100);
  val3 = potassium();
  delay(100);
  } 
   lcd.clear();
    lcd.setCursor(0,0);
lcd.print(move_left("SOIL FERTILITY MONITORING SYSTEM"));
delay(10);
   lcd.setCursor(0, 1);
  lcd.print("NITROGEN  : ");
  lcd.setCursor(11, 1);
  lcd.print(val1);
  lcd.setCursor(15, 1);
  lcd.print("mg/kg");
  lcd.setCursor(0, 2);
  lcd.print("PHOSPHORUS: ");
  lcd.setCursor(11 , 2);
  lcd.print(val2);
  lcd.setCursor(15, 2);
  lcd.print("mg/kg");
  lcd.setCursor(0, 3);
  lcd.print("POTASSIUM : ");
  lcd.setCursor(11, 3);
  lcd.print(val3);
   lcd.setCursor(15, 3);
  lcd.print("mg/kg");
  Serial.print("mg/kg");
  delay(10);
mystr2= String(val1);
mystr3= String(val2);
mystr4= String(val3);
digitalWrite(11, HIGH);
Serial.println("AT\r");
delay(90);
Serial.println("AT+CMGF=1\r");
delay(90);
Serial.println("AT+CMGS=\"+237678116665\"\r");     
delay(90);
Serial.print( "THE NPK LEVEL PRESENT:");
delay(70);
Serial.print("\nNITROGEN: ");
Serial.print(mystr2);
delay(70);
Serial.print("mg/kg");
delay(70);
Serial.print("\nPHOSPHORUS: ");
Serial.print(mystr3);
delay(70);
Serial.print("mg/kg");
delay(70);
Serial.print("\nPOTASSIUM: ");
Serial.print(mystr4);
delay(70);
Serial.print("mg / kg");
delay(70);
Serial.print((char)26);
delay(5000);
 lcd.clear();
   }
}
  delay(300);
}
 
byte nitrogen(){
  digitalWrite(DE,HIGH);
  digitalWrite(RE,HIGH);
  delay(10);
  if(mod.write(nitro,sizeof(nitro))==8){
    digitalWrite(DE,LOW);
    digitalWrite(RE,LOW);
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    Serial.print(values[i],HEX);
    }
    Serial.println();
  }
  return values[4];
}
 
byte phosphorous(){
  digitalWrite(DE,HIGH);
  digitalWrite(RE,HIGH);
  delay(10);
  if(mod.write(phos,sizeof(phos))==8){
    digitalWrite(DE,LOW);
    digitalWrite(RE,LOW);
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    Serial.print(values[i],HEX);
    }
    Serial.println();
  }
  return values[4];
}
 
byte potassium(){
  digitalWrite(DE,HIGH);
  digitalWrite(RE,HIGH);
  delay(10);
  if(mod.write(pota,sizeof(pota))==8){
    digitalWrite(DE,LOW);
    digitalWrite(RE,LOW);
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    Serial.print(values[i],HEX);
    }
    Serial.println();
  }
  return values[4];
}
String move_left(String Display)
{
String result;
String process = Display;
result = process.substring(a,b);
a++;
b++;
if(a>process.length()){
  a=20;
  b=0;
}
return result;
}

void configure() {

  Serial.println("AT");
  delay(500);
  Serial.println("AT+CMGF=1");
  delay(1000);
  Serial.println("AT+CNMI=2,1,0,1,0");
  delay(1000);
  Serial.println("AT+CSMP=49,167,0,0");
  delay(1000);
  Serial.println("AT+CMGD=1,4");
  delay(2000);
}


