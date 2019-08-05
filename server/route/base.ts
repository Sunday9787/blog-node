import Router from 'koa-router'
import moment from 'moment';

interface Context {
  render(viewPath: string, data?: {}): Promise<void>;
}

interface State {
  moment: typeof moment;
}

const router = new Router<State, Context>()

export default router
