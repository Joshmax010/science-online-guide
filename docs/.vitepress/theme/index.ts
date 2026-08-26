// 自定义主题：图片点击放大 + giscus 评论（用 Layout 插槽避免 DOM 操作）
import DefaultTheme from 'vitepress/theme'
import { h, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

// giscus 评论：直接渲染 script 标签，让浏览器执行
function Comments() {
  return h('div', {
    class: 'giscus-wrapper',
    style: { marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--vp-c-divider)' },
    key: useRoute().path,
  }, [
    h('script', {
      src: 'https://giscus.app/client.js',
      'data-repo': 'Joshmax010/science-online-guide',
      'data-repo-id': 'R_kgDOT_s98A',
      'data-category': 'Announcements',
      'data-category-id': 'DIC_kwDOT_s98M4DD8Oe',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'zh-CN',
      crossorigin: 'anonymous',
      async: true,
    }),
  ])
}

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 在文档正文下方注入评论区（首页不显示）
      'doc-footer-after': () => {
        const route = useRoute()
        if (route.path === '/' || route.path === '/index.html') return null
        return h(Comments)
      },
    })
  },

  setup() {
    const route = useRoute()
    const bindZoom = () => {
      nextTick(() => {
        const imgs = document.querySelectorAll('.main img')
        imgs.forEach((img) => {
          if (img.dataset.zoomBound) return
          img.dataset.zoomBound = '1'
          mediumZoom(img, {
            background: 'rgba(0, 0, 0, 0.85)',
            margin: 24,
            scrollOffset: 0,
          })
        })
      })
    }
    onMounted(() => {
      bindZoom()
      // 监听暗色模式切换，同步给 giscus iframe
      const observer = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark')
        const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
        iframe?.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } } },
          'https://giscus.app',
        )
      })
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
    })
    watch(() => route.path, bindZoom)
  },
}
