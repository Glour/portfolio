export const profile = {
  name: 'Aleksandr Bogdanov',
  title: 'Backend Developer',
  subtitle: 'Python • AI/ML • Blockchain • Telegram Bots',
  email: 'alexdevguru@gmail.com', // Замените на ваш email
  telegram: '@ne_stoit_togo', // Замените на ваш telegram
  location: 'Remote',
  bio: [
    'Backend-разработчик с опытом создания высоконагруженных систем, AI-интеграций и blockchain-решений. Специализируюсь на Python, FastAPI, микросервисной архитектуре и Telegram-экосистеме.',
    'Руководил командами разработки, провел более 30 проектов различной сложности. Эксперт в интеграции LLM, создании трейдинг-ботов и разработке Telegram Mini Apps.',
  ],
  social: {
    github: 'https://github.com/Glour',
    linkedin: 'https://www.linkedin.com/in/aleksandr-bogdanov-dev',
    telegram: 'https://t.me/ne_stoit_togo',
  },
  stats: [
    { label: 'Проектов', value: '30+' },
    { label: 'Telegram-ботов', value: '30+' },
    { label: 'Tech Lead опыт', value: '✓' },
    { label: 'Команда', value: '2+ Dev' },
  ],
};

// Интерфейс проекта
export interface Project {
  title: string;
  role: string;
  description: string;
  features?: string[];
  tech: string[];
  category: 'trading' | 'ai' | 'telegram' | 'blockchain' | 'fullstack' | 'automation';
  budget?: string;
  period?: string;
  highlight?: boolean; // для топовых проектов
}

// ВСЕ ПРОЕКТЫ
export const allProjects: Project[] = [
  // ТОПОВЫЕ ПРОЕКТЫ (показываются на главной)
  {
    title: 'Crypto Arbitrage Platform',
    role: 'Архитектор системы, Backend/Engine Developer',
    category: 'trading',
    description: 'Платформа для поиска арбитражных возможностей между 20+ CEX и DEX в реальном времени',
    features: [
      'Сбор данных с 20+ CEX через REST и WebSocket',
      'Интеграция DEX (Dexscreener, Jupiter, 1inch, Uniswap)',
      'Spot↔Spot, Spot↔DEX, Futures↔Spot, Cross-chain арбитраж',
      'Учёт комиссий, глубины стакана, token tax',
      'Telegram-уведомления, WebSocket API, Web-интерфейс',
    ],
    tech: ['Python', 'asyncio', 'httpx', 'WebSocket', 'Redis', 'PostgreSQL', 'Aiogram', 'FastAPI', 'Prometheus', 'Grafana'],
    highlight: true,
  },
  {
    title: 'Auto Trading Bot',
    role: 'Архитектор, Core Execution Logic',
    category: 'trading',
    description: 'Трейдинг-бот для автоматического открытия и управления фьючерсными позициями (MEXC, Gate)',
    features: [
      'Агрегация сигналов из API и Telegram-каналов',
      'Защита от дублей (1 токен — 1 позиция)',
      'Быстрая реакция на листинги и импульсные события',
      'SL/TP/trailing stop, WebSocket-мониторинг',
      'Поддержка нескольких аккаунтов, изоляция через прокси',
    ],
    tech: ['Python', 'asyncio', 'WebSocket', 'Redis', 'PostgreSQL', 'Telegram Bot API'],
    highlight: true,
  },
  {
    title: 'ChatGPT Telegram Bot (@AI_apps_bot)',
    role: 'Lead Developer / Tech Lead',
    category: 'ai',
    description: 'Комплексный AI-бот с генерацией контента и анализом документов',
    features: [
      'Генерация текста, изображений, видео, голоса',
      'Учебные работы (рефераты, курсовые, дипломы)',
      'Анализ DOCX, XLSX, TXT',
      'Интеграция 4+ платежных провайдеров',
      'Полный рефакторинг (2300+ строк → модульная архитектура)',
    ],
    tech: ['Python', 'Aiogram', 'OpenAI API (GPT-4o)', 'PostgreSQL', 'DALL-E 3', 'YooKassa', 'UnitPay', 'Telegram Stars'],
  },

  // ОСНОВНЫЕ ПРОЕКТЫ
  {
    title: 'MEXC Trade Synchronizer',
    role: 'Архитектор и реализация',
    category: 'trading',
    description: 'Бот для синхронизации сделок между мейн-аккаунтом и N субаккаунтами с минимальной задержкой (MEXC Futures)',
    features: [
      'Подключение десятков аккаунтов (web_key + proxy)',
      'Зеркалирование: market/limit ордера, отмена, закрытие позиций',
      'Управление через Telegram-команды',
      'Уведомления о сбоях proxy или web_key',
      'Минимальная задержка между мейн- и субаккаунтами',
    ],
    tech: ['Python', 'WebSocket', 'asyncio', 'Telegram Bot API', 'Proxy'],
    period: '2 месяца',
    highlight: true,
  },
  {
    title: 'Magnet - Dating/Networking Mini App',
    role: 'Lead Backend Developer / Tech Lead',
    category: 'telegram',
    description: 'Backend для Telegram Mini App с умным поиском специалистов и real-time обновлениями',
    features: [
      'Аутентификация через Telegram InitData',
      'Elasticsearch для умного поиска',
      'WebSocket для real-time обновлений',
      'Оптимизация запросов (с 15s до приемлемых значений)',
      'Настройка dev/prod окружений',
    ],
    tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy 2.*', 'Redis', 'Elasticsearch', 'Aiogram 3.*', 'WebSockets', 'Docker', 'Nginx'],
    highlight: true,
  },
  {
    title: 'BOP (Battle of Planets)',
    role: 'Backend Developer / Team Lead',
    category: 'blockchain',
    description: '3D карточная космическая игра с комплексной игровой логикой',
    features: [
      'Система боев и лидербордов с real-time обновлениями',
      'Пулы, премиум, дейли боксы',
      'Реферальная система, Battle Pass, экспедиции',
      'Админ-панель с множеством настроек',
      'Руководство backend отделом',
    ],
    tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'SQLAdmin', 'Docker', 'Nginx', 'TON blockchain', 'JWT', 'CI/CD'],
    period: '2 месяца',
  },
  {
    title: 'AI-ассистент ГОСТов (GostAssistent.ru)',
    role: 'AI/ML Developer, Backend Developer',
    category: 'ai',
    description: 'AI-ассистент для поиска в технической документации с векторным поиском',
    features: [
      'Микросервисная архитектура',
      'Векторный поиск и RAG',
      'Настройка промптов',
      'Оптимизация векторных индексов',
      'Снижение стоимости API',
    ],
    tech: ['GPT-4-turbo-128k', 'OpenAI API', 'Chroma', 'ClickHouse', 'Ollama', 'Gemma 2', 'Python'],
    highlight: true,
  },
  {
    title: 'Sqrow Idle - Эко-френдли Майнинг',
    role: 'Backend Developer',
    category: 'telegram',
    description: 'Backend для майнинг-приложения с системой стейкинга, пулами, реферальной программой',
    tech: ['FastAPI', 'Flask', 'PostgreSQL', 'Docker', 'Nginx', 'JWT', 'Telegram Bot API', 'Telegram Mini App'],
    features: ['Создан полноценный backend для бота и веб-приложения', 'Разработан RESTful API', 'Реализованы уникальные системы защиты'],
  },
  {
    title: 'Веб-сервис для генерации рифм',
    role: 'Fullstack Developer',
    category: 'fullstack',
    description: 'Многопользовательский сервис для генерации рифм через 7 нейросетей',
    tech: ['Python', 'OpenAI', 'Claude', 'YaGPT', 'Mistral', 'Gemini', 'Web scraping', 'Yandex DataLens'],
    features: ['Интеграция 7+ API', 'Парсинг ~4000 четверостиший', 'Система поиска похожих строк'],
  },
  {
    title: 'Radugadesign Brief Bot',
    role: 'Backend Developer',
    category: 'automation',
    description: 'Бот для приема брифов с автоматизацией воркфлоу',
    tech: ['Python', 'Aiogram', 'Google Drive API', 'AmoCRM API', 'PostgreSQL'],
    features: ['Полная автоматизация приема заявок с валидацией', 'Интеграция CRM и уведомлений'],
  },
  {
    title: 'Сервис генерации описаний для Wildberries',
    role: 'Backend Developer / DevOps',
    category: 'ai',
    description: 'Автоматическая генерация описаний товаров с использованием GPT-3.5-turbo',
    tech: ['Python', 'ChatGPT API', 'PostgreSQL', 'Telegram Bot API'],
    features: ['Миграция на новые версии API', 'Решение проблем с блокировками', 'Оптимизация расходов'],
  },
  {
    title: 'Sqrow Chain (Blockchain)',
    role: 'Backend/Blockchain Developer',
    category: 'blockchain',
    description: 'Блокчейн решение на базе Bitcoin, работа с протоколом Runes, собственный Layer 2',
    tech: ['Python', 'Hardhat', 'Bitcoin', 'Runes protocol', 'Layer 2'],
    features: ['Изучение Web3/blockchain с нуля', 'Разработка архитектуры чейна'],
  },
  {
    title: 'Generative Gallery Bot (Rotor Reviews)',
    role: 'Backend Developer',
    category: 'telegram',
    description: 'Бот для сбора отзывов с модерацией и публикацией',
    tech: ['Python', 'Telegram Bot API', 'PostgreSQL', 'Yandex DataLens'],
    features: ['Система модерации с голосованием', 'Визуализация данных'],
  },
  {
    title: '@techgenai - Автономная нейросеть',
    role: 'AI Engineer / Backend Developer',
    category: 'ai',
    description: 'Автономная нейросеть для ведения Telegram-канала с полностью автоматической генерацией и публикацией контента',
    tech: ['Python', 'AI/ML', 'Telegram API', 'Autonomous AI'],
    features: ['Полностью автономная система без участия человека'],
  },
  {
    title: 'Fine-tuned ML модели',
    role: 'ML Engineer',
    category: 'ai',
    description: 'Обучение и деплой узкопрофильных моделей на собственных данных',
    tech: ['GPT fine-tuning', 'RAG', 'Custom datasets'],
    features: ['Дообучение моделей для специфических задач'],
  },
  {
    title: 'Traffaldino Bot',
    role: 'Backend Developer',
    category: 'telegram',
    description: 'Бот для создания и управления событиями с проверкой подписок на каналы',
    tech: ['Python', 'Telegram Bot API'],
    features: ['Реализация системы проверки подписок и событий'],
  },
  {
    title: 'Игровой бот Gейм\'онитор',
    role: 'Full-stack Developer',
    category: 'telegram',
    description: 'Бот-тест на зависимость с системой подписки и реферальными ссылками',
    tech: ['Python', 'aiogram'],
    features: ['Быстрая разработка (несколько дней)', 'Персонализированные результаты'],
  },
  {
    title: 'Система мониторинга и отчетности',
    role: 'Backend Developer',
    category: 'automation',
    description: 'Система автоматической отправки ежедневных отчетов на почту с логами, статистикой, мониторингом ошибок',
    tech: ['Python', 'Email отправка', 'Логирование', 'Cron jobs'],
    features: ['Автоматизация контроля работы сервисов', 'Раннее обнаружение проблем'],
  },
  {
    title: 'Защита от злоупотреблений API',
    role: 'Backend Developer',
    category: 'automation',
    description: 'Система защиты от автоматических запросов с ограничением 10 запросов в 10 минут на пользователя',
    tech: ['Python', 'Rate limiting', 'User tracking', 'Email notifications'],
    features: ['Предотвращение несанкционированного использования API', 'Предотвращение перерасхода бюджета'],
  },
  {
    title: 'CRM-интеграции',
    role: 'Backend Developer',
    category: 'automation',
    description: 'Интеграция бизнес-ботов и сервисов с CRM-системами',
    tech: ['Python', 'Bitrix24', 'AmoCRM', 'REST API', 'Webhooks'],
    features: ['Успешная интеграция с Bitrix24 и AmoCRM'],
  },
  {
    title: 'Рекламный бот-ассистент',
    role: 'Backend Developer',
    category: 'telegram',
    description: 'Бот для управления рекламой в Telegram с интеграцией Яндекс.Директ, статистикой, массовыми рассылками',
    tech: ['Python', 'Telegram Bot API', 'Yandex Direct API', 'Google Sheets API'],
    features: ['Реализация сложной системы статистики и аналитики'],
  },
  {
    title: 'Бот доставки (@rs_dostavka_bot)',
    role: 'Consultant / Debugger',
    category: 'telegram',
    description: 'Диагностика проблем производительности, анализ архитектуры бота для курьерской службы',
    tech: ['Python', 'Telegram Bot API', 'RetailCRM API'],
    features: ['Выявление проблем с роутингом и архитектурой', 'Предложение решений по оптимизации'],
  },
];

// Топовые проекты для главной страницы
export const featuredProjects = allProjects.filter(p => p.highlight);

// Технический стек
export const techStack = {
  languages: ['Python 3.12+', 'TypeScript', 'JavaScript', 'SQL'],
  backend: ['FastAPI', 'Flask', 'SQLAlchemy 2.*', 'Pydantic', 'Alembic'],
  ai: ['Langchain', 'OpenAI API', 'Anthropic Claude', 'Mistral API', 'Ollama', 'RAG'],
  telegram: ['Aiogram 3.*', 'python-telegram-bot', 'Telethon', 'Pyrogram'],
  frontend: ['Next.js', 'React'],
  databases: ['PostgreSQL', 'Redis', 'MongoDB', 'SQLite', 'ClickHouse', 'Chroma', 'Elasticsearch'],
  devops: ['Docker', 'Docker Compose', 'Nginx', 'Git/GitHub', 'GitHub Actions', 'CI/CD'],
  cloud: ['Yandex Cloud', 'Google Cloud', 'Timeweb Cloud', 'Fly.io', 'Vercel', 'Render.com'],
  blockchain: ['Hardhat', 'TON Blockchain', 'Bitcoin L2', 'Smart Contracts'],
  monitoring: ['Prometheus', 'Grafana', 'Dozzle'],
  other: ['Kafka', 'Kubernetes', 'WebSockets', 'Scrapy', 'Selenium', 'Swagger/OpenAPI'],
};

// Ключевые навыки
export const keySkills = [
  {
    category: 'Backend Development',
    skills: [
      'Python Web Development (FastAPI, Flask)',
      'REST API Design & Architecture',
      'Микросервисная архитектура',
      'Асинхронное программирование (asyncio)',
      'Database Design & Optimization',
      'WebSocket & Real-time системы',
      'Authentication & Security (JWT)',
    ],
  },
  {
    category: 'AI/ML Integration',
    skills: [
      'Интеграция LLM (GPT-4, Claude, YaGPT, Gemini)',
      'RAG системы и векторный поиск',
      'Fine-tuning нейросетей',
      'Prompt engineering',
      'Векторные БД (Pinecone, Milvus, Chroma)',
    ],
  },
  {
    category: 'Telegram Ecosystem',
    skills: [
      'Telegram Bot Development (Aiogram 3.x)',
      'Telegram Mini Apps',
      'User Bot Development (Telethon/Pyrogram)',
      'WebApp API интеграция',
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    skills: [
      'Docker & Containerization',
      'Linux server administration',
      'CI/CD (GitHub Actions)',
      'Nginx configuration',
      'Мониторинг (Prometheus, Grafana)',
    ],
  },
  {
    category: 'Blockchain',
    skills: [
      'Bitcoin L2 решения',
      'Smart Contracts',
      'TON Blockchain',
      'Wallet Connect integration',
    ],
  },
];

// Достижения
export const achievements = [
  '30+ Telegram-ботов различной сложности',
  'Руководство командой от 2 разработчиков',
  'Полный рефакторинг legacy проектов (2300+ строк → модульная архитектура)',
  'Оптимизация производительности (15s → приемлемые значения)',
  'Работа с большими бюджетами на проект',
  'Опыт Tech Lead на нескольких проектах',
  'Быстрый деплой (backend за 1 день)',
];

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  type: 'remote' | 'onsite' | 'hybrid';
}

export const experience: Experience[] = [];
export const education = [];
export const certifications = [];
