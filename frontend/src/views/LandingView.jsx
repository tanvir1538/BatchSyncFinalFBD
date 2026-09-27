import React from 'react';

export const LandingView = ({
  faculties,
  onSelectRole,
  onExploreFaculty,
}) => {
  return (
    <div className="w-full bg-[#f8f9ff]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0f2942]">
        {/* PSTU Building Image */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFCEHEueJZyBQRZ_tPc9WWOHeit_0Fe8G4Zui9nRTUnsSTKnD4Pj8cxOtikETSqn1oMR9FemNRW2hTEu4nZo8g0yVvubWB3pB--lQY5OLI8lMkcbtGJPZ9cndhGWuy8V1shqCknSlvJ9PUazrOlzlXqh23GiN7DD5bWLpY7bgdCkLb-bgDHrFtXYVCkcFpBiKImcyCzbyz76T1IiYuyeJKCj4nAnkGpDwRLJiRX8criLo_p-q4eMbB8-IHxO3XSW5NeA"
          alt="PSTU Campus Monument and Academic Complex"
          className="absolute inset-0 w-full h-full object-cover object-center scale-100"
        />
        {/* Elegant deep navy scrim/gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081726]/90 via-[#0F2942]/85 to-[#001428]/95 backdrop-blur-[0.5px]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 pb-16 flex flex-col items-center gap-6">
          {/* Academic Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#d6e3ff] animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-widest text-[#d6e3ff] font-semibold">
              Central Academic Operating System
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] leading-tight sm:leading-[60px] text-white tracking-tight font-bold">
            One University.<br />
            <span className="text-[#d6e3ff]">One Connected</span> Academic Platform.
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#d5e3fd] max-w-2xl font-normal leading-relaxed text-center">
            BatchSync connects university administration, Deans, teachers, CRs, and students through one centralized academic coordination platform.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#faculties-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#001428] font-semibold text-[13px] hover:bg-[#d6e3ff] transition-all shadow-md"
            >
              <span>Explore Faculties</span>
              <span className="material-symbols-outlined text-[18px]">south</span>
            </a>
            <button
              onClick={() => onSelectRole('admin-dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/15 border border-white/25 text-white font-medium text-[13px] hover:bg-white/25 transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>Launch Admin Console</span>
            </button>
          </div>

          {/* Live Node Status */}
          <div className="pt-3 flex items-center gap-2 text-[12px] text-[#dde9ff]">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>PSTU Campus Node • Synchronized UTC+06:00 DACCA</span>
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: FACULTY DIRECTORY ================= */}
      <section className="w-full bg-[#f8f9ff] py-14" id="faculties-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#465f88] text-[11px] uppercase tracking-wider mb-1 font-semibold">
                <span className="material-symbols-outlined text-[16px]">domain</span>
                Academic Divisions
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#001428] font-bold">University Faculties</h2>
            </div>
            <p className="text-[13px] text-[#43474d] max-w-md">
              Explore academic departments and unified batch schedules orchestrated across Patuakhali Science and Technology University.
            </p>
          </div>

          {/* Dynamic Faculty Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculties.map((fac) => (
              <div
                key={fac.id}
                className="p-6 rounded-xl bg-white border border-[#c3c6ce]/30 hover:border-[#465f88] transition-all flex flex-col justify-between shadow-sm group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-xs"
                      style={{ backgroundColor: fac.color || '#001428' }}
                    >
                      <span className="font-mono text-[14px] font-bold">{fac.code.slice(0, 2)}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-[#eff4ff] text-[#465f88] text-[11px] font-semibold">
                      {fac.departments ? fac.departments.length : 0} Departments
                    </span>
                  </div>
                  <h3 className="font-display text-[16px] text-[#001428] font-bold group-hover:text-[#465f88] transition-colors leading-snug">
                    {fac.name}
                  </h3>
                  <p className="text-[12px] text-[#43474d] mt-2 mb-4 leading-relaxed line-clamp-2">
                    {fac.description || 'Dedicated academic division providing accredited bachelor, masters and research degrees.'}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#eff4ff] flex items-center justify-between">
                  <span className="text-[11px] text-[#465f88] font-medium">{fac.batchesCount} Active Batches</span>
                  <button
                    onClick={() => {
                      onExploreFaculty(fac);
                    }}
                    className="text-[12px] font-semibold text-[#001428] inline-flex items-center gap-1 hover:text-[#465f88] group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>Explore Faculty</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: WHY UNIVERSITIES CHOOSE BATCHSYNC ================= */}
      <section className="w-full bg-[#eff4ff] py-14" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-[#465f88] text-[11px] uppercase tracking-wider mb-1 font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Institutional Reliability
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#001428] font-bold">Why Universities Choose BatchSync</h2>
            <p className="text-[13px] text-[#43474d] mt-1">
              One platform for academic coordination, communication, and everyday university operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#001428] text-white flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">sync</span>
                </div>
                <h3 className="font-display text-[18px] text-[#001428] font-bold mb-1">
                  Real-Time Dynamic Routine Sync
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed mb-4">
                  Eliminates outdated PDF timetables. Schedule changes made by faculty or administrative coordinators sync instantly across every student’s mobile device and desktop routine view.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#465f88] text-[11px] font-medium pt-2 border-t border-[#eff4ff]">
                <span className="material-symbols-outlined text-[16px]">bolt</span> Sub-second propagation across all batches
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#001428] text-white flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">meeting_room</span>
                </div>
                <h3 className="font-display text-[18px] text-[#001428] font-bold mb-1">
                  Zero-Conflict Room Engine
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed mb-4">
                  Intelligent spatial scheduling prevents double-booking across shared lecture halls, computer laboratories, and seminar halls, providing instantaneous alternative room suggestions.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#465f88] text-[11px] font-medium pt-2 border-t border-[#eff4ff]">
                <span className="material-symbols-outlined text-[16px]">check_circle</span> Automated classroom occupancy verification
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#001428] text-white flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">layers</span>
                </div>
                <h3 className="font-display text-[18px] text-[#001428] font-bold mb-1">
                  Master Routine vs Date-Specific Overrides
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed mb-4">
                  Maintain immutable Dean-approved semester blueprints while empowering instructors to post day-specific makeup sessions or venue swaps without disturbing recurring baselines.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#465f88] text-[11px] font-medium pt-2 border-t border-[#eff4ff]">
                <span className="material-symbols-outlined text-[16px]">security</span> Non-destructive calendar architecture
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#001428] text-white flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">groups</span>
                </div>
                <h3 className="font-display text-[18px] text-[#001428] font-bold mb-1">
                  Democratic Batch Collaboration
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed mb-4">
                  Integrates batch treasury records, course note repositories, democratic student polls, and verified Telegram broadcast bots into an accountable ecosystem for each batch cohort.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#465f88] text-[11px] font-medium pt-2 border-t border-[#eff4ff]">
                <span className="material-symbols-outlined text-[16px]">how_to_vote</span> Peer-verified CR tooling & transparency
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: HOW BATCHSYNC WORKS ================= */}
      <section className="w-full bg-[#f8f9ff] py-14" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-[#465f88] text-[11px] uppercase tracking-wider mb-1 font-semibold">
              <span className="material-symbols-outlined text-[16px]">route</span>
              System Workflow
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#001428] font-bold">How BatchSync Works</h2>
            <p className="text-[13px] text-[#43474d] mt-1">
              From administrative enrollment to real-time classroom coordination in four synchronized steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-5 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col">
              <span className="font-display text-3xl font-bold text-[#b0c9e8] mb-2">01</span>
              <h3 className="font-display text-[16px] text-[#001428] font-bold mb-1">University Setup</h3>
              <p className="text-[12px] text-[#43474d] leading-relaxed">
                Central registrar & academic calendar initialization with semester milestones, campus venues, and governance rules.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col">
              <span className="font-display text-3xl font-bold text-[#b0c9e8] mb-2">02</span>
              <h3 className="font-display text-[16px] text-[#001428] font-bold mb-1">Faculty & Dept Mgmt</h3>
              <p className="text-[12px] text-[#43474d] leading-relaxed">
                Deans & department heads establish curricula, approve master routine baselines, and designate specialized laboratories.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col">
              <span className="font-display text-3xl font-bold text-[#b0c9e8] mb-2">03</span>
              <h3 className="font-display text-[16px] text-[#001428] font-bold mb-1">Academic Coordination</h3>
              <p className="text-[12px] text-[#43474d] leading-relaxed">
                Teachers manage dynamic routines, classroom countdowns, digital attendance registers, and course resource distributions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#c3c6ce]/30 shadow-sm flex flex-col">
              <span className="font-display text-3xl font-bold text-[#b0c9e8] mb-2">04</span>
              <h3 className="font-display text-[16px] text-[#001428] font-bold mb-1">Real-Time Updates</h3>
              <p className="text-[12px] text-[#43474d] leading-relaxed">
                Automated schedule sync, instant override alerts, and Telegram webhook dispatches keep every student and CR synchronized.
              </p>
            </div>
          </div>

          {/* Stepper Breadcrumb */}
          <div className="w-full bg-[#eff4ff] rounded-xl p-5 border border-[#dde9ff] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#001428] font-bold text-[14px]">
              <span className="material-symbols-outlined text-[20px] text-[#465f88]">account_tree</span>
              <span>Organizational Flow:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[12px]">
              <span className="px-3 py-1 rounded bg-white text-[#001428] font-semibold shadow-xs">University</span>
              <span className="text-[#465f88] material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1 rounded bg-white text-[#001428] font-semibold shadow-xs">Faculty</span>
              <span className="text-[#465f88] material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1 rounded bg-white text-[#001428] font-semibold shadow-xs">Department</span>
              <span className="text-[#465f88] material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1 rounded bg-white text-[#001428] font-semibold shadow-xs">Batch</span>
              <span className="text-[#465f88] material-symbols-outlined text-[16px]">arrow_forward</span>
              <span className="px-3 py-1 rounded bg-[#001428] text-white font-semibold shadow-xs">Teachers / CRs / Students</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: ROLE-BASED ECOSYSTEM ================= */}
      <section className="w-full bg-white py-14 border-t border-[#dde9ff]" id="roles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-[#465f88] text-[11px] uppercase tracking-wider mb-1 font-semibold">
              <span className="material-symbols-outlined text-[16px]">badge</span>
              Role-Based Access
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#001428] font-bold">One Platform. Different Roles.</h2>
            <p className="text-[13px] text-[#43474d] mt-1">
              Tailored interfaces engineered for every tier of university responsibility. Click any card to launch its screen experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* 1. Main Admin */}
            <div
              onClick={() => onSelectRole('admin-dashboard')}
              className="p-5 rounded-xl bg-[#f8f9ff] border border-[#c3c6ce]/40 hover:border-[#001428] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#001428] text-white flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-semibold">Governance</span>
                <h3 className="font-display text-[16px] text-[#001428] font-bold mt-1 mb-2 group-hover:text-[#465f88]">
                  Main Admin
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed">
                  University-wide administration, faculty provisioning, API integrations & governance.
                </p>
              </div>
              <div className="pt-3 border-t border-[#dde9ff] mt-4 flex items-center justify-between text-[11px] text-[#465f88] font-semibold">
                <span>Central Control</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 2. Faculty Dean */}
            <div
              onClick={() => onSelectRole('dean-portal')}
              className="p-5 rounded-xl bg-[#f8f9ff] border border-[#c3c6ce]/40 hover:border-[#001428] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0f2942] text-white flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">account_balance</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-semibold">Oversight</span>
                <h3 className="font-display text-[16px] text-[#001428] font-bold mt-1 mb-2 group-hover:text-[#465f88]">
                  Faculty Dean
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed">
                  Faculty-level oversight, semester master routine approvals & room allocation governance.
                </p>
              </div>
              <div className="pt-3 border-t border-[#dde9ff] mt-4 flex items-center justify-between text-[11px] text-[#465f88] font-semibold">
                <span>Curricula Review</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 3. Teacher */}
            <div
              onClick={() => onSelectRole('teacher-central')}
              className="p-5 rounded-xl bg-[#f8f9ff] border border-[#c3c6ce]/40 hover:border-[#001428] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#465f88] text-white flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">co_present</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-semibold">Instruction</span>
                <h3 className="font-display text-[16px] text-[#001428] font-bold mt-1 mb-2 group-hover:text-[#465f88]">
                  Teacher
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed">
                  Academic management, live class countdown, routine overrides, digital attendance & grading.
                </p>
              </div>
              <div className="pt-3 border-t border-[#dde9ff] mt-4 flex items-center justify-between text-[11px] text-[#465f88] font-semibold">
                <span>Instant Booking</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 4. Batch CR */}
            <div
              onClick={() => onSelectRole('cr-hub')}
              className="p-5 rounded-xl bg-[#f8f9ff] border border-[#c3c6ce]/40 hover:border-[#001428] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0f2942] text-[#d6e3ff] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">how_to_vote</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-semibold">Coordination</span>
                <h3 className="font-display text-[16px] text-[#001428] font-bold mt-1 mb-2 group-hover:text-[#465f88]">
                  Batch CR
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed">
                  Batch coordination, student membership approvals, polls & batch treasury ledger.
                </p>
              </div>
              <div className="pt-3 border-t border-[#dde9ff] mt-4 flex items-center justify-between text-[11px] text-[#465f88] font-semibold">
                <span>Bot Dispatch</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 5. Student */}
            <div
              onClick={() => onSelectRole('student-notes')}
              className="p-5 rounded-xl bg-[#f8f9ff] border border-[#c3c6ce]/40 hover:border-[#001428] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#dde9ff] text-[#001428] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">school</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-semibold">Learning</span>
                <h3 className="font-display text-[16px] text-[#001428] font-bold mt-1 mb-2 group-hover:text-[#465f88]">
                  Student
                </h3>
                <p className="text-[12px] text-[#43474d] leading-relaxed">
                  Personalized dynamic daily routine, real-time change alerts, assignments & Topper Vault.
                </p>
              </div>
              <div className="pt-3 border-t border-[#dde9ff] mt-4 flex items-center justify-between text-[11px] text-[#465f88] font-semibold">
                <span>Topper's Vault</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA BANNER ================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="w-full rounded-2xl bg-[#001428] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#d6e3ff]/5 pointer-events-none"></div>
          <div className="max-w-xl text-center md:text-left z-10">
            <h2 className="font-display text-2xl sm:text-3xl text-white font-bold leading-tight">
              Ready to unify your campus operations?
            </h2>
            <p className="text-[13px] text-[#d5e3fd] mt-2 leading-relaxed">
              Experience how BatchSync coordinates faculties, faculty routines, batch communications, and student timetables in one synchronized ecosystem.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 z-10">
            <button
              onClick={() => onSelectRole('admin-dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#001428] font-semibold text-[13px] hover:bg-[#d6e3ff] transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Launch Live Dashboard</span>
            </button>
            <button
              onClick={() => onSelectRole('admin-faculties')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/15 border border-white/25 text-white font-semibold text-[13px] hover:bg-white/25 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">domain_add</span>
              <span>Provision New Faculty</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-[#eff4ff] border-t border-[#dde9ff] py-10 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-[#001428]">BatchSync</span>
                <span className="text-[11px] bg-[#dde9ff] text-[#465f88] px-2 py-0.5 rounded font-mono">Academic OS</span>
              </div>
              <p className="text-[12px] text-[#43474d] max-w-sm mt-1">
                Patuakhali Science and Technology University (PSTU), Dumki, Patuakhali-8602, Bangladesh.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <div className="px-3 py-1.5 rounded bg-white text-[#001428] font-mono font-medium border border-[#dde9ff]">
                PSTU RUNTIME: v4.2-LTS
              </div>
              <div className="px-3 py-1.5 rounded bg-white text-[#001428] font-mono font-medium border border-[#dde9ff]">
                CENTRAL CAMPUS NODE
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#dde9ff] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#43474d]">
            <div>© 2025–2026 BatchSync Academic Operating System. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span className="hover:text-[#001428] cursor-pointer">Terms of Governance</span>
              <span className="hover:text-[#001428] cursor-pointer">Institutional Privacy</span>
              <span className="hover:text-[#001428] cursor-pointer">Registrar Helpdesk</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
