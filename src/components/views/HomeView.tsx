import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ActiveNavTab, SchoolActivity } from '../../types/school';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ActiveNavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const { profile, staff, activities, programs, studentData } = useSchool();
  const [selectedActivity, setSelectedActivity] = useState<SchoolActivity | null>(null);

  // Latest 3 published activities
  const latestActivities = activities.filter((a) => a.isPublished).slice(0, 3);
  // Latest 3 achievements
  const topAchievements = studentData.achievements.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/70 to-white pt-8 lg:pt-14 pb-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <span className="uppercase tracking-widest">Satuan Pendidikan Rujukan Nasional</span>
                <span aria-hidden="true">·</span>
                <span>Sekolah Penggerak Mandiri</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
                {profile.name}
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                {profile.heroSubheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('profil')}
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  Jelajahi Profil Sekolah
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('program')}
                  className="px-5 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  Program Unggulan &amp; PPDB
                </button>
                <button
                  onClick={() => setActiveTab('kegiatan')}
                  className="px-4 py-3 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Agenda Kegiatan Siswa
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-500 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Kurikulum Merdeka Mandiri Berbagi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Predikat Adiwiyata Mandiri</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Smart Campus Ramah Anak</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100 group">
                <img
                  src="/src/assets/images/school_building_front_1793584839409.jpg"
                  alt={`Gedung ${profile.name}`}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
                    {profile.shortName} · Kec. Wado
                  </p>
                  <p className="text-sm font-medium leading-snug">
                    Lingkungan belajar ramah anak, berakhlak mulia, dan berwawasan budaya Sunda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Metric Strip below Hero Split (§5.13) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-8 border-t border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900 tabular-nums">
                    {studentData.totalStudents}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">Peserta Didik Aktif</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900 tabular-nums">{staff.length}</div>
                  <div className="text-xs text-stone-500 font-medium">Guru &amp; Tenaga Kependidikan</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900 tabular-nums">
                    {profile.accreditation} ({profile.accreditationScore})
                  </div>
                  <div className="text-xs text-stone-500 font-medium">Akreditasi BAN-S/M</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900 tabular-nums">
                    {studentData.totalClasses}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">Rombongan Belajar (Rombel)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            {/* Principal Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <img
                  src={profile.headmaster.photoUrl}
                  alt={profile.headmaster.name}
                  className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl border-4 border-stone-100 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[11px] font-medium py-1 px-3 rounded-full whitespace-nowrap shadow-sm">
                  Kepala Satuan Pendidikan
                </div>
              </div>
            </div>

            {/* Principal Greeting */}
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Sambutan Kepala Sekolah
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
                "{profile.headmaster.greetingTitle}"
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed italic">
                {profile.headmaster.greetingMessage}
              </p>
              <div className="pt-2 border-t border-stone-100">
                <div className="font-bold text-stone-900 text-base">
                  {profile.headmaster.name}
                </div>
                <div className="text-xs text-stone-500 tabular-nums">
                  NIP: {profile.headmaster.nip}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Unggulan Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Program Prioritas
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Inovasi Program Pendidikan Unggulan
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('program')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Lihat Semua Program &amp; PPDB
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.slice(0, 3).map((prog) => (
            <div
              key={prog.id}
              className="p-6 bg-white rounded-2xl border border-stone-200 hover:border-emerald-200 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>{prog.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">{prog.status}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 leading-snug">
                  {prog.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {prog.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 truncate max-w-[200px]">PJ: {prog.pic.split('(')[0]}</span>
                <button
                  onClick={() => setActiveTab('program')}
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kegiatan Siswa & Berita Terkini */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Dokumentasi &amp; Berita
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Kegiatan &amp; Prestasi Peserta Didik Terkini
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('kegiatan')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Buka Seluruh Galeri Kegiatan
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestActivities.map((act) => (
            <article
              key={act.id}
              onClick={() => setSelectedActivity(act)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={act.imageUrl}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-medium text-emerald-800">{act.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Calendar className="w-3.5 h-3.5" />
                      {act.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {act.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {act.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 truncate max-w-[180px]">Oleh {act.author}</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    Baca <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Prestasi Siswa Terkini Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-10 overflow-hidden relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4" /> Gelar Kejuaraan Siswa
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Prestasi Gemilang Tingkat Nasional &amp; Daerah
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('siswa')}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              Lihat Rekap Seluruh Prestasi
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topAchievements.map((ach) => (
              <div
                key={ach.id}
                className="p-5 bg-stone-800/80 rounded-xl border border-stone-700 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-semibold">{ach.medal}</span>
                  <span className="text-stone-400 text-[11px] uppercase tracking-wide">
                    Tingkat {ach.level}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {ach.title}
                </h3>
                <div className="text-xs text-stone-400 space-y-1 pt-2 border-t border-stone-700/60">
                  <p className="text-stone-300 font-medium truncate">{ach.studentName}</p>
                  <p className="text-[11px] text-stone-400 truncate">{ach.competitionName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Baca Detail Kegiatan Siswa */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-emerald-800">{selectedActivity.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{selectedActivity.date}</span>
                <span aria-hidden="true">·</span>
                <span>Oleh {selectedActivity.author}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {selectedActivity.title}
              </h2>

              <div className="rounded-xl overflow-hidden bg-stone-100 max-h-80">
                <img
                  src={selectedActivity.imageUrl}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="prose prose-stone text-sm text-stone-700 leading-relaxed whitespace-pre-line pt-2">
                {selectedActivity.content}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-100">
                {selectedActivity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
