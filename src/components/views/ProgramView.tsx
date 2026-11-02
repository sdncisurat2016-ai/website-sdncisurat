import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  GraduationCap,
  Leaf,
  Layers,
  Sparkles,
  Users,
  Award,
} from 'lucide-react';

export const ProgramView: React.FC = () => {
  const { programs } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Kurikulum Merdeka',
    'Adiwiyata & Lingkungan',
    'Literasi & Digital',
    'Pengembangan Karakter',
    'Klinik Prestasi',
    'PPDB Online',
  ];

  const filteredPrograms = programs.filter((p) => {
    if (selectedCategory === 'Semua') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">
            <span>Rencana Strategis &amp; Program Unggulan</span>
            <span aria-hidden="true">·</span>
            <span>Tahun Ajaran 2026/2027</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Program Kerja &amp; Inovasi Sekolah
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Menghadirkan program berdampak bagi transformasi mutu belajar, pembinaan budi pekerti, keunggulan sains adiwiyata, serta transparansi alur PPDB.
          </p>
        </div>

        {/* Category Pills (Interactive Filter Controls - §1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPrograms.map((prog) => {
          let statusBadge = 'text-emerald-700 bg-emerald-50 border-emerald-200';
          if (prog.status === 'Terencana') {
            statusBadge = 'text-sky-700 bg-sky-50 border-sky-200';
          } else if (prog.status === 'Selesai') {
            statusBadge = 'text-stone-700 bg-stone-100 border-stone-200';
          }

          return (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 hover:border-emerald-200 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    {prog.category}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusBadge}`}
                  >
                    {prog.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 leading-snug">
                  {prog.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {prog.description}
                </p>

                {/* Key Indicators */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Indikator Keberhasilan Program:
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-600">
                    {prog.keyIndicators.map((ind, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Program Footer Metadata */}
              <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Sasaran:</span>
                  <span className="font-medium text-stone-800 text-right">{prog.targetAudience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Periode:</span>
                  <span className="font-medium text-stone-800 text-right">{prog.period}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span>Penanggung Jawab:</span>
                  <span className="font-semibold text-emerald-900 text-right">{prog.pic}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modul Khusus: PPDB (Penerimaan Peserta Didik Baru 2026/2027) */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-10 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            <GraduationCap className="w-4 h-4" />
            <span>Penerimaan Murid Baru Terpadu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Informasi Alur &amp; Persyaratan PPDB 2026/2027
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Penerimaan Peserta Didik Baru jenjang Sekolah Dasar (SD) diselenggarakan secara transparan, bebas biaya (gratis), tanpa tes calistung, dan terkoordinasi dengan Dinas Pendidikan Kabupaten Sumedang.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="text-amber-400 font-bold text-lg font-mono">01.</div>
            <h4 className="font-bold text-white text-sm">Registrasi Akun Daring</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Orang tua/calon siswa membuat akun melalui portal resmi PPDB daerah dengan memasukkan NISN dan NIK.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="text-amber-400 font-bold text-lg font-mono">02.</div>
            <h4 className="font-bold text-white text-sm">Pemilihan Jalur &amp; Berkas</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Memilih 1 dari 4 jalur resmi (Zonasi, Prestasi, Afirmasi, Mutasi) dan mengunggah dokumen terverifikasi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="text-amber-400 font-bold text-lg font-mono">03.</div>
            <h4 className="font-bold text-white text-sm">Seleksi &amp; Pemeringkatan</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Sistem melakukan pemeringkatan otomatis secara terbuka. Pemantauan posisi ranking dapat diakses publik 24 jam.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="text-amber-400 font-bold text-lg font-mono">04.</div>
            <h4 className="font-bold text-white text-sm">Pengumuman &amp; Daftar Ulang</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Siswa yang dinyatakan lolos wajib melakukan lapor diri dan orientasi pengenalan lingkungan sekolah (MPLS).
            </p>
          </div>
        </div>

        {/* 4 Jalur Resmi Cards */}
        <div className="pt-6 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
            <span className="text-emerald-400 font-bold block text-sm">50% Jalur Zonasi</span>
            <span className="text-stone-400 text-[11px] mt-0.5 block">Radius domisili kartu keluarga terdekat dari sekolah</span>
          </div>
          <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
            <span className="text-emerald-400 font-bold block text-sm">30% Jalur Prestasi</span>
            <span className="text-stone-400 text-[11px] mt-0.5 block">Nilai rapor SD dan sertifikat kejuaraan sains/seni</span>
          </div>
          <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
            <span className="text-emerald-400 font-bold block text-sm">15% Jalur Afirmasi</span>
            <span className="text-stone-400 text-[11px] mt-0.5 block">Pemegang KIP / PKH / Disabilitas ramah belajar</span>
          </div>
          <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800">
            <span className="text-emerald-400 font-bold block text-sm">5% Perpindahan Ortu</span>
            <span className="text-stone-400 text-[11px] mt-0.5 block">Surat penugasan resmi instansi atau anak guru</span>
          </div>
        </div>
      </section>
    </div>
  );
};
