# Design Guidelines for Aperte o Play FM Radio Website

## Design Approach
**System:** Material Design with custom vibrant radio station aesthetic
**Reference Inspiration:** Modern radio/streaming platforms like Spotify, SoundCloud with energetic youth-oriented branding

## Brand Colors & Visual Identity
**Primary Colors** (extracted from logos):
- Cyan: #00D4FF (primary brand color)
- Magenta: #FF00FF (accent color)
- Supporting neutrals: Dark backgrounds with white/light text for contrast

**Visual Style:**
- Modern, energetic design with rounded corners throughout
- Subtle shadows for depth (shadow-lg, shadow-xl)
- Clean, contemporary typography
- Vibrant gradients combining cyan and magenta for hero sections

## Typography System
**Font Families:** 
- Primary: Inter or Poppins (modern, clean sans-serif via Google Fonts)
- Headings: Bold weights (600-800)
- Body: Regular to Medium (400-500)

**Scale:**
- Hero Headlines: text-5xl to text-7xl
- Section Titles: text-3xl to text-4xl
- Card Titles: text-xl to text-2xl
- Body Text: text-base to text-lg
- Small Text: text-sm

## Layout & Spacing System
**Tailwind Units:** Consistent use of 2, 4, 6, 8, 12, 16, 20, 24, 32 units
- Section padding: py-16 to py-24 (desktop), py-8 to py-12 (mobile)
- Card padding: p-6 to p-8
- Element spacing: gap-4, gap-6, gap-8
- Container: max-w-7xl with px-4 to px-8

**Grid System:**
- Featured programs: 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Supporters: 4-column grid (lg:grid-cols-4)
- News cards: 3-column grid with proper gutters

## Component Library

### Navigation (Fixed Header)
- Fixed top position with backdrop blur (backdrop-blur-lg bg-opacity-90)
- Logo left-aligned, navigation links right-aligned
- Hamburger menu for mobile (transition to full-screen overlay)
- Mini audio player integrated in header (Play/Pause icon + volume slider)
- Height: h-20 with shadow-md

### Audio Players (Dual System)
**Fixed Bottom Player:**
- Full-width sticky footer (h-24)
- Layout: Program image (left) | Title/Description (center) | Play/Volume controls (right)
- Rounded top corners, subtle gradient background
- Synchronized state with mini player

**Mini Player (Header):**
- Compact Play/Pause button + volume popover
- Synced playback state with bottom player

### Home Page Layout
**Hero Section:**
- Large full-width banner (min-h-screen or h-[600px])
- Gradient background (cyan to magenta)
- Center-aligned content: "Bem-vindo à Aperte o Play FM" (text-6xl)
- Frequency "87.9 MHz" prominently displayed
- CTA button with blur background (backdrop-blur-md)

**Featured Programs:**
- 3-column card grid with program images
- Each card: rounded-2xl, overflow-hidden, shadow-lg
- Hover effect: subtle lift (hover:scale-105 transition)
- Image aspect ratio: 16:9 or 4:3

**About Section:**
- Two-column layout (md:grid-cols-2)
- Mission text on left, call-to-action on right
- Background with subtle pattern or gradient

### Ao Vivo Page
**Split Layout (md:grid-cols-2):**
- Left: YouTube embed (aspect-video, rounded-xl)
- Right: Auto-rotating supporter banner carousel (rounded-xl)
- Call-to-action banner below: "Sintonize 87.9 FM" with gradient background

### Programação Page
**Day Selector:**
- Horizontal tab bar (flex, gap-2)
- Each day: rounded-lg button, active state with cyan background
- Mobile: horizontal scroll

**Program Cards:**
- Grid layout for selected day's programs
- Smooth fade transition between days (Framer Motion)
- Card structure: Image top | Time badge | Title | Description
- Time displayed as pill badge (rounded-full, small text)

### Apoiadores Page
- Grid of supporter logos/banners (lg:grid-cols-4, md:grid-cols-3, grid-cols-2)
- Fade-in animation on scroll
- Title section with gratitude message
- Each supporter: rounded-lg container with subtle hover effect

### Notícias Page
**Blog Layout:**
- 3-column card grid (responsive)
- Each card: Featured image | Title | Summary | "Ler mais" button
- Rounded corners, shadow effects
- Article detail page (/noticia/:id): Single column, max-w-4xl, with large header image

### Apoie Page
**Support Section:**
- Centered layout, max-w-3xl
- Emotional headline + motivational text
- 3 QR code placeholders in row (md:grid-cols-3)
- Primary CTA button: "Quero Apoiar Agora" (large, gradient background)
- Warm background treatment

### Login Page
**Form Design:**
- Centered card (max-w-md)
- Input fields: rounded-lg, border with focus states (focus:ring-cyan-500)
- Primary button: full-width, gradient background
- "Esqueci minha senha" link below
- Minimal, clean aesthetic

## Animations & Interactions
**Framer Motion Usage:**
- Page transitions: fade + slight slide
- Card hover: subtle scale (1.02-1.05)
- Supporter carousel: auto-play fade transitions
- Day selector: smooth content swap
- Scroll-triggered fade-ins for sections

**Interaction States:**
- Buttons: hover brightness increase, active scale reduction
- Cards: hover shadow increase + lift
- Links: underline on hover with transition
- Form inputs: border color change on focus

## Images Strategy
**Required Images:**
1. **Hero Section:** Large banner image with radio station branding/DJs (full-width, gradient overlay)
2. **Program Cards:** Individual program artwork/photos (3 featured on home)
3. **Ao Vivo:** YouTube video embed (left side)
4. **Supporter Carousel:** Rotating banner images (right side of Ao Vivo)
5. **Apoiadores Grid:** Multiple supporter logo images
6. **News Cards:** Featured images for each article
7. **Apoie Page:** 3 QR code placeholder images

## Responsiveness
**Breakpoints:**
- Mobile-first approach
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px
- Navigation: Full menu on desktop, hamburger on mobile
- Grids: Single column on mobile, expanding to 2-4 columns
- Player: Simplified controls on mobile

## Accessibility
- Proper heading hierarchy (h1-h6)
- Alt text for all images
- ARIA labels for audio controls
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast meeting WCAG AA standards