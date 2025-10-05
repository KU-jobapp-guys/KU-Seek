import type { ProfessorProfile } from '@/types/professorType'

export const mockProfessor: ProfessorProfile[] = [
  {
    id: '1',
    first_name: 'Anan',
    last_name: 'Srisawat',
    about:
      'Professor of Computer Science specializing in Artificial Intelligence and Machine Learning. With over 15 years of teaching and research experience, she has contributed extensively to the fields of deep learning, natural language processing, and intelligent systems. Her work bridges theory and real-world applications, focusing on how AI can be used to solve complex societal challenges. She is passionate about mentoring students, fostering innovation, and building interdisciplinary collaborations that push the boundaries of technology.',
    location: 'Bangkok, Thailand',
    contact_email: 'anan.srisawat@university.ac.th',
    gender: 'Male',
    age: 45,
    profilePhoto: '/mockImages/cat_crying.jpg',
    bannerPhoto: '/mockImages/mockBg.jpg',
    phone_number: '+66-812345678',
    is_verified: true,
    skills: ['Machine Learning', 'Deep Learning', 'Data Mining', 'Python'],
    department: 'Computer Engineering',
    position: 'Associate Professor',
    office_location: 'Building A, Room 502',
    research_interest: 'Artificial Intelligence, Natural Language Processing',
    description:
      'Professor Anan has over 20 years of experience in teaching and research in AI. He has published more than 50 papers in top-tier conferences.',
  },
  {
    id: '2',
    first_name: 'Sudarat',
    last_name: 'Thongchai',
    about: 'Researcher in Renewable Energy Systems.',
    location: 'Chiang Mai, Thailand',
    contact_email: 'sudarat.thongchai@university.ac.th',
    gender: 'Female',
    age: 39,
    profilePhoto: '/images/professors/sudarat.jpg',
    bannerPhoto: '/images/banners/energy_research.jpg',
    phone_number: '+66-899876543',
    is_verified: false,
    skills: ['Solar Energy', 'Smart Grid', 'IoT for Energy', 'Sustainability'],
    department: 'Electrical Engineering',
    position: 'Assistant Professor',
    office_location: 'Building B, Room 210',
    research_interest: 'Renewable Energy, Smart Grid, Internet of Things',
    description:
      'Dr. Sudarat focuses on applying IoT technologies in renewable energy systems to enhance efficiency and sustainability.',
  },
]
