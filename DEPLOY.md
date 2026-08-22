# Cloudflare Pages 部署指南（5 分钟上线）

本指南教你把 **科学上网完全指南** 部署到 Cloudflare Pages，获得免费的 `xxx.pages.dev` 域名，**国内可直接访问，完全免费**。

---

## 准备工作（1 分钟）

你需要：
- 一个 **GitHub 账号**（没有就去 github.com 注册）
- 已经在本地生成好的项目文件（已经帮你准备好了）

---

## 步骤 1：创建 GitHub 仓库（1 分钟）

1. 打开 https://github.com/new
2. 仓库名：`science-online-guide`（或你喜欢的名字）
3. 设为 **Public**（公开）
4. **不要**勾选 "Add a README file"（我们已经有了）
5. 点击 **Create repository**

---

## 步骤 2：推送代码到 GitHub（1 分钟）

在你的电脑上打开终端（PowerShell / CMD / Git Bash），运行：

```bash
# 进入项目目录（根据你的实际路径调整）
cd "D:\AAAAAAAAA\ai work\hermes\science-online-guide"

# 初始化 git（如果还没初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: 初始化科学上网完全指南"

# 关联远程仓库（把 YOUR_USERNAME 换成你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/science-online-guide.git

# 推送
git branch -M main
git push -u origin main
```

> 💡 如果提示输入用户名/密码，用户名填 GitHub 用户名，密码填 **Personal Access Token**（不是登录密码）。  
> Token 生成：GitHub Settings → Developer settings → Personal access tokens → Generate new token (classic) → 勾选 `repo` 权限。

---

## 步骤 3：部署到 Cloudflare Pages（2 分钟）

### 3.1 登录 Cloudflare
打开 https://dash.cloudflare.com/，登录或注册（免费）。

### 3.2 创建 Pages 项目
1. 左侧菜单点击 **Workers & Pages**
2. 点击 **Create application** → **Pages** → **Connect to Git**
3. 选择 **GitHub**，授权 Cloudflare 访问你的仓库
4. 选择刚才创建的 `science-online-guide` 仓库
5. 点击 **Begin setup**

### 3.3 配置构建设置

| 设置项 | 值 |
|--------|-----|
| **Project name** | `science-online-guide`（或你想要的子域名前缀） |
| **Production branch** | `main` |
| **Build command** | `npm run docs:build` |
| **Build output directory** | `docs/.vitepress/dist` |
| **Root directory** | （留空） |

**Environment variables（环境变量）**：
- 点击 **Add variable** → 不需要加任何变量，直接跳过

### 3.4 点击部署

点击 **Save and Deploy**，等待 1-2 分钟构建完成。

---

## 步骤 4：访问你的网站（秒开）

构建成功后，你会得到一个免费域名：

```
https://science-online-guide.pages.dev
```

或者你自定义的项目名：
```
https://你的项目名.pages.dev
```

**国内直接可访问，速度很快！** 🎉

---

## 后续更新

以后修改内容只需要：

```bash
# 修改 docs/ 里的 .md 文件后
git add .
git commit -m "update: 修正了某个步骤"
git push
```

**Cloudflare Pages 会自动检测到 push 并重新部署**，几分钟后新内容自动生效。

---

## 常见问题

### Q: 构建失败了怎么办？
看构建日志，常见原因：
- Node 版本问题 → Cloudflare Pages 默认用 Node 18+，VitePress 1.x 兼容
- 依赖安装失败 → 尝试在本地先跑 `npm run docs:build` 确认没问题再推

### Q: 想用自己的域名？
在 Cloudflare Pages 项目设置 → **Custom domains** → 添加你的域名。需要域名在 Cloudflare 托管 DNS（改 NS 到 Cloudflare）。

### Q: 怎么看访问统计？
Cloudflare Pages → 项目 → **Analytics**，免费看访问量、来源等。

### Q: 可以加密码访问吗？
Cloudflare Pages 不直接支持密码保护。可以用 Cloudflare Workers 做简单鉴权，或用 Cloudflare Access（免费 50 用户）。

---

## 项目结构说明

```
science-online-guide/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts      # VitePress 配置
│   ├── index.md           # 首页
│   ├── 01-why.md          # 章节文件
│   ├── 02-concepts.md
│   ├── 03-clients.md
│   ├── 04-airports.md
│   ├── 05-windows.md
│   ├── 06-mobile.md
│   ├── 07-comparison.md
│   ├── 08-faq.md
│   └── 09-safety.md
├── package.json
└── README.md
```

---

## 本地预览（可选）

```bash
# 安装依赖（首次）
npm install

# 启动开发服务器
npm run docs:dev
# 打开 http://localhost:5173 预览
```

---

## 完成！🎉

现在你有了一个：
- ✅ **完全免费**的技术文档站
- ✅ **国内可直接访问**（Cloudflare Pages 有亚洲节点）
- ✅ **自动 HTTPS**
- ✅ **Git 推送即更新**
- ✅ **无需备案、无需服务器**

把链接发给需要的人吧！# 触发重新部署
