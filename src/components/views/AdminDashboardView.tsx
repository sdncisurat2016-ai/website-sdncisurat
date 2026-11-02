import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  ActiveNavTab,
  StaffMember,
  SchoolActivity,
  SchoolProgram,
  StudentAchievement,
} from '../../types/school';
import { ImageUploader } from '../ImageUploader';
import {
  LayoutDashboard,
  Building,
  Users,
  GraduationCap,
  Camera,
  Calendar,
  Layers,
  Save,
  Plus,
  Trash2,
  Edit2,
  Eye,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  History,
  X,
  FileText,
  Bell,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardViewProps {
  setActiveTab: (tab: ActiveNavTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ setActiveTab }) => {
  const {
    profile,
    staff,
    studentData,
    activities,
    programs,
    auditLogs,
    adminUser,
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
    deleteAchievement,
    updateStudentStats,
    resetToDefaultData,
    exportDataToJson,
    importDataFromJson,
    addToast,
  } = useSchool();

  const [activeCmsTab, setActiveCmsTab] = useState<
    'overview' | 'profil' | 'sdm' | 'siswa' | 'kegiatan' | 'program' | 'backup'
  >('overview');

  // Modals for CRUD
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState<Partial<StaffMember>>({
    name: '',
    nip: '',
    roleCategory: 'Guru Mata Pelajaran',
    position: '',
    subject: '',
    education: '',
    certificationStatus: 'Tersertifikasi Pendidik',
    employmentStatus: 'PNS',
    email: '',
    photoUrl: '/src/assets/images/principal_headshot_1793584853806.jpg',
    bio: '',
    serviceYears: 5,
  });

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [activityForm, setActivityForm] = useState<Partial<SchoolActivity>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'P5 & Karakter',
    date: new Date().toISOString().split('T')[0],
    author: adminUser?.name || 'Humas Sekolah',
    imageUrl: '/src/assets/images/student_activities_lab_1793584868285.jpg',
    isPublished: true,
    tags: ['Kegiatan', 'Prestasi'],
  });

  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [programForm, setProgramForm] = useState<Partial<SchoolProgram>>({
    title: '',
    category: 'Kurikulum Merdeka',
    targetAudience: 'Siswa & Guru',
    period: 'Tahun Ajaran 2026/2027',
    pic: 'Wakasek Terkait',
    status: 'Sedang Berjalan',
    description: '',
    keyIndicators: ['Target ketercapaian 100% siswa'],
  });

  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [achievementForm, setAchievementForm] = useState<Partial<StudentAchievement>>({
    title: '',
    studentName: '',
    classGrade: 'Kelas VIII',
    competitionName: '',
    level: 'Nasional',
    year: 2026,
    medal: 'Juara 1',
    category: 'Sains & Teknologi',
    organizer: '',
  });

  // Profil Form States
  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    shortName: profile.shortName,
    heroTagline: profile.heroTagline,
    heroSubheadline: profile.heroSubheadline,
    vision: profile.vision,
    headmasterName: profile.headmaster.name,
    headmasterNip: profile.headmaster.nip,
    headmasterGreetingTitle: profile.headmaster.greetingTitle,
    headmasterGreetingMessage: profile.headmaster.greetingMessage,
    phone: profile.phone,
    email: profile.email,
  });

  const [newAnnouncementText, setNewAnnouncementText] = useState('');
  const [newAnnouncementUrgent, setNewAnnouncementUrgent] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      shortName: profileForm.shortName,
      heroTagline: profileForm.heroTagline,
      heroSubheadline: profileForm.heroSubheadline,
      vision: profileForm.vision,
      phone: profileForm.phone,
      email: profileForm.email,
      headmaster: {
        ...profile.headmaster,
        name: profileForm.headmasterName,
        nip: profileForm.headmasterNip,
        greetingTitle: profileForm.headmasterGreetingTitle,
        greetingMessage: profileForm.headmasterGreetingMessage,
      },
    });
  };

  // Staff Handlers
  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    setStaffForm({
      name: '',
      nip: '',
      roleCategory: 'Guru Mata Pelajaran',
      position: '',
      subject: '',
      education: '',
      certificationStatus: 'Tersertifikasi Pendidik',
      employmentStatus: 'PNS',
      email: '',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      bio: '',
      serviceYears: 5,
    });
    setIsStaffModalOpen(true);
  };

  const handleOpenEditStaff = (member: StaffMember) => {
    setEditingStaffId(member.id);
    setStaffForm({ ...member });
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.nip) return;

    if (editingStaffId) {
      updateStaff(editingStaffId, staffForm);
    } else {
      addStaff(staffForm as Omit<StaffMember, 'id'>);
    }
    setIsStaffModalOpen(false);
  };

  // Activity Handlers
  const handleOpenAddActivity = () => {
    setEditingActivityId(null);
    setActivityForm({
      title: '',
      excerpt: '',
      content: '',
      category: 'P5 & Karakter',
      date: new Date().toISOString().split('T')[0],
      author: adminUser?.name || 'Humas Sekolah',
      imageUrl: '/src/assets/images/student_activities_lab_1793584868285.jpg',
      isPublished: true,
      tags: ['Kegiatan', 'Prestasi'],
    });
    setIsActivityModalOpen(true);
  };

  const handleOpenEditActivity = (act: SchoolActivity) => {
    setEditingActivityId(act.id);
    setActivityForm({ ...act });
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.title || !activityForm.content) return;

    const slug = (activityForm.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload = {
      ...activityForm,
      slug,
      tags: Array.isArray(activityForm.tags)
        ? activityForm.tags
        : typeof (activityForm.tags as any) === 'string'
        ? ((activityForm.tags as any) as string).split(',').map((t) => t.trim())
        : ['Sekolah'],
    };

    if (editingActivityId) {
      updateActivity(editingActivityId, payload);
    } else {
      addActivity(payload as Omit<SchoolActivity, 'id'>);
    }
    setIsActivityModalOpen(false);
  };

  // Program Handlers
  const handleOpenAddProgram = () => {
    setEditingProgramId(null);
    setProgramForm({
      title: '',
      category: 'Kurikulum Merdeka',
      targetAudience: 'Siswa & Guru',
      period: 'Tahun Ajaran 2026/2027',
      pic: 'Tim Pengembang Kurikulum',
      status: 'Sedang Berjalan',
      description: '',
      keyIndicators: ['Pencapaian asesmen 100% siswa'],
    });
    setIsProgramModalOpen(true);
  };

  const handleOpenEditProgram = (prog: SchoolProgram) => {
    setEditingProgramId(prog.id);
    setProgramForm({ ...prog });
    setIsProgramModalOpen(true);
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programForm.title || !programForm.description) return;

    if (editingProgramId) {
      updateProgram(editingProgramId, programForm);
    } else {
      addProgram(programForm as Omit<SchoolProgram, 'id'>);
    }
    setIsProgramModalOpen(false);
  };

  // Achievement Save
  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achievementForm.title || !achievementForm.studentName) return;

    addAchievement(achievementForm as Omit<StudentAchievement, 'id'>);
    setIsAchievementModalOpen(false);
    setAchievementForm({
      title: '',
      studentName: '',
      classGrade: 'Kelas VIII',
      competitionName: '',
      level: 'Nasional',
      year: 2026,
      medal: 'Juara 1',
      category: 'Sains & Teknologi',
      organizer: '',
    });
  };

  // Backup & Export
  const handleExport = () => {
    const jsonStr = exportDataToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_sdn_cisurat_wado_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast({
      type: 'success',
      title: 'Cadangan Diunduh',
      message: 'Berkas JSON data sekolah telah tersimpan.',
    });
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonInput.trim()) return;
    const ok = importDataFromJson(jsonInput);
    if (ok) {
      setJsonInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 pb-16">
      {/* Top Banner Bar for CMS Status */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl shrink-0">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                CMS Panel Admin
              </span>
              <span className="text-stone-400" aria-hidden="true">·</span>
              <span className="text-xs text-stone-300">
                Sesi: {adminUser?.name || 'Administrator'} ({adminUser?.role || 'Super Admin'})
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Manajemen Konten &amp; Basis Data Sekolah
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('beranda')}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            Pratinjau Web Publik
          </button>
          <button
            onClick={logoutAdmin}
            className="px-3 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-200 text-xs font-medium rounded-xl border border-rose-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* CMS Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-stone-200 pb-2">
        {[
          { id: 'overview', label: 'Ringkasan & Log', icon: LayoutDashboard },
          { id: 'profil', label: 'Profil & Pengumuman', icon: Building },
          { id: 'sdm', label: 'Manajemen SDM', icon: Users },
          { id: 'siswa', label: 'Data Siswa & Prestasi', icon: GraduationCap },
          { id: 'kegiatan', label: 'Kegiatan Siswa', icon: Camera },
          { id: 'program', label: 'Program Sekolah', icon: Calendar },
          { id: 'backup', label: 'Cadangan & Pemulihan', icon: Save },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCmsTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCmsTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & AUDIT LOGS */}
      {activeCmsTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-1">
              <span className="text-xs text-stone-500">Total Tenaga Pendidik (SDM)</span>
              <div className="text-2xl font-bold text-stone-900 tabular-nums">{staff.length} Orang</div>
              <span className="text-[11px] text-emerald-700 font-medium">92% Bersertifikasi</span>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-1">
              <span className="text-xs text-stone-500">Total Peserta Didik</span>
              <div className="text-2xl font-bold text-stone-900 tabular-nums">{studentData.totalStudents} Siswa</div>
              <span className="text-[11px] text-stone-500">24 Rombongan Belajar</span>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-1">
              <span className="text-xs text-stone-500">Artikel &amp; Kegiatan Siswa</span>
              <div className="text-2xl font-bold text-stone-900 tabular-nums">{activities.length} Publikasi</div>
              <span className="text-[11px] text-emerald-700 font-medium">{activities.filter((a) => a.isPublished).length} Rilis Publik</span>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-1">
              <span className="text-xs text-stone-500">Program Kerja &amp; Inovasi</span>
              <div className="text-2xl font-bold text-stone-900 tabular-nums">{programs.length} Program</div>
              <span className="text-[11px] text-emerald-700 font-medium">Aktif Berjalan</span>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-900">Aksi Cepat Pengelolaan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleOpenAddActivity}
                className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900 text-left transition-colors flex items-center gap-3 cursor-pointer"
              >
                <Plus className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs">Publikasikan Kegiatan Siswa Baru</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Unggah berita, liputan P5 &amp; foto kegiatan</p>
                </div>
              </button>

              <button
                onClick={handleOpenAddStaff}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100/80 text-stone-900 text-left transition-colors flex items-center gap-3 cursor-pointer"
              >
                <Plus className="w-5 h-5 text-stone-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs">Daftarkan Guru / Staf Baru</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Tambah NIP, kualifikasi, dan mata pelajaran</p>
                </div>
              </button>

              <button
                onClick={() => setIsAchievementModalOpen(true)}
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-900 text-left transition-colors flex items-center gap-3 cursor-pointer"
              >
                <Plus className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs">Catat Prestasi Kejuaraan Siswa</h4>
                  <p className="text-[11px] text-amber-700 mt-0.5">Input medali OSN, FLS2N, O2SN, Robotik</p>
                </div>
              </button>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-700" />
                  Riwayat Aktivitas &amp; Log Perubahan Konten
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Mencatat otomatis setiap penambahan, pengubahan, atau penghapusan data secara berkala.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Waktu</th>
                    <th className="py-3 px-5 font-semibold">Tindakan / Aksi</th>
                    <th className="py-3 px-5 font-semibold">Entitas Konten</th>
                    <th className="py-3 px-5 font-semibold">Pelaksana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {auditLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="hover:bg-stone-50/60">
                      <td className="py-3 px-5 text-stone-500 font-mono tabular-nums">
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-5 font-semibold text-stone-900">
                        {log.action}
                      </td>
                      <td className="py-3 px-5 text-stone-600 truncate max-w-xs">
                        {log.entity}
                      </td>
                      <td className="py-3 px-5 text-emerald-800 font-medium">
                        {log.author}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFIL & PENGUMUMAN TICKER */}
      {activeCmsTab === 'profil' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Announcements Manager */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  Manajemen Pengumuman Berjalan (Running Ticker)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pengumuman aktif akan otomatis muncul pada bilah operasional di bagian paling atas website.
                </p>
              </div>
            </div>

            {/* Add Announcement Form */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <label className="block text-xs font-semibold text-stone-700">
                Teks Pengumuman Baru
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newAnnouncementText}
                  onChange={(e) => setNewAnnouncementText(e.target.value)}
                  placeholder="Ketik teks pengumuman penting (misal: Pembagian rapor, info PPDB, libur sekolah)..."
                  className="flex-1 px-4 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newAnnouncementText.trim()) {
                      addAnnouncement(newAnnouncementText.trim(), newAnnouncementUrgent);
                      setNewAnnouncementText('');
                    }
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl cursor-pointer shrink-0"
                >
                  Terbitkan Pengumuman
                </button>
              </div>
            </div>

            {/* List of Announcements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Daftar Pengumuman ({profile.announcements.length})
              </h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                {profile.announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-3.5 bg-white flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-stone-400 font-mono tabular-nums">
                          {ann.date}
                        </span>
                        {ann.isUrgent && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            Mendesak
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-semibold ${
                            ann.active ? 'text-emerald-700' : 'text-stone-400'
                          }`}
                        >
                          {ann.active ? '● Aktif Tampil' : '○ Nonaktif'}
                        </span>
                      </div>
                      <p className="text-stone-800 font-medium truncate">{ann.text}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleAnnouncement(ann.id)}
                        className="px-2.5 py-1 text-[11px] font-medium border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer"
                      >
                        {ann.active ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(ann.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg cursor-pointer"
                        aria-label="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Edit School Profile Form */}
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Edit Profil Satuan Pendidikan &amp; Sambutan Kepala Sekolah
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Perubahan akan langsung tercermin di halaman publik sekolah.
                </p>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                Simpan Perubahan Profil
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Resmi Satuan Pendidikan
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Singkat / Brand
                </label>
                <input
                  type="text"
                  value={profileForm.shortName}
                  onChange={(e) => setProfileForm({ ...profileForm, shortName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Slogan / Hero Tagline
                </label>
                <input
                  type="text"
                  value={profileForm.heroTagline}
                  onChange={(e) => setProfileForm({ ...profileForm, heroTagline: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Deskripsi Kicker Beranda
                </label>
                <textarea
                  rows={2}
                  value={profileForm.heroSubheadline}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, heroSubheadline: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Visi Satuan Pendidikan
                </label>
                <textarea
                  rows={2}
                  value={profileForm.vision}
                  onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Headmaster Data */}
              <div className="sm:col-span-2 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Data Kepala Satuan Pendidikan
                </h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Kepala Sekolah &amp; Gelar
                </label>
                <input
                  type="text"
                  value={profileForm.headmasterName}
                  onChange={(e) => setProfileForm({ ...profileForm, headmasterName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={profileForm.headmasterNip}
                  onChange={(e) => setProfileForm({ ...profileForm, headmasterNip: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Judul Sambutan Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={profileForm.headmasterGreetingTitle}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, headmasterGreetingTitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Teks Lengkap Sambutan Kepala Sekolah
                </label>
                <textarea
                  rows={4}
                  value={profileForm.headmasterGreetingMessage}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, headmasterGreetingMessage: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Telepon Layanan
                </label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Resmi Sekolah
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200"
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: MANAJEMEN SDM (GURU & STAF) */}
      {activeCmsTab === 'sdm' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Manajemen Tenaga Pendidik &amp; Kependidikan ({staff.length})
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Kelola data kepegawaian guru, NIP, status sertifikasi, mata pelajaran, dan riwayat pengabdian.
              </p>
            </div>
            <button
              onClick={handleOpenAddStaff}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Tambah Guru / Staf Baru
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Nama &amp; Jabatan</th>
                    <th className="py-3 px-4 font-semibold">NIP / NUPTK</th>
                    <th className="py-3 px-4 font-semibold">Kategori &amp; Mapel</th>
                    <th className="py-3 px-4 font-semibold">Pendidikan</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {staff.map((member) => (
                    <tr key={member.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-5">
                        <div className="font-bold text-stone-900">{member.name}</div>
                        <div className="text-[11px] text-emerald-800">{member.position}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-600 tabular-nums">
                        {member.nip}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-800 font-medium">{member.roleCategory}</div>
                        <div className="text-[11px] text-stone-500">{member.subject || '-'}</div>
                      </td>
                      <td className="py-3 px-4 text-stone-600">
                        {member.education}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-stone-700 block">{member.employmentStatus}</span>
                        <span className="text-[10px] text-stone-400">
                          {member.certificationStatus === 'Tersertifikasi Pendidik' ? '✓ Tersertifikasi' : 'Dalam Proses'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditStaff(member)}
                            className="p-1.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100 rounded-lg cursor-pointer"
                            title="Edit Data Guru"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus ${member.name}?`)) {
                                deleteStaff(member.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Hapus Data Guru"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATA SISWA & PRESTASI */}
      {activeCmsTab === 'siswa' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Quick Stats Updater */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Perbarui Rekapitulasi Statistik Siswa &amp; Rasio
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Total Siswa Aktif
                </label>
                <input
                  type="number"
                  value={studentData.totalStudents}
                  onChange={(e) =>
                    updateStudentStats({ totalStudents: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Siswa Laki-laki
                </label>
                <input
                  type="number"
                  value={studentData.maleStudents}
                  onChange={(e) =>
                    updateStudentStats({ maleStudents: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Siswa Perempuan
                </label>
                <input
                  type="number"
                  value={studentData.femaleStudents}
                  onChange={(e) =>
                    updateStudentStats({ femaleStudents: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Total Rombel Kelas
                </label>
                <input
                  type="number"
                  value={studentData.totalClasses}
                  onChange={(e) =>
                    updateStudentStats({ totalClasses: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Achievements Manager */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Katalog Prestasi Siswa Terverifikasi ({studentData.achievements.length})
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Rekam data medali kejuaraan sains, seni budaya, olahraga, robotik, dan kepramukaan.
                </p>
              </div>
              <button
                onClick={() => setIsAchievementModalOpen(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                Catat Prestasi Baru
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Medali &amp; Kejuaraan</th>
                    <th className="py-3 px-4 font-semibold">Nama Siswa &amp; Kelas</th>
                    <th className="py-3 px-4 font-semibold">Tingkat / Tahun</th>
                    <th className="py-3 px-4 font-semibold">Penyelenggara</th>
                    <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {studentData.achievements.map((ach) => (
                    <tr key={ach.id} className="hover:bg-stone-50/60">
                      <td className="py-3 px-5">
                        <span className="font-bold text-amber-700 block">{ach.medal}</span>
                        <span className="text-stone-900 font-medium">{ach.title}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{ach.studentName}</div>
                        <div className="text-stone-500 text-[11px]">{ach.classGrade}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-700">
                        {ach.level} ({ach.year})
                      </td>
                      <td className="py-3 px-4 text-stone-500 truncate max-w-xs">
                        {ach.organizer}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Hapus prestasi "${ach.title}"?`)) {
                              deleteAchievement(ach.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg cursor-pointer"
                          aria-label="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KEGIATAN SISWA (BERITA & DOKUMENTASI) */}
      {activeCmsTab === 'kegiatan' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Manajemen Dokumentasi &amp; Berita Kegiatan Siswa ({activities.length})
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Tambah warta baru, edit isi liputan, ubah status rilis (Publish/Draft), atau hapus berita lama.
              </p>
            </div>
            <button
              onClick={handleOpenAddActivity}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Tulis Warta Kegiatan Baru
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Judul Kegiatan</th>
                    <th className="py-3 px-4 font-semibold">Kategori</th>
                    <th className="py-3 px-4 font-semibold">Tanggal</th>
                    <th className="py-3 px-4 font-semibold">Penulis</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {activities.map((act) => (
                    <tr key={act.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-5 max-w-sm">
                        <div className="font-bold text-stone-900 line-clamp-1">{act.title}</div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{act.excerpt}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-800">
                        {act.category}
                      </td>
                      <td className="py-3 px-4 text-stone-600 font-mono tabular-nums">
                        {act.date}
                      </td>
                      <td className="py-3 px-4 text-stone-700">
                        {act.author}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            act.isPublished
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {act.isPublished ? 'Tayang Publik' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditActivity(act)}
                            className="p-1.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100 rounded-lg cursor-pointer"
                            title="Edit Kegiatan"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus kegiatan "${act.title}"?`)) {
                                deleteActivity(act.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Hapus Kegiatan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PROGRAM SEKOLAH */}
      {activeCmsTab === 'program' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Manajemen Program Kerja &amp; Inovasi Sekolah ({programs.length})
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Kelola target capaian program Kurikulum Merdeka, Adiwiyata, Literasi, Karakter, dan PPDB.
              </p>
            </div>
            <button
              onClick={handleOpenAddProgram}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Tambah Program Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-800 uppercase tracking-wide">
                      {prog.category}
                    </span>
                    <span className="font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      {prog.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900">{prog.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{prog.description}</p>

                  <div className="pt-2 text-xs text-stone-500 space-y-1">
                    <p>Sasaran: <span className="text-stone-800 font-medium">{prog.targetAudience}</span></p>
                    <p>Penanggung Jawab: <span className="text-stone-800 font-medium">{prog.pic}</span></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-400">{prog.period}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditProgram(prog)}
                      className="px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus program "${prog.title}"?`)) {
                          deleteProgram(prog.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: BACKUP & PEMULIHAN DATA */}
      {activeCmsTab === 'backup' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Export */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Ekspor Cadangan Lengkap (JSON)</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Unduh seluruh data profil sekolah, tenaga pendidik, rekap siswa, warta kegiatan, dan program kerja sebagai arsip berkas JSON.
              </p>
              <button
                onClick={handleExport}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                Unduh Berkas Cadangan (.JSON)
              </button>
            </div>

            {/* Reset Factory */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Reset ke Data Default Pabrik</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mengembalikan seluruh data portal ke keadaan resmi bawaan awal SD Negeri Cisurat Kecamatan Wado Kabupaten Sumedang.
              </p>
              <button
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke kondisi default pabrik? Perubahan kustom akan dihapus.')) {
                    resetToDefaultData();
                  }
                }}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-rose-50 text-rose-700 border border-stone-200 hover:border-rose-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reset ke Data Awal Pabrik
              </button>
            </div>
          </div>

          {/* Import JSON */}
          <form
            onSubmit={handleImportSubmit}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4"
          >
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-700" />
              Pulihkan Data dari Berkas Cadangan JSON
            </h3>
            <p className="text-xs text-stone-500">
              Tempelkan teks JSON hasil cadangan sebelumnya ke kotak di bawah untuk memulihkan seluruh konten secara instan.
            </p>
            <textarea
              rows={4}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Tempelkan struktur JSON cadangan di sini..."
              className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:border-emerald-600"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!jsonInput.trim()}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Terapkan Pemulihan Data
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT STAFF */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsStaffModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-stone-900 mb-4">
              {editingStaffId ? 'Edit Data Tenaga Pendidik / Staf' : 'Tambah Tenaga Pendidik / Staf Baru'}
            </h3>

            <form onSubmit={handleSaveStaff} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Lengkap &amp; Gelar</label>
                <input
                  type="text"
                  value={staffForm.name || ''}
                  onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  placeholder="misal: Dr. H. Slamet Riyadi, M.Pd."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">NIP (18 Digit)</label>
                  <input
                    type="text"
                    value={staffForm.nip || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, nip: e.target.value })}
                    placeholder="19850101 201001 1 001"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kategori Peran</label>
                  <select
                    value={staffForm.roleCategory || 'Guru Mata Pelajaran'}
                    onChange={(e) => setStaffForm({ ...staffForm, roleCategory: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Pimpinan">Pimpinan Sekolah</option>
                    <option value="Guru Mata Pelajaran">Guru Mata Pelajaran</option>
                    <option value="Guru BK">Guru BK</option>
                    <option value="Tenaga Kependidikan">Tenaga Kependidikan (TU/Perpus/Lab)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Jabatan / Tugas</label>
                  <input
                    type="text"
                    value={staffForm.position || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, position: e.target.value })}
                    placeholder="misal: Guru Fisika / Wakasek"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={staffForm.subject || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, subject: e.target.value })}
                    placeholder="misal: Ilmu Pengetahuan Alam"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Pendidikan Terakhir</label>
                  <input
                    type="text"
                    value={staffForm.education || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, education: e.target.value })}
                    placeholder="S2 Pendidikan UNNES"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status Kepegawaian</label>
                  <select
                    value={staffForm.employmentStatus || 'PNS'}
                    onChange={(e) => setStaffForm({ ...staffForm, employmentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="PNS">PNS (Pegawai Negeri Sipil)</option>
                    <option value="PPPK">PPPK</option>
                    <option value="GTT/PTT">GTT / PTT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status Sertifikasi</label>
                  <select
                    value={staffForm.certificationStatus || 'Tersertifikasi Pendidik'}
                    onChange={(e) => setStaffForm({ ...staffForm, certificationStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Tersertifikasi Pendidik">Tersertifikasi Pendidik</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Masa Kerja (Tahun)</label>
                  <input
                    type="number"
                    value={staffForm.serviceYears || 5}
                    onChange={(e) => setStaffForm({ ...staffForm, serviceYears: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={staffForm.email || ''}
                  onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  placeholder="nama@guru.sd.belajar.id"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-1">
                <ImageUploader
                  label="Foto Profil Guru / Staf (Unggah dari Perangkat)"
                  value={staffForm.photoUrl || ''}
                  onChange={(val) => setStaffForm({ ...staffForm, photoUrl: val })}
                  aspectRatio="square"
                  recommendedSizeText="Pilih foto formal atau aktivitas guru (JPG/PNG). Gambar otomatis dioptimalkan."
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Catatan Pengabdian / Bio Ringkas</label>
                <textarea
                  rows={2}
                  value={staffForm.bio || ''}
                  onChange={(e) => setStaffForm({ ...staffForm, bio: e.target.value })}
                  placeholder="Pengalaman membina lomba atau dedikasi kurikulum..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl cursor-pointer"
                >
                  {editingStaffId ? 'Simpan Pembaruan' : 'Tambahkan ke Direktori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT ACTIVITY */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsActivityModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-stone-900 mb-4">
              {editingActivityId ? 'Edit Liputan Kegiatan Siswa' : 'Buat Liputan Kegiatan Siswa Baru'}
            </h3>

            <form onSubmit={handleSaveActivity} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Judul Kegiatan</label>
                <input
                  type="text"
                  value={activityForm.title || ''}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  placeholder="misal: Kemah Bakti Pramuka Penggalang"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kategori Kegiatan</label>
                  <select
                    value={activityForm.category || 'P5 & Karakter'}
                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="P5 & Karakter">P5 &amp; Karakter</option>
                    <option value="Akademik & Sains">Akademik &amp; Sains</option>
                    <option value="Olahraga & Seni">Olahraga &amp; Seni</option>
                    <option value="Kepramukaan">Kepramukaan</option>
                    <option value="Sosial & Lingkungan">Sosial &amp; Lingkungan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tanggal Pelaksanaan</label>
                  <input
                    type="date"
                    value={activityForm.date || ''}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Penulis / Sumber Liputan</label>
                <input
                  type="text"
                  value={activityForm.author || ''}
                  onChange={(e) => setActivityForm({ ...activityForm, author: e.target.value })}
                  placeholder="Tim Humas Sekolah / Pembina"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-1">
                <ImageUploader
                  label="Foto Utama Liputan Kegiatan (Unggah dari Perangkat)"
                  value={activityForm.imageUrl || ''}
                  onChange={(val) => setActivityForm({ ...activityForm, imageUrl: val })}
                  aspectRatio="landscape"
                  recommendedSizeText="Foto lanskap dokumentasi kegiatan murid (JPG/PNG). Otomatis dioptimalkan."
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  value={activityForm.excerpt || ''}
                  onChange={(e) => setActivityForm({ ...activityForm, excerpt: e.target.value })}
                  placeholder="Satu atau dua kalimat pengantar yang tampil di kartu warta..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Konten Berita Lengkap</label>
                <textarea
                  rows={5}
                  value={activityForm.content || ''}
                  onChange={(e) => setActivityForm({ ...activityForm, content: e.target.value })}
                  placeholder="Tuliskan jalannya kegiatan, kutipan narasumber, dan suasana acara..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishCheckbox"
                  checked={activityForm.isPublished || false}
                  onChange={(e) => setActivityForm({ ...activityForm, isPublished: e.target.checked })}
                  className="rounded text-emerald-700"
                />
                <label htmlFor="publishCheckbox" className="font-semibold text-stone-700">
                  Langsung Tayangkan ke Website Publik (Publish)
                </label>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl cursor-pointer"
                >
                  {editingActivityId ? 'Simpan Warta' : 'Publikasikan Warta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD / EDIT PROGRAM */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsProgramModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-stone-900 mb-4">
              {editingProgramId ? 'Edit Program Kerja Sekolah' : 'Tambah Program Kerja Baru'}
            </h3>

            <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Program</label>
                <input
                  type="text"
                  value={programForm.title || ''}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  placeholder="misal: Sekolah Adiwiyata & Zero Single-Use Plastic"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kategori</label>
                  <select
                    value={programForm.category || 'Kurikulum Merdeka'}
                    onChange={(e) => setProgramForm({ ...programForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                    <option value="Adiwiyata & Lingkungan">Adiwiyata &amp; Lingkungan</option>
                    <option value="Literasi & Digital">Literasi &amp; Digital</option>
                    <option value="Pengembangan Karakter">Pengembangan Karakter</option>
                    <option value="Klinik Prestasi">Klinik Prestasi</option>
                    <option value="PPDB Online">PPDB Online</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status Ketercapaian</label>
                  <select
                    value={programForm.status || 'Sedang Berjalan'}
                    onChange={(e) => setProgramForm({ ...programForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Sedang Berjalan">Sedang Berjalan</option>
                    <option value="Terencana">Terencana</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Sasaran Peserta</label>
                  <input
                    type="text"
                    value={programForm.targetAudience || ''}
                    onChange={(e) => setProgramForm({ ...programForm, targetAudience: e.target.value })}
                    placeholder="Seluruh Murid Kelas VII - IX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Periode Pelaksanaan</label>
                  <input
                    type="text"
                    value={programForm.period || ''}
                    onChange={(e) => setProgramForm({ ...programForm, period: e.target.value })}
                    placeholder="Tahun Ajaran 2026/2027"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Penanggung Jawab (PIC)</label>
                <input
                  type="text"
                  value={programForm.pic || ''}
                  onChange={(e) => setProgramForm({ ...programForm, pic: e.target.value })}
                  placeholder="Nama Pembina / Wakasek"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Rincian Deskripsi Program</label>
                <textarea
                  rows={3}
                  value={programForm.description || ''}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  placeholder="Latar belakang dan mekanisme operasional kegiatan..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl cursor-pointer"
                >
                  {editingProgramId ? 'Simpan Program' : 'Terbitkan Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD ACHIEVEMENT */}
      {isAchievementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsAchievementModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-stone-900 mb-4">
              Catat Prestasi Kejuaraan Siswa
            </h3>

            <form onSubmit={handleSaveAchievement} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Judul Kejuaraan</label>
                <input
                  type="text"
                  value={achievementForm.title || ''}
                  onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                  placeholder="misal: Juara 1 Lomba Inovasi Pelajar Nasional"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Siswa / Tim</label>
                <input
                  type="text"
                  value={achievementForm.studentName || ''}
                  onChange={(e) => setAchievementForm({ ...achievementForm, studentName: e.target.value })}
                  placeholder="Nama peraih medali"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kelas</label>
                  <input
                    type="text"
                    value={achievementForm.classGrade || ''}
                    onChange={(e) => setAchievementForm({ ...achievementForm, classGrade: e.target.value })}
                    placeholder="Kelas VIII-A"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tingkat</label>
                  <select
                    value={achievementForm.level || 'Nasional'}
                    onChange={(e) => setAchievementForm({ ...achievementForm, level: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Kabupaten/Kota">Kabupaten/Kota</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Peringkat / Medali</label>
                  <select
                    value={achievementForm.medal || 'Juara 1'}
                    onChange={(e) => setAchievementForm({ ...achievementForm, medal: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Juara 1">Juara 1</option>
                    <option value="Juara 2">Juara 2</option>
                    <option value="Juara 3">Juara 3</option>
                    <option value="Medali Emas">Medali Emas</option>
                    <option value="Medali Perak">Medali Perak</option>
                    <option value="Juara Harapan">Juara Harapan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Bidang / Kategori</label>
                  <select
                    value={achievementForm.category || 'Sains & Teknologi'}
                    onChange={(e) => setAchievementForm({ ...achievementForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Sains & Teknologi">Sains &amp; Teknologi</option>
                    <option value="Seni & Budaya">Seni &amp; Budaya</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Bahasa">Bahasa</option>
                    <option value="Kepramukaan">Kepramukaan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Instansi Penyelenggara</label>
                <input
                  type="text"
                  value={achievementForm.organizer || ''}
                  onChange={(e) => setAchievementForm({ ...achievementForm, organizer: e.target.value })}
                  placeholder="Kemdikbudristek / BRIN / Dinas Pendidikan"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAchievementModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
