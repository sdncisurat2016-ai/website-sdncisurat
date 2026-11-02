import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { LoginModal } from './components/LoginModal';
import { HomeView } from './components/views/HomeView';
import { ProfileView } from './components/views/ProfileView';
import { SdmView } from './components/views/SdmView';
import { StudentView } from './components/views/StudentView';
import { ActivityView } from './components/views/ActivityView';
import { ProgramView } from './components/views/ProgramView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { ActiveNavTab } from './types/school';

const MainLayout: React.FC = () => {
  const { adminUser } = useSchool();
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('beranda');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // If user requests admin tab directly but is not authenticated, prompt login modal
  const handleNavClick = (tab: ActiveNavTab) => {
    if (tab === 'admin' && !adminUser) {
      setIsLoginModalOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'beranda' && <HomeView setActiveTab={handleNavClick} />}
        {activeTab === 'profil' && <ProfileView />}
        {activeTab === 'sdm' && <SdmView />}
        {activeTab === 'siswa' && <StudentView />}
        {activeTab === 'kegiatan' && <ActivityView />}
        {activeTab === 'program' && <ProgramView />}
        {activeTab === 'admin' && adminUser && (
          <AdminDashboardView setActiveTab={handleNavClick} />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer setActiveTab={handleNavClick} onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccessNavigate={() => {
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Toast Feedback Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <MainLayout />
    </SchoolProvider>
  );
}
