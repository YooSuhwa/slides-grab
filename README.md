# ppt-team-agent

Agent-first PPT framework.
Agents write HTML slides directly, and a Planning -> Design -> Conversion pipeline produces PPTX/PDF output.

## Installation

Use the quick install below, then follow the agent-specific guide:

- Claude guide: [docs/installation/claude.md](docs/installation/claude.md)
- Codex guide: [docs/installation/codex.md](docs/installation/codex.md)

### 1) Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ppt_team_agent.git && cd ppt_team_agent
```

### 2) Install Dependencies

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

### 3) Verify CLI

```bash
npm exec -- ppt-agent --help
```

### 4) Agent Copy-Paste Prompts

Prompt for Claude:

```text
Read docs/installation/claude.md first and follow it exactly. Use the 3-stage Claude skills workflow (.claude/skills/plan-skill, design-skill, pptx-skill). Use decks/<deck-name> as the slides workspace and run validate before conversion.
```

Prompt for Codex:

```text
Read docs/installation/codex.md first and follow it exactly. Use Codex skills (ppt-plan-skill, ppt-design-skill, ppt-pptx-skill), keep each deck in decks/<deck-name>, and run validate before convert/pdf.
```

## CLI

```bash
ppt-agent build-viewer
ppt-agent validate
ppt-agent convert
```

All slide commands support `--slides-dir <path>` (default: `slides`).
Use it to manage multiple decks by folder name:

```bash
ppt-agent edit --slides-dir decks/ralph-b00
ppt-agent build-viewer --slides-dir decks/ralph-b00
ppt-agent validate --slides-dir decks/ralph-b00
ppt-agent pdf --slides-dir decks/ralph-b00 --output decks/ralph-b00.pdf
ppt-agent convert --slides-dir decks/ralph-b00 --output decks/ralph-b00.pptx
```

For local development you can also run directly:

```bash
node bin/ppt-agent.js --help
```

## npm Scripts

```bash
npm run build-viewer
npm run validate
npm run convert
npm run html2pptx
npm run codex:install-skills
```

## Codex Skills

This repository includes Codex-native skills under `skills/`:

- `ppt-plan-skill`
- `ppt-design-skill`
- `ppt-pptx-skill`

Install them into Codex skill home:

```bash
ppt-agent install-codex-skills --force
```

or:

```bash
node scripts/install-codex-skills.js --force
```

After installation, restart Codex to pick up the new skills.
