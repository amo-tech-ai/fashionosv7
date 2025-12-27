# 🧠 FashionOS CRM Upgrade: Production Plan

**Version:** 1.2.0 (Synchronized with 3-Panel Right Profile UX)  
**Status:** ⏳ READY FOR EXECUTION (Proceeding to Step 4)  
**Architect:** Senior Product Architect / UX Systems Engineer

---

## 1. Executive Summary
FashionOS CRM has evolved from a static list into a high-density, context-aware relationship engine. By adopting the **"Right Panel Profile"** model, we maintain a stable "Work" area in the Main Panel (the Network List) while providing a deep "Intelligence/Context" area in the Right Panel (the Contact Dossier). This prevents "Context Switching" fatigue and keeps the user grounded in their network.

---

## 2. Progress Tracker

| Step | Focus | Feature | Model | Risk | Status |
|-----:|-------|---------|-------|------|:-------|
| 1 | Infrastructure | Data Model & Types Expansion | N/A | Low | ✅ COMPLETED |
| 2 | Main Panel | Advanced Filtering HUD (Category/Status) | N/A | Low | ✅ COMPLETED |
| 3 | Right Panel | Selection UX & Condensed Dossier | N/A | Med | ✅ COMPLETED |
| 4 | Right Panel | Deep Handshake History (Timeline) | Flash | Low | ⏳ PENDING |
| 5 | Right Panel | Deals & Collection Lifecycle Sync | Pro | Med | ⏳ PENDING |
| 6 | Right Panel | Contextual Intelligence (AI Cards) | Flash/Pro | High | 🟠 PARTIAL |
| 7 | Main Panel | Fashion-First "Add Contact" Modal | Flash | Low | ⏳ PENDING |
| 8 | Main Panel | CRM Header Momentum Sparklines | N/A | Low | ⏳ PENDING |
| 9 | Intelligence | Relationship Health Logic (Scoring) | Pro | High | ⏳ PENDING |
| 10 | Security | AI Kill Switch & System Polish | Pro | Low | ⏳ PENDING |

---

## 3. Advanced Feature Breakdown (Right-Panel Focus)

### 📱 Right Panel: The Dossier
- **Condensed Header:** Brand-DNA avatar, status chips, and social quick-actions.
- **Micro-Stats:** RSVP status, placement counts, and last handshake recency.
- **Section 1: Handshake Timeline:** Vertical thread of past interactions (Email, Meeting, RSVP).
- **Section 2: Active Pipeline:** Current collection deals with stage/value tracking.
- **Section 3: AI Intelligence:** Proactive suggestions powered by Gemini.

### 🤖 AI Agent Swarm (Gemini 3 Pro/Flash)
- **Analyst:** Computes **Relationship Health (0-100)** based on interaction recency.
- **Retriever:** Contextualizes interactions using historical season briefs.
- **Controller:** Strictly ensures AI-suggested notes/actions are **Proposals** requiring human **Commit**.

---

## 🪜 4. Multi-Step Implementation Plan

### Prompt 1: The Foundation (Data Model)
- **Goal:** Expansion of `types.ts` and `mockContacts`.
- **Status:** COMPLETED.

### Prompt 2: Advanced Filtering HUD
- **Goal:** Build interactive multi-select filtering in the Main Panel.
- **Status:** COMPLETED.

### Prompt 3: Right Panel Selection UX
- **Goal:** Pivot UX from "Full Page" to "Right Panel Profile."
- **Logic:** `selectedContactId` lifted to `App.tsx`. Right Panel conditionally renders `CRMContactPanel`.
- **Status:** COMPLETED.

### Prompt 4: Deep Handshake History (Step 4)
- **Goal:** Finalize real data rendering in the vertical timeline within the Right Panel.
- **Logic:** Map `interactionHistory` to specific icons (Mail, Users, Ticket). Add "Add Log" button functionality.
- **Validation:** Clicking a contact shows their unique interaction thread in the right drawer.

### Prompt 5: Deals & Collection Lifecycle
- **Goal:** Add deal management and linking functionality to the Dossier.
- **Logic:** Allow linking a deal to specific "Collections" (e.g., SS25). Implement "Add Deal" drawer.
- **Validation:** Users can see and transition deal stages within the condensed Right Panel.

### Prompt 6: Intelligence Logic Integration
- **Goal:** Inject real AI strategic suggestions into the Dossier.
- **Model:** `gemini-3-flash-preview`.
- **Logic:** Send the last 3 interactions to Gemini to generate 1 targeted strategic suggestion.
- **Validation:** "AI Suggestion" card updates dynamically based on the selected contact's history.

### Prompt 7: Fashion-First "Add Contact" Modal
- **Goal:** High-fidelity data entry for new network partners.
- **UI:** Floating modal with tabs (General, Social, Brand DNA).
- **Validation:** New contacts appear in the Main Table instantly upon submission.

### Prompt 8: Stats Grid Sparklines
- **Goal:** UI polish for the CRM Header.
- **Logic:** Integrate Recharts `AreaChart` into `CRMStats` cards for "Press Reach" and "Network Size."
- **Validation:** Micro-charts render with muted colors, maintaining luxury aesthetics.

### Prompt 9: Strategic Logic (Health Meter)
- **Goal:** Implement the complex Reasoning Agent.
- **Model:** `gemini-3-pro-preview`.
- **Logic:** Calculate a 0-100 Health Score using weighted history (Recency vs. RSVP Quality).
- **Validation:** A visual health meter appears in the Right Panel header.

### Prompt 10: Security & Luxury Polish
- **Goal:** Final system hardening.
- **Action:** AI Kill Switch, Accessibility (Esc to close panel), and Transition optimization (<300ms).
- **Validation:** System feels "Butter-Smooth" and production-ready.

---

## 🧪 5. Validation & Testing Plan
- **State Sync:** Verify `selectedContactId` clears when navigating from CRM to Dashboard.
- **Internal Scroll:** Ensure the Right Panel scrolls independently of the Main Panel.
- **Responsive Layout:** Verify Right Panel slides off-screen correctly on mobile.
- **Selection Toggle:** Confirm clicking the same contact twice deselects them.

---

## 🏁 6. Final Assessment
**ARCHITECTURE VALIDATED.** The shift to the Right-Panel Detail View aligns perfectly with the FashionOS 3-panel core mental model. Proceeding to **Step 4: Deep Handshake History**.