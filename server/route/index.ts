import router from './base'

router.get('/', async (ctx) => {
  await ctx.render('index', {
    title: 'Edward 的空间',
    categor: {
      name: '分类',
      // item: data.categor
      item: [
        { link: '/', name: 'hexo', total: 2 },
        { link: '/', name: 'node', total: 1 },
        { link: '/', name: 'nginx', total: 0 },
        { link: '/', name: 'vue-router', total: 5 }
      ]
    },
    recentNews: {
      name: '精选文章',
      // item: data.recentNews
      item: [
        { src: 'https://s3.amazonaws.com/ptsteadman-images/helloworld.jpg', link: '/', name: '我的第一个kor' },
        { src: 'https://s3.amazonaws.com/ptsteadman-images/vs.jpg', link: '/', name: 'Static NGINX Locations' },
        { src: 'https://s3.amazonaws.com/ptsteadman-images/nginx-proxy.png', link: '/', name: 'Spaces for Newline Indents in VS' },
      ]
    },
    tage: {
      name: '标签',
      // item: data.tag
      item: [
        { link: '/', name: 'gulp' },
        { link: '/', name: 'GO' },
        { link: '/', name: 'C#' },
        { link: '/', name: 'vue全家桶' },
        { link: '/', name: 'node' }
      ]
    },
    // post: data.post
    post: {
      item: [
        {
          // src: 'https://s3.amazonaws.com/ptsteadman-images/info2.jpg',
          src: '/assets/images/info2.jpg',
          title: 'Notes On Creating A Hexo Theme',
          link: '/',
          date: '2016/01/02',
          tages: [
            { name: 'gulp', link: '/'},
            { name: 'go', link: '/'}
          ],
          content: 'Promise 为 js 的异步流程控制处理迈出了一大步。但我一直没用好错误处理。Promise 为 js 的异步流程控制处理迈出了一大步。但我一直没用好错误处理。'
        },
        {
          // src: 'https://s3.amazonaws.com/ptsteadman-images/hexo.png',
          src: '/assets/images/hexo.png',
          title: 'How To Impress Employers at Infosessions',
          link: '/',
          date: '2016/01/02',
          tages: [
            { name: 'GO', link: '/'},
            { name: 'nginx', link: '/'}
          ],
          content: 'Top tech talent knows that industry recruiters often bring a stack of pre-negotiated offers to university infosessions, so that they can snag programmers and UX designers who really stand out.'
        },
        {
          src: 'https://s3.amazonaws.com/ptsteadman-images/NAV.jpg',
          title: 'NAV Web Service Programming Resources',
          link: '/',
          date: '2016/01/02',
          tages: [
            { name: 'node', link: '/'},
            { name: 'vue', link: '/'}
          ],
          content: 'Here are some of the resources I found helpful for learning to develop Dynamics NAV web service based applications.'
        },
      ]
    }
  });
})

export default router