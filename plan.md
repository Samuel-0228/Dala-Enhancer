# UI/UX Refinement Plan - Dala Enhancer Pro

Refine the UI/UX based on provided reference images, focusing on typography (removing bold weights) and layout adjustments.

## 1. Typography Overhaul
- Globally ensure no `font-bold` or `font-semibold` is used.
- Set all headings and body text to `font-normal` or `font-medium` (for subtle emphasis).
- Convert uppercase headers to mixed-case (Capitalized) unless they appear as small labels/tags.
- Adjust letter-spacing for a cleaner, more premium look (using `tracking-tight` for titles and `tracking-wider` for small labels).

## 2. Component Updates

### Navbar (`src/components/layout/Navbar.tsx`)
- Match navigation items: HOME, PROJECTS, DOCS, DASHBOARD (use LayoutDashboard icon), GET STARTED (button).
- Ensure styling is minimal: thin borders, subtle hover effects, non-bold font.

### Hero Section (`src/components/landing/Hero.tsx`)
- Refine the Hero to be more aligned with Image 2 (cleaner typography, less "brutal" and more "premium").
- Keep the `Boxes` background but ensure it doesn't distract from the clean text.

### Features Section (`src/components/landing/Features.tsx`)
- Re-structure to match Image 2:
  - 3-column layout.
  - Icon in a small square border above the title.
  - Title in mixed-case or subtle uppercase (non-bold).
  - Description in regular weight.
  - Bullet points with small circles/dots.
  - Add specific badges for "DEPLOY SECURELY" (SOC2 READY, GDPR COMPLIANT).

### Starter Templates (`src/components/templates/TemplateGallery.tsx`)
- Re-structure to match Image 1:
  - Cards with a clean border (`border-zinc-900`).
  - Title, Description.
  - Features list with `Check` icons.
  - "Preview" button with an `ArrowRight` icon.
- Update the section header in `App.tsx` to match Image 1's title and tagline.

## 3. Global Styles (`src/App.tsx`, `src/index.css`)
- Adjust the main container and spacing to be more "airy".
- Ensure the background gradient is smooth (matte black).

## 4. Final Polish
- Validate build and ensure responsiveness.
