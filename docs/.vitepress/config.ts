import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '科学上网完全指南',
  description:
    '一份写给零基础小白的开放教程：教你用开源客户端（Clash Verge Rev / v2rayNG / Shadowrocket）搭配机场，5 分钟跑通第一次，常见问题逐个排查。含机场实测推荐与全平台图文教程。',
  lang: 'zh-CN',

  base: '/',

  // SEO：关键词、Open Graph、图标
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'keywords', content: '科学上网,翻墙,梯子,Clash,Clash Verge Rev,v2rayNG,Shadowrocket,小火箭,机场推荐,VPN,代理,订阅' }],
    ['meta', { name: 'author', content: 'Joshmax010' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '科学上网完全指南' }],
    ['meta', { property: 'og:description', content: '写给零基础小白的开放教程：开源客户端搭配机场，5 分钟跑通第一次。全平台图文教程 + 机场实测推荐。' }],
    ['meta', { property: 'og:url', content: 'https://science-online-guide.pages.dev/' }],
    ['meta', { property: 'og:site_name', content: '科学上网完全指南' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: '科学上网完全指南' }],
    ['meta', { name: 'twitter:description', content: '写给零基础小白的开放教程：开源客户端搭配机场，5 分钟跑通第一次。' }],
  ],

  // SEO：自动生成 sitemap.xml
  sitemap: {
    hostname: 'https://science-online-guide.pages.dev',
  },

  lastUpdated: true,
  cleanUrls: false,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/01-why' },
      { text: '常见问题', link: '/08-faq' },
      { text: '安全与免责', link: '/09-safety' },
    ],

    sidebar: [
      {
        text: '指南目录',
        items: [
          { text: '01 为什么需要科学上网', link: '/01-why' },
          { text: '02 基础概念', link: '/02-concepts' },
          { text: '03 客户端选择', link: '/03-clients' },
          { text: '04 机场推荐', link: '/04-airports' },
          { text: '05 Windows 操作（Clash Verge Rev）', link: '/05-windows' },
          { text: '06 手机配置', link: '/06-mobile' },
          { text: '07 聚合 App 与机场的差异', link: '/07-comparison' },
          { text: '08 常见问题', link: '/08-faq' },
          { text: '09 安全与免责', link: '/09-safety' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Joshmax010/science-online-guide' },
    ],

    footer: {
      message: '本教程仅用于技术学习与信息获取的科普目的',
      copyright: '风险自担 · 遵守当地法律法规',
    },

    editLink: {
      pattern: 'https://github.com/Joshmax010/science-online-guide/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
  },
})
