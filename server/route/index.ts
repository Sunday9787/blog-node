import router from './base';
import {
  modelCategor,
  modelRecentNews,
  modelTag,
  modelPost,
} from '../api';

router.get('/', async (ctx) => {
  const categor = await modelCategor.queryCategor();
  const recentNews = await modelRecentNews.queryRecentNews();
  const tag = await modelTag.queryTag();
  const post = await modelPost.queryPost();

  await ctx.render('index', {
    title: 'Edward 的空间',
    isCategor: false,
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
  const categor: string = (ctx.params.categor as string).toLowerCase();
  const post = await modelPost.model.find({ categor });

  await ctx.render('categor/index', {
    title: 'Edward 的空间',
    /** 是否是分类页 */
    isCategor: true,
    post: {
      item: post,
    }
  });
})

router.get('/tags/:tag', async (ctx) => {
  const tages: string = (ctx.params.tag as string).toLowerCase();
  const post = await modelPost.model.find({ tages });

  await ctx.render('tags/index', {
    title: 'Edward 的空间',
    /** 是否是分类页 */
    isCategor: true,
    post: {
      item: post,
    }
  });
})

export default router
