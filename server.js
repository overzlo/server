const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')(); 
const app = express();
const port = 3000;

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '523478',
};

const db = pgp(dbConfig);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, this is the root!');
});

app.post('/your_endpoint', async (req, res) => {
  const temperature = req.body.temperature;
  const humidity = req.body.humidity;
  const co2 = req.body.co2;
  console.log('Received data:', req.body);

  console.log(`Received data - Temperature: ${temperature}, Humidity: ${humidity}, CO2(PPM): ${co2}`);

  try {
    await db.none('INSERT INTO sensor_data(temperature, humidity, co2) VALUES($1, $2, $3)', [temperature, humidity, co2]);
    console.log('Data inserted into the database');
    res.send('Data received and inserted successfully into the database');
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
