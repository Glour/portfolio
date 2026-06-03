export type SkillCategory =
  | 'languages'
  | 'backend'
  | 'ai'
  | 'telegram'
  | 'frontend'
  | 'databases'
  | 'devops'
  | 'cloud'
  | 'tools'
  | 'blockchain';

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  icon?: string;
  years?: number;
}

export const skills: Skill[] = [
  // Languages
  { name: 'Python 3.12+', level: 96, category: 'languages', years: 5 },
  { name: 'TypeScript', level: 88, category: 'languages', years: 3 },
  { name: 'JavaScript', level: 86, category: 'languages', years: 4 },
  { name: 'SQL', level: 92, category: 'languages', years: 5 },
  { name: 'HTML / CSS', level: 84, category: 'languages', years: 4 },

  // Backend
  { name: 'FastAPI', level: 96, category: 'backend', years: 4 },
  { name: 'Django / DRF', level: 84, category: 'backend', years: 3 },
  { name: 'Flask', level: 84, category: 'backend', years: 3 },
  { name: 'asyncio', level: 93, category: 'backend', years: 4 },
  { name: 'SQLAlchemy 2.*', level: 92, category: 'backend', years: 4 },
  { name: 'Pydantic', level: 94, category: 'backend', years: 3 },
  { name: 'Alembic', level: 88, category: 'backend', years: 3 },
  { name: 'Celery', level: 86, category: 'backend', years: 3 },
  { name: 'REST API / WebSocket', level: 91, category: 'backend', years: 4 },

  // AI platforms
  { name: 'OpenAI API', level: 93, category: 'ai', years: 3 },
  { name: 'Anthropic Claude', level: 91, category: 'ai', years: 2 },
  { name: 'Gemini / Mistral', level: 84, category: 'ai', years: 2 },
  { name: 'RAG', level: 88, category: 'ai', years: 2 },
  { name: 'LLM routing', level: 88, category: 'ai', years: 2 },
  { name: 'Prompt engineering', level: 90, category: 'ai', years: 3 },
  { name: 'STT / call analysis', level: 82, category: 'ai', years: 1 },
  { name: 'AgentOps', level: 89, category: 'ai', years: 2 },
  { name: 'Agent orchestration', level: 90, category: 'ai', years: 2 },

  // Telegram
  { name: 'Aiogram 3.*', level: 94, category: 'telegram', years: 4 },
  { name: 'Telegram Bot API', level: 94, category: 'telegram', years: 5 },
  { name: 'Telethon', level: 88, category: 'telegram', years: 3 },
  { name: 'Pyrogram', level: 82, category: 'telegram', years: 2 },
  { name: 'Telegram Mini Apps', level: 84, category: 'telegram', years: 2 },
  { name: 'Telegram WebApp API', level: 84, category: 'telegram', years: 2 },

  // Frontend / product UI
  { name: 'Next.js', level: 86, category: 'frontend', years: 2 },
  { name: 'React', level: 86, category: 'frontend', years: 3 },
  { name: 'Tailwind CSS', level: 84, category: 'frontend', years: 2 },
  { name: 'Recharts', level: 78, category: 'frontend', years: 1 },
  { name: 'SaaS dashboards', level: 86, category: 'frontend', years: 2 },
  { name: 'Landing pages', level: 84, category: 'frontend', years: 2 },

  // Databases
  { name: 'PostgreSQL', level: 94, category: 'databases', years: 5 },
  { name: 'Redis', level: 90, category: 'databases', years: 4 },
  { name: 'SQLite', level: 86, category: 'databases', years: 4 },
  { name: 'MongoDB', level: 82, category: 'databases', years: 3 },
  { name: 'ClickHouse', level: 78, category: 'databases', years: 2 },
  { name: 'Qdrant / Chroma', level: 82, category: 'databases', years: 2 },
  { name: 'Elasticsearch', level: 78, category: 'databases', years: 2 },
  { name: 'MinIO / S3', level: 76, category: 'databases', years: 1 },

  // DevOps & Infrastructure
  { name: 'Docker', level: 93, category: 'devops', years: 4 },
  { name: 'Docker Compose', level: 90, category: 'devops', years: 4 },
  { name: 'Linux', level: 90, category: 'devops', years: 5 },
  { name: 'Nginx / Caddy', level: 86, category: 'devops', years: 3 },
  { name: 'systemd', level: 84, category: 'devops', years: 3 },
  { name: 'GitHub Actions / CI/CD', level: 86, category: 'devops', years: 3 },
  { name: 'pytest', level: 90, category: 'devops', years: 4 },

  // Cloud / operations
  { name: 'Hetzner', level: 88, category: 'cloud', years: 2 },
  { name: 'Yandex Cloud', level: 82, category: 'cloud', years: 2 },
  { name: 'Timeweb Cloud', level: 82, category: 'cloud', years: 2 },
  { name: 'Vercel / Render / Fly.io', level: 80, category: 'cloud', years: 2 },
  { name: 'Cloudflare', level: 82, category: 'cloud', years: 2 },
  { name: 'Remote Docker deploy', level: 86, category: 'cloud', years: 2 },

  // Tools and integrations
  { name: 'Git', level: 94, category: 'tools', years: 5 },
  { name: 'Playwright', level: 84, category: 'tools', years: 2 },
  { name: 'BeautifulSoup / scraping', level: 82, category: 'tools', years: 3 },
  { name: 'Swagger / OpenAPI', level: 86, category: 'tools', years: 4 },
  { name: 'Google Sheets API', level: 82, category: 'tools', years: 2 },
  { name: 'AmoCRM / Bitrix24', level: 78, category: 'tools', years: 2 },
  { name: 'Prometheus / Grafana', level: 80, category: 'tools', years: 2 },

  // Blockchain
  { name: 'TON Blockchain', level: 80, category: 'blockchain', years: 2 },
  { name: 'Bitcoin L2 / Runes', level: 78, category: 'blockchain', years: 1 },
  { name: 'Hardhat', level: 78, category: 'blockchain', years: 2 },
  { name: 'Web3.py', level: 80, category: 'blockchain', years: 2 },
  { name: 'Smart Contracts', level: 76, category: 'blockchain', years: 2 },
];

export const skillCategories = [
  { value: 'languages', label: 'Languages', color: '#0ea5e9' },
  { value: 'backend', label: 'Backend', color: '#38bdf8' },
  { value: 'ai', label: 'AI Platforms & Agents', color: '#a855f7' },
  { value: 'telegram', label: 'Telegram Ecosystem', color: '#60a5fa' },
  { value: 'frontend', label: 'Frontend / Product UI', color: '#fb923c' },
  { value: 'databases', label: 'Databases', color: '#ec4899' },
  { value: 'devops', label: 'DevOps & Runtime', color: '#f59e0b' },
  { value: 'cloud', label: 'Cloud & Operations', color: '#10b981' },
  { value: 'tools', label: 'Tools & Integrations', color: '#22c55e' },
  { value: 'blockchain', label: 'Blockchain', color: '#c084fc' },
] as const;

export const expertise = [
  {
    title: 'Python Backend',
    description: 'Production backend on FastAPI/Django/Flask: APIs, async workers, PostgreSQL schemas, integrations, auth, reporting, and deployment-ready services.',
    icon: '🚀',
  },
  {
    title: 'AI Platforms & AgentOps',
    description: 'AI-agent platforms, LLM routing, RAG, prompt workflows, worker nodes, credits, safety gates, logs, and operator dashboards.',
    icon: '🧠',
  },
  {
    title: 'Telegram Products',
    description: 'Telegram bots, Mini Apps, userbot automation, campaign logic, account/proxy workflows, alerts, reports, and business integrations.',
    icon: '✈️',
  },
  {
    title: 'Production Infrastructure',
    description: 'Docker, Linux, Nginx/Caddy, CI/CD, Hetzner/cloud deployment, monitoring, health checks, logs, and production debugging.',
    icon: '⚙️',
  },
];
