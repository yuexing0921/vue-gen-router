/** @format */

import { RouteConfig } from 'vue-router';

import Layout from 'views/layout/Layout';
import Routerview from 'components/Routerview';

export const routerConfig = [
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/index'),
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
            component: () => import('views/index/index'),
            meta: { title: '首页', index: true, auth: ['indexview'] }
          },
          {
            path: 'edit',
            name: 'indexedit',
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
            component: () => import('views/notice/tabIndex'),
            meta: { title: '校园通知', index: true, auth: ['notice'] }
          },
          {
            path: 'edit',
            name: 'noticeEdit',
            component: () => import('views/notice/edit'),
            meta: { title: '发送通知', auth: ['notice'] }
          },
          {
            path: 'detail',
            name: 'noticeDetail',
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
    component: () => import('views/updateServe/index'),
    meta: { title: '升级服务' }
  },
  {
    path: '/moralMonth',
    name: 'moralMonth',
    component: () => import('views/education/analysis/moralMonth'),
    meta: { title: '德育工作包' }
  }
];
