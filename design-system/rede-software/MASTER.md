# Rede Software — UI/UX Pro Max Design System

## Product profile

**Category:** B2B software / ERP / public-sector operations platform
**Primary users:** business operators, managers, public-sector teams and decision makers
**Primary goal:** communicate trust, operational control, efficiency and technical maturity, then drive qualified demo/contact actions.
**Platform:** React + Vite + Tailwind CSS + Lucide React

## Design direction

**Visual family:** restrained enterprise minimalism with structured dashboard/bento cues.

The interface should feel like software built for serious operations: clear hierarchy, compact information architecture, strong typography, deliberate spacing, restrained decoration and obvious actions.

Avoid generic startup styling, excessive gradients, oversized rounded cards, decorative motion, neon treatment and purple/pink AI aesthetics.

## Brand tokens

| Token | Value | Usage |
|---|---|---|
| `brand-primary` | `#E3262E` | Primary CTA, key accents, active states |
| `brand-primary-hover` | `#CF1F27` | CTA hover/pressed states |
| `brand-primary-deep` | `#AD1720` | High-emphasis accents |
| `ink` | `#101114` | Headings, primary text, dark surfaces |
| `surface` | `#FFFFFF` | Cards and page surface |
| `surface-subtle` | `#FAFAFA` | Section contrast |
| `muted` | `#667085` | Supporting text |
| `border` | `#E7E7EA` | Dividers, inputs and card outlines |
| `success` | `#17804D` | Positive operational status |
| `warning` | `#B7791F` | Attention states |
| `danger` | `#C53030` | Destructive/error states |

### Contrast policy

- Normal text should target WCAG AA contrast (4.5:1 minimum).
- Do not communicate status with color alone.
- Focus indicators must remain visible on both light and dark surfaces.

## Typography

**Display:** Manrope 700–800
**Body/UI:** DM Sans 400–700

Use tight tracking only for large display headings. Body copy stays open and readable. Headings should prefer balanced wrapping and must never depend on a single forced line break.

## Layout

- Content max width: `1280px`.
- Base spacing: 4px increments.
- Default density: standard; dashboards may become denser, marketing sections should remain spacious.
- Responsive validation targets: 375px, 768px, 1024px and 1440px.
- Prefer two-column hero layouts at large widths and stacked composition on mobile.
- Keep CTA groups short and visually prioritized.

## Components

### Navigation

- Sticky header is acceptable when it preserves content hierarchy.
- Active route should be visually distinguishable from inactive links.
- Mobile navigation must have large touch targets and a visible focus state.

### Buttons

- Primary action: solid brand red with white text.
- Secondary action: neutral surface with visible border.
- Minimum practical touch target: 44px.
- Hover should change surface/contrast; do not rely on large scale transforms.

### Cards

Use cards to group meaningful information, not every piece of content. Borders and subtle shadows should communicate separation; avoid stacked shadow-heavy layers.

### Icons

Use Lucide icons consistently. Do not use emoji as UI icons. Icon meaning must not depend on color alone.

## Motion

**Motion intensity:** 3/10 — subtle.

- Short transitions for hover/focus and navigation.
- Respect `prefers-reduced-motion`.
- No continuous animation unless it conveys state or is intentionally decorative and low-distraction.
- Avoid layout-shifting motion.

## UX resilience rules

- Long labels, URLs, badges and identifiers must wrap safely.
- Chips/tags should wrap or expose a `+n` pattern rather than clip.
- Focus state must be visible for keyboard users.
- Interactive elements must have pointer affordance.
- Never hide essential text with overflow clipping.
- Images need meaningful alt text when they communicate information.
- Error and success states need text/semantics in addition to color.

## Page strategy

### Home

Hero → trust/value proposition → flagship solutions → product proof → capabilities → CTA → footer.

### Solution pages

Problem → product promise → operational outcomes → feature groups → interface proof → integrations/security → CTA.

### Contact

Reduce friction: clear intent, short form, strong reassurance and a single primary next step.

## Implementation policy

This document is the persistent visual contract for the project. Future UI changes should preserve these tokens, typography roles, density and accessibility rules unless a page-specific override explicitly justifies a deviation.
