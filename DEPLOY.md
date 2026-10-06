# Cloudflare Pages 部署与账号迁移

- 现有网站：<https://science-online-guide.pages.dev>
- 源码仓库：<https://github.com/Joshmax010/science-online-guide>

换电脑接手先读 [MAINTENANCE.md](MAINTENANCE.md)。本说明使用相对路径，不依赖旧电脑目录；免费托管不代表所有地区、运营商下始终可达。

## 1. 继续维护现有站点

使用原 GitHub/Cloudflare 账户，克隆同一仓库即可，无需重建 Pages 项目：

```bash
git clone https://github.com/Joshmax010/science-online-guide.git
cd science-online-guide
npm ci
npm run verify:originals
npm test
npm run docs:build
```

Node.js 推荐版本见 `.node-version` / `.nvmrc`（本次测试 22.23.2）。`package-lock.json` 决定依赖版本，迁移优先使用 `npm ci`，不要通过删除锁文件来“解决”安装问题。

编辑并检查后，只暂存需要发布的文件、提交、推送到 `main`。在 Cloudflare Pages 后台确认新部署的提交与 GitHub 一致，并查看完整日志和最终状态。最后用浏览器验证线上导航、图片与评论。

## 2. 新账户 / Fork 重建站点

只有改用新 Cloudflare 账户或新 GitHub 仓库时才需要重新授权并创建 Pages 项目。

1. 登录 Cloudflare Dashboard 的 Workers & Pages，创建 Pages 项目并选择 Git 集成（界面名称可能变化）。
2. 授权 Cloudflare GitHub App 访问目标仓库。
3. 选择仓库和生产分支 `main`。
4. 使用下列构建配置：

| 配置 | 值 |
|---|---|
| Root directory | 仓库根目录（留空） |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Production branch | `main` |
| Node 环境 | 建议 `NODE_VERSION=22.23.2`，与仓库版本文件一致 |

当前网站运行不要求将 GitHub PAT、Cloudflare API token 或 Hermes API key 写进项目。需要服务授权时在账户后台或设备凭证管理器设置。

若新项目获得不同域名，维护这些公开地址：

- README 的在线阅读链接；
- `docs/.vitepress/config.ts` 中 `sitemap.hostname` 和 Open Graph 的 `og:url`；
- `docs/public/robots.txt` 中 sitemap 地址；
- 首页、维护文档中手工写入的站点/仓库链接。

现有项目不购买自定义域名，是作者的明确选择。

## 3. 评论系统 giscus

同一仓库继续使用当前主题的公开 repo/category ID，无需重新配置。评论保存在 GitHub Discussions，不随 Git 克隆/ZIP 转移。

Fork 到新仓库时：

1. 在 GitHub 仓库设置开启 Discussions。
2. 安装 giscus App，授予新仓库权限。
3. 在 <https://giscus.app/zh-CN> 获取新 repo ID、分类 ID。
4. 更新 `docs/.vitepress/theme/index.ts` 的 repo 与 ID，保留适当的 pathname mapping 和中文设置。
5. 用浏览器测试首次打开、刷新、站内路由切换和明暗主题。

当前评论按钮锚点、脚本渲染与路由切换还有待复核的事项，见 MAINTENANCE.md。不能仅凭 JS bundle 中存在 `giscus` 字样宣称评论正常。

## 4. 统计

- Cloudflare Web Analytics 是账户侧设置。作者历史上确认已开启；换电脑继续用原账户保留后台项目，新账户则重新开启。本次备份不导出后台分析数据。
- 不蒜子脚本保存在 `docs/public/busuanzi.pure.mini.js`，但计数服务仍是外部服务，断网不能保证统计显示。
- 首页的 `...` 不是正确计数证明。实际检查网络请求和浏览器行为，需排除扩展拦截和第三方不可达。

## 5. 常见故障

### 本地有配置，线上没有

运行：

```bash
git ls-files docs/.vitepress/config.ts docs/.vitepress/theme/index.ts
git check-ignore docs/.vitepress/config.ts docs/.vitepress/theme/index.ts
```

两份源码应出现在 `git ls-files` 中，不应被忽略；`git check-ignore` 找不到匹配时返回非零是正常结果。仅忽略 dist/cache，不忽略整个 `.vitepress/`。

### `ERR_UNSUPPORTED_ESM_URL_SCHEME` / `https:` 构建失败

检查是否把外部 `<script src>` 放在 Markdown 顶层，导致 Vue 把它解释成模块导入。优先使用明确的客户端加载方式，不靠更换 Node 版本来掩盖原因。当前不蒜子方案已能构建，但仍需运行时验证。

### 章节或图片在 GitHub 上打不开

正文互链使用 `.md` 后缀的相对路径，图片使用 `./images/…`；网站根 `/images/…` 在 GitHub Markdown 中会指向错误的位置。

### 推送失败

检查当前 GitHub 账户对仓库的写权限、认证和网络。Git 的代理地址由新设备实际环境决定，不复制旧设备全局代理。token 不写入 remote URL 或公共文件。出现分叉时先查看历史再协调，不直接 force push。

### 构建成功但页面还是旧版

先检查 Cloudflare 部署所用提交、构建结果和输出目录，再看缓存/浏览器；成功 push 不等于成功发布，不反复靠修改无关文件触发部署来替代诊断。

## 6. 发布前检查

- 完整运行 `npm ci`、原件校验、测试和构建，退出码为零。
- 改动未误删原文、图片或推广链接。
- 当前公开文件没有账号密钥、私人订阅和设备绝对路径。
- 网站和 GitHub Markdown 都检查过图片/章节跳转。
- 推送后核对远端提交，并在 Cloudflare 后台核对同一提交。
- 评论、统计、404 等客户端行为另做浏览器验证；未验证的就明确记为待办。
