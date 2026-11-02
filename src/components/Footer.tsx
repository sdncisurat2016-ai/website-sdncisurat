import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { MapPin, Phone, Mail, Globe, Shield, ExternalLink } from 'lucide-react';
import { ActiveNavTab } from '../types/school';

interface FooterProps {
  setActiveTab: (tab: ActiveNavTab) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenLogin }) => {
  const { profile, adminUser } = useSchool();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                SD
              </div>
              <div>
                <span className="text-base font-bold text-white block leading-tight">
                  {profile.name}
                </span>
                <span className="text-xs text-stone-400">NPSN: {profile.npsn}</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Mewujudkan ekosistem sekolah merdeka belajar yang unggul dalam ilmu pengetahuan, berkarakter mulia, serta berwawasan lingkungan hijau.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p>Status: <span className="text-white font-medium">{profile.status}</span></p>
              <p>Akreditasi: <span className="text-emerald-400 font-semibold">{profile.accreditation} (Nilai {profile.accreditationScore})</span></p>
              <p>Kurikulum: <span className="text-stone-300">{profile.curriculum}</span></p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Jelajah Informasi
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setActiveTab('profil')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Profil, Visi Misi &amp; Sejarah
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('sdm')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Direktori Guru &amp; Tenaga Kependidikan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('siswa')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Statistik Siswa &amp; Prestasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('kegiatan')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Dokumentasi Berita &amp; Kegiatan Siswa
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('program')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Program Unggulan &amp; Informasi PPDB
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontak &amp; Alamat
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  {profile.address.street}, {profile.address.subdistrict}, {profile.address.city}, {profile.address.province} {profile.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{profile.phone} / {profile.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{profile.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{profile.website}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Administrative Management Portal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Pengelolaan Konten
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Portal internal manajemen data pokok, publikasi kegiatan, direktori kepegawaian, dan pengumuman resmi.
            </p>
            {adminUser ? (
              <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> Admin Aktif
                  </span>
                  <span className="text-[11px] text-stone-400">{adminUser.role}</span>
                </div>
                <p className="text-xs text-white font-medium truncate">{adminUser.name}</p>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-colors text-center"
                >
                  Buka Panel Admin
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                Masuk Sesi Pengelola Admin
              </button>
            )}
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center gap-2 text-[11px] text-stone-500">
              <ExternalLink className="w-3 h-3" />
              <span>Terhubung Sistem Informasi Dapodik Kemdikbud</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Situs Resmi Satuan Pendidikan</span>
            <span aria-hidden="true">·</span>
            <span>Kurikulum Merdeka</span>
            <span aria-hidden="true">·</span>
            <span>Sekolah Adiwiyata</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
