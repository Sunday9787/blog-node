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

export default router
