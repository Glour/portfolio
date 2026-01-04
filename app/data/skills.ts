export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'languages' | 'frameworks' | 'databases' | 'tools' | 'devops';
  icon?: string;
  years?: number;
}

export const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 95, category: 'languages', years: 5 },
  { name: 'TypeScript', level: 85, category: 'languages', years: 3 },
  { name: 'JavaScript', level: 90, category: 'languages', years: 4 },
  { name: 'SQL', level: 88, category: 'languages', years: 5 },
  { name: 'Go', level: 70, category: 'languages', years: 2 },

  // Frameworks & Libraries
  { name: 'FastAPI', level: 95, category: 'frameworks', years: 4 },
  { name: 'Django', level: 88, category: 'frameworks', years: 3 },
  { name: 'Flask', level: 85, category: 'frameworks', years: 3 },
  { name: 'asyncio', level: 92, category: 'frameworks', years: 4 },
  { name: 'SQLAlchemy', level: 90, category: 'frameworks', years: 4 },
  { name: 'Pydantic', level: 93, category: 'frameworks', years: 3 },
  { name: 'Pandas', level: 87, category: 'frameworks', years: 4 },
  { name: 'NumPy', level: 85, category: 'frameworks', years: 4 },
  { name: 'TensorFlow', level: 75, category: 'frameworks', years: 2 },
  { name: 'React', level: 82, category: 'frameworks', years: 3 },
  { name: 'Next.js', level: 80, category: 'frameworks', years: 2 },

  // Databases
  { name: 'PostgreSQL', level: 92, category: 'databases', years: 5 },
  { name: 'MongoDB', level: 85, category: 'databases', years: 3 },
  { name: 'Redis', level: 88, category: 'databases', years: 4 },
  { name: 'Elasticsearch', level: 78, category: 'databases', years: 2 },
  { name: 'TimescaleDB', level: 80, category: 'databases', years: 2 },

  // Tools
  { name: 'Git', level: 93, category: 'tools', years: 5 },
  { name: 'pytest', level: 90, category: 'tools', years: 4 },
  { name: 'Postman', level: 88, category: 'tools', years: 4 },
  { name: 'Jupyter', level: 85, category: 'tools', years: 4 },
  { name: 'VS Code', level: 95, category: 'tools', years: 5 },

  // DevOps & Infrastructure
  { name: 'Docker', level: 92, category: 'devops', years: 4 },
  { name: 'Kubernetes', level: 80, category: 'devops', years: 2 },
  { name: 'CI/CD', level: 85, category: 'devops', years: 3 },
  { name: 'Nginx', level: 83, category: 'devops', years: 3 },
  { name: 'RabbitMQ', level: 82, category: 'devops', years: 3 },
  { name: 'Celery', level: 87, category: 'devops', years: 3 },
  { name: 'Grafana', level: 78, category: 'devops', years: 2 },
  { name: 'Prometheus', level: 80, category: 'devops', years: 2 },
  { name: 'Linux', level: 88, category: 'devops', years: 5 },
];

export const skillCategories = [
  { value: 'languages', label: 'Languages', color: '#0ea5e9' },
  { value: 'frameworks', label: 'Frameworks & Libraries', color: '#a855f7' },
  { value: 'databases', label: 'Databases', color: '#ec4899' },
  { value: 'tools', label: 'Tools', color: '#10b981' },
  { value: 'devops', label: 'DevOps & Infrastructure', color: '#f59e0b' },
];

export const expertise = [
  {
    title: 'Backend Development',
    description: 'Expert in building scalable, high-performance backend systems with Python. Specializing in async programming, REST/GraphQL APIs, and microservices architecture.',
    icon: '🚀',
  },
  {
    title: 'Trading Systems',
    description: 'Experienced in developing automated trading bots, market analytics platforms, and real-time data processing systems for cryptocurrency and traditional markets.',
    icon: '📊',
  },
  {
    title: 'Database Design',
    description: 'Proficient in database architecture, optimization, and management. Experience with both SQL and NoSQL databases, including PostgreSQL, MongoDB, and Redis.',
    icon: '💾',
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Skilled in containerization, orchestration, and CI/CD pipelines. Experience with Docker, Kubernetes, and cloud platforms for deploying scalable applications.',
    icon: '⚙️',
  },
];
