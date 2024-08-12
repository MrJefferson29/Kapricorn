const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const axios = require('axios');

function setupSerialPort(port) {
  const portName = process.env.SERIAL_PORT || 'COM3';
  const baudRate = parseInt(process.env.BAUD_RATE) || 9600;

  const serialPort = new SerialPort({
    path: portName,
    baudRate: baudRate,
  });

  const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  function sendToServer(nitrogen, phosphorus, potassium) {
    const data = { nitrogen, phosphorus, potassium };

    axios.post(`http://localhost:${port}/npk`, data)
      .then(response => {
        console.log('Data sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending data:', error.message);
      });
  }

  function handleData(data) {
    const dataString = data.trim();
    console.log('Received data:', dataString);

    const [nitrogen, phosphorus, potassium] = dataString.split(',').map(Number);

    if (isNaN(nitrogen) || isNaN(phosphorus) || isNaN(potassium)) {
      console.error('Invalid data format');
      return;
    }

    sendToServer(nitrogen, phosphorus, potassium);
  }

  parser.on('data', handleData);

  serialPort.on('open', () => {
    console.log('Serial port opened');
  });

  serialPort.on('error', (err) => {
    console.error('Error on serial port:', err.message);
  });
}

module.exports = { setupSerialPort };
