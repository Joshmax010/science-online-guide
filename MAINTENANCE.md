# 维护与跨设备接手手册

本文件是项目交接入口。新设备或新 AI 会话先读本文件，再读 `AGENTS.md`。维护不依赖原电脑、Hermes 配置或旧聊天记录。

## 1. 项目身份与来源

- 名称：《科学上网完全指南》，面向零基础读者的九章图文教程。
- 仓库：<https://github.com/Joshmax010/science-online-guide>，默认分支 `main`。
- 在线站点：<https://science-online-guide.pages.dev>。
- 技术：VitePress + Vue，静态网站，GitHub 托管源码，Cloudflare Pages 构建部署。
- 原始文件在 `originals/`；当前阅读/发布版本在 `docs/`，二者有格式、链接及少量已授权文字修正差异。
- 作者说明：文章由 Claude 辅助完成，Hermes Agent 提供文件编辑、构建及 Git 等工具支持。README 致谢不意味着 AI 有独立 GitHub 提交身份。

## 2. 新设备最快接手

需要可运行 Git、Node.js 和 npm 的 Windows / macOS / Linux 设备；手机可以浏览 GitHub/网站，完整开发需电脑或带 Node.js 的远程开发环境。依赖安装需要网络。

推荐使用仓库 `.node-version` / `.nvmrc` 指定的 Node.js 22.23.2。本次维护环境实际使用 Node.js 22.23.2、npm 12.0.2；锁文件用于还原依赖，迁移时先保持现有版本，不顺手升级框架。

```bash
git clone https://github.com/Joshmax010/science-online-guide.git
cd science-online-guide
npm ci
npm run verify:originals
npm test
npm run docs:build
npm run docs:dev
```

`npm run docs:dev` 的本地地址以终端实际输出为准。构建输出是 `docs/.vitepress/dist/`，生产预览用 `npm run docs:preview`。这些命令只在项目目录内运行，不要求原设备盘符或目录。

### GitHub Download ZIP

解压 GitHub 的源码 ZIP，同样能安装依赖、验证原件、运行和构建，但 ZIP 没有 `.git` 和提交历史，VitePress 的 Git 更新时间可能缺失。准备长期维护/推送时优先重新 `git clone`，不要在 ZIP 目录直接照抄初始化命令覆盖远端历史。

### 继续使用 AI 助手

向新会话提供项目目录，并说：

> 阅读仓库 AGENTS.md、MAINTENANCE.md、DEPLOY.md 和 originals/README.md，先检查 Git 状态和构建，再继续维护。保留原文、推广链接和图片位置，不改写历史，不引入设备绝对路径。

这些文件是可迁移的项目知识；不需要旧会话 ID 或 Hermes 的全局记忆。对功能是否正常，以当前源码和实际验证为准。

## 3. 目录和编辑入口

| 位置 | 用途 | 是否编辑 |
|---|---|---|
| `README.md` | GitHub 读者入口、目录、推广及致谢 | 可编辑，但保留作者意图 |
| `docs/index.md` | 网站首页、目录、反馈、统计胶囊 | 可编辑 |
| `docs/01-why.md` … `docs/09-safety.md` | 九章现行正文 | 只做明确授权的内容修订 |
| `docs/images/` | 13 张 WebP 阅读图片 | 图片需保持原步骤位置 |
| `docs/.vitepress/config.ts` | 导航、侧边栏、搜索、SEO、路由 | 配置源文件必须提交 |
| `docs/.vitepress/theme/index.ts` | 图片放大及 giscus 评论 | 修改后额外做浏览器测试 |
| `docs/404.md` | 自定义 404 源文件 | 实际显示需要浏览器复核 |
| `docs/public/` | favicon、robots.txt、本地不蒜子脚本 | 构建时复制为静态资源 |
| `originals/` | 2 份原稿 + 13 张原图 + 哈希清单 | 只读档案，新增版本另存 |
| `package.json` / `package-lock.json` | 命令及依赖版本 | 配套维护 |
| `scripts/verify-originals.mjs` | 原件 SHA-256 与大小校验 | 工具源码 |
| `scripts/backup.py` | 导出 ZIP、Git bundle、静态站点和哈希 | 可移植，仅需 Python 标准库 |
| `tests/` | 原件校验、路径可移植性、备份恢复测试 | 修改对应工具后运行 |
| `auto-commit.ps1` | Windows 可选提交/推送助手 | 使用脚本所在目录，不固定设备路径 |

`node_modules/`、`docs/.vitepress/dist/`、`docs/.vitepress/cache/` 不提交。维护文档和 `originals/` 在站点根 `docs/` 之外，不会被 VitePress 当作网站页面。

## 4. 保留的作者决定

1. 原文及配图位置尽量原样保留。早期曾因过度改写/图片错位返工，原稿不是可以任意重写的素材。
2. 推广网址和邀请码完整保留；三个推荐服务是一分、魔戒、蓝海，魔戒导航站是额外链接，不是第四个推荐机场。
3. 保留 iOS Shadowrocket 的“联系作者获取”说明；不在仓库加入共享账号密码。
4. GitHub Markdown 与网站都可阅读。正文互链使用相对 `.md` 路径，图片用 `./images/…`，避免根绝对路径。
5. 网站隐藏“在 GitHub 上编辑此页”，`editLink: false`；通过首页/README 的 Issue、PR 入口反馈。
6. 免费托管，不购买自定义域名，不扩展无必要的后端；国内可达性是目标，不是任何网络下的保证。
7. 作者将本地副本作为备份；本次额外提供可迁移 ZIP。无需擅自新建镜像站或复制至其他账户。
8. 当前文件/本次公开上传资料去除设备路径，旧 Git 历史按作者明确选择保留，不强制推送改写历史。

## 5. 日常维护与发布

```bash
git status
git pull --ff-only
# 编辑明确需要修改的正文/配置
npm ci
npm run verify:originals
npm test
npm run docs:build
git diff
# 只添加已经审查过的文件；下列路径仅示例
git add README.md MAINTENANCE.md
git diff --cached
git commit -m "docs: update maintenance notes"
git push origin main
git ls-remote origin refs/heads/main
```

本地无提交身份时，在该仓库配置自己的 `user.name` 和 GitHub 设置中的 noreply 邮箱；读取公开仓库不需要登录，推送需要写权限和自己的 GitHub 认证。

`auto-commit.ps1` 会自动暂存项目里的改动并推送，使用前先审查 Git 状态。直接手工执行 Git 命令更容易控制提交范围。任何失败都应看完整日志与退出码，不能用管道末尾命令的成功冒充构建或推送成功。

推送并不等于网页已经部署。进入 Cloudflare Pages，找到与远端提交匹配的部署，查看构建、发布结果；完成后再验证页面/浏览器端行为。详细配置见 [DEPLOY.md](DEPLOY.md)。

## 6. 外部服务与账号交接

### Cloudflare Pages

现有地址为 `science-online-guide.pages.dev`，连接 GitHub 的 `main`；构建命令 `npm run docs:build`，输出 `docs/.vitepress/dist`，项目根目录为仓库根。

Cloudflare 账号、GitHub App 授权、生产环境变量、项目关联和 Web Analytics 的后台数据属于云端账户，不在 Git 克隆/ZIP 内。换电脑仍用原账户时，现有云端项目无需重建；新账户/Fork 要重新授权和创建 Pages 项目。迁移不会把云端账户控制权交给一个源码包。

### giscus

当前主题里的公开标识：

- repository：`Joshmax010/science-online-guide`
- repo ID：`R_kgDOT_s98A`
- category：`Announcements`
- category ID：`DIC_kwDOT_s98M4DD8Oe`
- mapping：`pathname`，语言 `zh-CN`。

这些是公开配置，不是密钥。Discussions 和评论存在 GitHub 服务器，不包含在 Git bundle。继续用同一仓库就保留这些标识；Fork 到新仓库须开启 Discussions、安装 giscus App 并重新取得标识。登录评论需要读者自己的 GitHub 账号。

### 统计

作者历史上确认开启 Cloudflare Web Analytics；本次迁移未登录后台核验是否仍开启。其后台统计不随源码转移。

首页不蒜子计数值使用 `busuanzi_value_site_pv` / `busuanzi_value_site_uv`，脚本是 `docs/public/busuanzi.pure.mini.js`。本地保存脚本不等于本地保存计数后端，统计仍依赖第三方网络；显示 `...` 时需实际检查网络请求、加载和 SPA 路由行为。

Git 全局代理、编辑器、Hermes 配置和系统软件不在仓库。新设备如需代理，自行按其实际地址设置；旧电脑全局代理设置不是项目必需配置。

## 7. 历史经验与当前待核验项

### 已发生的关键问题

- `.gitignore` 曾忽略整个 `.vitepress/`，造成配置/主题不上传，线上无导航或评论。只忽略 dist/cache。
- GitHub 不支持网站根的 `/images/…` 或没有 `.md` 后缀的裸章节路径。当前图像已移到 `docs/images/`。
- 文件名空格导致 Markdown 图片语法失败。网站 WebP 文件已采用无空格名称；原档案保留原名和 `%20` 引用。
- Markdown 顶层 `<script src="https://…">` 曾被 Vue 当成模块，引发 Node ESM 构建错误。当前不蒜子采用 `v-pre` + 本地静态脚本，是既有方案，不把它当成运行正常的证明。
- 原始图片共 13 张。旧 README/回答写过 14 张，已按实际清单纠正。
- 单纯安装 Claude Code 不保证产生独立贡献者；本项目选择 README 致谢，未实施 AI 账号署名或改历史。

### 不在本次迁移中擅自修复的事项

- 首页评论按钮指向 `08-faq.html#comments`，当前主题未看到相应 `id="comments"`；需浏览器检查，可能不能准确滚到评论区。
- giscus 的直接 script 渲染、刷新/SPA 切换、明暗主题同步需浏览器验证；构建通过不能验证评论功能。
- 不蒜子首次打开、站内返回首页的实际计数行为，以及跨域脚本是否加载成功，需浏览器验证。
- `docs/404.md` 使用 `layout: not-found`，实际中文内容是否被默认布局展示需浏览器复核。
- 首页手工更新时间仍是 `2026-08-22`。维护资料更新不代表教程内容已经复核，未为本次迁移改教程日期。
- 本次按锁文件重新审计时 `npm audit` 报告 6 项依赖告警（2 moderate、4 high），涉及 Vue/server-renderer/source-map-js 以及 Vite/esbuild/VitePress。部分有兼容更新，部分没有现成自动修复路径。迁移保持锁定依赖，未偷偷升级；开发服务器只绑定本机，后续独立评估升级，避免随意 `npm audit fix --force`。

## 8. ZIP 与离线历史备份

安装 Python 3.9+ 后，可在任意目录运行备份脚本（路径按当前设备调整，示例从项目根执行）：

```bash
npm run docs:build
python -m unittest discover -s tests -p "test_*.py" -v
# 提交所有需要备份的改动，工作区应干净
python scripts/backup.py
```

脚本默认将 ZIP 放到项目上一级的 `science-online-guide-backups/`，并附 `.zip.sha256`。ZIP 包含：

- `science-online-guide/`：当前 Git 跟踪的源码、维护文档、原件与锁文件；不含 `.git`、账号配置或 node_modules。
- `repository.bundle`：Git 提交历史及引用，可不联网恢复 Git 仓库；不含本地 `.git/config` 和凭证存储。
- `offline-site/`：导出时存在的静态构建，可用本地 HTTP 服务阅读；评论/统计仍需联网。
- `BACKUP-README.md`：解压后恢复说明。
- `backup-manifest.json`：源提交和每个内容文件的大小及 SHA-256。

从解压目录恢复历史：

```bash
git clone repository.bundle restored-project
cd restored-project
git remote set-url origin https://github.com/Joshmax010/science-online-guide.git
git fetch origin
npm ci
npm run verify:originals
npm test
npm run docs:build
```

离线阅读静态站点，从解压目录执行：

```bash
python -m http.server 4173 --bind 127.0.0.1 --directory offline-site
```

打开 `http://127.0.0.1:4173`。不要以直接双击 HTML 的 `file://` 方式判断模块站点是否可用。

ZIP 的历史 bundle 可能保留旧设备路径，因为作者选择保留历史；它是私人备份，不作为新的公开 GitHub Release 附件发布。当前公开源码和维护文档只用相对路径。移动到新设备后先确认克隆/解压、原件哈希和构建通过，再自行清理旧电脑；本次不删除旧机文件。
