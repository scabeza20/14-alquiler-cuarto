## 1. Vector Icon Component and Elimination of 4MB Font

- [x] 1.1 Create `src/components/Icon.astro` with SVG definitions for all used icons (`apartment`, `verified`, `visibility`, `location_on`, `square_foot`, `shower`, `group`, `door_front`, `info`, `photo_library`, `zoom_in`, `key`, `mail`, `person`, `call`, `send`, `check_circle`, `pets`, `map`, `celebration`, `schedule`, `arrow_forward`, `dark_mode`, `light_mode`, `chat`, `payments`, `pin_drop`, `arrow_back`, `chevron_left`, `chevron_right`), verifying with `pnpm astro check`.
- [x] 1.2 Replace all `material-symbols-outlined` span tags in `Navbar.astro`, `Footer.astro`, `ContactForm.astro`, `Gallery.astro`, `index.astro`, `detalle.astro`, and `contacto.astro` with `<Icon name="..." />`, verifying all icons render cleanly in the UI.
- [x] 1.3 Remove the Material Symbols Outlined `<link rel="stylesheet">` from `src/layouts/Layout.astro` and verify that no requests to `materialsymbolsoutlined` woff2 are made.

## 2. Web Font Loading and Critical CSS Optimization

- [x] 2.1 Optimize Google Fonts `Inter` loading in `src/layouts/Layout.astro` using non-blocking stylesheet pattern (`media="print" onload="this.media='all'"`) and robust system font fallback in `src/styles/global.css`, verifying that initial rendering is not blocked by font stylesheets.
- [x] 2.2 Add CSS rendering containment (`content-visibility: auto` and `contain-intrinsic-size`) in `src/styles/global.css` or page styles for offscreen sections (`.gallery-preview-section`, `.advantages-section`, `.faq-section`, `.map-section`, `.site-footer`), verifying no layout shifts occur when scrolling.

## 3. LCP Hero Image Prioritization and Responsive Optimization

- [x] 3.1 Optimize image payloads in `/public/img/` by resizing full-resolution camera assets (3000px) to web-optimized resolutions (e.g., 1200px max width for hero/gallery full views, 600px for thumbnails) using WebP compression, verifying total image folder weight is reduced by >70%.
- [x] 3.2 Add `<link rel="preload" as="image" href="/img/foto-1.webp" fetchpriority="high" type="image/webp">` to `<head>` in `src/layouts/Layout.astro`, verifying high-priority preload discovery in the document head.
- [x] 3.3 Configure `loading="eager"`, `fetchpriority="high"`, and explicit `width="1200"` and `height="800"` on the hero image in `src/pages/index.astro`, verifying LCP element discovery.
- [x] 3.4 Add explicit `width`, `height`, `loading="lazy"`, and `decoding="async"` attributes to all non-hero images in `src/pages/index.astro` and `src/pages/detalle.astro`, verifying image dimensions reserve layout space.

## 4. Verification and Performance Audit

- [x] 4.1 Run `pnpm build` and `pnpm astro check` to verify static build output and TypeScript typings with zero errors.
- [x] 4.2 Run a local Lighthouse desktop audit against the preview/production build, verifying FCP < 1.0s, LCP < 1.5s, TBT = 0ms, and desktop performance score >= 90.
