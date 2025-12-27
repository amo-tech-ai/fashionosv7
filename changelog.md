# 📜 FashionOS Changelog

All notable changes to the **FashionOS** project will be documented in this file.

---

## [1.4.0] - 2024-05-22
### Added
- **Right Panel Selection UX (Pivot Step 3)**:
  - Redefined the 3-panel interaction flow: Main panel remains stable (list view) while the Right panel transforms into a **Contact Dossier** upon selection.
  - Created `CRMContactPanel.tsx`: A condensed, internally scrollable profile for the Intelligence panel.
  - Implemented `CRMContactTimelinePreview.tsx` and `CRMDealsPreview.tsx` for high-density data visualization in restricted widths.
  - Added "Sticky Selection" logic: Clicking the same row toggles the selection off.
  - Header actions: Direct edit and log buttons within the right panel for immediate workflow access.

### Changed
- **Architecture**: Moved `selectedContactId` state to `App.tsx` for global coordination between Main and Right panels.
- **Visuals**: Tightened typography and spacing in the Right Panel to handle complex CRM profiles without breaking the luxury aesthetic.

---

## [1.3.0] - 2024-05-21
### Added
- **CRM Detail View & Navigation (Step 3)**:
  - Created `CRMProfileDetail.tsx` providing a high-fidelity "Contact Dossier" view. (Note: This component is now deprecated in favor of the Right Panel Profile UX in v1.4.0).

... [Rest of changelog remains archived]
