import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { ActiveNavTab } from '../types/school';
import { ShieldCheck, LogOut, Menu, X, Bell } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenLogin }) => {
  const { profile, adminUser, logoutAdmin } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active urgent announcement
  const activeUrgentAnnouncement = profile.announcements.find((a) => a.active);

  const navLinks: { id: ActiveNavTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'sdm', label: 'Data SDM' },
    { id: 'siswa', label: 'Data Siswa' },
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'program', label: 'Program' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Pattern A: Operational Utility Ribbon */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden text-[11px] sm:text-xs">
            <span className="font-semibold text-emerald-400 whitespace-nowrap">NPSN: {profile.npsn}</span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <span className="whitespace-nowrap">Akreditasi {profile.accreditation} (Nilai {profile.accreditationScore})</span>
            <span className="text-stone-600 hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline whitespace-nowrap">{profile.address.city}</span>
            <span className="text-stone-600 hidden lg:inline" aria-hidden="true">·</span>
            <span className="hidden lg:inline whitespace-nowrap">Pelayanan: 07.00 - 15.30 WIB</span>
          </div>

          {activeUrgentAnnouncement && (
            <div className="flex items-center gap-2 text-stone-200 text-[11px] max-w-md truncate">
              <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{activeUrgentAnnouncement.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => {
              setActiveTab('beranda');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-800 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
              SD
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-stone-900 block leading-tight whitespace-nowrap">
                {profile.shortName}
              </span>
              <span className="text-[11px] text-stone-500 font-medium block whitespace-nowrap">
                Kec. Wado, Kab. Sumedang
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive ? 'text-emerald-700 font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {adminUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'admin'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Dashboard Admin
                </button>
                <button
                  onClick={logoutAdmin}
                  title="Keluar Sesi Admin"
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  aria-label="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors shadow-xs cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Portal Admin
              </button>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {adminUser && (
              <button
                onClick={() => setActiveTab('admin')}
                className="p-2 text-emerald-700 bg-emerald-50 rounded-lg text-xs font-medium"
              >
                Admin
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg border border-stone-200"
              aria-label="Buka menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-stone-100">
            {adminUser ? (
              <div className="flex items-center justify-between px-3 py-2 bg-stone-50 rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-stone-900">{adminUser.name}</p>
                  <p className="text-[11px] text-stone-500">Sesi Admin Aktif</p>
                </div>
                <button
                  onClick={() => {
                    logoutAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-medium hover:underline"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-stone-900 text-white text-xs font-semibold rounded-xl text-center"
              >
                Masuk ke Portal Admin
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
