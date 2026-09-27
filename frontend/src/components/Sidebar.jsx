import React from 'react';

export const Sidebar = ({
  currentRole,
  setCurrentRole,
  facultyCount,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', role: 'admin-dashboard' },
      ],
    },
    {
      group: 'University',
      items: [
        { id: 'faculties', label: 'Faculties', icon: 'account_balance', role: 'admin-faculties', badge: facultyCount },
        { id: 'dean-portal', label: 'Deanery (CSE)', icon: 'domain', role: 'dean-portal' },
        { id: 'batches', label: 'Batches (CR Hub)', icon: 'groups_2', role: 'cr-hub', badge: 'CSE 12' },
      ],
    },
    {
      group: 'People',
      items: [
        { id: 'deans', label: 'Deans', icon: 'badge', role: 'admin-faculties' },
        { id: 'teachers', label: 'Teacher Central', icon: 'school', role: 'teacher-central' },
        { id: 'students', label: 'Student Notes Vault', icon: 'person_pin', role: 'student-notes', badge: 'New' },
        { id: 'landing', label: 'Public Portal', icon: 'public', role: 'landing' },
      ],
    },
    {
      group: 'Reports & Logs',
      items: [
        { id: 'reports', label: 'Accreditation Reports', icon: 'analytics', role: 'admin-dashboard' },
        { id: 'activity', label: 'System Audit Logs', icon: 'receipt_long', role: 'admin-dashboard' },
      ],
    },
    {
      group: 'System',
      items: [
        { id: 'settings', label: 'System Settings', icon: 'settings', role: 'admin-dashboard' },
        { id: 'profile', label: 'Administrator Profile', icon: 'account_circle', role: 'admin-dashboard' },
      ],
    },
  ];

  const handleNavClick = (role) => {
    setCurrentRole(role);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#001428]/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-[92px] h-[calc(100vh-92px)] w-64 bg-[#eff4ff] border-r border-[#dde9ff] z-40 flex flex-col py-3 overflow-y-auto transition-transform duration-200 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="flex-1 px-3 flex flex-col gap-1">
          {navItems.map((section) => (
            <div key={section.group} className="mb-2">
              <div className="px-2.5 pt-2 pb-1 text-[11px] uppercase tracking-wider text-[#465f88] font-bold">
                {section.group}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentRole === item.role;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.role)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                        isActive
                          ? 'bg-[#0f2942] text-white font-semibold shadow-xs'
                          : 'text-[#43474d] hover:bg-[#e6eeff] hover:text-[#0d1c2f]'
                      }`}
                    >
                      <div className="flex items-center">
                        <span
                          className={`material-symbols-outlined mr-3 text-[19px] ${
                            isActive ? 'text-white' : 'text-[#465f88]'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full font-mono ${
                            isActive
                              ? 'bg-[#465f88] text-white'
                              : 'bg-[#b6d0ff] text-[#0f2942]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer info pill */}
        <div className="px-3 pt-3 border-t border-[#dde9ff] mt-auto">
          <div className="bg-[#e6eeff] p-3 rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#465f88] font-semibold">Central Platform</span>
              <span className="font-mono text-[12px] text-[#0d1c2f] font-bold">v4.2.0-Admin</span>
            </div>
            <span className="material-symbols-outlined text-[#465f88] text-[20px]">verified</span>
          </div>
        </div>
      </aside>
    </>
  );
};
