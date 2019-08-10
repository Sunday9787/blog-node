import router from './base';
import {
  modelCategor,
  modelRecentNews,
  modelTag,
  modelPost,
} from '../api';

import { PaginationConfig } from '../tools'

const pageConfig = {
  pageSize: 4,
  perPages: 3
}

router.get('/', async (ctx) => {
  const categor = await modelCategor.queryCategor();
  const recentNews = await modelRecentNews.queryRecentNews();
  const tag = await modelTag.queryTag();
  const post = await modelPost.model.find().limit(pageConfig.pageSize);
  const total = await modelPost.model.find().countDocuments();

  const page: PaginationConfig = { total, current: 1, baseURL: { toHome: true, base: '/page/$pager'}, ...pageConfig }

  await ctx.render('index', {
    title: 'Edward 的空间',
    isCategor: false,
    page,
    categor: {
      name: '分类',
      item: categor
    },
    recentNews: {
      name: '精选文章',
      item: recentNews,
    },
    tag: {
      name: '标签',
      item: tag,
    },
    post: {
      item: post,
    }
  });
})

router.get('/page/:page', async (ctx) => {
  const current = Number(ctx.params.page);
  const categor = await modelCategor.queryCategor();
  const recentNews = await modelRecentNews.queryRecentNews();
  const tag = await modelTag.queryTag();
  const post = await modelPost.model.find().limit(pageConfig.pageSize).skip(current)
  const total = await modelPost.model.find().countDocuments();

  const page: PaginationConfig = { total, current, baseURL: { toHome: true, base: '/page/$pager' }, ...pageConfig }

  await ctx.render('index', {
    title: 'Edward 的空间',
    isCategor: false,
    page,
    categor: {
      name: '分类',
      item: categor
    },
    recentNews: {
      name: '精选文章',
      item: recentNews,
    },
    tag: {
      name: '标签',
      item: tag,
    },
    post: {
      item: post,
    }
  });
})

router.get('/categor/:categor', async (ctx) => {
  const current = Number(ctx.query.page) || 1
  const categor: string = (ctx.params.categor as string).toLowerCase();
  const post = await modelPost.model.find({ categor }).limit(pageConfig.pageSize).skip(current);
  const total = await modelPost.model.find({ categor }).countDocuments();

  const page: PaginationConfig = { total, current, baseURL: `/categor/${categor}?page=$pager`, ...pageConfig }

  await ctx.render('categor/index', {
    title: 'Edward 的空间',
    /** 是否是分类页 */
    isCategor: true,
    page,
    post: {
      item: post,
    }
  });
})

router.get('/tags/:tag', async (ctx) => {
  const current = Number(ctx.query.page) || 1
  const tages: string = (ctx.params.tag as string).toLowerCase();
  const post = await modelPost.model.find({ tages }).limit(pageConfig.pageSize).skip(current);
  const total = await modelPost.model.find({ tages }).countDocuments();

  const page: PaginationConfig = { total, current, baseURL: `/tags/${tages}?page=$pager`, ...pageConfig }

  await ctx.render('tags/index', {
    title: 'Edward 的空间',
    /** 是否是分类页 */
    isCategor: true,
    page,
    post: {
      item: post,
    }
  });
})

export default router
