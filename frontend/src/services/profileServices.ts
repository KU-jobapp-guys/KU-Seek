import type { Profile, CompanyProfile, StudentProfile, ProfessorProfile } from "@/types/profileType"

export async function fetchUserProfile(userType: string): Promise<Profile> {  
  if (userType === 'student') {
    return {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      about: 'Computer Engineering student',
      location: 'Bangkok, Thailand',
      email: 'john.doe@student.ku.th',
      contact_email: 'john.doe@student.ku.th',
      gender: 'M',
      age: 21,
      user_type: 'student',
      profilePhoto: '',
      bannerPhoto: '',
      phone_number: '1231231234',
      is_verified: true,
      nisit_id: '6666666666',
      gpa: 3.75,
      skills: ['JavaScript', 'Vue.js'],
      interests: 'Web Development',
      education: [{
        curriculum_name: 'Bachelor of Engineering',
        university: 'Kasetsart University',
        major: 'Computer Engineering',
        year_of_study: 3,
        graduate_year: 2025
      }]
    } as StudentProfile
  } else if (userType === 'company') {
    return {
      id: '1',
      name: 'TechCorp Solutions',
      first_name: 'John',
      last_name: 'Doe',
      gender: 'M',
      type: 'company',
      website: 'https://techcorp.com',
      industry: 'Technology',
      workFields: ['Software Development', 'AI'],
      location: 'Bangkok',
      fullLocation: 'Bangkok, Thailand',
      size: '51-200 employees',
      email: 'jane.smith@techcorp.com',
      contact_email: 'jane.smith@techcorp.com',
      about: 'Leading tech company',
      bannerPhoto: '',
      profilePhoto: ''
    } as CompanyProfile
  } else {
    return {
      id: '1',
      first_name: 'Dr. Alex',
      last_name: 'Johnson',
      about: 'Associate Professor in Computer Engineering',
      location: 'Bangkok, Thailand',
      email: 'alex.johnson@ku.th',
      contact_email: 'alex.johnson@ku.th',
      gender: '',
      age: 45,
      profilePhoto: '',
      bannerPhoto: '',
      phone_number: '1231231234',
      is_verified: true,
      skills: ['Machine Learning', 'Data Science'],
      department: 'Computer Engineering',
      position: 'Associate Professor',
      office_location: 'Building 3, Room 301',
      research_interest: 'Artificial Intelligence',
      description: 'Researcher in AI and ML'
    } as ProfessorProfile
  }
}

export async function updateUserProfile(data: Partial<Profile>): Promise<void> {
  // Call API to update user profile
  console.log('Updating profile with data:', data)
}