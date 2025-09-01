export interface Job {
  company: string;
  role: string;
  location: string;
  postTime: Date;
  description: string;
  highlights: string[];
  jobType: string;
  skills: string[];
  salary: string;
}


export type FilterKeys = 
| 'role'
| 'tags'
| 'company'
| 'jobLevel'
| 'location'
| 'jobType'