export interface Experience {
  company: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Time Dynamics Inc.',
    role: 'Software Engineer',
    type: 'Full-time',
    location: 'Houston, TX',
    startDate: 'Oct 2024',
    endDate: 'Present',
    highlights: [
      'Architected an AI-powered maritime demurrage calculator using multi-agent architecture with Gemini and Claude APIs, training custom Document AI models to parse Statements of Facts and automate cost calculations.',
      'Built the teamturbo.io platform gateway with cross-domain OAuth, workspace provisioning via container instances, and team management — grew to 50+ users across 15 active workspaces.',
      'Developing algorithmic trading strategies using Markov principles and stateless signal generation for Chinese commodity markets (DCE, SHFE, CZCE).',
      'Maintained and enhanced P3 energy trading platform for Petrochina America, implementing Mark-to-Market pricing and automated settlements.',
    ],
    technologies: ['Python', 'TypeScript', 'Node.js', 'Ruby on Rails', 'Docker', 'Gemini API', 'Claude API', 'Document AI'],
  },
  {
    company: 'Pairbo',
    role: 'Software Engineer',
    type: 'Part-time',
    location: 'Remote',
    startDate: 'Sep 2024',
    endDate: 'Feb 2025',
    highlights: [
      'Contributed to platform growth from 0 to 10+ business partnerships, building a Shopify-integrated personalized greeting card platform.',
      'Built backend services using Node.js and Express for remote print job management and an admin dashboard for order tracking and operational insights.',
    ],
    technologies: ['Node.js', 'Express.js', 'React', 'Shopify API'],
  },
  {
    company: 'CarGurus',
    role: 'Software Engineering Co-op',
    type: 'Platform as a Service',
    location: 'Boston, MA',
    startDate: 'Jul 2023',
    endDate: 'Dec 2023',
    highlights: [
      'Implemented a Kubernetes Job-backed remote build feature for an internal developer platform CLI tool, increasing build speed by 10%.',
      'Developed a Kubernetes operator that standardized microservices deployment, reducing engineering support costs by 2 weeks/month.',
      'Orchestrated container node migration from AWS Europe to Rundeck Servers, reducing costs by $2.5k/month.',
      'Implemented Slackbot-driven dev environment cleanup that reduced cloud expenditures by 45%.',
    ],
    technologies: ['Go', 'Kubernetes', 'Docker', 'AWS', 'Helm', 'Concourse CI'],
  },
  {
    company: 'Oracle',
    role: 'Software Engineering Intern',
    type: 'Internship',
    location: 'Bangalore, India',
    startDate: 'Jan 2022',
    endDate: 'Jul 2022',
    highlights: [
      'Implemented Global Egress Rate Limiting for Verizon\'s 5G Service Communication Proxy using Spring Boot and Oracle Coherence federated cache.',
      'Achieved sub-0.1% message loss while synchronizing rate limits across multiple SCPs within 5% of target thresholds.',
      'Conducted comprehensive testing achieving near 100% code coverage.',
    ],
    technologies: ['Java', 'Spring Boot', 'Oracle Coherence', '5G/SCP'],
  },
  {
    company: 'WeLocal',
    role: 'Co-Founder & Full Stack Developer',
    type: 'Startup',
    location: 'Ahmedabad, India',
    startDate: 'May 2020',
    endDate: 'Jan 2022',
    highlights: [
      'Co-founded a mobile and web platform connecting 600+ customers in tier-3 Indian cities with local merchants during COVID-19.',
      'Leveraged AWS services (EC2, S3, CloudFront) for scalable content delivery and developed a real-time inventory management system.',
    ],
    technologies: ['React', 'Node.js', 'Flutter', 'AWS', 'MySQL'],
  },
];
