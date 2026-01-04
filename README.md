# Python Developer Portfolio

Modern, high-performance portfolio website showcasing Python backend development and trading systems expertise. Built with Next.js 14, Three.js, and cutting-edge web technologies.

![Portfolio Preview](https://via.placeholder.com/1200x600/0f172a/0ea5e9?text=Portfolio+Preview)

## ✨ Features

- 🎨 **Modern Design**: Dark theme with gradient accents and glass morphism effects
- 🎭 **3D Animations**: Interactive Three.js scenes on hero and skills pages
- 🚀 **High Performance**: Optimized with lazy loading, code splitting, and SSR
- 📱 **Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- 🎯 **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- ⚡ **Fast Loading**: Under 3s load time with optimized assets

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion + GSAP
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx              # Home page
│   │   ├── about/                # About page
│   │   ├── projects/             # Projects page
│   │   ├── skills/               # Skills page
│   │   └── contact/              # Contact page
│   ├── components/
│   │   ├── 3d/                   # Three.js components
│   │   │   ├── HeroScene.tsx
│   │   │   └── SkillsScene.tsx
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── SkillBar.tsx
│   │   │   └── ContactForm.tsx
│   │   └── layout/               # Layout components
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── data/                     # Data configuration
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── profile.ts
│   ├── lib/                      # Utilities
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── public/
│   └── images/                   # Static images
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── tsconfig.json                 # TypeScript config
```

## 🎨 Customization

### Update Personal Information

Edit `app/data/profile.ts`:

```typescript
export const profile = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... other fields
};
```

### Modify Projects

Edit `app/data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Project description',
    // ... other fields
  },
  // Add more projects
];
```

### Adjust Skills

Edit `app/data/skills.ts`:

```typescript
export const skills: Skill[] = [
  { name: 'Python', level: 95, category: 'languages', years: 5 },
  // Add your skills
];
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary color shades
  },
  accent: {
    // Your accent color shades
  },
}
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify

### Docker

```bash
# Build Docker image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
```

## 🎯 Performance Optimization

- **Lazy Loading**: 3D components loaded only when needed
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component for optimized images
- **Font Optimization**: Variable fonts with `next/font`
- **Preloading**: Critical resources preloaded
- **Caching**: Static assets cached with appropriate headers

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast ratios meet WCAG AA standards
- Screen reader friendly

## 🧪 Testing

```bash
# Run tests (if you add them)
npm test

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Alex Morrison**

- GitHub: [@alexmorrison](https://github.com/alexmorrison)
- LinkedIn: [@alexmorrison](https://linkedin.com/in/alexmorrison)
- Email: alex.morrison.dev@example.com

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 📝 Notes

- Replace placeholder images in `/public/images/` with your actual project screenshots
- Update social media links in `app/data/profile.ts`
- Consider adding Google Analytics or other analytics tools
- Add your actual GitHub repository URL
- Customize meta tags in `app/layout.tsx` for better SEO

## 🔧 Troubleshooting

### Three.js rendering issues
- Make sure you're using a modern browser that supports WebGL
- Check console for WebGL errors
- Try disabling browser extensions that might interfere

### Build errors
- Clear `.next` folder and `node_modules`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (requires Node 18+)

### Slow performance
- Enable production mode: `npm run build && npm start`
- Check Network tab for large assets
- Optimize 3D scenes by reducing polygon count

---

Built with ❤️ using Next.js, Three.js, and modern web technologies.
