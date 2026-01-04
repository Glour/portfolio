# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## ⚡ Installation

```bash
# Navigate to project
cd portfolio

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Open:** http://localhost:3000

---

## 🎯 Customize in 3 Steps

### Step 1: Update Your Info (2 minutes)

**File:** `app/data/profile.ts`

```typescript
export const profile = {
  name: 'YOUR NAME HERE',
  title: 'YOUR TITLE',
  subtitle: 'YOUR SPECIALTY',
  email: 'your.email@example.com',
  location: 'Your Location',
  social: {
    github: 'https://github.com/YOURUSERNAME',
    linkedin: 'https://linkedin.com/in/YOURUSERNAME',
    // ... update all links
  },
};
```

### Step 2: Add Your Projects (10 minutes)

**File:** `app/data/projects.ts`

Replace the example projects with your own:

```typescript
{
  id: 1,
  title: 'Your Project Name',
  description: 'Short description',
  technologies: ['Python', 'FastAPI', 'PostgreSQL'],
  category: 'backend',
  github: 'https://github.com/you/project',
  year: '2024',
}
```

### Step 3: Update Skills (5 minutes)

**File:** `app/data/skills.ts`

```typescript
{ name: 'Python', level: 95, category: 'languages', years: 5 }
```

---

## 🎨 Optional: Change Colors

**File:** `tailwind.config.ts`

```typescript
primary: {
  500: '#YOUR_COLOR',
  600: '#DARKER_SHADE',
}
```

---

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "My portfolio"
git remote add origin https://github.com/YOU/portfolio.git
git push -u origin main

# 2. Go to vercel.com
# 3. Click "Import Project"
# 4. Select your repo
# 5. Click "Deploy"
```

**Done!** Your site is live in ~2 minutes.

---

## 📱 Test Your Portfolio

- ✅ Visit all pages: Home, About, Projects, Skills, Contact
- ✅ Test mobile view (F12 → Toggle device toolbar)
- ✅ Click all links and buttons
- ✅ Check 3D animations work smoothly
- ✅ Fill out contact form (UI only)

---

## 🆘 Common Issues

**Problem:** 3D scenes not loading
- **Solution:** Check browser supports WebGL
- **Solution:** Clear cache and reload

**Problem:** Build fails
- **Solution:** Delete `.next` folder and `node_modules`
- **Solution:** Run `npm install` again

**Problem:** Styles not applying
- **Solution:** Restart dev server
- **Solution:** Check Tailwind config is correct

---

## 📚 More Help?

- **Detailed customization:** See `CUSTOMIZATION.md`
- **Deployment options:** See `DEPLOYMENT.md`
- **Full overview:** See `PROJECT_OVERVIEW.md`
- **Installation:** See `README.md`

---

## ✅ Checklist Before Going Live

- [ ] Updated all personal information
- [ ] Replaced example projects with yours
- [ ] Updated skills and experience
- [ ] Changed social media links
- [ ] Added project images (optional)
- [ ] Tested on mobile device
- [ ] Checked all links work
- [ ] Tested contact form UI
- [ ] Updated meta tags for SEO
- [ ] Deployed and tested live site

---

**That's it!** Your portfolio is ready to impress 🎊

**Questions?** Check the documentation files or open an issue on GitHub.
