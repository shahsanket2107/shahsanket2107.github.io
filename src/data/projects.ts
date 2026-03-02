export interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: 'TeamTurbo.io',
    description: 'AI-Native Build Engine platform gateway with cross-domain OAuth and container-based workspace provisioning.',
    longDescription: 'Built the entire gateway and user-facing platform for the world\'s first AI-Native Build Engine. Implemented centralized user management, cross-domain OAuth, workspace provisioning via container instances, team management, and subscription plan management. Grew to 50+ users and 15 active workspaces.',
    technologies: ['Node.js', 'OAuth', 'Docker', 'Google Analytics', 'SEO'],
    featured: true,
  },
  {
    title: 'Maritime AI Demurrage Calculator',
    description: 'Multi-agent AI system automating maritime demurrage cost calculations using Gemini and Claude APIs.',
    longDescription: 'End-to-end automated system parsing maritime documents (Statements of Facts, CP Terms), extracting time events, validating data, and calculating demurrage costs. Uses multi-agent architecture with different AI agents handling document parsing, data extraction, validation, and calculation. Custom Document AI models trained on Google\'s platform.',
    technologies: ['Python', 'TypeScript', 'Gemini API', 'Claude API', 'Document AI', 'Docker'],
    featured: true,
  },
  {
    title: 'RAG-Based Codebase Analyzer',
    description: 'Semantic relationship mapper for large monolith codebases — ask questions, get exact files and changes.',
    longDescription: 'Built to make sense of a massive monolith codebase with thousands of disconnected modules. The system maps semantic relationships between all files and modules, building a knowledge graph of how everything connects. You can ask natural language questions like "where is this implemented?" or "how do I change this?" and it points you to the exact files and suggests the changes — all augmented by an LLM that understands the full codebase context.',
    technologies: ['Python', 'Gemini API', 'ChromaDB', 'NetworkX', 'FastAPI', 'Docker'],
    featured: true,
  },
  {
    title: 'LeetSummarizer',
    description: 'Chrome extension automating LeetCode submission summarization using Airflow-orchestrated ETL pipelines.',
    longDescription: 'Chrome extension that scrapes LeetCode submission data, processes it through ETL pipelines orchestrated by Apache Airflow, and generates AI-powered summaries using Vertex AI. Full MLOps pipeline with data scraping, processing, and LLM-based summary generation.',
    technologies: ['Node.js', 'Airflow', 'Docker', 'Google Cloud', 'Vertex AI'],
    featured: true,
  },
  {
    title: 'Vessel Verify',
    description: 'Carfax-inspired boat history platform with web scraping and data aggregation from multiple sources.',
    longDescription: 'Led development of a comprehensive boat history reporting platform. Implemented advanced search, data visualization components, payment processing, and web scrapers aggregating data from multiple sources to generate detailed boat history reports.',
    technologies: ['React', 'Node.js', 'Express', 'Docker', 'Firestore'],
    featured: false,
  },
  {
    title: 'TexasHomes for Sale',
    description: 'Real estate listings website built with React, Node.js, and Google Cloud services.',
    longDescription: 'Full-stack real estate platform for Texas property listings. Built with React frontend and Node.js backend, leveraging multiple Google Cloud services for scalable infrastructure and data management.',
    technologies: ['React', 'Node.js', 'Google Cloud', 'Maps API'],
    featured: false,
  },
  {
    title: 'Stock Trading Application',
    description: 'Portfolio management tool built with pure OOP design paradigms — no AI, all design patterns.',
    longDescription: 'Built for the Programming Design Paradigm course at Northeastern. Implements stock trading functionality using core OOP concepts including design patterns, SOLID principles, and clean architecture. Focuses on software design quality rather than AI/ML.',
    technologies: ['Java', 'OOP', 'Design Patterns', 'MVC'],
    featured: false,
  },
  {
    title: 'Mini Search Engine',
    description: 'Full IR system with web crawling, custom indexing, PageRank, HITS, and ML-based ranking.',
    longDescription: 'Built a complete information retrieval system across 8 assignments: Elasticsearch indexing with 6 retrieval models (BM25, TF-IDF, etc.), custom inverted index, web crawler (30K+ documents), PageRank and HITS link analysis, relevance evaluation, ML-based learning-to-rank, spam classification, and LDA topic modeling with clustering.',
    technologies: ['Python', 'Elasticsearch', 'ML/NLP', 'PageRank', 'LDA'],
    featured: false,
  },
  {
    title: 'Algorithmic Trading System',
    description: 'Markov-based signal generation for Chinese commodity markets using the Wolverine framework.',
    longDescription: 'Developing algorithmic trading strategies for Chinese commodity exchanges (DCE, SHFE, CZCE). Uses Markov principles for probabilistic modeling and stateless signal generation, integrated with the Wolverine Operating System framework.',
    technologies: ['Python', 'Markov Models', 'Wolverine Framework'],
    featured: false,
  },
];
