# Setup

`ppt-team-agent` 실행을 위한 복붙 가능한 설치 가이드입니다.

## 1) 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/ppt_team_agent.git && cd ppt_team_agent
```

## 2) OS별 원라이너 설치

macOS (Homebrew):

```bash
brew update && brew install node git && npm ci && npx playwright install chromium
```

Ubuntu (apt):

```bash
sudo apt-get update && sudo apt-get install -y curl git && curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs && npm ci && npx playwright install chromium
```

Windows (winget, PowerShell):

```powershell
winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements; winget install -e --id Git.Git --accept-package-agreements --accept-source-agreements; npm ci; npx playwright install chromium
```

## 3) CLI 동작 확인

```bash
npm exec -- ppt-agent --help
```
