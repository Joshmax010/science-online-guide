// 自定义主题：图片点击放大 + giscus 评论
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import mediumZoom from 'medium-zoom'

// giscus 评论组件
const Comments = {
  render() {
    return h('div', { style: { marginTop: '40px' } }, [
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
  },
}

export default {
  extends: DefaultTheme,

  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      // 路由切换完成后初始化/刷新图片放大 + 重载评论
      router.onAfterRouteChanged = () => {
        // medium-zoom 重新绑定当前页图片
        setTimeout(() => {
          mediumZoom('.main img', {
            background: 'rgba(0, 0, 0, 0.85)',
            margin: 24,
            scrollOffset: 0,
          })
          // giscus 挂载点：每页底部注入评论区容器
          injectGiscus()
        }, 300)
      }
    }
  },
}

function injectGiscus() {
  // 首页不显示评论
  if (location.pathname === '/' || location.pathname === '/index.html') return

  const container = document.querySelector('.main .vp-doc')
  if (!container) return

  // 防止重复注入
  let wrapper = document.getElementById('giscus-wrapper')
  if (wrapper) {
    wrapper.remove()
  }

  wrapper = document.createElement('div')
  wrapper.id = 'giscus-wrapper'
  wrapper.style.cssText =
    'margin-top:40px;padding-top:24px;border-top:1px solid var(--vp-c-divider);'

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Joshmax010/science-online-guide')
  script.setAttribute('data-repo-id', 'R_kgDOT_s98A')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOT_s98M4DD8Oe')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  wrapper.appendChild(script)
  container.appendChild(wrapper)

  // 明暗主题切换时同步 giscus 主题
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains('dark')
    const iframe = document.querySelector('iframe.giscus-frame')
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } } },
        'https://giscus.app'
      )
    }
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

// 初次加载也要绑定 medium-zoom
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      mediumZoom('.main img', {
        background: 'rgba(0, 0, 0, 0.85)',
        margin: 24,
        scrollOffset: 0,
      })
    }, 300)
  })
}
