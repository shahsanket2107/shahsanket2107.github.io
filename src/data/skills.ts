export interface SkillCategory {
  category: string;
  description: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    description: 'The foundations I think in',
    icon: 'code',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'GoLang', 'SQL', 'C#', 'R', 'Dart', 'Kotlin'],
  },
  {
    category: 'Frameworks',
    description: 'What I build with daily',
    icon: 'layers',
    skills: ['Spring Boot', 'Node.js', 'Express.js', 'React', 'Django', '.NET', 'Flask', 'RESTful APIs', 'Microservices'],
  },
  {
    category: 'DevOps & Cloud',
    description: 'How I ship and scale things',
    icon: 'cloud',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Jenkins', 'CI/CD', 'Git', 'Terraform', 'Helm', 'Airflow', 'Bash'],
  },
  {
    category: 'AI/ML & Data',
    description: 'Where most of my current work lives',
    icon: 'brain',
    skills: ['LLM Integration', 'Multi-agent Systems', 'Gemini API', 'Claude API', 'Document AI', 'RAG', 'PostgreSQL', 'MySQL'],
  },
];
