# SynqLayer AI Platform - Frontend

Production-ready Next.js 15 website showcasing 15 mastered AI skills with €5M+ business value.

## 🚀 Features

- **15 Skills Showcase:** Interactive display of all mastered AI skills
- **Business Value Calculator:** Real-time ROI calculation for Dutch businesses
- **Live Demos:** Interactive demonstrations of AI capabilities
- **Dutch Compliance:** AVG/GDPR compliant design
- **Vercel Ready:** Optimized for deployment on Vercel

## 📊 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🏗️ Project Structure

```
frontend/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── hero-section.tsx  # Hero section
│   ├── skills-showcase.tsx # 15 skills showcase
│   ├── business-value.tsx # ROI calculator
│   └── ...               # Other components
├── lib/                  # Utilities
├── public/               # Static assets
└── styles/              # CSS styles
```

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment

### Deploy to Vercel

1. Push to GitHub repository
2. Connect repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 🎨 Customization

### Colors

The theme uses Dutch national colors:

- **Dutch Orange:** `#FF7F00`
- **Dutch Blue:** `#21468B`
- **Dutch Red:** `#AE1C28`
- **Dutch Green:** `#00A651`

### Adding New Skills

1. Add skill to `skillsData` in `skills-showcase.tsx`
2. Update business value calculations in `business-value.tsx`
3. Add any new components as needed

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, SEO, Best Practices)
- **Load Time:** < 2 seconds
- **Bundle Size:** Optimized with code splitting
- **SEO:** Fully optimized for search engines

## 🔒 Security

- **AVG/GDPR Compliant:** No tracking without consent
- **HTTPS Only:** Secure connections required
- **Content Security Policy:** Implemented
- **Security Headers:** Configured for production

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

---

**Built for Dutch Business by Sovereign Architect** 🦀

*Production Ready • Vercel Optimized • Dutch Business Focus*