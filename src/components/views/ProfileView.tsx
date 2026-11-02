import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Building2,
  CheckCircle2,
  Compass,
  FileCheck,
  History,
  MapPin,
  Mail,
  Phone,
  Shield,
  Sparkles,
  Users2,
  Cpu,
  FlaskConical,
  BookOpen,
  Trophy,
  Music,
  HeartPulse,
  Utensils,
  Share2,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile } = useSchool();
  const [activeSubTab, setActiveSubTab] = useState<'identitas' | 'visimisi' | 'sejarah' | 'fasilitas' | 'organisasi'>('identitas');

  // Facility icons mapper
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return Cpu;
      case 'FlaskConical':
        return FlaskConical;
      case 'BookOpen':
        return BookOpen;
      case 'Trophy':
        return Trophy;
      case 'Music':
        return Music;
      case 'HeartPulse':
        return HeartPulse;
      case 'Utensils':
        return Utensils;
      default:
        return Compass;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">
          <span>Profil Kelembagaan</span>
          <span aria-hidden="true">·</span>
          <span>NPSN: {profile.npsn}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Profil {profile.name}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Mengenal lebih dekat identitas resmi, sejarah perjalanan, visi-misi pendidikan, fasilitas unggulan, serta tata kelola organisasi satuan pendidikan.
        </p>

        {/* Sub-navigation tabs (Interactive Filter Controls - §1.A) */}
        <div className="flex items-center gap-1.5 pt-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'identitas', label: 'Identitas & Akreditasi', icon: FileCheck },
            { id: 'visimisi', label: 'Visi, Misi & Karakter', icon: Compass },
            { id: 'sejarah', label: 'Sejarah Perjalanan', icon: History },
            { id: 'fasilitas', label: 'Sarana & Fasilitas', icon: Building2 },
            { id: 'organisasi', label: 'Struktur Organisasi', icon: Users2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
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

      {/* SubTab 1: Identitas & Akreditasi */}
      {activeSubTab === 'identitas' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kartu Data Pokok */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-700" />
                Data Pokok Satuan Pendidikan (Dapodik)
              </h3>
              <dl className="divide-y divide-stone-100 text-sm">
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">Nama Sekolah</dt>
                  <dd className="font-semibold text-stone-900 text-right">{profile.name}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">Nomor Pokok Sekolah Nasional (NPSN)</dt>
                  <dd className="font-mono font-semibold text-emerald-800 text-right tabular-nums">{profile.npsn}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">Bentuk Pendidikan</dt>
                  <dd className="font-medium text-stone-900 text-right">{profile.level}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">Status Sekolah</dt>
                  <dd className="font-medium text-stone-900 text-right">{profile.status}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">Kurikulum Diterapkan</dt>
                  <dd className="font-medium text-stone-900 text-right">{profile.curriculum}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">Tahun Berdiri</dt>
                  <dd className="font-medium text-stone-900 text-right tabular-nums">{profile.foundedYear}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">SK Pendirian Sekolah</dt>
                  <dd className="font-medium text-stone-900 text-right">No. 0299/O/1982</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="text-stone-500 font-medium">Kepala Satuan Pendidikan</dt>
                  <dd className="font-semibold text-stone-900 text-right">{profile.headmaster.name}</dd>
                </div>
              </dl>
            </div>

            {/* Kartu Status Akreditasi & Sertifikasi */}
            <div className="space-y-6">
              <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                    Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M)
                  </span>
                  <Shield className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-white">
                    {profile.accreditation}
                  </span>
                  <span className="text-emerald-200 text-lg font-medium">
                    (Nilai {profile.accreditationScore} / Terakreditasi B)
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Berdasarkan Sertifikat Akreditasi Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M). Memenuhi 8 Standar Nasional Pendidikan (SNP) jenjang Sekolah Dasar.
                </p>
                <div className="pt-3 border-t border-emerald-800 text-xs text-emerald-200">
                  Masa Berlaku Akreditasi: Terakreditasi Resmi BAN-S/M
                </div>
              </div>

              {/* Sertifikasi & Penghargaan Lembaga */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <h4 className="text-sm font-bold text-stone-900">Legitimasi &amp; Penyelenggaraan Satuan Pendidikan</h4>
                <div className="space-y-3 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-stone-900">Pelaksana Kurikulum Merdeka (Mandiri Berubah)</p>
                      <p className="text-stone-500">Menerapkan pembelajaran berpusat pada murid &amp; Proyek P5.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-stone-900">Digitalisasi Pembelajaran Akun Belajar.id</p>
                      <p className="text-stone-500">Fasilitas Chromebook bantuan Kemdikbudristek untuk simulasi ANBK.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-stone-900">Satuan Pendidikan Ramah Anak &amp; Berkarakter</p>
                      <p className="text-stone-500">Kecamatan Wado, Dinas Pendidikan Kabupaten Sumedang.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Visi, Misi & Karakter */}
      {activeSubTab === 'visimisi' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Visi */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-8 sm:p-10 space-y-3">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Visi Satuan Pendidikan
            </span>
            <p className="text-xl sm:text-2xl font-serif font-medium italic text-stone-100 leading-relaxed">
              "{profile.vision}"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Misi */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-700" />
                Misi Satuan Pendidikan
              </h3>
              <ol className="space-y-3.5 text-sm text-stone-700">
                {profile.missions.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Nilai Budaya Karakter */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                4 Nilai Luhur Budaya Sekolah
              </h3>
              <div className="space-y-4">
                {profile.coreValues.map((val, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                    <h4 className="font-bold text-stone-900 text-sm mb-1">{val.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{val.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Sejarah */}
      {activeSubTab === 'sejarah' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
          <div className="max-w-3xl space-y-4">
            <h3 className="text-2xl font-bold text-stone-900">Perjalanan dan Kilas Sejarah</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              SD Negeri Cisurat berlokasi di Desa Cisurat, Kecamatan Wado, Kabupaten Sumedang. Didirikan untuk memfasilitasi kebutuhan akses pendidikan dasar bagi putra-putri masyarakat desa setempat. Dengan penuh keikhlasan para sesepuh guru, sekolah ini terus mengabdi membina generasi cerdas, berkarakter budi pekerti, dan mencintai khazanah seni budaya Sunda.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-200 space-y-8">
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-700 border-4 border-white shadow-xs" />
              <div className="text-xs font-bold text-emerald-800">1984 - Era Pendirian &amp; Pengabdian Awal</div>
              <h4 className="text-base font-bold text-stone-900 mt-1">Pendirian Resmi SD Negeri Cisurat</h4>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Penyelenggaraan proses belajar mengajar perdana tingkat sekolah dasar melayani anak-anak usia sekolah di lingkungan Desa Cisurat Wado.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-700 border-4 border-white shadow-xs" />
              <div className="text-xs font-bold text-emerald-800">2010 - Pembenahan Sarana &amp; Perpustakaan</div>
              <h4 className="text-base font-bold text-stone-900 mt-1">Rehabilitasi Ruang Kelas &amp; Pojok Baca Siswa</h4>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Peningkatan sarana ruang belajar, penataan lapangan upacara, dan penambahan buku bacaan ramah anak.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-700 border-4 border-white shadow-xs" />
              <div className="text-xs font-bold text-emerald-800">2022 - Akreditasi B (Nilai 89)</div>
              <h4 className="text-base font-bold text-stone-900 mt-1">Penetapan Akreditasi Resmi BAN-S/M</h4>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Badan Akreditasi Nasional Sekolah/Madrasah menetapkan predikat Akreditasi B dengan capaian nilai 89 untuk mutu layanan pendidikan.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-700 border-4 border-white shadow-xs" />
              <div className="text-xs font-bold text-emerald-800">2024 - Sekarang - Kurikulum Merdeka &amp; Chromebook</div>
              <h4 className="text-base font-bold text-stone-900 mt-1">Digitalisasi Akun Belajar.id &amp; Penguatan P5</h4>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Implementasi Kurikulum Merdeka Mandiri Berubah, pelaksanaan simulasi ANBK mandiri, dan penguatan nilai Profil Pelajar Pancasila.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Sarana & Fasilitas */}
      {activeSubTab === 'fasilitas' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500 font-medium">
              Menampilkan {profile.facilities.length} fasilitas utama pendukung proses belajar mengajar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.facilities.map((fac) => {
              const Icon = getFacilityIcon(fac.iconName);
              return (
                <div
                  key={fac.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 hover:border-emerald-200 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm leading-snug">{fac.name}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{fac.description}</p>
                  </div>
                  {fac.capacity && (
                    <div className="pt-2 text-[11px] text-stone-500 font-medium border-t border-stone-100">
                      Kapasitas: {fac.capacity}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SubTab 5: Struktur Organisasi */}
      {activeSubTab === 'organisasi' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl font-bold text-stone-900">Bagan Struktur Pimpinan &amp; Tata Kelola</h3>
            <p className="text-xs text-stone-500 mt-1">
              Struktur manajerial satuan pendidikan periode Tahun Ajaran 2026/2027.
            </p>
          </div>

          {/* Organizational Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.organization.map((org) => (
              <div
                key={org.id}
                className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2"
              >
                <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                  {org.role}
                </div>
                <h4 className="font-bold text-stone-900 text-sm">{org.name}</h4>
                <div className="text-xs text-stone-500 tabular-nums">NIP: {org.nip}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lokasi & Kontak Operasional */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-700" />
          Lokasi Kampus &amp; Layanan Publik
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
          <div className="space-y-3">
            <h4 className="font-semibold text-stone-900">Alamat Lengkap</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {profile.address.street}, {profile.address.subdistrict}, {profile.address.city},{' '}
              {profile.address.province} {profile.address.postalCode}
            </p>
            <p className="text-xs text-stone-500">
              Wilayah: Desa Cisurat, Kecamatan Wado, Kabupaten Sumedang (Jawa Barat)
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-stone-900">Jam Pelayanan Tata Usaha</h4>
            <ul className="text-xs text-stone-600 space-y-1">
              <li>Senin - Kamis: 07.00 - 15.30 WIB</li>
              <li>Jumat: 07.00 - 11.30 WIB &amp; 13.00 - 15.00 WIB</li>
              <li>Sabtu - Minggu: Libur Operasional</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-stone-900">Kontak Cepat Sekolah</h4>
            <ul className="text-xs text-stone-600 space-y-1">
              <li>Telepon: {profile.phone}</li>
              <li>WhatsApp Layanan: {profile.whatsapp}</li>
              <li>Pos-el: {profile.email}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
