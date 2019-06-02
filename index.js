const readStream = require('./lib/read_stream');
let strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
// Подключение к БД
const {Client} = require('pg')
// параметры для подключения
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Postgres',
  database: 'db'
});

let jsonTypes = [
  'application/json'
];

let formTypes = [
  'application/x-www-form-urlencoded'
];

let textTypes = [
  'text/plain'
];

//Выделяем введеные логин и пароль
function parseQueryStr(queryStr,) {
  let queryData = {};
  let queryStrList = queryStr.split('&');
  let itemList = queryStrList[0].split('=');
  let nm = decodeURIComponent(itemList[1]);
  let itemList1 = queryStrList[1].split('=');
  let pass = decodeURIComponent(itemList1[1]);
  pgQuery(nm,pass);
  //return result;
}

function bodyParser(opts = {}) {
  return async function(ctx, next) {
    if (!ctx.request.body && ctx.method === 'POST') {
      let body = await readStream(ctx.request.req);
      let result = body;
      if (ctx.request.is(formTypes)) {
        result = parseQueryStr(body);
      } else if (ctx.request.is(jsonTypes)) {
        if (strictJSONReg.test(body)) {
          try {
            result = JSON.parse(body);
          } catch (err) {
            ctx.throw(500, err);
          }
        }
      } else if (ctx.request.is(textTypes)) {
        result = body;
      }

    ctx.request.body = result;

    }
    await next();
  }
}

function pgQuery(a,b){
  // Проверяем подключение
  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected');
    }
  });
  // Подключаемся к БД
  client.connect();
  // Проверяем пароль
  client.query('SELECT * FROM users', (err, res) => {
    for (i = 0; i < res.rowCount; ++i){
      let n=res.rows[i].Name.trim();
      let p=res.rows[i].Password.trim();
      if ((n===a) && (p===b)) {
        rez = 'Пароль введен верно';
        console.log(rez);
     } 
    }
  });	
}

module.exports = bodyParser;
