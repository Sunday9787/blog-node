import Router from 'koa-router'

interface Context {
  render(viewPath: string, data?: {}): Promise<void>;
}

const router = new Router<any, Context>()

export default router
