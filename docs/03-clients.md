# 03 客户端选择

这一章帮你搞清楚：市面上有哪些客户端、各自有什么差异、你应该用哪个。

**核心结论先放前面**：

- Windows / macOS 用 **Clash Verge Rev** 或 **FlClash**
- 安卓用 **v2rayNG**
- iPhone 用 **Shadowrocket**（小火箭）或 **Stash**

下面解释为什么。

## 客户端分类

### Clash 系

基于 Clash 内核，支持订阅导入、规则分流、多节点切换，功能强大，适合搭配机场使用。

代表：**Clash Verge Rev**、**FlClash**、Clash for Windows（已停更）。

### v2ray 系

基于 v2ray / Xray 内核，同样支持订阅导入，界面更简洁。

代表：**v2rayNG**（安卓）、**v2rayN**（Windows）。

### Sing-box 系

新一代内核，跨平台、轻量、性能好，正在快速崛起。

代表：**sing-box** 客户端本体、Shadowrocket（iOS，闭源但兼容 sing-box 配置）。

> 无论哪一类，搭配机场订阅都能用。差异主要在界面、功能和内核协议支持上。

## 各客户端对比

| 客户端 | 平台 | 开源 | 特点 | 推荐度 |
|--------|------|------|------|--------|
| **Clash Verge Rev** | Windows / macOS | ✅ | 界面现代、功能全、活跃维护，当前 Clash 系首选 | ⭐⭐⭐⭐⭐ |
| **FlClash** | Windows / macOS / 安卓 / iOS | ✅ | 跨平台，界面简洁，新手友好 | ⭐⭐⭐⭐ |
| **v2rayNG** | 安卓 | ✅ | 安卓端最流行，稳定轻量 | ⭐⭐⭐⭐⭐ |
| **v2rayN** | Windows | ✅ | Windows 端 v2ray 系经典，功能全 | ⭐⭐⭐⭐ |
| **Stash** | iOS | ❌ | 付费，Clash 系，iOS 体验好 | ⭐⭐⭐⭐ |
| **Shadowrocket** | iOS | ❌ | 付费，iOS 经典，支持协议多 | ⭐⭐⭐⭐ |
| **sing-box** | 全平台 | ✅ | 新一代内核，性能好 | ⭐⭐⭐⭐ |
| **Clash for Windows** | Windows | ✅ | **已停止维护**，不推荐新用户使用 | ⭐ |

> ⚠️ **Clash for Windows 已停止维护**，虽然还能用，但不再更新，新用户不建议选择。

## 怎么选

### Windows / macOS 用户

**首选 Clash Verge Rev**。界面现代、功能完整、持续维护，导入机场订阅后开箱即用。操作步骤见 [05 Windows 操作](/05-windows)。

### 安卓用户

**首选 v2rayNG**。安卓端最流行、最稳定，界面简洁，导入订阅即可。操作步骤见 [06 手机配置](/06-mobile)。

### iPhone 用户

iOS 没有免费的开源 Clash 客户端，主流是付费的 **Stash** 或 **Shadowrocket（小火箭）**。两者都支持机场订阅：

- **Stash**：更贴近 Clash 体验
- **Shadowrocket**：协议支持更广，是较为主流的 iOS 科学上网软件

> 注意：Shadowrocket 下载需要美区 Apple ID 且需要付费，较为复杂。有需要但不愿意麻烦自己注册的用户，可以联系作者获取。

### 多设备用户

**FlClash** 跨平台，一个客户端覆盖 Windows / macOS / 安卓 / iOS，适合想统一体验的人。

## 客户端差异速查

- **界面**：Clash Verge Rev 和 FlClash 更现代，v2rayNG 更简洁
- **规则分流**：Clash 系支持规则分流（国内直连、国外走代理），v2ray 系也支持但配置方式不同
- **协议支持**：不同客户端支持的协议不同，主流机场订阅一般都能兼容
- **维护状态**：优先选活跃维护的客户端，避免用停更软件

## 小结

选客户端不用纠结，按你的设备选主流推荐即可：

| 设备 | 推荐客户端 |
|------|------------|
| Windows / macOS | Clash Verge Rev |
| 安卓 | v2rayNG |
| iPhone | Stash 或 Shadowrocket |
| 多设备统一 | FlClash |

选好客户端后，下一步是选机场——见 [04 机场推荐](/04-airports)。