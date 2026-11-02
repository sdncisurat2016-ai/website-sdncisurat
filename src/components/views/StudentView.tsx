import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  Trophy,
  Activity,
  Layers,
  GraduationCap,
  Calendar,
  Sparkles,
  ChevronRight,
  Medal,
} from 'lucide-react';

export const StudentView: React.FC = () => {
  const { studentData } = useSchool();
  const [activeTab, setActiveTab] = useState<'rekap' | 'prestasi' | 'ekskul'>('rekap');
  const [selectedGrade, setSelectedGrade] = useState<number>(0);
  const [achievementFilter, setAchievementFilter] = useState<string>('Semua');

  const malePercent = Math.round((studentData.maleStudents / studentData.totalStudents) * 100);
  const femalePercent = 100 - malePercent;

  const filteredAchievements = studentData.achievements.filter((ach) => {
    if (achievementFilter === 'Semua') return true;
    return ach.category === achievementFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">
            <span>Kesiswaan &amp; Perkembangan Murid</span>
            <span aria-hidden="true">·</span>
            <span>Tahun Ajaran 2026/2027</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Data Peserta Didik &amp; Galeri Prestasi
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Transparansi data demografi siswa, pembagian rombongan belajar, rekam jejak kejuaraan, serta wadah pengembangan talenta ekstrakurikuler.
          </p>
        </div>

        {/* 4 Demographic Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Total Peserta Didik</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">
              {studentData.totalStudents}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">Siswa Terdaftar Dapodik</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Komposisi Gender</span>
              <Activity className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-sm font-semibold text-stone-800 tabular-nums">
              {studentData.maleStudents} Laki-laki ({malePercent}%)
            </div>
            <div className="text-xs text-stone-600 tabular-nums">
              {studentData.femaleStudents} Perempuan ({femalePercent}%)
            </div>
            {/* Visual ratio bar */}
            <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden flex">
              <div className="bg-sky-500 h-full" style={{ width: `${malePercent}%` }} />
              <div className="bg-emerald-500 h-full" style={{ width: `${femalePercent}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Rombongan Belajar</span>
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">
              {studentData.totalClasses} Kelas
            </div>
            <div className="text-[11px] text-stone-500 mt-1">Kelas I sampai Kelas VI (SD)</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Rasio Guru &amp; Siswa</span>
              <GraduationCap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">
              {studentData.ratioTeacherStudent}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">Standar Ideal Kemdikbud</div>
          </div>
        </div>

        {/* Tab Controls (Interactive Filter Controls - §1.A) */}
        <div className="flex items-center gap-1.5 pt-2">
          {[
            { id: 'rekap', label: 'Rekap Rombel & Kelas', icon: Layers },
            { id: 'prestasi', label: 'Galeri Prestasi Kejuaraan', icon: Trophy },
            { id: 'ekskul', label: 'Ekstrakurikuler Talenta', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Rekapitulasi Rombel & Kelas */}
      {activeTab === 'rekap' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Grade Selector */}
          <div className="flex items-center gap-2">
            {studentData.grades.map((g, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedGrade(idx)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedGrade === idx
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {g.grade} ({g.totalStudents} Siswa)
              </button>
            ))}
          </div>

          {/* Selected Grade Table */}
          {studentData.grades[selectedGrade] && (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-5 bg-stone-50/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    {studentData.grades[selectedGrade].grade}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Total {studentData.grades[selectedGrade].totalStudents} Siswa · {studentData.grades[selectedGrade].rombelCount} Rombel · {studentData.grades[selectedGrade].maleCount} Laki-laki · {studentData.grades[selectedGrade].femaleCount} Perempuan
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-5 font-semibold">Nama Rombel / Peminatan</th>
                      <th className="py-3 px-4 font-semibold text-center">Jumlah Siswa</th>
                      <th className="py-3 px-5 font-semibold">Wali Kelas</th>
                      <th className="py-3 px-4 font-semibold">Ruang Belajar</th>
                      <th className="py-3 px-4 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {studentData.grades[selectedGrade].classes.map((cls, cIdx) => (
                      <tr key={cIdx} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-stone-900">
                          {cls.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-center text-emerald-800 tabular-nums">
                          {cls.studentCount} Siswa
                        </td>
                        <td className="py-3.5 px-5 text-stone-700 font-medium">
                          {cls.waliKelas}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500">
                          {cls.room}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-emerald-700 font-semibold text-[11px]">
                            Aktif KBM
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Galeri Prestasi Siswa */}
      {activeTab === 'prestasi' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['Semua', 'Sains & Teknologi', 'Seni & Budaya', 'Olahraga', 'Bahasa', 'Kepramukaan'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAchievementFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    achievementFilter === cat
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Menampilkan {filteredAchievements.length} Catatan Prestasi Terverifikasi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-amber-300 transition-all shadow-xs space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-700 flex items-center gap-1">
                      <Medal className="w-4 h-4" />
                      {ach.medal}
                    </span>
                    <span className="text-stone-500 text-[11px] uppercase tracking-wide">
                      Tingkat {ach.level} · {ach.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {ach.title}
                  </h3>

                  <div className="space-y-1 text-xs text-stone-600">
                    <p className="font-medium text-stone-900">{ach.studentName}</p>
                    <p className="text-stone-500">{ach.classGrade}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
                  <span className="block text-[10px] uppercase text-stone-400">Penyelenggara:</span>
                  <span className="font-medium text-stone-700">{ach.organizer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Ekstrakurikuler Talenta */}
      {activeTab === 'ekskul' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {studentData.extracurriculars.map((ekskul) => (
            <div
              key={ekskul.id}
              className="p-6 bg-white rounded-2xl border border-stone-200 space-y-4 hover:border-emerald-200 transition-all shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                    {ekskul.category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5">{ekskul.name}</h3>
                </div>
                <div className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-mono tabular-nums shrink-0">
                  {ekskul.memberCount} Siswa
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {ekskul.description}
              </p>

              <div className="space-y-1.5 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>Jadwal: {ekskul.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>Pembina: {ekskul.mentor}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Highlight: {ekskul.achievementsHighlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
