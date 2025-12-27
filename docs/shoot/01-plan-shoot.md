# 📸 FashionOS Shoot System: Core Features Part 1 - Brand Onboarding & Analysis

**Status:** Strategic Architecture | **Phase:** Phase 1 (Intelligence Foundations) | **Last Updated:** 2024-05-23  
**Purpose:** Technical roadmap for implementing the automated Brand DNA extraction, Channel Detection, and Neural Performance Index (NPI) scoring.

---

## 📊 PROGRESS TRACKER

| Feature | Status | Priority | Dependencies | implementation Step |
|:---|:---:|:---:|:---|:---|
| **Neural Service Layer** | 🔴 Planned | P0 | Gemini API Key | Prompt 1.1 |
| **Brand Database Schema** | 🔴 Planned | P0 | Supabase | Prompt 1.2 |
| **Intake Wizard UI** | 🔴 Planned | P1 | - | Prompt 2.1 |
| **URL Context Analysis** | 🔴 Planned | P1 | Gemini 3 Flash | Prompt 2.2 |
| **Search-Grounded Channel Detection** | 🔴 Planned | P1 | Google Search Tool | Prompt 2.3 |
| **Thinking-Based Brand Analysis** | 🔴 Planned | P1 | Gemini 3 Pro | Prompt 2.4 |
| **NPI Scoring Engine** | 🔴 Planned | P2 | Analysis Data | Prompt 3.1 |
| **Maison Profile Dashboard** | 🔴 Planned | P2 | Unified State | Prompt 3.2 |

---

## 🗺️ SYSTEM MAP: ONBOARDING & ANALYSIS

### 🖥️ Screens & Wizards

| Screen / Component | Purpose | Core Features | Advanced AI Features |
|:---|:---|:---|:---|
| **Brand Intake Wizard** | Initial onboarding | Multi-step form, URL collection, category selection. | **Auto-Fill:** Extracts name/desc from website URL via Gemini 3 Flash. |
| **Maison Profile Dashboard** | Primary Work Area | Visual DNA pillars, color palettes, luxury tiering. | **Drift Detection:** Alerts if recent media deviates from core DNA. |
| **Channel Radar** | Multi-channel overview | Links to Amazon, Shopify, Socials, and Google Merchant. | **Sentinel:** Proactive news alerts for specific channels via Search Grounding. |
| **Intelligence Sidepanel** | AI Intelligence Panel | NPI Score breakdown, neural suggestions, "Neural Pivot". | **Live Scorer:** Real-time updates to performance index based on new data. |

---

## 🎭 REAL-WORLD USE CASES

### 1. The "Ghost Maison" Discovery
*   **Scenario:** A brand manager for a heritage leather house needs to launch an e-commerce shoot but doesn't have a structured style guide.
*   **Workflow:** The user enters the brand URL. FashionOS uses **URL Context Tool** to crawl the site, extracts 50+ images, and builds a "Visual DNA Dossier" (Lighting, Framing, Mood) without the user uploading a single file.

### 2. The "Channel Synergy" Audit
*   **Scenario:** A contemporary luxury brand is selling on Amazon but the product photos feel "cheap" compared to their Instagram.
*   **Workflow:** FashionOS **Channel Detection** finds the Amazon store via Google Search. It compares Amazon assets vs. Instagram DNA. The **NPI Scorer** flags "E-commerce Readiness" as Critical (42%) and suggests a lighting-match shoot.

### 3. The "Market Shift" Re-alignment
*   **Scenario:** A streetwear brand is pivoting to "Quiet Luxury".
*   **Workflow:** User updates the brand pillars in the **Profile**. The **Neural Scorer** analyzes the new pillars against current market sentiment (Search Grounding) and suggests 3 new lighting styles to improve "Resonance".

---

## 🤖 AI AGENTS & AUTOMATIONS

### 1. The "DNA Extractor" (Gemini 3 Flash)
*   **Logic:** Uses `URL Context Tool` to analyze provided brand links. 
*   **Output:** Structured JSON containing `colorPalette` (Hex), `lightingStyle` (Descriptive), and `compositionRules` (Technical).

### 2. The "Market Sentinel" (Gemini 3 Pro + Search)
*   **Logic:** Performs periodic `googleSearch` grounding on the brand name + "competitors" + "news".
*   **Output:** A "Resonance Score" showing how the brand is perceived in real-time.

### 3. The "NPI Architect" (Code Execution)
*   **Logic:** A multi-agent loop that takes extracted DNA, Channel health, and Market signals.
*   **Output:** Calculates the **Neural Performance Index** (0-100) using a weighted algorithm.

---

## 📦 IMPLEMENTATION PROMPTS

### Prompt 1.1: Foundation - Neural Service Layer
**Goal Summary:** Create the unified Gemini 3 Service capable of handling URL Context, Grounding, and Thinking.

**Tasks & Steps:**
1.  Initialize `@google/genai` client using `process.env.API_KEY`.
2.  Create a generic `runNeuralTask` function that handles model selection (`gemini-3-flash-preview` for extraction, `gemini-3-pro-preview` for reasoning).
3.  Implement `thinkingConfig` support for high-budget reasoning tasks.
4.  Implement `responseSchema` support using the `Type` enum for all JSON outputs.

**Logic & Workflows:**
- Use **Gemini 3 Flash** for fast extraction of URLs.
- Use **Gemini 3 Pro** for deep "Maison Analysis".
- Always wrap API calls in retry logic for 429 errors.

**Success Criteria:**
- Successfully returns a structured JSON object from a text prompt.
- Handles tool calls (Search/Maps) without crashing.

---

### Prompt 2.1: The Brand Intake Wizard
**Goal Summary:** Build the multi-step React UI that feeds the AI Analysis pipeline.

**Tasks & Steps:**
1.  Create a 3-step wizard: **Basic Info** (Manual) → **Neural Scan** (URL Entry) → **Channel Discovery** (AI Grounded).
2.  In Step 2, once a URL is entered, trigger the `DNA Extractor` agent to pre-fill the "Visual Vibe" fields.
3.  Implement a "Neural Loading" state with luxury-tier animations (shimmers/serif transitions).

**Logic & Workflows:**
- Input: `websiteUrl`
- Trigger: `onBlur` of URL field.
- AI Action: Call `gemini-3-flash-preview` with `URL Context Tool` to identify brand colors and mood.

**Final Validation:**
- User enters `gucci.com`, wizard should auto-suggest "Luxury", "Maximalism", and primary brand colors.

---

### Prompt 2.2: Grounded Channel Detection Service
**Goal Summary:** Use Google Search to find where the brand lives on the web.

**Tasks & Steps:**
1.  Develop a function `detectBrandChannels(brandName, domain)` in `geminiService.ts`.
2.  Configure tool: `googleSearch`.
3.  Prompt: "Search for [Brand] stores on Amazon, Shopify, and social channels. Verify the URLs."
4.  Extract: Return an array of objects `{ channel: string, url: string, verified: boolean }`.

**Logic & Workflows:**
- Only trust URLs that match the brand's primary domain or official store signatures.
- Use `gemini-3-pro-image-preview` if visual verification of store logos is required.

**Success Criteria:**
- Returns a list of verified links for Amazon, Pinterest, and TikTok for a given brand name.

---

### Prompt 3.1: The NPI (Neural Performance Index) Engine
**Goal Summary:** The brain of the system. Weighs DNA clarity vs. Channel reach.

**Tasks & Steps:**
1.  Create `calculateNPI(brandData, marketSignals)` function.
2.  Weighted Logic: 
    - **DNA Clarity (40%):** How consistent is the visual extraction across 5 URLs?
    - **Market Resonance (30%):** Search sentiment analysis.
    - **Channel Readiness (30%):** Number of verified active e-commerce nodes.
3.  Return: A single integer 0-100 and a `thinkingSummary` explaining the "Why".

**Logic & Workflows:**
- Use **Gemini Thinking (High Budget)** to ensure the score isn't just a simple average, but accounts for luxury tier nuances.

**Production-Ready Checklist:**
- [ ] Ensure `maxOutputTokens` allows for the full thinking summary.
- [ ] Use `responseMimeType: "application/json"`.
- [ ] Map citations from Search Grounding to the NPI cards.

**Final Validation:**
- Dashboard displays the NPI Score with a "Neural Health" badge (Emerald/Amber/Rose).

---

## 🏁 FINAL VERIFICATION
- [ ] 3-Panel Model is consistent: Left (Nav), Main (Wizard/Dashboard), Right (NPI Breakdown).
- [ ] Gemini 3 Pro/Flash used as per task complexity.
- [ ] Google Search Grounding provides verifiable URLs.
- [ ] Design is "Quiet Luxury" (Playfair Display + Inter).