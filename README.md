<div align="center">

<img src="public/favicon.ico" width="64" height="64" alt="PromptX Logo" />

# PromptX — Glow Forge

### AI Prompt Compiler · Enhancement Engine · Browser Extension

**Transform raw ideas into professional-grade, structured AI prompts.**  
Built for developers, designers, and power users who want more than generic output.

[![Built with Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js Backend](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://expressjs.com)
[![OpenRouter](https://img.shields.io/badge/LLM-OpenRouter%20%2F%20DeepSeek-FF6B35)](https://openrouter.ai)

</div>

---

## What is PromptX?

PromptX is a **full-stack prompt engineering platform** made of two tightly integrated parts:

| Part | What it does |
|---|---|
| **Web App** (`/promptin`) | A cinematic dark-mode UI to write, enhance, analyze, save, and manage AI prompts |
| **Browser Extension** (`/promptx_extension`) | A WisprFlow-style floating pill that enhances any text field on any website — in real time |

The backend is a Node.js/Express server that routes prompts through a **multi-layer system prompt stack** targeting DeepSeek V3 via OpenRouter. Outputs are always structured JSON — ready for LLM pipelines, image generators, video tools, or automation.

---

## Architecture Overview

```
promptin/                          # Web application root
├── src/
│   ├── pages/
│   │   ├── Index.tsx              # Main page: enhance, history, analyzer, templates
│   │   ├── SavedPrompts.tsx       # Saved prompt library
│   │   └── PromptHistory.tsx      # Full history view
│   ├── components/
│   │   ├── PromptInput.tsx        # Voice input, history navigation, keyboard shortcuts
│   │   ├── ToolSelector.tsx       # Enhancement mode picker (Specific / Ultra / Reverse)
│   │   ├── EnhancedResultDisplay.tsx  # Typewriter reveal, diff view, grade, copy/share/save
│   │   ├── PromptAnalyzer.tsx     # Live 4-metric prompt quality scorer
│   │   ├── PromptTemplates.tsx    # Pre-built template browser
│   │   ├── PromptHistorySidebar.tsx   # Slide-in history panel
│   │   ├── FloatingToolbar.tsx    # Quick-access floating actions
│   │   └── Navigation.tsx         # Top navbar with theme toggle
│   ├── hooks/
│   │   ├── usePromptHistory.ts    # localStorage-backed history
│   │   ├── useSavedPrompts.ts     # Save/delete prompt library
│   │   └── useVoiceRecognition.ts # Web Speech API wrapper
│   └── lib/utils.ts               # clsx / tailwind-merge helpers
├── server/
│   ├── server.js                  # Express app, CORS, port 3001
│   └── routes/
│       ├── enhance.js             # Core LLM routing + multi-layer system prompt stack
│       ├── history.js             # History persistence API
│       └── savedPrompts.js        # Saved prompts CRUD API
└── public/

promptx_extension/                 # Chrome Extension (Manifest V3)
├── manifest.json                  # Permissions, content scripts, icons
├── content.js                     # Floating pill UI, streaming enhance, voice input
├── background.js                  # Service worker
├── styles.css                     # Pill/tooltip styles
└── icons/                         # 16/32/48/128px icons + SVG action icons
```

---

## Enhancement Modes

PromptX ships three distinct AI enhancement pipelines, selectable from the **ToolSelector** in the UI or always available via the browser extension:

### ⚡ Specific Enhance *(default)*
Single-pass LLM call through the full multi-layer system prompt stack. Returns a **structured JSON** output scoped to the detected intent domain (Web/App/SaaS, Image, or Video). Best for fast, high-quality results.

### 🔥 Ultra Enhance
Three-stage pipeline: the output of each stage feeds into the next.
1. Clarify and expand
2. Add technical entities and structure
3. Polish with features, APIs, stack, and future enhancements

Produces the most detailed, layered JSON output. Takes longer but maximizes depth.

### 🔄 Reverse Query
Interactive flow: the AI generates **5 clarifying questions** from your raw prompt. You answer them in the UI. The final JSON is compiled from your prompt + all answers combined. Great when you know the vibe but not the details.

---

## The System Prompt Stack

The backend (`server/routes/enhance.js`) uses a layered system prompt architecture — not a single instruction, but a stack of independent controllers composed at runtime:

| Layer | Role |
|---|---|
| **Meta Controller** | Detects intent domain (Web / Image / Video), selects reasoning framework |
| **Persona** | Collective intelligence: UI/UX designer, creative technologist, product architect, AI fine-tuning engineer |
| **Design DNA** | Core rules: think in systems, interfaces are state machines, motion communicates meaning |
| **Domain Reasoners** | Web Reasoner, Image Reasoner, Video Reasoner — domain-specific logic |
| **Schema Composer** | Enforces strict JSON-only output, no markdown, no extra keys |
| **Output Contracts** | Per-domain JSON schemas (web/image/video) the model must follow |
| **Quality Guardrails** | Never assume, never generate generic content, infer conservatively |
| **Output Compiler** | Optimizes output for direct injection into LLM pipelines, image/video generators |

> The model used is **`deepseek/deepseek-v3-base`** via **OpenRouter**.

---

## Browser Extension — Floating Pill

The Chrome extension injects a **WisprFlow-style floating pill** into every page via `content.js`. It requires zero configuration once your local server is running.

**How it works:**
1. Click into any `<textarea>`, `<input>`, or `contenteditable` field anywhere on the web
2. Hover over the pill (bottom-center of screen) to expand it
3. Click **🪄 Enhance Prompt** → your text is sent to `localhost:3001/api/enhance`
4. The enhanced JSON is written directly back into the field
5. Click **🎤 Mic** → voice input via Web Speech API, transcribed directly into the field

The pill supports: streaming abort via `AbortController`, keyboard `Escape` to cancel, dynamic field detection via `MutationObserver`, and SSE / NDJSON / raw chunk parsing.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18+ and npm
- A free [OpenRouter](https://openrouter.ai) API key
- Chrome (for the browser extension)

---

### 1. Clone the Repository

```sh
git clone https://github.com/YOUR_USERNAME/promptx-glow-forge.git
cd promptx-glow-forge
```

---

### 2. Install Dependencies

**Frontend (web app):**
```sh
cd promptin
npm install
```

**Backend (API server):**
```sh
cd promptin/server
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside `promptin/server/`:

```sh
# promptin/server/.env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> Get your key at [openrouter.ai/keys](https://openrouter.ai/keys). Free tier is sufficient for development.

---

### 4. Start the Development Servers

You need **two terminals** running simultaneously:

**Terminal 1 — Backend (port 3001):**
```sh
cd promptin/server
node server.js
# → Server is running on http://localhost:3001
```

**Terminal 2 — Frontend (port 5173):**
```sh
cd promptin
npm run dev
# → Local: http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) to use the app.

---

### 5. Install the Browser Extension

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `promptx_extension/` folder
5. The PromptX pill is now active on every page — make sure your local server (step 4) is running

---

## Key Features

| Feature | Description |
|---|---|
| **Multi-mode Enhancement** | Specific, Ultra (3-stage), and Reverse Query (interactive) modes |
| **Structured JSON Output** | Always returns machine-readable JSON — not prose |
| **Domain Detection** | Auto-detects Web/App, Image, or Video intent and applies the correct schema |
| **Prompt Analyzer** | Live 4-metric scoring: Clarity, Depth, Specificity, Practicality |
| **Typewriter Reveal** | Animated result display with quality grade and diff view |
| **Voice Input** | Web Speech API mic input in both the web app and browser extension |
| **Prompt History** | Auto-saved history with keyboard navigation (Ctrl+↑/↓) |
| **Saved Library** | Save, browse, and reuse your best prompts |
| **Template Browser** | Pre-built starter templates for common use cases |
| **Floating Pill Extension** | One-click enhancement in any text field on any website |
| **Dark Cinematic UI** | Purple/cyan gradient aesthetic with animated backgrounds |
| **Theme Toggle** | Light/dark mode support via `next-themes` |

---

## Tech Stack

### Frontend
| Tool | Version | Purpose |
|---|---|---|
| Vite | 5.4 | Build tooling & dev server |
| React | 18.3 | UI framework |
| TypeScript | 5.5 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| shadcn/ui | latest | Accessible component primitives |
| Radix UI | various | Headless UI components |
| TanStack Query | 5 | Async state management |
| React Router | 6 | Client-side routing |
| Recharts | 2 | Charts / data visualization |
| Lucide React | 0.462 | Icon library |
| react-markdown | 10 | Markdown rendering |

### Backend
| Tool | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4 | HTTP server + routing |
| OpenRouter API | — | LLM gateway |
| DeepSeek V3 Base | — | Primary language model |
| dotenv | 17 | Environment config |
| cors | — | Cross-origin requests |

### Browser Extension
| Tech | Purpose |
|---|---|
| Manifest V3 | Chrome extension format |
| Vanilla JS | Zero-dependency content script |
| Web Speech API | Voice recognition |
| `AbortController` | Streaming cancellation |
| `MutationObserver` | Dynamic field detection |

---

## API Reference

The Express backend exposes these endpoints on `http://localhost:3001`:

### `POST /api/enhance`

Enhances a prompt using the selected tool mode.

**Request body:**
```json
{
  "prompt": "Build a task management SaaS",
  "tool": "specific",
  "answers": {}
}
```

**`tool` options:** `specific` | `ultra` | `reverse`

**Response (Specific/Ultra):** A structured JSON object matching the detected domain schema (web / image / video).

**Response (Reverse — first call, no `answers`):**
```json
{ "questions": ["Who is the target user?", "What problem does it solve?", ...] }
```

**Response (Reverse — second call, with `answers`):** Final structured JSON.

---

### `GET /api/history`
Returns saved prompt history array.

### `POST /api/history`
Saves a new history entry.

### `GET /api/saved-prompts`
Returns the saved prompts library.

### `POST /api/saved-prompts`
Saves a prompt to the library.

### `DELETE /api/saved-prompts/:id`
Deletes a saved prompt by ID.

---

## Output Schema Examples

**Web/App Intent:**
```json
{
  "mode": "web",
  "experience_system": {
    "core_metaphor": "...",
    "mental_model": "...",
    "design_principles": [],
    "interaction_language": { "primary_inputs": [], "gestures": [], "scroll_semantics": "" }
  },
  "screens": [{ "name": "", "purpose": "", "user_goal": "", "key_components": [], "logic_triggers": [], "transitions": "" }],
  "ui_system": { "layout_model": "", "motion_rules": [], "typography": {}, "color_light": {} }
}
```

**Image Intent:**
```json
{
  "mode": "image",
  "subject": "",
  "composition": { "framing": "", "depth": "", "focus": "" },
  "lighting": "",
  "style": "",
  "constraints": []
}
```

**Video Intent:**
```json
{
  "mode": "video",
  "concept": "",
  "scenes": [{ "scene_goal": "", "camera_motion": "", "visual_action": "", "audio": "" }],
  "timeline": "",
  "constraints": []
}
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Submit / enhance prompt |
| `Ctrl + ↑` | Navigate to previous prompt in history |
| `Ctrl + ↓` | Navigate to next prompt in history |
| `Escape` | Cancel streaming or stop voice recording (extension) |

---

## Project Status

This project is actively developed. Planned improvements:

- [ ] Streaming responses (SSE) from the backend to the frontend
- [ ] Authentication + cloud-synced history and saved prompts
- [ ] Additional LLM providers (Claude, GPT-4o, Gemini) via OpenRouter
- [ ] Prompt chaining / pipeline builder
- [ ] Export to Markdown, JSON, or direct API injection
- [ ] Extension support for Firefox / Edge

---

## License

MIT © 2025 PromptX

---

<div align="center">

**Built with obsession. Powered by DeepSeek. Designed for makers.**

</div>
