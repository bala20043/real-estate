# 🏙️ FULL PROMPT — Premium Foreign Theme Real Estate Website

## 🛠️ Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (with custom config)
- **Animations:** Framer Motion + GSAP ScrollTrigger
- **Video:** Embedded YouTube/Pexels iFrame (no static images)
- **Icons:** Lucide React
- **Fonts:** Google Fonts — `Cormorant Garamond` (headings) + `DM Sans` (body)
- **Language:** JavaScript (JSX)

---

## 🎨 Design Theme — "Foreign Luxury Dark Gold"

### Color Palette (CSS Variables in tailwind.config.js)
```js
colors: {
  primary: '#0A0A0A',       // Deep black background
  secondary: '#111111',     // Card/section dark
  accent: '#C9A96E',        // Warm gold accent
  'accent-light': '#E8D5B0',// Light gold
  muted: '#6B6B6B',         // Muted text
  white: '#F5F0E8',         // Warm white
  border: '#1E1E1E',        // Subtle border
}
```

### Typography
```js
// tailwind.config.js
fontFamily: {
  heading: ['"Cormorant Garamond"', 'serif'],  // All H1-H3
  body: ['"DM Sans"', 'sans-serif'],            // All body, nav, buttons
  mono: ['"DM Mono"', 'monospace'],             // Numbers/stats
}
```

### Font Sizes
- H1 Hero: `text-7xl` (72px) — Cormorant, font-weight 300, italic
- H2 Section: `text-5xl` (48px) — Cormorant, font-weight 400
- H3 Card title: `text-2xl` (24px) — DM Sans, font-weight 500
- Body: `text-base` (16px) — DM Sans, font-weight 400
- Nav links: `text-sm` (14px) — DM Sans, font-weight 500, letter-spacing wide
- Stat numbers: `text-6xl` — DM Mono, font-weight 700, gold color

---

## 📁 Project Folder Structure

```
real-estate/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroVideo.jsx
│   │   ├── MarqueeBar.jsx
│   │   ├── FeaturedProperties.jsx
│   │   ├── StatsCounter.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── BlogSection.jsx
│   │   ├── ContactSection.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Properties.jsx
│   │   ├── PropertyDetail.jsx
│   │   ├── Services.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   └── Contact.jsx
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   └── useCounter.js
│   ├── data/
│   │   └── properties.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 📦 Required npm Packages

```bash
npm create vite@latest real-estate -- --template react
cd real-estate
npm install tailwindcss postcss autoprefixer
npm install framer-motion
npm install gsap
npm install lucide-react
npm install react-router-dom
npm install react-intersection-observer
npm install swiper
npm install react-countup
npm install @emailjs/browser
npx tailwindcss init -p
```

---

## 🗂️ Page-by-Page Full UI Spec

---

### 1. NAVBAR (`Navbar.jsx`)

**Design:**
- Fixed top, full width
- Background: `rgba(10,10,10,0.85)` with `backdrop-blur-md`
- Left: Logo icon (SVG house) + "ELARA" in Cormorant gold
- Center: Nav links — Home | About | Properties | Services | Projects | Blog | Contact
- Right: "Book Visit" button — gold border, hover fill gold
- Mobile: hamburger menu with slide-down drawer

**Animation:**
- On scroll down → navbar shrinks height with transition
- Nav links: underline slide-in on hover (gold color)
- Logo subtle fade-in on mount

**Code pattern:**
```jsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  window.addEventListener('scroll', () => setScrolled(window.scrollY > 60));
}, []);

<nav className={`fixed w-full z-50 transition-all duration-500
  ${scrolled ? 'py-3 bg-primary/90 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'}`}>
```

---

### 2. HERO VIDEO SECTION (`HeroVideo.jsx`)

**Design:**
- Full screen height (`h-screen`)
- Background: Autoplay muted looped video (luxury property exterior)
- Video source: YouTube embed (use `?autoplay=1&mute=1&loop=1&controls=0&playlist=VIDEO_ID`)
  - Recommended video IDs for luxury real estate: `dQw4w9WgXcQ` (replace with actual Pexels/YouTube real estate videos)
  - Use iframe with `pointer-events-none` and scale-110 to cover full area
- Dark overlay: `bg-gradient-to-b from-black/60 via-black/30 to-primary`
- Center Content:
  - Small label: "LUXURY REAL ESTATE" — gold, letter-spacing-widest, text-xs
  - H1: "Find Your" (thin) + line break + "Dream Home" (italic gold)
  - Subtext: "Premium properties in the world's most desirable locations"
  - Two buttons: "Explore Properties" (gold fill) | "Watch Story" (outline)
- Bottom: Animated scroll indicator (bouncing chevron)

**Scrolling text ticker below hero:**
```
LUXURY VILLAS · PREMIUM APARTMENTS · COMMERCIAL SPACES · WATERFRONT PROPERTIES ·
```
(Infinite marquee using CSS animation)

**Video embed pattern:**
```jsx
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&controls=0&playlist=VIDEO_ID"
  className="absolute inset-0 w-full h-full scale-110 pointer-events-none"
  allow="autoplay; fullscreen"
  frameBorder="0"
/>
```

**Recommended free real estate videos:**
- Pexels video: https://www.pexels.com/video/aerial-view-of-a-modern-house-4782520/
- YouTube luxury real estate tour videos (search: "luxury real estate tour 4k")

**Animation:**
- Hero text: staggered fade-up using Framer Motion
- Scroll down → video parallax shrink effect

---

### 3. MARQUEE BAR (`MarqueeBar.jsx`)

```jsx
// Infinite scrolling text strip
<div className="bg-accent py-3 overflow-hidden">
  <div className="animate-marquee whitespace-nowrap flex gap-16 text-primary font-body font-semibold tracking-widest text-sm">
    LUXURY VILLAS · PREMIUM APARTMENTS · COMMERCIAL SPACES · PENTHOUSES · WATERFRONT ·
  </div>
</div>
```

Tailwind custom animation:
```js
// tailwind.config.js
animation: {
  marquee: 'marquee 30s linear infinite',
},
keyframes: {
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
},
```

---

### 4. STATS COUNTER SECTION (`StatsCounter.jsx`)

**Design:**
- Dark background, 4 columns
- Numbers animate up when scrolled into view (react-countup)
- Stats: 500+ Properties | 12+ Years | 98% Satisfaction | 40+ Cities
- Gold number, white label below

```jsx
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const { ref, inView } = useInView({ triggerOnce: true });
// When inView === true, start CountUp
```

---

### 5. FEATURED PROPERTIES (`FeaturedProperties.jsx`)

**Design:**
- Section title: "Featured Properties" — Cormorant, centered
- Filter tabs: All | Buy | Rent | Commercial | Luxury
- Property cards (3 per row, CSS grid):
  - Video thumbnail or background video loop (small muted autoplay)
  - Price badge (gold, top-right)
  - Title, location, beds/baths/sqft icons
  - "View Details" hover reveal overlay

**Property data shape:**
```js
{
  id: 1,
  title: "The Azure Penthouse",
  location: "Marina Bay, Dubai",
  price: "₹4.2 Cr",
  type: "buy",
  beds: 4,
  baths: 3,
  sqft: 3200,
  videoId: "YOUTUBE_VIDEO_ID",
  tag: "Luxury"
}
```

**Card hover animation:**
```jsx
<motion.div
  whileHover={{ y: -8, transition: { duration: 0.3 } }}
  className="group relative overflow-hidden rounded-lg border border-border bg-secondary cursor-pointer"
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</motion.div>
```

---

### 6. ABOUT SECTION (`AboutSection.jsx`)

**Design:**
- Left: Vertical video (muted autoplay, luxury interior walk-through)
- Right: Content
  - Small label: "ABOUT ELARA"
  - H2: "Building Dreams, Creating Legacies"
  - 3 short paragraphs
  - Two feature bullets with icons (Cormorant + LucideReact icons)
  - CTA: "Our Story →"

**Animation:**
- Left video: slide in from left (GSAP ScrollTrigger)
- Right content: fade up with stagger

---

### 7. SERVICES SECTION (`ServicesSection.jsx`)

**Design:**
- Dark section, 3 service cards
- Services: Property Buying | Rental Management | Investment Consulting
- Each card:
  - Large number (01, 02, 03) in gold
  - Lucide icon
  - Title + short description
  - Hover: border turns gold, card lifts

**Cards:**
```jsx
const services = [
  { num: "01", icon: <Home />, title: "Property Buying", desc: "..." },
  { num: "02", icon: <Key />, title: "Rental Management", desc: "..." },
  { num: "03", icon: <TrendingUp />, title: "Investment Consulting", desc: "..." },
];
```

---

### 8. PROJECTS SECTION (`ProjectsSection.jsx`)

**Design:**
- Horizontal scroll OR grid
- Project cards with:
  - Background video (YouTube embed, small muted)
  - Location tag + project name
  - Status badge: "Ongoing" | "Completed" | "Coming Soon"
- Button: "View All Projects"

---

### 9. VIDEO TESTIMONIALS (`TestimonialsSection.jsx`)

**Design:**
- Section bg: slightly lighter dark
- Swiper.js carousel
- Each testimonial card:
  - Quote icon (large, gold, faded background)
  - Testimonial text
  - Client name + designation
  - Star rating (5 gold stars)
- Auto-play with pause on hover

---

### 10. BLOG SECTION (`BlogSection.jsx`)

**Design:**
- 3 blog cards, horizontal layout
- Each card:
  - Thumbnail (background video or color gradient)
  - Category tag: "Market News" | "Investment Tips" | "Design"
  - Date + read time
  - Title + excerpt
  - "Read More →" link

---

### 11. CONTACT SECTION (`ContactSection.jsx`)

**Design:**
- 2 columns: Left form | Right info + Google Map embed
- Form fields: Name | Email | Phone | Property Type (dropdown) | Message
- Submit button: "Send Enquiry" — gold, full width
- Right side: Address, Phone, Email + embedded Google Map (iframe)
- EmailJS integration for sending emails without backend

**EmailJS setup:**
```jsx
import emailjs from '@emailjs/browser';

const handleSubmit = (e) => {
  e.preventDefault();
  emailjs.sendForm(
    'SERVICE_ID', 'TEMPLATE_ID', formRef.current, 'PUBLIC_KEY'
  ).then(() => alert('Message sent!')).catch(console.error);
};
```

---

### 12. FOOTER (`Footer.jsx`)

**Design:**
- 4 columns: Logo+tagline | Quick Links | Properties | Contact
- Bottom bar: Copyright | Privacy Policy | Terms
- Social icons: Instagram, Facebook, LinkedIn, YouTube
- Background: `#080808` (darkest)
- Top: thin gold line separator

---

## ✨ Global Scroll Animations

Install and set up GSAP ScrollTrigger:
```jsx
// hooks/useScrollAnimation.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  useEffect(() => {
    // Fade up all elements with class "scroll-reveal"
    gsap.utils.toArray('.scroll-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    // Horizontal line expand
    gsap.utils.toArray('.line-reveal').forEach((el) => {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      );
    });
  }, []);
};
```

**Apply to sections:**
```jsx
<h2 className="scroll-reveal">Featured Properties</h2>
<div className="line-reveal h-px bg-accent w-full" />
```

---

## 🎬 Video Sources (Free / Embeddable)

Use these real estate YouTube videos:

```js
const luxuryVideos = {
  heroExterior: "https://www.youtube.com/embed/ZZ5LpwO-An4?autoplay=1&mute=1&loop=1&controls=0",
  interior1: "https://www.youtube.com/embed/xF-Y-JFNs6w?autoplay=1&mute=1&loop=1&controls=0",
  interior2: "https://www.youtube.com/embed/y7RoSCG5J5I?autoplay=1&mute=1&loop=1&controls=0",
  exterior: "https://www.youtube.com/embed/V-DNSl40bFE?autoplay=1&mute=1&loop=1&controls=0",
}
```

**OR use Pexels free stock videos (MP4 direct):**
```js
const pexelsVideos = {
  hero: "https://videos.pexels.com/video-files/4782520/4782520-uhd_2560_1440_25fps.mp4",
  interior: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
}
// Use <video autoPlay muted loop playsInline src={pexelsVideos.hero} />
```

---

## 🔧 Backend Functions (All Frontend — No Server Needed)

### 1. Property Search & Filter
```jsx
const [filter, setFilter] = useState('all');
const [search, setSearch] = useState('');

const filtered = properties.filter(p =>
  (filter === 'all' || p.type === filter) &&
  (p.title.toLowerCase().includes(search.toLowerCase()) ||
   p.location.toLowerCase().includes(search.toLowerCase()))
);
```

### 2. EMI Calculator
```jsx
const calculateEMI = (principal, rate, months) => {
  const r = rate / (12 * 100);
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
};
```

### 3. Property Enquiry Form (EmailJS)
- No backend server needed
- Direct email via EmailJS free tier

### 4. Smooth Page Routing
```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Wrap all pages, use <Link> for navigation
// Add page transition: Framer Motion AnimatePresence
```

### 5. Bookmark / Wishlist (localStorage)
```jsx
const toggleWishlist = (id) => {
  const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const updated = saved.includes(id) ? saved.filter(i => i !== id) : [...saved, id];
  localStorage.setItem('wishlist', JSON.stringify(updated));
};
```

---

## 🚀 Quick Start Commands

```bash
# 1. Create project
npm create vite@latest elara-realty -- --template react
cd elara-realty

# 2. Install all dependencies
npm install tailwindcss postcss autoprefixer framer-motion gsap lucide-react react-router-dom react-intersection-observer swiper react-countup @emailjs/browser

# 3. Initialize Tailwind
npx tailwindcss init -p

# 4. Configure tailwind.config.js with custom colors, fonts, animations

# 5. Import Google Fonts in index.html
# <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;700&display=swap" rel="stylesheet">

# 6. Run dev server
npm run dev
```

---

## 🌟 Premium UX Details (Make It Unforgettable)

1. **Custom cursor** — small gold dot that follows mouse
2. **Page loader** — 2s animated logo reveal before content shows
3. **Smooth scroll** — `scroll-behavior: smooth` + Lenis smooth scroll library
4. **Section dividers** — diagonal clip-path cuts between sections
5. **Number odometer** — stats count up with gold glow on first view
6. **Video cards** — property cards play video on hover, pause on leave
7. **Gold particle effect** on hero section (three.js or CSS particles)
8. **Sticky property filter bar** — sticks below navbar when scrolling properties
9. **Back to top button** — appears after scroll, gold circle with arrow

---

## 📱 Responsive Breakpoints

```
Mobile:  < 768px  — single column, hamburger nav
Tablet:  768-1024px — 2 columns
Desktop: > 1024px — 3 columns, full nav
```

---

*Company Name: ELARA REALTY | Tagline: "Where Luxury Meets Legacy"*
*Logo: Simple geometric house SVG in gold on black background*
