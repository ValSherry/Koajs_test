# Koajs_test (Начата страница проверки логина и пароля. Произведено подключение к базе данных PostgreSQL. Логин и пароль запрашиваются из базы данных.)
За основу взят https://github.com/chenshenhai/koajs-design-note/blob/master/note/chapter05/03.md. Данный ресурс был выбран как пример считывания информации с формы.
Необходимо установить - npm i.
И запустить - npm run start.
Запускается http://localhost:3000.
В форме вводится логин и пароль. 
Параметры базы данных:
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Postgres',
  database: 'db'
});
Таблица с логином и паролем: users.
Таблица содержит два строковых поля: Name и Password.
После нажатия на кнопку если пароль был введен верно выводится информация в консоль 'Пароль введен верно'.
