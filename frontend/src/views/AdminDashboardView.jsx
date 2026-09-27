import React, { useState } from 'react';
import { AUDIT_LOGS } from '../data/mockData';

export const AdminDashboardView = ({
  faculties,
  pendingClearances,
  onOpenAddFaculty,
  onNavigate,
  onClearanceAction,
}) => {
  const [selectedClearance, setSelectedClearance] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const totalDepartments = faculties.reduce((acc, f) => acc + (f.departments ? f.departments.length : 0), 0);
  const totalBatches = faculties.reduce((acc, f) => acc + (f.batchesCount || 0), 0);
  const totalEnrolled = faculties.reduce((acc, f) => acc + (f.enrolledStudents || 0), 0);

  const handleAction = (id, action) => {
    if (onClearanceAction) {
      onClearanceAction(id, action);
    }
    setSelectedClearance(null);
    setStatusMessage(`Clearance request #${id} ${action === 'approve' ? 'Approved' : 'Declined'}. System state updated.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Alert */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-[#001428] text-white shadow-2xl animate-fade-in border border-[#dde9ff]/30">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">check_circle</span>
          <span className="text-[13px] font-medium">{statusMessage}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="ml-2 text-[#7991af] hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Admin Dashboard Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#dde9ff]">
        <div>
          <h1 className="font-display text-2xl sm:text-[28px] font-bold text-[#0d1c2f] tracking-tight">
            University Administration
          </h1>
          <p className="text-[13px] text-[#465f88] mt-0.5">
            Central administration and university-wide system overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-[12px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>System Status: Operational</span>
          </div>
          <button
            onClick={onOpenAddFaculty}
            className="inline-flex items-center gap-1.5 bg-[#001428] text-white hover:bg-[#0f2942] px-4 py-2 rounded-lg shadow-sm text-[13px] font-semibold transition-all cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Add Faculty</span>
          </button>
        </div>
      </section>

      {/* Top Summary: Compact KPI Row (5 Metrics) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Faculties */}
        <div className="bg-white rounded-xl p-4.5 border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Faculties</span>
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#0d1c2f] tracking-tight">{faculties.length} Active</div>
            <div className="text-[12px] text-[#465f88] mt-0.5">Dynamically scalable</div>
          </div>
        </div>

        {/* Card 2: Total Departments */}
        <div className="bg-white rounded-xl p-4.5 border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Departments</span>
            <span className="material-symbols-outlined text-[20px]">domain</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#0d1c2f] tracking-tight">{totalDepartments}</div>
            <div className="text-[12px] text-[#465f88] mt-0.5">Across all faculties</div>
          </div>
        </div>

        {/* Card 3: Total Batches */}
        <div className="bg-white rounded-xl p-4.5 border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Batches</span>
            <span className="material-symbols-outlined text-[20px]">groups_2</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#0d1c2f] tracking-tight">{totalBatches}</div>
            <div className="text-[12px] text-[#465f88] mt-0.5">Active cohorts</div>
          </div>
        </div>

        {/* Card 4: Total Users */}
        <div className="bg-white rounded-xl p-4.5 border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Users</span>
            <span className="material-symbols-outlined text-[20px]">people</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#0d1c2f] tracking-tight">{totalEnrolled || 18450}</div>
            <div className="text-[12px] text-[#465f88] mt-0.5">Deans, Faculty, Students & Staff</div>
          </div>
        </div>

        {/* Card 5: Pending Approvals */}
        <div className="bg-[#fffbeb] rounded-xl p-4.5 border-2 border-amber-300 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-900 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-bold">Pending Approvals</span>
            <span className="material-symbols-outlined text-[20px] text-amber-600">assignment_late</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-[#0d1c2f] tracking-tight">
                {pendingClearances.length}
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                Action Required
              </span>
            </div>
            <div className="text-[12px] text-[#43474d] mt-0.5">Central clearance queues</div>
          </div>
        </div>
      </section>

      {/* Pending Administrative Actions Container */}
      <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs overflow-hidden">
        <div className="p-5 bg-[#eff4ff] border-b border-[#dde9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">
                Requires Administrator Attention
              </span>
            </div>
            <h2 className="font-display text-[18px] font-bold text-[#0d1c2f] mt-0.5">
              Pending Administrative Actions
            </h2>
          </div>
          <span className="text-[12px] text-[#465f88] bg-white px-3 py-1 rounded-lg font-medium border border-[#dde9ff]">
            {pendingClearances.length} clearances awaiting decision
          </span>
        </div>

        <div className="divide-y divide-[#dde9ff]">
          {/* Action Row 1: Pending Dean Registrations */}
          <div className="p-5 hover:bg-[#eff4ff]/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#b6d0ff] text-[#0f2942] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">badge</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-[15px] font-semibold text-[#0d1c2f]">
                    Pending Dean Registrations
                  </h3>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[11px] font-bold">
                    2 Pending
                  </span>
                </div>
                <p className="text-[13px] text-[#43474d] leading-relaxed max-w-3xl">
                  2 new Dean appointments awaiting Central Admin authorization:{' '}
                  <span className="font-semibold text-[#0d1c2f]">Dr. Shahriar Parvez</span> (Faculty of Law) and{' '}
                  <span className="font-semibold text-[#0d1c2f]">Dr. Zahid Hasan</span> (Faculty of Veterinary Medicine).
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2 self-end lg:self-center">
              <button
                onClick={() => setSelectedClearance(pendingClearances[0])}
                className="px-4 py-2 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[13px] font-semibold transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Review</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Action Row 2: Important Administrative Requests */}
          <div className="p-5 hover:bg-[#eff4ff]/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#0f2942] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">rate_review</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-[15px] font-semibold text-[#0d1c2f]">
                    Important Administrative Requests
                  </h3>
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-900 border border-sky-300 rounded-full text-[11px] font-bold">
                    3 Requests
                  </span>
                </div>
                <p className="text-[13px] text-[#43474d] leading-relaxed max-w-3xl">
                  Department syllabus revisions and batch intake capacity adjustments submitted from the Faculty of Business Administration (FBA) & Computer Science & Engineering (CSE).
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2 self-end lg:self-center">
              <button
                onClick={() => setSelectedClearance(pendingClearances[1] || pendingClearances[0])}
                className="px-4 py-2 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[13px] font-semibold transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Review</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Action Row 3: Important System Alerts */}
          <div className="p-5 hover:bg-[#eff4ff]/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">notification_important</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-[15px] font-semibold text-[#0d1c2f]">
                    Important System Alerts
                  </h3>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-900 border border-rose-300 rounded-full text-[11px] font-bold">
                    2 Alerts
                  </span>
                </div>
                <p className="text-[13px] text-[#43474d] leading-relaxed max-w-3xl">
                  Term rollover scheduling verification required for upcoming semester; 2 faculty Telegram webhook endpoints re-synchronized and ready for validation.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2 self-end lg:self-center">
              <button
                onClick={() => setSelectedClearance(pendingClearances[2] || pendingClearances[0])}
                className="px-4 py-2 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[13px] font-semibold transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Review</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Administrative Quick Actions (5 Cards) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[18px] font-bold text-[#0d1c2f]">Administrative Quick Actions</h2>
          <span className="text-[12px] text-[#465f88]">Direct shortcuts for central administrators</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* + Add Faculty (Prominent) */}
          <button
            onClick={onOpenAddFaculty}
            className="text-left p-4.5 bg-[#001428] text-white rounded-xl shadow-xs hover:bg-[#0f2942] transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="p-2 rounded-lg bg-white/10 text-white material-symbols-outlined text-[22px]">
                domain_add
              </span>
              <span className="material-symbols-outlined text-[#dde9ff] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
            <div>
              <div className="font-display text-[14px] font-bold mb-1 flex items-center gap-1">
                <span>+ Add Faculty</span>
              </div>
              <p className="text-[11px] text-[#dde9ff] leading-snug">
                Register a new dynamic collegiate faculty into the university platform
              </p>
            </div>
          </button>

          {/* Manage Faculties */}
          <button
            onClick={() => onNavigate('admin-faculties')}
            className="text-left p-4.5 bg-white rounded-xl border border-[#dde9ff] hover:border-[#465f88] transition-all flex flex-col justify-between group shadow-xs cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="p-2 rounded-lg bg-[#eff4ff] text-[#465f88] material-symbols-outlined text-[22px]">
                account_balance
              </span>
              <span className="material-symbols-outlined text-[#74777e] group-hover:text-[#001428] group-hover:translate-x-1 transition-all">
                chevron_right
              </span>
            </div>
            <div>
              <div className="font-display text-[14px] font-bold text-[#0d1c2f] mb-1 group-hover:text-[#001428]">
                Manage Faculties
              </div>
              <p className="text-[11px] text-[#43474d] leading-snug">
                Configure existing faculties, department allocations, and codes
              </p>
            </div>
          </button>

          {/* Manage Deans */}
          <button
            onClick={() => onNavigate('dean-portal')}
            className="text-left p-4.5 bg-white rounded-xl border border-[#dde9ff] hover:border-[#465f88] transition-all flex flex-col justify-between group shadow-xs cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="p-2 rounded-lg bg-[#eff4ff] text-[#465f88] material-symbols-outlined text-[22px]">
                badge
              </span>
              <span className="material-symbols-outlined text-[#74777e] group-hover:text-[#001428] group-hover:translate-x-1 transition-all">
                chevron_right
              </span>
            </div>
            <div>
              <div className="font-display text-[14px] font-bold text-[#0d1c2f] mb-1 group-hover:text-[#001428]">
                Manage Deans
              </div>
              <p className="text-[11px] text-[#43474d] leading-snug">
                Assign and review Dean credentials across faculties
              </p>
            </div>
          </button>

          {/* View Users */}
          <button
            onClick={() => onNavigate('teacher-central')}
            className="text-left p-4.5 bg-white rounded-xl border border-[#dde9ff] hover:border-[#465f88] transition-all flex flex-col justify-between group shadow-xs cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="p-2 rounded-lg bg-[#eff4ff] text-[#465f88] material-symbols-outlined text-[22px]">
                manage_accounts
              </span>
              <span className="material-symbols-outlined text-[#74777e] group-hover:text-[#001428] group-hover:translate-x-1 transition-all">
                chevron_right
              </span>
            </div>
            <div>
              <div className="font-display text-[14px] font-bold text-[#0d1c2f] mb-1 group-hover:text-[#001428]">
                Teacher Central
              </div>
              <p className="text-[11px] text-[#43474d] leading-snug">
                Browse faculty teaching timetables, rosters, and daily lectures
              </p>
            </div>
          </button>

          {/* View Reports */}
          <button
            onClick={() => onNavigate('cr-hub')}
            className="text-left p-4.5 bg-white rounded-xl border border-[#dde9ff] hover:border-[#465f88] transition-all flex flex-col justify-between group shadow-xs cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <span className="p-2 rounded-lg bg-[#eff4ff] text-[#465f88] material-symbols-outlined text-[22px]">
                how_to_vote
              </span>
              <span className="material-symbols-outlined text-[#74777e] group-hover:text-[#001428] group-hover:translate-x-1 transition-all">
                chevron_right
              </span>
            </div>
            <div>
              <div className="font-display text-[14px] font-bold text-[#0d1c2f] mb-1 group-hover:text-[#001428]">
                Batch CR Hub
              </div>
              <p className="text-[11px] text-[#43474d] leading-snug">
                Manage batch schedules, student verification & polls
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* University Structure & Composition Overview */}
      <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-5 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dde9ff] pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-semibold">Institutional Blueprint</span>
            <h2 className="font-display text-[18px] font-bold text-[#0d1c2f] mt-0.5">
              University Structure & Composition Overview
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[#465f88] bg-[#eff4ff] px-3 py-1.5 rounded-lg text-[12px] font-medium border border-[#dde9ff]">
            <span className="material-symbols-outlined text-[17px] text-[#001428]">dynamic_feed</span>
            <span>Faculties dynamically expand across the system upon creation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Faculty breakdown table (8 Cols) */}
          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#eff4ff] text-[#465f88] text-[11px] uppercase tracking-wider border-b border-[#dde9ff]">
                  <th className="py-2.5 px-3 font-semibold">Collegiate Faculty</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Departments</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Batches</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Enrolled Users</th>
                  <th className="py-2.5 px-3 font-semibold">Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde9ff]/60">
                {faculties.slice(0, 5).map((fac) => {
                  const percent = Math.min(100, Math.round(((fac.enrolledStudents || 100) / 18450) * 100 * 9));
                  return (
                    <tr key={fac.id} className="hover:bg-[#eff4ff]/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-display text-[14px] font-semibold text-[#0d1c2f]">
                          {fac.name}
                        </div>
                        <span className="font-mono text-[11px] text-[#74777e]">
                          {fac.dean ? `Dean: ${fac.dean.name}` : <span className="text-amber-700">Dean assignment in progress</span>}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-[#0d1c2f]">
                        {fac.departments ? fac.departments.length : 0} Depts
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-[12px] text-[#465f88]">
                        {fac.batchesCount} Batches
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-[12px] font-semibold text-[#0d1c2f]">
                        {fac.enrolledStudents ? fac.enrolledStudents.toLocaleString() : '160'} Users
                      </td>
                      <td className="py-3 px-3 w-36">
                        <div className="w-full bg-[#dde9ff] rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: fac.color || '#001428',
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right: University Composition (4 Cols) */}
          <div className="lg:col-span-4 bg-[#eff4ff] rounded-xl p-4.5 border border-[#dde9ff] flex flex-col gap-4">
            <div>
              <h3 className="font-display text-[15px] font-bold text-[#0d1c2f]">University Composition</h3>
              <p className="text-[12px] text-[#465f88]">Proportionate breakdown of 18,450 accounts</p>
            </div>

            <div className="space-y-1.5">
              <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-[#dde9ff]">
                <div className="bg-[#001428] h-full" style={{ width: '93.2%' }} title="Students: 17,200 (93.2%)"></div>
                <div className="bg-[#465f88] h-full" style={{ width: '3.5%' }} title="Teachers: 642 (3.5%)"></div>
                <div className="bg-[#aec7f7] h-full" style={{ width: '3.2%' }} title="Staff: 600 (3.2%)"></div>
                <div className="bg-amber-500 h-full" style={{ width: '0.1%' }} title="Deans: 8"></div>
              </div>
              <div className="flex justify-between text-[11px] text-[#465f88] font-mono">
                <span>0%</span>
                <span>100% University Core</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-2 rounded bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#001428]"></span>
                  <span className="text-[12px] text-[#0d1c2f] font-medium">Students</span>
                </div>
                <div className="font-mono text-[12px] font-bold text-[#0d1c2f]">
                  17,200 <span className="text-[11px] font-normal text-[#465f88]">(93.2%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#465f88]"></span>
                  <span className="text-[12px] text-[#0d1c2f] font-medium">Teachers</span>
                </div>
                <div className="font-mono text-[12px] font-bold text-[#0d1c2f]">
                  642 <span className="text-[11px] font-normal text-[#465f88]">(3.5%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#aec7f7]"></span>
                  <span className="text-[12px] text-[#0d1c2f] font-medium">Staff</span>
                </div>
                <div className="font-mono text-[12px] font-bold text-[#0d1c2f]">
                  600 <span className="text-[11px] font-normal text-[#465f88]">(3.2%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-[12px] text-[#0d1c2f] font-medium">Deans</span>
                </div>
                <div className="font-mono text-[12px] font-bold text-[#0d1c2f]">
                  {faculties.length} <span className="text-[11px] font-normal text-[#465f88]">(Collegiate Heads)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent University Activity (Audit records) */}
      <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#dde9ff] pb-3">
          <div>
            <h2 className="font-display text-[18px] font-bold text-[#0d1c2f]">Recent University Activity</h2>
            <p className="text-[12px] text-[#465f88]">Chronological audit record of recent administrative and structural modifications</p>
          </div>
          <button
            onClick={() => onNavigate('admin-faculties')}
            className="inline-flex items-center gap-1 text-[12px] text-[#465f88] hover:text-[#001428] font-semibold transition-colors"
          >
            <span>Full System Activity</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="relative pl-5 flex flex-col gap-3.5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dde9ff]">
          {AUDIT_LOGS.map((item, idx) => {
            const colors = ['bg-[#001428]', 'bg-[#465f88]', 'bg-[#0f2942]', 'bg-[#b6d0ff]', 'bg-[#001428]', 'bg-[#74777e]'];
            const dotColor = colors[idx % colors.length];
            return (
              <div key={item.id} className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px]">
                <span className={`absolute -left-[1.35rem] top-1.5 w-2.5 h-2.5 rounded-full ${dotColor} ring-4 ring-white`}></span>
                <div>
                  <span className="font-display font-semibold text-[#0d1c2f]">{item.title}:</span>
                  <span className="text-[#43474d] ml-1">{item.details}</span>
                </div>
                <span className="font-mono text-[11px] text-[#465f88] shrink-0">{item.time}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Review Modal for Pending Clearances */}
      {selectedClearance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#dde9ff] overflow-hidden">
            <div className="p-5 bg-[#001428] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[22px] text-[#aec7f7]">rate_review</span>
                <div>
                  <h3 className="font-display text-[16px] font-bold">Clearance Review</h3>
                  <p className="text-[11px] text-[#b0c9e8]">Authorization Request • {selectedClearance.applicant}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClearance(null)}
                className="text-[#b0c9e8] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-[13px]">
              <div className="p-3.5 bg-[#eff4ff] rounded-lg border border-[#dde9ff] space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">Applicant Details</div>
                <div className="font-bold text-[#0d1c2f] text-[15px]">{selectedClearance.applicant}</div>
                <div className="text-[#43474d]">{selectedClearance.applicantRole} • {selectedClearance.dept}</div>
                <div className="text-[11px] font-mono text-[#74777e] mt-1">Submitted: {selectedClearance.submittedAt}</div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold block mb-1">
                  Requested Authorization Action
                </label>
                <div className="p-3 bg-white rounded-lg border border-[#c3c6ce] text-[#0d1c2f] font-semibold">
                  {selectedClearance.requestedRole}
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold block mb-1">
                  Submission Summary & Impact
                </label>
                <p className="text-[#43474d] leading-relaxed bg-[#f8f9ff] p-3 rounded-lg border border-[#dde9ff]">
                  {selectedClearance.details}
                </p>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[12px]">
                <span className="material-symbols-outlined text-[18px] text-amber-600">verified</span>
                <span>UGC and PSTU Academic Regulations compliant for immediate ratification.</span>
              </div>
            </div>

            <div className="p-4 bg-[#eff4ff] border-t border-[#dde9ff] flex items-center justify-end gap-2.5">
              <button
                onClick={() => handleAction(selectedClearance.id, 'reject')}
                className="px-4 py-2 bg-white text-[#ba1a1a] border border-[#ffdad6] hover:bg-[#ffdad6]/40 rounded-lg font-medium text-[13px] transition-colors"
              >
                Decline Request
              </button>
              <button
                onClick={() => handleAction(selectedClearance.id, 'approve')}
                className="px-5 py-2 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg font-bold text-[13px] transition-all shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Authorize & Approve</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
