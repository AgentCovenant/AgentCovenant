# Building the AgentCovenant APK with Capacitor

## Prerequisites
- Node.js 18+
- pnpm
- Android Studio (for Android builds)
- Java 17+

## Steps

### 1. Install dependencies
```bash
pnpm install
```

### 2. Build the web app
```bash
pnpm run build
```

### 3. Add Android platform (first time only)
```bash
pnpm exec cap add android
```

### 4. Sync web build into Android project
```bash
pnpm exec cap sync android
```

### 5. Open in Android Studio (builds the APK)
```bash
pnpm exec cap open android
```

Then in Android Studio:
- Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### 6. For a signed release APK
- Go to **Build → Generate Signed Bundle / APK**
- Follow the keystore signing wizard

### 7. Upload to GitHub Releases
Upload the signed APK to:
`https://github.com/AgentCovenant/releases`

The website download button points to:
`https://github.com/AgentCovenant/releases/latest/download/AgentCovenant.apk`
