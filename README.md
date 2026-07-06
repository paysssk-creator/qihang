# 启航优选 (Qihang)

AI 原生多身份浏览器 · Atlas 风格 · 量化交易 · 全自动

## 快速开始

```bash
# 安装依赖
pnpm install
cd packages/agent && uv sync

# 开发模式
pnpm dev

# 生产构建 + 源码保护 + 打包
pnpm pack:mac    # macOS
pnpm pack:win    # Windows
```

## 项目结构

```
qihang/
├── packages/
│   ├── shell/       Electron + React (UI)
│   ├── agent/       Python AI 引擎 (链上监听/审计/量化)
│   ├── host/        Python 浏览器控制
│   └── ipc/         IPC 协议定义
├── scripts/
│   └── protect.py   源码保护构建
├── docs/            设计文档
└── release/         打包输出
```

## 核心能力

- 🧠 AI 浏览器操控 (browser-use 103K⭐)
- 💱 法币换USDT (BestChange 468交易所)
- 📱 全球接码 (128国 1000+平台)
- 📧 无限邮箱 (Cloudflare Agentic Inbox)
- 🔍 爬虫+渗透 (Crawl4AI + Nuclei)
- 🔗 链上监听 (TRC20-USDT 实时到账)
- 🔒 源码保护 (ASAR + Cython)
- 📊 审计日志 (不可变哈希链)

## 平台钱包

```
TLyD5v9eTDp3mMzpYT3kprF6WdsUc3W99d (TRC20-USDT)
```

## 费率

服务费 5%，净额自动转发到用户钱包。

## 许可证

MIT
