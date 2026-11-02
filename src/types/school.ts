export type AccreditationGrade = 'A' | 'B' | 'Unggul';

export interface Facility {
  id: string;
  name: string;
  description: string;
  capacity?: string;
  iconName: string;
}

export interface OrgMember {
  id: string;
  name: string;
  role: string;
  nip: string;
  photoUrl?: string;
}

export interface SchoolProfile {
  name: string;
  shortName: string;
  level: string; // 'Sekolah Menengah Pertama (SMP)'
  npsn: string;
  status: 'Negeri' | 'Swasta';
  accreditation: AccreditationGrade;
  accreditationScore: number;
  curriculum: string; // 'Kurikulum Merdeka'
  foundedYear: number;
  address: {
    street: string;
    subdistrict: string;
    city: string;
    province: string;
    postalCode: string;
  };
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  headmaster: {
    name: string;
    nip: string;
    photoUrl: string;
    greetingTitle: string;
    greetingMessage: string;
  };
  vision: string;
  missions: string[];
  goals: string[];
  coreValues: Array<{
    title: string;
    description: string;
  }>;
  facilities: Facility[];
  organization: OrgMember[];
  heroTagline: string;
  heroSubheadline: string;
  announcements: Array<{
    id: string;
    text: string;
    date: string;
    isUrgent?: boolean;
    active: boolean;
  }>;
}

export interface StaffMember {
  id: string;
  name: string;
  nip: string;
  nuptk?: string;
  roleCategory: 'Pimpinan' | 'Guru Mata Pelajaran' | 'Guru BK' | 'Tenaga Kependidikan';
  position: string; // e.g. 'Kepala Sekolah', 'Wakasek Kurikulum', 'Guru Matematika'
  subject?: string;
  education: string; // e.g. 'S2 Pendidikan Matematika UNY'
  certificationStatus: 'Tersertifikasi Pendidik' | 'Dalam Proses';
  employmentStatus: 'PNS' | 'PPPK' | 'GTT/PTT';
  email: string;
  phone?: string;
  photoUrl: string;
  bio?: string;
  serviceYears: number;
}

export interface ClassGradeRecap {
  grade: string; // 'Kelas VII', 'Kelas VIII', 'Kelas IX'
  totalStudents: number;
  maleCount: number;
  femaleCount: number;
  rombelCount: number;
  classes: Array<{
    name: string; // 'VII-A'
    studentCount: number;
    waliKelas: string;
    room: string;
  }>;
}

export interface StudentAchievement {
  id: string;
  title: string;
  studentName: string;
  classGrade: string;
  competitionName: string;
  level: 'Kabupaten/Kota' | 'Provinsi' | 'Nasional' | 'Internasional';
  year: number;
  medal: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Medali Emas' | 'Medali Perak' | 'Juara Harapan';
  category: 'Sains & Teknologi' | 'Seni & Budaya' | 'Olahraga' | 'Bahasa' | 'Keagamaan' | 'Kepramukaan';
  organizer: string;
  photoUrl?: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  category: 'Karakter & Bela Negara' | 'Olahraga' | 'Seni Budaya' | 'Sains & Robotik' | 'Keagamaan';
  schedule: string;
  mentor: string;
  memberCount: number;
  description: string;
  achievementsHighlight: string;
}

export interface StudentDataState {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  totalClasses: number;
  ratioTeacherStudent: string;
  grades: ClassGradeRecap[];
  achievements: StudentAchievement[];
  extracurriculars: Extracurricular[];
}

export interface SchoolActivity {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'P5 & Karakter' | 'Akademik & Sains' | 'Olahraga & Seni' | 'Kepramukaan' | 'Sosial & Lingkungan';
  date: string;
  author: string;
  imageUrl: string;
  galleryUrls?: string[];
  isPublished: boolean;
  tags: string[];
}

export interface SchoolProgram {
  id: string;
  title: string;
  category: 'Kurikulum Merdeka' | 'Adiwiyata & Lingkungan' | 'Literasi & Digital' | 'Pengembangan Karakter' | 'Klinik Prestasi' | 'PPDB Online';
  targetAudience: string;
  period: string; // e.g. 'Tahun Pelajaran 2026/2027'
  pic: string; // Penanggung Jawab
  status: 'Sedang Berjalan' | 'Terencana' | 'Selesai';
  description: string;
  keyIndicators: string[];
}

export interface AdminUser {
  username: string;
  name: string;
  role: 'Super Admin' | 'Operator Madrasah/Sekolah' | 'Staf Kurikulum';
  email: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  timestamp: string;
  author: string;
}

export type ActiveNavTab = 'beranda' | 'profil' | 'sdm' | 'siswa' | 'kegiatan' | 'program' | 'admin';
