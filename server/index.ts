import Koa from 'koa'
import views from 'koa-views'
import staticServer from 'koa-static'
import moment from 'moment'
import router from './route'
import path from 'path'

import { Pagination, GeneratorAssetsElement } from './tools'

type NODE_ENV_TYPE = 'development' | 'production'

interface State {
  moment: typeof moment
  Pagination: typeof Pagination
  NODE_ENV: NODE_ENV_TYPE
  GeneratorAssetsElement: typeof GeneratorAssetsElement
}

const server = new Koa<State>()

server.use(async (ctx, next) => {
  ctx.state.moment = moment;
  ctx.state.Pagination = Pagination
  ctx.state.NODE_ENV = process.env.NODE_ENV as NODE_ENV_TYPE
  ctx.state.GeneratorAssetsElement = GeneratorAssetsElement
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
