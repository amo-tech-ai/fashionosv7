# 📜 FashionOS Changelog

All notable changes to the **FashionOS** project will be documented in this file.

---

## [1.5.0] - 2024-05-23
### Added
- **AI Grounding Suite (Step 9)**:
  - Integrated **Google Search Grounding** via `getMarketSignals` to fetch live partner news.
  - Implemented **Relationship Health Scoring** using Gemini 3 Flash to analyze partnership vitality.
  - Added **Neural Pivot Suggestions** for strategic relationship deep-dives.
- **Advanced CRM Logic**:
  - Implemented full state management for Deals and Interaction Logs.
  - Created persistent "Handshake" timeline visualization in the Right Panel.
  - Added visual citations (source URLs) to AI-generated market insights.
- **Progress Audit**:
  - Created `/docs/plans/10-crm-progress-tracker.md` for continuous system auditing.
  - Verified 91% completion of the CRM Intelligence module.

### Changed
- **Right Panel UX**: Improved `CRMContactPanel` to handle multi-layered loading states (Insight, Health, and Signals parallelization).
- **Service Layer**: Upgraded `geminiService.ts` to utilize the latest `@google/genai` standards for structured JSON output and grounding tools.

---

## [1.4.0] - 2024-05-22
### Added
- **Right Panel Selection UX (Pivot Step 3)**:
  - Redefined the 3-panel interaction flow: Main panel remains stable (list view) while the Right panel transforms into a **Contact Dossier** upon selection.
  - Created `CRMContactPanel.tsx`: A condensed, internally scrollable profile for the Intelligence panel.
... [Rest of changelog archived]
