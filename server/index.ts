import Koa from 'koa'
import views from 'koa-views'
import staticServer from 'koa-static'
import moment from 'moment'
import router from './route'
import path from 'path'

import { Pagination } from './tools'

const server = new Koa()

server.use(async (ctx, next) => {
  ctx.state.moment = moment;
  ctx.state.Pagination = Pagination
  await next();
})

// 静态资源
server.use(staticServer(path.join(__dirname, '../dist'), { maxAge: 0 }));

// 使用模板
server.use(views(path.join(__dirname, './views'), {
  extension: 'html.ejs'
}));

// 加载路由
server.use(router.routes())

server.listen(8000, () => {
  console.log('启动成功');
  console.log('run at http://localhost:8000');
})
