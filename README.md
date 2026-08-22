# 科学上网完全指南

一份写给零基础小白的开放教程：教你用开源客户端搭配机场，5 分钟跑通第一次，常见问题逐个排查。

- 🌐 **在线阅读**：https://science-online-guide.pages.dev

> 本文档由作者实际使用三年多经验整理，包含多家机场的实测邀请链接，可放心使用。
> 反馈与交流：可通过 GitHub Issue 或作者联系方式。

---

## 这是什么？

这是一份**面向完全零基础用户**的科学上网教程。不预设任何背景知识，从「为什么要用」讲到「怎么配置」再到「出问题了怎么办」。

- ✅ 零基础友好
- ✅ 全平台覆盖
- ✅ 持续更新
- ✅ 开放协作

---

## 目录

| 章节 | 内容 | 链接 |
|------|------|------|
| 01 | 为什么需要科学上网 | [阅读](/01-why) |
| 02 | 基础概念 | [阅读](/02-concepts) |
| 03 | 客户端选择 | [阅读](/03-clients) |
| 04 | 机场推荐 | [阅读](/04-airports) |
| 05 | Windows 操作 | [阅读](/05-windows) |
| 06 | 手机配置 | [阅读](/06-mobile) |
| 07 | 聚合 App 与机场的差异 | [阅读](/07-comparison) |
| 08 | 常见问题 | [阅读](/08-faq) |
| 09 | 安全与免责 | [阅读](/09-safety) |

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

---

## 部署

本项目配置为部署到 **Cloudflare Pages**：

1. Fork/克隆本仓库到你的 GitHub
2. 在 [Cloudflare Pages](https://dash.cloudflare.com/) 创建项目
3. 连接 GitHub 仓库
4. 构建命令：`npm run docs:build`
5. 输出目录：`docs/.vitepress/dist`
6. 点击部署，获得 `xxx.pages.dev` 子域名

---

## 贡献

发现错误、步骤过时、或想贡献内容？欢迎提 Issue 或 PR！

---

## 推荐机场一览（推广）

| 机场 | 邀请链接 | 说明 |
|------|----------|------|
| 一分机场 | [https://xn--4gqx1hgtfdmt.com/#/register?code=H1NYycCi](https://xn--4gqx1hgtfdmt.com/#/register?code=H1NYycCi) | 老牌，自用三年多，可买断流量 |
| 魔戒机场 | [https://47.242.128.61:8000/register?aff=H0yhxAKy](https://47.242.128.61:8000/register?aff=H0yhxAKy) | 同运营商还有八戒机场，套餐类型多 |
| 魔戒导航站 | [https://129.226.120.177:8000/](https://129.226.120.177:8000/) | 国内直连 |
| 蓝海加速 | [https://app.lanhai.in:7779/#/register?code=brnPPIXz](https://app.lanhai.in:7779/#/register?code=brnPPIXz) | 节点稳定，国内直连，缺点是稍贵 |

> 💡 iOS 用户如需 Shadowrocket，可联系作者获取（美区 ID + 已购账号）。

---

## 免责声明

- 本教程仅用于**技术学习与信息获取的科普目的**
- 不同地区对网络访问工具的规定不同，**使用前请了解并遵守你所在地区的法律法规**
- 因使用本教程内容产生的任何法律后果，**由使用者自行承担**
- 推荐的第三方服务不构成担保，**风险自担**

详见 [安全与免责](/09-safety)。

---

## License

本项目文档采用 CC BY-NC-SA 4.0 许可，代码部分采用 MIT 许可。