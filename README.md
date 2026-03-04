
# 📅 Subscription Tracker — Next.js + NestJS Full-Stack App

A minimal full-stack app to track monthly subscriptions, calculate total expenses, and export calendar reminders for renewals.

### NOTE: BE will take upto a minute to spool up (using Render's free version for hosting the BE)

---

## ✨ Features

- Add and delete subscriptions
- Track total monthly expense
- Each subscription renews on a specific **day of the month**
- Download `.ics` calendar reminders with custom offsets (same day, 1, 2, 7 days before)
- Smart handling when reminder time has already passed
- Clean mobile-friendly UI using Shadcn Drawer

---

## 🧠 Architecture Highlights

- Next.js App Router with Server & Client Components
- Route Handlers used as a proxy to forward cookies to backend
- NestJS REST API with Controllers and Services
- Prisma ORM with PostgreSQL (Neon)
- Cookie-based user isolation (no authentication required)

---

## 🗓 Calendar Logic

- Events are always created in the future
- Reminder times auto-adjust if the selected offset is already in the past
- Single `.ics` file generated for all subscriptions

---

## 🚀 Tech Stack

- **Frontend:** Next.js 15, TypeScript, Shadcn UI
- **Backend:** NestJS, Prisma
- **Database:** PostgreSQL (Neon)
- **Deployment:** Vercel (FE) + Render (BE)

