export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  category: 'trading' | 'backend' | 'fullstack' | 'ml' | 'infrastructure';
  github?: string;
  demo?: string;
  image: string;
  year: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'MEXC Trading Bot',
    description: 'Automated cryptocurrency trading system with advanced order management',
    longDescription: 'A sophisticated automated trading bot for the MEXC cryptocurrency exchange. Features real-time market data processing, intelligent order execution, portfolio balancing algorithms, and comprehensive risk management. Built with async Python for high-performance concurrent operations.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'MEXC API', 'asyncio', 'WebSocket', 'Redis', 'Docker'],
    features: [
      'Real-time market data streaming via WebSocket',
      'Automated order management and execution',
      'Dynamic portfolio balancing and rebalancing',
      'Risk management and stop-loss mechanisms',
      'Performance tracking and analytics dashboard',
      'Multi-timeframe technical analysis'
    ],
    category: 'trading',
    github: 'https://github.com/yourusername/mexc-trading-bot',
    image: '/images/projects/mexc-bot.jpg',
    year: '2023',
    metrics: [
      { label: 'Uptime', value: '99.8%' },
      { label: 'Trades/day', value: '500+' },
      { label: 'Response time', value: '<50ms' }
    ]
  },
  {
    id: 2,
    title: 'Sync Bot',
    description: 'High-performance async data synchronization service',
    longDescription: 'An asynchronous microservice designed for efficient data synchronization across multiple systems. Implements event-driven architecture with message queues for reliable data propagation. Handles thousands of sync operations per second with intelligent retry mechanisms and error recovery.',
    technologies: ['Python', 'asyncio', 'RabbitMQ', 'PostgreSQL', 'Redis', 'Docker', 'Prometheus'],
    features: [
      'Event-driven data synchronization',
      'Intelligent retry and error handling',
      'Message queue integration for reliability',
      'Real-time sync status monitoring',
      'Configurable sync strategies and filters',
      'Distributed tracing for debugging'
    ],
    category: 'backend',
    github: 'https://github.com/yourusername/sync-bot',
    image: '/images/projects/sync-bot.jpg',
    year: '2023',
    metrics: [
      { label: 'Sync ops/sec', value: '2000+' },
      { label: 'Error rate', value: '<0.1%' },
      { label: 'Data accuracy', value: '99.99%' }
    ]
  },
  {
    id: 3,
    title: 'Magnet Backend',
    description: 'Scalable REST API backend with MongoDB and JWT authentication',
    longDescription: 'A production-ready backend API built with FastAPI and MongoDB. Features comprehensive JWT-based authentication, role-based access control, and extensive OpenAPI documentation. Designed with scalability and maintainability in mind, following clean architecture principles.',
    technologies: ['FastAPI', 'MongoDB', 'JWT', 'Python', 'Docker', 'Nginx', 'Pydantic'],
    features: [
      'RESTful API with OpenAPI/Swagger docs',
      'JWT authentication and authorization',
      'Role-based access control (RBAC)',
      'MongoDB with optimized indexing',
      'Request validation with Pydantic',
      'Comprehensive unit and integration tests'
    ],
    category: 'backend',
    github: 'https://github.com/yourusername/magnet-backend',
    demo: 'https://api.magnet-demo.com',
    image: '/images/projects/magnet-backend.jpg',
    year: '2022',
    metrics: [
      { label: 'API endpoints', value: '50+' },
      { label: 'Response time', value: '<100ms' },
      { label: 'Test coverage', value: '95%' }
    ]
  },
  {
    id: 4,
    title: 'Market Analytics Platform',
    description: 'Comprehensive financial market analysis platform with ML predictions',
    longDescription: 'A full-featured platform for analyzing financial markets combining real-time data ingestion, historical data analysis, and machine learning-powered predictions. Features interactive dashboards built with React and Chart.js, with a Django backend processing millions of data points daily.',
    technologies: ['Django', 'PostgreSQL', 'Redis', 'Celery', 'React', 'Chart.js', 'scikit-learn', 'Pandas', 'NumPy'],
    features: [
      'Real-time market data ingestion and processing',
      'Machine learning models for price prediction',
      'Interactive dashboards with 20+ chart types',
      'Custom technical indicators and overlays',
      'Backtesting framework for strategies',
      'Email and Telegram alert system',
      'Multi-asset support (stocks, crypto, forex)',
      'Historical data analysis with 5+ years of data'
    ],
    category: 'fullstack',
    github: 'https://github.com/yourusername/market-analytics',
    demo: 'https://market-analytics-demo.com',
    image: '/images/projects/market-analytics.jpg',
    year: '2023',
    metrics: [
      { label: 'Daily users', value: '1,200+' },
      { label: 'Data points/day', value: '5M+' },
      { label: 'Prediction accuracy', value: '73%' }
    ]
  },
  {
    id: 5,
    title: 'Crypto Portfolio Tracker',
    description: 'Multi-exchange portfolio tracking with tax reporting',
    longDescription: 'A comprehensive cryptocurrency portfolio tracker supporting 50+ exchanges. Real-time portfolio valuation via WebSocket connections, automatic transaction import, P&L tracking, and tax report generation. Built with FastAPI backend and React frontend with Material-UI.',
    technologies: ['FastAPI', 'React', 'PostgreSQL', 'WebSocket', 'CoinGecko API', 'Material-UI', 'Python', 'TypeScript'],
    features: [
      'Support for 50+ cryptocurrency exchanges',
      'Real-time portfolio valuation',
      'Automatic transaction import via API',
      'Profit/loss tracking and analytics',
      'Tax report generation (IRS-compliant)',
      'Price alerts via email and push notifications',
      'Historical performance charts',
      'Multi-currency support (USD, EUR, BTC)'
    ],
    category: 'fullstack',
    github: 'https://github.com/yourusername/crypto-portfolio',
    demo: 'https://cryptoportfolio-demo.com',
    image: '/images/projects/crypto-portfolio.jpg',
    year: '2024',
    metrics: [
      { label: 'Tracked exchanges', value: '50+' },
      { label: 'Active users', value: '3,500+' },
      { label: 'Total assets tracked', value: '$12M+' }
    ]
  },
  {
    id: 6,
    title: 'High-Frequency Trading Simulator',
    description: 'HFT strategy simulator with backtesting engine',
    longDescription: 'A sophisticated simulator for testing high-frequency trading strategies using historical market data. Implements tick-level simulation with realistic market microstructure, including order book dynamics, latency modeling, and slippage. Provides detailed performance metrics and strategy optimization tools.',
    technologies: ['Python', 'NumPy', 'Pandas', 'Backtesting.py', 'Plotly', 'TA-Lib', 'Cython'],
    features: [
      'Tick-level market simulation',
      'Order book dynamics modeling',
      'Latency and slippage simulation',
      'Performance metrics (Sharpe, Sortino, max drawdown)',
      'Strategy parameter optimization',
      'Multi-strategy backtesting',
      'Interactive performance visualization',
      'Historical data for 100+ instruments'
    ],
    category: 'trading',
    github: 'https://github.com/yourusername/hft-simulator',
    image: '/images/projects/hft-simulator.jpg',
    year: '2023',
    metrics: [
      { label: 'Strategies tested', value: '150+' },
      { label: 'Ticks/second', value: '100K+' },
      { label: 'Backtest speed', value: '50x realtime' }
    ]
  },
  {
    id: 7,
    title: 'Blockchain Explorer API',
    description: 'RESTful and GraphQL API for blockchain transaction analysis',
    longDescription: 'A high-performance API for querying and analyzing blockchain data. Indexes Ethereum blockchain data including blocks, transactions, and smart contract events. Provides both REST and GraphQL endpoints for flexible data querying. Used by analytics platforms and trading applications.',
    technologies: ['FastAPI', 'PostgreSQL', 'Web3.py', 'GraphQL', 'Redis', 'Elasticsearch', 'Docker', 'Ethereum'],
    features: [
      'Real-time blockchain data indexing',
      'REST and GraphQL APIs',
      'Wallet transaction history and analytics',
      'Smart contract event tracking',
      'Token balance tracking (ERC-20, ERC-721)',
      'Advanced search with Elasticsearch',
      'Rate limiting and API key management',
      'Comprehensive API documentation'
    ],
    category: 'backend',
    github: 'https://github.com/yourusername/blockchain-explorer',
    demo: 'https://api.blockexplorer-demo.com',
    image: '/images/projects/blockchain-explorer.jpg',
    year: '2024',
    metrics: [
      { label: 'Blocks indexed', value: '18M+' },
      { label: 'API requests/day', value: '500K+' },
      { label: 'Query latency', value: '<200ms' }
    ]
  },
  {
    id: 8,
    title: 'Automated Reporting System',
    description: 'Scheduled report generation and distribution platform',
    longDescription: 'An enterprise reporting system that automates the generation and distribution of business reports. Supports multiple data sources, custom templates, and various output formats (PDF, Excel, CSV). Features a web interface for report configuration and scheduling, with email delivery integration.',
    technologies: ['Flask', 'PostgreSQL', 'Celery', 'WeasyPrint', 'Jinja2', 'Redis', 'SMTP', 'Python'],
    features: [
      'Flexible report scheduling (cron-style)',
      'Multiple data source connectors',
      'Custom template engine with Jinja2',
      'PDF, Excel, and CSV export formats',
      'Email delivery with attachments',
      'Report history and versioning',
      'Interactive web configuration UI',
      'Role-based access control'
    ],
    category: 'backend',
    github: 'https://github.com/yourusername/reporting-system',
    image: '/images/projects/reporting-system.jpg',
    year: '2022',
    metrics: [
      { label: 'Reports/month', value: '10,000+' },
      { label: 'Data sources', value: '15+' },
      { label: 'Generation time', value: '<5s' }
    ]
  },
  {
    id: 9,
    title: 'Microservices Trading Infrastructure',
    description: 'Distributed trading system with microservices architecture',
    longDescription: 'A production-grade microservices architecture for cryptocurrency trading. Includes services for market data, order execution, risk management, and portfolio management. Built with Docker and Kubernetes for orchestration, using gRPC for inter-service communication. Features distributed tracing, centralized logging, and auto-scaling.',
    technologies: ['Python', 'Docker', 'Kubernetes', 'gRPC', 'RabbitMQ', 'PostgreSQL', 'Prometheus', 'Grafana', 'Istio'],
    features: [
      'Service mesh with Istio',
      'gRPC for high-performance RPC',
      'Distributed tracing with Jaeger',
      'Centralized logging with ELK stack',
      'Auto-scaling based on load',
      'Circuit breakers and rate limiting',
      'Blue-green deployment strategy',
      'Comprehensive monitoring and alerting'
    ],
    category: 'infrastructure',
    github: 'https://github.com/yourusername/trading-microservices',
    image: '/images/projects/microservices.jpg',
    year: '2024',
    metrics: [
      { label: 'Services', value: '12' },
      { label: 'Requests/sec', value: '50K+' },
      { label: 'Uptime', value: '99.95%' }
    ]
  },
  {
    id: 10,
    title: 'ML Price Prediction Service',
    description: 'Machine learning service for cryptocurrency price forecasting',
    longDescription: 'A production ML service for predicting cryptocurrency prices using LSTM neural networks. Features model versioning, A/B testing, and real-time inference via REST API. Includes data pipeline for feature engineering, model training infrastructure, and monitoring for model drift. Achieves competitive accuracy on short-term predictions.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'FastAPI', 'PostgreSQL', 'Redis', 'MLflow', 'Apache Airflow'],
    features: [
      'LSTM-based price prediction models',
      'Feature engineering pipeline',
      'Model versioning with MLflow',
      'A/B testing framework for models',
      'Real-time inference API',
      'Model drift detection and alerts',
      'Automated retraining pipeline',
      'Prediction confidence intervals'
    ],
    category: 'ml',
    github: 'https://github.com/yourusername/ml-price-prediction',
    demo: 'https://ml-predict-demo.com',
    image: '/images/projects/ml-prediction.jpg',
    year: '2024',
    metrics: [
      { label: 'Model accuracy', value: '76%' },
      { label: 'Predictions/day', value: '100K+' },
      { label: 'Inference time', value: '<20ms' }
    ]
  }
];

export const projectCategories = [
  { value: 'all', label: 'All Projects' },
  { value: 'trading', label: 'Trading Systems' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'ml', label: 'Machine Learning' },
  { value: 'infrastructure', label: 'Infrastructure' },
];
