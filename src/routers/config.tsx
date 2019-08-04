/** @format */

import { RouteConfig } from 'vue-router';

// @ts-ignore
import Layout from 'views/layout/Layout';
// @ts-ignore
import Routerview from 'components/Routerview';

export const routerConfig: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: {
      render: () => <router-view />
    },
    props: true,
    index: 111,
    meta: { title: '登录' }
  },
  {
    path: '',
    name: 'Layout',
    redirect: '/index',
    component: Layout,
    meta: { title: '首页', auth: ['indexview', 'campusInfo'] },
    children: [
      {
        path: '/index',
        component: Routerview,
        meta: {
          title: '首页',
          index: true,
          icon: 'icon-shouyex',
          auth: ['indexview', 'campusInfo']
        },
        children: [
          {
            path: '',
            name: 'indexview',
            // @ts-ignore
            component: () => import('views/index/index'),
            meta: { title: '首页', index: true, auth: ['indexview'] }
          },
          {
            path: 'edit',
            name: 'indexedit',
            // @ts-ignore
            component: () => import('views/index/edit'),
            meta: { title: '编辑', auth: ['campusInfo'] }
          }
        ]
      },
      {
        path: '/notice',
        name: 'notice',
        component: {
          render: () => (
            <keep-alive include="cloudStorage">
              <router-view />
            </keep-alive>
          )
        },
        meta: {
          title: '校园通知',
          icon: 'icon-xiaoyuantongzhix',
          auth: ['notice']
        },
        children: [
          {
            path: 'list',
            name: 'noticeList',
            // @ts-ignore
            component: () => import('views/notice/tabIndex'),
            meta: { title: '校园通知', index: true, auth: ['notice'] }
          },
          {
            path: 'edit',
            name: 'noticeEdit',
            // @ts-ignore
            component: () => import('views/notice/edit'),
            meta: { title: '发送通知', auth: ['notice'] }
          },
          {
            path: 'detail',
            name: 'noticeDetail',
            // @ts-ignore
            component: () => import('views/notice/detail'),
            meta: { title: '详情', auth: ['notice'] }
          }
        ]
      }
    ]
  },
  {
    path: '/updateServe',
    name: 'updateServe',
    // @ts-ignore
    component: () => import('views/updateServe/index'),
    meta: { title: '升级服务' }
  },
  { path: '/publish', name: 'publish', meta: { title: '工作包' } }
];
