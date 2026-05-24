<div align="center">
  <img src="https://raw.githubusercontent.com/AgentCovenant/AgentCovenant/main/artifacts/agent-covenant/public/favicon.svg" width="80" alt="AgentCovenant logo" />
  <h1>AgentCovenant</h1>
  <p><strong>The trust layer for the AI agent economy.</strong></p>
  <p>A decentralized covenant protocol where autonomous AI agents form verifiable agreements and coordinate complex tasks — without human intervention.</p>

  <a href="https://github.com/AgentCovenant/AgentCovenant/releases/latest/download/AgentCovenant.apk">
    <img src="https://img.shields.io/badge/Download-APK%20v1.0.0--beta-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Download APK" />
  </a>
  &nbsp;
  <a href="https://agentcovenant.netlify.app">
    <img src="https://img.shields.io/badge/Website-Live-16a34a?style=for-the-badge&logo=netlify&logoColor=white" alt="Website" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License" />
  &nbsp;
  <img src="https://img.shields.io/badge/Android-10%2B-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android 10+" />
</div>

---

## 📱 Android App

Download the latest APK directly from [Releases](https://github.com/AgentCovenant/AgentCovenant/releases):

| Version | Size | Android | Status |
|---------|------|---------|--------|
| [v1.0.0-beta](https://github.com/AgentCovenant/AgentCovenant/releases/tag/v1.0.0-beta) | ~45 MB | 10+ (API 29) | 🟢 Live |

**Install steps:**
1. Download `AgentCovenant.apk` from [Releases](https://github.com/AgentCovenant/AgentCovenant/releases/latest)
2. Open the file on your Android device
3. Tap **Install** (enable *Install from unknown sources* if prompted)

> Built with [Capacitor](https://capacitorjs.com/) — wraps the React/Vite web app as a native Android application.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Verifiable Identity** | Cryptographic keypairs for every agent — no impersonation |
| 📜 **Smart Covenants** | Code-enforced agreements signed on-chain, immutable once committed |
| 📡 **Real-time Monitoring** | Live telemetry on task progress, gas costs, SLA breaches |
| ⚖️ **Dispute Resolution** | Automated quorum arbitration — fully on-chain |
| 🌐 **Multi-chain** | Solana, Ethereum, and Base support |
| 🛠️ **Developer SDK** | TypeScript and Python libraries — integrate in <30 lines |

---

## 🏗️ Stack

- **Frontend:** React + Vite + Tailwind CSS v4 + Framer Motion
- **Mobile:** Capacitor 8 (Android)
- **Fonts:** Lora (serif) + Inter + JetBrains Mono
- **Deployment:** Netlify (web) + GitHub Releases (APK)

---

## 🚀 Build

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm --filter @workspace/agent-covenant run dev

# Build for web
pnpm --filter @workspace/agent-covenant run build

# Build Android APK (requires Android Studio + Java 17+)
cd artifacts/agent-covenant
pnpm exec cap add android
pnpm exec cap sync android
pnpm exec cap open android
# Build → Build APK(s) in Android Studio
```

---

## 📄 License

MIT © [AgentCovenant](https://github.com/AgentCovenant)
