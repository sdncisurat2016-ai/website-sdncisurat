import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SchoolProfile,
  StaffMember,
  StudentDataState,
  SchoolActivity,
  SchoolProgram,
  StudentAchievement,
  AdminUser,
  AuditLog,
} from '../types/school';
import {
  INITIAL_SCHOOL_PROFILE,
  INITIAL_STAFF_MEMBERS,
  INITIAL_STUDENT_DATA,
  INITIAL_SCHOOL_ACTIVITIES,
  INITIAL_SCHOOL_PROGRAMS,
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface SchoolContextType {
  profile: SchoolProfile;
  staff: StaffMember[];
  studentData: StudentDataState;
  activities: SchoolActivity[];
  programs: SchoolProgram[];
  auditLogs: AuditLog[];
  adminUser: AdminUser | null;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateProfile: (updated: Partial<SchoolProfile>) => void;
  addAnnouncement: (text: string, isUrgent?: boolean) => void;
  deleteAnnouncement: (id: string) => void;
  toggleAnnouncement: (id: string) => void;
  addStaff: (member: Omit<StaffMember, 'id'>) => void;
  updateStaff: (id: string, member: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
  addActivity: (act: Omit<SchoolActivity, 'id'>) => void;
  updateActivity: (id: string, act: Partial<SchoolActivity>) => void;
  deleteActivity: (id: string) => void;
  addProgram: (prog: Omit<SchoolProgram, 'id'>) => void;
  updateProgram: (id: string, prog: Partial<SchoolProgram>) => void;
  deleteProgram: (id: string) => void;
  addAchievement: (ach: Omit<StudentAchievement, 'id'>) => void;
  updateAchievement: (id: string, ach: Partial<StudentAchievement>) => void;
  deleteAchievement: (id: string) => void;
  updateStudentStats: (stats: Partial<StudentDataState>) => void;
  resetToDefaultData: () => void;
  exportDataToJson: () => string;
  importDataFromJson: (jsonStr: string) => boolean;
}

const STORAGE_KEYS = {
  PROFILE: 'sdn_cisurat_profile_v3',
  STAFF: 'sdn_cisurat_staff_v3',
  STUDENT: 'sdn_cisurat_student_v3',
  ACTIVITIES: 'sdn_cisurat_activities_v3',
  PROGRAMS: 'sdn_cisurat_programs_v3',
  LOGS: 'sdn_cisurat_logs_v3',
  AUTH: 'sdn_cisurat_admin_session_v3',
};

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<SchoolProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_SCHOOL_PROFILE;
    } catch {
      return INITIAL_SCHOOL_PROFILE;
    }
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STAFF);
      return saved ? JSON.parse(saved) : INITIAL_STAFF_MEMBERS;
    } catch {
      return INITIAL_STAFF_MEMBERS;
    }
  });

  const [studentData, setStudentData] = useState<StudentDataState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_DATA;
    } catch {
      return INITIAL_STUDENT_DATA;
    }
  });

  const [activities, setActivities] = useState<SchoolActivity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : INITIAL_SCHOOL_ACTIVITIES;
    } catch {
      return INITIAL_SCHOOL_ACTIVITIES;
    }
  });

  const [programs, setPrograms] = useState<SchoolProgram[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      return saved ? JSON.parse(saved) : INITIAL_SCHOOL_PROGRAMS;
    } catch {
      return INITIAL_SCHOOL_PROGRAMS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'log-1',
              action: 'Inisialisasi Sistem',
              entity: 'Portal Sekolah',
              timestamp: new Date().toLocaleString('id-ID'),
              author: 'Sistem Pusat Kemdikbud',
            },
          ];
    } catch {
      return [];
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(studentData));
  }, [studentData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [adminUser]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (action: string, entity: string) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      action,
      entity,
      timestamp: new Date().toLocaleString('id-ID'),
      author: adminUser ? adminUser.name : 'Administrator',
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const loginAdmin = (username: string, pass: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();
    // Default demo credentials: admin / admin123 or haris81@guru.sd.belajar.id / admin123
    if (
      (cleanUser === 'admin' ||
        cleanUser === 'haris81' ||
        cleanUser === 'haris81@guru.sd.belajar.id' ||
        cleanUser === 'sdncisurat.wado@gmail.com' ||
        cleanUser === 'operator') &&
      cleanPass === 'admin123'
    ) {
      const user: AdminUser = {
        username: cleanUser,
        name: 'Haris Suhendar, S.Pd., M.M.',
        role: 'Super Admin',
        email: 'haris81@guru.sd.belajar.id',
      };
      setAdminUser(user);
      logAudit('Login Berhasil', 'Autentikasi Admin SDN Cisurat');
      addToast({
        type: 'success',
        title: 'Login Berhasil',
        message: 'Selamat datang kembali di Dashboard Pengelola SDN Cisurat!',
      });
      return true;
    }
    addToast({
      type: 'error',
      title: 'Login Gagal',
      message: 'Username atau kata sandi tidak cocok. Gunakan kredensial demo (admin / admin123)',
    });
    return false;
  };

  const logoutAdmin = () => {
    logAudit('Logout Keluar', 'Autentikasi Admin');
    setAdminUser(null);
    addToast({
      type: 'info',
      title: 'Telah Keluar',
      message: 'Sesi administrator berhasil diakhiri.',
    });
  };

  const updateProfile = (updated: Partial<SchoolProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    logAudit('Memperbarui Profil Sekolah', 'Profil Satuan Pendidikan');
    addToast({
      type: 'success',
      title: 'Profil Diperbarui',
      message: 'Informasi profil sekolah berhasil disimpan.',
    });
  };

  const addAnnouncement = (text: string, isUrgent = false) => {
    const newAnn = {
      id: 'ann-' + Date.now(),
      text,
      date: new Date().toISOString().split('T')[0],
      isUrgent,
      active: true,
    };
    setProfile((prev) => ({
      ...prev,
      announcements: [newAnn, ...prev.announcements],
    }));
    logAudit('Menambah Pengumuman', text.substring(0, 30) + '...');
    addToast({
      type: 'success',
      title: 'Pengumuman Diterbitkan',
      message: 'Teks pengumuman telah muncul di running text website.',
    });
  };

  const deleteAnnouncement = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((a) => a.id !== id),
    }));
    logAudit('Menghapus Pengumuman', 'ID: ' + id);
    addToast({
      type: 'info',
      title: 'Pengumuman Dihapus',
      message: 'Pengumuman berhasil ditarik.',
    });
  };

  const toggleAnnouncement = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    }));
    logAudit('Ubah Status Pengumuman', 'ID: ' + id);
  };

  // Staff CRUD
  const addStaff = (member: Omit<StaffMember, 'id'>) => {
    const newStaff: StaffMember = {
      ...member,
      id: 'staff-' + Date.now(),
    };
    setStaff((prev) => [newStaff, ...prev]);
    logAudit('Menambah Tenaga Pendidik/Staf', newStaff.name);
    addToast({
      type: 'success',
      title: 'Data Guru/Staf Ditambahkan',
      message: `${newStaff.name} berhasil didaftarkan ke direktori SDM.`,
    });
  };

  const updateStaff = (id: string, member: Partial<StaffMember>) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, ...member } : s)));
    logAudit('Mengubah Data SDM', member.name || id);
    addToast({
      type: 'success',
      title: 'Data SDM Diperbarui',
      message: 'Perubahan data berhasil disimpan.',
    });
  };

  const deleteStaff = (id: string) => {
    const item = staff.find((s) => s.id === id);
    setStaff((prev) => prev.filter((s) => s.id !== id));
    logAudit('Menghapus Data SDM', item?.name || id);
    addToast({
      type: 'info',
      title: 'Data SDM Dihapus',
      message: `${item?.name || 'Staf'} telah dihapus dari direktori.`,
    });
  };

  // Activity CRUD
  const addActivity = (act: Omit<SchoolActivity, 'id'>) => {
    const newAct: SchoolActivity = {
      ...act,
      id: 'act-' + Date.now(),
    };
    setActivities((prev) => [newAct, ...prev]);
    logAudit('Mempublikasikan Kegiatan Siswa', newAct.title);
    addToast({
      type: 'success',
      title: 'Kegiatan Siswa Diterbitkan',
      message: `Berita "${newAct.title}" berhasil dipublikasikan.`,
    });
  };

  const updateActivity = (id: string, act: Partial<SchoolActivity>) => {
    setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, ...act } : a)));
    logAudit('Mengubah Kegiatan Siswa', act.title || id);
    addToast({
      type: 'success',
      title: 'Kegiatan Diperbarui',
      message: 'Informasi kegiatan siswa berhasil diperbarui.',
    });
  };

  const deleteActivity = (id: string) => {
    const item = activities.find((a) => a.id === id);
    setActivities((prev) => prev.filter((a) => a.id !== id));
    logAudit('Menghapus Kegiatan Siswa', item?.title || id);
    addToast({
      type: 'info',
      title: 'Kegiatan Dihapus',
      message: 'Dokumentasi kegiatan telah dihapus dari daftar.',
    });
  };

  // Program CRUD
  const addProgram = (prog: Omit<SchoolProgram, 'id'>) => {
    const newProg: SchoolProgram = {
      ...prog,
      id: 'prog-' + Date.now(),
    };
    setPrograms((prev) => [newProg, ...prev]);
    logAudit('Menambah Program Sekolah', newProg.title);
    addToast({
      type: 'success',
      title: 'Program Sekolah Ditambahkan',
      message: `Program "${newProg.title}" berhasil dimasukkan.`,
    });
  };

  const updateProgram = (id: string, prog: Partial<SchoolProgram>) => {
    setPrograms((prev) => prev.map((p) => (p.id === id ? { ...p, ...prog } : p)));
    logAudit('Mengubah Program Sekolah', prog.title || id);
    addToast({
      type: 'success',
      title: 'Program Diperbarui',
      message: 'Data program sekolah berhasil disimpan.',
    });
  };

  const deleteProgram = (id: string) => {
    const item = programs.find((p) => p.id === id);
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    logAudit('Menghapus Program Sekolah', item?.title || id);
    addToast({
      type: 'info',
      title: 'Program Dihapus',
      message: 'Program telah dihapus dari katalog.',
    });
  };

  // Achievement CRUD
  const addAchievement = (ach: Omit<StudentAchievement, 'id'>) => {
    const newAch: StudentAchievement = {
      ...ach,
      id: 'ach-' + Date.now(),
    };
    setStudentData((prev) => ({
      ...prev,
      achievements: [newAch, ...prev.achievements],
    }));
    logAudit('Menambah Prestasi Siswa', newAch.title);
    addToast({
      type: 'success',
      title: 'Prestasi Siswa Ditambahkan',
      message: `Prestasi ${newAch.studentName} berhasil dicatat.`,
    });
  };

  const updateAchievement = (id: string, ach: Partial<StudentAchievement>) => {
    setStudentData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === id ? { ...a, ...ach } : a)),
    }));
    logAudit('Mengubah Prestasi Siswa', ach.title || id);
    addToast({
      type: 'success',
      title: 'Prestasi Siswa Diperbarui',
      message: 'Data prestasi berhasil disimpan.',
    });
  };

  const deleteAchievement = (id: string) => {
    const item = studentData.achievements.find((a) => a.id === id);
    setStudentData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
    logAudit('Menghapus Prestasi Siswa', item?.title || id);
    addToast({
      type: 'info',
      title: 'Prestasi Dihapus',
      message: 'Catatan prestasi telah dihapus.',
    });
  };

  const updateStudentStats = (stats: Partial<StudentDataState>) => {
    setStudentData((prev) => ({ ...prev, ...stats }));
    logAudit('Memperbarui Statistik Siswa', 'Statistik Rombel');
    addToast({
      type: 'success',
      title: 'Statistik Siswa Disimpan',
      message: 'Data rekapitulasi siswa dan rombel berhasil disinkronisasi.',
    });
  };

  const resetToDefaultData = () => {
    setProfile(INITIAL_SCHOOL_PROFILE);
    setStaff(INITIAL_STAFF_MEMBERS);
    setStudentData(INITIAL_STUDENT_DATA);
    setActivities(INITIAL_SCHOOL_ACTIVITIES);
    setPrograms(INITIAL_SCHOOL_PROGRAMS);
    logAudit('Reset Data Pabrik', 'Semua Modul Konten');
    addToast({
      type: 'warning',
      title: 'Data Direset',
      message: 'Seluruh konten dikembalikan ke data awal sekolah.',
    });
  };

  const exportDataToJson = (): string => {
    const bundle = {
      exportedAt: new Date().toISOString(),
      profile,
      staff,
      studentData,
      activities,
      programs,
    };
    return JSON.stringify(bundle, null, 2);
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.profile) setProfile(data.profile);
      if (data.staff && Array.isArray(data.staff)) setStaff(data.staff);
      if (data.studentData) setStudentData(data.studentData);
      if (data.activities && Array.isArray(data.activities)) setActivities(data.activities);
      if (data.programs && Array.isArray(data.programs)) setPrograms(data.programs);
      logAudit('Impor Cadangan Data', 'JSON Restore');
      addToast({
        type: 'success',
        title: 'Impor Cadangan Berhasil',
        message: 'Seluruh data sekolah telah dipulihkan dari berkas cadangan.',
      });
      return true;
    } catch {
      addToast({
        type: 'error',
        title: 'Gagal Mengimpor',
        message: 'Format berkas JSON tidak valid atau rusak.',
      });
      return false;
    }
  };

  return (
    <SchoolContext.Provider
      value={{
        profile,
        staff,
        studentData,
        activities,
        programs,
        auditLogs,
        adminUser,
        toasts,
        addToast,
        removeToast,
        loginAdmin,
        logoutAdmin,
        updateProfile,
        addAnnouncement,
        deleteAnnouncement,
        toggleAnnouncement,
        addStaff,
        updateStaff,
        deleteStaff,
        addActivity,
        updateActivity,
        deleteActivity,
        addProgram,
        updateProgram,
        deleteProgram,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        updateStudentStats,
        resetToDefaultData,
        exportDataToJson,
        importDataFromJson,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
