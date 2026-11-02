import React, { useState, useMemo } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolActivity } from '../../types/school';
import {
  Calendar,
  Search,
  User,
  ArrowRight,
  X,
  Tag,
  Share2,
  Sparkles,
} from 'lucide-react';

export const ActivityView: React.FC = () => {
  const { activities } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<SchoolActivity | null>(null);

  const categories = [
    'Semua',
    'P5 & Karakter',
    'Akademik & Sains',
    'Olahraga & Seni',
    'Kepramukaan',
    'Sosial & Lingkungan',
  ];

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Must be published for public view
      if (!act.isPublished) return false;

      const matchCat =
        selectedCategory === 'Semua' ? true : act.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        act.title.toLowerCase().includes(q) ||
        act.content.toLowerCase().includes(q) ||
        act.author.toLowerCase().includes(q) ||
        act.tags.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [activities, selectedCategory, searchQuery]);

  // Lead Story (first activity) and secondary activities
  const leadActivity = filteredActivities[0];
  const secondaryActivities = filteredActivities.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">
            <span>Warta &amp; Dokumentasi Siswa</span>
            <span aria-hidden="true">·</span>
            <span>Kabar Satuan Pendidikan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Kegiatan Peserta Didik &amp; Agenda Sekolah
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Menampilkan catatan dokumentasi Proyek Profil Pelajar Pancasila (P5), kemah kepramukaan, kompetisi sains, pentas budaya, dan karya inovasi murid.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
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

          <div className="relative sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul berita atau tag..."
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
      </div>

      {filteredActivities.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
          <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-900">Belum ada dokumentasi untuk kriteria ini</h3>
          <p className="text-xs text-stone-500 mt-1">Gunakan kata kunci lain atau pilih kategori "Semua".</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Pattern C: Editorial Front-Page Lead Story */}
          {leadActivity && (
            <div
              onClick={() => setSelectedActivity(leadActivity)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
            >
              <div className="lg:col-span-7 h-72 sm:h-96 overflow-hidden bg-stone-100">
                <img
                  src={leadActivity.imageUrl}
                  alt={leadActivity.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-emerald-800 uppercase tracking-wide">
                      {leadActivity.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Calendar className="w-3.5 h-3.5" />
                      {leadActivity.date}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {leadActivity.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-4">
                    {leadActivity.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Oleh {leadActivity.author}</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Baca Liputan Lengkap <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Features Grid */}
          {secondaryActivities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryActivities.map((act) => (
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
                      <span className="text-stone-500 truncate max-w-[170px]">
                        Oleh {act.author}
                      </span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        Baca <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Detail Berita Kegiatan */}
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
                <span>Penulis: {selectedActivity.author}</span>
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
