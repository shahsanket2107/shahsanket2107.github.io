/** Static profile data. Small enough that a content collection would be overkill. */

export const socials = [
  { label: 'GitHub', href: 'https://github.com/shahsanket2107', icon: 'gh' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sanketshah2107', icon: 'li' },
  { label: 'Email', href: 'mailto:sanket.masters@gmail.com', icon: 'em' },
] as const;

/** public/documents/ is tracked and ships. Source: tessl-devcon/presence/resume/Sanket_Resume.pdf */
export const resumeHref = '/documents/Sanket_Resume.pdf';

export const skills = [
  {
    title: 'Languages',
    note: 'Python and TypeScript are the daily drivers.',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Ruby', 'SQL', 'Swift'],
  },
  {
    title: 'AI and agents',
    note: 'Built before the frameworks existed, so I know what they abstract.',
    items: [
      'Claude Code', 'Sub agents and plugins', 'Hooks and mods', 'Multi agent systems',
      'Knowledge graphs', 'RAG', 'LLM evaluation', 'Claude API', 'Gemini API',
      'Document AI', 'Vector search', 'Apple MLX',
    ],
  },
  {
    title: 'Machine learning',
    note: 'Gradient boosting and honest validation. No deep learning, and I say so.',
    items: [
      'XGBoost', 'scikit-learn', 'Optuna', 'Pandas', 'NumPy', 'SciPy', 'Walk-forward validation', 'Leakage detection',
    ],
  },
  {
    title: 'Backend and platform',
    note: 'Queues, workers, and the boring parts that keep it up at 3am.',
    items: [
      'REST APIs', 'Microservices', 'Event driven architecture', 'RabbitMQ',
      'Redis', 'WebSockets', 'Server sent events', 'OAuth 2.0', 'Rails', 'Express',
      'Spring Boot', 'FastAPI', 'Flask',
    ],
  },
  {
    title: 'Frontend',
    note: 'Production React without a state library, which is fine more often than people think.',
    items: ['React', 'TypeScript', 'Next.js', 'Astro', 'Responsive design', 'Accessibility'],
  },
  {
    title: 'Infrastructure',
    note: 'Enough to own a deploy end to end and not page someone else.',
    items: [
      'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'GitHub Actions',
      'CI/CD', 'Airflow', 'MySQL', 'PostgreSQL', 'Firestore',
    ],
  },
] as const;

export const education = [
  {
    school: 'Northeastern University',
    sub: 'Khoury College of Computer Sciences',
    degree: 'MS, Computer Science',
    grade: '4.0 / 4.0',
    where: 'Boston, MA',
    when: '2022 to 2024',
    courses: [
      'Programming Design Paradigm',
      'Database Management Systems',
      'Algorithms',
      'Data Mining',
      'Distributed Systems',
      'Information Retrieval',
      'Machine Learning',
      'MLOps',
    ],
  },
  {
    school: 'Nirma University',
    sub: 'Institute of Technology',
    degree: 'B.Tech, Computer Science and Engineering',
    grade: '8.68 / 10',
    where: 'Ahmedabad, India',
    when: '2018 to 2022',
    courses: [
      'Data Structures and Algorithms',
      'Machine Learning',
      'Microservices Architecture and Programming',
      'Blockchain',
      'Computer Architecture',
      'Cybersecurity',
      'Web Development',
      'Big Data Analysis',
    ],
  },
] as const;
