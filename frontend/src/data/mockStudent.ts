import type { StudentProfile } from '@/types/studentType'

export const mockStudents: StudentProfile[] = [
  {
    user_id: '1',
    first_name: 'Ananya',
    last_name: 'Suksa',
    about:
      'I am a passionate software developer with 3+ years of experience building scalable web and mobile applications. Skilled in modern frameworks, backend API design, and cloud integration. I enjoy solving complex problems, collaborating in agile teams, and continuously learning new technologies to deliver high-quality software.',
    location: 'Bangkok, Thailand',
    contact_email: 'ananya.suksa@example.com',
    gender: 'Female',
    age: 21,
    user_type: 'student',
    profile_img: '/mockImages/cat_crying.jpg',
    banner_img: '/mockImages/mockBg.jpg',
    phone_number: '+66 912345678',
    is_verified: true,
    nisit_id: '6301234567',
    gpa: 3.75,
    skills: ['JavaScript', 'Python', 'Vue.js', 'React', 'SQL'],
    interests:
      'Artificial Intelligence, Machine Learning, Data Science, Natural Language Processing, Computer Vision, Algorithm Design, Competitive Programming, Robotics, Cybersecurity, Cloud Computing, Software Engineering, Open Source Contribution, Quantum Computing, Bioinformatics, Human-Computer Interaction',
    education: [
      {
        type: 'Bachelor',
        curriculum_name: 'Computer Science',
        university: 'Bangkok University',
        major: 'Software Engineering',
        year_of_study: new Date('2022-08-01'),
        graduate_year: new Date('2026-05-31'),
      },
      {
        type: 'Master',
        curriculum_name: 'Exchange Program',
        university: 'University of Tokyo',
        major: 'Computer Science',
        year_of_study: new Date('2023-01-01'),
        graduate_year: new Date('2023-07-31'),
      },
    ],
  },
  {
    user_id: '2',
    first_name: 'Krit',
    last_name: 'Phan',
    about: 'Data science enthusiast, enjoys machine learning projects and algorithm challenges.',
    location: 'Chiang Mai, Thailand',
    contact_email: 'krit.phan@example.com',
    gender: 'Male',
    age: 22,
    user_type: 'student',
    profile_img: '/mockImages/ghost.png',
    banner_img: '/mockImages/mockBg2.png',
    phone_number: '+66 987654321',
    is_verified: false,
    nisit_id: '6209876543',
    gpa: 3.9,
    skills: ['Python', 'TensorFlow', 'Data Analysis', 'SQL', 'Machine Learning'],
    interests:
      'Artificial Intelligence, Machine Learning, Data Science, Natural Language Processing, Computer Vision, Algorithm Design, Competitive Programming, Robotics, Cybersecurity, Cloud Computing, Software Engineering, Open Source Contribution, Quantum Computing, Bioinformatics, Human-Computer Interaction',
    education: [
      {
        type: 'Bachelor',
        curriculum_name: 'Information Technology',
        university: 'Chiang Mai University',
        major: 'Data Science',
        year_of_study: new Date('2021-08-01'),
        graduate_year: new Date('2025-05-31'),
      },
    ],
  },
]
