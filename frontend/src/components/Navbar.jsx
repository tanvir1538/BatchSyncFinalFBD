import React, { useState } from 'react';

export const Navbar = ({
  currentRole,
  setCurrentRole,
  onOpenAddFaculty,
  onToggleMobileSidebar,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // User persona based on active screen
  const getPersona = () => {
    switch (currentRole) {
      case 'dean-portal':
        return { name: 'Prof. Dr. M. R. Karim', role: 'Dean of CSE', initials: 'MK', dept: 'Faculty of CSE' };
      case 'teacher-central':
        return { name: 'Dr. Shahria Kabir', role: 'Assoc. Prof • Dept of CSE', initials: 'SK', dept: 'Dept of CSE' };
      case 'cr-hub':
        return { name: 'Tanvir Ahmed', role: 'CR • CSE Batch 12', initials: 'TA', dept: '7th Semester' };
      case 'student-notes':
        return { name: 'Tanvir Hasan', role: 'Student • ID: 2102019', initials: 'TH', dept: 'CSE Batch 12' };
      case 'landing':
        return { name: 'Academic Guest', role: 'Public Visitor', initials: 'AG', dept: 'PSTU Portal' };
      default:
        return { name: 'Dr. Julian Vance', role: 'University Main Administrator', initials: 'JV', dept: 'Academic Registrar' };
    }
  };

  const persona = getPersona();

  const roleOptions = [
    { role: 'landing', title: 'Public Portal', subtitle: 'PSTU Academic Landing Page', icon: 'public', badge: 'Public' },
    { role: 'admin-dashboard', title: 'University Administration', subtitle: 'Senate Oversight & Central Admin', icon: 'admin_panel_settings', badge: 'Admin' },
    { role: 'admin-faculties', title: 'Faculty Provisioning Hub', subtitle: 'Dynamic Hierarchy & + Add Faculty', icon: 'domain', badge: 'Registrar' },
    { role: 'dean-portal', title: 'Dean Portal (CSE)', subtitle: 'Deanery Scoped: Prof. Dr. M. R. Karim', icon: 'account_balance', badge: 'Dean' },
    { role: 'teacher-central', title: 'Teacher Central', subtitle: 'Class Routine & Attendance: Dr. Kabir', icon: 'school', badge: 'Faculty' },
    { role: 'cr-hub', title: 'Class Rep (CR) Hub', subtitle: 'Batch 12 Coordination & Telegram Sync', icon: 'how_to_vote', badge: 'CR' },
    { role: 'student-notes', title: 'Student & Topper Vault', subtitle: 'Tanvir Hasan: Lecture Notes & Proofs', icon: 'menu_book', badge: 'Student' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/95 backdrop-blur-md border-b border-[#dde9ff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Registrar Secure Bar */}
      <div className="bg-[#001428] text-white px-4 md:px-6 h-7 flex items-center justify-between text-[11px] font-semibold tracking-wide">
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <span className="truncate">CENTRAL UNIVERSITY PORTAL • MAIN SYSTEM ADMINISTRATION</span>
          <span className="hidden sm:inline-block bg-[#465f88] text-white px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0">
            NODE-04 CENTRAL
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span className="hidden sm:inline">ALL SERVICES OPERATIONAL</span>
          </span>
          <span className="text-[#c3c6ce] font-mono text-[10px] hidden md:inline">UTC+06:00 DACCA</span>
        </div>
      </div>

      {/* Main Header Row */}
      <header className="h-16 px-4 md:px-6 flex items-center justify-between gap-3">
        {/* Left: Hamburger (mobile), Logo, Academic Year Context */}
        <div className="flex items-center gap-3 md:gap-6 min-w-0">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-1.5 text-[#43474d] hover:text-[#001428] rounded-lg hover:bg-[#eff4ff]"
              title="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          )}

          <div
            onClick={() => setCurrentRole('landing')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            title="Go to Public Landing Page"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xfi5QdjY9tZ66a1OcTFw35emzV8zvLQD6LqALwGxJELpJXzZPz9QluDJ_rwBxSX6g3uPAtwyNMs0diqBt8V6mMLbYldGewBOL3ZggYfiEiZD2mxJCrj2SafelEkw4S058JyA_e7NG1itk4zKADklmmK0RzLs8OqgrZFbTjk5S2ElnACT_VLV4OXMPslw1F8y0UHxBdVRM-jVsDL3fNHf4x4MHUTc0QDaAkgDwP0AGoiW-udV9R_q2T4Sk"
              alt="BatchSync Academic Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-display text-[19px] tracking-tight text-[#001428] font-bold leading-none">
                BatchSync
              </span>
              <span className="text-[10px] text-[#465f88] font-medium tracking-wide uppercase">
                Academic OS
              </span>
            </div>
          </div>

          {/* Academic Registry Dropdown */}
          <div className="hidden xl:flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1.5 rounded-lg border border-[#dde9ff] text-[12px] font-medium text-[#0d1c2f]">
            <span className="material-symbols-outlined text-[16px] text-[#465f88]">domain</span>
            <span>Central University Registry</span>
            <span className="material-symbols-outlined text-[14px] text-[#74777e]">arrow_drop_down</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1.5 rounded-lg border border-[#dde9ff] text-[12px] font-medium text-[#0d1c2f]">
            <span className="material-symbols-outlined text-[16px] text-[#465f88]">calendar_today</span>
            <span>Academic Year 2025–2026</span>
            <span className="material-symbols-outlined text-[14px] text-[#74777e]">arrow_drop_down</span>
          </div>
        </div>

        {/* Right: Search, Interactive Screen Switcher, Notifications, Persona */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Global search */}
          <div className="relative hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[17px] text-[#74777e]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculties, deans, users..."
              className="w-56 lg:w-64 pl-8 pr-12 py-1.5 bg-[#eff4ff] hover:bg-[#e6eeff] border border-[#dde9ff] rounded-lg text-[12px] text-[#0d1c2f] placeholder-[#74777e] focus:outline-none focus:border-[#465f88]"
            />
            <kbd className="absolute right-2 text-[10px] font-mono bg-[#dde9ff] text-[#465f88] px-1 py-0.5 rounded">
              ⌘K
            </kbd>
          </div>

          {/* SCREEN / ROLE SWITCHER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[12px] font-semibold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">switch_account</span>
              <span className="hidden sm:inline">Screen Mode:</span>
              <span className="text-[#aec7f7] font-bold capitalize">
                {roleOptions.find((r) => r.role === currentRole)?.badge || 'Switch'}
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#b0c9e8]">unfold_more</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#dde9ff] py-1.5 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#465f88] uppercase tracking-wider border-b border-[#eff4ff]">
                  Select Screen Experience
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-[#eff4ff]">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => {
                        setCurrentRole(opt.role);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#eff4ff] transition-colors ${
                        currentRole === opt.role ? 'bg-[#dde9ff]/50 font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="material-symbols-outlined text-[18px] text-[#465f88] mt-0.5">
                          {opt.icon}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[13px] text-[#0d1c2f] font-medium leading-tight truncate">
                            {opt.title}
                          </div>
                          <div className="text-[11px] text-[#43474d] truncate">
                            {opt.subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#465f88] shrink-0 font-mono">
                        {opt.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-[#43474d] hover:text-[#001428] hover:bg-[#eff4ff] rounded-lg transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                7
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#dde9ff] py-2 z-50">
                <div className="px-3.5 py-1.5 flex items-center justify-between border-b border-[#eff4ff]">
                  <span className="text-[12px] font-bold text-[#001428]">Pending Clearance Notifications</span>
                  <span className="text-[10px] bg-[#ffdad6] text-[#ba1a1a] px-1.5 py-0.5 rounded font-bold">7 new</span>
                </div>
                <div className="divide-y divide-[#eff4ff] max-h-72 overflow-y-auto">
                  <div className="p-3 hover:bg-[#eff4ff] transition-colors text-[12px]">
                    <div className="font-semibold text-[#0d1c2f]">Dean Authorization Awaiting</div>
                    <div className="text-[#43474d] text-[11px] mt-0.5">Dr. Shahriar Parvez (Law) & Dr. Zahid Hasan (Veterinary)</div>
                    <div className="text-[10px] text-[#74777e] mt-1 font-mono">15m ago • Central Clearance</div>
                  </div>
                  <div className="p-3 hover:bg-[#eff4ff] transition-colors text-[12px]">
                    <div className="font-semibold text-[#0d1c2f]">CSE-311 Room Shift Override</div>
                    <div className="text-[#43474d] text-[11px] mt-0.5">Shifted to Room 301 for high-lumen projector setup</div>
                    <div className="text-[10px] text-[#74777e] mt-1 font-mono">40m ago • Live Routine</div>
                  </div>
                  <div className="p-3 hover:bg-[#eff4ff] transition-colors text-[12px]">
                    <div className="font-semibold text-[#0d1c2f]">Telegram Relay Synced</div>
                    <div className="text-[#43474d] text-[11px] mt-0.5">@cse12_batchsync push confirmed with 54/54 deliveries</div>
                    <div className="text-[10px] text-emerald-700 mt-1 font-mono">1h ago • Webhook SLA 100%</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Persona Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#dde9ff]">
            <div className="text-right hidden sm:block">
              <div className="text-[12px] text-[#0d1c2f] font-semibold leading-tight">{persona.name}</div>
              <div className="text-[11px] text-[#465f88] leading-tight">{persona.role}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0f2942] text-white flex items-center justify-center font-bold text-[12px] shadow-sm">
              {persona.initials}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
