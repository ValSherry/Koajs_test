const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const body = require('../index');
const app = new Koa();

app.use(body());

app.use(async(ctx, next) => {
  if (ctx.url === '/') {
    // Переход на главную страницу
    let html = fs.readFileSync(path.join(__dirname, './index.html'), 'binary');
    ctx.body = html;
  } else if (ctx.url === '/post' && ctx.method === 'POST') {
    // Переход на страницу с ответом
    ctx.body = ctx.request.body;
  } else {
    // Ошибка
    ctx.body = '<h1>404';
  }

  await next();
});

app.listen(3000, () => {
  console.log('[demo] is starting at port 3000');
});
