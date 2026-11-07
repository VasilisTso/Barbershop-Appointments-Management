# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite + Tailwind CSS v4 + framer-motion + react-router + axios + react-hot-toast (frontend, repo root). Node/Express + Prisma + SQLite + JWT (`barber-backend/`). Redesign is frontend-only; API contracts stay unchanged.

## Purpose

Barbershop VT is a full-stack appointment booking app for a single (fictional) barbershop, built as a university project and used as a portfolio/demo piece. It should feel like a real shop's site, not a tech demo.

## Users and jobs

- **Guest:** browse the shop and its services (name, duration, price), then register or log in to book.
- **User:** book an appointment (choose service + start time), see own appointments and their status.
- **Admin:** create, edit, delete services; see all appointments; confirm or cancel them.

## Constraints

- Audience: graders, recruiters, peers viewing a demo. Shop facts (hours, address) are placeholders and must be visibly marked as demo. No invented reviews, testimonials, customer counts, or awards.
- Booking posts `{ serviceId, startAt }` (ISO) to the existing API. No backend changes in the redesign.
- Author credit, tech stack and contact links (LinkedIn, GitHub, email) stay visible (footer).
- Accessibility: WCAG 2.2 AA (contrast, visible focus, keyboard operation, reduced motion).

## Terminology

Service, appointment, status (pending / confirmed / cancelled), admin, user.
