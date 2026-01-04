# Customization Guide

This guide will help you customize the portfolio to make it your own.

## Quick Start Customization

### 1. Personal Information

**File:** `app/data/profile.ts`

Update your personal details:

```typescript
export const profile = {
  name: 'Your Name',
  title: 'Your Title',
  subtitle: 'Your Subtitle',
  email: 'your.email@example.com',
  location: 'Your Location',
  bio: [
    'Your first paragraph...',
    'Your second paragraph...',
    'Your third paragraph...',
  ],
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    telegram: 'https://t.me/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  stats: [
    { label: 'Years of Experience', value: 'X+' },
    { label: 'Projects Completed', value: 'XX+' },
    { label: 'Lines of Code', value: 'XXK+' },
    { label: 'Coffee Consumed', value: '∞' },
  ],
};
```

### 2. Work Experience

**File:** `app/data/profile.ts`

Add or modify your work experience:

```typescript
export const experience: Experience[] = [
  {
    id: 1,
    title: 'Your Job Title',
    company: 'Company Name',
    period: 'Month Year - Present',
    location: 'City, Country',
    type: 'remote', // or 'onsite' or 'hybrid'
    description: [
      'Achievement or responsibility 1',
      'Achievement or responsibility 2',
      // ...
    ],
    technologies: ['Tech1', 'Tech2', 'Tech3'],
  },
  // Add more positions...
];
```

### 3. Projects

**File:** `app/data/projects.ts`

Replace the example projects with your own:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Short description',
    longDescription: 'Detailed description (3-4 sentences)',
    technologies: ['Python', 'FastAPI', 'PostgreSQL'],
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
    category: 'backend', // or 'trading', 'fullstack', 'ml', 'infrastructure'
    github: 'https://github.com/username/project',
    demo: 'https://project-demo.com', // optional
    image: '/images/projects/project-name.jpg',
    year: '2024',
    metrics: [
      { label: 'Metric 1', value: 'X+' },
      { label: 'Metric 2', value: 'XX%' },
      { label: 'Metric 3', value: 'XXX' },
    ],
  },
  // Add more projects...
];
```

### 4. Skills

**File:** `app/data/skills.ts`

Update your technical skills:

```typescript
export const skills: Skill[] = [
  {
    name: 'Python',
    level: 95, // 0-100
    category: 'languages', // or 'frameworks', 'databases', 'tools', 'devops'
    years: 5,
  },
  // Add more skills...
];
```

## Visual Customization

### Colors

**File:** `tailwind.config.ts`

Change the primary and accent colors:

```typescript
colors: {
  primary: {
    // Update these hex values
    500: '#your-color',
    600: '#your-darker-shade',
    // ...
  },
  accent: {
    500: '#your-accent-color',
    // ...
  },
}
```

### Fonts

**File:** `app/layout.tsx`

Change the font family:

```typescript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-custom',
})
```

Then update `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ['var(--font-custom)', 'system-ui', 'sans-serif'],
}
```

### 3D Scene Customization

**Hero Scene:** `app/components/3d/HeroScene.tsx`

- Change sphere color: Update `color="#0ea5e9"` to your color
- Adjust particle count: Modify `const count = 500`
- Change rotation speed: Update `autoRotateSpeed={0.5}`

**Skills Scene:** `app/components/3d/SkillsScene.tsx`

- Modify skills displayed in 3D
- Change colors and positions

## Adding Project Images

1. Add images to `/public/images/projects/`
2. Name them descriptively (e.g., `trading-bot.jpg`)
3. Update the `image` field in your project data
4. Recommended size: 800x600px or 1200x900px

## SEO Optimization

**File:** `app/layout.tsx`

Update metadata:

```typescript
export const metadata: Metadata = {
  title: 'Your Name | Your Title',
  description: 'Your custom description',
  keywords: ['keyword1', 'keyword2'],
  // ...
}
```

## Adding Custom Pages

1. Create a new folder in `app/` (e.g., `app/blog/`)
2. Add `page.tsx` in that folder
3. Add link in `app/components/layout/Header.tsx`

## Environment Variables

Copy `.env.example` to `.env.local` and update:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Your Portfolio Name"
```

## Tips

- **Keep it simple**: Don't overload with too many projects
- **Quality over quantity**: 5-10 well-documented projects > 20 basic ones
- **Update regularly**: Keep your skills and experience current
- **Professional images**: Use high-quality screenshots or mockups
- **Test thoroughly**: Check all links and animations work properly
- **Mobile-first**: Always test on mobile devices

## Need Help?

- Check the main README.md for installation instructions
- Review the code comments for inline documentation
- Open an issue on GitHub if you encounter problems

Happy customizing! 🎨
