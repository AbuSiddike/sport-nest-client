# SportNest — Sports Facility Booking (Client)

Frontend for **SportNest**, a sports facility booking platform. Users can explore venues, book time slots, and facility owners can list and manage their spaces.

## Live URL

<https://sport-nest-client.vercel.app>

## Purpose

SportNest connects athletes with sports facilities (football turfs, badminton courts, swimming lanes, tennis courts, and more). This repository contains the **Next.js client** that talks to the SportNest REST API and Better Auth.

## Features

- Home page with hero, featured facilities (from API), how-it-works, and stats
- Public facilities listing with **search** and **filter by sport type**
- User authentication (email/password + Google via Better Auth)
- Private routes: facility booking, add/manage facilities, my bookings
- Booking creation and cancellation with toast feedback
- Dark/light **theme toggle** and **Framer Motion** animations
- Responsive layout (mobile, tablet, desktop)
- Custom 404 and loading states

## NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | App framework (App Router) |
| `react` / `react-dom` | UI |
| `@heroui/react` / `@heroui/styles` | UI components & design system |
| `tailwindcss` | Utility-first styling |
| `better-auth` | Authentication |
| `axios` | API client |
| `react-hot-toast` | Toast notifications |
| `framer-motion` | Animations |
| `next-themes` | Theme switching |
| `react-icons` | Icons |
| `mongodb` | Auth database adapter |