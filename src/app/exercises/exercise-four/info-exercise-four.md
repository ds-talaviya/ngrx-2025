
# 📚 Exercise: Notes App with Tags & Search Filter (Advanced Effects)

## 🔥 Core Idea:
Build a Notes App that supports:

- Tag filtering
- Search functionality
- All API operations via Effects
- Smart data loading (don’t re-fetch unless needed)
- Show snackbar/toast on actions
- Handle errors in UI

---

## 🧱 API Endpoints (you can mock or use json-server)

- `GET /notes` → get all notes
- `POST /notes` → create note
- `PUT /notes/:id` → update note
- `DELETE /notes/:id` → delete note

**Optional:**
- `GET /notes?tag=xyz`
- `GET /notes?q=searchTerm`

---

## 📄 Note Model

```ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];       // e.g., ["work", "angular"]
  createdAt: string;
}
```

---

## ✅ Features You Must Implement Using Effects:

### 🔁 Load All Notes
- Only load once unless user refreshes

### ➕➖✏️ Add, Update, Delete Notes
- Trigger effect → call API → show snackbar → update store

### 🔍 Search Notes // not done as may be it's not possible to pass query in api and get filtered data
- User enters a search string → debounce input → fire GET API

### 🏷️ Filter by Tags
- Select a tag → show only relevant notes (via API or client-side filter)

### ⏳ Show Loader
- Global loader on each API call

### 🚨 Error Handling
- Show toast/snackbar on failure (like “Failed to add note”)

---

## 🚀 Concepts You Will Practice:

- `withLatestFrom` to prevent duplicate GET
- `switchMap`, `debounceTime`, `distinctUntilChanged` for search
- `concatMap` for CRUD operations
- Global UI actions: `showLoader`, `hideLoader`, `showToast`
- Caching logic in Effects
