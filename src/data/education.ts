export interface Education {
  institution: string;
  degree: string;
  field: string;
  gpa: string;
  gpaMax: string;
  location: string;
  startDate: string;
  endDate: string;
  coursework?: string[];
}

export const education: Education[] = [
  {
    institution: 'Northeastern University',
    degree: 'Master of Science',
    field: 'Computer Science',
    gpa: '4.0',
    gpaMax: '4.0',
    location: 'Boston, MA',
    startDate: '2022',
    endDate: '2024',
    coursework: [
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
    institution: 'Nirma University',
    degree: 'B.Tech',
    field: 'Computer Science & Engineering',
    gpa: '8.68',
    gpaMax: '10',
    location: 'Ahmedabad, India',
    startDate: '2018',
    endDate: '2022',
    coursework: [
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
];
