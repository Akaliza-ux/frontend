# 🎓 Student Finance Tracker

A responsive, accessible, and vanilla HTML/CSS/JS app to help students manage budgets and transactions.  
Tracks expenses, supports regex search, inline editing, and maintains data persistence via localStorage.

---

## 🚀 Live Demo

[View Live App](https://akaliza-ux.github.io/frontend/)

---

## 📝 Features

- **Add/Edit/Delete Transactions** with validation
- **Regex-powered Search** (live highlight)
- **Sort Transactions** by date or amount
- **Stats Dashboard**:
  - Total records
  - Total spent
  - Top category
  - Remaining/over cap alert
- **Data Persistence** with localStorage
- **Import/Export JSON** for backup or sharing
- **Settings**: numeric cap, category management
- **Mobile-first responsive design** (360px, 768px, 1024px breakpoints)
- **Accessible (a11y)**: keyboard navigation, ARIA live regions, visible focus styles

---

## 🗂 Data Model

Each transaction record follows:

```json
{
  "id": "rec_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.50,
  "category": "Food",
  "date": "2025-09-29",
  "createdAt": "2025-09-29T10:00:00Z",
  "updatedAt": "2025-09-29T10:00:00Z"
}
