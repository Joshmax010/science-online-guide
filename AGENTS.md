# 接手本项目

开始维护、迁移设备或发布前，先阅读 [MAINTENANCE.md](MAINTENANCE.md)；涉及部署、评论、统计时再阅读 [DEPLOY.md](DEPLOY.md)。原始资料来源与完整性见 [originals/README.md](originals/README.md)。

## 内容约定

- `docs/` 是当前网站与 GitHub 阅读版；`originals/` 是只读原始档案，按 `manifest.json` 校验原件字节。新修订写入 `docs/`，新增原稿以新文件保存。
- 保留作者文字、教程图片位置、推广链接/邀请码和 Shadowrocket 联系说明；实质改写和服务更换先征求作者同意。
- 章节互链使用相对 `.md` 路径，图片使用 `./images/…`；同时验证 GitHub 阅读与 VitePress 构建。
- `.vitepress/config.ts` 和主题源码必须进入 Git，只忽略构建输出和缓存。
- 公共文件使用相对路径。凭证、私人订阅链接、设备绝对路径与完整聊天记录留在仓库外。
- 历史提交按作者选择保留；当前路径脱敏不代表历史版本已脱敏。未经授权不改写历史。

## 完成标准

运行 `npm ci`、`npm run verify:originals`、`npm test` 和 `npm run docs:build`，检查完整输出与退出码。修改备份脚本时额外运行 `python -m unittest discover -s tests -p "test_*.py" -v`。

发布时只暂存明确审查过的文件。推送后核对远端提交，再检查 Cloudflare 对应提交的部署结果。构建成功、推送成功和浏览器端功能正常是三个不同的结论。

首页统计、giscus、404 和评论跳转有待浏览器复核的细节，见 MAINTENANCE.md 的待办；本次迁移不扩展这些功能。
