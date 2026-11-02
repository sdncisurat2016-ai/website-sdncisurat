import React, { useState, useMemo } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { StaffMember } from '../../types/school';
import {
  Search,
  Users,
  GraduationCap,
  Award,
  Mail,
  Phone,
  Briefcase,
  X,
  FileCheck,
  Building,
} from 'lucide-react';

export const SdmView: React.FC = () => {
  const { staff } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const categories = ['Semua', 'Pimpinan', 'Guru Mata Pelajaran', 'Guru BK', 'Tenaga Kependidikan'];

  // Filter & Search logic
  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchCat =
        selectedCategory === 'Semua' ? true : member.roleCategory === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.nip.includes(q) ||
        (member.subject && member.subject.toLowerCase().includes(q)) ||
        member.position.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [staff, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Page Header & Statistics Strip */}
      <div className="border-b border-stone-200 pb-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">
            <span>Sumber Daya Manusia (SDM)</span>
            <span aria-hidden="true">·</span>
            <span>Tenaga Pendidik &amp; Kependidikan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Direktori Guru &amp; Tenaga Kependidikan
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Didukung oleh para pendidik berdedikasi tinggi, bersertifikasi profesional, dan berpengalaman dalam mengampu Kurikulum Merdeka serta membina talenta siswa.
          </p>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="text-2xl font-bold text-stone-900 tabular-nums">{staff.length}</div>
            <div className="text-xs text-stone-500 font-medium">Total SDM Aktif</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="text-2xl font-bold text-emerald-700 tabular-nums">92%</div>
            <div className="text-xs text-stone-500 font-medium">Tersertifikasi Pendidik</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="text-2xl font-bold text-stone-900 tabular-nums">75%</div>
            <div className="text-xs text-stone-500 font-medium">PNS / PPPK Resmi</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-stone-200">
            <div className="text-2xl font-bold text-stone-900 tabular-nums">S2 &amp; S3</div>
            <div className="text-xs text-stone-500 font-medium">Kualifikasi Pascasarjana</div>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search Box */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
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

        {/* Search Input */}
        <div className="relative sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, NIP, atau mata pelajaran..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Staff Grid */}
      {filteredStaff.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
          <Users className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-900">Tidak ada data guru yang cocok</h3>
          <p className="text-xs text-stone-500 mt-1">Coba gunakan kata kunci pencarian atau kategori lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-emerald-200 transition-all shadow-xs flex flex-col justify-between group"
            >
              <div className="p-5 space-y-4">
                {/* Avatar with fallback container */}
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback styled avatar if link fails
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-stone-900 text-sm leading-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-emerald-800 font-medium truncate mt-0.5">
                      {member.position}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono tabular-nums block mt-0.5 truncate">
                      NIP: {member.nip}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                  {member.subject && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Mapel:</span>
                      <span className="font-medium text-stone-800 truncate max-w-[170px] text-right">
                        {member.subject}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Pendidikan:</span>
                    <span className="font-medium text-stone-800 truncate max-w-[170px] text-right">
                      {member.education.split(' ')[0]} {member.education.split(' ')[1] || ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Status:</span>
                    <span className="font-semibold text-stone-700">{member.employmentStatus}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  {member.certificationStatus === 'Tersertifikasi Pendidik' ? '✓ Tersertifikasi' : 'Dalam Proses'}
                </span>
                <button
                  onClick={() => setSelectedStaff(member)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  Detail Profil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedStaff(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                <img
                  src={selectedStaff.photoUrl}
                  alt={selectedStaff.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-stone-900 leading-snug">
                  {selectedStaff.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                  {selectedStaff.position}
                </p>
                <div className="mt-1 text-xs text-stone-500 space-y-0.5 font-mono tabular-nums">
                  <p>NIP: {selectedStaff.nip}</p>
                  {selectedStaff.nuptk && <p>NUPTK: {selectedStaff.nuptk}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs text-stone-700 border-t border-b border-stone-100 py-4">
              {selectedStaff.bio && (
                <div>
                  <span className="font-semibold text-stone-900 block mb-1">Riwayat &amp; Catatan Pengabdian</span>
                  <p className="text-stone-600 leading-relaxed italic">{selectedStaff.bio}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-stone-400 block">Kualifikasi Pendidikan:</span>
                  <span className="font-semibold text-stone-900">{selectedStaff.education}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Masa Pengabdian:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{selectedStaff.serviceYears} Tahun</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Status Kepegawaian:</span>
                  <span className="font-semibold text-stone-900">{selectedStaff.employmentStatus}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Sertifikasi Guru:</span>
                  <span className="font-semibold text-emerald-800">{selectedStaff.certificationStatus}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-stone-600">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{selectedStaff.email}</span>
                </div>
                {selectedStaff.phone && (
                  <div className="flex items-center gap-2 text-stone-600">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{selectedStaff.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
