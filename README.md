<p align="center">
  <img src="https://img.shields.io/badge/pnpm-monorepo-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm monorepo" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
  <img src="https://img.shields.io/badge/Notion_API-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion API" />
  <img src="https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<h1 align="center">Pavan's Portfolio</h1>

<p align="center">
  <strong>A modern, full-stack portfolio website with an AI-powered blog system — built as a pnpm monorepo.</strong>
</p>

<p align="center">
  <a href="https://github.com/paavann/portfolio">Repository</a> · 
  <a href="#-architecture">Architecture</a> · 
  <a href="#-getting-started">Getting Started</a> · 
  <a href="#-blog-enhancement-workflow">Blog Workflow</a>
</p>

---

## 📖 Overview

This repository is a **pnpm workspace monorepo** containing two applications and two shared configuration packages that together power a personal portfolio website with an integrated, Notion-backed blog system.

The **frontend** is a React SPA (Vite + Tailwind CSS v4) featuring sections for an intro, about, projects, and blogs — all rendered with a clean, bold design language. The **backend** is a Cloudflare Worker that acts as a REST API, querying a Notion database in real-time and caching responses via Cloudflare KV for performance. An **n8n automation workflow** enhances blog posts using AI (Gemini 2.5 Flash) before publishing, managing the full lifecycle from draft enhancement to final deployment.

---

## 🏗 Architecture

```
                    ┌───────────────────────────────────┐
                    │          Notion Database           │
                    │  (Blogs: Title, Slug, Tags, etc.) │
                    └──────────┬────────────┬───────────┘
                               │            │
                    ┌──────────▼──────┐     │
                    │   n8n Workflow   │     │
                    │  (AI-Enhanced    │     │
                    │   Blog Pipeline) │     │
                    └──────────┬──────┘     │
                               │            │
                    ┌──────────▼────────────▼───────────┐
                    │      Cloudflare Worker (API)       │
                    │   GET /api/blogs                   │
                    │   GET /api/blogs/:slug             │
                    │         + KV Cache Layer           │
                    └──────────────┬────────────────────┘
                                   │
                    ┌──────────────▼────────────────────┐
                    │     React SPA (Vite + Tailwind)    │
                    │  /          → Home (Intro, About,  │
                    │               Projects, Blogs)     │
                    │  /blogs     → All Blogs (lazy load) │
                    │  /blogs/:slug → Blog Post Detail   │
                    └───────────────────────────────────┘
```

---

## 📁 Repository Structure

```
portfolio/
├── apps/
│   ├── api/                       # Cloudflare Worker — REST API
│   │   ├── src/
│   │   │   ├── index.ts           # Worker entry: routing & CORS
│   │   │   ├── controllers/
│   │   │   │   └── blog.controller.ts   # GET /api/blogs, GET /api/blogs/:slug
│   │   │   ├── services/
│   │   │   │   └── notion.service.ts    # Notion API integration layer
│   │   │   ├── types/
│   │   │   │   ├── env.d.ts             # Env bindings (KV, secrets)
│   │   │   │   ├── handler.types.ts     # Handler type alias
│   │   │   │   └── notion.types.ts      # Notion API & Blog interfaces
│   │   │   └── utils/
│   │   │       ├── notion.utils.ts      # Property extraction, NotionApiError
│   │   │       └── res.utils.ts         # JSON + CORS response helpers
│   │   ├── test/
│   │   │   └── index.spec.ts      # Vitest + Cloudflare Workers pool tests
│   │   ├── wrangler.jsonc         # Wrangler config (KV binding, DB ID)
│   │   └── vitest.config.mts      # Vitest config for Workers
│   │
│   └── portfolio/                 # React SPA — Frontend
│       ├── src/
│       │   ├── main.tsx           # Entry: React root + BrowserRouter
│       │   ├── app.tsx            # Route definitions (/, /blogs, /blogs/:slug)
│       │   ├── index.css          # Tailwind v4 + shadcn/ui design tokens
│       │   ├── pages/
│       │   │   ├── intro.tsx      # Hero section with social links
│       │   │   ├── about.tsx      # About section with profile picture
│       │   │   ├── projects.tsx   # Project cards with tech stack tags
│       │   │   ├── blogs.tsx      # Blog preview (latest 3 posts)
│       │   │   ├── all-blogs.tsx  # Full blog listing with load-more
│       │   │   └── blog-post.tsx  # Individual blog post reader
│       │   ├── components/
│       │   │   ├── header.tsx     # Animated sticky header (GSAP)
│       │   │   ├── contactButton.tsx  # Drawer-based contact form (Formspree)
│       │   │   ├── skillSet.tsx   # Skill set (placeholder)
│       │   │   ├── blog/
│       │   │   │   └── block-renderer.tsx  # Notion block → JSX renderer
│       │   │   └── ui/            # shadcn/ui primitives
│       │   │       ├── button.tsx
│       │   │       ├── card.tsx
│       │   │       ├── carousel.tsx
│       │   │       └── drawer.tsx
│       │   ├── lib/
│       │   │   ├── api.ts         # Fetch client for the Worker API
│       │   │   └── utils.ts       # cn() utility (clsx + tailwind-merge)
│       │   ├── data/
│       │   │   └── projects.tsx   # Static project data
│       │   ├── types/
│       │   │   ├── blog.ts        # Blog & NotionBlock interfaces
│       │   │   └── projects.tsx   # Project interface
│       │   └── assets/
│       │       └── profilePicture.jpg
│       ├── index.html             # HTML entry (Inter font from Google Fonts)
│       ├── vite.config.ts         # Vite config with Tailwind & path alias
│       └── components.json        # shadcn/ui configuration
│
├── packages/
│   ├── eslint-config/             # Shared ESLint config (@pavan/eslint-config)
│   │   ├── base.js                # Base rules: ESLint + typescript-eslint
│   │   └── index.js               # Re-export
│   └── typescript-config/         # Shared TS config (@pavan/typescript-config)
│       └── base.json              # Strict, modern TypeScript settings
│
├── package.json                   # Root: workspace scripts
├── pnpm-workspace.yaml            # Workspace definition
└── pnpm-lock.yaml
```

---

## 🛠 Tech Stack

### Frontend — `apps/portfolio`

| Technology | Purpose |
|---|---|
| **React 19** | UI framework with functional components and hooks |
| **Vite 7** | Lightning-fast dev server and build tool |
| **Tailwind CSS v4** | Utility-first CSS with `@tailwindcss/vite` plugin |
| **shadcn/ui** | Radix-based UI primitives (Button, Card, Drawer, Carousel) |
| **GSAP** | Scroll-triggered header animation |
| **React Router v7** | Client-side routing (`/`, `/blogs`, `/blogs/:slug`) |
| **Phosphor Icons** | Icon library for social links and UI elements |
| **Formspree** | Backend-less contact form submissions |
| **Vaul** | Mobile-friendly drawer component |
| **TypeScript** | Full type safety across all components |

### Backend — `apps/api`

| Technology | Purpose |
|---|---|
| **Cloudflare Workers** | Edge-deployed serverless API |
| **Notion API** | CMS — blog content stored in a Notion database |
| **Cloudflare KV** | Cache layer with 10-minute TTL for blog data |
| **Wrangler** | CLI for local dev, deployment, and type generation |
| **Vitest** | Unit testing with `@cloudflare/vitest-pool-workers` |
| **TypeScript** | Strict typing for all API layers |

### Automation — n8n

| Technology | Purpose |
|---|---|
| **n8n** | Workflow automation (self-hosted) |
| **Gemini 2.5 Flash** | AI model for blog enhancement |
| **Notion API** | Read/write blog content and status updates |

### Shared Packages

| Package | Purpose |
|---|---|
| `@pavan/eslint-config` | Shared ESLint rules (JS recommended + typescript-eslint) |
| `@pavan/typescript-config` | Shared `tsconfig` base (ES2022, strict, bundler resolution) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 10.31.0
- A **Cloudflare** account (for Worker deployment)
- A **Notion** integration with access to your blog database

### Installation

```bash
# Clone the repository
git clone https://github.com/paavann/portfolio.git
cd portfolio

# Install all dependencies
pnpm install
```

### Environment Setup

#### API (`apps/api`)

Create `apps/api/.dev.vars` with your secrets:

```env
NOTION_API_KEY=your_notion_integration_secret
```

> The `NOTION_BLOGS_DB_ID` is already configured in `wrangler.jsonc`.

#### Portfolio (`apps/portfolio`)

Create `apps/portfolio/.env`:

```env
VITE_API_URL=http://localhost:8787/api
```

> In production, point this to your deployed Cloudflare Worker URL.

### Development

```bash
# Run both apps simultaneously
pnpm dev

# Or run individually
pnpm dev:portfolio    # React app on http://localhost:5173
pnpm dev:api          # Cloudflare Worker on http://localhost:8787
```

### Build & Deploy

```bash
# Build all packages
pnpm build

# Deploy the API to Cloudflare
cd apps/api && pnpm deploy

# The portfolio is designed for Vercel deployment
# (configured for pnpm workspace detection)
```

### Testing & Linting

```bash
pnpm test        # Run all tests
pnpm lint        # Lint all workspaces
pnpm typecheck   # Type-check all workspaces
```

---

## 🔌 API Reference

The Cloudflare Worker exposes two RESTful endpoints:

### `GET /api/blogs`

Returns a paginated list of published blog posts.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | query | `10` | Number of posts per page (1–50) |
| `cursor` | query | — | Pagination cursor for the next page |

**Response:**
```json
{
  "ok": true,
  "cached": false,
  "blogs": [
    {
      "id": "page-uuid",
      "title": "My Blog Post",
      "slug": "my-blog-post",
      "summary": "A brief description...",
      "tags": ["React", "TypeScript"],
      "publishedAt": "2026-05-15",
      "cover": "https://..."
    }
  ],
  "hasMore": true,
  "nextCursor": "cursor-string"
}
```

### `GET /api/blogs/:slug`

Returns a single blog post with full Notion block content.

**Response:**
```json
{
  "ok": true,
  "cached": false,
  "blog": {
    "id": "page-uuid",
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "summary": "...",
    "tags": ["React"],
    "publishedAt": "2026-05-15",
    "cover": "https://...",
    "blocks": [
      { "id": "block-uuid", "type": "heading_1", "has_children": false, "heading_1": { "rich_text": [...] } },
      { "id": "block-uuid", "type": "paragraph", "has_children": false, "paragraph": { "rich_text": [...] } }
    ]
  }
}
```

> Both endpoints include CORS headers (`Access-Control-Allow-Origin: *`) and support `OPTIONS` preflight requests. Responses are cached in Cloudflare KV with a **10-minute TTL**.

---

## 🤖 Blog Enhancement Workflow (n8n)

An automated **n8n workflow** powers the blog publishing pipeline. It takes draft blog posts from Notion, enhances them with AI, and handles the full content lifecycle — including error recovery at every stage.

### Workflow Overview

```
Webhook Trigger (POST /enhance-blog-trigger)
       │
       ▼
  Fetch Notion Page (by page_id)
       │
       ▼
  Check Status == "done"? ──── No ──── Stop
       │
      Yes
       │
       ▼
  Update Status → "processing..."
       │
       ▼
  Fetch All Page Blocks (content)
       │
       ▼
  Refine Input (Markdown conversion)
       │
       ▼
  Gemini 2.5 Flash (AI Enhancement)
       │
       ▼
  LLM Error? ──── Yes ──── Set Status → "llm error"
       │
       No
       │
       ▼
  Organize Data (Parse AI output → Notion blocks)
       │
       ▼
  Append Enhanced Blog to Page ──── Error? → Set Status → "error"
       │
       ▼
  Create "Original Draft Archive" Subpage ──── Error? → Set Status → "error"
       │
       ▼
  Append Original Draft to Subpage ──── Error? → Set Status → "error"
       │
       ▼
  Delete Original Draft Blocks
       │
       ▼
  Update Status → "published" ✅
```

### What Each Step Does

| Step | Description |
|---|---|
| **`blogEnhancementTrigger`** | Webhook endpoint that receives a `page_id` query parameter to kick off the pipeline |
| **`getDbPage`** | Fetches the Notion database page metadata (title, slug, tags, status) |
| **`ifStatus`** | Gate check — only proceeds if the page's Status property is `"done"` |
| **`updateStatus`** | Sets the Notion page status to `"processing..."` to indicate active work |
| **`getContent`** | Retrieves all child blocks (including nested blocks) from the page |
| **`refineInput`** | Converts Notion blocks into clean Markdown and bundles page metadata |
| **`enhanceBlog`** | Sends content to **Gemini 2.5 Flash** with a structured prompt to fix grammar, add formatting (headings, lists, bold), and generate a summary |
| **`ifLlmErr`** | Checks if the AI call returned an error; routes to error handler or continues |
| **`organizeData`** | Parses the AI JSON response, converts enhanced Markdown back to Notion block objects, and preserves original content in chunks |
| **`appendEnhancedBlog`** | Appends the AI-enhanced blocks as new children to the original page |
| **`createSubpage`** | Creates a child page titled "Original Draft Archive" under the blog post |
| **`appendDraftToSubpage`** | Writes the original unmodified content to the archive subpage |
| **`prepareDltData`** | Transforms block IDs into individual items for batch deletion |
| **`dltOriginalDraft`** | Deletes each original draft block from the main page |
| **`dbStatusSuccess`** | Sets the final page status to `"published"` |

### Error Handling

The workflow implements **granular error recovery** with dedicated error nodes at each critical stage:

- **`enhBlgErr`** — LLM/AI enhancement failure → status set to `"llm error"`
- **`appEnhBlgErr`** — Failed to append enhanced content → status set to `"error"`
- **`createSubpgErr`** — Failed to create archive subpage → status set to `"error"`
- **`DrftSubpgErr`** — Failed to append draft to archive → status set to `"error"`

Each error handler updates the Notion page status so you can quickly identify and diagnose failures directly from your Notion dashboard.

### Triggering the Workflow

```bash
curl -X POST "https://your-n8n-instance.com/webhook/enhance-blog-trigger?page_id=YOUR_NOTION_PAGE_ID"
```

### Notion Database Schema (Expected Properties)

| Property | Type | Description |
|---|---|---|
| `Title` | Title | Blog post title |
| `Slug` | Select | URL-friendly identifier |
| `Tags` | Multi-select | Categorization tags |
| `Status` | Status | Workflow state (`done` → `processing...` → `published` / `error` / `llm error`) |
| `Summary` | Rich Text | Auto-generated by AI enhancement |
| `Published At` | Date | Publication date |
| `Cover` | Files | Cover image |

---

## 🎨 Frontend Features

### Design Language
- **Bold, monochromatic palette** — Dark navy (`rgb(0, 21, 36)`) + Light gray (`#F2F2F2`) + Emerald accent (`rgb(53, 211, 153)`)
- **Inter font** — Clean, modern typeface loaded from Google Fonts
- **Hover reveal animations** — Navigation items and social links feature a bottom-up background fill on hover
- **GSAP-powered header** — Sticky header that animates in/out based on scroll position with a smooth backdrop blur effect
- **Responsive design** — Mobile-first responsive layout with hamburger navigation on smaller screens

### Pages
- **Home** (`/`) — Single-page layout with Intro → About → Projects → Blog preview sections
- **All Blogs** (`/blogs`) — Full blog listing with cursor-based lazy loading
- **Blog Post** (`/blogs/:slug`) — Full blog reader with a custom **Notion Block Renderer** supporting headings, paragraphs, lists, images, code, and more

### Contact Form
- Powered by **Formspree** — No backend needed
- Rendered inside a **Vaul Drawer** component
- Includes GSAP-animated success toast notification

---

## 🧩 Notion Block Renderer

The frontend includes a custom `BlockRenderer` component that converts raw Notion API blocks into styled React JSX. Supported block types:

| Block Type | Rendering |
|---|---|
| `heading_1` | `<h1>` with bold white text |
| `heading_2` | `<h2>` with bold white text |
| `heading_3` | `<h3>` with bold white text |
| `paragraph` | `<p>` with gray-200 text and relaxed leading |
| `bulleted_list_item` | `<li>` with disc marker |
| `numbered_list_item` | `<li>` with decimal marker |
| `image` | `<img>` with optional caption (supports both external and file types) |
| `child_page` | Styled link card (auto-hides "Original Draft Archive") |

**Rich text annotations** are fully supported: **bold**, *italic*, ~~strikethrough~~, <u>underline</u>, `code`, and [hyperlinks](#).

---

## 📄 License

This project is open source and available for reference and learning purposes.

---

<p align="center">
  <strong>Built with ☕ and curiosity by <a href="https://github.com/paavann">Pavan</a></strong>
</p>