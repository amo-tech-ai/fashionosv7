# 🗺️ FashionOS CRM: Architectural & Logic Diagrams

This document provides a technical and visual blueprint of the FashionOS CRM system, illustrating the flow of data, state transitions, and entity relationships.

---

## 1. User Journey: Relationship Management Workflow
*Description: This flow describes the typical human-in-the-loop journey of managing a luxury partnership, from discovery to AI-assisted follow-up.*

```mermaid
graph TD
    Start((Login)) --> Nav[Left Panel: Select CRM]
    Nav --> List[Main Panel: Browse Key Partners]
    List --> Filter[Main Panel: Apply HUD Filters - e.g., 'Buyer']
    Filter --> Select[Main Panel: Click Row]
    Select --> Profile[Right Panel: Opens Contact Dossier]
    Profile --> Intel[Right Panel: AI Suggests Follow-up]
    Intel --> Log[Action: Log Handshake/Meeting]
    Log --> Update[Main Panel: Activity Timestamp Updates]
    Update --> End((Goal Met))
```

---

## 2. System Structure (3-Panel Architecture)
*Description: A high-level view of how the React component tree maps to the physical 3-panel layout of the OS.*

```mermaid
graph TD
    subgraph Left_Panel [Context]
        Sidebar[Sidebar.tsx]
    end
    
    subgraph Main_Panel [Work]
        CRMHeader[CRMHeader.tsx]
        CRMStats[CRMStats.tsx]
        CRMFilterHUD[CRMFilterHUD.tsx]
        CRMPartnerTable[CRMPartnerTable.tsx]
    end
    
    subgraph Right_Panel [Intelligence]
        IntelContainer[IntelligencePanel.tsx]
        ContactDossier[CRMContactPanel.tsx]
        Timeline[CRMContactTimelinePreview.tsx]
        Deals[CRMDealsPreview.tsx]
    end

    App[App.tsx] --> Left_Panel
    App --> Main_Panel
    App --> Right_Panel
    CRMPartnerTable -- "Sets selectedContactId" --> App
```

---

## 3. Entity-Relationship (ER) Model
*Description: Defines the relational logic between contacts, their financial deals, and their interaction history.*

```mermaid
erDiagram
    CONTACT ||--o{ DEAL : manages
    CONTACT ||--o{ INTERACTION_LOG : records
    CONTACT ||--o{ RSVP_ENTRY : tracks
    CONTACT {
        string id PK
        string name
        string role
        string company
        enum category
        enum status
    }
    DEAL {
        string id PK
        string title
        string value
        enum stage
        string linkedCollection
    }
    INTERACTION_LOG {
        string id PK
        enum type
        string title
        string description
        date date
    }
    RSVP_ENTRY {
        string eventId PK
        string eventName
        enum status
    }
```

---

## 4. State Diagram: Contact Lifecycle
*Description: Visualizes the progression of a contact through the brand's network lifecycle.*

```mermaid
stateDiagram-v2
    [*] --> Lead : Initial Outreach / Discovery
    Lead --> Active : First Deal Signed / RSVP Confirmed
    Active --> Active : Continuous Handshaking
    Active --> Archive : Season Gap / Contract End
    Archive --> Active : Re-engagement
    Lead --> Archive : Lost Interest / No Response
    Archive --> [*]
```

---

## 5. UML Class Diagram: Data Contracts
*Description: A structured representation of the TypeScript interfaces used to enforce data integrity.*

```mermaid
classDiagram
    class Contact {
        +String id
        +String name
        +String role
        +String company
        +ContactCategory category
        +ContactStatus status
        +Deal[] deals
        +InteractionLog[] interactionHistory
    }
    class Deal {
        +String id
        +String title
        +String value
        +DealStage stage
        +String projectedClose
    }
    class InteractionLog {
        +String id
        +LogType type
        +String title
        +String description
        +String date
    }
    Contact "1" *-- "many" Deal
    Contact "1" *-- "many" InteractionLog
```

---

## 6. Data Flow Diagram (DFD): AI Intelligence Loop
*Description: Shows how raw CRM data is processed by the Gemini API to return actionable insights to the Right Panel.*

```mermaid
graph LR
    User[User] -- "Selects Contact" --> State[App State]
    State -- "Contact Context" --> GeminiService[geminiService.ts]
    GeminiService -- "Prompt + History" --> GeminiAPI[Gemini 3 Flash]
    GeminiAPI -- "JSON Insight" --> Parser[Response Parser]
    Parser -- "Structured Action" --> RightPanel[Right Panel: Intel Card]
    RightPanel -- "Proposed Action" --> User
```

---

## 🏁 Summary
These diagrams confirm that FashionOS is built on a **Modular, Relational, and Agentic** foundation. The 3-panel architecture is not just a UI choice but a structural enforcement of context-aware work.