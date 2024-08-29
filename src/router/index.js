import Vue from 'vue'
import Router from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    children: [
      // 首页
      {
        path: '',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          // keepAlive: true,
          title: '首页'
        }
      },






      // 文章列表
      {
        path: '/ArticleList',
        component: () => import('@/views/ArticleList/index.vue'),
        name: 'articleList',
        meta: {
          keepAlive: true,
          title: '文章列表'
        },
      },
      {
        path: '/ArticleList/articleDetail/:id',
        component: () => import('@/views/ArticleList/ArticleDetail.vue'),
        name: 'articleDetail',
        props: true,
        meta: {
          keepAlive: true,
          title: '文章详情'
        }
      },
      // 记录滚动位置
      {
        path: '/KeepScroll',
        component: () => import('@/views/KeepScroll/index.vue'),
        name: 'keepScroll',
        meta: {
          keepAlive: true,
          title: '记录滚动位置'
        }
      },
      {
        // 多级缓存
        path: '/child',
        name: 'child',
        component: () => import('@/views/Child/Index.vue'),
        meta: {
          title: '多级缓存',
          keepAlive: true,
        },
        redirect: {
          path: '/soon1'
        },
        children: [
          {
            path: '/soon1',
            name: 'soon1',
            component: () => import('@/views/Child/Soon1.vue'),
            meta: {
              keepAlive: true
            }
          },
          {
            path: '/soon2',
            name: 'soon2',
            component: () => import('@/views/Child/Soon2.vue'),
            meta: {
              keepAlive: true
            }
          }
        ]
      }
    ]
  }
]

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes
})

export default router