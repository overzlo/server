const pgp = require('pg-promise')();

// Замените параметры подключения на ваши
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '523478',
};

const db = pgp(dbConfig);

// Простой запрос для проверки доступа к таблице
db.one('SELECT * FROM sensor_data LIMIT 1')
  .then(data => {
    console.log('Успешное подключение и выполнение запроса:', data);
  })
  .catch(error => {
    console.error('Ошибка при выполнении запроса:', error);
  })
  .finally(() => {
    pgp.end(); // Завершение соединения с базой данных
  });
