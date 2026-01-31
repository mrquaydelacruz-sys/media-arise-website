# Program Participant Page – Implementation Plan

## Goal

For each **program** under the Register tab:

1. **Registrants** can access a **participant-only page** with:
   - **Recap videos** (YouTube links) per session/day, shown after each meeting is recorded
   - **Their own attendance** – e.g. “Day 1 ✓”, “Day 2 –” so they can see which days they attended

2. **You (admin)** can:
   - Add **recap video (YouTube URL)** per session/day on the program
   - **Mark who attended** each session/day (input attendance there), and have it show on the participant page

3. **Backward compatible**: Day 1 has already started and people have already registered; the feature should work for existing registrations without re-registering.

---

## Current State (Summary)

- **Program** (Sanity): title, slug, description, dates, location, capacity, etc. No “sessions” or “days” yet.
- **Registration** (Sanity): links to one program, name, email, phone, reason, etc. Stored in Sanity and synced to Google Sheets.
- **Register flow**: User picks a program → submits form → API creates a registration and returns `registrationId`. No participant link is shown yet.
- **No** program-level recap or attendance data today.

---

## 1. Data Model Changes

### 1.1 Program – add “sessions” (days)

Add an optional **sessions** array to the existing **program** schema so each program can have multiple sessions (e.g. Day 1, Day 2):

- **label** (string) – e.g. `"Day 1"`, `"Day 2"`, `"Session 1"`
- **sessionDate** (datetime, optional) – when that session happened
- **recapYoutubeUrl** (url, optional) – YouTube recap link; only show on participant page when filled (after recording)
- **attended** (array of references to **registration**) – who attended this session; you (or another admin) will add/remove registrations here

This keeps everything on the program and works with existing programs: add sessions when you’re ready (e.g. add “Day 1” now, “Day 2” later).

### 1.2 Registration

- **No schema change required** for backward compatibility.
- Use the **registration `_id`** as the access token for the participant page:
  - Participant URL: `/register/participant?id=<registration._id>`
  - Any existing registration already has an `_id`, so **existing registrants (e.g. Day 1)** can use the same link format once we send them the link.

Optional later: add a unique `accessToken` (random string) for prettier or shorter URLs; for now, using `_id` is simplest and works for everyone.

---

## 2. Access Control (Who Can See the Participant Page)

- **No login** required.
- **Access** = user has a valid **participant link** that includes the registration ID:
  - `https://yoursite.com/register/participant?id=<registration._id>`
- Page logic:
  1. Read `id` from query.
  2. Fetch that registration from Sanity (by `_id`); if not found or not approved (if you use status), show “Invalid or expired link”.
  3. Resolve the registration’s **program** and load the program’s **sessions** (with recap URLs and attended refs).
  4. Render: program title, list of sessions with recap video (when `recapYoutubeUrl` is set) and “You attended” for sessions where this registration is in `attended`.

So: only someone with the correct link (or the registration id) can see that participant view. Safe enough for recap + attendance.

---

## 3. Where You Input Attendance

Two options:

**Option A – Sanity Studio (recommended for first version)**  
- In Sanity, open the **Program** document.
- In the new **Sessions** array, for “Day 1” you add **references** to the **Registration** documents that attended.
- No extra app routes or auth; you already use Studio.
- Works immediately for Day 1 and future days.

**Option B – Custom admin page in the app**  
- A page like `/register/admin/attendance` (or under a secret path) where you:
  - Select program → select session (Day 1, Day 2, …) → see list of all registrations for that program → check who attended → save.
- Saving would call an API that updates the program’s `sessions[n].attended` in Sanity.
- This page would need simple protection (e.g. env secret in query or basic password) so only you can open it.

Recommendation: implement **Option A** first (Studio only), then add Option B later if you want a quicker workflow (e.g. checkboxes by name).

---

## 4. Participant Page Content (What Registrants See)

- **Program name** and short intro (e.g. “Session recaps and your attendance”).
- **Per session (e.g. Day 1, Day 2):**
  - Session label + optional date.
  - If **recap video** exists: embedded YouTube player (or link) for `recapYoutubeUrl`.
  - **Attendance**: “You attended ✓” if this registration is in `sessions[i].attended`; otherwise “You did not attend” or “–”.
- No list of other participants; each person only sees their own attendance.

---

## 5. Post-Registration Flow (New Registrations)

After a successful registration:

1. **API** already returns `registrationId` (registration `_id`).
2. **Frontend** (Register page):
   - Show success message and a **participant link**:
     - “Save this link to access session recaps and your attendance: [Copy link]”
     - Link = `${baseUrl}/register/participant?id=${registrationId}`
   - Optionally add “Email me this link” later (separate endpoint that sends email with the same link).

Existing flow (form, Sanity, Google Sheets) stays the same; we only add this link and the new page.

---

## 6. Existing Registrations (Day 1 Already Started)

- **No data migration** required: we don’t change registration schema; we only add `sessions` to programs.
- **Links for existing registrants:**
  - You can build the link yourself: `https://yoursite.com/register/participant?id=<registration._id>`.
  - To get `_id`s: in Sanity Studio, open each Registration document and copy the ID from the URL or from an “Export”/list view; or we add a small script/action that lists “Participant links” for a program (program → registrations → output table with link per person).
- **Sending the link:** manually (email, WhatsApp, etc.) or, later, a “Resend my participant link” on the site (user enters email → we find registration for that program and show/send the link).
- **Attendance for Day 1:** once the program has a “Day 1” session, you add the attending **registrations** to that session’s “attended” list in Studio (or via the future admin page). Those people will then see “Day 1 ✓” on their participant page.

---

## 7. Implementation Phases

### Phase 1 – Schema and Studio

1. **Program schema**  
   Add `sessions` array to `program` (label, sessionDate, recapYoutubeUrl, attended refs).  
   Deploy schema; in Studio, add “Day 1” (and later “Day 2”, …) to the relevant program(s).

2. **Sanity Studio**  
   You can already:
   - Set recap YouTube URL per session when the recording is ready.
   - Mark attendance by adding Registration refs to each session’s “attended” list.

### Phase 2 – Participant Page and Link

3. **Queries**  
   - Fetch registration by `_id` (and resolve `program`).  
   - Fetch program with `sessions` (and resolve `attended` to get names if needed for display, or just IDs for “you attended” check).

4. **Route**  
   - `app/register/participant/page.tsx` (or `.../participant/page.tsx` under register).  
   - Read `id` from query → load registration + program + sessions → render recap videos and “You attended” per session.

5. **Register success screen**  
   - After successful submit, show the participant link (and copy button) using `registrationId` from the API.

### Phase 3 – Optional Later

6. **Existing registrants**  
   - Script or Sanity action that, for a chosen program, lists registrations and their participant links (so you can email them).

7. **“Resend my participant link”**  
   - Page or form: user enters email (and maybe program or last name); we look up registration and show/send the link.

8. **Admin attendance page (Option B)**  
   - Protected page to select program + session and tick who attended, then PATCH program in Sanity.

---

## 8. Summary

| Item | Approach |
|------|----------|
| **Recap video** | Stored per session on Program (`recapYoutubeUrl`); shown on participant page when set. |
| **Attendance** | Stored per session on Program (`attended` = array of Registration refs); you input in Sanity (or later in custom admin page). |
| **Who can access** | Anyone with the participant link (`/register/participant?id=<registration._id>`). |
| **Existing registrations** | Same link format; add sessions to program and send links manually or via “Resend link” later. |
| **Backward compatible** | No registration schema change; only Program gains `sessions`. |

If you want to proceed, the next concrete step is **Phase 1**: add the `sessions` field to the Program schema and then implement the participant page and link (Phases 2.3–2.5).
