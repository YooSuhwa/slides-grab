# slides-grab

Agent-first presentation framework for **Claude Code** and **Codex**.

AI agents plan your slide outline, generate production-ready HTML slides, and export to PPTX/PDF — but the real differentiator is the **visual editor**: open it in your browser, draw bounding boxes on any element, type a prompt, and the agent rewrites only that region. No more re-generating the entire deck for a one-word fix.

## Why This Project?

There are many AI tools that generate slide HTML. Almost none let you **visually point at what you want changed** and iterate in-place. slides-grab fills that gap:

- **Plan** — Agent creates a structured slide outline from your topic/files
- **Design** — Agent generates each slide as a self-contained HTML file
- **Edit** — Browser-based editor with bbox selection, direct text editing, and agent-powered rewrites
- **Export** — One command to PPTX or PDF

## Quick Start

```bash
# 1. Clone & install
git clone https://github.com/vkehfdl1/slides-grab.git && cd slides-grab
npm ci && npx playwright install chromium

# 2. Open the editor
slides-grab edit --slides-dir slides

# 3. Export
slides-grab convert --slides-dir slides --output deck.pptx
slides-grab pdf --slides-dir slides --output deck.pdf
```

> Requires **Node.js >= 18**. See platform-specific install instructions below.

## Installation

Detailed setup guides per agent:

- [Claude guide](docs/installation/claude.md)
- [Codex guide](docs/installation/codex.md)

### Platform-Specific Dependencies

macOS (Homebrew):

```bash
brew update && brew install node git && npm ci && npx playwright install chromium
```

Ubuntu (apt):

```bash
sudo apt-get update && sudo apt-get install -y curl git \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - \
  && sudo apt-get install -y nodejs && npm ci && npx playwright install chromium
```

Windows (winget, PowerShell):

```powershell
winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
winget install -e --id Git.Git --accept-package-agreements --accept-source-agreements
npm ci; npx playwright install chromium
```

### Verify

```bash
npm exec -- slides-grab --help
```

## CLI Commands

All commands support `--slides-dir <path>` (default: `slides`).

```bash
slides-grab edit              # Launch visual slide editor
slides-grab build-viewer      # Build single-file viewer.html
slides-grab validate          # Validate slide HTML (Playwright-based)
slides-grab convert           # Export to PPTX
slides-grab pdf               # Export to PDF
slides-grab list-templates    # Show available slide templates
slides-grab list-themes       # Show available color themes
```

### Multi-Deck Workflow

```bash
slides-grab edit       --slides-dir decks/my-deck
slides-grab validate   --slides-dir decks/my-deck
slides-grab pdf        --slides-dir decks/my-deck --output decks/my-deck.pdf
slides-grab convert    --slides-dir decks/my-deck --output decks/my-deck.pptx
```

## Agent Kickoff Prompts

**Claude:**

```text
Read docs/installation/claude.md first and follow it exactly. Use the 3-stage Claude skills workflow (.claude/skills/plan-skill, design-skill, pptx-skill). Use decks/<deck-name> as the slides workspace and run validate before conversion.
```

**Codex:**

```text
Read docs/installation/codex.md first and follow it exactly. Use Codex skills (ppt-plan-skill, ppt-design-skill, ppt-pptx-skill), keep each deck in decks/<deck-name>, and run validate before convert/pdf.
```

## Codex Skills

Install Codex-native skills (`skills/ppt-plan-skill`, `ppt-design-skill`, `ppt-pptx-skill`):

```bash
slides-grab install-codex-skills --force
```

Restart Codex after installation.

## Project Structure

```
bin/              CLI entry point
src/editor/       Visual editor (HTML + JS client modules)
scripts/          Build, validate, convert, editor server
templates/        Slide HTML templates (cover, content, chart, ...)
themes/           Color themes (modern-dark, executive, sage, ...)
.claude/skills/   Claude Code skill definitions
skills/           Codex skill definitions
docs/             Installation & usage guides
```

## License

[MIT](LICENSE)
